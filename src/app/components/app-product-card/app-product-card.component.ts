import { Component, inject, Input, output } from "@angular/core";
import {MatCardModule} from "@angular/material/card"
import {MatButtonModule} from "@angular/material/button"
import { IProduct } from "../../../core/product.interface";
import { AuthService } from "../../../core/services/auth-service";
import { CartService } from "../../../core/services/cart-service";

@Component({
    selector:"app-product-card",
    templateUrl:"./app-product-card.component.html",
    styleUrl:"./app-product-card.component.css",
    standalone:true,
    providers:[AuthService],
    imports:[MatCardModule,MatButtonModule]
})
export class AppProductCard{
    @Input() product!:IProduct

    cartService = inject(CartService);
    addProductToCard = output<string>()

    addProduct(product:IProduct){
        this.cartService.addToCart(product)
    }

    removeProductFromCart(productId:number){
        this.cartService.removeFromCart(productId)
    }
}