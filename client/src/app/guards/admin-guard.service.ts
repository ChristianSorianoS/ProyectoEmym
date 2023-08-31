import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanActivate {
  constructor(private _route: Router, private _token: TokenStorageService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const currentUser = this._token.getUser();
    if (currentUser && currentUser.role === 777) {
      return true;
    }
    this._route.navigate(['/login']);
    return false;
  }
}
