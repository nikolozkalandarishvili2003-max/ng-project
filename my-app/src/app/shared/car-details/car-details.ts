import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../services/car';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './car-details.html',
  styleUrl: './car-details.css',
})
export class CarDetails {
  private route = inject(ActivatedRoute);
  private carService = inject(Car);

  car = signal<any>(null);
  isLoading = signal(true);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carService.getCarById(+id).subscribe({
        next: (res) => {
          this.car.set(res);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });
    }
  }

  rentCar() {
    const phoneNumber = localStorage.getItem('phoneNumber');
    if (!phoneNumber) {
      alert('Please log in!');
      return;
    }
    this.carService.purchaseCar(phoneNumber, this.car().id).subscribe({
      next: () => alert('Added!'),
      error: () => alert('Error!'),
    });
  }
}
