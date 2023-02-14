import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bhaai } from "src/api/types/BhaaiList";

@Component({
    selector: 'app-bhaai-edit',
    styleUrls: ['./edit-bhaai.component.scss'],
    templateUrl: './edit-bhaai.component.html',
})
export class EditBhaaiComponent {
    constructor(
        public dialogRef: MatDialogRef<EditBhaaiComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Bhaai,
    ) {}

    onNoClick(status: boolean): void {
        this.dialogRef.close(status ? this.data : null);
    }
}