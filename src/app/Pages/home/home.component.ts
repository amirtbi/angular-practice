import { Component } from '@angular/core';
import { IProduct } from '../../../core/product.interface';
import { AppProductCard } from '../../components/app-product-card/app-product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppProductCard],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class AppHome {
  products: IProduct[] = [
    {
      id: 1,
      title: 'Product A',
      subtitle: 'subtitle',
      description: 'Product A description',
      image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
    },
    {
      id: 2,
      title: 'Product B',
      subtitle: 'Premium Edition',
      description:
        'Product B description with enhanced features and premium support.',
      image: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
    },
    {
      id: 3,
      title: 'Product C',
      subtitle: 'Budget Friendly',
      description:
        'Product C description, an affordable option for everyday use.',
      image: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp',
    },
    {
      id: 4,
      title: 'Product D',
      subtitle: 'New Arrival',
      description: 'Product D description, the latest addition to our lineup.',
      image: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp',
    },
    {
      id: 5,
      title: 'Product E',
      subtitle: 'Best Seller',
      description:
        'Product E description, our most popular product among customers.',
      image: 'https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp',
    },
    {
      id: 6,
      title: 'Product F',
      subtitle: 'Limited Edition',
      description: 'Product F description, available for a limited time only.',
      image: 'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp',
    },
  ];
}
