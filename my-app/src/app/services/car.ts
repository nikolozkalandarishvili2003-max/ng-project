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
  getPurchasedCars(phoneNumber: string) {
    return this.http.get(`https://rentcar.stepprojects.ge/Purchase/${phoneNumber}`);
  }
  purchaseCar(phoneNumber: string, carId: number, multiplier: number = 1) {
    return this.http.post(
      `https://rentcar.stepprojects.ge/Purchase/purchase?phoneNumber=${encodeURIComponent(phoneNumber)}&carId=${carId}&multiplier=${multiplier}`,
      {},
    );
  }
}
