import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { storageSave } from '../util/storage.utils';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { UserService } from './user.service';

const { apiKey, apiUsers } = environment;
@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private _loading = false;

  get loading() {
    return this._loading;
  }
  constructor(
    private readonly pokemonService: PokemonCatalogueService,
    private readonly userService: UserService,
    private readonly http: HttpClient
  ) {}

  /**
   * addToCaught
   */
  public addToCaught(name: string): Observable<User> {
    if (!this.userService.user?.username) {
      throw new Error('User does not exist');
    }
    const userId: number = this.userService.user.id;

    const pokemon: Pokemon | undefined =
      this.pokemonService.pokemonByName(name);

    if (!pokemon) {
      throw new Error('addToCaught: No pokemon with name: ' + name);
    }
    if (this.userService.CaughtPokemon(name)) {
      throw new Error('addToCaught: Already caught!');
    }
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey,
    });
    this._loading = true;
    return this.http
      .patch<User>(
        `${apiUsers}/${userId}`,
        {
          pokemon: [...this.userService.user.pokemon, name],
        },
        { headers }
      )
      .pipe(
        tap((user: User) => {
          this.userService.user = user;
          // storageSave("user",JSON.stringify(user))
        }),
        finalize(() => {
          this._loading = false;
        })
      );
  }
}
