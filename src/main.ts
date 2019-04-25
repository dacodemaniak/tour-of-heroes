/**
 * @name main
 * @author Aélion - Avr. 2019 - dev-team@ideafactory.fr
 * @version 1.0.0
 */
import * as $ from 'jquery';

class Main {
    private appTitle: string;

    constructor() {
        this.appTitle = 'Hello TypeScript';
        $('title').html(this.appTitle);
    }
}

const _APP = new Main();