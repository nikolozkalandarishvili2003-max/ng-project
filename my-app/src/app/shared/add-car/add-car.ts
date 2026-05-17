import { Component, inject, signal } from '@angular/core';
import { Car } from '../../services/car';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  imports: [FormsModule],
  templateUrl: './add-car.html',
  styleUrl: './add-car.css',
})
export class AddCar {
  private carService = inject(Car);
  private router = inject(Router);

  brand = signal('');
  model = signal('');
  year = signal('');
  price = signal('');
  capacity = signal('');
  transmission = signal('');
  createdBy = signal('');
  city = signal('');
  createdByEmail = signal('');
  fuelCapacity = signal('');

  image1: File | null = null;
  image2: File | null = null;
  image3: File | null = null;

  onFileChange(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (index === 1) this.image1 = file;
    if (index === 2) this.image2 = file;
    if (index === 3) this.image3 = file;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('Brand', this.brand());
    formData.append('Model', this.model());
    formData.append('Year', this.year());
    formData.append('Price', this.price());
    formData.append('Capacity', this.capacity());
    formData.append('Transmission', this.transmission());
    formData.append('CreatedBy', this.createdBy());
    formData.append('City', this.city());
    formData.append('CreatedByEmail', this.createdByEmail());
    formData.append('FuelCapacity', this.fuelCapacity());
    if (this.image1) formData.append('Image1', this.image1, this.image1.name);
    if (this.image2) formData.append('Image2', this.image2, this.image2.name);
    if (this.image3) formData.append('Image3', this.image3, this.image3.name);

    this.carService.addCar(formData).subscribe({
      next: () => {
        alert('მანქანა დაემატა!');
        this.router.navigate(['/Home']);
      },
      error: () => alert('შეცდომა!'),
    });
  }
}
