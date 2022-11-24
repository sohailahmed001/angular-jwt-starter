import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setRoles(response.user.role);

        if (response.user.role.some((role) => role['roleName'] == 'Admin')) {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['user']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
