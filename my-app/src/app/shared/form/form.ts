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
    email: '',
    password: '',
  };
  private http = inject(HttpClient);
  private router = inject(Router);

  onsubmit() {
    this.http.post('https://api.everrest.educata.dev/auth/sign_in', this.signindata).subscribe({
      next: (data: any) => {
        (localStorage.setItem('access_token', data.access_token),
          localStorage.setItem('refresh_token', data.refresh_token));
        this.router.navigateByUrl('/');
      },
    });
  }
}
