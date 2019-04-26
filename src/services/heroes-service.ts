import { Hero } from "./../models/hero-model";
import * as $ from 'jquery';

export class HeroesService {

    private listOfHeroes: Array<Hero>;

    public getAll(): Array<Hero>|Promise<Array<Hero>> {
        if (this.listOfHeroes) {
            return new Array<Hero>();
        }

        // Sinon, alimenter le tableau des Héros
        return this._getAll();
    }

    private _getAll(): Promise<Array<Hero>> {
        return new Promise((resolve) => {
            $.ajax({
                url: 'http://localhost:8080/api/v1/all',
                method: 'get',
                dataType: 'json',
                success: (data: Array<any>) => {
                    this.listOfHeroes = data.map((hero, index) => {
                        let item: Hero = new Hero();
                        item.id = hero.id,
                        item.name = hero.name;
                        item.lifePoints = hero.lifePoints;
                        item.strength = hero.strength;
                        return item;
                    });
                    resolve(this.listOfHeroes);
                },
                error: (xhr, error) => {
                    resolve(null);
                }
            });
        });
    }
}