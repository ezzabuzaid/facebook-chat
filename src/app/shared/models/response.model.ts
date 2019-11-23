import { AppUtils } from '@core/helpers/utils';

export interface ResponseModel<T> {
    succeeded: boolean;
    errorMessages: any[];
    name: string;
    message: string;
    code: number;
    data: T;
    status: string;
    token: string;
}


export interface ListEntityRes<T> {
    items: T[];
    pageNumber: number;
    pagesCount: number;
}

export class PlainQuery<T> {
    asString: string;
    queryObject: T;
    constructor(queryObject: T) {
        this.queryObject = queryObject;
        this.asString = AppUtils.prepareQueryParams(queryObject);
    }

}
export class ListEntityQuery {
    ItemsPerPage: number;
    Page: number;

    constructor(obj: ListEntityQuery) {
        this.ItemsPerPage = obj.ItemsPerPage || 10;
        this.Page = obj.Page || 1;
    }
}
