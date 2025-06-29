import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { Product } from '@models/product.model';
import { HeaderComponent, HeaderMenuAction } from '../shared/header/header.component';
import { PaginationComponent, PaginationInfo } from '../shared/pagination/pagination.component';
import * as ProductsActions from '@store/products/products.actions';
import * as FavoritesActions from '@store/favorites/favorites.actions';
import * as AuthActions from '@store/auth/auth.actions';
import { 
  selectProductsWithFavoriteFlag, 
  selectProductsLoading, 
  selectProductsError,
  selectProductsPagination,
  selectUser 
} from '@store/selectors';
import { User } from '@models/user.model';

interface ProductWithFavorite extends Product {
  isFavorite: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    PaginationComponent
  ],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  productsWithFavorites$: Observable<ProductWithFavorite[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  user$: Observable<User | null>;
  pagination$: Observable<PaginationInfo>;
  
  headerMenuActions: HeaderMenuAction[] = [
    {
      label: 'Favorites',
      icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg>',
      action: 'favorites'
    },
    {
      label: 'Logout',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>',
      action: 'logout'
    }
  ];

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.productsWithFavorites$ = this.store.select(selectProductsWithFavoriteFlag);
    this.isLoading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);
    this.user$ = this.store.select(selectUser);
    this.pagination$ = this.store.select(selectProductsPagination);
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.store.dispatch(ProductsActions.loadProducts({ 
      pagination: { page: 1, limit: 12 } 
    }));
  }

  toggleFavorite(product: ProductWithFavorite) {
    if (product.isFavorite) {
      this.store.dispatch(FavoritesActions.removeFromFavorites({ productId: product.id }));
    } else {
      this.store.dispatch(FavoritesActions.addToFavorites({ productId: product.id }));
    }
  }

  onHeaderMenuAction(action: string) {
    switch (action) {
      case 'favorites':
        this.router.navigate(['/favorites']);
        break;
      case 'logout':
        this.store.dispatch(AuthActions.logout());
        break;
    }
  }

  onPageChanged(page: number) {
    this.store.dispatch(ProductsActions.setCurrentPage({ page }));
  }
} 