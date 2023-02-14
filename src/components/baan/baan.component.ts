import {Component, AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {of as observableOf, of, Subject} from 'rxjs';
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
    private router: Router,
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
    this.apiService.getBhaai(this.bhaaiId, true)
    .pipe(
      catchError(() => {
        this.apiService.accessToken = null;
        this.router.navigate(['login']);

        return of({} as any);
      })
    )
    .subscribe((result) => {
      this.bhaai = result;
    });
  }

  createBaan() {
    const dialogRef = this.dialog.open(EditBaanComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.createBaan(this.bhaaiId, result).subscribe(() => {
          this.loadAgain.next({});
          this._snackBar.open('Baan has been added', 'close',  { duration: 2000 });
        });
      }
    });
  }

  editBaan(baan: Baan) {
    const dialogRef = this.dialog.open(EditBaanComponent, {
      data: baan,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.updateBaan(result._id, this.bhaaiId, result).subscribe(() => {
          this.loadAgain.next({});
          this._snackBar.open('Baan has been updated', 'close',  { duration: 2000 });
        });
      }
    });
  }

  deleteBaan(baanId: string) {
    this.apiService.deleteBaan(baanId, this.bhaaiId).subscribe(() => {
      this.loadAgain.next({});
      this._snackBar.open('Baan has been deleted', 'close',  { duration: 2000 });
    })
  }

  ngAfterViewInit() {
    this.loadAgain.next({});
  }
}
