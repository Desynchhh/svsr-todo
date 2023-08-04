export type Todo = {
    body: string;
    collectionId: string;
    collectionName: string;
    completed: boolean;
    created: string;
    id: string;
    title: string;
    updated: string;
};

export type PostTodo = {
    title: string;
    body?: string;
    completed: boolean;
};

export type PbResponse<T> = {
    items: T[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
};

export type ToastStatus =
    | "daisy-alert-info"
    | "daisy-alert-success"
    | "daisy-alert-warning"
    | "daisy-alert-error";

