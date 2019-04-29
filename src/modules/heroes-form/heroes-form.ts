import { Hero } from "./../../models/hero-model";

import * as $ from 'jquery';
import { HeroesService } from "./../../services/heroes-service";
import { HeroesList } from "../heroes-list/heroes-list";

export class HeroesForm {
    private hero: Hero;

    public constructor() {
        this._loadView().then(() => {
            this._init();
        });

    }

    private _init() {
        const placeholder: JQuery = $('[heroes]');

        placeholder.on(
          'keyup',
          'form', // JQuery event delegation
          (event: any): void => this._userEntries(event)  
        );

        placeholder.on(
            'submit',
            'form',
            (event: any): void => this._submit(event)
        )
    }

    private _userEntries(event: any) {
        const fields: Array<JQuery> = [
            $('#name'),
            $('#lifePoints'),
            $('#strength')
        ];

        let full: boolean = true;
        for (let field  of fields) {
            if (field.val() === '') {
                full = !full;
            }
        }

        if (full) {
            $('#add').removeAttr('disabled');
        } else {
            $('#add').attr('disabled', 'disabled');
        }
    }

    private _submit(event: any): void {
        event.preventDefault();

        // Build the hero from Hero model
        this.hero = new Hero();
        this.hero.name = $('#name').val().toString();
        this.hero.lifePoints = parseInt($('#lifePoints').val().toString());
        this.hero.strength = parseInt($('#strength').val().toString());

        // Call the API with the brand new Hero
        $.ajax(
            {
                url: 'http://localhost:8080/api/v1/add',
                method: 'post',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(this.hero.toHero()), // Else datas are not properly sent to backend
                success: ((data: Hero) => {
                    const result: any = new HeroesService().getAll();
                    if (result instanceof Array) {
                        console.log('Tableau de Heros');
                    } else {
                        result.then((heroes: Array<Hero>) => {
                            const table = $('[heroes]').children('table').eq(0);
                            table.remove();
                            const heroesList: HeroesList = new HeroesList(heroes);
                        });
                    }
                }),
                error: ((xhr, error) => {
                    console.warn('Got an error : ' + error);
                })
            }
        );

    }

    private _loadView(): Promise<boolean> {
        return new Promise((resolve) => {
            $.get(
                './src/modules/heroes-form/view/form.html',
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