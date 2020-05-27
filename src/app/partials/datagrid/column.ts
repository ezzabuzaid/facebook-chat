export type DisplayColumns<T> = {
    key: ((keyof T extends string ? keyof T : never) | 'actions');
    title: string;
}[];
