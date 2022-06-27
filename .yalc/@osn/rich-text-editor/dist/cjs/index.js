'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var marked = require('marked');
var sanitizeHtml = require('sanitize-html');
var Prism = require('prismjs');
var styled = require('styled-components');
var ReactDOM = require('react-dom');
var Quill$1 = require('quill');
var defaultsDeep = require('lodash/defaultsDeep');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var sanitizeHtml__default = /*#__PURE__*/_interopDefaultLegacy(sanitizeHtml);
var Prism__default = /*#__PURE__*/_interopDefaultLegacy(Prism);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
var Quill__default = /*#__PURE__*/_interopDefaultLegacy(Quill$1);
var Quill__namespace = /*#__PURE__*/_interopNamespace(Quill$1);
var defaultsDeep__default = /*#__PURE__*/_interopDefaultLegacy(defaultsDeep);

/**
 * A list of helpers for manipulating markdown text.
 * These helpers do not interface with a textarea. For that, see
 */
function getSurroundingWord(text, position) {
    if (!text)
        throw Error("Argument 'text' should be truthy");
    const isWordDelimiter = (c) => c === " " || c.charCodeAt(0) === 10;
    // leftIndex is initialized to 0 because if selection is 0, it won't even enter the iteration
    let start = 0;
    // rightIndex is initialized to text.length because if selection is equal to text.length it won't even enter the interation
    let end = text.length;
    // iterate to the left
    for (let i = position; i - 1 > -1; i--) {
        if (isWordDelimiter(text[i - 1])) {
            start = i;
            break;
        }
    }
    // iterate to the right
    for (let i = position; i < text.length; i++) {
        if (isWordDelimiter(text[i])) {
            end = i;
            break;
        }
    }
    return { start, end };
}
/**
 * If the cursor is inside a word and (selection.start === selection.end)
 * returns a new Selection where the whole word is selected
 * @param text
 * @param selection
 */
function selectWord({ text, selection }) {
    if (text && text.length && selection.start === selection.end) {
        // the user is pointing to a word
        return getSurroundingWord(text, selection.start);
    }
    return selection;
}
/**
 *  Gets the number of line-breaks that would have to be inserted before the given 'startPosition'
 *  to make sure there's an empty line between 'startPosition' and the previous text
 */
function getBreaksNeededForEmptyLineBefore(text = "", startPosition) {
    if (startPosition === 0)
        return 0;
    // rules:
    // - If we're in the first line, no breaks are needed
    // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
    //      may need to insert 0, 1 or 2 breaks
    let neededBreaks = 2;
    let isInFirstLine = true;
    for (let i = startPosition - 1; i >= 0 && neededBreaks >= 0; i--) {
        switch (text.charCodeAt(i)) {
            case 32: // blank space
                continue;
            case 10: // line break
                neededBreaks--;
                isInFirstLine = false;
                break;
            default:
                return neededBreaks;
        }
    }
    return isInFirstLine ? 0 : neededBreaks;
}
/**
 *  Gets the number of line-breaks that would have to be inserted after the given 'startPosition'
 *  to make sure there's an empty line between 'startPosition' and the next text
 */
function getBreaksNeededForEmptyLineAfter(text = "", startPosition) {
    if (startPosition === text.length - 1)
        return 0;
    // rules:
    // - If we're in the first line, no breaks are needed
    // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
    //      may need to insert 0, 1 or 2 breaks
    let neededBreaks = 2;
    let isInLastLine = true;
    for (let i = startPosition; i < text.length && neededBreaks >= 0; i++) {
        switch (text.charCodeAt(i)) {
            case 32:
                continue;
            case 10: {
                neededBreaks--;
                isInLastLine = false;
                break;
            }
            default:
                return neededBreaks;
        }
    }
    return isInLastLine ? 0 : neededBreaks;
}
function getSelectedText(textSection) {
    return textSection.text.slice(textSection.selection.start, textSection.selection.end);
}
function getCharactersBeforeSelection(textState, characters) {
    return textState.text.slice(textState.selection.start - characters, textState.selection.start);
}
function getCharactersAfterSelection(textState, characters) {
    return textState.text.slice(textState.selection.end, textState.selection.end + characters);
}
/**
 * Inserts insertionString before each line
 */
function insertBeforeEachLine(selectedText, insertBefore) {
    const lines = selectedText.split(/\n/);
    let insertionLength = 0;
    const modifiedText = lines
        .map((item, index) => {
        if (typeof insertBefore === "string") {
            insertionLength += insertBefore.length;
            return insertBefore + item;
        }
        else if (typeof insertBefore === "function") {
            const insertionResult = insertBefore(item, index);
            insertionLength += insertionResult.length;
            return insertBefore(item, index) + item;
        }
        throw Error("insertion is expected to be either a string or a function");
    })
        .join("\n");
    return { modifiedText, insertionLength };
}

const boldCommand = {
    shouldUndo: options => {
        return (getCharactersBeforeSelection(options.initialState, 2) === "**" &&
            getCharactersAfterSelection(options.initialState, 2) === "**");
    },
    execute: ({ initialState, textApi }) => {
        // Adjust the selection to encompass the whole word if the caret is inside one
        const newSelectionRange = selectWord({
            text: initialState.text,
            selection: initialState.selection
        });
        const state1 = textApi.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the bold mark up
        const state2 = textApi.replaceSelection(`**${getSelectedText(state1)}**`);
        // Adjust the selection to not contain the **
        textApi.setSelectionRange({
            start: state2.selection.end - 2 - getSelectedText(state1).length,
            end: state2.selection.end - 2
        });
    },
    undo: ({ initialState, textApi }) => {
        const text = getSelectedText(initialState);
        textApi.setSelectionRange({
            start: initialState.selection.start - 2,
            end: initialState.selection.end + 2
        });
        textApi.replaceSelection(text);
        textApi.setSelectionRange({
            start: initialState.selection.start - 2,
            end: initialState.selection.end - 2
        });
    }
};

const strikethroughCommand = {
    execute: ({ initialState, textApi }) => {
        // Adjust the selection to encompass the whole word if the caret is inside one
        const newSelectionRange = selectWord({
            text: initialState.text,
            selection: initialState.selection
        });
        const state1 = textApi.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the strikethrough mark up
        const state2 = textApi.replaceSelection(`~~${getSelectedText(state1)}~~`);
        // Adjust the selection to not contain the ~~
        textApi.setSelectionRange({
            start: state2.selection.end - 2 - getSelectedText(state1).length,
            end: state2.selection.end - 2
        });
    }
};

const linkCommand = {
    execute: ({ initialState, textApi }) => {
        // Adjust the selection to encompass the whole word if the caret is inside one
        const newSelectionRange = selectWord({
            text: initialState.text,
            selection: initialState.selection
        });
        const state1 = textApi.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the bold mark up
        const state2 = textApi.replaceSelection(`[${getSelectedText(state1)}](url)`);
        // Adjust the selection to not contain the **
        textApi.setSelectionRange({
            start: state2.selection.end - 6 - getSelectedText(state1).length,
            end: state2.selection.end - 6
        });
    }
};

const imageCommand = {
    execute: ({ initialState, textApi }) => {
        // Replaces the current selection with the whole word selected
        const state1 = textApi.setSelectionRange(selectWord({
            text: initialState.text,
            selection: initialState.selection
        }));
        // Replaces the current selection with the image
        const imageTemplate = getSelectedText(state1) || "https://example.com/your-image.png";
        textApi.replaceSelection(`![](${imageTemplate})`);
        // Adjust the selection to not contain the **
        textApi.setSelectionRange({
            start: state1.selection.start + 4,
            end: state1.selection.start + 4 + imageTemplate.length
        });
    }
};

const codeCommand = {
    shouldUndo: options => {
        return (getCharactersBeforeSelection(options.initialState, 1) === "`" &&
            getCharactersAfterSelection(options.initialState, 1) === "`");
    },
    execute: ({ initialState, textApi }) => {
        // Adjust the selection to encompass the whole word if the caret is inside one
        const newSelectionRange = selectWord({
            text: initialState.text,
            selection: initialState.selection
        });
        const state1 = textApi.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the italic mark up
        const state2 = textApi.replaceSelection(`\`${getSelectedText(state1)}\``);
        // Adjust the selection to not contain the *
        textApi.setSelectionRange({
            start: state2.selection.end - 1 - getSelectedText(state1).length,
            end: state2.selection.end - 1
        });
    },
    undo: ({ initialState, textApi }) => {
        const text = getSelectedText(initialState);
        textApi.setSelectionRange({
            start: initialState.selection.start - 1,
            end: initialState.selection.end + 1
        });
        textApi.replaceSelection(text);
        textApi.setSelectionRange({
            start: initialState.selection.start - 1,
            end: initialState.selection.end - 1
        });
    }
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class CommandController {
    constructor(textController, commandMap) {
        /**
         * Indicates whether there is a command currently executing
         */
        this.isExecuting = false;
        this.textController = textController;
        this.commandMap = commandMap;
    }
    executeCommand(commandName, context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isExecuting) {
                // The simplest thing to do is to ignore commands while
                // there is already a command execu
                // ting. The alternative would be to queue commands
                // but there is no guarantee that the state after one command executes will still be compatible
                // with the next one. In fact, it is likely not to be.
                return;
            }
            const command = this.commandMap[commandName];
            if (!command) {
                throw new Error(`Cannot execute command. Command not found: ${commandName}`);
            }
            const executeOptions = {
                initialState: this.textController.getState(),
                textApi: this.textController
            };
            if (((_a = command.shouldUndo) === null || _a === void 0 ? void 0 : _a.call(command, executeOptions)) && (command === null || command === void 0 ? void 0 : command.undo)) {
                command.undo(executeOptions);
            }
            else {
                yield command.execute(executeOptions);
            }
        });
    }
}

class TextAreaTextController {
    constructor(textAreaRef) {
        this.textAreaRef = textAreaRef;
    }
    replaceSelection(text) {
        const { el: textArea } = this.ensureTextArea();
        insertText$1(textArea, text);
        return getStateFromTextArea(textArea);
    }
    setSelectionRange(selection) {
        const { el: textArea } = this.ensureTextArea();
        textArea.focus();
        textArea.selectionStart = selection.start;
        textArea.selectionEnd = selection.end;
        return getStateFromTextArea(textArea);
    }
    getState() {
        const { el: textArea } = this.ensureTextArea();
        return getStateFromTextArea(textArea);
    }
    ensureTextArea() {
        const textArea = this.textAreaRef.current;
        if (!textArea) {
            throw new Error("TextAreaRef is not set");
        }
        return {
            el: textArea,
            ref: this.textAreaRef
        };
    }
    get textArea() {
        return this.ensureTextArea().el;
    }
}
function getStateFromTextArea(textArea) {
    const re = /\r?\n|\r/;
    const { value } = textArea;
    const lineNumber = value.substr(0, textArea.selectionStart).split(re).length;
    const lineText = value.split(re)[lineNumber - 1];
    return {
        selection: {
            start: textArea.selectionStart,
            end: textArea.selectionEnd
        },
        text: value,
        lineNumber,
        lineText
    };
}
/**
 * Inserts the given text at the cursor. If the element contains a selection, the selection
 * will be replaced by the text.
 *    The MIT License
 *    Copyright (c) 2018 Dmitriy Kubyshkin
 *    Copied from https://github.com/grassator/insert-text-at-cursor
 */
function insertText$1(input, text) {
    var _a;
    // Most of the used APIs only work with the field selected
    input.focus();
    // IE 8-10
    if (document.selection) {
        const ieRange = document.selection.createRange();
        ieRange.text = text;
        // Move cursor after the inserted text
        ieRange.collapse(false /* to the end */);
        ieRange.select();
        return;
    }
    // Webkit + Edge
    const isSuccess = document.execCommand("insertText", false, text);
    if (!isSuccess) {
        const start = input.selectionStart || 0;
        const end = input.selectionEnd || 0;
        // Firefox (non-standard method)
        if (typeof input.setRangeText === "function") {
            input.setRangeText(text);
        }
        else {
            if (canManipulateViaTextNodes$1(input)) {
                const textNode = document.createTextNode(text);
                let node = input.firstChild;
                // If textarea is empty, just insert the text
                if (!node) {
                    input.appendChild(textNode);
                }
                else {
                    // Otherwise, we need to find a nodes for start and end
                    let offset = 0;
                    let startNode = null;
                    let endNode = null;
                    // To make a change we just need a Range, not a Selection
                    const range = document.createRange();
                    while (node && (startNode === null || endNode === null)) {
                        const nodeLength = ((_a = node.nodeValue) === null || _a === void 0 ? void 0 : _a.length) || 0;
                        // if start of the selection falls into current node
                        if (start >= offset && start <= offset + nodeLength) {
                            range.setStart((startNode = node), start - offset);
                        }
                        // if end of the selection falls into current node
                        if (end >= offset && end <= offset + nodeLength) {
                            range.setEnd((endNode = node), end - offset);
                        }
                        offset += nodeLength;
                        node = node.nextSibling;
                    }
                    // If there is some text selected, remove it as we should replace it
                    if (start !== end) {
                        range.deleteContents();
                    }
                    // Finally insert a new node. The browser will automatically
                    // split start and end nodes into two if necessary
                    range.insertNode(textNode);
                }
            }
            else {
                // For the text input the only way is to replace the whole value :(
                const value = input.value;
                input.value = value.slice(0, start) + text + value.slice(end);
            }
        }
        // Correct the cursor position to be at the end of the insertion
        input.setSelectionRange(start + text.length, start + text.length);
        // Notify any possible listeners of the change
        const e = document.createEvent("UIEvent");
        e.initEvent("input", true, false);
        input.dispatchEvent(e);
    }
}
/**
 *    The MIT License
 *    Copyright (c) 2018 Dmitriy Kubyshkin
 *    Copied from https://github.com/grassator/insert-text-at-cursor
 */
function canManipulateViaTextNodes$1(input) {
    if (input.nodeName !== "TEXTAREA") {
        return false;
    }
    let browserSupportsTextareaTextNodes;
    if (typeof browserSupportsTextareaTextNodes === "undefined") {
        const textarea = document.createElement("textarea");
        textarea.value = "1";
        browserSupportsTextareaTextNodes = !!textarea.firstChild;
    }
    return browserSupportsTextareaTextNodes;
}

function useTextAreaMarkdownEditor(ref, options) {
    const textController = React.useMemo(() => {
        return new TextAreaTextController(ref);
    }, [ref]);
    const commandController = React.useMemo(() => new CommandController(textController, options.commandMap), [ref]);
    return {
        textController,
        commandController,
    };
}

function makeList(state0, textController, insertBefore) {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
        text: state0.text,
        selection: state0.selection
    });
    const state1 = textController.setSelectionRange(newSelectionRange);
    const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(state1.text, state1.selection.start);
    const breaksBefore = Array(breaksBeforeCount + 1).join("\n");
    const breaksAfterCount = getBreaksNeededForEmptyLineAfter(state1.text, state1.selection.end);
    const breaksAfter = Array(breaksAfterCount + 1).join("\n");
    const modifiedText = insertBeforeEachLine(getSelectedText(state1), insertBefore);
    textController.replaceSelection(`${breaksBefore}${modifiedText.modifiedText}${breaksAfter}`);
    // Specifically when the text has only one line, we can exclude the "- ", for example, from the selection
    const oneLinerOffset = getSelectedText(state1).indexOf("\n") === -1
        ? modifiedText.insertionLength
        : 0;
    const selectionStart = state1.selection.start + breaksBeforeCount + oneLinerOffset;
    const selectionEnd = selectionStart + modifiedText.modifiedText.length - oneLinerOffset;
    // Adjust the selection to not contain the **
    textController.setSelectionRange({
        start: selectionStart,
        end: selectionEnd
    });
}

const orderedListCommand = {
    execute: ({ initialState, textApi }) => {
        makeList(initialState, textApi, (item, index) => `${index + 1}. `);
    }
};

const unorderedListCommand = {
    execute: ({ initialState, textApi }) => {
        makeList(initialState, textApi, "- ");
    }
};

const underlineCommand = {
    shouldUndo: options => {
        return (getCharactersBeforeSelection(options.initialState, 5) === "<ins>" &&
            getCharactersAfterSelection(options.initialState, 6) === "</ins>");
    },
    execute: ({ initialState, textApi }) => {
        // Adjust the selection to encompass the whole word if the caret is inside one
        const newSelectionRange = selectWord({
            text: initialState.text,
            selection: initialState.selection
        });
        const state1 = textApi.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the bold mark up
        const state2 = textApi.replaceSelection(`<ins>${getSelectedText(state1)}</ins>`);
        // Adjust the selection to not contain the **
        textApi.setSelectionRange({
            start: state2.selection.end - 5 - getSelectedText(state1).length,
            end: state2.selection.end - 6
        });
    },
    undo: ({ initialState, textApi }) => {
        const text = getSelectedText(initialState);
        textApi.setSelectionRange({
            start: initialState.selection.start - 5,
            end: initialState.selection.end + 6
        });
        textApi.replaceSelection(text);
        textApi.setSelectionRange({
            start: initialState.selection.start - 5,
            end: initialState.selection.end - 6
        });
    }
};

const newLineCommand = {
    execute(api) {
        const { textApi } = api;
        const { textArea } = textApi;
        if (!textArea) {
            return;
        }
        insertText$1(textArea, "\n");
    }
};

// https://github.com/codemirror/codemirror5/blob/master/addon/edit/continuelist.js
const listRE = /^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/;
const emptyListRE = /^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/;
const unorderedListRE = /[*+-]\s/;
const newLineAndIndentContinueMarkdownListCommand = {
    execute(api) {
        const newLine = () => newLineCommand.execute(api);
        const { initialState: state, textApi } = api;
        const { textArea } = textApi;
        if (!textArea) {
            return;
        }
        const { lineText: line } = state;
        const inList = listRE.exec(line);
        if (!inList) {
            newLine();
            return;
        }
        const match = listRE.exec(line);
        if (!match) {
            return;
        }
        if (emptyListRE.test(line)) {
            const focusIndex = state.selection.end;
            const listPrefix = match[0];
            textApi.setSelectionRange({
                start: focusIndex - listPrefix.length - 1,
                end: focusIndex
            });
            insertText$1(textArea, "\n");
        }
        else {
            const indent = match[1];
            const after = match[5];
            const numbered = !(unorderedListRE.test(match[2]) || match[2].indexOf(">") >= 0);
            const bullet = numbered
                ? parseInt(match[3], 10) + 1 + match[4]
                : match[2].replace("x", " ");
            insertText$1(textArea, "\n" + indent + bullet + after);
        }
    }
};

const no_scroll_bar = styled.css `
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const MarkdownPreviewWrapper = styled__default["default"].div `
  box-sizing: border-box;
  flex-basis: 100%;
  min-height: 144px;
  background-color: #fbfcfe;
  ${props => props.theme && props.theme.preview};
  padding: 12px;

  .markdown-body {
    background-color: inherit !important;
  }

  ${props => props.minHeight &&
    styled.css `
      min-height: ${props.minHeight}px;
    `};
