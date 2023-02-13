import {Component, AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {of as observableOf, Subject} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { BaanList } from 'src/api/types/BaanList';
import { Bhaai } from 'src/api/types/BhaaiList';
import { ApiService } from 'src/services/api.service';
import { EditBaanComponent } from '../baan/edit/edit-baan.component';
import { EditBhaaiComponent } from './edit/edit-bhaai.component';
import { SearchBaanComponent } from './searchresult/search-baan.component';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-bhaai',
  styleUrls: ['./bhaai.component.scss'],
  templateUrl: './bhaai.component.html',
})
export class BhaaiComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'marriage', 'date', 'edit', 'delete', 'open'];
  data: Bhaai[] = [];

  isLoadingResults = true;

  loadAgain = new Subject();

  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    this.loadAgain
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.apiService!.getBhaaiList().pipe(catchError(() => observableOf(null)));
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
  }

  openBhaai(bhaaiId: string) {
    this.router.navigate([`/bhaai/${bhaaiId}/baan`]);
  }

  createBhaai() {
    const dialogRef = this.dialog.open(EditBhaaiComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.apiService.createBhaai(result).subscribe(() => {
        this.loadAgain.next({});
        this._snackBar.open('Bhaai has been created', 'close');
      });
    });
  }

  search() {
    const dialogRef = this.dialog.open(EditBaanComponent, {
      data: {
        search: true,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.apiService.searchBaan(result).subscribe(() => {
        this.openSearchResult(result);
      });
    });
  }

  openSearchResult(data: BaanList) {
    const dialogRef = this.dialog.open(SearchBaanComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.giveBaan(result.bhaaiId, result.amount).subscribe(() => {
          this.loadAgain.next({});
          this._snackBar.open('New baan has been added', 'close');
        });
      }
    });
  }

  editBhaai(bhaai: Bhaai) {
    const dialogRef = this.dialog.open(EditBhaaiComponent, {
      data: bhaai,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.apiService.updateBhaai(result.id, result).subscribe(() => {
        this.loadAgain.next({});
        this._snackBar.open('Bhaai has been updated', 'close');
      });
    });
  }

  deleteBhaai(bhaaiId: string) {
    this.apiService.deleteBhaai(bhaaiId).subscribe(() => {
      this.loadAgain.next({});
      this._snackBar.open('Bhaai has been deleted', 'close');
    })
  }

  ngAfterViewInit() {
    this.loadAgain.next({});
  }
}
