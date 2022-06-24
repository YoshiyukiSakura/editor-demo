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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

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
    var textController = React.useMemo(function () {
        return new TextAreaTextController(ref);
    }, [ref]);
    var commandController = React.useMemo(function () { return new CommandController(textController, options.commandMap); }, [ref]);
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

var MarkdownPreviewWrapper = styled__default["default"].div(templateObject_3$3 || (templateObject_3$3 = __makeTemplateObject(["\n  box-sizing: border-box;\n  flex-basis: 100%;\n  min-height: 144px;\n  background-color: #fbfcfe;\n  ", ";\n  padding: 12px;\n\n  .markdown-body {\n    background-color: inherit !important;\n  }\n\n  ", ";\n"], ["\n  box-sizing: border-box;\n  flex-basis: 100%;\n  min-height: 144px;\n  background-color: #fbfcfe;\n  ",
    ";\n  padding: 12px;\n\n  .markdown-body {\n    background-color: inherit !important;\n  }\n\n  ",
    ";\n"])), function (props) {
    return props.theme === "subsquare" && styled.css(templateObject_1$8 || (templateObject_1$8 = __makeTemplateObject(["\n            background-color: white;\n          "], ["\n            background-color: white;\n          "])));
}, function (props) {
    return props.minHeight && styled.css(templateObject_2$5 || (templateObject_2$5 = __makeTemplateObject(["\n            min-height: ", "px;\n          "], ["\n            min-height: ", "px;\n          "])), props.minHeight);
});
var MarkdownBody = styled__default["default"].div(templateObject_4$3 || (templateObject_4$3 = __makeTemplateObject(["\n  font-size: 14px;\n  font-weight: normal;\n  color: #1e2134;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background-color: transparent;\n\n  {\n    -ms-text-size-adjust: 100%;\n    -webkit-text-size-adjust: 100%;\n    margin: 0;\n    color: #24292f;\n    background-color: #ffffff;\n    font-family: Inter,serif;\n    word-wrap: break-word;\n  }\n\n  .octicon {\n    display: inline-block;\n    fill: currentColor;\n    vertical-align: text-bottom;\n  }\n\n  h1:hover .anchor .octicon-link:before,\n  h2:hover .anchor .octicon-link:before,\n  h3:hover .anchor .octicon-link:before,\n  h4:hover .anchor .octicon-link:before,\n  h5:hover .anchor .octicon-link:before,\n  h6:hover .anchor .octicon-link:before {\n    width: 16px;\n    height: 16px;\n    content: ' ';\n    display: inline-block;\n    background-color: currentColor;\n    -webkit-mask-image: url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>\");\n    mask-image: url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>\");\n  }\n\n  details,\n  figcaption,\n  figure {\n    display: block;\n  }\n\n  summary {\n    display: list-item;\n  }\n\n  [hidden] {\n    display: none !important;\n  }\n\n  a {\n    background-color: transparent;\n    color: #0969da;\n    text-decoration: none;\n  }\n\n  a:active,\n  a:hover {\n    outline-width: 0;\n  }\n\n  abbr[title] {\n    border-bottom: none;\n    text-decoration: underline dotted;\n  }\n\n  b,\n  strong {\n    font-weight: 600;\n  }\n\n  dfn {\n    font-style: italic;\n  }\n\n  h1 {\n    margin: .67em 0;\n    font-weight: 600;\n    padding-bottom: .3em;\n    font-size: 2em;\n    border-bottom: 1px solid hsla(210,18%,87%,1);\n  }\n\n  mark {\n    background-color: #fff8c5;\n    color: #24292f;\n  }\n\n  small {\n    font-size: 90%;\n  }\n\n  sub,\n  sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n\n  sub {\n    bottom: -0.25em;\n  }\n\n  sup {\n    top: -0.5em;\n  }\n\n  img {\n    border-style: none;\n    max-width: 100%;\n    box-sizing: content-box;\n    background-color: #ffffff;\n  }\n\n  code,\n  kbd,\n  pre,\n  samp {\n    font-family: monospace,monospace;\n    font-size: 1em;\n  }\n\n  figure {\n    margin: 1em 40px;\n  }\n\n  hr {\n    box-sizing: content-box;\n    overflow: hidden;\n    background: transparent;\n    border-bottom: 1px solid hsla(210,18%,87%,1);\n    height: .25em;\n    padding: 0;\n    margin: 24px 0;\n    background-color: #d0d7de;\n    border: 0;\n  }\n\n  input {\n    font: inherit;\n    margin: 0;\n    overflow: visible;\n    font-family: inherit;\n    font-size: inherit;\n    line-height: inherit;\n  }\n\n  [type=button],\n  [type=reset],\n  [type=submit] {\n    -webkit-appearance: button;\n  }\n\n  [type=button]::-moz-focus-inner,\n  [type=reset]::-moz-focus-inner,\n  [type=submit]::-moz-focus-inner {\n    border-style: none;\n    padding: 0;\n  }\n\n  [type=button]:-moz-focusring,\n  [type=reset]:-moz-focusring,\n  [type=submit]:-moz-focusring {\n    outline: 1px dotted ButtonText;\n  }\n\n  [type=checkbox],\n  [type=radio] {\n    box-sizing: border-box;\n    padding: 0;\n  }\n\n  [type=number]::-webkit-inner-spin-button,\n  [type=number]::-webkit-outer-spin-button {\n    height: auto;\n  }\n\n  [type=search] {\n    -webkit-appearance: textfield;\n    outline-offset: -2px;\n  }\n\n  [type=search]::-webkit-search-cancel-button,\n  [type=search]::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  ::-webkit-input-placeholder {\n    color: inherit;\n    opacity: .54;\n  }\n\n  ::-webkit-file-upload-button {\n    -webkit-appearance: button;\n    font: inherit;\n  }\n\n  a:hover {\n    text-decoration: underline;\n  }\n\n  hr::before {\n    display: table;\n    content: \"\";\n  }\n\n  hr::after {\n    display: table;\n    clear: both;\n    content: \"\";\n  }\n\n  table {\n    border-spacing: 0;\n    border-collapse: collapse;\n    display: block;\n    width: max-content;\n    max-width: 100%;\n    overflow: auto;\n  }\n\n  td,\n  th {\n    padding: 0;\n  }\n\n  details summary {\n    cursor: pointer;\n  }\n\n  details:not([open])>*:not(summary) {\n    display: none !important;\n  }\n\n  kbd {\n    display: inline-block;\n    padding: 3px 5px;\n    font: 11px ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;\n    line-height: 10px;\n    color: #24292f;\n    vertical-align: middle;\n    background-color: #f6f8fa;\n    border: solid 1px rgba(175,184,193,0.2);\n    border-bottom-color: rgba(175,184,193,0.2);\n    border-radius: 6px;\n    box-shadow: inset 0 -1px 0 rgba(175,184,193,0.2);\n  }\n\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    margin-top: 24px;\n    margin-bottom: 16px;\n    font-weight: 600;\n    line-height: 1.25;\n  }\n\n  h2 {\n    font-weight: 600;\n    padding-bottom: .3em;\n    font-size: 1.5em;\n    border-bottom: 1px solid hsla(210,18%,87%,1);\n  }\n\n  h3 {\n    font-weight: 600;\n    font-size: 1.25em;\n  }\n\n  h4 {\n    font-weight: 600;\n    font-size: 1em;\n  }\n\n  h5 {\n    font-weight: 600;\n    font-size: .875em;\n  }\n\n  h6 {\n    font-weight: 600;\n    font-size: .85em;\n    color: #57606a;\n  }\n\n  p {\n    margin-top: 0;\n    margin-bottom: 10px;\n  }\n\n  blockquote {\n    margin: 0;\n    padding: 0 1em;\n    color: #57606a;\n    border-left: .25em solid #d0d7de;\n  }\n\n  ul,\n  ol {\n    margin-top: 0;\n    margin-bottom: 0;\n    padding-left: 2em;\n  }\n\n  ol ol,\n  ul ol {\n    list-style-type: lower-roman;\n  }\n\n  ul ul ol,\n  ul ol ol,\n  ol ul ol,\n  ol ol ol {\n    list-style-type: lower-alpha;\n  }\n\n  dd {\n    margin-left: 0;\n  }\n\n  tt,\n  code {\n    font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;\n    font-size: 12px;\n  }\n\n  pre {\n    margin-top: 0;\n    margin-bottom: 0;\n    font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;\n    font-size: 12px;\n    word-wrap: normal;\n  }\n\n  .octicon {\n    display: inline-block;\n    overflow: visible !important;\n    vertical-align: text-bottom;\n    fill: currentColor;\n  }\n\n  ::placeholder {\n    color: #6e7781;\n    opacity: 1;\n  }\n\n  input::-webkit-outer-spin-button,\n  input::-webkit-inner-spin-button {\n    margin: 0;\n    -webkit-appearance: none;\n    appearance: none;\n  }\n\n  .pl-c {\n    color: #6e7781;\n  }\n\n  .pl-c1,\n  .pl-s .pl-v {\n    color: #0550ae;\n  }\n\n  .pl-e,\n  .pl-en {\n    color: #8250df;\n  }\n\n  .pl-smi,\n  .pl-s .pl-s1 {\n    color: #24292f;\n  }\n\n  .pl-ent {\n    color: #116329;\n  }\n\n  .pl-k {\n    color: #cf222e;\n  }\n\n  .pl-s,\n  .pl-pds,\n  .pl-s .pl-pse .pl-s1,\n  .pl-sr,\n  .pl-sr .pl-cce,\n  .pl-sr .pl-sre,\n  .pl-sr .pl-sra {\n    color: #0a3069;\n  }\n\n  .pl-v,\n  .pl-smw {\n    color: #953800;\n  }\n\n  .pl-bu {\n    color: #82071e;\n  }\n\n  .pl-ii {\n    color: #f6f8fa;\n    background-color: #82071e;\n  }\n\n  .pl-c2 {\n    color: #f6f8fa;\n    background-color: #cf222e;\n  }\n\n  .pl-sr .pl-cce {\n    font-weight: bold;\n    color: #116329;\n  }\n\n  .pl-ml {\n    color: #3b2300;\n  }\n\n  .pl-mh,\n  .pl-mh .pl-en,\n  .pl-ms {\n    font-weight: bold;\n    color: #0550ae;\n  }\n\n  .pl-mi {\n    font-style: italic;\n    color: #24292f;\n  }\n\n  .pl-mb {\n    font-weight: bold;\n    color: #24292f;\n  }\n\n  .pl-md {\n    color: #82071e;\n    background-color: #FFEBE9;\n  }\n\n  .pl-mi1 {\n    color: #116329;\n    background-color: #dafbe1;\n  }\n\n  .pl-mc {\n    color: #953800;\n    background-color: #ffd8b5;\n  }\n\n  .pl-mi2 {\n    color: #eaeef2;\n    background-color: #0550ae;\n  }\n\n  .pl-mdr {\n    font-weight: bold;\n    color: #8250df;\n  }\n\n  .pl-ba {\n    color: #57606a;\n  }\n\n  .pl-sg {\n    color: #8c959f;\n  }\n\n  .pl-corl {\n    text-decoration: underline;\n    color: #0a3069;\n  }\n\n  [data-catalyst] {\n    display: block;\n  }\n\n  .markdown-body::before {\n    display: table;\n    content: \"\";\n  }\n\n  .markdown-body::after {\n    display: table;\n    clear: both;\n    content: \"\";\n  }\n\n  .markdown-body>*:first-child {\n    margin-top: 0 !important;\n  }\n\n  .markdown-body>*:last-child {\n    margin-bottom: 0 !important;\n  }\n\n  a:not([href]) {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  .absent {\n    color: #cf222e;\n  }\n\n  .anchor {\n    float: left;\n    padding-right: 4px;\n    margin-left: -20px;\n    line-height: 1;\n  }\n\n  .anchor:focus {\n    outline: none;\n  }\n\n  p,\n  blockquote,\n  ul,\n  ol,\n  dl,\n  table,\n  pre,\n  details {\n    margin-top: 0;\n    margin-bottom: 16px;\n  }\n\n  blockquote>:first-child {\n    margin-top: 0;\n  }\n\n  blockquote>:last-child {\n    margin-bottom: 0;\n  }\n\n  sup>a::before {\n    content: \"[\";\n  }\n\n  sup>a::after {\n    content: \"]\";\n  }\n\n  h1 .octicon-link,\n  h2 .octicon-link,\n  h3 .octicon-link,\n  h4 .octicon-link,\n  h5 .octicon-link,\n  h6 .octicon-link {\n    color: #24292f;\n    vertical-align: middle;\n    visibility: hidden;\n  }\n\n  h1:hover .anchor,\n  h2:hover .anchor,\n  h3:hover .anchor,\n  h4:hover .anchor,\n  h5:hover .anchor,\n  h6:hover .anchor {\n    text-decoration: none;\n  }\n\n  h1:hover .anchor .octicon-link,\n  h2:hover .anchor .octicon-link,\n  h3:hover .anchor .octicon-link,\n  h4:hover .anchor .octicon-link,\n  h5:hover .anchor .octicon-link,\n  h6:hover .anchor .octicon-link {\n    visibility: visible;\n  }\n\n  h1 tt,\n  h1 code,\n  h2 tt,\n  h2 code,\n  h3 tt,\n  h3 code,\n  h4 tt,\n  h4 code,\n  h5 tt,\n  h5 code,\n  h6 tt,\n  h6 code {\n    padding: 0 .2em;\n    font-size: inherit;\n  }\n\n  ul.no-list,\n  ol.no-list {\n    padding: 0;\n    list-style-type: none;\n  }\n\n  ol[type=\"1\"] {\n    list-style-type: decimal;\n  }\n\n  ol[type=a] {\n    list-style-type: lower-alpha;\n  }\n\n  ol[type=i] {\n    list-style-type: lower-roman;\n  }\n\n  div>ol:not([type]) {\n    list-style-type: decimal;\n  }\n\n  ul ul,\n  ul ol,\n  ol ol,\n  ol ul {\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n\n  li>p {\n    margin-top: 16px;\n  }\n\n  li+li {\n    margin-top: .25em;\n  }\n\n  dl {\n    padding: 0;\n  }\n\n  dl dt {\n    padding: 0;\n    margin-top: 16px;\n    font-size: 1em;\n    font-style: italic;\n    font-weight: 600;\n  }\n\n  dl dd {\n    padding: 0 16px;\n    margin-bottom: 16px;\n  }\n\n  table th {\n    font-weight: 600;\n  }\n\n  table th,\n  table td {\n    padding: 6px 13px;\n    border: 1px solid #d0d7de;\n  }\n\n  table tr {\n    background-color: #ffffff;\n    border-top: 1px solid hsla(210,18%,87%,1);\n  }\n\n  table tr:nth-child(2n) {\n    background-color: #f6f8fa;\n  }\n\n  table img {\n    background-color: transparent;\n  }\n\n  img[align=right] {\n    padding-left: 20px;\n  }\n\n  img[align=left] {\n    padding-right: 20px;\n  }\n\n  .emoji {\n    max-width: none;\n    vertical-align: text-top;\n    background-color: transparent;\n  }\n\n  span.frame {\n    display: block;\n    overflow: hidden;\n  }\n\n  span.frame>span {\n    display: block;\n    float: left;\n    width: auto;\n    padding: 7px;\n    margin: 13px 0 0;\n    overflow: hidden;\n    border: 1px solid #d0d7de;\n  }\n\n  span.frame span img {\n    display: block;\n    float: left;\n  }\n\n  span.frame span span {\n    display: block;\n    padding: 5px 0 0;\n    clear: both;\n    color: #24292f;\n  }\n\n  span.align-center {\n    display: block;\n    overflow: hidden;\n    clear: both;\n  }\n\n  span.align-center>span {\n    display: block;\n    margin: 13px auto 0;\n    overflow: hidden;\n    text-align: center;\n  }\n\n  span.align-center span img {\n    margin: 0 auto;\n    text-align: center;\n  }\n\n  span.align-right {\n    display: block;\n    overflow: hidden;\n    clear: both;\n  }\n\n  span.align-right>span {\n    display: block;\n    margin: 13px 0 0;\n    overflow: hidden;\n    text-align: right;\n  }\n\n  span.align-right span img {\n    margin: 0;\n    text-align: right;\n  }\n\n  span.float-left {\n    display: block;\n    float: left;\n    margin-right: 13px;\n    overflow: hidden;\n  }\n\n  span.float-left span {\n    margin: 13px 0 0;\n  }\n\n  span.float-right {\n    display: block;\n    float: right;\n    margin-left: 13px;\n    overflow: hidden;\n  }\n\n  span.float-right>span {\n    display: block;\n    margin: 13px auto 0;\n    overflow: hidden;\n    text-align: right;\n  }\n\n  code,\n  tt {\n    padding: .2em .4em;\n    margin: 0;\n    font-size: 85%;\n    background-color: rgba(175,184,193,0.2);\n    border-radius: 6px;\n  }\n\n  code br,\n  tt br {\n    display: none;\n  }\n\n  del code {\n    text-decoration: inherit;\n  }\n\n  pre code {\n    font-size: 100%;\n  }\n\n  pre>code {\n    padding: 0;\n    margin: 0;\n    word-break: normal;\n    white-space: pre;\n    background: transparent;\n    border: 0;\n  }\n\n  .highlight {\n    margin-bottom: 16px;\n  }\n\n  .highlight pre {\n    margin-bottom: 0;\n    word-break: normal;\n  }\n\n  .highlight pre,\n  pre {\n    padding: 16px;\n    overflow: auto;\n    font-size: 85%;\n    line-height: 1.45;\n    background-color: #f6f8fa;\n    border-radius: 6px;\n  }\n\n  pre code,\n  pre tt {\n    display: inline;\n    max-width: auto;\n    padding: 0;\n    margin: 0;\n    overflow: visible;\n    line-height: inherit;\n    word-wrap: normal;\n    background-color: transparent;\n    border: 0;\n  }\n\n  .csv-data td,\n  .csv-data th {\n    padding: 5px;\n    overflow: hidden;\n    font-size: 12px;\n    line-height: 1;\n    text-align: left;\n    white-space: nowrap;\n  }\n\n  .csv-data .blob-num {\n    padding: 10px 8px 9px;\n    text-align: right;\n    background: #ffffff;\n    border: 0;\n  }\n\n  .csv-data tr {\n    border-top: 0;\n  }\n\n  .csv-data th {\n    font-weight: 600;\n    background: #f6f8fa;\n    border-top: 0;\n  }\n\n  .footnotes {\n    font-size: 12px;\n    color: #57606a;\n    border-top: 1px solid #d0d7de;\n  }\n\n  .footnotes ol {\n    padding-left: 16px;\n  }\n\n  .footnotes li {\n    position: relative;\n  }\n\n  .footnotes li:target::before {\n    position: absolute;\n    top: -8px;\n    right: -8px;\n    bottom: -8px;\n    left: -24px;\n    pointer-events: none;\n    content: \"\";\n    border: 2px solid #0969da;\n    border-radius: 6px;\n  }\n\n  .footnotes li:target {\n    color: #24292f;\n  }\n\n  .footnotes .data-footnote-backref g-emoji {\n    font-family: monospace;\n  }\n\n  .task-list-item {\n    list-style-type: none;\n  }\n\n  .task-list-item label {\n    font-weight: 400;\n  }\n\n  .task-list-item.enabled label {\n    cursor: pointer;\n  }\n\n  .task-list-item+.task-list-item {\n    margin-top: 3px;\n  }\n\n  .task-list-item .handle {\n    display: none;\n  }\n\n  .task-list-item-checkbox {\n    margin: 0 .2em .25em -1.6em;\n    vertical-align: middle;\n  }\n\n  .contains-task-list:dir(rtl) .task-list-item-checkbox {\n    margin: 0 -1.6em .25em .2em;\n  }\n\n  ::-webkit-calendar-picker-indicator {\n    filter: invert(50%);\n  }\n  \n  p {\n    line-height: 24px;\n  }\n\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    color: black;\n    background: none;\n    text-shadow: 0 1px white;\n    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n    font-size: 1em;\n    text-align: left;\n    white-space: pre;\n    word-spacing: normal;\n    word-break: normal;\n    word-wrap: normal;\n    line-height: 1.5;\n\n    -moz-tab-size: 4;\n    -o-tab-size: 4;\n    tab-size: 4;\n\n    -webkit-hyphens: none;\n    -moz-hyphens: none;\n    -ms-hyphens: none;\n    hyphens: none;\n  }\n\n  pre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\n  code[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n    text-shadow: none;\n    background: #b3d4fc;\n  }\n\n  pre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\n  code[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n    text-shadow: none;\n    background: #b3d4fc;\n  }\n\n  @media print {\n    code[class*=\"language-\"],\n    pre[class*=\"language-\"] {\n      text-shadow: none;\n    }\n  }\n\n  /* Code blocks */\n\n  pre[class*=\"language-\"] {\n    padding: 1em;\n    margin: .5em 0;\n    overflow: auto;\n  }\n\n  :not(pre) > code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    background: #f5f2f0;\n  }\n\n  /* Inline code */\n\n  :not(pre) > code[class*=\"language-\"] {\n    padding: .1em;\n    border-radius: .3em;\n    white-space: normal;\n  }\n\n  .token.comment,\n  .token.prolog,\n  .token.doctype,\n  .token.cdata {\n    color: slategray;\n  }\n\n  .token.punctuation {\n    color: #999;\n  }\n\n  .token.namespace {\n    opacity: .7;\n  }\n\n  .token.property,\n  .token.tag,\n  .token.boolean,\n  .token.number,\n  .token.constant,\n  .token.symbol,\n  .token.deleted {\n    color: #905;\n  }\n\n  .token.selector,\n  .token.attr-name,\n  .token.string,\n  .token.char,\n  .token.builtin,\n  .token.inserted {\n    color: #690;\n  }\n\n  .token.operator,\n  .token.entity,\n  .token.url,\n  .language-css .token.string,\n  .style .token.string {\n    color: #9a6e3a;\n    /* This background color was intended by the author of this theme. */\n    background: hsla(0, 0%, 100%, .5);\n  }\n\n  .token.atrule,\n  .token.attr-value,\n  .token.keyword {\n    color: #07a;\n  }\n\n  .token.function,\n  .token.class-name {\n    color: #DD4A68;\n  }\n\n  .token.regex,\n  .token.important,\n  .token.variable {\n    color: #e90;\n  }\n\n  .token.important,\n  .token.bold {\n    font-weight: bold;\n  }\n\n  .token.italic {\n    font-style: italic;\n  }\n\n  .token.entity {\n    cursor: help;\n  }\n"], ["\n  font-size: 14px;\n  font-weight: normal;\n  color: #1e2134;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background-color: transparent;\n\n  {\n    -ms-text-size-adjust: 100%;\n    -webkit-text-size-adjust: 100%;\n    margin: 0;\n    color: #24292f;\n    background-color: #ffffff;\n    font-family: Inter,serif;\n    word-wrap: break-word;\n  }\n\n  .octicon {\n    display: inline-block;\n    fill: currentColor;\n    vertical-align: text-bottom;\n  }\n\n  h1:hover .anchor .octicon-link:before,\n  h2:hover .anchor .octicon-link:before,\n  h3:hover .anchor .octicon-link:before,\n  h4:hover .anchor .octicon-link:before,\n  h5:hover .anchor .octicon-link:before,\n  h6:hover .anchor .octicon-link:before {\n    width: 16px;\n    height: 16px;\n    content: ' ';\n    display: inline-block;\n    background-color: currentColor;\n    -webkit-mask-image: url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>\");\n    mask-image: url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>\");\n  }\n\n  details,\n  figcaption,\n  figure {\n    display: block;\n  }\n\n  summary {\n    display: list-item;\n  }\n\n  [hidden] {\n    display: none !important;\n  }\n\n  a {\n    background-color: transparent;\n    color: #0969da;\n    text-decoration: none;\n  }\n\n  a:active,\n  a:hover {\n    outline-width: 0;\n  }\n\n  abbr[title] {\n    border-bottom: none;\n    text-decoration: underline dotted;\n  }\n\n  b,\n  strong {\n    font-weight: 600;\n  }\n\n  dfn {\n    font-style: italic;\n  }\n\n  h1 {\n    margin: .67em 0;\n    font-weight: 600;\n    padding-bottom: .3em;\n    font-size: 2em;\n    border-bottom: 1px solid hsla(210,18%,87%,1);\n  }\n\n  mark {\n    background-color: #fff8c5;\n    color: #24292f;\n  }\n\n  small {\n    font-size: 90%;\n  }\n\n  sub,\n  sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n\n  sub {\n    bottom: -0.25em;\n  }\n\n  sup {\n    top: -0.5em;\n  }\n\n  img {\n    border-style: none;\n    max-width: 100%;\n    box-sizing: content-box;\n    background-color: #ffffff;\n  }\n\n  code,\n  kbd,\n  pre,\n  samp {\n    font-family: monospace,monospace;\n    font-size: 1em;\n  }\n\n  figure {\n    margin: 1em 40px;\n  }\n\n  hr {\n    box-sizing: content-box;\n    overflow: hidden;\n    background: transparent;\n    border-bottom: 1px solid hsla(210,18%,87%,1);\n    height: .25em;\n    padding: 0;\n    margin: 24px 0;\n    background-color: #d0d7de;\n    border: 0;\n  }\n\n  input {\n    font: inherit;\n    margin: 0;\n    overflow: visible;\n    font-family: inherit;\n    font-size: inherit;\n    line-height: inherit;\n  }\n\n  [type=button],\n  [type=reset],\n  [type=submit] {\n    -webkit-appearance: button;\n  }\n\n  [type=button]::-moz-focus-inner,\n  [type=reset]::-moz-focus-inner,\n  [type=submit]::-moz-focus-inner {\n    border-style: none;\n    padding: 0;\n  }\n\n  [type=button]:-moz-focusring,\n  [type=reset]:-moz-focusring,\n  [type=submit]:-moz-focusring {\n    outline: 1px dotted ButtonText;\n  }\n\n  [type=checkbox],\n  [type=radio] {\n    box-sizing: border-box;\n    padding: 0;\n  }\n\n  [type=number]::-webkit-inner-spin-button,\n  [type=number]::-webkit-outer-spin-button {\n    height: auto;\n  }\n\n  [type=search] {\n    -webkit-appearance: textfield;\n    outline-offset: -2px;\n  }\n\n  [type=search]::-webkit-search-cancel-button,\n  [type=search]::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  ::-webkit-input-placeholder {\n    color: inherit;\n    opacity: .54;\n  }\n\n  ::-webkit-file-upload-button {\n    -webkit-appearance: button;\n    font: inherit;\n  }\n\n  a:hover {\n    text-decoration: underline;\n  }\n\n  hr::before {\n    display: table;\n    content: \"\";\n  }\n\n  hr::after {\n    display: table;\n    clear: both;\n    content: \"\";\n  }\n\n  table {\n    border-spacing: 0;\n    border-collapse: collapse;\n    display: block;\n    width: max-content;\n    max-width: 100%;\n    overflow: auto;\n  }\n\n  td,\n  th {\n    padding: 0;\n  }\n\n  details summary {\n    cursor: pointer;\n  }\n\n  details:not([open])>*:not(summary) {\n    display: none !important;\n  }\n\n  kbd {\n    display: inline-block;\n    padding: 3px 5px;\n    font: 11px ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;\n    line-height: 10px;\n    color: #24292f;\n    vertical-align: middle;\n    background-color: #f6f8fa;\n    border: solid 1px rgba(175,184,193,0.2);\n    border-bottom-color: rgba(175,184,193,0.2);\n    border-radius: 6px;\n    box-shadow: inset 0 -1px 0 rgba(175,184,193,0.2);\n  }\n\n  h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    margin-top: 24px;\n    margin-bottom: 16px;\n    font-weight: 600;\n    line-height: 1.25;\n  }\n\n  h2 {\n    font-weight: 600;\n    padding-bottom: .3em;\n    font-size: 1.5em;\n    border-bottom: 1px solid hsla(210,18%,87%,1);\n  }\n\n  h3 {\n    font-weight: 600;\n    font-size: 1.25em;\n  }\n\n  h4 {\n    font-weight: 600;\n    font-size: 1em;\n  }\n\n  h5 {\n    font-weight: 600;\n    font-size: .875em;\n  }\n\n  h6 {\n    font-weight: 600;\n    font-size: .85em;\n    color: #57606a;\n  }\n\n  p {\n    margin-top: 0;\n    margin-bottom: 10px;\n  }\n\n  blockquote {\n    margin: 0;\n    padding: 0 1em;\n    color: #57606a;\n    border-left: .25em solid #d0d7de;\n  }\n\n  ul,\n  ol {\n    margin-top: 0;\n    margin-bottom: 0;\n    padding-left: 2em;\n  }\n\n  ol ol,\n  ul ol {\n    list-style-type: lower-roman;\n  }\n\n  ul ul ol,\n  ul ol ol,\n  ol ul ol,\n  ol ol ol {\n    list-style-type: lower-alpha;\n  }\n\n  dd {\n    margin-left: 0;\n  }\n\n  tt,\n  code {\n    font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;\n    font-size: 12px;\n  }\n\n  pre {\n    margin-top: 0;\n    margin-bottom: 0;\n    font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;\n    font-size: 12px;\n    word-wrap: normal;\n  }\n\n  .octicon {\n    display: inline-block;\n    overflow: visible !important;\n    vertical-align: text-bottom;\n    fill: currentColor;\n  }\n\n  ::placeholder {\n    color: #6e7781;\n    opacity: 1;\n  }\n\n  input::-webkit-outer-spin-button,\n  input::-webkit-inner-spin-button {\n    margin: 0;\n    -webkit-appearance: none;\n    appearance: none;\n  }\n\n  .pl-c {\n    color: #6e7781;\n  }\n\n  .pl-c1,\n  .pl-s .pl-v {\n    color: #0550ae;\n  }\n\n  .pl-e,\n  .pl-en {\n    color: #8250df;\n  }\n\n  .pl-smi,\n  .pl-s .pl-s1 {\n    color: #24292f;\n  }\n\n  .pl-ent {\n    color: #116329;\n  }\n\n  .pl-k {\n    color: #cf222e;\n  }\n\n  .pl-s,\n  .pl-pds,\n  .pl-s .pl-pse .pl-s1,\n  .pl-sr,\n  .pl-sr .pl-cce,\n  .pl-sr .pl-sre,\n  .pl-sr .pl-sra {\n    color: #0a3069;\n  }\n\n  .pl-v,\n  .pl-smw {\n    color: #953800;\n  }\n\n  .pl-bu {\n    color: #82071e;\n  }\n\n  .pl-ii {\n    color: #f6f8fa;\n    background-color: #82071e;\n  }\n\n  .pl-c2 {\n    color: #f6f8fa;\n    background-color: #cf222e;\n  }\n\n  .pl-sr .pl-cce {\n    font-weight: bold;\n    color: #116329;\n  }\n\n  .pl-ml {\n    color: #3b2300;\n  }\n\n  .pl-mh,\n  .pl-mh .pl-en,\n  .pl-ms {\n    font-weight: bold;\n    color: #0550ae;\n  }\n\n  .pl-mi {\n    font-style: italic;\n    color: #24292f;\n  }\n\n  .pl-mb {\n    font-weight: bold;\n    color: #24292f;\n  }\n\n  .pl-md {\n    color: #82071e;\n    background-color: #FFEBE9;\n  }\n\n  .pl-mi1 {\n    color: #116329;\n    background-color: #dafbe1;\n  }\n\n  .pl-mc {\n    color: #953800;\n    background-color: #ffd8b5;\n  }\n\n  .pl-mi2 {\n    color: #eaeef2;\n    background-color: #0550ae;\n  }\n\n  .pl-mdr {\n    font-weight: bold;\n    color: #8250df;\n  }\n\n  .pl-ba {\n    color: #57606a;\n  }\n\n  .pl-sg {\n    color: #8c959f;\n  }\n\n  .pl-corl {\n    text-decoration: underline;\n    color: #0a3069;\n  }\n\n  [data-catalyst] {\n    display: block;\n  }\n\n  .markdown-body::before {\n    display: table;\n    content: \"\";\n  }\n\n  .markdown-body::after {\n    display: table;\n    clear: both;\n    content: \"\";\n  }\n\n  .markdown-body>*:first-child {\n    margin-top: 0 !important;\n  }\n\n  .markdown-body>*:last-child {\n    margin-bottom: 0 !important;\n  }\n\n  a:not([href]) {\n    color: inherit;\n    text-decoration: none;\n  }\n\n  .absent {\n    color: #cf222e;\n  }\n\n  .anchor {\n    float: left;\n    padding-right: 4px;\n    margin-left: -20px;\n    line-height: 1;\n  }\n\n  .anchor:focus {\n    outline: none;\n  }\n\n  p,\n  blockquote,\n  ul,\n  ol,\n  dl,\n  table,\n  pre,\n  details {\n    margin-top: 0;\n    margin-bottom: 16px;\n  }\n\n  blockquote>:first-child {\n    margin-top: 0;\n  }\n\n  blockquote>:last-child {\n    margin-bottom: 0;\n  }\n\n  sup>a::before {\n    content: \"[\";\n  }\n\n  sup>a::after {\n    content: \"]\";\n  }\n\n  h1 .octicon-link,\n  h2 .octicon-link,\n  h3 .octicon-link,\n  h4 .octicon-link,\n  h5 .octicon-link,\n  h6 .octicon-link {\n    color: #24292f;\n    vertical-align: middle;\n    visibility: hidden;\n  }\n\n  h1:hover .anchor,\n  h2:hover .anchor,\n  h3:hover .anchor,\n  h4:hover .anchor,\n  h5:hover .anchor,\n  h6:hover .anchor {\n    text-decoration: none;\n  }\n\n  h1:hover .anchor .octicon-link,\n  h2:hover .anchor .octicon-link,\n  h3:hover .anchor .octicon-link,\n  h4:hover .anchor .octicon-link,\n  h5:hover .anchor .octicon-link,\n  h6:hover .anchor .octicon-link {\n    visibility: visible;\n  }\n\n  h1 tt,\n  h1 code,\n  h2 tt,\n  h2 code,\n  h3 tt,\n  h3 code,\n  h4 tt,\n  h4 code,\n  h5 tt,\n  h5 code,\n  h6 tt,\n  h6 code {\n    padding: 0 .2em;\n    font-size: inherit;\n  }\n\n  ul.no-list,\n  ol.no-list {\n    padding: 0;\n    list-style-type: none;\n  }\n\n  ol[type=\"1\"] {\n    list-style-type: decimal;\n  }\n\n  ol[type=a] {\n    list-style-type: lower-alpha;\n  }\n\n  ol[type=i] {\n    list-style-type: lower-roman;\n  }\n\n  div>ol:not([type]) {\n    list-style-type: decimal;\n  }\n\n  ul ul,\n  ul ol,\n  ol ol,\n  ol ul {\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n\n  li>p {\n    margin-top: 16px;\n  }\n\n  li+li {\n    margin-top: .25em;\n  }\n\n  dl {\n    padding: 0;\n  }\n\n  dl dt {\n    padding: 0;\n    margin-top: 16px;\n    font-size: 1em;\n    font-style: italic;\n    font-weight: 600;\n  }\n\n  dl dd {\n    padding: 0 16px;\n    margin-bottom: 16px;\n  }\n\n  table th {\n    font-weight: 600;\n  }\n\n  table th,\n  table td {\n    padding: 6px 13px;\n    border: 1px solid #d0d7de;\n  }\n\n  table tr {\n    background-color: #ffffff;\n    border-top: 1px solid hsla(210,18%,87%,1);\n  }\n\n  table tr:nth-child(2n) {\n    background-color: #f6f8fa;\n  }\n\n  table img {\n    background-color: transparent;\n  }\n\n  img[align=right] {\n    padding-left: 20px;\n  }\n\n  img[align=left] {\n    padding-right: 20px;\n  }\n\n  .emoji {\n    max-width: none;\n    vertical-align: text-top;\n    background-color: transparent;\n  }\n\n  span.frame {\n    display: block;\n    overflow: hidden;\n  }\n\n  span.frame>span {\n    display: block;\n    float: left;\n    width: auto;\n    padding: 7px;\n    margin: 13px 0 0;\n    overflow: hidden;\n    border: 1px solid #d0d7de;\n  }\n\n  span.frame span img {\n    display: block;\n    float: left;\n  }\n\n  span.frame span span {\n    display: block;\n    padding: 5px 0 0;\n    clear: both;\n    color: #24292f;\n  }\n\n  span.align-center {\n    display: block;\n    overflow: hidden;\n    clear: both;\n  }\n\n  span.align-center>span {\n    display: block;\n    margin: 13px auto 0;\n    overflow: hidden;\n    text-align: center;\n  }\n\n  span.align-center span img {\n    margin: 0 auto;\n    text-align: center;\n  }\n\n  span.align-right {\n    display: block;\n    overflow: hidden;\n    clear: both;\n  }\n\n  span.align-right>span {\n    display: block;\n    margin: 13px 0 0;\n    overflow: hidden;\n    text-align: right;\n  }\n\n  span.align-right span img {\n    margin: 0;\n    text-align: right;\n  }\n\n  span.float-left {\n    display: block;\n    float: left;\n    margin-right: 13px;\n    overflow: hidden;\n  }\n\n  span.float-left span {\n    margin: 13px 0 0;\n  }\n\n  span.float-right {\n    display: block;\n    float: right;\n    margin-left: 13px;\n    overflow: hidden;\n  }\n\n  span.float-right>span {\n    display: block;\n    margin: 13px auto 0;\n    overflow: hidden;\n    text-align: right;\n  }\n\n  code,\n  tt {\n    padding: .2em .4em;\n    margin: 0;\n    font-size: 85%;\n    background-color: rgba(175,184,193,0.2);\n    border-radius: 6px;\n  }\n\n  code br,\n  tt br {\n    display: none;\n  }\n\n  del code {\n    text-decoration: inherit;\n  }\n\n  pre code {\n    font-size: 100%;\n  }\n\n  pre>code {\n    padding: 0;\n    margin: 0;\n    word-break: normal;\n    white-space: pre;\n    background: transparent;\n    border: 0;\n  }\n\n  .highlight {\n    margin-bottom: 16px;\n  }\n\n  .highlight pre {\n    margin-bottom: 0;\n    word-break: normal;\n  }\n\n  .highlight pre,\n  pre {\n    padding: 16px;\n    overflow: auto;\n    font-size: 85%;\n    line-height: 1.45;\n    background-color: #f6f8fa;\n    border-radius: 6px;\n  }\n\n  pre code,\n  pre tt {\n    display: inline;\n    max-width: auto;\n    padding: 0;\n    margin: 0;\n    overflow: visible;\n    line-height: inherit;\n    word-wrap: normal;\n    background-color: transparent;\n    border: 0;\n  }\n\n  .csv-data td,\n  .csv-data th {\n    padding: 5px;\n    overflow: hidden;\n    font-size: 12px;\n    line-height: 1;\n    text-align: left;\n    white-space: nowrap;\n  }\n\n  .csv-data .blob-num {\n    padding: 10px 8px 9px;\n    text-align: right;\n    background: #ffffff;\n    border: 0;\n  }\n\n  .csv-data tr {\n    border-top: 0;\n  }\n\n  .csv-data th {\n    font-weight: 600;\n    background: #f6f8fa;\n    border-top: 0;\n  }\n\n  .footnotes {\n    font-size: 12px;\n    color: #57606a;\n    border-top: 1px solid #d0d7de;\n  }\n\n  .footnotes ol {\n    padding-left: 16px;\n  }\n\n  .footnotes li {\n    position: relative;\n  }\n\n  .footnotes li:target::before {\n    position: absolute;\n    top: -8px;\n    right: -8px;\n    bottom: -8px;\n    left: -24px;\n    pointer-events: none;\n    content: \"\";\n    border: 2px solid #0969da;\n    border-radius: 6px;\n  }\n\n  .footnotes li:target {\n    color: #24292f;\n  }\n\n  .footnotes .data-footnote-backref g-emoji {\n    font-family: monospace;\n  }\n\n  .task-list-item {\n    list-style-type: none;\n  }\n\n  .task-list-item label {\n    font-weight: 400;\n  }\n\n  .task-list-item.enabled label {\n    cursor: pointer;\n  }\n\n  .task-list-item+.task-list-item {\n    margin-top: 3px;\n  }\n\n  .task-list-item .handle {\n    display: none;\n  }\n\n  .task-list-item-checkbox {\n    margin: 0 .2em .25em -1.6em;\n    vertical-align: middle;\n  }\n\n  .contains-task-list:dir(rtl) .task-list-item-checkbox {\n    margin: 0 -1.6em .25em .2em;\n  }\n\n  ::-webkit-calendar-picker-indicator {\n    filter: invert(50%);\n  }\n  \n  p {\n    line-height: 24px;\n  }\n\n  code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    color: black;\n    background: none;\n    text-shadow: 0 1px white;\n    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n    font-size: 1em;\n    text-align: left;\n    white-space: pre;\n    word-spacing: normal;\n    word-break: normal;\n    word-wrap: normal;\n    line-height: 1.5;\n\n    -moz-tab-size: 4;\n    -o-tab-size: 4;\n    tab-size: 4;\n\n    -webkit-hyphens: none;\n    -moz-hyphens: none;\n    -ms-hyphens: none;\n    hyphens: none;\n  }\n\n  pre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\n  code[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n    text-shadow: none;\n    background: #b3d4fc;\n  }\n\n  pre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\n  code[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n    text-shadow: none;\n    background: #b3d4fc;\n  }\n\n  @media print {\n    code[class*=\"language-\"],\n    pre[class*=\"language-\"] {\n      text-shadow: none;\n    }\n  }\n\n  /* Code blocks */\n\n  pre[class*=\"language-\"] {\n    padding: 1em;\n    margin: .5em 0;\n    overflow: auto;\n  }\n\n  :not(pre) > code[class*=\"language-\"],\n  pre[class*=\"language-\"] {\n    background: #f5f2f0;\n  }\n\n  /* Inline code */\n\n  :not(pre) > code[class*=\"language-\"] {\n    padding: .1em;\n    border-radius: .3em;\n    white-space: normal;\n  }\n\n  .token.comment,\n  .token.prolog,\n  .token.doctype,\n  .token.cdata {\n    color: slategray;\n  }\n\n  .token.punctuation {\n    color: #999;\n  }\n\n  .token.namespace {\n    opacity: .7;\n  }\n\n  .token.property,\n  .token.tag,\n  .token.boolean,\n  .token.number,\n  .token.constant,\n  .token.symbol,\n  .token.deleted {\n    color: #905;\n  }\n\n  .token.selector,\n  .token.attr-name,\n  .token.string,\n  .token.char,\n  .token.builtin,\n  .token.inserted {\n    color: #690;\n  }\n\n  .token.operator,\n  .token.entity,\n  .token.url,\n  .language-css .token.string,\n  .style .token.string {\n    color: #9a6e3a;\n    /* This background color was intended by the author of this theme. */\n    background: hsla(0, 0%, 100%, .5);\n  }\n\n  .token.atrule,\n  .token.attr-value,\n  .token.keyword {\n    color: #07a;\n  }\n\n  .token.function,\n  .token.class-name {\n    color: #DD4A68;\n  }\n\n  .token.regex,\n  .token.important,\n  .token.variable {\n    color: #e90;\n  }\n\n  .token.important,\n  .token.bold {\n    font-weight: bold;\n  }\n\n  .token.italic {\n    font-style: italic;\n  }\n\n  .token.entity {\n    cursor: help;\n  }\n"])));
var templateObject_1$8, templateObject_2$5, templateObject_3$3, templateObject_4$3;

