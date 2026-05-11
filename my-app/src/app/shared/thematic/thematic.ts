import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../../services/car';

@Component({
  selector: 'app-thematic',
  imports: [CommonModule],
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
}
