import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css']
})
export class LandingPage implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  handleLogin() :void{
    this.router.navigateByUrl("trainer")
  }
}
