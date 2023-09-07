import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';

// import Swiper core and required components
import { Product } from 'src/app/shared/models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  loading = false;
  productForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private productService: ProductService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre: [null, [Validators.required]],
      desc: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      img: [null]
    });
  }

  submitProduct(): void {
    const name = this.productForm.get('nombre').value;
    const price = this.productForm.get('precio').value;
    const desc = this.productForm.get('desc').value;
    const img = this.productForm.get('img').value;
    const stock = this.productForm.get('stock').value;
    console.log(name);
    this.loading = true;
    setTimeout(() => {
      this.productService
        .createProduct(name,desc,price,stock,img)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.loading = false;
            this.notification.create(
              'success',
              'Producto agregado',
              `${res.message}`
            );
          },
          (err) => {
            console.log(err);
            this.loading = false;
            this.notification.create(
              'error',
              'Error',
              `${err.message}`
            );
          }
        );
    }, 750);
  }
}
