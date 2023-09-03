import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    constructor(private router: Router) {
        /* let exitButton = document.getElementById("exitButton");
         if (exitButton) {
           exitButton.addEventListener("click", (e:Event) => this.UnloginUser());
         }*/
     
       }
    isLoginPage(): boolean {
        return this.router.url === '/auth';
      }
    
      UnloginUser(){
        var amo = localStorage.getItem('token');
        if (amo) {
          alert('Вы успешно разлогинились');
          localStorage.removeItem('token');
          this.router.navigate(['/auth']);
          this.router.navigate(['auth']);
        }
        else
          alert('Not');
     }

}