function MarkdownPreview(props) {
    if (props === void 0) { props = { minHeight: 144 }; }
    var _a = props.content, content = _a === void 0 ? "" : _a, _b = props.allowedTags, allowedTags = _b === void 0 ? sanitizeHtml__default["default"].defaults.allowedTags.concat([
        "img",
        "iframe",
        "br",
        "ins",
        "del"
    ]) : _b, restProps = __rest(props, ["content", "allowedTags"]);
    var html = marked.marked.parse(content, {
        breaks: true,
        highlight: function (code, lang) {
            var _a;
            if (!lang) {
                return code;
            }
            var language = (_a = Prism__default["default"].languages[lang]) !== null && _a !== void 0 ? _a : Prism__default["default"].languages.markup;
            return Prism__default["default"].highlight(code, language, lang);
        }
    });
    var cleanHtml = sanitizeHtml__default["default"](html, {
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
    return (React__default["default"].createElement(MarkdownPreviewWrapper, __assign({}, restProps),
        React__default["default"].createElement(MarkdownBody, { className: "markdown-body", dangerouslySetInnerHTML: { __html: cleanHtml } })));
}

var SuggestionsWrapper = styled__default["default"].ul(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject(["\n  position: absolute;\n  min-width: 180px;\n  padding: 8px 0;\n  margin: 20px 0 0;\n  list-style: none;\n  cursor: pointer;\n  background: #fff;\n  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.06),\n    0px 0.751293px 8px rgba(26, 33, 44, 0.04);\n  color: #506176;\n\n  li {\n    padding: 6px 16px;\n\n    &:hover,\n    &[aria-selected=\"true\"] {\n      background-color: #f0f3f8;\n    }\n  }\n"], ["\n  position: absolute;\n  min-width: 180px;\n  padding: 8px 0;\n  margin: 20px 0 0;\n  list-style: none;\n  cursor: pointer;\n  background: #fff;\n  box-shadow: 0px 4px 31px rgba(26, 33, 44, 0.06),\n    0px 0.751293px 8px rgba(26, 33, 44, 0.04);\n  color: #506176;\n\n  li {\n    padding: 6px 16px;\n\n    &:hover,\n    &[aria-selected=\"true\"] {\n      background-color: #f0f3f8;\n    }\n  }\n"])));
var SuggestionsDropdown = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var suggestions = _a.suggestions, caret = _a.caret, onSuggestionSelected = _a.onSuggestionSelected, suggestionsAutoplace = _a.suggestionsAutoplace, focusIndex = _a.focusIndex, textAreaRef = _a.textAreaRef, _l = _a.max, max = _l === void 0 ? 5 : _l;
    var handleSuggestionClick = function (event) {
        event.preventDefault();
        // @ts-ignore
        var index = parseInt(event.currentTarget.attributes["data-index"].value);
        onSuggestionSelected(index);
    };
    var handleMouseDown = function (event) { return event.preventDefault(); };
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    var left = caret.left - ((_c = (_b = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _b === void 0 ? void 0 : _b.scrollLeft) !== null && _c !== void 0 ? _c : 0) + 30;
    var top = caret.top - ((_e = (_d = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _d === void 0 ? void 0 : _d.scrollTop) !== null && _e !== void 0 ? _e : 0) + 60;
    var style = {};
    style.top = top;
    if (suggestionsAutoplace &&
        left + ((_h = (_g = (_f = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _f === void 0 ? void 0 : _f.getBoundingClientRect()) === null || _g === void 0 ? void 0 : _g.left) !== null && _h !== void 0 ? _h : 0) > vw / 2)
        style.right = ((_k = (_j = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _j === void 0 ? void 0 : _j.offsetWidth) !== null && _k !== void 0 ? _k : 0) - left;
    else
        style.left = left;
    return (React__namespace.createElement(SuggestionsWrapper, { style: style }, suggestions.slice(0, max).map(function (s, i) { return (React__namespace.createElement("li", { onClick: handleSuggestionClick, onMouseDown: handleMouseDown, key: i, "aria-selected": focusIndex === i ? "true" : "false", "data-index": "" + i }, s.preview)); })));
};
var templateObject_1$7;

var EditorWrapper = styled__default["default"].div(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  border-top: 1px solid #e2e8f0;\n  border-bottom: 1px solid #e2e8f0;\n  ", ";\n  ", "\n"], ["\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  border-top: 1px solid #e2e8f0;\n  border-bottom: 1px solid #e2e8f0;\n  ",
    ";\n  ",
    "\n"])), function (props) {
    return props.theme === "subsquare" && styled.css(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject(["\n      border: none;\n    "], ["\n      border: none;\n    "])));
}, function (p) {
    return p.disabled && styled.css(templateObject_2$4 || (templateObject_2$4 = __makeTemplateObject(["\n      pointer-events: none;\n      cursor: not-allowed;\n    "], ["\n      pointer-events: none;\n      cursor: not-allowed;\n    "])));
});
var ToolBar = styled__default["default"].div(templateObject_5$2 || (templateObject_5$2 = __makeTemplateObject(["\n  flex-basis: 100%;\n  padding-left: 16px;\n  padding-right: 16px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  box-sizing: content-box;\n  ", ";\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    display: block;\n    padding-left: 0;\n    padding-right: 0;\n  }\n"], ["\n  flex-basis: 100%;\n  padding-left: 16px;\n  padding-right: 16px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  box-sizing: content-box;\n  ",
    ";\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    display: block;\n    padding-left: 0;\n    padding-right: 0;\n  }\n"])), function (props) {
    return props.theme === "subsquare" && styled.css(templateObject_4$2 || (templateObject_4$2 = __makeTemplateObject(["\n      justify-content: end;\n      background-color: #f6f7fa;\n      padding-left: 0;\n      padding-right: 20px;\n      height: 40px;\n      border-bottom: 1px solid #e0e4eb;\n      position: relative;\n      > div:first-child {\n        gap: 0;\n        height: 40px;\n      }\n    "], ["\n      justify-content: end;\n      background-color: #f6f7fa;\n      padding-left: 0;\n      padding-right: 20px;\n      height: 40px;\n      border-bottom: 1px solid #e0e4eb;\n      position: relative;\n      > div:first-child {\n        gap: 0;\n        height: 40px;\n      }\n    "])));
});
var TabsWrapper = styled__default["default"].div(templateObject_7$1 || (templateObject_7$1 = __makeTemplateObject(["\n  display: flex;\n  gap: 24px;\n  height: 48px;\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    border-bottom: 1px solid #e2e8f0;\n  }\n  ", ";\n"], ["\n  display: flex;\n  gap: 24px;\n  height: 48px;\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    border-bottom: 1px solid #e2e8f0;\n  }\n  ",
    ";\n"])), function (props) {
    return props.theme === "subsquare" && styled.css(templateObject_6$1 || (templateObject_6$1 = __makeTemplateObject(["\n      position: absolute;\n      left: 0;\n    "], ["\n      position: absolute;\n      left: 0;\n    "])));
});
var Tab = styled__default["default"].button(templateObject_12$1 || (templateObject_12$1 = __makeTemplateObject(["\n  all: unset;\n  font-weight: 500;\n  font-size: 14px;\n  line-height: 24px;\n  border-bottom: 3px solid #ffffff;\n  ", ";\n  ", ";\n  ", ";\n  ", ";\n  cursor: pointer;\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    margin-left: 16px;\n    margin-right: 16px;\n    width: 50%;\n    text-align: center;\n  }\n"], ["\n  all: unset;\n  font-weight: 500;\n  font-size: 14px;\n  line-height: 24px;\n  border-bottom: 3px solid #ffffff;\n  ",
    ";\n  ",
    ";\n  ",
    ";\n  ",
    ";\n  cursor: pointer;\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    margin-left: 16px;\n    margin-right: 16px;\n    width: 50%;\n    text-align: center;\n  }\n"])), function (props) {
    return props.theme === "subsquare" && styled.css(templateObject_8$1 || (templateObject_8$1 = __makeTemplateObject(["\n      padding: 12px;\n      line-height: 16px;\n      border-bottom: none;\n      color: #9da9bb;\n      :last-child {\n        box-shadow: 1px 0 0 0 #e0e4eb;\n      }\n      :hover {\n        color: #506176;\n      }\n    "], ["\n      padding: 12px;\n      line-height: 16px;\n      border-bottom: none;\n      color: #9da9bb;\n      :last-child {\n        box-shadow: 1px 0 0 0 #e0e4eb;\n      }\n      :hover {\n        color: #506176;\n      }\n    "])));
}, function (props) {
    return props.active &&
        props.theme === "opensquare" && styled.css(templateObject_9$1 || (templateObject_9$1 = __makeTemplateObject(["\n      border-bottom: 3px solid #04d2c5;\n    "], ["\n      border-bottom: 3px solid #04d2c5;\n    "])));
}, function (props) {
    return props.active && styled.css(templateObject_10$1 || (templateObject_10$1 = __makeTemplateObject(["\n      border-bottom: 3px solid #04d2c5;\n    "], ["\n      border-bottom: 3px solid #04d2c5;\n    "])));
}, function (props) {
    return props.active &&
        props.theme === "subsquare" && styled.css(templateObject_11$1 || (templateObject_11$1 = __makeTemplateObject(["\n      background-color: white;\n      color: #1e2134;\n      border-bottom: 17px solid white;\n      :first-child {\n        box-shadow: 1px 0 0 0 #e0e4eb;\n      }\n      :last-child {\n        box-shadow: -1px 0 0 0 #e0e4eb, 1px 0 0 0 #e0e4eb;\n      }\n      :hover {\n        color: #1e2134;\n      }\n    "], ["\n      background-color: white;\n      color: #1e2134;\n      border-bottom: 17px solid white;\n      :first-child {\n        box-shadow: 1px 0 0 0 #e0e4eb;\n      }\n      :last-child {\n        box-shadow: -1px 0 0 0 #e0e4eb, 1px 0 0 0 #e0e4eb;\n      }\n      :hover {\n        color: #1e2134;\n      }\n    "])));
});
var ToolbarItemsWrapper = styled__default["default"].div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  ", ";\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    height: 48px;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  ",
    ";\n  /* mobile */\n  @media screen and (max-width: 769px) {\n    height: 48px;\n  }\n"])), function (props) {
    return props.hide && styled.css(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n      display: none;\n    "], ["\n      display: none;\n    "])));
});
var ToolbarButton = styled__default["default"].button(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  all: unset;\n  cursor: pointer;\n  width: 24px;\n  height: 24px;\n\n  &:hover svg path {\n    fill: #1e2134;\n  }\n"], ["\n  all: unset;\n  cursor: pointer;\n  width: 24px;\n  height: 24px;\n\n  &:hover svg path {\n    fill: #1e2134;\n  }\n"])));
var Textarea = styled__default["default"].textarea(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 144px;\n  ", ";\n  ", ";\n  ", ";\n  max-height: 672px;\n  resize: vertical;\n  outline: none;\n  font-size: 14px;\n  line-height: 24px;\n  padding: 12px;\n  background: #fbfcfe;\n  font-family: Inter, sans-serif;\n  border: none;\n  border-bottom: 1px solid #e2e8f0;\n  ", ";\n\n  :hover,\n  :focus {\n    border-color: #b7c0cc;\n  }\n\n  ::selection {\n    background-color: #e2e8f0;\n  }\n"], ["\n  box-sizing: border-box;\n  width: 100%;\n  min-height: 144px;\n  ",
    ";\n  ",
    ";\n  ",
    ";\n  max-height: 672px;\n  resize: vertical;\n  outline: none;\n  font-size: 14px;\n  line-height: 24px;\n  padding: 12px;\n  background: #fbfcfe;\n  font-family: Inter, sans-serif;\n  border: none;\n  border-bottom: 1px solid #e2e8f0;\n  ",
    ";\n\n  :hover,\n  :focus {\n    border-color: #b7c0cc;\n  }\n\n  ::selection {\n    background-color: #e2e8f0;\n  }\n"])), function (props) {
    return props.minHeight && styled.css(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n      min-height: ", "px;\n    "], ["\n      min-height: ", "px;\n    "])), props.minHeight);
}, function (props) {
    return props.height && styled.css(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n      height: ", "px;\n    "], ["\n      height: ", "px;\n    "])), props.height);
}, function (props) {
    return props.hide && styled.css(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n      display: none;\n    "], ["\n      display: none;\n    "])));
}, function (props) {
    return props.theme === "subsquare" && styled.css(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n      background-color: white;\n      border-bottom: none;\n    "], ["\n      background-color: white;\n      border-bottom: none;\n    "])));
});
var templateObject_1$6, templateObject_2$4, templateObject_3$2, templateObject_4$2, templateObject_5$2, templateObject_6$1, templateObject_7$1, templateObject_8$1, templateObject_9$1, templateObject_10$1, templateObject_11$1, templateObject_12$1, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20;

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

function EditorHeader(_a) {
    var _this = this;
    var theme = _a.theme, editStatus = _a.editStatus, setEditStatus = _a.setEditStatus, isPreview = _a.isPreview, commandController = _a.commandController;
    return React__namespace.createElement(ToolBar, { theme: theme },
        React__namespace.createElement(TabsWrapper, { theme: theme },
            React__namespace.createElement(Tab, { active: editStatus === "write", onClick: function () { return setEditStatus("write"); }, theme: theme }, "Write"),
            React__namespace.createElement(Tab, { active: editStatus === "preview", onClick: function () { return setEditStatus("preview"); }, theme: theme }, "Preview")),
        React__namespace.createElement(ToolbarItemsWrapper, { hide: isPreview },
            React__namespace.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("bold")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React__namespace.createElement(Bold, null)),
            React__namespace.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("underline")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React__namespace.createElement(Underline, null)),
            React__namespace.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("delete")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React__namespace.createElement(Delete, null)),
            React__namespace.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("ul")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React__namespace.createElement(Ul, null)),
            React__namespace.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("ol")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React__namespace.createElement(Ol, null)),
            React__namespace.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("link")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React__namespace.createElement(Link, null)),
            React__namespace.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("image")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React__namespace.createElement(Img, null)),
            React__namespace.createElement(ToolbarButton, { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, commandController.executeCommand("code")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React__namespace.createElement(Code, null))));
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

