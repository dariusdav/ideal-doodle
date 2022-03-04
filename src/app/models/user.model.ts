import { Pokemon } from "./pokemon.model";

export interface User{
    username: string;
    pokemon: Pokemon[];
    id: number
}