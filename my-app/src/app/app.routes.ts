import { Routes } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Home } from './shared/home/home';
import { About } from './shared/about/about';
import { Contact } from './shared/contact/contact';
import { Thematic } from './shared/thematic/thematic';
import { Form } from './shared/form/form';
import { SignUp } from './shared/form/sign-up/sign-up';
import { Eror404 } from './shared/eror-404/eror-404';
import { AddCar } from './shared/add-car/add-car';
import { CarDetails } from './shared/car-details/car-details';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Header', component: Header },
  { path: 'Footer', component: Footer },
  { path: 'Home', component: Home },
  { path: 'About', component: About },
  { path: 'Contact', component: Contact },
  { path: 'thematic', component: Thematic },
  { path: 'form', component: Form },
  { path: 'sign-up', component: SignUp },
  { path: 'add-car', component: AddCar },
  { path: 'car/:id', component: CarDetails },
  { path: '**', component: Eror404 },
];