var quillStyle = styled.css(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject(["\n  position: relative;\n  border-radius: 4px;\n\n  ul.ql-mention-list li{\n    all: unset;\n    display: block;\n  }\n\n  .ql-mention-list-container {\n    width: auto;\n    min-width: 180px;\n    cursor: pointer;\n    .ql-mention-list-item.selected {\n      background-color: #f8f8f8;\n      color: #34373c;\n    }\n\n    .ql-mention-list-item {\n      font-style: normal;\n      font-weight: normal;\n      font-size: 14px;\n      line-height: 22px;\n      padding: 4px 16px 4px 16px;\n    }\n  }\n\n  .ql-formats {\n    ", ";\n  }\n\n  .ql-editor {\n    min-height: 200px;\n  }\n\n  .ql-toolbar {\n    padding-left: 210px;\n  }\n\n  /*!\n   * Quill Editor v1.3.7\n   * https://quilljs.com/\n   * Copyright (c) 2014, Jason Chen\n   * Copyright (c) 2013, salesforce.com\n   */\n\n  .ql-container {\n    box-sizing: border-box;\n    font-family: Helvetica, Arial, sans-serif;\n    font-size: 13px;\n    height: 100%;\n    margin: 0px;\n    position: relative;\n  }\n\n  .ql-container.ql-disabled .ql-tooltip {\n    visibility: hidden;\n  }\n\n  .ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {\n    pointer-events: none;\n  }\n\n  .ql-clipboard {\n    left: -100000px;\n    height: 1px;\n    overflow-y: hidden;\n    position: absolute;\n    top: 50%;\n  }\n\n  .ql-clipboard p {\n    margin: 0;\n    padding: 0;\n  }\n\n  .ql-editor {\n    box-sizing: border-box;\n    line-height: 1.42;\n    height: 100%;\n    outline: none;\n    overflow-y: auto;\n    padding: 12px 16px;\n    tab-size: 4;\n    -moz-tab-size: 4;\n    text-align: left;\n    white-space: pre-wrap;\n    word-wrap: break-word;\n  }\n\n  .ql-editor > * {\n    cursor: text;\n  }\n\n  .ql-editor p,\n  .ql-editor ol,\n  .ql-editor ul,\n  .ql-editor pre,\n  .ql-editor blockquote,\n  .ql-editor h1,\n  .ql-editor h2,\n  .ql-editor h3,\n  .ql-editor h4,\n  .ql-editor h5,\n  .ql-editor h6 {\n    margin: 0;\n    padding: 0;\n    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n  }\n\n  .ql-editor ol,\n  .ql-editor ul {\n    padding-left: 1.5em;\n  }\n\n  .ql-editor ol > li,\n  .ql-editor ul > li {\n    list-style-type: none;\n  }\n\n  .ql-editor ul > li::before {\n    content: '\\2022';\n  }\n\n  .ql-editor ul[data-checked=true],\n  .ql-editor ul[data-checked=false] {\n    pointer-events: none;\n  }\n\n  .ql-editor ul[data-checked=true] > li *,\n  .ql-editor ul[data-checked=false] > li * {\n    pointer-events: all;\n  }\n\n  .ql-editor ul[data-checked=true] > li::before,\n  .ql-editor ul[data-checked=false] > li::before {\n    color: #777;\n    cursor: pointer;\n    pointer-events: all;\n  }\n\n  .ql-editor ul[data-checked=true] > li::before {\n    content: '\\2611';\n  }\n\n  .ql-editor ul[data-checked=false] > li::before {\n    content: '\\2610';\n  }\n\n  .ql-editor li::before {\n    display: inline-block;\n    white-space: nowrap;\n    width: 1.2em;\n  }\n\n  .ql-editor li:not(.ql-direction-rtl)::before {\n    margin-left: -1.5em;\n    margin-right: 0.3em;\n    text-align: right;\n  }\n\n  .ql-editor li.ql-direction-rtl::before {\n    margin-left: 0.3em;\n    margin-right: -1.5em;\n  }\n\n  .ql-editor ol li:not(.ql-direction-rtl),\n  .ql-editor ul li:not(.ql-direction-rtl) {\n    padding-left: 1.5em;\n  }\n\n  .ql-editor ol li.ql-direction-rtl,\n  .ql-editor ul li.ql-direction-rtl {\n    padding-right: 1.5em;\n  }\n\n  .ql-editor ol li {\n    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n    counter-increment: list-0;\n  }\n\n  .ql-editor ol li:before {\n    content: counter(list-0, decimal) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-1 {\n    counter-increment: list-1;\n  }\n\n  .ql-editor ol li.ql-indent-1:before {\n    content: counter(list-1, lower-alpha) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-1 {\n    counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-2 {\n    counter-increment: list-2;\n  }\n\n  .ql-editor ol li.ql-indent-2:before {\n    content: counter(list-2, lower-roman) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-2 {\n    counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-3 {\n    counter-increment: list-3;\n  }\n\n  .ql-editor ol li.ql-indent-3:before {\n    content: counter(list-3, decimal) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-3 {\n    counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-4 {\n    counter-increment: list-4;\n  }\n\n  .ql-editor ol li.ql-indent-4:before {\n    content: counter(list-4, lower-alpha) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-4 {\n    counter-reset: list-5 list-6 list-7 list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-5 {\n    counter-increment: list-5;\n  }\n\n  .ql-editor ol li.ql-indent-5:before {\n    content: counter(list-5, lower-roman) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-5 {\n    counter-reset: list-6 list-7 list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-6 {\n    counter-increment: list-6;\n  }\n\n  .ql-editor ol li.ql-indent-6:before {\n    content: counter(list-6, decimal) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-6 {\n    counter-reset: list-7 list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-7 {\n    counter-increment: list-7;\n  }\n\n  .ql-editor ol li.ql-indent-7:before {\n    content: counter(list-7, lower-alpha) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-7 {\n    counter-reset: list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-8 {\n    counter-increment: list-8;\n  }\n\n  .ql-editor ol li.ql-indent-8:before {\n    content: counter(list-8, lower-roman) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-8 {\n    counter-reset: list-9;\n  }\n\n  .ql-editor ol li.ql-indent-9 {\n    counter-increment: list-9;\n  }\n\n  .ql-editor ol li.ql-indent-9:before {\n    content: counter(list-9, decimal) '. ';\n  }\n\n  .ql-editor .ql-indent-1:not(.ql-direction-rtl) {\n    padding-left: 3em;\n  }\n\n  .ql-editor li.ql-indent-1:not(.ql-direction-rtl) {\n    padding-left: 4.5em;\n  }\n\n  .ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {\n    padding-right: 3em;\n  }\n\n  .ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {\n    padding-right: 4.5em;\n  }\n\n  .ql-editor .ql-indent-2:not(.ql-direction-rtl) {\n    padding-left: 6em;\n  }\n\n  .ql-editor li.ql-indent-2:not(.ql-direction-rtl) {\n    padding-left: 7.5em;\n  }\n\n  .ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {\n    padding-right: 6em;\n  }\n\n  .ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {\n    padding-right: 7.5em;\n  }\n\n  .ql-editor .ql-indent-3:not(.ql-direction-rtl) {\n    padding-left: 9em;\n  }\n\n  .ql-editor li.ql-indent-3:not(.ql-direction-rtl) {\n    padding-left: 10.5em;\n  }\n\n  .ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {\n    padding-right: 9em;\n  }\n\n  .ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {\n    padding-right: 10.5em;\n  }\n\n  .ql-editor .ql-indent-4:not(.ql-direction-rtl) {\n    padding-left: 12em;\n  }\n\n  .ql-editor li.ql-indent-4:not(.ql-direction-rtl) {\n    padding-left: 13.5em;\n  }\n\n  .ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {\n    padding-right: 12em;\n  }\n\n  .ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {\n    padding-right: 13.5em;\n  }\n\n  .ql-editor .ql-indent-5:not(.ql-direction-rtl) {\n    padding-left: 15em;\n  }\n\n  .ql-editor li.ql-indent-5:not(.ql-direction-rtl) {\n    padding-left: 16.5em;\n  }\n\n  .ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {\n    padding-right: 15em;\n  }\n\n  .ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {\n    padding-right: 16.5em;\n  }\n\n  .ql-editor .ql-indent-6:not(.ql-direction-rtl) {\n    padding-left: 18em;\n  }\n\n  .ql-editor li.ql-indent-6:not(.ql-direction-rtl) {\n    padding-left: 19.5em;\n  }\n\n  .ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {\n    padding-right: 18em;\n  }\n\n  .ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {\n    padding-right: 19.5em;\n  }\n\n  .ql-editor .ql-indent-7:not(.ql-direction-rtl) {\n    padding-left: 21em;\n  }\n\n  .ql-editor li.ql-indent-7:not(.ql-direction-rtl) {\n    padding-left: 22.5em;\n  }\n\n  .ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {\n    padding-right: 21em;\n  }\n\n  .ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {\n    padding-right: 22.5em;\n  }\n\n  .ql-editor .ql-indent-8:not(.ql-direction-rtl) {\n    padding-left: 24em;\n  }\n\n  .ql-editor li.ql-indent-8:not(.ql-direction-rtl) {\n    padding-left: 25.5em;\n  }\n\n  .ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {\n    padding-right: 24em;\n  }\n\n  .ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {\n    padding-right: 25.5em;\n  }\n\n  .ql-editor .ql-indent-9:not(.ql-direction-rtl) {\n    padding-left: 27em;\n  }\n\n  .ql-editor li.ql-indent-9:not(.ql-direction-rtl) {\n    padding-left: 28.5em;\n  }\n\n  .ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {\n    padding-right: 27em;\n  }\n\n  .ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {\n    padding-right: 28.5em;\n  }\n\n\n  .ql-editor .ql-bg-black {\n    background-color: #000;\n  }\n\n  .ql-editor .ql-bg-red {\n    background-color: #e60000;\n  }\n\n  .ql-editor .ql-bg-orange {\n    background-color: #f90;\n  }\n\n  .ql-editor .ql-bg-yellow {\n    background-color: #ff0;\n  }\n\n  .ql-editor .ql-bg-green {\n    background-color: #008a00;\n  }\n\n  .ql-editor .ql-bg-blue {\n    background-color: #06c;\n  }\n\n  .ql-editor .ql-bg-purple {\n    background-color: #93f;\n  }\n\n  .ql-editor .ql-color-white {\n    color: #fff;\n  }\n\n  .ql-editor .ql-color-red {\n    color: #e60000;\n  }\n\n  .ql-editor .ql-color-orange {\n    color: #f90;\n  }\n\n  .ql-editor .ql-color-yellow {\n    color: #ff0;\n  }\n\n  .ql-editor .ql-color-green {\n    color: #008a00;\n  }\n\n  .ql-editor .ql-color-blue {\n    color: #06c;\n  }\n\n  .ql-editor .ql-color-purple {\n    color: #93f;\n  }\n\n  .ql-editor .ql-font-serif {\n    font-family: Georgia, Times New Roman, serif;\n  }\n\n  .ql-editor .ql-font-monospace {\n    font-family: Monaco, Courier New, monospace;\n  }\n\n  .ql-editor .ql-size-small {\n    font-size: 0.75em;\n  }\n\n  .ql-editor .ql-size-large {\n    font-size: 1.5em;\n  }\n\n  .ql-editor .ql-size-huge {\n    font-size: 2.5em;\n  }\n\n  .ql-editor .ql-direction-rtl {\n    direction: rtl;\n    text-align: inherit;\n  }\n\n  .ql-editor .ql-align-center {\n    text-align: center;\n  }\n\n  .ql-editor .ql-align-justify {\n    text-align: justify;\n  }\n\n  .ql-editor .ql-align-right {\n    text-align: right;\n  }\n\n  .ql-editor.ql-blank::before {\n    color: rgba(0, 0, 0, 0.6);\n    content: attr(data-placeholder);\n    font-style: italic;\n    left: 15px;\n    pointer-events: none;\n    position: absolute;\n    right: 15px;\n  }\n\n  .ql-snow.ql-toolbar:after,\n  .ql-toolbar:after {\n    clear: both;\n    content: '';\n    display: table;\n  }\n\n  .ql-snow.ql-toolbar button,\n  .ql-toolbar button {\n    background: none;\n    border: none;\n    cursor: pointer;\n    display: inline-block;\n    float: left;\n    height: 24px;\n    padding: 3px 5px;\n    width: 28px;\n  }\n\n  .ql-snow.ql-toolbar button svg,\n  .ql-toolbar button svg {\n    float: left;\n    height: 100%;\n  }\n\n  .ql-snow.ql-toolbar button:active:hover,\n  .ql-toolbar button:active:hover {\n    outline: none;\n  }\n\n  .ql-snow.ql-toolbar input.ql-image[type=file],\n  .ql-toolbar input.ql-image[type=file] {\n    display: none;\n  }\n\n  .ql-snow.ql-toolbar button:hover,\n  .ql-toolbar button:hover,\n  .ql-snow.ql-toolbar button:focus,\n  .ql-toolbar button:focus,\n  .ql-snow.ql-toolbar button.ql-active,\n  .ql-toolbar button.ql-active,\n  .ql-snow.ql-toolbar .ql-picker-label:hover,\n  .ql-toolbar .ql-picker-label:hover,\n  .ql-snow.ql-toolbar .ql-picker-label.ql-active,\n  .ql-toolbar .ql-picker-label.ql-active,\n  .ql-snow.ql-toolbar .ql-picker-item:hover,\n  .ql-toolbar .ql-picker-item:hover,\n  .ql-snow.ql-toolbar .ql-picker-item.ql-selected,\n  .ql-toolbar .ql-picker-item.ql-selected {\n    color: #1E2134;\n  }\n\n  .ql-snow.ql-toolbar button:hover .ql-fill,\n  .ql-toolbar button:hover .ql-fill,\n  .ql-snow.ql-toolbar button:focus .ql-fill,\n  .ql-toolbar button:focus .ql-fill,\n  .ql-snow.ql-toolbar button.ql-active .ql-fill,\n  .ql-toolbar button.ql-active .ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,\n  .ql-toolbar .ql-picker-label:hover .ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,\n  .ql-toolbar .ql-picker-label.ql-active .ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,\n  .ql-toolbar .ql-picker-item:hover .ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n  .ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n  .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,\n  .ql-toolbar button:hover .ql-stroke.ql-fill,\n  .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,\n  .ql-toolbar button:focus .ql-stroke.ql-fill,\n  .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,\n  .ql-toolbar button.ql-active .ql-stroke.ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n  .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n  .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n  .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,\n  .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {\n    fill: #1E2134;\n  }\n\n  .ql-snow.ql-toolbar button:hover .ql-stroke,\n  .ql-toolbar button:hover .ql-stroke,\n  .ql-snow.ql-toolbar button:focus .ql-stroke,\n  .ql-toolbar button:focus .ql-stroke,\n  .ql-snow.ql-toolbar button.ql-active .ql-stroke,\n  .ql-toolbar button.ql-active .ql-stroke,\n  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,\n  .ql-toolbar .ql-picker-label:hover .ql-stroke,\n  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n  .ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,\n  .ql-toolbar .ql-picker-item:hover .ql-stroke,\n  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n  .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n  .ql-snow.ql-toolbar button:hover .ql-stroke-miter,\n  .ql-toolbar button:hover .ql-stroke-miter,\n  .ql-snow.ql-toolbar button:focus .ql-stroke-miter,\n  .ql-toolbar button:focus .ql-stroke-miter,\n  .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,\n  .ql-toolbar button.ql-active .ql-stroke-miter,\n  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n  .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n  .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n  .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,\n  .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {\n    stroke: #1E2134;\n  }\n\n  @media (pointer: coarse) {\n    .ql-snow.ql-toolbar button:hover:not(.ql-active),\n    .ql-toolbar button:hover:not(.ql-active) {\n      color: #506176;\n    }\n\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,\n    .ql-toolbar button:hover:not(.ql-active) .ql-fill,\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,\n    .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {\n      fill: #506176;\n    }\n\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n    .ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,\n    .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {\n      stroke: #506176;\n    }\n  } {\n  box-sizing: border-box;\n}\n\n  * {\n    box-sizing: border-box;\n  }\n\n  .ql-hidden {\n    display: none;\n  }\n\n  .ql-out-bottom,\n  .ql-out-top {\n    visibility: hidden;\n  }\n\n  .ql-tooltip {\n    position: absolute;\n    transform: translateY(10px);\n  }\n\n  .ql-tooltip a {\n    cursor: pointer;\n    text-decoration: none;\n  }\n\n  .ql-tooltip.ql-flip {\n    transform: translateY(-10px);\n  }\n\n  .ql-formats {\n    display: inline-block;\n    vertical-align: middle;\n  }\n\n  .ql-formats:after {\n    clear: both;\n    content: '';\n    display: table;\n  }\n\n  .ql-stroke {\n    fill: none;\n    stroke: #506176;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n    stroke-width: 2;\n  }\n\n  .ql-stroke-miter {\n    fill: none;\n    stroke: #506176;\n    stroke-miterlimit: 10;\n    stroke-width: 2;\n  }\n\n  .ql-fill,\n  .ql-stroke.ql-fill {\n    fill: #506176;\n  }\n\n  .ql-empty {\n    fill: none;\n  }\n\n  .ql-even {\n    fill-rule: evenodd;\n  }\n\n  .ql-thin,\n  .ql-stroke.ql-thin {\n    stroke-width: 1;\n  }\n\n  .ql-transparent {\n    opacity: 0.4;\n  }\n\n  .ql-direction svg:last-child {\n    display: none;\n  }\n\n  .ql-direction.ql-active svg:last-child {\n    display: inline;\n  }\n\n  .ql-direction.ql-active svg:first-child {\n    display: none;\n  }\n\n  .ql-editor h1 {\n    font-size: 2em;\n  }\n\n  .ql-editor h2 {\n    font-size: 1.5em;\n  }\n\n  .ql-editor h3 {\n    font-size: 1.17em;\n  }\n\n  .ql-editor h4 {\n    font-size: 1em;\n  }\n\n  .ql-editor h5 {\n    font-size: 0.83em;\n  }\n\n  .ql-editor h6 {\n    font-size: 0.67em;\n  }\n\n  .ql-editor a {\n    text-decoration: underline;\n  }\n\n  .ql-editor blockquote {\n    border-left: 4px solid #ccc;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    padding-left: 16px;\n  }\n\n  .ql-editor code,\n  .ql-editor pre {\n    background-color: #f0f0f0;\n    border-radius: 3px;\n  }\n\n  .ql-editor pre {\n    white-space: pre-wrap;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    padding: 5px 10px;\n  }\n\n  .ql-editor code {\n    font-size: 85%;\n    padding: 2px 4px;\n  }\n\n  .ql-editor pre.ql-syntax {\n    background-color: #23241f;\n    color: #f8f8f2;\n    overflow: visible;\n  }\n\n  .ql-editor img {\n    max-width: 100%;\n  }\n\n  .ql-picker {\n    color: #506176;\n    display: inline-block;\n    float: left;\n    font-size: 14px;\n    font-weight: 500;\n    height: 24px;\n    position: relative;\n    vertical-align: middle;\n  }\n\n  .ql-picker-label {\n    cursor: pointer;\n    display: inline-block;\n    height: 100%;\n    padding-left: 8px;\n    padding-right: 22px;\n    position: relative;\n    width: 100%;\n  }\n\n  .ql-picker-label::before {\n    display: inline-block;\n    line-height: 24px;\n  }\n\n  .ql-picker-options {\n    background-color: #fff;\n    display: none;\n    min-width: 100%;\n    padding: 4px 8px;\n    position: absolute;\n    white-space: nowrap;\n  }\n\n  .ql-picker-options .ql-picker-item {\n    cursor: pointer;\n    display: block;\n    padding-bottom: 5px;\n    padding-top: 5px;\n  }\n\n  .ql-picker.ql-expanded .ql-picker-label {\n    color: #ccc;\n    z-index: 2;\n  }\n\n  .ql-picker.ql-expanded .ql-picker-label .ql-fill {\n    fill: #ccc;\n  }\n\n  .ql-picker.ql-expanded .ql-picker-label .ql-stroke {\n    stroke: #ccc;\n  }\n\n  .ql-picker.ql-expanded .ql-picker-options {\n    display: block;\n    margin-top: -1px;\n    top: 100%;\n    z-index: 1;\n  }\n\n  .ql-color-picker,\n  .ql-icon-picker {\n    width: 28px;\n  }\n\n  .ql-color-picker .ql-picker-label,\n  .ql-icon-picker .ql-picker-label {\n    padding: 2px 4px;\n  }\n\n  .ql-color-picker .ql-picker-label svg,\n  .ql-icon-picker .ql-picker-label svg {\n    right: 4px;\n  }\n\n  .ql-icon-picker .ql-picker-options {\n    padding: 4px 0px;\n  }\n\n  .ql-icon-picker .ql-picker-item {\n    height: 24px;\n    width: 24px;\n    padding: 2px 4px;\n  }\n\n  .ql-color-picker .ql-picker-options {\n    padding: 3px 5px;\n    width: 152px;\n  }\n\n  .ql-color-picker .ql-picker-item {\n    border: 1px solid transparent;\n    float: left;\n    height: 16px;\n    margin: 2px;\n    padding: 0px;\n    width: 16px;\n  }\n\n  .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {\n    position: absolute;\n    margin-top: -9px;\n    right: 0;\n    top: 50%;\n    width: 18px;\n\n    polygon {\n      stroke: #506176;\n\n      :hover {\n        stroke: #1E2134;\n        color: #1E2134;\n      }\n    }\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,\n  .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,\n  .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,\n  .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before,\n  .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before,\n  .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before {\n    content: attr(data-label);\n  }\n\n  .ql-formats {\n    button {\n      svg {\n        :hover {\n          path {\n            fill: #1E2134;\n          }\n        }\n      }\n    }\n  }\n\n  select.ql-header {\n    width: 98px;\n    color: #506176;\n    display: inline-block;\n    float: left;\n    font-size: 14px;\n    font-weight: 500;\n    height: 24px;\n    position: relative;\n    vertical-align: middle;\n    background: #F6F7FA;\n  }\n\n  option {\n    display: block;\n  }\n\n  .ql-toolbar, .ql-formats {\n    display: flex;\n    flex-wrap: nowrap;\n    background: #F6F7FA;\n  }\n\n  .ql-toolbar {\n    align-items: center;\n    height: 40px;\n  }\n\n  .ql-formats {\n    gap: 8px;\n  }\n\n  .ql-formats button {\n    padding: 0;\n  }\n\n  .ql-picker.ql-header .ql-picker-label::before,\n  .ql-header .ql-picker-item::before {\n    display: block;\n    content: 'Normal';\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-value=\"1\"]::before,\n  .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before {\n    content: 'Heading 1';\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-value=\"2\"]::before,\n  .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before {\n    content: 'Heading 2';\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-value=\"3\"]::before,\n  .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before {\n    content: 'Heading 3';\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-value=\"4\"]::before,\n  .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before {\n    content: 'Heading 4';\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-value=\"5\"]::before,\n  .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before {\n    content: 'Heading 5';\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-value=\"6\"]::before,\n  .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before {\n    content: 'Heading 6';\n  }\n\n  .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before {\n    font-size: 2em;\n  }\n\n  .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before {\n    font-size: 1.5em;\n  }\n\n  .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before {\n    font-size: 1.17em;\n  }\n\n  .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before {\n    font-size: 1em;\n  }\n\n  .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before {\n    font-size: 0.83em;\n  }\n\n  .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before {\n    font-size: 0.67em;\n  }\n\n  .ql-picker.ql-font {\n    width: 108px;\n  }\n\n  .ql-picker.ql-font .ql-picker-label::before,\n  .ql-picker.ql-font .ql-picker-item::before {\n    content: 'Sans Serif';\n  }\n\n  .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,\n  .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n    content: 'Serif';\n  }\n\n  .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,\n  .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n    content: 'Monospace';\n  }\n\n  .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n    font-family: Georgia, Times New Roman, serif;\n  }\n\n  .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n    font-family: Monaco, Courier New, monospace;\n  }\n\n  .ql-picker.ql-size {\n    width: 98px;\n  }\n\n  .ql-picker.ql-size .ql-picker-label::before,\n  .ql-picker.ql-size .ql-picker-item::before {\n    content: 'Normal';\n  }\n\n  .ql-picker.ql-size .ql-picker-label[data-value=small]::before,\n  .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n    content: 'Small';\n  }\n\n  .ql-picker.ql-size .ql-picker-label[data-value=large]::before,\n  .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n    content: 'Large';\n  }\n\n  .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,\n  .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n    content: 'Huge';\n  }\n\n  .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n    font-size: 10px;\n  }\n\n  .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n    font-size: 18px;\n  }\n\n  .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n    font-size: 32px;\n  }\n\n  .ql-color-picker.ql-background .ql-picker-item {\n    background-color: #fff;\n  }\n\n  .ql-color-picker.ql-color .ql-picker-item {\n    background-color: #000;\n  }\n\n  .ql-toolbar {\n    box-sizing: border-box;\n    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;\n    padding: 8px;\n    justify-content: end;\n    height: 41px;\n    border-bottom: 1px solid #E0E4EB;\n  }\n\n  .ql-toolbar.ql-formats {\n    margin-right: 15px;\n  }\n\n  .ql-toolbar.ql-picker-label {\n    border: 1px solid transparent;\n  }\n\n  .ql-toolbar.ql-picker-options {\n    border: 1px solid transparent;\n    box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px;\n  }\n\n  .ql-toolbar.ql-picker.ql-expanded .ql-picker-label {\n    border-color: #ccc;\n  }\n\n  .ql-toolbar.ql-picker.ql-expanded .ql-picker-options {\n    border-color: #ccc;\n  }\n\n  .ql-toolbar.ql-color-picker .ql-picker-item.ql-selected,\n  .ql-toolbar.ql-color-picker .ql-picker-item:hover {\n    border-color: #000;\n  }\n\n  .ql-toolbar + .ql-container {\n    border-top: 0px;\n  }\n\n  .ql-tooltip {\n    background-color: #fff;\n    border: 1px solid #ccc;\n    box-shadow: 0px 0px 5px #ddd;\n    color: #506176;\n    padding: 5px 12px;\n    white-space: nowrap;\n  }\n\n  .ql-tooltip::before {\n    content: \"Visit URL:\";\n    line-height: 26px;\n    margin-right: 8px;\n  }\n\n  .ql-tooltip input[type=text] {\n    display: none;\n    border: 1px solid #ccc;\n    font-size: 13px;\n    height: 26px;\n    margin: 0px;\n    padding: 3px 5px;\n    width: 170px;\n  }\n\n  .ql-tooltip a.ql-preview {\n    display: inline-block;\n    max-width: 200px;\n    overflow-x: hidden;\n    text-overflow: ellipsis;\n    vertical-align: top;\n  }\n\n  .ql-tooltip a.ql-action::after {\n    border-right: 1px solid #ccc;\n    content: 'Edit';\n    margin-left: 16px;\n    padding-right: 8px;\n  }\n\n  .ql-tooltip a.ql-remove::before {\n    content: 'Remove';\n    margin-left: 8px;\n  }\n\n  .ql-tooltip a {\n    line-height: 26px;\n  }\n\n  .ql-tooltip.ql-editing a.ql-preview,\n  .ql-tooltip.ql-editing a.ql-remove {\n    display: none;\n  }\n\n  .ql-tooltip.ql-editing input[type=text] {\n    display: inline-block;\n  }\n\n  .ql-tooltip.ql-editing a.ql-action::after {\n    border-right: 0px;\n    content: 'Save';\n    padding-right: 0px;\n  }\n\n  .ql-tooltip[data-mode=link]::before {\n    content: \"Enter link:\";\n  }\n\n  .ql-tooltip[data-mode=formula]::before {\n    content: \"Enter formula:\";\n  }\n\n  .ql-tooltip[data-mode=video]::before {\n    content: \"Enter video:\";\n  }\n\n  a {\n    color: #06c;\n  }\n"], ["\n  position: relative;\n  border-radius: 4px;\n\n  ul.ql-mention-list li{\n    all: unset;\n    display: block;\n  }\n\n  .ql-mention-list-container {\n    width: auto;\n    min-width: 180px;\n    cursor: pointer;\n    .ql-mention-list-item.selected {\n      background-color: #f8f8f8;\n      color: #34373c;\n    }\n\n    .ql-mention-list-item {\n      font-style: normal;\n      font-weight: normal;\n      font-size: 14px;\n      line-height: 22px;\n      padding: 4px 16px 4px 16px;\n    }\n  }\n\n  .ql-formats {\n    ",
    ";\n  }\n\n  .ql-editor {\n    min-height: 200px;\n  }\n\n  .ql-toolbar {\n    padding-left: 210px;\n  }\n\n  /*!\n   * Quill Editor v1.3.7\n   * https://quilljs.com/\n   * Copyright (c) 2014, Jason Chen\n   * Copyright (c) 2013, salesforce.com\n   */\n\n  .ql-container {\n    box-sizing: border-box;\n    font-family: Helvetica, Arial, sans-serif;\n    font-size: 13px;\n    height: 100%;\n    margin: 0px;\n    position: relative;\n  }\n\n  .ql-container.ql-disabled .ql-tooltip {\n    visibility: hidden;\n  }\n\n  .ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {\n    pointer-events: none;\n  }\n\n  .ql-clipboard {\n    left: -100000px;\n    height: 1px;\n    overflow-y: hidden;\n    position: absolute;\n    top: 50%;\n  }\n\n  .ql-clipboard p {\n    margin: 0;\n    padding: 0;\n  }\n\n  .ql-editor {\n    box-sizing: border-box;\n    line-height: 1.42;\n    height: 100%;\n    outline: none;\n    overflow-y: auto;\n    padding: 12px 16px;\n    tab-size: 4;\n    -moz-tab-size: 4;\n    text-align: left;\n    white-space: pre-wrap;\n    word-wrap: break-word;\n  }\n\n  .ql-editor > * {\n    cursor: text;\n  }\n\n  .ql-editor p,\n  .ql-editor ol,\n  .ql-editor ul,\n  .ql-editor pre,\n  .ql-editor blockquote,\n  .ql-editor h1,\n  .ql-editor h2,\n  .ql-editor h3,\n  .ql-editor h4,\n  .ql-editor h5,\n  .ql-editor h6 {\n    margin: 0;\n    padding: 0;\n    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n  }\n\n  .ql-editor ol,\n  .ql-editor ul {\n    padding-left: 1.5em;\n  }\n\n  .ql-editor ol > li,\n  .ql-editor ul > li {\n    list-style-type: none;\n  }\n\n  .ql-editor ul > li::before {\n    content: '\\\\2022';\n  }\n\n  .ql-editor ul[data-checked=true],\n  .ql-editor ul[data-checked=false] {\n    pointer-events: none;\n  }\n\n  .ql-editor ul[data-checked=true] > li *,\n  .ql-editor ul[data-checked=false] > li * {\n    pointer-events: all;\n  }\n\n  .ql-editor ul[data-checked=true] > li::before,\n  .ql-editor ul[data-checked=false] > li::before {\n    color: #777;\n    cursor: pointer;\n    pointer-events: all;\n  }\n\n  .ql-editor ul[data-checked=true] > li::before {\n    content: '\\\\2611';\n  }\n\n  .ql-editor ul[data-checked=false] > li::before {\n    content: '\\\\2610';\n  }\n\n  .ql-editor li::before {\n    display: inline-block;\n    white-space: nowrap;\n    width: 1.2em;\n  }\n\n  .ql-editor li:not(.ql-direction-rtl)::before {\n    margin-left: -1.5em;\n    margin-right: 0.3em;\n    text-align: right;\n  }\n\n  .ql-editor li.ql-direction-rtl::before {\n    margin-left: 0.3em;\n    margin-right: -1.5em;\n  }\n\n  .ql-editor ol li:not(.ql-direction-rtl),\n  .ql-editor ul li:not(.ql-direction-rtl) {\n    padding-left: 1.5em;\n  }\n\n  .ql-editor ol li.ql-direction-rtl,\n  .ql-editor ul li.ql-direction-rtl {\n    padding-right: 1.5em;\n  }\n\n  .ql-editor ol li {\n    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n    counter-increment: list-0;\n  }\n\n  .ql-editor ol li:before {\n    content: counter(list-0, decimal) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-1 {\n    counter-increment: list-1;\n  }\n\n  .ql-editor ol li.ql-indent-1:before {\n    content: counter(list-1, lower-alpha) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-1 {\n    counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-2 {\n    counter-increment: list-2;\n  }\n\n  .ql-editor ol li.ql-indent-2:before {\n    content: counter(list-2, lower-roman) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-2 {\n    counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-3 {\n    counter-increment: list-3;\n  }\n\n  .ql-editor ol li.ql-indent-3:before {\n    content: counter(list-3, decimal) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-3 {\n    counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-4 {\n    counter-increment: list-4;\n  }\n\n  .ql-editor ol li.ql-indent-4:before {\n    content: counter(list-4, lower-alpha) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-4 {\n    counter-reset: list-5 list-6 list-7 list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-5 {\n    counter-increment: list-5;\n  }\n\n  .ql-editor ol li.ql-indent-5:before {\n    content: counter(list-5, lower-roman) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-5 {\n    counter-reset: list-6 list-7 list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-6 {\n    counter-increment: list-6;\n  }\n\n  .ql-editor ol li.ql-indent-6:before {\n    content: counter(list-6, decimal) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-6 {\n    counter-reset: list-7 list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-7 {\n    counter-increment: list-7;\n  }\n\n  .ql-editor ol li.ql-indent-7:before {\n    content: counter(list-7, lower-alpha) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-7 {\n    counter-reset: list-8 list-9;\n  }\n\n  .ql-editor ol li.ql-indent-8 {\n    counter-increment: list-8;\n  }\n\n  .ql-editor ol li.ql-indent-8:before {\n    content: counter(list-8, lower-roman) '. ';\n  }\n\n  .ql-editor ol li.ql-indent-8 {\n    counter-reset: list-9;\n  }\n\n  .ql-editor ol li.ql-indent-9 {\n    counter-increment: list-9;\n  }\n\n  .ql-editor ol li.ql-indent-9:before {\n    content: counter(list-9, decimal) '. ';\n  }\n\n  .ql-editor .ql-indent-1:not(.ql-direction-rtl) {\n    padding-left: 3em;\n  }\n\n  .ql-editor li.ql-indent-1:not(.ql-direction-rtl) {\n    padding-left: 4.5em;\n  }\n\n  .ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {\n    padding-right: 3em;\n  }\n\n  .ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {\n    padding-right: 4.5em;\n  }\n\n  .ql-editor .ql-indent-2:not(.ql-direction-rtl) {\n    padding-left: 6em;\n  }\n\n  .ql-editor li.ql-indent-2:not(.ql-direction-rtl) {\n    padding-left: 7.5em;\n  }\n\n  .ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {\n    padding-right: 6em;\n  }\n\n  .ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {\n    padding-right: 7.5em;\n  }\n\n  .ql-editor .ql-indent-3:not(.ql-direction-rtl) {\n    padding-left: 9em;\n  }\n\n  .ql-editor li.ql-indent-3:not(.ql-direction-rtl) {\n    padding-left: 10.5em;\n  }\n\n  .ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {\n    padding-right: 9em;\n  }\n\n  .ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {\n    padding-right: 10.5em;\n  }\n\n  .ql-editor .ql-indent-4:not(.ql-direction-rtl) {\n    padding-left: 12em;\n  }\n\n  .ql-editor li.ql-indent-4:not(.ql-direction-rtl) {\n    padding-left: 13.5em;\n  }\n\n  .ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {\n    padding-right: 12em;\n  }\n\n  .ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {\n    padding-right: 13.5em;\n  }\n\n  .ql-editor .ql-indent-5:not(.ql-direction-rtl) {\n    padding-left: 15em;\n  }\n\n  .ql-editor li.ql-indent-5:not(.ql-direction-rtl) {\n    padding-left: 16.5em;\n  }\n\n  .ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {\n    padding-right: 15em;\n  }\n\n  .ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {\n    padding-right: 16.5em;\n  }\n\n  .ql-editor .ql-indent-6:not(.ql-direction-rtl) {\n    padding-left: 18em;\n  }\n\n  .ql-editor li.ql-indent-6:not(.ql-direction-rtl) {\n    padding-left: 19.5em;\n  }\n\n  .ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {\n    padding-right: 18em;\n  }\n\n  .ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {\n    padding-right: 19.5em;\n  }\n\n  .ql-editor .ql-indent-7:not(.ql-direction-rtl) {\n    padding-left: 21em;\n  }\n\n  .ql-editor li.ql-indent-7:not(.ql-direction-rtl) {\n    padding-left: 22.5em;\n  }\n\n  .ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {\n    padding-right: 21em;\n  }\n\n  .ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {\n    padding-right: 22.5em;\n  }\n\n  .ql-editor .ql-indent-8:not(.ql-direction-rtl) {\n    padding-left: 24em;\n  }\n\n  .ql-editor li.ql-indent-8:not(.ql-direction-rtl) {\n    padding-left: 25.5em;\n  }\n\n  .ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {\n    padding-right: 24em;\n  }\n\n  .ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {\n    padding-right: 25.5em;\n  }\n\n  .ql-editor .ql-indent-9:not(.ql-direction-rtl) {\n    padding-left: 27em;\n  }\n\n  .ql-editor li.ql-indent-9:not(.ql-direction-rtl) {\n    padding-left: 28.5em;\n  }\n\n  .ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {\n    padding-right: 27em;\n  }\n\n  .ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {\n    padding-right: 28.5em;\n  }\n\n\n  .ql-editor .ql-bg-black {\n    background-color: #000;\n  }\n\n  .ql-editor .ql-bg-red {\n    background-color: #e60000;\n  }\n\n  .ql-editor .ql-bg-orange {\n    background-color: #f90;\n  }\n\n  .ql-editor .ql-bg-yellow {\n    background-color: #ff0;\n  }\n\n  .ql-editor .ql-bg-green {\n    background-color: #008a00;\n  }\n\n  .ql-editor .ql-bg-blue {\n    background-color: #06c;\n  }\n\n  .ql-editor .ql-bg-purple {\n    background-color: #93f;\n  }\n\n  .ql-editor .ql-color-white {\n    color: #fff;\n  }\n\n  .ql-editor .ql-color-red {\n    color: #e60000;\n  }\n\n  .ql-editor .ql-color-orange {\n    color: #f90;\n  }\n\n  .ql-editor .ql-color-yellow {\n    color: #ff0;\n  }\n\n  .ql-editor .ql-color-green {\n    color: #008a00;\n  }\n\n  .ql-editor .ql-color-blue {\n    color: #06c;\n  }\n\n  .ql-editor .ql-color-purple {\n    color: #93f;\n  }\n\n  .ql-editor .ql-font-serif {\n    font-family: Georgia, Times New Roman, serif;\n  }\n\n  .ql-editor .ql-font-monospace {\n    font-family: Monaco, Courier New, monospace;\n  }\n\n  .ql-editor .ql-size-small {\n    font-size: 0.75em;\n  }\n\n  .ql-editor .ql-size-large {\n    font-size: 1.5em;\n  }\n\n  .ql-editor .ql-size-huge {\n    font-size: 2.5em;\n  }\n\n  .ql-editor .ql-direction-rtl {\n    direction: rtl;\n    text-align: inherit;\n  }\n\n  .ql-editor .ql-align-center {\n    text-align: center;\n  }\n\n  .ql-editor .ql-align-justify {\n    text-align: justify;\n  }\n\n  .ql-editor .ql-align-right {\n    text-align: right;\n  }\n\n  .ql-editor.ql-blank::before {\n    color: rgba(0, 0, 0, 0.6);\n    content: attr(data-placeholder);\n    font-style: italic;\n    left: 15px;\n    pointer-events: none;\n    position: absolute;\n    right: 15px;\n  }\n\n  .ql-snow.ql-toolbar:after,\n  .ql-toolbar:after {\n    clear: both;\n    content: '';\n    display: table;\n  }\n\n  .ql-snow.ql-toolbar button,\n  .ql-toolbar button {\n    background: none;\n    border: none;\n    cursor: pointer;\n    display: inline-block;\n    float: left;\n    height: 24px;\n    padding: 3px 5px;\n    width: 28px;\n  }\n\n  .ql-snow.ql-toolbar button svg,\n  .ql-toolbar button svg {\n    float: left;\n    height: 100%;\n  }\n\n  .ql-snow.ql-toolbar button:active:hover,\n  .ql-toolbar button:active:hover {\n    outline: none;\n  }\n\n  .ql-snow.ql-toolbar input.ql-image[type=file],\n  .ql-toolbar input.ql-image[type=file] {\n    display: none;\n  }\n\n  .ql-snow.ql-toolbar button:hover,\n  .ql-toolbar button:hover,\n  .ql-snow.ql-toolbar button:focus,\n  .ql-toolbar button:focus,\n  .ql-snow.ql-toolbar button.ql-active,\n  .ql-toolbar button.ql-active,\n  .ql-snow.ql-toolbar .ql-picker-label:hover,\n  .ql-toolbar .ql-picker-label:hover,\n  .ql-snow.ql-toolbar .ql-picker-label.ql-active,\n  .ql-toolbar .ql-picker-label.ql-active,\n  .ql-snow.ql-toolbar .ql-picker-item:hover,\n  .ql-toolbar .ql-picker-item:hover,\n  .ql-snow.ql-toolbar .ql-picker-item.ql-selected,\n  .ql-toolbar .ql-picker-item.ql-selected {\n    color: #1E2134;\n  }\n\n  .ql-snow.ql-toolbar button:hover .ql-fill,\n  .ql-toolbar button:hover .ql-fill,\n  .ql-snow.ql-toolbar button:focus .ql-fill,\n  .ql-toolbar button:focus .ql-fill,\n  .ql-snow.ql-toolbar button.ql-active .ql-fill,\n  .ql-toolbar button.ql-active .ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,\n  .ql-toolbar .ql-picker-label:hover .ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,\n  .ql-toolbar .ql-picker-label.ql-active .ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,\n  .ql-toolbar .ql-picker-item:hover .ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n  .ql-toolbar .ql-picker-item.ql-selected .ql-fill,\n  .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,\n  .ql-toolbar button:hover .ql-stroke.ql-fill,\n  .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,\n  .ql-toolbar button:focus .ql-stroke.ql-fill,\n  .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,\n  .ql-toolbar button.ql-active .ql-stroke.ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n  .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n  .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n  .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,\n  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,\n  .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {\n    fill: #1E2134;\n  }\n\n  .ql-snow.ql-toolbar button:hover .ql-stroke,\n  .ql-toolbar button:hover .ql-stroke,\n  .ql-snow.ql-toolbar button:focus .ql-stroke,\n  .ql-toolbar button:focus .ql-stroke,\n  .ql-snow.ql-toolbar button.ql-active .ql-stroke,\n  .ql-toolbar button.ql-active .ql-stroke,\n  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,\n  .ql-toolbar .ql-picker-label:hover .ql-stroke,\n  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n  .ql-toolbar .ql-picker-label.ql-active .ql-stroke,\n  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,\n  .ql-toolbar .ql-picker-item:hover .ql-stroke,\n  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n  .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,\n  .ql-snow.ql-toolbar button:hover .ql-stroke-miter,\n  .ql-toolbar button:hover .ql-stroke-miter,\n  .ql-snow.ql-toolbar button:focus .ql-stroke-miter,\n  .ql-toolbar button:focus .ql-stroke-miter,\n  .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,\n  .ql-toolbar button.ql-active .ql-stroke-miter,\n  .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n  .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,\n  .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n  .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,\n  .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n  .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,\n  .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,\n  .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {\n    stroke: #1E2134;\n  }\n\n  @media (pointer: coarse) {\n    .ql-snow.ql-toolbar button:hover:not(.ql-active),\n    .ql-toolbar button:hover:not(.ql-active) {\n      color: #506176;\n    }\n\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,\n    .ql-toolbar button:hover:not(.ql-active) .ql-fill,\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,\n    .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {\n      fill: #506176;\n    }\n\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n    .ql-toolbar button:hover:not(.ql-active) .ql-stroke,\n    .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,\n    .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {\n      stroke: #506176;\n    }\n  } {\n  box-sizing: border-box;\n}\n\n  * {\n    box-sizing: border-box;\n  }\n\n  .ql-hidden {\n    display: none;\n  }\n\n  .ql-out-bottom,\n  .ql-out-top {\n    visibility: hidden;\n  }\n\n  .ql-tooltip {\n    position: absolute;\n    transform: translateY(10px);\n  }\n\n  .ql-tooltip a {\n    cursor: pointer;\n    text-decoration: none;\n  }\n\n  .ql-tooltip.ql-flip {\n    transform: translateY(-10px);\n  }\n\n  .ql-formats {\n    display: inline-block;\n    vertical-align: middle;\n  }\n\n  .ql-formats:after {\n    clear: both;\n    content: '';\n    display: table;\n  }\n\n  .ql-stroke {\n    fill: none;\n    stroke: #506176;\n    stroke-linecap: round;\n    stroke-linejoin: round;\n    stroke-width: 2;\n  }\n\n  .ql-stroke-miter {\n    fill: none;\n    stroke: #506176;\n    stroke-miterlimit: 10;\n    stroke-width: 2;\n  }\n\n  .ql-fill,\n  .ql-stroke.ql-fill {\n    fill: #506176;\n  }\n\n  .ql-empty {\n    fill: none;\n  }\n\n  .ql-even {\n    fill-rule: evenodd;\n  }\n\n  .ql-thin,\n  .ql-stroke.ql-thin {\n    stroke-width: 1;\n  }\n\n  .ql-transparent {\n    opacity: 0.4;\n  }\n\n  .ql-direction svg:last-child {\n    display: none;\n  }\n\n  .ql-direction.ql-active svg:last-child {\n    display: inline;\n  }\n\n  .ql-direction.ql-active svg:first-child {\n    display: none;\n  }\n\n  .ql-editor h1 {\n    font-size: 2em;\n  }\n\n  .ql-editor h2 {\n    font-size: 1.5em;\n  }\n\n  .ql-editor h3 {\n    font-size: 1.17em;\n  }\n\n  .ql-editor h4 {\n    font-size: 1em;\n  }\n\n  .ql-editor h5 {\n    font-size: 0.83em;\n  }\n\n  .ql-editor h6 {\n    font-size: 0.67em;\n  }\n\n  .ql-editor a {\n    text-decoration: underline;\n  }\n\n  .ql-editor blockquote {\n    border-left: 4px solid #ccc;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    padding-left: 16px;\n  }\n\n  .ql-editor code,\n  .ql-editor pre {\n    background-color: #f0f0f0;\n    border-radius: 3px;\n  }\n\n  .ql-editor pre {\n    white-space: pre-wrap;\n    margin-bottom: 5px;\n    margin-top: 5px;\n    padding: 5px 10px;\n  }\n\n  .ql-editor code {\n    font-size: 85%;\n    padding: 2px 4px;\n  }\n\n  .ql-editor pre.ql-syntax {\n    background-color: #23241f;\n    color: #f8f8f2;\n    overflow: visible;\n  }\n\n  .ql-editor img {\n    max-width: 100%;\n  }\n\n  .ql-picker {\n    color: #506176;\n    display: inline-block;\n    float: left;\n    font-size: 14px;\n    font-weight: 500;\n    height: 24px;\n    position: relative;\n    vertical-align: middle;\n  }\n\n  .ql-picker-label {\n    cursor: pointer;\n    display: inline-block;\n    height: 100%;\n    padding-left: 8px;\n    padding-right: 22px;\n    position: relative;\n    width: 100%;\n  }\n\n  .ql-picker-label::before {\n    display: inline-block;\n    line-height: 24px;\n  }\n\n  .ql-picker-options {\n    background-color: #fff;\n    display: none;\n    min-width: 100%;\n    padding: 4px 8px;\n    position: absolute;\n    white-space: nowrap;\n  }\n\n  .ql-picker-options .ql-picker-item {\n    cursor: pointer;\n    display: block;\n    padding-bottom: 5px;\n    padding-top: 5px;\n  }\n\n  .ql-picker.ql-expanded .ql-picker-label {\n    color: #ccc;\n    z-index: 2;\n  }\n\n  .ql-picker.ql-expanded .ql-picker-label .ql-fill {\n    fill: #ccc;\n  }\n\n  .ql-picker.ql-expanded .ql-picker-label .ql-stroke {\n    stroke: #ccc;\n  }\n\n  .ql-picker.ql-expanded .ql-picker-options {\n    display: block;\n    margin-top: -1px;\n    top: 100%;\n    z-index: 1;\n  }\n\n  .ql-color-picker,\n  .ql-icon-picker {\n    width: 28px;\n  }\n\n  .ql-color-picker .ql-picker-label,\n  .ql-icon-picker .ql-picker-label {\n    padding: 2px 4px;\n  }\n\n  .ql-color-picker .ql-picker-label svg,\n  .ql-icon-picker .ql-picker-label svg {\n    right: 4px;\n  }\n\n  .ql-icon-picker .ql-picker-options {\n    padding: 4px 0px;\n  }\n\n  .ql-icon-picker .ql-picker-item {\n    height: 24px;\n    width: 24px;\n    padding: 2px 4px;\n  }\n\n  .ql-color-picker .ql-picker-options {\n    padding: 3px 5px;\n    width: 152px;\n  }\n\n  .ql-color-picker .ql-picker-item {\n    border: 1px solid transparent;\n    float: left;\n    height: 16px;\n    margin: 2px;\n    padding: 0px;\n    width: 16px;\n  }\n\n  .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {\n    position: absolute;\n    margin-top: -9px;\n    right: 0;\n    top: 50%;\n    width: 18px;\n\n    polygon {\n      stroke: #506176;\n\n      :hover {\n        stroke: #1E2134;\n        color: #1E2134;\n      }\n    }\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,\n  .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,\n  .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,\n  .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before,\n  .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before,\n  .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before {\n    content: attr(data-label);\n  }\n\n  .ql-formats {\n    button {\n      svg {\n        :hover {\n          path {\n            fill: #1E2134;\n          }\n        }\n      }\n    }\n  }\n\n  select.ql-header {\n    width: 98px;\n    color: #506176;\n    display: inline-block;\n    float: left;\n    font-size: 14px;\n    font-weight: 500;\n    height: 24px;\n    position: relative;\n    vertical-align: middle;\n    background: #F6F7FA;\n  }\n\n  option {\n    display: block;\n  }\n\n  .ql-toolbar, .ql-formats {\n    display: flex;\n    flex-wrap: nowrap;\n    background: #F6F7FA;\n  }\n\n  .ql-toolbar {\n    align-items: center;\n    height: 40px;\n  }\n\n  .ql-formats {\n    gap: 8px;\n  }\n\n  .ql-formats button {\n    padding: 0;\n  }\n\n  .ql-picker.ql-header .ql-picker-label::before,\n  .ql-header .ql-picker-item::before {\n    display: block;\n    content: 'Normal';\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-value=\"1\"]::before,\n  .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before {\n    content: 'Heading 1';\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-value=\"2\"]::before,\n  .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before {\n    content: 'Heading 2';\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-value=\"3\"]::before,\n  .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before {\n    content: 'Heading 3';\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-value=\"4\"]::before,\n  .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before {\n    content: 'Heading 4';\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-value=\"5\"]::before,\n  .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before {\n    content: 'Heading 5';\n  }\n\n  .ql-picker.ql-header .ql-picker-label[data-value=\"6\"]::before,\n  .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before {\n    content: 'Heading 6';\n  }\n\n  .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before {\n    font-size: 2em;\n  }\n\n  .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before {\n    font-size: 1.5em;\n  }\n\n  .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before {\n    font-size: 1.17em;\n  }\n\n  .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before {\n    font-size: 1em;\n  }\n\n  .ql-picker.ql-header .ql-picker-item[data-value=\"5\"]::before {\n    font-size: 0.83em;\n  }\n\n  .ql-picker.ql-header .ql-picker-item[data-value=\"6\"]::before {\n    font-size: 0.67em;\n  }\n\n  .ql-picker.ql-font {\n    width: 108px;\n  }\n\n  .ql-picker.ql-font .ql-picker-label::before,\n  .ql-picker.ql-font .ql-picker-item::before {\n    content: 'Sans Serif';\n  }\n\n  .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,\n  .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n    content: 'Serif';\n  }\n\n  .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,\n  .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n    content: 'Monospace';\n  }\n\n  .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {\n    font-family: Georgia, Times New Roman, serif;\n  }\n\n  .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {\n    font-family: Monaco, Courier New, monospace;\n  }\n\n  .ql-picker.ql-size {\n    width: 98px;\n  }\n\n  .ql-picker.ql-size .ql-picker-label::before,\n  .ql-picker.ql-size .ql-picker-item::before {\n    content: 'Normal';\n  }\n\n  .ql-picker.ql-size .ql-picker-label[data-value=small]::before,\n  .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n    content: 'Small';\n  }\n\n  .ql-picker.ql-size .ql-picker-label[data-value=large]::before,\n  .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n    content: 'Large';\n  }\n\n  .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,\n  .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n    content: 'Huge';\n  }\n\n  .ql-picker.ql-size .ql-picker-item[data-value=small]::before {\n    font-size: 10px;\n  }\n\n  .ql-picker.ql-size .ql-picker-item[data-value=large]::before {\n    font-size: 18px;\n  }\n\n  .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {\n    font-size: 32px;\n  }\n\n  .ql-color-picker.ql-background .ql-picker-item {\n    background-color: #fff;\n  }\n\n  .ql-color-picker.ql-color .ql-picker-item {\n    background-color: #000;\n  }\n\n  .ql-toolbar {\n    box-sizing: border-box;\n    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;\n    padding: 8px;\n    justify-content: end;\n    height: 41px;\n    border-bottom: 1px solid #E0E4EB;\n  }\n\n  .ql-toolbar.ql-formats {\n    margin-right: 15px;\n  }\n\n  .ql-toolbar.ql-picker-label {\n    border: 1px solid transparent;\n  }\n\n  .ql-toolbar.ql-picker-options {\n    border: 1px solid transparent;\n    box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px;\n  }\n\n  .ql-toolbar.ql-picker.ql-expanded .ql-picker-label {\n    border-color: #ccc;\n  }\n\n  .ql-toolbar.ql-picker.ql-expanded .ql-picker-options {\n    border-color: #ccc;\n  }\n\n  .ql-toolbar.ql-color-picker .ql-picker-item.ql-selected,\n  .ql-toolbar.ql-color-picker .ql-picker-item:hover {\n    border-color: #000;\n  }\n\n  .ql-toolbar + .ql-container {\n    border-top: 0px;\n  }\n\n  .ql-tooltip {\n    background-color: #fff;\n    border: 1px solid #ccc;\n    box-shadow: 0px 0px 5px #ddd;\n    color: #506176;\n    padding: 5px 12px;\n    white-space: nowrap;\n  }\n\n  .ql-tooltip::before {\n    content: \"Visit URL:\";\n    line-height: 26px;\n    margin-right: 8px;\n  }\n\n  .ql-tooltip input[type=text] {\n    display: none;\n    border: 1px solid #ccc;\n    font-size: 13px;\n    height: 26px;\n    margin: 0px;\n    padding: 3px 5px;\n    width: 170px;\n  }\n\n  .ql-tooltip a.ql-preview {\n    display: inline-block;\n    max-width: 200px;\n    overflow-x: hidden;\n    text-overflow: ellipsis;\n    vertical-align: top;\n  }\n\n  .ql-tooltip a.ql-action::after {\n    border-right: 1px solid #ccc;\n    content: 'Edit';\n    margin-left: 16px;\n    padding-right: 8px;\n  }\n\n  .ql-tooltip a.ql-remove::before {\n    content: 'Remove';\n    margin-left: 8px;\n  }\n\n  .ql-tooltip a {\n    line-height: 26px;\n  }\n\n  .ql-tooltip.ql-editing a.ql-preview,\n  .ql-tooltip.ql-editing a.ql-remove {\n    display: none;\n  }\n\n  .ql-tooltip.ql-editing input[type=text] {\n    display: inline-block;\n  }\n\n  .ql-tooltip.ql-editing a.ql-action::after {\n    border-right: 0px;\n    content: 'Save';\n    padding-right: 0px;\n  }\n\n  .ql-tooltip[data-mode=link]::before {\n    content: \"Enter link:\";\n  }\n\n  .ql-tooltip[data-mode=formula]::before {\n    content: \"Enter formula:\";\n  }\n\n  .ql-tooltip[data-mode=video]::before {\n    content: \"Enter video:\";\n  }\n\n  a {\n    color: #06c;\n  }\n"])), function (props) {
    return props.isPreview && styled.css(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["\n              display: none !important;\n            "], ["\n              display: none !important;\n            "])));
});
var templateObject_1$5, templateObject_2$3;

