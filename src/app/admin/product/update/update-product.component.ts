import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  loading = false;
  productForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
  ) { 
    this.productForm = this.fb.group({
      id: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      desc: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      img: [null]
    });
  }

  ngOnInit(): void {
    this.loading = true;
    const productId = this.route.snapshot.paramMap.get('id');
    if(productId) this.getProduct(productId);
  }

  submitProduct(): void {
    const id = this.productForm.get('id').value;
    const name = this.productForm.get('nombre').value;
    const price = this.productForm.get('precio').value;
    const desc = this.productForm.get('desc').value;
    const img = this.productForm.get('img').value;
    const stock = this.productForm.get('stock').value;
    console.log(name);
    this.loading = true;
    setTimeout(() => {
      this.productService.updateProduct(id, name,desc,price,stock,img)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.loading = false;
            this.notification.create(
              'success',
              'Producto actualizado',
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

  getProduct(id){
    setTimeout(() => {
      this.productService.getSingleProduct(id).subscribe(
        (res: any) => {
          console.log(res);
          this.productForm.setValue({id: res.id, nombre: res.title, desc: res.description, precio: res.price, stock: res.quantity, img: res.image})
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    }, 500);
    
  }
}
