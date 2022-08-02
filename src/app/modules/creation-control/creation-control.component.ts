import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CreationControlFormComponent } from "./creation-control-form/creation-control-form.component";
import { BirdsService } from "../../services/birds/birds.service";
import { CreationControlService } from "../../services/creation-control/creation-control.service";

import { Subject, take, takeUntil } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";
@Component({
    selector: "creation-control",
    templateUrl: "./creation-control.component.html",
    styleUrls: ["./creation-control.css"]
})
export class CreationControlComponent implements OnInit, OnDestroy {
    constructor(
        public dialog: MatDialog,
        private birdsService: BirdsService,
        private creationControlService: CreationControlService,
        private _authService: AuthService
    ) {
        this.birdsService = birdsService;
        this.creationControlService = creationControlService;
    }

    public isAuthenticated = false;
    private _destroySub$ = new Subject<void>();

    public year: number;
    public years: number[];

    public creationControlList: any[];

    async ngOnInit() {
        this._authService.isAuthenticated$
            .pipe(takeUntil(this._destroySub$))
            .subscribe((isAuthenticated: boolean) => {
                console.log("isAuthenticated", isAuthenticated);
                return (this.isAuthenticated = isAuthenticated);
            });

        this.creationControlList = await this.creationControlService.get({});

        console.log("creationControlList", this.creationControlList);

        this.year = 2022;
        this.years = [2022, 2023, 2024, 2025];
    }

    onOpenDialogCreate() {
        const dialogRef = this.dialog.open(CreationControlFormComponent, {
            data: { name: "Cadastrar" }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: `, result);
        });
    }

    onOpenDialogEdit(bird) {
        console.log("EDIT", bird);
        const dialogRef = this.dialog.open(CreationControlFormComponent, {
            data: { name: "Editar", bird }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    public ngOnDestroy(): void {
        console.log("exec ngOnDestroy");
        this._destroySub$.next();
    }

    public logout(): void {
        console.log("exec logout");

        this._authService.logout("/").pipe(take(1));
    }
}
