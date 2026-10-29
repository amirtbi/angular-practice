import { Component, computed, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { CartService } from "../../../core/services/cart-service";

interface WindowData {
    title: string;
}

@Component({
    selector: "app-cart-window",
    templateUrl: "./app-cart-window.component.html",
    styleUrl: "./app-cart-window.component.css",
    imports: [MatDialogModule, MatCardModule, MatButtonModule],
    standalone: true,
})
export class AppCartWindow {
    private windowRef = inject(MatDialogRef<AppCartWindow>);
    data = inject<WindowData>(MAT_DIALOG_DATA);
    cartService = inject(CartService);
    cartItems = this.cartService.cartItems;

    itemCount = computed(() =>
        this.cartItems().reduce((total, item) => total + item.amount, 0)
    );

    totalPrice = computed(() =>
        this.cartItems().reduce((total, item) => total + item.product.price * item.amount, 0)
    );

    close() {
        this.windowRef.close();
    }
}
