import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Router } from '@angular/router';
import { Product } from '@models/product.model';
import { User } from '@models/user.model';
import { HeaderComponent } from '../shared/header/header.component';
import * as FavoritesActions from '@store/favorites/favorites.actions';
import * as AuthActions from '@store/auth/auth.actions';
import { selectFavoriteProducts, selectUser, selectFavoriteProductIds } from '@store/selectors';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnInit {
  displayedProducts: Product[] = [];
  currentFavoriteIds$: Observable<number[]>;
  user$: Observable<User | null>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.currentFavoriteIds$ = this.store.select(selectFavoriteProductIds);
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.store.select(selectFavoriteProducts).pipe(take(1)).subscribe(products => {
      this.displayedProducts = [...products];
    });
  }

  removeFromFavorites(productId: number) {
    this.store.dispatch(FavoritesActions.removeFromFavorites({ productId }));
  }

  addToFavorites(productId: number) {
    this.store.dispatch(FavoritesActions.addToFavorites({ productId }));
  }

  toggleFavorite(productId: number) {
    this.currentFavoriteIds$.pipe(take(1)).subscribe(ids => {
      if (ids.includes(productId)) {
        this.removeFromFavorites(productId);
      } else {
        this.addToFavorites(productId);
      }
    });
  }

  isCurrentlyFavorite(productId: number): Observable<boolean> {
    return new Observable(observer => {
      this.currentFavoriteIds$.pipe(take(1)).subscribe(ids => {
        observer.next(ids.includes(productId));
        observer.complete();
      });
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  onHeaderMenuAction(action: string) {
    if (action === 'logout') {
      this.logout();
    }
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
} 