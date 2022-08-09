import _ from "lodash";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { of, BehaviorSubject } from "rxjs";
import { UserService } from "../users/users.service";
import { LocalStoreService } from "../local-store/local-store.service";

export interface User {
    _id?: string;
    nickname?: string;
    email?: string;
}

@Injectable({
    providedIn: "root"
})
export class JwtAuthService {
    token;
    isAuthenticated: Boolean;
    user: User = {};
    user$ = new BehaviorSubject<User>(this.user);
    signingIn: Boolean;
    return: string;
    JWT_TOKEN = "JWT_TOKEN";
    APP_USER = "CRIADOURO_MP";

    constructor(
        private ls: LocalStoreService,
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,
        private api: UserService
    ) {
        this.route.queryParams.subscribe(
            (params) => (this.return = params["return"] || "/")
        );
    }

    public async signin(email, password) {
        this.signingIn = true;
        try {
            const response = await this.api.login({
                email,
                password
            });

            const userData = _.get(response, "result");

            const user: User = {
                email: userData.email,
                nickname: userData.nickname,
                _id: userData._id
            };

            this.setUserAndToken(userData.token, user, !!userData);

            this.signingIn = false;
            return true;
        } catch (error) {
            console.log("error", error);
            this.signingIn = false;
            return false;
        }
    }

    /**
     *
     * @returns
     */
    public async checkTokenIsValid() {
        this.signingIn = true;

        try {
            const token = this.getJwtToken();
            const localUser: User = this.getUser();
            const user: User = await this.api.checkLogin({
                token,
                email: localUser.email
            });

            this.setUserAndToken(this.getJwtToken(), user, true);

            this.signingIn = false;

            return user;
        } catch (error) {
            console.log(error);
            this.signout();
            return of(error);
        }
    }

    public signout() {
        this.setUserAndToken(null, null, false);
        this.router.navigateByUrl("/login");
    }

    isLoggedIn(): Boolean {
        return !!this.getJwtToken();
    }

    getJwtToken() {
        return this.ls.getItem(this.JWT_TOKEN);
    }
    getUser() {
        return this.ls.getItem(this.APP_USER);
    }

    setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
        this.isAuthenticated = isAuthenticated;
        this.token = token;
        this.user = user;
        this.user$.next(user);
        this.ls.setItem(this.JWT_TOKEN, token);
        this.ls.setItem(this.APP_USER, user);
    }
}
