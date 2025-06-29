import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';

export interface FavoritesState {
  favoriteProductIds: number[];
}

export const initialState: FavoritesState = {
  favoriteProductIds: []
};

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.addToFavorites, (state, { productId }) => ({
    ...state,
    favoriteProductIds: [...state.favoriteProductIds, productId]
  })),
  on(FavoritesActions.removeFromFavorites, (state, { productId }) => ({
    ...state,
    favoriteProductIds: state.favoriteProductIds.filter(id => id !== productId)
  })),
  on(FavoritesActions.clearFavorites, (state) => ({
    ...state,
    favoriteProductIds: []
  }))
); 