import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Product } from 'src/app/shared/models/product.model';
@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  loading = false;
  products: Product[] = [];
  checked = false;
  indeterminate = false;
  listOfData: readonly Product[] = [];
  setOfCheckedId = new Set<number>();
  isVisible = false;

  constructor(
    private _route: ActivatedRoute,
    private productService: ProductService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.loading = true; 
    this.loadProducts();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(products: readonly Product[]): void {
    this.products = this.products;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.products.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = this.products.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.products
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.loading = true;
    this.setOfCheckedId.forEach(id => {
      setTimeout(() => {
        this.productService.deleteProduct(id).subscribe(
          (res: any) => {
            console.log(res);
            this.loading = false;
            this.notification.create(
              'success',
              'Producto eliminado',
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
      }, 500);
    })
    this.loadProducts();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  loadProducts(): void{
    this.loading = true;
    setTimeout(() => {
      this.productService.getAllProducts(9999, 1).subscribe(
        (res: any) => {
          console.log(res);
          this.products = res;
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
