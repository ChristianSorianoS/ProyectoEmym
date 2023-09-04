import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { ManageProductComponent } from './admin/product/manage-product.component';
import { AdminGuardService } from './guards/admin-guard.service';
import { CreateProductComponent } from './admin/product/create/create-product.component';
import { UpdateProductComponent } from './admin/product/update/update-product.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'product/:id', component: ProductComponent },
  { path: 'products/:category', component: HomeComponent},
  { path: 'cart', component: CartComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'admin/products',
    component: ManageProductComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'admin/products/create',
    component: CreateProductComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'admin/products/update/:id',
    component: UpdateProductComponent,
    canActivate: [AdminGuardService],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
