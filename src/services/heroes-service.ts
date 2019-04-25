import { Hero } from "./../models/hero-model";

export class HeroesService {

    private listOfHeroes: Array<Hero>;

    public getAll(): Array<Hero>|Promise<Array<Hero>> {
        if (this.listOfHeroes) {
            return new Array<Hero>();
        }

        // Sinon, alimenter le tableau des Héros
        return new Promise((resolve) => {
            this._getAll().then((heroes) => {
                this.listOfHeroes = heroes.map((hero, index) => {
                    let item: Hero = new Hero();
                    item.name = hero.name;
                    item.lifePoints = hero.lifePoints;
                    item.strength = hero.strength;
                    return item;
                });
                resolve(this.listOfHeroes);
            });
        });
    }

    private _getAll(): Promise<Array<Hero>> {
        return new Promise((resolve) => {
            resolve(JSON.parse(localStorage.getItem('heroes')));
        })
        
    }
}