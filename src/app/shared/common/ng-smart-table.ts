
type ColumnType = 'string' | 'number' | 'html' | 'custom';
type Columns<T> = {
    [p in keyof T]?: {
        type: ColumnType,
        filter?: boolean | IFilter;
        filterFunction?: () => any;
        sort?: boolean;
        sortDirection?: 'asc' | 'desc';
        class?: string;
        width?: string;
        title?: string,
        editable?: false,
        addable?: false,
        valuePrepareFunction?: (column: T[p], row: T) => any
        [key: string]: any;
    }
};
interface IFilter {
    type?: string;
    component?: string;
    config: {
        selectText: string,
        list: { title: string, value: string }[]
    };
}
interface IActions {
    add: boolean;
    delete: boolean;
    edit: boolean;
}
interface IEdit {
    editButtonContent?: string;
    inputClass?: string;
}
interface IAdd {
    cancelButtonContent?: string;
    createButtonContent?: string;
    inputClass?: string;
    confirmCreate?: boolean;
}

export interface ISetting<T> {
    columns: Columns<T>;
    [key: string]: any;
    actions?: Partial<IActions>;
    edit?: IEdit;
    add?: IAdd;
    delete?: {
        confirmDelete?: string,
        deleteButtonContent?: string;
    };
    mode?: 'external' | undefined;
    selectMode?: 'multi' | 'single';
    attr?: {
        class?: string;
    };
    noDataMessage?: string;
    rowClassFunction?: (row: { data: T }) => string;
}
export function ngTableSetting<T>(setting: ISetting<T>) {
    return {
        mode: 'external',
        actions: {
            add: true,
            delete: false,
            edit: true
        },
        edit: {
            editButtonContent: '<i class="material-icons">edit</i>'
        },
        delete: {
            deleteButtonContent: '<i class="material-icons">clear</i>'
        },
        add: {
            addButtonContent: '<i class="material-icons">add_circle</i>',
        },
        attr: {
            class: 'table table-bordered table-hover table-striped'
        },
        pager: {
            display: false
        },
        ...setting
    } as ISetting<T>;
}

export function listFilter({ placeholder = 'Select', list = [{ title: '', value: null }] }) {
    return {
        type: 'list',
        config: {
            selectText: placeholder,
            list
        },
    };
}
