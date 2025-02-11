import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Policy } from '../interface/policy';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrl = 'http://localhost:8080/api/data';
  private txapiUrl = 'http://localhost:8080/api/txlife'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getContracts(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.txapiUrl);
  }
}