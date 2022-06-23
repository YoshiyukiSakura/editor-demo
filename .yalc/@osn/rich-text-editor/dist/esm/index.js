import * as React from 'react';
import React__default, { useMemo, useRef, useState, useEffect } from 'react';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import Prism from 'prismjs';
import styled, { css } from 'styled-components';

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

/**
 * A list of helpers for manipulating markdown text.
 * These helpers do not interface with a textarea. For that, see
 */
function getSurroundingWord(text, position) {
    if (!text)
        throw Error("Argument 'text' should be truthy");
    var isWordDelimiter = function (c) { return c === " " || c.charCodeAt(0) === 10; };
    // leftIndex is initialized to 0 because if selection is 0, it won't even enter the iteration
    var start = 0;
    // rightIndex is initialized to text.length because if selection is equal to text.length it won't even enter the interation
    var end = text.length;
    // iterate to the left
    for (var i = position; i - 1 > -1; i--) {
        if (isWordDelimiter(text[i - 1])) {
            start = i;
            break;
        }
    }
    // iterate to the right
    for (var i = position; i < text.length; i++) {
        if (isWordDelimiter(text[i])) {
            end = i;
            break;
        }
    }
    return { start: start, end: end };
}
/**
 * If the cursor is inside a word and (selection.start === selection.end)
 * returns a new Selection where the whole word is selected
 * @param text
 * @param selection
 */
