import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../../services/car';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-thematic',
  imports: [CommonModule, RouterLink],
  templateUrl: './thematic.html',
  styleUrl: './thematic.css',
})
export class Thematic {
  private carService = inject(Car);

  purchasedCars = signal<any[]>([]);
  isLoading = signal(true);
  hasError = signal(false);

  ngOnInit() {
    const phoneNumber = localStorage.getItem('phoneNumber');
    if (!phoneNumber) {
      this.isLoading.set(false);
      this.hasError.set(true);
      return;
    }
    this.carService.getPurchasedCars(phoneNumber).subscribe({
      next: (data: any) => {
        console.log(data);
        this.purchasedCars.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }
  removeCar(carId: number) {
    this.purchasedCars.update((cars) => cars.filter((car) => car.carId !== carId));
  }
  userName =
    localStorage.getItem('firstName') !== null && localStorage.getItem('firstName') !== 'null'
      ? (localStorage.getItem('firstName') ?? '') + ' ' + (localStorage.getItem('lastName') ?? '')
      : 'Please Log In';

  phoneNumber = localStorage.getItem('phoneNumber') ?? '';
  private router = inject(Router);
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/form');
  }
  isLoggedIn = localStorage.getItem('phoneNumber') !== null;
}
