import * as React from 'react';
import { BoundsStatic } from 'quill';

interface EditorProps {
    value?: string;
    onChange?: (value: string) => void;
    mentions?: any[];
    setModalInsetFunc: (func: (bounds: BoundsStatic) => void, type: string) => void;
    loadSuggestions?: (text: string) => Suggestion[];
}
declare function WYSIWYG(props: EditorProps): JSX.Element;

declare type DemoProps$1 = {
    value: string;
    onChange: (value: string) => void;
    minHeight?: number;
    loadSuggestions?: (text: string) => Suggestion[];
    disabled?: boolean;
};
declare const UniverseEditor: React.FunctionComponent<DemoProps$1>;

interface Suggestion {
    preview: React.ReactNode;
    value: string;
}
declare type DemoProps = {
    value: string;
    onChange: (value: string) => void;
    minHeight?: number;
    theme?: "opensquare" | "subsquare";
    loadSuggestions?: (text: string) => Suggestion[];
    disabled?: boolean;
};
interface CaretCoordinates {
    top: number;
    left: number;
    lineHeight: number;
}
interface MentionState {
    status: "active" | "inactive" | "loading";
    /**
     * Selection start by the time the mention was activated
     */
    startPosition?: number;
    focusIndex?: number;
    caret?: CaretCoordinates;
    suggestions: Suggestion[];
    /**
     * The character that triggered the mention. Example: @
     */
    triggeredBy?: string;
}
declare const Editor: React.FunctionComponent<DemoProps>;

export { CaretCoordinates, DemoProps, Editor, MentionState, Suggestion, UniverseEditor, WYSIWYG, Editor as default };
