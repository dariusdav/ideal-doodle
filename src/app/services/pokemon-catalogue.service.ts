import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon ,PokemonApiResponse} from '../models/pokemon.model';
import { storageSave } from '../util/storage.utils';

const { apiPokemon } = environment;
@Injectable({
  providedIn: 'root',
})
export class PokemonCatalogueService {
  private _pokemon: Pokemon[] = [];
  private _error: string = ";"
  private _loading = false;
  get pokemon() :Pokemon[]{
    // console.log("PokemonCatalogueService", this._pokemon);
    
    return this._pokemon;
  }
  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }
  constructor(private readonly http: HttpClient) {}

  public findAllPokemon(): void {
    if (this._pokemon.length > 0 || this.loading){
      return;
    }
    this._loading = true;
    this.http.get<PokemonApiResponse>(apiPokemon)
    .pipe(
      finalize(()=> {
        this._loading = false;
        storageSave<Pokemon[]>("pokemon", this._pokemon)
      })
    )
    .subscribe({
      next: (pokemon: PokemonApiResponse) => {
        this._pokemon = pokemon.results;

      },
      error: (error : HttpErrorResponse) => {
        this._error = error.message;
      },
    });
  }
  public pokemonByName(name: string) :Pokemon | undefined {
    
    return this._pokemon.find((poke : Pokemon) => poke.name === name)
  }
}
