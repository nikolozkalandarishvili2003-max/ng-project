import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  signindata = {
    phoneNumber: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    role: 'user',
  };
  private http = inject(HttpClient);
  private router = inject(Router);

  onsubmit() {
    this.http.post('https://rentcar.stepprojects.ge/api/Users/login', this.signindata).subscribe({
      next: (data: any) => {
        (localStorage.setItem('access_token', data.token),
          localStorage.setItem('firstName', data.firstName),
          localStorage.setItem('lastName', data.lastName),
          localStorage.setItem('phoneNumber', this.signindata.phoneNumber));

        this.router.navigateByUrl('/');
      },
    });
  }
}
