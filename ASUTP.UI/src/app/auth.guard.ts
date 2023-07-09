// Для того, чтобы не пускать незалогиненных на другие страницы

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard  {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true; // Разрешаем доступ к маршруту
    } else {
      this.router.navigate(['/auth']); // Перенаправляем на страницу входа
      alert('Вы должны авторизоваться');
      return false; // Запрещаем доступ к маршруту
    }
  }
}