import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { TokenStorageService } from '../services/token-storage.service';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuPosition: NzPlacementType = 'bottomRight'
  isMenuOpen = false;
  isLoggedIn = false;
  isAdmin = false;
  dropdownVisible = false;
  cartData: any;
  loggedUser: User;

  constructor(
    private _token: TokenStorageService,
    private _auth: AuthService,
    private _cart: CartService
  ) { 
    this._auth.user.subscribe((user) => {
      this.isLoggedIn = false;
      if (user) {
        this.isLoggedIn = true;
        this.loggedUser = user;
        if (user.role === 777) {
          this.isAdmin = true;
          delete this.loggedUser;
        }
      }
    });
    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
    });
  }

  async ngOnInit(): Promise<void> {
    const user = this._token.getUser();
    if (user) {
      this.isLoggedIn = true;
      this.loggedUser = user;
    }
    else {
      this.isLoggedIn = false;
      delete this.loggedUser;
    }

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  removeProductFromCart(id: number) {
    this._cart.removeProduct(id);
  }

  logout() {
    this._auth.logout();
    this.isMenuOpen = false;
  }
}
