import _ from "lodash";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreatoresServices } from "../../../services/creators/creators.services";
import { BirdsService } from "../../../services/birds/birds.service";
import { MutationsServices } from "../../../services/mutations/mutations.service";
import { CreationControlService } from "../../../services/creation-control/creation-control.service";
import IMask from "imask";

export interface DialogData {
    name: string;
    bird?: any;
}

@Component({
    selector: "creation-control-form",
    templateUrl: "./creation-control-form.component.html"
})
export class CreationControlFormComponent implements OnInit {
    public creators: any;
    public lineages: string[];
    public ganders: string[];
    public mutations: any[];
    public years: number[];
    public months: string[];
    public numberOfPuppies: number[];
    public females: any[];
    public males: any[];
    public postures: string[];

    public document: any = {};

    public birdsFemale: any;
    public birdsMales: any;

    public BirdSerices: BirdsService;
    public CreationControlService: CreationControlService;

    public dateMask = { mask: IMask.MaskedDate };

    constructor(
        public dialogRef: MatDialogRef<CreationControlFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private birdsService: BirdsService,
        private creationControlService: CreationControlService
    ) {}

    async ngOnInit() {
        if (this.data.bird) {
            this.document = this.data.bird;
        }

        this.document.birdsPuppie = [
            { numberWasher: "", gander: "", genotype: [] },
            { numberWasher: "", gander: "", genotype: [] },
            { numberWasher: "", gander: "", genotype: [] },
            { numberWasher: "", gander: "", genotype: [] },
            { numberWasher: "", gander: "", genotype: [] },
            { numberWasher: "", gander: "", genotype: [] }
        ];

        this.birdsFemale = await this._getBirdByGander("Fêmea");

        this.birdsMales = await this._getBirdByGander("Macho");

        this.numberOfPuppies = [1, 2, 3, 4, 5, 6];

        this.creators = new CreatoresServices().getList();

        this.ganders = ["Macho", "Fêmea", "Desconhecido"];

        this.months = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ];

        this.mutations = new MutationsServices().getList();

        this.postures = [
            "1ª Postura",
            "2ª Postura",
            "3ª Postura",
            "4ª Postura"
        ];
    }

    public onSetDateSum(date) {
        const _formatTo = (date) => {
            const dateSplit = date.split("/");

            console.log(dateSplit);
            return `${dateSplit[1]}/${dateSplit[0]}/${dateSplit[2]}`;
        };

        const _geDate = (date, days) => {
            const result = new Date(_formatTo(date));
            result.setDate(result.getDate() + days);

            return result.toLocaleDateString();
        };

        if (date.length == 10) {
            this.document.dateExpectedBirth = _geDate(date, 21);

            this.document.dateExpectedRing = _geDate(
                this.document.dateExpectedBirth,
                11
            );

            this.document.dateExpectedSeparate = _geDate(
                this.document.dateExpectedRing,
                15
            );
        }
    }

    private async _getBirdByGander(gander: string) {
        const result = await this.birdsService.get({});

        return result
            .filter((b) => b.gander == gander)
            .map((b) => {
                const _getProps = (prop, separator = " ") => {
                    const r = [1, 2, 3, 4].map((i) => _.get(b, `${prop}${i}`));

                    return r.filter((r) => r).join(separator);
                };

                return {
                    _id: b._id,
                    gander: b.gander,
                    code: `${b.creator.code}-${b.year}-${b.washer}`,
                    phenotype: _getProps("phenotype"),
                    genotype: _getProps("genotype", ", ")
                };
            });
    }

    async onSave() {
        const r = await this.creationControlService.insert(this.document);

        console.log("RESPONSE", _.get(r, "result"));

        this.dialogRef.close({ _id: _.get(r, "result"), ...this.document });
    }
}