`;
const MarkdownBody = styled__default["default"].div `
  font-size: 14px;
  line-height: 24px;
  font-weight: normal;
  color: #1e2134;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: transparent;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;

    :not(:first-child) {
      margin-top: 0.25em;
    }

    :not(:last-child) {
      margin-bottom: 0.25em;
    }

    :last-child {
      margin-bottom: 0;
    }
  }

  h1 {
    line-height: 2em;
    font-size: 1.25em;
  }

  h2 {
    line-height: 1.875em;
    font-size: 1.1875em;
  }

  h3 {
    line-height: 1.75em;
    font-size: 1.125em;
  }

  h4 {
    line-height: 1.625em;
    font-size: 1em;
  }

  h5 {
    line-height: 1.5em;
    font-size: 0.9375em;
  }

  h6 {
    line-height: 1.375em;
    font-size: 0.875em;
  }

  p {
    max-width: 48.5em;
    word-break: break-word;
    line-height: 24px !important;
  }

  ol,
  ul {
    padding-left: 1.25em;
  }

  ul {
    list-style-type: disc;
  }

  blockquote {
    margin: 0;
    padding-left: 0.75em;
    border-left: 4px solid #eee;
  }

  pre {
    ${no_scroll_bar};

    * {
      font-family: i-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
        Liberation Mono, monospace !important;
    }

    margin: 8px 0;
    padding: 0 1em;
    background: #f5f8fa !important;
    border-radius: 0.25em;
    white-space: pre-wrap !important;
    overflow-x: scroll;

    > code {
      padding: 0 !important;
      background: transparent !important;
      white-space: pre-wrap !important;

      span.identifier {
        white-space: nowrap !important;
      }
    }
  }

  code {
    font-family: i-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
      Liberation Mono, monospace !important;
    ${no_scroll_bar};
    max-width: 100%;
    padding: 0 0.25rem;
    background: #f5f8fa !important;
    border-radius: 0.25rem;
    white-space: nowrap !important;
    word-break: keep-all;
    overflow-x: scroll;
    display: inline-flex;
  }

  a {
    color: #0974cd;
    cursor: pointer;
  }

  img {
    max-width: 100%;
  }

  p a::selection {
    background-color: transparent !important;
    color: inherit;
  }

  th,
  td {
    border: 1px solid #e0e4eb;
  }

  table {
    margin: 8px 0;
    border-collapse: collapse;
    max-width: 100%;
    overflow: auto;
    display: block;
  }

  th {
    padding: 10px 16px;
    background: #f6f7fa;
    font-weight: bold;
    color: #1e2134;
    min-width: 100px;
  }

  td {
    padding: 10px 16px;
    color: #1e2134;
  }
`;

function MarkdownPreview(props = { minHeight: 144 }) {
    const { content = "", allowedTags = sanitizeHtml__default["default"].defaults.allowedTags.concat([
        "img",
        "iframe",
        "br",
        "ins",
        "del"
    ]) } = props, restProps = __rest(props, ["content", "allowedTags"]);
    const html = marked.marked.parse(content, {
        breaks: true,
        highlight(code, lang) {
            var _a;
            if (!lang) {
                return code;
            }
            const language = (_a = Prism__default["default"].languages[lang]) !== null && _a !== void 0 ? _a : Prism__default["default"].languages.markup;
            return Prism__default["default"].highlight(code, language, lang);
        }
    });
    const cleanHtml = sanitizeHtml__default["default"](html, {
        allowedTags,
        allowedAttributes: {
            img: ["src", "size", "width", "height"],
            iframe: ["src", "width", "height"],
            a: ["href", "rel", "target"],
            "*": ["class"],
            td: ["align"],
            th: ["align"]
        }
    });
    return (React__default["default"].createElement(MarkdownPreviewWrapper, Object.assign({}, restProps),
        React__default["default"].createElement(MarkdownBody, { className: `markdown-body`, dangerouslySetInnerHTML: { __html: cleanHtml } })));
}

const SuggestionsWrapper = styled__default["default"].ul `
  position: absolute;
  min-width: 180px;
  padding: 8px 0;
  margin: 20px 0 0;
  list-style: none;
  cursor: pointer;
  background: #fff;
  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.06),
    0px 0.751293px 8px rgba(26, 33, 44, 0.04);
  color: #506176;

  li {
    padding: 6px 16px;

    &:hover,
    &[aria-selected="true"] {
      background-color: #f0f3f8;
    }
  }
`;
const SuggestionsDropdown = ({ suggestions, caret, onSuggestionSelected, suggestionsAutoplace, focusIndex, textAreaRef, max = 5 }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const handleSuggestionClick = (event) => {
        event.preventDefault();
        // @ts-ignore
        const index = parseInt(event.currentTarget.attributes["data-index"].value);
        onSuggestionSelected(index);
    };
    const handleMouseDown = (event) => event.preventDefault();
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const left = caret.left - ((_b = (_a = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _a === void 0 ? void 0 : _a.scrollLeft) !== null && _b !== void 0 ? _b : 0) + 30;
    const top = caret.top - ((_d = (_c = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _c === void 0 ? void 0 : _c.scrollTop) !== null && _d !== void 0 ? _d : 0) + 60;
    const style = {};
    style.top = top;
    if (suggestionsAutoplace &&
        left + ((_g = (_f = (_e = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _e === void 0 ? void 0 : _e.getBoundingClientRect()) === null || _f === void 0 ? void 0 : _f.left) !== null && _g !== void 0 ? _g : 0) > vw / 2)
        style.right = ((_j = (_h = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _h === void 0 ? void 0 : _h.offsetWidth) !== null && _j !== void 0 ? _j : 0) - left;
    else
        style.left = left;
    return (React__namespace.createElement(SuggestionsWrapper, { style: style }, suggestions.slice(0, max).map((s, i) => (React__namespace.createElement("li", { onClick: handleSuggestionClick, onMouseDown: handleMouseDown, key: i, "aria-selected": focusIndex === i ? "true" : "false", "data-index": `${i}` }, s.preview)))));
};

const EditorWrapper = styled__default["default"].div `
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #e2e8f0;
  ${props => props.theme.wrapper};
  ${p => p.disabled &&
    styled.css `
      pointer-events: none;
      cursor: not-allowed;
    `}
`;
const ToolBar = styled__default["default"].div `
  flex-basis: 100%;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  ${props => props.theme.toolbar};
  /* mobile */
  @media screen and (max-width: 769px) {
    display: block;
    padding-left: 0;
    padding-right: 0;
  }
`;
const TabsWrapper = styled__default["default"].div `
  display: flex;
  gap: 24px;
  height: 48px;
  /* mobile */
  @media screen and (max-width: 769px) {
    border-bottom: 1px solid #e2e8f0;
  }
  ${props => props.theme.tabs};
`;
const Tab = styled__default["default"].button `
  all: unset;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  border-bottom: 3px solid #ffffff;
  ${props => props.theme.tab};
  ${props => props.active &&
    props.theme === "opensquare" &&
    styled.css `
      border-bottom: 3px solid #04d2c5;
    `};
  ${props => props.active &&
    styled.css `
      border-bottom: 3px solid #04d2c5;
    `};
  ${props => props.active && props.theme.tabActive};
  cursor: pointer;
  /* mobile */
  @media screen and (max-width: 769px) {
    margin-left: 16px;
    margin-right: 16px;
    width: 50%;
    text-align: center;
  }
`;
const ToolbarItemsWrapper = styled__default["default"].div `
  display: flex;
  align-items: center;
  gap: 8px;
  ${props => props.hide &&
    styled.css `
      display: none;
    `};
  /* mobile */
  @media screen and (max-width: 769px) {
    height: 48px;
  }
`;
const ToolbarButton = styled__default["default"].button `
  all: unset;
  cursor: pointer;
  width: 24px;
  height: 24px;

  &:hover svg path {
    fill: #1e2134;
  }
`;
const Textarea = styled__default["default"].textarea `
  box-sizing: border-box;
  width: 100%;
  min-height: 144px;
  ${props => props.minHeight &&
    styled.css `
      min-height: ${props.minHeight}px;
    `};
  ${props => props.height &&
    styled.css `
      height: ${props.height}px;
    `};
  ${props => props.hide &&
    styled.css `
      display: none;
    `};
  max-height: 672px;
  resize: vertical;
  outline: none;
  font-size: 14px;
  line-height: 24px;
  padding: 12px;
  background: #fbfcfe;
  font-family: Inter, sans-serif;
  border: none;
  border-bottom: 1px solid #e2e8f0;
  ${props => props.theme.textarea};

  :hover,
  :focus {
    border-color: #b7c0cc;
  }

  ::selection {
    background-color: #e2e8f0;
  }
