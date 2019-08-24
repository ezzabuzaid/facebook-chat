import { Validators, FormControl } from '@angular/forms';

export namespace ArticlesModel {
    class Crud {
        title = new FormControl(null, [Validators.required]);
        data = new FormControl(null, [Validators.required]);
        content = new FormControl(null, [Validators.required]);
        image = new FormControl(null, [Validators.required]);
    }

    export class POST extends Crud { }

    export class PUT extends Crud { }

    export interface GET {
        id: number;
        title: string;
        data: string;
        content: string;
        image: string;
    }

}
