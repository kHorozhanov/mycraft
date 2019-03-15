import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { environment } from '../environments/environment';
import { AuthDialogModule } from './_dialogs/auth/auth-dialog.module';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { StatusComponent } from './components/status/status.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {
      paramsInheritanceStrategy: 'always',
      initialNavigation: 'enabled',
    }),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserModule.withServerTransition({ appId: 'mycraft-app' }),
    TransferHttpCacheModule,
    AuthDialogModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StatusComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
