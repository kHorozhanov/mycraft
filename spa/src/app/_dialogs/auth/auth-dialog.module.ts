import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { AuthDialogComponent } from './auth-dialog.component';
import { SignInComponent } from './components/sign-in.component';
import { AuthApiService } from './services/auth-api.service';
import { AuthDialogService } from './services/auth-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AuthDialogComponent,
    SignInComponent
  ],
  entryComponents: [AuthDialogComponent],
  providers: [
    AuthDialogService,
    AuthApiService
  ],
})
export class AuthDialogModule {
}
