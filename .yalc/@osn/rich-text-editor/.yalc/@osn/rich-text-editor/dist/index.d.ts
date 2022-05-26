import * as React from 'react';
import React__default from 'react';

interface SelectionRange {
    start: number;
    end: number;
}

/**
 * The state of the text of the whole editor
 */
interface TextState {
    /**
     * All the text in the editor
     */
    text: string;
    /**
     * The section of the text that is selected
     */
    selection: SelectionRange;
}
interface TextController {
    /**
     * Replaces the current selection with the new text. This will make the new selectedText to be empty, the
     * selection start and selection end will be the same and will both point to the end
     * @param text Text that should replace the current selection
     */
    replaceSelection(text: string): TextState;
    /**
     * Selects the specified text range
     * @param selection
     */
    setSelectionRange(selection: SelectionRange): TextState;
    /**
     * Get the current text state
     */
    getState(): TextState;
}

interface ExecuteOptions {
    initialState: TextState;
    textApi: TextController;
}
interface Command {
    shouldUndo?: (options: Pick<ExecuteOptions, "initialState">) => boolean;
    execute: (options: ExecuteOptions) => void;
    undo?: (options: ExecuteOptions) => void;
}
interface CommandContext {
    type: string;
}
declare type CommandMap<CommandName extends string> = Record<CommandName, Command>;

declare const boldCommand: Command;

declare const italicCommand: Command;

declare const strikethroughCommand: Command;

declare const linkCommand: Command;

declare const quoteCommand: Command;

declare const imageCommand: Command;

declare class CommandController<CommandName extends string> {
    private readonly textController;
    private readonly commandMap;
    /**
     * Indicates whether there is a command currently executing
     */
    isExecuting: boolean;
    constructor(textController: TextController, commandMap: CommandMap<CommandName>);
    executeCommand(commandName: CommandName, context?: CommandContext): Promise<void>;
}

declare class TextAreaTextController implements TextController {
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
    constructor(textAreaRef: React.RefObject<HTMLTextAreaElement>);
    replaceSelection(text: string): TextState;
    setSelectionRange(selection: SelectionRange): TextState;
    getState(): TextState;
}

declare type AlterLineFunction = (line: string, index: number) => string;
declare function makeList(state0: TextState, textController: TextController, insertBefore: string | AlterLineFunction): void;

type listHelpers_d_AlterLineFunction = AlterLineFunction;
declare const listHelpers_d_makeList: typeof makeList;
declare namespace listHelpers_d {
  export {
    listHelpers_d_AlterLineFunction as AlterLineFunction,
    listHelpers_d_makeList as makeList,
  };
}

/**
 * A list of helpers for manipulating markdown text.
 * These helpers do not interface with a textarea. For that, see
 */
declare function getSurroundingWord(text: string, position: number): SelectionRange;
/**
 * If the cursor is inside a word and (selection.start === selection.end)
 * returns a new Selection where the whole word is selected
 * @param text
 * @param selection
 */
declare function selectWord({ text, selection }: TextState): SelectionRange;
/**
 *  Gets the number of line-breaks that would have to be inserted before the given 'startPosition'
 *  to make sure there's an empty line between 'startPosition' and the previous text
 */
declare function getBreaksNeededForEmptyLineBefore(text: string | undefined, startPosition: number): number;
/**
 *  Gets the number of line-breaks that would have to be inserted after the given 'startPosition'
 *  to make sure there's an empty line between 'startPosition' and the next text
 */
declare function getBreaksNeededForEmptyLineAfter(text: string | undefined, startPosition: number): number;
declare function getSelectedText(textSection: TextState): string;
declare function getCharactersBeforeSelection(textState: TextState, characters: number): string;
declare function getCharactersAfterSelection(textState: TextState, characters: number): string;
/**
 * Inserts insertionString before each line
 */
declare function insertBeforeEachLine(selectedText: string, insertBefore: string | AlterLineFunction): {
    modifiedText: string;
    insertionLength: number;
};

declare const textHelpers_d_getSurroundingWord: typeof getSurroundingWord;
declare const textHelpers_d_selectWord: typeof selectWord;
declare const textHelpers_d_getBreaksNeededForEmptyLineBefore: typeof getBreaksNeededForEmptyLineBefore;
declare const textHelpers_d_getBreaksNeededForEmptyLineAfter: typeof getBreaksNeededForEmptyLineAfter;
declare const textHelpers_d_getSelectedText: typeof getSelectedText;
declare const textHelpers_d_getCharactersBeforeSelection: typeof getCharactersBeforeSelection;
declare const textHelpers_d_getCharactersAfterSelection: typeof getCharactersAfterSelection;
declare const textHelpers_d_insertBeforeEachLine: typeof insertBeforeEachLine;
declare namespace textHelpers_d {
  export {
    textHelpers_d_getSurroundingWord as getSurroundingWord,
    textHelpers_d_selectWord as selectWord,
    textHelpers_d_getBreaksNeededForEmptyLineBefore as getBreaksNeededForEmptyLineBefore,
    textHelpers_d_getBreaksNeededForEmptyLineAfter as getBreaksNeededForEmptyLineAfter,
    textHelpers_d_getSelectedText as getSelectedText,
    textHelpers_d_getCharactersBeforeSelection as getCharactersBeforeSelection,
    textHelpers_d_getCharactersAfterSelection as getCharactersAfterSelection,
    textHelpers_d_insertBeforeEachLine as insertBeforeEachLine,
  };
}

declare function setHeader(initialState: TextState, api: TextController, prefix: string): void;

declare const headerHelpers_d_setHeader: typeof setHeader;
declare namespace headerHelpers_d {
  export {
    headerHelpers_d_setHeader as setHeader,
  };
}

declare const codeCommand: Command;

declare type UseTextAreaMarkdownEditorResult<CommandName extends string> = {
    textController: TextController;
    commandController: CommandController<CommandName>;
};
declare type UseTextAreaMarkdownEditorOptions<CommandName extends string> = {
    commandMap: CommandMap<CommandName>;
};
declare function useTextAreaMarkdownEditor<CommandName extends string>(ref: React__default.RefObject<HTMLTextAreaElement>, options: UseTextAreaMarkdownEditorOptions<CommandName>): UseTextAreaMarkdownEditorResult<CommandName>;

declare const codeBlockCommand: Command;

declare const checkedListCommand: Command;

declare const orderedListCommand: Command;

declare const unorderedListCommand: Command;

declare type DemoProps = {};
declare const Editor: React.FunctionComponent<DemoProps>;

export { CommandController, DemoProps, Editor, TextAreaTextController, TextController, boldCommand, checkedListCommand, codeBlockCommand, codeCommand, Editor as default, headerHelpers_d as headerHelpers, imageCommand, italicCommand, linkCommand, listHelpers_d as listHelpers, orderedListCommand, quoteCommand, strikethroughCommand, textHelpers_d as textHelpers, unorderedListCommand, useTextAreaMarkdownEditor };
