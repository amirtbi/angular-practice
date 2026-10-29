import { Component,signal,inject } from "@angular/core";
import { AuthService } from "../../../core/services/auth-service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {MatInputModule} from "@angular/material/input"
import {MatFormFieldModule} from "@angular/material/form-field"
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Router } from "@angular/router";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule,MatCardModule],
})
export class AppAuthentication {
  authService = inject(AuthService);
  router = inject(Router);
  submitting = signal(false);

  useForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.required],
    }),
    phoneNumber:new FormControl("",{
        nonNullable:true,
        validators:[Validators.required]
    })
  });

  submit() {
    if (this.useForm.invalid || this.submitting()) return;

    const { username, email, phoneNumber } = this.useForm.getRawValue();

    this.submitting.set(true);
    this.authService.login({ name: username, email, phoneNumber }).then(() => {
      this.submitting.set(false);
      this.router.navigateByUrl('/');
    });
  }
}