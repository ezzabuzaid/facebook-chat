import { AppUtils } from '@core/helpers/utils';

export interface ResponseModel<T> {
    name: string;
    message: string;
    code: number;
    data: T;
    status: string;
}


export interface ListEntityRes<T> {
    items: T[];
    pageNumber: number;
    pagesCount: number;
}

export class PlainQuery<T extends { [key: string]: string | number }> {
    asString: string;
    queryObject: T;
    constructor(queryObject: T) {
        this.queryObject = queryObject;
        this.asString = AppUtils.convertObjectToQueryParams(queryObject);
    }

}
export class ListEntityQuery {
    page: number;
    size: number;

    constructor(obj: ListEntityQuery) {
        this.page = obj.page || 10;
        this.size = obj.size || 1;
    }
}
