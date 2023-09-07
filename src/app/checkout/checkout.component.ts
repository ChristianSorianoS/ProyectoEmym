import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  
  billingAddress = [
    {
      name: 'Nombre',
      placeholder: 'Ingresa tu nombre',
      type: 'text',
      value: '',
    },
    {
      name: 'Email',
      placeholder: 'Ingresa tu correo',
      type: 'email',
      value: '',
    },
    {
      name: 'Direccion',
      placeholder: 'Ingresa tu direccion',
      type: 'text',
      value: '',
    },
    {
      name: 'Comuna',
      placeholder: 'Ingresa tu comuna',
      type: 'text',
      value: '',
    },
    {
      name: 'Celular',
      placeholder: 'Ingresa tu numero de celular',
      type: 'tel',
      value: '',
    },
  ];

  currentUser: any;
  currentStep = 1;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCode: string;
  cartData: any;
  products: any;
  loading = false;
  successMessage = '';
  orderId;

  constructor(private _auth: AuthService, private _cart: CartService) {

    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
    });
  }

  ngOnInit(): void {
      const user = this._auth.getUser();
      if (user) {
        this.currentUser = user;
        this.billingAddress[0].value = user.fname;
        this.billingAddress[1].value = user.email;
      }
  }

  submitCheckout() {
    this.loading = true;
    setTimeout(() => {
      this._cart
        .submitCheckout(this.currentUser.id, this.cartData)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.loading = false;
            this.orderId = res.orderId;
            this.products = res.products;
            this.currentStep = 4;
            this._cart.clearCart();
          },
          (err) => {
            console.log(err);
            this.loading = false;
          }
        );
    }, 750);
  }

  getProgressPrecent() {
    return (this.currentStep / 4) * 100;
  }

  submitBilling(): void {
    this.nextStep(2);
  }

  canBillingSubmit(): boolean {
    try{
      return this.billingAddress.filter((field) => field.value.length > 0)
        .length !== 5
        ? true
        : false;
    }
    catch(e){
      console.error(e);
      return true;
    }
  }

  submitPayment(): void {
    this.nextStep();
  }

  canPaymentSubmit(): boolean {
    return this.cardNumber && this.cardName && this.cardExpiry && this.cardCode
      ? true
      : false;
  }

  nextStep(step?: number): void {
    this.currentStep += step ?? 1;
    localStorage.setItem('checkoutStep', this.currentStep.toString());
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      localStorage.setItem('checkoutStep', this.currentStep.toString());
    }
  }
}
