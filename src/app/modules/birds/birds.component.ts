import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BirdFormComponent } from "./birds-form/birds-form.component";

@Component({
    selector: "app-user-profile",
    templateUrl: "./birds.component.html",
    styleUrls: ["./birds.component.css"]
})
export class BirdsComponent implements OnInit {
    ngOnInit() {}

    constructor(public dialog: MatDialog) {}

    onOpenDialogCreate() {
        const dialogRef = this.dialog.open(BirdFormComponent, {
            data: { name: "Cadastrar" }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    onOpenDialogEdit() {
        const dialogRef = this.dialog.open(BirdFormComponent, {
            data: { name: "Editar", ganders: ["Macho", "Fêmea"] }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }
}
