import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JwtAuthService } from "../../services/jwt-auth/jwt-auth.service";
// import { AuthService } from "../../services/auth/auth.service";
// import { filter, Subject, take, takeUntil } from "rxjs";
import { Md5 } from "ts-md5/dist/md5";

@Component({
    selector: "authentication",
    templateUrl: "./authentication.component.html",
    styleUrls: ["./authentication.component.css"]
})
export class AuthenticationComponent implements OnInit, OnDestroy {
    public document: any = {};
    public loginValid = true;

    constructor(private router: Router, private jwtAuth: JwtAuthService) {}

    public ngOnInit(): void {}

    public ngOnDestroy(): void {}

    public async onSubmit() {
        this.loginValid = true;

        try {
            const response = await this.jwtAuth.signin(
                this.document.username,
                Md5.hashStr(this.document.password)
            );

            console.log(response, this.jwtAuth.return);
            if (response) {
                this.router.navigateByUrl(this.jwtAuth.return);
            } else {
                this.loginValid = false;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
