import { AppUtils } from '@core/helpers/utils';

export interface ResponseModel<T> {
    name: string;
    message: string;
    code: number;
    data: T;
    status: string;
}

export class IModel {
    _id: string = null;
    createdAt = new Date().toISOString();
    updatedAt = new Date().toISOString();
    constructor(payload: Partial<IModel> = {}) {
        Object.assign(this, payload);
    }
}

export class CreateResponse {
    id: string;
}

export class Query {
    [key: string]: string | number;
}

export class PlainQuery<T extends Query> {
    asString: string;
    queryObject: T;
    constructor(queryObject: T) {
        this.queryObject = queryObject;
        this.asString = AppUtils.convertObjectToQueryParams(queryObject);
    }
}

export interface ListEntityResponse<T> {
    items: T[];
    pageNumber: number;
    pagesCount: number;
}

export class ListEntityQuery {
    page: number;
    size: number;

    constructor(obj: ListEntityQuery) {
        this.page = obj.page || 10;
        this.size = obj.size || 1;
    }
}
