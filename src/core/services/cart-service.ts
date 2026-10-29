import { Injectable, signal } from "@angular/core";
import { IProduct } from "../product.interface";

export interface ICart {
    product: IProduct;
    amount: number;
}

@Injectable({
    providedIn: "root",
})
export class CartService {
    private readonly items = signal<ICart[]>([]);
    readonly cartItems = this.items.asReadonly();


    addToCart(product: IProduct) {
        this.items.update(items => {
            const existing = items.find(item => item.product.id === product.id);
            if (!existing) return [...items, { product, amount: 1 }];
            return items.map(item =>
                item.product.id === product.id ? { ...item, amount: item.amount + 1 } : item
            );
        });
    }

    removeFromCart(productId: number) {
        this.items.update(items => {
            const existing = items.find(item => item.product.id === productId);
            if (!existing) return items;
            if (existing.amount <= 1) return items.filter(item => item.product.id !== productId);
            return items.map(item =>
                item.product.id === productId ? { ...item, amount: item.amount - 1 } : item
            );
        });
    }
}
