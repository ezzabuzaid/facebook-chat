export namespace ResponseModel {

    export interface Success<T> {
        message: string;
        status: string;
        data: T;
        count: number;
    }

}
