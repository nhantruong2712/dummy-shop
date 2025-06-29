import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth/auth.reducer';
import { ProductsState } from './products/products.reducer';
import { FavoritesState } from './favorites/favorites.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectProductsState = createFeatureSelector<ProductsState>('products');
export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectUser = createSelector(selectAuthState, (state) => state.user);
export const selectIsAuthenticated = createSelector(selectAuthState, (state) => state.isAuthenticated);
export const selectAuthLoading = createSelector(selectAuthState, (state) => state.isLoading);
export const selectAuthError = createSelector(selectAuthState, (state) => state.error);

export const selectAllProducts = createSelector(selectProductsState, (state) => state.products);
export const selectProductsLoading = createSelector(selectProductsState, (state) => state.isLoading);
export const selectProductsError = createSelector(selectProductsState, (state) => state.error);
export const selectProductsPagination = createSelector(selectProductsState, (state) => state.pagination);

export const selectFavoriteProductIds = createSelector(selectFavoritesState, (state) => state.favoriteProductIds);
export const selectFavoriteProducts = createSelector(
  selectAllProducts,
  selectFavoriteProductIds,
  (products, favoriteIds) => products.filter(product => favoriteIds.includes(product.id))
);

export const selectProductsWithFavoriteFlag = createSelector(
  selectAllProducts,
  selectFavoriteProductIds,
  (products, favoriteIds) => products.map(product => ({
    ...product,
    isFavorite: favoriteIds.includes(product.id)
  }))
); 