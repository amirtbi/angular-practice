import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AuthService } from "../../../core/services/auth-service";
import { AppShoppingCart } from "../app-shopping-cart.component/app-shopping-cart.component";
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: "app-header",
    templateUrl: "./app-header.component.html",
    styleUrl: "./app-header.component.css",
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, AppShoppingCart, RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppHeader {
    authService = inject(AuthService);
    router = inject(Router);


    goToLoginPage() {
        this.router.navigate(['/authentication']);
    }

    logout() {
        this.authService.logOut();
    }
}
