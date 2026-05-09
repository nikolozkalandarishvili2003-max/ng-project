import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class Car {
  private http = inject(HttpClient);

  getCars() {
    return this.http.get<IProduct[]>('https://rentcar.stepprojects.ge/api/Car');
  }
}
