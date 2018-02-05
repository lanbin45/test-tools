import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
// import { SettingComponent } from './setting/setting.component';
import { CommonService } from './services/common-service.service';
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import { ProtocolDetailsComponent } from './protocol-details/protocol-details.component';

@NgModule({
  declarations: [
    AppComponent,
    // SettingComponent,
    ProtocolDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [CommonService,NzMessageService, NzModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
