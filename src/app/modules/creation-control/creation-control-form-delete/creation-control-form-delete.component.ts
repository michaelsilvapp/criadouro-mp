import _ from "lodash";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreationControlService } from "../../../services/creation-control/creation-control.service";

export interface DialogData {
    name: string;
    posture?: any;
}

@Component({
    selector: "creation-control-form-delete",
    templateUrl: "./creation-control-form-delete.component.html"
})
export class CreationControlFormDeleteComponent implements OnInit {
    public CreationControlService: CreationControlService;

    public loading: boolean;

    constructor(
        public dialogRef: MatDialogRef<CreationControlFormDeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private creationControlService: CreationControlService
    ) {}

    async ngOnInit() {
        this.loading = true;

        this.loading = false;
    }

    async onRemove() {
        this.loading = true;

        const r = await this.creationControlService.delete({
            _id: this.data.posture._id
        });

        if (_.get(r, "result")) {
            this.dialogRef.close({
                _id: this.data.posture._id
            });
        }

        this.loading = false;
    }
}
