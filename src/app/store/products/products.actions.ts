import { createAction, props } from '@ngrx/store';
import { Product, ProductsResponse } from '@models/product.model';
import { PaginationParams } from '@services/products.service';

export const loadProducts = createAction(
  '[Products] Load Products',
  props<{ pagination?: PaginationParams }>()
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ response: ProductsResponse }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);

export const setCurrentPage = createAction(
  '[Products] Set Current Page',
  props<{ page: number }>()
); 