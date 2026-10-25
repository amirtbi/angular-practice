import { Component, computed, inject } from "@angular/core";
import { CartService } from "../../../core/services/cart-service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './app-shopping-cart.component.html',
  styleUrl: './app-shopping-cart.component.css',
  standalone: true,
})
export class AppShoppingCart {
  private cartService = inject(CartService);
  readonly count = computed(() =>
    this.cartService.cartItems().reduce((total, item) => total + item.amount, 0)
  );
}
