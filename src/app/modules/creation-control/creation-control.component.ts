import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CreationControlFormUpsertComponent } from "./creation-control-form-upsert/creation-control-form-upsert.component";
import { CreationControlFormDeleteComponent } from "./creation-control-form-delete/creation-control-form-delete.component";
import { BirdsService } from "../../services/birds/birds.service";
import { CreationControlService } from "../../services/creation-control/creation-control.service";

import { Subject, take, takeUntil } from "rxjs";

@Component({
    selector: "creation-control",
    templateUrl: "./creation-control.component.html",
    styleUrls: ["./creation-control.css"]
})
export class CreationControlComponent implements OnInit, OnDestroy {
    constructor(
        public dialog: MatDialog,
        private birdsService: BirdsService,
        private creationControlService: CreationControlService
    ) {
        this.birdsService = birdsService;
        this.creationControlService = creationControlService;
    }

    public isAuthenticated = false;
    private _destroySub$ = new Subject<void>();
    public loading: boolean;

    public year: number;
    public years: number[];

    public creationControlList: any[];

    async ngOnInit() {
        this.loading = true;

        this.year = 2022;
        this.years = [2022, 2023, 2024, 2025];

        this.creationControlList = await this.list(this.year);

        this.loading = false;
    }

    async list(year) {
        let list = await this.creationControlService.get({});

        list = list.filter((l) => parseInt(l.year) == year);

        return list;
    }

    onOpenDialogCreate() {
        const dialogRef = this.dialog.open(CreationControlFormUpsertComponent, {
            data: { name: "Cadastrar" }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) this.creationControlList.push(result);
        });
    }

    onOpenDialogEdit(posture) {
        const dialogRef = this.dialog.open(CreationControlFormUpsertComponent, {
            data: { name: "Editar", posture }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    onOpenDialogDelete(posture) {
        const dialogRef = this.dialog.open(CreationControlFormDeleteComponent, {
            data: { name: "Remover", posture }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.creationControlList = this.creationControlList.filter(
                    (s) => s._id != result._id
                );
            }
        });
    }

    public ngOnDestroy(): void {}
}
