import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Car } from '../../services/car';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private carService = inject(Car);

  isLoading = signal(true);
  hasError = signal(false);

  productsList = toSignal(
    this.carService.getCars().pipe(
      tap(() => this.isLoading.set(false)),
      catchError(() => {
        this.isLoading.set(false);
        this.hasError.set(true);
        return of([]);
      }),
    ),
    { initialValue: [] },
  );
  rentCar(carId: number) {
    const phoneNumber = localStorage.getItem('phoneNumber');
    if (!phoneNumber) {
      alert('Please log in!');
      return;
    }
    this.carService.purchaseCar(phoneNumber, carId).subscribe({
      next: () => alert('Added!'),
      error: () => alert('Eror!'),
    });
  }
}
