import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/common';
import { FormModel } from './form.model';
import { AuthService } from '../shared/services/auth.service';



@Component({
  selector: 'login-form',
  providers: [ AuthService ],
  template: require('./login.component.html'),
  styleUrls: [require('!style!css!sass!./form.scss')]
})

export class LoginComponent {

  constructor(private authService: AuthService,
              private router: Router){}


  model = new FormModel('example', 'password');

  submitted = false;


  processUserData() {
    let userData = new FormModel(this.model.username.toLowerCase(),
                                 this.model.password);
    this.login(userData);
  }

  login(user) {
    this.submitted = true;
    this.authService.login(user)
      .subscribe((res) => {
        // DEBUG
        // TODO: Remove this DEBUG statement
        console.log(res);
        alert("Login Succesful!");
        this.newUser();
        this.router.navigate(['/recipes']);
      }, (error) => {
        // DEBUG
        // TODO: Remove this DEBUG statement
        console.log(error);
        this.submitted = false;
      });
  }

  getSessionData() {
  this.authService.getSessionData()
    .subscribe((res) => {
      // DEBUG
      // TODO: Remove this DEBUG statement
      console.log(res);
    }, (error) => {
      // DEBUG
      // TODO: Remove this DEBUG statement
      console.log(error);
    });
  }

  active = true;

  newUser() {
    this.model = new FormModel('', '');
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  // TODO: Remove this when we are done
  get diagnostic() { return JSON.stringify(this.model); }
}
