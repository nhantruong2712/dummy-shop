import { createAction, props } from '@ngrx/store';

export const addToFavorites = createAction(
  '[Favorites] Add To Favorites',
  props<{ productId: number }>()
);

export const removeFromFavorites = createAction(
  '[Favorites] Remove From Favorites',
  props<{ productId: number }>()
);

export const clearFavorites = createAction('[Favorites] Clear Favorites'); 