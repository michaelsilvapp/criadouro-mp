import _ from "lodash";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, take, takeUntil } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { BirdFormComponent } from "./birds-form/birds-form.component";
import { BirdsService } from "../../services/birds/birds.service";
import { BirdFormDeleteComponent } from "./birds-form-delete/birds-form-delete.component";
import { MutationsServices } from "../../services/mutations/mutations.service";
@Component({
    selector: "birds",
    templateUrl: "./birds.component.html",
    styleUrls: ["./birds.component.css"]
})
export class BirdsComponent implements OnInit, OnDestroy {
    constructor(public dialog: MatDialog, private birdsService: BirdsService) {
        this.birdsService = birdsService;
    }

    public loading: boolean;
    public birdsList: any = [];
    public birdsListBackup: any;
    public isAuthenticated = false;
    private _destroySub$ = new Subject<void>();
    public searchBy: any[];
    public searchActive: boolean;

    public mutationService: MutationsServices;

    public document: any = {};

    async ngOnInit() {
        this.mutationService = new MutationsServices();

        this.loading = true;
        this.searchActive = false;

        this.searchBy = [
            { name: "Criador", value: "creator" },
            { name: "Fenótipo", value: "phenotype" },
            { name: "Ano", value: "year" }
        ];

        this.birdsList = await this.list();

        this.birdsListBackup = this.birdsList;

        this.loading = false;
    }

    public ngOnDestroy(): void {
        this._destroySub$.next();
    }

    async list() {
        let list = await this.birdsService.get({});

        list = list.map((bird) => {
            return {
                ...bird,
                phenotype: this.mutationService.getProps(bird, "phenotype"),
                genotype: this.mutationService.getProps(bird, "genotype")
            };
        });

        return _.sortBy(list, ["year", "phenotype1"]);
    }

    onOpenDialogCreate() {
        const dialogRef = this.dialog.open(BirdFormComponent, {
            data: { name: "Cadastrar" }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.birdsList.push(result);
                this.birdsListBackup.push(result);
            }
        });
    }

    onOpenDialogEdit(bird) {
        const dialogRef = this.dialog.open(BirdFormComponent, {
            data: { name: "Editar", bird }
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }

    onSearch() {
        this.searchActive = true;

        const _format = (value) =>
            value
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toUpperCase();

        const search = this.escape(_format(this.document.search));

        const props = [
            "year",
            "genotype",
            "phenotype",
            "washer",
            "creator.name",
            "creator.code"
        ];

        this.birdsList = this.birdsListBackup.filter((l) => {
            const _match = (prop) =>
                _format(String(_.get(l, `${prop}`))).match(search);

            return (
                _match("year") ||
                _match("genotype") ||
                _match("phenotype") ||
                _match("washer") ||
                _match("creator.name") ||
                _match("creator.code")
            );
        });
    }

    escape(value) {
        if (!value || typeof value != "string") return null;

        return new RegExp(
            value
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
            "i"
        );
    }

    onClearSearch() {
        this.searchActive = false;

        this.document.search = null;

        this.birdsList = this.birdsListBackup;
    }

    onOpenDialogDelete(bird) {
        const dialogRef = this.dialog.open(BirdFormDeleteComponent, {
            data: { name: "Remover", bird }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.birdsList = this.birdsList.filter(
                    (s) => s._id != result._id
                );

                this.birdsListBackup = this.birdsListBackup.filter(
                    (s) => s._id != result._id
                );
            }
        });
    }
}