function selectWord(_a) {
    var text = _a.text, selection = _a.selection;
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
function getBreaksNeededForEmptyLineBefore(text, startPosition) {
    if (text === void 0) { text = ""; }
    if (startPosition === 0)
        return 0;
    // rules:
    // - If we're in the first line, no breaks are needed
    // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
    //      may need to insert 0, 1 or 2 breaks
    var neededBreaks = 2;
    var isInFirstLine = true;
    for (var i = startPosition - 1; i >= 0 && neededBreaks >= 0; i--) {
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
function getBreaksNeededForEmptyLineAfter(text, startPosition) {
    if (text === void 0) { text = ""; }
    if (startPosition === text.length - 1)
        return 0;
    // rules:
    // - If we're in the first line, no breaks are needed
    // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
    //      may need to insert 0, 1 or 2 breaks
    var neededBreaks = 2;
    var isInLastLine = true;
    for (var i = startPosition; i < text.length && neededBreaks >= 0; i++) {
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
    var lines = selectedText.split(/\n/);
    var insertionLength = 0;
    var modifiedText = lines
        .map(function (item, index) {
        if (typeof insertBefore === "string") {
            insertionLength += insertBefore.length;
            return insertBefore + item;
        }
        else if (typeof insertBefore === "function") {
            var insertionResult = insertBefore(item, index);
            insertionLength += insertionResult.length;
            return insertBefore(item, index) + item;
        }
        throw Error("insertion is expected to be either a string or a function");
    })
        .join("\n");
    return { modifiedText: modifiedText, insertionLength: insertionLength };
}

var boldCommand = {
    shouldUndo: function (options) {
        return (getCharactersBeforeSelection(options.initialState, 2) === "**" &&
            getCharactersAfterSelection(options.initialState, 2) === "**");
    },
    execute: function (_a) {
        var initialState = _a.initialState, textApi = _a.textApi;
        // Adjust the selection to encompass the whole word if the caret is inside one
        var newSelectionRange = selectWord({
            text: initialState.text,
            selection: initialState.selection
        });
        var state1 = textApi.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the bold mark up
        var state2 = textApi.replaceSelection("**" + getSelectedText(state1) + "**");
        // Adjust the selection to not contain the **
        textApi.setSelectionRange({
            start: state2.selection.end - 2 - getSelectedText(state1).length,
            end: state2.selection.end - 2
        });
    },
    undo: function (_a) {
        var initialState = _a.initialState, textApi = _a.textApi;
        var text = getSelectedText(initialState);
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

var strikethroughCommand = {
    execute: function (_a) {
        var initialState = _a.initialState, textApi = _a.textApi;
        // Adjust the selection to encompass the whole word if the caret is inside one
        var newSelectionRange = selectWord({
            text: initialState.text,
            selection: initialState.selection
        });
        var state1 = textApi.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the strikethrough mark up
        var state2 = textApi.replaceSelection("~~" + getSelectedText(state1) + "~~");
        // Adjust the selection to not contain the ~~
        textApi.setSelectionRange({
            start: state2.selection.end - 2 - getSelectedText(state1).length,
            end: state2.selection.end - 2
        });
    }
};

var linkCommand = {
    execute: function (_a) {
        var initialState = _a.initialState, textApi = _a.textApi;
        // Adjust the selection to encompass the whole word if the caret is inside one
        var newSelectionRange = selectWord({
            text: initialState.text,
            selection: initialState.selection
        });
        var state1 = textApi.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the bold mark up
        var state2 = textApi.replaceSelection("[" + getSelectedText(state1) + "](url)");
        // Adjust the selection to not contain the **
        textApi.setSelectionRange({
            start: state2.selection.end - 6 - getSelectedText(state1).length,
            end: state2.selection.end - 6
        });
    }
};

var imageCommand = {
    execute: function (_a) {
        var initialState = _a.initialState, textApi = _a.textApi;
        // Replaces the current selection with the whole word selected
        var state1 = textApi.setSelectionRange(selectWord({
            text: initialState.text,
            selection: initialState.selection
        }));
        // Replaces the current selection with the image
        var imageTemplate = getSelectedText(state1) || "https://example.com/your-image.png";
        textApi.replaceSelection("![](" + imageTemplate + ")");
        // Adjust the selection to not contain the **
        textApi.setSelectionRange({
            start: state1.selection.start + 4,
            end: state1.selection.start + 4 + imageTemplate.length
        });
    }
};

var codeCommand = {
    shouldUndo: function (options) {
        return (getCharactersBeforeSelection(options.initialState, 1) === "`" &&
            getCharactersAfterSelection(options.initialState, 1) === "`");
    },
    execute: function (_a) {
        var initialState = _a.initialState, textApi = _a.textApi;
        // Adjust the selection to encompass the whole word if the caret is inside one
        var newSelectionRange = selectWord({
            text: initialState.text,
            selection: initialState.selection
        });
        var state1 = textApi.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the italic mark up
        var state2 = textApi.replaceSelection("`" + getSelectedText(state1) + "`");
        // Adjust the selection to not contain the *
        textApi.setSelectionRange({
            start: state2.selection.end - 1 - getSelectedText(state1).length,
            end: state2.selection.end - 1
        });
    },
    undo: function (_a) {
        var initialState = _a.initialState, textApi = _a.textApi;
        var text = getSelectedText(initialState);
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

var CommandController = /** @class */ (function () {
    function CommandController(textController, commandMap) {
        /**
         * Indicates whether there is a command currently executing
         */
        this.isExecuting = false;
        this.textController = textController;
        this.commandMap = commandMap;
    }
    CommandController.prototype.executeCommand = function (commandName, context) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var command, executeOptions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isExecuting) {
                            // The simplest thing to do is to ignore commands while
                            // there is already a command execu
                            // ting. The alternative would be to queue commands
                            // but there is no guarantee that the state after one command executes will still be compatible
                            // with the next one. In fact, it is likely not to be.
                            return [2 /*return*/];
                        }
                        command = this.commandMap[commandName];
                        if (!command) {
                            throw new Error("Cannot execute command. Command not found: " + commandName);
                        }
                        executeOptions = {
                            initialState: this.textController.getState(),
                            textApi: this.textController
                        };
                        if (!(((_a = command.shouldUndo) === null || _a === void 0 ? void 0 : _a.call(command, executeOptions)) && (command === null || command === void 0 ? void 0 : command.undo))) return [3 /*break*/, 1];
                        command.undo(executeOptions);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, command.execute(executeOptions)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CommandController;
}());

var TextAreaTextController = /** @class */ (function () {
    function TextAreaTextController(textAreaRef) {
        this.textAreaRef = textAreaRef;
    }
    TextAreaTextController.prototype.replaceSelection = function (text) {
        var textArea = this.ensureTextArea().el;
        insertText$1(textArea, text);
        return getStateFromTextArea(textArea);
    };
    TextAreaTextController.prototype.setSelectionRange = function (selection) {
        var textArea = this.ensureTextArea().el;
        textArea.focus();
        textArea.selectionStart = selection.start;
        textArea.selectionEnd = selection.end;
        return getStateFromTextArea(textArea);
    };
    TextAreaTextController.prototype.getState = function () {
        var textArea = this.ensureTextArea().el;
        return getStateFromTextArea(textArea);
    };
    TextAreaTextController.prototype.ensureTextArea = function () {
        var textArea = this.textAreaRef.current;
        if (!textArea) {
            throw new Error("TextAreaRef is not set");
        }
        return {
            el: textArea,
            ref: this.textAreaRef
        };
    };
    Object.defineProperty(TextAreaTextController.prototype, "textArea", {
        get: function () {
            return this.ensureTextArea().el;
        },
        enumerable: false,
        configurable: true
    });
    return TextAreaTextController;
}());
function getStateFromTextArea(textArea) {
    var re = /\r?\n|\r/;
    var value = textArea.value;
    var lineNumber = value.substr(0, textArea.selectionStart).split(re).length;
    var lineText = value.split(re)[lineNumber - 1];
    return {
        selection: {
            start: textArea.selectionStart,
            end: textArea.selectionEnd
        },
        text: value,
        lineNumber: lineNumber,
        lineText: lineText
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
        var ieRange = document.selection.createRange();
        ieRange.text = text;
        // Move cursor after the inserted text
        ieRange.collapse(false /* to the end */);
        ieRange.select();
        return;
    }
    // Webkit + Edge
    var isSuccess = document.execCommand("insertText", false, text);
    if (!isSuccess) {
        var start = input.selectionStart || 0;
        var end = input.selectionEnd || 0;
        // Firefox (non-standard method)
        if (typeof input.setRangeText === "function") {
            input.setRangeText(text);
        }
        else {
            if (canManipulateViaTextNodes$1(input)) {
                var textNode = document.createTextNode(text);
                var node = input.firstChild;
                // If textarea is empty, just insert the text
                if (!node) {
                    input.appendChild(textNode);
                }
                else {
                    // Otherwise, we need to find a nodes for start and end
                    var offset = 0;
                    var startNode = null;
                    var endNode = null;
                    // To make a change we just need a Range, not a Selection
                    var range = document.createRange();
                    while (node && (startNode === null || endNode === null)) {
                        var nodeLength = ((_a = node.nodeValue) === null || _a === void 0 ? void 0 : _a.length) || 0;
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
                var value = input.value;
                input.value = value.slice(0, start) + text + value.slice(end);
            }
        }
        // Correct the cursor position to be at the end of the insertion
        input.setSelectionRange(start + text.length, start + text.length);
        // Notify any possible listeners of the change
        var e = document.createEvent("UIEvent");
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
    var browserSupportsTextareaTextNodes;
    if (typeof browserSupportsTextareaTextNodes === "undefined") {
        var textarea = document.createElement("textarea");
        textarea.value = "1";
        browserSupportsTextareaTextNodes = !!textarea.firstChild;
    }
    return browserSupportsTextareaTextNodes;
}

function useTextAreaMarkdownEditor(ref, options) {
    var textController = useMemo(function () {
        return new TextAreaTextController(ref);
    }, [ref]);
    var commandController = useMemo(function () { return new CommandController(textController, options.commandMap); }, [ref]);
    return {
        textController: textController,
        commandController: commandController,
    };
}

function makeList(state0, textController, insertBefore) {
    // Adjust the selection to encompass the whole word if the caret is inside one
    var newSelectionRange = selectWord({
        text: state0.text,
        selection: state0.selection
    });
    var state1 = textController.setSelectionRange(newSelectionRange);
    var breaksBeforeCount = getBreaksNeededForEmptyLineBefore(state1.text, state1.selection.start);
    var breaksBefore = Array(breaksBeforeCount + 1).join("\n");
    var breaksAfterCount = getBreaksNeededForEmptyLineAfter(state1.text, state1.selection.end);
    var breaksAfter = Array(breaksAfterCount + 1).join("\n");
    var modifiedText = insertBeforeEachLine(getSelectedText(state1), insertBefore);
    textController.replaceSelection("" + breaksBefore + modifiedText.modifiedText + breaksAfter);
    // Specifically when the text has only one line, we can exclude the "- ", for example, from the selection
    var oneLinerOffset = getSelectedText(state1).indexOf("\n") === -1
        ? modifiedText.insertionLength
        : 0;
    var selectionStart = state1.selection.start + breaksBeforeCount + oneLinerOffset;
    var selectionEnd = selectionStart + modifiedText.modifiedText.length - oneLinerOffset;
    // Adjust the selection to not contain the **
    textController.setSelectionRange({
        start: selectionStart,
        end: selectionEnd
    });
}

var orderedListCommand = {
    execute: function (_a) {
        var initialState = _a.initialState, textApi = _a.textApi;
        makeList(initialState, textApi, function (item, index) { return index + 1 + ". "; });
    }
};

var unorderedListCommand = {
    execute: function (_a) {
        var initialState = _a.initialState, textApi = _a.textApi;
        makeList(initialState, textApi, "- ");
    }
};

var underlineCommand = {
    shouldUndo: function (options) {
        return (getCharactersBeforeSelection(options.initialState, 5) === "<ins>" &&
            getCharactersAfterSelection(options.initialState, 6) === "</ins>");
    },
    execute: function (_a) {
        var initialState = _a.initialState, textApi = _a.textApi;
        // Adjust the selection to encompass the whole word if the caret is inside one
        var newSelectionRange = selectWord({
            text: initialState.text,
            selection: initialState.selection
        });
        var state1 = textApi.setSelectionRange(newSelectionRange);
        // Replaces the current selection with the bold mark up
        var state2 = textApi.replaceSelection("<ins>" + getSelectedText(state1) + "</ins>");
        // Adjust the selection to not contain the **
        textApi.setSelectionRange({
            start: state2.selection.end - 5 - getSelectedText(state1).length,
            end: state2.selection.end - 6
        });
    },
    undo: function (_a) {
        var initialState = _a.initialState, textApi = _a.textApi;
        var text = getSelectedText(initialState);
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

var newLineCommand = {
    execute: function (api) {
        var textApi = api.textApi;
        var textArea = textApi.textArea;
        if (!textArea) {
            return;
        }
        insertText$1(textArea, "\n");
    }
};

// https://github.com/codemirror/codemirror5/blob/master/addon/edit/continuelist.js
var listRE = /^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/;
var emptyListRE = /^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/;
var unorderedListRE = /[*+-]\s/;
var newLineAndIndentContinueMarkdownListCommand = {
    execute: function (api) {
        var newLine = function () { return newLineCommand.execute(api); };
        var state = api.initialState, textApi = api.textApi;
        var textArea = textApi.textArea;
        if (!textArea) {
            return;
        }
        var line = state.lineText;
        var inList = listRE.exec(line);
        if (!inList) {
            newLine();
            return;
        }
        var match = listRE.exec(line);
        if (!match) {
            return;
        }
        if (emptyListRE.test(line)) {
            var focusIndex = state.selection.end;
            var listPrefix = match[0];
            textApi.setSelectionRange({
                start: focusIndex - listPrefix.length - 1,
                end: focusIndex
            });
            insertText$1(textArea, "\n");
        }
        else {
            var indent = match[1];
            var after = match[5];
            var numbered = !(unorderedListRE.test(match[2]) || match[2].indexOf(">") >= 0);
            var bullet = numbered
                ? parseInt(match[3], 10) + 1 + match[4]
                : match[2].replace("x", " ");
            insertText$1(textArea, "\n" + indent + bullet + after);
        }
    }
};

var MarkdownPreviewWrapper = styled.div(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n  box-sizing: border-box;\n  flex-basis: 100%;\n  min-height: 144px;\n  background-color: #fbfcfe;\n  padding: 12px;\n\n  .markdown-body {\n    background-color: inherit !important;\n  }\n\n  ", ";\n"], ["\n  box-sizing: border-box;\n  flex-basis: 100%;\n  min-height: 144px;\n  background-color: #fbfcfe;\n  padding: 12px;\n\n  .markdown-body {\n    background-color: inherit !important;\n  }\n\n  ",
    ";\n"])), function (props) {
    return props.minHeight && css(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n            min-height: ", "px;\n          "], ["\n            min-height: ", "px;\n          "])), props.minHeight);
});
var MarkdownBody = styled.div(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n  font-size: 14px;\n  font-weight: normal;\n  color: #1e2134;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background-color: transparent;\n\n  {\n    -ms-text-size-adjust: 100%;\n    -webkit-text-size-adjust: 100%;\n    margin: 0;\n    color: #24292f;\n    background-color: #ffffff;\n    font-family: Inter,serif;\n    word-wrap: break-word;\n  }\n\n  .octicon {\n    display: inline-block;\n    fill: currentColor;\n    vertical-align: text-bottom;\n  }\n\n  h1:hover .anchor .octicon-link:before,\n  h2:hover .anchor .octicon-link:before,\n  h3:hover .anchor .octicon-link:before,\n  h4:hover .anchor .octicon-link:before,\n  h5:hover .anchor .octicon-link:before,\n  h6:hover .anchor .octicon-link:before {\n    width: 16px;\n    height: 16px;\n    content: ' ';\n    display: inline-block;\n    background-color: currentColor;\n    -webkit-mask-image: url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>\");\n    mask-image: url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>\");\n  }\n\n  details,\n  figcaption,\n  figure {\n    display: block;\n  }\n\n  summary {\n    display: list-item;\n  }\n\n  [hidden] {\n    display: none !important;\n  }\n\n  a {\n    background-color: transparent;\n    color: #0969da;\n    text-decoration: none;\n  }\n\n  a:active,\n  a:hover {\n    outline-width: 0;\n  }\n\n  abbr[title] {\n    border-bottom: none;\n    text-decoration: underline dotted;\n  }\n\n  b,\n  strong {\n    font-weight: 600;\n  }\n\n  dfn {\n    font-style: italic;\n  }\n\n  h1 {\n    margin: .67em 0;\n    font-weight: 600;\n    padding-bottom: .3em;\n    font-size: 2em;\n    border-bottom: 1px solid hsla(210,18%,87%,1);\n  }\n\n  mark {\n    background-color: #fff8c5;\n    color: #24292f;\n  }\n\n  small {\n    font-size: 90%;\n  }\n\n  sub,\n  sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n\n  sub {\n    bottom: -0.25em;\n  }\n\n  sup {\n    top: -0.5em;\n  }\n\n  img {\n    border-style: none;\n    max-width: 100%;\n    box-sizing: content-box;\n    background-color: #ffffff;\n  }\n\n  code,\n  kbd,\n  pre,\n  samp {\n    font-family: monospace,monospace;\n    font-size: 1em;\n  }\n\n  figure {\n    margin: 1em 40px;\n  }\n\n  hr {\n    box-sizing: content-box;\n    overflow: hidden;\n    background: transparent;\n    border-bottom: 1px solid hsla(210,18%,87%,1);\n    height: .25em;\n    padding: 0;\n    margin: 24px 0;\n    background-color: #d0d7de;\n    border: 0;\n  }\n\n  input {\n    font: inherit;\n    margin: 0;\n    overflow: visible;\n    font-family: inherit;\n    font-size: inherit;\n    line-height: inherit;\n  }\n\n  [type=button],\n  [type=reset],\n  [type=submit] {\n    -webkit-appearance: button;\n  }\n\n  [type=button]::-moz-focus-inner,\n  [type=reset]::-moz-focus-inner,\n  [type=submit]::-moz-focus-inner {\n    border-style: none;\n    padding: 0;\n  }\n\n  [type=button]:-moz-focusring,\n  [type=reset]:-moz-focusring,\n  [type=submit]:-moz-focusring {\n    outline: 1px dotted ButtonText;\n  }\n\n  [type=checkbox],\n  [type=radio] {\n    box-sizing: border-box;\n    padding: 0;\n  }\n\n  [type=number]::-webkit-inner-spin-button,\n  [type=number]::-webkit-outer-spin-button {\n    height: auto;\n  }\n\n  [type=search] {\n    -webkit-appearance: textfield;\n    outline-offset: -2px;\n  }\n\n  [type=search]::-webkit-search-cancel-button,\n  [type=search]::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  ::-webkit-input-placeholder {\n    color: inherit;\n    opacity: .54;\n  }\n\n  ::-webkit-file-upload-button {\n    -webkit-appearance: button;\n    font: inherit;\n  }\n\n  a:hover {\n    text-decoration: underline;\n  }\n\n  hr::before {\n    display: table;\n    content: \"\";\n  }\n\n  hr::after {\n    display: table;\n    clear: both;\n    content: \"\";\n  }\n\n  table {\n    border-spacing: 0;\n    border-collapse: collapse;\n    display: block;\n    width: max-content;\n    max-width: 100%;\n    overflow: auto;\n  }\n\n  td,\n  th {\n    padding: 0;\n  }\n\n  details summary {\n    cursor: pointer;\n  }\n\n  details:not([open])>*:not(summary) {\n    display: none !important;\n  }\n\n  kbd {\n    display: inline-block;\n    padding: 3px 5px;\n    font: 11px ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;\n    line-height: 10px;\n    color: #24292f;\n    vertical-align: middle;\n    background-color: #f6f8fa;\n    border: solid 1px rgba(175,184,193,0.2);\n    border-bottom-color: rgba(175,184,193,0.2);\n    border-radius: 6px;\n    box-shadow: inset 0 -1px 0 rgba(175,184,193,0.2);\n  }\n\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    margin-top: 24px;\n    margin-bottom: 16px;\n    font-weight: 600;\n    line-height: 1.25;\n  }\n\n  h2 {\n    font-weight: 600;\n    padding-bottom: .3em;\n    font-size: 1.5em;\n    border-bottom: 1px solid hsla(210,18%,87%,1);\n  }\n\n  h3 {\n    font-weight: 600;\n    font-size: 1.25em;\n  }\n\n  h4 {\n    font-weight: 600;\n    font-size: 1em;\n  }\n\n  h5 {\n    font-weight: 600;\n    font-size: .875em;\n  }\n\n  h6 {\n    font-weight: 600;\n    font-size: .85em;\n    color: #57606a;\n  }\n\n  p {\n    margin-top: 0;\n    margin-bottom: 10px;\n  }\n\n  blockquote {\n    margin: 0;\n    padding: 0 1em;\n    color: #57606a;\n    border-left: .25em solid #d0d7de;\n  }\n\n  ul,\n  ol {\n    margin-top: 0;\n    margin-bottom: 0;\n    padding-left: 2em;\n  }\n\n  ol ol,\n  ul ol {\n    list-style-type: lower-roman;\n  }\n\n  ul ul ol,\n  ul ol ol,\n  ol ul ol,\n  ol ol ol {\n    list-style-type: lower-alpha;\n  }\n\n  dd {\n    margin-left: 0;\n  }\n\n  tt,\n  code {\n    font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;\n    font-size: 12px;\n  }\n\n  pre {\n    margin-top: 0;\n    margin-bottom: 0;\n    font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;\n    font-size: 12px;\n    word-wrap: normal;\n  }\n\n  .octicon {\n    display: inline-block;\n    overflow: visible !important;\n    vertical-align: text-bottom;\n    fill: currentColor;\n  }\n\n  ::placeholder {\n    color: #6e7781;\n    opacity: 1;\n  }\n\n  input::-webkit-outer-spin-button,\n  input::-webkit-inner-spin-button {\n    margin: 0;\n    -webkit-appearance: none;\n    appearance: none;\n  }\n\n  .pl-c {\n    color: #6e7781;\n  }\n\n  .pl-c1,\n  .pl-s .pl-v {\n    color: #0550ae;\n  }\n\n  .pl-e,\n  .pl-en {\n    color: #8250df;\n  }\n\n  .pl-smi,\n  .pl-s .pl-s1 {\n    color: #24292f;\n  }\n\n  .pl-ent {\n    color: #116329;\n  }\n\n  .pl-k {\n    color: #cf222e;\n  }\n\n  .pl-s,\n  .pl-pds,\n  .pl-s .pl-pse .pl-s1,\n  .pl-sr,\n  .pl-sr .pl-cce,\n  .pl-sr .pl-sre,\n  .pl-sr .pl-sra {\n    color: #0a3069;\n  }\n\n  .pl-v,\n  .pl-smw {\n    color: #953800;\n  }\n\n  .pl-bu {\n    color: #82071e;\n  }\n\n  .pl-ii {\n    color: #f6f8fa;\n    background-color: #82071e;\n  }\n\n  .pl-c2 {\n    color: #f6f8fa;\n    background-color: #cf222e;\n  }\n\n  .pl-sr .pl-cce {\n    font-weight: bold;\n    color: #116329;\n  }\n\n  .pl-ml {\n    color: #3b2300;\n  }\n\n  .pl-mh,\n  .pl-mh .pl-en,\n  .pl-ms {\n    font-weight: bold;\n    color: #0550ae;\n  }\n\n  .pl-mi {\n    font-style: italic;\n    color: #24292f;\n  }\n\n  .pl-mb {\n    font-weight: bold;\n    color: #24292f;\n  }\n\n  .pl-md {\n    color: #82071e;\n    background-color: #FFEBE9;\n  }\n\n  .pl-mi1 {\n    color: #116329;\n    background-color: #dafbe1;\n  }\n\n  .pl-mc {\n    color: #953800;\n    background-color: #ffd8b5;\n  }\n\n  .pl-mi2 {\n    color: #eaeef2;\n    background-color: #0550ae;\n  }\n\n  .pl-mdr {\n    font-weight: bold;\n    color: #8250df;\n  }\n\n  .pl-ba {\n    color: #57606a;\n  }\n\n  .pl-sg {\n    color: #8c959f;\n  }\n\n  .pl-corl {\n    text-decoration: underline;\n    color: #0a3069;\n  }\n\n  [data-catalyst] {\n    display: block;\n  }\n\n  .markdown-body::before {\n    display: table;\n    content: \"\";\n  }\n\n  .markdown-body::after {\n    display: table;\n    clear: both;\n    content: \"\";\n  }\n\n  .markdown-body>*:first-child {\n    margin-top: 0 !important;\n  }\n\n  .markdown-body>*:last-child {\n    margin-bottom: 0 !important;\n  }\n\n  a:not([href]) {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  .absent {\n    color: #cf222e;\n  }\n\n  .anchor {\n    float: left;\n    padding-right: 4px;\n    margin-left: -20px;\n    line-height: 1;\n  }\n\n  .anchor:focus {\n    outline: none;\n  }\n\n  p,\n  blockquote,\n  ul,\n  ol,\n  dl,\n  table,\n  pre,\n  details {\n    margin-top: 0;\n    margin-bottom: 16px;\n  }\n\n  blockquote>:first-child {\n    margin-top: 0;\n  }\n\n  blockquote>:last-child {\n    margin-bottom: 0;\n  }\n\n  sup>a::before {\n    content: \"[\";\n  }\n\n  sup>a::after {\n    content: \"]\";\n  }\n\n  h1 .octicon-link,\n  h2 .octicon-link,\n  h3 .octicon-link,\n  h4 .octicon-link,\n  h5 .octicon-link,\n  h6 .octicon-link {\n    color: #24292f;\n    vertical-align: middle;\n    visibility: hidden;\n  }\n\n  h1:hover .anchor,\n  h2:hover .anchor,\n  h3:hover .anchor,\n  h4:hover .anchor,\n  h5:hover .anchor,\n  h6:hover .anchor {\n    text-decoration: none;\n  }\n\n  h1:hover .anchor .octicon-link,\n  h2:hover .anchor .octicon-link,\n  h3:hover .anchor .octicon-link,\n  h4:hover .anchor .octicon-link,\n  h5:hover .anchor .octicon-link,\n  h6:hover .anchor .octicon-link {\n    visibility: visible;\n  }\n\n  h1 tt,\n  h1 code,\n  h2 tt,\n  h2 code,\n  h3 tt,\n  h3 code,\n  h4 tt,\n  h4 code,\n  h5 tt,\n  h5 code,\n  h6 tt,\n  h6 code {\n    padding: 0 .2em;\n    font-size: inherit;\n  }\n\n  ul.no-list,\n  ol.no-list {\n    padding: 0;\n    list-style-type: none;\n  }\n\n  ol[type=\"1\"] {\n    list-style-type: decimal;\n  }\n\n  ol[type=a] {\n    list-style-type: lower-alpha;\n  }\n\n  ol[type=i] {\n    list-style-type: lower-roman;\n  }\n\n  div>ol:not([type]) {\n    list-style-type: decimal;\n  }\n\n  ul ul,\n  ul ol,\n  ol ol,\n  ol ul {\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n\n  li>p {\n    margin-top: 16px;\n  }\n\n  li+li {\n    margin-top: .25em;\n  }\n\n  dl {\n    padding: 0;\n  }\n\n  dl dt {\n    padding: 0;\n    margin-top: 16px;\n    font-size: 1em;\n    font-style: italic;\n    font-weight: 600;\n  }\n\n  dl dd {\n    padding: 0 16px;\n    margin-bottom: 16px;\n  }\n\n  table th {\n    font-weight: 600;\n  }\n\n  table th,\n  table td {\n    padding: 6px 13px;\n    border: 1px solid #d0d7de;\n  }\n\n  table tr {\n    background-color: #ffffff;\n    border-top: 1px solid hsla(210,18%,87%,1);\n  }\n\n  table tr:nth-child(2n) {\n    background-color: #f6f8fa;\n  }\n\n  table img {\n    background-color: transparent;\n  }\n\n  img[align=right] {\n    padding-left: 20px;\n  }\n\n  img[align=left] {\n    padding-right: 20px;\n  }\n\n  .emoji {\n    max-width: none;\n    vertical-align: text-top;\n    background-color: transparent;\n  }\n\n  span.frame {\n    display: block;\n    overflow: hidden;\n  }\n\n  span.frame>span {\n    display: block;\n    float: left;\n    width: auto;\n    padding: 7px;\n    margin: 13px 0 0;\n    overflow: hidden;\n    border: 1px solid #d0d7de;\n  }\n\n  span.frame span img {\n    display: block;\n    float: left;\n  }\n\n  span.frame span span {\n    display: block;\n    padding: 5px 0 0;\n    clear: both;\n    color: #24292f;\n  }\n\n  span.align-center {\n    display: block;\n    overflow: hidden;\n    clear: both;\n  }\n\n  span.align-center>span {\n    display: block;\n    margin: 13px auto 0;\n    overflow: hidden;\n    text-align: center;\n  }\n\n  span.align-center span img {\n    margin: 0 auto;\n    text-align: center;\n  }\n\n  span.align-right {\n    display: block;\n    overflow: hidden;\n    clear: both;\n  }\n\n  span.align-right>span {\n    display: block;\n    margin: 13px 0 0;\n    overflow: hidden;\n    text-align: right;\n  }\n\n  span.align-right span img {\n    margin: 0;\n    text-align: right;\n  }\n\n  span.float-left {\n    display: block;\n    float: left;\n    margin-right: 13px;\n    overflow: hidden;\n  }\n\n  span.float-left span {\n    margin: 13px 0 0;\n  }\n\n  span.float-right {\n    display: block;\n    float: right;\n    margin-left: 13px;\n    overflow: hidden;\n  }\n\n  span.float-right>span {\n    display: block;\n    margin: 13px auto 0;\n    overflow: hidden;\n    text-align: right;\n  }\n\n  code,\n  tt {\n    padding: .2em .4em;\n    margin: 0;\n    font-size: 85%;\n    background-color: rgba(175,184,193,0.2);\n    border-radius: 6px;\n  }\n\n  code br,\n  tt br {\n    display: none;\n  }\n\n  del code {\n    text-decoration: inherit;\n  }\n\n  pre code {\n    font-size: 100%;\n  }\n\n  pre>code {\n    padding: 0;\n    margin: 0;\n    word-break: normal;\n    white-space: pre;\n    background: transparent;\n    border: 0;\n  }\n\n  .highlight {\n    margin-bottom: 16px;\n  }\n\n  .highlight pre {\n    margin-bottom: 0;\n    word-break: normal;\n  }\n\n  .highlight pre,\n  pre {\n    padding: 16px;\n    overflow: auto;\n    font-size: 85%;\n    line-height: 1.45;\n    background-color: #f6f8fa;\n    border-radius: 6px;\n  }\n\n  pre code,\n  pre tt {\n    display: inline;\n    max-width: auto;\n    padding: 0;\n    margin: 0;\n    overflow: visible;\n    line-height: inherit;\n    word-wrap: normal;\n    background-color: transparent;\n    border: 0;\n  }\n\n  .csv-data td,\n  .csv-data th {\n    padding: 5px;\n    overflow: hidden;\n    font-size: 12px;\n    line-height: 1;\n    text-align: left;\n    white-space: nowrap;\n  }\n\n  .csv-data .blob-num {\n    padding: 10px 8px 9px;\n    text-align: right;\n    background: #ffffff;\n    border: 0;\n  }\n\n  .csv-data tr {\n    border-top: 0;\n  }\n\n  .csv-data th {\n    font-weight: 600;\n    background: #f6f8fa;\n    border-top: 0;\n  }\n\n  .footnotes {\n    font-size: 12px;\n    color: #57606a;\n    border-top: 1px solid #d0d7de;\n  }\n\n  .footnotes ol {\n    padding-left: 16px;\n  }\n\n  .footnotes li {\n    position: relative;\n  }\n\n  .footnotes li:target::before {\n    position: absolute;\n    top: -8px;\n    right: -8px;\n    bottom: -8px;\n    left: -24px;\n    pointer-events: none;\n    content: \"\";\n    border: 2px solid #0969da;\n    border-radius: 6px;\n  }\n\n  .footnotes li:target {\n    color: #24292f;\n  }\n\n  .footnotes .data-footnote-backref g-emoji {\n    font-family: monospace;\n  }\n\n  .task-list-item {\n    list-style-type: none;\n  }\n\n  .task-list-item label {\n    font-weight: 400;\n  }\n\n  .task-list-item.enabled label {\n    cursor: pointer;\n  }\n\n  .task-list-item+.task-list-item {\n    margin-top: 3px;\n  }\n\n  .task-list-item .handle {\n    display: none;\n  }\n\n  .task-list-item-checkbox {\n    margin: 0 .2em .25em -1.6em;\n    vertical-align: middle;\n  }\n\n  .contains-task-list:dir(rtl) .task-list-item-checkbox {\n    margin: 0 -1.6em .25em .2em;\n  }\n\n  ::-webkit-calendar-picker-indicator {\n    filter: invert(50%);\n  }\n  \n  p {\n    line-height: 24px;\n  }\n\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    color: black;\n    background: none;\n    text-shadow: 0 1px white;\n    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n    font-size: 1em;\n    text-align: left;\n    white-space: pre;\n    word-spacing: normal;\n    word-break: normal;\n    word-wrap: normal;\n    line-height: 1.5;\n\n    -moz-tab-size: 4;\n    -o-tab-size: 4;\n    tab-size: 4;\n\n    -webkit-hyphens: none;\n    -moz-hyphens: none;\n    -ms-hyphens: none;\n    hyphens: none;\n  }\n\n  pre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\n  code[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n    text-shadow: none;\n    background: #b3d4fc;\n  }\n\n  pre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\n  code[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n    text-shadow: none;\n    background: #b3d4fc;\n  }\n\n  @media print {\n    code[class*=\"language-\"],\n    pre[class*=\"language-\"] {\n      text-shadow: none;\n    }\n  }\n\n  /* Code blocks */\n\n  pre[class*=\"language-\"] {\n    padding: 1em;\n    margin: .5em 0;\n    overflow: auto;\n  }\n\n  :not(pre) > code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    background: #f5f2f0;\n  }\n\n  /* Inline code */\n\n  :not(pre) > code[class*=\"language-\"] {\n    padding: .1em;\n    border-radius: .3em;\n    white-space: normal;\n  }\n\n  .token.comment,\n  .token.prolog,\n  .token.doctype,\n  .token.cdata {\n    color: slategray;\n  }\n\n  .token.punctuation {\n    color: #999;\n  }\n\n  .token.namespace {\n    opacity: .7;\n  }\n\n  .token.property,\n  .token.tag,\n  .token.boolean,\n  .token.number,\n  .token.constant,\n  .token.symbol,\n  .token.deleted {\n    color: #905;\n  }\n\n  .token.selector,\n  .token.attr-name,\n  .token.string,\n  .token.char,\n  .token.builtin,\n  .token.inserted {\n    color: #690;\n  }\n\n  .token.operator,\n  .token.entity,\n  .token.url,\n  .language-css .token.string,\n  .style .token.string {\n    color: #9a6e3a;\n    /* This background color was intended by the author of this theme. */\n    background: hsla(0, 0%, 100%, .5);\n  }\n\n  .token.atrule,\n  .token.attr-value,\n  .token.keyword {\n    color: #07a;\n  }\n\n  .token.function,\n  .token.class-name {\n    color: #DD4A68;\n  }\n\n  .token.regex,\n  .token.important,\n  .token.variable {\n    color: #e90;\n  }\n\n  .token.important,\n  .token.bold {\n    font-weight: bold;\n  }\n\n  .token.italic {\n    font-style: italic;\n  }\n\n  .token.entity {\n    cursor: help;\n  }\n"], ["\n  font-size: 14px;\n  font-weight: normal;\n  color: #1e2134;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background-color: transparent;\n\n  {\n    -ms-text-size-adjust: 100%;\n    -webkit-text-size-adjust: 100%;\n    margin: 0;\n    color: #24292f;\n    background-color: #ffffff;\n    font-family: Inter,serif;\n    word-wrap: break-word;\n  }\n\n  .octicon {\n    display: inline-block;\n    fill: currentColor;\n    vertical-align: text-bottom;\n  }\n\n  h1:hover .anchor .octicon-link:before,\n  h2:hover .anchor .octicon-link:before,\n  h3:hover .anchor .octicon-link:before,\n  h4:hover .anchor .octicon-link:before,\n  h5:hover .anchor .octicon-link:before,\n  h6:hover .anchor .octicon-link:before {\n    width: 16px;\n    height: 16px;\n    content: ' ';\n    display: inline-block;\n    background-color: currentColor;\n    -webkit-mask-image: url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>\");\n    mask-image: url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>\");\n  }\n\n  details,\n  figcaption,\n  figure {\n    display: block;\n  }\n\n  summary {\n    display: list-item;\n  }\n\n  [hidden] {\n    display: none !important;\n  }\n\n  a {\n    background-color: transparent;\n    color: #0969da;\n    text-decoration: none;\n  }\n\n  a:active,\n  a:hover {\n    outline-width: 0;\n  }\n\n  abbr[title] {\n    border-bottom: none;\n    text-decoration: underline dotted;\n  }\n\n  b,\n  strong {\n    font-weight: 600;\n  }\n\n  dfn {\n    font-style: italic;\n  }\n\n  h1 {\n    margin: .67em 0;\n    font-weight: 600;\n    padding-bottom: .3em;\n    font-size: 2em;\n    border-bottom: 1px solid hsla(210,18%,87%,1);\n  }\n\n  mark {\n    background-color: #fff8c5;\n    color: #24292f;\n  }\n\n  small {\n    font-size: 90%;\n  }\n\n  sub,\n  sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n\n  sub {\n    bottom: -0.25em;\n  }\n\n  sup {\n    top: -0.5em;\n  }\n\n  img {\n    border-style: none;\n    max-width: 100%;\n    box-sizing: content-box;\n    background-color: #ffffff;\n  }\n\n  code,\n  kbd,\n  pre,\n  samp {\n    font-family: monospace,monospace;\n    font-size: 1em;\n  }\n\n  figure {\n    margin: 1em 40px;\n  }\n\n  hr {\n    box-sizing: content-box;\n    overflow: hidden;\n    background: transparent;\n    border-bottom: 1px solid hsla(210,18%,87%,1);\n    height: .25em;\n    padding: 0;\n    margin: 24px 0;\n    background-color: #d0d7de;\n    border: 0;\n  }\n\n  input {\n    font: inherit;\n    margin: 0;\n    overflow: visible;\n    font-family: inherit;\n    font-size: inherit;\n    line-height: inherit;\n  }\n\n  [type=button],\n  [type=reset],\n  [type=submit] {\n    -webkit-appearance: button;\n  }\n\n  [type=button]::-moz-focus-inner,\n  [type=reset]::-moz-focus-inner,\n  [type=submit]::-moz-focus-inner {\n    border-style: none;\n    padding: 0;\n  }\n\n  [type=button]:-moz-focusring,\n  [type=reset]:-moz-focusring,\n  [type=submit]:-moz-focusring {\n    outline: 1px dotted ButtonText;\n  }\n\n  [type=checkbox],\n  [type=radio] {\n    box-sizing: border-box;\n    padding: 0;\n  }\n\n  [type=number]::-webkit-inner-spin-button,\n  [type=number]::-webkit-outer-spin-button {\n    height: auto;\n  }\n\n  [type=search] {\n    -webkit-appearance: textfield;\n    outline-offset: -2px;\n  }\n\n  [type=search]::-webkit-search-cancel-button,\n  [type=search]::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  ::-webkit-input-placeholder {\n    color: inherit;\n    opacity: .54;\n  }\n\n  ::-webkit-file-upload-button {\n    -webkit-appearance: button;\n    font: inherit;\n  }\n\n  a:hover {\n    text-decoration: underline;\n  }\n\n  hr::before {\n    display: table;\n    content: \"\";\n  }\n\n  hr::after {\n    display: table;\n    clear: both;\n    content: \"\";\n  }\n\n  table {\n    border-spacing: 0;\n    border-collapse: collapse;\n    display: block;\n    width: max-content;\n    max-width: 100%;\n    overflow: auto;\n  }\n\n  td,\n  th {\n    padding: 0;\n  }\n\n  details summary {\n    cursor: pointer;\n  }\n\n  details:not([open])>*:not(summary) {\n    display: none !important;\n  }\n\n  kbd {\n    display: inline-block;\n    padding: 3px 5px;\n    font: 11px ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;\n    line-height: 10px;\n    color: #24292f;\n    vertical-align: middle;\n    background-color: #f6f8fa;\n    border: solid 1px rgba(175,184,193,0.2);\n    border-bottom-color: rgba(175,184,193,0.2);\n    border-radius: 6px;\n    box-shadow: inset 0 -1px 0 rgba(175,184,193,0.2);\n  }\n\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    margin-top: 24px;\n    margin-bottom: 16px;\n    font-weight: 600;\n    line-height: 1.25;\n  }\n\n  h2 {\n    font-weight: 600;\n    padding-bottom: .3em;\n    font-size: 1.5em;\n    border-bottom: 1px solid hsla(210,18%,87%,1);\n  }\n\n  h3 {\n    font-weight: 600;\n    font-size: 1.25em;\n  }\n\n  h4 {\n    font-weight: 600;\n    font-size: 1em;\n  }\n\n  h5 {\n    font-weight: 600;\n    font-size: .875em;\n  }\n\n  h6 {\n    font-weight: 600;\n    font-size: .85em;\n    color: #57606a;\n  }\n\n  p {\n    margin-top: 0;\n    margin-bottom: 10px;\n  }\n\n  blockquote {\n    margin: 0;\n    padding: 0 1em;\n    color: #57606a;\n    border-left: .25em solid #d0d7de;\n  }\n\n  ul,\n  ol {\n    margin-top: 0;\n    margin-bottom: 0;\n    padding-left: 2em;\n  }\n\n  ol ol,\n  ul ol {\n    list-style-type: lower-roman;\n  }\n\n  ul ul ol,\n  ul ol ol,\n  ol ul ol,\n  ol ol ol {\n    list-style-type: lower-alpha;\n  }\n\n  dd {\n    margin-left: 0;\n  }\n\n  tt,\n  code {\n    font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;\n    font-size: 12px;\n  }\n\n  pre {\n    margin-top: 0;\n    margin-bottom: 0;\n    font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;\n    font-size: 12px;\n    word-wrap: normal;\n  }\n\n  .octicon {\n    display: inline-block;\n    overflow: visible !important;\n    vertical-align: text-bottom;\n    fill: currentColor;\n  }\n\n  ::placeholder {\n    color: #6e7781;\n    opacity: 1;\n  }\n\n  input::-webkit-outer-spin-button,\n  input::-webkit-inner-spin-button {\n    margin: 0;\n    -webkit-appearance: none;\n    appearance: none;\n  }\n\n  .pl-c {\n    color: #6e7781;\n  }\n\n  .pl-c1,\n  .pl-s .pl-v {\n    color: #0550ae;\n  }\n\n  .pl-e,\n  .pl-en {\n    color: #8250df;\n  }\n\n  .pl-smi,\n  .pl-s .pl-s1 {\n    color: #24292f;\n  }\n\n  .pl-ent {\n    color: #116329;\n  }\n\n  .pl-k {\n    color: #cf222e;\n  }\n\n  .pl-s,\n  .pl-pds,\n  .pl-s .pl-pse .pl-s1,\n  .pl-sr,\n  .pl-sr .pl-cce,\n  .pl-sr .pl-sre,\n  .pl-sr .pl-sra {\n    color: #0a3069;\n  }\n\n  .pl-v,\n  .pl-smw {\n    color: #953800;\n  }\n\n  .pl-bu {\n    color: #82071e;\n  }\n\n  .pl-ii {\n    color: #f6f8fa;\n    background-color: #82071e;\n  }\n\n  .pl-c2 {\n    color: #f6f8fa;\n    background-color: #cf222e;\n  }\n\n  .pl-sr .pl-cce {\n    font-weight: bold;\n    color: #116329;\n  }\n\n  .pl-ml {\n    color: #3b2300;\n  }\n\n  .pl-mh,\n  .pl-mh .pl-en,\n  .pl-ms {\n    font-weight: bold;\n    color: #0550ae;\n  }\n\n  .pl-mi {\n    font-style: italic;\n    color: #24292f;\n  }\n\n  .pl-mb {\n    font-weight: bold;\n    color: #24292f;\n  }\n\n  .pl-md {\n    color: #82071e;\n    background-color: #FFEBE9;\n  }\n\n  .pl-mi1 {\n    color: #116329;\n    background-color: #dafbe1;\n  }\n\n  .pl-mc {\n    color: #953800;\n    background-color: #ffd8b5;\n  }\n\n  .pl-mi2 {\n    color: #eaeef2;\n    background-color: #0550ae;\n  }\n\n  .pl-mdr {\n    font-weight: bold;\n    color: #8250df;\n  }\n\n  .pl-ba {\n    color: #57606a;\n  }\n\n  .pl-sg {\n    color: #8c959f;\n  }\n\n  .pl-corl {\n    text-decoration: underline;\n    color: #0a3069;\n  }\n\n  [data-catalyst] {\n    display: block;\n  }\n\n  .markdown-body::before {\n    display: table;\n    content: \"\";\n  }\n\n  .markdown-body::after {\n    display: table;\n    clear: both;\n    content: \"\";\n  }\n\n  .markdown-body>*:first-child {\n    margin-top: 0 !important;\n  }\n\n  .markdown-body>*:last-child {\n    margin-bottom: 0 !important;\n  }\n\n  a:not([href]) {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  .absent {\n    color: #cf222e;\n  }\n\n  .anchor {\n    float: left;\n    padding-right: 4px;\n    margin-left: -20px;\n    line-height: 1;\n  }\n\n  .anchor:focus {\n    outline: none;\n  }\n\n  p,\n  blockquote,\n  ul,\n  ol,\n  dl,\n  table,\n  pre,\n  details {\n    margin-top: 0;\n    margin-bottom: 16px;\n  }\n\n  blockquote>:first-child {\n    margin-top: 0;\n  }\n\n  blockquote>:last-child {\n    margin-bottom: 0;\n  }\n\n  sup>a::before {\n    content: \"[\";\n  }\n\n  sup>a::after {\n    content: \"]\";\n  }\n\n  h1 .octicon-link,\n  h2 .octicon-link,\n  h3 .octicon-link,\n  h4 .octicon-link,\n  h5 .octicon-link,\n  h6 .octicon-link {\n    color: #24292f;\n    vertical-align: middle;\n    visibility: hidden;\n  }\n\n  h1:hover .anchor,\n  h2:hover .anchor,\n  h3:hover .anchor,\n  h4:hover .anchor,\n  h5:hover .anchor,\n  h6:hover .anchor {\n    text-decoration: none;\n  }\n\n  h1:hover .anchor .octicon-link,\n  h2:hover .anchor .octicon-link,\n  h3:hover .anchor .octicon-link,\n  h4:hover .anchor .octicon-link,\n  h5:hover .anchor .octicon-link,\n  h6:hover .anchor .octicon-link {\n    visibility: visible;\n  }\n\n  h1 tt,\n  h1 code,\n  h2 tt,\n  h2 code,\n  h3 tt,\n  h3 code,\n  h4 tt,\n  h4 code,\n  h5 tt,\n  h5 code,\n  h6 tt,\n  h6 code {\n    padding: 0 .2em;\n    font-size: inherit;\n  }\n\n  ul.no-list,\n  ol.no-list {\n    padding: 0;\n    list-style-type: none;\n  }\n\n  ol[type=\"1\"] {\n    list-style-type: decimal;\n  }\n\n  ol[type=a] {\n    list-style-type: lower-alpha;\n  }\n\n  ol[type=i] {\n    list-style-type: lower-roman;\n  }\n\n  div>ol:not([type]) {\n    list-style-type: decimal;\n  }\n\n  ul ul,\n  ul ol,\n  ol ol,\n  ol ul {\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n\n  li>p {\n    margin-top: 16px;\n  }\n\n  li+li {\n    margin-top: .25em;\n  }\n\n  dl {\n    padding: 0;\n  }\n\n  dl dt {\n    padding: 0;\n    margin-top: 16px;\n    font-size: 1em;\n    font-style: italic;\n    font-weight: 600;\n  }\n\n  dl dd {\n    padding: 0 16px;\n    margin-bottom: 16px;\n  }\n\n  table th {\n    font-weight: 600;\n  }\n\n  table th,\n  table td {\n    padding: 6px 13px;\n    border: 1px solid #d0d7de;\n  }\n\n  table tr {\n    background-color: #ffffff;\n    border-top: 1px solid hsla(210,18%,87%,1);\n  }\n\n  table tr:nth-child(2n) {\n    background-color: #f6f8fa;\n  }\n\n  table img {\n    background-color: transparent;\n  }\n\n  img[align=right] {\n    padding-left: 20px;\n  }\n\n  img[align=left] {\n    padding-right: 20px;\n  }\n\n  .emoji {\n    max-width: none;\n    vertical-align: text-top;\n    background-color: transparent;\n  }\n\n  span.frame {\n    display: block;\n    overflow: hidden;\n  }\n\n  span.frame>span {\n    display: block;\n    float: left;\n    width: auto;\n    padding: 7px;\n    margin: 13px 0 0;\n    overflow: hidden;\n    border: 1px solid #d0d7de;\n  }\n\n  span.frame span img {\n    display: block;\n    float: left;\n  }\n\n  span.frame span span {\n    display: block;\n    padding: 5px 0 0;\n    clear: both;\n    color: #24292f;\n  }\n\n  span.align-center {\n    display: block;\n    overflow: hidden;\n    clear: both;\n  }\n\n  span.align-center>span {\n    display: block;\n    margin: 13px auto 0;\n    overflow: hidden;\n    text-align: center;\n  }\n\n  span.align-center span img {\n    margin: 0 auto;\n    text-align: center;\n  }\n\n  span.align-right {\n    display: block;\n    overflow: hidden;\n    clear: both;\n  }\n\n  span.align-right>span {\n    display: block;\n    margin: 13px 0 0;\n    overflow: hidden;\n    text-align: right;\n  }\n\n  span.align-right span img {\n    margin: 0;\n    text-align: right;\n  }\n\n  span.float-left {\n    display: block;\n    float: left;\n    margin-right: 13px;\n    overflow: hidden;\n  }\n\n  span.float-left span {\n    margin: 13px 0 0;\n  }\n\n  span.float-right {\n    display: block;\n    float: right;\n    margin-left: 13px;\n    overflow: hidden;\n  }\n\n  span.float-right>span {\n    display: block;\n    margin: 13px auto 0;\n    overflow: hidden;\n    text-align: right;\n  }\n\n  code,\n  tt {\n    padding: .2em .4em;\n    margin: 0;\n    font-size: 85%;\n    background-color: rgba(175,184,193,0.2);\n    border-radius: 6px;\n  }\n\n  code br,\n  tt br {\n    display: none;\n  }\n\n  del code {\n    text-decoration: inherit;\n  }\n\n  pre code {\n    font-size: 100%;\n  }\n\n  pre>code {\n    padding: 0;\n    margin: 0;\n    word-break: normal;\n    white-space: pre;\n    background: transparent;\n    border: 0;\n  }\n\n  .highlight {\n    margin-bottom: 16px;\n  }\n\n  .highlight pre {\n    margin-bottom: 0;\n    word-break: normal;\n  }\n\n  .highlight pre,\n  pre {\n    padding: 16px;\n    overflow: auto;\n    font-size: 85%;\n    line-height: 1.45;\n    background-color: #f6f8fa;\n    border-radius: 6px;\n  }\n\n  pre code,\n  pre tt {\n    display: inline;\n    max-width: auto;\n    padding: 0;\n    margin: 0;\n    overflow: visible;\n    line-height: inherit;\n    word-wrap: normal;\n    background-color: transparent;\n    border: 0;\n  }\n\n  .csv-data td,\n  .csv-data th {\n    padding: 5px;\n    overflow: hidden;\n    font-size: 12px;\n    line-height: 1;\n    text-align: left;\n    white-space: nowrap;\n  }\n\n  .csv-data .blob-num {\n    padding: 10px 8px 9px;\n    text-align: right;\n    background: #ffffff;\n    border: 0;\n  }\n\n  .csv-data tr {\n    border-top: 0;\n  }\n\n  .csv-data th {\n    font-weight: 600;\n    background: #f6f8fa;\n    border-top: 0;\n  }\n\n  .footnotes {\n    font-size: 12px;\n    color: #57606a;\n    border-top: 1px solid #d0d7de;\n  }\n\n  .footnotes ol {\n    padding-left: 16px;\n  }\n\n  .footnotes li {\n    position: relative;\n  }\n\n  .footnotes li:target::before {\n    position: absolute;\n    top: -8px;\n    right: -8px;\n    bottom: -8px;\n    left: -24px;\n    pointer-events: none;\n    content: \"\";\n    border: 2px solid #0969da;\n    border-radius: 6px;\n  }\n\n  .footnotes li:target {\n    color: #24292f;\n  }\n\n  .footnotes .data-footnote-backref g-emoji {\n    font-family: monospace;\n  }\n\n  .task-list-item {\n    list-style-type: none;\n  }\n\n  .task-list-item label {\n    font-weight: 400;\n  }\n\n  .task-list-item.enabled label {\n    cursor: pointer;\n  }\n\n  .task-list-item+.task-list-item {\n    margin-top: 3px;\n  }\n\n  .task-list-item .handle {\n    display: none;\n  }\n\n  .task-list-item-checkbox {\n    margin: 0 .2em .25em -1.6em;\n    vertical-align: middle;\n  }\n\n  .contains-task-list:dir(rtl) .task-list-item-checkbox {\n    margin: 0 -1.6em .25em .2em;\n  }\n\n  ::-webkit-calendar-picker-indicator {\n    filter: invert(50%);\n  }\n  \n  p {\n    line-height: 24px;\n  }\n\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    color: black;\n    background: none;\n    text-shadow: 0 1px white;\n    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n    font-size: 1em;\n    text-align: left;\n    white-space: pre;\n    word-spacing: normal;\n    word-break: normal;\n    word-wrap: normal;\n    line-height: 1.5;\n\n    -moz-tab-size: 4;\n    -o-tab-size: 4;\n    tab-size: 4;\n\n    -webkit-hyphens: none;\n    -moz-hyphens: none;\n    -ms-hyphens: none;\n    hyphens: none;\n  }\n\n  pre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\n  code[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n    text-shadow: none;\n    background: #b3d4fc;\n  }\n\n  pre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\n  code[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n    text-shadow: none;\n    background: #b3d4fc;\n  }\n\n  @media print {\n    code[class*=\"language-\"],\n    pre[class*=\"language-\"] {\n      text-shadow: none;\n    }\n  }\n\n  /* Code blocks */\n\n  pre[class*=\"language-\"] {\n    padding: 1em;\n    margin: .5em 0;\n    overflow: auto;\n  }\n\n  :not(pre) > code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    background: #f5f2f0;\n  }\n\n  /* Inline code */\n\n  :not(pre) > code[class*=\"language-\"] {\n    padding: .1em;\n    border-radius: .3em;\n    white-space: normal;\n  }\n\n  .token.comment,\n  .token.prolog,\n  .token.doctype,\n  .token.cdata {\n    color: slategray;\n  }\n\n  .token.punctuation {\n    color: #999;\n  }\n\n  .token.namespace {\n    opacity: .7;\n  }\n\n  .token.property,\n  .token.tag,\n  .token.boolean,\n  .token.number,\n  .token.constant,\n  .token.symbol,\n  .token.deleted {\n    color: #905;\n  }\n\n  .token.selector,\n  .token.attr-name,\n  .token.string,\n  .token.char,\n  .token.builtin,\n  .token.inserted {\n    color: #690;\n  }\n\n  .token.operator,\n  .token.entity,\n  .token.url,\n  .language-css .token.string,\n  .style .token.string {\n    color: #9a6e3a;\n    /* This background color was intended by the author of this theme. */\n    background: hsla(0, 0%, 100%, .5);\n  }\n\n  .token.atrule,\n  .token.attr-value,\n  .token.keyword {\n    color: #07a;\n  }\n\n  .token.function,\n  .token.class-name {\n    color: #DD4A68;\n  }\n\n  .token.regex,\n  .token.important,\n  .token.variable {\n    color: #e90;\n  }\n\n  .token.important,\n  .token.bold {\n    font-weight: bold;\n  }\n\n  .token.italic {\n    font-style: italic;\n  }\n\n  .token.entity {\n    cursor: help;\n  }\n"])));
var templateObject_1$2, templateObject_2$1, templateObject_3$1;

function MarkdownPreview(props) {
    if (props === void 0) { props = { minHeight: 144 }; }
    var _a = props.content, content = _a === void 0 ? "" : _a, _b = props.allowedTags, allowedTags = _b === void 0 ? sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "iframe",
        "br",
        "ins",
        "del"
    ]) : _b, restProps = __rest(props, ["content", "allowedTags"]);
    var html = marked.parse(content, {
        breaks: true,
        highlight: function (code, lang) {
            var _a;
            if (!lang) {
                return code;
            }
            var language = (_a = Prism.languages[lang]) !== null && _a !== void 0 ? _a : Prism.languages.markup;
            return Prism.highlight(code, language, lang);
        }
    });
    var cleanHtml = sanitizeHtml(html, {
        allowedTags: allowedTags,
        allowedAttributes: {
            img: ["src", "size", "width", "height"],
            iframe: ["src", "width", "height"],
            a: ["href", "rel", "target"],
            "*": ["class"],
            td: ["align"],
            th: ["align"]
        }
    });
    return (React__default.createElement(MarkdownPreviewWrapper, __assign({}, restProps),
        React__default.createElement(MarkdownBody, { className: "markdown-body", dangerouslySetInnerHTML: { __html: cleanHtml } })));
}

var SuggestionsWrapper = styled.ul(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  position: absolute;\n  min-width: 180px;\n  padding: 8px 0;\n  margin: 20px 0 0;\n  list-style: none;\n  cursor: pointer;\n  background: #fff;\n  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.06),\n    0px 0.751293px 8px rgba(26, 33, 44, 0.04);\n  color: #506176;\n\n  li {\n    padding: 6px 16px;\n\n    &:hover,\n    &[aria-selected=\"true\"] {\n      background-color: #f0f3f8;\n    }\n  }\n"], ["\n  position: absolute;\n  min-width: 180px;\n  padding: 8px 0;\n  margin: 20px 0 0;\n  list-style: none;\n  cursor: pointer;\n  background: #fff;\n  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.06),\n    0px 0.751293px 8px rgba(26, 33, 44, 0.04);\n  color: #506176;\n\n  li {\n    padding: 6px 16px;\n\n    &:hover,\n    &[aria-selected=\"true\"] {\n      background-color: #f0f3f8;\n    }\n  }\n"])));
var SuggestionsDropdown = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var suggestions = _a.suggestions, caret = _a.caret, onSuggestionSelected = _a.onSuggestionSelected, suggestionsAutoplace = _a.suggestionsAutoplace, focusIndex = _a.focusIndex, textAreaRef = _a.textAreaRef;
    var handleSuggestionClick = function (event) {
        event.preventDefault();
        // @ts-ignore
        var index = parseInt(event.currentTarget.attributes["data-index"].value);
        onSuggestionSelected(index);
    };
    var handleMouseDown = function (event) { return event.preventDefault(); };
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    var left = caret.left - ((_c = (_b = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _b === void 0 ? void 0 : _b.scrollLeft) !== null && _c !== void 0 ? _c : 0) + 30;
    var top = caret.top - ((_e = (_d = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _d === void 0 ? void 0 : _d.scrollTop) !== null && _e !== void 0 ? _e : 0) + 60;
    var style = {};
    if (suggestionsAutoplace &&
        top + ((_h = (_g = (_f = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _f === void 0 ? void 0 : _f.getBoundingClientRect()) === null || _g === void 0 ? void 0 : _g.top) !== null && _h !== void 0 ? _h : 0) > vh / 2)
        style.bottom = ((_k = (_j = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _j === void 0 ? void 0 : _j.offsetHeight) !== null && _k !== void 0 ? _k : 0) - top;
    else
        style.top = top;
    if (suggestionsAutoplace &&
        left + ((_o = (_m = (_l = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _l === void 0 ? void 0 : _l.getBoundingClientRect()) === null || _m === void 0 ? void 0 : _m.left) !== null && _o !== void 0 ? _o : 0) > vw / 2)
        style.right = ((_q = (_p = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _p === void 0 ? void 0 : _p.offsetWidth) !== null && _q !== void 0 ? _q : 0) - left;
    else
        style.left = left;
    return (React.createElement(SuggestionsWrapper, { style: style }, suggestions.map(function (s, i) { return (React.createElement("li", { onClick: handleSuggestionClick, onMouseDown: handleMouseDown, key: i, "aria-selected": focusIndex === i ? "true" : "false", "data-index": "" + i }, s.preview)); })));
};
var templateObject_1$1;

var EditorWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  border-top: 1px solid #e2e8f0;\n  border-bottom: 1px solid #e2e8f0;\n  ", "\n"], ["\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  border-top: 1px solid #e2e8f0;\n  border-bottom: 1px solid #e2e8f0;\n  ",
    "\n"])), function (p) {
    return p.disabled && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      pointer-events: none;\n      cursor: not-allowed;\n    "], ["\n      pointer-events: none;\n      cursor: not-allowed;\n    "])));
});
var ToolBar = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex-basis: 100%;\n  padding-left: 16px;\n  padding-right: 16px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    display: block;\n    padding-left: 0;\n    padding-right: 0;\n  }\n"], ["\n  flex-basis: 100%;\n  padding-left: 16px;\n  padding-right: 16px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    display: block;\n    padding-left: 0;\n    padding-right: 0;\n  }\n"])));
var TabsWrapper = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  gap: 24px;\n  height: 48px;\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    border-bottom: 1px solid #e2e8f0;\n  }\n"], ["\n  display: flex;\n  gap: 24px;\n  height: 48px;\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    border-bottom: 1px solid #e2e8f0;\n  }\n"])));
var Tab = styled.button(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  all: unset;\n  font-weight: 500;\n  font-size: 14px;\n  line-height: 24px;\n  border-bottom: 3px solid #ffffff;\n  ", ";\n  cursor: pointer;\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    margin-left: 16px;\n    margin-right: 16px;\n    width: 50%;\n    text-align: center;\n  }\n"], ["\n  all: unset;\n  font-weight: 500;\n  font-size: 14px;\n  line-height: 24px;\n  border-bottom: 3px solid #ffffff;\n  ",
    ";\n  cursor: pointer;\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    margin-left: 16px;\n    margin-right: 16px;\n    width: 50%;\n    text-align: center;\n  }\n"])), function (props) {
    return props.active && css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      border-bottom: 3px solid #04d2c5;\n    "], ["\n      border-bottom: 3px solid #04d2c5;\n    "])));
});
var ToolbarItemsWrapper = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  ", ";\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    height: 48px;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  ",
    ";\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    height: 48px;\n  }\n"])), function (props) {
    return props.hide && css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n      display: none;\n    "], ["\n      display: none;\n    "])));
});
var ToolbarButton = styled.button(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  all: unset;\n  cursor: pointer;\n  width: 24px;\n  height: 24px;\n\n  &:hover svg path {\n    fill: #1e2134;\n  }\n"], ["\n  all: unset;\n  cursor: pointer;\n  width: 24px;\n  height: 24px;\n\n  &:hover svg path {\n    fill: #1e2134;\n  }\n"])));
var Textarea = styled.textarea(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 144px;\n  ", ";\n  ", ";\n  ", ";\n  max-height: 672px;\n  resize: vertical;\n  border: none;\n  outline: none;\n  font-size: 14px;\n  line-height: 24px;\n  padding: 12px;\n  background: #fbfcfe;\n  font-family: Inter, sans-serif;\n\n  ::selection {\n    background-color: #e2e8f0;\n  }\n"], ["\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 144px;\n  ",
    ";\n  ",
    ";\n  ",
    ";\n  max-height: 672px;\n  resize: vertical;\n  border: none;\n  outline: none;\n  font-size: 14px;\n  line-height: 24px;\n  padding: 12px;\n  background: #fbfcfe;\n  font-family: Inter, sans-serif;\n\n  ::selection {\n    background-color: #e2e8f0;\n  }\n"])), function (props) {
    return props.minHeight && css(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n      min-height: ", "px;\n    "], ["\n      min-height: ", "px;\n    "])), props.minHeight);
}, function (props) {
    return props.height && css(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n      height: ", "px;\n    "], ["\n      height: ", "px;\n    "])), props.height);
}, function (props) {
    return props.hide && css(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n      display: none;\n    "], ["\n      display: none;\n    "])));
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;

function Bold () {
    return React__default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.5 5.25C6.87868 5.25 6.375 5.75368 6.375 6.375V12V17.625C6.375 18.2463 6.87868 18.75 7.5 18.75H13.6875C15.8621 18.75 17.625 16.9871 17.625 14.8125C17.625 13.4029 16.8843 12.1663 15.7709 11.4707C16.2299 10.8267 16.5 10.0386 16.5 9.1875C16.5 7.01288 14.7371 5.25 12.5625 5.25H7.5ZM12.5625 10.875C13.4945 10.875 14.25 10.1195 14.25 9.1875C14.25 8.25552 13.4945 7.5 12.5625 7.5H8.625V10.875H12.5625ZM8.625 13.125V16.5H13.6875C14.6194 16.5 15.375 15.7444 15.375 14.8125C15.375 13.8805 14.6194 13.125 13.6875 13.125H12.5625H8.625Z", fill: "#506176" }));
}

function Underline () {
    return React__default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default.createElement("path", { d: "M7.83458 4.47119C8.29469 4.47119 8.66767 4.84418 8.66767 5.30428V11.1979C8.66767 12.0817 9.01876 12.9293 9.64369 13.5542C10.2686 14.1792 11.1162 14.5303 12 14.5303C12.8838 14.5303 13.7314 14.1792 14.3563 13.5542C14.9813 12.9293 15.3324 12.0817 15.3324 11.1979V5.30428C15.3324 4.84418 15.7053 4.47119 16.1654 4.47119C16.6255 4.47119 16.9985 4.84418 16.9985 5.30428V11.1979C16.9985 12.5236 16.4719 13.795 15.5345 14.7324C14.5971 15.6698 13.3257 16.1964 12 16.1964C10.6743 16.1964 9.40293 15.6698 8.46553 14.7324C7.52813 13.795 7.0015 12.5236 7.0015 11.1979V5.30428C7.0015 4.84418 7.37448 4.47119 7.83458 4.47119ZM5.33533 18.6957C5.33533 18.2356 5.70831 17.8626 6.16841 17.8626H17.8316C18.2917 17.8626 18.6647 18.2356 18.6647 18.6957C18.6647 19.1558 18.2917 19.5288 17.8316 19.5288H6.16841C5.70831 19.5288 5.33533 19.1558 5.33533 18.6957Z", fill: "#506176" }));
}

function Delete () {
    return React__default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default.createElement("path", { d: "M16.6512 13.805C16.8588 14.2707 16.9635 14.7887 16.9635 15.3573C16.9635 16.5684 16.4906 17.516 15.5457 18.1974C14.599 18.8788 13.2931 19.2199 11.6262 19.2199C10.315 19.2199 9.01593 18.9501 7.72823 18.4098C7.42154 18.2811 7.23108 17.9755 7.23108 17.6429C7.23108 16.98 7.95555 16.5584 8.57437 16.7963C9.51561 17.1581 10.4714 17.3391 11.4421 17.3391C13.7443 17.3391 14.8986 16.6785 14.9067 15.3564C14.9115 15.0883 14.8622 14.822 14.7617 14.5735C14.6397 14.2718 14.4437 14.0285 14.2136 13.8041H3.87744V11.9991H20.1222V13.8041L16.6512 13.805ZM12.9709 11.0976H8.05505C7.89696 10.9534 7.75171 10.7958 7.62095 10.6265C7.23108 10.1229 7.03614 9.51459 7.03614 8.79802C7.03614 7.68255 7.4567 6.73403 8.29692 5.95248C9.13894 5.17093 10.4394 4.78015 12.2002 4.78015C13.3572 4.78015 14.471 5.005 15.5405 5.4547C15.8317 5.57715 16.0105 5.86855 16.0105 6.18445C16.0105 6.81951 15.3138 7.22863 14.7102 7.03118C13.9959 6.79751 13.2423 6.68079 12.4493 6.68079C10.2111 6.68079 9.09291 7.38653 9.09291 8.79802C9.09291 9.17706 9.28965 9.50737 9.68313 9.78985C10.0766 10.0723 10.5622 10.297 11.1388 10.4667C11.6984 10.6292 12.3094 10.8403 12.9709 11.0976Z", fill: "#506176" }));
}

function Ul () {
    return React__default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.25 7.5C5.87132 7.5 6.375 6.99632 6.375 6.375C6.375 5.75368 5.87132 5.25 5.25 5.25C4.62868 5.25 4.125 5.75368 4.125 6.375C4.125 6.99632 4.62868 7.5 5.25 7.5ZM9.46875 5.8125C9.00276 5.8125 8.625 6.19026 8.625 6.65625C8.625 7.12224 9.00276 7.5 9.46875 7.5H19.0312C19.4972 7.5 19.875 7.12224 19.875 6.65625C19.875 6.19026 19.4972 5.8125 19.0312 5.8125H9.46875ZM9.46875 11.4375C9.00276 11.4375 8.625 11.8153 8.625 12.2812C8.625 12.7472 9.00276 13.125 9.46875 13.125H19.0312C19.4972 13.125 19.875 12.7472 19.875 12.2812C19.875 11.8153 19.4972 11.4375 19.0312 11.4375H9.46875ZM9.46875 17.0625C9.00276 17.0625 8.625 17.4403 8.625 17.9062C8.625 18.3722 9.00276 18.75 9.46875 18.75H19.0312C19.4972 18.75 19.875 18.3722 19.875 17.9062C19.875 17.4403 19.4972 17.0625 19.0312 17.0625H9.46875ZM6.375 12C6.375 12.6213 5.87132 13.125 5.25 13.125C4.62868 13.125 4.125 12.6213 4.125 12C4.125 11.3787 4.62868 10.875 5.25 10.875C5.87132 10.875 6.375 11.3787 6.375 12ZM5.25 18.75C5.87132 18.75 6.375 18.2463 6.375 17.625C6.375 17.0037 5.87132 16.5 5.25 16.5C4.62868 16.5 4.125 17.0037 4.125 17.625C4.125 18.2463 4.62868 18.75 5.25 18.75Z", fill: "#506176" }));
}

function Ol () {
    return React__default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default.createElement("g", { clipPath: "url(#clip0_10067_7942)" },
            React__default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.25379 5.81256C5.25379 5.61771 5.15297 5.43674 4.98729 5.3342C4.82161 5.23166 4.61467 5.22216 4.44028 5.30909L3.31171 5.87163C3.03365 6.01023 2.9206 6.348 3.0592 6.62607C3.19781 6.90412 3.53558 7.01717 3.81364 6.87857L4.12869 6.72152V9.75041H3.56267C3.25199 9.75041 3.00012 10.0023 3.00012 10.313C3.00012 10.6236 3.25199 10.8755 3.56267 10.8755H5.81981C6.1305 10.8755 6.38237 10.6236 6.38237 10.313C6.38237 10.0023 6.1305 9.75041 5.81981 9.75041H5.25379V5.81256ZM8.625 6.65625C8.625 6.19026 9.00276 5.8125 9.46875 5.8125H19.0312C19.4972 5.8125 19.875 6.19026 19.875 6.65625C19.875 7.12224 19.4972 7.5 19.0312 7.5H9.46875C9.00276 7.5 8.625 7.12224 8.625 6.65625ZM8.625 12.2813C8.625 11.8153 9.00276 11.4375 9.46875 11.4375H19.0312C19.4972 11.4375 19.875 11.8153 19.875 12.2813C19.875 12.7472 19.4972 13.125 19.0312 13.125H9.46875C9.00276 13.125 8.625 12.7472 8.625 12.2813ZM8.625 17.9062C8.625 17.4403 9.00276 17.0625 9.46875 17.0625H19.0312C19.4972 17.0625 19.875 17.4403 19.875 17.9062C19.875 18.3722 19.4972 18.75 19.0312 18.75H9.46875C9.00276 18.75 8.625 18.3722 8.625 17.9062ZM4.03995 14.61L4.04291 14.6056C4.04773 14.5986 4.05728 14.5854 4.07144 14.5678C4.10025 14.532 4.1451 14.4824 4.20459 14.4331C4.32321 14.3347 4.48173 14.2508 4.68778 14.2508C4.90752 14.2508 5.03307 14.328 5.10985 14.415C5.19565 14.5124 5.25351 14.6617 5.25351 14.8385C5.25351 15.3474 4.95073 15.606 4.35347 16.0506L4.31406 16.0798C3.77839 16.4778 3.00014 17.0562 3.00014 18.1874C3.00014 18.3366 3.05941 18.4797 3.1649 18.5852C3.2704 18.6907 3.41349 18.75 3.56269 18.75H5.81598C6.12667 18.75 6.37861 18.4981 6.37861 18.1874C6.37861 17.8768 6.12675 17.6249 5.81607 17.6249H4.28937C4.4375 17.4029 4.6846 17.2066 5.02528 16.953L5.07777 16.914C5.60737 16.5211 6.37861 15.9489 6.37861 14.8385C6.37861 14.4275 6.2455 14.0018 5.95376 13.6709C5.65299 13.3298 5.21441 13.1257 4.6878 13.1257C4.14752 13.1257 3.74348 13.3537 3.48613 13.5673C3.35763 13.6739 3.26115 13.7803 3.19562 13.8616C3.16261 13.9025 3.13674 13.9379 3.11793 13.9651C3.10851 13.9787 3.10079 13.9903 3.09479 13.9996L3.08704 14.0118L3.08411 14.0165L3.08288 14.0185L3.08206 14.0199C2.92084 14.2854 3.00519 14.6318 3.27078 14.793C3.53439 14.9531 3.87721 14.8709 4.03995 14.61ZM3.56263 14.3121L3.08206 14.0199C3.08206 14.0199 3.0818 14.0203 3.56263 14.3121Z", fill: "#506176" })),
        React__default.createElement("defs", null,
            React__default.createElement("clipPath", { id: "clip0_10067_7942" },
                React__default.createElement("rect", { width: "18", height: "18", fill: "white", transform: "translate(3 3)" }))));
}

function Link () {
    return React__default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11.7469 6.68446C11.5978 6.8444 11.5167 7.05596 11.5205 7.27454C11.5244 7.49313 11.6129 7.70168 11.7675 7.85628C11.9221 8.01087 12.1307 8.09942 12.3493 8.10328C12.5679 8.10713 12.7794 8.026 12.9394 7.87696L14.3456 6.47071C14.5546 6.26166 14.8028 6.09583 15.076 5.9827C15.3491 5.86955 15.6418 5.81132 15.9375 5.81132C16.2331 5.81132 16.5259 5.86955 16.799 5.9827C17.0722 6.09583 17.3203 6.26166 17.5294 6.47071C17.7384 6.67976 17.9042 6.92793 18.0174 7.20106C18.1305 7.4742 18.1887 7.76695 18.1887 8.06258C18.1887 8.35822 18.1305 8.65096 18.0174 8.9241C17.9042 9.19723 17.7384 9.4454 17.5294 9.65446L14.7169 12.467C14.5078 12.6762 14.2598 12.8421 13.9866 12.9553C13.7135 13.0686 13.4207 13.1269 13.125 13.1269C12.8293 13.1269 12.5365 13.0686 12.2634 12.9553C11.9902 12.8421 11.7421 12.6762 11.5331 12.467C11.3732 12.3179 11.1616 12.2368 10.943 12.2406C10.7244 12.2445 10.5159 12.333 10.3613 12.4876C10.2067 12.6422 10.1181 12.8508 10.1143 13.0694C10.1104 13.288 10.1916 13.4995 10.3406 13.6595C10.7063 14.0251 11.1403 14.3152 11.6181 14.5131C12.0958 14.711 12.6079 14.8128 13.125 14.8128C13.6421 14.8128 14.1542 14.711 14.6319 14.5131C15.1096 14.3152 15.5437 14.0251 15.9094 13.6595L18.7219 10.847C19.4603 10.1085 19.8752 9.10692 19.8752 8.06258C19.8752 7.01824 19.4603 6.01667 18.7219 5.27821C17.9834 4.53974 16.9818 4.12488 15.9375 4.12488C14.8932 4.12488 13.8916 4.53974 13.1531 5.27821L11.7469 6.68446ZM6.47062 17.5295C6.26141 17.3204 6.09545 17.0724 5.98223 16.7992C5.869 16.5261 5.81071 16.2332 5.81071 15.9376C5.81071 15.6419 5.869 15.3491 5.98223 15.0759C6.09545 14.8028 6.26141 14.5546 6.47062 14.3457L9.28312 11.5332C9.49207 11.324 9.74023 11.158 10.0134 11.0448C10.2865 10.9316 10.5793 10.8733 10.875 10.8733C11.1707 10.8733 11.4635 10.9316 11.7366 11.0448C12.0097 11.158 12.2579 11.324 12.4669 11.5332C12.6268 11.6822 12.8384 11.7634 13.057 11.7595C13.2755 11.7557 13.4841 11.6671 13.6387 11.5125C13.7933 11.3579 13.8818 11.1494 13.8857 10.9308C13.8895 10.7122 13.8084 10.5007 13.6594 10.3407C13.2937 9.97503 12.8596 9.68496 12.3819 9.48706C11.9042 9.28916 11.3921 9.18729 10.875 9.18729C10.3579 9.18729 9.84582 9.28916 9.36808 9.48706C8.89034 9.68496 8.45625 9.97503 8.09062 10.3407L5.27812 13.1532C4.53964 13.8917 4.12479 14.8932 4.12479 15.9376C4.12479 16.9819 4.53964 17.9835 5.27812 18.722C6.01658 19.4604 7.01814 19.8753 8.06249 19.8753C9.10683 19.8753 10.1084 19.4604 10.8469 18.722L12.2531 17.3157C12.4022 17.1557 12.4833 16.9442 12.4794 16.7256C12.4756 16.5071 12.387 16.2985 12.2324 16.1439C12.0778 15.9893 11.8693 15.9007 11.6507 15.8969C11.4321 15.893 11.2206 15.9741 11.0606 16.1232L9.65437 17.5295C9.4454 17.7386 9.19725 17.9046 8.92411 18.0178C8.65096 18.1311 8.35818 18.1894 8.06249 18.1894C7.7668 18.1894 7.47402 18.1311 7.20087 18.0178C6.92773 17.9046 6.67957 17.7386 6.47062 17.5295Z", fill: "#506176" }));
}

function Img () {
    return React__default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default.createElement("g", { clipPath: "url(#clip0_10067_7948)" },
            React__default.createElement("path", { d: "M18.75 14.25V16.5H21V18H18.75V20.25H17.25V18H15V16.5H17.25V14.25H18.75ZM18.756 5.25C19.167 5.25 19.5 5.58375 19.5 5.99475V13.0065C19.0183 12.8363 18.511 12.7496 18 12.75V6.75H6.00003L6.00078 17.25L12.9698 10.2802C13.0987 10.1509 13.2705 10.073 13.4529 10.0614C13.6352 10.0498 13.8155 10.1053 13.9598 10.2172L14.0295 10.281L16.689 12.9435C16.1075 13.1207 15.5679 13.4138 15.1027 13.8052C14.6376 14.1966 14.2565 14.6781 13.9825 15.2208C13.7084 15.7635 13.5472 16.356 13.5083 16.9627C13.4695 17.5693 13.5539 18.1776 13.7565 18.7507L5.24403 18.75C5.04664 18.7498 4.8574 18.6712 4.7179 18.5316C4.57839 18.392 4.50003 18.2026 4.50003 18.0052V5.99475C4.5014 5.79778 4.58021 5.60926 4.71942 5.46991C4.85862 5.33056 5.04707 5.25157 5.24403 5.25H18.756ZM9.00003 8.25C9.39786 8.25 9.77939 8.40804 10.0607 8.68934C10.342 8.97064 10.5 9.35218 10.5 9.75C10.5 10.1478 10.342 10.5294 10.0607 10.8107C9.77939 11.092 9.39786 11.25 9.00003 11.25C8.60221 11.25 8.22067 11.092 7.93937 10.8107C7.65807 10.5294 7.50003 10.1478 7.50003 9.75C7.50003 9.35218 7.65807 8.97064 7.93937 8.68934C8.22067 8.40804 8.60221 8.25 9.00003 8.25Z", fill: "#506176" })),
        React__default.createElement("defs", null,
            React__default.createElement("clipPath", { id: "clip0_10067_7948" },
                React__default.createElement("rect", { width: "18", height: "18", fill: "white", transform: "translate(3 3)" }))));
}

function Code () {
    return React__default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8.30963 6.62213C8.63913 6.29262 9.17337 6.29262 9.50287 6.62213C9.83237 6.95163 9.83237 7.48587 9.50287 7.81537L5.31824 12L9.50287 16.1847C9.83237 16.5142 9.83237 17.0483 9.50287 17.3778C9.17337 17.7073 8.63913 17.7073 8.30963 17.3778L3.52838 12.5966C3.19887 12.2671 3.19887 11.7329 3.52838 11.4034L8.30963 6.62213ZM15.6903 6.62213C15.3608 6.29262 14.8267 6.29262 14.4972 6.62213C14.1676 6.95163 14.1676 7.48587 14.4972 7.81537L18.6817 12L14.4972 16.1847C14.1676 16.5142 14.1676 17.0483 14.4972 17.3778C14.8267 17.7073 15.3608 17.7073 15.6903 17.3778L20.4716 12.5966C20.8011 12.2671 20.8011 11.7329 20.4716 11.4034L15.6903 6.62213Z", fill: "#506176" }));
}

function EditorHeader(_a) {
    var _this = this;
    var editStatus = _a.editStatus, setEditStatus = _a.setEditStatus, isPreview = _a.isPreview, commandController = _a.commandController;
    return React.createElement(ToolBar, null,
        React.createElement(TabsWrapper, null,
            React.createElement(Tab, { active: editStatus === "write", onClick: function () { return setEditStatus("write"); } }, "Write"),
            React.createElement(Tab, { active: editStatus === "preview", onClick: function () { return setEditStatus("preview"); } }, "Preview")),
        React.createElement(ToolbarItemsWrapper, { hide: isPreview },
            React.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("bold")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React.createElement(Bold, null)),
            React.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("underline")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React.createElement(Underline, null)),
            React.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("delete")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React.createElement(Delete, null)),
            React.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("ul")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React.createElement(Ul, null)),
            React.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("ol")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React.createElement(Ol, null)),
            React.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("link")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React.createElement(Link, null)),
            React.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("image")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React.createElement(Img, null)),
            React.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("code")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React.createElement(Code, null))));
}

