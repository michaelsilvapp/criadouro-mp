import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreatoresServices } from "../../../services/creators/creators.services";
import { MutationsServices } from "../../../services/mutations/mutations.service";
export interface DialogData {
    name: string;
    bird?: any;
}

@Component({
    selector: "birds-form",
    templateUrl: "./birds-form.component.html"
})
export class BirdFormComponent implements OnInit {
    public creators: any;
    public lineages: string[];
    public ganders: string[];
    public mutations: any[];

    public document: any = {};

    constructor(
        public dialogRef: MatDialogRef<BirdFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        console.log(this.data);
    }

    ngOnInit(): void {
        this.creators = new CreatoresServices().getList();

        this.ganders = ["Macho", "Fêmea", "Desconhecido"];

        this.lineages = ["Verde", "Azul", "Turquesa"];

        this.mutations = new MutationsServices().getList();
    }

    onSave() {
        console.log("executou", this.document);
    }
}
