import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { User } from 'src/app/models/user.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';
import { UserService } from 'src/app/services/user.service';
import { storageRead } from 'src/app/util/storage.utils';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css'],
})
export class TrainerPage implements OnInit {
  public get user(): User | undefined {
    return this.userService.user;
  }

  public get caught(): Pokemon[] {
    const pList: Pokemon[] = [];
    if (this.userService.user !== undefined) {
      const list = this.userService.user?.pokemon;
      //loops thru and finds pokemon from the pokemon list in the service.
      for (let i = 0; i < list.length; i++) {
        this.catalogue.pokemon.map((pokemon: Pokemon) => {
          if (pokemon.name === list[i]) {
            pList.push(pokemon);
          }
        });
      }
    }

    return pList;
  }

  constructor(
    private readonly userService: UserService,
    private readonly catalogue: PokemonCatalogueService
  ) {}

  ngOnInit(): void {}
}
