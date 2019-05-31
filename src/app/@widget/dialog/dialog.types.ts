export namespace ModelDialog {

    export type AnimatationState = 'default' | 'end';

    export interface DialogProperites {
        width?: string;
        class?: string;
        data?: any;
        fadeEnter?: number;
        fadeLeave?: number;
    }

    export interface DialogAnimation {
        value: ModelDialog.AnimatationState;
        params: {
            fadeEnter: number,
            fadeLeave: number
        };
    }

}

// TODO Global dialog properties inteface