`;

function Bold () {
    return React__default["default"].createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.5 5.25C6.87868 5.25 6.375 5.75368 6.375 6.375V12V17.625C6.375 18.2463 6.87868 18.75 7.5 18.75H13.6875C15.8621 18.75 17.625 16.9871 17.625 14.8125C17.625 13.4029 16.8843 12.1663 15.7709 11.4707C16.2299 10.8267 16.5 10.0386 16.5 9.1875C16.5 7.01288 14.7371 5.25 12.5625 5.25H7.5ZM12.5625 10.875C13.4945 10.875 14.25 10.1195 14.25 9.1875C14.25 8.25552 13.4945 7.5 12.5625 7.5H8.625V10.875H12.5625ZM8.625 13.125V16.5H13.6875C14.6194 16.5 15.375 15.7444 15.375 14.8125C15.375 13.8805 14.6194 13.125 13.6875 13.125H12.5625H8.625Z", fill: "#506176" }));
}

function Underline () {
    return React__default["default"].createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default["default"].createElement("path", { d: "M7.83458 4.47119C8.29469 4.47119 8.66767 4.84418 8.66767 5.30428V11.1979C8.66767 12.0817 9.01876 12.9293 9.64369 13.5542C10.2686 14.1792 11.1162 14.5303 12 14.5303C12.8838 14.5303 13.7314 14.1792 14.3563 13.5542C14.9813 12.9293 15.3324 12.0817 15.3324 11.1979V5.30428C15.3324 4.84418 15.7053 4.47119 16.1654 4.47119C16.6255 4.47119 16.9985 4.84418 16.9985 5.30428V11.1979C16.9985 12.5236 16.4719 13.795 15.5345 14.7324C14.5971 15.6698 13.3257 16.1964 12 16.1964C10.6743 16.1964 9.40293 15.6698 8.46553 14.7324C7.52813 13.795 7.0015 12.5236 7.0015 11.1979V5.30428C7.0015 4.84418 7.37448 4.47119 7.83458 4.47119ZM5.33533 18.6957C5.33533 18.2356 5.70831 17.8626 6.16841 17.8626H17.8316C18.2917 17.8626 18.6647 18.2356 18.6647 18.6957C18.6647 19.1558 18.2917 19.5288 17.8316 19.5288H6.16841C5.70831 19.5288 5.33533 19.1558 5.33533 18.6957Z", fill: "#506176" }));
}

function Delete () {
    return React__default["default"].createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default["default"].createElement("path", { d: "M16.6512 13.805C16.8588 14.2707 16.9635 14.7887 16.9635 15.3573C16.9635 16.5684 16.4906 17.516 15.5457 18.1974C14.599 18.8788 13.2931 19.2199 11.6262 19.2199C10.315 19.2199 9.01593 18.9501 7.72823 18.4098C7.42154 18.2811 7.23108 17.9755 7.23108 17.6429C7.23108 16.98 7.95555 16.5584 8.57437 16.7963C9.51561 17.1581 10.4714 17.3391 11.4421 17.3391C13.7443 17.3391 14.8986 16.6785 14.9067 15.3564C14.9115 15.0883 14.8622 14.822 14.7617 14.5735C14.6397 14.2718 14.4437 14.0285 14.2136 13.8041H3.87744V11.9991H20.1222V13.8041L16.6512 13.805ZM12.9709 11.0976H8.05505C7.89696 10.9534 7.75171 10.7958 7.62095 10.6265C7.23108 10.1229 7.03614 9.51459 7.03614 8.79802C7.03614 7.68255 7.4567 6.73403 8.29692 5.95248C9.13894 5.17093 10.4394 4.78015 12.2002 4.78015C13.3572 4.78015 14.471 5.005 15.5405 5.4547C15.8317 5.57715 16.0105 5.86855 16.0105 6.18445C16.0105 6.81951 15.3138 7.22863 14.7102 7.03118C13.9959 6.79751 13.2423 6.68079 12.4493 6.68079C10.2111 6.68079 9.09291 7.38653 9.09291 8.79802C9.09291 9.17706 9.28965 9.50737 9.68313 9.78985C10.0766 10.0723 10.5622 10.297 11.1388 10.4667C11.6984 10.6292 12.3094 10.8403 12.9709 11.0976Z", fill: "#506176" }));
}

function Ul () {
    return React__default["default"].createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.25 7.5C5.87132 7.5 6.375 6.99632 6.375 6.375C6.375 5.75368 5.87132 5.25 5.25 5.25C4.62868 5.25 4.125 5.75368 4.125 6.375C4.125 6.99632 4.62868 7.5 5.25 7.5ZM9.46875 5.8125C9.00276 5.8125 8.625 6.19026 8.625 6.65625C8.625 7.12224 9.00276 7.5 9.46875 7.5H19.0312C19.4972 7.5 19.875 7.12224 19.875 6.65625C19.875 6.19026 19.4972 5.8125 19.0312 5.8125H9.46875ZM9.46875 11.4375C9.00276 11.4375 8.625 11.8153 8.625 12.2812C8.625 12.7472 9.00276 13.125 9.46875 13.125H19.0312C19.4972 13.125 19.875 12.7472 19.875 12.2812C19.875 11.8153 19.4972 11.4375 19.0312 11.4375H9.46875ZM9.46875 17.0625C9.00276 17.0625 8.625 17.4403 8.625 17.9062C8.625 18.3722 9.00276 18.75 9.46875 18.75H19.0312C19.4972 18.75 19.875 18.3722 19.875 17.9062C19.875 17.4403 19.4972 17.0625 19.0312 17.0625H9.46875ZM6.375 12C6.375 12.6213 5.87132 13.125 5.25 13.125C4.62868 13.125 4.125 12.6213 4.125 12C4.125 11.3787 4.62868 10.875 5.25 10.875C5.87132 10.875 6.375 11.3787 6.375 12ZM5.25 18.75C5.87132 18.75 6.375 18.2463 6.375 17.625C6.375 17.0037 5.87132 16.5 5.25 16.5C4.62868 16.5 4.125 17.0037 4.125 17.625C4.125 18.2463 4.62868 18.75 5.25 18.75Z", fill: "#506176" }));
}

function Ol () {
    return React__default["default"].createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default["default"].createElement("g", { clipPath: "url(#clip0_10067_7942)" },
            React__default["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.25379 5.81256C5.25379 5.61771 5.15297 5.43674 4.98729 5.3342C4.82161 5.23166 4.61467 5.22216 4.44028 5.30909L3.31171 5.87163C3.03365 6.01023 2.9206 6.348 3.0592 6.62607C3.19781 6.90412 3.53558 7.01717 3.81364 6.87857L4.12869 6.72152V9.75041H3.56267C3.25199 9.75041 3.00012 10.0023 3.00012 10.313C3.00012 10.6236 3.25199 10.8755 3.56267 10.8755H5.81981C6.1305 10.8755 6.38237 10.6236 6.38237 10.313C6.38237 10.0023 6.1305 9.75041 5.81981 9.75041H5.25379V5.81256ZM8.625 6.65625C8.625 6.19026 9.00276 5.8125 9.46875 5.8125H19.0312C19.4972 5.8125 19.875 6.19026 19.875 6.65625C19.875 7.12224 19.4972 7.5 19.0312 7.5H9.46875C9.00276 7.5 8.625 7.12224 8.625 6.65625ZM8.625 12.2813C8.625 11.8153 9.00276 11.4375 9.46875 11.4375H19.0312C19.4972 11.4375 19.875 11.8153 19.875 12.2813C19.875 12.7472 19.4972 13.125 19.0312 13.125H9.46875C9.00276 13.125 8.625 12.7472 8.625 12.2813ZM8.625 17.9062C8.625 17.4403 9.00276 17.0625 9.46875 17.0625H19.0312C19.4972 17.0625 19.875 17.4403 19.875 17.9062C19.875 18.3722 19.4972 18.75 19.0312 18.75H9.46875C9.00276 18.75 8.625 18.3722 8.625 17.9062ZM4.03995 14.61L4.04291 14.6056C4.04773 14.5986 4.05728 14.5854 4.07144 14.5678C4.10025 14.532 4.1451 14.4824 4.20459 14.4331C4.32321 14.3347 4.48173 14.2508 4.68778 14.2508C4.90752 14.2508 5.03307 14.328 5.10985 14.415C5.19565 14.5124 5.25351 14.6617 5.25351 14.8385C5.25351 15.3474 4.95073 15.606 4.35347 16.0506L4.31406 16.0798C3.77839 16.4778 3.00014 17.0562 3.00014 18.1874C3.00014 18.3366 3.05941 18.4797 3.1649 18.5852C3.2704 18.6907 3.41349 18.75 3.56269 18.75H5.81598C6.12667 18.75 6.37861 18.4981 6.37861 18.1874C6.37861 17.8768 6.12675 17.6249 5.81607 17.6249H4.28937C4.4375 17.4029 4.6846 17.2066 5.02528 16.953L5.07777 16.914C5.60737 16.5211 6.37861 15.9489 6.37861 14.8385C6.37861 14.4275 6.2455 14.0018 5.95376 13.6709C5.65299 13.3298 5.21441 13.1257 4.6878 13.1257C4.14752 13.1257 3.74348 13.3537 3.48613 13.5673C3.35763 13.6739 3.26115 13.7803 3.19562 13.8616C3.16261 13.9025 3.13674 13.9379 3.11793 13.9651C3.10851 13.9787 3.10079 13.9903 3.09479 13.9996L3.08704 14.0118L3.08411 14.0165L3.08288 14.0185L3.08206 14.0199C2.92084 14.2854 3.00519 14.6318 3.27078 14.793C3.53439 14.9531 3.87721 14.8709 4.03995 14.61ZM3.56263 14.3121L3.08206 14.0199C3.08206 14.0199 3.0818 14.0203 3.56263 14.3121Z", fill: "#506176" })),
        React__default["default"].createElement("defs", null,
            React__default["default"].createElement("clipPath", { id: "clip0_10067_7942" },
                React__default["default"].createElement("rect", { width: "18", height: "18", fill: "white", transform: "translate(3 3)" }))));
}

function Link () {
    return React__default["default"].createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11.7469 6.68446C11.5978 6.8444 11.5167 7.05596 11.5205 7.27454C11.5244 7.49313 11.6129 7.70168 11.7675 7.85628C11.9221 8.01087 12.1307 8.09942 12.3493 8.10328C12.5679 8.10713 12.7794 8.026 12.9394 7.87696L14.3456 6.47071C14.5546 6.26166 14.8028 6.09583 15.076 5.9827C15.3491 5.86955 15.6418 5.81132 15.9375 5.81132C16.2331 5.81132 16.5259 5.86955 16.799 5.9827C17.0722 6.09583 17.3203 6.26166 17.5294 6.47071C17.7384 6.67976 17.9042 6.92793 18.0174 7.20106C18.1305 7.4742 18.1887 7.76695 18.1887 8.06258C18.1887 8.35822 18.1305 8.65096 18.0174 8.9241C17.9042 9.19723 17.7384 9.4454 17.5294 9.65446L14.7169 12.467C14.5078 12.6762 14.2598 12.8421 13.9866 12.9553C13.7135 13.0686 13.4207 13.1269 13.125 13.1269C12.8293 13.1269 12.5365 13.0686 12.2634 12.9553C11.9902 12.8421 11.7421 12.6762 11.5331 12.467C11.3732 12.3179 11.1616 12.2368 10.943 12.2406C10.7244 12.2445 10.5159 12.333 10.3613 12.4876C10.2067 12.6422 10.1181 12.8508 10.1143 13.0694C10.1104 13.288 10.1916 13.4995 10.3406 13.6595C10.7063 14.0251 11.1403 14.3152 11.6181 14.5131C12.0958 14.711 12.6079 14.8128 13.125 14.8128C13.6421 14.8128 14.1542 14.711 14.6319 14.5131C15.1096 14.3152 15.5437 14.0251 15.9094 13.6595L18.7219 10.847C19.4603 10.1085 19.8752 9.10692 19.8752 8.06258C19.8752 7.01824 19.4603 6.01667 18.7219 5.27821C17.9834 4.53974 16.9818 4.12488 15.9375 4.12488C14.8932 4.12488 13.8916 4.53974 13.1531 5.27821L11.7469 6.68446ZM6.47062 17.5295C6.26141 17.3204 6.09545 17.0724 5.98223 16.7992C5.869 16.5261 5.81071 16.2332 5.81071 15.9376C5.81071 15.6419 5.869 15.3491 5.98223 15.0759C6.09545 14.8028 6.26141 14.5546 6.47062 14.3457L9.28312 11.5332C9.49207 11.324 9.74023 11.158 10.0134 11.0448C10.2865 10.9316 10.5793 10.8733 10.875 10.8733C11.1707 10.8733 11.4635 10.9316 11.7366 11.0448C12.0097 11.158 12.2579 11.324 12.4669 11.5332C12.6268 11.6822 12.8384 11.7634 13.057 11.7595C13.2755 11.7557 13.4841 11.6671 13.6387 11.5125C13.7933 11.3579 13.8818 11.1494 13.8857 10.9308C13.8895 10.7122 13.8084 10.5007 13.6594 10.3407C13.2937 9.97503 12.8596 9.68496 12.3819 9.48706C11.9042 9.28916 11.3921 9.18729 10.875 9.18729C10.3579 9.18729 9.84582 9.28916 9.36808 9.48706C8.89034 9.68496 8.45625 9.97503 8.09062 10.3407L5.27812 13.1532C4.53964 13.8917 4.12479 14.8932 4.12479 15.9376C4.12479 16.9819 4.53964 17.9835 5.27812 18.722C6.01658 19.4604 7.01814 19.8753 8.06249 19.8753C9.10683 19.8753 10.1084 19.4604 10.8469 18.722L12.2531 17.3157C12.4022 17.1557 12.4833 16.9442 12.4794 16.7256C12.4756 16.5071 12.387 16.2985 12.2324 16.1439C12.0778 15.9893 11.8693 15.9007 11.6507 15.8969C11.4321 15.893 11.2206 15.9741 11.0606 16.1232L9.65437 17.5295C9.4454 17.7386 9.19725 17.9046 8.92411 18.0178C8.65096 18.1311 8.35818 18.1894 8.06249 18.1894C7.7668 18.1894 7.47402 18.1311 7.20087 18.0178C6.92773 17.9046 6.67957 17.7386 6.47062 17.5295Z", fill: "#506176" }));
}

function Img () {
    return React__default["default"].createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default["default"].createElement("g", { clipPath: "url(#clip0_10067_7948)" },
            React__default["default"].createElement("path", { d: "M18.75 14.25V16.5H21V18H18.75V20.25H17.25V18H15V16.5H17.25V14.25H18.75ZM18.756 5.25C19.167 5.25 19.5 5.58375 19.5 5.99475V13.0065C19.0183 12.8363 18.511 12.7496 18 12.75V6.75H6.00003L6.00078 17.25L12.9698 10.2802C13.0987 10.1509 13.2705 10.073 13.4529 10.0614C13.6352 10.0498 13.8155 10.1053 13.9598 10.2172L14.0295 10.281L16.689 12.9435C16.1075 13.1207 15.5679 13.4138 15.1027 13.8052C14.6376 14.1966 14.2565 14.6781 13.9825 15.2208C13.7084 15.7635 13.5472 16.356 13.5083 16.9627C13.4695 17.5693 13.5539 18.1776 13.7565 18.7507L5.24403 18.75C5.04664 18.7498 4.8574 18.6712 4.7179 18.5316C4.57839 18.392 4.50003 18.2026 4.50003 18.0052V5.99475C4.5014 5.79778 4.58021 5.60926 4.71942 5.46991C4.85862 5.33056 5.04707 5.25157 5.24403 5.25H18.756ZM9.00003 8.25C9.39786 8.25 9.77939 8.40804 10.0607 8.68934C10.342 8.97064 10.5 9.35218 10.5 9.75C10.5 10.1478 10.342 10.5294 10.0607 10.8107C9.77939 11.092 9.39786 11.25 9.00003 11.25C8.60221 11.25 8.22067 11.092 7.93937 10.8107C7.65807 10.5294 7.50003 10.1478 7.50003 9.75C7.50003 9.35218 7.65807 8.97064 7.93937 8.68934C8.22067 8.40804 8.60221 8.25 9.00003 8.25Z", fill: "#506176" })),
        React__default["default"].createElement("defs", null,
            React__default["default"].createElement("clipPath", { id: "clip0_10067_7948" },
                React__default["default"].createElement("rect", { width: "18", height: "18", fill: "white", transform: "translate(3 3)" }))));
}

function Code () {
    return React__default["default"].createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8.30963 6.62213C8.63913 6.29262 9.17337 6.29262 9.50287 6.62213C9.83237 6.95163 9.83237 7.48587 9.50287 7.81537L5.31824 12L9.50287 16.1847C9.83237 16.5142 9.83237 17.0483 9.50287 17.3778C9.17337 17.7073 8.63913 17.7073 8.30963 17.3778L3.52838 12.5966C3.19887 12.2671 3.19887 11.7329 3.52838 11.4034L8.30963 6.62213ZM15.6903 6.62213C15.3608 6.29262 14.8267 6.29262 14.4972 6.62213C14.1676 6.95163 14.1676 7.48587 14.4972 7.81537L18.6817 12L14.4972 16.1847C14.1676 16.5142 14.1676 17.0483 14.4972 17.3778C14.8267 17.7073 15.3608 17.7073 15.6903 17.3778L20.4716 12.5966C20.8011 12.2671 20.8011 11.7329 20.4716 11.4034L15.6903 6.62213Z", fill: "#506176" }));
}

function EditorHeader({ theme, editStatus, setEditStatus, isPreview, commandController }) {
    return React__namespace.createElement(ToolBar, { theme: theme },
        React__namespace.createElement(TabsWrapper, { theme: theme },
            React__namespace.createElement(Tab, { active: editStatus === "write", onClick: () => setEditStatus("write"), theme: theme }, "Write"),
            React__namespace.createElement(Tab, { active: editStatus === "preview", onClick: () => setEditStatus("preview"), theme: theme }, "Preview")),
        React__namespace.createElement(ToolbarItemsWrapper, { hide: isPreview },
            React__namespace.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("bold");
                }) },
                React__namespace.createElement(Bold, null)),
            React__namespace.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("underline");
                }) },
                React__namespace.createElement(Underline, null)),
            React__namespace.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("delete");
                }) },
                React__namespace.createElement(Delete, null)),
            React__namespace.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("ul");
                }) },
                React__namespace.createElement(Ul, null)),
            React__namespace.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("ol");
                }) },
                React__namespace.createElement(Ol, null)),
            React__namespace.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("link");
                }) },
                React__namespace.createElement(Link, null)),
            React__namespace.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("image");
                }) },
                React__namespace.createElement(Img, null)),
            React__namespace.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("code");
                }) },
                React__namespace.createElement(Code, null))));
}

function insertText(input, text) {
    // Most of the used APIs only work with the field selected
    input.focus();
    // IE 8-10
    if (document.selection) {
        const ieRange = document.selection.createRange();
        ieRange.text = text;
        // Move cursor after the inserted text
        ieRange.collapse(false /* to the end */);
        ieRange.select();
        return;
    }
    // Webkit + Edge
    const isSuccess = document.execCommand("insertText", false, text);
    if (!isSuccess) {
        const start = input.selectionStart;
        const end = input.selectionEnd;
        // Firefox (non-standard method)
        if (typeof input.setRangeText === "function") {
            input.setRangeText(text);
        }
        else {
            if (canManipulateViaTextNodes(input)) {
                const textNode = document.createTextNode(text);
                let node = input.firstChild;
                // If textarea is empty, just insert the text
                if (!node) {
                    input.appendChild(textNode);
                }
                else {
                    // Otherwise we need to find a nodes for start and end
                    let offset = 0;
                    let startNode = null;
                    let endNode = null;
                    // To make a change we just need a Range, not a Selection
                    const range = document.createRange();
                    while (node && (startNode === null || endNode === null)) {
                        const nodeLength = node.nodeValue.length;
                        // if start of the selection falls into current node
                        if (start >= offset && start <= offset + nodeLength) {
                            range.setStart((startNode = node), start - offset);
                        }
                        // if end of the selection falls into current node
                        if (end >= offset && end <= offset + nodeLength) {
                            range.setEnd((endNode = node), end - offset);
                        }
                        offset += nodeLength;
                        node = node.nextSibling;
                    }
                    // If there is some text selected, remove it as we should replace it
                    if (start !== end) {
                        range.deleteContents();
                    }
                    // Finally insert a new node. The browser will automatically
                    // split start and end nodes into two if necessary
                    range.insertNode(textNode);
                }
            }
            else {
                // For the text input the only way is to replace the whole value :(
                const value = input.value;
                input.value = value.slice(0, start) + text + value.slice(end);
            }
        }
        // Correct the cursor position to be at the end of the insertion
        input.setSelectionRange(start + text.length, start + text.length);
        // Notify any possible listeners of the change
        const e = document.createEvent("UIEvent");
        e.initEvent("input", true, false);
        input.dispatchEvent(e);
    }
}
function canManipulateViaTextNodes(input) {
    if (input.nodeName !== "TEXTAREA") {
        return false;
    }
    let browserSupportsTextareaTextNodes;
    if (typeof browserSupportsTextareaTextNodes === "undefined") {
        const textarea = document.createElement("textarea");
        textarea.value = "1";
        browserSupportsTextareaTextNodes = !!textarea.firstChild;
    }
    return browserSupportsTextareaTextNodes;
}

const properties = [
    "direction",
    "boxSizing",
    "width",
    "height",
    "overflowX",
    "overflowY",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "borderStyle",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    // https://developer.mozilla.org/en-US/docs/Web/CSS/font
    "fontStyle",
    "fontVariant",
    "fontWeight",
    "fontStretch",
    "fontSize",
    "fontSizeAdjust",
    "lineHeight",
    "fontFamily",
    "textAlign",
    "textTransform",
    "textIndent",
    "textDecoration",
    "letterSpacing",
    "wordSpacing",
    "tabSize",
    "MozTabSize"
];
function getCaretCoordinates(element, append) {
    if (typeof window === "undefined") {
        throw new Error("getCaretCoordinates should only be called in a browser");
    }
    // The mirror div will replicate the textarea's style
    const div = document.createElement("div");
    div.id = "input-textarea-caret-position-mirror-div";
    document.body.appendChild(div);
    const style = div.style;
    const computed = window.getComputedStyle
        ? window.getComputedStyle(element)
        : element.currentStyle; // currentStyle for IE < 9
    // Default textarea styles
    style.whiteSpace = "pre-wrap";
    style.wordWrap = "break-word"; // only for textarea-s
    // Position off-screen
    style.position = "absolute"; // required to return coordinates properly
    style.visibility = "hidden"; // not 'display: none' because we want rendering
    // Transfer the element's properties to the div
    properties.forEach(function (prop) {
        // @ts-ignore
        style[prop] = computed[prop];
    });
    if (window.mozInnerScreenX != null) {
        // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
        if (element.scrollHeight > parseInt(computed.height))
            style.overflowY = "scroll";
    }
    else {
        style.overflow = "hidden"; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
    }
    div.textContent = element.value.substring(0, element.selectionStart);
    if (append) {
        div.textContent += append;
    }
    const span = document.createElement("span");
    // Wrapping must be replicated *exactly*, including when a long word gets
    // onto the next line, with whitespace at the end of the line before (#7).
    // The  *only* reliable way to do that is to copy the *entire* rest of the
    // textarea's content into the <span> created at the caret position.
    // For inputs, just '.' would be enough, but no need to bother.
    span.textContent = element.value.substring(element.selectionEnd) || "."; // || because a completely empty faux span doesn't render at all
    div.appendChild(span);
    const coordinates = {
        top: span.offsetTop + parseInt(computed["borderTopWidth"]),
        left: span.offsetLeft + parseInt(computed["borderLeftWidth"]),
        lineHeight: parseInt(computed["lineHeight"])
    };
    document.body.removeChild(div);
    return coordinates;
}

function getHandlers({ ref, loadSuggestions, setFocusIndex, focusIndex, setCaret, suggestions, setSuggestions, mentionState, setMentionState, value }) {
    const handleSuggestionSelected = (index) => {
        if (suggestions === null || suggestions === void 0 ? void 0 : suggestions.length) {
            ref.current.setSelectionRange(mentionState.startPosition - 1, ref.current.selectionStart);
            insertText(ref === null || ref === void 0 ? void 0 : ref.current, suggestions[index].value);
            setMentionState(Object.assign(Object.assign({}, mentionState), { status: "inactive" }));
            setFocusIndex(0);
        }
    };
    const handleKeyDown = (event) => {
        if (mentionState.status === "active") {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                setFocusIndex(focusIndex >= suggestions.length - 1 ? 0 : focusIndex + 1);
            }
            if (event.key === "ArrowUp") {
                event.preventDefault();
                setFocusIndex(focusIndex === 0 ? suggestions.length - 1 : focusIndex - 1);
            }
            if (event.key === "Enter") {
                event.preventDefault();
                handleSuggestionSelected(focusIndex);
            }
            if (event.key === "Backspace") {
                if (ref.current.selectionStart <= mentionState.startPosition) {
                    setMentionState(Object.assign(Object.assign({}, mentionState), { status: "inactive" }));
                    setFocusIndex(0);
                }
            }
            if (event.key === "Escape") {
                setMentionState(Object.assign(Object.assign({}, mentionState), { status: "inactive" }));
                setFocusIndex(0);
            }
        }
    };
    const handleKeyUp = (event) => {
        const { key } = event;
        switch (mentionState.status) {
            case "active":
                if (key === "Backspace") {
                    const searchText = value.substr(mentionState.startPosition, ref.current.selectionStart - mentionState.startPosition);
                    setSuggestions(loadSuggestions(searchText));
                }
                break;
        }
    };
    const handleKeyPress = (event) => {
        const { key } = event;
        if (key === "@") {
            if (ref.current) {
                setCaret(getCaretCoordinates(ref.current));
            }
            setSuggestions(loadSuggestions(""));
            setMentionState({
                status: "active",
                startPosition: ref.current.selectionStart + 1
            });
        }
        switch (mentionState.status) {
            case "loading":
            case "active":
                if (key === " ") {
                    setMentionState(Object.assign(Object.assign({}, mentionState), { status: "inactive" }));
                    return;
                }
                const searchText = value.substr(mentionState.startPosition, ref.current.selectionStart - mentionState.startPosition) + key;
                // In this case, the mentions box was open but the user typed something else
                setSuggestions(loadSuggestions(searchText));
                break;
            case "inactive":
                if (key !== "@" ||
                    !/\s|\(|\[|^.{0}$/.test(value.charAt(ref.current.selectionStart - 1))) {
                    return;
                }
                loadSuggestions("~");
                break;
        }
    };
    return {
        handleSuggestionSelected,
        handleKeyDown,
        handleKeyPress,
        handleKeyUp
    };
}

var quillStyle = styled.css `
  position: relative;
  border-radius: 4px;

  ul.ql-mention-list {
    margin-left: 40px;
    padding: 0;
    padding-top: 8px;
    padding-bottom: 8px;
    box-shadow: 0px 4px 31px rgb(26 33 44 / 6%),
      0px 0.751293px 8px rgb(26 33 44 / 4%);
  }

  ul.ql-mention-list li {
    all: unset;
    display: block;
    min-width: 180px;
    line-height: 36px;
  }

  .ql-mention-list-container {
    width: auto;
    min-width: 180px;
    cursor: pointer;
    .ql-mention-list-item.selected {
      background-color: #f8f8f8;
      color: #34373c;
    }

    .ql-mention-list-item {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 36px;
      padding: 0 12px;
    }
  }

  .ql-formats {
    ${props => props.isPreview &&
    styled.css `
        display: none !important;
      `};
  }

  .ql-editor {
    min-height: 200px;
  }

  .ql-toolbar {
    padding-left: 210px;
  }

  /*!
   * Quill Editor v1.3.7
   * https://quilljs.com/
   * Copyright (c) 2014, Jason Chen
   * Copyright (c) 2013, salesforce.com
   */

  .ql-container {
    box-sizing: border-box;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 13px;
    height: 100%;
    margin: 0px;
    position: relative;
  }

  .ql-container.ql-disabled .ql-tooltip {
    visibility: hidden;
  }

  .ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {
    pointer-events: none;
  }

  .ql-clipboard {
    left: -100000px;
    height: 1px;
    overflow-y: hidden;
    position: absolute;
    top: 50%;
  }

  .ql-clipboard p {
    margin: 0;
    padding: 0;
  }

  .ql-editor {
    box-sizing: border-box;
    line-height: 1.42;
    height: 100%;
    outline: none;
    overflow-y: auto;
    padding: 12px 16px;
    tab-size: 4;
    -moz-tab-size: 4;
    text-align: left;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .ql-editor > * {
    cursor: text;
  }

  .ql-editor p,
  .ql-editor ol,
  .ql-editor ul,
  .ql-editor pre,
  .ql-editor blockquote,
  .ql-editor h1,
  .ql-editor h2,
  .ql-editor h3,
  .ql-editor h4,
  .ql-editor h5,
  .ql-editor h6 {
    margin: 0;
    padding: 0;
    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8
      list-9;
  }

  .ql-editor ol,
  .ql-editor ul {
    padding-left: 1.5em;
  }

  .ql-editor ol > li,
  .ql-editor ul > li {
    list-style-type: none;
  }

  .ql-editor ul > li::before {
    content: "\\2022";
  }

  .ql-editor ul[data-checked="true"],
  .ql-editor ul[data-checked="false"] {
    pointer-events: none;
  }

  .ql-editor ul[data-checked="true"] > li *,
  .ql-editor ul[data-checked="false"] > li * {
    pointer-events: all;
  }

  .ql-editor ul[data-checked="true"] > li::before,
  .ql-editor ul[data-checked="false"] > li::before {
    color: #777;
    cursor: pointer;
    pointer-events: all;
  }

  .ql-editor ul[data-checked="true"] > li::before {
    content: "\\2611";
  }

  .ql-editor ul[data-checked="false"] > li::before {
    content: "\\2610";
  }

  .ql-editor li::before {
    display: inline-block;
    white-space: nowrap;
    width: 1.2em;
  }

  .ql-editor li:not(.ql-direction-rtl)::before {
    margin-left: -1.5em;
    margin-right: 0.3em;
    text-align: right;
  }

  .ql-editor li.ql-direction-rtl::before {
    margin-left: 0.3em;
    margin-right: -1.5em;
  }

  .ql-editor ol li:not(.ql-direction-rtl),
  .ql-editor ul li:not(.ql-direction-rtl) {
    padding-left: 1.5em;
  }

  .ql-editor ol li.ql-direction-rtl,
  .ql-editor ul li.ql-direction-rtl {
    padding-right: 1.5em;
  }

  .ql-editor ol li {
    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8
      list-9;
    counter-increment: list-0;
  }

  .ql-editor ol li:before {
    content: counter(list-0, decimal) ". ";
  }

  .ql-editor ol li.ql-indent-1 {
    counter-increment: list-1;
  }

  .ql-editor ol li.ql-indent-1:before {
    content: counter(list-1, lower-alpha) ". ";
  }

  .ql-editor ol li.ql-indent-1 {
    counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
  }

  .ql-editor ol li.ql-indent-2 {
    counter-increment: list-2;
  }

  .ql-editor ol li.ql-indent-2:before {
    content: counter(list-2, lower-roman) ". ";
  }

  .ql-editor ol li.ql-indent-2 {
    counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;
  }

  .ql-editor ol li.ql-indent-3 {
    counter-increment: list-3;
  }

  .ql-editor ol li.ql-indent-3:before {
    content: counter(list-3, decimal) ". ";
  }

  .ql-editor ol li.ql-indent-3 {
    counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;
  }

  .ql-editor ol li.ql-indent-4 {
    counter-increment: list-4;
  }

  .ql-editor ol li.ql-indent-4:before {
    content: counter(list-4, lower-alpha) ". ";
  }

  .ql-editor ol li.ql-indent-4 {
    counter-reset: list-5 list-6 list-7 list-8 list-9;
  }

  .ql-editor ol li.ql-indent-5 {
    counter-increment: list-5;
  }

  .ql-editor ol li.ql-indent-5:before {
    content: counter(list-5, lower-roman) ". ";
  }

  .ql-editor ol li.ql-indent-5 {
    counter-reset: list-6 list-7 list-8 list-9;
  }

  .ql-editor ol li.ql-indent-6 {
    counter-increment: list-6;
  }

  .ql-editor ol li.ql-indent-6:before {
    content: counter(list-6, decimal) ". ";
  }

  .ql-editor ol li.ql-indent-6 {
    counter-reset: list-7 list-8 list-9;
  }

  .ql-editor ol li.ql-indent-7 {
    counter-increment: list-7;
  }

  .ql-editor ol li.ql-indent-7:before {
    content: counter(list-7, lower-alpha) ". ";
  }

  .ql-editor ol li.ql-indent-7 {
    counter-reset: list-8 list-9;
  }

  .ql-editor ol li.ql-indent-8 {
    counter-increment: list-8;
  }

  .ql-editor ol li.ql-indent-8:before {
    content: counter(list-8, lower-roman) ". ";
  }

  .ql-editor ol li.ql-indent-8 {
    counter-reset: list-9;
  }

  .ql-editor ol li.ql-indent-9 {
    counter-increment: list-9;
  }

  .ql-editor ol li.ql-indent-9:before {
    content: counter(list-9, decimal) ". ";
  }

  .ql-editor .ql-indent-1:not(.ql-direction-rtl) {
    padding-left: 3em;
  }

  .ql-editor li.ql-indent-1:not(.ql-direction-rtl) {
    padding-left: 4.5em;
  }

  .ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {
    padding-right: 3em;
  }

  .ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {
    padding-right: 4.5em;
  }

  .ql-editor .ql-indent-2:not(.ql-direction-rtl) {
    padding-left: 6em;
  }

  .ql-editor li.ql-indent-2:not(.ql-direction-rtl) {
    padding-left: 7.5em;
  }

  .ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {
    padding-right: 6em;
  }

  .ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {
    padding-right: 7.5em;
  }

  .ql-editor .ql-indent-3:not(.ql-direction-rtl) {
    padding-left: 9em;
  }

  .ql-editor li.ql-indent-3:not(.ql-direction-rtl) {
    padding-left: 10.5em;
  }

  .ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {
    padding-right: 9em;
  }

  .ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {
    padding-right: 10.5em;
  }

  .ql-editor .ql-indent-4:not(.ql-direction-rtl) {
    padding-left: 12em;
  }

  .ql-editor li.ql-indent-4:not(.ql-direction-rtl) {
    padding-left: 13.5em;
  }

  .ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {
    padding-right: 12em;
  }

  .ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {
    padding-right: 13.5em;
  }

  .ql-editor .ql-indent-5:not(.ql-direction-rtl) {
    padding-left: 15em;
  }

  .ql-editor li.ql-indent-5:not(.ql-direction-rtl) {
    padding-left: 16.5em;
  }

  .ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {
    padding-right: 15em;
  }

  .ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {
    padding-right: 16.5em;
  }

  .ql-editor .ql-indent-6:not(.ql-direction-rtl) {
    padding-left: 18em;
  }

  .ql-editor li.ql-indent-6:not(.ql-direction-rtl) {
    padding-left: 19.5em;
  }

  .ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {
    padding-right: 18em;
  }

  .ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {
    padding-right: 19.5em;
  }

  .ql-editor .ql-indent-7:not(.ql-direction-rtl) {
    padding-left: 21em;
  }

  .ql-editor li.ql-indent-7:not(.ql-direction-rtl) {
    padding-left: 22.5em;
  }

  .ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {
    padding-right: 21em;
  }

  .ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {
    padding-right: 22.5em;
  }

  .ql-editor .ql-indent-8:not(.ql-direction-rtl) {
    padding-left: 24em;
  }

  .ql-editor li.ql-indent-8:not(.ql-direction-rtl) {
    padding-left: 25.5em;
  }

  .ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {
    padding-right: 24em;
  }

  .ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {
    padding-right: 25.5em;
  }

  .ql-editor .ql-indent-9:not(.ql-direction-rtl) {
    padding-left: 27em;
  }

  .ql-editor li.ql-indent-9:not(.ql-direction-rtl) {
    padding-left: 28.5em;
  }

  .ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {
    padding-right: 27em;
  }

  .ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {
    padding-right: 28.5em;
  }

  .ql-editor .ql-bg-black {
    background-color: #000;
  }

  .ql-editor .ql-bg-red {
    background-color: #e60000;
  }

  .ql-editor .ql-bg-orange {
    background-color: #f90;
  }

  .ql-editor .ql-bg-yellow {
    background-color: #ff0;
  }

  .ql-editor .ql-bg-green {
    background-color: #008a00;
  }

  .ql-editor .ql-bg-blue {
    background-color: #06c;
  }

  .ql-editor .ql-bg-purple {
    background-color: #93f;
  }

  .ql-editor .ql-color-white {
    color: #fff;
  }

  .ql-editor .ql-color-red {
    color: #e60000;
  }

  .ql-editor .ql-color-orange {
    color: #f90;
  }

  .ql-editor .ql-color-yellow {
    color: #ff0;
  }

  .ql-editor .ql-color-green {
    color: #008a00;
  }

  .ql-editor .ql-color-blue {
    color: #06c;
  }

  .ql-editor .ql-color-purple {
    color: #93f;
  }

  .ql-editor .ql-font-serif {
    font-family: Georgia, Times New Roman, serif;
  }

  .ql-editor .ql-font-monospace {
    font-family: Monaco, Courier New, monospace;
  }

  .ql-editor .ql-size-small {
    font-size: 0.75em;
  }

  .ql-editor .ql-size-large {
    font-size: 1.5em;
  }

  .ql-editor .ql-size-huge {
    font-size: 2.5em;
  }

  .ql-editor .ql-direction-rtl {
    direction: rtl;
    text-align: inherit;
  }

  .ql-editor .ql-align-center {
    text-align: center;
  }

  .ql-editor .ql-align-justify {
    text-align: justify;
  }

  .ql-editor .ql-align-right {
    text-align: right;
  }

  .ql-editor.ql-blank::before {
    color: rgba(0, 0, 0, 0.6);
    content: attr(data-placeholder);
    font-style: italic;
    left: 15px;
    pointer-events: none;
    position: absolute;
    right: 15px;
  }

  .ql-snow.ql-toolbar:after,
  .ql-toolbar:after {
    clear: both;
    content: "";
    display: table;
  }

  .ql-snow.ql-toolbar button,
  .ql-toolbar button {
    background: none;
    border: none;
    cursor: pointer;
    display: inline-block;
    float: left;
    height: 24px;
    padding: 3px 5px;
    width: 28px;
  }

  .ql-snow.ql-toolbar button svg,
  .ql-toolbar button svg {
    float: left;
    height: 100%;
  }

  .ql-snow.ql-toolbar button:active:hover,
  .ql-toolbar button:active:hover {
    outline: none;
  }

  .ql-snow.ql-toolbar input.ql-image[type="file"],
  .ql-toolbar input.ql-image[type="file"] {
    display: none;
  }

  .ql-snow.ql-toolbar button:hover,
  .ql-toolbar button:hover,
  .ql-snow.ql-toolbar button:focus,
  .ql-toolbar button:focus,
  .ql-snow.ql-toolbar button.ql-active,
  .ql-toolbar button.ql-active,
  .ql-snow.ql-toolbar .ql-picker-label:hover,
  .ql-toolbar .ql-picker-label:hover,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active,
  .ql-toolbar .ql-picker-label.ql-active,
  .ql-snow.ql-toolbar .ql-picker-item:hover,
  .ql-toolbar .ql-picker-item:hover,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
  .ql-toolbar .ql-picker-item.ql-selected {
    color: #1e2134;
  }

  .ql-snow.ql-toolbar button:hover .ql-fill,
  .ql-toolbar button:hover .ql-fill,
  .ql-snow.ql-toolbar button:focus .ql-fill,
  .ql-toolbar button:focus .ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-fill,
  .ql-toolbar button.ql-active .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-toolbar .ql-picker-label:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
  .ql-toolbar .ql-picker-label.ql-active .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
  .ql-toolbar .ql-picker-item:hover .ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
  .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
  .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
  .ql-toolbar button:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
  .ql-toolbar button:focus .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
  .ql-toolbar button.ql-active .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
  .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
  .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
  .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
  .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
    fill: #1e2134;
  }

  .ql-snow.ql-toolbar button:hover .ql-stroke,
  .ql-toolbar button:hover .ql-stroke,
  .ql-snow.ql-toolbar button:focus .ql-stroke,
  .ql-toolbar button:focus .ql-stroke,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke,
  .ql-toolbar button.ql-active .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-toolbar .ql-picker-label:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
  .ql-toolbar .ql-picker-item:hover .ql-stroke,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
  .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
  .ql-toolbar button:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
  .ql-toolbar button:focus .ql-stroke-miter,
  .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
  .ql-toolbar button.ql-active .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
  .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
    stroke: #1e2134;
  }

  @media (pointer: coarse) {
    .ql-snow.ql-toolbar button:hover:not(.ql-active),
    .ql-toolbar button:hover:not(.ql-active) {
      color: #506176;
    }

    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,
    .ql-toolbar button:hover:not(.ql-active) .ql-fill,
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,
    .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {
      fill: #506176;
    }

    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,
    .ql-toolbar button:hover:not(.ql-active) .ql-stroke,
    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,
    .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {
      stroke: #506176;
    }
  }
   {
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
  }

  .ql-hidden {
    display: none;
  }

  .ql-out-bottom,
  .ql-out-top {
    visibility: hidden;
  }

  .ql-tooltip {
    position: absolute;
    transform: translateY(10px);
  }

  .ql-tooltip a {
    cursor: pointer;
    text-decoration: none;
  }

  .ql-tooltip.ql-flip {
    transform: translateY(-10px);
  }

  .ql-formats {
    display: inline-block;
    vertical-align: middle;
  }

  .ql-formats:after {
    clear: both;
    content: "";
    display: table;
  }

  .ql-stroke {
    fill: none;
    stroke: #506176;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }

  .ql-stroke-miter {
    fill: none;
    stroke: #506176;
    stroke-miterlimit: 10;
    stroke-width: 2;
  }

  .ql-fill,
  .ql-stroke.ql-fill {
    fill: #506176;
  }

  .ql-empty {
    fill: none;
  }

  .ql-even {
    fill-rule: evenodd;
  }

  .ql-thin,
  .ql-stroke.ql-thin {
    stroke-width: 1;
  }

  .ql-transparent {
    opacity: 0.4;
  }

  .ql-direction svg:last-child {
    display: none;
  }

  .ql-direction.ql-active svg:last-child {
    display: inline;
  }

  .ql-direction.ql-active svg:first-child {
    display: none;
  }

  .ql-editor h1 {
    font-size: 2em;
  }

  .ql-editor h2 {
    font-size: 1.5em;
  }

  .ql-editor h3 {
    font-size: 1.17em;
  }

  .ql-editor h4 {
    font-size: 1em;
  }

  .ql-editor h5 {
    font-size: 0.83em;
  }

  .ql-editor h6 {
    font-size: 0.67em;
  }

  .ql-editor a {
    text-decoration: underline;
  }

  .ql-editor blockquote {
    border-left: 4px solid #ccc;
    margin-bottom: 5px;
    margin-top: 5px;
    padding-left: 16px;
  }

  .ql-editor code,
  .ql-editor pre {
    background-color: #f0f0f0;
    border-radius: 3px;
  }

  .ql-editor pre {
    white-space: pre-wrap;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 5px 10px;
  }

  .ql-editor code {
    font-size: 85%;
    padding: 2px 4px;
  }

  .ql-editor pre.ql-syntax {
    background-color: #23241f;
    color: #f8f8f2;
    overflow: visible;
  }

  .ql-editor img {
    max-width: 100%;
  }

  .ql-picker {
    color: #506176;
    display: inline-block;
    float: left;
    font-size: 14px;
    font-weight: 500;
    height: 24px;
    position: relative;
    vertical-align: middle;
  }

  .ql-picker-label {
    cursor: pointer;
    display: inline-block;
    height: 100%;
    padding-left: 8px;
    padding-right: 22px;
    position: relative;
    width: 100%;
  }

  .ql-picker-label::before {
    display: inline-block;
    line-height: 24px;
  }

  .ql-picker-options {
    background-color: #fff;
    display: none;
    min-width: 100%;
    padding: 4px 8px;
    position: absolute;
    white-space: nowrap;
  }

  .ql-picker-options .ql-picker-item {
    cursor: pointer;
    display: block;
    padding-bottom: 5px;
    padding-top: 5px;
  }

  .ql-picker.ql-expanded .ql-picker-label {
    color: #ccc;
    z-index: 2;
  }

  .ql-picker.ql-expanded .ql-picker-label .ql-fill {
    fill: #ccc;
  }

  .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
    stroke: #ccc;
  }

  .ql-picker.ql-expanded .ql-picker-options {
    display: block;
    margin-top: -1px;
    top: 100%;
    z-index: 1;
  }

  .ql-color-picker,
  .ql-icon-picker {
    width: 28px;
  }

  .ql-color-picker .ql-picker-label,
  .ql-icon-picker .ql-picker-label {
    padding: 2px 4px;
  }

  .ql-color-picker .ql-picker-label svg,
  .ql-icon-picker .ql-picker-label svg {
    right: 4px;
  }

  .ql-icon-picker .ql-picker-options {
    padding: 4px 0px;
  }

  .ql-icon-picker .ql-picker-item {
    height: 24px;
    width: 24px;
    padding: 2px 4px;
  }

  .ql-color-picker .ql-picker-options {
    padding: 3px 5px;
    width: 152px;
  }

  .ql-color-picker .ql-picker-item {
    border: 1px solid transparent;
    float: left;
    height: 16px;
    margin: 2px;
    padding: 0px;
    width: 16px;
  }

  .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
    position: absolute;
    margin-top: -9px;
    right: 0;
    top: 50%;
    width: 18px;

    polygon {
      stroke: #506176;

      :hover {
        stroke: #1e2134;
        color: #1e2134;
      }
    }
  }

  .ql-picker.ql-header
    .ql-picker-label[data-label]:not([data-label=""])::before,
  .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=""])::before,
  .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=""])::before,
  .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=""])::before,
  .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=""])::before,
  .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=""])::before {
    content: attr(data-label);
  }

  .ql-formats {
    button {
      svg {
        :hover {
          path {
            fill: #1e2134;
          }
        }
      }
    }
  }

  select.ql-header {
    width: 98px;
    color: #506176;
    display: inline-block;
    float: left;
    font-size: 14px;
    font-weight: 500;
    height: 24px;
    position: relative;
    vertical-align: middle;
    background: #f6f7fa;
  }

  option {
    display: block;
  }

  .ql-toolbar,
  .ql-formats {
    display: flex;
    flex-wrap: nowrap;
    background: #f6f7fa;
  }

  .ql-toolbar {
    align-items: center;
    height: 40px;
  }

  .ql-formats {
    gap: 8px;
  }

  .ql-formats button {
    padding: 0;
  }

  .ql-picker.ql-header .ql-picker-label::before,
  .ql-header .ql-picker-item::before {
    display: block;
    content: "Normal";
  }

  .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "Heading 1";
  }

  .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "Heading 2";
  }

  .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "Heading 3";
  }

  .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "Heading 4";
  }

  .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "Heading 5";
  }

  .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "Heading 6";
  }

  .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    font-size: 2em;
  }

  .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    font-size: 1.5em;
  }

  .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    font-size: 1.17em;
  }

  .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    font-size: 1em;
  }

  .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    font-size: 0.83em;
  }

  .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    font-size: 0.67em;
  }

  .ql-picker.ql-font {
    width: 108px;
  }

  .ql-picker.ql-font .ql-picker-label::before,
  .ql-picker.ql-font .ql-picker-item::before {
    content: "Sans Serif";
  }

  .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
  .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "Serif";
  }

  .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "Monospace";
  }

  .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    font-family: Georgia, Times New Roman, serif;
  }

  .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    font-family: Monaco, Courier New, monospace;
  }

  .ql-picker.ql-size {
    width: 98px;
  }

  .ql-picker.ql-size .ql-picker-label::before,
  .ql-picker.ql-size .ql-picker-item::before {
    content: "Normal";
  }

  .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "Small";
  }

  .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "Large";
  }

  .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "Huge";
  }

  .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    font-size: 10px;
  }

  .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    font-size: 18px;
  }

  .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    font-size: 32px;
  }

  .ql-color-picker.ql-background .ql-picker-item {
    background-color: #fff;
  }

  .ql-color-picker.ql-color .ql-picker-item {
    background-color: #000;
  }

  .ql-toolbar {
    box-sizing: border-box;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    padding: 8px;
    justify-content: end;
    height: 41px;
    border-bottom: 1px solid #e0e4eb;
  }

  .ql-toolbar.ql-formats {
    margin-right: 15px;
  }

  .ql-toolbar.ql-picker-label {
    border: 1px solid transparent;
  }

  .ql-toolbar.ql-picker-options {
    border: 1px solid transparent;
    box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px;
  }

  .ql-toolbar.ql-picker.ql-expanded .ql-picker-label {
    border-color: #ccc;
  }

  .ql-toolbar.ql-picker.ql-expanded .ql-picker-options {
    border-color: #ccc;
  }

  .ql-toolbar.ql-color-picker .ql-picker-item.ql-selected,
  .ql-toolbar.ql-color-picker .ql-picker-item:hover {
    border-color: #000;
  }

  .ql-toolbar + .ql-container {
    border-top: 0px;
  }

  .ql-tooltip {
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 5px #ddd;
    color: #506176;
    padding: 5px 12px;
    white-space: nowrap;
  }

  .ql-tooltip::before {
    content: "Visit URL:";
    line-height: 26px;
    margin-right: 8px;
  }

  .ql-tooltip input[type="text"] {
    display: none;
    border: 1px solid #ccc;
    font-size: 13px;
    height: 26px;
    margin: 0px;
    padding: 3px 5px;
    width: 170px;
  }

  .ql-tooltip a.ql-preview {
    display: inline-block;
    max-width: 200px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
  }

  .ql-tooltip a.ql-action::after {
    border-right: 1px solid #ccc;
    content: "Edit";
    margin-left: 16px;
    padding-right: 8px;
  }

  .ql-tooltip a.ql-remove::before {
    content: "Remove";
    margin-left: 8px;
  }

  .ql-tooltip a {
    line-height: 26px;
  }

  .ql-tooltip.ql-editing a.ql-preview,
  .ql-tooltip.ql-editing a.ql-remove {
    display: none;
  }

  .ql-tooltip.ql-editing input[type="text"] {
    display: inline-block;
  }

  .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: "Save";
    padding-right: 0px;
  }

  .ql-tooltip[data-mode="link"]::before {
    content: "Enter link:";
  }

  .ql-tooltip[data-mode="formula"]::before {
    content: "Enter formula:";
  }

  .ql-tooltip[data-mode="video"]::before {
    content: "Enter video:";
  }

  a {
    color: #06c;
  }
