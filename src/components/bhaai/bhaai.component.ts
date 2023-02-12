import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';
import {merge, Observable, of as observableOf, of, Subject} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { Bhaai } from 'src/api/types/BhaaiList';
import { ApiService } from 'src/services/api.service';
import { EditBhaaiComponent } from './edit/edit-bhaai.component';

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
  isRateLimitReached = false;

  loadAgain = new Subject();

  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
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
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          return data.map((item, index) => ({ ...item, index }));
        }),
      )
      .subscribe(data => (this.data = data));
  }

  openBhaai(bhaaiId: string) {
    this.router.navigate([`/bhaai/${bhaaiId}`]);
  }

  createBhaai() {
    const dialogRef = this.dialog.open(EditBhaaiComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.apiService.createBhaai(result).subscribe(() => {
        this.loadAgain.next({});
      });
    });
  }

  editBhaai(bhaai: Bhaai) {
    const dialogRef = this.dialog.open(EditBhaaiComponent, {
      data: bhaai,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.apiService.updateBhaai(result.id, result).subscribe(() => {
        this.loadAgain.next({});
      });
    });
  }

  deleteBhaai(bhaaiId: string) {
    this.apiService.deleteBhaai(bhaaiId).subscribe(() => {
      this.loadAgain.next({});
    })
  }

  ngAfterViewInit() {
    this.loadAgain.next({});
  }
}
