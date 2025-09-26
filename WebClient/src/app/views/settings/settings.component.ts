import { Component, inject, Renderer2 } from '@angular/core';
import { SettingOptionComponent } from 'src/app/shared/components/setting-option/setting-option.component';
import { SwitchBtnComponent } from "../../shared/components/switch-btn/switch-btn.component";
import { EasterEggComponent } from "../../shared/components/easter-egg/easter-egg.component";
import { AuthService } from 'src/app/services/api/account/auth.service';
import { CommonModule } from '@angular/common';
import { SettingsService } from 'src/app/services/api/settings/settings.service';
import { TagInputComponent } from "../../shared/components/tag-input/tag-input.component";
import { NavigationStart, Router } from '@angular/router';
import { AccountService } from 'src/app/services/api/account/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pp-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [SettingOptionComponent, SwitchBtnComponent, EasterEggComponent, CommonModule, TagInputComponent]
})
export class SettingsComponent {
  tags: string[] = [];
  testSetting: boolean = false
  isModeratororAdmin: boolean | undefined;
  private routerChange!: Subscription;
  private renderer = inject(Renderer2);
  private accountService = inject(AccountService);
  private authService = inject(AuthService);
  private router = inject(Router);
  settingsService = inject(SettingsService);

  ngOnInit() {
    this.isModeratororAdmin = this.authService.isModeratororAdmin;
    this.routerChange = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && this.tags.length > 0) {
        this.accountService.changeSetTags(this.tags).pipe().subscribe();
      }
    });
  }

  changeTheme(){
    this.settingsService.getDarkModeSetting() ? 
            this.renderer.addClass(document.body, 'dark') : 
            this.renderer.removeClass(document.body, 'dark')
            
  }

  ngOnDestroy() {
    this.routerChange.unsubscribe();
  }
}