`;

const StateToggle = styled__default["default"].div `
  position: absolute;
  display: flex;

  button {
    all: unset;
    padding: 12px;
    padding-bottom: 13px;
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    cursor: pointer;
    //border-radius: 4px;
    color: #9DA9BB;
    //border: 1px solid #E0E4EB;
    border-top: none;
  }

  button.active {
    background-color: #ffffff;
    box-shadow: 0 1px 0 0 white;
    color: #1E2134;
    :hover {
      color: #1E2134;
    }
  }

  button:hover {
    color: #506176;
  }
`;

const overrideIcons = (icons) => {
    icons["bold"] = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 2C3.44772 2 3 2.44772 3 3V8V13C3 13.5523 3.44772 14 4 14H9.5C11.433 14 13 12.433 13 10.5C13 9.24701 12.3416 8.14781 11.3519 7.52949C11.7599 6.95707 12 6.25657 12 5.5C12 3.567 10.433 2 8.5 2H4ZM8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4H5V7H8.5ZM5 9V12H9.5C10.3284 12 11 11.3284 11 10.5C11 9.67157 10.3284 9 9.5 9H8.5H5Z" fill="#506176"/></svg>`;
    icons["underline"] = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.29725 1.30762C4.70622 1.30762 5.03777 1.63916 5.03777 2.04814V7.28694C5.03777 8.07253 5.34984 8.82595 5.90534 9.38144C6.46084 9.93694 7.21426 10.249 7.99985 10.249C8.78544 10.249 9.53886 9.93694 10.0944 9.38144C10.6499 8.82595 10.9619 8.07253 10.9619 7.28694V2.04814C10.9619 1.63916 11.2935 1.30762 11.7025 1.30762C12.1114 1.30762 12.443 1.63916 12.443 2.04814V7.28694C12.443 8.46533 11.9749 9.59545 11.1416 10.4287C10.3084 11.2619 9.17824 11.7301 7.99985 11.7301C6.82146 11.7301 5.69133 11.2619 4.85809 10.4287C4.02484 9.59545 3.55673 8.46533 3.55673 7.28694V2.04814C3.55673 1.63916 3.88827 1.30762 4.29725 1.30762ZM2.07568 13.9516C2.07568 13.5426 2.40723 13.2111 2.8162 13.2111H13.1835C13.5925 13.2111 13.924 13.5426 13.924 13.9516C13.924 14.3606 13.5925 14.6921 13.1835 14.6921H2.8162C2.40723 14.6921 2.07568 14.3606 2.07568 13.9516Z" fill="#506176"/>
