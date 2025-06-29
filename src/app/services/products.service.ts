import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../models/product.model';
import { environment } from '@environments/environment';

export interface PaginationParams {
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(pagination?: PaginationParams): Observable<ProductsResponse> {
    let params = new HttpParams();
    
    if (pagination) {
      const skip = (pagination.page - 1) * pagination.limit;
      params = params.set('limit', pagination.limit.toString());
      params = params.set('skip', skip.toString());
    }

    return this.http.get<ProductsResponse>(`${this.API_URL}/auth/products`, { params });
  }
} 