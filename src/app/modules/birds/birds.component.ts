import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BirdFormComponent } from "./birds-form/birds-form.component";
import { BirdsService } from "../../services/birds/birds.service";

import { Subject, take, takeUntil } from "rxjs";
import { AuthService } from "../../services/auth/auth.service";

@Component({
    selector: "birds",
    templateUrl: "./birds.component.html",
    styleUrls: ["./birds.component.css"]
})
export class BirdsComponent implements OnInit, OnDestroy {
    constructor(
        public dialog: MatDialog,
        private birdsService: BirdsService,
        private _authService: AuthService
    ) {
        this.birdsService = birdsService;
    }

    public birdsList: any;
    public isAuthenticated = false;
    private _destroySub$ = new Subject<void>();

    async ngOnInit() {
        this._authService.isAuthenticated$
            .pipe(takeUntil(this._destroySub$))
            .subscribe((isAuthenticated: boolean) => {
                console.log("isAuthenticated", isAuthenticated);
                return (this.isAuthenticated = isAuthenticated);
            });

        this.birdsList = await this.birdsService.get({});

        console.log("this.birdsList", this.birdsList);
    }

    public ngOnDestroy(): void {
        console.log("exec ngOnDestroy");
        this._destroySub$.next();
    }

    public logout(): void {
        console.log("exec logout");

        this._authService.logout("/").pipe(take(1));
    }

    onOpenDialogCreate() {
        const dialogRef = this.dialog.open(BirdFormComponent, {
            data: { name: "Cadastrar" }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result:`, result);
        });
    }

    onOpenDialogEdit(bird) {
        console.log("EDIT", bird);
        const dialogRef = this.dialog.open(BirdFormComponent, {
            data: { name: "Editar", bird }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }
}
