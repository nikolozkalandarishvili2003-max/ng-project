import { Component, signal , OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Home } from './shared/home/home';
import { About } from './shared/about/about';
import { Thematic } from './shared/thematic/thematic';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Home, About, Thematic],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('my-app');

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      once: true
    });
  }
}