import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BirdFormComponent } from "./birds-form/birds-form.component";
import { BirdsService } from "../../services/birds/birds.service";
@Component({
    selector: "app-user-profile",
    templateUrl: "./birds.component.html",
    styleUrls: ["./birds.component.css"]
})
export class BirdsComponent implements OnInit {
    constructor(public dialog: MatDialog, private birdsService: BirdsService) {
        this.birdsService = birdsService;
    }

    public birdsList: any[];

    async ngOnInit() {
        this.birdsList = await this.birdsService.get({});

        console.log("birdsList", this.birdsList);
    }

    onOpenDialogCreate() {
        const dialogRef = this.dialog.open(BirdFormComponent, {
            data: { name: "Cadastrar" }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
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
