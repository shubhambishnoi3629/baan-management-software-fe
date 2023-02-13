import {Component, AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {of as observableOf, Subject} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { Baan } from 'src/api/types/BaanList';
import { BhaaiTotal } from 'src/api/types/BhaaiTotal';
import { ApiService } from 'src/services/api.service';
import { EditBaanComponent } from './edit/edit-baan.component';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-baan',
  styleUrls: ['./baan.component.scss'],
  templateUrl: './baan.component.html',
})
export class BaanComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'fathersName', 'village', 'amount', 'actions'];
  data: Baan[] = [];

  isLoadingResults = true;

  loadAgain = new Subject();

  bhaaiId: string;

  bhaai: BhaaiTotal = {} as any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    this.bhaaiId = this.route.snapshot.paramMap.get('id') as string;
    this.loadAgain
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.apiService!.getBaanList(this.bhaaiId).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          this.isLoadingResults = false;

          if (data === null) {
            return [];
          }

          return data.map((item, index) => ({ ...item, index }));
        }),
      )
      .subscribe(data => (this.data = data));
    this.apiService.getBhaai(this.bhaaiId, true).subscribe((result) => {
      this.bhaai = result;
    });
  }

  createBaan() {
    const dialogRef = this.dialog.open(EditBaanComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.apiService.createBaan(this.bhaaiId, result).subscribe(() => {
        this.loadAgain.next({});
        this._snackBar.open('Baan has been added', 'close');
      });
    });
  }

  editBaan(baan: Baan) {
    const dialogRef = this.dialog.open(EditBaanComponent, {
      data: baan,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.apiService.updateBaan(result.id, this.bhaaiId, result).subscribe(() => {
        this.loadAgain.next({});
        this._snackBar.open('Bhaai has been updated', 'close');
      });
    });
  }

  deleteBaan(baanId: string) {
    this.apiService.deleteBaan(baanId, this.bhaaiId).subscribe(() => {
      this.loadAgain.next({});
      this._snackBar.open('Bhaai has been deleted', 'close');
    })
  }

  ngAfterViewInit() {
    this.loadAgain.next({});
  }
}
