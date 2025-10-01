import { Component } from '@angular/core';

@Component({
  selector: 'pp-nav',
  template: `
    <nav class="pp-shadow">

      <div class="nav cont">
        <a
          class="icon icon-home nav-link"
          routerLinkActive="link-active"
          routerLink=""
          [routerLinkActiveOptions]="{ exact: true }"
        >
        </a>

        <a
          class="icon icon-trending nav-link"
          routerLinkActive="link-active"
          routerLink="/trending"
        >
        </a>

        <a
          class="icon icon-heart--filled nav-link"
          routerLinkActive="link-active"
          routerLink="/liked"
        >
        </a>

        <a
          class="icon icon-add nav-link"
          routerLinkActive="link-active"
          routerLink="/add-post"
        >
        </a>

        <a
          class="icon icon-search nav-link"
          routerLinkActive="link-active"
          routerLink="/search"
        >
        </a>

        <a
          class="icon icon-setting nav-link"
          routerLinkActive="link-active"
          routerLink="/settings"
        >
        </a>
      </div>

    </nav>
  `,
  styles: [`
    nav {
      @apply
      bottom-0 fixed w-full z-30 bg-grayscale-50 dark:bg-dark-grayscale-50 px-md
      rounded-t-xl
    }
    .nav {
      @apply
      h-full w-full sticky
      flex flex-row items-center justify-around
      w-full h-14 fixed
    }
    .nav-link {
      @apply
      sm:w-full sm:flex sm:w-max sm:h-full
      sm:px-sm sm:py-sm
    }
  `]
})
export class NavComponent {

}
