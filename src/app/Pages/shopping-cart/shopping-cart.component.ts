import { Component, computed, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { CartService, ICart } from "../../../core/services/cart-service";
import { HighlightDirective } from "../../directives/app-highlight.directive";
import { AppTooltip } from "../../directives/app-tooltip.directive";

@Component({
    selector: "app-shopping-cart-page",
    templateUrl: "./shopping-cart.component.html",
    styleUrl: "./shopping-cart.component.css",
    standalone: true,
    imports: [MatCardModule, MatButtonModule, HighlightDirective, AppTooltip],
})
export class ShoppingCart {
    cartService = inject(CartService);
    cartItems = this.cartService.cartItems;
    itemCount = computed(() =>
        this.cartItems().reduce((total, item) => total + item.amount, 0)
    );

    totalPrice = computed(()=>{
        return this.cartItems().reduce((total:number,item:ICart)=>total + item.product.price*item.amount,0)
    })

    onClick(value:string){
        alert(value)
    }
}
