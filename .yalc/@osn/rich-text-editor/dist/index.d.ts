import * as React from 'react';

interface Suggestion {
    preview: React.ReactNode;
    value: string;
}
declare type DemoProps = {
    value: string;
    onChange: (value: string) => void;
    loadSuggestions?: (text: string) => Suggestion[];
    minHeight?: number;
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

export { CaretCoordinates, DemoProps, Editor, MentionState, Suggestion, Editor as default };
