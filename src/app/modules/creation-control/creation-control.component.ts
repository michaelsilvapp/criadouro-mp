import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CreationControlFormComponent } from "./creation-control-form/creation-control-form.component";
import { BirdsService } from "../../services/birds/birds.service";
import { CreationControlService } from "../../services/creation-control/creation-control.service";
@Component({
    selector: "creation-control",
    templateUrl: "./creation-control.component.html",
    styleUrls: ["./creation-control.css"]
})
export class CreationControlComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        private birdsService: BirdsService,
        private creationControlService: CreationControlService
    ) {
        this.birdsService = birdsService;
        this.creationControlService = creationControlService;
    }

    public year: number;
    public years: number[];

    public creationControlList: any[];

    async ngOnInit() {
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
            console.log(`Dialog result: ${result}`);
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
}