var StateToggle = styled__default["default"].div(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  position: absolute;\n  display: flex;\n\n  button {\n    all: unset;\n    padding: 12px;\n    padding-bottom: 13px;\n    font-size: 14px;\n    line-height: 14px;\n    font-weight: 500;\n    cursor: pointer;\n    //border-radius: 4px;\n    color: #9DA9BB;\n    //border: 1px solid #E0E4EB;\n    border-top: none;\n  }\n\n  button.active {\n    background-color: #ffffff;\n    box-shadow: 0 1px 0 0 white;\n    color: #1E2134;\n    :hover {\n      color: #1E2134;\n    }\n  }\n\n  button:hover {\n    color: #506176;\n  }\n"], ["\n  position: absolute;\n  display: flex;\n\n  button {\n    all: unset;\n    padding: 12px;\n    padding-bottom: 13px;\n    font-size: 14px;\n    line-height: 14px;\n    font-weight: 500;\n    cursor: pointer;\n    //border-radius: 4px;\n    color: #9DA9BB;\n    //border: 1px solid #E0E4EB;\n    border-top: none;\n  }\n\n  button.active {\n    background-color: #ffffff;\n    box-shadow: 0 1px 0 0 white;\n    color: #1E2134;\n    :hover {\n      color: #1E2134;\n    }\n  }\n\n  button:hover {\n    color: #506176;\n  }\n"])));
var templateObject_1$4;

var overrideIcons = function (icons) {
    icons["bold"] = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4 2C3.44772 2 3 2.44772 3 3V8V13C3 13.5523 3.44772 14 4 14H9.5C11.433 14 13 12.433 13 10.5C13 9.24701 12.3416 8.14781 11.3519 7.52949C11.7599 6.95707 12 6.25657 12 5.5C12 3.567 10.433 2 8.5 2H4ZM8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4H5V7H8.5ZM5 9V12H9.5C10.3284 12 11 11.3284 11 10.5C11 9.67157 10.3284 9 9.5 9H8.5H5Z\" fill=\"#506176\"/></svg>";
    icons["underline"] = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M4.29725 1.30762C4.70622 1.30762 5.03777 1.63916 5.03777 2.04814V7.28694C5.03777 8.07253 5.34984 8.82595 5.90534 9.38144C6.46084 9.93694 7.21426 10.249 7.99985 10.249C8.78544 10.249 9.53886 9.93694 10.0944 9.38144C10.6499 8.82595 10.9619 8.07253 10.9619 7.28694V2.04814C10.9619 1.63916 11.2935 1.30762 11.7025 1.30762C12.1114 1.30762 12.443 1.63916 12.443 2.04814V7.28694C12.443 8.46533 11.9749 9.59545 11.1416 10.4287C10.3084 11.2619 9.17824 11.7301 7.99985 11.7301C6.82146 11.7301 5.69133 11.2619 4.85809 10.4287C4.02484 9.59545 3.55673 8.46533 3.55673 7.28694V2.04814C3.55673 1.63916 3.88827 1.30762 4.29725 1.30762ZM2.07568 13.9516C2.07568 13.5426 2.40723 13.2111 2.8162 13.2111H13.1835C13.5925 13.2111 13.924 13.5426 13.924 13.9516C13.924 14.3606 13.5925 14.6921 13.1835 14.6921H2.8162C2.40723 14.6921 2.07568 14.3606 2.07568 13.9516Z\" fill=\"#506176\"/>\n</svg>\n";
    icons["strike"] = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12.1343 9.60413C12.3188 10.0181 12.4118 10.4785 12.4118 10.9839C12.4118 12.0605 11.9915 12.9028 11.1516 13.5085C10.31 14.1142 9.14924 14.4174 7.66756 14.4174C6.50209 14.4174 5.34733 14.1775 4.20271 13.6973C3.9301 13.5829 3.7608 13.3112 3.7608 13.0156C3.7608 12.4263 4.40477 12.0516 4.95484 12.263C5.79149 12.5846 6.6411 12.7456 7.50391 12.7456C9.55035 12.7456 10.5764 12.1584 10.5836 10.9831C10.5878 10.7448 10.544 10.5082 10.4547 10.2872C10.3463 10.0191 10.172 9.80275 9.9675 9.60333H0.779785V7.99891H15.2196V9.60333L12.1343 9.60413ZM8.86285 7.1975H4.49322C4.35269 7.06937 4.22358 6.92926 4.10735 6.77875C3.7608 6.33111 3.58752 5.79042 3.58752 5.15347C3.58752 4.16194 3.96135 3.31882 4.70821 2.6241C5.45667 1.92939 6.61265 1.58203 8.17777 1.58203C9.20623 1.58203 10.1963 1.7819 11.1469 2.18163C11.4058 2.29047 11.5647 2.5495 11.5647 2.8303C11.5647 3.3948 10.9454 3.75845 10.4089 3.58295C9.77395 3.37524 9.10411 3.27148 8.39918 3.27148C6.4097 3.27148 5.41576 3.89881 5.41576 5.15347C5.41576 5.4904 5.59064 5.78401 5.9404 6.0351C6.29016 6.28619 6.72175 6.48594 7.23437 6.63675C7.73174 6.78115 8.27483 6.96887 8.86285 7.1975Z\" fill=\"#506176\"/>\n</svg>\n";
    icons["link"] = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.77518 3.27518C7.6427 3.41735 7.57057 3.6054 7.574 3.7997C7.57743 3.994 7.65614 4.17938 7.79355 4.3168C7.93097 4.45421 8.11635 4.53292 8.31065 4.53635C8.50495 4.53978 8.693 4.46766 8.83518 4.33518L10.0852 3.08518C10.271 2.89936 10.4916 2.75195 10.7344 2.65139C10.9772 2.55082 11.2374 2.49906 11.5002 2.49906C11.763 2.49906 12.0232 2.55082 12.266 2.65139C12.5088 2.75195 12.7294 2.89936 12.9152 3.08518C13.101 3.271 13.2484 3.4916 13.349 3.73438C13.4495 3.97717 13.5013 4.23739 13.5013 4.50018C13.5013 4.76297 13.4495 5.02318 13.349 5.26597C13.2484 5.50875 13.101 5.72935 12.9152 5.91518L10.4152 8.41518C10.2294 8.60113 10.0089 8.74865 9.76606 8.84929C9.52326 8.94994 9.26301 9.00175 9.00018 9.00175C8.73734 9.00175 8.47709 8.94994 8.23429 8.84929C7.9915 8.74865 7.77092 8.60113 7.58518 8.41518C7.443 8.2827 7.25495 8.21057 7.06065 8.214C6.86635 8.21743 6.68097 8.29614 6.54355 8.43355C6.40614 8.57097 6.32743 8.75635 6.324 8.95065C6.32057 9.14495 6.3927 9.333 6.52518 9.47518C6.85019 9.80022 7.23604 10.0581 7.6607 10.234C8.08536 10.4099 8.54052 10.5004 9.00018 10.5004C9.45983 10.5004 9.91499 10.4099 10.3397 10.234C10.7643 10.0581 11.1502 9.80022 11.4752 9.47518L13.9752 6.97518C14.6316 6.31876 15.0004 5.42848 15.0004 4.50018C15.0004 3.57187 14.6316 2.68159 13.9752 2.02518C13.3188 1.36876 12.4285 1 11.5002 1C10.5719 1 9.68159 1.36876 9.02517 2.02518L7.77518 3.27518ZM3.08518 12.9152C2.89922 12.7294 2.7517 12.5089 2.65106 12.2661C2.55041 12.0233 2.4986 11.763 2.4986 11.5002C2.4986 11.2374 2.55041 10.9771 2.65106 10.7343C2.7517 10.4915 2.89922 10.2709 3.08518 10.0852L5.58518 7.58518C5.77092 7.39922 5.9915 7.2517 6.23429 7.15106C6.47709 7.05041 6.73734 6.9986 7.00018 6.9986C7.26301 6.9986 7.52326 7.05041 7.76606 7.15106C8.00885 7.2517 8.22943 7.39922 8.41518 7.58518C8.55735 7.71766 8.7454 7.78978 8.9397 7.78635C9.134 7.78292 9.31938 7.70421 9.4568 7.5668C9.59421 7.42938 9.67292 7.244 9.67635 7.0497C9.67978 6.8554 9.60766 6.66735 9.47518 6.52518C9.15017 6.20013 8.76431 5.94229 8.33965 5.76638C7.91499 5.59047 7.45983 5.49992 7.00018 5.49992C6.54052 5.49992 6.08536 5.59047 5.6607 5.76638C5.23604 5.94229 4.85019 6.20013 4.52518 6.52518L2.02518 9.02517C1.36876 9.68159 1 10.5719 1 11.5002C1 12.4285 1.36876 13.3188 2.02518 13.9752C2.68159 14.6316 3.57187 15.0004 4.50018 15.0004C5.42848 15.0004 6.31876 14.6316 6.97518 13.9752L8.22518 12.7252C8.35766 12.583 8.42978 12.395 8.42635 12.2007C8.42292 12.0064 8.34421 11.821 8.2068 11.6836C8.06938 11.5462 7.884 11.4674 7.6897 11.464C7.4954 11.4606 7.30735 11.5327 7.16518 11.6652L5.91518 12.9152C5.72943 13.1011 5.50885 13.2487 5.26606 13.3493C5.02326 13.45 4.76301 13.5018 4.50018 13.5018C4.23734 13.5018 3.97709 13.45 3.73429 13.3493C3.4915 13.2487 3.27092 13.1011 3.08518 12.9152Z\" fill=\"#506176\"/>\n</svg>\n";
    icons["image"] = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g clip-path=\"url(#clip0_5445_38251)\">\n<path d=\"M14.0002 10V12H16.0002V13.3333H14.0002V15.3333H12.6668V13.3333H10.6668V12H12.6668V10H14.0002ZM14.0055 2C14.3708 2 14.6668 2.29667 14.6668 2.662V8.89467C14.2386 8.7434 13.7877 8.66629 13.3335 8.66667V3.33333H2.66683L2.6675 12.6667L8.86216 6.47133C8.9768 6.35632 9.12951 6.28715 9.29157 6.27684C9.45363 6.26653 9.61387 6.31578 9.74216 6.41533L9.80416 6.472L12.1682 8.83867C11.6513 8.99618 11.1716 9.25674 10.7581 9.60464C10.3446 9.95254 10.0059 10.3806 9.76233 10.8629C9.51875 11.3453 9.37538 11.872 9.34087 12.4113C9.30635 12.9505 9.3814 13.4912 9.5615 14.0007L1.99483 14C1.81937 13.9998 1.65116 13.93 1.52716 13.8059C1.40315 13.6817 1.3335 13.5135 1.3335 13.338V2.662C1.33472 2.48692 1.40476 2.31934 1.5285 2.19548C1.65225 2.07161 1.81975 2.0014 1.99483 2H14.0055ZM5.3335 4.66667C5.68712 4.66667 6.02626 4.80714 6.2763 5.05719C6.52635 5.30724 6.66683 5.64638 6.66683 6C6.66683 6.35362 6.52635 6.69276 6.2763 6.94281C6.02626 7.19286 5.68712 7.33333 5.3335 7.33333C4.97987 7.33333 4.64074 7.19286 4.39069 6.94281C4.14064 6.69276 4.00016 6.35362 4.00016 6C4.00016 5.64638 4.14064 5.30724 4.39069 5.05719C4.64074 4.80714 4.97987 4.66667 5.3335 4.66667Z\" fill=\"#506176\"/>\n</g>\n<defs>\n<clipPath id=\"clip0_5445_38251\">\n<rect width=\"16\" height=\"16\" fill=\"white\"/>\n</clipPath>\n</defs>\n</svg>\n";
    icons["video"] = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.99121 1.34968H2.0001C1.64111 1.34968 1.3501 1.64069 1.3501 1.99968V13.9997C1.3501 14.3587 1.64111 14.6497 2.0001 14.6497H14.0001C14.3591 14.6497 14.6501 14.3587 14.6501 13.9997V5.0008C14.6501 5.00043 14.6501 5.00005 14.6501 4.99968C14.6501 4.9993 14.6501 4.99893 14.6501 4.99855V1.99968C14.6501 1.64069 14.3591 1.34968 14.0001 1.34968H11.0102C11.0039 1.34959 10.9975 1.34959 10.9912 1.34968H7.01018C7.00385 1.34959 6.99753 1.34959 6.99121 1.34968ZM9.78556 2.64968H7.34797L6.21463 4.34968H8.65223L9.78556 2.64968ZM11.348 2.64968L10.2146 4.34968H13.3501V2.64968H11.348ZM13.3501 5.64968H9.00898C9.00267 5.64977 8.99634 5.64977 8.99002 5.64968H5.00898C5.00267 5.64977 4.99634 5.64977 4.99002 5.64968H2.6501V13.3497H13.3501V5.64968ZM2.6501 4.34968H4.65223L5.78556 2.64968H2.6501V4.34968ZM6.50843 6.74941C6.70954 6.6333 6.95732 6.6333 7.15843 6.74941L10.6584 8.77015C10.8595 8.88626 10.9834 9.10084 10.9834 9.33306C10.9834 9.56528 10.8595 9.77987 10.6584 9.89598L7.15843 11.9167C6.95732 12.0328 6.70954 12.0328 6.50843 11.9167C6.30732 11.8006 6.18343 11.586 6.18343 11.3538V7.31233C6.18343 7.08011 6.30732 6.86552 6.50843 6.74941ZM7.48343 8.43816V10.228L9.03343 9.33306L7.48343 8.43816Z\" fill=\"#506176\"/>\n</svg>\n";
    icons["blockquote"] = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M3.05533 11.5468C2.36867 10.8175 2 9.99951 2 8.67351C2 6.34018 3.638 4.24884 6.02 3.21484L6.61533 4.13351C4.392 5.33618 3.95733 6.89684 3.784 7.88084C4.142 7.69551 4.61067 7.63084 5.07 7.67351C6.27267 7.78484 7.22067 8.77218 7.22067 9.99951C7.22067 10.6183 6.97483 11.2118 6.53725 11.6494C6.09966 12.087 5.50617 12.3328 4.88733 12.3328C4.172 12.3328 3.488 12.0062 3.05533 11.5468V11.5468ZM9.722 11.5468C9.03533 10.8175 8.66667 9.99951 8.66667 8.67351C8.66667 6.34018 10.3047 4.24884 12.6867 3.21484L13.282 4.13351C11.0587 5.33618 10.624 6.89684 10.4507 7.88084C10.8087 7.69551 11.2773 7.63084 11.7367 7.67351C12.9393 7.78484 13.8873 8.77218 13.8873 9.99951C13.8873 10.6183 13.6415 11.2118 13.2039 11.6494C12.7663 12.087 12.1728 12.3328 11.554 12.3328C10.8387 12.3328 10.1547 12.0062 9.722 11.5468V11.5468Z\" fill=\"#506176\"/>\n</svg>\n";
    icons["code-block"] = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.71967 3.21967C5.01256 2.92678 5.48744 2.92678 5.78033 3.21967C6.07322 3.51256 6.07322 3.98744 5.78033 4.28033L2.06066 8L5.78033 11.7197C6.07322 12.0126 6.07322 12.4874 5.78033 12.7803C5.48744 13.0732 5.01256 13.0732 4.71967 12.7803L0.46967 8.53033C0.176777 8.23744 0.176777 7.76256 0.46967 7.46967L4.71967 3.21967ZM11.2803 3.21967C10.9874 2.92678 10.5126 2.92678 10.2197 3.21967C9.92678 3.51256 9.92678 3.98744 10.2197 4.28033L13.9393 8L10.2197 11.7197C9.92678 12.0126 9.92678 12.4874 10.2197 12.7803C10.5126 13.0732 10.9874 13.0732 11.2803 12.7803L15.5303 8.53033C15.8232 8.23744 15.8232 7.76256 15.5303 7.46967L11.2803 3.21967Z\" fill=\"#506176\"/>\n</svg>\n";
    icons["list"] = {
        ordered: "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g clip-path=\"url(#clip0_5445_38277)\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2.00337 2.50005C2.00337 2.32685 1.91375 2.16599 1.76648 2.07484C1.61921 1.9837 1.43526 1.97525 1.28025 2.05252L0.277079 2.55256C0.0299152 2.67576 -0.0705754 2.976 0.0526264 3.22317C0.175828 3.47033 0.476068 3.57082 0.723232 3.44762L1.00328 3.30802V6.00036H0.500155C0.223988 6.00036 0.000110023 6.22424 0.000110023 6.50041C0.000110023 6.77657 0.223988 7.00045 0.500155 7.00045H2.5065C2.78267 7.00045 3.00655 6.77657 3.00655 6.50041C3.00655 6.22424 2.78267 6.00036 2.5065 6.00036H2.00337V2.50005ZM5 3.25C5 2.83579 5.33579 2.5 5.75 2.5H14.25C14.6642 2.5 15 2.83579 15 3.25C15 3.66421 14.6642 4 14.25 4H5.75C5.33579 4 5 3.66421 5 3.25ZM5 8.25C5 7.83579 5.33579 7.5 5.75 7.5H14.25C14.6642 7.5 15 7.83579 15 8.25C15 8.66421 14.6642 9 14.25 9H5.75C5.33579 9 5 8.66421 5 8.25ZM5 13.25C5 12.8358 5.33579 12.5 5.75 12.5H14.25C14.6642 12.5 15 12.8358 15 13.25C15 13.6642 14.6642 14 14.25 14H5.75C5.33579 14 5 13.6642 5 13.25ZM0.924398 10.32L0.927032 10.3161C0.931315 10.3099 0.939805 10.2981 0.952393 10.2825C0.978004 10.2507 1.01787 10.2066 1.07075 10.1628C1.17619 10.0753 1.31709 10.0007 1.50025 10.0007C1.69557 10.0007 1.80717 10.0693 1.87542 10.1467C1.95169 10.2332 2.00312 10.366 2.00312 10.5231C2.00312 10.9755 1.73398 11.2053 1.20308 11.6005L1.16805 11.6265C0.6919 11.9803 0.000122084 12.4944 0.000122084 13.4999C0.000122084 13.6325 0.0528052 13.7597 0.146582 13.8535C0.240359 13.9473 0.367547 14 0.500167 14H2.50309C2.77926 14 3.00321 13.7761 3.00321 13.4999C3.00321 13.2238 2.77933 12.9999 2.50317 12.9999H1.14611C1.27778 12.8026 1.49742 12.6281 1.80025 12.4027L1.84691 12.368C2.31766 12.0188 3.00321 11.5101 3.00321 10.5231C3.00321 10.1578 2.88489 9.77939 2.62556 9.48527C2.35821 9.18206 1.96836 9.00062 1.50027 9.00061C1.02002 9.0006 0.66087 9.20333 0.432114 9.39315C0.317894 9.48793 0.232132 9.58249 0.173885 9.65472C0.144543 9.69111 0.121547 9.72262 0.104827 9.74677C0.0964494 9.75887 0.0895948 9.76919 0.0842568 9.77744L0.0773676 9.78826L0.0747623 9.79245L0.0736683 9.79423L0.072939 9.79543C-0.070366 10.0315 0.00461414 10.3394 0.24069 10.4827C0.47501 10.625 0.779746 10.5519 0.924398 10.32ZM0.500117 10.0552L0.072939 9.79543C0.072939 9.79543 0.0727131 9.7958 0.500117 10.0552Z\" fill=\"#506176\"/>\n</g>\n<defs>\n<clipPath id=\"clip0_5445_38277\">\n<rect width=\"16\" height=\"16\" fill=\"white\"/>\n</clipPath>\n</defs>\n</svg>\n",
        bullet: "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2 4C2.55228 4 3 3.55228 3 3C3 2.44772 2.55228 2 2 2C1.44772 2 1 2.44772 1 3C1 3.55228 1.44772 4 2 4ZM5.75 2.5C5.33579 2.5 5 2.83579 5 3.25C5 3.66421 5.33579 4 5.75 4H14.25C14.6642 4 15 3.66421 15 3.25C15 2.83579 14.6642 2.5 14.25 2.5H5.75ZM5.75 7.5C5.33579 7.5 5 7.83579 5 8.25C5 8.66421 5.33579 9 5.75 9H14.25C14.6642 9 15 8.66421 15 8.25C15 7.83579 14.6642 7.5 14.25 7.5H5.75ZM5.75 12.5C5.33579 12.5 5 12.8358 5 13.25C5 13.6642 5.33579 14 5.75 14H14.25C14.6642 14 15 13.6642 15 13.25C15 12.8358 14.6642 12.5 14.25 12.5H5.75ZM3 8C3 8.55228 2.55228 9 2 9C1.44772 9 1 8.55228 1 8C1 7.44772 1.44772 7 2 7C2.55228 7 3 7.44772 3 8ZM2 14C2.55228 14 3 13.5523 3 13C3 12.4477 2.55228 12 2 12C1.44772 12 1 12.4477 1 13C1 13.5523 1.44772 14 2 14Z\" fill=\"#506176\"/>\n</svg>"
    };
    icons["align"] = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2.42864 2.5C2.03416 2.5 1.71436 2.83579 1.71436 3.25C1.71436 3.66421 2.03416 4 2.42864 4H13.5715C13.966 4 14.2858 3.66421 14.2858 3.25C14.2858 2.83579 13.966 2.5 13.5715 2.5H2.42864Z\" fill=\"#506176\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.28557 5.71387C4.89109 5.71387 4.57129 6.04966 4.57129 6.46387C4.57129 6.87808 4.89109 7.21387 5.28557 7.21387H10.7141C11.1086 7.21387 11.4284 6.87808 11.4284 6.46387C11.4284 6.04966 11.1086 5.71387 10.7141 5.71387H5.28557Z\" fill=\"#506176\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.28557 12.5713C4.89109 12.5713 4.57129 12.9071 4.57129 13.3213C4.57129 13.7355 4.89109 14.0713 5.28557 14.0713H10.7141C11.1086 14.0713 11.4284 13.7355 11.4284 13.3213C11.4284 12.9071 11.1086 12.5713 10.7141 12.5713H5.28557Z\" fill=\"#506176\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M2.42864 9.14258C2.03416 9.14258 1.71436 9.47837 1.71436 9.89258C1.71436 10.3068 2.03416 10.6426 2.42864 10.6426H13.5715C13.966 10.6426 14.2858 10.3068 14.2858 9.89258C14.2858 9.47837 13.966 9.14258 13.5715 9.14258H2.42864Z\" fill=\"#506176\"/>\n</svg>";
    icons["indent"] = {
        "+1": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1.46387 2.88535C1.46387 2.4843 1.78898 2.15918 2.19004 2.15918H13.8101C14.2112 2.15918 14.5363 2.4843 14.5363 2.88535C14.5363 3.2864 14.2112 3.61152 13.8101 3.61152H2.19004C1.78898 3.61152 1.46387 3.2864 1.46387 2.88535ZM1.46387 13.7779C1.46387 13.3768 1.78898 13.0517 2.19004 13.0517H13.8101C14.2112 13.0517 14.5363 13.3768 14.5363 13.7779C14.5363 14.1789 14.2112 14.5041 13.8101 14.5041H2.19003C1.78898 14.5041 1.46387 14.1789 1.46387 13.7779ZM7.27383 10.147C7.27383 9.74599 7.59895 9.42087 8 9.42087H13.8101C14.2112 9.42087 14.5363 9.74599 14.5363 10.147C14.5363 10.5481 14.2112 10.8732 13.8101 10.8732H8C7.59895 10.8732 7.27383 10.5481 7.27383 10.147ZM7.27383 6.51619C7.27383 6.11514 7.59895 5.79003 8 5.79003H13.8101C14.2112 5.79003 14.5363 6.11514 14.5363 6.51619C14.5363 6.91725 14.2112 7.24236 13.8101 7.24236H8C7.59895 7.24236 7.27383 6.91725 7.27383 6.51619ZM3.86413 7.89004C4.13132 8.1238 4.13132 8.53944 3.86413 8.7732L1.8531 10.5327C1.70135 10.6654 1.46387 10.5577 1.46387 10.356V6.3072C1.46387 6.10557 1.70135 5.9978 1.8531 6.13057L3.86413 7.89004Z\" fill=\"#506176\"/>\n</svg>",
        "-1": "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1.46436 2.88734C1.46436 2.48627 1.78949 2.16113 2.19056 2.16113H13.8099C14.211 2.16113 14.5361 2.48627 14.5361 2.88734C14.5361 3.28841 14.211 3.61355 13.8099 3.61355H2.19056C1.78949 3.61355 1.46436 3.28841 1.46436 2.88734ZM1.46436 13.7804C1.46436 13.3794 1.78949 13.0542 2.19056 13.0542H13.8099C14.211 13.0542 14.5361 13.3794 14.5361 13.7804C14.5361 14.1815 14.211 14.5067 13.8099 14.5067H2.19056C1.78949 14.5067 1.46436 14.1815 1.46436 13.7804ZM7.27401 10.1494C7.27401 9.74834 7.59915 9.42321 8.00022 9.42321H13.8099C14.211 9.42321 14.5361 9.74834 14.5361 10.1494C14.5361 10.5505 14.211 10.8756 13.8099 10.8756H8.00022C7.59915 10.8756 7.27401 10.5505 7.27401 10.1494ZM7.27401 6.51838C7.27401 6.1173 7.59915 5.79217 8.00022 5.79217H13.8099C14.211 5.79217 14.5361 6.1173 14.5361 6.51838C14.5361 6.91945 14.211 7.24458 13.8099 7.24458H8.00022C7.59915 7.24458 7.27401 6.91945 7.27401 6.51838ZM1.96911 8.77556C1.7019 8.54174 1.7019 8.12605 1.96911 7.89223L3.97986 6.13283C4.13164 6.00002 4.36918 6.10781 4.36918 6.3095V10.3583C4.36918 10.56 4.13164 10.6678 3.97986 10.535L1.96911 8.77556Z\" fill=\"#506176\"/>\n</svg>"
    };
    icons["table"] = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1 2.67897C1 2.30398 1.27842 2 1.62187 2H14.3781C14.7216 2 15 2.30398 15 2.67897V13.821C15 14.196 14.7216 14.5 14.3781 14.5H1.62187C1.27842 14.5 1 14.196 1 13.821C1 10.107 1 6.39299 1 2.67897ZM2.24374 7.18802V9.48624H5.14579V7.18802H2.24374ZM2.24374 5.83008V3.35794H13.7563V5.83008H2.24374ZM6.38952 7.18802V9.48624H9.61048V7.18802H6.38952ZM10.8542 7.18802V9.48624H13.7563V7.18802H10.8542ZM13.7563 10.8442H10.8542V13.1421H13.7563V10.8442ZM9.61048 13.1421V10.8442H6.38952V13.1421H9.61048ZM5.14579 13.1421V10.8442H2.24374V13.1421H5.14579Z\" fill=\"#506176\"/>\n</svg>\n";
    return icons;
};

function attachDataValues(element, data, dataAttributes) {
    var mention = element;
    Object.keys(data).forEach(function (key) {
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
    return mentionDenotationChars.reduce(function (prev, mentionChar) {
        var mentionCharIndex = text.lastIndexOf(mentionChar);
        if (mentionCharIndex > prev.mentionCharIndex) {
            return {
                mentionChar: mentionChar,
                mentionCharIndex: mentionCharIndex
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

var Embed = Quill__default["default"].import("blots/embed");
var MentionBlot = /** @class */ (function (_super) {
    __extends(MentionBlot, _super);
    function MentionBlot(scroll, node) {
        var _this = _super.call(this, scroll, node) || this;
        _this.clickHandler = null;
        _this.hoverHandler = null;
        _this.mounted = false;
        return _this;
    }
    MentionBlot.create = function (data) {
        var node = _super.create.call(this);
        var denotationChar = document.createElement("span");
        denotationChar.className = "ql-mention-denotation-char";
        denotationChar.innerHTML = data.denotationChar;
        node.appendChild(denotationChar);
        node.innerHTML += data.value;
        return MentionBlot.setDataValues(node, data);
    };
    MentionBlot.setDataValues = function (element, data) {
        var domNode = element;
        Object.keys(data).forEach(function (key) {
            domNode.dataset[key] = data[key];
        });
        return domNode;
    };
    MentionBlot.value = function (domNode) {
        return domNode.dataset;
    };
    MentionBlot.prototype.attach = function () {
        _super.prototype.attach.call(this);
        if (!this.mounted) {
            this.mounted = true;
            this.clickHandler = this.getClickHandler();
            this.hoverHandler = this.getHoverHandler();
            this.domNode.addEventListener("click", this.clickHandler, false);
            this.domNode.addEventListener("mouseenter", this.hoverHandler, false);
        }
    };
    MentionBlot.prototype.detach = function () {
        _super.prototype.detach.call(this);
        this.mounted = false;
        if (this.clickHandler) {
            this.domNode.removeEventListener("click", this.clickHandler);
            this.clickHandler = null;
        }
    };
    MentionBlot.prototype.getClickHandler = function () {
        var _this = this;
        return function (e) {
            var event = _this.buildEvent("mention-clicked", e);
            window.dispatchEvent(event);
            e.preventDefault();
        };
    };
    MentionBlot.prototype.getHoverHandler = function () {
        var _this = this;
        return function (e) {
            var event = _this.buildEvent('mention-hovered', e);
            window.dispatchEvent(event);
            e.preventDefault();
        };
    };
    MentionBlot.prototype.buildEvent = function (name, e) {
        var event = new Event(name, {
            bubbles: true,
            cancelable: true
        });
        event.value = Object.assign({}, this.domNode.dataset);
        event.event = e;
        return event;
    };
    return MentionBlot;
}(Embed));
MentionBlot.blotName = "mention";
MentionBlot.tagName = "span";
MentionBlot.className = "mention";
Quill__default["default"].register(MentionBlot);

var Keys = {
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    UP: 38,
    DOWN: 40
};
var Mention = /** @class */ (function () {
    function Mention(quill, options) {
        var _this = this;
        this.isOpen = false;
        this.itemIndex = 0;
        this.mentionCharPos = null;
        this.cursorPos = null;
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
            renderItem: function (item) {
                return "" + item.value;
            },
            renderLoading: function () {
                return null;
            },
            onSelect: function (item, insertItem) {
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
            dataAttributes: ["id", "value", "denotationChar", "link", "target", "disabled"],
            linkTarget: "_blank",
            onOpen: function () {
                return true;
            },
            onBeforeClose: function () {
                return true;
            },
            onClose: function () {
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
        this.mentionList.id = 'quill-mention-list';
        quill.root.setAttribute('aria-owns', 'quill-mention-list');
        this.mentionList.className = this.options.mentionListClass
            ? this.options.mentionListClass
            : "";
        this.mentionContainer.appendChild(this.mentionList);
        quill.on("text-change", this.onTextChange.bind(this));
        quill.on("selection-change", this.onSelectionChange.bind(this));
        //Pasting doesn't fire selection-change after the pasted text is
        //inserted, so here we manually trigger one
        quill.container.addEventListener("paste", function () {
            setTimeout(function () {
                var range = quill.getSelection();
                _this.onSelectionChange(range);
            });
        });
        quill.keyboard.addBinding({
            key: Keys.TAB
        }, this.selectHandler.bind(this));
        quill.keyboard.bindings[Keys.TAB].unshift(quill.keyboard.bindings[Keys.TAB].pop());
        for (var _i = 0, _a = this.options.selectKeys; _i < _a.length; _i++) {
            var selectKey = _a[_i];
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
        console.log("***bind enter");
        console.log(quill.keyboard);
        quill.keyboard.addBinding({
            key: "Enter"
        }, this.selectHandler.bind(this));
        console.log("bind enter***");
    }
    Mention.prototype.selectHandler = function () {
        console.log("selectHandler");
        if (this.isOpen && !this.existingSourceExecutionToken) {
            this.selectItem();
            return false;
        }
        return true;
    };
    Mention.prototype.escapeHandler = function () {
        if (this.isOpen) {
            if (this.existingSourceExecutionToken) {
                this.existingSourceExecutionToken.abandoned = true;
            }
            this.hideMentionList();
            return false;
        }
        return true;
    };
    Mention.prototype.upHandler = function () {
        if (this.isOpen && !this.existingSourceExecutionToken) {
            this.prevItem();
            return false;
        }
        return true;
    };
    Mention.prototype.downHandler = function () {
        if (this.isOpen && !this.existingSourceExecutionToken) {
            this.nextItem();
            return false;
        }
        return true;
    };
    Mention.prototype.showMentionList = function () {
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
    };
    Mention.prototype.hideMentionList = function () {
        this.options.onBeforeClose();
        this.mentionContainer.style.display = "none";
        this.mentionContainer.remove();
        this.setIsOpen(false);
        this.quill.root.removeAttribute('aria-activedescendant');
    };
    Mention.prototype.highlightItem = function (scrollItemInView) {
        if (scrollItemInView === void 0) { scrollItemInView = true; }
        for (var i = 0; i < this.mentionList.childNodes.length; i += 1) {
            this.mentionList.childNodes[i].classList.remove("selected");
        }
        if (this.itemIndex === -1 || this.mentionList.childNodes[this.itemIndex].dataset.disabled === "true") {
            return;
        }
        this.mentionList.childNodes[this.itemIndex].classList.add("selected");
        this.quill.root.setAttribute('aria-activedescendant', this.mentionList.childNodes[this.itemIndex].id);
        if (scrollItemInView) {
            var itemHeight = this.mentionList.childNodes[this.itemIndex]
                .offsetHeight;
            var itemPos = this.mentionList.childNodes[this.itemIndex].offsetTop;
            var containerTop = this.mentionContainer.scrollTop;
            var containerBottom = containerTop + this.mentionContainer.offsetHeight;
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
    };
    Mention.prototype.getItemData = function () {
        var link = this.mentionList.childNodes[this.itemIndex].dataset.link;
        var hasLinkValue = typeof link !== "undefined";
        var itemTarget = this.mentionList.childNodes[this.itemIndex].dataset
            .target;
        if (hasLinkValue) {
            this.mentionList.childNodes[this.itemIndex].dataset.value = "<a href=\"" + link + "\" target=" + (itemTarget ||
                this.options.linkTarget) + ">" + this.mentionList.childNodes[this.itemIndex].dataset.value;
        }
        return this.mentionList.childNodes[this.itemIndex].dataset;
    };
    Mention.prototype.onContainerMouseMove = function () {
        this.suspendMouseEnter = false;
    };
    Mention.prototype.selectItem = function () {
        var _this = this;
        if (this.itemIndex === -1) {
            return;
        }
        var data = this.getItemData();
        if (data.disabled) {
            return;
        }
        this.options.onSelect(data, function (asyncData) {
            _this.insertItem(asyncData);
        });
        this.hideMentionList();
    };
    Mention.prototype.insertItem = function (data, programmaticInsert) {
        var render = data;
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
    };
    Mention.prototype.onItemMouseEnter = function (e) {
        if (this.suspendMouseEnter) {
            return;
        }
        var index = Number(e.target.dataset.index);
        if (!Number.isNaN(index) && index !== this.itemIndex) {
            this.itemIndex = index;
            this.highlightItem(false);
        }
    };
    Mention.prototype.onDisabledItemMouseEnter = function (e) {
        if (this.suspendMouseEnter) {
            return;
        }
        this.itemIndex = -1;
        this.highlightItem(false);
    };
    Mention.prototype.onItemClick = function (e) {
        if (e.button !== 0) {
            return;
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        this.itemIndex = e.currentTarget.dataset.index;
        this.highlightItem();
        this.selectItem();
    };
    Mention.prototype.onItemMouseDown = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
    };
    Mention.prototype.renderLoading = function () {
        var renderedLoading = this.options.renderLoading();
        if (!renderedLoading) {
            return;
        }
        if (this.mentionContainer.getElementsByClassName("ql-mention-loading").length > 0) {
            this.showMentionList();
            console.log(1111111);
            return;
        }
        this.mentionList.innerHTML = "";
        var loadingDiv = document.createElement("div");
        loadingDiv.className = "ql-mention-loading";
        loadingDiv.innerHTML = this.options.renderLoading();
        this.mentionContainer.append(loadingDiv);
        this.showMentionList();
        console.log(22222);
    };
    Mention.prototype.removeLoading = function () {
        var loadingDiv = this.mentionContainer.getElementsByClassName("ql-mention-loading");
        if (loadingDiv.length > 0) {
            loadingDiv[0].remove();
        }
    };
    Mention.prototype.renderList = function (mentionChar, data, searchTerm) {
        console.log(666);
        if (data && data.length > 0) {
            this.removeLoading();
            this.values = data;
            this.mentionList.innerHTML = "";
            var initialSelection = -1;
            for (var i = 0; i < data.length; i += 1) {
                var li = document.createElement("li");
                li.id = 'quill-mention-item-' + i;
                li.className = this.options.listItemClass
                    ? this.options.listItemClass
                    : "";
                if (data[i].disabled) {
                    li.className += " disabled";
                    li.setAttribute('aria-hidden', 'true');
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
            console.log(3333);
        }
        else {
            this.hideMentionList();
        }
    };
    Mention.prototype.nextItem = function () {
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
    };
    Mention.prototype.prevItem = function () {
        var decrement = 0;
        var newIndex;
        do {
            decrement++;
            newIndex = (this.itemIndex + this.values.length - decrement) % this.values.length;
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
    };
    Mention.prototype.containerBottomIsNotVisible = function (topPos, containerPos) {
        var mentionContainerBottom = topPos + this.mentionContainer.offsetHeight + containerPos.top;
        return mentionContainerBottom > window.pageYOffset + window.innerHeight;
    };
    Mention.prototype.containerRightIsNotVisible = function (leftPos, containerPos) {
        if (this.options.fixMentionsToQuill) {
            return false;
        }
        var rightPos = leftPos + this.mentionContainer.offsetWidth + containerPos.left;
        var browserWidth = window.pageXOffset + document.documentElement.clientWidth;
        return rightPos > browserWidth;
    };
    Mention.prototype.setIsOpen = function (isOpen) {
        if (this.isOpen !== isOpen) {
            if (isOpen) {
                this.options.onOpen();
            }
            else {
                this.options.onClose();
            }
            this.isOpen = isOpen;
        }
    };
    Mention.prototype.setMentionContainerPosition = function () {
        if (this.options.positioningStrategy === "fixed") {
            this.setMentionContainerPosition_Fixed();
        }
        else {
            this.setMentionContainerPosition_Normal();
        }
    };
    Mention.prototype.setMentionContainerPosition_Normal = function () {
        var _this = this;
        var containerPos = this.quill.container.getBoundingClientRect();
        var mentionCharPos = this.quill.getBounds(this.mentionCharPos);
        var containerHeight = this.mentionContainer.offsetHeight;
        var topPos = this.options.offsetTop;
        var leftPos = this.options.offsetLeft;
        // handle horizontal positioning
        if (this.options.fixMentionsToQuill) {
            var rightPos = 0;
            this.mentionContainer.style.right = rightPos + "px";
        }
        else {
            leftPos += mentionCharPos.left;
        }
        if (this.containerRightIsNotVisible(leftPos, containerPos)) {
            var containerWidth = this.mentionContainer.offsetWidth + this.options.offsetLeft;
            var quillWidth = containerPos.width;
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
                var overMentionCharPos = this.options.offsetTop;
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
                var overMentionCharPos = this.options.offsetTop * -1;
                if (!this.options.fixMentionsToQuill) {
                    overMentionCharPos += mentionCharPos.top;
                }
                topPos = overMentionCharPos - containerHeight;
            }
        }
        if (topPos >= 0) {
            this.options.mentionContainerClass.split(' ').forEach(function (className) {
                _this.mentionContainer.classList.add(className + "-bottom");
                _this.mentionContainer.classList.remove(className + "-top");
            });
        }
        else {
            this.options.mentionContainerClass.split(' ').forEach(function (className) {
                _this.mentionContainer.classList.add(className + "-top");
                _this.mentionContainer.classList.remove(className + "-bottom");
            });
        }
        this.mentionContainer.style.top = topPos + "px";
        this.mentionContainer.style.left = leftPos + "px";
        this.mentionContainer.style.visibility = "visible";
    };
    Mention.prototype.setMentionContainerPosition_Fixed = function () {
        var _this = this;
        this.mentionContainer.style.position = "fixed";
        this.mentionContainer.style.height = null;
        var containerPos = this.quill.container.getBoundingClientRect();
        var mentionCharPos = this.quill.getBounds(this.mentionCharPos);
        var mentionCharPosAbsolute = {
            left: containerPos.left + mentionCharPos.left,
            top: containerPos.top + mentionCharPos.top,
            width: 0,
            height: mentionCharPos.height,
        };
        //Which rectangle should it be relative to
        var relativeToPos = this.options.fixMentionsToQuill ? containerPos : mentionCharPosAbsolute;
        var topPos = this.options.offsetTop;
        var leftPos = this.options.offsetLeft;
        // handle horizontal positioning
        if (this.options.fixMentionsToQuill) {
            var rightPos = relativeToPos.right;
            this.mentionContainer.style.right = rightPos + "px";
        }
        else {
            leftPos += relativeToPos.left;
            //if its off the righ edge, push it back
            if (leftPos + this.mentionContainer.offsetWidth > document.documentElement.clientWidth) {
                leftPos -= leftPos + this.mentionContainer.offsetWidth - document.documentElement.clientWidth;
            }
        }
        var availableSpaceTop = relativeToPos.top;
        var availableSpaceBottom = document.documentElement.clientHeight - (relativeToPos.top + relativeToPos.height);
        var fitsBottom = this.mentionContainer.offsetHeight <= availableSpaceBottom;
        var fitsTop = this.mentionContainer.offsetHeight <= availableSpaceTop;
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
            this.options.mentionContainerClass.split(" ").forEach(function (className) {
                _this.mentionContainer.classList.add(className + "-bottom");
                _this.mentionContainer.classList.remove(className + "-top");
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
            this.options.mentionContainerClass.split(" ").forEach(function (className) {
                _this.mentionContainer.classList.add(className + "-top");
                _this.mentionContainer.classList.remove(className + "-bottom");
            });
        }
        this.mentionContainer.style.top = topPos + "px";
        this.mentionContainer.style.left = leftPos + "px";
        this.mentionContainer.style.visibility = "visible";
    };
    Mention.prototype.getTextBeforeCursor = function () {
        var startPos = Math.max(0, this.cursorPos - this.options.maxChars);
        var textBeforeCursorPos = this.quill.getText(startPos, this.cursorPos - startPos);
        return textBeforeCursorPos;
    };
    Mention.prototype.onSomethingChange = function () {
        var _this = this;
        var range = this.quill.getSelection();
        if (range == null)
            return;
        this.cursorPos = range.index;
        var textBeforeCursor = this.getTextBeforeCursor();
        var _a = getMentionCharIndex(textBeforeCursor, this.options.mentionDenotationChars), mentionChar = _a.mentionChar, mentionCharIndex = _a.mentionCharIndex;
        if (hasValidMentionCharIndex(mentionCharIndex, textBeforeCursor, this.options.isolateCharacter)) {
            var mentionCharPos = this.cursorPos - (textBeforeCursor.length - mentionCharIndex);
            this.mentionCharPos = mentionCharPos;
            var textAfter = textBeforeCursor.substring(mentionCharIndex + mentionChar.length);
            if (textAfter.length >= this.options.minChars &&
                hasValidChars(textAfter, this.getAllowedCharsRegex(mentionChar))) {
                if (this.existingSourceExecutionToken) {
                    this.existingSourceExecutionToken.abandoned = true;
                }
                this.renderLoading();
                var sourceRequestToken = {
                    abandoned: false,
                };
                this.existingSourceExecutionToken = sourceRequestToken;
                this.options.source(textAfter, function (data, searchTerm) {
                    if (sourceRequestToken.abandoned) {
                        return;
                    }
                    _this.existingSourceExecutionToken = null;
                    _this.renderList(mentionChar, data, searchTerm);
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
    };
    Mention.prototype.getAllowedCharsRegex = function (denotationChar) {
        if (this.options.allowedChars instanceof RegExp) {
            return this.options.allowedChars;
        }
        else {
            return this.options.allowedChars(denotationChar);
        }
    };
    Mention.prototype.onTextChange = function (delta, oldDelta, source) {
        if (source === "user") {
            this.onSomethingChange();
        }
    };
    Mention.prototype.onSelectionChange = function (range) {
        if (range && range.length === 0) {
            this.onSomethingChange();
        }
        else {
            this.hideMentionList();
        }
    };
    Mention.prototype.openMenu = function (denotationChar) {
        var selection = this.quill.getSelection(true);
        this.quill.insertText(selection.index, denotationChar);
        this.quill.blur();
        this.quill.focus();
    };
    return Mention;
}());

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

var BaseModule = /** @class */ (function () {
    function BaseModule(resizer) {
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
        this.onCreate = function () { };
        /*
            onDestroy will be called when the element is de-selected, or when this module otherwise needs to tidy up.
    
            If you created any DOM elements in onCreate, please remove them from the DOM and destroy them here.
         */
        this.onDestroy = function () { };
        /*
            onUpdate will be called any time that the element is changed (e.g. resized, aligned, etc.)
    
            This frequently happens during resize dragging, so keep computations light while here to ensure a smooth
            user experience.
         */
        this.onUpdate = function () { };
        this.overlay = resizer.overlay;
        this.img = resizer.img;
        this.options = resizer.options;
        this.requestUpdate = resizer.onUpdate;
    }
    return BaseModule;
}());

var DisplaySize = /** @class */ (function (_super) {
    __extends(DisplaySize, _super);
    function DisplaySize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onCreate = function () {
            // Create the container to hold the size display
            _this.display = document.createElement('div');
            // Apply styles
            Object.assign(_this.display.style, _this.options.displayStyles);
            // Attach it
            _this.overlay.appendChild(_this.display);
        };
        _this.onDestroy = function () { };
        _this.onUpdate = function () {
            if (!_this.display || !_this.img) {
                return;
            }
            var size = _this.getCurrentSize();
            _this.display.innerHTML = size.join(' &times; ');
            if (size[0] > 120 && size[1] > 30) {
                // position on top of image
                Object.assign(_this.display.style, {
                    right: '4px',
                    bottom: '4px',
                    left: 'auto',
                });
            }
            else if (_this.img.style.float == 'right') {
                // position off bottom left
                var dispRect = _this.display.getBoundingClientRect();
                Object.assign(_this.display.style, {
                    right: 'auto',
                    bottom: "-" + (dispRect.height + 4) + "px",
                    left: "-" + (dispRect.width + 4) + "px",
                });
            }
            else {
                // position off bottom right
                var dispRect = _this.display.getBoundingClientRect();
                Object.assign(_this.display.style, {
                    right: "-" + (dispRect.width + 4) + "px",
                    bottom: "-" + (dispRect.height + 4) + "px",
                    left: 'auto',
                });
            }
        };
        _this.getCurrentSize = function () { return [
            _this.img.width,
            Math.round((_this.img.width / _this.img.naturalWidth) * _this.img.naturalHeight),
        ]; };
        return _this;
    }
    return DisplaySize;
}(BaseModule));

var Resize = /** @class */ (function (_super) {
    __extends(Resize, _super);
    function Resize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onCreate = function () {
            // track resize handles
            _this.boxes = [];
            // add 4 resize handles
            _this.addBox('nwse-resize'); // top left
            _this.addBox('nesw-resize'); // top right
            _this.addBox('nwse-resize'); // bottom right
            _this.addBox('nesw-resize'); // bottom left
            _this.positionBoxes();
        };
        _this.onDestroy = function () {
            // reset drag handle cursors
            _this.setCursor('');
        };
        _this.positionBoxes = function () {
            var handleXOffset = -parseFloat(_this.options.handleStyles.width) / 2 + "px";
            var handleYOffset = -parseFloat(_this.options.handleStyles.height) / 2 + "px";
            // set the top and left for each drag handle
            [
                { left: handleXOffset, top: handleYOffset },
                { right: handleXOffset, top: handleYOffset },
                { right: handleXOffset, bottom: handleYOffset },
                { left: handleXOffset, bottom: handleYOffset }, // bottom left
            ].forEach(function (pos, idx) {
                Object.assign(_this.boxes[idx].style, pos);
            });
        };
        _this.addBox = function (cursor) {
            // create div element for resize handle
            var box = document.createElement('div');
            // Star with the specified styles
            Object.assign(box.style, _this.options.handleStyles);
            box.style.cursor = cursor;
            // Set the width/height to use 'px'
            box.style.width = _this.options.handleStyles.width + "px";
            box.style.height = _this.options.handleStyles.height + "px";
            // listen for mousedown on each box
            box.addEventListener('mousedown', _this.handleMousedown, false);
            // add drag handle to document
            _this.overlay.appendChild(box);
            // keep track of drag handle
            _this.boxes.push(box);
        };
        _this.handleMousedown = function (evt) {
            // note which box
            _this.dragBox = evt.target;
            // note starting mousedown position
            _this.dragStartX = evt.clientX;
            // store the width before the drag
            _this.preDragWidth = _this.img.width || _this.img.naturalWidth;
            // set the proper cursor everywhere
            _this.setCursor(_this.dragBox.style.cursor);
            // listen for movement and mouseup
            document.addEventListener('mousemove', _this.handleDrag, false);
            document.addEventListener('mouseup', _this.handleMouseup, false);
        };
        _this.handleMouseup = function () {
            // reset cursor everywhere
            _this.setCursor('');
            // stop listening for movement and mouseup
            document.removeEventListener('mousemove', _this.handleDrag);
            document.removeEventListener('mouseup', _this.handleMouseup);
        };
        _this.handleDrag = function (evt) {
            if (!_this.img) {
                // image not set yet
                return;
            }
            // update image size
            var deltaX = evt.clientX - _this.dragStartX;
            if (_this.dragBox === _this.boxes[0] || _this.dragBox === _this.boxes[3]) {
                // left-side resize handler; dragging right shrinks image
                _this.img.width = Math.round(_this.preDragWidth - deltaX);
            }
            else {
                // right-side resize handler; dragging right enlarges image
                _this.img.width = Math.round(_this.preDragWidth + deltaX);
            }
            _this.requestUpdate();
        };
        _this.setCursor = function (value) {
            [
                document.body,
                _this.img,
            ].forEach(function (el) {
                el.style.cursor = value; // eslint-disable-line no-param-reassign
            });
        };
        return _this;
    }
    return Resize;
}(BaseModule));

var knownModules = { DisplaySize: DisplaySize,
    // Toolbar,
    Resize: Resize };
/**
 * Custom module for quilljs to allow user to resize <img> elements
 * (Works on Chrome, Edge, Safari and replaces Firefox's native resize behavior)
 * @see https://quilljs.com/blog/building-a-custom-module/
 */
var ImageResize = /** @class */ (function () {
    function ImageResize(quill, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.initializeModules = function () {
            _this.removeModules();
            _this.modules = _this.moduleClasses.map(function (ModuleClass) { return new (knownModules[ModuleClass] || ModuleClass)(_this); });
            _this.modules.forEach(function (module) {
                module.onCreate();
            });
            _this.onUpdate();
        };
        this.onUpdate = function () {
            _this.repositionElements();
            _this.modules.forEach(function (module) {
                module.onUpdate();
            });
        };
        this.removeModules = function () {
            _this.modules.forEach(function (module) {
                module.onDestroy();
            });
            _this.modules = [];
        };
        this.handleClick = function (evt) {
            if (evt.target && evt.target.tagName && evt.target.tagName.toUpperCase() === 'IMG') {
                if (_this.img === evt.target) {
                    // we are already focused on this image
                    return;
                }
                if (_this.img) {
                    // we were just focused on another image
                    _this.hide();
                }
                // clicked on an image inside the editor
                _this.show(evt.target);
            }
            else if (_this.img) {
                // clicked on a non image
                _this.hide();
            }
        };
        this.show = function (img) {
            // keep track of this img element
            _this.img = img;
            _this.showOverlay();
            _this.initializeModules();
        };
        this.showOverlay = function () {
            if (_this.overlay) {
                _this.hideOverlay();
            }
            _this.quill.setSelection(null);
            // prevent spurious text selection
            _this.setUserSelect('none');
            // listen for the image being deleted or moved
            document.addEventListener('keyup', _this.checkImage, true);
            _this.quill.root.addEventListener('input', _this.checkImage, true);
            // Create and add the overlay
            _this.overlay = document.createElement('div');
            Object.assign(_this.overlay.style, _this.options.overlayStyles);
            _this.quill.root.parentNode.appendChild(_this.overlay);
            _this.repositionElements();
        };
        this.hideOverlay = function () {
            if (!_this.overlay) {
                return;
            }
            // Remove the overlay
            _this.quill.root.parentNode.removeChild(_this.overlay);
            _this.overlay = undefined;
            // stop listening for image deletion or movement
            document.removeEventListener('keyup', _this.checkImage);
            _this.quill.root.removeEventListener('input', _this.checkImage);
            // reset user-select
            _this.setUserSelect('');
        };
        this.repositionElements = function () {
            if (!_this.overlay || !_this.img) {
                return;
            }
            // position the overlay over the image
            var parent = _this.quill.root.parentNode;
            var imgRect = _this.img.getBoundingClientRect();
            var containerRect = parent.getBoundingClientRect();
            Object.assign(_this.overlay.style, {
                left: imgRect.left - containerRect.left - 1 + parent.scrollLeft + "px",
                top: imgRect.top - containerRect.top + parent.scrollTop + "px",
                width: imgRect.width + "px",
                height: imgRect.height + "px",
            });
        };
        this.hide = function () {
            _this.hideOverlay();
            _this.removeModules();
            _this.img = undefined;
        };
        this.setUserSelect = function (value) {
            [
                'userSelect',
                'mozUserSelect',
                'webkitUserSelect',
                'msUserSelect',
            ].forEach(function (prop) {
                // set on contenteditable element and <html>
                _this.quill.root.style[prop] = value;
                document.documentElement.style[prop] = value;
            });
        };
        this.checkImage = function (evt) {
            if (_this.img) {
                if (evt.keyCode == 46 || evt.keyCode == 8) {
                    window.Quill.find(_this.img).deleteAt(0);
                }
                _this.hide();
            }
        };
        // save the quill reference and options
        this.quill = quill;
        // Apply the options to our defaults, and stash them for later
        // defaultsDeep doesn't do arrays as you'd expect, so we'll need to apply the classes array from options separately
        var moduleClasses = false;
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
    return ImageResize;
}());
if (window.Quill) {
    window.Quill.register('modules/imageResize', ImageResize);
}

var Quill = Quill__namespace;
Quill.register("modules/mention", Mention);
Quill.register("modules/ImageResize", ImageResize);
var VerticalDivider = styled__default["default"].div(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["\n  width: 1px;\n  height: 40px;\n  background-color: #E0E4EB;\n"], ["\n  width: 1px;\n  height: 40px;\n  background-color: #E0E4EB;\n"])));
var Wrapper$2 = styled__default["default"].div(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), quillStyle);
var icons = Quill.import("ui/icons");
overrideIcons(icons);
function WYSIWYG(props) {
    var _a = React.useState(false), isPreview = _a[0], setIsPreview = _a[1];
    var defaultModules = React.useMemo(function () { return ({
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
                    return __awaiter(this, void 0, void 0, function () {
                        var that;
                        return __generator(this, function (_a) {
                            that = this;
                            new Promise(function (resolve) {
                                props.setModalInsetFunc(function () {
                                    //pass resolve to ImgModal component so it can be called as resolve(link) in ImgModal, see in ImgModal.txs line 84
                                    return resolve;
                                });
                            }).then(function (link) {
                                that.quill.focus();
                                var range = that.quill.getSelection();
                                that.quill.insertEmbed(range.index, "image", link, "user");
                            });
                            return [2 /*return*/];
                        });
                    });
                },
                video: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var that;
                        return __generator(this, function (_a) {
                            that = this;
                            new Promise(function (resolve) {
                                props.setModalInsetFunc(function () {
                                    //pass resolve to ImgModal component so it can be called as resolve(link) in ImgModal, see in ImgModal.txs line 84
                                    return resolve;
                                }, "video");
                            }).then(function (link) {
                                var videoLink = link === null || link === void 0 ? void 0 : link.replace("watch?v=", "embed/");
                                that.quill.focus();
                                var range = that.quill.getSelection();
                                that.quill.insertEmbed(range.index, "video", videoLink, "user");
                            });
                            return [2 /*return*/];
                        });
                    });
                }
            }
        },
        mention: {
            allowedChars: /^[A-Za-z\s]*$/,
            mentionDenotationChars: ["@"],
            source: function (searchTerm, renderList, mentionChar) {
                console.log(123);
                var atValues = [
                    { id: "123123", value: "456456" },
                    { id: "123123", value: "789798" }
                ];
                var values;
                if (mentionChar === "@") {
                    values = atValues;
                }
                if (searchTerm.length === 0) {
                    renderList(values, searchTerm);
                }
                else {
                    var matches = [];
                    for (var i = 0; i < values.length; i++) {
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
    }); }, []);
    var getEditorConfig = function () {
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
    var generation = 0;
    var _b = React__default["default"].useState(null), editingArea = _b[0], setEditingArea = _b[1];
    var setEditorTabIndex = function (editor, tabIndex) {
        var _a;
        if ((_a = editor === null || editor === void 0 ? void 0 : editor.scroll) === null || _a === void 0 ? void 0 : _a.domNode) {
            editor.scroll.domNode.tabIndex = tabIndex;
        }
    };
    var hookEditor = function (editor) {
        // @ts-ignore
        editor.on("editor-change", function (eventName, rangeOrDelta, oldRangeOrDelta, source) {
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
    var createEditor = function (element, config) {
        var editorInstance = new Quill(element, config);
        if (config.tabIndex != null) {
            setEditorTabIndex(editorInstance, config.tabIndex);
        }
        hookEditor(editorInstance);
        return editorInstance;
    };
    var properties = {
        key: generation,
        ref: function (instance) {
            setEditingArea(instance);
        }
    };
    React.useEffect(function () {
        if (editingArea) {
            var element = ReactDOM__default["default"].findDOMNode(editingArea);
            var editor = createEditor(element, getEditorConfig());
            if (props.value) {
                editor.clipboard.dangerouslyPasteHTML(props.value);
            }
        }
    }, [editingArea]);
    return React__default["default"].createElement(Wrapper$2, { isPreview: isPreview },
        React__default["default"].createElement(StateToggle, null,
            React__default["default"].createElement("button", { onClick: function () { return setIsPreview(false); }, className: isPreview ? "" : "active" }, "Write"),
            React__default["default"].createElement(VerticalDivider, null),
            React__default["default"].createElement("button", { style: { paddingLeft: 11 }, onClick: function () { return setIsPreview(true); }, className: isPreview ? "active" : "" }, "Preview"),
            React__default["default"].createElement(VerticalDivider, null)),
        React__default["default"].createElement("div", __assign({}, properties)));
}
var templateObject_1$3, templateObject_2$2;

var Wrapper$1 = styled__default["default"].div(templateObject_5$1 || (templateObject_5$1 = __makeTemplateObject(["\n  position: relative;\n  cursor: pointer;\n  width: 38px;\n  height: 22px;\n  background: #c2c8d5;\n  border-radius: 16px;\n  > div {\n    width: 14px;\n    height: 14px;\n    position: absolute;\n    top: 4px;\n    left: 4px;\n    background: #ffffff;\n    border-radius: 7px;\n  }\n  ", "\n  ", "\n"], ["\n  position: relative;\n  cursor: pointer;\n  width: 38px;\n  height: 22px;\n  background: #c2c8d5;\n  border-radius: 16px;\n  > div {\n    width: 14px;\n    height: 14px;\n    position: absolute;\n    top: 4px;\n    left: 4px;\n    background: #ffffff;\n    border-radius: 7px;\n  }\n  ",
    "\n  ",
    "\n"])), function (p) {
    return p.disabled
        ? styled.css(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n        background: #EBEEF4;\n        > div {\n          left: auto;\n          right: 4px;\n        }\n      "], ["\n        background: #EBEEF4;\n        > div {\n          left: auto;\n          right: 4px;\n        }\n      "]))) : p.active
        ? styled.css(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject(["\n        background: #6848ff;\n        > div {\n          left: auto;\n          right: 4px;\n        }\n      "], ["\n        background: #6848ff;\n        > div {\n          left: auto;\n          right: 4px;\n        }\n      "]))) : null;
}, function (p) {
    return p.size === "small" && styled.css(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject(["\n      width: 30px;\n      height: 18px;\n      > div {\n        width: 12px;\n        height: 12px;\n        top: 3px;\n        left: 3px;\n        border-radius: 6px;\n      }\n      ", "\n    "], ["\n      width: 30px;\n      height: 18px;\n      > div {\n        width: 12px;\n        height: 12px;\n        top: 3px;\n        left: 3px;\n        border-radius: 6px;\n      }\n      ",
        "\n    "])), function (p) {
        return p.active && styled.css(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject(["\n          background: #6848ff;\n          > div {\n            left: auto;\n            right: 3px;\n          }\n        "], ["\n          background: #6848ff;\n          > div {\n            left: auto;\n            right: 3px;\n          }\n        "])));
    });
});
function Toggle(_a) {
    var disabled = _a.disabled, isOn = _a.isOn, onToggle = _a.onToggle, size = _a.size;
    return (React__default["default"].createElement(Wrapper$1, { disabled: disabled, active: isOn, onClick: function () { return onToggle(!isOn); }, size: size },
        React__default["default"].createElement("div", null)));
}
var templateObject_1$2, templateObject_2$1, templateObject_3$1, templateObject_4$1, templateObject_5$1;

var MarkdownIcon = function () { return (React__default["default"].createElement("svg", { width: "26", height: "16", viewBox: "0 0 26 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React__default["default"].createElement("path", { d: "M3.75 12.25V3.75H6.25L8.75 6.875L11.25 3.75H13.75V12.25H11.25V7.375L8.75 10.5L6.25 7.375V12.25H3.75ZM19.375 12.25L15.625 8.125H18.125V3.75H20.625V8.125H23.125L19.375 12.25Z", fill: "#1E2134" }),
    React__default["default"].createElement("rect", { x: "0.625", y: "0.625", width: "24.75", height: "14.75", rx: "1.375", stroke: "#1E2134", strokeWidth: "1.25" }))); };

var Flex = styled__default["default"].div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n"], ["\n  display: flex;\n  align-items: center;\n"])));
var Shade = styled__default["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  z-index: 10;\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.6);\n"], ["\n  z-index: 10;\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.6);\n"])));
var Wrapper = styled__default["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  z-index: 11;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  margin-top: -200px;\n  margin-left: -200px;\n  padding-bottom: 24px;\n  width: 400px;\n  @media screen and (max-width: 768px) {\n    width: 343px;\n    margin-top: -50px;\n    margin-left: -171px;\n    border-radius: 6px;\n  }\n  background: #ffffff;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);\n  border-radius: 8px;\n"], ["\n  z-index: 11;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  margin-top: -200px;\n  margin-left: -200px;\n  padding-bottom: 24px;\n  width: 400px;\n  @media screen and (max-width: 768px) {\n    width: 343px;\n    margin-top: -50px;\n    margin-left: -171px;\n    border-radius: 6px;\n  }\n  background: #ffffff;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);\n  border-radius: 8px;\n"])));
var Title = styled__default["default"](Flex)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  padding: 24px 24px 16px 24px;\n  justify-content: space-between;\n  font-size: 14px;\n  font-weight: bold;\n\n  svg {\n    cursor: pointer;\n  }\n"], ["\n  padding: 24px 24px 16px 24px;\n  justify-content: space-between;\n  font-size: 14px;\n  font-weight: bold;\n\n  svg {\n    cursor: pointer;\n  }\n"])));
var FormWrapper = styled__default["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  padding: 0 24px 12px 24px;\n\n  label {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 24px;\n    font-size: 13px;\n    border-radius: 4px;\n    background-color: #fff;\n    border: 1px solid #ddd;\n    width: 96px;\n  }\n"], ["\n  padding: 0 24px 12px 24px;\n\n  label {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 24px;\n    font-size: 13px;\n    border-radius: 4px;\n    background-color: #fff;\n    border: 1px solid #ddd;\n    width: 96px;\n  }\n"])));
var TextArea = styled__default["default"].textarea(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  box-sizing: border-box;\n  font-family: Inter, serif;\n  width: 100%;\n  min-height: 66px;\n  font-size: 14px;\n  line-height: 14px;\n  padding: 12px 16px;\n  color: #34373c;\n  resize: none;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n\n  &:focus,\n  &:active {\n    border: 1px solid #aaa;\n    outline: none;\n  }\n\n  ::placeholder {\n    color: #d7dee8;\n    opacity: 1;\n  }\n"], ["\n  box-sizing: border-box;\n  font-family: Inter, serif;\n  width: 100%;\n  min-height: 66px;\n  font-size: 14px;\n  line-height: 14px;\n  padding: 12px 16px;\n  color: #34373c;\n  resize: none;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n\n  &:focus,\n  &:active {\n    border: 1px solid #aaa;\n    outline: none;\n  }\n\n  ::placeholder {\n    color: #d7dee8;\n    opacity: 1;\n  }\n"])));
var SubmitButtonWrapper = styled__default["default"].div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  padding-right: 24px;\n  display: flex;\n  justify-content: end;\n"], ["\n  padding-right: 24px;\n  display: flex;\n  justify-content: end;\n"])));
var SubmitButton = styled__default["default"].button(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  text-align: center;\n  all: unset;\n  padding: 12px;\n  font-weight: 500;\n  font-size: 14px;\n  line-height: 14px;\n  color: #ffffff;\n  background: #1e2134;\n  border-radius: 4px;\n  cursor: pointer;\n"], ["\n  display: flex;\n  justify-content: center;\n  text-align: center;\n  all: unset;\n  padding: 12px;\n  font-weight: 500;\n  font-size: 14px;\n  line-height: 14px;\n  color: #ffffff;\n  background: #1e2134;\n  border-radius: 4px;\n  cursor: pointer;\n"])));
styled__default["default"].input(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  visibility: hidden;\n  position: absolute;\n"], ["\n  visibility: hidden;\n  position: absolute;\n"])));
styled__default["default"].div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  padding: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 368px;\n  border-radius: 4px;\n  background: #f8f8f8;\n\n  span {\n    font-size: 13px;\n    line-height: 16px;\n    text-align: center;\n    color: #696d73;\n  }\n"], ["\n  padding: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  width: 368px;\n  border-radius: 4px;\n  background: #f8f8f8;\n\n  span {\n    font-size: 13px;\n    line-height: 16px;\n    text-align: center;\n    color: #696d73;\n  }\n"])));
var Hint = styled__default["default"].p(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  margin: 16px 24px;\n  margin-top: 0;\n  padding: 12px 16px;\n  font-family: Inter, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 19.6px;\n  color: #6848ff;\n  background: #f5f2ff;\n  border-radius: 4px;\n"], ["\n  margin: 16px 24px;\n  margin-top: 0;\n  padding: 12px 16px;\n  font-family: Inter, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 19.6px;\n  color: #6848ff;\n  background: #f5f2ff;\n  border-radius: 4px;\n"])));
styled__default["default"].p(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  text-align: center;\n  width: 80%;\n  font-size: 14px;\n  color: #34373c;\n\n  span {\n    white-space: nowrap;\n    overflow: hidden;\n    vertical-align: middle;\n  }\n\n  .ellipsis {\n    display: inline-block;\n    width: calc(30% + 1.2em);\n    text-overflow: ellipsis;\n  }\n\n  .indent {\n    display: inline-flex;\n    width: calc(30% - 1.2em);\n    justify-content: flex-end;\n  }\n"], ["\n  text-align: center;\n  width: 80%;\n  font-size: 14px;\n  color: #34373c;\n\n  span {\n    white-space: nowrap;\n    overflow: hidden;\n    vertical-align: middle;\n  }\n\n  .ellipsis {\n    display: inline-block;\n    width: calc(30% + 1.2em);\n    text-overflow: ellipsis;\n  }\n\n  .indent {\n    display: inline-flex;\n    width: calc(30% - 1.2em);\n    justify-content: flex-end;\n  }\n"])));
function InsertContentsModal(_a) {
    var showModal = _a.showModal, setShowModal = _a.setShowModal, resolveInsertPromise = _a.insetQuillContentsFunc, _b = _a.type, type = _b === void 0 ? "image" : _b;
    var _c = React.useState("remote"), source = _c[0]; _c[1];
    var _d = React.useState(""), link = _d[0], setLink = _d[1];
    var onChange = function (e) {
        if (source === "remote") {
            setLink(e.target.value);
        }
    };
    var onInset = function () {
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
    var onClose = function () {
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
                React__default["default"].createElement(TextArea, { value: link, placeholder: "Please fill available " + type + " URL...", onChange: onChange })),
            React__default["default"].createElement(SubmitButtonWrapper, null,
                React__default["default"].createElement(SubmitButton, { onClick: onInset }, "Confirm")))));
}
var templateObject_1$1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;

var markdown = "\n[https://www.baidu.com/](https://www.baidu.com/)\n# heading 1\n**bold text** _italic text_ `inline code`\n- bullet 1\n1. numbered 1\n\n|table|example|index|\n|-|-|-|\n|table|column|1|\n|table|column|2|\n```bash\necho \"hello\"\n```\n> quote text\n".trim();
var suggestions = [
    {
        preview: React__namespace.createElement("span", null, "abc"),
        value: "abc"
    },
    {
        preview: React__namespace.createElement("span", null, "edf"),
        value: "edf"
    }
];
var ToggleWrapper = styled__default["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: end;\n  align-items: center;\n  gap: 8px;\n  height: 40px;\n  border-top: 1px solid #ebeef4;\n  padding-right: 16px;\n"], ["\n  display: flex;\n  justify-content: end;\n  align-items: center;\n  gap: 8px;\n  height: 40px;\n  border-top: 1px solid #ebeef4;\n  padding-right: 16px;\n"])));
var UniverseEditor = function () {
    var _a = React.useState(markdown), content = _a[0], setContent = _a[1];
    var _b = React.useState("markdown"), contentType = _b[0], setContentType = _b[1];
    var _c = React.useState("<p>\u3000</p>"), htmlContent = _c[0], setHtmlContent = _c[1];
    var _d = React.useState(false), showModal = _d[0], setShowModal = _d[1];
    var _e = React.useState("image"), modalType = _e[0], setModalType = _e[1];
    var _f = React.useState(null), insetQuillContentsFunc = _f[0], setInsetQuillContentsFunc = _f[1];
    var onMarkdownSwitch = function () {
        if (content &&
            !confirm("Togging editor will empty all typed contents, are you sure ?")) {
            return;
        }
        var newContentType = contentType === "html" ? "markdown" : "html";
        setContent("");
        setContentType(newContentType);
    };
    return (React__namespace.createElement("div", { style: {
            maxWidth: 800,
            border: "1px solid #EBEEF4",
            borderRadius: 4,
            overflow: "hidden"
        } },
        contentType === "markdown" ? (React__namespace.createElement(Editor, { value: content, onChange: function (value) {
                setContent(value);
            }, suggestions: suggestions, minHeight: 200, theme: "subsquare" })) : (React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement(InsertContentsModal, { showModal: showModal, setShowModal: setShowModal, insetQuillContentsFunc: insetQuillContentsFunc, type: modalType }),
            React__namespace.createElement(WYSIWYG, { value: htmlContent, onChange: function (value) { return setHtmlContent(value); }, setModalInsetFunc: function (insetFunc, type) {
                    setModalType(type);
                    setShowModal(true);
                    setInsetQuillContentsFunc(insetFunc);
                } }))),
        React__namespace.createElement(ToggleWrapper, null,
            React__namespace.createElement(MarkdownIcon, null),
            React__namespace.createElement(Toggle, { size: "small", isOn: contentType === "markdown", onToggle: onMarkdownSwitch }))));
};
var templateObject_1;

var Editor = function (_a) {
    var value = _a.value, onChange = _a.onChange, loadSuggestions = _a.loadSuggestions, _b = _a.minHeight, minHeight = _b === void 0 ? 144 : _b, _c = _a.theme, theme = _c === void 0 ? "opensquare" : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d;
    var ref = React.useRef(null);
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
    var _e = React.useState({ left: 0, top: 0, lineHeight: 20 }), caret = _e[0], setCaret = _e[1];
    var _f = React.useState(0), focusIndex = _f[0], setFocusIndex = _f[1];
    var _g = React__namespace.useState("write"), editStatus = _g[0], setEditStatus = _g[1];
    var _h = React__namespace.useState([]), suggestions = _h[0], setSuggestions = _h[1];
    var _j = React.useState({
        status: "inactive",
        suggestions: []
    }), mentionState = _j[0], setMentionState = _j[1];
    var isPreview = React__namespace.useMemo(function () {
        return editStatus === "preview";
    }, [editStatus]);
    var observer;
    var _k = React.useState(100), height = _k[0], setHeight = _k[1];
    var _l = React.useState(false), userResized = _l[0], setUserResized = _l[1];
    var focusToCursor = function () {
        var textarea = ref === null || ref === void 0 ? void 0 : ref.current;
        if (textarea) {
            textarea.blur();
            textarea.focus();
        }
    };
    var adjustHeight = function () {
        var textarea = ref === null || ref === void 0 ? void 0 : ref.current;
        if (textarea && !userResized) {
            textarea.style.height = minHeight + "px";
            textarea.style.height = textarea.scrollHeight + "px";
            setHeight(textarea.scrollHeight);
        }
    };
    React.useEffect(function () {
        //expand height if got default value before inputting
        adjustHeight();
    }, []);
    React.useEffect(function () {
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
    var _m = getHandlers({
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
    }), handleSuggestionSelected = _m.handleSuggestionSelected, handleKeyDown = _m.handleKeyDown, handleKeyPress = _m.handleKeyPress, handleKeyUp = _m.handleKeyUp;
    var isEditingText = React__namespace.useMemo(function () {
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
    return (React__namespace.createElement(EditorWrapper, { theme: theme, disabled: disabled },
        React__namespace.createElement(EditorHeader, __assign({}, { theme: theme, editStatus: editStatus, setEditStatus: setEditStatus, isPreview: isPreview, commandController: commandController })),
        React__namespace.createElement(Textarea, { ref: ref, value: value, onChange: function (event) {
                onChange(event.target.value);
                adjustHeight();
                focusToCursor();
            }, onKeyUp: function (event) {
                handleKeyUp(event);
            }, onKeyDown: function (event) {
                handleKeyDown(event);
                onEnterNewLine(event);
            }, onKeyPress: handleKeyPress, placeholder: "", minHeight: minHeight, height: height, hide: isPreview, theme: theme }),
        isPreview && (React__namespace.createElement(MarkdownPreview, { content: value, minHeight: minHeight, theme: theme })),
        mentionState.status === "active" && suggestions.length > 0 && (React__namespace.createElement(SuggestionsDropdown, { caret: caret, suggestions: suggestions, focusIndex: focusIndex < suggestions.length ? focusIndex : 0, textAreaRef: ref, onSuggestionSelected: handleSuggestionSelected, suggestionsAutoplace: true }))));
};

exports.Editor = Editor;
exports.UniverseEditor = UniverseEditor;
exports.WYSIWYG = WYSIWYG;
exports["default"] = Editor;
//# sourceMappingURL=index.js.map
