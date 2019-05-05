import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private httpClient: HttpClient) { }

  public uploadSchema() {

  }
}
