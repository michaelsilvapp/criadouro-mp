import _ from "lodash";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreatoresServices } from "../../../services/creators/creators.services";
import { BirdsService } from "../../../services/birds/birds.service";
import { MutationsServices } from "../../../services/mutations/mutations.service";
import { FormGroup } from "@angular/forms";
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

    public birdsFemale: any[];
    public birdsMales: any[];

    public BirdSerices: BirdsService;

    constructor(
        public dialogRef: MatDialogRef<CreationControlFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private birdsService: BirdsService
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

        console.log(this.birdsMales);

        this.numberOfPuppies = [1, 2, 3, 4, 5, 6];

        this.creators = new CreatoresServices().getList();

        this.ganders = ["Macho", "Fêmea", "Desconhecido"];

        this.lineages = ["Verde", "Azul", "Turquesa"];

        this.years = [2022, 2023, 2024, 2025];

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

    // displayFn(bird: any): string {
    //     return bird && bird.name ? bird.name : "";s
    // }

    // private _filter(name: string): any[] {
    //     const filterValue = name.toLowerCase();

    //     return this.birdsMales.filter((option) =>
    //         option.name.toLowerCase().includes(filterValue)
    //     );
    // }

    async onSave() {
        console.log(JSON.stringify(this.document));

        const a = {
            birdsPuppie: [
                {
                    numberWasher: 5,
                    gander: "Macho",
                    genotype: ["Verde", "Americano", "Fulvo"]
                },
                {
                    numberWasher: 6,
                    gander: "Fêmea",
                    genotype: ["Verde", "Fulvo"]
                },
                { numberWasher: "", gander: "", genotype: [] },
                { numberWasher: "", gander: "", genotype: [] },
                { numberWasher: "", gander: "", genotype: [] },
                { numberWasher: "", gander: "", genotype: [] }
            ],
            birdCage: 1,
            year: 2022,
            month: "Agosto",
            posture: "1ª Postura",
            male: {
                _id: "fdsjfasjfsadklfdjsaflsakd",
                gander: "Macho",
                code: "OT-305-2018-18",
                phenotype: "Jade Fulvo",
                genotype: "Americano, Azul"
            },
            female: {
                _id: "fdsajklr32u23fkdajklfff",
                gander: "Fêmea",
                code: "OT-128-2021-20",
                phenotype: "Lutino",
                genotype: "Azul"
            },
            totalEggs: 4,
            totalPuppies: 1
        };
        // await this.birdsService
        //     .insert({
        //         washer: "18",
        //         year: "2018",
        //         creator: { name: "Kiko", code: "OT-305" },
        //         gander: "Macho",
        //         weight: "40,5",
        //         lineage: "Verde",
        //         phenotype1: "Jade",
        //         phenotype2: "Fulvo",
        //         genotype1: { name: "Americano" },
        //         genotype2: { name: "Azul" }
        //     })
        //     .subscribe((data) => {
        //         console.log(data);
        //     });
    }
}
