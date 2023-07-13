import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit{

// Пустой элемент, который потом в API заполняется
authUserRequest: User = {
  id: '',
  username: '',
  password: '',
  role: ''
}

constructor(private authService: AuthService, private router: Router) {
  /*let exitButton = document.getElementById("exitButton")!;
    exitButton.addEventListener("click", (e:Event) => this.UnloginUser());*/
 }
  ngOnInit(): void {
    if (localStorage.getItem("token"))
    this.router.navigate(['catalog'])
  }

  authUser() {
    this.authService.authUser(this.authUserRequest)
    .subscribe({
      next: (catalogElem) => {
        //alert('Succesfully added');
        this.router.navigate(['catalog'])
      },
      error: (response) => {
        console.log(response)
        alert('Wrong username or password');
      }
      
    })
  };

  // Разлогинивание
  /*UnloginUser(){
    var amo = localStorage.getItem('token');
    if (amo) {
      alert('Вы успешно разлогинились');
      localStorage.removeItem('token');
      this.router.navigate(['/auth']);
      this.router.navigate(['auth']);
    }
    else
      alert('Not');
 }*/
}
