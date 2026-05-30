import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Car } from '../../services/car';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private http = inject(HttpClient);
  private carService = inject(Car);

  isLoading = signal(true);
  hasError = signal(false);

  productsList = signal<any[]>([]);
  pageIndex = signal(1);
  pageSize = 15;
  totalPages = signal(1);

  capacity = signal('');
  startYear = signal('');
  endYear = signal('');
  city = signal('');
  filteredList = signal<any[]>([]);
  isFiltered = signal(false);
  filterPage = signal(1);
  filterTotalPages = signal(1);
  filterPageSize = 12;

  constructor() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.isLoading.set(true);
    this.pageIndex.set(page);
    this.carService.getPaginatedCars(page, this.pageSize).subscribe({
      next: (res: any) => {
        const list = (res.data ?? []).filter((car: any) => car.brand !== null);
        this.productsList.set(list);
        this.totalPages.set(res.totalPages ?? 1);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      },
    });
  }

  onFilter(page: number = 1) {
    this.isLoading.set(true);
    this.filterPage.set(page);
    this.carService
      .filterCars(
        this.capacity() ? +this.capacity() : undefined,
        this.startYear() ? +this.startYear() : undefined,
        this.endYear() ? +this.endYear() : undefined,
        this.city() || undefined,
        page,
        this.filterPageSize,
      )
      .subscribe({
        next: (res: any) => {
          const list = Array.isArray(res) ? res : (res.items ?? res.data ?? res.cars ?? []);
          const total = res.totalPages ?? 1;
          this.filteredList.set(list);
          this.filterTotalPages.set(total);
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
    this.loadPage(1);
  }

  get displayList() {
    return this.isFiltered() ? this.filteredList() : this.productsList();
  }

  get pages() {
    const current = this.pageIndex();
    const total = this.totalPages();
    const start = Math.max(1, current - 2);
    const end = Math.min(total, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  get filterPages() {
    const current = this.filterPage();
    const total = this.filterTotalPages();
    const start = Math.max(1, current - 2);
    const end = Math.min(total, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  rentCar(carId: number) {
    const phoneNumber = localStorage.getItem('phoneNumber');
    if (!phoneNumber) {
      alert('Please log in!');
      return;
    }
    this.carService.purchaseCar(phoneNumber, carId).subscribe({
      next: () => {
        alert('Added!');
        this.sendRentalEmail(phoneNumber, carId);
      },
      error: () => alert('Error!'),
    });
  }
  sendRentalEmail(phoneNumber: string, carId: number) {
    const webhookUrl =
      'https://nikolozzz.app.n8n.cloud/webhook-test/dd95cea9-002a-4153-97da-b3f6b92b9cdc';
    this.http.post(webhookUrl, { phoneNumber, carId }).subscribe({
      next: () => console.log('Email გაგზავნილია'),
      error: (err) => console.error('Email error:', err),
    });
  }
}
