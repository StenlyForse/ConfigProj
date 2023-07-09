import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ASUTP.UI';
  constructor(private router: Router) {
   /* let exitButton = document.getElementById("exitButton");
    if (exitButton) {
      exitButton.addEventListener("click", (e:Event) => this.UnloginUser());
    }*/

  }

  ngOnInit(): void {}
  
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
