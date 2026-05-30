import { HttpClient } from '@angular/common/http';
import { Component, inject, afterEveryRender } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contact = {
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Message: '',
  };
  private http = inject(HttpClient);
  sendmsg() {
    this.http
      .post('https://nikolozzz.app.n8n.cloud/webhook-test/contact-form', this.contact)
      .subscribe();
  }
  subscribe() {
    this.http
      .post('https://nikolozzz.app.n8n.cloud/webhook-test/10dbb2cd-a67d-4356-97ff-009b4d3565ae', {
        email: this.contact.Email,
      })
      .subscribe();
  }
}
