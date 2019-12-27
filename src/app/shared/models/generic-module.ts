import { ISetting, Form } from '@shared/common';
import { CustomHeaders } from '@core/http';

export interface IModule<Tread, Tcreate, Tupdate> {
    name: string;
    httpConfiguration?: Partial<CustomHeaders>;
    endpoint?: string;
    create: {
        endpoint?: string;
        title: string;
        form: Form<Tcreate>;
        dialog?: boolean
    };
    update: {
        endpoint?: string;
        title: string;
        form: Form<Tupdate>;
        dialog?: boolean
    };
    read: {
        endpoint?: string;
        title: string;
        settings: ISetting<Tread>
    };
}
