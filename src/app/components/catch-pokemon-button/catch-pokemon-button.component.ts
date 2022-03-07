import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css'],
})
export class CatchPokemonButtonComponent implements OnInit {
  public loading : boolean = false;
  public isFavorite: boolean = false;
  @Input() pokemonName: string = '';


  constructor(
    private readonly userService: UserService,
    private readonly favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.isFavorite = this.userService.CaughtPokemon(this.pokemonName);
  }

  onCatch(): void {
    this.loading = true;
    this.favoriteService.addToCaught(this.pokemonName).subscribe({
      next: (response: User) => {
        this.loading = false;
        this.isFavorite = this.userService.CaughtPokemon(this.pokemonName)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
}