</svg>
`;
    icons["strike"] = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1343 9.60413C12.3188 10.0181 12.4118 10.4785 12.4118 10.9839C12.4118 12.0605 11.9915 12.9028 11.1516 13.5085C10.31 14.1142 9.14924 14.4174 7.66756 14.4174C6.50209 14.4174 5.34733 14.1775 4.20271 13.6973C3.9301 13.5829 3.7608 13.3112 3.7608 13.0156C3.7608 12.4263 4.40477 12.0516 4.95484 12.263C5.79149 12.5846 6.6411 12.7456 7.50391 12.7456C9.55035 12.7456 10.5764 12.1584 10.5836 10.9831C10.5878 10.7448 10.544 10.5082 10.4547 10.2872C10.3463 10.0191 10.172 9.80275 9.9675 9.60333H0.779785V7.99891H15.2196V9.60333L12.1343 9.60413ZM8.86285 7.1975H4.49322C4.35269 7.06937 4.22358 6.92926 4.10735 6.77875C3.7608 6.33111 3.58752 5.79042 3.58752 5.15347C3.58752 4.16194 3.96135 3.31882 4.70821 2.6241C5.45667 1.92939 6.61265 1.58203 8.17777 1.58203C9.20623 1.58203 10.1963 1.7819 11.1469 2.18163C11.4058 2.29047 11.5647 2.5495 11.5647 2.8303C11.5647 3.3948 10.9454 3.75845 10.4089 3.58295C9.77395 3.37524 9.10411 3.27148 8.39918 3.27148C6.4097 3.27148 5.41576 3.89881 5.41576 5.15347C5.41576 5.4904 5.59064 5.78401 5.9404 6.0351C6.29016 6.28619 6.72175 6.48594 7.23437 6.63675C7.73174 6.78115 8.27483 6.96887 8.86285 7.1975Z" fill="#506176"/>
</svg>
`;
    icons["link"] = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.77518 3.27518C7.6427 3.41735 7.57057 3.6054 7.574 3.7997C7.57743 3.994 7.65614 4.17938 7.79355 4.3168C7.93097 4.45421 8.11635 4.53292 8.31065 4.53635C8.50495 4.53978 8.693 4.46766 8.83518 4.33518L10.0852 3.08518C10.271 2.89936 10.4916 2.75195 10.7344 2.65139C10.9772 2.55082 11.2374 2.49906 11.5002 2.49906C11.763 2.49906 12.0232 2.55082 12.266 2.65139C12.5088 2.75195 12.7294 2.89936 12.9152 3.08518C13.101 3.271 13.2484 3.4916 13.349 3.73438C13.4495 3.97717 13.5013 4.23739 13.5013 4.50018C13.5013 4.76297 13.4495 5.02318 13.349 5.26597C13.2484 5.50875 13.101 5.72935 12.9152 5.91518L10.4152 8.41518C10.2294 8.60113 10.0089 8.74865 9.76606 8.84929C9.52326 8.94994 9.26301 9.00175 9.00018 9.00175C8.73734 9.00175 8.47709 8.94994 8.23429 8.84929C7.9915 8.74865 7.77092 8.60113 7.58518 8.41518C7.443 8.2827 7.25495 8.21057 7.06065 8.214C6.86635 8.21743 6.68097 8.29614 6.54355 8.43355C6.40614 8.57097 6.32743 8.75635 6.324 8.95065C6.32057 9.14495 6.3927 9.333 6.52518 9.47518C6.85019 9.80022 7.23604 10.0581 7.6607 10.234C8.08536 10.4099 8.54052 10.5004 9.00018 10.5004C9.45983 10.5004 9.91499 10.4099 10.3397 10.234C10.7643 10.0581 11.1502 9.80022 11.4752 9.47518L13.9752 6.97518C14.6316 6.31876 15.0004 5.42848 15.0004 4.50018C15.0004 3.57187 14.6316 2.68159 13.9752 2.02518C13.3188 1.36876 12.4285 1 11.5002 1C10.5719 1 9.68159 1.36876 9.02517 2.02518L7.77518 3.27518ZM3.08518 12.9152C2.89922 12.7294 2.7517 12.5089 2.65106 12.2661C2.55041 12.0233 2.4986 11.763 2.4986 11.5002C2.4986 11.2374 2.55041 10.9771 2.65106 10.7343C2.7517 10.4915 2.89922 10.2709 3.08518 10.0852L5.58518 7.58518C5.77092 7.39922 5.9915 7.2517 6.23429 7.15106C6.47709 7.05041 6.73734 6.9986 7.00018 6.9986C7.26301 6.9986 7.52326 7.05041 7.76606 7.15106C8.00885 7.2517 8.22943 7.39922 8.41518 7.58518C8.55735 7.71766 8.7454 7.78978 8.9397 7.78635C9.134 7.78292 9.31938 7.70421 9.4568 7.5668C9.59421 7.42938 9.67292 7.244 9.67635 7.0497C9.67978 6.8554 9.60766 6.66735 9.47518 6.52518C9.15017 6.20013 8.76431 5.94229 8.33965 5.76638C7.91499 5.59047 7.45983 5.49992 7.00018 5.49992C6.54052 5.49992 6.08536 5.59047 5.6607 5.76638C5.23604 5.94229 4.85019 6.20013 4.52518 6.52518L2.02518 9.02517C1.36876 9.68159 1 10.5719 1 11.5002C1 12.4285 1.36876 13.3188 2.02518 13.9752C2.68159 14.6316 3.57187 15.0004 4.50018 15.0004C5.42848 15.0004 6.31876 14.6316 6.97518 13.9752L8.22518 12.7252C8.35766 12.583 8.42978 12.395 8.42635 12.2007C8.42292 12.0064 8.34421 11.821 8.2068 11.6836C8.06938 11.5462 7.884 11.4674 7.6897 11.464C7.4954 11.4606 7.30735 11.5327 7.16518 11.6652L5.91518 12.9152C5.72943 13.1011 5.50885 13.2487 5.26606 13.3493C5.02326 13.45 4.76301 13.5018 4.50018 13.5018C4.23734 13.5018 3.97709 13.45 3.73429 13.3493C3.4915 13.2487 3.27092 13.1011 3.08518 12.9152Z" fill="#506176"/>
</svg>
`;
    icons["image"] = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5445_38251)">
<path d="M14.0002 10V12H16.0002V13.3333H14.0002V15.3333H12.6668V13.3333H10.6668V12H12.6668V10H14.0002ZM14.0055 2C14.3708 2 14.6668 2.29667 14.6668 2.662V8.89467C14.2386 8.7434 13.7877 8.66629 13.3335 8.66667V3.33333H2.66683L2.6675 12.6667L8.86216 6.47133C8.9768 6.35632 9.12951 6.28715 9.29157 6.27684C9.45363 6.26653 9.61387 6.31578 9.74216 6.41533L9.80416 6.472L12.1682 8.83867C11.6513 8.99618 11.1716 9.25674 10.7581 9.60464C10.3446 9.95254 10.0059 10.3806 9.76233 10.8629C9.51875 11.3453 9.37538 11.872 9.34087 12.4113C9.30635 12.9505 9.3814 13.4912 9.5615 14.0007L1.99483 14C1.81937 13.9998 1.65116 13.93 1.52716 13.8059C1.40315 13.6817 1.3335 13.5135 1.3335 13.338V2.662C1.33472 2.48692 1.40476 2.31934 1.5285 2.19548C1.65225 2.07161 1.81975 2.0014 1.99483 2H14.0055ZM5.3335 4.66667C5.68712 4.66667 6.02626 4.80714 6.2763 5.05719C6.52635 5.30724 6.66683 5.64638 6.66683 6C6.66683 6.35362 6.52635 6.69276 6.2763 6.94281C6.02626 7.19286 5.68712 7.33333 5.3335 7.33333C4.97987 7.33333 4.64074 7.19286 4.39069 6.94281C4.14064 6.69276 4.00016 6.35362 4.00016 6C4.00016 5.64638 4.14064 5.30724 4.39069 5.05719C4.64074 4.80714 4.97987 4.66667 5.3335 4.66667Z" fill="#506176"/>
</g>
<defs>
<clipPath id="clip0_5445_38251">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
`;
    icons["video"] = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99121 1.34968H2.0001C1.64111 1.34968 1.3501 1.64069 1.3501 1.99968V13.9997C1.3501 14.3587 1.64111 14.6497 2.0001 14.6497H14.0001C14.3591 14.6497 14.6501 14.3587 14.6501 13.9997V5.0008C14.6501 5.00043 14.6501 5.00005 14.6501 4.99968C14.6501 4.9993 14.6501 4.99893 14.6501 4.99855V1.99968C14.6501 1.64069 14.3591 1.34968 14.0001 1.34968H11.0102C11.0039 1.34959 10.9975 1.34959 10.9912 1.34968H7.01018C7.00385 1.34959 6.99753 1.34959 6.99121 1.34968ZM9.78556 2.64968H7.34797L6.21463 4.34968H8.65223L9.78556 2.64968ZM11.348 2.64968L10.2146 4.34968H13.3501V2.64968H11.348ZM13.3501 5.64968H9.00898C9.00267 5.64977 8.99634 5.64977 8.99002 5.64968H5.00898C5.00267 5.64977 4.99634 5.64977 4.99002 5.64968H2.6501V13.3497H13.3501V5.64968ZM2.6501 4.34968H4.65223L5.78556 2.64968H2.6501V4.34968ZM6.50843 6.74941C6.70954 6.6333 6.95732 6.6333 7.15843 6.74941L10.6584 8.77015C10.8595 8.88626 10.9834 9.10084 10.9834 9.33306C10.9834 9.56528 10.8595 9.77987 10.6584 9.89598L7.15843 11.9167C6.95732 12.0328 6.70954 12.0328 6.50843 11.9167C6.30732 11.8006 6.18343 11.586 6.18343 11.3538V7.31233C6.18343 7.08011 6.30732 6.86552 6.50843 6.74941ZM7.48343 8.43816V10.228L9.03343 9.33306L7.48343 8.43816Z" fill="#506176"/>
</svg>
`;
    icons["blockquote"] = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.05533 11.5468C2.36867 10.8175 2 9.99951 2 8.67351C2 6.34018 3.638 4.24884 6.02 3.21484L6.61533 4.13351C4.392 5.33618 3.95733 6.89684 3.784 7.88084C4.142 7.69551 4.61067 7.63084 5.07 7.67351C6.27267 7.78484 7.22067 8.77218 7.22067 9.99951C7.22067 10.6183 6.97483 11.2118 6.53725 11.6494C6.09966 12.087 5.50617 12.3328 4.88733 12.3328C4.172 12.3328 3.488 12.0062 3.05533 11.5468V11.5468ZM9.722 11.5468C9.03533 10.8175 8.66667 9.99951 8.66667 8.67351C8.66667 6.34018 10.3047 4.24884 12.6867 3.21484L13.282 4.13351C11.0587 5.33618 10.624 6.89684 10.4507 7.88084C10.8087 7.69551 11.2773 7.63084 11.7367 7.67351C12.9393 7.78484 13.8873 8.77218 13.8873 9.99951C13.8873 10.6183 13.6415 11.2118 13.2039 11.6494C12.7663 12.087 12.1728 12.3328 11.554 12.3328C10.8387 12.3328 10.1547 12.0062 9.722 11.5468V11.5468Z" fill="#506176"/>
</svg>
`;
    icons["code-block"] = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.71967 3.21967C5.01256 2.92678 5.48744 2.92678 5.78033 3.21967C6.07322 3.51256 6.07322 3.98744 5.78033 4.28033L2.06066 8L5.78033 11.7197C6.07322 12.0126 6.07322 12.4874 5.78033 12.7803C5.48744 13.0732 5.01256 13.0732 4.71967 12.7803L0.46967 8.53033C0.176777 8.23744 0.176777 7.76256 0.46967 7.46967L4.71967 3.21967ZM11.2803 3.21967C10.9874 2.92678 10.5126 2.92678 10.2197 3.21967C9.92678 3.51256 9.92678 3.98744 10.2197 4.28033L13.9393 8L10.2197 11.7197C9.92678 12.0126 9.92678 12.4874 10.2197 12.7803C10.5126 13.0732 10.9874 13.0732 11.2803 12.7803L15.5303 8.53033C15.8232 8.23744 15.8232 7.76256 15.5303 7.46967L11.2803 3.21967Z" fill="#506176"/>
</svg>
`;
    icons["list"] = {
        ordered: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5445_38277)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.00337 2.50005C2.00337 2.32685 1.91375 2.16599 1.76648 2.07484C1.61921 1.9837 1.43526 1.97525 1.28025 2.05252L0.277079 2.55256C0.0299152 2.67576 -0.0705754 2.976 0.0526264 3.22317C0.175828 3.47033 0.476068 3.57082 0.723232 3.44762L1.00328 3.30802V6.00036H0.500155C0.223988 6.00036 0.000110023 6.22424 0.000110023 6.50041C0.000110023 6.77657 0.223988 7.00045 0.500155 7.00045H2.5065C2.78267 7.00045 3.00655 6.77657 3.00655 6.50041C3.00655 6.22424 2.78267 6.00036 2.5065 6.00036H2.00337V2.50005ZM5 3.25C5 2.83579 5.33579 2.5 5.75 2.5H14.25C14.6642 2.5 15 2.83579 15 3.25C15 3.66421 14.6642 4 14.25 4H5.75C5.33579 4 5 3.66421 5 3.25ZM5 8.25C5 7.83579 5.33579 7.5 5.75 7.5H14.25C14.6642 7.5 15 7.83579 15 8.25C15 8.66421 14.6642 9 14.25 9H5.75C5.33579 9 5 8.66421 5 8.25ZM5 13.25C5 12.8358 5.33579 12.5 5.75 12.5H14.25C14.6642 12.5 15 12.8358 15 13.25C15 13.6642 14.6642 14 14.25 14H5.75C5.33579 14 5 13.6642 5 13.25ZM0.924398 10.32L0.927032 10.3161C0.931315 10.3099 0.939805 10.2981 0.952393 10.2825C0.978004 10.2507 1.01787 10.2066 1.07075 10.1628C1.17619 10.0753 1.31709 10.0007 1.50025 10.0007C1.69557 10.0007 1.80717 10.0693 1.87542 10.1467C1.95169 10.2332 2.00312 10.366 2.00312 10.5231C2.00312 10.9755 1.73398 11.2053 1.20308 11.6005L1.16805 11.6265C0.6919 11.9803 0.000122084 12.4944 0.000122084 13.4999C0.000122084 13.6325 0.0528052 13.7597 0.146582 13.8535C0.240359 13.9473 0.367547 14 0.500167 14H2.50309C2.77926 14 3.00321 13.7761 3.00321 13.4999C3.00321 13.2238 2.77933 12.9999 2.50317 12.9999H1.14611C1.27778 12.8026 1.49742 12.6281 1.80025 12.4027L1.84691 12.368C2.31766 12.0188 3.00321 11.5101 3.00321 10.5231C3.00321 10.1578 2.88489 9.77939 2.62556 9.48527C2.35821 9.18206 1.96836 9.00062 1.50027 9.00061C1.02002 9.0006 0.66087 9.20333 0.432114 9.39315C0.317894 9.48793 0.232132 9.58249 0.173885 9.65472C0.144543 9.69111 0.121547 9.72262 0.104827 9.74677C0.0964494 9.75887 0.0895948 9.76919 0.0842568 9.77744L0.0773676 9.78826L0.0747623 9.79245L0.0736683 9.79423L0.072939 9.79543C-0.070366 10.0315 0.00461414 10.3394 0.24069 10.4827C0.47501 10.625 0.779746 10.5519 0.924398 10.32ZM0.500117 10.0552L0.072939 9.79543C0.072939 9.79543 0.0727131 9.7958 0.500117 10.0552Z" fill="#506176"/>
</g>
<defs>
<clipPath id="clip0_5445_38277">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
`,
        bullet: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 4C2.55228 4 3 3.55228 3 3C3 2.44772 2.55228 2 2 2C1.44772 2 1 2.44772 1 3C1 3.55228 1.44772 4 2 4ZM5.75 2.5C5.33579 2.5 5 2.83579 5 3.25C5 3.66421 5.33579 4 5.75 4H14.25C14.6642 4 15 3.66421 15 3.25C15 2.83579 14.6642 2.5 14.25 2.5H5.75ZM5.75 7.5C5.33579 7.5 5 7.83579 5 8.25C5 8.66421 5.33579 9 5.75 9H14.25C14.6642 9 15 8.66421 15 8.25C15 7.83579 14.6642 7.5 14.25 7.5H5.75ZM5.75 12.5C5.33579 12.5 5 12.8358 5 13.25C5 13.6642 5.33579 14 5.75 14H14.25C14.6642 14 15 13.6642 15 13.25C15 12.8358 14.6642 12.5 14.25 12.5H5.75ZM3 8C3 8.55228 2.55228 9 2 9C1.44772 9 1 8.55228 1 8C1 7.44772 1.44772 7 2 7C2.55228 7 3 7.44772 3 8ZM2 14C2.55228 14 3 13.5523 3 13C3 12.4477 2.55228 12 2 12C1.44772 12 1 12.4477 1 13C1 13.5523 1.44772 14 2 14Z" fill="#506176"/>
