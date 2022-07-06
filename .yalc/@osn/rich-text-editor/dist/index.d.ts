import * as React from 'react';
import { ReactElement } from 'react';
import { BoundsStatic } from 'quill';

interface Suggestion {
    preview: React.ReactNode;
    value: string;
    address: string;
}
declare type DemoProps$1 = {
    value: string;
    onChange: (value: string) => void;
    minHeight?: number;
    theme?: "opensquare" | "subsquare";
    loadSuggestions?: (text: string) => Suggestion[];
    disabled?: boolean;
    identifier?: ReactElement;
};

interface EditorProps {
    value?: string;
    onChange?: (value: string) => void;
    mentions?: any[];
    setModalInsetFunc: (func: (bounds: BoundsStatic) => void, type: string) => void;
    loadSuggestions?: (text: string) => Suggestion[];
    minHeight?: number;
    identifier?: ReactElement;
}
declare function WYSIWYG(props: EditorProps): JSX.Element;

declare type DemoProps = {
    value: string;
    onChange: (value: string) => void;
    contentType: "markdown" | "html";
    setContentType: (contentType: "markdown" | "html") => void;
    minHeight?: number;
    loadSuggestions?: (text: string) => Suggestion[];
    disabled?: boolean;
    identifier?: ReactElement;
};
declare const UniverseEditor: React.FunctionComponent<DemoProps>;

declare const Editor: React.FunctionComponent<DemoProps$1>;

export { UniverseEditor, WYSIWYG, Editor as default };
