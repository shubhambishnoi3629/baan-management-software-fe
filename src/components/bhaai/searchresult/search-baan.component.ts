import {Component, AfterViewInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Baan, BaanList } from 'src/api/types/BaanList';
import { BhaaiTotal } from 'src/api/types/BhaaiTotal';
import { EditBaanComponent } from 'src/components/baan/edit/edit-baan.component';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-search-baan',
  styleUrls: ['./search-baan.component.scss'],
  templateUrl: './search-baan.component.html',
})
export class SearchBaanComponent {
  displayedColumns: string[] = ['id', 'name', 'fathersName', 'village', 'amount'];
  dataList: BaanList = [];

  bhaai: BhaaiTotal = {} as any;

  giveBaanAmount = 0;

  constructor(
    public dialogRef: MatDialogRef<EditBaanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BaanList,
  ) {
    this.dataList = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  giveBaan() {
    if (!this.giveBaan) {
      return;
    }

    this.dialogRef.close({
      bhaaiId: this.data[0]._id,
      amount: this.giveBaanAmount,
    });
  }
}