</svg>`
    };
    icons["align"] = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.42864 2.5C2.03416 2.5 1.71436 2.83579 1.71436 3.25C1.71436 3.66421 2.03416 4 2.42864 4H13.5715C13.966 4 14.2858 3.66421 14.2858 3.25C14.2858 2.83579 13.966 2.5 13.5715 2.5H2.42864Z" fill="#506176"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.28557 5.71387C4.89109 5.71387 4.57129 6.04966 4.57129 6.46387C4.57129 6.87808 4.89109 7.21387 5.28557 7.21387H10.7141C11.1086 7.21387 11.4284 6.87808 11.4284 6.46387C11.4284 6.04966 11.1086 5.71387 10.7141 5.71387H5.28557Z" fill="#506176"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.28557 12.5713C4.89109 12.5713 4.57129 12.9071 4.57129 13.3213C4.57129 13.7355 4.89109 14.0713 5.28557 14.0713H10.7141C11.1086 14.0713 11.4284 13.7355 11.4284 13.3213C11.4284 12.9071 11.1086 12.5713 10.7141 12.5713H5.28557Z" fill="#506176"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.42864 9.14258C2.03416 9.14258 1.71436 9.47837 1.71436 9.89258C1.71436 10.3068 2.03416 10.6426 2.42864 10.6426H13.5715C13.966 10.6426 14.2858 10.3068 14.2858 9.89258C14.2858 9.47837 13.966 9.14258 13.5715 9.14258H2.42864Z" fill="#506176"/>
</svg>`;
    icons["indent"] = {
        "+1": `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.46387 2.88535C1.46387 2.4843 1.78898 2.15918 2.19004 2.15918H13.8101C14.2112 2.15918 14.5363 2.4843 14.5363 2.88535C14.5363 3.2864 14.2112 3.61152 13.8101 3.61152H2.19004C1.78898 3.61152 1.46387 3.2864 1.46387 2.88535ZM1.46387 13.7779C1.46387 13.3768 1.78898 13.0517 2.19004 13.0517H13.8101C14.2112 13.0517 14.5363 13.3768 14.5363 13.7779C14.5363 14.1789 14.2112 14.5041 13.8101 14.5041H2.19003C1.78898 14.5041 1.46387 14.1789 1.46387 13.7779ZM7.27383 10.147C7.27383 9.74599 7.59895 9.42087 8 9.42087H13.8101C14.2112 9.42087 14.5363 9.74599 14.5363 10.147C14.5363 10.5481 14.2112 10.8732 13.8101 10.8732H8C7.59895 10.8732 7.27383 10.5481 7.27383 10.147ZM7.27383 6.51619C7.27383 6.11514 7.59895 5.79003 8 5.79003H13.8101C14.2112 5.79003 14.5363 6.11514 14.5363 6.51619C14.5363 6.91725 14.2112 7.24236 13.8101 7.24236H8C7.59895 7.24236 7.27383 6.91725 7.27383 6.51619ZM3.86413 7.89004C4.13132 8.1238 4.13132 8.53944 3.86413 8.7732L1.8531 10.5327C1.70135 10.6654 1.46387 10.5577 1.46387 10.356V6.3072C1.46387 6.10557 1.70135 5.9978 1.8531 6.13057L3.86413 7.89004Z" fill="#506176"/>
</svg>`,
        "-1": `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.46436 2.88734C1.46436 2.48627 1.78949 2.16113 2.19056 2.16113H13.8099C14.211 2.16113 14.5361 2.48627 14.5361 2.88734C14.5361 3.28841 14.211 3.61355 13.8099 3.61355H2.19056C1.78949 3.61355 1.46436 3.28841 1.46436 2.88734ZM1.46436 13.7804C1.46436 13.3794 1.78949 13.0542 2.19056 13.0542H13.8099C14.211 13.0542 14.5361 13.3794 14.5361 13.7804C14.5361 14.1815 14.211 14.5067 13.8099 14.5067H2.19056C1.78949 14.5067 1.46436 14.1815 1.46436 13.7804ZM7.27401 10.1494C7.27401 9.74834 7.59915 9.42321 8.00022 9.42321H13.8099C14.211 9.42321 14.5361 9.74834 14.5361 10.1494C14.5361 10.5505 14.211 10.8756 13.8099 10.8756H8.00022C7.59915 10.8756 7.27401 10.5505 7.27401 10.1494ZM7.27401 6.51838C7.27401 6.1173 7.59915 5.79217 8.00022 5.79217H13.8099C14.211 5.79217 14.5361 6.1173 14.5361 6.51838C14.5361 6.91945 14.211 7.24458 13.8099 7.24458H8.00022C7.59915 7.24458 7.27401 6.91945 7.27401 6.51838ZM1.96911 8.77556C1.7019 8.54174 1.7019 8.12605 1.96911 7.89223L3.97986 6.13283C4.13164 6.00002 4.36918 6.10781 4.36918 6.3095V10.3583C4.36918 10.56 4.13164 10.6678 3.97986 10.535L1.96911 8.77556Z" fill="#506176"/>
</svg>`
    };
    icons["table"] = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 2.67897C1 2.30398 1.27842 2 1.62187 2H14.3781C14.7216 2 15 2.30398 15 2.67897V13.821C15 14.196 14.7216 14.5 14.3781 14.5H1.62187C1.27842 14.5 1 14.196 1 13.821C1 10.107 1 6.39299 1 2.67897ZM2.24374 7.18802V9.48624H5.14579V7.18802H2.24374ZM2.24374 5.83008V3.35794H13.7563V5.83008H2.24374ZM6.38952 7.18802V9.48624H9.61048V7.18802H6.38952ZM10.8542 7.18802V9.48624H13.7563V7.18802H10.8542ZM13.7563 10.8442H10.8542V13.1421H13.7563V10.8442ZM9.61048 13.1421V10.8442H6.38952V13.1421H9.61048ZM5.14579 13.1421V10.8442H2.24374V13.1421H5.14579Z" fill="#506176"/>
