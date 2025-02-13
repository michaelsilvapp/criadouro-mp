import _ from "lodash";
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
    public phenotypes: any[];
    public genotypes: any[];

    public loading: boolean;

    public BirdSerices: BirdsService;

    public document: any = {};

    constructor(
        public dialogRef: MatDialogRef<BirdFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private birdsService: BirdsService
    ) {}

    ngOnInit(): void {
        this.loading = true;

        if (this.data.bird) {
            this.document = this.data.bird;
        }

        this.creators = new CreatoresServices().getList();

        this.ganders = ["Macho", "Fêmea", "Desconhecido"];

        this.lineages = ["Verde", "Azul", "Turquesa"];

        const Mutations = new MutationsServices();

        this.phenotypes = Mutations.getList(true, false);
        this.genotypes = Mutations.getList(false, true);

        this.loading = false;
    }

    public objectComparisonFunction = function (option, value): boolean {
        return option.code === value.code;
    };

    async onSave() {
        this.loading = true;

        const r = await this.birdsService.insert(this.document);

        this.dialogRef.close({ _id: _.get(r, "result"), ...this.document });

        this.loading = false;
    }
}
