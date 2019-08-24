
type ColumnType = 'string' | 'number' | 'html' | 'custom';
type Columns<T> = {
    [p in keyof T]?: {
        type: ColumnType,
        title: string,
        valuePrepareFunction?: (column, row: T) => any
        [key: string]: any
    }
};
interface Actions {
    add: boolean;
    delete: boolean;
    edit: boolean;
}
interface Edit {
    editButtonContent: string;
}
interface Setting<T> {
    columns: Columns<T>;
    [key: string]: any;
    actions?: Actions;
    edit?: Edit;
}
export function ngTableSetting<T>(setting: Setting<T>) {
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
        add: {
            addButtonContent: '<i class="material-icons">add_circle</i>'
        },
        attr: {
            class: 'table table-bordered table-hover table-striped'
        },
        pager: {
            display: false
        },
        ...setting
    } as Setting<T>;
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
