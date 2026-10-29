import { Component, computed, inject, input } from "@angular/core";
import { CartService } from "../../../core/services/cart-service";
import { WindowService } from "../../../core/services/append-window.service";
import { AppCartWindow } from "../app-cart-window/app-cart-window.component";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './app-shopping-cart.component.html',
  styleUrl: './app-shopping-cart.component.css',
  standalone: true,
})
export class AppShoppingCart {
  private cartService = inject(CartService);


      windowService = inject(WindowService)

    openCartItemsWindow(){
        this.windowService.open(AppCartWindow, {
            width: "480px",
            maxWidth: "95vw",
            data: { title: "Shopping Cart" },
        })
    }

    
  readonly count = computed(() =>
    this.cartService.cartItems().reduce((total, item) => total + item.amount, 0)
  );
}
