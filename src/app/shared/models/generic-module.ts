import { ISetting, Form } from '@shared/common';
import { MutateRequest } from '@core/http';

export interface IModule<Tread, Tcreate, Tupdate> {
    name: string;
    httpConfigure?: MutateRequest;
    // http configure options
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
