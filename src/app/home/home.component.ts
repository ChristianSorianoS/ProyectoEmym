import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/models/product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  category;
  loading = false;
  productPageCounter = 1;
  additionalLoading = false;
  showcaseImages = [ '../../assets/1.png','../../assets/2.png' ]

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.category = this.route.snapshot.paramMap.get('category') ?? 'all';
  }

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      this.category = this.route.snapshot.paramMap.get('category') ?? 'all';
      this.loading = true;
      this.productPageCounter = 1;
      setTimeout(() => {
        this.productService.getAllProducts(9, this.productPageCounter, this.category).subscribe(
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
    });
  }

  showMoreProducts(): void {
    this.additionalLoading = true;
    this.productPageCounter = this.productPageCounter + 1;
    const category = this.route.snapshot.paramMap.get('category') ?? 'all';
    setTimeout(() => {
      this.productService.getAllProducts(9, this.productPageCounter, category).subscribe(
        (res: any) => {
          console.log(res);
          this.products = [...this.products, ...res];
          this.additionalLoading = false;
        },
        (err) => {
          console.log(err);
          this.additionalLoading = false;
        }
      );
    }, 500);
  }
}
