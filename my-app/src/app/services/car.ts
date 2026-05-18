import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class Car {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://rentcar.stepprojects.ge/api/Car';

  getCars() {
    return this.http.get<IProduct[]>(this.baseUrl);
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

  filterCars(
    capacity?: number,
    startYear?: number,
    endYear?: number,
    city?: string,
    pageIndex: number = 1,
    pageSize: number = 10,
  ) {
    let params: any = { pageIndex, pageSize };
    if (capacity) params['capacity'] = capacity;
    if (startYear) params['startYear'] = startYear;
    if (endYear) params['endYear'] = endYear;
    if (city) params['city'] = city;
    return this.http.get<any>(`${this.baseUrl}/filter`, { params });
  }

  addCar(formData: FormData) {
    return this.http.post(this.baseUrl, formData);
  }

  getPaginatedCars(pageIndex: number, pageSize: number = 10) {
    return this.http.get<any>(
      `${this.baseUrl}/paginated?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    );
  }

  getCarById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
