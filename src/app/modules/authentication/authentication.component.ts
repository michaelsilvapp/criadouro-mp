import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { filter, Subject, take, takeUntil } from "rxjs";

@Component({
    selector: "authentication",
    templateUrl: "./authentication.component.html",
    styleUrls: ["./authentication.component.css"]
})
export class AuthenticationComponent implements OnInit, OnDestroy {
    public document: any = {};
    public loginValid = true;

    private _destroySub$ = new Subject<void>();
    private readonly returnUrl: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _authService: AuthService
    ) {
        this.returnUrl =
            this._route.snapshot.queryParams["returnUrl"] || "/aves";
    }

    public ngOnInit(): void {
        this._authService.isAuthenticated$
            .pipe(
                filter((isAuthenticated: boolean) => isAuthenticated),
                takeUntil(this._destroySub$)
            )
            .subscribe((_) => this._router.navigateByUrl(this.returnUrl));
    }

    public ngOnDestroy(): void {
        this._destroySub$.next();
    }

    public onSubmit(): void {
        this.loginValid = true;

        this._authService
            .login(this.document.username, this.document.password)
            .pipe(take(1))
            .subscribe({
                next: (_) => {
                    this.loginValid = true;
                    this._router.navigateByUrl("/aves");
                },
                error: (_) => (this.loginValid = false)
            });
    }
}