import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreatoresServices } from "../../../services/creators/creators.services";
import { BirdsService } from "../../../services/birds/birds.service";
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

    public BirdSerices: BirdsService;

    public document: any = {};

    constructor(
        public dialogRef: MatDialogRef<BirdFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private birdsService: BirdsService
    ) {
        console.log(this.data);
    }

    ngOnInit(): void {
        if (this.data.bird) {
            this.document = this.data.bird;
        }

        this.creators = new CreatoresServices().getList();

        this.ganders = ["Macho", "Fêmea", "Desconhecido"];

        this.lineages = ["Verde", "Azul", "Turquesa"];

        this.mutations = new MutationsServices().getList();
    }

    async onSave() {
        console.log(this.birdsService);

        await this.birdsService
            .insert({
                washer: "18",
                year: "2018",
                creator: { name: "Kiko", code: "OT-305" },
                gander: "Macho",
                weight: "40,5",
                lineage: "Verde",
                phenotype1: "Jade",
                phenotype2: "Fulvo",
                genotype1: "Americano",
                genotype2: "Azul"
            })
            .subscribe((data) => {
                console.log("RETORNO", data);
            });
    }
}
