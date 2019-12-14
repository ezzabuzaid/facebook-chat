import { ISetting, Form } from '@shared/common';
import { CustomHeaders } from '@core/http';

export interface IModule<Tread, Tcreate, Tupdate> {
    name: string;
    httpConfiguration?: Partial<CustomHeaders>;
    endpoint: string;
    create: {
        // TODO: an option for dialog
        endpoint?: string;
        title: string;
        form: Form<Tcreate>;
    };
    update: {
        endpoint?: string;
        title: string;
        form: Form<Tupdate>;
    };
    read: {
        endpoint?: string;
        title: string;
        settings: ISetting<Tread>
    };
}
