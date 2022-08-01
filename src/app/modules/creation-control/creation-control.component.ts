import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CreationControlFormComponent } from "./creation-control-form/creation-control-form.component";
import { BirdsService } from "../../services/birds/birds.service";
@Component({
    selector: "creation-control",
    templateUrl: "./creation-control.component.html",
    styleUrls: ["./creation-control.css"]
})
export class CreationControlComponent implements OnInit {
    constructor(public dialog: MatDialog, private birdsService: BirdsService) {
        this.birdsService = birdsService;
    }

    public birdsList: any[];

    async ngOnInit() {
        this.birdsList = await this.birdsService.get({});

        console.log("birdsList", this.birdsList);
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
