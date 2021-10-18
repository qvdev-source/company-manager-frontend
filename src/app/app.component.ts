import {Component, OnInit} from '@angular/core';
import {User} from './modal/Modal';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User = {} as User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    if (this.user != null) {
      this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
        this.user = user;
      });
    }
  }

  logout(): void {
    this.userService.logout();
    window.location.replace(`/dashbaord`);
  }
}
