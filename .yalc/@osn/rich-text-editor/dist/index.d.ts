import * as React from 'react';

interface EditorProps {
    value?: string;
    onChange?: (value: string) => void;
    mentions?: any[];
}
declare function WYSIWYG(props: EditorProps): JSX.Element;

declare type DemoProps$1 = {};
declare const UniverseEditor: React.FunctionComponent<DemoProps$1>;

interface Suggestion {
    preview: React.ReactNode;
    value: string;
}
declare type DemoProps = {
    value: string;
    onChange: (value: string) => void;
    suggestions?: Suggestion[];
    minHeight?: number;
    theme?: "opensquare" | "subsquare";
};
declare const Editor: React.FunctionComponent<DemoProps>;

export { DemoProps, Editor, Suggestion, UniverseEditor, WYSIWYG, Editor as default };
