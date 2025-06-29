import { createReducer, on } from '@ngrx/store';
import { Product } from '@models/product.model';
import * as ProductsActions from './products.actions';

export interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  }
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(ProductsActions.loadProductsSuccess, (state, { response }) => ({
    ...state,
    products: response.products,
    isLoading: false,
    error: null,
    pagination: {
      ...state.pagination,
      total: response.total,
      totalPages: Math.ceil(response.total / state.pagination.limit)
    }
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  on(ProductsActions.setCurrentPage, (state, { page }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: page
    }
  }))
); 