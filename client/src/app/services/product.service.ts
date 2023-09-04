import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products, Product } from '../shared/models/product.model';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient, private _api: ApiService) {}


  getAllProducts(limitOfResults = 9, page, category = 'all'): Observable<Products> {
    return this.http.get<Products>(this.url + 'products', {
      params: {
        limit: limitOfResults.toString(),
        page: page,
        category: category
      },
    });
  }

  getSingleProduct(id: Number): Observable<any> {
    console.log(id);
    return this._api.getTypeRequest('products/' + id);
  }

  createProduct(name, desc, price, stock, img ): Observable<any> {
    
    return this._api.postTypeRequest('products/create', {
      name: name,
      desc: desc,
      price: price,
      stock: stock,
      img: img
    });
  }

  updateProduct(id, name, desc, price, stock, img ): Observable<any> {
    
    return this._api.postTypeRequest('products/update', {
      id: id,
      name: name,
      desc: desc,
      price: price,
      stock: stock,
      img: img
    });
  }

  deleteProduct(id): Observable<any> {
    return this._api.postTypeRequest('products/delete', {
      id: id
    });
  }
}
