import * as React from 'react';

declare function WYSIWYG(props: any): JSX.Element;

interface Suggestion {
    preview: React.ReactNode;
    value: string;
}
declare type DemoProps = {
    value: string;
    onChange: (value: string) => void;
    suggestions?: Suggestion[];
    minHeight?: number;
};
declare const Editor: React.FunctionComponent<DemoProps>;

export { DemoProps, Editor, Suggestion, WYSIWYG, Editor as default };
