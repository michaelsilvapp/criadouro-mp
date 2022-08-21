import _ from "lodash";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BirdsService } from "../../../services/birds/birds.service";
export interface DialogData {
    name: string;
    bird?: any;
}

@Component({
    selector: "birds-form-delete",
    templateUrl: "./birds-form-delete.component.html"
})
export class BirdFormDeleteComponent implements OnInit {
    public BirdsService: BirdsService;

    public loading: boolean;

    constructor(
        public dialogRef: MatDialogRef<BirdFormDeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private birdsService: BirdsService
    ) {}

    async ngOnInit() {
        this.loading = true;

        this.loading = false;
    }

    async onRemove() {
        this.loading = true;

        const r = await this.birdsService.delete({
            _id: this.data.bird._id
        });

        if (_.get(r, "result")) {
            this.dialogRef.close({
                _id: this.data.bird._id
            });
        }

        this.loading = false;
    }
}
