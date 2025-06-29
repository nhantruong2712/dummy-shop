import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '@services/products.service';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productsService = inject(ProductsService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      exhaustMap(({ pagination }) =>
        this.productsService.getProducts(pagination).pipe(
          map(response => ProductsActions.loadProductsSuccess({
            response
          })),
          catchError(error => of(ProductsActions.loadProductsFailure({
            error: error.error?.message || 'Failed to load products'
          })))
        )
      )
    )
  );

  setCurrentPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.setCurrentPage),
      map(({ page }) => {
        const validPage = Math.max(1, page);
        return ProductsActions.loadProducts({
          pagination: { page: validPage, limit: 12 }
        });
      })
    )
  );
} 