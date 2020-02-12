import {NgZorroAntdModule, NzNotificationModule} from 'ng-zorro-antd';
import * as AllIcons from '@ant-design/icons-angular/icons';
import {NgModule} from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import {NzMenuModule, NzButtonModule} from 'ng-zorro-antd';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd';
import { NzGridModule } from 'ng-zorro-antd';
import {NavbarComponent} from './navbar/navbar.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => {
  return  antDesignIcons[key];
  });
@NgModule({
  imports: [NzMenuModule, NzIconModule, NzDrawerModule , NzButtonModule, NzGridModule , NzNotificationModule],
  exports: [NzMenuModule, NzIconModule, NzDrawerModule , NzButtonModule, NzGridModule, NzNotificationModule],
  providers: [
    {
      provide: NZ_ICONS,
      useValue: icons
    }]
})

export class AntNgModules {
}
