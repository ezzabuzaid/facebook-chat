import { IModel } from './response.model';
export namespace MediaModel {
    export interface IFolder extends IModel {
        name: string;
    }

    export interface IFile extends IModel {
        type: string;
        size: number;
        name: string;
        path: string;
        user: string;
        folder: string;
    }

}