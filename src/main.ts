/**
 * @name main
 * @author Aélion - Avr. 2019 - dev-team@ideafactory.fr
 * @version 1.0.0
 */
import * as $ from 'jquery';
import { ControllerInterface } from './core/interfaces/controller-interface';
import { MenuModule } from './modules/menu/menu-module';
import { HeroesService } from './services/heroes-service';
import { Hero } from './models/hero-model';

class Main implements ControllerInterface {

    private appTitle: string;
    private heroesService: HeroesService;

    constructor(heroesService: HeroesService ) {
        this.appTitle = 'Hello TypeScript';
        $('title').html(this.appTitle);

        this.heroesService = heroesService;
        this._init();
    }

    _init(): void {
        const menu: MenuModule = new MenuModule();
        const result: any = this.heroesService.getAll();
        if (result instanceof Array) {
            console.log('Tableau de Heros');
        } else {
            result.then((heroes: Array<Hero>) => {
                console.log('Promesse de tableau de Héros : ' + JSON.stringify(heroes));
            });
        }
    }
}


const _APP = new Main(new HeroesService());