</svg>
`;
    return icons;
};

function attachDataValues(element, data, dataAttributes) {
    const mention = element;
    Object.keys(data).forEach(key => {
        if (dataAttributes.indexOf(key) > -1) {
            mention.dataset[key] = data[key];
        }
        else {
            delete mention.dataset[key];
        }
    });
    return mention;
}
function getMentionCharIndex(text, mentionDenotationChars) {
    return mentionDenotationChars.reduce((prev, mentionChar) => {
        const mentionCharIndex = text.lastIndexOf(mentionChar);
        if (mentionCharIndex > prev.mentionCharIndex) {
            return {
                mentionChar,
                mentionCharIndex
            };
        }
        return {
            mentionChar: prev.mentionChar,
            mentionCharIndex: prev.mentionCharIndex
        };
    }, { mentionChar: null, mentionCharIndex: -1 });
}
function hasValidChars(text, allowedChars) {
    return allowedChars.test(text);
}
function hasValidMentionCharIndex(mentionCharIndex, text, isolateChar) {
    if (mentionCharIndex > -1) {
        if (isolateChar &&
            !(mentionCharIndex === 0 || !!text[mentionCharIndex - 1].match(/\s/g))) {
            return false;
        }
        return true;
    }
    return false;
}

const Embed = Quill__default["default"].import("blots/embed");
class MentionBlot extends Embed {
    constructor(scroll, node) {
        super(scroll, node);
        this.clickHandler = null;
        this.hoverHandler = null;
        this.mounted = false;
    }
    static create(data) {
        const node = super.create();
        const denotationChar = document.createElement("span");
        denotationChar.className = "ql-mention-denotation-char";
        denotationChar.innerHTML = data.denotationChar;
        node.appendChild(denotationChar);
        node.innerHTML += data.value;
        return MentionBlot.setDataValues(node, data);
    }
    static setDataValues(element, data) {
        const domNode = element;
        Object.keys(data).forEach(key => {
            domNode.dataset[key] = data[key];
        });
        return domNode;
    }
    static value(domNode) {
        return domNode.dataset;
    }
    attach() {
        super.attach();
        if (!this.mounted) {
            this.mounted = true;
            this.clickHandler = this.getClickHandler();
            this.hoverHandler = this.getHoverHandler();
            this.domNode.addEventListener("click", this.clickHandler, false);
            this.domNode.addEventListener("mouseenter", this.hoverHandler, false);
        }
    }
    detach() {
        super.detach();
        this.mounted = false;
        if (this.clickHandler) {
            this.domNode.removeEventListener("click", this.clickHandler);
            this.clickHandler = null;
        }
    }
    getClickHandler() {
        return e => {
            const event = this.buildEvent("mention-clicked", e);
            window.dispatchEvent(event);
            e.preventDefault();
        };
    }
    getHoverHandler() {
        return e => {
            const event = this.buildEvent('mention-hovered', e);
            window.dispatchEvent(event);
            e.preventDefault();
        };
    }
    buildEvent(name, e) {
        const event = new Event(name, {
            bubbles: true,
            cancelable: true
        });
        event.value = Object.assign({}, this.domNode.dataset);
        event.event = e;
        return event;
    }
}
MentionBlot.blotName = "mention";
MentionBlot.tagName = "span";
MentionBlot.className = "mention";
Quill__default["default"].register(MentionBlot);

const Keys = {
    TAB: "Tab",
    ENTER: "Enter",
    ESCAPE: "Escape",
    UP: "ArrowUp",
    DOWN: "ArrowDown"
};
class Mention {
    constructor(quill, options) {
        this.isOpen = false;
        this.itemIndex = 0;
        this.mentionCharPos = null;
        this.cursorPos = 0;
        this.values = [];
        this.suspendMouseEnter = false;
        //this token is an object that may contains one key "abandoned", set to
        //true when the previous source call should be ignored in favor or a
        //more recent execution.  This token will be null unless a source call
        //is in progress.
        this.existingSourceExecutionToken = null;
        quill.showMention = this.showMentionList.bind(this);
        this.quill = quill;
        this.options = {
            source: null,
            renderItem(item) {
                return `${item.value}`;
            },
            renderLoading() {
                return null;
            },
            onSelect(item, insertItem) {
                insertItem(item);
            },
            mentionDenotationChars: ["@"],
            showDenotationChar: true,
            allowedChars: /^[a-zA-Z0-9_]*$/,
            minChars: 0,
            maxChars: 31,
            offsetTop: 2,
            offsetLeft: 0,
            isolateCharacter: false,
            fixMentionsToQuill: false,
            positioningStrategy: "normal",
            defaultMenuOrientation: "bottom",
            blotName: "mention",
            dataAttributes: [
                "id",
                "value",
                "denotationChar",
                "link",
                "target",
                "disabled"
            ],
            linkTarget: "_blank",
            onOpen() {
                return true;
            },
            onBeforeClose() {
                return true;
            },
            onClose() {
                return true;
            },
            // Style options
            listItemClass: "ql-mention-list-item",
            mentionContainerClass: "ql-mention-list-container",
            mentionListClass: "ql-mention-list",
            spaceAfterInsert: true,
            selectKeys: [Keys.ENTER]
        };
        Object.assign(this.options, options, {
            dataAttributes: Array.isArray(options.dataAttributes)
                ? this.options.dataAttributes.concat(options.dataAttributes)
                : this.options.dataAttributes
        });
        //create mention container
        this.mentionContainer = document.createElement("div");
        this.mentionContainer.className = this.options.mentionContainerClass
            ? this.options.mentionContainerClass
            : "";
        this.mentionContainer.style.cssText = "display: none; position: absolute;";
        this.mentionContainer.onmousemove = this.onContainerMouseMove.bind(this);
        if (this.options.fixMentionsToQuill) {
            this.mentionContainer.style.width = "auto";
        }
        this.mentionList = document.createElement("ul");
        this.mentionList.id = "quill-mention-list";
        quill.root.setAttribute("aria-owns", "quill-mention-list");
        this.mentionList.className = this.options.mentionListClass
            ? this.options.mentionListClass
            : "";
        this.mentionContainer.appendChild(this.mentionList);
        quill.on("text-change", this.onTextChange.bind(this));
        quill.on("selection-change", this.onSelectionChange.bind(this));
        //Pasting doesn't fire selection-change after the pasted text is
        //inserted, so here we manually trigger one
        quill.container.addEventListener("paste", () => {
            setTimeout(() => {
                const range = quill.getSelection();
                this.onSelectionChange(range);
            });
        });
        quill.keyboard.addBinding({
            key: Keys.TAB
        }, this.selectHandler.bind(this));
        quill.keyboard.bindings[Keys.TAB].unshift(quill.keyboard.bindings[Keys.TAB].pop());
        for (let selectKey of this.options.selectKeys) {
            quill.keyboard.addBinding({
                key: selectKey
            }, this.selectHandler.bind(this));
        }
        quill.keyboard.bindings[Keys.ENTER].unshift(quill.keyboard.bindings[Keys.ENTER].pop());
        quill.keyboard.addBinding({
            key: Keys.ESCAPE
        }, this.escapeHandler.bind(this));
        quill.keyboard.addBinding({
            key: Keys.UP
        }, this.upHandler.bind(this));
        quill.keyboard.addBinding({
            key: Keys.DOWN
        }, this.downHandler.bind(this));
    }
    selectHandler() {
        if (this.isOpen && !this.existingSourceExecutionToken) {
            this.selectItem();
            return false;
        }
        return true;
    }
    escapeHandler() {
        if (this.isOpen) {
            if (this.existingSourceExecutionToken) {
                this.existingSourceExecutionToken.abandoned = true;
            }
            this.hideMentionList();
            return false;
        }
        return true;
    }
    upHandler() {
        if (this.isOpen && !this.existingSourceExecutionToken) {
            this.prevItem();
            return false;
        }
        return true;
    }
    downHandler() {
        if (this.isOpen && !this.existingSourceExecutionToken) {
            this.nextItem();
            return false;
        }
        return true;
    }
    showMentionList() {
        if (this.options.positioningStrategy === "fixed") {
            document.body.appendChild(this.mentionContainer);
        }
        else {
            this.quill.container.appendChild(this.mentionContainer);
        }
        this.mentionContainer.style.visibility = "hidden";
        this.mentionContainer.style.display = "";
        this.mentionContainer.scrollTop = 0;
        this.setMentionContainerPosition();
        this.setIsOpen(true);
    }
    hideMentionList() {
        this.options.onBeforeClose();
        this.mentionContainer.style.display = "none";
        this.mentionContainer.remove();
        this.setIsOpen(false);
        this.quill.root.removeAttribute("aria-activedescendant");
    }
    highlightItem(scrollItemInView = true) {
        for (let i = 0; i < this.mentionList.childNodes.length; i += 1) {
            this.mentionList.childNodes[i].classList.remove("selected");
        }
        if (this.itemIndex === -1 ||
            this.mentionList.childNodes[this.itemIndex].dataset.disabled === "true") {
            return;
        }
        this.mentionList.childNodes[this.itemIndex].classList.add("selected");
        this.quill.root.setAttribute("aria-activedescendant", this.mentionList.childNodes[this.itemIndex].id);
        if (scrollItemInView) {
            const itemHeight = this.mentionList.childNodes[this.itemIndex]
                .offsetHeight;
            const itemPos = this.mentionList.childNodes[this.itemIndex].offsetTop;
            const containerTop = this.mentionContainer.scrollTop;
            const containerBottom = containerTop + this.mentionContainer.offsetHeight;
            if (itemPos < containerTop) {
                // Scroll up if the item is above the top of the container
                this.mentionContainer.scrollTop = itemPos;
            }
            else if (itemPos > containerBottom - itemHeight) {
                // scroll down if any part of the element is below the bottom of the container
                this.mentionContainer.scrollTop +=
                    itemPos - containerBottom + itemHeight;
            }
        }
    }
    getItemData() {
        const { link } = this.mentionList.childNodes[this.itemIndex].dataset;
        const hasLinkValue = typeof link !== "undefined";
        const itemTarget = this.mentionList.childNodes[this.itemIndex].dataset
            .target;
        if (hasLinkValue) {
            this.mentionList.childNodes[this.itemIndex].dataset.value = `<a href="${link}" target=${itemTarget ||
                this.options.linkTarget}>${this.mentionList.childNodes[this.itemIndex].dataset.value}`;
        }
        return this.mentionList.childNodes[this.itemIndex].dataset;
    }
    onContainerMouseMove() {
        this.suspendMouseEnter = false;
    }
    selectItem() {
        if (this.itemIndex === -1) {
            return;
        }
        const data = this.getItemData();
        if (data.disabled) {
            return;
        }
        this.options.onSelect(data, asyncData => {
            this.insertItem(asyncData);
        });
        this.hideMentionList();
    }
    insertItem(data, programmaticInsert) {
        const render = data;
        if (render === null) {
            return;
        }
        if (!this.options.showDenotationChar) {
            render.denotationChar = "";
        }
        var insertAtPos;
        if (!programmaticInsert) {
            insertAtPos = this.mentionCharPos;
            this.quill.deleteText(this.mentionCharPos, this.cursorPos - this.mentionCharPos, Quill__default["default"].sources.USER);
        }
        else {
            insertAtPos = this.cursorPos;
        }
        this.quill.insertEmbed(insertAtPos, this.options.blotName, render, Quill__default["default"].sources.USER);
        if (this.options.spaceAfterInsert) {
            this.quill.insertText(insertAtPos + 1, " ", Quill__default["default"].sources.USER);
            // setSelection here sets cursor position
            this.quill.setSelection(insertAtPos + 2, Quill__default["default"].sources.USER);
        }
        else {
            this.quill.setSelection(insertAtPos + 1, Quill__default["default"].sources.USER);
        }
        this.hideMentionList();
    }
    onItemMouseEnter(e) {
        if (this.suspendMouseEnter) {
            return;
        }
        const index = Number(e.target.dataset.index);
        if (!Number.isNaN(index) && index !== this.itemIndex) {
            this.itemIndex = index;
            this.highlightItem(false);
        }
    }
    onDisabledItemMouseEnter(e) {
        if (this.suspendMouseEnter) {
            return;
        }
        this.itemIndex = -1;
        this.highlightItem(false);
    }
    onItemClick(e) {
        if (e.button !== 0) {
            return;
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        this.itemIndex = e.currentTarget.dataset.index;
        this.highlightItem();
        this.selectItem();
    }
    onItemMouseDown(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
    renderLoading() {
        var renderedLoading = this.options.renderLoading();
        if (!renderedLoading) {
            return;
        }
        if (this.mentionContainer.getElementsByClassName("ql-mention-loading")
            .length > 0) {
            this.showMentionList();
            return;
        }
        this.mentionList.innerHTML = "";
        var loadingDiv = document.createElement("div");
        loadingDiv.className = "ql-mention-loading";
        loadingDiv.innerHTML = this.options.renderLoading();
        this.mentionContainer.append(loadingDiv);
        this.showMentionList();
    }
    removeLoading() {
        var loadingDiv = this.mentionContainer.getElementsByClassName("ql-mention-loading");
        if (loadingDiv.length > 0) {
            loadingDiv[0].remove();
        }
    }
    renderList(mentionChar, data, searchTerm) {
        if (data && data.length > 0) {
            this.removeLoading();
            this.values = data;
            this.mentionList.innerHTML = "";
            var initialSelection = -1;
            for (let i = 0; i < data.length; i += 1) {
                const li = document.createElement("li");
                li.id = "quill-mention-item-" + i;
                li.className = this.options.listItemClass
                    ? this.options.listItemClass
                    : "";
                if (data[i].disabled) {
                    li.className += " disabled";
                    li.setAttribute("aria-hidden", "true");
                }
                else if (initialSelection === -1) {
                    initialSelection = i;
                }
                li.dataset.index = i;
                li.innerHTML = this.options.renderItem(data[i], searchTerm);
                if (!data[i].disabled) {
                    li.onmouseenter = this.onItemMouseEnter.bind(this);
                    li.onmouseup = this.onItemClick.bind(this);
                    li.onmousedown = this.onItemMouseDown.bind(this);
                }
                else {
                    li.onmouseenter = this.onDisabledItemMouseEnter.bind(this);
                }
                li.dataset.denotationChar = mentionChar;
                this.mentionList.appendChild(attachDataValues(li, data[i], this.options.dataAttributes));
            }
            this.itemIndex = initialSelection;
            this.highlightItem();
            this.showMentionList();
        }
        else {
            this.hideMentionList();
        }
    }
    nextItem() {
        var increment = 0;
        var newIndex;
        do {
            increment++;
            newIndex = (this.itemIndex + increment) % this.values.length;
            var disabled = this.mentionList.childNodes[newIndex].dataset.disabled === "true";
            if (increment === this.values.length + 1) {
                //we've wrapped around w/o finding an enabled item
                newIndex = -1;
                break;
            }
        } while (disabled);
        this.itemIndex = newIndex;
        this.suspendMouseEnter = true;
        this.highlightItem();
    }
    prevItem() {
        var decrement = 0;
        var newIndex;
        do {
            decrement++;
            newIndex =
                (this.itemIndex + this.values.length - decrement) % this.values.length;
            var disabled = this.mentionList.childNodes[newIndex].dataset.disabled === "true";
            if (decrement === this.values.length + 1) {
                //we've wrapped around w/o finding an enabled item
                newIndex = -1;
                break;
            }
        } while (disabled);
        this.itemIndex = newIndex;
        this.suspendMouseEnter = true;
        this.highlightItem();
    }
    containerBottomIsNotVisible(topPos, containerPos) {
        const mentionContainerBottom = topPos + this.mentionContainer.offsetHeight + containerPos.top;
        return mentionContainerBottom > window.pageYOffset + window.innerHeight;
    }
    containerRightIsNotVisible(leftPos, containerPos) {
        if (this.options.fixMentionsToQuill) {
            return false;
        }
        const rightPos = leftPos + this.mentionContainer.offsetWidth + containerPos.left;
        const browserWidth = window.pageXOffset + document.documentElement.clientWidth;
        return rightPos > browserWidth;
    }
    setIsOpen(isOpen) {
        if (this.isOpen !== isOpen) {
            if (isOpen) {
                this.options.onOpen();
            }
            else {
                this.options.onClose();
            }
            this.isOpen = isOpen;
        }
    }
    setMentionContainerPosition() {
        if (this.options.positioningStrategy === "fixed") {
            this.setMentionContainerPosition_Fixed();
        }
        else {
            this.setMentionContainerPosition_Normal();
        }
    }
    setMentionContainerPosition_Normal() {
        const containerPos = this.quill.container.getBoundingClientRect();
        const mentionCharPos = this.quill.getBounds(this.mentionCharPos);
        const containerHeight = this.mentionContainer.offsetHeight;
        let topPos = this.options.offsetTop;
        let leftPos = this.options.offsetLeft;
        // handle horizontal positioning
        if (this.options.fixMentionsToQuill) {
            const rightPos = 0;
            this.mentionContainer.style.right = `${rightPos}px`;
        }
        else {
            leftPos += mentionCharPos.left;
        }
        if (this.containerRightIsNotVisible(leftPos, containerPos)) {
            const containerWidth = this.mentionContainer.offsetWidth + this.options.offsetLeft;
            const quillWidth = containerPos.width;
            leftPos = quillWidth - containerWidth;
        }
        // handle vertical positioning
        if (this.options.defaultMenuOrientation === "top") {
            // Attempt to align the mention container with the top of the quill editor
            if (this.options.fixMentionsToQuill) {
                topPos = -1 * (containerHeight + this.options.offsetTop);
            }
            else {
                topPos =
                    mentionCharPos.top - (containerHeight + this.options.offsetTop);
            }
            // default to bottom if the top is not visible
            if (topPos + containerPos.top <= 0) {
                let overMentionCharPos = this.options.offsetTop;
                if (this.options.fixMentionsToQuill) {
                    overMentionCharPos += containerPos.height;
                }
                else {
                    overMentionCharPos += mentionCharPos.bottom;
                }
                topPos = overMentionCharPos;
            }
        }
        else {
            // Attempt to align the mention container with the bottom of the quill editor
            if (this.options.fixMentionsToQuill) {
                topPos += containerPos.height;
            }
            else {
                topPos += mentionCharPos.bottom;
            }
            // default to the top if the bottom is not visible
            if (this.containerBottomIsNotVisible(topPos, containerPos)) {
                let overMentionCharPos = this.options.offsetTop * -1;
                if (!this.options.fixMentionsToQuill) {
                    overMentionCharPos += mentionCharPos.top;
                }
                topPos = overMentionCharPos - containerHeight;
            }
        }
        if (topPos >= 0) {
            this.options.mentionContainerClass.split(" ").forEach(className => {
                this.mentionContainer.classList.add(`${className}-bottom`);
                this.mentionContainer.classList.remove(`${className}-top`);
            });
        }
        else {
            this.options.mentionContainerClass.split(" ").forEach(className => {
                this.mentionContainer.classList.add(`${className}-top`);
                this.mentionContainer.classList.remove(`${className}-bottom`);
            });
        }
        this.mentionContainer.style.top = `${topPos}px`;
        this.mentionContainer.style.left = `${leftPos}px`;
        this.mentionContainer.style.visibility = "visible";
    }
    setMentionContainerPosition_Fixed() {
        this.mentionContainer.style.position = "fixed";
        this.mentionContainer.style.height = null;
        const containerPos = this.quill.container.getBoundingClientRect();
        const mentionCharPos = this.quill.getBounds(this.mentionCharPos);
        const mentionCharPosAbsolute = {
            left: containerPos.left + mentionCharPos.left,
            top: containerPos.top + mentionCharPos.top,
            width: 0,
            height: mentionCharPos.height
        };
        //Which rectangle should it be relative to
        const relativeToPos = this.options.fixMentionsToQuill
            ? containerPos
            : mentionCharPosAbsolute;
        let topPos = this.options.offsetTop;
        let leftPos = this.options.offsetLeft;
        // handle horizontal positioning
        if (this.options.fixMentionsToQuill) {
            const rightPos = relativeToPos.right;
            this.mentionContainer.style.right = `${rightPos}px`;
        }
        else {
            leftPos += relativeToPos.left;
            //if its off the righ edge, push it back
            if (leftPos + this.mentionContainer.offsetWidth >
                document.documentElement.clientWidth) {
                leftPos -=
                    leftPos +
                        this.mentionContainer.offsetWidth -
                        document.documentElement.clientWidth;
            }
        }
        const availableSpaceTop = relativeToPos.top;
        const availableSpaceBottom = document.documentElement.clientHeight -
            (relativeToPos.top + relativeToPos.height);
        const fitsBottom = this.mentionContainer.offsetHeight <= availableSpaceBottom;
        const fitsTop = this.mentionContainer.offsetHeight <= availableSpaceTop;
        var placement;
        if (this.options.defaultMenuOrientation === "top" && fitsTop) {
            placement = "top";
        }
        else if (this.options.defaultMenuOrientation === "bottom" && fitsBottom) {
            placement = "bottom";
        }
        else {
            //it doesnt fit either so put it where there's the most space
            placement = availableSpaceBottom > availableSpaceTop ? "bottom" : "top";
        }
        if (placement === "bottom") {
            topPos = relativeToPos.top + relativeToPos.height;
            if (!fitsBottom) {
                //shrink it to fit
                //3 is a bit of a fudge factor so it doesnt touch the edge of the screen
                this.mentionContainer.style.height = availableSpaceBottom - 3 + "px";
            }
            this.options.mentionContainerClass.split(" ").forEach(className => {
                this.mentionContainer.classList.add(`${className}-bottom`);
                this.mentionContainer.classList.remove(`${className}-top`);
            });
        }
        else {
            topPos = relativeToPos.top - this.mentionContainer.offsetHeight;
            if (!fitsTop) {
                //shrink it to fit
                //3 is a bit of a fudge factor so it doesnt touch the edge of the screen
                this.mentionContainer.style.height = availableSpaceTop - 3 + "px";
                topPos = 3;
            }
            this.options.mentionContainerClass.split(" ").forEach(className => {
                this.mentionContainer.classList.add(`${className}-top`);
                this.mentionContainer.classList.remove(`${className}-bottom`);
            });
        }
        this.mentionContainer.style.top = `${topPos}px`;
        this.mentionContainer.style.left = `${leftPos}px`;
        this.mentionContainer.style.visibility = "visible";
    }
    getTextBeforeCursor() {
        const startPos = Math.max(0, this.cursorPos - this.options.maxChars);
        const textBeforeCursorPos = this.quill.getText(startPos, this.cursorPos - startPos);
        return textBeforeCursorPos;
    }
    onSomethingChange() {
        setTimeout(() => {
            const range = this.quill.getSelection();
            if (range == null)
                return;
            this.cursorPos = range.index;
            const textBeforeCursor = this.getTextBeforeCursor();
            const { mentionChar, mentionCharIndex } = getMentionCharIndex(textBeforeCursor, this.options.mentionDenotationChars);
            if (hasValidMentionCharIndex(mentionCharIndex, textBeforeCursor, this.options.isolateCharacter)) {
                const mentionCharPos = this.cursorPos - (textBeforeCursor.length - mentionCharIndex);
                this.mentionCharPos = mentionCharPos;
                const textAfter = textBeforeCursor.substring(mentionCharIndex + mentionChar.length);
                if (textAfter.length >= this.options.minChars &&
                    hasValidChars(textAfter, this.getAllowedCharsRegex(mentionChar))) {
                    if (this.existingSourceExecutionToken) {
                        this.existingSourceExecutionToken.abandoned = true;
                    }
                    this.renderLoading();
                    var sourceRequestToken = {
                        abandoned: false
                    };
                    this.existingSourceExecutionToken = sourceRequestToken;
                    this.options.source(textAfter, (data, searchTerm) => {
                        if (sourceRequestToken.abandoned) {
                            return;
                        }
                        this.existingSourceExecutionToken = null;
                        this.renderList(mentionChar, data, searchTerm);
                    }, mentionChar);
                }
                else {
                    if (this.existingSourceExecutionToken) {
                        this.existingSourceExecutionToken.abandoned = true;
                    }
                    this.hideMentionList();
                }
            }
            else {
                if (this.existingSourceExecutionToken) {
                    this.existingSourceExecutionToken.abandoned = true;
                }
                this.hideMentionList();
            }
        }, 4);
    }
    getAllowedCharsRegex(denotationChar) {
        if (this.options.allowedChars instanceof RegExp) {
            return this.options.allowedChars;
        }
        else {
            return this.options.allowedChars(denotationChar);
        }
    }
    onTextChange(delta, oldDelta, source) {
        if (source === "user") {
            this.onSomethingChange();
        }
    }
    onSelectionChange(range) {
        if (range && range.length === 0) {
            this.onSomethingChange();
        }
        else {
            this.hideMentionList();
        }
    }
    openMenu(denotationChar) {
        var selection = this.quill.getSelection(true);
        this.quill.insertText(selection.index, denotationChar);
        this.quill.blur();
        this.quill.focus();
    }
}

var DefaultOptions = {
    modules: [
        'DisplaySize',
        'Toolbar',
        'Resize',
    ],
    overlayStyles: {
        position: 'absolute',
        boxSizing: 'border-box',
        border: '1px dashed #444',
    },
    handleStyles: {
        position: 'absolute',
        height: '12px',
        width: '12px',
        backgroundColor: 'white',
        border: '1px solid #777',
        boxSizing: 'border-box',
        opacity: '0.80',
    },
    displayStyles: {
        position: 'absolute',
        font: '12px/1.0 Arial, Helvetica, sans-serif',
        padding: '4px 8px',
        textAlign: 'center',
        backgroundColor: 'white',
        color: '#333',
        border: '1px solid #777',
        boxSizing: 'border-box',
        opacity: '0.80',
        cursor: 'default',
    },
    toolbarStyles: {
        position: 'absolute',
        top: '-12px',
        right: '0',
        left: '0',
        height: '0',
        minWidth: '100px',
        font: '12px/1.0 Arial, Helvetica, sans-serif',
        textAlign: 'center',
        color: '#333',
        boxSizing: 'border-box',
        cursor: 'default',
    },
    toolbarButtonStyles: {
        display: 'inline-block',
        width: '24px',
        height: '24px',
        background: 'white',
        border: '1px solid #999',
        verticalAlign: 'middle',
    },
    toolbarButtonSvgStyles: {
        fill: '#444',
        stroke: '#444',
        strokeWidth: '2',
    },
};

class BaseModule {
    constructor(resizer) {
        /*
            requestUpdate (passed in by the library during construction, above) can be used to let the library know that
            you've changed something about the image that would require re-calculating the overlay (and all of its child
            elements)
    
            For example, if you add a margin to the element, you'll want to call this or else all the controls will be
            misaligned on-screen.
         */
        /*
            onCreate will be called when the element is clicked on
    
            If the module has any user controls, it should create any containers that it'll need here.
            The overlay has absolute positioning, and will be automatically repositioned and resized as needed, so you can
            use your own absolute positioning and the 'top', 'right', etc. styles to be positioned relative to the element
            on-screen.
         */
        this.onCreate = () => { };
        /*
            onDestroy will be called when the element is de-selected, or when this module otherwise needs to tidy up.
    
            If you created any DOM elements in onCreate, please remove them from the DOM and destroy them here.
         */
        this.onDestroy = () => { };
        /*
            onUpdate will be called any time that the element is changed (e.g. resized, aligned, etc.)
    
            This frequently happens during resize dragging, so keep computations light while here to ensure a smooth
            user experience.
         */
        this.onUpdate = () => { };
        this.overlay = resizer.overlay;
        this.img = resizer.img;
        this.options = resizer.options;
        this.requestUpdate = resizer.onUpdate;
    }
}

class DisplaySize extends BaseModule {
    constructor() {
        super(...arguments);
        this.onCreate = () => {
            // Create the container to hold the size display
            this.display = document.createElement('div');
            // Apply styles
            Object.assign(this.display.style, this.options.displayStyles);
            // Attach it
            this.overlay.appendChild(this.display);
        };
        this.onDestroy = () => { };
        this.onUpdate = () => {
            if (!this.display || !this.img) {
                return;
            }
            const size = this.getCurrentSize();
            this.display.innerHTML = size.join(' &times; ');
            if (size[0] > 120 && size[1] > 30) {
                // position on top of image
                Object.assign(this.display.style, {
                    right: '4px',
                    bottom: '4px',
                    left: 'auto',
                });
            }
            else if (this.img.style.float == 'right') {
                // position off bottom left
                const dispRect = this.display.getBoundingClientRect();
                Object.assign(this.display.style, {
                    right: 'auto',
                    bottom: `-${dispRect.height + 4}px`,
                    left: `-${dispRect.width + 4}px`,
                });
            }
            else {
                // position off bottom right
                const dispRect = this.display.getBoundingClientRect();
                Object.assign(this.display.style, {
                    right: `-${dispRect.width + 4}px`,
                    bottom: `-${dispRect.height + 4}px`,
                    left: 'auto',
                });
            }
        };
        this.getCurrentSize = () => [
            this.img.width,
            Math.round((this.img.width / this.img.naturalWidth) * this.img.naturalHeight),
        ];
    }
}

class Resize extends BaseModule {
    constructor() {
        super(...arguments);
        this.onCreate = () => {
            // track resize handles
            this.boxes = [];
            // add 4 resize handles
            this.addBox('nwse-resize'); // top left
            this.addBox('nesw-resize'); // top right
            this.addBox('nwse-resize'); // bottom right
            this.addBox('nesw-resize'); // bottom left
            this.positionBoxes();
        };
        this.onDestroy = () => {
            // reset drag handle cursors
            this.setCursor('');
        };
        this.positionBoxes = () => {
            const handleXOffset = `${-parseFloat(this.options.handleStyles.width) / 2}px`;
            const handleYOffset = `${-parseFloat(this.options.handleStyles.height) / 2}px`;
            // set the top and left for each drag handle
            [
                { left: handleXOffset, top: handleYOffset },
                { right: handleXOffset, top: handleYOffset },
                { right: handleXOffset, bottom: handleYOffset },
                { left: handleXOffset, bottom: handleYOffset }, // bottom left
            ].forEach((pos, idx) => {
                Object.assign(this.boxes[idx].style, pos);
            });
        };
        this.addBox = (cursor) => {
            // create div element for resize handle
            const box = document.createElement('div');
            // Star with the specified styles
            Object.assign(box.style, this.options.handleStyles);
            box.style.cursor = cursor;
            // Set the width/height to use 'px'
            box.style.width = `${this.options.handleStyles.width}px`;
            box.style.height = `${this.options.handleStyles.height}px`;
            // listen for mousedown on each box
            box.addEventListener('mousedown', this.handleMousedown, false);
            // add drag handle to document
            this.overlay.appendChild(box);
            // keep track of drag handle
            this.boxes.push(box);
        };
        this.handleMousedown = (evt) => {
            // note which box
            this.dragBox = evt.target;
            // note starting mousedown position
            this.dragStartX = evt.clientX;
            // store the width before the drag
            this.preDragWidth = this.img.width || this.img.naturalWidth;
            // set the proper cursor everywhere
            this.setCursor(this.dragBox.style.cursor);
            // listen for movement and mouseup
            document.addEventListener('mousemove', this.handleDrag, false);
            document.addEventListener('mouseup', this.handleMouseup, false);
        };
        this.handleMouseup = () => {
            // reset cursor everywhere
            this.setCursor('');
            // stop listening for movement and mouseup
            document.removeEventListener('mousemove', this.handleDrag);
            document.removeEventListener('mouseup', this.handleMouseup);
        };
        this.handleDrag = (evt) => {
            if (!this.img) {
                // image not set yet
                return;
            }
            // update image size
            const deltaX = evt.clientX - this.dragStartX;
            if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[3]) {
                // left-side resize handler; dragging right shrinks image
                this.img.width = Math.round(this.preDragWidth - deltaX);
            }
            else {
                // right-side resize handler; dragging right enlarges image
                this.img.width = Math.round(this.preDragWidth + deltaX);
            }
            this.requestUpdate();
        };
        this.setCursor = (value) => {
            [
                document.body,
                this.img,
            ].forEach((el) => {
                el.style.cursor = value; // eslint-disable-line no-param-reassign
            });
        };
    }
}

const knownModules = { DisplaySize,
    // Toolbar,
    Resize };
/**
 * Custom module for quilljs to allow user to resize <img> elements
 * (Works on Chrome, Edge, Safari and replaces Firefox's native resize behavior)
 * @see https://quilljs.com/blog/building-a-custom-module/
 */
class ImageResize {
    constructor(quill, options = {}) {
        this.initializeModules = () => {
            this.removeModules();
            this.modules = this.moduleClasses.map(ModuleClass => new (knownModules[ModuleClass] || ModuleClass)(this));
            this.modules.forEach((module) => {
                module.onCreate();
            });
            this.onUpdate();
        };
        this.onUpdate = () => {
            this.repositionElements();
            this.modules.forEach((module) => {
                module.onUpdate();
            });
        };
        this.removeModules = () => {
            this.modules.forEach((module) => {
                module.onDestroy();
            });
            this.modules = [];
        };
        this.handleClick = (evt) => {
            if (evt.target && evt.target.tagName && evt.target.tagName.toUpperCase() === 'IMG') {
                if (this.img === evt.target) {
                    // we are already focused on this image
                    return;
                }
                if (this.img) {
                    // we were just focused on another image
                    this.hide();
                }
                // clicked on an image inside the editor
                this.show(evt.target);
            }
            else if (this.img) {
                // clicked on a non image
                this.hide();
            }
        };
        this.show = (img) => {
            // keep track of this img element
            this.img = img;
            this.showOverlay();
            this.initializeModules();
        };
        this.showOverlay = () => {
            if (this.overlay) {
                this.hideOverlay();
            }
            this.quill.setSelection(null);
            // prevent spurious text selection
            this.setUserSelect('none');
            // listen for the image being deleted or moved
            document.addEventListener('keyup', this.checkImage, true);
            this.quill.root.addEventListener('input', this.checkImage, true);
            // Create and add the overlay
            this.overlay = document.createElement('div');
            Object.assign(this.overlay.style, this.options.overlayStyles);
            this.quill.root.parentNode.appendChild(this.overlay);
            this.repositionElements();
        };
        this.hideOverlay = () => {
            if (!this.overlay) {
                return;
            }
            // Remove the overlay
            this.quill.root.parentNode.removeChild(this.overlay);
            this.overlay = undefined;
            // stop listening for image deletion or movement
            document.removeEventListener('keyup', this.checkImage);
            this.quill.root.removeEventListener('input', this.checkImage);
            // reset user-select
            this.setUserSelect('');
        };
        this.repositionElements = () => {
            if (!this.overlay || !this.img) {
                return;
            }
            // position the overlay over the image
            const parent = this.quill.root.parentNode;
            const imgRect = this.img.getBoundingClientRect();
            const containerRect = parent.getBoundingClientRect();
            Object.assign(this.overlay.style, {
                left: `${imgRect.left - containerRect.left - 1 + parent.scrollLeft}px`,
                top: `${imgRect.top - containerRect.top + parent.scrollTop}px`,
                width: `${imgRect.width}px`,
                height: `${imgRect.height}px`,
            });
        };
        this.hide = () => {
            this.hideOverlay();
            this.removeModules();
            this.img = undefined;
        };
        this.setUserSelect = (value) => {
            [
                'userSelect',
                'mozUserSelect',
                'webkitUserSelect',
                'msUserSelect',
            ].forEach((prop) => {
                // set on contenteditable element and <html>
                this.quill.root.style[prop] = value;
                document.documentElement.style[prop] = value;
            });
        };
        this.checkImage = (evt) => {
            if (this.img) {
                if (evt.keyCode == 46 || evt.keyCode == 8) {
                    window.Quill.find(this.img).deleteAt(0);
                }
                this.hide();
            }
        };
        // save the quill reference and options
        this.quill = quill;
        // Apply the options to our defaults, and stash them for later
        // defaultsDeep doesn't do arrays as you'd expect, so we'll need to apply the classes array from options separately
        let moduleClasses = false;
        if (options.modules) {
            moduleClasses = options.modules.slice();
        }
        // Apply options to default options
        this.options = defaultsDeep__default["default"]({}, options, DefaultOptions);
        // (see above about moduleClasses)
        if (moduleClasses !== false) {
            this.options.modules = moduleClasses;
        }
        // disable native image resizing on firefox
        document.execCommand('enableObjectResizing', false, 'false');
        // respond to clicks inside the editor
        this.quill.root.addEventListener('click', this.handleClick, false);
        this.quill.root.parentNode.style.position = this.quill.root.parentNode.style.position || 'relative';
        // setup modules
        this.moduleClasses = this.options.modules;
        this.modules = [];
    }
}
if (window.Quill) {
    window.Quill.register('modules/imageResize', ImageResize);
}

let Quill = Quill__namespace;
Quill.register("modules/mention", Mention);
Quill.register("modules/ImageResize", ImageResize);
const VerticalDivider = styled__default["default"].div `
  width: 1px;
  height: 40px;
  background-color: #e0e4eb;
