import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from "@angular/router";
import { JwtAuthService } from "../jwt-auth/jwt-auth.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private jwtAuth: JwtAuthService) {}

    // constructor(private _authService: AuthService, private _router: Router) {}

    // public canActivate(): Observable<boolean | UrlTree> {
    //     return this._authService.isAuthenticated$.pipe(
    //         map((s: boolean) => (s ? true : this._router.parseUrl("/login")))
    //     );
    // }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.jwtAuth.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(["/login"], {
                queryParams: {
                    return: state.url
                }
            });
            return false;
        }
    }
}
