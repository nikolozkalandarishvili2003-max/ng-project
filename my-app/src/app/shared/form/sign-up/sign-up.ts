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
    phoneNumber: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    role: 'user',
  };
  onsubmit() {
    this.http
      .post('https://rentcar.stepprojects.ge/api/Users/register', this.signupdata)
      .subscribe({
        next: () => {
          localStorage.setItem('phoneNumber', this.signupdata.phoneNumber);
          this.router.navigateByUrl('/form');
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