function insertText(input, text) {
    // Most of the used APIs only work with the field selected
    input.focus();
    // IE 8-10
    if (document.selection) {
        var ieRange = document.selection.createRange();
        ieRange.text = text;
        // Move cursor after the inserted text
        ieRange.collapse(false /* to the end */);
        ieRange.select();
        return;
    }
    // Webkit + Edge
    var isSuccess = document.execCommand("insertText", false, text);
    if (!isSuccess) {
        var start = input.selectionStart;
        var end = input.selectionEnd;
        // Firefox (non-standard method)
        if (typeof input.setRangeText === "function") {
            input.setRangeText(text);
        }
        else {
            if (canManipulateViaTextNodes(input)) {
                var textNode = document.createTextNode(text);
                var node = input.firstChild;
                // If textarea is empty, just insert the text
                if (!node) {
                    input.appendChild(textNode);
                }
                else {
                    // Otherwise we need to find a nodes for start and end
                    var offset = 0;
                    var startNode = null;
                    var endNode = null;
                    // To make a change we just need a Range, not a Selection
                    var range = document.createRange();
                    while (node && (startNode === null || endNode === null)) {
                        var nodeLength = node.nodeValue.length;
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
                var value = input.value;
                input.value = value.slice(0, start) + text + value.slice(end);
            }
        }
        // Correct the cursor position to be at the end of the insertion
        input.setSelectionRange(start + text.length, start + text.length);
        // Notify any possible listeners of the change
        var e = document.createEvent("UIEvent");
        e.initEvent("input", true, false);
        input.dispatchEvent(e);
    }
}
function canManipulateViaTextNodes(input) {
    if (input.nodeName !== "TEXTAREA") {
        return false;
    }
    var browserSupportsTextareaTextNodes;
    if (typeof browserSupportsTextareaTextNodes === "undefined") {
        var textarea = document.createElement("textarea");
        textarea.value = "1";
        browserSupportsTextareaTextNodes = !!textarea.firstChild;
    }
    return browserSupportsTextareaTextNodes;
}

var properties = [
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
    var div = document.createElement("div");
    div.id = "input-textarea-caret-position-mirror-div";
    document.body.appendChild(div);
    var style = div.style;
    var computed = window.getComputedStyle
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
    var span = document.createElement("span");
    // Wrapping must be replicated *exactly*, including when a long word gets
    // onto the next line, with whitespace at the end of the line before (#7).
    // The  *only* reliable way to do that is to copy the *entire* rest of the
    // textarea's content into the <span> created at the caret position.
    // For inputs, just '.' would be enough, but no need to bother.
    span.textContent = element.value.substring(element.selectionEnd) || "."; // || because a completely empty faux span doesn't render at all
    div.appendChild(span);
    var coordinates = {
        top: span.offsetTop + parseInt(computed["borderTopWidth"]),
        left: span.offsetLeft + parseInt(computed["borderLeftWidth"]),
        lineHeight: parseInt(computed["lineHeight"])
    };
    document.body.removeChild(div);
    return coordinates;
}

function getHandlers(_a) {
    var ref = _a.ref, loadSuggestions = _a.loadSuggestions, setFocusIndex = _a.setFocusIndex, focusIndex = _a.focusIndex, setCaret = _a.setCaret, suggestions = _a.suggestions, setSuggestions = _a.setSuggestions, mentionState = _a.mentionState, setMentionState = _a.setMentionState, value = _a.value;
    var handleSuggestionSelected = function (index) {
        if (suggestions === null || suggestions === void 0 ? void 0 : suggestions.length) {
            ref.current.setSelectionRange(mentionState.startPosition - 1, ref.current.selectionStart);
            insertText(ref === null || ref === void 0 ? void 0 : ref.current, suggestions[index].value);
            setMentionState(__assign(__assign({}, mentionState), { status: "inactive" }));
            setFocusIndex(0);
        }
    };
    var handleKeyDown = function (event) {
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
                    setMentionState(__assign(__assign({}, mentionState), { status: "inactive" }));
                    setFocusIndex(0);
                }
            }
            if (event.key === "Escape") {
                setMentionState(__assign(__assign({}, mentionState), { status: "inactive" }));
                setFocusIndex(0);
            }
        }
    };
    var handleKeyUp = function (event) {
        var key = event.key;
        switch (mentionState.status) {
            case "active":
                if (key === "Backspace") {
                    var searchText = value.substr(mentionState.startPosition, ref.current.selectionStart - mentionState.startPosition);
                    setSuggestions(loadSuggestions(searchText));
                }
                break;
        }
    };
    var handleKeyPress = function (event) {
        var key = event.key;
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
                    setMentionState(__assign(__assign({}, mentionState), { status: "inactive" }));
                    return;
                }
                var searchText = value.substr(mentionState.startPosition, ref.current.selectionStart - mentionState.startPosition) + key;
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
        handleSuggestionSelected: handleSuggestionSelected,
        handleKeyDown: handleKeyDown,
        handleKeyPress: handleKeyPress,
        handleKeyUp: handleKeyUp
    };
}

