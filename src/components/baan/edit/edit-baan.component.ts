import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Baan } from "src/api/types/BaanList";

@Component({
    selector: 'app-baan-edit',
    styleUrls: ['./edit-baan.component.scss'],
    templateUrl: './edit-baan.component.html',
})
export class EditBaanComponent {
    constructor(
        public dialogRef: MatDialogRef<EditBaanComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Baan & { search: boolean },
    ) {}

    onNoClick(status: boolean): void {
        this.dialogRef.close(status ? this.data : null);
    }
}