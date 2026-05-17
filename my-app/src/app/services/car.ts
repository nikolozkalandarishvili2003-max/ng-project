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
  filterCars(capacity?: number, startYear?: number, endYear?: number, city?: string) {
    let params: any = { pageIndex: 1, pageSize: 100 };

    if (capacity) params['capacity'] = capacity;
    if (startYear) params['startYear'] = startYear;
    if (endYear) params['endYear'] = endYear;
    if (city) params['city'] = city;

    return this.http.get<any>('https://rentcar.stepprojects.ge/api/Car/filter', { params });
  }
  addCar(formData: FormData) {
    return this.http.post('https://rentcar.stepprojects.ge/api/Car', formData);
  }
}
