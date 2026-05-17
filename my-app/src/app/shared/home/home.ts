import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from '../../services/car';
import { HttpParams } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
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

  capacity = signal('');
  startYear = signal('');
  endYear = signal('');
  city = signal('');

  filteredList = signal<any[]>([]);
  isFiltered = signal(false);

  onFilter() {
    this.isLoading.set(true);
    this.carService
      .filterCars(
        this.capacity() ? +this.capacity() : undefined,
        this.startYear() ? +this.startYear() : undefined,
        this.endYear() ? +this.endYear() : undefined,
        this.city() || undefined,
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          const list = Array.isArray(res) ? res : (res.items ?? res.data ?? res.cars ?? []);
          this.filteredList.set(list);
          this.isFiltered.set(true);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
          this.hasError.set(true);
        },
      });
  }

  onReset() {
    this.capacity.set('');
    this.startYear.set('');
    this.endYear.set('');
    this.city.set('');
    this.isFiltered.set(false);
  }

  get displayList() {
    return this.isFiltered() ? this.filteredList() : this.productsList();
  }

  rentCar(carId: number) {
    const phoneNumber = localStorage.getItem('phoneNumber');
    if (!phoneNumber) {
      alert('Please log in!');
      return;
    }
    this.carService.purchaseCar(phoneNumber, carId).subscribe({
      next: () => alert('Added!'),
      error: () => alert('Error!'),
    });
  }
}
