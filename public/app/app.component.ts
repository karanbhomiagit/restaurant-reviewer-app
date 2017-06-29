import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <nav>
      <header class="page-header">
          <div class="wrapper">
              <a class="page-title" routerLink="/restaurants" routerLinkActive="active">Restaurants</a>
          </div>
      </header>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
