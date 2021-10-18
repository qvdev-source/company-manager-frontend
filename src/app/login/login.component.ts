import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddCompanyComponent} from '../add-company/add-company.component';
import {User} from '../modal/Modal';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formUser: User = {} as User;
  existUser: User = {} as User;
  progressBar = false;
  users: User[];
  admin: boolean;

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.existUser != null) {
      this.userService.findAllUsers().subscribe(users => {
        this.users = users;
      });
      this.userService.findByUsername(this.userService.getUsername()).subscribe(existUser => {
        this.existUser = existUser;
        this.admin = this.existUser.admin;
      });
    }
  }

  addUser(): void {
    this.progressBar = true;
    this.userService.addUser(this.formUser).subscribe((formUser) => {
      this.formUser = formUser;
      this.userService.saveUsername(formUser.username);
      window.location.replace(`/dashbaord`);
    });
  }

  deleteUser(id): void {
    if (confirm('Are you sure')) {
      this.userService.deleteUser(id).subscribe(() => {
        window.location.replace(`/dashbaord`);
      });
    }
  }

  addCompany(idUser): void {
    this.dialog.open(AddCompanyComponent, {
      data: {idUser},
      height: '400px',
      width: '400px',
    });
  }
}
