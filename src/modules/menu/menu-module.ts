import * as $ from 'jquery';

export class MenuModule {
    private options: Map<string, string> = new Map<string, string>();

    constructor() {
        this.options
            .set('root', 'Accueil')
            .set('heroes', 'Heros')
            .set('spitefuls', 'Méchants');
        
        // Construction du menu HTML
        this._build();
    }

    private _build(): void {
        let div: JQuery = $('<div>')
            .addClass('navbar-collapse');
        
        let menu: JQuery = $('<ul>').addClass('navbar-nav');

        this.options.forEach((value: string, key: string) => {
            let row: JQuery = $('<li>').addClass('nav-item');
            let link: JQuery = $('<a>').addClass('nav-link');
            link
                .attr('href', '/' + key)
                .html(value);
            link.appendTo(row);
            row.appendTo(menu);
        });
        // Raccorcher le menu à l'élément nav de la page index.html
        menu.appendTo(div);
        $('nav').html('').append(div);
    }
}