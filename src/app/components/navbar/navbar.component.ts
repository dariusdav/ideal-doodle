import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { storageDelete } from 'src/app/util/storage.utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public logout(): void {
    storageDelete("user");
    storageDelete("pokemon");
    this.router.navigateByUrl("/login")
  }

  public get user() : User | undefined {
    return  this.userService.user;
  }
  

  constructor(private readonly userService : UserService,
    private readonly router: Router) { }

  ngOnInit(): void {
    
  }

}
