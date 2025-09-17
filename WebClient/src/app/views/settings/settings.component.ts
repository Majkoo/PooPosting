import { Component, inject, Renderer2 } from '@angular/core';
import { SettingOptionComponent } from 'src/app/shared/components/setting-option/setting-option.component';
import { SwitchBtnComponent } from "../../shared/components/switch-btn/switch-btn.component";
import { EasterEggComponent } from "../../shared/components/easter-egg/easter-egg.component";
import { AuthService } from 'src/app/services/api/account/auth.service';
import { CommonModule } from '@angular/common';
import { SettingsService } from 'src/app/services/api/settings/settings.service';

@Component({
  selector: 'pp-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [SettingOptionComponent, SwitchBtnComponent, EasterEggComponent, CommonModule]
})
export class SettingsComponent {
  testSetting: boolean = false
  isModeratororAdmin: boolean | undefined;
  
  private renderer = inject(Renderer2);
  private authService = inject(AuthService);
  settingsService = inject(SettingsService);

  ngOnInit() {
    this.isModeratororAdmin = this.authService.isModeratororAdmin;
  }

  changeTheme(){
    this.settingsService.getDarkModeSetting() ? 
            this.renderer.addClass(document.body, 'dark') : 
            this.renderer.removeClass(document.body, 'dark')
            
  }
}
