import { IModel, Query } from './response.model';
export namespace MediaModel {
    export class Folder extends IModel {
        name: string;
        constructor(payload: Partial<Folder>) {
            super(payload);
            Object.assign(payload, Folder);
        }
    }

    export interface IFile extends IModel {
        fullPath: string;
        type: string;
        size: number;
        name: string;
        path: string;
        user: string;
        folder: string;
    }

    export class FileSearchQuery extends Query {
        constructor(
            public folder: string,
            public file: string
        ) {
            super();
        }
    }

}