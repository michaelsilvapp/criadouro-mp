import { Component, Inject, OnInit } from "@angular/core";
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from "@angular/material/dialog";

export interface DialogData {
    name: string;
    bird?: any;
    ganders: string[];
}

@Component({
    selector: "birds-form",
    templateUrl: "./birds-form.component.html"
})
export class BirdFormComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<BirdFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        console.log(this.data);
    }

    ngOnInit(): void {}
}