var Editor = function (_a) {
    var value = _a.value, onChange = _a.onChange, loadSuggestions = _a.loadSuggestions, _b = _a.minHeight, minHeight = _b === void 0 ? 144 : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c;
    var ref = useRef(null);
    var commandController = useTextAreaMarkdownEditor(ref, {
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
    }).commandController;
    var _d = useState({ left: 0, top: 0, lineHeight: 20 }), caret = _d[0], setCaret = _d[1];
    var _e = useState(0), focusIndex = _e[0], setFocusIndex = _e[1];
    var _f = React.useState("write"), editStatus = _f[0], setEditStatus = _f[1];
    var _g = React.useState([]), suggestions = _g[0], setSuggestions = _g[1];
    var _h = useState({
        status: "inactive",
        suggestions: []
    }), mentionState = _h[0], setMentionState = _h[1];
    var isPreview = React.useMemo(function () {
        return editStatus === "preview";
    }, [editStatus]);
    var observer;
    var _j = useState(100), height = _j[0], setHeight = _j[1];
    var _k = useState(false), userResized = _k[0], setUserResized = _k[1];
    var adjustHeight = function () {
        var textarea = ref === null || ref === void 0 ? void 0 : ref.current;
        if (textarea && !userResized) {
            textarea.style.height = minHeight + "px";
            textarea.style.height = textarea.scrollHeight + "px";
            setHeight(textarea.scrollHeight);
            textarea.blur();
            textarea.focus();
        }
    };
    useEffect(function () {
        //expand height if got default value before inputting
        adjustHeight();
    }, []);
    useEffect(function () {
        var _a;
        var textarea = ref === null || ref === void 0 ? void 0 : ref.current;
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
            observer = new MutationObserver(function (record) {
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
    var _l = getHandlers({
        ref: ref,
        suggestions: suggestions,
        loadSuggestions: loadSuggestions,
        setFocusIndex: setFocusIndex,
        focusIndex: focusIndex,
        setCaret: setCaret,
        setSuggestions: setSuggestions,
        mentionState: mentionState,
        setMentionState: setMentionState,
        value: value
    }), handleSuggestionSelected = _l.handleSuggestionSelected, handleKeyDown = _l.handleKeyDown, handleKeyPress = _l.handleKeyPress, handleKeyUp = _l.handleKeyUp;
    var isEditingText = React.useMemo(function () {
        var v = mentionState.status !== "active";
        if (!suggestions.length) {
            v = true;
        }
        return v;
    }, [mentionState.status, suggestions]);
    var onEnterNewLine = function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            if (isEditingText) {
                commandController.executeCommand("newLineAndIndentContinueMarkdownList");
            }
        }
    };
    return (React.createElement(EditorWrapper, { disabled: disabled },
        React.createElement(EditorHeader, __assign({}, { editStatus: editStatus, setEditStatus: setEditStatus, isPreview: isPreview, commandController: commandController })),
        React.createElement(Textarea, { ref: ref, value: value, onChange: function (event) {
                onChange(event.target.value);
                adjustHeight();
            }, onKeyUp: function (event) {
                handleKeyUp(event);
            }, onKeyDown: function (event) {
                handleKeyDown(event);
                onEnterNewLine(event);
            }, onKeyPress: handleKeyPress, placeholder: "Please text here...", minHeight: minHeight, height: height, hide: isPreview }),
        isPreview && React.createElement(MarkdownPreview, { content: value, minHeight: minHeight }),
        mentionState.status === "active" && suggestions.length > 0 && (React.createElement(SuggestionsDropdown, { caret: caret, suggestions: suggestions, focusIndex: focusIndex < suggestions.length ? focusIndex : 0, textAreaRef: ref, onSuggestionSelected: handleSuggestionSelected, suggestionsAutoplace: true }))));
};

export { Editor, Editor as default };
//# sourceMappingURL=index.js.map
