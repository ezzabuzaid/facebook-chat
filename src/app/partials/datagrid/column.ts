import { ListEntityQuery, ListEntityResponse } from '@shared/models';
import { Observable } from 'rxjs';

export enum EColumnTypes {
    TEXT,
    BOOLEAN,
    DATE
}

export class DataGrid<T> {
    public columns: DisplayColumn<T>[];
    public actionColumn: ActionColumn;
    public provider: (query: ListEntityQuery) => Observable<ListEntityResponse<any>>;
    constructor(
        options: Partial<DataGrid<T>>
    ) {
        this.columns = options.columns ?? [];
        this.actionColumn = options.actionColumn;
        this.provider = options.provider;
    }

}

export class DisplayColumn<T>  {
    type: string;
    key: ((keyof T extends string ? keyof T : never));
    title: string;
    format: string;

    mapper: (row: T) => any;

    constructor(options: Partial<DisplayColumn<T>>) {
        this.key = options.key;
        this.title = options.title;
        this.mapper = options.mapper;
        this.format = options.format ?? 'shortTime';
    }

    private isDate(date) {
        return !isNaN(new Date(date) as any);
    }

    typeOf(value: any) {

        switch (typeof value) {
            case 'boolean':
                return EColumnTypes.BOOLEAN;
            default:
                if (this.isDate(value)) {
                    return EColumnTypes.DATE;
                }
                return EColumnTypes.TEXT;
        }
    }
}

export class ActionColumn {
    position: 'start' | 'end';
    icons: Icon[];
    title: string;
    constructor(options: Partial<ActionColumn>) {
        this.position = options.position ?? 'start';
        this.icons = options.icons ?? [];
        this.title = options.title ?? 'Actions';
    }
}

export class Icon {
    constructor(
        public name: string,
        public action: (...args: any[]) => void
    ) { }
}
