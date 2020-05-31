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
        this._id = payload._id;
        this.createdAt = payload.createdAt || new Date().toISOString();
        this.updatedAt = payload.updatedAt || new Date().toISOString();
    }
}

export class CreateResponse {
    id: string;
}

export class Query {
    [key: string]: string | number;
}

export class PlainQuery<T> {
    asString: string;
    queryObject: T;
    constructor(queryObject: T) {
        this.queryObject = queryObject;
        this.asString = AppUtils.convertObjectToQueryParams(queryObject);
    }
}

export class ListEntityResponse<T> {
    list: T[] = [];
    length = 0;
    totalCount = 0;
    pages = 0;
}

export class ListEntityQuery {
    page?: number;
    size?: number;

    constructor(obj: ListEntityQuery) {
        this.page = obj.page ?? 1;
        this.size = obj.size ?? 10;
    }
}
