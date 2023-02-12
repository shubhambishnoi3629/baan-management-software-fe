import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bhaai, BhaaiBase, BhaaiList } from 'src/api/types/BhaaiList';
import { Observable, of } from 'rxjs';
import { Baan, BaanBase, BaanBaseKeys } from 'src/api/types/Baan';
import { BaanList } from 'src/api/types/BaanList';
import { BhaaiTotal } from 'src/api/types/BhaaiTotal';

@Injectable({providedIn: 'root'})
export class ApiService {
    baseURL = 'http://localhost:3000/api';
    constructor(
        private http: HttpClient,
    ) { }

    getBhaaiList(): Observable<BhaaiList> {
        return of([
            {
                id: 'asdasd-adsdasd-asdas-dasd233',
                marriage: 'Rankit weds Deepakshi',
                date: '2000-10-31T01:30:00.000-05:00'
            },
            {
                id: 'asdasd-adsdasd-asdas-dasd233',
                marriage: 'Rankit weds Deepakshi',
                date: '2000-10-31T01:30:00.000-05:00'
            },
            {
                id: 'asdasd-adsdasd-asdas-dasd233',
                marriage: 'Rankit weds Deepakshi',
                date: '2000-10-31T01:30:00.000-05:00'
            },
            {
                id: 'asdasd-adsdasd-asdas-dasd233',
                marriage: 'Rankit weds Deepakshi',
                date: '2000-10-31T01:30:00.000-05:00'
            },
            {
                id: 'asdasd-adsdasd-asdas-dasd233',
                marriage: 'Rankit weds Deepakshi',
                date: '2000-10-31T01:30:00.000-05:00'
            },
            {
                id: 'asdasd-adsdasd-asdas-dasd233',
                marriage: 'Rankit weds Deepakshi',
                date: '2000-10-31T01:30:00.000-05:00'
            },
            {
                id: 'asdasd-adsdasd-asdas-dasd233',
                marriage: 'Rankit weds Deepakshi',
                date: '2000-10-31T01:30:00.000-05:00'
            }
        ])
        return this.http.get<BhaaiList>(`${this.baseURL}/bhaai`);
    }

    createBhaai(
        bhaai: BhaaiBase
    ): Observable<Bhaai> {
        return this.http.post<Bhaai>(`${this.baseURL}/bhaai`, bhaai);
    }

    updateBhaai(
        id: string,
        bhaai: BhaaiBase
    ): Observable<Bhaai> {
        return this.http.put<Bhaai>(`${this.baseURL}/bhaai/${id}`, bhaai);
    }

    deleteBhaai(
        id: string,
    ): Observable<void> {
        return this.http.delete<void>(`${this.baseURL}/bhaai/${id}`);
    }

    getBhaai(
        id: string,
        total: boolean = false,
    ): Observable<BhaaiTotal> {
        return this.http.get<BhaaiTotal>(`${this.baseURL}/bhaai/${id}?total=${total ? 1 : 0}`);
    }

    getBaanList(
        bhaaiId: string,
    ): Observable<BaanList> {
        return this.http.get<BaanList>(`${this.baseURL}/bhaai/${bhaaiId}/baan`);
    }

    createBaan(
        bhaaiId: string,
        baan: BaanBase
    ): Observable<Baan> {
        return this.http.post<Baan>(`${this.baseURL}/bhaai/${bhaaiId}/baan`, baan);
    }

    updateBaan(
        id: string,
        bhaaiId: string,
        baan: BaanBase
    ): Observable<Baan> {
        return this.http.put<Baan>(`${this.baseURL}/bhaai/${bhaaiId}/baan/${id}`, baan);
    }

    deleteBaan(
        id: string,
        bhaaiId: string,
    ): Observable<void> {
        return this.http.delete<void>(`${this.baseURL}/bhaai/${bhaaiId}/baan/${id}`);
    }

    searchBaan(
        baan: BaanBase,
    ): Observable<void> {
        const queryParams = Object.keys(baan).map((key: unknown) => (`${key}=${baan[key as BaanBaseKeys]}`)).join('&');
        return this.http.delete<void>(`${this.baseURL}/search?${queryParams}`);
    }

    giveBaan(
        baanId: string,
        amount: number,
    ): Observable<Baan> {
        return this.http.post<Baan>(`${this.baseURL}/giveBaan`, {
            amount,
            baanId,
        });
    }
    
}