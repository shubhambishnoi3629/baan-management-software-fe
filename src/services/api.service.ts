import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bhaai, BhaaiBase, BhaaiList } from 'src/api/types/BhaaiList';
import { Observable, of, tap } from 'rxjs';
import { Baan, BaanBase } from 'src/api/types/Baan';
import { BaanList } from 'src/api/types/BaanList';
import { BhaaiTotal } from 'src/api/types/BhaaiTotal';
import { AccessToken } from 'src/api/types/AccessToken';
import { CustomerBase } from 'src/api/types/Customer';

@Injectable({providedIn: 'root'})
export class ApiService {
    baseURL = 'http://localhost:3000/api';
    accessToken: string | null = null;
    constructor(
        private http: HttpClient,
    ) { }

    getHeaders() {
        return { 
            headers: { 
                authorization: `Bearer ${this.accessToken}`,
            },
        };
    }

    login(
        loginData: CustomerBase,
    ): Observable<AccessToken> {
        return this.http.post<AccessToken>(`${this.baseURL}/auth/login`, loginData).pipe(
            tap((data: AccessToken) => {
                this.accessToken = data.access_token;
            }),
        );
    }

    signup(
        signupData: CustomerBase,
    ): Observable<AccessToken> {
        return this.http.post<AccessToken>(`${this.baseURL}/auth/signup`, signupData);
    }

    getBhaaiList(): Observable<BhaaiList> {
        return this.http.get<BhaaiList>(`${this.baseURL}/bhaai`, this.getHeaders());
    }

    createBhaai(
        bhaai: BhaaiBase
    ): Observable<Bhaai> {
        return this.http.post<Bhaai>(`${this.baseURL}/bhaai`, bhaai, this.getHeaders());
    }

    updateBhaai(
        id: string,
        bhaai: BhaaiBase
    ): Observable<Bhaai> {
        return this.http.put<Bhaai>(`${this.baseURL}/bhaai/${id}`, bhaai, this.getHeaders());
    }

    deleteBhaai(
        id: string,
    ): Observable<void> {
        return this.http.delete<void>(`${this.baseURL}/bhaai/${id}`, this.getHeaders());
    }

    getBhaai(
        id: string,
        total: boolean = false,
    ): Observable<BhaaiTotal> {
        return this.http.get<BhaaiTotal>(`${this.baseURL}/bhaai/${id}?total=${total ? 1 : 0}`, this.getHeaders());
    }

    getBaanList(
        bhaaiId: string,
    ): Observable<BaanList> {
        return this.http.get<BaanList>(`${this.baseURL}/bhaai/${bhaaiId}/baan`, this.getHeaders());
    }

    createBaan(
        bhaaiId: string,
        baan: BaanBase
    ): Observable<Baan> {
        return this.http.post<Baan>(`${this.baseURL}/bhaai/${bhaaiId}/baan`, baan, this.getHeaders());
    }

    updateBaan(
        id: string,
        bhaaiId: string,
        baan: BaanBase
    ): Observable<Baan> {
        return this.http.put<Baan>(`${this.baseURL}/bhaai/${bhaaiId}/baan/${id}`, baan, this.getHeaders());
    }

    deleteBaan(
        id: string,
        bhaaiId: string,
    ): Observable<void> {
        return this.http.delete<void>(`${this.baseURL}/bhaai/${bhaaiId}/baan/${id}`, this.getHeaders());
    }

    searchBaan(
        baan: BaanBase,
    ): Observable<BaanList> {
        const queryParams = Object.keys(baan).map((key) => (`${key}=${this.getValue(baan, key)}`)).join('&');
        return this.http.get<BaanList>(`${this.baseURL}/search?${queryParams}`, this.getHeaders());
    }

    giveBaan(
        baanId: string,
        amount: number,
    ): Observable<Baan> {
        return this.http.post<Baan>(`${this.baseURL}/giveBaan`, {
            amount,
            baanId,
        }, this.getHeaders());
    }

    getValue(obj: any, key: string) {
        return obj[key];
    }
    
}