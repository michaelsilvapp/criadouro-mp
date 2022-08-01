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

        this.birdsFemale = await (
            await this.birdsService.get({})
        ).filter((b) => b.gander == "Fêmea");

        this.birdsMales = (await this.birdsService.get({})).filter(
            (b) => b.gander == "Macho"
        );

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

    // displayFn(bird: any): string {
    //     return bird && bird.name ? bird.name : "";
    // }

    // private _filter(name: string): any[] {
    //     const filterValue = name.toLowerCase();

    //     return this.birdsMales.filter((option) =>
    //         option.name.toLowerCase().includes(filterValue)
    //     );
    // }

    async onSave() {
        console.log(this.document);

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