`;
const Wrapper$2 = styled__default["default"].div `
  ${quillStyle};
`;
const icons = Quill.import("ui/icons");
overrideIcons(icons);
function WYSIWYG(props) {
    const [isPreview, setIsPreview] = React.useState(false);
    const defaultModules = React.useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "underline", "strike"],
                ["link", "image", "video"],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }]
            ],
            handlers: {
                //must be an async func so you can pass img link from other component later
                image: function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        const that = this;
                        new Promise(resolve => {
                            props.setModalInsetFunc(function () {
                                //pass resolve to ImgModal component so it can be called as resolve(link) in ImgModal, see in ImgModal.txs line 84
                                return resolve;
                            });
                        }).then(link => {
                            that.quill.focus();
                            var range = that.quill.getSelection();
                            that.quill.insertEmbed(range.index, "image", link, "user");
                        });
                    });
                },
                video: function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        const that = this;
                        new Promise(resolve => {
                            props.setModalInsetFunc(function () {
                                //pass resolve to ImgModal component so it can be called as resolve(link) in ImgModal, see in ImgModal.txs line 84
                                return resolve;
                            }, "video");
                        }).then(link => {
                            const videoLink = link === null || link === void 0 ? void 0 : link.replace("watch?v=", "embed/");
                            that.quill.focus();
                            var range = that.quill.getSelection();
                            that.quill.insertEmbed(range.index, "video", videoLink, "user");
                        });
                    });
                }
            }
        },
        mention: {
            allowedChars: /^[0-9A-Za-z\s]*$/,
            mentionDenotationChars: ["@"],
            source: function (searchTerm, renderList, mentionChar) {
                const atValues = [
                    { id: "123123", value: "456456" },
                    { id: "123123", value: "789798" }
                ];
                let values;
                if (mentionChar === "@") {
                    values = atValues;
                }
                if (searchTerm.length === 0) {
                    renderList(values, searchTerm);
                }
                else {
                    const matches = [];
                    for (let i = 0; i < values.length; i++) {
                        if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) {
                            matches.push(values[i]);
                        }
                    }
                    renderList(matches, searchTerm);
                }
            }
        },
        ImageResize: {
            modules: ["Resize", "DisplaySize"]
        }
    }), []);
    const getEditorConfig = () => {
        return {
            bounds: props.bounds,
            formats: props.formats,
            modules: defaultModules,
            placeholder: "",
            readOnly: props.readOnly,
            scrollingContainer: props.scrollingContainer,
            tabIndex: props.tabIndex,
            theme: "snow"
        };
    };
    const generation = 0;
    const [editingArea, setEditingArea] = React__default["default"].useState(null);
    const setEditorTabIndex = (editor, tabIndex) => {
        var _a;
        if ((_a = editor === null || editor === void 0 ? void 0 : editor.scroll) === null || _a === void 0 ? void 0 : _a.domNode) {
            editor.scroll.domNode.tabIndex = tabIndex;
        }
    };
    const hookEditor = (editor) => {
        // @ts-ignore
        editor.on("editor-change", (eventName, rangeOrDelta, oldRangeOrDelta, source) => {
            if (eventName === "text-change") {
                if (props === null || props === void 0 ? void 0 : props.onChange) {
                    props === null || props === void 0 ? void 0 : props.onChange(editor.root.innerHTML);
                }
            }
        });
    };
    /**
     Creates an editor on the given element. The editor will be passed the
     configuration, have its events bound,
     */
    const createEditor = (element, config) => {
        const editorInstance = new Quill(element, config);
        if (config.tabIndex != null) {
            setEditorTabIndex(editorInstance, config.tabIndex);
        }
        hookEditor(editorInstance);
        return editorInstance;
    };
    const properties = {
        key: generation,
        ref: (instance) => {
            setEditingArea(instance);
        }
    };
    React.useEffect(() => {
        if (editingArea) {
            const element = ReactDOM__default["default"].findDOMNode(editingArea);
            const editor = createEditor(element, getEditorConfig());
            if (props.value) {
                editor.clipboard.dangerouslyPasteHTML(props.value);
            }
        }
    }, [editingArea]);
    return (React__default["default"].createElement(Wrapper$2, { isPreview: isPreview },
        React__default["default"].createElement(StateToggle, null,
            React__default["default"].createElement("button", { onClick: () => setIsPreview(false), className: isPreview ? "" : "active" }, "Write"),
            React__default["default"].createElement(VerticalDivider, null),
            React__default["default"].createElement("button", { style: { paddingLeft: 11 }, onClick: () => setIsPreview(true), className: isPreview ? "active" : "" }, "Preview"),
            React__default["default"].createElement(VerticalDivider, null)),
        React__default["default"].createElement("div", Object.assign({}, properties))));
}

const Wrapper$1 = styled__default["default"].div `
  position: relative;
  cursor: pointer;
  width: 38px;
  height: 22px;
  background: #c2c8d5;
  border-radius: 16px;
  > div {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 4px;
    left: 4px;
    background: #ffffff;
    border-radius: 7px;
  }
  ${(p) => p.disabled
    ? styled.css `
        background: #EBEEF4;
        > div {
          left: auto;
          right: 4px;
        }
      `
    : p.active
        ? styled.css `
        background: #6848ff;
        > div {
          left: auto;
          right: 4px;
        }
      `
        : null}
  ${(p) => p.size === "small" &&
    styled.css `
      width: 30px;
      height: 18px;
      > div {
        width: 12px;
        height: 12px;
        top: 3px;
        left: 3px;
        border-radius: 6px;
      }
      ${(p) => p.active &&
        styled.css `
          background: #6848ff;
          > div {
            left: auto;
            right: 3px;
          }
        `}
    `}
`;
function Toggle({ disabled, isOn, onToggle, size }) {
    return (React__default["default"].createElement(Wrapper$1, { disabled: disabled, active: isOn, onClick: () => onToggle(!isOn), size: size },
        React__default["default"].createElement("div", null)));
}

const MarkdownIcon = () => (React__default["default"].createElement("svg", { width: "26", height: "16", viewBox: "0 0 26 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React__default["default"].createElement("path", { d: "M3.75 12.25V3.75H6.25L8.75 6.875L11.25 3.75H13.75V12.25H11.25V7.375L8.75 10.5L6.25 7.375V12.25H3.75ZM19.375 12.25L15.625 8.125H18.125V3.75H20.625V8.125H23.125L19.375 12.25Z", fill: "#1E2134" }),
    React__default["default"].createElement("rect", { x: "0.625", y: "0.625", width: "24.75", height: "14.75", rx: "1.375", stroke: "#1E2134", strokeWidth: "1.25" })));

const Flex = styled__default["default"].div `
  display: flex;
  align-items: center;
`;
const Shade = styled__default["default"].div `
  z-index: 10;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const Wrapper = styled__default["default"].div `
  z-index: 11;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -200px;
  padding-bottom: 24px;
  width: 400px;
  @media screen and (max-width: 768px) {
    width: 343px;
    margin-top: -50px;
    margin-left: -171px;
    border-radius: 6px;
  }
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
`;
const Title = styled__default["default"](Flex) `
  padding: 24px 24px 16px 24px;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;

  svg {
    cursor: pointer;
  }
`;
const FormWrapper = styled__default["default"].div `
  padding: 0 24px 12px 24px;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    font-size: 13px;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #ddd;
    width: 96px;
  }
`;
const TextArea = styled__default["default"].textarea `
  box-sizing: border-box;
  font-family: Inter, serif;
  width: 100%;
  min-height: 66px;
  font-size: 14px;
  line-height: 14px;
  padding: 12px 16px;
  color: #34373c;
  resize: none;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus,
  &:active {
    border: 1px solid #aaa;
    outline: none;
  }

  ::placeholder {
    color: #d7dee8;
    opacity: 1;
  }
`;
const SubmitButtonWrapper = styled__default["default"].div `
  padding-right: 24px;
  display: flex;
  justify-content: end;
`;
const SubmitButton = styled__default["default"].button `
  display: flex;
  justify-content: center;
  text-align: center;
  all: unset;
  padding: 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #ffffff;
  background: #1e2134;
  border-radius: 4px;
  cursor: pointer;
`;
styled__default["default"].input `
  visibility: hidden;
  position: absolute;
`;
styled__default["default"].div `
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 368px;
  border-radius: 4px;
  background: #f8f8f8;

  span {
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    color: #696d73;
  }
`;
const Hint = styled__default["default"].p `
  margin: 16px 24px;
  margin-top: 0;
  padding: 12px 16px;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19.6px;
  color: #6848ff;
  background: #f5f2ff;
  border-radius: 4px;
`;
styled__default["default"].p `
  text-align: center;
  width: 80%;
  font-size: 14px;
  color: #34373c;

  span {
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
  }

  .ellipsis {
    display: inline-block;
    width: calc(30% + 1.2em);
    text-overflow: ellipsis;
  }

  .indent {
    display: inline-flex;
    width: calc(30% - 1.2em);
    justify-content: flex-end;
  }
`;
function InsertContentsModal({ showModal, setShowModal, insetQuillContentsFunc: resolveInsertPromise, type = "image", }) {
    const [source, setSource] = React.useState("remote");
    const [link, setLink] = React.useState("");
    const onChange = (e) => {
        if (source === "remote") {
            setLink(e.target.value);
        }
    };
    const onInset = () => {
        try {
            if (source === "remote") {
                if (link) {
                    resolveInsertPromise(link);
                    setShowModal(false);
                    setLink("");
                }
                else {
                    // dispatch(
                    //   addToast({
                    //     type: "info",
                    //     message: "请输入图片链接",
                    //   })
                    // )
                }
            }
        }
        catch (e) {
            setLink("");
        }
    };
    const onClose = () => {
        setShowModal(false);
    };
    if (!showModal) {
        return null;
    }
    return (React__default["default"].createElement(Shade, null,
        React__default["default"].createElement(Wrapper, null,
            React__default["default"].createElement(Title, null,
                React__default["default"].createElement("span", null, "Paste URL"),
                React__default["default"].createElement("svg", { onClick: onClose, width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    React__default["default"].createElement("path", { d: "M8.00007 7.0574L12.0072 3.05029L12.9498 3.99296L8.94273 8.00007L12.9498 12.0072L12.0072 12.9498L8.00007 8.94273L3.99296 12.9498L3.05029 12.0072L7.0574 8.00007L3.05029 3.99296L3.99296 3.05029L8.00007 7.0574Z", fill: "#C8CBD0" }))),
            type === "video" && React__default["default"].createElement(Hint, null, "Embedding Youtube video only"),
            React__default["default"].createElement(FormWrapper, null,
                React__default["default"].createElement(TextArea, { value: link, placeholder: `Please fill available ${type} URL...`, onChange: onChange })),
            React__default["default"].createElement(SubmitButtonWrapper, null,
                React__default["default"].createElement(SubmitButton, { onClick: onInset }, "Confirm")))));
}

const markdown = `
[https://www.baidu.com/](https://www.baidu.com/)
# heading 1
**bold text** _italic text_ \`inline code\`
- bullet 1
1. numbered 1

|table|example|index|
|-|-|-|
|table|column|1|
|table|column|2|
\`\`\`bash
echo "hello"
\`\`\`
> quote text
`.trim();
[
    {
        preview: React__namespace.createElement("span", null, "abc"),
        value: "abc"
    },
    {
        preview: React__namespace.createElement("span", null, "edf"),
        value: "edf"
    }
];
const ToggleWrapper = styled__default["default"].div `
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 8px;
  height: 40px;
  border-top: 1px solid #ebeef4;
  padding-right: 16px;
`;
const UniverseEditor = ({ loadSuggestions }) => {
    const [content, setContent] = React.useState(markdown);
    const [contentType, setContentType] = React.useState("markdown");
    const [htmlContent, setHtmlContent] = React.useState(`<p>　</p>`);
    const [showModal, setShowModal] = React.useState(false);
    const [modalType, setModalType] = React.useState("image");
    const [insetQuillContentsFunc, setInsetQuillContentsFunc] = React.useState(null);
    const onMarkdownSwitch = () => {
        if (content &&
            !confirm(`Togging editor will empty all typed contents, are you sure ?`)) {
            return;
        }
        const newContentType = contentType === "html" ? "markdown" : "html";
        setContent("");
        setContentType(newContentType);
    };
    return (React__namespace.createElement("div", { style: {
            maxWidth: 800,
            border: "1px solid #EBEEF4",
            borderRadius: 4,
            overflow: "hidden"
        } },
        contentType === "markdown" ? (React__namespace.createElement(Editor, { value: content, onChange: value => {
                setContent(value);
            }, loadSuggestions: loadSuggestions, minHeight: 200, theme: "subsquare" })) : (React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement(InsertContentsModal, { showModal: showModal, setShowModal: setShowModal, insetQuillContentsFunc: insetQuillContentsFunc, type: modalType }),
            React__namespace.createElement(WYSIWYG, { value: htmlContent, onChange: value => setHtmlContent(value), setModalInsetFunc: (insetFunc, type) => {
                    setModalType(type);
                    setShowModal(true);
                    setInsetQuillContentsFunc(insetFunc);
                } }))),
        React__namespace.createElement(ToggleWrapper, null,
            React__namespace.createElement(MarkdownIcon, null),
            React__namespace.createElement(Toggle, { size: "small", isOn: contentType === "markdown", onToggle: onMarkdownSwitch }))));
};

const OpenSquare = {
    wrapper: styled.css ``,
    toolbar: styled.css ``,
    tab: styled.css ``,
    tabActive: styled.css ``,
    textarea: styled.css ``,
    preview: styled.css ``
};

const SubSquare = {
    wrapper: styled.css `
    border: none;
  `,
    toolbar: styled.css `
    justify-content: end;
    background-color: #f6f7fa;
    padding-left: 0;
    padding-right: 20px;
    height: 40px;
    border-bottom: 1px solid #e0e4eb;
    position: relative;
    > div:first-child {
      gap: 0;
      height: 40px;
    }
  `,
    tabs: styled.css `
    position: absolute;
    left: 0;
  `,
    tab: styled.css `
    padding: 12px;
    line-height: 16px;
    border-bottom: none;
    color: #9da9bb;

    :last-child {
      box-shadow: 1px 0 0 0 #e0e4eb;
    }

    :hover {
      color: #506176;
    }
  `,
    tabActive: styled.css `
    background-color: white;
    color: #1e2134;
    border-bottom: 17px solid white;
    :first-child {
      box-shadow: 1px 0 0 0 #e0e4eb;
    }
    :last-child {
      box-shadow: -1px 0 0 0 #e0e4eb, 1px 0 0 0 #e0e4eb;
    }
    :hover {
      color: #1e2134;
    }
  `,
    textarea: styled.css `
    background-color: white;
    border-bottom: none;
  `,
    preview: styled.css `
    background-color: white;
  `
};

const Editor = ({ value, onChange, loadSuggestions, minHeight = 144, theme = "opensquare", disabled = false }) => {
    const themeCSS = theme === "opensquare" ? OpenSquare : SubSquare;
    const ref = React.useRef(null);
    const { commandController } = useTextAreaMarkdownEditor(ref, {
        commandMap: {
            bold: boldCommand,
            delete: strikethroughCommand,
            code: codeCommand,
            image: imageCommand,
            link: linkCommand,
            ol: orderedListCommand,
            ul: unorderedListCommand,
            underline: underlineCommand,
            newLineAndIndentContinueMarkdownList: newLineAndIndentContinueMarkdownListCommand,
            newLine: newLineCommand
        }
    });
    const [caret, setCaret] = React.useState({ left: 0, top: 0, lineHeight: 20 });
    const [focusIndex, setFocusIndex] = React.useState(0);
    const [editStatus, setEditStatus] = React__namespace.useState("write");
    const [suggestions, setSuggestions] = React__namespace.useState([]);
    const [mentionState, setMentionState] = React.useState({
        status: "inactive",
        suggestions: []
    });
    const isPreview = React__namespace.useMemo(() => {
        return editStatus === "preview";
    }, [editStatus]);
    let observer;
    const [height, setHeight] = React.useState(100);
    const [userResized, setUserResized] = React.useState(false);
    const focusToCursor = () => {
        const textarea = ref === null || ref === void 0 ? void 0 : ref.current;
        if (textarea) {
            textarea.blur();
            textarea.focus();
        }
    };
    const adjustHeight = () => {
        const textarea = ref === null || ref === void 0 ? void 0 : ref.current;
        if (textarea && !userResized) {
            textarea.style.height = `${minHeight}px`;
            textarea.style.height = `${textarea.scrollHeight}px`;
            setHeight(textarea.scrollHeight);
        }
    };
    React.useEffect(() => {
        //expand height if got default value before inputting
        adjustHeight();
    }, []);
    React.useEffect(() => {
        var _a;
        const textarea = ref === null || ref === void 0 ? void 0 : ref.current;
        if (typeof window === "undefined") {
            return;
        }
        // @ts-ignore
        if (window.editorObserver) {
            // @ts-ignore
            (_a = window.editorObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        }
        if (textarea) {
            // MutationObserver is the modern way to observe element resize event
            observer = new MutationObserver(record => {
                var _a;
                //no value changed && height change => user resized manually
                // @ts-ignore
                if (record[0].target.value === value) {
                    setUserResized(true);
                    setHeight(parseInt((_a = textarea === null || textarea === void 0 ? void 0 : textarea.style) === null || _a === void 0 ? void 0 : _a.height));
                }
            });
            // @ts-ignore
            window.editorObserver = observer;
            observer.observe(textarea, {
                attributes: true,
                attributeFilter: ["style"]
            });
        }
    }, [height, value, setHeight]);
    const { handleSuggestionSelected, handleKeyDown, handleKeyPress, handleKeyUp } = getHandlers({
        ref,
        suggestions,
        loadSuggestions,
        setFocusIndex,
        focusIndex,
        setCaret,
        setSuggestions,
        mentionState,
        setMentionState,
        value
    });
    const isEditingText = React__namespace.useMemo(() => {
        let v = mentionState.status !== "active";
        if (!suggestions.length) {
            v = true;
        }
        return v;
    }, [mentionState.status, suggestions]);
    const onEnterNewLine = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (isEditingText) {
                commandController.executeCommand("newLineAndIndentContinueMarkdownList");
            }
        }
    };
    return (React__namespace.createElement(EditorWrapper, { theme: themeCSS, disabled: disabled },
        React__namespace.createElement(EditorHeader, Object.assign({}, {
            theme: themeCSS,
            editStatus,
            setEditStatus,
            isPreview,
            commandController
        })),
        React__namespace.createElement(Textarea, { ref: ref, value: value, onChange: event => {
                onChange(event.target.value);
                adjustHeight();
                focusToCursor();
            }, onKeyUp: event => {
                handleKeyUp(event);
            }, onKeyDown: event => {
                handleKeyDown(event);
                onEnterNewLine(event);
            }, onKeyPress: handleKeyPress, placeholder: "", minHeight: minHeight, height: height, hide: isPreview, theme: themeCSS }),
        isPreview && (React__namespace.createElement(MarkdownPreview, { content: value, minHeight: minHeight, theme: themeCSS })),
        mentionState.status === "active" && suggestions.length > 0 && (React__namespace.createElement(SuggestionsDropdown, { caret: caret, suggestions: suggestions, focusIndex: focusIndex < suggestions.length ? focusIndex : 0, textAreaRef: ref, onSuggestionSelected: handleSuggestionSelected, suggestionsAutoplace: true }))));
};

exports.Editor = Editor;
exports.UniverseEditor = UniverseEditor;
exports.WYSIWYG = WYSIWYG;
exports["default"] = Editor;
//# sourceMappingURL=index.js.map
