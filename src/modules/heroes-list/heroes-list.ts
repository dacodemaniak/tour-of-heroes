import { Hero } from "src/models/hero-model";

import * as $ from 'jquery';

export class HeroesList {
    private heroes: Array<Hero>;
    private template: JQuery;

    public constructor(heroes: Array<Hero>) {
        this.heroes = heroes;

        this._loadView().then((template: boolean) => {
            console.log('Next, hydrate rows from : ' + JSON.stringify(this.heroes));

            // On peut boucler sur la liste des héros et alimenter le tableau
            const body: JQuery = $('[heroes]').find('tbody');
            console.log('Template : ' + body);
            this.heroes.forEach((hero: Hero, index: number) => {
                let tr: JQuery = $('<tr>');
                let name: JQuery = ($('<td>')).html(hero.name);
                let lifePoints: JQuery = ($('<td>')).html(hero.lifePoints.toString());
                let strength: JQuery = ($('<td>')).html(hero.strength.toString());
                name.appendTo(tr);
                lifePoints.appendTo(tr);
                strength.appendTo(tr);
                tr.appendTo(body);
            });
        });
    }

    private _loadView(): Promise<boolean> {
        return new Promise((resolve) => {
            $.get(
                './src/modules/heroes-list/view/heroes.html',
                (data: string) => {
                    const template: any = $.parseHTML(data);
                    const placeholder = $('[heroes]');
                    placeholder.append(template);
                    resolve(true)
                }
            );
        })

    }
}