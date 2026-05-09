import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  private http = inject(HttpClient);
  private router = inject(Router);

  signupdata = {
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    zipcode: '',
    avatar: '',
    gender: '',
  };
  onsubmit() {
    this.http.post('https://api.everrest.educata.dev/auth/sign_up', this.signupdata).subscribe({
      next: () => {
        this.router.navigateByUrl('/form');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
