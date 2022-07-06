import * as React from 'react';
import React__default, { useState, useMemo, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import defaultsDeep from 'lodash/defaultsDeep';
import { HtmlPreviewer, renderMentionIdentityUserPlugin, MarkdownPreviewer, renderIdentityOrAddressPlugin } from '@osn/previewer';

function _mergeNamespaces(n, m) {
    m.forEach(function (e) {
        e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
            if (k !== 'default' && !(k in n)) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    });
    return Object.freeze(n);
}

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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var quillStyle = css `
  position: relative;
  border-radius: 4px;

  ul.ql-mention-list {
    margin-top: 0;
    margin-left: 20px;
    padding: 0;
    padding-top: 8px;
    padding-bottom: 8px;
    box-shadow: 0px 4px 31px rgb(26 33 44 / 6%),
      0px 0.751293px 8px rgb(26 33 44 / 4%);
    border-radius: 4px;
    overflow: hidden;
  }

  .ql-mention-list-container {
    width: auto;
    min-width: 180px;
    background-color: white;
    cursor: pointer;
    .ql-mention-list-item.selected {
      background-color: #f6f7fa;
      color: #34373c;
    }

    .ql-mention-list-item {
      all: unset;
      display: block;
      padding: 12px 10px;
      min-width: 180px;
      font-size: 14px;
      line-height: 20px;
      font-style: normal;
      font-weight: 500;
      color: #506176;
    }
  }

  .ql-formats {
    ${props => props.isPreview &&
    css `
        display: none !important;
      `};
  }

  div.ql-editor {
    min-height: 100px;
    height: ${props => props.height}px;
    max-height: 300px;
  }

  .ql-toolbar {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding-left: 210px;
    @media screen and (max-width: 769px) {
      flex: 1;
      overflow-x: scroll;
      border-top: 1px solid #e0e4eb;
      justify-content: flex-start !important;
      ::-webkit-scrollbar {
        display: none;
      }
      ${props => props.isPreview &&
    css `
          display: none !important;
        `};
    }
  }

  /*!
   * Quill Editor v1.3.7
   * https://quilljs.com/
   * Copyright (c) 2014, Jason Chen
   * Copyright (c) 2013, salesforce.com
   */

  .ql-container {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    font-size: 14px;
    margin: 0;
  }
  
  span.mention {
    color: #1f70c7;
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
    text-decoration: none;
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
    padding: 3 px 5px;
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

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var quill = {exports: {}};

/*!
 * Quill Editor v2.0.0-dev.3
 * https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */

(function (module, exports) {
	(function webpackUniversalModuleDefinition(root, factory) {
		module.exports = factory();
	})(window, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId]) {
	/******/ 			return installedModules[moduleId].exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		if(!__webpack_require__.o(exports, name)) {
	/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
	/******/ 		}
	/******/ 	};
	/******/
	/******/ 	// define __esModule on exports
	/******/ 	__webpack_require__.r = function(exports) {
	/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
	/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	/******/ 		}
	/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
	/******/ 	};
	/******/
	/******/ 	// create a fake namespace object
	/******/ 	// mode & 1: value is a module id, require it
	/******/ 	// mode & 2: merge all properties of value into the ns
	/******/ 	// mode & 4: return value when already ns object
	/******/ 	// mode & 8|1: behave like require
	/******/ 	__webpack_require__.t = function(value, mode) {
	/******/ 		if(mode & 1) value = __webpack_require__(value);
	/******/ 		if(mode & 8) return value;
	/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
	/******/ 		var ns = Object.create(null);
	/******/ 		__webpack_require__.r(ns);
	/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
	/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
	/******/ 		return ns;
	/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 0);
	/******/ })
	/************************************************************************/
	/******/ ({

	/***/ "./assets/icons/align-center.svg":
	/*!***************************************!*\
	  !*** ./assets/icons/align-center.svg ***!
	  \***************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/align-center.svg?");

	/***/ }),

	/***/ "./assets/icons/align-justify.svg":
	/*!****************************************!*\
	  !*** ./assets/icons/align-justify.svg ***!
	  \****************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/align-justify.svg?");

	/***/ }),

	/***/ "./assets/icons/align-left.svg":
	/*!*************************************!*\
	  !*** ./assets/icons/align-left.svg ***!
	  \*************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/align-left.svg?");

	/***/ }),

	/***/ "./assets/icons/align-right.svg":
	/*!**************************************!*\
	  !*** ./assets/icons/align-right.svg ***!
	  \**************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/align-right.svg?");

	/***/ }),

	/***/ "./assets/icons/background.svg":
	/*!*************************************!*\
	  !*** ./assets/icons/background.svg ***!
	  \*************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <g class=\\\"ql-fill ql-color-label\\\"> <polygon points=\\\"6 6.868 6 6 5 6 5 7 5.942 7 6 6.868\\\"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points=\\\"6.817 5 6 5 6 6 6.38 6 6.817 5\\\"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points=\\\"4 11.439 4 11 3 11 3 12 3.755 12 4 11.439\\\"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points=\\\"4.63 10 4 10 4 11 4.192 11 4.63 10\\\"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points=\\\"13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174\\\"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points=\\\"12 6.868 12 6 11.62 6 12 6.868\\\"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points=\\\"12.933 9 13 9 13 8 12.495 8 12.933 9\\\"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points=\\\"5.5 13 9 5 12.5 13\\\"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/background.svg?");

	/***/ }),

	/***/ "./assets/icons/blockquote.svg":
	/*!*************************************!*\
	  !*** ./assets/icons/blockquote.svg ***!
	  \*************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <rect class=\\\"ql-fill ql-stroke\\\" height=3 width=3 x=4 y=5></rect> <rect class=\\\"ql-fill ql-stroke\\\" height=3 width=3 x=11 y=5></rect> <path class=\\\"ql-even ql-fill ql-stroke\\\" d=M7,8c0,4.031-3,5-3,5></path> <path class=\\\"ql-even ql-fill ql-stroke\\\" d=M14,8c0,4.031-3,5-3,5></path> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/blockquote.svg?");

	/***/ }),

	/***/ "./assets/icons/bold.svg":
	/*!*******************************!*\
	  !*** ./assets/icons/bold.svg ***!
	  \*******************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/bold.svg?");

	/***/ }),

	/***/ "./assets/icons/clean.svg":
	/*!********************************!*\
	  !*** ./assets/icons/clean.svg ***!
	  \********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg class=\\\"\\\" viewbox=\\\"0 0 18 18\\\"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/clean.svg?");

	/***/ }),

	/***/ "./assets/icons/code.svg":
	/*!*******************************!*\
	  !*** ./assets/icons/code.svg ***!
	  \*******************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <polyline class=\\\"ql-even ql-stroke\\\" points=\\\"5 7 3 9 5 11\\\"></polyline> <polyline class=\\\"ql-even ql-stroke\\\" points=\\\"13 7 15 9 13 11\\\"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/code.svg?");

	/***/ }),

	/***/ "./assets/icons/color.svg":
	/*!********************************!*\
	  !*** ./assets/icons/color.svg ***!
	  \********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <line class=\\\"ql-color-label ql-stroke ql-transparent\\\" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points=\\\"5.5 11 9 3 12.5 11\\\"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/color.svg?");

	/***/ }),

	/***/ "./assets/icons/direction-ltr.svg":
	/*!****************************************!*\
	  !*** ./assets/icons/direction-ltr.svg ***!
	  \****************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <polygon class=\\\"ql-stroke ql-fill\\\" points=\\\"3 11 5 9 3 7 3 11\\\"></polygon> <line class=\\\"ql-stroke ql-fill\\\" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/direction-ltr.svg?");

	/***/ }),

	/***/ "./assets/icons/direction-rtl.svg":
	/*!****************************************!*\
	  !*** ./assets/icons/direction-rtl.svg ***!
	  \****************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <polygon class=\\\"ql-stroke ql-fill\\\" points=\\\"15 12 13 10 15 8 15 12\\\"></polygon> <line class=\\\"ql-stroke ql-fill\\\" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/direction-rtl.svg?");

	/***/ }),

	/***/ "./assets/icons/dropdown.svg":
	/*!***********************************!*\
	  !*** ./assets/icons/dropdown.svg ***!
	  \***********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <polygon class=ql-stroke points=\\\"7 11 9 13 11 11 7 11\\\"></polygon> <polygon class=ql-stroke points=\\\"7 7 9 5 11 7 7 7\\\"></polygon> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/dropdown.svg?");

	/***/ }),

	/***/ "./assets/icons/formula.svg":
	/*!**********************************!*\
	  !*** ./assets/icons/formula.svg ***!
	  \**********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/formula.svg?");

	/***/ }),

	/***/ "./assets/icons/header-2.svg":
	/*!***********************************!*\
	  !*** ./assets/icons/header-2.svg ***!
	  \***********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewBox=\\\"0 0 18 18\\\"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/header-2.svg?");

	/***/ }),

	/***/ "./assets/icons/header.svg":
	/*!*********************************!*\
	  !*** ./assets/icons/header.svg ***!
	  \*********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewBox=\\\"0 0 18 18\\\"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/header.svg?");

	/***/ }),

	/***/ "./assets/icons/image.svg":
	/*!********************************!*\
	  !*** ./assets/icons/image.svg ***!
	  \********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class=\\\"ql-even ql-fill\\\" points=\\\"5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12\\\"></polyline> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/image.svg?");

	/***/ }),

	/***/ "./assets/icons/indent.svg":
	/*!*********************************!*\
	  !*** ./assets/icons/indent.svg ***!
	  \*********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=\\\"ql-fill ql-stroke\\\" points=\\\"3 7 3 11 5 9 3 7\\\"></polyline> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/indent.svg?");

	/***/ }),

	/***/ "./assets/icons/italic.svg":
	/*!*********************************!*\
	  !*** ./assets/icons/italic.svg ***!
	  \*********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/italic.svg?");

	/***/ }),

	/***/ "./assets/icons/link.svg":
	/*!*******************************!*\
	  !*** ./assets/icons/link.svg ***!
	  \*******************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class=\\\"ql-even ql-stroke\\\" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class=\\\"ql-even ql-stroke\\\" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/link.svg?");

	/***/ }),

	/***/ "./assets/icons/list-bullet.svg":
	/*!**************************************!*\
	  !*** ./assets/icons/list-bullet.svg ***!
	  \**************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/list-bullet.svg?");

	/***/ }),

	/***/ "./assets/icons/list-check.svg":
	/*!*************************************!*\
	  !*** ./assets/icons/list-check.svg ***!
	  \*************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg class=\\\"\\\" viewbox=\\\"0 0 18 18\\\"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points=\\\"3 4 4 5 6 3\\\"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points=\\\"3 14 4 15 6 13\\\"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points=\\\"3 9 4 10 6 8\\\"></polyline> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/list-check.svg?");

	/***/ }),

	/***/ "./assets/icons/list-ordered.svg":
	/*!***************************************!*\
	  !*** ./assets/icons/list-ordered.svg ***!
	  \***************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class=\\\"ql-stroke ql-thin\\\" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class=\\\"ql-stroke ql-thin\\\" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class=\\\"ql-stroke ql-thin\\\" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/list-ordered.svg?");

	/***/ }),

	/***/ "./assets/icons/outdent.svg":
	/*!**********************************!*\
	  !*** ./assets/icons/outdent.svg ***!
	  \**********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points=\\\"5 7 5 11 3 9 5 7\\\"></polyline> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/outdent.svg?");

	/***/ }),

	/***/ "./assets/icons/strike.svg":
	/*!*********************************!*\
	  !*** ./assets/icons/strike.svg ***!
	  \*********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <line class=\\\"ql-stroke ql-thin\\\" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/strike.svg?");

	/***/ }),

	/***/ "./assets/icons/subscript.svg":
	/*!************************************!*\
	  !*** ./assets/icons/subscript.svg ***!
	  \************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/subscript.svg?");

	/***/ }),

	/***/ "./assets/icons/superscript.svg":
	/*!**************************************!*\
	  !*** ./assets/icons/superscript.svg ***!
	  \**************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/superscript.svg?");

	/***/ }),

	/***/ "./assets/icons/table.svg":
	/*!********************************!*\
	  !*** ./assets/icons/table.svg ***!
	  \********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=2 width=3 x=5 y=5></rect> <rect class=ql-fill height=2 width=4 x=9 y=5></rect> <g class=\\\"ql-fill ql-transparent\\\"> <rect height=2 width=3 x=5 y=8></rect> <rect height=2 width=4 x=9 y=8></rect> <rect height=2 width=3 x=5 y=11></rect> <rect height=2 width=4 x=9 y=11></rect> </g> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/table.svg?");

	/***/ }),

	/***/ "./assets/icons/underline.svg":
	/*!************************************!*\
	  !*** ./assets/icons/underline.svg ***!
	  \************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/underline.svg?");

	/***/ }),

	/***/ "./assets/icons/video.svg":
	/*!********************************!*\
	  !*** ./assets/icons/video.svg ***!
	  \********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// Module\nvar code = \"<svg viewbox=\\\"0 0 18 18\\\"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>\";\n// Exports\nmodule.exports = code;\n\n//# sourceURL=webpack://Quill/./assets/icons/video.svg?");

	/***/ }),

	/***/ "./blots/block.js":
	/*!************************!*\
	  !*** ./blots/block.js ***!
	  \************************/
	/*! exports provided: blockDelta, bubbleFormats, BlockEmbed, default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"blockDelta\", function() { return blockDelta; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bubbleFormats\", function() { return bubbleFormats; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BlockEmbed\", function() { return BlockEmbed; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Block; });\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! extend */ \"./node_modules/extend/index.js\");\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(extend__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quill-delta */ \"./node_modules/quill-delta/dist/Delta.js\");\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var _break__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./break */ \"./blots/break.js\");\n/* harmony import */ var _inline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./inline */ \"./blots/inline.js\");\n/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./text */ \"./blots/text.js\");\n\n\n\n\n\n\nconst NEWLINE_LENGTH = 1;\n\nclass Block extends parchment__WEBPACK_IMPORTED_MODULE_2__[\"BlockBlot\"] {\n  constructor(scroll, domNode) {\n    super(scroll, domNode);\n    this.cache = {};\n  }\n\n  delta() {\n    if (this.cache.delta == null) {\n      this.cache.delta = blockDelta(this);\n    }\n\n    return this.cache.delta;\n  }\n\n  deleteAt(index, length) {\n    super.deleteAt(index, length);\n    this.cache = {};\n  }\n\n  formatAt(index, length, name, value) {\n    if (length <= 0) return;\n\n    if (this.scroll.query(name, parchment__WEBPACK_IMPORTED_MODULE_2__[\"Scope\"].BLOCK)) {\n      if (index + length === this.length()) {\n        this.format(name, value);\n      }\n    } else {\n      super.formatAt(index, Math.min(length, this.length() - index - 1), name, value);\n    }\n\n    this.cache = {};\n  }\n\n  insertAt(index, value, def) {\n    if (def != null) {\n      super.insertAt(index, value, def);\n      this.cache = {};\n      return;\n    }\n\n    if (value.length === 0) return;\n    const lines = value.split('\\n');\n    const text = lines.shift();\n\n    if (text.length > 0) {\n      if (index < this.length() - 1 || this.children.tail == null) {\n        super.insertAt(Math.min(index, this.length() - 1), text);\n      } else {\n        this.children.tail.insertAt(this.children.tail.length(), text);\n      }\n\n      this.cache = {};\n    }\n\n    let block = this;\n    lines.reduce((lineIndex, line) => {\n      block = block.split(lineIndex, true);\n      block.insertAt(0, line);\n      return line.length;\n    }, index + text.length);\n  }\n\n  insertBefore(blot, ref) {\n    const {\n      head\n    } = this.children;\n    super.insertBefore(blot, ref);\n\n    if (head instanceof _break__WEBPACK_IMPORTED_MODULE_3__[\"default\"]) {\n      head.remove();\n    }\n\n    this.cache = {};\n  }\n\n  length() {\n    if (this.cache.length == null) {\n      this.cache.length = super.length() + NEWLINE_LENGTH;\n    }\n\n    return this.cache.length;\n  }\n\n  moveChildren(target, ref) {\n    super.moveChildren(target, ref);\n    this.cache = {};\n  }\n\n  optimize(context) {\n    super.optimize(context);\n    this.cache = {};\n  }\n\n  path(index) {\n    return super.path(index, true);\n  }\n\n  removeChild(child) {\n    super.removeChild(child);\n    this.cache = {};\n  }\n\n  split(index, force = false) {\n    if (force && (index === 0 || index >= this.length() - NEWLINE_LENGTH)) {\n      const clone = this.clone();\n\n      if (index === 0) {\n        this.parent.insertBefore(clone, this);\n        return this;\n      }\n\n      this.parent.insertBefore(clone, this.next);\n      return clone;\n    }\n\n    const next = super.split(index, force);\n    this.cache = {};\n    return next;\n  }\n\n}\n\nBlock.blotName = 'block';\nBlock.tagName = 'P';\nBlock.defaultChild = _break__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\nBlock.allowedChildren = [_break__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _inline__WEBPACK_IMPORTED_MODULE_4__[\"default\"], parchment__WEBPACK_IMPORTED_MODULE_2__[\"EmbedBlot\"], _text__WEBPACK_IMPORTED_MODULE_5__[\"default\"]];\n\nclass BlockEmbed extends parchment__WEBPACK_IMPORTED_MODULE_2__[\"EmbedBlot\"] {\n  attach() {\n    super.attach();\n    this.attributes = new parchment__WEBPACK_IMPORTED_MODULE_2__[\"AttributorStore\"](this.domNode);\n  }\n\n  delta() {\n    return new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a().insert(this.value(), extend__WEBPACK_IMPORTED_MODULE_0___default()(this.formats(), this.attributes.values()));\n  }\n\n  format(name, value) {\n    const attribute = this.scroll.query(name, parchment__WEBPACK_IMPORTED_MODULE_2__[\"Scope\"].BLOCK_ATTRIBUTE);\n\n    if (attribute != null) {\n      this.attributes.attribute(attribute, value);\n    }\n  }\n\n  formatAt(index, length, name, value) {\n    this.format(name, value);\n  }\n\n  insertAt(index, value, def) {\n    if (typeof value === 'string' && value.endsWith('\\n')) {\n      const block = this.scroll.create(Block.blotName);\n      this.parent.insertBefore(block, index === 0 ? this : this.next);\n      block.insertAt(0, value.slice(0, -1));\n    } else {\n      super.insertAt(index, value, def);\n    }\n  }\n\n}\n\nBlockEmbed.scope = parchment__WEBPACK_IMPORTED_MODULE_2__[\"Scope\"].BLOCK_BLOT; // It is important for cursor behavior BlockEmbeds use tags that are block level elements\n\nfunction blockDelta(blot, filter = true) {\n  return blot.descendants(parchment__WEBPACK_IMPORTED_MODULE_2__[\"LeafBlot\"]).reduce((delta, leaf) => {\n    if (leaf.length() === 0) {\n      return delta;\n    }\n\n    return delta.insert(leaf.value(), bubbleFormats(leaf, {}, filter));\n  }, new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a()).insert('\\n', bubbleFormats(blot));\n}\n\nfunction bubbleFormats(blot, formats = {}, filter = true) {\n  if (blot == null) return formats;\n\n  if (typeof blot.formats === 'function') {\n    formats = extend__WEBPACK_IMPORTED_MODULE_0___default()(formats, blot.formats());\n\n    if (filter) {\n      // exclude syntax highlighting from deltas and getFormat()\n      delete formats['code-token'];\n    }\n  }\n\n  if (blot.parent == null || blot.parent.statics.blotName === 'scroll' || blot.parent.statics.scope !== blot.statics.scope) {\n    return formats;\n  }\n\n  return bubbleFormats(blot.parent, formats, filter);\n}\n\n\n\n//# sourceURL=webpack://Quill/./blots/block.js?");

	/***/ }),

	/***/ "./blots/break.js":
	/*!************************!*\
	  !*** ./blots/break.js ***!
	  \************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n\n\nclass Break extends parchment__WEBPACK_IMPORTED_MODULE_0__[\"EmbedBlot\"] {\n  static value() {\n    return undefined;\n  }\n\n  optimize() {\n    if (this.prev || this.next) {\n      this.remove();\n    }\n  }\n\n  length() {\n    return 0;\n  }\n\n  value() {\n    return '';\n  }\n\n}\n\nBreak.blotName = 'break';\nBreak.tagName = 'BR';\n/* harmony default export */ __webpack_exports__[\"default\"] = (Break);\n\n//# sourceURL=webpack://Quill/./blots/break.js?");

	/***/ }),

	/***/ "./blots/container.js":
	/*!****************************!*\
	  !*** ./blots/container.js ***!
	  \****************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n\n\nclass Container extends parchment__WEBPACK_IMPORTED_MODULE_0__[\"ContainerBlot\"] {}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Container);\n\n//# sourceURL=webpack://Quill/./blots/container.js?");

	/***/ }),

	/***/ "./blots/cursor.js":
	/*!*************************!*\
	  !*** ./blots/cursor.js ***!
	  \*************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text */ \"./blots/text.js\");\n\n\n\nclass Cursor extends parchment__WEBPACK_IMPORTED_MODULE_0__[\"EmbedBlot\"] {\n  static value() {\n    return undefined;\n  }\n\n  constructor(scroll, domNode, selection) {\n    super(scroll, domNode);\n    this.selection = selection;\n    this.textNode = document.createTextNode(Cursor.CONTENTS);\n    this.domNode.appendChild(this.textNode);\n    this.savedLength = 0;\n  }\n\n  detach() {\n    // super.detach() will also clear domNode.__blot\n    if (this.parent != null) this.parent.removeChild(this);\n  }\n\n  format(name, value) {\n    if (this.savedLength !== 0) {\n      super.format(name, value);\n      return;\n    }\n\n    let target = this;\n    let index = 0;\n\n    while (target != null && target.statics.scope !== parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].BLOCK_BLOT) {\n      index += target.offset(target.parent);\n      target = target.parent;\n    }\n\n    if (target != null) {\n      this.savedLength = Cursor.CONTENTS.length;\n      target.optimize();\n      target.formatAt(index, Cursor.CONTENTS.length, name, value);\n      this.savedLength = 0;\n    }\n  }\n\n  index(node, offset) {\n    if (node === this.textNode) return 0;\n    return super.index(node, offset);\n  }\n\n  length() {\n    return this.savedLength;\n  }\n\n  position() {\n    return [this.textNode, this.textNode.data.length];\n  }\n\n  remove() {\n    super.remove();\n    this.parent = null;\n  }\n\n  restore() {\n    if (this.selection.composing || this.parent == null) return null;\n    const range = this.selection.getNativeRange(); // Link format will insert text outside of anchor tag\n\n    while (this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode) {\n      this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);\n    }\n\n    const prevTextBlot = this.prev instanceof _text__WEBPACK_IMPORTED_MODULE_1__[\"default\"] ? this.prev : null;\n    const prevTextLength = prevTextBlot ? prevTextBlot.length() : 0;\n    const nextTextBlot = this.next instanceof _text__WEBPACK_IMPORTED_MODULE_1__[\"default\"] ? this.next : null;\n    const nextText = nextTextBlot ? nextTextBlot.text : '';\n    const {\n      textNode\n    } = this; // take text from inside this blot and reset it\n\n    const newText = textNode.data.split(Cursor.CONTENTS).join('');\n    textNode.data = Cursor.CONTENTS; // proactively merge TextBlots around cursor so that optimization\n    // doesn't lose the cursor.  the reason we are here in cursor.restore\n    // could be that the user clicked in prevTextBlot or nextTextBlot, or\n    // the user typed something.\n\n    let mergedTextBlot;\n\n    if (prevTextBlot) {\n      mergedTextBlot = prevTextBlot;\n\n      if (newText || nextTextBlot) {\n        prevTextBlot.insertAt(prevTextBlot.length(), newText + nextText);\n\n        if (nextTextBlot) {\n          nextTextBlot.remove();\n        }\n      }\n    } else if (nextTextBlot) {\n      mergedTextBlot = nextTextBlot;\n      nextTextBlot.insertAt(0, newText);\n    } else {\n      const newTextNode = document.createTextNode(newText);\n      mergedTextBlot = this.scroll.create(newTextNode);\n      this.parent.insertBefore(mergedTextBlot, this);\n    }\n\n    this.remove();\n\n    if (range) {\n      // calculate selection to restore\n      const remapOffset = (node, offset) => {\n        if (prevTextBlot && node === prevTextBlot.domNode) {\n          return offset;\n        }\n\n        if (node === textNode) {\n          return prevTextLength + offset - 1;\n        }\n\n        if (nextTextBlot && node === nextTextBlot.domNode) {\n          return prevTextLength + newText.length + offset;\n        }\n\n        return null;\n      };\n\n      const start = remapOffset(range.start.node, range.start.offset);\n      const end = remapOffset(range.end.node, range.end.offset);\n\n      if (start !== null && end !== null) {\n        return {\n          startNode: mergedTextBlot.domNode,\n          startOffset: start,\n          endNode: mergedTextBlot.domNode,\n          endOffset: end\n        };\n      }\n    }\n\n    return null;\n  }\n\n  update(mutations, context) {\n    if (mutations.some(mutation => {\n      return mutation.type === 'characterData' && mutation.target === this.textNode;\n    })) {\n      const range = this.restore();\n      if (range) context.range = range;\n    }\n  }\n\n  value() {\n    return '';\n  }\n\n}\n\nCursor.blotName = 'cursor';\nCursor.className = 'ql-cursor';\nCursor.tagName = 'span';\nCursor.CONTENTS = '\\uFEFF'; // Zero width no break space\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cursor);\n\n//# sourceURL=webpack://Quill/./blots/cursor.js?");

	/***/ }),

	/***/ "./blots/embed.js":
	/*!************************!*\
	  !*** ./blots/embed.js ***!
	  \************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text */ \"./blots/text.js\");\n\n\nconst GUARD_TEXT = '\\uFEFF';\n\nclass Embed extends parchment__WEBPACK_IMPORTED_MODULE_0__[\"EmbedBlot\"] {\n  constructor(scroll, node) {\n    super(scroll, node);\n    this.contentNode = document.createElement('span');\n    this.contentNode.setAttribute('contenteditable', false);\n    Array.from(this.domNode.childNodes).forEach(childNode => {\n      this.contentNode.appendChild(childNode);\n    });\n    this.leftGuard = document.createTextNode(GUARD_TEXT);\n    this.rightGuard = document.createTextNode(GUARD_TEXT);\n    this.domNode.appendChild(this.leftGuard);\n    this.domNode.appendChild(this.contentNode);\n    this.domNode.appendChild(this.rightGuard);\n  }\n\n  index(node, offset) {\n    if (node === this.leftGuard) return 0;\n    if (node === this.rightGuard) return 1;\n    return super.index(node, offset);\n  }\n\n  restore(node) {\n    let range;\n    let textNode;\n    const text = node.data.split(GUARD_TEXT).join('');\n\n    if (node === this.leftGuard) {\n      if (this.prev instanceof _text__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n        const prevLength = this.prev.length();\n        this.prev.insertAt(prevLength, text);\n        range = {\n          startNode: this.prev.domNode,\n          startOffset: prevLength + text.length\n        };\n      } else {\n        textNode = document.createTextNode(text);\n        this.parent.insertBefore(this.scroll.create(textNode), this);\n        range = {\n          startNode: textNode,\n          startOffset: text.length\n        };\n      }\n    } else if (node === this.rightGuard) {\n      if (this.next instanceof _text__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n        this.next.insertAt(0, text);\n        range = {\n          startNode: this.next.domNode,\n          startOffset: text.length\n        };\n      } else {\n        textNode = document.createTextNode(text);\n        this.parent.insertBefore(this.scroll.create(textNode), this.next);\n        range = {\n          startNode: textNode,\n          startOffset: text.length\n        };\n      }\n    }\n\n    node.data = GUARD_TEXT;\n    return range;\n  }\n\n  update(mutations, context) {\n    mutations.forEach(mutation => {\n      if (mutation.type === 'characterData' && (mutation.target === this.leftGuard || mutation.target === this.rightGuard)) {\n        const range = this.restore(mutation.target);\n        if (range) context.range = range;\n      }\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Embed);\n\n//# sourceURL=webpack://Quill/./blots/embed.js?");

	/***/ }),

	/***/ "./blots/inline.js":
	/*!*************************!*\
	  !*** ./blots/inline.js ***!
	  \*************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var _break__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./break */ \"./blots/break.js\");\n/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text */ \"./blots/text.js\");\n\n\n\n\nclass Inline extends parchment__WEBPACK_IMPORTED_MODULE_0__[\"InlineBlot\"] {\n  static compare(self, other) {\n    const selfIndex = Inline.order.indexOf(self);\n    const otherIndex = Inline.order.indexOf(other);\n\n    if (selfIndex >= 0 || otherIndex >= 0) {\n      return selfIndex - otherIndex;\n    }\n\n    if (self === other) {\n      return 0;\n    }\n\n    if (self < other) {\n      return -1;\n    }\n\n    return 1;\n  }\n\n  formatAt(index, length, name, value) {\n    if (Inline.compare(this.statics.blotName, name) < 0 && this.scroll.query(name, parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].BLOT)) {\n      const blot = this.isolate(index, length);\n\n      if (value) {\n        blot.wrap(name, value);\n      }\n    } else {\n      super.formatAt(index, length, name, value);\n    }\n  }\n\n  optimize(context) {\n    super.optimize(context);\n\n    if (this.parent instanceof Inline && Inline.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {\n      const parent = this.parent.isolate(this.offset(), this.length());\n      this.moveChildren(parent);\n      parent.wrap(this);\n    }\n  }\n\n}\n\nInline.allowedChildren = [Inline, _break__WEBPACK_IMPORTED_MODULE_1__[\"default\"], parchment__WEBPACK_IMPORTED_MODULE_0__[\"EmbedBlot\"], _text__WEBPACK_IMPORTED_MODULE_2__[\"default\"]]; // Lower index means deeper in the DOM tree, since not found (-1) is for embeds\n\nInline.order = ['cursor', 'inline', // Must be lower\n'link', // Chrome wants <a> to be lower\n'underline', 'strike', 'italic', 'bold', 'script', 'code' // Must be higher\n];\n/* harmony default export */ __webpack_exports__[\"default\"] = (Inline);\n\n//# sourceURL=webpack://Quill/./blots/inline.js?");

	/***/ }),

	/***/ "./blots/scroll.js":
	/*!*************************!*\
	  !*** ./blots/scroll.js ***!
	  \*************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/emitter */ \"./core/emitter.js\");\n/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block */ \"./blots/block.js\");\n/* harmony import */ var _break__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./break */ \"./blots/break.js\");\n/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./container */ \"./blots/container.js\");\n\n\n\n\n\n\nfunction isLine(blot) {\n  return blot instanceof _block__WEBPACK_IMPORTED_MODULE_2__[\"default\"] || blot instanceof _block__WEBPACK_IMPORTED_MODULE_2__[\"BlockEmbed\"];\n}\n\nclass Scroll extends parchment__WEBPACK_IMPORTED_MODULE_0__[\"ScrollBlot\"] {\n  constructor(registry, domNode, {\n    emitter\n  }) {\n    super(registry, domNode);\n    this.emitter = emitter;\n    this.batch = false;\n    this.optimize();\n    this.enable();\n    this.domNode.addEventListener('dragstart', e => this.handleDragStart(e));\n  }\n\n  batchStart() {\n    if (!Array.isArray(this.batch)) {\n      this.batch = [];\n    }\n  }\n\n  batchEnd() {\n    const mutations = this.batch;\n    this.batch = false;\n    this.update(mutations);\n  }\n\n  emitMount(blot) {\n    this.emitter.emit(_core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.SCROLL_BLOT_MOUNT, blot);\n  }\n\n  emitUnmount(blot) {\n    this.emitter.emit(_core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.SCROLL_BLOT_UNMOUNT, blot);\n  }\n\n  deleteAt(index, length) {\n    const [first, offset] = this.line(index);\n    const [last] = this.line(index + length);\n    super.deleteAt(index, length);\n\n    if (last != null && first !== last && offset > 0) {\n      if (first instanceof _block__WEBPACK_IMPORTED_MODULE_2__[\"BlockEmbed\"] || last instanceof _block__WEBPACK_IMPORTED_MODULE_2__[\"BlockEmbed\"]) {\n        this.optimize();\n        return;\n      }\n\n      const ref = last.children.head instanceof _break__WEBPACK_IMPORTED_MODULE_3__[\"default\"] ? null : last.children.head;\n      first.moveChildren(last, ref);\n      first.remove();\n    }\n\n    this.optimize();\n  }\n\n  enable(enabled = true) {\n    this.domNode.setAttribute('contenteditable', enabled);\n  }\n\n  formatAt(index, length, format, value) {\n    super.formatAt(index, length, format, value);\n    this.optimize();\n  }\n\n  handleDragStart(event) {\n    event.preventDefault();\n  }\n\n  insertAt(index, value, def) {\n    if (index >= this.length()) {\n      if (def == null || this.scroll.query(value, parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].BLOCK) == null) {\n        const blot = this.scroll.create(this.statics.defaultChild.blotName);\n        this.appendChild(blot);\n\n        if (def == null && value.endsWith('\\n')) {\n          blot.insertAt(0, value.slice(0, -1), def);\n        } else {\n          blot.insertAt(0, value, def);\n        }\n      } else {\n        const embed = this.scroll.create(value, def);\n        this.appendChild(embed);\n      }\n    } else {\n      super.insertAt(index, value, def);\n    }\n\n    this.optimize();\n  }\n\n  insertBefore(blot, ref) {\n    if (blot.statics.scope === parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].INLINE_BLOT) {\n      const wrapper = this.scroll.create(this.statics.defaultChild.blotName);\n      wrapper.appendChild(blot);\n      super.insertBefore(wrapper, ref);\n    } else {\n      super.insertBefore(blot, ref);\n    }\n  }\n\n  isEnabled() {\n    return this.domNode.getAttribute('contenteditable') === 'true';\n  }\n\n  leaf(index) {\n    return this.path(index).pop() || [null, -1];\n  }\n\n  line(index) {\n    if (index === this.length()) {\n      return this.line(index - 1);\n    }\n\n    return this.descendant(isLine, index);\n  }\n\n  lines(index = 0, length = Number.MAX_VALUE) {\n    const getLines = (blot, blotIndex, blotLength) => {\n      let lines = [];\n      let lengthLeft = blotLength;\n      blot.children.forEachAt(blotIndex, blotLength, (child, childIndex, childLength) => {\n        if (isLine(child)) {\n          lines.push(child);\n        } else if (child instanceof parchment__WEBPACK_IMPORTED_MODULE_0__[\"ContainerBlot\"]) {\n          lines = lines.concat(getLines(child, childIndex, lengthLeft));\n        }\n\n        lengthLeft -= childLength;\n      });\n      return lines;\n    };\n\n    return getLines(this, index, length);\n  }\n\n  optimize(mutations = [], context = {}) {\n    if (this.batch) return;\n    super.optimize(mutations, context);\n\n    if (mutations.length > 0) {\n      this.emitter.emit(_core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.SCROLL_OPTIMIZE, mutations, context);\n    }\n  }\n\n  path(index) {\n    return super.path(index).slice(1); // Exclude self\n  }\n\n  remove() {// Never remove self\n  }\n\n  update(mutations) {\n    if (this.batch) {\n      if (Array.isArray(mutations)) {\n        this.batch = this.batch.concat(mutations);\n      }\n\n      return;\n    }\n\n    let source = _core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER;\n\n    if (typeof mutations === 'string') {\n      source = mutations;\n    }\n\n    if (!Array.isArray(mutations)) {\n      mutations = this.observer.takeRecords();\n    }\n\n    if (mutations.length > 0) {\n      this.emitter.emit(_core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.SCROLL_BEFORE_UPDATE, source, mutations);\n    }\n\n    super.update(mutations.concat([])); // pass copy\n\n    if (mutations.length > 0) {\n      this.emitter.emit(_core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.SCROLL_UPDATE, source, mutations);\n    }\n  }\n\n}\n\nScroll.blotName = 'scroll';\nScroll.className = 'ql-editor';\nScroll.tagName = 'DIV';\nScroll.defaultChild = _block__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\nScroll.allowedChildren = [_block__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _block__WEBPACK_IMPORTED_MODULE_2__[\"BlockEmbed\"], _container__WEBPACK_IMPORTED_MODULE_4__[\"default\"]];\n/* harmony default export */ __webpack_exports__[\"default\"] = (Scroll);\n\n//# sourceURL=webpack://Quill/./blots/scroll.js?");

	/***/ }),

	/***/ "./blots/text.js":
	/*!***********************!*\
	  !*** ./blots/text.js ***!
	  \***********************/
	/*! exports provided: default, escapeText */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"escapeText\", function() { return escapeText; });\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n\n\nclass Text extends parchment__WEBPACK_IMPORTED_MODULE_0__[\"TextBlot\"] {}\n\nfunction escapeText(text) {\n  return text.replace(/[&<>\"']/g, s => {\n    // https://lodash.com/docs#escape\n    const entityMap = {\n      '&': '&amp;',\n      '<': '&lt;',\n      '>': '&gt;',\n      '\"': '&quot;',\n      \"'\": '&#39;'\n    };\n    return entityMap[s];\n  });\n}\n\n\n\n//# sourceURL=webpack://Quill/./blots/text.js?");

	/***/ }),

	/***/ "./core.js":
	/*!*****************!*\
	  !*** ./core.js ***!
	  \*****************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/quill */ \"./core/quill.js\");\n/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blots/block */ \"./blots/block.js\");\n/* harmony import */ var _blots_break__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blots/break */ \"./blots/break.js\");\n/* harmony import */ var _blots_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blots/container */ \"./blots/container.js\");\n/* harmony import */ var _blots_cursor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./blots/cursor */ \"./blots/cursor.js\");\n/* harmony import */ var _blots_embed__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./blots/embed */ \"./blots/embed.js\");\n/* harmony import */ var _blots_inline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blots/inline */ \"./blots/inline.js\");\n/* harmony import */ var _blots_scroll__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./blots/scroll */ \"./blots/scroll.js\");\n/* harmony import */ var _blots_text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./blots/text */ \"./blots/text.js\");\n/* harmony import */ var _modules_clipboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/clipboard */ \"./modules/clipboard.js\");\n/* harmony import */ var _modules_history__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/history */ \"./modules/history.js\");\n/* harmony import */ var _modules_keyboard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/keyboard */ \"./modules/keyboard.js\");\n/* harmony import */ var _modules_uploader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/uploader */ \"./modules/uploader.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n_core_quill__WEBPACK_IMPORTED_MODULE_0__[\"default\"].register({\n  'blots/block': _blots_block__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  'blots/block/embed': _blots_block__WEBPACK_IMPORTED_MODULE_1__[\"BlockEmbed\"],\n  'blots/break': _blots_break__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  'blots/container': _blots_container__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  'blots/cursor': _blots_cursor__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  'blots/embed': _blots_embed__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  'blots/inline': _blots_inline__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  'blots/scroll': _blots_scroll__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  'blots/text': _blots_text__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n  'modules/clipboard': _modules_clipboard__WEBPACK_IMPORTED_MODULE_9__[\"default\"],\n  'modules/history': _modules_history__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n  'modules/keyboard': _modules_keyboard__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n  'modules/uploader': _modules_uploader__WEBPACK_IMPORTED_MODULE_12__[\"default\"]\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (_core_quill__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://Quill/./core.js?");

	/***/ }),

	/***/ "./core/editor.js":
	/*!************************!*\
	  !*** ./core/editor.js ***!
	  \************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clone */ \"./node_modules/clone/clone.js\");\n/* harmony import */ var clone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clone__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! deep-equal */ \"./node_modules/deep-equal/index.js\");\n/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(deep_equal__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! extend */ \"./node_modules/extend/index.js\");\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(extend__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! quill-delta */ \"./node_modules/quill-delta/dist/Delta.js\");\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./selection */ \"./core/selection.js\");\n/* harmony import */ var _blots_cursor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../blots/cursor */ \"./blots/cursor.js\");\n/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../blots/block */ \"./blots/block.js\");\n/* harmony import */ var _blots_break__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../blots/break */ \"./blots/break.js\");\n/* harmony import */ var _blots_text__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../blots/text */ \"./blots/text.js\");\n\n\n\n\n\n\n\n\n\n\nconst ASCII = /^[ -~]*$/;\n\nclass Editor {\n  constructor(scroll) {\n    this.scroll = scroll;\n    this.delta = this.getDelta();\n  }\n\n  applyDelta(delta) {\n    let consumeNextNewline = false;\n    this.scroll.update();\n    let scrollLength = this.scroll.length();\n    this.scroll.batchStart();\n    const normalizedDelta = normalizeDelta(delta);\n    normalizedDelta.reduce((index, op) => {\n      const length = op.retain || op.delete || op.insert.length || 1;\n      let attributes = op.attributes || {};\n\n      if (op.insert != null) {\n        if (typeof op.insert === 'string') {\n          let text = op.insert;\n\n          if (text.endsWith('\\n') && consumeNextNewline) {\n            consumeNextNewline = false;\n            text = text.slice(0, -1);\n          }\n\n          if ((index >= scrollLength || this.scroll.descendant(_blots_block__WEBPACK_IMPORTED_MODULE_7__[\"BlockEmbed\"], index)[0]) && !text.endsWith('\\n')) {\n            consumeNextNewline = true;\n          }\n\n          this.scroll.insertAt(index, text);\n          const [line, offset] = this.scroll.line(index);\n          let formats = extend__WEBPACK_IMPORTED_MODULE_2___default()({}, Object(_blots_block__WEBPACK_IMPORTED_MODULE_7__[\"bubbleFormats\"])(line));\n\n          if (line instanceof _blots_block__WEBPACK_IMPORTED_MODULE_7__[\"default\"]) {\n            const [leaf] = line.descendant(parchment__WEBPACK_IMPORTED_MODULE_4__[\"LeafBlot\"], offset);\n            formats = extend__WEBPACK_IMPORTED_MODULE_2___default()(formats, Object(_blots_block__WEBPACK_IMPORTED_MODULE_7__[\"bubbleFormats\"])(leaf));\n          }\n\n          attributes = quill_delta__WEBPACK_IMPORTED_MODULE_3__[\"AttributeMap\"].diff(formats, attributes) || {};\n        } else if (typeof op.insert === 'object') {\n          const key = Object.keys(op.insert)[0]; // There should only be one key\n\n          if (key == null) return index;\n          this.scroll.insertAt(index, key, op.insert[key]);\n        }\n\n        scrollLength += length;\n      }\n\n      Object.keys(attributes).forEach(name => {\n        this.scroll.formatAt(index, length, name, attributes[name]);\n      });\n      return index + length;\n    }, 0);\n    normalizedDelta.reduce((index, op) => {\n      if (typeof op.delete === 'number') {\n        this.scroll.deleteAt(index, op.delete);\n        return index;\n      }\n\n      return index + (op.retain || op.insert.length || 1);\n    }, 0);\n    this.scroll.batchEnd();\n    this.scroll.optimize();\n    return this.update(normalizedDelta);\n  }\n\n  deleteText(index, length) {\n    this.scroll.deleteAt(index, length);\n    return this.update(new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(index).delete(length));\n  }\n\n  formatLine(index, length, formats = {}) {\n    this.scroll.update();\n    Object.keys(formats).forEach(format => {\n      this.scroll.lines(index, Math.max(length, 1)).forEach(line => {\n        line.format(format, formats[format]);\n      });\n    });\n    this.scroll.optimize();\n    const delta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(index).retain(length, clone__WEBPACK_IMPORTED_MODULE_0___default()(formats));\n    return this.update(delta);\n  }\n\n  formatText(index, length, formats = {}) {\n    Object.keys(formats).forEach(format => {\n      this.scroll.formatAt(index, length, format, formats[format]);\n    });\n    const delta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(index).retain(length, clone__WEBPACK_IMPORTED_MODULE_0___default()(formats));\n    return this.update(delta);\n  }\n\n  getContents(index, length) {\n    return this.delta.slice(index, index + length);\n  }\n\n  getDelta() {\n    return this.scroll.lines().reduce((delta, line) => {\n      return delta.concat(line.delta());\n    }, new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a());\n  }\n\n  getFormat(index, length = 0) {\n    let lines = [];\n    let leaves = [];\n\n    if (length === 0) {\n      this.scroll.path(index).forEach(path => {\n        const [blot] = path;\n\n        if (blot instanceof _blots_block__WEBPACK_IMPORTED_MODULE_7__[\"default\"]) {\n          lines.push(blot);\n        } else if (blot instanceof parchment__WEBPACK_IMPORTED_MODULE_4__[\"LeafBlot\"]) {\n          leaves.push(blot);\n        }\n      });\n    } else {\n      lines = this.scroll.lines(index, length);\n      leaves = this.scroll.descendants(parchment__WEBPACK_IMPORTED_MODULE_4__[\"LeafBlot\"], index, length);\n    }\n\n    const formatsArr = [lines, leaves].map(blots => {\n      if (blots.length === 0) return {};\n      let formats = Object(_blots_block__WEBPACK_IMPORTED_MODULE_7__[\"bubbleFormats\"])(blots.shift());\n\n      while (Object.keys(formats).length > 0) {\n        const blot = blots.shift();\n        if (blot == null) return formats;\n        formats = combineFormats(Object(_blots_block__WEBPACK_IMPORTED_MODULE_7__[\"bubbleFormats\"])(blot), formats);\n      }\n\n      return formats;\n    });\n    return extend__WEBPACK_IMPORTED_MODULE_2___default.a.apply(extend__WEBPACK_IMPORTED_MODULE_2___default.a, formatsArr);\n  }\n\n  getHTML(index, length) {\n    const [line, lineOffset] = this.scroll.line(index);\n\n    if (line.length() >= lineOffset + length) {\n      return convertHTML(line, lineOffset, length, true);\n    }\n\n    return convertHTML(this.scroll, index, length, true);\n  }\n\n  getText(index, length) {\n    return this.getContents(index, length).filter(op => typeof op.insert === 'string').map(op => op.insert).join('');\n  }\n\n  insertEmbed(index, embed, value) {\n    this.scroll.insertAt(index, embed, value);\n    return this.update(new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(index).insert({\n      [embed]: value\n    }));\n  }\n\n  insertText(index, text, formats = {}) {\n    text = text.replace(/\\r\\n/g, '\\n').replace(/\\r/g, '\\n');\n    this.scroll.insertAt(index, text);\n    Object.keys(formats).forEach(format => {\n      this.scroll.formatAt(index, text.length, format, formats[format]);\n    });\n    return this.update(new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(index).insert(text, clone__WEBPACK_IMPORTED_MODULE_0___default()(formats)));\n  }\n\n  isBlank() {\n    if (this.scroll.children.length === 0) return true;\n    if (this.scroll.children.length > 1) return false;\n    const block = this.scroll.children.head;\n    if (block.statics.blotName !== _blots_block__WEBPACK_IMPORTED_MODULE_7__[\"default\"].blotName) return false;\n    if (block.children.length > 1) return false;\n    return block.children.head instanceof _blots_break__WEBPACK_IMPORTED_MODULE_8__[\"default\"];\n  }\n\n  removeFormat(index, length) {\n    const text = this.getText(index, length);\n    const [line, offset] = this.scroll.line(index + length);\n    let suffixLength = 0;\n    let suffix = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a();\n\n    if (line != null) {\n      suffixLength = line.length() - offset;\n      suffix = line.delta().slice(offset, offset + suffixLength - 1).insert('\\n');\n    }\n\n    const contents = this.getContents(index, length + suffixLength);\n    const diff = contents.diff(new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().insert(text).concat(suffix));\n    const delta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(index).concat(diff);\n    return this.applyDelta(delta);\n  }\n\n  update(change, mutations = [], selectionInfo = undefined) {\n    const oldDelta = this.delta;\n\n    if (mutations.length === 1 && mutations[0].type === 'characterData' && mutations[0].target.data.match(ASCII) && this.scroll.find(mutations[0].target)) {\n      // Optimization for character changes\n      const textBlot = this.scroll.find(mutations[0].target);\n      const formats = Object(_blots_block__WEBPACK_IMPORTED_MODULE_7__[\"bubbleFormats\"])(textBlot);\n      const index = textBlot.offset(this.scroll);\n      const oldValue = mutations[0].oldValue.replace(_blots_cursor__WEBPACK_IMPORTED_MODULE_6__[\"default\"].CONTENTS, '');\n      const oldText = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().insert(oldValue);\n      const newText = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().insert(textBlot.value());\n      const relativeSelectionInfo = selectionInfo && {\n        oldRange: shiftRange(selectionInfo.oldRange, -index),\n        newRange: shiftRange(selectionInfo.newRange, -index)\n      };\n      const diffDelta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(index).concat(oldText.diff(newText, relativeSelectionInfo));\n      change = diffDelta.reduce((delta, op) => {\n        if (op.insert) {\n          return delta.insert(op.insert, formats);\n        }\n\n        return delta.push(op);\n      }, new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a());\n      this.delta = oldDelta.compose(change);\n    } else {\n      this.delta = this.getDelta();\n\n      if (!change || !deep_equal__WEBPACK_IMPORTED_MODULE_1___default()(oldDelta.compose(change), this.delta)) {\n        change = oldDelta.diff(this.delta, selectionInfo);\n      }\n    }\n\n    return change;\n  }\n\n}\n\nfunction convertListHTML(items, lastIndent, types) {\n  if (items.length === 0) {\n    const [endTag] = getListType(types.pop());\n\n    if (lastIndent <= 0) {\n      return \"</li></\".concat(endTag, \">\");\n    }\n\n    return \"</li></\".concat(endTag, \">\").concat(convertListHTML([], lastIndent - 1, types));\n  }\n\n  const [{\n    child,\n    offset,\n    length,\n    indent,\n    type\n  }, ...rest] = items;\n  const [tag, attribute] = getListType(type);\n\n  if (indent > lastIndent) {\n    types.push(type);\n\n    if (indent === lastIndent + 1) {\n      return \"<\".concat(tag, \"><li\").concat(attribute, \">\").concat(convertHTML(child, offset, length)).concat(convertListHTML(rest, indent, types));\n    }\n\n    return \"<\".concat(tag, \"><li>\").concat(convertListHTML(items, lastIndent + 1, types));\n  }\n\n  const previousType = types[types.length - 1];\n\n  if (indent === lastIndent && type === previousType) {\n    return \"</li><li\".concat(attribute, \">\").concat(convertHTML(child, offset, length)).concat(convertListHTML(rest, indent, types));\n  }\n\n  const [endTag] = getListType(types.pop());\n  return \"</li></\".concat(endTag, \">\").concat(convertListHTML(items, lastIndent - 1, types));\n}\n\nfunction convertHTML(blot, index, length, isRoot = false) {\n  if (typeof blot.html === 'function') {\n    return blot.html(index, length);\n  }\n\n  if (blot instanceof _blots_text__WEBPACK_IMPORTED_MODULE_9__[\"default\"]) {\n    return Object(_blots_text__WEBPACK_IMPORTED_MODULE_9__[\"escapeText\"])(blot.value().slice(index, index + length));\n  }\n\n  if (blot.children) {\n    // TODO fix API\n    if (blot.statics.blotName === 'list-container') {\n      const items = [];\n      blot.children.forEachAt(index, length, (child, offset, childLength) => {\n        const formats = child.formats();\n        items.push({\n          child,\n          offset,\n          length: childLength,\n          indent: formats.indent || 0,\n          type: formats.list\n        });\n      });\n      return convertListHTML(items, -1, []);\n    }\n\n    const parts = [];\n    blot.children.forEachAt(index, length, (child, offset, childLength) => {\n      parts.push(convertHTML(child, offset, childLength));\n    });\n\n    if (isRoot || blot.statics.blotName === 'list') {\n      return parts.join('');\n    }\n\n    const {\n      outerHTML,\n      innerHTML\n    } = blot.domNode;\n    const [start, end] = outerHTML.split(\">\".concat(innerHTML, \"<\")); // TODO cleanup\n\n    if (start === '<table') {\n      return \"<table style=\\\"border: 1px solid #000;\\\">\".concat(parts.join(''), \"<\").concat(end);\n    }\n\n    return \"\".concat(start, \">\").concat(parts.join(''), \"<\").concat(end);\n  }\n\n  return blot.domNode.outerHTML;\n}\n\nfunction combineFormats(formats, combined) {\n  return Object.keys(combined).reduce((merged, name) => {\n    if (formats[name] == null) return merged;\n\n    if (combined[name] === formats[name]) {\n      merged[name] = combined[name];\n    } else if (Array.isArray(combined[name])) {\n      if (combined[name].indexOf(formats[name]) < 0) {\n        merged[name] = combined[name].concat([formats[name]]);\n      }\n    } else {\n      merged[name] = [combined[name], formats[name]];\n    }\n\n    return merged;\n  }, {});\n}\n\nfunction getListType(type) {\n  const tag = type === 'ordered' ? 'ol' : 'ul';\n\n  switch (type) {\n    case 'checked':\n      return [tag, ' data-list=\"checked\"'];\n\n    case 'unchecked':\n      return [tag, ' data-list=\"unchecked\"'];\n\n    default:\n      return [tag, ''];\n  }\n}\n\nfunction normalizeDelta(delta) {\n  return delta.reduce((normalizedDelta, op) => {\n    if (typeof op.insert === 'string') {\n      const text = op.insert.replace(/\\r\\n/g, '\\n').replace(/\\r/g, '\\n');\n      return normalizedDelta.insert(text, op.attributes);\n    }\n\n    return normalizedDelta.push(op);\n  }, new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a());\n}\n\nfunction shiftRange({\n  index,\n  length\n}, amount) {\n  return new _selection__WEBPACK_IMPORTED_MODULE_5__[\"Range\"](index + amount, length);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Editor);\n\n//# sourceURL=webpack://Quill/./core/editor.js?");

	/***/ }),

	/***/ "./core/emitter.js":
	/*!*************************!*\
	  !*** ./core/emitter.js ***!
	  \*************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ \"./node_modules/eventemitter3/index.js\");\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _instances__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instances */ \"./core/instances.js\");\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger */ \"./core/logger.js\");\n\n\n\nconst debug = Object(_logger__WEBPACK_IMPORTED_MODULE_2__[\"default\"])('quill:events');\nconst EVENTS = ['selectionchange', 'mousedown', 'mouseup', 'click'];\nEVENTS.forEach(eventName => {\n  document.addEventListener(eventName, (...args) => {\n    Array.from(document.querySelectorAll('.ql-container')).forEach(node => {\n      const quill = _instances__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get(node);\n\n      if (quill && quill.emitter) {\n        quill.emitter.handleDOM(...args);\n      }\n    });\n  });\n});\n\nclass Emitter extends eventemitter3__WEBPACK_IMPORTED_MODULE_0___default.a {\n  constructor() {\n    super();\n    this.listeners = {};\n    this.on('error', debug.error);\n  }\n\n  emit(...args) {\n    debug.log.call(debug, ...args);\n    super.emit(...args);\n  }\n\n  handleDOM(event, ...args) {\n    (this.listeners[event.type] || []).forEach(({\n      node,\n      handler\n    }) => {\n      if (event.target === node || node.contains(event.target)) {\n        handler(event, ...args);\n      }\n    });\n  }\n\n  listenDOM(eventName, node, handler) {\n    if (!this.listeners[eventName]) {\n      this.listeners[eventName] = [];\n    }\n\n    this.listeners[eventName].push({\n      node,\n      handler\n    });\n  }\n\n}\n\nEmitter.events = {\n  EDITOR_CHANGE: 'editor-change',\n  SCROLL_BEFORE_UPDATE: 'scroll-before-update',\n  SCROLL_BLOT_MOUNT: 'scroll-blot-mount',\n  SCROLL_BLOT_UNMOUNT: 'scroll-blot-unmount',\n  SCROLL_OPTIMIZE: 'scroll-optimize',\n  SCROLL_UPDATE: 'scroll-update',\n  SELECTION_CHANGE: 'selection-change',\n  TEXT_CHANGE: 'text-change'\n};\nEmitter.sources = {\n  API: 'api',\n  SILENT: 'silent',\n  USER: 'user'\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Emitter);\n\n//# sourceURL=webpack://Quill/./core/emitter.js?");

	/***/ }),

	/***/ "./core/instances.js":
	/*!***************************!*\
	  !*** ./core/instances.js ***!
	  \***************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new WeakMap());\n\n//# sourceURL=webpack://Quill/./core/instances.js?");

	/***/ }),

	/***/ "./core/logger.js":
	/*!************************!*\
	  !*** ./core/logger.js ***!
	  \************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\nconst levels = ['error', 'warn', 'log', 'info'];\nlet level = 'warn';\n\nfunction debug(method, ...args) {\n  if (levels.indexOf(method) <= levels.indexOf(level)) {\n    console[method](...args); // eslint-disable-line no-console\n  }\n}\n\nfunction namespace(ns) {\n  return levels.reduce((logger, method) => {\n    logger[method] = debug.bind(console, method, ns);\n    return logger;\n  }, {});\n}\n\nnamespace.level = newLevel => {\n  level = newLevel;\n};\n\ndebug.level = namespace.level;\n/* harmony default export */ __webpack_exports__[\"default\"] = (namespace);\n\n//# sourceURL=webpack://Quill/./core/logger.js?");

	/***/ }),

	/***/ "./core/module.js":
	/*!************************!*\
	  !*** ./core/module.js ***!
	  \************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\nclass Module {\n  constructor(quill, options = {}) {\n    this.quill = quill;\n    this.options = options;\n  }\n\n}\n\nModule.DEFAULTS = {};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Module);\n\n//# sourceURL=webpack://Quill/./core/module.js?");

	/***/ }),

	/***/ "./core/quill.js":
	/*!***********************!*\
	  !*** ./core/quill.js ***!
	  \***********************/
	/*! exports provided: globalRegistry, expandConfig, overload, default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"globalRegistry\", function() { return globalRegistry; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"expandConfig\", function() { return expandConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"overload\", function() { return overload; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Quill; });\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill-delta */ \"./node_modules/quill-delta/dist/Delta.js\");\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! extend */ \"./node_modules/extend/index.js\");\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(extend__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor */ \"./core/editor.js\");\n/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./emitter */ \"./core/emitter.js\");\n/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./module */ \"./core/module.js\");\n/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./selection */ \"./core/selection.js\");\n/* harmony import */ var _instances__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./instances */ \"./core/instances.js\");\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./logger */ \"./core/logger.js\");\n/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./theme */ \"./core/theme.js\");\n\n\n\n\n\n\n\n\n\n\nconst debug = Object(_logger__WEBPACK_IMPORTED_MODULE_8__[\"default\"])('quill');\nconst globalRegistry = new parchment__WEBPACK_IMPORTED_MODULE_1__[\"Registry\"]();\nparchment__WEBPACK_IMPORTED_MODULE_1__[\"ParentBlot\"].uiClass = 'ql-ui';\n\nclass Quill {\n  static debug(limit) {\n    if (limit === true) {\n      limit = 'log';\n    }\n\n    _logger__WEBPACK_IMPORTED_MODULE_8__[\"default\"].level(limit);\n  }\n\n  static find(node) {\n    return _instances__WEBPACK_IMPORTED_MODULE_7__[\"default\"].get(node) || globalRegistry.find(node);\n  }\n\n  static import(name) {\n    if (this.imports[name] == null) {\n      debug.error(\"Cannot import \".concat(name, \". Are you sure it was registered?\"));\n    }\n\n    return this.imports[name];\n  }\n\n  static register(path, target, overwrite = false) {\n    if (typeof path !== 'string') {\n      const name = path.attrName || path.blotName;\n\n      if (typeof name === 'string') {\n        // register(Blot | Attributor, overwrite)\n        this.register(\"formats/\".concat(name), path, target);\n      } else {\n        Object.keys(path).forEach(key => {\n          this.register(key, path[key], target);\n        });\n      }\n    } else {\n      if (this.imports[path] != null && !overwrite) {\n        debug.warn(\"Overwriting \".concat(path, \" with\"), target);\n      }\n\n      this.imports[path] = target;\n\n      if ((path.startsWith('blots/') || path.startsWith('formats/')) && target.blotName !== 'abstract') {\n        globalRegistry.register(target);\n      }\n\n      if (typeof target.register === 'function') {\n        target.register(globalRegistry);\n      }\n    }\n  }\n\n  constructor(container, options = {}) {\n    this.options = expandConfig(container, options);\n    this.container = this.options.container;\n\n    if (this.container == null) {\n      return debug.error('Invalid Quill container', container);\n    }\n\n    if (this.options.debug) {\n      Quill.debug(this.options.debug);\n    }\n\n    const html = this.container.innerHTML.trim();\n    this.container.classList.add('ql-container');\n    this.container.innerHTML = '';\n    _instances__WEBPACK_IMPORTED_MODULE_7__[\"default\"].set(this.container, this);\n    this.root = this.addContainer('ql-editor');\n    this.root.classList.add('ql-blank');\n    this.root.setAttribute('data-gramm', false);\n    this.scrollingContainer = this.options.scrollingContainer || this.root;\n    this.emitter = new _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n    const ScrollBlot = this.options.registry.query(parchment__WEBPACK_IMPORTED_MODULE_1__[\"ScrollBlot\"].blotName);\n    this.scroll = new ScrollBlot(this.options.registry, this.root, {\n      emitter: this.emitter\n    });\n    this.editor = new _editor__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.scroll);\n    this.selection = new _selection__WEBPACK_IMPORTED_MODULE_6__[\"default\"](this.scroll, this.emitter);\n    this.theme = new this.options.theme(this, this.options); // eslint-disable-line new-cap\n\n    this.keyboard = this.theme.addModule('keyboard');\n    this.clipboard = this.theme.addModule('clipboard');\n    this.history = this.theme.addModule('history');\n    this.uploader = this.theme.addModule('uploader');\n    this.theme.init();\n    this.emitter.on(_emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].events.EDITOR_CHANGE, type => {\n      if (type === _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].events.TEXT_CHANGE) {\n        this.root.classList.toggle('ql-blank', this.editor.isBlank());\n      }\n    });\n    this.emitter.on(_emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].events.SCROLL_UPDATE, (source, mutations) => {\n      const oldRange = this.selection.lastRange;\n      const [newRange] = this.selection.getRange();\n      const selectionInfo = oldRange && newRange ? {\n        oldRange,\n        newRange\n      } : undefined;\n      modify.call(this, () => this.editor.update(null, mutations, selectionInfo), source);\n    });\n    const contents = this.clipboard.convert({\n      html: \"\".concat(html, \"<p><br></p>\"),\n      text: '\\n'\n    });\n    this.setContents(contents);\n    this.history.clear();\n\n    if (this.options.placeholder) {\n      this.root.setAttribute('data-placeholder', this.options.placeholder);\n    }\n\n    if (this.options.readOnly) {\n      this.disable();\n    }\n\n    this.allowReadOnlyEdits = false;\n  }\n\n  addContainer(container, refNode = null) {\n    if (typeof container === 'string') {\n      const className = container;\n      container = document.createElement('div');\n      container.classList.add(className);\n    }\n\n    this.container.insertBefore(container, refNode);\n    return container;\n  }\n\n  blur() {\n    this.selection.setRange(null);\n  }\n\n  deleteText(index, length, source) {\n    [index, length,, source] = overload(index, length, source);\n    return modify.call(this, () => {\n      return this.editor.deleteText(index, length);\n    }, source, index, -1 * length);\n  }\n\n  disable() {\n    this.enable(false);\n  }\n\n  editReadOnly(modifier) {\n    this.allowReadOnlyEdits = true;\n    const value = modifier();\n    this.allowReadOnlyEdits = false;\n    return value;\n  }\n\n  enable(enabled = true) {\n    this.scroll.enable(enabled);\n    this.container.classList.toggle('ql-disabled', !enabled);\n  }\n\n  focus() {\n    const {\n      scrollTop\n    } = this.scrollingContainer;\n    this.selection.focus();\n    this.scrollingContainer.scrollTop = scrollTop;\n    this.scrollIntoView();\n  }\n\n  format(name, value, source = _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.API) {\n    return modify.call(this, () => {\n      const range = this.getSelection(true);\n      let change = new quill_delta__WEBPACK_IMPORTED_MODULE_0___default.a();\n      if (range == null) return change;\n\n      if (this.scroll.query(name, parchment__WEBPACK_IMPORTED_MODULE_1__[\"Scope\"].BLOCK)) {\n        change = this.editor.formatLine(range.index, range.length, {\n          [name]: value\n        });\n      } else if (range.length === 0) {\n        this.selection.format(name, value);\n        return change;\n      } else {\n        change = this.editor.formatText(range.index, range.length, {\n          [name]: value\n        });\n      }\n\n      this.setSelection(range, _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.SILENT);\n      return change;\n    }, source);\n  }\n\n  formatLine(index, length, name, value, source) {\n    let formats; // eslint-disable-next-line prefer-const\n\n    [index, length, formats, source] = overload(index, length, name, value, source);\n    return modify.call(this, () => {\n      return this.editor.formatLine(index, length, formats);\n    }, source, index, 0);\n  }\n\n  formatText(index, length, name, value, source) {\n    let formats; // eslint-disable-next-line prefer-const\n\n    [index, length, formats, source] = overload(index, length, name, value, source);\n    return modify.call(this, () => {\n      return this.editor.formatText(index, length, formats);\n    }, source, index, 0);\n  }\n\n  getBounds(index, length = 0) {\n    let bounds;\n\n    if (typeof index === 'number') {\n      bounds = this.selection.getBounds(index, length);\n    } else {\n      bounds = this.selection.getBounds(index.index, index.length);\n    }\n\n    const containerBounds = this.container.getBoundingClientRect();\n    return {\n      bottom: bounds.bottom - containerBounds.top,\n      height: bounds.height,\n      left: bounds.left - containerBounds.left,\n      right: bounds.right - containerBounds.left,\n      top: bounds.top - containerBounds.top,\n      width: bounds.width\n    };\n  }\n\n  getContents(index = 0, length = this.getLength() - index) {\n    [index, length] = overload(index, length);\n    return this.editor.getContents(index, length);\n  }\n\n  getFormat(index = this.getSelection(true), length = 0) {\n    if (typeof index === 'number') {\n      return this.editor.getFormat(index, length);\n    }\n\n    return this.editor.getFormat(index.index, index.length);\n  }\n\n  getIndex(blot) {\n    return blot.offset(this.scroll);\n  }\n\n  getLength() {\n    return this.scroll.length();\n  }\n\n  getLeaf(index) {\n    return this.scroll.leaf(index);\n  }\n\n  getLine(index) {\n    return this.scroll.line(index);\n  }\n\n  getLines(index = 0, length = Number.MAX_VALUE) {\n    if (typeof index !== 'number') {\n      return this.scroll.lines(index.index, index.length);\n    }\n\n    return this.scroll.lines(index, length);\n  }\n\n  getModule(name) {\n    return this.theme.modules[name];\n  }\n\n  getSelection(focus = false) {\n    if (focus) this.focus();\n    this.update(); // Make sure we access getRange with editor in consistent state\n\n    return this.selection.getRange()[0];\n  }\n\n  getSemanticHTML(index = 0, length = this.getLength() - index) {\n    [index, length] = overload(index, length);\n    return this.editor.getHTML(index, length);\n  }\n\n  getText(index = 0, length = this.getLength() - index) {\n    [index, length] = overload(index, length);\n    return this.editor.getText(index, length);\n  }\n\n  hasFocus() {\n    return this.selection.hasFocus();\n  }\n\n  insertEmbed(index, embed, value, source = Quill.sources.API) {\n    return modify.call(this, () => {\n      return this.editor.insertEmbed(index, embed, value);\n    }, source, index);\n  }\n\n  insertText(index, text, name, value, source) {\n    let formats; // eslint-disable-next-line prefer-const\n\n    [index,, formats, source] = overload(index, 0, name, value, source);\n    return modify.call(this, () => {\n      return this.editor.insertText(index, text, formats);\n    }, source, index, text.length);\n  }\n\n  isEnabled() {\n    return this.scroll.isEnabled();\n  }\n\n  off(...args) {\n    return this.emitter.off(...args);\n  }\n\n  on(...args) {\n    return this.emitter.on(...args);\n  }\n\n  once(...args) {\n    return this.emitter.once(...args);\n  }\n\n  removeFormat(index, length, source) {\n    [index, length,, source] = overload(index, length, source);\n    return modify.call(this, () => {\n      return this.editor.removeFormat(index, length);\n    }, source, index);\n  }\n\n  scrollIntoView() {\n    this.selection.scrollIntoView(this.scrollingContainer);\n  }\n\n  setContents(delta, source = _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.API) {\n    return modify.call(this, () => {\n      delta = new quill_delta__WEBPACK_IMPORTED_MODULE_0___default.a(delta);\n      const length = this.getLength();\n      const deleted = this.editor.deleteText(0, length);\n      const applied = this.editor.applyDelta(delta);\n      const lastOp = applied.ops[applied.ops.length - 1];\n\n      if (lastOp != null && typeof lastOp.insert === 'string' && lastOp.insert[lastOp.insert.length - 1] === '\\n') {\n        this.editor.deleteText(this.getLength() - 1, 1);\n        applied.delete(1);\n      }\n\n      return deleted.compose(applied);\n    }, source);\n  }\n\n  setSelection(index, length, source) {\n    if (index == null) {\n      this.selection.setRange(null, length || Quill.sources.API);\n    } else {\n      [index, length,, source] = overload(index, length, source);\n      this.selection.setRange(new _selection__WEBPACK_IMPORTED_MODULE_6__[\"Range\"](Math.max(0, index), length), source);\n\n      if (source !== _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.SILENT) {\n        this.selection.scrollIntoView(this.scrollingContainer);\n      }\n    }\n  }\n\n  setText(text, source = _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.API) {\n    const delta = new quill_delta__WEBPACK_IMPORTED_MODULE_0___default.a().insert(text);\n    return this.setContents(delta, source);\n  }\n\n  update(source = _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.USER) {\n    const change = this.scroll.update(source); // Will update selection before selection.update() does if text changes\n\n    this.selection.update(source); // TODO this is usually undefined\n\n    return change;\n  }\n\n  updateContents(delta, source = _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.API) {\n    return modify.call(this, () => {\n      delta = new quill_delta__WEBPACK_IMPORTED_MODULE_0___default.a(delta);\n      return this.editor.applyDelta(delta, source);\n    }, source, true);\n  }\n\n}\n\nQuill.DEFAULTS = {\n  bounds: null,\n  modules: {},\n  placeholder: '',\n  readOnly: false,\n  registry: globalRegistry,\n  scrollingContainer: null,\n  theme: 'default'\n};\nQuill.events = _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].events;\nQuill.sources = _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources; // eslint-disable-next-line no-undef\n\nQuill.version =  false ? undefined : \"2.0.0-dev.3\";\nQuill.imports = {\n  delta: quill_delta__WEBPACK_IMPORTED_MODULE_0___default.a,\n  parchment: parchment__WEBPACK_IMPORTED_MODULE_1__,\n  'core/module': _module__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  'core/theme': _theme__WEBPACK_IMPORTED_MODULE_9__[\"default\"]\n};\n\nfunction expandConfig(container, userConfig) {\n  userConfig = extend__WEBPACK_IMPORTED_MODULE_2___default()(true, {\n    container,\n    modules: {\n      clipboard: true,\n      keyboard: true,\n      history: true,\n      uploader: true\n    }\n  }, userConfig);\n\n  if (!userConfig.theme || userConfig.theme === Quill.DEFAULTS.theme) {\n    userConfig.theme = _theme__WEBPACK_IMPORTED_MODULE_9__[\"default\"];\n  } else {\n    userConfig.theme = Quill.import(\"themes/\".concat(userConfig.theme));\n\n    if (userConfig.theme == null) {\n      throw new Error(\"Invalid theme \".concat(userConfig.theme, \". Did you register it?\"));\n    }\n  }\n\n  const themeConfig = extend__WEBPACK_IMPORTED_MODULE_2___default()(true, {}, userConfig.theme.DEFAULTS);\n  [themeConfig, userConfig].forEach(config => {\n    config.modules = config.modules || {};\n    Object.keys(config.modules).forEach(module => {\n      if (config.modules[module] === true) {\n        config.modules[module] = {};\n      }\n    });\n  });\n  const moduleNames = Object.keys(themeConfig.modules).concat(Object.keys(userConfig.modules));\n  const moduleConfig = moduleNames.reduce((config, name) => {\n    const moduleClass = Quill.import(\"modules/\".concat(name));\n\n    if (moduleClass == null) {\n      debug.error(\"Cannot load \".concat(name, \" module. Are you sure you registered it?\"));\n    } else {\n      config[name] = moduleClass.DEFAULTS || {};\n    }\n\n    return config;\n  }, {}); // Special case toolbar shorthand\n\n  if (userConfig.modules != null && userConfig.modules.toolbar && userConfig.modules.toolbar.constructor !== Object) {\n    userConfig.modules.toolbar = {\n      container: userConfig.modules.toolbar\n    };\n  }\n\n  userConfig = extend__WEBPACK_IMPORTED_MODULE_2___default()(true, {}, Quill.DEFAULTS, {\n    modules: moduleConfig\n  }, themeConfig, userConfig);\n  ['bounds', 'container', 'scrollingContainer'].forEach(key => {\n    if (typeof userConfig[key] === 'string') {\n      userConfig[key] = document.querySelector(userConfig[key]);\n    }\n  });\n  userConfig.modules = Object.keys(userConfig.modules).reduce((config, name) => {\n    if (userConfig.modules[name]) {\n      config[name] = userConfig.modules[name];\n    }\n\n    return config;\n  }, {});\n  return userConfig;\n} // Handle selection preservation and TEXT_CHANGE emission\n// common to modification APIs\n\n\nfunction modify(modifier, source, index, shift) {\n  if (!this.isEnabled() && source === _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.USER && !this.allowReadOnlyEdits) {\n    return new quill_delta__WEBPACK_IMPORTED_MODULE_0___default.a();\n  }\n\n  let range = index == null ? null : this.getSelection();\n  const oldDelta = this.editor.delta;\n  const change = modifier();\n\n  if (range != null) {\n    if (index === true) {\n      index = range.index; // eslint-disable-line prefer-destructuring\n    }\n\n    if (shift == null) {\n      range = shiftRange(range, change, source);\n    } else if (shift !== 0) {\n      range = shiftRange(range, index, shift, source);\n    }\n\n    this.setSelection(range, _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.SILENT);\n  }\n\n  if (change.length() > 0) {\n    const args = [_emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].events.TEXT_CHANGE, change, oldDelta, source];\n    this.emitter.emit(_emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].events.EDITOR_CHANGE, ...args);\n\n    if (source !== _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.SILENT) {\n      this.emitter.emit(...args);\n    }\n  }\n\n  return change;\n}\n\nfunction overload(index, length, name, value, source) {\n  let formats = {};\n\n  if (typeof index.index === 'number' && typeof index.length === 'number') {\n    // Allow for throwaway end (used by insertText/insertEmbed)\n    if (typeof length !== 'number') {\n      source = value;\n      value = name;\n      name = length;\n      length = index.length; // eslint-disable-line prefer-destructuring\n\n      index = index.index; // eslint-disable-line prefer-destructuring\n    } else {\n      length = index.length; // eslint-disable-line prefer-destructuring\n\n      index = index.index; // eslint-disable-line prefer-destructuring\n    }\n  } else if (typeof length !== 'number') {\n    source = value;\n    value = name;\n    name = length;\n    length = 0;\n  } // Handle format being object, two format name/value strings or excluded\n\n\n  if (typeof name === 'object') {\n    formats = name;\n    source = value;\n  } else if (typeof name === 'string') {\n    if (value != null) {\n      formats[name] = value;\n    } else {\n      source = name;\n    }\n  } // Handle optional source\n\n\n  source = source || _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.API;\n  return [index, length, formats, source];\n}\n\nfunction shiftRange(range, index, length, source) {\n  if (range == null) return null;\n  let start;\n  let end;\n\n  if (index instanceof quill_delta__WEBPACK_IMPORTED_MODULE_0___default.a) {\n    [start, end] = [range.index, range.index + range.length].map(pos => index.transformPosition(pos, source !== _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.USER));\n  } else {\n    [start, end] = [range.index, range.index + range.length].map(pos => {\n      if (pos < index || pos === index && source === _emitter__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.USER) return pos;\n\n      if (length >= 0) {\n        return pos + length;\n      }\n\n      return Math.max(index, pos + length);\n    });\n  }\n\n  return new _selection__WEBPACK_IMPORTED_MODULE_6__[\"Range\"](start, end - start);\n}\n\n\n\n//# sourceURL=webpack://Quill/./core/quill.js?");

	/***/ }),

	/***/ "./core/selection.js":
	/*!***************************!*\
	  !*** ./core/selection.js ***!
	  \***************************/
	/*! exports provided: Range, default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Range\", function() { return Range; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Selection; });\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var clone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clone */ \"./node_modules/clone/clone.js\");\n/* harmony import */ var clone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clone__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! deep-equal */ \"./node_modules/deep-equal/index.js\");\n/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(deep_equal__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./emitter */ \"./core/emitter.js\");\n/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./logger */ \"./core/logger.js\");\n\n\n\n\n\nconst debug = Object(_logger__WEBPACK_IMPORTED_MODULE_4__[\"default\"])('quill:selection');\n\nclass Range {\n  constructor(index, length = 0) {\n    this.index = index;\n    this.length = length;\n  }\n\n}\n\nclass Selection {\n  constructor(scroll, emitter) {\n    this.emitter = emitter;\n    this.scroll = scroll;\n    this.composing = false;\n    this.mouseDown = false;\n    this.root = this.scroll.domNode;\n    this.cursor = this.scroll.create('cursor', this); // savedRange is last non-null range\n\n    this.savedRange = new Range(0, 0);\n    this.lastRange = this.savedRange;\n    this.lastNative = null;\n    this.handleComposition();\n    this.handleDragging();\n    this.emitter.listenDOM('selectionchange', document, () => {\n      if (!this.mouseDown && !this.composing) {\n        setTimeout(this.update.bind(this, _emitter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sources.USER), 1);\n      }\n    });\n    this.emitter.on(_emitter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].events.SCROLL_BEFORE_UPDATE, () => {\n      if (!this.hasFocus()) return;\n      const native = this.getNativeRange();\n      if (native == null) return;\n      if (native.start.node === this.cursor.textNode) return; // cursor.restore() will handle\n\n      this.emitter.once(_emitter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].events.SCROLL_UPDATE, () => {\n        try {\n          if (this.root.contains(native.start.node) && this.root.contains(native.end.node)) {\n            this.setNativeRange(native.start.node, native.start.offset, native.end.node, native.end.offset);\n          }\n\n          this.update(_emitter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sources.SILENT);\n        } catch (ignored) {// ignore\n        }\n      });\n    });\n    this.emitter.on(_emitter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].events.SCROLL_OPTIMIZE, (mutations, context) => {\n      if (context.range) {\n        const {\n          startNode,\n          startOffset,\n          endNode,\n          endOffset\n        } = context.range;\n        this.setNativeRange(startNode, startOffset, endNode, endOffset);\n        this.update(_emitter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sources.SILENT);\n      }\n    });\n    this.update(_emitter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sources.SILENT);\n  }\n\n  handleComposition() {\n    this.root.addEventListener('compositionstart', () => {\n      this.composing = true;\n      this.scroll.batchStart();\n    });\n    this.root.addEventListener('compositionend', () => {\n      this.scroll.batchEnd();\n      this.composing = false;\n\n      if (this.cursor.parent) {\n        const range = this.cursor.restore();\n        if (!range) return;\n        setTimeout(() => {\n          this.setNativeRange(range.startNode, range.startOffset, range.endNode, range.endOffset);\n        }, 1);\n      }\n    });\n  }\n\n  handleDragging() {\n    this.emitter.listenDOM('mousedown', document.body, () => {\n      this.mouseDown = true;\n    });\n    this.emitter.listenDOM('mouseup', document.body, () => {\n      this.mouseDown = false;\n      this.update(_emitter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sources.USER);\n    });\n  }\n\n  focus() {\n    if (this.hasFocus()) return;\n    this.root.focus();\n    this.setRange(this.savedRange);\n  }\n\n  format(format, value) {\n    this.scroll.update();\n    const nativeRange = this.getNativeRange();\n    if (nativeRange == null || !nativeRange.native.collapsed || this.scroll.query(format, parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].BLOCK)) return;\n\n    if (nativeRange.start.node !== this.cursor.textNode) {\n      const blot = this.scroll.find(nativeRange.start.node, false);\n      if (blot == null) return; // TODO Give blot ability to not split\n\n      if (blot instanceof parchment__WEBPACK_IMPORTED_MODULE_0__[\"LeafBlot\"]) {\n        const after = blot.split(nativeRange.start.offset);\n        blot.parent.insertBefore(this.cursor, after);\n      } else {\n        blot.insertBefore(this.cursor, nativeRange.start.node); // Should never happen\n      }\n\n      this.cursor.attach();\n    }\n\n    this.cursor.format(format, value);\n    this.scroll.optimize();\n    this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length);\n    this.update();\n  }\n\n  getBounds(index, length = 0) {\n    const scrollLength = this.scroll.length();\n    index = Math.min(index, scrollLength - 1);\n    length = Math.min(index + length, scrollLength - 1) - index;\n    let node;\n    let [leaf, offset] = this.scroll.leaf(index);\n    if (leaf == null) return null;\n    [node, offset] = leaf.position(offset, true);\n    const range = document.createRange();\n\n    if (length > 0) {\n      range.setStart(node, offset);\n      [leaf, offset] = this.scroll.leaf(index + length);\n      if (leaf == null) return null;\n      [node, offset] = leaf.position(offset, true);\n      range.setEnd(node, offset);\n      return range.getBoundingClientRect();\n    }\n\n    let side = 'left';\n    let rect;\n\n    if (node instanceof Text) {\n      if (offset < node.data.length) {\n        range.setStart(node, offset);\n        range.setEnd(node, offset + 1);\n      } else {\n        range.setStart(node, offset - 1);\n        range.setEnd(node, offset);\n        side = 'right';\n      }\n\n      rect = range.getBoundingClientRect();\n    } else {\n      rect = leaf.domNode.getBoundingClientRect();\n      if (offset > 0) side = 'right';\n    }\n\n    return {\n      bottom: rect.top + rect.height,\n      height: rect.height,\n      left: rect[side],\n      right: rect[side],\n      top: rect.top,\n      width: 0\n    };\n  }\n\n  getNativeRange() {\n    const selection = document.getSelection();\n    if (selection == null || selection.rangeCount <= 0) return null;\n    const nativeRange = selection.getRangeAt(0);\n    if (nativeRange == null) return null;\n    const range = this.normalizeNative(nativeRange);\n    debug.info('getNativeRange', range);\n    return range;\n  }\n\n  getRange() {\n    const normalized = this.getNativeRange();\n    if (normalized == null) return [null, null];\n    const range = this.normalizedToRange(normalized);\n    return [range, normalized];\n  }\n\n  hasFocus() {\n    return document.activeElement === this.root || contains(this.root, document.activeElement);\n  }\n\n  normalizedToRange(range) {\n    const positions = [[range.start.node, range.start.offset]];\n\n    if (!range.native.collapsed) {\n      positions.push([range.end.node, range.end.offset]);\n    }\n\n    const indexes = positions.map(position => {\n      const [node, offset] = position;\n      const blot = this.scroll.find(node, true);\n      const index = blot.offset(this.scroll);\n\n      if (offset === 0) {\n        return index;\n      }\n\n      if (blot instanceof parchment__WEBPACK_IMPORTED_MODULE_0__[\"LeafBlot\"]) {\n        return index + blot.index(node, offset);\n      }\n\n      return index + blot.length();\n    });\n    const end = Math.min(Math.max(...indexes), this.scroll.length() - 1);\n    const start = Math.min(end, ...indexes);\n    return new Range(start, end - start);\n  }\n\n  normalizeNative(nativeRange) {\n    if (!contains(this.root, nativeRange.startContainer) || !nativeRange.collapsed && !contains(this.root, nativeRange.endContainer)) {\n      return null;\n    }\n\n    const range = {\n      start: {\n        node: nativeRange.startContainer,\n        offset: nativeRange.startOffset\n      },\n      end: {\n        node: nativeRange.endContainer,\n        offset: nativeRange.endOffset\n      },\n      native: nativeRange\n    };\n    [range.start, range.end].forEach(position => {\n      let {\n        node,\n        offset\n      } = position;\n\n      while (!(node instanceof Text) && node.childNodes.length > 0) {\n        if (node.childNodes.length > offset) {\n          node = node.childNodes[offset];\n          offset = 0;\n        } else if (node.childNodes.length === offset) {\n          node = node.lastChild;\n\n          if (node instanceof Text) {\n            offset = node.data.length;\n          } else if (node.childNodes.length > 0) {\n            // Container case\n            offset = node.childNodes.length;\n          } else {\n            // Embed case\n            offset = node.childNodes.length + 1;\n          }\n        } else {\n          break;\n        }\n      }\n\n      position.node = node;\n      position.offset = offset;\n    });\n    return range;\n  }\n\n  rangeToNative(range) {\n    const indexes = range.collapsed ? [range.index] : [range.index, range.index + range.length];\n    const args = [];\n    const scrollLength = this.scroll.length();\n    indexes.forEach((index, i) => {\n      index = Math.min(scrollLength - 1, index);\n      const [leaf, leafOffset] = this.scroll.leaf(index);\n      const [node, offset] = leaf.position(leafOffset, i !== 0);\n      args.push(node, offset);\n    });\n\n    if (args.length < 2) {\n      return args.concat(args);\n    }\n\n    return args;\n  }\n\n  scrollIntoView(scrollingContainer) {\n    const range = this.lastRange;\n    if (range == null) return;\n    const bounds = this.getBounds(range.index, range.length);\n    if (bounds == null) return;\n    const limit = this.scroll.length() - 1;\n    const [first] = this.scroll.line(Math.min(range.index, limit));\n    let last = first;\n\n    if (range.length > 0) {\n      [last] = this.scroll.line(Math.min(range.index + range.length, limit));\n    }\n\n    if (first == null || last == null) return;\n    const scrollBounds = scrollingContainer.getBoundingClientRect();\n\n    if (bounds.top < scrollBounds.top) {\n      scrollingContainer.scrollTop -= scrollBounds.top - bounds.top;\n    } else if (bounds.bottom > scrollBounds.bottom) {\n      scrollingContainer.scrollTop += bounds.bottom - scrollBounds.bottom;\n    }\n  }\n\n  setNativeRange(startNode, startOffset, endNode = startNode, endOffset = startOffset, force = false) {\n    debug.info('setNativeRange', startNode, startOffset, endNode, endOffset);\n\n    if (startNode != null && (this.root.parentNode == null || startNode.parentNode == null || endNode.parentNode == null)) {\n      return;\n    }\n\n    const selection = document.getSelection();\n    if (selection == null) return;\n\n    if (startNode != null) {\n      if (!this.hasFocus()) this.root.focus();\n      const {\n        native\n      } = this.getNativeRange() || {};\n\n      if (native == null || force || startNode !== native.startContainer || startOffset !== native.startOffset || endNode !== native.endContainer || endOffset !== native.endOffset) {\n        if (startNode.tagName === 'BR') {\n          startOffset = Array.from(startNode.parentNode.childNodes).indexOf(startNode);\n          startNode = startNode.parentNode;\n        }\n\n        if (endNode.tagName === 'BR') {\n          endOffset = Array.from(endNode.parentNode.childNodes).indexOf(endNode);\n          endNode = endNode.parentNode;\n        }\n\n        const range = document.createRange();\n        range.setStart(startNode, startOffset);\n        range.setEnd(endNode, endOffset);\n        selection.removeAllRanges();\n        selection.addRange(range);\n      }\n    } else {\n      selection.removeAllRanges();\n      this.root.blur();\n    }\n  }\n\n  setRange(range, force = false, source = _emitter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sources.API) {\n    if (typeof force === 'string') {\n      source = force;\n      force = false;\n    }\n\n    debug.info('setRange', range);\n\n    if (range != null) {\n      const args = this.rangeToNative(range);\n      this.setNativeRange(...args, force);\n    } else {\n      this.setNativeRange(null);\n    }\n\n    this.update(source);\n  }\n\n  update(source = _emitter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sources.USER) {\n    const oldRange = this.lastRange;\n    const [lastRange, nativeRange] = this.getRange();\n    this.lastRange = lastRange;\n    this.lastNative = nativeRange;\n\n    if (this.lastRange != null) {\n      this.savedRange = this.lastRange;\n    }\n\n    if (!deep_equal__WEBPACK_IMPORTED_MODULE_2___default()(oldRange, this.lastRange)) {\n      if (!this.composing && nativeRange != null && nativeRange.native.collapsed && nativeRange.start.node !== this.cursor.textNode) {\n        const range = this.cursor.restore();\n\n        if (range) {\n          this.setNativeRange(range.startNode, range.startOffset, range.endNode, range.endOffset);\n        }\n      }\n\n      const args = [_emitter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].events.SELECTION_CHANGE, clone__WEBPACK_IMPORTED_MODULE_1___default()(this.lastRange), clone__WEBPACK_IMPORTED_MODULE_1___default()(oldRange), source];\n      this.emitter.emit(_emitter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].events.EDITOR_CHANGE, ...args);\n\n      if (source !== _emitter__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sources.SILENT) {\n        this.emitter.emit(...args);\n      }\n    }\n  }\n\n}\n\nfunction contains(parent, descendant) {\n  try {\n    // Firefox inserts inaccessible nodes around video elements\n    descendant.parentNode; // eslint-disable-line no-unused-expressions\n  } catch (e) {\n    return false;\n  }\n\n  return parent.contains(descendant);\n}\n\n\n\n//# sourceURL=webpack://Quill/./core/selection.js?");

	/***/ }),

	/***/ "./core/theme.js":
	/*!***********************!*\
	  !*** ./core/theme.js ***!
	  \***********************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\nclass Theme {\n  constructor(quill, options) {\n    this.quill = quill;\n    this.options = options;\n    this.modules = {};\n  }\n\n  init() {\n    Object.keys(this.options.modules).forEach(name => {\n      if (this.modules[name] == null) {\n        this.addModule(name);\n      }\n    });\n  }\n\n  addModule(name) {\n    const ModuleClass = this.quill.constructor.import(\"modules/\".concat(name));\n    this.modules[name] = new ModuleClass(this.quill, this.options.modules[name] || {});\n    return this.modules[name];\n  }\n\n}\n\nTheme.DEFAULTS = {\n  modules: {}\n};\nTheme.themes = {\n  default: Theme\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Theme);\n\n//# sourceURL=webpack://Quill/./core/theme.js?");

	/***/ }),

	/***/ "./formats/align.js":
	/*!**************************!*\
	  !*** ./formats/align.js ***!
	  \**************************/
	/*! exports provided: AlignAttribute, AlignClass, AlignStyle */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AlignAttribute\", function() { return AlignAttribute; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AlignClass\", function() { return AlignClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AlignStyle\", function() { return AlignStyle; });\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n\nconst config = {\n  scope: parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].BLOCK,\n  whitelist: ['right', 'center', 'justify']\n};\nconst AlignAttribute = new parchment__WEBPACK_IMPORTED_MODULE_0__[\"Attributor\"]('align', 'align', config);\nconst AlignClass = new parchment__WEBPACK_IMPORTED_MODULE_0__[\"ClassAttributor\"]('align', 'ql-align', config);\nconst AlignStyle = new parchment__WEBPACK_IMPORTED_MODULE_0__[\"StyleAttributor\"]('align', 'text-align', config);\n\n\n//# sourceURL=webpack://Quill/./formats/align.js?");

	/***/ }),

	/***/ "./formats/background.js":
	/*!*******************************!*\
	  !*** ./formats/background.js ***!
	  \*******************************/
	/*! exports provided: BackgroundClass, BackgroundStyle */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BackgroundClass\", function() { return BackgroundClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BackgroundStyle\", function() { return BackgroundStyle; });\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color */ \"./formats/color.js\");\n\n\nconst BackgroundClass = new parchment__WEBPACK_IMPORTED_MODULE_0__[\"ClassAttributor\"]('background', 'ql-bg', {\n  scope: parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].INLINE\n});\nconst BackgroundStyle = new _color__WEBPACK_IMPORTED_MODULE_1__[\"ColorAttributor\"]('background', 'background-color', {\n  scope: parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].INLINE\n});\n\n\n//# sourceURL=webpack://Quill/./formats/background.js?");

	/***/ }),

	/***/ "./formats/blockquote.js":
	/*!*******************************!*\
	  !*** ./formats/blockquote.js ***!
	  \*******************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../blots/block */ \"./blots/block.js\");\n\n\nclass Blockquote extends _blots_block__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {}\n\nBlockquote.blotName = 'blockquote';\nBlockquote.tagName = 'blockquote';\n/* harmony default export */ __webpack_exports__[\"default\"] = (Blockquote);\n\n//# sourceURL=webpack://Quill/./formats/blockquote.js?");

	/***/ }),

	/***/ "./formats/bold.js":
	/*!*************************!*\
	  !*** ./formats/bold.js ***!
	  \*************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _blots_inline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../blots/inline */ \"./blots/inline.js\");\n\n\nclass Bold extends _blots_inline__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  static create() {\n    return super.create();\n  }\n\n  static formats() {\n    return true;\n  }\n\n  optimize(context) {\n    super.optimize(context);\n\n    if (this.domNode.tagName !== this.statics.tagName[0]) {\n      this.replaceWith(this.statics.blotName);\n    }\n  }\n\n}\n\nBold.blotName = 'bold';\nBold.tagName = ['STRONG', 'B'];\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bold);\n\n//# sourceURL=webpack://Quill/./formats/bold.js?");

	/***/ }),

	/***/ "./formats/code.js":
	/*!*************************!*\
	  !*** ./formats/code.js ***!
	  \*************************/
	/*! exports provided: Code, CodeBlockContainer, default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Code\", function() { return Code; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CodeBlockContainer\", function() { return CodeBlockContainer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CodeBlock; });\n/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../blots/block */ \"./blots/block.js\");\n/* harmony import */ var _blots_break__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../blots/break */ \"./blots/break.js\");\n/* harmony import */ var _blots_cursor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../blots/cursor */ \"./blots/cursor.js\");\n/* harmony import */ var _blots_inline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../blots/inline */ \"./blots/inline.js\");\n/* harmony import */ var _blots_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../blots/text */ \"./blots/text.js\");\n/* harmony import */ var _blots_container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../blots/container */ \"./blots/container.js\");\n/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/quill */ \"./core/quill.js\");\n\n\n\n\n\n\n\n\nclass CodeBlockContainer extends _blots_container__WEBPACK_IMPORTED_MODULE_5__[\"default\"] {\n  static create(value) {\n    const domNode = super.create(value);\n    domNode.setAttribute('spellcheck', false);\n    return domNode;\n  }\n\n  html(index, length) {\n    const text = this.children.map(child => child.domNode.innerText).join('\\n').slice(index, index + length);\n    return \"<pre>\".concat(Object(_blots_text__WEBPACK_IMPORTED_MODULE_4__[\"escapeText\"])(text), \"</pre>\");\n  }\n\n}\n\nclass CodeBlock extends _blots_block__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  static register() {\n    _core_quill__WEBPACK_IMPORTED_MODULE_6__[\"default\"].register(CodeBlockContainer);\n  }\n\n}\n\nclass Code extends _blots_inline__WEBPACK_IMPORTED_MODULE_3__[\"default\"] {}\n\nCode.blotName = 'code';\nCode.tagName = 'CODE';\nCodeBlock.blotName = 'code-block';\nCodeBlock.className = 'ql-code-block';\nCodeBlock.tagName = 'DIV';\nCodeBlockContainer.blotName = 'code-block-container';\nCodeBlockContainer.className = 'ql-code-block-container';\nCodeBlockContainer.tagName = 'DIV';\nCodeBlockContainer.allowedChildren = [CodeBlock];\nCodeBlock.allowedChildren = [_blots_text__WEBPACK_IMPORTED_MODULE_4__[\"default\"], _blots_break__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _blots_cursor__WEBPACK_IMPORTED_MODULE_2__[\"default\"]];\nCodeBlock.requiredContainer = CodeBlockContainer;\nCodeBlock.TAB = '  ';\n\n\n//# sourceURL=webpack://Quill/./formats/code.js?");

	/***/ }),

	/***/ "./formats/color.js":
	/*!**************************!*\
	  !*** ./formats/color.js ***!
	  \**************************/
	/*! exports provided: ColorAttributor, ColorClass, ColorStyle */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ColorAttributor\", function() { return ColorAttributor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ColorClass\", function() { return ColorClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ColorStyle\", function() { return ColorStyle; });\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n\n\nclass ColorAttributor extends parchment__WEBPACK_IMPORTED_MODULE_0__[\"StyleAttributor\"] {\n  value(domNode) {\n    let value = super.value(domNode);\n    if (!value.startsWith('rgb(')) return value;\n    value = value.replace(/^[^\\d]+/, '').replace(/[^\\d]+$/, '');\n    const hex = value.split(',').map(component => \"00\".concat(parseInt(component, 10).toString(16)).slice(-2)).join('');\n    return \"#\".concat(hex);\n  }\n\n}\n\nconst ColorClass = new parchment__WEBPACK_IMPORTED_MODULE_0__[\"ClassAttributor\"]('color', 'ql-color', {\n  scope: parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].INLINE\n});\nconst ColorStyle = new ColorAttributor('color', 'color', {\n  scope: parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].INLINE\n});\n\n\n//# sourceURL=webpack://Quill/./formats/color.js?");

	/***/ }),

	/***/ "./formats/direction.js":
	/*!******************************!*\
	  !*** ./formats/direction.js ***!
	  \******************************/
	/*! exports provided: DirectionAttribute, DirectionClass, DirectionStyle */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DirectionAttribute\", function() { return DirectionAttribute; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DirectionClass\", function() { return DirectionClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DirectionStyle\", function() { return DirectionStyle; });\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n\nconst config = {\n  scope: parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].BLOCK,\n  whitelist: ['rtl']\n};\nconst DirectionAttribute = new parchment__WEBPACK_IMPORTED_MODULE_0__[\"Attributor\"]('direction', 'dir', config);\nconst DirectionClass = new parchment__WEBPACK_IMPORTED_MODULE_0__[\"ClassAttributor\"]('direction', 'ql-direction', config);\nconst DirectionStyle = new parchment__WEBPACK_IMPORTED_MODULE_0__[\"StyleAttributor\"]('direction', 'direction', config);\n\n\n//# sourceURL=webpack://Quill/./formats/direction.js?");

	/***/ }),

	/***/ "./formats/font.js":
	/*!*************************!*\
	  !*** ./formats/font.js ***!
	  \*************************/
	/*! exports provided: FontStyle, FontClass */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FontStyle\", function() { return FontStyle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FontClass\", function() { return FontClass; });\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n\nconst config = {\n  scope: parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].INLINE,\n  whitelist: ['serif', 'monospace']\n};\nconst FontClass = new parchment__WEBPACK_IMPORTED_MODULE_0__[\"ClassAttributor\"]('font', 'ql-font', config);\n\nclass FontStyleAttributor extends parchment__WEBPACK_IMPORTED_MODULE_0__[\"StyleAttributor\"] {\n  value(node) {\n    return super.value(node).replace(/[\"']/g, '');\n  }\n\n}\n\nconst FontStyle = new FontStyleAttributor('font', 'font-family', config);\n\n\n//# sourceURL=webpack://Quill/./formats/font.js?");

	/***/ }),

	/***/ "./formats/formula.js":
	/*!****************************!*\
	  !*** ./formats/formula.js ***!
	  \****************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _blots_embed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../blots/embed */ \"./blots/embed.js\");\n\n\nclass Formula extends _blots_embed__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  static create(value) {\n    if (window.katex == null) {\n      throw new Error('Formula module requires KaTeX.');\n    }\n\n    const node = super.create(value);\n\n    if (typeof value === 'string') {\n      window.katex.render(value, node, {\n        throwOnError: false,\n        errorColor: '#f00'\n      });\n      node.setAttribute('data-value', value);\n    }\n\n    return node;\n  }\n\n  static value(domNode) {\n    return domNode.getAttribute('data-value');\n  }\n\n  html() {\n    const {\n      formula\n    } = this.value();\n    return \"<span>\".concat(formula, \"</span>\");\n  }\n\n}\n\nFormula.blotName = 'formula';\nFormula.className = 'ql-formula';\nFormula.tagName = 'SPAN';\n/* harmony default export */ __webpack_exports__[\"default\"] = (Formula);\n\n//# sourceURL=webpack://Quill/./formats/formula.js?");

	/***/ }),

	/***/ "./formats/header.js":
	/*!***************************!*\
	  !*** ./formats/header.js ***!
	  \***************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../blots/block */ \"./blots/block.js\");\n\n\nclass Header extends _blots_block__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  static formats(domNode) {\n    return this.tagName.indexOf(domNode.tagName) + 1;\n  }\n\n}\n\nHeader.blotName = 'header';\nHeader.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\n\n//# sourceURL=webpack://Quill/./formats/header.js?");

	/***/ }),

	/***/ "./formats/image.js":
	/*!**************************!*\
	  !*** ./formats/image.js ***!
	  \**************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./link */ \"./formats/link.js\");\n\n\nconst ATTRIBUTES = ['alt', 'height', 'width'];\n\nclass Image extends parchment__WEBPACK_IMPORTED_MODULE_0__[\"EmbedBlot\"] {\n  static create(value) {\n    const node = super.create(value);\n\n    if (typeof value === 'string') {\n      node.setAttribute('src', this.sanitize(value));\n    }\n\n    return node;\n  }\n\n  static formats(domNode) {\n    return ATTRIBUTES.reduce((formats, attribute) => {\n      if (domNode.hasAttribute(attribute)) {\n        formats[attribute] = domNode.getAttribute(attribute);\n      }\n\n      return formats;\n    }, {});\n  }\n\n  static match(url) {\n    return /\\.(jpe?g|gif|png)$/.test(url) || /^data:image\\/.+;base64/.test(url);\n  }\n\n  static register() {\n    if (/Firefox/i.test(navigator.userAgent)) {\n      setTimeout(() => {\n        // Disable image resizing in Firefox\n        document.execCommand('enableObjectResizing', false, false);\n      }, 1);\n    }\n  }\n\n  static sanitize(url) {\n    return Object(_link__WEBPACK_IMPORTED_MODULE_1__[\"sanitize\"])(url, ['http', 'https', 'data']) ? url : '//:0';\n  }\n\n  static value(domNode) {\n    return domNode.getAttribute('src');\n  }\n\n  format(name, value) {\n    if (ATTRIBUTES.indexOf(name) > -1) {\n      if (value) {\n        this.domNode.setAttribute(name, value);\n      } else {\n        this.domNode.removeAttribute(name);\n      }\n    } else {\n      super.format(name, value);\n    }\n  }\n\n}\n\nImage.blotName = 'image';\nImage.tagName = 'IMG';\n/* harmony default export */ __webpack_exports__[\"default\"] = (Image);\n\n//# sourceURL=webpack://Quill/./formats/image.js?");

	/***/ }),

	/***/ "./formats/indent.js":
	/*!***************************!*\
	  !*** ./formats/indent.js ***!
	  \***************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n\n\nclass IndentAttributor extends parchment__WEBPACK_IMPORTED_MODULE_0__[\"ClassAttributor\"] {\n  add(node, value) {\n    if (value === '+1' || value === '-1') {\n      const indent = this.value(node) || 0;\n      value = value === '+1' ? indent + 1 : indent - 1;\n    }\n\n    if (value === 0) {\n      this.remove(node);\n      return true;\n    }\n\n    return super.add(node, value);\n  }\n\n  canAdd(node, value) {\n    return super.canAdd(node, value) || super.canAdd(node, parseInt(value, 10));\n  }\n\n  value(node) {\n    return parseInt(super.value(node), 10) || undefined; // Don't return NaN\n  }\n\n}\n\nconst IndentClass = new IndentAttributor('indent', 'ql-indent', {\n  scope: parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].BLOCK,\n  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (IndentClass);\n\n//# sourceURL=webpack://Quill/./formats/indent.js?");

	/***/ }),

	/***/ "./formats/italic.js":
	/*!***************************!*\
	  !*** ./formats/italic.js ***!
	  \***************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bold__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bold */ \"./formats/bold.js\");\n\n\nclass Italic extends _bold__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {}\n\nItalic.blotName = 'italic';\nItalic.tagName = ['EM', 'I'];\n/* harmony default export */ __webpack_exports__[\"default\"] = (Italic);\n\n//# sourceURL=webpack://Quill/./formats/italic.js?");

	/***/ }),

	/***/ "./formats/link.js":
	/*!*************************!*\
	  !*** ./formats/link.js ***!
	  \*************************/
	/*! exports provided: default, sanitize */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Link; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sanitize\", function() { return sanitize; });\n/* harmony import */ var _blots_inline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../blots/inline */ \"./blots/inline.js\");\n\n\nclass Link extends _blots_inline__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  static create(value) {\n    const node = super.create(value);\n    node.setAttribute('href', this.sanitize(value));\n    node.setAttribute('rel', 'noopener noreferrer');\n    node.setAttribute('target', '_blank');\n    return node;\n  }\n\n  static formats(domNode) {\n    return domNode.getAttribute('href');\n  }\n\n  static sanitize(url) {\n    return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;\n  }\n\n  format(name, value) {\n    if (name !== this.statics.blotName || !value) {\n      super.format(name, value);\n    } else {\n      this.domNode.setAttribute('href', this.constructor.sanitize(value));\n    }\n  }\n\n}\n\nLink.blotName = 'link';\nLink.tagName = 'A';\nLink.SANITIZED_URL = 'about:blank';\nLink.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];\n\nfunction sanitize(url, protocols) {\n  const anchor = document.createElement('a');\n  anchor.href = url;\n  const protocol = anchor.href.slice(0, anchor.href.indexOf(':'));\n  return protocols.indexOf(protocol) > -1;\n}\n\n\n\n//# sourceURL=webpack://Quill/./formats/link.js?");

	/***/ }),

	/***/ "./formats/list.js":
	/*!*************************!*\
	  !*** ./formats/list.js ***!
	  \*************************/
	/*! exports provided: ListContainer, default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ListContainer\", function() { return ListContainer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ListItem; });\n/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../blots/block */ \"./blots/block.js\");\n/* harmony import */ var _blots_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../blots/container */ \"./blots/container.js\");\n/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/quill */ \"./core/quill.js\");\n\n\n\n\nclass ListContainer extends _blots_container__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {}\n\nListContainer.blotName = 'list-container';\nListContainer.tagName = 'OL';\n\nclass ListItem extends _blots_block__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  static create(value) {\n    const node = super.create();\n    node.setAttribute('data-list', value);\n    return node;\n  }\n\n  static formats(domNode) {\n    return domNode.getAttribute('data-list') || undefined;\n  }\n\n  static register() {\n    _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].register(ListContainer);\n  }\n\n  constructor(scroll, domNode) {\n    super(scroll, domNode);\n    const ui = domNode.ownerDocument.createElement('span');\n\n    const listEventHandler = e => {\n      if (!scroll.isEnabled()) return;\n      const format = this.statics.formats(domNode, scroll);\n\n      if (format === 'checked') {\n        this.format('list', 'unchecked');\n        e.preventDefault();\n      } else if (format === 'unchecked') {\n        this.format('list', 'checked');\n        e.preventDefault();\n      }\n    };\n\n    ui.addEventListener('mousedown', listEventHandler);\n    ui.addEventListener('touchstart', listEventHandler);\n    this.attachUI(ui);\n  }\n\n  format(name, value) {\n    if (name === this.statics.blotName && value) {\n      this.domNode.setAttribute('data-list', value);\n    } else {\n      super.format(name, value);\n    }\n  }\n\n}\n\nListItem.blotName = 'list';\nListItem.tagName = 'LI';\nListContainer.allowedChildren = [ListItem];\nListItem.requiredContainer = ListContainer;\n\n\n//# sourceURL=webpack://Quill/./formats/list.js?");

	/***/ }),

	/***/ "./formats/script.js":
	/*!***************************!*\
	  !*** ./formats/script.js ***!
	  \***************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _blots_inline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../blots/inline */ \"./blots/inline.js\");\n\n\nclass Script extends _blots_inline__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  static create(value) {\n    if (value === 'super') {\n      return document.createElement('sup');\n    }\n\n    if (value === 'sub') {\n      return document.createElement('sub');\n    }\n\n    return super.create(value);\n  }\n\n  static formats(domNode) {\n    if (domNode.tagName === 'SUB') return 'sub';\n    if (domNode.tagName === 'SUP') return 'super';\n    return undefined;\n  }\n\n}\n\nScript.blotName = 'script';\nScript.tagName = ['SUB', 'SUP'];\n/* harmony default export */ __webpack_exports__[\"default\"] = (Script);\n\n//# sourceURL=webpack://Quill/./formats/script.js?");

	/***/ }),

	/***/ "./formats/size.js":
	/*!*************************!*\
	  !*** ./formats/size.js ***!
	  \*************************/
	/*! exports provided: SizeClass, SizeStyle */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SizeClass\", function() { return SizeClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SizeStyle\", function() { return SizeStyle; });\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n\nconst SizeClass = new parchment__WEBPACK_IMPORTED_MODULE_0__[\"ClassAttributor\"]('size', 'ql-size', {\n  scope: parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].INLINE,\n  whitelist: ['small', 'large', 'huge']\n});\nconst SizeStyle = new parchment__WEBPACK_IMPORTED_MODULE_0__[\"StyleAttributor\"]('size', 'font-size', {\n  scope: parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].INLINE,\n  whitelist: ['10px', '18px', '32px']\n});\n\n\n//# sourceURL=webpack://Quill/./formats/size.js?");

	/***/ }),

	/***/ "./formats/strike.js":
	/*!***************************!*\
	  !*** ./formats/strike.js ***!
	  \***************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bold__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bold */ \"./formats/bold.js\");\n\n\nclass Strike extends _bold__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {}\n\nStrike.blotName = 'strike';\nStrike.tagName = ['S', 'STRIKE'];\n/* harmony default export */ __webpack_exports__[\"default\"] = (Strike);\n\n//# sourceURL=webpack://Quill/./formats/strike.js?");

	/***/ }),

	/***/ "./formats/table.js":
	/*!**************************!*\
	  !*** ./formats/table.js ***!
	  \**************************/
	/*! exports provided: TableCell, TableRow, TableBody, TableContainer, tableId */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TableCell\", function() { return TableCell; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TableRow\", function() { return TableRow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TableBody\", function() { return TableBody; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TableContainer\", function() { return TableContainer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tableId\", function() { return tableId; });\n/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../blots/block */ \"./blots/block.js\");\n/* harmony import */ var _blots_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../blots/container */ \"./blots/container.js\");\n\n\n\nclass TableCell extends _blots_block__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  static create(value) {\n    const node = super.create();\n\n    if (value) {\n      node.setAttribute('data-row', value);\n    } else {\n      node.setAttribute('data-row', tableId());\n    }\n\n    return node;\n  }\n\n  static formats(domNode) {\n    if (domNode.hasAttribute('data-row')) {\n      return domNode.getAttribute('data-row');\n    }\n\n    return undefined;\n  }\n\n  cellOffset() {\n    if (this.parent) {\n      return this.parent.children.indexOf(this);\n    }\n\n    return -1;\n  }\n\n  format(name, value) {\n    if (name === TableCell.blotName && value) {\n      this.domNode.setAttribute('data-row', value);\n    } else {\n      super.format(name, value);\n    }\n  }\n\n  row() {\n    return this.parent;\n  }\n\n  rowOffset() {\n    if (this.row()) {\n      return this.row().rowOffset();\n    }\n\n    return -1;\n  }\n\n  table() {\n    return this.row() && this.row().table();\n  }\n\n}\n\nTableCell.blotName = 'table';\nTableCell.tagName = 'TD';\n\nclass TableRow extends _blots_container__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n  checkMerge() {\n    if (super.checkMerge() && this.next.children.head != null) {\n      const thisHead = this.children.head.formats();\n      const thisTail = this.children.tail.formats();\n      const nextHead = this.next.children.head.formats();\n      const nextTail = this.next.children.tail.formats();\n      return thisHead.table === thisTail.table && thisHead.table === nextHead.table && thisHead.table === nextTail.table;\n    }\n\n    return false;\n  }\n\n  optimize(...args) {\n    super.optimize(...args);\n    this.children.forEach(child => {\n      if (child.next == null) return;\n      const childFormats = child.formats();\n      const nextFormats = child.next.formats();\n\n      if (childFormats.table !== nextFormats.table) {\n        const next = this.splitAfter(child);\n\n        if (next) {\n          next.optimize();\n        } // We might be able to merge with prev now\n\n\n        if (this.prev) {\n          this.prev.optimize();\n        }\n      }\n    });\n  }\n\n  rowOffset() {\n    if (this.parent) {\n      return this.parent.children.indexOf(this);\n    }\n\n    return -1;\n  }\n\n  table() {\n    return this.parent && this.parent.parent;\n  }\n\n}\n\nTableRow.blotName = 'table-row';\nTableRow.tagName = 'TR';\n\nclass TableBody extends _blots_container__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {}\n\nTableBody.blotName = 'table-body';\nTableBody.tagName = 'TBODY';\n\nclass TableContainer extends _blots_container__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n  balanceCells() {\n    const rows = this.descendants(TableRow);\n    const maxColumns = rows.reduce((max, row) => {\n      return Math.max(row.children.length, max);\n    }, 0);\n    rows.forEach(row => {\n      new Array(maxColumns - row.children.length).fill(0).forEach(() => {\n        let value;\n\n        if (row.children.head != null) {\n          value = TableCell.formats(row.children.head.domNode);\n        }\n\n        const blot = this.scroll.create(TableCell.blotName, value);\n        row.appendChild(blot);\n        blot.optimize(); // Add break blot\n      });\n    });\n  }\n\n  cells(column) {\n    return this.rows().map(row => row.children.at(column));\n  }\n\n  deleteColumn(index) {\n    const [body] = this.descendant(TableBody);\n    if (body == null || body.children.head == null) return;\n    body.children.forEach(row => {\n      const cell = row.children.at(index);\n\n      if (cell != null) {\n        cell.remove();\n      }\n    });\n  }\n\n  insertColumn(index) {\n    const [body] = this.descendant(TableBody);\n    if (body == null || body.children.head == null) return;\n    body.children.forEach(row => {\n      const ref = row.children.at(index);\n      const value = TableCell.formats(row.children.head.domNode);\n      const cell = this.scroll.create(TableCell.blotName, value);\n      row.insertBefore(cell, ref);\n    });\n  }\n\n  insertRow(index) {\n    const [body] = this.descendant(TableBody);\n    if (body == null || body.children.head == null) return;\n    const id = tableId();\n    const row = this.scroll.create(TableRow.blotName);\n    body.children.head.children.forEach(() => {\n      const cell = this.scroll.create(TableCell.blotName, id);\n      row.appendChild(cell);\n    });\n    const ref = body.children.at(index);\n    body.insertBefore(row, ref);\n  }\n\n  rows() {\n    const body = this.children.head;\n    if (body == null) return [];\n    return body.children.map(row => row);\n  }\n\n}\n\nTableContainer.blotName = 'table-container';\nTableContainer.tagName = 'TABLE';\nTableContainer.allowedChildren = [TableBody];\nTableBody.requiredContainer = TableContainer;\nTableBody.allowedChildren = [TableRow];\nTableRow.requiredContainer = TableBody;\nTableRow.allowedChildren = [TableCell];\nTableCell.requiredContainer = TableRow;\n\nfunction tableId() {\n  const id = Math.random().toString(36).slice(2, 6);\n  return \"row-\".concat(id);\n}\n\n\n\n//# sourceURL=webpack://Quill/./formats/table.js?");

	/***/ }),

	/***/ "./formats/underline.js":
	/*!******************************!*\
	  !*** ./formats/underline.js ***!
	  \******************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _blots_inline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../blots/inline */ \"./blots/inline.js\");\n\n\nclass Underline extends _blots_inline__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {}\n\nUnderline.blotName = 'underline';\nUnderline.tagName = 'U';\n/* harmony default export */ __webpack_exports__[\"default\"] = (Underline);\n\n//# sourceURL=webpack://Quill/./formats/underline.js?");

	/***/ }),

	/***/ "./formats/video.js":
	/*!**************************!*\
	  !*** ./formats/video.js ***!
	  \**************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../blots/block */ \"./blots/block.js\");\n/* harmony import */ var _link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./link */ \"./formats/link.js\");\n\n\nconst ATTRIBUTES = ['height', 'width'];\n\nclass Video extends _blots_block__WEBPACK_IMPORTED_MODULE_0__[\"BlockEmbed\"] {\n  static create(value) {\n    const node = super.create(value);\n    node.setAttribute('frameborder', '0');\n    node.setAttribute('allowfullscreen', true);\n    node.setAttribute('src', this.sanitize(value));\n    return node;\n  }\n\n  static formats(domNode) {\n    return ATTRIBUTES.reduce((formats, attribute) => {\n      if (domNode.hasAttribute(attribute)) {\n        formats[attribute] = domNode.getAttribute(attribute);\n      }\n\n      return formats;\n    }, {});\n  }\n\n  static sanitize(url) {\n    return _link__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sanitize(url); // eslint-disable-line import/no-named-as-default-member\n  }\n\n  static value(domNode) {\n    return domNode.getAttribute('src');\n  }\n\n  format(name, value) {\n    if (ATTRIBUTES.indexOf(name) > -1) {\n      if (value) {\n        this.domNode.setAttribute(name, value);\n      } else {\n        this.domNode.removeAttribute(name);\n      }\n    } else {\n      super.format(name, value);\n    }\n  }\n\n  html() {\n    const {\n      video\n    } = this.value();\n    return \"<a href=\\\"\".concat(video, \"\\\">\").concat(video, \"</a>\");\n  }\n\n}\n\nVideo.blotName = 'video';\nVideo.className = 'ql-video';\nVideo.tagName = 'IFRAME';\n/* harmony default export */ __webpack_exports__[\"default\"] = (Video);\n\n//# sourceURL=webpack://Quill/./formats/video.js?");

	/***/ }),

	/***/ "./modules/clipboard.js":
	/*!******************************!*\
	  !*** ./modules/clipboard.js ***!
	  \******************************/
	/*! exports provided: default, matchAttributor, matchBlot, matchNewline, matchText, traverse */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Clipboard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"matchAttributor\", function() { return matchAttributor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"matchBlot\", function() { return matchBlot; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"matchNewline\", function() { return matchNewline; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"matchText\", function() { return matchText; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"traverse\", function() { return traverse; });\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! extend */ \"./node_modules/extend/index.js\");\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(extend__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quill-delta */ \"./node_modules/quill-delta/dist/Delta.js\");\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../blots/block */ \"./blots/block.js\");\n/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/quill */ \"./core/quill.js\");\n/* harmony import */ var _core_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/logger */ \"./core/logger.js\");\n/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/module */ \"./core/module.js\");\n/* harmony import */ var _formats_align__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../formats/align */ \"./formats/align.js\");\n/* harmony import */ var _formats_background__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../formats/background */ \"./formats/background.js\");\n/* harmony import */ var _formats_code__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../formats/code */ \"./formats/code.js\");\n/* harmony import */ var _formats_color__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../formats/color */ \"./formats/color.js\");\n/* harmony import */ var _formats_direction__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../formats/direction */ \"./formats/direction.js\");\n/* harmony import */ var _formats_font__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../formats/font */ \"./formats/font.js\");\n/* harmony import */ var _formats_size__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../formats/size */ \"./formats/size.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst debug = Object(_core_logger__WEBPACK_IMPORTED_MODULE_5__[\"default\"])('quill:clipboard');\nconst CLIPBOARD_CONFIG = [[Node.TEXT_NODE, matchText], [Node.TEXT_NODE, matchNewline], ['br', matchBreak], [Node.ELEMENT_NODE, matchNewline], [Node.ELEMENT_NODE, matchBlot], [Node.ELEMENT_NODE, matchAttributor], [Node.ELEMENT_NODE, matchStyles], ['li', matchIndent], ['ol, ul', matchList], ['pre', matchCodeBlock], ['tr', matchTable], ['b', matchAlias.bind(matchAlias, 'bold')], ['i', matchAlias.bind(matchAlias, 'italic')], ['strike', matchAlias.bind(matchAlias, 'strike')], ['style', matchIgnore]];\nconst ATTRIBUTE_ATTRIBUTORS = [_formats_align__WEBPACK_IMPORTED_MODULE_7__[\"AlignAttribute\"], _formats_direction__WEBPACK_IMPORTED_MODULE_11__[\"DirectionAttribute\"]].reduce((memo, attr) => {\n  memo[attr.keyName] = attr;\n  return memo;\n}, {});\nconst STYLE_ATTRIBUTORS = [_formats_align__WEBPACK_IMPORTED_MODULE_7__[\"AlignStyle\"], _formats_background__WEBPACK_IMPORTED_MODULE_8__[\"BackgroundStyle\"], _formats_color__WEBPACK_IMPORTED_MODULE_10__[\"ColorStyle\"], _formats_direction__WEBPACK_IMPORTED_MODULE_11__[\"DirectionStyle\"], _formats_font__WEBPACK_IMPORTED_MODULE_12__[\"FontStyle\"], _formats_size__WEBPACK_IMPORTED_MODULE_13__[\"SizeStyle\"]].reduce((memo, attr) => {\n  memo[attr.keyName] = attr;\n  return memo;\n}, {});\n\nclass Clipboard extends _core_module__WEBPACK_IMPORTED_MODULE_6__[\"default\"] {\n  constructor(quill, options) {\n    super(quill, options);\n    this.quill.root.addEventListener('copy', e => this.onCaptureCopy(e, false));\n    this.quill.root.addEventListener('cut', e => this.onCaptureCopy(e, true));\n    this.quill.root.addEventListener('paste', this.onCapturePaste.bind(this));\n    this.matchers = [];\n    CLIPBOARD_CONFIG.concat(this.options.matchers).forEach(([selector, matcher]) => {\n      this.addMatcher(selector, matcher);\n    });\n  }\n\n  addMatcher(selector, matcher) {\n    this.matchers.push([selector, matcher]);\n  }\n\n  convert({\n    html,\n    text\n  }, formats = {}) {\n    if (formats[_formats_code__WEBPACK_IMPORTED_MODULE_9__[\"default\"].blotName]) {\n      return new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a().insert(text, {\n        [_formats_code__WEBPACK_IMPORTED_MODULE_9__[\"default\"].blotName]: formats[_formats_code__WEBPACK_IMPORTED_MODULE_9__[\"default\"].blotName]\n      });\n    }\n\n    if (!html) {\n      return new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a().insert(text || '');\n    }\n\n    const doc = new DOMParser().parseFromString(html, 'text/html');\n    const container = doc.body;\n    const nodeMatches = new WeakMap();\n    const [elementMatchers, textMatchers] = this.prepareMatching(container, nodeMatches);\n    const delta = traverse(this.quill.scroll, container, elementMatchers, textMatchers, nodeMatches); // Remove trailing newline\n\n    if (deltaEndsWith(delta, '\\n') && (delta.ops[delta.ops.length - 1].attributes == null || formats.table)) {\n      return delta.compose(new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a().retain(delta.length() - 1).delete(1));\n    }\n\n    return delta;\n  }\n\n  dangerouslyPasteHTML(index, html, source = _core_quill__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.API) {\n    if (typeof index === 'string') {\n      const delta = this.convert({\n        html: index,\n        text: ''\n      });\n      this.quill.setContents(delta, html);\n      this.quill.setSelection(0, _core_quill__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.SILENT);\n    } else {\n      const paste = this.convert({\n        html,\n        text: ''\n      });\n      this.quill.updateContents(new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a().retain(index).concat(paste), source);\n      this.quill.setSelection(index + paste.length(), _core_quill__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.SILENT);\n    }\n  }\n\n  onCaptureCopy(e, isCut = false) {\n    if (e.defaultPrevented) return;\n    e.preventDefault();\n    const [range] = this.quill.selection.getRange();\n    if (range == null) return;\n    const {\n      html,\n      text\n    } = this.onCopy(range, isCut);\n    e.clipboardData.setData('text/plain', text);\n    e.clipboardData.setData('text/html', html);\n\n    if (isCut) {\n      this.quill.deleteText(range, _core_quill__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.USER);\n    }\n  }\n\n  onCapturePaste(e) {\n    if (e.defaultPrevented || !this.quill.isEnabled()) return;\n    e.preventDefault();\n    const range = this.quill.getSelection(true);\n    if (range == null) return;\n    const html = e.clipboardData.getData('text/html');\n    const text = e.clipboardData.getData('text/plain');\n    const files = Array.from(e.clipboardData.files || []);\n\n    if (!html && files.length > 0) {\n      this.quill.uploader.upload(range, files);\n    } else {\n      this.onPaste(range, {\n        html,\n        text\n      });\n    }\n  }\n\n  onCopy(range) {\n    const text = this.quill.getText(range);\n    const html = this.quill.getSemanticHTML(range);\n    return {\n      html,\n      text\n    };\n  }\n\n  onPaste(range, {\n    text,\n    html\n  }) {\n    const formats = this.quill.getFormat(range.index);\n    const pastedDelta = this.convert({\n      text,\n      html\n    }, formats);\n    debug.log('onPaste', pastedDelta, {\n      text,\n      html\n    });\n    const delta = new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a().retain(range.index).delete(range.length).concat(pastedDelta);\n    this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.USER); // range.length contributes to delta.length()\n\n    this.quill.setSelection(delta.length() - range.length, _core_quill__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sources.SILENT);\n    this.quill.scrollIntoView();\n  }\n\n  prepareMatching(container, nodeMatches) {\n    const elementMatchers = [];\n    const textMatchers = [];\n    this.matchers.forEach(pair => {\n      const [selector, matcher] = pair;\n\n      switch (selector) {\n        case Node.TEXT_NODE:\n          textMatchers.push(matcher);\n          break;\n\n        case Node.ELEMENT_NODE:\n          elementMatchers.push(matcher);\n          break;\n\n        default:\n          Array.from(container.querySelectorAll(selector)).forEach(node => {\n            if (nodeMatches.has(node)) {\n              const matches = nodeMatches.get(node);\n              matches.push(matcher);\n            } else {\n              nodeMatches.set(node, [matcher]);\n            }\n          });\n          break;\n      }\n    });\n    return [elementMatchers, textMatchers];\n  }\n\n}\n\nClipboard.DEFAULTS = {\n  matchers: []\n};\n\nfunction applyFormat(delta, format, value) {\n  if (typeof format === 'object') {\n    return Object.keys(format).reduce((newDelta, key) => {\n      return applyFormat(newDelta, key, format[key]);\n    }, delta);\n  }\n\n  return delta.reduce((newDelta, op) => {\n    if (op.attributes && op.attributes[format]) {\n      return newDelta.push(op);\n    }\n\n    return newDelta.insert(op.insert, extend__WEBPACK_IMPORTED_MODULE_0___default()({}, {\n      [format]: value\n    }, op.attributes));\n  }, new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a());\n}\n\nfunction deltaEndsWith(delta, text) {\n  let endText = '';\n\n  for (let i = delta.ops.length - 1; i >= 0 && endText.length < text.length; --i // eslint-disable-line no-plusplus\n  ) {\n    const op = delta.ops[i];\n    if (typeof op.insert !== 'string') break;\n    endText = op.insert + endText;\n  }\n\n  return endText.slice(-1 * text.length) === text;\n}\n\nfunction isLine(node) {\n  if (node.childNodes.length === 0) return false; // Exclude embed blocks\n\n  return ['address', 'article', 'blockquote', 'canvas', 'dd', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'iframe', 'li', 'main', 'nav', 'ol', 'output', 'p', 'pre', 'section', 'table', 'td', 'tr', 'ul', 'video'].includes(node.tagName.toLowerCase());\n}\n\nconst preNodes = new WeakMap();\n\nfunction isPre(node) {\n  if (node == null) return false;\n\n  if (!preNodes.has(node)) {\n    if (node.tagName === 'PRE') {\n      preNodes.set(node, true);\n    } else {\n      preNodes.set(node, isPre(node.parentNode));\n    }\n  }\n\n  return preNodes.get(node);\n}\n\nfunction traverse(scroll, node, elementMatchers, textMatchers, nodeMatches) {\n  // Post-order\n  if (node.nodeType === node.TEXT_NODE) {\n    return textMatchers.reduce((delta, matcher) => {\n      return matcher(node, delta, scroll);\n    }, new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a());\n  }\n\n  if (node.nodeType === node.ELEMENT_NODE) {\n    return Array.from(node.childNodes || []).reduce((delta, childNode) => {\n      let childrenDelta = traverse(scroll, childNode, elementMatchers, textMatchers, nodeMatches);\n\n      if (childNode.nodeType === node.ELEMENT_NODE) {\n        childrenDelta = elementMatchers.reduce((reducedDelta, matcher) => {\n          return matcher(childNode, reducedDelta, scroll);\n        }, childrenDelta);\n        childrenDelta = (nodeMatches.get(childNode) || []).reduce((reducedDelta, matcher) => {\n          return matcher(childNode, reducedDelta, scroll);\n        }, childrenDelta);\n      }\n\n      return delta.concat(childrenDelta);\n    }, new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a());\n  }\n\n  return new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a();\n}\n\nfunction matchAlias(format, node, delta) {\n  return applyFormat(delta, format, true);\n}\n\nfunction matchAttributor(node, delta, scroll) {\n  const attributes = parchment__WEBPACK_IMPORTED_MODULE_2__[\"Attributor\"].keys(node);\n  const classes = parchment__WEBPACK_IMPORTED_MODULE_2__[\"ClassAttributor\"].keys(node);\n  const styles = parchment__WEBPACK_IMPORTED_MODULE_2__[\"StyleAttributor\"].keys(node);\n  const formats = {};\n  attributes.concat(classes).concat(styles).forEach(name => {\n    let attr = scroll.query(name, parchment__WEBPACK_IMPORTED_MODULE_2__[\"Scope\"].ATTRIBUTE);\n\n    if (attr != null) {\n      formats[attr.attrName] = attr.value(node);\n      if (formats[attr.attrName]) return;\n    }\n\n    attr = ATTRIBUTE_ATTRIBUTORS[name];\n\n    if (attr != null && (attr.attrName === name || attr.keyName === name)) {\n      formats[attr.attrName] = attr.value(node) || undefined;\n    }\n\n    attr = STYLE_ATTRIBUTORS[name];\n\n    if (attr != null && (attr.attrName === name || attr.keyName === name)) {\n      attr = STYLE_ATTRIBUTORS[name];\n      formats[attr.attrName] = attr.value(node) || undefined;\n    }\n  });\n\n  if (Object.keys(formats).length > 0) {\n    return applyFormat(delta, formats);\n  }\n\n  return delta;\n}\n\nfunction matchBlot(node, delta, scroll) {\n  const match = scroll.query(node);\n  if (match == null) return delta;\n\n  if (match.prototype instanceof parchment__WEBPACK_IMPORTED_MODULE_2__[\"EmbedBlot\"]) {\n    const embed = {};\n    const value = match.value(node);\n\n    if (value != null) {\n      embed[match.blotName] = value;\n      return new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a().insert(embed, match.formats(node, scroll));\n    }\n  } else {\n    if (match.prototype instanceof parchment__WEBPACK_IMPORTED_MODULE_2__[\"BlockBlot\"] && !deltaEndsWith(delta, '\\n')) {\n      delta.insert('\\n');\n    }\n\n    if (typeof match.formats === 'function') {\n      return applyFormat(delta, match.blotName, match.formats(node, scroll));\n    }\n  }\n\n  return delta;\n}\n\nfunction matchBreak(node, delta) {\n  if (!deltaEndsWith(delta, '\\n')) {\n    delta.insert('\\n');\n  }\n\n  return delta;\n}\n\nfunction matchCodeBlock(node, delta, scroll) {\n  const match = scroll.query('code-block');\n  const language = match ? match.formats(node, scroll) : true;\n  return applyFormat(delta, 'code-block', language);\n}\n\nfunction matchIgnore() {\n  return new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a();\n}\n\nfunction matchIndent(node, delta, scroll) {\n  const match = scroll.query(node);\n\n  if (match == null || match.blotName !== 'list' || !deltaEndsWith(delta, '\\n')) {\n    return delta;\n  }\n\n  let indent = -1;\n  let parent = node.parentNode;\n\n  while (parent != null) {\n    if (['OL', 'UL'].includes(parent.tagName)) {\n      indent += 1;\n    }\n\n    parent = parent.parentNode;\n  }\n\n  if (indent <= 0) return delta;\n  return delta.reduce((composed, op) => {\n    if (op.attributes && op.attributes.list) {\n      return composed.push(op);\n    }\n\n    return composed.insert(op.insert, {\n      indent,\n      ...(op.attributes || {})\n    });\n  }, new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a());\n}\n\nfunction matchList(node, delta) {\n  const list = node.tagName === 'OL' ? 'ordered' : 'bullet';\n  return applyFormat(delta, 'list', list);\n}\n\nfunction matchNewline(node, delta, scroll) {\n  if (!deltaEndsWith(delta, '\\n')) {\n    if (isLine(node)) {\n      return delta.insert('\\n');\n    }\n\n    if (delta.length() > 0 && node.nextSibling) {\n      let {\n        nextSibling\n      } = node;\n\n      while (nextSibling != null) {\n        if (isLine(nextSibling)) {\n          return delta.insert('\\n');\n        }\n\n        const match = scroll.query(nextSibling);\n\n        if (match && match.prototype instanceof _blots_block__WEBPACK_IMPORTED_MODULE_3__[\"BlockEmbed\"]) {\n          return delta.insert('\\n');\n        }\n\n        nextSibling = nextSibling.firstChild;\n      }\n    }\n  }\n\n  return delta;\n}\n\nfunction matchStyles(node, delta) {\n  const formats = {};\n  const style = node.style || {};\n\n  if (style.fontStyle === 'italic') {\n    formats.italic = true;\n  }\n\n  if (style.textDecoration === 'underline') {\n    formats.underline = true;\n  }\n\n  if (style.textDecoration === 'line-through') {\n    formats.strike = true;\n  }\n\n  if (style.fontWeight.startsWith('bold') || parseInt(style.fontWeight, 10) >= 700) {\n    formats.bold = true;\n  }\n\n  if (Object.keys(formats).length > 0) {\n    delta = applyFormat(delta, formats);\n  }\n\n  if (parseFloat(style.textIndent || 0) > 0) {\n    // Could be 0.5in\n    return new quill_delta__WEBPACK_IMPORTED_MODULE_1___default.a().insert('\\t').concat(delta);\n  }\n\n  return delta;\n}\n\nfunction matchTable(node, delta) {\n  const table = node.parentNode.tagName === 'TABLE' ? node.parentNode : node.parentNode.parentNode;\n  const rows = Array.from(table.querySelectorAll('tr'));\n  const row = rows.indexOf(node) + 1;\n  return applyFormat(delta, 'table', row);\n}\n\nfunction matchText(node, delta) {\n  let text = node.data; // Word represents empty line with <o:p>&nbsp;</o:p>\n\n  if (node.parentNode.tagName === 'O:P') {\n    return delta.insert(text.trim());\n  }\n\n  if (text.trim().length === 0 && text.includes('\\n')) {\n    return delta;\n  }\n\n  if (!isPre(node)) {\n    const replacer = (collapse, match) => {\n      const replaced = match.replace(/[^\\u00a0]/g, ''); // \\u00a0 is nbsp;\n\n      return replaced.length < 1 && collapse ? ' ' : replaced;\n    };\n\n    text = text.replace(/\\r\\n/g, ' ').replace(/\\n/g, ' ');\n    text = text.replace(/\\s\\s+/g, replacer.bind(replacer, true)); // collapse whitespace\n\n    if (node.previousSibling == null && isLine(node.parentNode) || node.previousSibling != null && isLine(node.previousSibling)) {\n      text = text.replace(/^\\s+/, replacer.bind(replacer, false));\n    }\n\n    if (node.nextSibling == null && isLine(node.parentNode) || node.nextSibling != null && isLine(node.nextSibling)) {\n      text = text.replace(/\\s+$/, replacer.bind(replacer, false));\n    }\n  }\n\n  return delta.insert(text);\n}\n\n\n\n//# sourceURL=webpack://Quill/./modules/clipboard.js?");

	/***/ }),

	/***/ "./modules/history.js":
	/*!****************************!*\
	  !*** ./modules/history.js ***!
	  \****************************/
	/*! exports provided: default, getLastChangeIndex */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return History; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLastChangeIndex\", function() { return getLastChangeIndex; });\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/quill */ \"./core/quill.js\");\n/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/module */ \"./core/module.js\");\n\n\n\n\nclass History extends _core_module__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\n  constructor(quill, options) {\n    super(quill, options);\n    this.lastRecorded = 0;\n    this.ignoreChange = false;\n    this.clear();\n    this.quill.on(_core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.EDITOR_CHANGE, (eventName, delta, oldDelta, source) => {\n      if (eventName !== _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.TEXT_CHANGE || this.ignoreChange) return;\n\n      if (!this.options.userOnly || source === _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER) {\n        this.record(delta, oldDelta);\n      } else {\n        this.transform(delta);\n      }\n    });\n    this.quill.keyboard.addBinding({\n      key: 'z',\n      shortKey: true\n    }, this.undo.bind(this));\n    this.quill.keyboard.addBinding({\n      key: 'z',\n      shortKey: true,\n      shiftKey: true\n    }, this.redo.bind(this));\n\n    if (/Win/i.test(navigator.platform)) {\n      this.quill.keyboard.addBinding({\n        key: 'y',\n        shortKey: true\n      }, this.redo.bind(this));\n    }\n  }\n\n  change(source, dest) {\n    if (this.stack[source].length === 0) return;\n    const delta = this.stack[source].pop();\n    const base = this.quill.getContents();\n    const inverseDelta = delta.invert(base);\n    this.stack[dest].push(inverseDelta);\n    this.lastRecorded = 0;\n    this.ignoreChange = true;\n    this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n    this.ignoreChange = false;\n    const index = getLastChangeIndex(this.quill.scroll, delta);\n    this.quill.setSelection(index);\n  }\n\n  clear() {\n    this.stack = {\n      undo: [],\n      redo: []\n    };\n  }\n\n  cutoff() {\n    this.lastRecorded = 0;\n  }\n\n  record(changeDelta, oldDelta) {\n    if (changeDelta.ops.length === 0) return;\n    this.stack.redo = [];\n    let undoDelta = changeDelta.invert(oldDelta);\n    const timestamp = Date.now();\n\n    if (this.lastRecorded + this.options.delay > timestamp && this.stack.undo.length > 0) {\n      const delta = this.stack.undo.pop();\n      undoDelta = undoDelta.compose(delta);\n    } else {\n      this.lastRecorded = timestamp;\n    }\n\n    if (undoDelta.length() === 0) return;\n    this.stack.undo.push(undoDelta);\n\n    if (this.stack.undo.length > this.options.maxStack) {\n      this.stack.undo.shift();\n    }\n  }\n\n  redo() {\n    this.change('redo', 'undo');\n  }\n\n  transform(delta) {\n    transformStack(this.stack.undo, delta);\n    transformStack(this.stack.redo, delta);\n  }\n\n  undo() {\n    this.change('undo', 'redo');\n  }\n\n}\n\nHistory.DEFAULTS = {\n  delay: 1000,\n  maxStack: 100,\n  userOnly: false\n};\n\nfunction transformStack(stack, delta) {\n  let remoteDelta = delta;\n\n  for (let i = stack.length - 1; i >= 0; i -= 1) {\n    const oldDelta = stack[i];\n    stack[i] = remoteDelta.transform(oldDelta, true);\n    remoteDelta = oldDelta.transform(remoteDelta);\n\n    if (stack[i].length() === 0) {\n      stack.splice(i, 1);\n    }\n  }\n}\n\nfunction endsWithNewlineChange(scroll, delta) {\n  const lastOp = delta.ops[delta.ops.length - 1];\n  if (lastOp == null) return false;\n\n  if (lastOp.insert != null) {\n    return typeof lastOp.insert === 'string' && lastOp.insert.endsWith('\\n');\n  }\n\n  if (lastOp.attributes != null) {\n    return Object.keys(lastOp.attributes).some(attr => {\n      return scroll.query(attr, parchment__WEBPACK_IMPORTED_MODULE_0__[\"Scope\"].BLOCK) != null;\n    });\n  }\n\n  return false;\n}\n\nfunction getLastChangeIndex(scroll, delta) {\n  const deleteLength = delta.reduce((length, op) => {\n    return length + (op.delete || 0);\n  }, 0);\n  let changeIndex = delta.length() - deleteLength;\n\n  if (endsWithNewlineChange(scroll, delta)) {\n    changeIndex -= 1;\n  }\n\n  return changeIndex;\n}\n\n\n\n//# sourceURL=webpack://Quill/./modules/history.js?");

	/***/ }),

	/***/ "./modules/keyboard.js":
	/*!*****************************!*\
	  !*** ./modules/keyboard.js ***!
	  \*****************************/
	/*! exports provided: default, SHORTKEY, normalize */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Keyboard; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SHORTKEY\", function() { return SHORTKEY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"normalize\", function() { return normalize; });\n/* harmony import */ var clone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clone */ \"./node_modules/clone/clone.js\");\n/* harmony import */ var clone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clone__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! deep-equal */ \"./node_modules/deep-equal/index.js\");\n/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(deep_equal__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! extend */ \"./node_modules/extend/index.js\");\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(extend__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! quill-delta */ \"./node_modules/quill-delta/dist/Delta.js\");\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/quill */ \"./core/quill.js\");\n/* harmony import */ var _core_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/logger */ \"./core/logger.js\");\n/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/module */ \"./core/module.js\");\n\n\n\n\n\n\n\n\nconst debug = Object(_core_logger__WEBPACK_IMPORTED_MODULE_6__[\"default\"])('quill:keyboard');\nconst SHORTKEY = /Mac/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';\n\nclass Keyboard extends _core_module__WEBPACK_IMPORTED_MODULE_7__[\"default\"] {\n  static match(evt, binding) {\n    if (['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].some(key => {\n      return !!binding[key] !== evt[key] && binding[key] !== null;\n    })) {\n      return false;\n    }\n\n    return binding.key === evt.key || binding.key === evt.which;\n  }\n\n  constructor(quill, options) {\n    super(quill, options);\n    this.bindings = {};\n    Object.keys(this.options.bindings).forEach(name => {\n      if (this.options.bindings[name]) {\n        this.addBinding(this.options.bindings[name]);\n      }\n    });\n    this.addBinding({\n      key: 'Enter',\n      shiftKey: null\n    }, this.handleEnter);\n    this.addBinding({\n      key: 'Enter',\n      metaKey: null,\n      ctrlKey: null,\n      altKey: null\n    }, () => {});\n\n    if (/Firefox/i.test(navigator.userAgent)) {\n      // Need to handle delete and backspace for Firefox in the general case #1171\n      this.addBinding({\n        key: 'Backspace'\n      }, {\n        collapsed: true\n      }, this.handleBackspace);\n      this.addBinding({\n        key: 'Delete'\n      }, {\n        collapsed: true\n      }, this.handleDelete);\n    } else {\n      this.addBinding({\n        key: 'Backspace'\n      }, {\n        collapsed: true,\n        prefix: /^.?$/\n      }, this.handleBackspace);\n      this.addBinding({\n        key: 'Delete'\n      }, {\n        collapsed: true,\n        suffix: /^.?$/\n      }, this.handleDelete);\n    }\n\n    this.addBinding({\n      key: 'Backspace'\n    }, {\n      collapsed: false\n    }, this.handleDeleteRange);\n    this.addBinding({\n      key: 'Delete'\n    }, {\n      collapsed: false\n    }, this.handleDeleteRange);\n    this.addBinding({\n      key: 'Backspace',\n      altKey: null,\n      ctrlKey: null,\n      metaKey: null,\n      shiftKey: null\n    }, {\n      collapsed: true,\n      offset: 0\n    }, this.handleBackspace);\n    this.listen();\n  }\n\n  addBinding(keyBinding, context = {}, handler = {}) {\n    const binding = normalize(keyBinding);\n\n    if (binding == null) {\n      debug.warn('Attempted to add invalid keyboard binding', binding);\n      return;\n    }\n\n    if (typeof context === 'function') {\n      context = {\n        handler: context\n      };\n    }\n\n    if (typeof handler === 'function') {\n      handler = {\n        handler\n      };\n    }\n\n    const keys = Array.isArray(binding.key) ? binding.key : [binding.key];\n    keys.forEach(key => {\n      const singleBinding = extend__WEBPACK_IMPORTED_MODULE_2___default()({}, binding, {\n        key\n      }, context, handler);\n      this.bindings[singleBinding.key] = this.bindings[singleBinding.key] || [];\n      this.bindings[singleBinding.key].push(singleBinding);\n    });\n  }\n\n  listen() {\n    this.quill.root.addEventListener('keydown', evt => {\n      if (evt.defaultPrevented || evt.isComposing) return;\n      const bindings = (this.bindings[evt.key] || []).concat(this.bindings[evt.which] || []);\n      const matches = bindings.filter(binding => Keyboard.match(evt, binding));\n      if (matches.length === 0) return;\n      const range = this.quill.getSelection();\n      if (range == null || !this.quill.hasFocus()) return;\n      const [line, offset] = this.quill.getLine(range.index);\n      const [leafStart, offsetStart] = this.quill.getLeaf(range.index);\n      const [leafEnd, offsetEnd] = range.length === 0 ? [leafStart, offsetStart] : this.quill.getLeaf(range.index + range.length);\n      const prefixText = leafStart instanceof parchment__WEBPACK_IMPORTED_MODULE_4__[\"TextBlot\"] ? leafStart.value().slice(0, offsetStart) : '';\n      const suffixText = leafEnd instanceof parchment__WEBPACK_IMPORTED_MODULE_4__[\"TextBlot\"] ? leafEnd.value().slice(offsetEnd) : '';\n      const curContext = {\n        collapsed: range.length === 0,\n        empty: range.length === 0 && line.length() <= 1,\n        format: this.quill.getFormat(range),\n        line,\n        offset,\n        prefix: prefixText,\n        suffix: suffixText,\n        event: evt\n      };\n      const prevented = matches.some(binding => {\n        if (binding.collapsed != null && binding.collapsed !== curContext.collapsed) {\n          return false;\n        }\n\n        if (binding.empty != null && binding.empty !== curContext.empty) {\n          return false;\n        }\n\n        if (binding.offset != null && binding.offset !== curContext.offset) {\n          return false;\n        }\n\n        if (Array.isArray(binding.format)) {\n          // any format is present\n          if (binding.format.every(name => curContext.format[name] == null)) {\n            return false;\n          }\n        } else if (typeof binding.format === 'object') {\n          // all formats must match\n          if (!Object.keys(binding.format).every(name => {\n            if (binding.format[name] === true) return curContext.format[name] != null;\n            if (binding.format[name] === false) return curContext.format[name] == null;\n            return deep_equal__WEBPACK_IMPORTED_MODULE_1___default()(binding.format[name], curContext.format[name]);\n          })) {\n            return false;\n          }\n        }\n\n        if (binding.prefix != null && !binding.prefix.test(curContext.prefix)) {\n          return false;\n        }\n\n        if (binding.suffix != null && !binding.suffix.test(curContext.suffix)) {\n          return false;\n        }\n\n        return binding.handler.call(this, range, curContext, binding) !== true;\n      });\n\n      if (prevented) {\n        evt.preventDefault();\n      }\n    });\n  }\n\n  handleBackspace(range, context) {\n    // Check for astral symbols\n    const length = /[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]$/.test(context.prefix) ? 2 : 1;\n    if (range.index === 0 || this.quill.getLength() <= 1) return;\n    let formats = {};\n    const [line] = this.quill.getLine(range.index);\n    let delta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(range.index - length).delete(length);\n\n    if (context.offset === 0) {\n      // Always deleting newline here, length always 1\n      const [prev] = this.quill.getLine(range.index - 1);\n\n      if (prev) {\n        const curFormats = line.formats();\n        const prevFormats = this.quill.getFormat(range.index - 1, 1);\n        formats = quill_delta__WEBPACK_IMPORTED_MODULE_3__[\"AttributeMap\"].diff(curFormats, prevFormats) || {};\n\n        if (Object.keys(formats).length > 0) {\n          // line.length() - 1 targets \\n in line, another -1 for newline being deleted\n          const formatDelta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(range.index + line.length() - 2).retain(1, formats);\n          delta = delta.compose(formatDelta);\n        }\n      }\n    }\n\n    this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n    this.quill.focus();\n  }\n\n  handleDelete(range, context) {\n    // Check for astral symbols\n    const length = /^[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]/.test(context.suffix) ? 2 : 1;\n    if (range.index >= this.quill.getLength() - length) return;\n    let formats = {};\n    const [line] = this.quill.getLine(range.index);\n    let delta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(range.index).delete(length);\n\n    if (context.offset >= line.length() - 1) {\n      const [next] = this.quill.getLine(range.index + 1);\n\n      if (next) {\n        const curFormats = line.formats();\n        const nextFormats = this.quill.getFormat(range.index, 1);\n        formats = quill_delta__WEBPACK_IMPORTED_MODULE_3__[\"AttributeMap\"].diff(curFormats, nextFormats) || {};\n\n        if (Object.keys(formats).length > 0) {\n          delta = delta.retain(next.length() - 1).retain(1, formats);\n        }\n      }\n    }\n\n    this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n    this.quill.focus();\n  }\n\n  handleDeleteRange(range) {\n    const lines = this.quill.getLines(range);\n    let formats = {};\n\n    if (lines.length > 1) {\n      const firstFormats = lines[0].formats();\n      const lastFormats = lines[lines.length - 1].formats();\n      formats = quill_delta__WEBPACK_IMPORTED_MODULE_3__[\"AttributeMap\"].diff(lastFormats, firstFormats) || {};\n    }\n\n    this.quill.deleteText(range, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n\n    if (Object.keys(formats).length > 0) {\n      this.quill.formatLine(range.index, 1, formats, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n    }\n\n    this.quill.setSelection(range.index, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.SILENT);\n    this.quill.focus();\n  }\n\n  handleEnter(range, context) {\n    const lineFormats = Object.keys(context.format).reduce((formats, format) => {\n      if (this.quill.scroll.query(format, parchment__WEBPACK_IMPORTED_MODULE_4__[\"Scope\"].BLOCK) && !Array.isArray(context.format[format])) {\n        formats[format] = context.format[format];\n      }\n\n      return formats;\n    }, {});\n    const delta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(range.index).delete(range.length).insert('\\n', lineFormats);\n    this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n    this.quill.setSelection(range.index + 1, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.SILENT);\n    this.quill.focus();\n    Object.keys(context.format).forEach(name => {\n      if (lineFormats[name] != null) return;\n      if (Array.isArray(context.format[name])) return;\n      if (name === 'code' || name === 'link') return;\n      this.quill.format(name, context.format[name], _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n    });\n  }\n\n}\n\nKeyboard.DEFAULTS = {\n  bindings: {\n    bold: makeFormatHandler('bold'),\n    italic: makeFormatHandler('italic'),\n    underline: makeFormatHandler('underline'),\n    indent: {\n      // highlight tab or tab at beginning of list, indent or blockquote\n      key: 'Tab',\n      format: ['blockquote', 'indent', 'list'],\n\n      handler(range, context) {\n        if (context.collapsed && context.offset !== 0) return true;\n        this.quill.format('indent', '+1', _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        return false;\n      }\n\n    },\n    outdent: {\n      key: 'Tab',\n      shiftKey: true,\n      format: ['blockquote', 'indent', 'list'],\n\n      // highlight tab or tab at beginning of list, indent or blockquote\n      handler(range, context) {\n        if (context.collapsed && context.offset !== 0) return true;\n        this.quill.format('indent', '-1', _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        return false;\n      }\n\n    },\n    'outdent backspace': {\n      key: 'Backspace',\n      collapsed: true,\n      shiftKey: null,\n      metaKey: null,\n      ctrlKey: null,\n      altKey: null,\n      format: ['indent', 'list'],\n      offset: 0,\n\n      handler(range, context) {\n        if (context.format.indent != null) {\n          this.quill.format('indent', '-1', _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        } else if (context.format.list != null) {\n          this.quill.format('list', false, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        }\n      }\n\n    },\n    'indent code-block': makeCodeBlockHandler(true),\n    'outdent code-block': makeCodeBlockHandler(false),\n    'remove tab': {\n      key: 'Tab',\n      shiftKey: true,\n      collapsed: true,\n      prefix: /\\t$/,\n\n      handler(range) {\n        this.quill.deleteText(range.index - 1, 1, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n      }\n\n    },\n    tab: {\n      key: 'Tab',\n\n      handler(range, context) {\n        if (context.format.table) return true;\n        this.quill.history.cutoff();\n        const delta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(range.index).delete(range.length).insert('\\t');\n        this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        this.quill.history.cutoff();\n        this.quill.setSelection(range.index + 1, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.SILENT);\n        return false;\n      }\n\n    },\n    'blockquote empty enter': {\n      key: 'Enter',\n      collapsed: true,\n      format: ['blockquote'],\n      empty: true,\n\n      handler() {\n        this.quill.format('blockquote', false, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n      }\n\n    },\n    'list empty enter': {\n      key: 'Enter',\n      collapsed: true,\n      format: ['list'],\n      empty: true,\n\n      handler(range, context) {\n        const formats = {\n          list: false\n        };\n\n        if (context.format.indent) {\n          formats.indent = false;\n        }\n\n        this.quill.formatLine(range.index, range.length, formats, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n      }\n\n    },\n    'checklist enter': {\n      key: 'Enter',\n      collapsed: true,\n      format: {\n        list: 'checked'\n      },\n\n      handler(range) {\n        const [line, offset] = this.quill.getLine(range.index);\n        const formats = extend__WEBPACK_IMPORTED_MODULE_2___default()({}, line.formats(), {\n          list: 'checked'\n        });\n        const delta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(range.index).insert('\\n', formats).retain(line.length() - offset - 1).retain(1, {\n          list: 'unchecked'\n        });\n        this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        this.quill.setSelection(range.index + 1, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.SILENT);\n        this.quill.scrollIntoView();\n      }\n\n    },\n    'header enter': {\n      key: 'Enter',\n      collapsed: true,\n      format: ['header'],\n      suffix: /^$/,\n\n      handler(range, context) {\n        const [line, offset] = this.quill.getLine(range.index);\n        const delta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(range.index).insert('\\n', context.format).retain(line.length() - offset - 1).retain(1, {\n          header: null\n        });\n        this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        this.quill.setSelection(range.index + 1, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.SILENT);\n        this.quill.scrollIntoView();\n      }\n\n    },\n    'table backspace': {\n      key: 'Backspace',\n      format: ['table'],\n      collapsed: true,\n      offset: 0,\n\n      handler() {}\n\n    },\n    'table delete': {\n      key: 'Delete',\n      format: ['table'],\n      collapsed: true,\n      suffix: /^$/,\n\n      handler() {}\n\n    },\n    'table enter': {\n      key: 'Enter',\n      shiftKey: null,\n      format: ['table'],\n\n      handler(range) {\n        const module = this.quill.getModule('table');\n\n        if (module) {\n          const [table, row, cell, offset] = module.getTable(range);\n          const shift = tableSide(table, row, cell, offset);\n          if (shift == null) return;\n          let index = table.offset();\n\n          if (shift < 0) {\n            const delta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(index).insert('\\n');\n            this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n            this.quill.setSelection(range.index + 1, range.length, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.SILENT);\n          } else if (shift > 0) {\n            index += table.length();\n            const delta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(index).insert('\\n');\n            this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n            this.quill.setSelection(index, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n          }\n        }\n      }\n\n    },\n    'table tab': {\n      key: 'Tab',\n      shiftKey: null,\n      format: ['table'],\n\n      handler(range, context) {\n        const {\n          event,\n          line: cell\n        } = context;\n        const offset = cell.offset(this.quill.scroll);\n\n        if (event.shiftKey) {\n          this.quill.setSelection(offset - 1, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        } else {\n          this.quill.setSelection(offset + cell.length(), _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        }\n      }\n\n    },\n    'list autofill': {\n      key: ' ',\n      shiftKey: null,\n      collapsed: true,\n      format: {\n        list: false,\n        'code-block': false,\n        blockquote: false,\n        header: false,\n        table: false\n      },\n      prefix: /^\\s*?(\\d+\\.|-|\\*|\\[ ?\\]|\\[x\\])$/,\n\n      handler(range, context) {\n        if (this.quill.scroll.query('list') == null) return true;\n        const {\n          length\n        } = context.prefix;\n        const [line, offset] = this.quill.getLine(range.index);\n        if (offset > length) return true;\n        let value;\n\n        switch (context.prefix.trim()) {\n          case '[]':\n          case '[ ]':\n            value = 'unchecked';\n            break;\n\n          case '[x]':\n            value = 'checked';\n            break;\n\n          case '-':\n          case '*':\n            value = 'bullet';\n            break;\n\n          default:\n            value = 'ordered';\n        }\n\n        this.quill.insertText(range.index, ' ', _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        this.quill.history.cutoff();\n        const delta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(range.index - offset).delete(length + 1).retain(line.length() - 2 - offset).retain(1, {\n          list: value\n        });\n        this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        this.quill.history.cutoff();\n        this.quill.setSelection(range.index - length, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.SILENT);\n        return false;\n      }\n\n    },\n    'code exit': {\n      key: 'Enter',\n      collapsed: true,\n      format: ['code-block'],\n      prefix: /^$/,\n      suffix: /^\\s*$/,\n\n      handler(range) {\n        const [line, offset] = this.quill.getLine(range.index);\n        let numLines = 2;\n        let cur = line;\n\n        while (cur != null && cur.length() <= 1 && cur.formats()['code-block']) {\n          cur = cur.prev;\n          numLines -= 1; // Requisite prev lines are empty\n\n          if (numLines <= 0) {\n            const delta = new quill_delta__WEBPACK_IMPORTED_MODULE_3___default.a().retain(range.index + line.length() - offset - 2).retain(1, {\n              'code-block': null\n            }).delete(1);\n            this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n            this.quill.setSelection(range.index - 1, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.SILENT);\n            return false;\n          }\n        }\n\n        return true;\n      }\n\n    },\n    'embed left': makeEmbedArrowHandler('ArrowLeft', false),\n    'embed left shift': makeEmbedArrowHandler('ArrowLeft', true),\n    'embed right': makeEmbedArrowHandler('ArrowRight', false),\n    'embed right shift': makeEmbedArrowHandler('ArrowRight', true),\n    'table down': makeTableArrowHandler(false),\n    'table up': makeTableArrowHandler(true)\n  }\n};\n\nfunction makeCodeBlockHandler(indent) {\n  return {\n    key: 'Tab',\n    shiftKey: !indent,\n    format: {\n      'code-block': true\n    },\n\n    handler(range) {\n      const CodeBlock = this.quill.scroll.query('code-block');\n      const lines = range.length === 0 ? this.quill.getLines(range.index, 1) : this.quill.getLines(range);\n      let {\n        index,\n        length\n      } = range;\n      lines.forEach((line, i) => {\n        if (indent) {\n          line.insertAt(0, CodeBlock.TAB);\n\n          if (i === 0) {\n            index += CodeBlock.TAB.length;\n          } else {\n            length += CodeBlock.TAB.length;\n          }\n        } else if (line.domNode.textContent.startsWith(CodeBlock.TAB)) {\n          line.deleteAt(0, CodeBlock.TAB.length);\n\n          if (i === 0) {\n            index -= CodeBlock.TAB.length;\n          } else {\n            length -= CodeBlock.TAB.length;\n          }\n        }\n      });\n      this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n      this.quill.setSelection(index, length, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.SILENT);\n    }\n\n  };\n}\n\nfunction makeEmbedArrowHandler(key, shiftKey) {\n  const where = key === 'ArrowLeft' ? 'prefix' : 'suffix';\n  return {\n    key,\n    shiftKey,\n    altKey: null,\n    [where]: /^$/,\n\n    handler(range) {\n      let {\n        index\n      } = range;\n\n      if (key === 'ArrowRight') {\n        index += range.length + 1;\n      }\n\n      const [leaf] = this.quill.getLeaf(index);\n      if (!(leaf instanceof parchment__WEBPACK_IMPORTED_MODULE_4__[\"EmbedBlot\"])) return true;\n\n      if (key === 'ArrowLeft') {\n        if (shiftKey) {\n          this.quill.setSelection(range.index - 1, range.length + 1, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        } else {\n          this.quill.setSelection(range.index - 1, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        }\n      } else if (shiftKey) {\n        this.quill.setSelection(range.index, range.length + 1, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n      } else {\n        this.quill.setSelection(range.index + range.length + 1, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n      }\n\n      return false;\n    }\n\n  };\n}\n\nfunction makeFormatHandler(format) {\n  return {\n    key: format[0],\n    shortKey: true,\n\n    handler(range, context) {\n      this.quill.format(format, !context.format[format], _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n    }\n\n  };\n}\n\nfunction makeTableArrowHandler(up) {\n  return {\n    key: up ? 'ArrowUp' : 'ArrowDown',\n    collapsed: true,\n    format: ['table'],\n\n    handler(range, context) {\n      // TODO move to table module\n      const key = up ? 'prev' : 'next';\n      const cell = context.line;\n      const targetRow = cell.parent[key];\n\n      if (targetRow != null) {\n        if (targetRow.statics.blotName === 'table-row') {\n          let targetCell = targetRow.children.head;\n          let cur = cell;\n\n          while (cur.prev != null) {\n            cur = cur.prev;\n            targetCell = targetCell.next;\n          }\n\n          const index = targetCell.offset(this.quill.scroll) + Math.min(context.offset, targetCell.length() - 1);\n          this.quill.setSelection(index, 0, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n        }\n      } else {\n        const targetLine = cell.table()[key];\n\n        if (targetLine != null) {\n          if (up) {\n            this.quill.setSelection(targetLine.offset(this.quill.scroll) + targetLine.length() - 1, 0, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n          } else {\n            this.quill.setSelection(targetLine.offset(this.quill.scroll), 0, _core_quill__WEBPACK_IMPORTED_MODULE_5__[\"default\"].sources.USER);\n          }\n        }\n      }\n\n      return false;\n    }\n\n  };\n}\n\nfunction normalize(binding) {\n  if (typeof binding === 'string' || typeof binding === 'number') {\n    binding = {\n      key: binding\n    };\n  } else if (typeof binding === 'object') {\n    binding = clone__WEBPACK_IMPORTED_MODULE_0___default()(binding, false);\n  } else {\n    return null;\n  }\n\n  if (binding.shortKey) {\n    binding[SHORTKEY] = binding.shortKey;\n    delete binding.shortKey;\n  }\n\n  return binding;\n}\n\nfunction tableSide(table, row, cell, offset) {\n  if (row.prev == null && row.next == null) {\n    if (cell.prev == null && cell.next == null) {\n      return offset === 0 ? -1 : 1;\n    }\n\n    return cell.prev == null ? -1 : 1;\n  }\n\n  if (row.prev == null) {\n    return -1;\n  }\n\n  if (row.next == null) {\n    return 1;\n  }\n\n  return null;\n}\n\n\n\n//# sourceURL=webpack://Quill/./modules/keyboard.js?");

	/***/ }),

	/***/ "./modules/syntax.js":
	/*!***************************!*\
	  !*** ./modules/syntax.js ***!
	  \***************************/
	/*! exports provided: CodeBlock, CodeToken, default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CodeBlock\", function() { return SyntaxCodeBlock; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CodeToken\", function() { return CodeToken; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Syntax; });\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill-delta */ \"./node_modules/quill-delta/dist/Delta.js\");\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var _blots_inline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../blots/inline */ \"./blots/inline.js\");\n/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/quill */ \"./core/quill.js\");\n/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/module */ \"./core/module.js\");\n/* harmony import */ var _blots_block__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../blots/block */ \"./blots/block.js\");\n/* harmony import */ var _blots_break__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../blots/break */ \"./blots/break.js\");\n/* harmony import */ var _blots_cursor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../blots/cursor */ \"./blots/cursor.js\");\n/* harmony import */ var _blots_text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../blots/text */ \"./blots/text.js\");\n/* harmony import */ var _formats_code__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../formats/code */ \"./formats/code.js\");\n/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./clipboard */ \"./modules/clipboard.js\");\n\n\n\n\n\n\n\n\n\n\n\nconst TokenAttributor = new parchment__WEBPACK_IMPORTED_MODULE_1__[\"ClassAttributor\"]('code-token', 'hljs', {\n  scope: parchment__WEBPACK_IMPORTED_MODULE_1__[\"Scope\"].INLINE\n});\n\nclass CodeToken extends _blots_inline__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\n  static formats(node, scroll) {\n    while (node != null && node !== scroll.domNode) {\n      if (node.classList && node.classList.contains(_formats_code__WEBPACK_IMPORTED_MODULE_9__[\"default\"].className)) {\n        return super.formats(node, scroll);\n      }\n\n      node = node.parentNode;\n    }\n\n    return undefined;\n  }\n\n  constructor(scroll, domNode, value) {\n    super(scroll, domNode, value);\n    TokenAttributor.add(this.domNode, value);\n  }\n\n  format(format, value) {\n    if (format !== CodeToken.blotName) {\n      super.format(format, value);\n    } else if (value) {\n      TokenAttributor.add(this.domNode, value);\n    } else {\n      TokenAttributor.remove(this.domNode);\n      this.domNode.classList.remove(this.statics.className);\n    }\n  }\n\n  optimize(...args) {\n    super.optimize(...args);\n\n    if (!TokenAttributor.value(this.domNode)) {\n      this.unwrap();\n    }\n  }\n\n}\n\nCodeToken.blotName = 'code-token';\nCodeToken.className = 'ql-token';\n\nclass SyntaxCodeBlock extends _formats_code__WEBPACK_IMPORTED_MODULE_9__[\"default\"] {\n  static create(value) {\n    const domNode = super.create(value);\n\n    if (typeof value === 'string') {\n      domNode.setAttribute('data-language', value);\n    }\n\n    return domNode;\n  }\n\n  static formats(domNode) {\n    return domNode.getAttribute('data-language') || 'plain';\n  }\n\n  static register() {} // Syntax module will register\n\n\n  format(name, value) {\n    if (name === this.statics.blotName && value) {\n      this.domNode.setAttribute('data-language', value);\n    } else {\n      super.format(name, value);\n    }\n  }\n\n  replaceWith(name, value) {\n    this.formatAt(0, this.length(), CodeToken.blotName, false);\n    return super.replaceWith(name, value);\n  }\n\n}\n\nclass SyntaxCodeBlockContainer extends _formats_code__WEBPACK_IMPORTED_MODULE_9__[\"CodeBlockContainer\"] {\n  attach() {\n    super.attach();\n    this.forceNext = false;\n    this.scroll.emitMount(this);\n  }\n\n  format(name, value) {\n    if (name === SyntaxCodeBlock.blotName) {\n      this.forceNext = true;\n      this.children.forEach(child => {\n        child.format(name, value);\n      });\n    }\n  }\n\n  formatAt(index, length, name, value) {\n    if (name === SyntaxCodeBlock.blotName) {\n      this.forceNext = true;\n    }\n\n    super.formatAt(index, length, name, value);\n  }\n\n  highlight(highlight, forced = false) {\n    if (this.children.head == null) return;\n    const nodes = Array.from(this.domNode.childNodes).filter(node => node !== this.uiNode);\n    const text = \"\".concat(nodes.map(node => node.textContent).join('\\n'), \"\\n\");\n    const language = SyntaxCodeBlock.formats(this.children.head.domNode);\n\n    if (forced || this.forceNext || this.cachedText !== text) {\n      if (text.trim().length > 0 || this.cachedText == null) {\n        const oldDelta = this.children.reduce((delta, child) => {\n          return delta.concat(Object(_blots_block__WEBPACK_IMPORTED_MODULE_5__[\"blockDelta\"])(child, false));\n        }, new quill_delta__WEBPACK_IMPORTED_MODULE_0___default.a());\n        const delta = highlight(text, language);\n        oldDelta.diff(delta).reduce((index, {\n          retain,\n          attributes\n        }) => {\n          // Should be all retains\n          if (!retain) return index;\n\n          if (attributes) {\n            Object.keys(attributes).forEach(format => {\n              if ([SyntaxCodeBlock.blotName, CodeToken.blotName].includes(format)) {\n                this.formatAt(index, retain, format, attributes[format]);\n              }\n            });\n          }\n\n          return index + retain;\n        }, 0);\n      }\n\n      this.cachedText = text;\n      this.forceNext = false;\n    }\n  }\n\n  optimize(context) {\n    super.optimize(context);\n\n    if (this.parent != null && this.children.head != null && this.uiNode != null) {\n      const language = SyntaxCodeBlock.formats(this.children.head.domNode);\n\n      if (language !== this.uiNode.value) {\n        this.uiNode.value = language;\n      }\n    }\n  }\n\n}\n\nSyntaxCodeBlockContainer.allowedChildren = [SyntaxCodeBlock];\nSyntaxCodeBlock.requiredContainer = SyntaxCodeBlockContainer;\nSyntaxCodeBlock.allowedChildren = [CodeToken, _blots_cursor__WEBPACK_IMPORTED_MODULE_7__[\"default\"], _blots_text__WEBPACK_IMPORTED_MODULE_8__[\"default\"], _blots_break__WEBPACK_IMPORTED_MODULE_6__[\"default\"]];\n\nclass Syntax extends _core_module__WEBPACK_IMPORTED_MODULE_4__[\"default\"] {\n  static register() {\n    _core_quill__WEBPACK_IMPORTED_MODULE_3__[\"default\"].register(CodeToken, true);\n    _core_quill__WEBPACK_IMPORTED_MODULE_3__[\"default\"].register(SyntaxCodeBlock, true);\n    _core_quill__WEBPACK_IMPORTED_MODULE_3__[\"default\"].register(SyntaxCodeBlockContainer, true);\n  }\n\n  constructor(quill, options) {\n    super(quill, options);\n\n    if (this.options.hljs == null) {\n      throw new Error('Syntax module requires highlight.js. Please include the library on the page before Quill.');\n    }\n\n    this.languages = this.options.languages.reduce((memo, {\n      key\n    }) => {\n      memo[key] = true;\n      return memo;\n    }, {});\n    this.highlightBlot = this.highlightBlot.bind(this);\n    this.initListener();\n    this.initTimer();\n  }\n\n  initListener() {\n    this.quill.on(_core_quill__WEBPACK_IMPORTED_MODULE_3__[\"default\"].events.SCROLL_BLOT_MOUNT, blot => {\n      if (!(blot instanceof SyntaxCodeBlockContainer)) return;\n      const select = this.quill.root.ownerDocument.createElement('select');\n      this.options.languages.forEach(({\n        key,\n        label\n      }) => {\n        const option = select.ownerDocument.createElement('option');\n        option.textContent = label;\n        option.setAttribute('value', key);\n        select.appendChild(option);\n      });\n      select.addEventListener('change', () => {\n        blot.format(SyntaxCodeBlock.blotName, select.value);\n        this.quill.root.focus(); // Prevent scrolling\n\n        this.highlight(blot, true);\n      });\n\n      if (blot.uiNode == null) {\n        blot.attachUI(select);\n\n        if (blot.children.head) {\n          select.value = SyntaxCodeBlock.formats(blot.children.head.domNode);\n        }\n      }\n    });\n  }\n\n  initTimer() {\n    let timer = null;\n    this.quill.on(_core_quill__WEBPACK_IMPORTED_MODULE_3__[\"default\"].events.SCROLL_OPTIMIZE, () => {\n      clearTimeout(timer);\n      timer = setTimeout(() => {\n        this.highlight();\n        timer = null;\n      }, this.options.interval);\n    });\n  }\n\n  highlight(blot = null, force = false) {\n    if (this.quill.selection.composing) return;\n    this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sources.USER);\n    const range = this.quill.getSelection();\n    const blots = blot == null ? this.quill.scroll.descendants(SyntaxCodeBlockContainer) : [blot];\n    blots.forEach(container => {\n      container.highlight(this.highlightBlot, force);\n    });\n    this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sources.SILENT);\n\n    if (range != null) {\n      this.quill.setSelection(range, _core_quill__WEBPACK_IMPORTED_MODULE_3__[\"default\"].sources.SILENT);\n    }\n  }\n\n  highlightBlot(text, language = 'plain') {\n    language = this.languages[language] ? language : 'plain';\n\n    if (language === 'plain') {\n      return Object(_blots_text__WEBPACK_IMPORTED_MODULE_8__[\"escapeText\"])(text).split('\\n').reduce((delta, line, i) => {\n        if (i !== 0) {\n          delta.insert('\\n', {\n            [_formats_code__WEBPACK_IMPORTED_MODULE_9__[\"default\"].blotName]: language\n          });\n        }\n\n        return delta.insert(line);\n      }, new quill_delta__WEBPACK_IMPORTED_MODULE_0___default.a());\n    }\n\n    const container = this.quill.root.ownerDocument.createElement('div');\n    container.classList.add(_formats_code__WEBPACK_IMPORTED_MODULE_9__[\"default\"].className);\n    container.innerHTML = this.options.hljs.highlight(language, text).value;\n    return Object(_clipboard__WEBPACK_IMPORTED_MODULE_10__[\"traverse\"])(this.quill.scroll, container, [(node, delta) => {\n      const value = TokenAttributor.value(node);\n\n      if (value) {\n        return delta.compose(new quill_delta__WEBPACK_IMPORTED_MODULE_0___default.a().retain(delta.length(), {\n          [CodeToken.blotName]: value\n        }));\n      }\n\n      return delta;\n    }], [(node, delta) => {\n      return node.data.split('\\n').reduce((memo, nodeText, i) => {\n        if (i !== 0) memo.insert('\\n', {\n          [_formats_code__WEBPACK_IMPORTED_MODULE_9__[\"default\"].blotName]: language\n        });\n        return memo.insert(nodeText);\n      }, delta);\n    }], new WeakMap());\n  }\n\n}\n\nSyntax.DEFAULTS = {\n  hljs: (() => {\n    return window.hljs;\n  })(),\n  interval: 1000,\n  languages: [{\n    key: 'plain',\n    label: 'Plain'\n  }, {\n    key: 'bash',\n    label: 'Bash'\n  }, {\n    key: 'cpp',\n    label: 'C++'\n  }, {\n    key: 'cs',\n    label: 'C#'\n  }, {\n    key: 'css',\n    label: 'CSS'\n  }, {\n    key: 'diff',\n    label: 'Diff'\n  }, {\n    key: 'xml',\n    label: 'HTML/XML'\n  }, {\n    key: 'java',\n    label: 'Java'\n  }, {\n    key: 'javascript',\n    label: 'Javascript'\n  }, {\n    key: 'markdown',\n    label: 'Markdown'\n  }, {\n    key: 'php',\n    label: 'PHP'\n  }, {\n    key: 'python',\n    label: 'Python'\n  }, {\n    key: 'ruby',\n    label: 'Ruby'\n  }, {\n    key: 'sql',\n    label: 'SQL'\n  }]\n};\n\n\n//# sourceURL=webpack://Quill/./modules/syntax.js?");

	/***/ }),

	/***/ "./modules/table.js":
	/*!**************************!*\
	  !*** ./modules/table.js ***!
	  \**************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill-delta */ \"./node_modules/quill-delta/dist/Delta.js\");\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/quill */ \"./core/quill.js\");\n/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/module */ \"./core/module.js\");\n/* harmony import */ var _formats_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../formats/table */ \"./formats/table.js\");\n\n\n\n\n\nclass Table extends _core_module__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\n  static register() {\n    _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].register(_formats_table__WEBPACK_IMPORTED_MODULE_3__[\"TableCell\"]);\n    _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].register(_formats_table__WEBPACK_IMPORTED_MODULE_3__[\"TableRow\"]);\n    _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].register(_formats_table__WEBPACK_IMPORTED_MODULE_3__[\"TableBody\"]);\n    _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].register(_formats_table__WEBPACK_IMPORTED_MODULE_3__[\"TableContainer\"]);\n  }\n\n  constructor(...args) {\n    super(...args);\n    this.listenBalanceCells();\n  }\n\n  balanceTables() {\n    this.quill.scroll.descendants(_formats_table__WEBPACK_IMPORTED_MODULE_3__[\"TableContainer\"]).forEach(table => {\n      table.balanceCells();\n    });\n  }\n\n  deleteColumn() {\n    const [table,, cell] = this.getTable();\n    if (cell == null) return;\n    table.deleteColumn(cell.cellOffset());\n    this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n  }\n\n  deleteRow() {\n    const [, row] = this.getTable();\n    if (row == null) return;\n    row.remove();\n    this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n  }\n\n  deleteTable() {\n    const [table] = this.getTable();\n    if (table == null) return;\n    const offset = table.offset();\n    table.remove();\n    this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n    this.quill.setSelection(offset, _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.SILENT);\n  }\n\n  getTable(range = this.quill.getSelection()) {\n    if (range == null) return [null, null, null, -1];\n    const [cell, offset] = this.quill.getLine(range.index);\n\n    if (cell == null || cell.statics.blotName !== _formats_table__WEBPACK_IMPORTED_MODULE_3__[\"TableCell\"].blotName) {\n      return [null, null, null, -1];\n    }\n\n    const row = cell.parent;\n    const table = row.parent.parent;\n    return [table, row, cell, offset];\n  }\n\n  insertColumn(offset) {\n    const range = this.quill.getSelection();\n    const [table, row, cell] = this.getTable(range);\n    if (cell == null) return;\n    const column = cell.cellOffset();\n    table.insertColumn(column + offset);\n    this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n    let shift = row.rowOffset();\n\n    if (offset === 0) {\n      shift += 1;\n    }\n\n    this.quill.setSelection(range.index + shift, range.length, _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.SILENT);\n  }\n\n  insertColumnLeft() {\n    this.insertColumn(0);\n  }\n\n  insertColumnRight() {\n    this.insertColumn(1);\n  }\n\n  insertRow(offset) {\n    const range = this.quill.getSelection();\n    const [table, row, cell] = this.getTable(range);\n    if (cell == null) return;\n    const index = row.rowOffset();\n    table.insertRow(index + offset);\n    this.quill.update(_core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n\n    if (offset > 0) {\n      this.quill.setSelection(range, _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.SILENT);\n    } else {\n      this.quill.setSelection(range.index + row.children.length, range.length, _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.SILENT);\n    }\n  }\n\n  insertRowAbove() {\n    this.insertRow(0);\n  }\n\n  insertRowBelow() {\n    this.insertRow(1);\n  }\n\n  insertTable(rows, columns) {\n    const range = this.quill.getSelection();\n    if (range == null) return;\n    const delta = new Array(rows).fill(0).reduce(memo => {\n      const text = new Array(columns).fill('\\n').join('');\n      return memo.insert(text, {\n        table: Object(_formats_table__WEBPACK_IMPORTED_MODULE_3__[\"tableId\"])()\n      });\n    }, new quill_delta__WEBPACK_IMPORTED_MODULE_0___default.a().retain(range.index));\n    this.quill.updateContents(delta, _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n    this.quill.setSelection(range.index, _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.SILENT);\n    this.balanceTables();\n  }\n\n  listenBalanceCells() {\n    this.quill.on(_core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.SCROLL_OPTIMIZE, mutations => {\n      mutations.some(mutation => {\n        if (['TD', 'TR', 'TBODY', 'TABLE'].includes(mutation.target.tagName)) {\n          this.quill.once(_core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.TEXT_CHANGE, (delta, old, source) => {\n            if (source !== _core_quill__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER) return;\n            this.balanceTables();\n          });\n          return true;\n        }\n\n        return false;\n      });\n    });\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Table);\n\n//# sourceURL=webpack://Quill/./modules/table.js?");

	/***/ }),

	/***/ "./modules/toolbar.js":
	/*!****************************!*\
	  !*** ./modules/toolbar.js ***!
	  \****************************/
	/*! exports provided: default, addControls */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Toolbar; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addControls\", function() { return addControls; });\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill-delta */ \"./node_modules/quill-delta/dist/Delta.js\");\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var parchment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! parchment */ \"./node_modules/parchment/src/parchment.ts\");\n/* harmony import */ var _core_quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/quill */ \"./core/quill.js\");\n/* harmony import */ var _core_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/logger */ \"./core/logger.js\");\n/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/module */ \"./core/module.js\");\n\n\n\n\n\nconst debug = Object(_core_logger__WEBPACK_IMPORTED_MODULE_3__[\"default\"])('quill:toolbar');\n\nclass Toolbar extends _core_module__WEBPACK_IMPORTED_MODULE_4__[\"default\"] {\n  constructor(quill, options) {\n    super(quill, options);\n\n    if (Array.isArray(this.options.container)) {\n      const container = document.createElement('div');\n      addControls(container, this.options.container);\n      quill.container.parentNode.insertBefore(container, quill.container);\n      this.container = container;\n    } else if (typeof this.options.container === 'string') {\n      this.container = document.querySelector(this.options.container);\n    } else {\n      this.container = this.options.container;\n    }\n\n    if (!(this.container instanceof HTMLElement)) {\n      return debug.error('Container required for toolbar', this.options);\n    }\n\n    this.container.classList.add('ql-toolbar');\n    this.controls = [];\n    this.handlers = {};\n    Object.keys(this.options.handlers).forEach(format => {\n      this.addHandler(format, this.options.handlers[format]);\n    });\n    Array.from(this.container.querySelectorAll('button, select')).forEach(input => {\n      this.attach(input);\n    });\n    this.quill.on(_core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].events.EDITOR_CHANGE, (type, range) => {\n      if (type === _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].events.SELECTION_CHANGE) {\n        this.update(range);\n      }\n    });\n    this.quill.on(_core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].events.SCROLL_OPTIMIZE, () => {\n      const [range] = this.quill.selection.getRange(); // quill.getSelection triggers update\n\n      this.update(range);\n    });\n  }\n\n  addHandler(format, handler) {\n    this.handlers[format] = handler;\n  }\n\n  attach(input) {\n    let format = Array.from(input.classList).find(className => {\n      return className.indexOf('ql-') === 0;\n    });\n    if (!format) return;\n    format = format.slice('ql-'.length);\n\n    if (input.tagName === 'BUTTON') {\n      input.setAttribute('type', 'button');\n    }\n\n    if (this.handlers[format] == null && this.quill.scroll.query(format) == null) {\n      debug.warn('ignoring attaching to nonexistent format', format, input);\n      return;\n    }\n\n    const eventName = input.tagName === 'SELECT' ? 'change' : 'click';\n    input.addEventListener(eventName, e => {\n      let value;\n\n      if (input.tagName === 'SELECT') {\n        if (input.selectedIndex < 0) return;\n        const selected = input.options[input.selectedIndex];\n\n        if (selected.hasAttribute('selected')) {\n          value = false;\n        } else {\n          value = selected.value || false;\n        }\n      } else {\n        if (input.classList.contains('ql-active')) {\n          value = false;\n        } else {\n          value = input.value || !input.hasAttribute('value');\n        }\n\n        e.preventDefault();\n      }\n\n      this.quill.focus();\n      const [range] = this.quill.selection.getRange();\n\n      if (this.handlers[format] != null) {\n        this.handlers[format].call(this, value);\n      } else if (this.quill.scroll.query(format).prototype instanceof parchment__WEBPACK_IMPORTED_MODULE_1__[\"EmbedBlot\"]) {\n        value = prompt(\"Enter \".concat(format)); // eslint-disable-line no-alert\n\n        if (!value) return;\n        this.quill.updateContents(new quill_delta__WEBPACK_IMPORTED_MODULE_0___default.a().retain(range.index).delete(range.length).insert({\n          [format]: value\n        }), _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sources.USER);\n      } else {\n        this.quill.format(format, value, _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sources.USER);\n      }\n\n      this.update(range);\n    });\n    this.controls.push([format, input]);\n  }\n\n  update(range) {\n    const formats = range == null ? {} : this.quill.getFormat(range);\n    this.controls.forEach(pair => {\n      const [format, input] = pair;\n\n      if (input.tagName === 'SELECT') {\n        let option;\n\n        if (range == null) {\n          option = null;\n        } else if (formats[format] == null) {\n          option = input.querySelector('option[selected]');\n        } else if (!Array.isArray(formats[format])) {\n          let value = formats[format];\n\n          if (typeof value === 'string') {\n            value = value.replace(/\"/g, '\\\\\"');\n          }\n\n          option = input.querySelector(\"option[value=\\\"\".concat(value, \"\\\"]\"));\n        }\n\n        if (option == null) {\n          input.value = ''; // TODO make configurable?\n\n          input.selectedIndex = -1;\n        } else {\n          option.selected = true;\n        }\n      } else if (range == null) {\n        input.classList.remove('ql-active');\n      } else if (input.hasAttribute('value')) {\n        // both being null should match (default values)\n        // '1' should match with 1 (headers)\n        const isActive = formats[format] === input.getAttribute('value') || formats[format] != null && formats[format].toString() === input.getAttribute('value') || formats[format] == null && !input.getAttribute('value');\n        input.classList.toggle('ql-active', isActive);\n      } else {\n        input.classList.toggle('ql-active', formats[format] != null);\n      }\n    });\n  }\n\n}\n\nToolbar.DEFAULTS = {};\n\nfunction addButton(container, format, value) {\n  const input = document.createElement('button');\n  input.setAttribute('type', 'button');\n  input.classList.add(\"ql-\".concat(format));\n\n  if (value != null) {\n    input.value = value;\n  }\n\n  container.appendChild(input);\n}\n\nfunction addControls(container, groups) {\n  if (!Array.isArray(groups[0])) {\n    groups = [groups];\n  }\n\n  groups.forEach(controls => {\n    const group = document.createElement('span');\n    group.classList.add('ql-formats');\n    controls.forEach(control => {\n      if (typeof control === 'string') {\n        addButton(group, control);\n      } else {\n        const format = Object.keys(control)[0];\n        const value = control[format];\n\n        if (Array.isArray(value)) {\n          addSelect(group, format, value);\n        } else {\n          addButton(group, format, value);\n        }\n      }\n    });\n    container.appendChild(group);\n  });\n}\n\nfunction addSelect(container, format, values) {\n  const input = document.createElement('select');\n  input.classList.add(\"ql-\".concat(format));\n  values.forEach(value => {\n    const option = document.createElement('option');\n\n    if (value !== false) {\n      option.setAttribute('value', value);\n    } else {\n      option.setAttribute('selected', 'selected');\n    }\n\n    input.appendChild(option);\n  });\n  container.appendChild(input);\n}\n\nToolbar.DEFAULTS = {\n  container: null,\n  handlers: {\n    clean() {\n      const range = this.quill.getSelection();\n      if (range == null) return;\n\n      if (range.length === 0) {\n        const formats = this.quill.getFormat();\n        Object.keys(formats).forEach(name => {\n          // Clean functionality in existing apps only clean inline formats\n          if (this.quill.scroll.query(name, parchment__WEBPACK_IMPORTED_MODULE_1__[\"Scope\"].INLINE) != null) {\n            this.quill.format(name, false, _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sources.USER);\n          }\n        });\n      } else {\n        this.quill.removeFormat(range, _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sources.USER);\n      }\n    },\n\n    direction(value) {\n      const {\n        align\n      } = this.quill.getFormat();\n\n      if (value === 'rtl' && align == null) {\n        this.quill.format('align', 'right', _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sources.USER);\n      } else if (!value && align === 'right') {\n        this.quill.format('align', false, _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sources.USER);\n      }\n\n      this.quill.format('direction', value, _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sources.USER);\n    },\n\n    indent(value) {\n      const range = this.quill.getSelection();\n      const formats = this.quill.getFormat(range);\n      const indent = parseInt(formats.indent || 0, 10);\n\n      if (value === '+1' || value === '-1') {\n        let modifier = value === '+1' ? 1 : -1;\n        if (formats.direction === 'rtl') modifier *= -1;\n        this.quill.format('indent', indent + modifier, _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sources.USER);\n      }\n    },\n\n    link(value) {\n      if (value === true) {\n        value = prompt('Enter link URL:'); // eslint-disable-line no-alert\n      }\n\n      this.quill.format('link', value, _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sources.USER);\n    },\n\n    list(value) {\n      const range = this.quill.getSelection();\n      const formats = this.quill.getFormat(range);\n\n      if (value === 'check') {\n        if (formats.list === 'checked' || formats.list === 'unchecked') {\n          this.quill.format('list', false, _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sources.USER);\n        } else {\n          this.quill.format('list', 'unchecked', _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sources.USER);\n        }\n      } else {\n        this.quill.format('list', value, _core_quill__WEBPACK_IMPORTED_MODULE_2__[\"default\"].sources.USER);\n      }\n    }\n\n  }\n};\n\n\n//# sourceURL=webpack://Quill/./modules/toolbar.js?");

	/***/ }),

	/***/ "./modules/uploader.js":
	/*!*****************************!*\
	  !*** ./modules/uploader.js ***!
	  \*****************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! quill-delta */ \"./node_modules/quill-delta/dist/Delta.js\");\n/* harmony import */ var quill_delta__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(quill_delta__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/emitter */ \"./core/emitter.js\");\n/* harmony import */ var _core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/module */ \"./core/module.js\");\n\n\n\n\nclass Uploader extends _core_module__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\n  constructor(quill, options) {\n    super(quill, options);\n    quill.root.addEventListener('drop', e => {\n      e.preventDefault();\n      let native;\n\n      if (document.caretRangeFromPoint) {\n        native = document.caretRangeFromPoint(e.clientX, e.clientY);\n      } else if (document.caretPositionFromPoint) {\n        const position = document.caretPositionFromPoint(e.clientX, e.clientY);\n        native = document.createRange();\n        native.setStart(position.offsetNode, position.offset);\n        native.setEnd(position.offsetNode, position.offset);\n      } else {\n        return;\n      }\n\n      const normalized = quill.selection.normalizeNative(native);\n      const range = quill.selection.normalizedToRange(normalized);\n      this.upload(range, e.dataTransfer.files);\n    });\n  }\n\n  upload(range, files) {\n    const uploads = [];\n    Array.from(files).forEach(file => {\n      if (file && this.options.mimetypes.includes(file.type)) {\n        uploads.push(file);\n      }\n    });\n\n    if (uploads.length > 0) {\n      this.options.handler.call(this, range, uploads);\n    }\n  }\n\n}\n\nUploader.DEFAULTS = {\n  mimetypes: ['image/png', 'image/jpeg'],\n\n  handler(range, files) {\n    const promises = files.map(file => {\n      return new Promise(resolve => {\n        const reader = new FileReader();\n\n        reader.onload = e => {\n          resolve(e.target.result);\n        };\n\n        reader.readAsDataURL(file);\n      });\n    });\n    Promise.all(promises).then(images => {\n      const update = images.reduce((delta, image) => {\n        return delta.insert({\n          image\n        });\n      }, new quill_delta__WEBPACK_IMPORTED_MODULE_0___default.a().retain(range.index).delete(range.length));\n      this.quill.updateContents(update, _core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n      this.quill.setSelection(range.index + images.length, _core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.SILENT);\n    });\n  }\n\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Uploader);\n\n//# sourceURL=webpack://Quill/./modules/uploader.js?");

	/***/ }),

	/***/ "./node_modules/array-filter/index.js":
	/*!********************************************!*\
	  !*** ./node_modules/array-filter/index.js ***!
	  \********************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("\n/**\n * Array#filter.\n *\n * @param {Array} arr\n * @param {Function} fn\n * @param {Object=} self\n * @return {Array}\n * @throw TypeError\n */\n\nmodule.exports = function (arr, fn, self) {\n  if (arr.filter) return arr.filter(fn, self);\n  if (void 0 === arr || null === arr) throw new TypeError;\n  if ('function' != typeof fn) throw new TypeError;\n  var ret = [];\n  for (var i = 0; i < arr.length; i++) {\n    if (!hasOwn.call(arr, i)) continue;\n    var val = arr[i];\n    if (fn.call(self, val, i, arr)) ret.push(val);\n  }\n  return ret;\n};\n\nvar hasOwn = Object.prototype.hasOwnProperty;\n\n\n//# sourceURL=webpack://Quill/./node_modules/array-filter/index.js?");

	/***/ }),

	/***/ "./node_modules/available-typed-arrays/index.js":
	/*!******************************************************!*\
	  !*** ./node_modules/available-typed-arrays/index.js ***!
	  \******************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("/* WEBPACK VAR INJECTION */(function(global) {\n\nvar filter = __webpack_require__(/*! array-filter */ \"./node_modules/array-filter/index.js\");\n\nmodule.exports = function availableTypedArrays() {\n\treturn filter([\n\t\t'BigInt64Array',\n\t\t'BigUint64Array',\n\t\t'Float32Array',\n\t\t'Float64Array',\n\t\t'Int16Array',\n\t\t'Int32Array',\n\t\t'Int8Array',\n\t\t'Uint16Array',\n\t\t'Uint32Array',\n\t\t'Uint8Array',\n\t\t'Uint8ClampedArray'\n\t], function (typedArray) {\n\t\treturn typeof global[typedArray] === 'function';\n\t});\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://Quill/./node_modules/available-typed-arrays/index.js?");

	/***/ }),

	/***/ "./node_modules/clone/clone.js":
	/*!*************************************!*\
	  !*** ./node_modules/clone/clone.js ***!
	  \*************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("var clone = (function() {\n'use strict';\n\nfunction _instanceof(obj, type) {\n  return type != null && obj instanceof type;\n}\n\nvar nativeMap;\ntry {\n  nativeMap = Map;\n} catch(_) {\n  // maybe a reference error because no `Map`. Give it a dummy value that no\n  // value will ever be an instanceof.\n  nativeMap = function() {};\n}\n\nvar nativeSet;\ntry {\n  nativeSet = Set;\n} catch(_) {\n  nativeSet = function() {};\n}\n\nvar nativePromise;\ntry {\n  nativePromise = Promise;\n} catch(_) {\n  nativePromise = function() {};\n}\n\n/**\n * Clones (copies) an Object using deep copying.\n *\n * This function supports circular references by default, but if you are certain\n * there are no circular references in your object, you can save some CPU time\n * by calling clone(obj, false).\n *\n * Caution: if `circular` is false and `parent` contains circular references,\n * your program may enter an infinite loop and crash.\n *\n * @param `parent` - the object to be cloned\n * @param `circular` - set to true if the object to be cloned may contain\n *    circular references. (optional - true by default)\n * @param `depth` - set to a number if the object is only to be cloned to\n *    a particular depth. (optional - defaults to Infinity)\n * @param `prototype` - sets the prototype to be used when cloning an object.\n *    (optional - defaults to parent prototype).\n * @param `includeNonEnumerable` - set to true if the non-enumerable properties\n *    should be cloned as well. Non-enumerable properties on the prototype\n *    chain will be ignored. (optional - false by default)\n*/\nfunction clone(parent, circular, depth, prototype, includeNonEnumerable) {\n  if (typeof circular === 'object') {\n    depth = circular.depth;\n    prototype = circular.prototype;\n    includeNonEnumerable = circular.includeNonEnumerable;\n    circular = circular.circular;\n  }\n  // maintain two arrays for circular references, where corresponding parents\n  // and children have the same index\n  var allParents = [];\n  var allChildren = [];\n\n  var useBuffer = typeof Buffer != 'undefined';\n\n  if (typeof circular == 'undefined')\n    circular = true;\n\n  if (typeof depth == 'undefined')\n    depth = Infinity;\n\n  // recurse this function so we don't reset allParents and allChildren\n  function _clone(parent, depth) {\n    // cloning null always returns null\n    if (parent === null)\n      return null;\n\n    if (depth === 0)\n      return parent;\n\n    var child;\n    var proto;\n    if (typeof parent != 'object') {\n      return parent;\n    }\n\n    if (_instanceof(parent, nativeMap)) {\n      child = new nativeMap();\n    } else if (_instanceof(parent, nativeSet)) {\n      child = new nativeSet();\n    } else if (_instanceof(parent, nativePromise)) {\n      child = new nativePromise(function (resolve, reject) {\n        parent.then(function(value) {\n          resolve(_clone(value, depth - 1));\n        }, function(err) {\n          reject(_clone(err, depth - 1));\n        });\n      });\n    } else if (clone.__isArray(parent)) {\n      child = [];\n    } else if (clone.__isRegExp(parent)) {\n      child = new RegExp(parent.source, __getRegExpFlags(parent));\n      if (parent.lastIndex) child.lastIndex = parent.lastIndex;\n    } else if (clone.__isDate(parent)) {\n      child = new Date(parent.getTime());\n    } else if (useBuffer && Buffer.isBuffer(parent)) {\n      if (Buffer.allocUnsafe) {\n        // Node.js >= 4.5.0\n        child = Buffer.allocUnsafe(parent.length);\n      } else {\n        // Older Node.js versions\n        child = new Buffer(parent.length);\n      }\n      parent.copy(child);\n      return child;\n    } else if (_instanceof(parent, Error)) {\n      child = Object.create(parent);\n    } else {\n      if (typeof prototype == 'undefined') {\n        proto = Object.getPrototypeOf(parent);\n        child = Object.create(proto);\n      }\n      else {\n        child = Object.create(prototype);\n        proto = prototype;\n      }\n    }\n\n    if (circular) {\n      var index = allParents.indexOf(parent);\n\n      if (index != -1) {\n        return allChildren[index];\n      }\n      allParents.push(parent);\n      allChildren.push(child);\n    }\n\n    if (_instanceof(parent, nativeMap)) {\n      parent.forEach(function(value, key) {\n        var keyChild = _clone(key, depth - 1);\n        var valueChild = _clone(value, depth - 1);\n        child.set(keyChild, valueChild);\n      });\n    }\n    if (_instanceof(parent, nativeSet)) {\n      parent.forEach(function(value) {\n        var entryChild = _clone(value, depth - 1);\n        child.add(entryChild);\n      });\n    }\n\n    for (var i in parent) {\n      var attrs;\n      if (proto) {\n        attrs = Object.getOwnPropertyDescriptor(proto, i);\n      }\n\n      if (attrs && attrs.set == null) {\n        continue;\n      }\n      child[i] = _clone(parent[i], depth - 1);\n    }\n\n    if (Object.getOwnPropertySymbols) {\n      var symbols = Object.getOwnPropertySymbols(parent);\n      for (var i = 0; i < symbols.length; i++) {\n        // Don't need to worry about cloning a symbol because it is a primitive,\n        // like a number or string.\n        var symbol = symbols[i];\n        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);\n        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {\n          continue;\n        }\n        child[symbol] = _clone(parent[symbol], depth - 1);\n        if (!descriptor.enumerable) {\n          Object.defineProperty(child, symbol, {\n            enumerable: false\n          });\n        }\n      }\n    }\n\n    if (includeNonEnumerable) {\n      var allPropertyNames = Object.getOwnPropertyNames(parent);\n      for (var i = 0; i < allPropertyNames.length; i++) {\n        var propertyName = allPropertyNames[i];\n        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);\n        if (descriptor && descriptor.enumerable) {\n          continue;\n        }\n        child[propertyName] = _clone(parent[propertyName], depth - 1);\n        Object.defineProperty(child, propertyName, {\n          enumerable: false\n        });\n      }\n    }\n\n    return child;\n  }\n\n  return _clone(parent, depth);\n}\n\n/**\n * Simple flat clone using prototype, accepts only objects, usefull for property\n * override on FLAT configuration object (no nested props).\n *\n * USE WITH CAUTION! This may not behave as you wish if you do not know how this\n * works.\n */\nclone.clonePrototype = function clonePrototype(parent) {\n  if (parent === null)\n    return null;\n\n  var c = function () {};\n  c.prototype = parent;\n  return new c();\n};\n\n// private utility functions\n\nfunction __objToStr(o) {\n  return Object.prototype.toString.call(o);\n}\nclone.__objToStr = __objToStr;\n\nfunction __isDate(o) {\n  return typeof o === 'object' && __objToStr(o) === '[object Date]';\n}\nclone.__isDate = __isDate;\n\nfunction __isArray(o) {\n  return typeof o === 'object' && __objToStr(o) === '[object Array]';\n}\nclone.__isArray = __isArray;\n\nfunction __isRegExp(o) {\n  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';\n}\nclone.__isRegExp = __isRegExp;\n\nfunction __getRegExpFlags(re) {\n  var flags = '';\n  if (re.global) flags += 'g';\n  if (re.ignoreCase) flags += 'i';\n  if (re.multiline) flags += 'm';\n  return flags;\n}\nclone.__getRegExpFlags = __getRegExpFlags;\n\nreturn clone;\n})();\n\nif (typeof module === 'object' && module.exports) {\n  module.exports = clone;\n}\n\n\n//# sourceURL=webpack://Quill/./node_modules/clone/clone.js?");

	/***/ }),

	/***/ "./node_modules/deep-equal/index.js":
	/*!******************************************!*\
	  !*** ./node_modules/deep-equal/index.js ***!
	  \******************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar objectKeys = __webpack_require__(/*! object-keys */ \"./node_modules/deep-equal/node_modules/object-keys/index.js\");\nvar isArguments = __webpack_require__(/*! is-arguments */ \"./node_modules/is-arguments/index.js\");\nvar is = __webpack_require__(/*! object-is */ \"./node_modules/object-is/index.js\");\nvar isRegex = __webpack_require__(/*! is-regex */ \"./node_modules/deep-equal/node_modules/is-regex/index.js\");\nvar flags = __webpack_require__(/*! regexp.prototype.flags */ \"./node_modules/regexp.prototype.flags/index.js\");\nvar isArray = __webpack_require__(/*! isarray */ \"./node_modules/deep-equal/node_modules/isarray/index.js\");\nvar isDate = __webpack_require__(/*! is-date-object */ \"./node_modules/deep-equal/node_modules/is-date-object/index.js\");\nvar whichBoxedPrimitive = __webpack_require__(/*! which-boxed-primitive */ \"./node_modules/which-boxed-primitive/index.js\");\nvar GetIntrinsic = __webpack_require__(/*! es-abstract/GetIntrinsic */ \"./node_modules/deep-equal/node_modules/es-abstract/GetIntrinsic.js\");\nvar callBound = __webpack_require__(/*! es-abstract/helpers/callBound */ \"./node_modules/deep-equal/node_modules/es-abstract/helpers/callBound.js\");\nvar whichCollection = __webpack_require__(/*! which-collection */ \"./node_modules/which-collection/index.js\");\nvar getIterator = __webpack_require__(/*! es-get-iterator */ \"./node_modules/es-get-iterator/index.js\");\nvar getSideChannel = __webpack_require__(/*! side-channel */ \"./node_modules/side-channel/index.js\");\nvar whichTypedArray = __webpack_require__(/*! which-typed-array */ \"./node_modules/which-typed-array/index.js\");\nvar assign = __webpack_require__(/*! object.assign */ \"./node_modules/object.assign/index.js\");\n\nvar $getTime = callBound('Date.prototype.getTime');\nvar gPO = Object.getPrototypeOf;\nvar $objToString = callBound('Object.prototype.toString');\n\nvar $Set = GetIntrinsic('%Set%', true);\nvar $mapHas = callBound('Map.prototype.has', true);\nvar $mapGet = callBound('Map.prototype.get', true);\nvar $mapSize = callBound('Map.prototype.size', true);\nvar $setAdd = callBound('Set.prototype.add', true);\nvar $setDelete = callBound('Set.prototype.delete', true);\nvar $setHas = callBound('Set.prototype.has', true);\nvar $setSize = callBound('Set.prototype.size', true);\n\n// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L401-L414\nfunction setHasEqualElement(set, val1, opts, channel) {\n  var i = getIterator(set);\n  var result;\n  while ((result = i.next()) && !result.done) {\n    if (internalDeepEqual(val1, result.value, opts, channel)) { // eslint-disable-line no-use-before-define\n      // Remove the matching element to make sure we do not check that again.\n      $setDelete(set, result.value);\n      return true;\n    }\n  }\n\n  return false;\n}\n\n// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L416-L439\nfunction findLooseMatchingPrimitives(prim) {\n  if (typeof prim === 'undefined') {\n    return null;\n  }\n  if (typeof prim === 'object') { // Only pass in null as object!\n    return void 0;\n  }\n  if (typeof prim === 'symbol') {\n    return false;\n  }\n  if (typeof prim === 'string' || typeof prim === 'number') {\n    // Loose equal entries exist only if the string is possible to convert to a regular number and not NaN.\n    return +prim === +prim; // eslint-disable-line no-implicit-coercion\n  }\n  return true;\n}\n\n// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L449-L460\nfunction mapMightHaveLoosePrim(a, b, prim, item, opts, channel) {\n  var altValue = findLooseMatchingPrimitives(prim);\n  if (altValue != null) {\n    return altValue;\n  }\n  var curB = $mapGet(b, altValue);\n  var looseOpts = assign({}, opts, { strict: false });\n  if (\n    (typeof curB === 'undefined' && !$mapHas(b, altValue))\n    // eslint-disable-next-line no-use-before-define\n    || !internalDeepEqual(item, curB, looseOpts, channel)\n  ) {\n    return false;\n  }\n  // eslint-disable-next-line no-use-before-define\n  return !$mapHas(a, altValue) && internalDeepEqual(item, curB, looseOpts, channel);\n}\n\n// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L441-L447\nfunction setMightHaveLoosePrim(a, b, prim) {\n  var altValue = findLooseMatchingPrimitives(prim);\n  if (altValue != null) {\n    return altValue;\n  }\n\n  return $setHas(b, altValue) && !$setHas(a, altValue);\n}\n\n// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L518-L533\nfunction mapHasEqualEntry(set, map, key1, item1, opts, channel) {\n  var i = getIterator(set);\n  var result;\n  var key2;\n  while ((result = i.next()) && !result.done) {\n    key2 = result.value;\n    if (\n      // eslint-disable-next-line no-use-before-define\n      internalDeepEqual(key1, key2, opts, channel)\n      // eslint-disable-next-line no-use-before-define\n      && internalDeepEqual(item1, $mapGet(map, key2), opts, channel)\n    ) {\n      $setDelete(set, key2);\n      return true;\n    }\n  }\n\n  return false;\n}\n\nfunction internalDeepEqual(actual, expected, options, channel) {\n  var opts = options || {};\n\n  // 7.1. All identical values are equivalent, as determined by ===.\n  if (opts.strict ? is(actual, expected) : actual === expected) {\n    return true;\n  }\n\n  var actualBoxed = whichBoxedPrimitive(actual);\n  var expectedBoxed = whichBoxedPrimitive(expected);\n  if (actualBoxed !== expectedBoxed) {\n    return false;\n  }\n\n  // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.\n  if (!actual || !expected || (typeof actual !== 'object' && typeof expected !== 'object')) {\n    return opts.strict ? is(actual, expected) : actual == expected; // eslint-disable-line eqeqeq\n  }\n\n  /*\n   * 7.4. For all other Object pairs, including Array objects, equivalence is\n   * determined by having the same number of owned properties (as verified\n   * with Object.prototype.hasOwnProperty.call), the same set of keys\n   * (although not necessarily the same order), equivalent values for every\n   * corresponding key, and an identical 'prototype' property. Note: this\n   * accounts for both named and indexed properties on Arrays.\n   */\n  // see https://github.com/nodejs/node/commit/d3aafd02efd3a403d646a3044adcf14e63a88d32 for memos/channel inspiration\n\n  var hasActual = channel.has(actual);\n  var hasExpected = channel.has(expected);\n  var sentinel;\n  if (hasActual && hasExpected) {\n    if (channel.get(actual) === channel.get(expected)) {\n      return true;\n    }\n  } else {\n    sentinel = {};\n  }\n  if (!hasActual) { channel.set(actual, sentinel); }\n  if (!hasExpected) { channel.set(expected, sentinel); }\n\n  // eslint-disable-next-line no-use-before-define\n  return objEquiv(actual, expected, opts, channel);\n}\n\nfunction isBuffer(x) {\n  if (!x || typeof x !== 'object' || typeof x.length !== 'number') {\n    return false;\n  }\n  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {\n    return false;\n  }\n  if (x.length > 0 && typeof x[0] !== 'number') {\n    return false;\n  }\n\n  return !!(x.constructor && x.constructor.isBuffer && x.constructor.isBuffer(x));\n}\n\nfunction setEquiv(a, b, opts, channel) {\n  if ($setSize(a) !== $setSize(b)) {\n    return false;\n  }\n  var iA = getIterator(a);\n  var iB = getIterator(b);\n  var resultA;\n  var resultB;\n  var set;\n  while ((resultA = iA.next()) && !resultA.done) {\n    if (resultA.value && typeof resultA.value === 'object') {\n      if (!set) { set = new $Set(); }\n      $setAdd(set, resultA.value);\n    } else if (!$setHas(b, resultA.value)) {\n      if (opts.strict) { return false; }\n      if (!setMightHaveLoosePrim(a, b, resultA.value)) {\n        return false;\n      }\n      if (!set) { set = new $Set(); }\n      $setAdd(set, resultA.value);\n    }\n  }\n  if (set) {\n    while ((resultB = iB.next()) && !resultB.done) {\n      // We have to check if a primitive value is already matching and only if it's not, go hunting for it.\n      if (resultB.value && typeof resultB.value === 'object') {\n        if (!setHasEqualElement(set, resultB.value, opts.strict, channel)) {\n          return false;\n        }\n      } else if (\n        !opts.strict\n        && !$setHas(a, resultB.value)\n        && !setHasEqualElement(set, resultB.value, opts.strict, channel)\n      ) {\n        return false;\n      }\n    }\n    return $setSize(set) === 0;\n  }\n  return true;\n}\n\nfunction mapEquiv(a, b, opts, channel) {\n  if ($mapSize(a) !== $mapSize(b)) {\n    return false;\n  }\n  var iA = getIterator(a);\n  var iB = getIterator(b);\n  var resultA;\n  var resultB;\n  var set;\n  var key;\n  var item1;\n  var item2;\n  while ((resultA = iA.next()) && !resultA.done) {\n    key = resultA.value[0];\n    item1 = resultA.value[1];\n    if (key && typeof key === 'object') {\n      if (!set) { set = new $Set(); }\n      $setAdd(set, key);\n    } else {\n      item2 = $mapGet(b, key);\n      if ((typeof item2 === 'undefined' && !$mapHas(b, key)) || !internalDeepEqual(item1, item2, opts, channel)) {\n        if (opts.strict) {\n          return false;\n        }\n        if (!mapMightHaveLoosePrim(a, b, key, item1, opts, channel)) {\n          return false;\n        }\n        if (!set) { set = new $Set(); }\n        $setAdd(set, key);\n      }\n    }\n  }\n\n  if (set) {\n    while ((resultB = iB.next()) && !resultB.done) {\n      key = resultB.value[0];\n      item2 = resultB.value[1];\n      if (key && typeof key === 'object') {\n        if (!mapHasEqualEntry(set, a, key, item2, opts, channel)) {\n          return false;\n        }\n      } else if (\n        !opts.strict\n        && (!a.has(key) || !internalDeepEqual($mapGet(a, key), item2, opts, channel))\n        && !mapHasEqualEntry(set, a, key, item2, assign({}, opts, { strict: false }), channel)\n      ) {\n        return false;\n      }\n    }\n    return $setSize(set) === 0;\n  }\n  return true;\n}\n\nfunction objEquiv(a, b, opts, channel) {\n  /* eslint max-statements: [2, 100], max-lines-per-function: [2, 120], max-depth: [2, 5] */\n  var i, key;\n\n  if (typeof a !== typeof b) { return false; }\n  if (a == null || b == null) { return false; }\n\n  if ($objToString(a) !== $objToString(b)) { return false; }\n\n  if (isArguments(a) !== isArguments(b)) { return false; }\n\n  var aIsArray = isArray(a);\n  var bIsArray = isArray(b);\n  if (aIsArray !== bIsArray) { return false; }\n\n  // TODO: replace when a cross-realm brand check is available\n  var aIsError = a instanceof Error;\n  var bIsError = b instanceof Error;\n  if (aIsError !== bIsError) { return false; }\n  if (aIsError || bIsError) {\n    if (a.name !== b.name || a.message !== b.message) { return false; }\n  }\n\n  var aIsRegex = isRegex(a);\n  var bIsRegex = isRegex(b);\n  if (aIsRegex !== bIsRegex) { return false; }\n  if ((aIsRegex || bIsRegex) && (a.source !== b.source || flags(a) !== flags(b))) {\n    return false;\n  }\n\n  var aIsDate = isDate(a);\n  var bIsDate = isDate(b);\n  if (aIsDate !== bIsDate) { return false; }\n  if (aIsDate || bIsDate) { // && would work too, because both are true or both false here\n    if ($getTime(a) !== $getTime(b)) { return false; }\n  }\n  if (opts.strict && gPO && gPO(a) !== gPO(b)) { return false; }\n\n  if (whichTypedArray(a) !== whichTypedArray(b)) {\n    return false;\n  }\n\n  var aIsBuffer = isBuffer(a);\n  var bIsBuffer = isBuffer(b);\n  if (aIsBuffer !== bIsBuffer) { return false; }\n  if (aIsBuffer || bIsBuffer) { // && would work too, because both are true or both false here\n    if (a.length !== b.length) { return false; }\n    for (i = 0; i < a.length; i++) {\n      if (a[i] !== b[i]) { return false; }\n    }\n    return true;\n  }\n\n  if (typeof a !== typeof b) { return false; }\n\n  var ka = objectKeys(a);\n  var kb = objectKeys(b);\n  // having the same number of owned properties (keys incorporates hasOwnProperty)\n  if (ka.length !== kb.length) { return false; }\n\n  // the same set of keys (although not necessarily the same order),\n  ka.sort();\n  kb.sort();\n  // ~~~cheap key test\n  for (i = ka.length - 1; i >= 0; i--) {\n    if (ka[i] != kb[i]) { return false; } // eslint-disable-line eqeqeq\n  }\n\n  // equivalent values for every corresponding key, and ~~~possibly expensive deep test\n  for (i = ka.length - 1; i >= 0; i--) {\n    key = ka[i];\n    if (!internalDeepEqual(a[key], b[key], opts, channel)) { return false; }\n  }\n\n  var aCollection = whichCollection(a);\n  var bCollection = whichCollection(b);\n  if (aCollection !== bCollection) {\n    return false;\n  }\n  if (aCollection === 'Set' || bCollection === 'Set') { // aCollection === bCollection\n    return setEquiv(a, b, opts, channel);\n  }\n  if (aCollection === 'Map') { // aCollection === bCollection\n    return mapEquiv(a, b, opts, channel);\n  }\n\n  return true;\n}\n\nmodule.exports = function deepEqual(a, b, opts) {\n  return internalDeepEqual(a, b, opts, getSideChannel());\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/deep-equal/index.js?");

	/***/ }),

	/***/ "./node_modules/deep-equal/node_modules/es-abstract/GetIntrinsic.js":
	/*!**************************************************************************!*\
	  !*** ./node_modules/deep-equal/node_modules/es-abstract/GetIntrinsic.js ***!
	  \**************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\n/* globals\n\tAtomics,\n\tSharedArrayBuffer,\n*/\n\nvar undefined;\n\nvar $TypeError = TypeError;\n\nvar $gOPD = Object.getOwnPropertyDescriptor;\nif ($gOPD) {\n\ttry {\n\t\t$gOPD({}, '');\n\t} catch (e) {\n\t\t$gOPD = null; // this is IE 8, which has a broken gOPD\n\t}\n}\n\nvar throwTypeError = function () { throw new $TypeError(); };\nvar ThrowTypeError = $gOPD\n\t? (function () {\n\t\ttry {\n\t\t\t// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties\n\t\t\targuments.callee; // IE 8 does not throw here\n\t\t\treturn throwTypeError;\n\t\t} catch (calleeThrows) {\n\t\t\ttry {\n\t\t\t\t// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')\n\t\t\t\treturn $gOPD(arguments, 'callee').get;\n\t\t\t} catch (gOPDthrows) {\n\t\t\t\treturn throwTypeError;\n\t\t\t}\n\t\t}\n\t}())\n\t: throwTypeError;\n\nvar hasSymbols = __webpack_require__(/*! has-symbols */ \"./node_modules/has-symbols/index.js\")();\n\nvar getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto\n\nvar generator; // = function * () {};\nvar generatorFunction = generator ? getProto(generator) : undefined;\nvar asyncFn; // async function() {};\nvar asyncFunction = asyncFn ? asyncFn.constructor : undefined;\nvar asyncGen; // async function * () {};\nvar asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;\nvar asyncGenIterator = asyncGen ? asyncGen() : undefined;\n\nvar TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);\n\nvar INTRINSICS = {\n\t'%Array%': Array,\n\t'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,\n\t'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,\n\t'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,\n\t'%ArrayPrototype%': Array.prototype,\n\t'%ArrayProto_entries%': Array.prototype.entries,\n\t'%ArrayProto_forEach%': Array.prototype.forEach,\n\t'%ArrayProto_keys%': Array.prototype.keys,\n\t'%ArrayProto_values%': Array.prototype.values,\n\t'%AsyncFromSyncIteratorPrototype%': undefined,\n\t'%AsyncFunction%': asyncFunction,\n\t'%AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,\n\t'%AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,\n\t'%AsyncGeneratorFunction%': asyncGenFunction,\n\t'%AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,\n\t'%AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,\n\t'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,\n\t'%Boolean%': Boolean,\n\t'%BooleanPrototype%': Boolean.prototype,\n\t'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,\n\t'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,\n\t'%Date%': Date,\n\t'%DatePrototype%': Date.prototype,\n\t'%decodeURI%': decodeURI,\n\t'%decodeURIComponent%': decodeURIComponent,\n\t'%encodeURI%': encodeURI,\n\t'%encodeURIComponent%': encodeURIComponent,\n\t'%Error%': Error,\n\t'%ErrorPrototype%': Error.prototype,\n\t'%eval%': eval, // eslint-disable-line no-eval\n\t'%EvalError%': EvalError,\n\t'%EvalErrorPrototype%': EvalError.prototype,\n\t'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,\n\t'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,\n\t'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,\n\t'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,\n\t'%Function%': Function,\n\t'%FunctionPrototype%': Function.prototype,\n\t'%Generator%': generator ? getProto(generator()) : undefined,\n\t'%GeneratorFunction%': generatorFunction,\n\t'%GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,\n\t'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,\n\t'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,\n\t'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,\n\t'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,\n\t'%isFinite%': isFinite,\n\t'%isNaN%': isNaN,\n\t'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,\n\t'%JSON%': typeof JSON === 'object' ? JSON : undefined,\n\t'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,\n\t'%Map%': typeof Map === 'undefined' ? undefined : Map,\n\t'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),\n\t'%MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,\n\t'%Math%': Math,\n\t'%Number%': Number,\n\t'%NumberPrototype%': Number.prototype,\n\t'%Object%': Object,\n\t'%ObjectPrototype%': Object.prototype,\n\t'%ObjProto_toString%': Object.prototype.toString,\n\t'%ObjProto_valueOf%': Object.prototype.valueOf,\n\t'%parseFloat%': parseFloat,\n\t'%parseInt%': parseInt,\n\t'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,\n\t'%PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,\n\t'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,\n\t'%Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,\n\t'%Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,\n\t'%Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,\n\t'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,\n\t'%RangeError%': RangeError,\n\t'%RangeErrorPrototype%': RangeError.prototype,\n\t'%ReferenceError%': ReferenceError,\n\t'%ReferenceErrorPrototype%': ReferenceError.prototype,\n\t'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,\n\t'%RegExp%': RegExp,\n\t'%RegExpPrototype%': RegExp.prototype,\n\t'%Set%': typeof Set === 'undefined' ? undefined : Set,\n\t'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),\n\t'%SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,\n\t'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,\n\t'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,\n\t'%String%': String,\n\t'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,\n\t'%StringPrototype%': String.prototype,\n\t'%Symbol%': hasSymbols ? Symbol : undefined,\n\t'%SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,\n\t'%SyntaxError%': SyntaxError,\n\t'%SyntaxErrorPrototype%': SyntaxError.prototype,\n\t'%ThrowTypeError%': ThrowTypeError,\n\t'%TypedArray%': TypedArray,\n\t'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,\n\t'%TypeError%': $TypeError,\n\t'%TypeErrorPrototype%': $TypeError.prototype,\n\t'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,\n\t'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,\n\t'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,\n\t'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,\n\t'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,\n\t'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,\n\t'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,\n\t'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,\n\t'%URIError%': URIError,\n\t'%URIErrorPrototype%': URIError.prototype,\n\t'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,\n\t'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,\n\t'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,\n\t'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype\n};\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\nvar $replace = bind.call(Function.call, String.prototype.replace);\n\n/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */\nvar rePropName = /[^%.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|%$))/g;\nvar reEscapeChar = /\\\\(\\\\)?/g; /** Used to match backslashes in property paths. */\nvar stringToPath = function stringToPath(string) {\n\tvar result = [];\n\t$replace(string, rePropName, function (match, number, quote, subString) {\n\t\tresult[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);\n\t});\n\treturn result;\n};\n/* end adaptation */\n\nvar getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {\n\tif (!(name in INTRINSICS)) {\n\t\tthrow new SyntaxError('intrinsic ' + name + ' does not exist!');\n\t}\n\n\t// istanbul ignore if // hopefully this is impossible to test :-)\n\tif (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {\n\t\tthrow new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');\n\t}\n\n\treturn INTRINSICS[name];\n};\n\nmodule.exports = function GetIntrinsic(name, allowMissing) {\n\tif (typeof name !== 'string' || name.length === 0) {\n\t\tthrow new TypeError('intrinsic name must be a non-empty string');\n\t}\n\tif (arguments.length > 1 && typeof allowMissing !== 'boolean') {\n\t\tthrow new TypeError('\"allowMissing\" argument must be a boolean');\n\t}\n\n\tvar parts = stringToPath(name);\n\n\tvar value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);\n\tfor (var i = 1; i < parts.length; i += 1) {\n\t\tif (value != null) {\n\t\t\tif ($gOPD && (i + 1) >= parts.length) {\n\t\t\t\tvar desc = $gOPD(value, parts[i]);\n\t\t\t\tif (!allowMissing && !(parts[i] in value)) {\n\t\t\t\t\tthrow new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');\n\t\t\t\t}\n\t\t\t\tvalue = desc ? (desc.get || desc.value) : value[parts[i]];\n\t\t\t} else {\n\t\t\t\tvalue = value[parts[i]];\n\t\t\t}\n\t\t}\n\t}\n\treturn value;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/deep-equal/node_modules/es-abstract/GetIntrinsic.js?");

	/***/ }),

	/***/ "./node_modules/deep-equal/node_modules/es-abstract/helpers/callBind.js":
	/*!******************************************************************************!*\
	  !*** ./node_modules/deep-equal/node_modules/es-abstract/helpers/callBind.js ***!
	  \******************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/deep-equal/node_modules/es-abstract/GetIntrinsic.js\");\n\nvar $Function = GetIntrinsic('%Function%');\nvar $apply = $Function.apply;\nvar $call = $Function.call;\n\nmodule.exports = function callBind() {\n\treturn bind.apply($call, arguments);\n};\n\nmodule.exports.apply = function applyBind() {\n\treturn bind.apply($apply, arguments);\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/deep-equal/node_modules/es-abstract/helpers/callBind.js?");

	/***/ }),

	/***/ "./node_modules/deep-equal/node_modules/es-abstract/helpers/callBound.js":
	/*!*******************************************************************************!*\
	  !*** ./node_modules/deep-equal/node_modules/es-abstract/helpers/callBound.js ***!
	  \*******************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/deep-equal/node_modules/es-abstract/GetIntrinsic.js\");\n\nvar callBind = __webpack_require__(/*! ./callBind */ \"./node_modules/deep-equal/node_modules/es-abstract/helpers/callBind.js\");\n\nvar $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));\n\nmodule.exports = function callBoundIntrinsic(name, allowMissing) {\n\tvar intrinsic = GetIntrinsic(name, !!allowMissing);\n\tif (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {\n\t\treturn callBind(intrinsic);\n\t}\n\treturn intrinsic;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/deep-equal/node_modules/es-abstract/helpers/callBound.js?");

	/***/ }),

	/***/ "./node_modules/deep-equal/node_modules/is-date-object/index.js":
	/*!**********************************************************************!*\
	  !*** ./node_modules/deep-equal/node_modules/is-date-object/index.js ***!
	  \**********************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar getDay = Date.prototype.getDay;\nvar tryDateObject = function tryDateGetDayCall(value) {\n\ttry {\n\t\tgetDay.call(value);\n\t\treturn true;\n\t} catch (e) {\n\t\treturn false;\n\t}\n};\n\nvar toStr = Object.prototype.toString;\nvar dateClass = '[object Date]';\nvar hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';\n\nmodule.exports = function isDateObject(value) {\n\tif (typeof value !== 'object' || value === null) {\n\t\treturn false;\n\t}\n\treturn hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/deep-equal/node_modules/is-date-object/index.js?");

	/***/ }),

	/***/ "./node_modules/deep-equal/node_modules/is-regex/index.js":
	/*!****************************************************************!*\
	  !*** ./node_modules/deep-equal/node_modules/is-regex/index.js ***!
	  \****************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar has = __webpack_require__(/*! has */ \"./node_modules/has/src/index.js\");\nvar regexExec = RegExp.prototype.exec;\nvar gOPD = Object.getOwnPropertyDescriptor;\n\nvar tryRegexExecCall = function tryRegexExec(value) {\n\ttry {\n\t\tvar lastIndex = value.lastIndex;\n\t\tvalue.lastIndex = 0; // eslint-disable-line no-param-reassign\n\n\t\tregexExec.call(value);\n\t\treturn true;\n\t} catch (e) {\n\t\treturn false;\n\t} finally {\n\t\tvalue.lastIndex = lastIndex; // eslint-disable-line no-param-reassign\n\t}\n};\nvar toStr = Object.prototype.toString;\nvar regexClass = '[object RegExp]';\nvar hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';\n\nmodule.exports = function isRegex(value) {\n\tif (!value || typeof value !== 'object') {\n\t\treturn false;\n\t}\n\tif (!hasToStringTag) {\n\t\treturn toStr.call(value) === regexClass;\n\t}\n\n\tvar descriptor = gOPD(value, 'lastIndex');\n\tvar hasLastIndexDataProperty = descriptor && has(descriptor, 'value');\n\tif (!hasLastIndexDataProperty) {\n\t\treturn false;\n\t}\n\n\treturn tryRegexExecCall(value);\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/deep-equal/node_modules/is-regex/index.js?");

	/***/ }),

	/***/ "./node_modules/deep-equal/node_modules/isarray/index.js":
	/*!***************************************************************!*\
	  !*** ./node_modules/deep-equal/node_modules/isarray/index.js ***!
	  \***************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("var toString = {}.toString;\n\nmodule.exports = Array.isArray || function (arr) {\n  return toString.call(arr) == '[object Array]';\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/deep-equal/node_modules/isarray/index.js?");

	/***/ }),

	/***/ "./node_modules/deep-equal/node_modules/object-keys/implementation.js":
	/*!****************************************************************************!*\
	  !*** ./node_modules/deep-equal/node_modules/object-keys/implementation.js ***!
	  \****************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar keysShim;\nif (!Object.keys) {\n\t// modified from https://github.com/es-shims/es5-shim\n\tvar has = Object.prototype.hasOwnProperty;\n\tvar toStr = Object.prototype.toString;\n\tvar isArgs = __webpack_require__(/*! ./isArguments */ \"./node_modules/deep-equal/node_modules/object-keys/isArguments.js\"); // eslint-disable-line global-require\n\tvar isEnumerable = Object.prototype.propertyIsEnumerable;\n\tvar hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');\n\tvar hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');\n\tvar dontEnums = [\n\t\t'toString',\n\t\t'toLocaleString',\n\t\t'valueOf',\n\t\t'hasOwnProperty',\n\t\t'isPrototypeOf',\n\t\t'propertyIsEnumerable',\n\t\t'constructor'\n\t];\n\tvar equalsConstructorPrototype = function (o) {\n\t\tvar ctor = o.constructor;\n\t\treturn ctor && ctor.prototype === o;\n\t};\n\tvar excludedKeys = {\n\t\t$applicationCache: true,\n\t\t$console: true,\n\t\t$external: true,\n\t\t$frame: true,\n\t\t$frameElement: true,\n\t\t$frames: true,\n\t\t$innerHeight: true,\n\t\t$innerWidth: true,\n\t\t$onmozfullscreenchange: true,\n\t\t$onmozfullscreenerror: true,\n\t\t$outerHeight: true,\n\t\t$outerWidth: true,\n\t\t$pageXOffset: true,\n\t\t$pageYOffset: true,\n\t\t$parent: true,\n\t\t$scrollLeft: true,\n\t\t$scrollTop: true,\n\t\t$scrollX: true,\n\t\t$scrollY: true,\n\t\t$self: true,\n\t\t$webkitIndexedDB: true,\n\t\t$webkitStorageInfo: true,\n\t\t$window: true\n\t};\n\tvar hasAutomationEqualityBug = (function () {\n\t\t/* global window */\n\t\tif (typeof window === 'undefined') { return false; }\n\t\tfor (var k in window) {\n\t\t\ttry {\n\t\t\t\tif (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {\n\t\t\t\t\ttry {\n\t\t\t\t\t\tequalsConstructorPrototype(window[k]);\n\t\t\t\t\t} catch (e) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} catch (e) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\treturn false;\n\t}());\n\tvar equalsConstructorPrototypeIfNotBuggy = function (o) {\n\t\t/* global window */\n\t\tif (typeof window === 'undefined' || !hasAutomationEqualityBug) {\n\t\t\treturn equalsConstructorPrototype(o);\n\t\t}\n\t\ttry {\n\t\t\treturn equalsConstructorPrototype(o);\n\t\t} catch (e) {\n\t\t\treturn false;\n\t\t}\n\t};\n\n\tkeysShim = function keys(object) {\n\t\tvar isObject = object !== null && typeof object === 'object';\n\t\tvar isFunction = toStr.call(object) === '[object Function]';\n\t\tvar isArguments = isArgs(object);\n\t\tvar isString = isObject && toStr.call(object) === '[object String]';\n\t\tvar theKeys = [];\n\n\t\tif (!isObject && !isFunction && !isArguments) {\n\t\t\tthrow new TypeError('Object.keys called on a non-object');\n\t\t}\n\n\t\tvar skipProto = hasProtoEnumBug && isFunction;\n\t\tif (isString && object.length > 0 && !has.call(object, 0)) {\n\t\t\tfor (var i = 0; i < object.length; ++i) {\n\t\t\t\ttheKeys.push(String(i));\n\t\t\t}\n\t\t}\n\n\t\tif (isArguments && object.length > 0) {\n\t\t\tfor (var j = 0; j < object.length; ++j) {\n\t\t\t\ttheKeys.push(String(j));\n\t\t\t}\n\t\t} else {\n\t\t\tfor (var name in object) {\n\t\t\t\tif (!(skipProto && name === 'prototype') && has.call(object, name)) {\n\t\t\t\t\ttheKeys.push(String(name));\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tif (hasDontEnumBug) {\n\t\t\tvar skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);\n\n\t\t\tfor (var k = 0; k < dontEnums.length; ++k) {\n\t\t\t\tif (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {\n\t\t\t\t\ttheKeys.push(dontEnums[k]);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn theKeys;\n\t};\n}\nmodule.exports = keysShim;\n\n\n//# sourceURL=webpack://Quill/./node_modules/deep-equal/node_modules/object-keys/implementation.js?");

	/***/ }),

	/***/ "./node_modules/deep-equal/node_modules/object-keys/index.js":
	/*!*******************************************************************!*\
	  !*** ./node_modules/deep-equal/node_modules/object-keys/index.js ***!
	  \*******************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar slice = Array.prototype.slice;\nvar isArgs = __webpack_require__(/*! ./isArguments */ \"./node_modules/deep-equal/node_modules/object-keys/isArguments.js\");\n\nvar origKeys = Object.keys;\nvar keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ \"./node_modules/deep-equal/node_modules/object-keys/implementation.js\");\n\nvar originalKeys = Object.keys;\n\nkeysShim.shim = function shimObjectKeys() {\n\tif (Object.keys) {\n\t\tvar keysWorksWithArguments = (function () {\n\t\t\t// Safari 5.0 bug\n\t\t\tvar args = Object.keys(arguments);\n\t\t\treturn args && args.length === arguments.length;\n\t\t}(1, 2));\n\t\tif (!keysWorksWithArguments) {\n\t\t\tObject.keys = function keys(object) { // eslint-disable-line func-name-matching\n\t\t\t\tif (isArgs(object)) {\n\t\t\t\t\treturn originalKeys(slice.call(object));\n\t\t\t\t}\n\t\t\t\treturn originalKeys(object);\n\t\t\t};\n\t\t}\n\t} else {\n\t\tObject.keys = keysShim;\n\t}\n\treturn Object.keys || keysShim;\n};\n\nmodule.exports = keysShim;\n\n\n//# sourceURL=webpack://Quill/./node_modules/deep-equal/node_modules/object-keys/index.js?");

	/***/ }),

	/***/ "./node_modules/deep-equal/node_modules/object-keys/isArguments.js":
	/*!*************************************************************************!*\
	  !*** ./node_modules/deep-equal/node_modules/object-keys/isArguments.js ***!
	  \*************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar toStr = Object.prototype.toString;\n\nmodule.exports = function isArguments(value) {\n\tvar str = toStr.call(value);\n\tvar isArgs = str === '[object Arguments]';\n\tif (!isArgs) {\n\t\tisArgs = str !== '[object Array]' &&\n\t\t\tvalue !== null &&\n\t\t\ttypeof value === 'object' &&\n\t\t\ttypeof value.length === 'number' &&\n\t\t\tvalue.length >= 0 &&\n\t\t\ttoStr.call(value.callee) === '[object Function]';\n\t}\n\treturn isArgs;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/deep-equal/node_modules/object-keys/isArguments.js?");

	/***/ }),

	/***/ "./node_modules/define-properties/index.js":
	/*!*************************************************!*\
	  !*** ./node_modules/define-properties/index.js ***!
	  \*************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar keys = __webpack_require__(/*! object-keys */ \"./node_modules/object-keys/index.js\");\nvar hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';\n\nvar toStr = Object.prototype.toString;\nvar concat = Array.prototype.concat;\nvar origDefineProperty = Object.defineProperty;\n\nvar isFunction = function (fn) {\n\treturn typeof fn === 'function' && toStr.call(fn) === '[object Function]';\n};\n\nvar arePropertyDescriptorsSupported = function () {\n\tvar obj = {};\n\ttry {\n\t\torigDefineProperty(obj, 'x', { enumerable: false, value: obj });\n\t\t// eslint-disable-next-line no-unused-vars, no-restricted-syntax\n\t\tfor (var _ in obj) { // jscs:ignore disallowUnusedVariables\n\t\t\treturn false;\n\t\t}\n\t\treturn obj.x === obj;\n\t} catch (e) { /* this is IE 8. */\n\t\treturn false;\n\t}\n};\nvar supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();\n\nvar defineProperty = function (object, name, value, predicate) {\n\tif (name in object && (!isFunction(predicate) || !predicate())) {\n\t\treturn;\n\t}\n\tif (supportsDescriptors) {\n\t\torigDefineProperty(object, name, {\n\t\t\tconfigurable: true,\n\t\t\tenumerable: false,\n\t\t\tvalue: value,\n\t\t\twritable: true\n\t\t});\n\t} else {\n\t\tobject[name] = value;\n\t}\n};\n\nvar defineProperties = function (object, map) {\n\tvar predicates = arguments.length > 2 ? arguments[2] : {};\n\tvar props = keys(map);\n\tif (hasSymbols) {\n\t\tprops = concat.call(props, Object.getOwnPropertySymbols(map));\n\t}\n\tfor (var i = 0; i < props.length; i += 1) {\n\t\tdefineProperty(object, props[i], map[props[i]], predicates[props[i]]);\n\t}\n};\n\ndefineProperties.supportsDescriptors = !!supportsDescriptors;\n\nmodule.exports = defineProperties;\n\n\n//# sourceURL=webpack://Quill/./node_modules/define-properties/index.js?");

	/***/ }),

	/***/ "./node_modules/es-get-iterator/index.js":
	/*!***********************************************!*\
	  !*** ./node_modules/es-get-iterator/index.js ***!
	  \***********************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("/* WEBPACK VAR INJECTION */(function(process) {\n\n/* eslint global-require: 0 */\n// the code is structured this way so that bundlers can\n// alias out `has-symbols` to `() => true` or `() => false` if your target\n// environments' Symbol capabilities are known, and then use\n// dead code elimination on the rest of this module.\n//\n// Similarly, `isarray` can be aliased to `Array.isArray` if\n// available in all target environments.\n\nvar isArguments = __webpack_require__(/*! is-arguments */ \"./node_modules/is-arguments/index.js\");\n\nif (__webpack_require__(/*! has-symbols */ \"./node_modules/has-symbols/index.js\")() || __webpack_require__(/*! has-symbols/shams */ \"./node_modules/has-symbols/shams.js\")()) {\n\tvar $iterator = Symbol.iterator;\n\t// Symbol is available natively or shammed\n\t// natively:\n\t//  - Chrome >= 38\n\t//  - Edge 12-14?, Edge >= 15 for sure\n\t//  - FF >= 36\n\t//  - Safari >= 9\n\t//  - node >= 0.12\n\tmodule.exports = function getIterator(iterable) {\n\t\t// alternatively, `iterable[$iterator]?.()`\n\t\tif (iterable != null && typeof iterable[$iterator] !== 'undefined') {\n\t\t\treturn iterable[$iterator]();\n\t\t}\n\t\tif (isArguments(iterable)) {\n\t\t\t// arguments objects lack Symbol.iterator\n\t\t\t// - node 0.12\n\t\t\treturn Array.prototype[$iterator].call(iterable);\n\t\t}\n\t};\n} else {\n\t// Symbol is not available, native or shammed\n\tvar isArray = __webpack_require__(/*! isarray */ \"./node_modules/es-get-iterator/node_modules/isarray/index.js\");\n\tvar isString = __webpack_require__(/*! is-string */ \"./node_modules/is-string/index.js\");\n\tvar GetIntrinsic = __webpack_require__(/*! es-abstract/GetIntrinsic */ \"./node_modules/es-get-iterator/node_modules/es-abstract/GetIntrinsic.js\");\n\tvar $Map = GetIntrinsic('%Map%', true);\n\tvar $Set = GetIntrinsic('%Set%', true);\n\tvar callBound = __webpack_require__(/*! es-abstract/helpers/callBound */ \"./node_modules/es-get-iterator/node_modules/es-abstract/helpers/callBound.js\");\n\tvar $arrayPush = callBound('Array.prototype.push');\n\tvar $charCodeAt = callBound('String.prototype.charCodeAt');\n\tvar $stringSlice = callBound('String.prototype.slice');\n\n\tvar advanceStringIndex = function advanceStringIndex(S, index) {\n\t\tvar length = S.length;\n\t\tif ((index + 1) >= length) {\n\t\t\treturn index + 1;\n\t\t}\n\n\t\tvar first = $charCodeAt(S, index);\n\t\tif (first < 0xD800 || first > 0xDBFF) {\n\t\t\treturn index + 1;\n\t\t}\n\n\t\tvar second = $charCodeAt(S, index + 1);\n\t\tif (second < 0xDC00 || second > 0xDFFF) {\n\t\t\treturn index + 1;\n\t\t}\n\n\t\treturn index + 2;\n\t};\n\n\tvar getArrayIterator = function getArrayIterator(arraylike) {\n\t\tvar i = 0;\n\t\treturn {\n\t\t\tnext: function next() {\n\t\t\t\tvar done = i >= arraylike.length;\n\t\t\t\tvar value;\n\t\t\t\tif (!done) {\n\t\t\t\t\tvalue = arraylike[i];\n\t\t\t\t\ti += 1;\n\t\t\t\t}\n\t\t\t\treturn {\n\t\t\t\t\tdone: done,\n\t\t\t\t\tvalue: value\n\t\t\t\t};\n\t\t\t}\n\t\t};\n\t};\n\n\tvar getNonCollectionIterator = function getNonCollectionIterator(iterable) {\n\t\tif (isArray(iterable) || isArguments(iterable)) {\n\t\t\treturn getArrayIterator(iterable);\n\t\t}\n\t\tif (isString(iterable)) {\n\t\t\tvar i = 0;\n\t\t\treturn {\n\t\t\t\tnext: function next() {\n\t\t\t\t\tvar nextIndex = advanceStringIndex(iterable, i);\n\t\t\t\t\tvar value = $stringSlice(iterable, i, nextIndex);\n\t\t\t\t\ti = nextIndex;\n\t\t\t\t\treturn {\n\t\t\t\t\t\tdone: nextIndex > iterable.length,\n\t\t\t\t\t\tvalue: value\n\t\t\t\t\t};\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\t};\n\n\tif (!$Map && !$Set) {\n\t\t// the only language iterables are Array, String, arguments\n\t\t// - Safari <= 6.0\n\t\t// - Chrome < 38\n\t\t// - node < 0.12\n\t\t// - FF < 13\n\t\t// - IE < 11\n\t\t// - Edge < 11\n\n\t\tmodule.exports = getNonCollectionIterator;\n\t} else {\n\t\t// either Map or Set are available, but Symbol is not\n\t\t// - es6-shim on an ES5 browser\n\t\t// - Safari 6.2 (maybe 6.1?)\n\t\t// - FF v[13, 36)\n\t\t// - IE 11\n\t\t// - Edge 11\n\t\t// - Safari v[6, 9)\n\n\t\tvar isMap = __webpack_require__(/*! is-map */ \"./node_modules/is-map/index.js\");\n\t\tvar isSet = __webpack_require__(/*! is-set */ \"./node_modules/is-set/index.js\");\n\n\t\t// Firefox >= 27, IE 11, Safari 6.2 - 9, Edge 11, es6-shim in older envs, all have forEach\n\t\tvar $mapForEach = callBound('Map.prototype.forEach', true);\n\t\tvar $setForEach = callBound('Set.prototype.forEach', true);\n\t\tif (typeof process === 'undefined' || !process.versions || !process.versions.node) { // \"if is not node\"\n\n\t\t\t// Firefox 17 - 26 has `.iterator()`, whose iterator `.next()` either\n\t\t\t// returns a value, or throws a StopIteration object. These browsers\n\t\t\t// do not have any other mechanism for iteration.\n\t\t\tvar $mapIterator = callBound('Map.prototype.iterator', true);\n\t\t\tvar $setIterator = callBound('Set.prototype.iterator', true);\n\t\t\tvar getStopIterationIterator = function (iterator) {\n\t\t\t\tvar done = false;\n\t\t\t\treturn {\n\t\t\t\t\tnext: function next() {\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\tdone: done,\n\t\t\t\t\t\t\t\tvalue: done ? undefined : iterator.next()\n\t\t\t\t\t\t\t};\n\t\t\t\t\t\t} catch (e) {\n\t\t\t\t\t\t\tdone = true;\n\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\tdone: true,\n\t\t\t\t\t\t\t\tvalue: undefined\n\t\t\t\t\t\t\t};\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t};\n\t\t}\n\t\t// Firefox 27-35, and some older es6-shim versions, use a string \"@@iterator\" property\n\t\t// this returns a proper iterator object, so we should use it instead of forEach.\n\t\t// newer es6-shim versions use a string \"_es6-shim iterator_\" property.\n\t\tvar $mapAtAtIterator = callBound('Map.prototype.@@iterator', true) || callBound('Map.prototype._es6-shim iterator_', true);\n\t\tvar $setAtAtIterator = callBound('Set.prototype.@@iterator', true) || callBound('Set.prototype._es6-shim iterator_', true);\n\n\t\tvar getCollectionIterator = function getCollectionIterator(iterable) {\n\t\t\tif (isMap(iterable)) {\n\t\t\t\tif ($mapIterator) {\n\t\t\t\t\treturn getStopIterationIterator($mapIterator(iterable));\n\t\t\t\t}\n\t\t\t\tif ($mapAtAtIterator) {\n\t\t\t\t\treturn $mapAtAtIterator(iterable);\n\t\t\t\t}\n\t\t\t\tif ($mapForEach) {\n\t\t\t\t\tvar entries = [];\n\t\t\t\t\t$mapForEach(iterable, function (v, k) {\n\t\t\t\t\t\t$arrayPush(entries, [k, v]);\n\t\t\t\t\t});\n\t\t\t\t\treturn getArrayIterator(entries);\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (isSet(iterable)) {\n\t\t\t\tif ($setIterator) {\n\t\t\t\t\treturn getStopIterationIterator($setIterator(iterable));\n\t\t\t\t}\n\t\t\t\tif ($setAtAtIterator) {\n\t\t\t\t\treturn $setAtAtIterator(iterable);\n\t\t\t\t}\n\t\t\t\tif ($setForEach) {\n\t\t\t\t\tvar values = [];\n\t\t\t\t\t$setForEach(iterable, function (v) {\n\t\t\t\t\t\t$arrayPush(values, v);\n\t\t\t\t\t});\n\t\t\t\t\treturn getArrayIterator(values);\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\tmodule.exports = function getIterator(iterable) {\n\t\t\treturn getCollectionIterator(iterable) || getNonCollectionIterator(iterable);\n\t\t};\n\t}\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack://Quill/./node_modules/es-get-iterator/index.js?");

	/***/ }),

	/***/ "./node_modules/es-get-iterator/node_modules/es-abstract/GetIntrinsic.js":
	/*!*******************************************************************************!*\
	  !*** ./node_modules/es-get-iterator/node_modules/es-abstract/GetIntrinsic.js ***!
	  \*******************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\n/* globals\n\tAtomics,\n\tSharedArrayBuffer,\n*/\n\nvar undefined;\n\nvar $TypeError = TypeError;\n\nvar $gOPD = Object.getOwnPropertyDescriptor;\nif ($gOPD) {\n\ttry {\n\t\t$gOPD({}, '');\n\t} catch (e) {\n\t\t$gOPD = null; // this is IE 8, which has a broken gOPD\n\t}\n}\n\nvar throwTypeError = function () { throw new $TypeError(); };\nvar ThrowTypeError = $gOPD\n\t? (function () {\n\t\ttry {\n\t\t\t// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties\n\t\t\targuments.callee; // IE 8 does not throw here\n\t\t\treturn throwTypeError;\n\t\t} catch (calleeThrows) {\n\t\t\ttry {\n\t\t\t\t// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')\n\t\t\t\treturn $gOPD(arguments, 'callee').get;\n\t\t\t} catch (gOPDthrows) {\n\t\t\t\treturn throwTypeError;\n\t\t\t}\n\t\t}\n\t}())\n\t: throwTypeError;\n\nvar hasSymbols = __webpack_require__(/*! has-symbols */ \"./node_modules/has-symbols/index.js\")();\n\nvar getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto\n\nvar generator; // = function * () {};\nvar generatorFunction = generator ? getProto(generator) : undefined;\nvar asyncFn; // async function() {};\nvar asyncFunction = asyncFn ? asyncFn.constructor : undefined;\nvar asyncGen; // async function * () {};\nvar asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;\nvar asyncGenIterator = asyncGen ? asyncGen() : undefined;\n\nvar TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);\n\nvar INTRINSICS = {\n\t'%Array%': Array,\n\t'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,\n\t'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,\n\t'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,\n\t'%ArrayPrototype%': Array.prototype,\n\t'%ArrayProto_entries%': Array.prototype.entries,\n\t'%ArrayProto_forEach%': Array.prototype.forEach,\n\t'%ArrayProto_keys%': Array.prototype.keys,\n\t'%ArrayProto_values%': Array.prototype.values,\n\t'%AsyncFromSyncIteratorPrototype%': undefined,\n\t'%AsyncFunction%': asyncFunction,\n\t'%AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,\n\t'%AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,\n\t'%AsyncGeneratorFunction%': asyncGenFunction,\n\t'%AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,\n\t'%AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,\n\t'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,\n\t'%Boolean%': Boolean,\n\t'%BooleanPrototype%': Boolean.prototype,\n\t'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,\n\t'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,\n\t'%Date%': Date,\n\t'%DatePrototype%': Date.prototype,\n\t'%decodeURI%': decodeURI,\n\t'%decodeURIComponent%': decodeURIComponent,\n\t'%encodeURI%': encodeURI,\n\t'%encodeURIComponent%': encodeURIComponent,\n\t'%Error%': Error,\n\t'%ErrorPrototype%': Error.prototype,\n\t'%eval%': eval, // eslint-disable-line no-eval\n\t'%EvalError%': EvalError,\n\t'%EvalErrorPrototype%': EvalError.prototype,\n\t'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,\n\t'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,\n\t'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,\n\t'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,\n\t'%Function%': Function,\n\t'%FunctionPrototype%': Function.prototype,\n\t'%Generator%': generator ? getProto(generator()) : undefined,\n\t'%GeneratorFunction%': generatorFunction,\n\t'%GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,\n\t'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,\n\t'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,\n\t'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,\n\t'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,\n\t'%isFinite%': isFinite,\n\t'%isNaN%': isNaN,\n\t'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,\n\t'%JSON%': typeof JSON === 'object' ? JSON : undefined,\n\t'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,\n\t'%Map%': typeof Map === 'undefined' ? undefined : Map,\n\t'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),\n\t'%MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,\n\t'%Math%': Math,\n\t'%Number%': Number,\n\t'%NumberPrototype%': Number.prototype,\n\t'%Object%': Object,\n\t'%ObjectPrototype%': Object.prototype,\n\t'%ObjProto_toString%': Object.prototype.toString,\n\t'%ObjProto_valueOf%': Object.prototype.valueOf,\n\t'%parseFloat%': parseFloat,\n\t'%parseInt%': parseInt,\n\t'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,\n\t'%PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,\n\t'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,\n\t'%Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,\n\t'%Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,\n\t'%Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,\n\t'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,\n\t'%RangeError%': RangeError,\n\t'%RangeErrorPrototype%': RangeError.prototype,\n\t'%ReferenceError%': ReferenceError,\n\t'%ReferenceErrorPrototype%': ReferenceError.prototype,\n\t'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,\n\t'%RegExp%': RegExp,\n\t'%RegExpPrototype%': RegExp.prototype,\n\t'%Set%': typeof Set === 'undefined' ? undefined : Set,\n\t'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),\n\t'%SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,\n\t'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,\n\t'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,\n\t'%String%': String,\n\t'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,\n\t'%StringPrototype%': String.prototype,\n\t'%Symbol%': hasSymbols ? Symbol : undefined,\n\t'%SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,\n\t'%SyntaxError%': SyntaxError,\n\t'%SyntaxErrorPrototype%': SyntaxError.prototype,\n\t'%ThrowTypeError%': ThrowTypeError,\n\t'%TypedArray%': TypedArray,\n\t'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,\n\t'%TypeError%': $TypeError,\n\t'%TypeErrorPrototype%': $TypeError.prototype,\n\t'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,\n\t'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,\n\t'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,\n\t'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,\n\t'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,\n\t'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,\n\t'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,\n\t'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,\n\t'%URIError%': URIError,\n\t'%URIErrorPrototype%': URIError.prototype,\n\t'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,\n\t'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,\n\t'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,\n\t'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype\n};\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\nvar $replace = bind.call(Function.call, String.prototype.replace);\n\n/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */\nvar rePropName = /[^%.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|%$))/g;\nvar reEscapeChar = /\\\\(\\\\)?/g; /** Used to match backslashes in property paths. */\nvar stringToPath = function stringToPath(string) {\n\tvar result = [];\n\t$replace(string, rePropName, function (match, number, quote, subString) {\n\t\tresult[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);\n\t});\n\treturn result;\n};\n/* end adaptation */\n\nvar getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {\n\tif (!(name in INTRINSICS)) {\n\t\tthrow new SyntaxError('intrinsic ' + name + ' does not exist!');\n\t}\n\n\t// istanbul ignore if // hopefully this is impossible to test :-)\n\tif (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {\n\t\tthrow new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');\n\t}\n\n\treturn INTRINSICS[name];\n};\n\nmodule.exports = function GetIntrinsic(name, allowMissing) {\n\tif (typeof name !== 'string' || name.length === 0) {\n\t\tthrow new TypeError('intrinsic name must be a non-empty string');\n\t}\n\tif (arguments.length > 1 && typeof allowMissing !== 'boolean') {\n\t\tthrow new TypeError('\"allowMissing\" argument must be a boolean');\n\t}\n\n\tvar parts = stringToPath(name);\n\n\tvar value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);\n\tfor (var i = 1; i < parts.length; i += 1) {\n\t\tif (value != null) {\n\t\t\tif ($gOPD && (i + 1) >= parts.length) {\n\t\t\t\tvar desc = $gOPD(value, parts[i]);\n\t\t\t\tif (!allowMissing && !(parts[i] in value)) {\n\t\t\t\t\tthrow new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');\n\t\t\t\t}\n\t\t\t\tvalue = desc ? (desc.get || desc.value) : value[parts[i]];\n\t\t\t} else {\n\t\t\t\tvalue = value[parts[i]];\n\t\t\t}\n\t\t}\n\t}\n\treturn value;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/es-get-iterator/node_modules/es-abstract/GetIntrinsic.js?");

	/***/ }),

	/***/ "./node_modules/es-get-iterator/node_modules/es-abstract/helpers/callBind.js":
	/*!***********************************************************************************!*\
	  !*** ./node_modules/es-get-iterator/node_modules/es-abstract/helpers/callBind.js ***!
	  \***********************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/es-get-iterator/node_modules/es-abstract/GetIntrinsic.js\");\n\nvar $Function = GetIntrinsic('%Function%');\nvar $apply = $Function.apply;\nvar $call = $Function.call;\n\nmodule.exports = function callBind() {\n\treturn bind.apply($call, arguments);\n};\n\nmodule.exports.apply = function applyBind() {\n\treturn bind.apply($apply, arguments);\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/es-get-iterator/node_modules/es-abstract/helpers/callBind.js?");

	/***/ }),

	/***/ "./node_modules/es-get-iterator/node_modules/es-abstract/helpers/callBound.js":
	/*!************************************************************************************!*\
	  !*** ./node_modules/es-get-iterator/node_modules/es-abstract/helpers/callBound.js ***!
	  \************************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/es-get-iterator/node_modules/es-abstract/GetIntrinsic.js\");\n\nvar callBind = __webpack_require__(/*! ./callBind */ \"./node_modules/es-get-iterator/node_modules/es-abstract/helpers/callBind.js\");\n\nvar $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));\n\nmodule.exports = function callBoundIntrinsic(name, allowMissing) {\n\tvar intrinsic = GetIntrinsic(name, !!allowMissing);\n\tif (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {\n\t\treturn callBind(intrinsic);\n\t}\n\treturn intrinsic;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/es-get-iterator/node_modules/es-abstract/helpers/callBound.js?");

	/***/ }),

	/***/ "./node_modules/es-get-iterator/node_modules/isarray/index.js":
	/*!********************************************************************!*\
	  !*** ./node_modules/es-get-iterator/node_modules/isarray/index.js ***!
	  \********************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("var toString = {}.toString;\n\nmodule.exports = Array.isArray || function (arr) {\n  return toString.call(arr) == '[object Array]';\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/es-get-iterator/node_modules/isarray/index.js?");

	/***/ }),

	/***/ "./node_modules/eventemitter3/index.js":
	/*!*********************************************!*\
	  !*** ./node_modules/eventemitter3/index.js ***!
	  \*********************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("'use strict';\n\nvar has = Object.prototype.hasOwnProperty\n  , prefix = '~';\n\n/**\n * Constructor to create a storage for our `EE` objects.\n * An `Events` instance is a plain object whose properties are event names.\n *\n * @constructor\n * @private\n */\nfunction Events() {}\n\n//\n// We try to not inherit from `Object.prototype`. In some engines creating an\n// instance in this way is faster than calling `Object.create(null)` directly.\n// If `Object.create(null)` is not supported we prefix the event names with a\n// character to make sure that the built-in object properties are not\n// overridden or used as an attack vector.\n//\nif (Object.create) {\n  Events.prototype = Object.create(null);\n\n  //\n  // This hack is needed because the `__proto__` property is still inherited in\n  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.\n  //\n  if (!new Events().__proto__) prefix = false;\n}\n\n/**\n * Representation of a single event listener.\n *\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} [once=false] Specify if the listener is a one-time listener.\n * @constructor\n * @private\n */\nfunction EE(fn, context, once) {\n  this.fn = fn;\n  this.context = context;\n  this.once = once || false;\n}\n\n/**\n * Add a listener for a given event.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} once Specify if the listener is a one-time listener.\n * @returns {EventEmitter}\n * @private\n */\nfunction addListener(emitter, event, fn, context, once) {\n  if (typeof fn !== 'function') {\n    throw new TypeError('The listener must be a function');\n  }\n\n  var listener = new EE(fn, context || emitter, once)\n    , evt = prefix ? prefix + event : event;\n\n  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;\n  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);\n  else emitter._events[evt] = [emitter._events[evt], listener];\n\n  return emitter;\n}\n\n/**\n * Clear event by name.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} evt The Event name.\n * @private\n */\nfunction clearEvent(emitter, evt) {\n  if (--emitter._eventsCount === 0) emitter._events = new Events();\n  else delete emitter._events[evt];\n}\n\n/**\n * Minimal `EventEmitter` interface that is molded against the Node.js\n * `EventEmitter` interface.\n *\n * @constructor\n * @public\n */\nfunction EventEmitter() {\n  this._events = new Events();\n  this._eventsCount = 0;\n}\n\n/**\n * Return an array listing the events for which the emitter has registered\n * listeners.\n *\n * @returns {Array}\n * @public\n */\nEventEmitter.prototype.eventNames = function eventNames() {\n  var names = []\n    , events\n    , name;\n\n  if (this._eventsCount === 0) return names;\n\n  for (name in (events = this._events)) {\n    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);\n  }\n\n  if (Object.getOwnPropertySymbols) {\n    return names.concat(Object.getOwnPropertySymbols(events));\n  }\n\n  return names;\n};\n\n/**\n * Return the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Array} The registered listeners.\n * @public\n */\nEventEmitter.prototype.listeners = function listeners(event) {\n  var evt = prefix ? prefix + event : event\n    , handlers = this._events[evt];\n\n  if (!handlers) return [];\n  if (handlers.fn) return [handlers.fn];\n\n  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {\n    ee[i] = handlers[i].fn;\n  }\n\n  return ee;\n};\n\n/**\n * Return the number of listeners listening to a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Number} The number of listeners.\n * @public\n */\nEventEmitter.prototype.listenerCount = function listenerCount(event) {\n  var evt = prefix ? prefix + event : event\n    , listeners = this._events[evt];\n\n  if (!listeners) return 0;\n  if (listeners.fn) return 1;\n  return listeners.length;\n};\n\n/**\n * Calls each of the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Boolean} `true` if the event had listeners, else `false`.\n * @public\n */\nEventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return false;\n\n  var listeners = this._events[evt]\n    , len = arguments.length\n    , args\n    , i;\n\n  if (listeners.fn) {\n    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);\n\n    switch (len) {\n      case 1: return listeners.fn.call(listeners.context), true;\n      case 2: return listeners.fn.call(listeners.context, a1), true;\n      case 3: return listeners.fn.call(listeners.context, a1, a2), true;\n      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;\n      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;\n      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;\n    }\n\n    for (i = 1, args = new Array(len -1); i < len; i++) {\n      args[i - 1] = arguments[i];\n    }\n\n    listeners.fn.apply(listeners.context, args);\n  } else {\n    var length = listeners.length\n      , j;\n\n    for (i = 0; i < length; i++) {\n      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);\n\n      switch (len) {\n        case 1: listeners[i].fn.call(listeners[i].context); break;\n        case 2: listeners[i].fn.call(listeners[i].context, a1); break;\n        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;\n        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;\n        default:\n          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {\n            args[j - 1] = arguments[j];\n          }\n\n          listeners[i].fn.apply(listeners[i].context, args);\n      }\n    }\n  }\n\n  return true;\n};\n\n/**\n * Add a listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.on = function on(event, fn, context) {\n  return addListener(this, event, fn, context, false);\n};\n\n/**\n * Add a one-time listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.once = function once(event, fn, context) {\n  return addListener(this, event, fn, context, true);\n};\n\n/**\n * Remove the listeners of a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn Only remove the listeners that match this function.\n * @param {*} context Only remove the listeners that have this context.\n * @param {Boolean} once Only remove one-time listeners.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return this;\n  if (!fn) {\n    clearEvent(this, evt);\n    return this;\n  }\n\n  var listeners = this._events[evt];\n\n  if (listeners.fn) {\n    if (\n      listeners.fn === fn &&\n      (!once || listeners.once) &&\n      (!context || listeners.context === context)\n    ) {\n      clearEvent(this, evt);\n    }\n  } else {\n    for (var i = 0, events = [], length = listeners.length; i < length; i++) {\n      if (\n        listeners[i].fn !== fn ||\n        (once && !listeners[i].once) ||\n        (context && listeners[i].context !== context)\n      ) {\n        events.push(listeners[i]);\n      }\n    }\n\n    //\n    // Reset the array, or remove it completely if we have no more listeners.\n    //\n    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;\n    else clearEvent(this, evt);\n  }\n\n  return this;\n};\n\n/**\n * Remove all listeners, or those of the specified event.\n *\n * @param {(String|Symbol)} [event] The event name.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {\n  var evt;\n\n  if (event) {\n    evt = prefix ? prefix + event : event;\n    if (this._events[evt]) clearEvent(this, evt);\n  } else {\n    this._events = new Events();\n    this._eventsCount = 0;\n  }\n\n  return this;\n};\n\n//\n// Alias methods names because people roll like that.\n//\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\nEventEmitter.prototype.addListener = EventEmitter.prototype.on;\n\n//\n// Expose the prefix.\n//\nEventEmitter.prefixed = prefix;\n\n//\n// Allow `EventEmitter` to be imported as module namespace.\n//\nEventEmitter.EventEmitter = EventEmitter;\n\n//\n// Expose the module.\n//\nif ('undefined' !== typeof module) {\n  module.exports = EventEmitter;\n}\n\n\n//# sourceURL=webpack://Quill/./node_modules/eventemitter3/index.js?");

	/***/ }),

	/***/ "./node_modules/extend/index.js":
	/*!**************************************!*\
	  !*** ./node_modules/extend/index.js ***!
	  \**************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("'use strict';\n\nvar hasOwn = Object.prototype.hasOwnProperty;\nvar toStr = Object.prototype.toString;\nvar defineProperty = Object.defineProperty;\nvar gOPD = Object.getOwnPropertyDescriptor;\n\nvar isArray = function isArray(arr) {\n\tif (typeof Array.isArray === 'function') {\n\t\treturn Array.isArray(arr);\n\t}\n\n\treturn toStr.call(arr) === '[object Array]';\n};\n\nvar isPlainObject = function isPlainObject(obj) {\n\tif (!obj || toStr.call(obj) !== '[object Object]') {\n\t\treturn false;\n\t}\n\n\tvar hasOwnConstructor = hasOwn.call(obj, 'constructor');\n\tvar hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');\n\t// Not own constructor property must be Object\n\tif (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {\n\t\treturn false;\n\t}\n\n\t// Own properties are enumerated firstly, so to speed up,\n\t// if last one is own, then all properties are own.\n\tvar key;\n\tfor (key in obj) { /**/ }\n\n\treturn typeof key === 'undefined' || hasOwn.call(obj, key);\n};\n\n// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target\nvar setProperty = function setProperty(target, options) {\n\tif (defineProperty && options.name === '__proto__') {\n\t\tdefineProperty(target, options.name, {\n\t\t\tenumerable: true,\n\t\t\tconfigurable: true,\n\t\t\tvalue: options.newValue,\n\t\t\twritable: true\n\t\t});\n\t} else {\n\t\ttarget[options.name] = options.newValue;\n\t}\n};\n\n// Return undefined instead of __proto__ if '__proto__' is not an own property\nvar getProperty = function getProperty(obj, name) {\n\tif (name === '__proto__') {\n\t\tif (!hasOwn.call(obj, name)) {\n\t\t\treturn void 0;\n\t\t} else if (gOPD) {\n\t\t\t// In early versions of node, obj['__proto__'] is buggy when obj has\n\t\t\t// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.\n\t\t\treturn gOPD(obj, name).value;\n\t\t}\n\t}\n\n\treturn obj[name];\n};\n\nmodule.exports = function extend() {\n\tvar options, name, src, copy, copyIsArray, clone;\n\tvar target = arguments[0];\n\tvar i = 1;\n\tvar length = arguments.length;\n\tvar deep = false;\n\n\t// Handle a deep copy situation\n\tif (typeof target === 'boolean') {\n\t\tdeep = target;\n\t\ttarget = arguments[1] || {};\n\t\t// skip the boolean and the target\n\t\ti = 2;\n\t}\n\tif (target == null || (typeof target !== 'object' && typeof target !== 'function')) {\n\t\ttarget = {};\n\t}\n\n\tfor (; i < length; ++i) {\n\t\toptions = arguments[i];\n\t\t// Only deal with non-null/undefined values\n\t\tif (options != null) {\n\t\t\t// Extend the base object\n\t\t\tfor (name in options) {\n\t\t\t\tsrc = getProperty(target, name);\n\t\t\t\tcopy = getProperty(options, name);\n\n\t\t\t\t// Prevent never-ending loop\n\t\t\t\tif (target !== copy) {\n\t\t\t\t\t// Recurse if we're merging plain objects or arrays\n\t\t\t\t\tif (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {\n\t\t\t\t\t\tif (copyIsArray) {\n\t\t\t\t\t\t\tcopyIsArray = false;\n\t\t\t\t\t\t\tclone = src && isArray(src) ? src : [];\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tclone = src && isPlainObject(src) ? src : {};\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Never move original objects, clone them\n\t\t\t\t\t\tsetProperty(target, { name: name, newValue: extend(deep, clone, copy) });\n\n\t\t\t\t\t// Don't bring in undefined values\n\t\t\t\t\t} else if (typeof copy !== 'undefined') {\n\t\t\t\t\t\tsetProperty(target, { name: name, newValue: copy });\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t// Return the modified object\n\treturn target;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/extend/index.js?");

	/***/ }),

	/***/ "./node_modules/fast-diff/diff.js":
	/*!****************************************!*\
	  !*** ./node_modules/fast-diff/diff.js ***!
	  \****************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("/**\n * This library modifies the diff-patch-match library by Neil Fraser\n * by removing the patch and match functionality and certain advanced\n * options in the diff function. The original license is as follows:\n *\n * ===\n *\n * Diff Match and Patch\n *\n * Copyright 2006 Google Inc.\n * http://code.google.com/p/google-diff-match-patch/\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n */\n\n\n/**\n * The data structure representing a diff is an array of tuples:\n * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]\n * which means: delete 'Hello', add 'Goodbye' and keep ' world.'\n */\nvar DIFF_DELETE = -1;\nvar DIFF_INSERT = 1;\nvar DIFF_EQUAL = 0;\n\n\n/**\n * Find the differences between two texts.  Simplifies the problem by stripping\n * any common prefix or suffix off the texts before diffing.\n * @param {string} text1 Old string to be diffed.\n * @param {string} text2 New string to be diffed.\n * @param {Int|Object} [cursor_pos] Edit position in text1 or object with more info\n * @return {Array} Array of diff tuples.\n */\nfunction diff_main(text1, text2, cursor_pos, _fix_unicode) {\n  // Check for equality\n  if (text1 === text2) {\n    if (text1) {\n      return [[DIFF_EQUAL, text1]];\n    }\n    return [];\n  }\n\n  if (cursor_pos != null) {\n    var editdiff = find_cursor_edit_diff(text1, text2, cursor_pos);\n    if (editdiff) {\n      return editdiff;\n    }\n  }\n\n  // Trim off common prefix (speedup).\n  var commonlength = diff_commonPrefix(text1, text2);\n  var commonprefix = text1.substring(0, commonlength);\n  text1 = text1.substring(commonlength);\n  text2 = text2.substring(commonlength);\n\n  // Trim off common suffix (speedup).\n  commonlength = diff_commonSuffix(text1, text2);\n  var commonsuffix = text1.substring(text1.length - commonlength);\n  text1 = text1.substring(0, text1.length - commonlength);\n  text2 = text2.substring(0, text2.length - commonlength);\n\n  // Compute the diff on the middle block.\n  var diffs = diff_compute_(text1, text2);\n\n  // Restore the prefix and suffix.\n  if (commonprefix) {\n    diffs.unshift([DIFF_EQUAL, commonprefix]);\n  }\n  if (commonsuffix) {\n    diffs.push([DIFF_EQUAL, commonsuffix]);\n  }\n  diff_cleanupMerge(diffs, _fix_unicode);\n  return diffs;\n};\n\n\n/**\n * Find the differences between two texts.  Assumes that the texts do not\n * have any common prefix or suffix.\n * @param {string} text1 Old string to be diffed.\n * @param {string} text2 New string to be diffed.\n * @return {Array} Array of diff tuples.\n */\nfunction diff_compute_(text1, text2) {\n  var diffs;\n\n  if (!text1) {\n    // Just add some text (speedup).\n    return [[DIFF_INSERT, text2]];\n  }\n\n  if (!text2) {\n    // Just delete some text (speedup).\n    return [[DIFF_DELETE, text1]];\n  }\n\n  var longtext = text1.length > text2.length ? text1 : text2;\n  var shorttext = text1.length > text2.length ? text2 : text1;\n  var i = longtext.indexOf(shorttext);\n  if (i !== -1) {\n    // Shorter text is inside the longer text (speedup).\n    diffs = [\n      [DIFF_INSERT, longtext.substring(0, i)],\n      [DIFF_EQUAL, shorttext],\n      [DIFF_INSERT, longtext.substring(i + shorttext.length)]\n    ];\n    // Swap insertions for deletions if diff is reversed.\n    if (text1.length > text2.length) {\n      diffs[0][0] = diffs[2][0] = DIFF_DELETE;\n    }\n    return diffs;\n  }\n\n  if (shorttext.length === 1) {\n    // Single character string.\n    // After the previous speedup, the character can't be an equality.\n    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];\n  }\n\n  // Check to see if the problem can be split in two.\n  var hm = diff_halfMatch_(text1, text2);\n  if (hm) {\n    // A half-match was found, sort out the return data.\n    var text1_a = hm[0];\n    var text1_b = hm[1];\n    var text2_a = hm[2];\n    var text2_b = hm[3];\n    var mid_common = hm[4];\n    // Send both pairs off for separate processing.\n    var diffs_a = diff_main(text1_a, text2_a);\n    var diffs_b = diff_main(text1_b, text2_b);\n    // Merge the results.\n    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);\n  }\n\n  return diff_bisect_(text1, text2);\n};\n\n\n/**\n * Find the 'middle snake' of a diff, split the problem in two\n * and return the recursively constructed diff.\n * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.\n * @param {string} text1 Old string to be diffed.\n * @param {string} text2 New string to be diffed.\n * @return {Array} Array of diff tuples.\n * @private\n */\nfunction diff_bisect_(text1, text2) {\n  // Cache the text lengths to prevent multiple calls.\n  var text1_length = text1.length;\n  var text2_length = text2.length;\n  var max_d = Math.ceil((text1_length + text2_length) / 2);\n  var v_offset = max_d;\n  var v_length = 2 * max_d;\n  var v1 = new Array(v_length);\n  var v2 = new Array(v_length);\n  // Setting all elements to -1 is faster in Chrome & Firefox than mixing\n  // integers and undefined.\n  for (var x = 0; x < v_length; x++) {\n    v1[x] = -1;\n    v2[x] = -1;\n  }\n  v1[v_offset + 1] = 0;\n  v2[v_offset + 1] = 0;\n  var delta = text1_length - text2_length;\n  // If the total number of characters is odd, then the front path will collide\n  // with the reverse path.\n  var front = (delta % 2 !== 0);\n  // Offsets for start and end of k loop.\n  // Prevents mapping of space beyond the grid.\n  var k1start = 0;\n  var k1end = 0;\n  var k2start = 0;\n  var k2end = 0;\n  for (var d = 0; d < max_d; d++) {\n    // Walk the front path one step.\n    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {\n      var k1_offset = v_offset + k1;\n      var x1;\n      if (k1 === -d || (k1 !== d && v1[k1_offset - 1] < v1[k1_offset + 1])) {\n        x1 = v1[k1_offset + 1];\n      } else {\n        x1 = v1[k1_offset - 1] + 1;\n      }\n      var y1 = x1 - k1;\n      while (\n        x1 < text1_length && y1 < text2_length &&\n        text1.charAt(x1) === text2.charAt(y1)\n      ) {\n        x1++;\n        y1++;\n      }\n      v1[k1_offset] = x1;\n      if (x1 > text1_length) {\n        // Ran off the right of the graph.\n        k1end += 2;\n      } else if (y1 > text2_length) {\n        // Ran off the bottom of the graph.\n        k1start += 2;\n      } else if (front) {\n        var k2_offset = v_offset + delta - k1;\n        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] !== -1) {\n          // Mirror x2 onto top-left coordinate system.\n          var x2 = text1_length - v2[k2_offset];\n          if (x1 >= x2) {\n            // Overlap detected.\n            return diff_bisectSplit_(text1, text2, x1, y1);\n          }\n        }\n      }\n    }\n\n    // Walk the reverse path one step.\n    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {\n      var k2_offset = v_offset + k2;\n      var x2;\n      if (k2 === -d || (k2 !== d && v2[k2_offset - 1] < v2[k2_offset + 1])) {\n        x2 = v2[k2_offset + 1];\n      } else {\n        x2 = v2[k2_offset - 1] + 1;\n      }\n      var y2 = x2 - k2;\n      while (\n        x2 < text1_length && y2 < text2_length &&\n        text1.charAt(text1_length - x2 - 1) === text2.charAt(text2_length - y2 - 1)\n      ) {\n        x2++;\n        y2++;\n      }\n      v2[k2_offset] = x2;\n      if (x2 > text1_length) {\n        // Ran off the left of the graph.\n        k2end += 2;\n      } else if (y2 > text2_length) {\n        // Ran off the top of the graph.\n        k2start += 2;\n      } else if (!front) {\n        var k1_offset = v_offset + delta - k2;\n        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] !== -1) {\n          var x1 = v1[k1_offset];\n          var y1 = v_offset + x1 - k1_offset;\n          // Mirror x2 onto top-left coordinate system.\n          x2 = text1_length - x2;\n          if (x1 >= x2) {\n            // Overlap detected.\n            return diff_bisectSplit_(text1, text2, x1, y1);\n          }\n        }\n      }\n    }\n  }\n  // Diff took too long and hit the deadline or\n  // number of diffs equals number of characters, no commonality at all.\n  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];\n};\n\n\n/**\n * Given the location of the 'middle snake', split the diff in two parts\n * and recurse.\n * @param {string} text1 Old string to be diffed.\n * @param {string} text2 New string to be diffed.\n * @param {number} x Index of split point in text1.\n * @param {number} y Index of split point in text2.\n * @return {Array} Array of diff tuples.\n */\nfunction diff_bisectSplit_(text1, text2, x, y) {\n  var text1a = text1.substring(0, x);\n  var text2a = text2.substring(0, y);\n  var text1b = text1.substring(x);\n  var text2b = text2.substring(y);\n\n  // Compute both diffs serially.\n  var diffs = diff_main(text1a, text2a);\n  var diffsb = diff_main(text1b, text2b);\n\n  return diffs.concat(diffsb);\n};\n\n\n/**\n * Determine the common prefix of two strings.\n * @param {string} text1 First string.\n * @param {string} text2 Second string.\n * @return {number} The number of characters common to the start of each\n *     string.\n */\nfunction diff_commonPrefix(text1, text2) {\n  // Quick check for common null cases.\n  if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {\n    return 0;\n  }\n  // Binary search.\n  // Performance analysis: http://neil.fraser.name/news/2007/10/09/\n  var pointermin = 0;\n  var pointermax = Math.min(text1.length, text2.length);\n  var pointermid = pointermax;\n  var pointerstart = 0;\n  while (pointermin < pointermid) {\n    if (\n      text1.substring(pointerstart, pointermid) ==\n      text2.substring(pointerstart, pointermid)\n    ) {\n      pointermin = pointermid;\n      pointerstart = pointermin;\n    } else {\n      pointermax = pointermid;\n    }\n    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);\n  }\n\n  if (is_surrogate_pair_start(text1.charCodeAt(pointermid - 1))) {\n    pointermid--;\n  }\n\n  return pointermid;\n};\n\n\n/**\n * Determine the common suffix of two strings.\n * @param {string} text1 First string.\n * @param {string} text2 Second string.\n * @return {number} The number of characters common to the end of each string.\n */\nfunction diff_commonSuffix(text1, text2) {\n  // Quick check for common null cases.\n  if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) {\n    return 0;\n  }\n  // Binary search.\n  // Performance analysis: http://neil.fraser.name/news/2007/10/09/\n  var pointermin = 0;\n  var pointermax = Math.min(text1.length, text2.length);\n  var pointermid = pointermax;\n  var pointerend = 0;\n  while (pointermin < pointermid) {\n    if (\n      text1.substring(text1.length - pointermid, text1.length - pointerend) ==\n      text2.substring(text2.length - pointermid, text2.length - pointerend)\n    ) {\n      pointermin = pointermid;\n      pointerend = pointermin;\n    } else {\n      pointermax = pointermid;\n    }\n    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);\n  }\n\n  if (is_surrogate_pair_end(text1.charCodeAt(text1.length - pointermid))) {\n    pointermid--;\n  }\n\n  return pointermid;\n};\n\n\n/**\n * Do the two texts share a substring which is at least half the length of the\n * longer text?\n * This speedup can produce non-minimal diffs.\n * @param {string} text1 First string.\n * @param {string} text2 Second string.\n * @return {Array.<string>} Five element Array, containing the prefix of\n *     text1, the suffix of text1, the prefix of text2, the suffix of\n *     text2 and the common middle.  Or null if there was no match.\n */\nfunction diff_halfMatch_(text1, text2) {\n  var longtext = text1.length > text2.length ? text1 : text2;\n  var shorttext = text1.length > text2.length ? text2 : text1;\n  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {\n    return null;  // Pointless.\n  }\n\n  /**\n   * Does a substring of shorttext exist within longtext such that the substring\n   * is at least half the length of longtext?\n   * Closure, but does not reference any external variables.\n   * @param {string} longtext Longer string.\n   * @param {string} shorttext Shorter string.\n   * @param {number} i Start index of quarter length substring within longtext.\n   * @return {Array.<string>} Five element Array, containing the prefix of\n   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix\n   *     of shorttext and the common middle.  Or null if there was no match.\n   * @private\n   */\n  function diff_halfMatchI_(longtext, shorttext, i) {\n    // Start with a 1/4 length substring at position i as a seed.\n    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));\n    var j = -1;\n    var best_common = '';\n    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;\n    while ((j = shorttext.indexOf(seed, j + 1)) !== -1) {\n      var prefixLength = diff_commonPrefix(\n        longtext.substring(i), shorttext.substring(j));\n      var suffixLength = diff_commonSuffix(\n        longtext.substring(0, i), shorttext.substring(0, j));\n      if (best_common.length < suffixLength + prefixLength) {\n        best_common = shorttext.substring(\n          j - suffixLength, j) + shorttext.substring(j, j + prefixLength);\n        best_longtext_a = longtext.substring(0, i - suffixLength);\n        best_longtext_b = longtext.substring(i + prefixLength);\n        best_shorttext_a = shorttext.substring(0, j - suffixLength);\n        best_shorttext_b = shorttext.substring(j + prefixLength);\n      }\n    }\n    if (best_common.length * 2 >= longtext.length) {\n      return [\n        best_longtext_a, best_longtext_b,\n        best_shorttext_a, best_shorttext_b, best_common\n      ];\n    } else {\n      return null;\n    }\n  }\n\n  // First check if the second quarter is the seed for a half-match.\n  var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));\n  // Check again based on the third quarter.\n  var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));\n  var hm;\n  if (!hm1 && !hm2) {\n    return null;\n  } else if (!hm2) {\n    hm = hm1;\n  } else if (!hm1) {\n    hm = hm2;\n  } else {\n    // Both matched.  Select the longest.\n    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;\n  }\n\n  // A half-match was found, sort out the return data.\n  var text1_a, text1_b, text2_a, text2_b;\n  if (text1.length > text2.length) {\n    text1_a = hm[0];\n    text1_b = hm[1];\n    text2_a = hm[2];\n    text2_b = hm[3];\n  } else {\n    text2_a = hm[0];\n    text2_b = hm[1];\n    text1_a = hm[2];\n    text1_b = hm[3];\n  }\n  var mid_common = hm[4];\n  return [text1_a, text1_b, text2_a, text2_b, mid_common];\n};\n\n\n/**\n * Reorder and merge like edit sections.  Merge equalities.\n * Any edit section can move as long as it doesn't cross an equality.\n * @param {Array} diffs Array of diff tuples.\n * @param {boolean} fix_unicode Whether to normalize to a unicode-correct diff\n */\nfunction diff_cleanupMerge(diffs, fix_unicode) {\n  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.\n  var pointer = 0;\n  var count_delete = 0;\n  var count_insert = 0;\n  var text_delete = '';\n  var text_insert = '';\n  var commonlength;\n  while (pointer < diffs.length) {\n    if (pointer < diffs.length - 1 && !diffs[pointer][1]) {\n      diffs.splice(pointer, 1);\n      continue;\n    }\n    switch (diffs[pointer][0]) {\n      case DIFF_INSERT:\n\n        count_insert++;\n        text_insert += diffs[pointer][1];\n        pointer++;\n        break;\n      case DIFF_DELETE:\n        count_delete++;\n        text_delete += diffs[pointer][1];\n        pointer++;\n        break;\n      case DIFF_EQUAL:\n        var previous_equality = pointer - count_insert - count_delete - 1;\n        if (fix_unicode) {\n          // prevent splitting of unicode surrogate pairs.  when fix_unicode is true,\n          // we assume that the old and new text in the diff are complete and correct\n          // unicode-encoded JS strings, but the tuple boundaries may fall between\n          // surrogate pairs.  we fix this by shaving off stray surrogates from the end\n          // of the previous equality and the beginning of this equality.  this may create\n          // empty equalities or a common prefix or suffix.  for example, if AB and AC are\n          // emojis, `[[0, 'A'], [-1, 'BA'], [0, 'C']]` would turn into deleting 'ABAC' and\n          // inserting 'AC', and then the common suffix 'AC' will be eliminated.  in this\n          // particular case, both equalities go away, we absorb any previous inequalities,\n          // and we keep scanning for the next equality before rewriting the tuples.\n          if (previous_equality >= 0 && ends_with_pair_start(diffs[previous_equality][1])) {\n            var stray = diffs[previous_equality][1].slice(-1);\n            diffs[previous_equality][1] = diffs[previous_equality][1].slice(0, -1);\n            text_delete = stray + text_delete;\n            text_insert = stray + text_insert;\n            if (!diffs[previous_equality][1]) {\n              // emptied out previous equality, so delete it and include previous delete/insert\n              diffs.splice(previous_equality, 1);\n              pointer--;\n              var k = previous_equality - 1;\n              if (diffs[k] && diffs[k][0] === DIFF_INSERT) {\n                count_insert++;\n                text_insert = diffs[k][1] + text_insert;\n                k--;\n              }\n              if (diffs[k] && diffs[k][0] === DIFF_DELETE) {\n                count_delete++;\n                text_delete = diffs[k][1] + text_delete;\n                k--;\n              }\n              previous_equality = k;\n            }\n          }\n          if (starts_with_pair_end(diffs[pointer][1])) {\n            var stray = diffs[pointer][1].charAt(0);\n            diffs[pointer][1] = diffs[pointer][1].slice(1);\n            text_delete += stray;\n            text_insert += stray;\n          }\n        }\n        if (pointer < diffs.length - 1 && !diffs[pointer][1]) {\n          // for empty equality not at end, wait for next equality\n          diffs.splice(pointer, 1);\n          break;\n        }\n        if (text_delete.length > 0 || text_insert.length > 0) {\n          // note that diff_commonPrefix and diff_commonSuffix are unicode-aware\n          if (text_delete.length > 0 && text_insert.length > 0) {\n            // Factor out any common prefixes.\n            commonlength = diff_commonPrefix(text_insert, text_delete);\n            if (commonlength !== 0) {\n              if (previous_equality >= 0) {\n                diffs[previous_equality][1] += text_insert.substring(0, commonlength);\n              } else {\n                diffs.splice(0, 0, [DIFF_EQUAL, text_insert.substring(0, commonlength)]);\n                pointer++;\n              }\n              text_insert = text_insert.substring(commonlength);\n              text_delete = text_delete.substring(commonlength);\n            }\n            // Factor out any common suffixes.\n            commonlength = diff_commonSuffix(text_insert, text_delete);\n            if (commonlength !== 0) {\n              diffs[pointer][1] =\n                text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];\n              text_insert = text_insert.substring(0, text_insert.length - commonlength);\n              text_delete = text_delete.substring(0, text_delete.length - commonlength);\n            }\n          }\n          // Delete the offending records and add the merged ones.\n          var n = count_insert + count_delete;\n          if (text_delete.length === 0 && text_insert.length === 0) {\n            diffs.splice(pointer - n, n);\n            pointer = pointer - n;\n          } else if (text_delete.length === 0) {\n            diffs.splice(pointer - n, n, [DIFF_INSERT, text_insert]);\n            pointer = pointer - n + 1;\n          } else if (text_insert.length === 0) {\n            diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete]);\n            pointer = pointer - n + 1;\n          } else {\n            diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete], [DIFF_INSERT, text_insert]);\n            pointer = pointer - n + 2;\n          }\n        }\n        if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {\n          // Merge this equality with the previous one.\n          diffs[pointer - 1][1] += diffs[pointer][1];\n          diffs.splice(pointer, 1);\n        } else {\n          pointer++;\n        }\n        count_insert = 0;\n        count_delete = 0;\n        text_delete = '';\n        text_insert = '';\n        break;\n    }\n  }\n  if (diffs[diffs.length - 1][1] === '') {\n    diffs.pop();  // Remove the dummy entry at the end.\n  }\n\n  // Second pass: look for single edits surrounded on both sides by equalities\n  // which can be shifted sideways to eliminate an equality.\n  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC\n  var changes = false;\n  pointer = 1;\n  // Intentionally ignore the first and last element (don't need checking).\n  while (pointer < diffs.length - 1) {\n    if (diffs[pointer - 1][0] === DIFF_EQUAL &&\n      diffs[pointer + 1][0] === DIFF_EQUAL) {\n      // This is a single edit surrounded by equalities.\n      if (diffs[pointer][1].substring(diffs[pointer][1].length -\n        diffs[pointer - 1][1].length) === diffs[pointer - 1][1]) {\n        // Shift the edit over the previous equality.\n        diffs[pointer][1] = diffs[pointer - 1][1] +\n          diffs[pointer][1].substring(0, diffs[pointer][1].length -\n            diffs[pointer - 1][1].length);\n        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];\n        diffs.splice(pointer - 1, 1);\n        changes = true;\n      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==\n        diffs[pointer + 1][1]) {\n        // Shift the edit over the next equality.\n        diffs[pointer - 1][1] += diffs[pointer + 1][1];\n        diffs[pointer][1] =\n          diffs[pointer][1].substring(diffs[pointer + 1][1].length) +\n          diffs[pointer + 1][1];\n        diffs.splice(pointer + 1, 1);\n        changes = true;\n      }\n    }\n    pointer++;\n  }\n  // If shifts were made, the diff needs reordering and another shift sweep.\n  if (changes) {\n    diff_cleanupMerge(diffs, fix_unicode);\n  }\n};\n\nfunction is_surrogate_pair_start(charCode) {\n  return charCode >= 0xD800 && charCode <= 0xDBFF;\n}\n\nfunction is_surrogate_pair_end(charCode) {\n  return charCode >= 0xDC00 && charCode <= 0xDFFF;\n}\n\nfunction starts_with_pair_end(str) {\n  return is_surrogate_pair_end(str.charCodeAt(0));\n}\n\nfunction ends_with_pair_start(str) {\n  return is_surrogate_pair_start(str.charCodeAt(str.length - 1));\n}\n\nfunction remove_empty_tuples(tuples) {\n  var ret = [];\n  for (var i = 0; i < tuples.length; i++) {\n    if (tuples[i][1].length > 0) {\n      ret.push(tuples[i]);\n    }\n  }\n  return ret;\n}\n\nfunction make_edit_splice(before, oldMiddle, newMiddle, after) {\n  if (ends_with_pair_start(before) || starts_with_pair_end(after)) {\n    return null;\n  }\n  return remove_empty_tuples([\n    [DIFF_EQUAL, before],\n    [DIFF_DELETE, oldMiddle],\n    [DIFF_INSERT, newMiddle],\n    [DIFF_EQUAL, after]\n  ]);\n}\n\nfunction find_cursor_edit_diff(oldText, newText, cursor_pos) {\n  // note: this runs after equality check has ruled out exact equality\n  var oldRange = typeof cursor_pos === 'number' ?\n    { index: cursor_pos, length: 0 } : cursor_pos.oldRange;\n  var newRange = typeof cursor_pos === 'number' ?\n    null : cursor_pos.newRange;\n  // take into account the old and new selection to generate the best diff\n  // possible for a text edit.  for example, a text change from \"xxx\" to \"xx\"\n  // could be a delete or forwards-delete of any one of the x's, or the\n  // result of selecting two of the x's and typing \"x\".\n  var oldLength = oldText.length;\n  var newLength = newText.length;\n  if (oldRange.length === 0 && (newRange === null || newRange.length === 0)) {\n    // see if we have an insert or delete before or after cursor\n    var oldCursor = oldRange.index;\n    var oldBefore = oldText.slice(0, oldCursor);\n    var oldAfter = oldText.slice(oldCursor);\n    var maybeNewCursor = newRange ? newRange.index : null;\n    editBefore: {\n      // is this an insert or delete right before oldCursor?\n      var newCursor = oldCursor + newLength - oldLength;\n      if (maybeNewCursor !== null && maybeNewCursor !== newCursor) {\n        break editBefore;\n      }\n      if (newCursor < 0 || newCursor > newLength) {\n        break editBefore;\n      }\n      var newBefore = newText.slice(0, newCursor);\n      var newAfter = newText.slice(newCursor);\n      if (newAfter !== oldAfter) {\n        break editBefore;\n      }\n      var prefixLength = Math.min(oldCursor, newCursor);\n      var oldPrefix = oldBefore.slice(0, prefixLength);\n      var newPrefix = newBefore.slice(0, prefixLength);\n      if (oldPrefix !== newPrefix) {\n        break editBefore;\n      }\n      var oldMiddle = oldBefore.slice(prefixLength);\n      var newMiddle = newBefore.slice(prefixLength);\n      return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldAfter);\n    }\n    editAfter: {\n      // is this an insert or delete right after oldCursor?\n      if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) {\n        break editAfter;\n      }\n      var cursor = oldCursor;\n      var newBefore = newText.slice(0, cursor);\n      var newAfter = newText.slice(cursor);\n      if (newBefore !== oldBefore) {\n        break editAfter;\n      }\n      var suffixLength = Math.min(oldLength - cursor, newLength - cursor);\n      var oldSuffix = oldAfter.slice(oldAfter.length - suffixLength);\n      var newSuffix = newAfter.slice(newAfter.length - suffixLength);\n      if (oldSuffix !== newSuffix) {\n        break editAfter;\n      }\n      var oldMiddle = oldAfter.slice(0, oldAfter.length - suffixLength);\n      var newMiddle = newAfter.slice(0, newAfter.length - suffixLength);\n      return make_edit_splice(oldBefore, oldMiddle, newMiddle, oldSuffix);\n    }\n  }\n  if (oldRange.length > 0 && newRange && newRange.length === 0) {\n    replaceRange: {\n      // see if diff could be a splice of the old selection range\n      var oldPrefix = oldText.slice(0, oldRange.index);\n      var oldSuffix = oldText.slice(oldRange.index + oldRange.length);\n      var prefixLength = oldPrefix.length;\n      var suffixLength = oldSuffix.length;\n      if (newLength < prefixLength + suffixLength) {\n        break replaceRange;\n      }\n      var newPrefix = newText.slice(0, prefixLength);\n      var newSuffix = newText.slice(newLength - suffixLength);\n      if (oldPrefix !== newPrefix || oldSuffix !== newSuffix) {\n        break replaceRange;\n      }\n      var oldMiddle = oldText.slice(prefixLength, oldLength - suffixLength);\n      var newMiddle = newText.slice(prefixLength, newLength - suffixLength);\n      return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldSuffix);\n    }\n  }\n\n  return null;\n}\n\nfunction diff(text1, text2, cursor_pos) {\n  // only pass fix_unicode=true at the top level, not when diff_main is\n  // recursively invoked\n  return diff_main(text1, text2, cursor_pos, true);\n}\n\ndiff.INSERT = DIFF_INSERT;\ndiff.DELETE = DIFF_DELETE;\ndiff.EQUAL = DIFF_EQUAL;\n\nmodule.exports = diff;\n\n\n//# sourceURL=webpack://Quill/./node_modules/fast-diff/diff.js?");

	/***/ }),

	/***/ "./node_modules/foreach/index.js":
	/*!***************************************!*\
	  !*** ./node_modules/foreach/index.js ***!
	  \***************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("\nvar hasOwn = Object.prototype.hasOwnProperty;\nvar toString = Object.prototype.toString;\n\nmodule.exports = function forEach (obj, fn, ctx) {\n    if (toString.call(fn) !== '[object Function]') {\n        throw new TypeError('iterator must be a function');\n    }\n    var l = obj.length;\n    if (l === +l) {\n        for (var i = 0; i < l; i++) {\n            fn.call(ctx, obj[i], i, obj);\n        }\n    } else {\n        for (var k in obj) {\n            if (hasOwn.call(obj, k)) {\n                fn.call(ctx, obj[k], k, obj);\n            }\n        }\n    }\n};\n\n\n\n//# sourceURL=webpack://Quill/./node_modules/foreach/index.js?");

	/***/ }),

	/***/ "./node_modules/function-bind/implementation.js":
	/*!******************************************************!*\
	  !*** ./node_modules/function-bind/implementation.js ***!
	  \******************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\n/* eslint no-invalid-this: 1 */\n\nvar ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';\nvar slice = Array.prototype.slice;\nvar toStr = Object.prototype.toString;\nvar funcType = '[object Function]';\n\nmodule.exports = function bind(that) {\n    var target = this;\n    if (typeof target !== 'function' || toStr.call(target) !== funcType) {\n        throw new TypeError(ERROR_MESSAGE + target);\n    }\n    var args = slice.call(arguments, 1);\n\n    var bound;\n    var binder = function () {\n        if (this instanceof bound) {\n            var result = target.apply(\n                this,\n                args.concat(slice.call(arguments))\n            );\n            if (Object(result) === result) {\n                return result;\n            }\n            return this;\n        } else {\n            return target.apply(\n                that,\n                args.concat(slice.call(arguments))\n            );\n        }\n    };\n\n    var boundLength = Math.max(0, target.length - args.length);\n    var boundArgs = [];\n    for (var i = 0; i < boundLength; i++) {\n        boundArgs.push('$' + i);\n    }\n\n    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);\n\n    if (target.prototype) {\n        var Empty = function Empty() {};\n        Empty.prototype = target.prototype;\n        bound.prototype = new Empty();\n        Empty.prototype = null;\n    }\n\n    return bound;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/function-bind/implementation.js?");

	/***/ }),

	/***/ "./node_modules/function-bind/index.js":
	/*!*********************************************!*\
	  !*** ./node_modules/function-bind/index.js ***!
	  \*********************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"./node_modules/function-bind/implementation.js\");\n\nmodule.exports = Function.prototype.bind || implementation;\n\n\n//# sourceURL=webpack://Quill/./node_modules/function-bind/index.js?");

	/***/ }),

	/***/ "./node_modules/has-symbols/index.js":
	/*!*******************************************!*\
	  !*** ./node_modules/has-symbols/index.js ***!
	  \*******************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("/* WEBPACK VAR INJECTION */(function(global) {\n\nvar origSymbol = global.Symbol;\nvar hasSymbolSham = __webpack_require__(/*! ./shams */ \"./node_modules/has-symbols/shams.js\");\n\nmodule.exports = function hasNativeSymbols() {\n\tif (typeof origSymbol !== 'function') { return false; }\n\tif (typeof Symbol !== 'function') { return false; }\n\tif (typeof origSymbol('foo') !== 'symbol') { return false; }\n\tif (typeof Symbol('bar') !== 'symbol') { return false; }\n\n\treturn hasSymbolSham();\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://Quill/./node_modules/has-symbols/index.js?");

	/***/ }),

	/***/ "./node_modules/has-symbols/shams.js":
	/*!*******************************************!*\
	  !*** ./node_modules/has-symbols/shams.js ***!
	  \*******************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\n/* eslint complexity: [2, 18], max-statements: [2, 33] */\nmodule.exports = function hasSymbols() {\n\tif (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }\n\tif (typeof Symbol.iterator === 'symbol') { return true; }\n\n\tvar obj = {};\n\tvar sym = Symbol('test');\n\tvar symObj = Object(sym);\n\tif (typeof sym === 'string') { return false; }\n\n\tif (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }\n\tif (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }\n\n\t// temp disabled per https://github.com/ljharb/object.assign/issues/17\n\t// if (sym instanceof Symbol) { return false; }\n\t// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4\n\t// if (!(symObj instanceof Symbol)) { return false; }\n\n\t// if (typeof Symbol.prototype.toString !== 'function') { return false; }\n\t// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }\n\n\tvar symVal = 42;\n\tobj[sym] = symVal;\n\tfor (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax\n\tif (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }\n\n\tif (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }\n\n\tvar syms = Object.getOwnPropertySymbols(obj);\n\tif (syms.length !== 1 || syms[0] !== sym) { return false; }\n\n\tif (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }\n\n\tif (typeof Object.getOwnPropertyDescriptor === 'function') {\n\t\tvar descriptor = Object.getOwnPropertyDescriptor(obj, sym);\n\t\tif (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }\n\t}\n\n\treturn true;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/has-symbols/shams.js?");

	/***/ }),

	/***/ "./node_modules/has/src/index.js":
	/*!***************************************!*\
	  !*** ./node_modules/has/src/index.js ***!
	  \***************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\n\nmodule.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);\n\n\n//# sourceURL=webpack://Quill/./node_modules/has/src/index.js?");

	/***/ }),

	/***/ "./node_modules/is-arguments/index.js":
	/*!********************************************!*\
	  !*** ./node_modules/is-arguments/index.js ***!
	  \********************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';\nvar toStr = Object.prototype.toString;\n\nvar isStandardArguments = function isArguments(value) {\n\tif (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {\n\t\treturn false;\n\t}\n\treturn toStr.call(value) === '[object Arguments]';\n};\n\nvar isLegacyArguments = function isArguments(value) {\n\tif (isStandardArguments(value)) {\n\t\treturn true;\n\t}\n\treturn value !== null &&\n\t\ttypeof value === 'object' &&\n\t\ttypeof value.length === 'number' &&\n\t\tvalue.length >= 0 &&\n\t\ttoStr.call(value) !== '[object Array]' &&\n\t\ttoStr.call(value.callee) === '[object Function]';\n};\n\nvar supportsStandardArguments = (function () {\n\treturn isStandardArguments(arguments);\n}());\n\nisStandardArguments.isLegacyArguments = isLegacyArguments; // for tests\n\nmodule.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-arguments/index.js?");

	/***/ }),

	/***/ "./node_modules/is-bigint/index.js":
	/*!*****************************************!*\
	  !*** ./node_modules/is-bigint/index.js ***!
	  \*****************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nif (typeof BigInt === 'function') {\n\tvar bigIntValueOf = BigInt.prototype.valueOf;\n\tvar tryBigInt = function tryBigIntObject(value) {\n\t\ttry {\n\t\t\tbigIntValueOf.call(value);\n\t\t\treturn true;\n\t\t} catch (e) {\n\t\t}\n\t\treturn false;\n\t};\n\n\tmodule.exports = function isBigInt(value) {\n\t\tif (\n\t\t\tvalue === null\n\t\t\t|| typeof value === 'undefined'\n\t\t\t|| typeof value === 'boolean'\n\t\t\t|| typeof value === 'string'\n\t\t\t|| typeof value === 'number'\n\t\t\t|| typeof value === 'symbol'\n\t\t\t|| typeof value === 'function'\n\t\t) {\n\t\t\treturn false;\n\t\t}\n\t\tif (typeof value === 'bigint') { // eslint-disable-line valid-typeof\n\t\t\treturn true;\n\t\t}\n\n\t\treturn tryBigInt(value);\n\t};\n} else {\n\tmodule.exports = function isBigInt(value) {\n\t\treturn  false && false;\n\t};\n}\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-bigint/index.js?");

	/***/ }),

	/***/ "./node_modules/is-boolean-object/index.js":
	/*!*************************************************!*\
	  !*** ./node_modules/is-boolean-object/index.js ***!
	  \*************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar boolToStr = Boolean.prototype.toString;\n\nvar tryBooleanObject = function booleanBrandCheck(value) {\n\ttry {\n\t\tboolToStr.call(value);\n\t\treturn true;\n\t} catch (e) {\n\t\treturn false;\n\t}\n};\nvar toStr = Object.prototype.toString;\nvar boolClass = '[object Boolean]';\nvar hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';\n\nmodule.exports = function isBoolean(value) {\n\tif (typeof value === 'boolean') {\n\t\treturn true;\n\t}\n\tif (value === null || typeof value !== 'object') {\n\t\treturn false;\n\t}\n\treturn hasToStringTag && Symbol.toStringTag in value ? tryBooleanObject(value) : toStr.call(value) === boolClass;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-boolean-object/index.js?");

	/***/ }),

	/***/ "./node_modules/is-date-object/index.js":
	/*!**********************************************!*\
	  !*** ./node_modules/is-date-object/index.js ***!
	  \**********************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar getDay = Date.prototype.getDay;\nvar tryDateObject = function tryDateObject(value) {\n\ttry {\n\t\tgetDay.call(value);\n\t\treturn true;\n\t} catch (e) {\n\t\treturn false;\n\t}\n};\n\nvar toStr = Object.prototype.toString;\nvar dateClass = '[object Date]';\nvar hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';\n\nmodule.exports = function isDateObject(value) {\n\tif (typeof value !== 'object' || value === null) { return false; }\n\treturn hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-date-object/index.js?");

	/***/ }),

	/***/ "./node_modules/is-map/index.js":
	/*!**************************************!*\
	  !*** ./node_modules/is-map/index.js ***!
	  \**************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar $Map = typeof Map === 'function' && Map.prototype ? Map : null;\nvar $Set = typeof Set === 'function' && Set.prototype ? Set : null;\n\nvar exported;\n\nif (!$Map) {\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isMap(x) {\n\t\t// `Map` is not present in this environment.\n\t\treturn false;\n\t};\n}\n\nvar $mapHas = $Map ? Map.prototype.has : null;\nvar $setHas = $Set ? Set.prototype.has : null;\nif (!exported && !$mapHas) {\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isMap(x) {\n\t\t// `Map` does not have a `has` method\n\t\treturn false;\n\t};\n}\n\nmodule.exports = exported || function isMap(x) {\n\tif (!x || typeof x !== 'object') {\n\t\treturn false;\n\t}\n\ttry {\n\t\t$mapHas.call(x);\n\t\tif ($setHas) {\n\t\t\ttry {\n\t\t\t\t$setHas.call(x);\n\t\t\t} catch (e) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\treturn x instanceof $Map; // core-js workaround, pre-v2.5.0\n\t} catch (e) {}\n\treturn false;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-map/index.js?");

	/***/ }),

	/***/ "./node_modules/is-number-object/index.js":
	/*!************************************************!*\
	  !*** ./node_modules/is-number-object/index.js ***!
	  \************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar numToStr = Number.prototype.toString;\nvar tryNumberObject = function tryNumberObject(value) {\n\ttry {\n\t\tnumToStr.call(value);\n\t\treturn true;\n\t} catch (e) {\n\t\treturn false;\n\t}\n};\nvar toStr = Object.prototype.toString;\nvar numClass = '[object Number]';\nvar hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';\n\nmodule.exports = function isNumberObject(value) {\n\tif (typeof value === 'number') {\n\t\treturn true;\n\t}\n\tif (typeof value !== 'object') {\n\t\treturn false;\n\t}\n\treturn hasToStringTag ? tryNumberObject(value) : toStr.call(value) === numClass;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-number-object/index.js?");

	/***/ }),

	/***/ "./node_modules/is-regex/index.js":
	/*!****************************************!*\
	  !*** ./node_modules/is-regex/index.js ***!
	  \****************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar has = __webpack_require__(/*! has */ \"./node_modules/has/src/index.js\");\nvar regexExec = RegExp.prototype.exec;\nvar gOPD = Object.getOwnPropertyDescriptor;\n\nvar tryRegexExecCall = function tryRegexExec(value) {\n\ttry {\n\t\tvar lastIndex = value.lastIndex;\n\t\tvalue.lastIndex = 0;\n\n\t\tregexExec.call(value);\n\t\treturn true;\n\t} catch (e) {\n\t\treturn false;\n\t} finally {\n\t\tvalue.lastIndex = lastIndex;\n\t}\n};\nvar toStr = Object.prototype.toString;\nvar regexClass = '[object RegExp]';\nvar hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';\n\nmodule.exports = function isRegex(value) {\n\tif (!value || typeof value !== 'object') {\n\t\treturn false;\n\t}\n\tif (!hasToStringTag) {\n\t\treturn toStr.call(value) === regexClass;\n\t}\n\n\tvar descriptor = gOPD(value, 'lastIndex');\n\tvar hasLastIndexDataProperty = descriptor && has(descriptor, 'value');\n\tif (!hasLastIndexDataProperty) {\n\t\treturn false;\n\t}\n\n\treturn tryRegexExecCall(value);\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-regex/index.js?");

	/***/ }),

	/***/ "./node_modules/is-set/index.js":
	/*!**************************************!*\
	  !*** ./node_modules/is-set/index.js ***!
	  \**************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar $Map = typeof Map === 'function' && Map.prototype ? Map : null;\nvar $Set = typeof Set === 'function' && Set.prototype ? Set : null;\n\nvar exported;\n\nif (!$Set) {\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isSet(x) {\n\t\t// `Set` is not present in this environment.\n\t\treturn false;\n\t};\n}\n\nvar $mapHas = $Map ? Map.prototype.has : null;\nvar $setHas = $Set ? Set.prototype.has : null;\nif (!exported && !$setHas) {\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isSet(x) {\n\t\t// `Set` does not have a `has` method\n\t\treturn false;\n\t};\n}\n\nmodule.exports = exported || function isSet(x) {\n\tif (!x || typeof x !== 'object') {\n\t\treturn false;\n\t}\n\ttry {\n\t\t$setHas.call(x);\n\t\tif ($mapHas) {\n\t\t\ttry {\n\t\t\t\t$mapHas.call(x);\n\t\t\t} catch (e) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\treturn x instanceof $Set; // core-js workaround, pre-v2.5.0\n\t} catch (e) {}\n\treturn false;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-set/index.js?");

	/***/ }),

	/***/ "./node_modules/is-string/index.js":
	/*!*****************************************!*\
	  !*** ./node_modules/is-string/index.js ***!
	  \*****************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar strValue = String.prototype.valueOf;\nvar tryStringObject = function tryStringObject(value) {\n\ttry {\n\t\tstrValue.call(value);\n\t\treturn true;\n\t} catch (e) {\n\t\treturn false;\n\t}\n};\nvar toStr = Object.prototype.toString;\nvar strClass = '[object String]';\nvar hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';\n\nmodule.exports = function isString(value) {\n\tif (typeof value === 'string') {\n\t\treturn true;\n\t}\n\tif (typeof value !== 'object') {\n\t\treturn false;\n\t}\n\treturn hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-string/index.js?");

	/***/ }),

	/***/ "./node_modules/is-typed-array/index.js":
	/*!**********************************************!*\
	  !*** ./node_modules/is-typed-array/index.js ***!
	  \**********************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("/* WEBPACK VAR INJECTION */(function(global) {\n\nvar forEach = __webpack_require__(/*! foreach */ \"./node_modules/foreach/index.js\");\nvar availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ \"./node_modules/available-typed-arrays/index.js\");\nvar callBound = __webpack_require__(/*! es-abstract/helpers/callBound */ \"./node_modules/is-typed-array/node_modules/es-abstract/helpers/callBound.js\");\n\nvar $toString = callBound('Object.prototype.toString');\nvar hasSymbols = __webpack_require__(/*! has-symbols */ \"./node_modules/has-symbols/index.js\")();\nvar hasToStringTag = hasSymbols && typeof Symbol.toStringTag === 'symbol';\n\nvar typedArrays = availableTypedArrays();\n\nvar $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {\n\tfor (var i = 0; i < array.length; i += 1) {\n\t\tif (array[i] === value) {\n\t\t\treturn i;\n\t\t}\n\t}\n\treturn -1;\n};\nvar $slice = callBound('String.prototype.slice');\nvar toStrTags = {};\nvar gOPD = __webpack_require__(/*! es-abstract/helpers/getOwnPropertyDescriptor */ \"./node_modules/is-typed-array/node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js\");\nvar getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');\nif (hasToStringTag && gOPD && getPrototypeOf) {\n\tforEach(typedArrays, function (typedArray) {\n\t\tvar arr = new global[typedArray]();\n\t\tif (!(Symbol.toStringTag in arr)) {\n\t\t\tthrow new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');\n\t\t}\n\t\tvar proto = getPrototypeOf(arr);\n\t\tvar descriptor = gOPD(proto, Symbol.toStringTag);\n\t\tif (!descriptor) {\n\t\t\tvar superProto = getPrototypeOf(proto);\n\t\t\tdescriptor = gOPD(superProto, Symbol.toStringTag);\n\t\t}\n\t\ttoStrTags[typedArray] = descriptor.get;\n\t});\n}\n\nvar tryTypedArrays = function tryAllTypedArrays(value) {\n\tvar anyTrue = false;\n\tforEach(toStrTags, function (getter, typedArray) {\n\t\tif (!anyTrue) {\n\t\t\ttry {\n\t\t\t\tanyTrue = getter.call(value) === typedArray;\n\t\t\t} catch (e) { /**/ }\n\t\t}\n\t});\n\treturn anyTrue;\n};\n\nmodule.exports = function isTypedArray(value) {\n\tif (!value || typeof value !== 'object') { return false; }\n\tif (!hasToStringTag) {\n\t\tvar tag = $slice($toString(value), 8, -1);\n\t\treturn $indexOf(typedArrays, tag) > -1;\n\t}\n\tif (!gOPD) { return false; }\n\treturn tryTypedArrays(value);\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://Quill/./node_modules/is-typed-array/index.js?");

	/***/ }),

	/***/ "./node_modules/is-typed-array/node_modules/es-abstract/GetIntrinsic.js":
	/*!******************************************************************************!*\
	  !*** ./node_modules/is-typed-array/node_modules/es-abstract/GetIntrinsic.js ***!
	  \******************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\n/* globals\n\tAtomics,\n\tSharedArrayBuffer,\n*/\n\nvar undefined;\n\nvar $TypeError = TypeError;\n\nvar $gOPD = Object.getOwnPropertyDescriptor;\nif ($gOPD) {\n\ttry {\n\t\t$gOPD({}, '');\n\t} catch (e) {\n\t\t$gOPD = null; // this is IE 8, which has a broken gOPD\n\t}\n}\n\nvar throwTypeError = function () { throw new $TypeError(); };\nvar ThrowTypeError = $gOPD\n\t? (function () {\n\t\ttry {\n\t\t\t// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties\n\t\t\targuments.callee; // IE 8 does not throw here\n\t\t\treturn throwTypeError;\n\t\t} catch (calleeThrows) {\n\t\t\ttry {\n\t\t\t\t// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')\n\t\t\t\treturn $gOPD(arguments, 'callee').get;\n\t\t\t} catch (gOPDthrows) {\n\t\t\t\treturn throwTypeError;\n\t\t\t}\n\t\t}\n\t}())\n\t: throwTypeError;\n\nvar hasSymbols = __webpack_require__(/*! has-symbols */ \"./node_modules/has-symbols/index.js\")();\n\nvar getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto\n\nvar generator; // = function * () {};\nvar generatorFunction = generator ? getProto(generator) : undefined;\nvar asyncFn; // async function() {};\nvar asyncFunction = asyncFn ? asyncFn.constructor : undefined;\nvar asyncGen; // async function * () {};\nvar asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;\nvar asyncGenIterator = asyncGen ? asyncGen() : undefined;\n\nvar TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);\n\nvar INTRINSICS = {\n\t'%Array%': Array,\n\t'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,\n\t'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,\n\t'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,\n\t'%ArrayPrototype%': Array.prototype,\n\t'%ArrayProto_entries%': Array.prototype.entries,\n\t'%ArrayProto_forEach%': Array.prototype.forEach,\n\t'%ArrayProto_keys%': Array.prototype.keys,\n\t'%ArrayProto_values%': Array.prototype.values,\n\t'%AsyncFromSyncIteratorPrototype%': undefined,\n\t'%AsyncFunction%': asyncFunction,\n\t'%AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,\n\t'%AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,\n\t'%AsyncGeneratorFunction%': asyncGenFunction,\n\t'%AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,\n\t'%AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,\n\t'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,\n\t'%Boolean%': Boolean,\n\t'%BooleanPrototype%': Boolean.prototype,\n\t'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,\n\t'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,\n\t'%Date%': Date,\n\t'%DatePrototype%': Date.prototype,\n\t'%decodeURI%': decodeURI,\n\t'%decodeURIComponent%': decodeURIComponent,\n\t'%encodeURI%': encodeURI,\n\t'%encodeURIComponent%': encodeURIComponent,\n\t'%Error%': Error,\n\t'%ErrorPrototype%': Error.prototype,\n\t'%eval%': eval, // eslint-disable-line no-eval\n\t'%EvalError%': EvalError,\n\t'%EvalErrorPrototype%': EvalError.prototype,\n\t'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,\n\t'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,\n\t'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,\n\t'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,\n\t'%Function%': Function,\n\t'%FunctionPrototype%': Function.prototype,\n\t'%Generator%': generator ? getProto(generator()) : undefined,\n\t'%GeneratorFunction%': generatorFunction,\n\t'%GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,\n\t'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,\n\t'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,\n\t'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,\n\t'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,\n\t'%isFinite%': isFinite,\n\t'%isNaN%': isNaN,\n\t'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,\n\t'%JSON%': typeof JSON === 'object' ? JSON : undefined,\n\t'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,\n\t'%Map%': typeof Map === 'undefined' ? undefined : Map,\n\t'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),\n\t'%MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,\n\t'%Math%': Math,\n\t'%Number%': Number,\n\t'%NumberPrototype%': Number.prototype,\n\t'%Object%': Object,\n\t'%ObjectPrototype%': Object.prototype,\n\t'%ObjProto_toString%': Object.prototype.toString,\n\t'%ObjProto_valueOf%': Object.prototype.valueOf,\n\t'%parseFloat%': parseFloat,\n\t'%parseInt%': parseInt,\n\t'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,\n\t'%PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,\n\t'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,\n\t'%Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,\n\t'%Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,\n\t'%Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,\n\t'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,\n\t'%RangeError%': RangeError,\n\t'%RangeErrorPrototype%': RangeError.prototype,\n\t'%ReferenceError%': ReferenceError,\n\t'%ReferenceErrorPrototype%': ReferenceError.prototype,\n\t'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,\n\t'%RegExp%': RegExp,\n\t'%RegExpPrototype%': RegExp.prototype,\n\t'%Set%': typeof Set === 'undefined' ? undefined : Set,\n\t'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),\n\t'%SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,\n\t'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,\n\t'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,\n\t'%String%': String,\n\t'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,\n\t'%StringPrototype%': String.prototype,\n\t'%Symbol%': hasSymbols ? Symbol : undefined,\n\t'%SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,\n\t'%SyntaxError%': SyntaxError,\n\t'%SyntaxErrorPrototype%': SyntaxError.prototype,\n\t'%ThrowTypeError%': ThrowTypeError,\n\t'%TypedArray%': TypedArray,\n\t'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,\n\t'%TypeError%': $TypeError,\n\t'%TypeErrorPrototype%': $TypeError.prototype,\n\t'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,\n\t'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,\n\t'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,\n\t'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,\n\t'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,\n\t'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,\n\t'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,\n\t'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,\n\t'%URIError%': URIError,\n\t'%URIErrorPrototype%': URIError.prototype,\n\t'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,\n\t'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,\n\t'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,\n\t'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype\n};\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\nvar $replace = bind.call(Function.call, String.prototype.replace);\n\n/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */\nvar rePropName = /[^%.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|%$))/g;\nvar reEscapeChar = /\\\\(\\\\)?/g; /** Used to match backslashes in property paths. */\nvar stringToPath = function stringToPath(string) {\n\tvar result = [];\n\t$replace(string, rePropName, function (match, number, quote, subString) {\n\t\tresult[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);\n\t});\n\treturn result;\n};\n/* end adaptation */\n\nvar getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {\n\tif (!(name in INTRINSICS)) {\n\t\tthrow new SyntaxError('intrinsic ' + name + ' does not exist!');\n\t}\n\n\t// istanbul ignore if // hopefully this is impossible to test :-)\n\tif (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {\n\t\tthrow new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');\n\t}\n\n\treturn INTRINSICS[name];\n};\n\nmodule.exports = function GetIntrinsic(name, allowMissing) {\n\tif (typeof name !== 'string' || name.length === 0) {\n\t\tthrow new TypeError('intrinsic name must be a non-empty string');\n\t}\n\tif (arguments.length > 1 && typeof allowMissing !== 'boolean') {\n\t\tthrow new TypeError('\"allowMissing\" argument must be a boolean');\n\t}\n\n\tvar parts = stringToPath(name);\n\n\tvar value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);\n\tfor (var i = 1; i < parts.length; i += 1) {\n\t\tif (value != null) {\n\t\t\tif ($gOPD && (i + 1) >= parts.length) {\n\t\t\t\tvar desc = $gOPD(value, parts[i]);\n\t\t\t\tif (!allowMissing && !(parts[i] in value)) {\n\t\t\t\t\tthrow new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');\n\t\t\t\t}\n\t\t\t\tvalue = desc ? (desc.get || desc.value) : value[parts[i]];\n\t\t\t} else {\n\t\t\t\tvalue = value[parts[i]];\n\t\t\t}\n\t\t}\n\t}\n\treturn value;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-typed-array/node_modules/es-abstract/GetIntrinsic.js?");

	/***/ }),

	/***/ "./node_modules/is-typed-array/node_modules/es-abstract/helpers/callBind.js":
	/*!**********************************************************************************!*\
	  !*** ./node_modules/is-typed-array/node_modules/es-abstract/helpers/callBind.js ***!
	  \**********************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/is-typed-array/node_modules/es-abstract/GetIntrinsic.js\");\n\nvar $Function = GetIntrinsic('%Function%');\nvar $apply = $Function.apply;\nvar $call = $Function.call;\n\nmodule.exports = function callBind() {\n\treturn bind.apply($call, arguments);\n};\n\nmodule.exports.apply = function applyBind() {\n\treturn bind.apply($apply, arguments);\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-typed-array/node_modules/es-abstract/helpers/callBind.js?");

	/***/ }),

	/***/ "./node_modules/is-typed-array/node_modules/es-abstract/helpers/callBound.js":
	/*!***********************************************************************************!*\
	  !*** ./node_modules/is-typed-array/node_modules/es-abstract/helpers/callBound.js ***!
	  \***********************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/is-typed-array/node_modules/es-abstract/GetIntrinsic.js\");\n\nvar callBind = __webpack_require__(/*! ./callBind */ \"./node_modules/is-typed-array/node_modules/es-abstract/helpers/callBind.js\");\n\nvar $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));\n\nmodule.exports = function callBoundIntrinsic(name, allowMissing) {\n\tvar intrinsic = GetIntrinsic(name, !!allowMissing);\n\tif (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {\n\t\treturn callBind(intrinsic);\n\t}\n\treturn intrinsic;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-typed-array/node_modules/es-abstract/helpers/callBound.js?");

	/***/ }),

	/***/ "./node_modules/is-typed-array/node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js":
	/*!**************************************************************************************************!*\
	  !*** ./node_modules/is-typed-array/node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js ***!
	  \**************************************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/is-typed-array/node_modules/es-abstract/GetIntrinsic.js\");\n\nvar $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%');\nif ($gOPD) {\n\ttry {\n\t\t$gOPD([], 'length');\n\t} catch (e) {\n\t\t// IE 8 has a broken gOPD\n\t\t$gOPD = null;\n\t}\n}\n\nmodule.exports = $gOPD;\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-typed-array/node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js?");

	/***/ }),

	/***/ "./node_modules/is-weakmap/index.js":
	/*!******************************************!*\
	  !*** ./node_modules/is-weakmap/index.js ***!
	  \******************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;\nvar $WeakSet = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;\n\nvar exported;\n\nif (!$WeakMap) {\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isWeakMap(x) {\n\t\t// `WeakMap` is not present in this environment.\n\t\treturn false;\n\t};\n}\n\nvar $mapHas = $WeakMap ? $WeakMap.prototype.has : null;\nvar $setHas = $WeakSet ? $WeakSet.prototype.has : null;\nif (!exported && !$mapHas) {\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isWeakMap(x) {\n\t\t// `WeakMap` does not have a `has` method\n\t\treturn false;\n\t};\n}\n\nmodule.exports = exported || function isWeakMap(x) {\n\tif (!x || typeof x !== 'object') {\n\t\treturn false;\n\t}\n\ttry {\n\t\t$mapHas.call(x, $mapHas);\n\t\tif ($setHas) {\n\t\t\ttry {\n\t\t\t\t$setHas.call(x, $setHas);\n\t\t\t} catch (e) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\treturn x instanceof $WeakMap; // core-js workaround, pre-v3\n\t} catch (e) {}\n\treturn false;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-weakmap/index.js?");

	/***/ }),

	/***/ "./node_modules/is-weakset/index.js":
	/*!******************************************!*\
	  !*** ./node_modules/is-weakset/index.js ***!
	  \******************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;\nvar $WeakSet = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;\n\nvar exported;\n\nif (!$WeakMap) {\n\t// eslint-disable-next-line no-unused-vars\n\texported = function isWeakSet(x) {\n\t\t// `WeakSet` is not present in this environment.\n\t\treturn false;\n\t};\n}\n\nvar $mapHas = $WeakMap ? $WeakMap.prototype.has : null;\nvar $setHas = $WeakSet ? $WeakSet.prototype.has : null;\nif (!exported && !$setHas) {\n\t// eslint-disable-next-line no-unused-vars\n\tmodule.exports = function isWeakSet(x) {\n\t\t// `WeakSet` does not have a `has` method\n\t\treturn false;\n\t};\n}\n\nmodule.exports = exported || function isWeakSet(x) {\n\tif (!x || typeof x !== 'object') {\n\t\treturn false;\n\t}\n\ttry {\n\t\t$setHas.call(x, $setHas);\n\t\tif ($mapHas) {\n\t\t\ttry {\n\t\t\t\t$mapHas.call(x, $mapHas);\n\t\t\t} catch (e) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\treturn x instanceof $WeakSet; // core-js workaround, pre-v3\n\t} catch (e) {}\n\treturn false;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/is-weakset/index.js?");

	/***/ }),

	/***/ "./node_modules/object-inspect/index.js":
	/*!**********************************************!*\
	  !*** ./node_modules/object-inspect/index.js ***!
	  \**********************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {

	eval("var hasMap = typeof Map === 'function' && Map.prototype;\nvar mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;\nvar mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;\nvar mapForEach = hasMap && Map.prototype.forEach;\nvar hasSet = typeof Set === 'function' && Set.prototype;\nvar setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;\nvar setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;\nvar setForEach = hasSet && Set.prototype.forEach;\nvar hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;\nvar weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;\nvar hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;\nvar weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;\nvar booleanValueOf = Boolean.prototype.valueOf;\nvar objectToString = Object.prototype.toString;\nvar match = String.prototype.match;\nvar bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;\n\nvar inspectCustom = __webpack_require__(/*! ./util.inspect */ 1).custom;\nvar inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;\n\nmodule.exports = function inspect_(obj, options, depth, seen) {\n    var opts = options || {};\n\n    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {\n        throw new TypeError('option \"quoteStyle\" must be \"single\" or \"double\"');\n    }\n\n    if (typeof obj === 'undefined') {\n        return 'undefined';\n    }\n    if (obj === null) {\n        return 'null';\n    }\n    if (typeof obj === 'boolean') {\n        return obj ? 'true' : 'false';\n    }\n\n    if (typeof obj === 'string') {\n        return inspectString(obj, opts);\n    }\n    if (typeof obj === 'number') {\n        if (obj === 0) {\n            return Infinity / obj > 0 ? '0' : '-0';\n        }\n        return String(obj);\n    }\n    if (typeof obj === 'bigint') { // eslint-disable-line valid-typeof\n        return String(obj) + 'n';\n    }\n\n    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;\n    if (typeof depth === 'undefined') { depth = 0; }\n    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {\n        return '[Object]';\n    }\n\n    if (typeof seen === 'undefined') {\n        seen = [];\n    } else if (indexOf(seen, obj) >= 0) {\n        return '[Circular]';\n    }\n\n    function inspect(value, from) {\n        if (from) {\n            seen = seen.slice();\n            seen.push(from);\n        }\n        return inspect_(value, opts, depth + 1, seen);\n    }\n\n    if (typeof obj === 'function') {\n        var name = nameOf(obj);\n        return '[Function' + (name ? ': ' + name : '') + ']';\n    }\n    if (isSymbol(obj)) {\n        var symString = Symbol.prototype.toString.call(obj);\n        return typeof obj === 'object' ? markBoxed(symString) : symString;\n    }\n    if (isElement(obj)) {\n        var s = '<' + String(obj.nodeName).toLowerCase();\n        var attrs = obj.attributes || [];\n        for (var i = 0; i < attrs.length; i++) {\n            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);\n        }\n        s += '>';\n        if (obj.childNodes && obj.childNodes.length) { s += '...'; }\n        s += '</' + String(obj.nodeName).toLowerCase() + '>';\n        return s;\n    }\n    if (isArray(obj)) {\n        if (obj.length === 0) { return '[]'; }\n        return '[ ' + arrObjKeys(obj, inspect).join(', ') + ' ]';\n    }\n    if (isError(obj)) {\n        var parts = arrObjKeys(obj, inspect);\n        if (parts.length === 0) { return '[' + String(obj) + ']'; }\n        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';\n    }\n    if (typeof obj === 'object') {\n        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {\n            return obj[inspectSymbol]();\n        } else if (typeof obj.inspect === 'function') {\n            return obj.inspect();\n        }\n    }\n    if (isMap(obj)) {\n        var mapParts = [];\n        mapForEach.call(obj, function (value, key) {\n            mapParts.push(inspect(key, obj) + ' => ' + inspect(value, obj));\n        });\n        return collectionOf('Map', mapSize.call(obj), mapParts);\n    }\n    if (isSet(obj)) {\n        var setParts = [];\n        setForEach.call(obj, function (value) {\n            setParts.push(inspect(value, obj));\n        });\n        return collectionOf('Set', setSize.call(obj), setParts);\n    }\n    if (isWeakMap(obj)) {\n        return weakCollectionOf('WeakMap');\n    }\n    if (isWeakSet(obj)) {\n        return weakCollectionOf('WeakSet');\n    }\n    if (isNumber(obj)) {\n        return markBoxed(inspect(Number(obj)));\n    }\n    if (isBigInt(obj)) {\n        return markBoxed(inspect(bigIntValueOf.call(obj)));\n    }\n    if (isBoolean(obj)) {\n        return markBoxed(booleanValueOf.call(obj));\n    }\n    if (isString(obj)) {\n        return markBoxed(inspect(String(obj)));\n    }\n    if (!isDate(obj) && !isRegExp(obj)) {\n        var xs = arrObjKeys(obj, inspect);\n        if (xs.length === 0) { return '{}'; }\n        return '{ ' + xs.join(', ') + ' }';\n    }\n    return String(obj);\n};\n\nfunction wrapQuotes(s, defaultStyle, opts) {\n    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '\"' : \"'\";\n    return quoteChar + s + quoteChar;\n}\n\nfunction quote(s) {\n    return String(s).replace(/\"/g, '&quot;');\n}\n\nfunction isArray(obj) { return toStr(obj) === '[object Array]'; }\nfunction isDate(obj) { return toStr(obj) === '[object Date]'; }\nfunction isRegExp(obj) { return toStr(obj) === '[object RegExp]'; }\nfunction isError(obj) { return toStr(obj) === '[object Error]'; }\nfunction isSymbol(obj) { return toStr(obj) === '[object Symbol]'; }\nfunction isString(obj) { return toStr(obj) === '[object String]'; }\nfunction isNumber(obj) { return toStr(obj) === '[object Number]'; }\nfunction isBigInt(obj) { return toStr(obj) === '[object BigInt]'; }\nfunction isBoolean(obj) { return toStr(obj) === '[object Boolean]'; }\n\nvar hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };\nfunction has(obj, key) {\n    return hasOwn.call(obj, key);\n}\n\nfunction toStr(obj) {\n    return objectToString.call(obj);\n}\n\nfunction nameOf(f) {\n    if (f.name) { return f.name; }\n    var m = match.call(f, /^function\\s*([\\w$]+)/);\n    if (m) { return m[1]; }\n    return null;\n}\n\nfunction indexOf(xs, x) {\n    if (xs.indexOf) { return xs.indexOf(x); }\n    for (var i = 0, l = xs.length; i < l; i++) {\n        if (xs[i] === x) { return i; }\n    }\n    return -1;\n}\n\nfunction isMap(x) {\n    if (!mapSize || !x || typeof x !== 'object') {\n        return false;\n    }\n    try {\n        mapSize.call(x);\n        try {\n            setSize.call(x);\n        } catch (s) {\n            return true;\n        }\n        return x instanceof Map; // core-js workaround, pre-v2.5.0\n    } catch (e) {}\n    return false;\n}\n\nfunction isWeakMap(x) {\n    if (!weakMapHas || !x || typeof x !== 'object') {\n        return false;\n    }\n    try {\n        weakMapHas.call(x, weakMapHas);\n        try {\n            weakSetHas.call(x, weakSetHas);\n        } catch (s) {\n            return true;\n        }\n        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0\n    } catch (e) {}\n    return false;\n}\n\nfunction isSet(x) {\n    if (!setSize || !x || typeof x !== 'object') {\n        return false;\n    }\n    try {\n        setSize.call(x);\n        try {\n            mapSize.call(x);\n        } catch (m) {\n            return true;\n        }\n        return x instanceof Set; // core-js workaround, pre-v2.5.0\n    } catch (e) {}\n    return false;\n}\n\nfunction isWeakSet(x) {\n    if (!weakSetHas || !x || typeof x !== 'object') {\n        return false;\n    }\n    try {\n        weakSetHas.call(x, weakSetHas);\n        try {\n            weakMapHas.call(x, weakMapHas);\n        } catch (s) {\n            return true;\n        }\n        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0\n    } catch (e) {}\n    return false;\n}\n\nfunction isElement(x) {\n    if (!x || typeof x !== 'object') { return false; }\n    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {\n        return true;\n    }\n    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';\n}\n\nfunction inspectString(str, opts) {\n    // eslint-disable-next-line no-control-regex\n    var s = str.replace(/(['\\\\])/g, '\\\\$1').replace(/[\\x00-\\x1f]/g, lowbyte);\n    return wrapQuotes(s, 'single', opts);\n}\n\nfunction lowbyte(c) {\n    var n = c.charCodeAt(0);\n    var x = {\n        8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r'\n    }[n];\n    if (x) { return '\\\\' + x; }\n    return '\\\\x' + (n < 0x10 ? '0' : '') + n.toString(16);\n}\n\nfunction markBoxed(str) {\n    return 'Object(' + str + ')';\n}\n\nfunction weakCollectionOf(type) {\n    return type + ' { ? }';\n}\n\nfunction collectionOf(type, size, entries) {\n    return type + ' (' + size + ') {' + entries.join(', ') + '}';\n}\n\nfunction arrObjKeys(obj, inspect) {\n    var isArr = isArray(obj);\n    var xs = [];\n    if (isArr) {\n        xs.length = obj.length;\n        for (var i = 0; i < obj.length; i++) {\n            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';\n        }\n    }\n    for (var key in obj) { // eslint-disable-line no-restricted-syntax\n        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue\n        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue\n        if ((/[^\\w$]/).test(key)) {\n            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));\n        } else {\n            xs.push(key + ': ' + inspect(obj[key], obj));\n        }\n    }\n    return xs;\n}\n\n\n//# sourceURL=webpack://Quill/./node_modules/object-inspect/index.js?");

	/***/ }),

	/***/ "./node_modules/object-is/index.js":
	/*!*****************************************!*\
	  !*** ./node_modules/object-is/index.js ***!
	  \*****************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\n// http://www.ecma-international.org/ecma-262/6.0/#sec-object.is\n\nvar numberIsNaN = function (value) {\n\treturn value !== value;\n};\n\nmodule.exports = function is(a, b) {\n\tif (a === 0 && b === 0) {\n\t\treturn 1 / a === 1 / b;\n\t}\n\tif (a === b) {\n\t\treturn true;\n\t}\n\tif (numberIsNaN(a) && numberIsNaN(b)) {\n\t\treturn true;\n\t}\n\treturn false;\n};\n\n\n\n//# sourceURL=webpack://Quill/./node_modules/object-is/index.js?");

	/***/ }),

	/***/ "./node_modules/object-keys/index.js":
	/*!*******************************************!*\
	  !*** ./node_modules/object-keys/index.js ***!
	  \*******************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\n// modified from https://github.com/es-shims/es5-shim\nvar has = Object.prototype.hasOwnProperty;\nvar toStr = Object.prototype.toString;\nvar slice = Array.prototype.slice;\nvar isArgs = __webpack_require__(/*! ./isArguments */ \"./node_modules/object-keys/isArguments.js\");\nvar isEnumerable = Object.prototype.propertyIsEnumerable;\nvar hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');\nvar hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');\nvar dontEnums = [\n\t'toString',\n\t'toLocaleString',\n\t'valueOf',\n\t'hasOwnProperty',\n\t'isPrototypeOf',\n\t'propertyIsEnumerable',\n\t'constructor'\n];\nvar equalsConstructorPrototype = function (o) {\n\tvar ctor = o.constructor;\n\treturn ctor && ctor.prototype === o;\n};\nvar excludedKeys = {\n\t$applicationCache: true,\n\t$console: true,\n\t$external: true,\n\t$frame: true,\n\t$frameElement: true,\n\t$frames: true,\n\t$innerHeight: true,\n\t$innerWidth: true,\n\t$outerHeight: true,\n\t$outerWidth: true,\n\t$pageXOffset: true,\n\t$pageYOffset: true,\n\t$parent: true,\n\t$scrollLeft: true,\n\t$scrollTop: true,\n\t$scrollX: true,\n\t$scrollY: true,\n\t$self: true,\n\t$webkitIndexedDB: true,\n\t$webkitStorageInfo: true,\n\t$window: true\n};\nvar hasAutomationEqualityBug = (function () {\n\t/* global window */\n\tif (typeof window === 'undefined') { return false; }\n\tfor (var k in window) {\n\t\ttry {\n\t\t\tif (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {\n\t\t\t\ttry {\n\t\t\t\t\tequalsConstructorPrototype(window[k]);\n\t\t\t\t} catch (e) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t}\n\t\t} catch (e) {\n\t\t\treturn true;\n\t\t}\n\t}\n\treturn false;\n}());\nvar equalsConstructorPrototypeIfNotBuggy = function (o) {\n\t/* global window */\n\tif (typeof window === 'undefined' || !hasAutomationEqualityBug) {\n\t\treturn equalsConstructorPrototype(o);\n\t}\n\ttry {\n\t\treturn equalsConstructorPrototype(o);\n\t} catch (e) {\n\t\treturn false;\n\t}\n};\n\nvar keysShim = function keys(object) {\n\tvar isObject = object !== null && typeof object === 'object';\n\tvar isFunction = toStr.call(object) === '[object Function]';\n\tvar isArguments = isArgs(object);\n\tvar isString = isObject && toStr.call(object) === '[object String]';\n\tvar theKeys = [];\n\n\tif (!isObject && !isFunction && !isArguments) {\n\t\tthrow new TypeError('Object.keys called on a non-object');\n\t}\n\n\tvar skipProto = hasProtoEnumBug && isFunction;\n\tif (isString && object.length > 0 && !has.call(object, 0)) {\n\t\tfor (var i = 0; i < object.length; ++i) {\n\t\t\ttheKeys.push(String(i));\n\t\t}\n\t}\n\n\tif (isArguments && object.length > 0) {\n\t\tfor (var j = 0; j < object.length; ++j) {\n\t\t\ttheKeys.push(String(j));\n\t\t}\n\t} else {\n\t\tfor (var name in object) {\n\t\t\tif (!(skipProto && name === 'prototype') && has.call(object, name)) {\n\t\t\t\ttheKeys.push(String(name));\n\t\t\t}\n\t\t}\n\t}\n\n\tif (hasDontEnumBug) {\n\t\tvar skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);\n\n\t\tfor (var k = 0; k < dontEnums.length; ++k) {\n\t\t\tif (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {\n\t\t\t\ttheKeys.push(dontEnums[k]);\n\t\t\t}\n\t\t}\n\t}\n\treturn theKeys;\n};\n\nkeysShim.shim = function shimObjectKeys() {\n\tif (Object.keys) {\n\t\tvar keysWorksWithArguments = (function () {\n\t\t\t// Safari 5.0 bug\n\t\t\treturn (Object.keys(arguments) || '').length === 2;\n\t\t}(1, 2));\n\t\tif (!keysWorksWithArguments) {\n\t\t\tvar originalKeys = Object.keys;\n\t\t\tObject.keys = function keys(object) { // eslint-disable-line func-name-matching\n\t\t\t\tif (isArgs(object)) {\n\t\t\t\t\treturn originalKeys(slice.call(object));\n\t\t\t\t} else {\n\t\t\t\t\treturn originalKeys(object);\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\t} else {\n\t\tObject.keys = keysShim;\n\t}\n\treturn Object.keys || keysShim;\n};\n\nmodule.exports = keysShim;\n\n\n//# sourceURL=webpack://Quill/./node_modules/object-keys/index.js?");

	/***/ }),

	/***/ "./node_modules/object-keys/isArguments.js":
	/*!*************************************************!*\
	  !*** ./node_modules/object-keys/isArguments.js ***!
	  \*************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar toStr = Object.prototype.toString;\n\nmodule.exports = function isArguments(value) {\n\tvar str = toStr.call(value);\n\tvar isArgs = str === '[object Arguments]';\n\tif (!isArgs) {\n\t\tisArgs = str !== '[object Array]' &&\n\t\t\tvalue !== null &&\n\t\t\ttypeof value === 'object' &&\n\t\t\ttypeof value.length === 'number' &&\n\t\t\tvalue.length >= 0 &&\n\t\t\ttoStr.call(value.callee) === '[object Function]';\n\t}\n\treturn isArgs;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/object-keys/isArguments.js?");

	/***/ }),

	/***/ "./node_modules/object.assign/implementation.js":
	/*!******************************************************!*\
	  !*** ./node_modules/object.assign/implementation.js ***!
	  \******************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\n// modified from https://github.com/es-shims/es6-shim\nvar keys = __webpack_require__(/*! object-keys */ \"./node_modules/object-keys/index.js\");\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\nvar canBeObject = function (obj) {\n\treturn typeof obj !== 'undefined' && obj !== null;\n};\nvar hasSymbols = __webpack_require__(/*! has-symbols/shams */ \"./node_modules/has-symbols/shams.js\")();\nvar toObject = Object;\nvar push = bind.call(Function.call, Array.prototype.push);\nvar propIsEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);\nvar originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;\n\nmodule.exports = function assign(target, source1) {\n\tif (!canBeObject(target)) { throw new TypeError('target must be an object'); }\n\tvar objTarget = toObject(target);\n\tvar s, source, i, props, syms, value, key;\n\tfor (s = 1; s < arguments.length; ++s) {\n\t\tsource = toObject(arguments[s]);\n\t\tprops = keys(source);\n\t\tvar getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);\n\t\tif (getSymbols) {\n\t\t\tsyms = getSymbols(source);\n\t\t\tfor (i = 0; i < syms.length; ++i) {\n\t\t\t\tkey = syms[i];\n\t\t\t\tif (propIsEnumerable(source, key)) {\n\t\t\t\t\tpush(props, key);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tfor (i = 0; i < props.length; ++i) {\n\t\t\tkey = props[i];\n\t\t\tvalue = source[key];\n\t\t\tif (propIsEnumerable(source, key)) {\n\t\t\t\tobjTarget[key] = value;\n\t\t\t}\n\t\t}\n\t}\n\treturn objTarget;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/object.assign/implementation.js?");

	/***/ }),

	/***/ "./node_modules/object.assign/index.js":
	/*!*********************************************!*\
	  !*** ./node_modules/object.assign/index.js ***!
	  \*********************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar defineProperties = __webpack_require__(/*! define-properties */ \"./node_modules/define-properties/index.js\");\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"./node_modules/object.assign/implementation.js\");\nvar getPolyfill = __webpack_require__(/*! ./polyfill */ \"./node_modules/object.assign/polyfill.js\");\nvar shim = __webpack_require__(/*! ./shim */ \"./node_modules/object.assign/shim.js\");\n\nvar polyfill = getPolyfill();\n\ndefineProperties(polyfill, {\n\tgetPolyfill: getPolyfill,\n\timplementation: implementation,\n\tshim: shim\n});\n\nmodule.exports = polyfill;\n\n\n//# sourceURL=webpack://Quill/./node_modules/object.assign/index.js?");

	/***/ }),

	/***/ "./node_modules/object.assign/polyfill.js":
	/*!************************************************!*\
	  !*** ./node_modules/object.assign/polyfill.js ***!
	  \************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"./node_modules/object.assign/implementation.js\");\n\nvar lacksProperEnumerationOrder = function () {\n\tif (!Object.assign) {\n\t\treturn false;\n\t}\n\t// v8, specifically in node 4.x, has a bug with incorrect property enumeration order\n\t// note: this does not detect the bug unless there's 20 characters\n\tvar str = 'abcdefghijklmnopqrst';\n\tvar letters = str.split('');\n\tvar map = {};\n\tfor (var i = 0; i < letters.length; ++i) {\n\t\tmap[letters[i]] = letters[i];\n\t}\n\tvar obj = Object.assign({}, map);\n\tvar actual = '';\n\tfor (var k in obj) {\n\t\tactual += k;\n\t}\n\treturn str !== actual;\n};\n\nvar assignHasPendingExceptions = function () {\n\tif (!Object.assign || !Object.preventExtensions) {\n\t\treturn false;\n\t}\n\t// Firefox 37 still has \"pending exception\" logic in its Object.assign implementation,\n\t// which is 72% slower than our shim, and Firefox 40's native implementation.\n\tvar thrower = Object.preventExtensions({ 1: 2 });\n\ttry {\n\t\tObject.assign(thrower, 'xy');\n\t} catch (e) {\n\t\treturn thrower[1] === 'y';\n\t}\n\treturn false;\n};\n\nmodule.exports = function getPolyfill() {\n\tif (!Object.assign) {\n\t\treturn implementation;\n\t}\n\tif (lacksProperEnumerationOrder()) {\n\t\treturn implementation;\n\t}\n\tif (assignHasPendingExceptions()) {\n\t\treturn implementation;\n\t}\n\treturn Object.assign;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/object.assign/polyfill.js?");

	/***/ }),

	/***/ "./node_modules/object.assign/shim.js":
	/*!********************************************!*\
	  !*** ./node_modules/object.assign/shim.js ***!
	  \********************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar define = __webpack_require__(/*! define-properties */ \"./node_modules/define-properties/index.js\");\nvar getPolyfill = __webpack_require__(/*! ./polyfill */ \"./node_modules/object.assign/polyfill.js\");\n\nmodule.exports = function shimAssign() {\n\tvar polyfill = getPolyfill();\n\tdefine(\n\t\tObject,\n\t\t{ assign: polyfill },\n\t\t{ assign: function () { return Object.assign !== polyfill; } }\n\t);\n\treturn polyfill;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/object.assign/shim.js?");

	/***/ }),

	/***/ "./node_modules/parchment/src/attributor/attributor.ts":
	/*!*************************************************************!*\
	  !*** ./node_modules/parchment/src/attributor/attributor.ts ***!
	  \*************************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Attributor; });\n/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scope */ \"./node_modules/parchment/src/scope.ts\");\n\nclass Attributor {\n    constructor(attrName, keyName, options = {}) {\n        this.attrName = attrName;\n        this.keyName = keyName;\n        const attributeBit = _scope__WEBPACK_IMPORTED_MODULE_0__[\"default\"].TYPE & _scope__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ATTRIBUTE;\n        this.scope =\n            options.scope != null\n                ? // Ignore type bits, force attribute bit\n                    (options.scope & _scope__WEBPACK_IMPORTED_MODULE_0__[\"default\"].LEVEL) | attributeBit\n                : _scope__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ATTRIBUTE;\n        if (options.whitelist != null) {\n            this.whitelist = options.whitelist;\n        }\n    }\n    static keys(node) {\n        return Array.from(node.attributes).map((item) => item.name);\n    }\n    add(node, value) {\n        if (!this.canAdd(node, value)) {\n            return false;\n        }\n        node.setAttribute(this.keyName, value);\n        return true;\n    }\n    canAdd(_node, value) {\n        if (this.whitelist == null) {\n            return true;\n        }\n        if (typeof value === 'string') {\n            return this.whitelist.indexOf(value.replace(/[\"']/g, '')) > -1;\n        }\n        else {\n            return this.whitelist.indexOf(value) > -1;\n        }\n    }\n    remove(node) {\n        node.removeAttribute(this.keyName);\n    }\n    value(node) {\n        const value = node.getAttribute(this.keyName);\n        if (this.canAdd(node, value) && value) {\n            return value;\n        }\n        return '';\n    }\n}\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/attributor/attributor.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/attributor/class.ts":
	/*!********************************************************!*\
	  !*** ./node_modules/parchment/src/attributor/class.ts ***!
	  \********************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _attributor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attributor */ \"./node_modules/parchment/src/attributor/attributor.ts\");\n\nfunction match(node, prefix) {\n    const className = node.getAttribute('class') || '';\n    return className\n        .split(/\\s+/)\n        .filter((name) => name.indexOf(`${prefix}-`) === 0);\n}\nclass ClassAttributor extends _attributor__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    static keys(node) {\n        return (node.getAttribute('class') || '')\n            .split(/\\s+/)\n            .map((name) => name.split('-').slice(0, -1).join('-'));\n    }\n    add(node, value) {\n        if (!this.canAdd(node, value)) {\n            return false;\n        }\n        this.remove(node);\n        node.classList.add(`${this.keyName}-${value}`);\n        return true;\n    }\n    remove(node) {\n        const matches = match(node, this.keyName);\n        matches.forEach((name) => {\n            node.classList.remove(name);\n        });\n        if (node.classList.length === 0) {\n            node.removeAttribute('class');\n        }\n    }\n    value(node) {\n        const result = match(node, this.keyName)[0] || '';\n        const value = result.slice(this.keyName.length + 1); // +1 for hyphen\n        return this.canAdd(node, value) ? value : '';\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (ClassAttributor);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/attributor/class.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/attributor/store.ts":
	/*!********************************************************!*\
	  !*** ./node_modules/parchment/src/attributor/store.ts ***!
	  \********************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../registry */ \"./node_modules/parchment/src/registry.ts\");\n/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scope */ \"./node_modules/parchment/src/scope.ts\");\n/* harmony import */ var _attributor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./attributor */ \"./node_modules/parchment/src/attributor/attributor.ts\");\n/* harmony import */ var _class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./class */ \"./node_modules/parchment/src/attributor/class.ts\");\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style */ \"./node_modules/parchment/src/attributor/style.ts\");\n\n\n\n\n\nclass AttributorStore {\n    constructor(domNode) {\n        this.attributes = {};\n        this.domNode = domNode;\n        this.build();\n    }\n    attribute(attribute, value) {\n        // verb\n        if (value) {\n            if (attribute.add(this.domNode, value)) {\n                if (attribute.value(this.domNode) != null) {\n                    this.attributes[attribute.attrName] = attribute;\n                }\n                else {\n                    delete this.attributes[attribute.attrName];\n                }\n            }\n        }\n        else {\n            attribute.remove(this.domNode);\n            delete this.attributes[attribute.attrName];\n        }\n    }\n    build() {\n        this.attributes = {};\n        const blot = _registry__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(this.domNode);\n        if (blot == null) {\n            return;\n        }\n        const attributes = _attributor__WEBPACK_IMPORTED_MODULE_2__[\"default\"].keys(this.domNode);\n        const classes = _class__WEBPACK_IMPORTED_MODULE_3__[\"default\"].keys(this.domNode);\n        const styles = _style__WEBPACK_IMPORTED_MODULE_4__[\"default\"].keys(this.domNode);\n        attributes\n            .concat(classes)\n            .concat(styles)\n            .forEach((name) => {\n            const attr = blot.scroll.query(name, _scope__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ATTRIBUTE);\n            if (attr instanceof _attributor__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n                this.attributes[attr.attrName] = attr;\n            }\n        });\n    }\n    copy(target) {\n        Object.keys(this.attributes).forEach((key) => {\n            const value = this.attributes[key].value(this.domNode);\n            target.format(key, value);\n        });\n    }\n    move(target) {\n        this.copy(target);\n        Object.keys(this.attributes).forEach((key) => {\n            this.attributes[key].remove(this.domNode);\n        });\n        this.attributes = {};\n    }\n    values() {\n        return Object.keys(this.attributes).reduce((attributes, name) => {\n            attributes[name] = this.attributes[name].value(this.domNode);\n            return attributes;\n        }, {});\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (AttributorStore);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/attributor/store.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/attributor/style.ts":
	/*!********************************************************!*\
	  !*** ./node_modules/parchment/src/attributor/style.ts ***!
	  \********************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _attributor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./attributor */ \"./node_modules/parchment/src/attributor/attributor.ts\");\n\nfunction camelize(name) {\n    const parts = name.split('-');\n    const rest = parts\n        .slice(1)\n        .map((part) => part[0].toUpperCase() + part.slice(1))\n        .join('');\n    return parts[0] + rest;\n}\nclass StyleAttributor extends _attributor__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    static keys(node) {\n        return (node.getAttribute('style') || '').split(';').map((value) => {\n            const arr = value.split(':');\n            return arr[0].trim();\n        });\n    }\n    add(node, value) {\n        if (!this.canAdd(node, value)) {\n            return false;\n        }\n        // @ts-ignore\n        node.style[camelize(this.keyName)] = value;\n        return true;\n    }\n    remove(node) {\n        // @ts-ignore\n        node.style[camelize(this.keyName)] = '';\n        if (!node.getAttribute('style')) {\n            node.removeAttribute('style');\n        }\n    }\n    value(node) {\n        // @ts-ignore\n        const value = node.style[camelize(this.keyName)];\n        return this.canAdd(node, value) ? value : '';\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (StyleAttributor);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/attributor/style.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/blot/abstract/container.ts":
	/*!***************************************************************!*\
	  !*** ./node_modules/parchment/src/blot/abstract/container.ts ***!
	  \***************************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scope */ \"./node_modules/parchment/src/scope.ts\");\n/* harmony import */ var _parent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parent */ \"./node_modules/parchment/src/blot/abstract/parent.ts\");\n\n\nclass ContainerBlot extends _parent__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n    checkMerge() {\n        return (this.next !== null && this.next.statics.blotName === this.statics.blotName);\n    }\n    deleteAt(index, length) {\n        super.deleteAt(index, length);\n        this.enforceAllowedChildren();\n    }\n    formatAt(index, length, name, value) {\n        super.formatAt(index, length, name, value);\n        this.enforceAllowedChildren();\n    }\n    insertAt(index, value, def) {\n        super.insertAt(index, value, def);\n        this.enforceAllowedChildren();\n    }\n    optimize(context) {\n        super.optimize(context);\n        if (this.children.length > 0 && this.next != null && this.checkMerge()) {\n            this.next.moveChildren(this);\n            this.next.remove();\n        }\n    }\n}\nContainerBlot.blotName = 'container';\nContainerBlot.scope = _scope__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BLOCK_BLOT;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ContainerBlot);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/blot/abstract/container.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/blot/abstract/leaf.ts":
	/*!**********************************************************!*\
	  !*** ./node_modules/parchment/src/blot/abstract/leaf.ts ***!
	  \**********************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scope */ \"./node_modules/parchment/src/scope.ts\");\n/* harmony import */ var _shadow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shadow */ \"./node_modules/parchment/src/blot/abstract/shadow.ts\");\n\n\nclass LeafBlot extends _shadow__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n    static value(_domNode) {\n        return true;\n    }\n    index(node, offset) {\n        if (this.domNode === node ||\n            this.domNode.compareDocumentPosition(node) &\n                Node.DOCUMENT_POSITION_CONTAINED_BY) {\n            return Math.min(offset, 1);\n        }\n        return -1;\n    }\n    position(index, _inclusive) {\n        const childNodes = Array.from(this.parent.domNode.childNodes);\n        let offset = childNodes.indexOf(this.domNode);\n        if (index > 0) {\n            offset += 1;\n        }\n        return [this.parent.domNode, offset];\n    }\n    value() {\n        return {\n            [this.statics.blotName]: this.statics.value(this.domNode) || true,\n        };\n    }\n}\nLeafBlot.scope = _scope__WEBPACK_IMPORTED_MODULE_0__[\"default\"].INLINE_BLOT;\n/* harmony default export */ __webpack_exports__[\"default\"] = (LeafBlot);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/blot/abstract/leaf.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/blot/abstract/parent.ts":
	/*!************************************************************!*\
	  !*** ./node_modules/parchment/src/blot/abstract/parent.ts ***!
	  \************************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _collection_linked_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../collection/linked-list */ \"./node_modules/parchment/src/collection/linked-list.ts\");\n/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../error */ \"./node_modules/parchment/src/error.ts\");\n/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../scope */ \"./node_modules/parchment/src/scope.ts\");\n/* harmony import */ var _shadow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shadow */ \"./node_modules/parchment/src/blot/abstract/shadow.ts\");\n\n\n\n\nfunction makeAttachedBlot(node, scroll) {\n    let blot = scroll.find(node);\n    if (blot == null) {\n        try {\n            blot = scroll.create(node);\n        }\n        catch (e) {\n            blot = scroll.create(_scope__WEBPACK_IMPORTED_MODULE_2__[\"default\"].INLINE);\n            Array.from(node.childNodes).forEach((child) => {\n                // @ts-ignore\n                blot.domNode.appendChild(child);\n            });\n            if (node.parentNode) {\n                node.parentNode.replaceChild(blot.domNode, node);\n            }\n            blot.attach();\n        }\n    }\n    return blot;\n}\nclass ParentBlot extends _shadow__WEBPACK_IMPORTED_MODULE_3__[\"default\"] {\n    constructor(scroll, domNode) {\n        super(scroll, domNode);\n        this.uiNode = null;\n        this.build();\n    }\n    appendChild(other) {\n        this.insertBefore(other);\n    }\n    attach() {\n        super.attach();\n        this.children.forEach((child) => {\n            child.attach();\n        });\n    }\n    attachUI(node) {\n        if (this.uiNode != null) {\n            this.uiNode.remove();\n        }\n        this.uiNode = node;\n        if (ParentBlot.uiClass) {\n            this.uiNode.classList.add(ParentBlot.uiClass);\n        }\n        this.uiNode.setAttribute('contenteditable', 'false');\n        this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);\n    }\n    build() {\n        this.children = new _collection_linked_list__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        // Need to be reversed for if DOM nodes already in order\n        Array.from(this.domNode.childNodes)\n            .filter((node) => node !== this.uiNode)\n            .reverse()\n            .forEach((node) => {\n            try {\n                const child = makeAttachedBlot(node, this.scroll);\n                this.insertBefore(child, this.children.head || undefined);\n            }\n            catch (err) {\n                if (err instanceof _error__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n                    return;\n                }\n                else {\n                    throw err;\n                }\n            }\n        });\n    }\n    deleteAt(index, length) {\n        if (index === 0 && length === this.length()) {\n            return this.remove();\n        }\n        this.children.forEachAt(index, length, (child, offset, childLength) => {\n            child.deleteAt(offset, childLength);\n        });\n    }\n    descendant(criteria, index = 0) {\n        const [child, offset] = this.children.find(index);\n        if ((criteria.blotName == null && criteria(child)) ||\n            (criteria.blotName != null && child instanceof criteria)) {\n            return [child, offset];\n        }\n        else if (child instanceof ParentBlot) {\n            return child.descendant(criteria, offset);\n        }\n        else {\n            return [null, -1];\n        }\n    }\n    descendants(criteria, index = 0, length = Number.MAX_VALUE) {\n        let descendants = [];\n        let lengthLeft = length;\n        this.children.forEachAt(index, length, (child, childIndex, childLength) => {\n            if ((criteria.blotName == null && criteria(child)) ||\n                (criteria.blotName != null && child instanceof criteria)) {\n                descendants.push(child);\n            }\n            if (child instanceof ParentBlot) {\n                descendants = descendants.concat(child.descendants(criteria, childIndex, lengthLeft));\n            }\n            lengthLeft -= childLength;\n        });\n        return descendants;\n    }\n    detach() {\n        this.children.forEach((child) => {\n            child.detach();\n        });\n        super.detach();\n    }\n    enforceAllowedChildren() {\n        let done = false;\n        this.children.forEach((child) => {\n            if (done) {\n                return;\n            }\n            const allowed = this.statics.allowedChildren.some((def) => child instanceof def);\n            if (allowed) {\n                return;\n            }\n            if (child.statics.scope === _scope__WEBPACK_IMPORTED_MODULE_2__[\"default\"].BLOCK_BLOT) {\n                if (child.next != null) {\n                    this.splitAfter(child);\n                }\n                if (child.prev != null) {\n                    this.splitAfter(child.prev);\n                }\n                child.parent.unwrap();\n                done = true;\n            }\n            else if (child instanceof ParentBlot) {\n                child.unwrap();\n            }\n            else {\n                child.remove();\n            }\n        });\n    }\n    formatAt(index, length, name, value) {\n        this.children.forEachAt(index, length, (child, offset, childLength) => {\n            child.formatAt(offset, childLength, name, value);\n        });\n    }\n    insertAt(index, value, def) {\n        const [child, offset] = this.children.find(index);\n        if (child) {\n            child.insertAt(offset, value, def);\n        }\n        else {\n            const blot = def == null\n                ? this.scroll.create('text', value)\n                : this.scroll.create(value, def);\n            this.appendChild(blot);\n        }\n    }\n    insertBefore(childBlot, refBlot) {\n        if (childBlot.parent != null) {\n            childBlot.parent.children.remove(childBlot);\n        }\n        let refDomNode = null;\n        this.children.insertBefore(childBlot, refBlot || null);\n        childBlot.parent = this;\n        if (refBlot != null) {\n            refDomNode = refBlot.domNode;\n        }\n        if (this.domNode.parentNode !== childBlot.domNode ||\n            this.domNode.nextSibling !== refDomNode) {\n            this.domNode.insertBefore(childBlot.domNode, refDomNode);\n        }\n        childBlot.attach();\n    }\n    length() {\n        return this.children.reduce((memo, child) => {\n            return memo + child.length();\n        }, 0);\n    }\n    moveChildren(targetParent, refNode) {\n        this.children.forEach((child) => {\n            targetParent.insertBefore(child, refNode);\n        });\n    }\n    optimize(context) {\n        super.optimize(context);\n        this.enforceAllowedChildren();\n        if (this.uiNode != null && this.uiNode !== this.domNode.firstChild) {\n            this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);\n        }\n        if (this.children.length === 0) {\n            if (this.statics.defaultChild != null) {\n                const child = this.scroll.create(this.statics.defaultChild.blotName);\n                this.appendChild(child);\n                // TODO double check if necessary\n                // child.optimize(context);\n            }\n            else {\n                this.remove();\n            }\n        }\n    }\n    path(index, inclusive = false) {\n        const [child, offset] = this.children.find(index, inclusive);\n        const position = [[this, index]];\n        if (child instanceof ParentBlot) {\n            return position.concat(child.path(offset, inclusive));\n        }\n        else if (child != null) {\n            position.push([child, offset]);\n        }\n        return position;\n    }\n    removeChild(child) {\n        this.children.remove(child);\n    }\n    replaceWith(name, value) {\n        const replacement = typeof name === 'string' ? this.scroll.create(name, value) : name;\n        if (replacement instanceof ParentBlot) {\n            this.moveChildren(replacement);\n        }\n        return super.replaceWith(replacement);\n    }\n    split(index, force = false) {\n        if (!force) {\n            if (index === 0) {\n                return this;\n            }\n            if (index === this.length()) {\n                return this.next;\n            }\n        }\n        const after = this.clone();\n        if (this.parent) {\n            this.parent.insertBefore(after, this.next || undefined);\n        }\n        this.children.forEachAt(index, this.length(), (child, offset, _length) => {\n            const split = child.split(offset, force);\n            if (split != null) {\n                after.appendChild(split);\n            }\n        });\n        return after;\n    }\n    splitAfter(child) {\n        const after = this.clone();\n        while (child.next != null) {\n            after.appendChild(child.next);\n        }\n        if (this.parent) {\n            this.parent.insertBefore(after, this.next || undefined);\n        }\n        return after;\n    }\n    unwrap() {\n        if (this.parent) {\n            this.moveChildren(this.parent, this.next || undefined);\n        }\n        this.remove();\n    }\n    update(mutations, _context) {\n        const addedNodes = [];\n        const removedNodes = [];\n        mutations.forEach((mutation) => {\n            if (mutation.target === this.domNode && mutation.type === 'childList') {\n                addedNodes.push(...mutation.addedNodes);\n                removedNodes.push(...mutation.removedNodes);\n            }\n        });\n        removedNodes.forEach((node) => {\n            // Check node has actually been removed\n            // One exception is Chrome does not immediately remove IFRAMEs\n            // from DOM but MutationRecord is correct in its reported removal\n            if (node.parentNode != null &&\n                // @ts-ignore\n                node.tagName !== 'IFRAME' &&\n                document.body.compareDocumentPosition(node) &\n                    Node.DOCUMENT_POSITION_CONTAINED_BY) {\n                return;\n            }\n            const blot = this.scroll.find(node);\n            if (blot == null) {\n                return;\n            }\n            if (blot.domNode.parentNode == null ||\n                blot.domNode.parentNode === this.domNode) {\n                blot.detach();\n            }\n        });\n        addedNodes\n            .filter((node) => {\n            return node.parentNode === this.domNode || node === this.uiNode;\n        })\n            .sort((a, b) => {\n            if (a === b) {\n                return 0;\n            }\n            if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) {\n                return 1;\n            }\n            return -1;\n        })\n            .forEach((node) => {\n            let refBlot = null;\n            if (node.nextSibling != null) {\n                refBlot = this.scroll.find(node.nextSibling);\n            }\n            const blot = makeAttachedBlot(node, this.scroll);\n            if (blot.next !== refBlot || blot.next == null) {\n                if (blot.parent != null) {\n                    blot.parent.removeChild(this);\n                }\n                this.insertBefore(blot, refBlot || undefined);\n            }\n        });\n        this.enforceAllowedChildren();\n    }\n}\nParentBlot.uiClass = '';\n/* harmony default export */ __webpack_exports__[\"default\"] = (ParentBlot);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/blot/abstract/parent.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/blot/abstract/shadow.ts":
	/*!************************************************************!*\
	  !*** ./node_modules/parchment/src/blot/abstract/shadow.ts ***!
	  \************************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error */ \"./node_modules/parchment/src/error.ts\");\n/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../registry */ \"./node_modules/parchment/src/registry.ts\");\n/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../scope */ \"./node_modules/parchment/src/scope.ts\");\n\n\n\nclass ShadowBlot {\n    constructor(scroll, domNode) {\n        this.scroll = scroll;\n        this.domNode = domNode;\n        _registry__WEBPACK_IMPORTED_MODULE_1__[\"default\"].blots.set(domNode, this);\n        this.prev = null;\n        this.next = null;\n    }\n    static create(value) {\n        if (this.tagName == null) {\n            throw new _error__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Blot definition missing tagName');\n        }\n        let node;\n        if (Array.isArray(this.tagName)) {\n            if (typeof value === 'string') {\n                value = value.toUpperCase();\n                if (parseInt(value, 10).toString() === value) {\n                    value = parseInt(value, 10);\n                }\n            }\n            if (typeof value === 'number') {\n                node = document.createElement(this.tagName[value - 1]);\n            }\n            else if (this.tagName.indexOf(value) > -1) {\n                node = document.createElement(value);\n            }\n            else {\n                node = document.createElement(this.tagName[0]);\n            }\n        }\n        else {\n            node = document.createElement(this.tagName);\n        }\n        if (this.className) {\n            node.classList.add(this.className);\n        }\n        return node;\n    }\n    // Hack for accessing inherited static methods\n    get statics() {\n        return this.constructor;\n    }\n    attach() {\n        // Nothing to do\n    }\n    clone() {\n        const domNode = this.domNode.cloneNode(false);\n        return this.scroll.create(domNode);\n    }\n    detach() {\n        if (this.parent != null) {\n            this.parent.removeChild(this);\n        }\n        _registry__WEBPACK_IMPORTED_MODULE_1__[\"default\"].blots.delete(this.domNode);\n    }\n    deleteAt(index, length) {\n        const blot = this.isolate(index, length);\n        blot.remove();\n    }\n    formatAt(index, length, name, value) {\n        const blot = this.isolate(index, length);\n        if (this.scroll.query(name, _scope__WEBPACK_IMPORTED_MODULE_2__[\"default\"].BLOT) != null && value) {\n            blot.wrap(name, value);\n        }\n        else if (this.scroll.query(name, _scope__WEBPACK_IMPORTED_MODULE_2__[\"default\"].ATTRIBUTE) != null) {\n            const parent = this.scroll.create(this.statics.scope);\n            blot.wrap(parent);\n            parent.format(name, value);\n        }\n    }\n    insertAt(index, value, def) {\n        const blot = def == null\n            ? this.scroll.create('text', value)\n            : this.scroll.create(value, def);\n        const ref = this.split(index);\n        this.parent.insertBefore(blot, ref || undefined);\n    }\n    isolate(index, length) {\n        const target = this.split(index);\n        if (target == null) {\n            throw new Error('Attempt to isolate at end');\n        }\n        target.split(length);\n        return target;\n    }\n    length() {\n        return 1;\n    }\n    offset(root = this.parent) {\n        if (this.parent == null || this === root) {\n            return 0;\n        }\n        return this.parent.children.offset(this) + this.parent.offset(root);\n    }\n    optimize(_context) {\n        if (this.statics.requiredContainer &&\n            !(this.parent instanceof this.statics.requiredContainer)) {\n            this.wrap(this.statics.requiredContainer.blotName);\n        }\n    }\n    remove() {\n        if (this.domNode.parentNode != null) {\n            this.domNode.parentNode.removeChild(this.domNode);\n        }\n        this.detach();\n    }\n    replaceWith(name, value) {\n        const replacement = typeof name === 'string' ? this.scroll.create(name, value) : name;\n        if (this.parent != null) {\n            this.parent.insertBefore(replacement, this.next || undefined);\n            this.remove();\n        }\n        return replacement;\n    }\n    split(index, _force) {\n        return index === 0 ? this : this.next;\n    }\n    update(_mutations, _context) {\n        // Nothing to do by default\n    }\n    wrap(name, value) {\n        const wrapper = typeof name === 'string'\n            ? this.scroll.create(name, value)\n            : name;\n        if (this.parent != null) {\n            this.parent.insertBefore(wrapper, this.next || undefined);\n        }\n        if (typeof wrapper.appendChild !== 'function') {\n            throw new _error__WEBPACK_IMPORTED_MODULE_0__[\"default\"](`Cannot wrap ${name}`);\n        }\n        wrapper.appendChild(this);\n        return wrapper;\n    }\n}\nShadowBlot.blotName = 'abstract';\n/* harmony default export */ __webpack_exports__[\"default\"] = (ShadowBlot);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/blot/abstract/shadow.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/blot/block.ts":
	/*!**************************************************!*\
	  !*** ./node_modules/parchment/src/blot/block.ts ***!
	  \**************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _attributor_attributor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../attributor/attributor */ \"./node_modules/parchment/src/attributor/attributor.ts\");\n/* harmony import */ var _attributor_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../attributor/store */ \"./node_modules/parchment/src/attributor/store.ts\");\n/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scope */ \"./node_modules/parchment/src/scope.ts\");\n/* harmony import */ var _abstract_leaf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./abstract/leaf */ \"./node_modules/parchment/src/blot/abstract/leaf.ts\");\n/* harmony import */ var _abstract_parent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./abstract/parent */ \"./node_modules/parchment/src/blot/abstract/parent.ts\");\n/* harmony import */ var _inline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./inline */ \"./node_modules/parchment/src/blot/inline.ts\");\n\n\n\n\n\n\nclass BlockBlot extends _abstract_parent__WEBPACK_IMPORTED_MODULE_4__[\"default\"] {\n    constructor(scroll, domNode) {\n        super(scroll, domNode);\n        this.attributes = new _attributor_store__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.domNode);\n    }\n    static formats(domNode, scroll) {\n        const match = scroll.query(BlockBlot.blotName);\n        if (match != null &&\n            domNode.tagName === match.tagName) {\n            return undefined;\n        }\n        else if (typeof this.tagName === 'string') {\n            return true;\n        }\n        else if (Array.isArray(this.tagName)) {\n            return domNode.tagName.toLowerCase();\n        }\n    }\n    format(name, value) {\n        const format = this.scroll.query(name, _scope__WEBPACK_IMPORTED_MODULE_2__[\"default\"].BLOCK);\n        if (format == null) {\n            return;\n        }\n        else if (format instanceof _attributor_attributor__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n            this.attributes.attribute(format, value);\n        }\n        else if (name === this.statics.blotName && !value) {\n            this.replaceWith(BlockBlot.blotName);\n        }\n        else if (value &&\n            (name !== this.statics.blotName || this.formats()[name] !== value)) {\n            this.replaceWith(name, value);\n        }\n    }\n    formats() {\n        const formats = this.attributes.values();\n        const format = this.statics.formats(this.domNode, this.scroll);\n        if (format != null) {\n            formats[this.statics.blotName] = format;\n        }\n        return formats;\n    }\n    formatAt(index, length, name, value) {\n        if (this.scroll.query(name, _scope__WEBPACK_IMPORTED_MODULE_2__[\"default\"].BLOCK) != null) {\n            this.format(name, value);\n        }\n        else {\n            super.formatAt(index, length, name, value);\n        }\n    }\n    insertAt(index, value, def) {\n        if (def == null || this.scroll.query(value, _scope__WEBPACK_IMPORTED_MODULE_2__[\"default\"].INLINE) != null) {\n            // Insert text or inline\n            super.insertAt(index, value, def);\n        }\n        else {\n            const after = this.split(index);\n            if (after != null) {\n                const blot = this.scroll.create(value, def);\n                after.parent.insertBefore(blot, after);\n            }\n            else {\n                throw new Error('Attempt to insertAt after block boundaries');\n            }\n        }\n    }\n    replaceWith(name, value) {\n        const replacement = super.replaceWith(name, value);\n        this.attributes.copy(replacement);\n        return replacement;\n    }\n    update(mutations, context) {\n        super.update(mutations, context);\n        const attributeChanged = mutations.some((mutation) => mutation.target === this.domNode && mutation.type === 'attributes');\n        if (attributeChanged) {\n            this.attributes.build();\n        }\n    }\n}\nBlockBlot.blotName = 'block';\nBlockBlot.scope = _scope__WEBPACK_IMPORTED_MODULE_2__[\"default\"].BLOCK_BLOT;\nBlockBlot.tagName = 'P';\nBlockBlot.allowedChildren = [\n    _inline__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n    BlockBlot,\n    _abstract_leaf__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n];\n/* harmony default export */ __webpack_exports__[\"default\"] = (BlockBlot);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/blot/block.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/blot/embed.ts":
	/*!**************************************************!*\
	  !*** ./node_modules/parchment/src/blot/embed.ts ***!
	  \**************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _abstract_leaf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract/leaf */ \"./node_modules/parchment/src/blot/abstract/leaf.ts\");\n\nclass EmbedBlot extends _abstract_leaf__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    static formats(_domNode, _scroll) {\n        return undefined;\n    }\n    format(name, value) {\n        // super.formatAt wraps, which is what we want in general,\n        // but this allows subclasses to overwrite for formats\n        // that just apply to particular embeds\n        super.formatAt(0, this.length(), name, value);\n    }\n    formatAt(index, length, name, value) {\n        if (index === 0 && length === this.length()) {\n            this.format(name, value);\n        }\n        else {\n            super.formatAt(index, length, name, value);\n        }\n    }\n    formats() {\n        return this.statics.formats(this.domNode, this.scroll);\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (EmbedBlot);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/blot/embed.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/blot/inline.ts":
	/*!***************************************************!*\
	  !*** ./node_modules/parchment/src/blot/inline.ts ***!
	  \***************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _attributor_attributor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../attributor/attributor */ \"./node_modules/parchment/src/attributor/attributor.ts\");\n/* harmony import */ var _attributor_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../attributor/store */ \"./node_modules/parchment/src/attributor/store.ts\");\n/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scope */ \"./node_modules/parchment/src/scope.ts\");\n/* harmony import */ var _abstract_leaf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./abstract/leaf */ \"./node_modules/parchment/src/blot/abstract/leaf.ts\");\n/* harmony import */ var _abstract_parent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./abstract/parent */ \"./node_modules/parchment/src/blot/abstract/parent.ts\");\n\n\n\n\n\n// Shallow object comparison\nfunction isEqual(obj1, obj2) {\n    if (Object.keys(obj1).length !== Object.keys(obj2).length) {\n        return false;\n    }\n    // @ts-ignore\n    for (const prop in obj1) {\n        // @ts-ignore\n        if (obj1[prop] !== obj2[prop]) {\n            return false;\n        }\n    }\n    return true;\n}\nclass InlineBlot extends _abstract_parent__WEBPACK_IMPORTED_MODULE_4__[\"default\"] {\n    constructor(scroll, domNode) {\n        super(scroll, domNode);\n        this.attributes = new _attributor_store__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.domNode);\n    }\n    static formats(domNode, scroll) {\n        const match = scroll.query(InlineBlot.blotName);\n        if (match != null &&\n            domNode.tagName === match.tagName) {\n            return undefined;\n        }\n        else if (typeof this.tagName === 'string') {\n            return true;\n        }\n        else if (Array.isArray(this.tagName)) {\n            return domNode.tagName.toLowerCase();\n        }\n        return undefined;\n    }\n    format(name, value) {\n        if (name === this.statics.blotName && !value) {\n            this.children.forEach((child) => {\n                if (!(child instanceof InlineBlot)) {\n                    child = child.wrap(InlineBlot.blotName, true);\n                }\n                this.attributes.copy(child);\n            });\n            this.unwrap();\n        }\n        else {\n            const format = this.scroll.query(name, _scope__WEBPACK_IMPORTED_MODULE_2__[\"default\"].INLINE);\n            if (format == null) {\n                return;\n            }\n            if (format instanceof _attributor_attributor__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n                this.attributes.attribute(format, value);\n            }\n            else if (value &&\n                (name !== this.statics.blotName || this.formats()[name] !== value)) {\n                this.replaceWith(name, value);\n            }\n        }\n    }\n    formats() {\n        const formats = this.attributes.values();\n        const format = this.statics.formats(this.domNode, this.scroll);\n        if (format != null) {\n            formats[this.statics.blotName] = format;\n        }\n        return formats;\n    }\n    formatAt(index, length, name, value) {\n        if (this.formats()[name] != null ||\n            this.scroll.query(name, _scope__WEBPACK_IMPORTED_MODULE_2__[\"default\"].ATTRIBUTE)) {\n            const blot = this.isolate(index, length);\n            blot.format(name, value);\n        }\n        else {\n            super.formatAt(index, length, name, value);\n        }\n    }\n    optimize(context) {\n        super.optimize(context);\n        const formats = this.formats();\n        if (Object.keys(formats).length === 0) {\n            return this.unwrap(); // unformatted span\n        }\n        const next = this.next;\n        if (next instanceof InlineBlot &&\n            next.prev === this &&\n            isEqual(formats, next.formats())) {\n            next.moveChildren(this);\n            next.remove();\n        }\n    }\n    replaceWith(name, value) {\n        const replacement = super.replaceWith(name, value);\n        this.attributes.copy(replacement);\n        return replacement;\n    }\n    update(mutations, context) {\n        super.update(mutations, context);\n        const attributeChanged = mutations.some((mutation) => mutation.target === this.domNode && mutation.type === 'attributes');\n        if (attributeChanged) {\n            this.attributes.build();\n        }\n    }\n    wrap(name, value) {\n        const wrapper = super.wrap(name, value);\n        if (wrapper instanceof InlineBlot) {\n            this.attributes.move(wrapper);\n        }\n        return wrapper;\n    }\n}\nInlineBlot.allowedChildren = [InlineBlot, _abstract_leaf__WEBPACK_IMPORTED_MODULE_3__[\"default\"]];\nInlineBlot.blotName = 'inline';\nInlineBlot.scope = _scope__WEBPACK_IMPORTED_MODULE_2__[\"default\"].INLINE_BLOT;\nInlineBlot.tagName = 'SPAN';\n/* harmony default export */ __webpack_exports__[\"default\"] = (InlineBlot);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/blot/inline.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/blot/scroll.ts":
	/*!***************************************************!*\
	  !*** ./node_modules/parchment/src/blot/scroll.ts ***!
	  \***************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../registry */ \"./node_modules/parchment/src/registry.ts\");\n/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scope */ \"./node_modules/parchment/src/scope.ts\");\n/* harmony import */ var _abstract_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./abstract/container */ \"./node_modules/parchment/src/blot/abstract/container.ts\");\n/* harmony import */ var _abstract_parent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./abstract/parent */ \"./node_modules/parchment/src/blot/abstract/parent.ts\");\n/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block */ \"./node_modules/parchment/src/blot/block.ts\");\n\n\n\n\n\nconst OBSERVER_CONFIG = {\n    attributes: true,\n    characterData: true,\n    characterDataOldValue: true,\n    childList: true,\n    subtree: true,\n};\nconst MAX_OPTIMIZE_ITERATIONS = 100;\nclass ScrollBlot extends _abstract_parent__WEBPACK_IMPORTED_MODULE_3__[\"default\"] {\n    constructor(registry, node) {\n        // @ts-ignore\n        super(null, node);\n        this.registry = registry;\n        this.scroll = this;\n        this.build();\n        this.observer = new MutationObserver((mutations) => {\n            this.update(mutations);\n        });\n        this.observer.observe(this.domNode, OBSERVER_CONFIG);\n        this.attach();\n    }\n    create(input, value) {\n        return this.registry.create(this, input, value);\n    }\n    find(node, bubble = false) {\n        return this.registry.find(node, bubble);\n    }\n    query(query, scope = _scope__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ANY) {\n        return this.registry.query(query, scope);\n    }\n    register(...definitions) {\n        return this.registry.register(...definitions);\n    }\n    build() {\n        if (this.scroll == null) {\n            return;\n        }\n        super.build();\n    }\n    detach() {\n        super.detach();\n        this.observer.disconnect();\n    }\n    deleteAt(index, length) {\n        this.update();\n        if (index === 0 && length === this.length()) {\n            this.children.forEach((child) => {\n                child.remove();\n            });\n        }\n        else {\n            super.deleteAt(index, length);\n        }\n    }\n    formatAt(index, length, name, value) {\n        this.update();\n        super.formatAt(index, length, name, value);\n    }\n    insertAt(index, value, def) {\n        this.update();\n        super.insertAt(index, value, def);\n    }\n    optimize(mutations = [], context = {}) {\n        super.optimize(context);\n        const mutationsMap = context.mutationsMap || new WeakMap();\n        // We must modify mutations directly, cannot make copy and then modify\n        let records = Array.from(this.observer.takeRecords());\n        // Array.push currently seems to be implemented by a non-tail recursive function\n        // so we cannot just mutations.push.apply(mutations, this.observer.takeRecords());\n        while (records.length > 0) {\n            mutations.push(records.pop());\n        }\n        const mark = (blot, markParent = true) => {\n            if (blot == null || blot === this) {\n                return;\n            }\n            if (blot.domNode.parentNode == null) {\n                return;\n            }\n            if (!mutationsMap.has(blot.domNode)) {\n                mutationsMap.set(blot.domNode, []);\n            }\n            if (markParent) {\n                mark(blot.parent);\n            }\n        };\n        const optimize = (blot) => {\n            // Post-order traversal\n            if (!mutationsMap.has(blot.domNode)) {\n                return;\n            }\n            if (blot instanceof _abstract_parent__WEBPACK_IMPORTED_MODULE_3__[\"default\"]) {\n                blot.children.forEach(optimize);\n            }\n            mutationsMap.delete(blot.domNode);\n            blot.optimize(context);\n        };\n        let remaining = mutations;\n        for (let i = 0; remaining.length > 0; i += 1) {\n            if (i >= MAX_OPTIMIZE_ITERATIONS) {\n                throw new Error('[Parchment] Maximum optimize iterations reached');\n            }\n            remaining.forEach((mutation) => {\n                const blot = this.find(mutation.target, true);\n                if (blot == null) {\n                    return;\n                }\n                if (blot.domNode === mutation.target) {\n                    if (mutation.type === 'childList') {\n                        mark(this.find(mutation.previousSibling, false));\n                        Array.from(mutation.addedNodes).forEach((node) => {\n                            const child = this.find(node, false);\n                            mark(child, false);\n                            if (child instanceof _abstract_parent__WEBPACK_IMPORTED_MODULE_3__[\"default\"]) {\n                                child.children.forEach((grandChild) => {\n                                    mark(grandChild, false);\n                                });\n                            }\n                        });\n                    }\n                    else if (mutation.type === 'attributes') {\n                        mark(blot.prev);\n                    }\n                }\n                mark(blot);\n            });\n            this.children.forEach(optimize);\n            remaining = Array.from(this.observer.takeRecords());\n            records = remaining.slice();\n            while (records.length > 0) {\n                mutations.push(records.pop());\n            }\n        }\n    }\n    update(mutations, context = {}) {\n        mutations = mutations || this.observer.takeRecords();\n        const mutationsMap = new WeakMap();\n        mutations\n            .map((mutation) => {\n            const blot = _registry__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(mutation.target, true);\n            if (blot == null) {\n                return null;\n            }\n            if (mutationsMap.has(blot.domNode)) {\n                mutationsMap.get(blot.domNode).push(mutation);\n                return null;\n            }\n            else {\n                mutationsMap.set(blot.domNode, [mutation]);\n                return blot;\n            }\n        })\n            .forEach((blot) => {\n            if (blot != null && blot !== this && mutationsMap.has(blot.domNode)) {\n                blot.update(mutationsMap.get(blot.domNode) || [], context);\n            }\n        });\n        context.mutationsMap = mutationsMap;\n        if (mutationsMap.has(this.domNode)) {\n            super.update(mutationsMap.get(this.domNode), context);\n        }\n        this.optimize(mutations, context);\n    }\n}\nScrollBlot.blotName = 'scroll';\nScrollBlot.defaultChild = _block__WEBPACK_IMPORTED_MODULE_4__[\"default\"];\nScrollBlot.allowedChildren = [_block__WEBPACK_IMPORTED_MODULE_4__[\"default\"], _abstract_container__WEBPACK_IMPORTED_MODULE_2__[\"default\"]];\nScrollBlot.scope = _scope__WEBPACK_IMPORTED_MODULE_1__[\"default\"].BLOCK_BLOT;\nScrollBlot.tagName = 'DIV';\n/* harmony default export */ __webpack_exports__[\"default\"] = (ScrollBlot);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/blot/scroll.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/blot/text.ts":
	/*!*************************************************!*\
	  !*** ./node_modules/parchment/src/blot/text.ts ***!
	  \*************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scope */ \"./node_modules/parchment/src/scope.ts\");\n/* harmony import */ var _abstract_leaf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract/leaf */ \"./node_modules/parchment/src/blot/abstract/leaf.ts\");\n\n\nclass TextBlot extends _abstract_leaf__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n    constructor(scroll, node) {\n        super(scroll, node);\n        this.text = this.statics.value(this.domNode);\n    }\n    static create(value) {\n        return document.createTextNode(value);\n    }\n    static value(domNode) {\n        return domNode.data;\n    }\n    deleteAt(index, length) {\n        this.domNode.data = this.text =\n            this.text.slice(0, index) + this.text.slice(index + length);\n    }\n    index(node, offset) {\n        if (this.domNode === node) {\n            return offset;\n        }\n        return -1;\n    }\n    insertAt(index, value, def) {\n        if (def == null) {\n            this.text = this.text.slice(0, index) + value + this.text.slice(index);\n            this.domNode.data = this.text;\n        }\n        else {\n            super.insertAt(index, value, def);\n        }\n    }\n    length() {\n        return this.text.length;\n    }\n    optimize(context) {\n        super.optimize(context);\n        this.text = this.statics.value(this.domNode);\n        if (this.text.length === 0) {\n            this.remove();\n        }\n        else if (this.next instanceof TextBlot && this.next.prev === this) {\n            this.insertAt(this.length(), this.next.value());\n            this.next.remove();\n        }\n    }\n    position(index, _inclusive = false) {\n        return [this.domNode, index];\n    }\n    split(index, force = false) {\n        if (!force) {\n            if (index === 0) {\n                return this;\n            }\n            if (index === this.length()) {\n                return this.next;\n            }\n        }\n        const after = this.scroll.create(this.domNode.splitText(index));\n        this.parent.insertBefore(after, this.next || undefined);\n        this.text = this.statics.value(this.domNode);\n        return after;\n    }\n    update(mutations, _context) {\n        if (mutations.some((mutation) => {\n            return (mutation.type === 'characterData' && mutation.target === this.domNode);\n        })) {\n            this.text = this.statics.value(this.domNode);\n        }\n    }\n    value() {\n        return this.text;\n    }\n}\nTextBlot.blotName = 'text';\nTextBlot.scope = _scope__WEBPACK_IMPORTED_MODULE_0__[\"default\"].INLINE_BLOT;\n/* harmony default export */ __webpack_exports__[\"default\"] = (TextBlot);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/blot/text.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/collection/linked-list.ts":
	/*!**************************************************************!*\
	  !*** ./node_modules/parchment/src/collection/linked-list.ts ***!
	  \**************************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\nclass LinkedList {\n    constructor() {\n        this.head = null;\n        this.tail = null;\n        this.length = 0;\n    }\n    append(...nodes) {\n        this.insertBefore(nodes[0], null);\n        if (nodes.length > 1) {\n            const rest = nodes.slice(1);\n            this.append(...rest);\n        }\n    }\n    at(index) {\n        const next = this.iterator();\n        let cur = next();\n        while (cur && index > 0) {\n            index -= 1;\n            cur = next();\n        }\n        return cur;\n    }\n    contains(node) {\n        const next = this.iterator();\n        let cur = next();\n        while (cur) {\n            if (cur === node) {\n                return true;\n            }\n            cur = next();\n        }\n        return false;\n    }\n    indexOf(node) {\n        const next = this.iterator();\n        let cur = next();\n        let index = 0;\n        while (cur) {\n            if (cur === node) {\n                return index;\n            }\n            index += 1;\n            cur = next();\n        }\n        return -1;\n    }\n    insertBefore(node, refNode) {\n        if (node == null) {\n            return;\n        }\n        this.remove(node);\n        node.next = refNode;\n        if (refNode != null) {\n            node.prev = refNode.prev;\n            if (refNode.prev != null) {\n                refNode.prev.next = node;\n            }\n            refNode.prev = node;\n            if (refNode === this.head) {\n                this.head = node;\n            }\n        }\n        else if (this.tail != null) {\n            this.tail.next = node;\n            node.prev = this.tail;\n            this.tail = node;\n        }\n        else {\n            node.prev = null;\n            this.head = this.tail = node;\n        }\n        this.length += 1;\n    }\n    offset(target) {\n        let index = 0;\n        let cur = this.head;\n        while (cur != null) {\n            if (cur === target) {\n                return index;\n            }\n            index += cur.length();\n            cur = cur.next;\n        }\n        return -1;\n    }\n    remove(node) {\n        if (!this.contains(node)) {\n            return;\n        }\n        if (node.prev != null) {\n            node.prev.next = node.next;\n        }\n        if (node.next != null) {\n            node.next.prev = node.prev;\n        }\n        if (node === this.head) {\n            this.head = node.next;\n        }\n        if (node === this.tail) {\n            this.tail = node.prev;\n        }\n        this.length -= 1;\n    }\n    iterator(curNode = this.head) {\n        // TODO use yield when we can\n        return () => {\n            const ret = curNode;\n            if (curNode != null) {\n                curNode = curNode.next;\n            }\n            return ret;\n        };\n    }\n    find(index, inclusive = false) {\n        const next = this.iterator();\n        let cur = next();\n        while (cur) {\n            const length = cur.length();\n            if (index < length ||\n                (inclusive &&\n                    index === length &&\n                    (cur.next == null || cur.next.length() !== 0))) {\n                return [cur, index];\n            }\n            index -= length;\n            cur = next();\n        }\n        return [null, 0];\n    }\n    forEach(callback) {\n        const next = this.iterator();\n        let cur = next();\n        while (cur) {\n            callback(cur);\n            cur = next();\n        }\n    }\n    forEachAt(index, length, callback) {\n        if (length <= 0) {\n            return;\n        }\n        const [startNode, offset] = this.find(index);\n        let curIndex = index - offset;\n        const next = this.iterator(startNode);\n        let cur = next();\n        while (cur && curIndex < index + length) {\n            const curLength = cur.length();\n            if (index > curIndex) {\n                callback(cur, index - curIndex, Math.min(length, curIndex + curLength - index));\n            }\n            else {\n                callback(cur, 0, Math.min(curLength, index + length - curIndex));\n            }\n            curIndex += curLength;\n            cur = next();\n        }\n    }\n    map(callback) {\n        return this.reduce((memo, cur) => {\n            memo.push(callback(cur));\n            return memo;\n        }, []);\n    }\n    reduce(callback, memo) {\n        const next = this.iterator();\n        let cur = next();\n        while (cur) {\n            memo = callback(memo, cur);\n            cur = next();\n        }\n        return memo;\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (LinkedList);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/collection/linked-list.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/error.ts":
	/*!*********************************************!*\
	  !*** ./node_modules/parchment/src/error.ts ***!
	  \*********************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ParchmentError; });\nclass ParchmentError extends Error {\n    constructor(message) {\n        message = '[Parchment] ' + message;\n        super(message);\n        this.message = message;\n        this.name = this.constructor.name;\n    }\n}\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/error.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/parchment.ts":
	/*!*************************************************!*\
	  !*** ./node_modules/parchment/src/parchment.ts ***!
	  \*************************************************/
	/*! exports provided: ParentBlot, ContainerBlot, LeafBlot, EmbedBlot, ScrollBlot, BlockBlot, InlineBlot, TextBlot, Attributor, ClassAttributor, StyleAttributor, AttributorStore, Registry, Scope */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _blot_abstract_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blot/abstract/container */ \"./node_modules/parchment/src/blot/abstract/container.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ContainerBlot\", function() { return _blot_abstract_container__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _blot_abstract_leaf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blot/abstract/leaf */ \"./node_modules/parchment/src/blot/abstract/leaf.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"LeafBlot\", function() { return _blot_abstract_leaf__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _blot_abstract_parent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blot/abstract/parent */ \"./node_modules/parchment/src/blot/abstract/parent.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ParentBlot\", function() { return _blot_abstract_parent__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _blot_block__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blot/block */ \"./node_modules/parchment/src/blot/block.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BlockBlot\", function() { return _blot_block__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _blot_embed__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./blot/embed */ \"./node_modules/parchment/src/blot/embed.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"EmbedBlot\", function() { return _blot_embed__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _blot_inline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./blot/inline */ \"./node_modules/parchment/src/blot/inline.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"InlineBlot\", function() { return _blot_inline__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _blot_scroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blot/scroll */ \"./node_modules/parchment/src/blot/scroll.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ScrollBlot\", function() { return _blot_scroll__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _blot_text__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./blot/text */ \"./node_modules/parchment/src/blot/text.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TextBlot\", function() { return _blot_text__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n/* harmony import */ var _attributor_attributor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./attributor/attributor */ \"./node_modules/parchment/src/attributor/attributor.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Attributor\", function() { return _attributor_attributor__WEBPACK_IMPORTED_MODULE_8__[\"default\"]; });\n\n/* harmony import */ var _attributor_class__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./attributor/class */ \"./node_modules/parchment/src/attributor/class.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ClassAttributor\", function() { return _attributor_class__WEBPACK_IMPORTED_MODULE_9__[\"default\"]; });\n\n/* harmony import */ var _attributor_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./attributor/store */ \"./node_modules/parchment/src/attributor/store.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AttributorStore\", function() { return _attributor_store__WEBPACK_IMPORTED_MODULE_10__[\"default\"]; });\n\n/* harmony import */ var _attributor_style__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./attributor/style */ \"./node_modules/parchment/src/attributor/style.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"StyleAttributor\", function() { return _attributor_style__WEBPACK_IMPORTED_MODULE_11__[\"default\"]; });\n\n/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./registry */ \"./node_modules/parchment/src/registry.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Registry\", function() { return _registry__WEBPACK_IMPORTED_MODULE_12__[\"default\"]; });\n\n/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./scope */ \"./node_modules/parchment/src/scope.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Scope\", function() { return _scope__WEBPACK_IMPORTED_MODULE_13__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/parchment.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/registry.ts":
	/*!************************************************!*\
	  !*** ./node_modules/parchment/src/registry.ts ***!
	  \************************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Registry; });\n/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error */ \"./node_modules/parchment/src/error.ts\");\n/* harmony import */ var _scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scope */ \"./node_modules/parchment/src/scope.ts\");\n\n\nclass Registry {\n    constructor() {\n        this.attributes = {};\n        this.classes = {};\n        this.tags = {};\n        this.types = {};\n    }\n    static find(node, bubble = false) {\n        if (node == null) {\n            return null;\n        }\n        if (this.blots.has(node)) {\n            return this.blots.get(node) || null;\n        }\n        if (bubble) {\n            return this.find(node.parentNode, bubble);\n        }\n        return null;\n    }\n    create(scroll, input, value) {\n        const match = this.query(input);\n        if (match == null) {\n            throw new _error__WEBPACK_IMPORTED_MODULE_0__[\"default\"](`Unable to create ${input} blot`);\n        }\n        const blotClass = match;\n        const node = \n        // @ts-ignore\n        input instanceof Node || input.nodeType === Node.TEXT_NODE\n            ? input\n            : blotClass.create(value);\n        const blot = new blotClass(scroll, node, value);\n        Registry.blots.set(blot.domNode, blot);\n        return blot;\n    }\n    find(node, bubble = false) {\n        return Registry.find(node, bubble);\n    }\n    query(query, scope = _scope__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ANY) {\n        let match;\n        if (typeof query === 'string') {\n            match = this.types[query] || this.attributes[query];\n            // @ts-ignore\n        }\n        else if (query instanceof Text || query.nodeType === Node.TEXT_NODE) {\n            match = this.types.text;\n        }\n        else if (typeof query === 'number') {\n            if (query & _scope__WEBPACK_IMPORTED_MODULE_1__[\"default\"].LEVEL & _scope__WEBPACK_IMPORTED_MODULE_1__[\"default\"].BLOCK) {\n                match = this.types.block;\n            }\n            else if (query & _scope__WEBPACK_IMPORTED_MODULE_1__[\"default\"].LEVEL & _scope__WEBPACK_IMPORTED_MODULE_1__[\"default\"].INLINE) {\n                match = this.types.inline;\n            }\n        }\n        else if (query instanceof HTMLElement) {\n            const names = (query.getAttribute('class') || '').split(/\\s+/);\n            names.some((name) => {\n                match = this.classes[name];\n                if (match) {\n                    return true;\n                }\n                return false;\n            });\n            match = match || this.tags[query.tagName];\n        }\n        if (match == null) {\n            return null;\n        }\n        // @ts-ignore\n        if (scope & _scope__WEBPACK_IMPORTED_MODULE_1__[\"default\"].LEVEL & match.scope && scope & _scope__WEBPACK_IMPORTED_MODULE_1__[\"default\"].TYPE & match.scope) {\n            return match;\n        }\n        return null;\n    }\n    register(...definitions) {\n        if (definitions.length > 1) {\n            return definitions.map((d) => {\n                return this.register(d);\n            });\n        }\n        const definition = definitions[0];\n        if (typeof definition.blotName !== 'string' &&\n            typeof definition.attrName !== 'string') {\n            throw new _error__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Invalid definition');\n        }\n        else if (definition.blotName === 'abstract') {\n            throw new _error__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Cannot register abstract class');\n        }\n        this.types[definition.blotName || definition.attrName] = definition;\n        if (typeof definition.keyName === 'string') {\n            this.attributes[definition.keyName] = definition;\n        }\n        else {\n            if (definition.className != null) {\n                this.classes[definition.className] = definition;\n            }\n            if (definition.tagName != null) {\n                if (Array.isArray(definition.tagName)) {\n                    definition.tagName = definition.tagName.map((tagName) => {\n                        return tagName.toUpperCase();\n                    });\n                }\n                else {\n                    definition.tagName = definition.tagName.toUpperCase();\n                }\n                const tagNames = Array.isArray(definition.tagName)\n                    ? definition.tagName\n                    : [definition.tagName];\n                tagNames.forEach((tag) => {\n                    if (this.tags[tag] == null || definition.className == null) {\n                        this.tags[tag] = definition;\n                    }\n                });\n            }\n        }\n        return definition;\n    }\n}\nRegistry.blots = new WeakMap();\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/registry.ts?");

	/***/ }),

	/***/ "./node_modules/parchment/src/scope.ts":
	/*!*********************************************!*\
	  !*** ./node_modules/parchment/src/scope.ts ***!
	  \*********************************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\nvar Scope;\n(function (Scope) {\n    Scope[Scope[\"TYPE\"] = 3] = \"TYPE\";\n    Scope[Scope[\"LEVEL\"] = 12] = \"LEVEL\";\n    Scope[Scope[\"ATTRIBUTE\"] = 13] = \"ATTRIBUTE\";\n    Scope[Scope[\"BLOT\"] = 14] = \"BLOT\";\n    Scope[Scope[\"INLINE\"] = 7] = \"INLINE\";\n    Scope[Scope[\"BLOCK\"] = 11] = \"BLOCK\";\n    Scope[Scope[\"BLOCK_BLOT\"] = 10] = \"BLOCK_BLOT\";\n    Scope[Scope[\"INLINE_BLOT\"] = 6] = \"INLINE_BLOT\";\n    Scope[Scope[\"BLOCK_ATTRIBUTE\"] = 9] = \"BLOCK_ATTRIBUTE\";\n    Scope[Scope[\"INLINE_ATTRIBUTE\"] = 5] = \"INLINE_ATTRIBUTE\";\n    Scope[Scope[\"ANY\"] = 15] = \"ANY\";\n})(Scope || (Scope = {}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (Scope);\n\n\n//# sourceURL=webpack://Quill/./node_modules/parchment/src/scope.ts?");

	/***/ }),

	/***/ "./node_modules/process/browser.js":
	/*!*****************************************!*\
	  !*** ./node_modules/process/browser.js ***!
	  \*****************************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack://Quill/./node_modules/process/browser.js?");

	/***/ }),

	/***/ "./node_modules/quill-delta/dist/AttributeMap.js":
	/*!*******************************************************!*\
	  !*** ./node_modules/quill-delta/dist/AttributeMap.js ***!
	  \*******************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar deep_equal_1 = __importDefault(__webpack_require__(/*! deep-equal */ \"./node_modules/quill-delta/node_modules/deep-equal/index.js\"));\nvar extend_1 = __importDefault(__webpack_require__(/*! extend */ \"./node_modules/extend/index.js\"));\nvar AttributeMap;\n(function (AttributeMap) {\n    function compose(a, b, keepNull) {\n        if (a === void 0) { a = {}; }\n        if (b === void 0) { b = {}; }\n        if (typeof a !== 'object') {\n            a = {};\n        }\n        if (typeof b !== 'object') {\n            b = {};\n        }\n        var attributes = extend_1.default(true, {}, b);\n        if (!keepNull) {\n            attributes = Object.keys(attributes).reduce(function (copy, key) {\n                if (attributes[key] != null) {\n                    copy[key] = attributes[key];\n                }\n                return copy;\n            }, {});\n        }\n        for (var key in a) {\n            if (a[key] !== undefined && b[key] === undefined) {\n                attributes[key] = a[key];\n            }\n        }\n        return Object.keys(attributes).length > 0 ? attributes : undefined;\n    }\n    AttributeMap.compose = compose;\n    function diff(a, b) {\n        if (a === void 0) { a = {}; }\n        if (b === void 0) { b = {}; }\n        if (typeof a !== 'object') {\n            a = {};\n        }\n        if (typeof b !== 'object') {\n            b = {};\n        }\n        var attributes = Object.keys(a)\n            .concat(Object.keys(b))\n            .reduce(function (attrs, key) {\n            if (!deep_equal_1.default(a[key], b[key])) {\n                attrs[key] = b[key] === undefined ? null : b[key];\n            }\n            return attrs;\n        }, {});\n        return Object.keys(attributes).length > 0 ? attributes : undefined;\n    }\n    AttributeMap.diff = diff;\n    function invert(attr, base) {\n        if (attr === void 0) { attr = {}; }\n        if (base === void 0) { base = {}; }\n        attr = attr || {};\n        var baseInverted = Object.keys(base).reduce(function (memo, key) {\n            if (base[key] !== attr[key] && attr[key] !== undefined) {\n                memo[key] = base[key];\n            }\n            return memo;\n        }, {});\n        return Object.keys(attr).reduce(function (memo, key) {\n            if (attr[key] !== base[key] && base[key] === undefined) {\n                memo[key] = null;\n            }\n            return memo;\n        }, baseInverted);\n    }\n    AttributeMap.invert = invert;\n    function transform(a, b, priority) {\n        if (priority === void 0) { priority = false; }\n        if (typeof a !== 'object') {\n            return b;\n        }\n        if (typeof b !== 'object') {\n            return undefined;\n        }\n        if (!priority) {\n            return b; // b simply overwrites us without priority\n        }\n        var attributes = Object.keys(b).reduce(function (attrs, key) {\n            if (a[key] === undefined) {\n                attrs[key] = b[key]; // null is a valid value\n            }\n            return attrs;\n        }, {});\n        return Object.keys(attributes).length > 0 ? attributes : undefined;\n    }\n    AttributeMap.transform = transform;\n})(AttributeMap || (AttributeMap = {}));\nexports.default = AttributeMap;\n//# sourceMappingURL=AttributeMap.js.map\n\n//# sourceURL=webpack://Quill/./node_modules/quill-delta/dist/AttributeMap.js?");

	/***/ }),

	/***/ "./node_modules/quill-delta/dist/Delta.js":
	/*!************************************************!*\
	  !*** ./node_modules/quill-delta/dist/Delta.js ***!
	  \************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nvar deep_equal_1 = __importDefault(__webpack_require__(/*! deep-equal */ \"./node_modules/quill-delta/node_modules/deep-equal/index.js\"));\nvar extend_1 = __importDefault(__webpack_require__(/*! extend */ \"./node_modules/extend/index.js\"));\nvar fast_diff_1 = __importDefault(__webpack_require__(/*! fast-diff */ \"./node_modules/fast-diff/diff.js\"));\nvar AttributeMap_1 = __importDefault(__webpack_require__(/*! ./AttributeMap */ \"./node_modules/quill-delta/dist/AttributeMap.js\"));\nvar Op_1 = __importDefault(__webpack_require__(/*! ./Op */ \"./node_modules/quill-delta/dist/Op.js\"));\nvar NULL_CHARACTER = String.fromCharCode(0); // Placeholder char for embed in diff()\nvar Delta = /** @class */ (function () {\n    function Delta(ops) {\n        // Assume we are given a well formed ops\n        if (Array.isArray(ops)) {\n            this.ops = ops;\n        }\n        else if (ops != null && Array.isArray(ops.ops)) {\n            this.ops = ops.ops;\n        }\n        else {\n            this.ops = [];\n        }\n    }\n    Delta.prototype.insert = function (arg, attributes) {\n        var newOp = {};\n        if (typeof arg === 'string' && arg.length === 0) {\n            return this;\n        }\n        newOp.insert = arg;\n        if (attributes != null &&\n            typeof attributes === 'object' &&\n            Object.keys(attributes).length > 0) {\n            newOp.attributes = attributes;\n        }\n        return this.push(newOp);\n    };\n    Delta.prototype.delete = function (length) {\n        if (length <= 0) {\n            return this;\n        }\n        return this.push({ delete: length });\n    };\n    Delta.prototype.retain = function (length, attributes) {\n        if (length <= 0) {\n            return this;\n        }\n        var newOp = { retain: length };\n        if (attributes != null &&\n            typeof attributes === 'object' &&\n            Object.keys(attributes).length > 0) {\n            newOp.attributes = attributes;\n        }\n        return this.push(newOp);\n    };\n    Delta.prototype.push = function (newOp) {\n        var index = this.ops.length;\n        var lastOp = this.ops[index - 1];\n        newOp = extend_1.default(true, {}, newOp);\n        if (typeof lastOp === 'object') {\n            if (typeof newOp.delete === 'number' &&\n                typeof lastOp.delete === 'number') {\n                this.ops[index - 1] = { delete: lastOp.delete + newOp.delete };\n                return this;\n            }\n            // Since it does not matter if we insert before or after deleting at the same index,\n            // always prefer to insert first\n            if (typeof lastOp.delete === 'number' && newOp.insert != null) {\n                index -= 1;\n                lastOp = this.ops[index - 1];\n                if (typeof lastOp !== 'object') {\n                    this.ops.unshift(newOp);\n                    return this;\n                }\n            }\n            if (deep_equal_1.default(newOp.attributes, lastOp.attributes)) {\n                if (typeof newOp.insert === 'string' &&\n                    typeof lastOp.insert === 'string') {\n                    this.ops[index - 1] = { insert: lastOp.insert + newOp.insert };\n                    if (typeof newOp.attributes === 'object') {\n                        this.ops[index - 1].attributes = newOp.attributes;\n                    }\n                    return this;\n                }\n                else if (typeof newOp.retain === 'number' &&\n                    typeof lastOp.retain === 'number') {\n                    this.ops[index - 1] = { retain: lastOp.retain + newOp.retain };\n                    if (typeof newOp.attributes === 'object') {\n                        this.ops[index - 1].attributes = newOp.attributes;\n                    }\n                    return this;\n                }\n            }\n        }\n        if (index === this.ops.length) {\n            this.ops.push(newOp);\n        }\n        else {\n            this.ops.splice(index, 0, newOp);\n        }\n        return this;\n    };\n    Delta.prototype.chop = function () {\n        var lastOp = this.ops[this.ops.length - 1];\n        if (lastOp && lastOp.retain && !lastOp.attributes) {\n            this.ops.pop();\n        }\n        return this;\n    };\n    Delta.prototype.filter = function (predicate) {\n        return this.ops.filter(predicate);\n    };\n    Delta.prototype.forEach = function (predicate) {\n        this.ops.forEach(predicate);\n    };\n    Delta.prototype.map = function (predicate) {\n        return this.ops.map(predicate);\n    };\n    Delta.prototype.partition = function (predicate) {\n        var passed = [];\n        var failed = [];\n        this.forEach(function (op) {\n            var target = predicate(op) ? passed : failed;\n            target.push(op);\n        });\n        return [passed, failed];\n    };\n    Delta.prototype.reduce = function (predicate, initialValue) {\n        return this.ops.reduce(predicate, initialValue);\n    };\n    Delta.prototype.changeLength = function () {\n        return this.reduce(function (length, elem) {\n            if (elem.insert) {\n                return length + Op_1.default.length(elem);\n            }\n            else if (elem.delete) {\n                return length - elem.delete;\n            }\n            return length;\n        }, 0);\n    };\n    Delta.prototype.length = function () {\n        return this.reduce(function (length, elem) {\n            return length + Op_1.default.length(elem);\n        }, 0);\n    };\n    Delta.prototype.slice = function (start, end) {\n        if (start === void 0) { start = 0; }\n        if (end === void 0) { end = Infinity; }\n        var ops = [];\n        var iter = Op_1.default.iterator(this.ops);\n        var index = 0;\n        while (index < end && iter.hasNext()) {\n            var nextOp = void 0;\n            if (index < start) {\n                nextOp = iter.next(start - index);\n            }\n            else {\n                nextOp = iter.next(end - index);\n                ops.push(nextOp);\n            }\n            index += Op_1.default.length(nextOp);\n        }\n        return new Delta(ops);\n    };\n    Delta.prototype.compose = function (other) {\n        var thisIter = Op_1.default.iterator(this.ops);\n        var otherIter = Op_1.default.iterator(other.ops);\n        var ops = [];\n        var firstOther = otherIter.peek();\n        if (firstOther != null &&\n            typeof firstOther.retain === 'number' &&\n            firstOther.attributes == null) {\n            var firstLeft = firstOther.retain;\n            while (thisIter.peekType() === 'insert' &&\n                thisIter.peekLength() <= firstLeft) {\n                firstLeft -= thisIter.peekLength();\n                ops.push(thisIter.next());\n            }\n            if (firstOther.retain - firstLeft > 0) {\n                otherIter.next(firstOther.retain - firstLeft);\n            }\n        }\n        var delta = new Delta(ops);\n        while (thisIter.hasNext() || otherIter.hasNext()) {\n            if (otherIter.peekType() === 'insert') {\n                delta.push(otherIter.next());\n            }\n            else if (thisIter.peekType() === 'delete') {\n                delta.push(thisIter.next());\n            }\n            else {\n                var length_1 = Math.min(thisIter.peekLength(), otherIter.peekLength());\n                var thisOp = thisIter.next(length_1);\n                var otherOp = otherIter.next(length_1);\n                if (typeof otherOp.retain === 'number') {\n                    var newOp = {};\n                    if (typeof thisOp.retain === 'number') {\n                        newOp.retain = length_1;\n                    }\n                    else {\n                        newOp.insert = thisOp.insert;\n                    }\n                    // Preserve null when composing with a retain, otherwise remove it for inserts\n                    var attributes = AttributeMap_1.default.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === 'number');\n                    if (attributes) {\n                        newOp.attributes = attributes;\n                    }\n                    delta.push(newOp);\n                    // Optimization if rest of other is just retain\n                    if (!otherIter.hasNext() &&\n                        deep_equal_1.default(delta.ops[delta.ops.length - 1], newOp)) {\n                        var rest = new Delta(thisIter.rest());\n                        return delta.concat(rest).chop();\n                    }\n                    // Other op should be delete, we could be an insert or retain\n                    // Insert + delete cancels out\n                }\n                else if (typeof otherOp.delete === 'number' &&\n                    typeof thisOp.retain === 'number') {\n                    delta.push(otherOp);\n                }\n            }\n        }\n        return delta.chop();\n    };\n    Delta.prototype.concat = function (other) {\n        var delta = new Delta(this.ops.slice());\n        if (other.ops.length > 0) {\n            delta.push(other.ops[0]);\n            delta.ops = delta.ops.concat(other.ops.slice(1));\n        }\n        return delta;\n    };\n    Delta.prototype.diff = function (other, cursor) {\n        if (this.ops === other.ops) {\n            return new Delta();\n        }\n        var strings = [this, other].map(function (delta) {\n            return delta\n                .map(function (op) {\n                if (op.insert != null) {\n                    return typeof op.insert === 'string' ? op.insert : NULL_CHARACTER;\n                }\n                var prep = delta === other ? 'on' : 'with';\n                throw new Error('diff() called ' + prep + ' non-document');\n            })\n                .join('');\n        });\n        var retDelta = new Delta();\n        var diffResult = fast_diff_1.default(strings[0], strings[1], cursor);\n        var thisIter = Op_1.default.iterator(this.ops);\n        var otherIter = Op_1.default.iterator(other.ops);\n        diffResult.forEach(function (component) {\n            var length = component[1].length;\n            while (length > 0) {\n                var opLength = 0;\n                switch (component[0]) {\n                    case fast_diff_1.default.INSERT:\n                        opLength = Math.min(otherIter.peekLength(), length);\n                        retDelta.push(otherIter.next(opLength));\n                        break;\n                    case fast_diff_1.default.DELETE:\n                        opLength = Math.min(length, thisIter.peekLength());\n                        thisIter.next(opLength);\n                        retDelta.delete(opLength);\n                        break;\n                    case fast_diff_1.default.EQUAL:\n                        opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length);\n                        var thisOp = thisIter.next(opLength);\n                        var otherOp = otherIter.next(opLength);\n                        if (deep_equal_1.default(thisOp.insert, otherOp.insert)) {\n                            retDelta.retain(opLength, AttributeMap_1.default.diff(thisOp.attributes, otherOp.attributes));\n                        }\n                        else {\n                            retDelta.push(otherOp).delete(opLength);\n                        }\n                        break;\n                }\n                length -= opLength;\n            }\n        });\n        return retDelta.chop();\n    };\n    Delta.prototype.eachLine = function (predicate, newline) {\n        if (newline === void 0) { newline = '\\n'; }\n        var iter = Op_1.default.iterator(this.ops);\n        var line = new Delta();\n        var i = 0;\n        while (iter.hasNext()) {\n            if (iter.peekType() !== 'insert') {\n                return;\n            }\n            var thisOp = iter.peek();\n            var start = Op_1.default.length(thisOp) - iter.peekLength();\n            var index = typeof thisOp.insert === 'string'\n                ? thisOp.insert.indexOf(newline, start) - start\n                : -1;\n            if (index < 0) {\n                line.push(iter.next());\n            }\n            else if (index > 0) {\n                line.push(iter.next(index));\n            }\n            else {\n                if (predicate(line, iter.next(1).attributes || {}, i) === false) {\n                    return;\n                }\n                i += 1;\n                line = new Delta();\n            }\n        }\n        if (line.length() > 0) {\n            predicate(line, {}, i);\n        }\n    };\n    Delta.prototype.invert = function (base) {\n        var inverted = new Delta();\n        this.reduce(function (baseIndex, op) {\n            if (op.insert) {\n                inverted.delete(Op_1.default.length(op));\n            }\n            else if (op.retain && op.attributes == null) {\n                inverted.retain(op.retain);\n                return baseIndex + op.retain;\n            }\n            else if (op.delete || (op.retain && op.attributes)) {\n                var length_2 = (op.delete || op.retain);\n                var slice = base.slice(baseIndex, baseIndex + length_2);\n                slice.forEach(function (baseOp) {\n                    if (op.delete) {\n                        inverted.push(baseOp);\n                    }\n                    else if (op.retain && op.attributes) {\n                        inverted.retain(Op_1.default.length(baseOp), AttributeMap_1.default.invert(op.attributes, baseOp.attributes));\n                    }\n                });\n                return baseIndex + length_2;\n            }\n            return baseIndex;\n        }, 0);\n        return inverted.chop();\n    };\n    Delta.prototype.transform = function (arg, priority) {\n        if (priority === void 0) { priority = false; }\n        priority = !!priority;\n        if (typeof arg === 'number') {\n            return this.transformPosition(arg, priority);\n        }\n        var other = arg;\n        var thisIter = Op_1.default.iterator(this.ops);\n        var otherIter = Op_1.default.iterator(other.ops);\n        var delta = new Delta();\n        while (thisIter.hasNext() || otherIter.hasNext()) {\n            if (thisIter.peekType() === 'insert' &&\n                (priority || otherIter.peekType() !== 'insert')) {\n                delta.retain(Op_1.default.length(thisIter.next()));\n            }\n            else if (otherIter.peekType() === 'insert') {\n                delta.push(otherIter.next());\n            }\n            else {\n                var length_3 = Math.min(thisIter.peekLength(), otherIter.peekLength());\n                var thisOp = thisIter.next(length_3);\n                var otherOp = otherIter.next(length_3);\n                if (thisOp.delete) {\n                    // Our delete either makes their delete redundant or removes their retain\n                    continue;\n                }\n                else if (otherOp.delete) {\n                    delta.push(otherOp);\n                }\n                else {\n                    // We retain either their retain or insert\n                    delta.retain(length_3, AttributeMap_1.default.transform(thisOp.attributes, otherOp.attributes, priority));\n                }\n            }\n        }\n        return delta.chop();\n    };\n    Delta.prototype.transformPosition = function (index, priority) {\n        if (priority === void 0) { priority = false; }\n        priority = !!priority;\n        var thisIter = Op_1.default.iterator(this.ops);\n        var offset = 0;\n        while (thisIter.hasNext() && offset <= index) {\n            var length_4 = thisIter.peekLength();\n            var nextType = thisIter.peekType();\n            thisIter.next();\n            if (nextType === 'delete') {\n                index -= Math.min(length_4, index - offset);\n                continue;\n            }\n            else if (nextType === 'insert' && (offset < index || !priority)) {\n                index += length_4;\n            }\n            offset += length_4;\n        }\n        return index;\n    };\n    Delta.Op = Op_1.default;\n    Delta.AttributeMap = AttributeMap_1.default;\n    return Delta;\n}());\nmodule.exports = Delta;\n//# sourceMappingURL=Delta.js.map\n\n//# sourceURL=webpack://Quill/./node_modules/quill-delta/dist/Delta.js?");

	/***/ }),

	/***/ "./node_modules/quill-delta/dist/Iterator.js":
	/*!***************************************************!*\
	  !*** ./node_modules/quill-delta/dist/Iterator.js ***!
	  \***************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Op_1 = __importDefault(__webpack_require__(/*! ./Op */ \"./node_modules/quill-delta/dist/Op.js\"));\nvar Iterator = /** @class */ (function () {\n    function Iterator(ops) {\n        this.ops = ops;\n        this.index = 0;\n        this.offset = 0;\n    }\n    Iterator.prototype.hasNext = function () {\n        return this.peekLength() < Infinity;\n    };\n    Iterator.prototype.next = function (length) {\n        if (!length) {\n            length = Infinity;\n        }\n        var nextOp = this.ops[this.index];\n        if (nextOp) {\n            var offset = this.offset;\n            var opLength = Op_1.default.length(nextOp);\n            if (length >= opLength - offset) {\n                length = opLength - offset;\n                this.index += 1;\n                this.offset = 0;\n            }\n            else {\n                this.offset += length;\n            }\n            if (typeof nextOp.delete === 'number') {\n                return { delete: length };\n            }\n            else {\n                var retOp = {};\n                if (nextOp.attributes) {\n                    retOp.attributes = nextOp.attributes;\n                }\n                if (typeof nextOp.retain === 'number') {\n                    retOp.retain = length;\n                }\n                else if (typeof nextOp.insert === 'string') {\n                    retOp.insert = nextOp.insert.substr(offset, length);\n                }\n                else {\n                    // offset should === 0, length should === 1\n                    retOp.insert = nextOp.insert;\n                }\n                return retOp;\n            }\n        }\n        else {\n            return { retain: Infinity };\n        }\n    };\n    Iterator.prototype.peek = function () {\n        return this.ops[this.index];\n    };\n    Iterator.prototype.peekLength = function () {\n        if (this.ops[this.index]) {\n            // Should never return 0 if our index is being managed correctly\n            return Op_1.default.length(this.ops[this.index]) - this.offset;\n        }\n        else {\n            return Infinity;\n        }\n    };\n    Iterator.prototype.peekType = function () {\n        if (this.ops[this.index]) {\n            if (typeof this.ops[this.index].delete === 'number') {\n                return 'delete';\n            }\n            else if (typeof this.ops[this.index].retain === 'number') {\n                return 'retain';\n            }\n            else {\n                return 'insert';\n            }\n        }\n        return 'retain';\n    };\n    Iterator.prototype.rest = function () {\n        if (!this.hasNext()) {\n            return [];\n        }\n        else if (this.offset === 0) {\n            return this.ops.slice(this.index);\n        }\n        else {\n            var offset = this.offset;\n            var index = this.index;\n            var next = this.next();\n            var rest = this.ops.slice(this.index);\n            this.offset = offset;\n            this.index = index;\n            return [next].concat(rest);\n        }\n    };\n    return Iterator;\n}());\nexports.default = Iterator;\n//# sourceMappingURL=Iterator.js.map\n\n//# sourceURL=webpack://Quill/./node_modules/quill-delta/dist/Iterator.js?");

	/***/ }),

	/***/ "./node_modules/quill-delta/dist/Op.js":
	/*!*********************************************!*\
	  !*** ./node_modules/quill-delta/dist/Op.js ***!
	  \*********************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Iterator_1 = __importDefault(__webpack_require__(/*! ./Iterator */ \"./node_modules/quill-delta/dist/Iterator.js\"));\nvar Op;\n(function (Op) {\n    function iterator(ops) {\n        return new Iterator_1.default(ops);\n    }\n    Op.iterator = iterator;\n    function length(op) {\n        if (typeof op.delete === 'number') {\n            return op.delete;\n        }\n        else if (typeof op.retain === 'number') {\n            return op.retain;\n        }\n        else {\n            return typeof op.insert === 'string' ? op.insert.length : 1;\n        }\n    }\n    Op.length = length;\n})(Op || (Op = {}));\nexports.default = Op;\n//# sourceMappingURL=Op.js.map\n\n//# sourceURL=webpack://Quill/./node_modules/quill-delta/dist/Op.js?");

	/***/ }),

	/***/ "./node_modules/quill-delta/node_modules/deep-equal/index.js":
	/*!*******************************************************************!*\
	  !*** ./node_modules/quill-delta/node_modules/deep-equal/index.js ***!
	  \*******************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {

	eval("var objectKeys = __webpack_require__(/*! object-keys */ \"./node_modules/quill-delta/node_modules/object-keys/index.js\");\nvar isArguments = __webpack_require__(/*! is-arguments */ \"./node_modules/is-arguments/index.js\");\nvar is = __webpack_require__(/*! object-is */ \"./node_modules/object-is/index.js\");\nvar isRegex = __webpack_require__(/*! is-regex */ \"./node_modules/is-regex/index.js\");\nvar flags = __webpack_require__(/*! regexp.prototype.flags */ \"./node_modules/regexp.prototype.flags/index.js\");\nvar isDate = __webpack_require__(/*! is-date-object */ \"./node_modules/is-date-object/index.js\");\n\nvar getTime = Date.prototype.getTime;\n\nfunction deepEqual(actual, expected, options) {\n  var opts = options || {};\n\n  // 7.1. All identical values are equivalent, as determined by ===.\n  if (opts.strict ? is(actual, expected) : actual === expected) {\n    return true;\n  }\n\n  // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.\n  if (!actual || !expected || (typeof actual !== 'object' && typeof expected !== 'object')) {\n    return opts.strict ? is(actual, expected) : actual == expected;\n  }\n\n  /*\n   * 7.4. For all other Object pairs, including Array objects, equivalence is\n   * determined by having the same number of owned properties (as verified\n   * with Object.prototype.hasOwnProperty.call), the same set of keys\n   * (although not necessarily the same order), equivalent values for every\n   * corresponding key, and an identical 'prototype' property. Note: this\n   * accounts for both named and indexed properties on Arrays.\n   */\n  // eslint-disable-next-line no-use-before-define\n  return objEquiv(actual, expected, opts);\n}\n\nfunction isUndefinedOrNull(value) {\n  return value === null || value === undefined;\n}\n\nfunction isBuffer(x) {\n  if (!x || typeof x !== 'object' || typeof x.length !== 'number') {\n    return false;\n  }\n  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {\n    return false;\n  }\n  if (x.length > 0 && typeof x[0] !== 'number') {\n    return false;\n  }\n  return true;\n}\n\nfunction objEquiv(a, b, opts) {\n  /* eslint max-statements: [2, 50] */\n  var i, key;\n  if (typeof a !== typeof b) { return false; }\n  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) { return false; }\n\n  // an identical 'prototype' property.\n  if (a.prototype !== b.prototype) { return false; }\n\n  if (isArguments(a) !== isArguments(b)) { return false; }\n\n  var aIsRegex = isRegex(a);\n  var bIsRegex = isRegex(b);\n  if (aIsRegex !== bIsRegex) { return false; }\n  if (aIsRegex || bIsRegex) {\n    return a.source === b.source && flags(a) === flags(b);\n  }\n\n  if (isDate(a) && isDate(b)) {\n    return getTime.call(a) === getTime.call(b);\n  }\n\n  var aIsBuffer = isBuffer(a);\n  var bIsBuffer = isBuffer(b);\n  if (aIsBuffer !== bIsBuffer) { return false; }\n  if (aIsBuffer || bIsBuffer) { // && would work too, because both are true or both false here\n    if (a.length !== b.length) { return false; }\n    for (i = 0; i < a.length; i++) {\n      if (a[i] !== b[i]) { return false; }\n    }\n    return true;\n  }\n\n  if (typeof a !== typeof b) { return false; }\n\n  try {\n    var ka = objectKeys(a);\n    var kb = objectKeys(b);\n  } catch (e) { // happens when one is a string literal and the other isn't\n    return false;\n  }\n  // having the same number of owned properties (keys incorporates hasOwnProperty)\n  if (ka.length !== kb.length) { return false; }\n\n  // the same set of keys (although not necessarily the same order),\n  ka.sort();\n  kb.sort();\n  // ~~~cheap key test\n  for (i = ka.length - 1; i >= 0; i--) {\n    if (ka[i] != kb[i]) { return false; }\n  }\n  // equivalent values for every corresponding key, and ~~~possibly expensive deep test\n  for (i = ka.length - 1; i >= 0; i--) {\n    key = ka[i];\n    if (!deepEqual(a[key], b[key], opts)) { return false; }\n  }\n\n  return true;\n}\n\nmodule.exports = deepEqual;\n\n\n//# sourceURL=webpack://Quill/./node_modules/quill-delta/node_modules/deep-equal/index.js?");

	/***/ }),

	/***/ "./node_modules/quill-delta/node_modules/object-keys/implementation.js":
	/*!*****************************************************************************!*\
	  !*** ./node_modules/quill-delta/node_modules/object-keys/implementation.js ***!
	  \*****************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar keysShim;\nif (!Object.keys) {\n\t// modified from https://github.com/es-shims/es5-shim\n\tvar has = Object.prototype.hasOwnProperty;\n\tvar toStr = Object.prototype.toString;\n\tvar isArgs = __webpack_require__(/*! ./isArguments */ \"./node_modules/quill-delta/node_modules/object-keys/isArguments.js\"); // eslint-disable-line global-require\n\tvar isEnumerable = Object.prototype.propertyIsEnumerable;\n\tvar hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');\n\tvar hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');\n\tvar dontEnums = [\n\t\t'toString',\n\t\t'toLocaleString',\n\t\t'valueOf',\n\t\t'hasOwnProperty',\n\t\t'isPrototypeOf',\n\t\t'propertyIsEnumerable',\n\t\t'constructor'\n\t];\n\tvar equalsConstructorPrototype = function (o) {\n\t\tvar ctor = o.constructor;\n\t\treturn ctor && ctor.prototype === o;\n\t};\n\tvar excludedKeys = {\n\t\t$applicationCache: true,\n\t\t$console: true,\n\t\t$external: true,\n\t\t$frame: true,\n\t\t$frameElement: true,\n\t\t$frames: true,\n\t\t$innerHeight: true,\n\t\t$innerWidth: true,\n\t\t$onmozfullscreenchange: true,\n\t\t$onmozfullscreenerror: true,\n\t\t$outerHeight: true,\n\t\t$outerWidth: true,\n\t\t$pageXOffset: true,\n\t\t$pageYOffset: true,\n\t\t$parent: true,\n\t\t$scrollLeft: true,\n\t\t$scrollTop: true,\n\t\t$scrollX: true,\n\t\t$scrollY: true,\n\t\t$self: true,\n\t\t$webkitIndexedDB: true,\n\t\t$webkitStorageInfo: true,\n\t\t$window: true\n\t};\n\tvar hasAutomationEqualityBug = (function () {\n\t\t/* global window */\n\t\tif (typeof window === 'undefined') { return false; }\n\t\tfor (var k in window) {\n\t\t\ttry {\n\t\t\t\tif (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {\n\t\t\t\t\ttry {\n\t\t\t\t\t\tequalsConstructorPrototype(window[k]);\n\t\t\t\t\t} catch (e) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} catch (e) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\treturn false;\n\t}());\n\tvar equalsConstructorPrototypeIfNotBuggy = function (o) {\n\t\t/* global window */\n\t\tif (typeof window === 'undefined' || !hasAutomationEqualityBug) {\n\t\t\treturn equalsConstructorPrototype(o);\n\t\t}\n\t\ttry {\n\t\t\treturn equalsConstructorPrototype(o);\n\t\t} catch (e) {\n\t\t\treturn false;\n\t\t}\n\t};\n\n\tkeysShim = function keys(object) {\n\t\tvar isObject = object !== null && typeof object === 'object';\n\t\tvar isFunction = toStr.call(object) === '[object Function]';\n\t\tvar isArguments = isArgs(object);\n\t\tvar isString = isObject && toStr.call(object) === '[object String]';\n\t\tvar theKeys = [];\n\n\t\tif (!isObject && !isFunction && !isArguments) {\n\t\t\tthrow new TypeError('Object.keys called on a non-object');\n\t\t}\n\n\t\tvar skipProto = hasProtoEnumBug && isFunction;\n\t\tif (isString && object.length > 0 && !has.call(object, 0)) {\n\t\t\tfor (var i = 0; i < object.length; ++i) {\n\t\t\t\ttheKeys.push(String(i));\n\t\t\t}\n\t\t}\n\n\t\tif (isArguments && object.length > 0) {\n\t\t\tfor (var j = 0; j < object.length; ++j) {\n\t\t\t\ttheKeys.push(String(j));\n\t\t\t}\n\t\t} else {\n\t\t\tfor (var name in object) {\n\t\t\t\tif (!(skipProto && name === 'prototype') && has.call(object, name)) {\n\t\t\t\t\ttheKeys.push(String(name));\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tif (hasDontEnumBug) {\n\t\t\tvar skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);\n\n\t\t\tfor (var k = 0; k < dontEnums.length; ++k) {\n\t\t\t\tif (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {\n\t\t\t\t\ttheKeys.push(dontEnums[k]);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn theKeys;\n\t};\n}\nmodule.exports = keysShim;\n\n\n//# sourceURL=webpack://Quill/./node_modules/quill-delta/node_modules/object-keys/implementation.js?");

	/***/ }),

	/***/ "./node_modules/quill-delta/node_modules/object-keys/index.js":
	/*!********************************************************************!*\
	  !*** ./node_modules/quill-delta/node_modules/object-keys/index.js ***!
	  \********************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar slice = Array.prototype.slice;\nvar isArgs = __webpack_require__(/*! ./isArguments */ \"./node_modules/quill-delta/node_modules/object-keys/isArguments.js\");\n\nvar origKeys = Object.keys;\nvar keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ \"./node_modules/quill-delta/node_modules/object-keys/implementation.js\");\n\nvar originalKeys = Object.keys;\n\nkeysShim.shim = function shimObjectKeys() {\n\tif (Object.keys) {\n\t\tvar keysWorksWithArguments = (function () {\n\t\t\t// Safari 5.0 bug\n\t\t\tvar args = Object.keys(arguments);\n\t\t\treturn args && args.length === arguments.length;\n\t\t}(1, 2));\n\t\tif (!keysWorksWithArguments) {\n\t\t\tObject.keys = function keys(object) { // eslint-disable-line func-name-matching\n\t\t\t\tif (isArgs(object)) {\n\t\t\t\t\treturn originalKeys(slice.call(object));\n\t\t\t\t}\n\t\t\t\treturn originalKeys(object);\n\t\t\t};\n\t\t}\n\t} else {\n\t\tObject.keys = keysShim;\n\t}\n\treturn Object.keys || keysShim;\n};\n\nmodule.exports = keysShim;\n\n\n//# sourceURL=webpack://Quill/./node_modules/quill-delta/node_modules/object-keys/index.js?");

	/***/ }),

	/***/ "./node_modules/quill-delta/node_modules/object-keys/isArguments.js":
	/*!**************************************************************************!*\
	  !*** ./node_modules/quill-delta/node_modules/object-keys/isArguments.js ***!
	  \**************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar toStr = Object.prototype.toString;\n\nmodule.exports = function isArguments(value) {\n\tvar str = toStr.call(value);\n\tvar isArgs = str === '[object Arguments]';\n\tif (!isArgs) {\n\t\tisArgs = str !== '[object Array]' &&\n\t\t\tvalue !== null &&\n\t\t\ttypeof value === 'object' &&\n\t\t\ttypeof value.length === 'number' &&\n\t\t\tvalue.length >= 0 &&\n\t\t\ttoStr.call(value.callee) === '[object Function]';\n\t}\n\treturn isArgs;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/quill-delta/node_modules/object-keys/isArguments.js?");

	/***/ }),

	/***/ "./node_modules/regexp.prototype.flags/implementation.js":
	/*!***************************************************************!*\
	  !*** ./node_modules/regexp.prototype.flags/implementation.js ***!
	  \***************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar $Object = Object;\nvar $TypeError = TypeError;\n\nmodule.exports = function flags() {\n\tif (this != null && this !== $Object(this)) {\n\t\tthrow new $TypeError('RegExp.prototype.flags getter called on non-object');\n\t}\n\tvar result = '';\n\tif (this.global) {\n\t\tresult += 'g';\n\t}\n\tif (this.ignoreCase) {\n\t\tresult += 'i';\n\t}\n\tif (this.multiline) {\n\t\tresult += 'm';\n\t}\n\tif (this.dotAll) {\n\t\tresult += 's';\n\t}\n\tif (this.unicode) {\n\t\tresult += 'u';\n\t}\n\tif (this.sticky) {\n\t\tresult += 'y';\n\t}\n\treturn result;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/regexp.prototype.flags/implementation.js?");

	/***/ }),

	/***/ "./node_modules/regexp.prototype.flags/index.js":
	/*!******************************************************!*\
	  !*** ./node_modules/regexp.prototype.flags/index.js ***!
	  \******************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar define = __webpack_require__(/*! define-properties */ \"./node_modules/define-properties/index.js\");\nvar callBind = __webpack_require__(/*! es-abstract/helpers/callBind */ \"./node_modules/regexp.prototype.flags/node_modules/es-abstract/helpers/callBind.js\");\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"./node_modules/regexp.prototype.flags/implementation.js\");\nvar getPolyfill = __webpack_require__(/*! ./polyfill */ \"./node_modules/regexp.prototype.flags/polyfill.js\");\nvar shim = __webpack_require__(/*! ./shim */ \"./node_modules/regexp.prototype.flags/shim.js\");\n\nvar flagsBound = callBind(implementation);\n\ndefine(flagsBound, {\n\tgetPolyfill: getPolyfill,\n\timplementation: implementation,\n\tshim: shim\n});\n\nmodule.exports = flagsBound;\n\n\n//# sourceURL=webpack://Quill/./node_modules/regexp.prototype.flags/index.js?");

	/***/ }),

	/***/ "./node_modules/regexp.prototype.flags/node_modules/es-abstract/GetIntrinsic.js":
	/*!**************************************************************************************!*\
	  !*** ./node_modules/regexp.prototype.flags/node_modules/es-abstract/GetIntrinsic.js ***!
	  \**************************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\n/* globals\n\tAtomics,\n\tSharedArrayBuffer,\n*/\n\nvar undefined;\n\nvar $TypeError = TypeError;\n\nvar $gOPD = Object.getOwnPropertyDescriptor;\nif ($gOPD) {\n\ttry {\n\t\t$gOPD({}, '');\n\t} catch (e) {\n\t\t$gOPD = null; // this is IE 8, which has a broken gOPD\n\t}\n}\n\nvar throwTypeError = function () { throw new $TypeError(); };\nvar ThrowTypeError = $gOPD\n\t? (function () {\n\t\ttry {\n\t\t\t// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties\n\t\t\targuments.callee; // IE 8 does not throw here\n\t\t\treturn throwTypeError;\n\t\t} catch (calleeThrows) {\n\t\t\ttry {\n\t\t\t\t// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')\n\t\t\t\treturn $gOPD(arguments, 'callee').get;\n\t\t\t} catch (gOPDthrows) {\n\t\t\t\treturn throwTypeError;\n\t\t\t}\n\t\t}\n\t}())\n\t: throwTypeError;\n\nvar hasSymbols = __webpack_require__(/*! has-symbols */ \"./node_modules/has-symbols/index.js\")();\n\nvar getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto\n\nvar generator; // = function * () {};\nvar generatorFunction = generator ? getProto(generator) : undefined;\nvar asyncFn; // async function() {};\nvar asyncFunction = asyncFn ? asyncFn.constructor : undefined;\nvar asyncGen; // async function * () {};\nvar asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;\nvar asyncGenIterator = asyncGen ? asyncGen() : undefined;\n\nvar TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);\n\nvar INTRINSICS = {\n\t'%Array%': Array,\n\t'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,\n\t'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,\n\t'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,\n\t'%ArrayPrototype%': Array.prototype,\n\t'%ArrayProto_entries%': Array.prototype.entries,\n\t'%ArrayProto_forEach%': Array.prototype.forEach,\n\t'%ArrayProto_keys%': Array.prototype.keys,\n\t'%ArrayProto_values%': Array.prototype.values,\n\t'%AsyncFromSyncIteratorPrototype%': undefined,\n\t'%AsyncFunction%': asyncFunction,\n\t'%AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,\n\t'%AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,\n\t'%AsyncGeneratorFunction%': asyncGenFunction,\n\t'%AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,\n\t'%AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,\n\t'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,\n\t'%Boolean%': Boolean,\n\t'%BooleanPrototype%': Boolean.prototype,\n\t'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,\n\t'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,\n\t'%Date%': Date,\n\t'%DatePrototype%': Date.prototype,\n\t'%decodeURI%': decodeURI,\n\t'%decodeURIComponent%': decodeURIComponent,\n\t'%encodeURI%': encodeURI,\n\t'%encodeURIComponent%': encodeURIComponent,\n\t'%Error%': Error,\n\t'%ErrorPrototype%': Error.prototype,\n\t'%eval%': eval, // eslint-disable-line no-eval\n\t'%EvalError%': EvalError,\n\t'%EvalErrorPrototype%': EvalError.prototype,\n\t'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,\n\t'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,\n\t'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,\n\t'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,\n\t'%Function%': Function,\n\t'%FunctionPrototype%': Function.prototype,\n\t'%Generator%': generator ? getProto(generator()) : undefined,\n\t'%GeneratorFunction%': generatorFunction,\n\t'%GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,\n\t'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,\n\t'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,\n\t'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,\n\t'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,\n\t'%isFinite%': isFinite,\n\t'%isNaN%': isNaN,\n\t'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,\n\t'%JSON%': typeof JSON === 'object' ? JSON : undefined,\n\t'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,\n\t'%Map%': typeof Map === 'undefined' ? undefined : Map,\n\t'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),\n\t'%MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,\n\t'%Math%': Math,\n\t'%Number%': Number,\n\t'%NumberPrototype%': Number.prototype,\n\t'%Object%': Object,\n\t'%ObjectPrototype%': Object.prototype,\n\t'%ObjProto_toString%': Object.prototype.toString,\n\t'%ObjProto_valueOf%': Object.prototype.valueOf,\n\t'%parseFloat%': parseFloat,\n\t'%parseInt%': parseInt,\n\t'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,\n\t'%PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,\n\t'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,\n\t'%Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,\n\t'%Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,\n\t'%Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,\n\t'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,\n\t'%RangeError%': RangeError,\n\t'%RangeErrorPrototype%': RangeError.prototype,\n\t'%ReferenceError%': ReferenceError,\n\t'%ReferenceErrorPrototype%': ReferenceError.prototype,\n\t'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,\n\t'%RegExp%': RegExp,\n\t'%RegExpPrototype%': RegExp.prototype,\n\t'%Set%': typeof Set === 'undefined' ? undefined : Set,\n\t'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),\n\t'%SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,\n\t'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,\n\t'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,\n\t'%String%': String,\n\t'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,\n\t'%StringPrototype%': String.prototype,\n\t'%Symbol%': hasSymbols ? Symbol : undefined,\n\t'%SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,\n\t'%SyntaxError%': SyntaxError,\n\t'%SyntaxErrorPrototype%': SyntaxError.prototype,\n\t'%ThrowTypeError%': ThrowTypeError,\n\t'%TypedArray%': TypedArray,\n\t'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,\n\t'%TypeError%': $TypeError,\n\t'%TypeErrorPrototype%': $TypeError.prototype,\n\t'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,\n\t'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,\n\t'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,\n\t'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,\n\t'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,\n\t'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,\n\t'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,\n\t'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,\n\t'%URIError%': URIError,\n\t'%URIErrorPrototype%': URIError.prototype,\n\t'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,\n\t'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,\n\t'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,\n\t'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype\n};\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\nvar $replace = bind.call(Function.call, String.prototype.replace);\n\n/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */\nvar rePropName = /[^%.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|%$))/g;\nvar reEscapeChar = /\\\\(\\\\)?/g; /** Used to match backslashes in property paths. */\nvar stringToPath = function stringToPath(string) {\n\tvar result = [];\n\t$replace(string, rePropName, function (match, number, quote, subString) {\n\t\tresult[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);\n\t});\n\treturn result;\n};\n/* end adaptation */\n\nvar getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {\n\tif (!(name in INTRINSICS)) {\n\t\tthrow new SyntaxError('intrinsic ' + name + ' does not exist!');\n\t}\n\n\t// istanbul ignore if // hopefully this is impossible to test :-)\n\tif (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {\n\t\tthrow new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');\n\t}\n\n\treturn INTRINSICS[name];\n};\n\nmodule.exports = function GetIntrinsic(name, allowMissing) {\n\tif (typeof name !== 'string' || name.length === 0) {\n\t\tthrow new TypeError('intrinsic name must be a non-empty string');\n\t}\n\tif (arguments.length > 1 && typeof allowMissing !== 'boolean') {\n\t\tthrow new TypeError('\"allowMissing\" argument must be a boolean');\n\t}\n\n\tvar parts = stringToPath(name);\n\n\tvar value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);\n\tfor (var i = 1; i < parts.length; i += 1) {\n\t\tif (value != null) {\n\t\t\tif ($gOPD && (i + 1) >= parts.length) {\n\t\t\t\tvar desc = $gOPD(value, parts[i]);\n\t\t\t\tif (!allowMissing && !(parts[i] in value)) {\n\t\t\t\t\tthrow new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');\n\t\t\t\t}\n\t\t\t\tvalue = desc ? (desc.get || desc.value) : value[parts[i]];\n\t\t\t} else {\n\t\t\t\tvalue = value[parts[i]];\n\t\t\t}\n\t\t}\n\t}\n\treturn value;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/regexp.prototype.flags/node_modules/es-abstract/GetIntrinsic.js?");

	/***/ }),

	/***/ "./node_modules/regexp.prototype.flags/node_modules/es-abstract/helpers/callBind.js":
	/*!******************************************************************************************!*\
	  !*** ./node_modules/regexp.prototype.flags/node_modules/es-abstract/helpers/callBind.js ***!
	  \******************************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/regexp.prototype.flags/node_modules/es-abstract/GetIntrinsic.js\");\n\nvar $Function = GetIntrinsic('%Function%');\nvar $apply = $Function.apply;\nvar $call = $Function.call;\n\nmodule.exports = function callBind() {\n\treturn bind.apply($call, arguments);\n};\n\nmodule.exports.apply = function applyBind() {\n\treturn bind.apply($apply, arguments);\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/regexp.prototype.flags/node_modules/es-abstract/helpers/callBind.js?");

	/***/ }),

	/***/ "./node_modules/regexp.prototype.flags/polyfill.js":
	/*!*********************************************************!*\
	  !*** ./node_modules/regexp.prototype.flags/polyfill.js ***!
	  \*********************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"./node_modules/regexp.prototype.flags/implementation.js\");\n\nvar supportsDescriptors = __webpack_require__(/*! define-properties */ \"./node_modules/define-properties/index.js\").supportsDescriptors;\nvar $gOPD = Object.getOwnPropertyDescriptor;\nvar $TypeError = TypeError;\n\nmodule.exports = function getPolyfill() {\n\tif (!supportsDescriptors) {\n\t\tthrow new $TypeError('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');\n\t}\n\tif ((/a/mig).flags === 'gim') {\n\t\tvar descriptor = $gOPD(RegExp.prototype, 'flags');\n\t\tif (descriptor && typeof descriptor.get === 'function' && typeof (/a/).dotAll === 'boolean') {\n\t\t\treturn descriptor.get;\n\t\t}\n\t}\n\treturn implementation;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/regexp.prototype.flags/polyfill.js?");

	/***/ }),

	/***/ "./node_modules/regexp.prototype.flags/shim.js":
	/*!*****************************************************!*\
	  !*** ./node_modules/regexp.prototype.flags/shim.js ***!
	  \*****************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar supportsDescriptors = __webpack_require__(/*! define-properties */ \"./node_modules/define-properties/index.js\").supportsDescriptors;\nvar getPolyfill = __webpack_require__(/*! ./polyfill */ \"./node_modules/regexp.prototype.flags/polyfill.js\");\nvar gOPD = Object.getOwnPropertyDescriptor;\nvar defineProperty = Object.defineProperty;\nvar TypeErr = TypeError;\nvar getProto = Object.getPrototypeOf;\nvar regex = /a/;\n\nmodule.exports = function shimFlags() {\n\tif (!supportsDescriptors || !getProto) {\n\t\tthrow new TypeErr('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');\n\t}\n\tvar polyfill = getPolyfill();\n\tvar proto = getProto(regex);\n\tvar descriptor = gOPD(proto, 'flags');\n\tif (!descriptor || descriptor.get !== polyfill) {\n\t\tdefineProperty(proto, 'flags', {\n\t\t\tconfigurable: true,\n\t\t\tenumerable: false,\n\t\t\tget: polyfill\n\t\t});\n\t}\n\treturn polyfill;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/regexp.prototype.flags/shim.js?");

	/***/ }),

	/***/ "./node_modules/side-channel/index.js":
	/*!********************************************!*\
	  !*** ./node_modules/side-channel/index.js ***!
	  \********************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar GetIntrinsic = __webpack_require__(/*! es-abstract/GetIntrinsic */ \"./node_modules/side-channel/node_modules/es-abstract/GetIntrinsic.js\");\nvar callBound = __webpack_require__(/*! es-abstract/helpers/callBound */ \"./node_modules/side-channel/node_modules/es-abstract/helpers/callBound.js\");\nvar inspect = __webpack_require__(/*! object-inspect */ \"./node_modules/object-inspect/index.js\");\n\nvar $TypeError = GetIntrinsic('%TypeError%');\nvar $WeakMap = GetIntrinsic('%WeakMap%', true);\nvar $Map = GetIntrinsic('%Map%', true);\nvar $push = callBound('Array.prototype.push');\n\nvar $weakMapGet = callBound('WeakMap.prototype.get', true);\nvar $weakMapSet = callBound('WeakMap.prototype.set', true);\nvar $weakMapHas = callBound('WeakMap.prototype.has', true);\nvar $mapGet = callBound('Map.prototype.get', true);\nvar $mapSet = callBound('Map.prototype.set', true);\nvar $mapHas = callBound('Map.prototype.has', true);\nvar objectGet = function (objects, key) { // eslint-disable-line consistent-return\n\tfor (var i = 0; i < objects.length; i += 1) {\n\t\tif (objects[i].key === key) {\n\t\t\treturn objects[i].value;\n\t\t}\n\t}\n};\nvar objectSet = function (objects, key, value) {\n\tfor (var i = 0; i < objects.length; i += 1) {\n\t\tif (objects[i].key === key) {\n\t\t\tobjects[i].value = value; // eslint-disable-line no-param-reassign\n\t\t\treturn;\n\t\t}\n\t}\n\t$push(objects, {\n\t\tkey: key,\n\t\tvalue: value\n\t});\n};\nvar objectHas = function (objects, key) {\n\tfor (var i = 0; i < objects.length; i += 1) {\n\t\tif (objects[i].key === key) {\n\t\t\treturn true;\n\t\t}\n\t}\n\treturn false;\n};\n\nmodule.exports = function getSideChannel() {\n\tvar $wm;\n\tvar $m;\n\tvar $o;\n\tvar channel = {\n\t\tassert: function (key) {\n\t\t\tif (!channel.has(key)) {\n\t\t\t\tthrow new $TypeError('Side channel does not contain ' + inspect(key));\n\t\t\t}\n\t\t},\n\t\tget: function (key) { // eslint-disable-line consistent-return\n\t\t\tif ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {\n\t\t\t\tif ($wm) {\n\t\t\t\t\treturn $weakMapGet($wm, key);\n\t\t\t\t}\n\t\t\t} else if ($Map) {\n\t\t\t\tif ($m) {\n\t\t\t\t\treturn $mapGet($m, key);\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tif ($o) { // eslint-disable-line no-lonely-if\n\t\t\t\t\treturn objectGet($o, key);\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\thas: function (key) {\n\t\t\tif ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {\n\t\t\t\tif ($wm) {\n\t\t\t\t\treturn $weakMapHas($wm, key);\n\t\t\t\t}\n\t\t\t} else if ($Map) {\n\t\t\t\tif ($m) {\n\t\t\t\t\treturn $mapHas($m, key);\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tif ($o) { // eslint-disable-line no-lonely-if\n\t\t\t\t\treturn objectHas($o, key);\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn false;\n\t\t},\n\t\tset: function (key, value) {\n\t\t\tif ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {\n\t\t\t\tif (!$wm) {\n\t\t\t\t\t$wm = new $WeakMap();\n\t\t\t\t}\n\t\t\t\t$weakMapSet($wm, key, value);\n\t\t\t} else if ($Map) {\n\t\t\t\tif (!$m) {\n\t\t\t\t\t$m = new $Map();\n\t\t\t\t}\n\t\t\t\t$mapSet($m, key, value);\n\t\t\t} else {\n\t\t\t\tif (!$o) {\n\t\t\t\t\t$o = [];\n\t\t\t\t}\n\t\t\t\tobjectSet($o, key, value);\n\t\t\t}\n\t\t}\n\t};\n\treturn channel;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/side-channel/index.js?");

	/***/ }),

	/***/ "./node_modules/side-channel/node_modules/es-abstract/GetIntrinsic.js":
	/*!****************************************************************************!*\
	  !*** ./node_modules/side-channel/node_modules/es-abstract/GetIntrinsic.js ***!
	  \****************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\n/* globals\n\tAtomics,\n\tSharedArrayBuffer,\n*/\n\nvar undefined;\n\nvar $TypeError = TypeError;\n\nvar $gOPD = Object.getOwnPropertyDescriptor;\nif ($gOPD) {\n\ttry {\n\t\t$gOPD({}, '');\n\t} catch (e) {\n\t\t$gOPD = null; // this is IE 8, which has a broken gOPD\n\t}\n}\n\nvar throwTypeError = function () { throw new $TypeError(); };\nvar ThrowTypeError = $gOPD\n\t? (function () {\n\t\ttry {\n\t\t\t// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties\n\t\t\targuments.callee; // IE 8 does not throw here\n\t\t\treturn throwTypeError;\n\t\t} catch (calleeThrows) {\n\t\t\ttry {\n\t\t\t\t// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')\n\t\t\t\treturn $gOPD(arguments, 'callee').get;\n\t\t\t} catch (gOPDthrows) {\n\t\t\t\treturn throwTypeError;\n\t\t\t}\n\t\t}\n\t}())\n\t: throwTypeError;\n\nvar hasSymbols = __webpack_require__(/*! has-symbols */ \"./node_modules/has-symbols/index.js\")();\n\nvar getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto\n\nvar generator; // = function * () {};\nvar generatorFunction = generator ? getProto(generator) : undefined;\nvar asyncFn; // async function() {};\nvar asyncFunction = asyncFn ? asyncFn.constructor : undefined;\nvar asyncGen; // async function * () {};\nvar asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;\nvar asyncGenIterator = asyncGen ? asyncGen() : undefined;\n\nvar TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);\n\nvar INTRINSICS = {\n\t'%Array%': Array,\n\t'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,\n\t'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,\n\t'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,\n\t'%ArrayPrototype%': Array.prototype,\n\t'%ArrayProto_entries%': Array.prototype.entries,\n\t'%ArrayProto_forEach%': Array.prototype.forEach,\n\t'%ArrayProto_keys%': Array.prototype.keys,\n\t'%ArrayProto_values%': Array.prototype.values,\n\t'%AsyncFromSyncIteratorPrototype%': undefined,\n\t'%AsyncFunction%': asyncFunction,\n\t'%AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,\n\t'%AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,\n\t'%AsyncGeneratorFunction%': asyncGenFunction,\n\t'%AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,\n\t'%AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,\n\t'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,\n\t'%Boolean%': Boolean,\n\t'%BooleanPrototype%': Boolean.prototype,\n\t'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,\n\t'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,\n\t'%Date%': Date,\n\t'%DatePrototype%': Date.prototype,\n\t'%decodeURI%': decodeURI,\n\t'%decodeURIComponent%': decodeURIComponent,\n\t'%encodeURI%': encodeURI,\n\t'%encodeURIComponent%': encodeURIComponent,\n\t'%Error%': Error,\n\t'%ErrorPrototype%': Error.prototype,\n\t'%eval%': eval, // eslint-disable-line no-eval\n\t'%EvalError%': EvalError,\n\t'%EvalErrorPrototype%': EvalError.prototype,\n\t'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,\n\t'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,\n\t'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,\n\t'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,\n\t'%Function%': Function,\n\t'%FunctionPrototype%': Function.prototype,\n\t'%Generator%': generator ? getProto(generator()) : undefined,\n\t'%GeneratorFunction%': generatorFunction,\n\t'%GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,\n\t'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,\n\t'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,\n\t'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,\n\t'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,\n\t'%isFinite%': isFinite,\n\t'%isNaN%': isNaN,\n\t'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,\n\t'%JSON%': typeof JSON === 'object' ? JSON : undefined,\n\t'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,\n\t'%Map%': typeof Map === 'undefined' ? undefined : Map,\n\t'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),\n\t'%MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,\n\t'%Math%': Math,\n\t'%Number%': Number,\n\t'%NumberPrototype%': Number.prototype,\n\t'%Object%': Object,\n\t'%ObjectPrototype%': Object.prototype,\n\t'%ObjProto_toString%': Object.prototype.toString,\n\t'%ObjProto_valueOf%': Object.prototype.valueOf,\n\t'%parseFloat%': parseFloat,\n\t'%parseInt%': parseInt,\n\t'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,\n\t'%PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,\n\t'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,\n\t'%Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,\n\t'%Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,\n\t'%Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,\n\t'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,\n\t'%RangeError%': RangeError,\n\t'%RangeErrorPrototype%': RangeError.prototype,\n\t'%ReferenceError%': ReferenceError,\n\t'%ReferenceErrorPrototype%': ReferenceError.prototype,\n\t'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,\n\t'%RegExp%': RegExp,\n\t'%RegExpPrototype%': RegExp.prototype,\n\t'%Set%': typeof Set === 'undefined' ? undefined : Set,\n\t'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),\n\t'%SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,\n\t'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,\n\t'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,\n\t'%String%': String,\n\t'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,\n\t'%StringPrototype%': String.prototype,\n\t'%Symbol%': hasSymbols ? Symbol : undefined,\n\t'%SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,\n\t'%SyntaxError%': SyntaxError,\n\t'%SyntaxErrorPrototype%': SyntaxError.prototype,\n\t'%ThrowTypeError%': ThrowTypeError,\n\t'%TypedArray%': TypedArray,\n\t'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,\n\t'%TypeError%': $TypeError,\n\t'%TypeErrorPrototype%': $TypeError.prototype,\n\t'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,\n\t'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,\n\t'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,\n\t'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,\n\t'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,\n\t'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,\n\t'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,\n\t'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,\n\t'%URIError%': URIError,\n\t'%URIErrorPrototype%': URIError.prototype,\n\t'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,\n\t'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,\n\t'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,\n\t'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype\n};\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\nvar $replace = bind.call(Function.call, String.prototype.replace);\n\n/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */\nvar rePropName = /[^%.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|%$))/g;\nvar reEscapeChar = /\\\\(\\\\)?/g; /** Used to match backslashes in property paths. */\nvar stringToPath = function stringToPath(string) {\n\tvar result = [];\n\t$replace(string, rePropName, function (match, number, quote, subString) {\n\t\tresult[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);\n\t});\n\treturn result;\n};\n/* end adaptation */\n\nvar getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {\n\tif (!(name in INTRINSICS)) {\n\t\tthrow new SyntaxError('intrinsic ' + name + ' does not exist!');\n\t}\n\n\t// istanbul ignore if // hopefully this is impossible to test :-)\n\tif (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {\n\t\tthrow new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');\n\t}\n\n\treturn INTRINSICS[name];\n};\n\nmodule.exports = function GetIntrinsic(name, allowMissing) {\n\tif (typeof name !== 'string' || name.length === 0) {\n\t\tthrow new TypeError('intrinsic name must be a non-empty string');\n\t}\n\tif (arguments.length > 1 && typeof allowMissing !== 'boolean') {\n\t\tthrow new TypeError('\"allowMissing\" argument must be a boolean');\n\t}\n\n\tvar parts = stringToPath(name);\n\n\tvar value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);\n\tfor (var i = 1; i < parts.length; i += 1) {\n\t\tif (value != null) {\n\t\t\tif ($gOPD && (i + 1) >= parts.length) {\n\t\t\t\tvar desc = $gOPD(value, parts[i]);\n\t\t\t\tif (!allowMissing && !(parts[i] in value)) {\n\t\t\t\t\tthrow new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');\n\t\t\t\t}\n\t\t\t\tvalue = desc ? (desc.get || desc.value) : value[parts[i]];\n\t\t\t} else {\n\t\t\t\tvalue = value[parts[i]];\n\t\t\t}\n\t\t}\n\t}\n\treturn value;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/side-channel/node_modules/es-abstract/GetIntrinsic.js?");

	/***/ }),

	/***/ "./node_modules/side-channel/node_modules/es-abstract/helpers/callBind.js":
	/*!********************************************************************************!*\
	  !*** ./node_modules/side-channel/node_modules/es-abstract/helpers/callBind.js ***!
	  \********************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/side-channel/node_modules/es-abstract/GetIntrinsic.js\");\n\nvar $Function = GetIntrinsic('%Function%');\nvar $apply = $Function.apply;\nvar $call = $Function.call;\n\nmodule.exports = function callBind() {\n\treturn bind.apply($call, arguments);\n};\n\nmodule.exports.apply = function applyBind() {\n\treturn bind.apply($apply, arguments);\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/side-channel/node_modules/es-abstract/helpers/callBind.js?");

	/***/ }),

	/***/ "./node_modules/side-channel/node_modules/es-abstract/helpers/callBound.js":
	/*!*********************************************************************************!*\
	  !*** ./node_modules/side-channel/node_modules/es-abstract/helpers/callBound.js ***!
	  \*********************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/side-channel/node_modules/es-abstract/GetIntrinsic.js\");\n\nvar callBind = __webpack_require__(/*! ./callBind */ \"./node_modules/side-channel/node_modules/es-abstract/helpers/callBind.js\");\n\nvar $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));\n\nmodule.exports = function callBoundIntrinsic(name, allowMissing) {\n\tvar intrinsic = GetIntrinsic(name, !!allowMissing);\n\tif (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {\n\t\treturn callBind(intrinsic);\n\t}\n\treturn intrinsic;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/side-channel/node_modules/es-abstract/helpers/callBound.js?");

	/***/ }),

	/***/ "./node_modules/webpack/buildin/global.js":
	/*!***********************************!*\
	  !*** (webpack)/buildin/global.js ***!
	  \***********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack://Quill/(webpack)/buildin/global.js?");

	/***/ }),

	/***/ "./node_modules/which-boxed-primitive/index.js":
	/*!*****************************************************!*\
	  !*** ./node_modules/which-boxed-primitive/index.js ***!
	  \*****************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar isString = __webpack_require__(/*! is-string */ \"./node_modules/is-string/index.js\");\nvar isNumber = __webpack_require__(/*! is-number-object */ \"./node_modules/is-number-object/index.js\");\nvar isBoolean = __webpack_require__(/*! is-boolean-object */ \"./node_modules/is-boolean-object/index.js\");\nvar isSymbol = __webpack_require__(/*! is-symbol */ \"./node_modules/which-boxed-primitive/node_modules/is-symbol/index.js\");\nvar isBigInt = __webpack_require__(/*! is-bigint */ \"./node_modules/is-bigint/index.js\");\n\n// eslint-disable-next-line consistent-return\nmodule.exports = function whichBoxedPrimitive(value) {\n\t// eslint-disable-next-line eqeqeq\n\tif (value == null || (typeof value !== 'object' && typeof value !== 'function')) {\n\t\treturn null;\n\t}\n\tif (isString(value)) {\n\t\treturn 'String';\n\t}\n\tif (isNumber(value)) {\n\t\treturn 'Number';\n\t}\n\tif (isBoolean(value)) {\n\t\treturn 'Boolean';\n\t}\n\tif (isSymbol(value)) {\n\t\treturn 'Symbol';\n\t}\n\tif (isBigInt(value)) {\n\t\treturn 'BigInt';\n\t}\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/which-boxed-primitive/index.js?");

	/***/ }),

	/***/ "./node_modules/which-boxed-primitive/node_modules/is-symbol/index.js":
	/*!****************************************************************************!*\
	  !*** ./node_modules/which-boxed-primitive/node_modules/is-symbol/index.js ***!
	  \****************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar toStr = Object.prototype.toString;\nvar hasSymbols = __webpack_require__(/*! has-symbols */ \"./node_modules/has-symbols/index.js\")();\n\nif (hasSymbols) {\n\tvar symToStr = Symbol.prototype.toString;\n\tvar symStringRegex = /^Symbol\\(.*\\)$/;\n\tvar isSymbolObject = function isRealSymbolObject(value) {\n\t\tif (typeof value.valueOf() !== 'symbol') {\n\t\t\treturn false;\n\t\t}\n\t\treturn symStringRegex.test(symToStr.call(value));\n\t};\n\n\tmodule.exports = function isSymbol(value) {\n\t\tif (typeof value === 'symbol') {\n\t\t\treturn true;\n\t\t}\n\t\tif (toStr.call(value) !== '[object Symbol]') {\n\t\t\treturn false;\n\t\t}\n\t\ttry {\n\t\t\treturn isSymbolObject(value);\n\t\t} catch (e) {\n\t\t\treturn false;\n\t\t}\n\t};\n} else {\n\n\tmodule.exports = function isSymbol(value) {\n\t\t// this environment does not support Symbols.\n\t\treturn  false && false;\n\t};\n}\n\n\n//# sourceURL=webpack://Quill/./node_modules/which-boxed-primitive/node_modules/is-symbol/index.js?");

	/***/ }),

	/***/ "./node_modules/which-collection/index.js":
	/*!************************************************!*\
	  !*** ./node_modules/which-collection/index.js ***!
	  \************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar isMap = __webpack_require__(/*! is-map */ \"./node_modules/is-map/index.js\");\nvar isSet = __webpack_require__(/*! is-set */ \"./node_modules/is-set/index.js\");\nvar isWeakMap = __webpack_require__(/*! is-weakmap */ \"./node_modules/is-weakmap/index.js\");\nvar isWeakSet = __webpack_require__(/*! is-weakset */ \"./node_modules/is-weakset/index.js\");\n\nmodule.exports = function whichCollection(value) {\n\tif (value && typeof value === 'object') {\n\t\tif (isMap(value)) {\n\t\t\treturn 'Map';\n\t\t}\n\t\tif (isSet(value)) {\n\t\t\treturn 'Set';\n\t\t}\n\t\tif (isWeakMap(value)) {\n\t\t\treturn 'WeakMap';\n\t\t}\n\t\tif (isWeakSet(value)) {\n\t\t\treturn 'WeakSet';\n\t\t}\n\t}\n\treturn false;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/which-collection/index.js?");

	/***/ }),

	/***/ "./node_modules/which-typed-array/index.js":
	/*!*************************************************!*\
	  !*** ./node_modules/which-typed-array/index.js ***!
	  \*************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("/* WEBPACK VAR INJECTION */(function(global) {\n\nvar forEach = __webpack_require__(/*! foreach */ \"./node_modules/foreach/index.js\");\nvar availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ \"./node_modules/available-typed-arrays/index.js\");\nvar callBound = __webpack_require__(/*! es-abstract/helpers/callBound */ \"./node_modules/which-typed-array/node_modules/es-abstract/helpers/callBound.js\");\n\nvar $toString = callBound('Object.prototype.toString');\nvar hasSymbols = __webpack_require__(/*! has-symbols */ \"./node_modules/has-symbols/index.js\")();\nvar hasToStringTag = hasSymbols && typeof Symbol.toStringTag === 'symbol';\n\nvar typedArrays = availableTypedArrays();\n\nvar $slice = callBound('String.prototype.slice');\nvar toStrTags = {};\nvar gOPD = __webpack_require__(/*! es-abstract/helpers/getOwnPropertyDescriptor */ \"./node_modules/which-typed-array/node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js\");\nvar getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');\nif (hasToStringTag && gOPD && getPrototypeOf) {\n\tforEach(typedArrays, function (typedArray) {\n\t\tif (typeof global[typedArray] === 'function') {\n\t\t\tvar arr = new global[typedArray]();\n\t\t\tif (!(Symbol.toStringTag in arr)) {\n\t\t\t\tthrow new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');\n\t\t\t}\n\t\t\tvar proto = getPrototypeOf(arr);\n\t\t\tvar descriptor = gOPD(proto, Symbol.toStringTag);\n\t\t\tif (!descriptor) {\n\t\t\t\tvar superProto = getPrototypeOf(proto);\n\t\t\t\tdescriptor = gOPD(superProto, Symbol.toStringTag);\n\t\t\t}\n\t\t\ttoStrTags[typedArray] = descriptor.get;\n\t\t}\n\t});\n}\n\nvar tryTypedArrays = function tryAllTypedArrays(value) {\n\tvar foundName = false;\n\tforEach(toStrTags, function (getter, typedArray) {\n\t\tif (!foundName) {\n\t\t\ttry {\n\t\t\t\tvar name = getter.call(value);\n\t\t\t\tif (name === typedArray) {\n\t\t\t\t\tfoundName = name;\n\t\t\t\t}\n\t\t\t} catch (e) {}\n\t\t}\n\t});\n\treturn foundName;\n};\n\nvar isTypedArray = __webpack_require__(/*! is-typed-array */ \"./node_modules/is-typed-array/index.js\");\n\nmodule.exports = function whichTypedArray(value) {\n\tif (!isTypedArray(value)) { return false; }\n\tif (!hasToStringTag) { return $slice($toString(value), 8, -1); }\n\treturn tryTypedArrays(value);\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://Quill/./node_modules/which-typed-array/index.js?");

	/***/ }),

	/***/ "./node_modules/which-typed-array/node_modules/es-abstract/GetIntrinsic.js":
	/*!*********************************************************************************!*\
	  !*** ./node_modules/which-typed-array/node_modules/es-abstract/GetIntrinsic.js ***!
	  \*********************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\n/* globals\n\tAtomics,\n\tSharedArrayBuffer,\n*/\n\nvar undefined;\n\nvar $TypeError = TypeError;\n\nvar $gOPD = Object.getOwnPropertyDescriptor;\nif ($gOPD) {\n\ttry {\n\t\t$gOPD({}, '');\n\t} catch (e) {\n\t\t$gOPD = null; // this is IE 8, which has a broken gOPD\n\t}\n}\n\nvar throwTypeError = function () { throw new $TypeError(); };\nvar ThrowTypeError = $gOPD\n\t? (function () {\n\t\ttry {\n\t\t\t// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties\n\t\t\targuments.callee; // IE 8 does not throw here\n\t\t\treturn throwTypeError;\n\t\t} catch (calleeThrows) {\n\t\t\ttry {\n\t\t\t\t// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')\n\t\t\t\treturn $gOPD(arguments, 'callee').get;\n\t\t\t} catch (gOPDthrows) {\n\t\t\t\treturn throwTypeError;\n\t\t\t}\n\t\t}\n\t}())\n\t: throwTypeError;\n\nvar hasSymbols = __webpack_require__(/*! has-symbols */ \"./node_modules/has-symbols/index.js\")();\n\nvar getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto\n\nvar generator; // = function * () {};\nvar generatorFunction = generator ? getProto(generator) : undefined;\nvar asyncFn; // async function() {};\nvar asyncFunction = asyncFn ? asyncFn.constructor : undefined;\nvar asyncGen; // async function * () {};\nvar asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;\nvar asyncGenIterator = asyncGen ? asyncGen() : undefined;\n\nvar TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);\n\nvar INTRINSICS = {\n\t'%Array%': Array,\n\t'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,\n\t'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,\n\t'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,\n\t'%ArrayPrototype%': Array.prototype,\n\t'%ArrayProto_entries%': Array.prototype.entries,\n\t'%ArrayProto_forEach%': Array.prototype.forEach,\n\t'%ArrayProto_keys%': Array.prototype.keys,\n\t'%ArrayProto_values%': Array.prototype.values,\n\t'%AsyncFromSyncIteratorPrototype%': undefined,\n\t'%AsyncFunction%': asyncFunction,\n\t'%AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,\n\t'%AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,\n\t'%AsyncGeneratorFunction%': asyncGenFunction,\n\t'%AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,\n\t'%AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,\n\t'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,\n\t'%Boolean%': Boolean,\n\t'%BooleanPrototype%': Boolean.prototype,\n\t'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,\n\t'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,\n\t'%Date%': Date,\n\t'%DatePrototype%': Date.prototype,\n\t'%decodeURI%': decodeURI,\n\t'%decodeURIComponent%': decodeURIComponent,\n\t'%encodeURI%': encodeURI,\n\t'%encodeURIComponent%': encodeURIComponent,\n\t'%Error%': Error,\n\t'%ErrorPrototype%': Error.prototype,\n\t'%eval%': eval, // eslint-disable-line no-eval\n\t'%EvalError%': EvalError,\n\t'%EvalErrorPrototype%': EvalError.prototype,\n\t'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,\n\t'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,\n\t'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,\n\t'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,\n\t'%Function%': Function,\n\t'%FunctionPrototype%': Function.prototype,\n\t'%Generator%': generator ? getProto(generator()) : undefined,\n\t'%GeneratorFunction%': generatorFunction,\n\t'%GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,\n\t'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,\n\t'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,\n\t'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,\n\t'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,\n\t'%isFinite%': isFinite,\n\t'%isNaN%': isNaN,\n\t'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,\n\t'%JSON%': typeof JSON === 'object' ? JSON : undefined,\n\t'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,\n\t'%Map%': typeof Map === 'undefined' ? undefined : Map,\n\t'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),\n\t'%MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,\n\t'%Math%': Math,\n\t'%Number%': Number,\n\t'%NumberPrototype%': Number.prototype,\n\t'%Object%': Object,\n\t'%ObjectPrototype%': Object.prototype,\n\t'%ObjProto_toString%': Object.prototype.toString,\n\t'%ObjProto_valueOf%': Object.prototype.valueOf,\n\t'%parseFloat%': parseFloat,\n\t'%parseInt%': parseInt,\n\t'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,\n\t'%PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,\n\t'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,\n\t'%Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,\n\t'%Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,\n\t'%Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,\n\t'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,\n\t'%RangeError%': RangeError,\n\t'%RangeErrorPrototype%': RangeError.prototype,\n\t'%ReferenceError%': ReferenceError,\n\t'%ReferenceErrorPrototype%': ReferenceError.prototype,\n\t'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,\n\t'%RegExp%': RegExp,\n\t'%RegExpPrototype%': RegExp.prototype,\n\t'%Set%': typeof Set === 'undefined' ? undefined : Set,\n\t'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),\n\t'%SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,\n\t'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,\n\t'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,\n\t'%String%': String,\n\t'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,\n\t'%StringPrototype%': String.prototype,\n\t'%Symbol%': hasSymbols ? Symbol : undefined,\n\t'%SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,\n\t'%SyntaxError%': SyntaxError,\n\t'%SyntaxErrorPrototype%': SyntaxError.prototype,\n\t'%ThrowTypeError%': ThrowTypeError,\n\t'%TypedArray%': TypedArray,\n\t'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,\n\t'%TypeError%': $TypeError,\n\t'%TypeErrorPrototype%': $TypeError.prototype,\n\t'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,\n\t'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,\n\t'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,\n\t'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,\n\t'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,\n\t'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,\n\t'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,\n\t'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,\n\t'%URIError%': URIError,\n\t'%URIErrorPrototype%': URIError.prototype,\n\t'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,\n\t'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,\n\t'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,\n\t'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype\n};\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\nvar $replace = bind.call(Function.call, String.prototype.replace);\n\n/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */\nvar rePropName = /[^%.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|%$))/g;\nvar reEscapeChar = /\\\\(\\\\)?/g; /** Used to match backslashes in property paths. */\nvar stringToPath = function stringToPath(string) {\n\tvar result = [];\n\t$replace(string, rePropName, function (match, number, quote, subString) {\n\t\tresult[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);\n\t});\n\treturn result;\n};\n/* end adaptation */\n\nvar getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {\n\tif (!(name in INTRINSICS)) {\n\t\tthrow new SyntaxError('intrinsic ' + name + ' does not exist!');\n\t}\n\n\t// istanbul ignore if // hopefully this is impossible to test :-)\n\tif (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {\n\t\tthrow new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');\n\t}\n\n\treturn INTRINSICS[name];\n};\n\nmodule.exports = function GetIntrinsic(name, allowMissing) {\n\tif (typeof name !== 'string' || name.length === 0) {\n\t\tthrow new TypeError('intrinsic name must be a non-empty string');\n\t}\n\tif (arguments.length > 1 && typeof allowMissing !== 'boolean') {\n\t\tthrow new TypeError('\"allowMissing\" argument must be a boolean');\n\t}\n\n\tvar parts = stringToPath(name);\n\n\tvar value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);\n\tfor (var i = 1; i < parts.length; i += 1) {\n\t\tif (value != null) {\n\t\t\tif ($gOPD && (i + 1) >= parts.length) {\n\t\t\t\tvar desc = $gOPD(value, parts[i]);\n\t\t\t\tif (!allowMissing && !(parts[i] in value)) {\n\t\t\t\t\tthrow new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');\n\t\t\t\t}\n\t\t\t\tvalue = desc ? (desc.get || desc.value) : value[parts[i]];\n\t\t\t} else {\n\t\t\t\tvalue = value[parts[i]];\n\t\t\t}\n\t\t}\n\t}\n\treturn value;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/which-typed-array/node_modules/es-abstract/GetIntrinsic.js?");

	/***/ }),

	/***/ "./node_modules/which-typed-array/node_modules/es-abstract/helpers/callBind.js":
	/*!*************************************************************************************!*\
	  !*** ./node_modules/which-typed-array/node_modules/es-abstract/helpers/callBind.js ***!
	  \*************************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/which-typed-array/node_modules/es-abstract/GetIntrinsic.js\");\n\nvar $Function = GetIntrinsic('%Function%');\nvar $apply = $Function.apply;\nvar $call = $Function.call;\n\nmodule.exports = function callBind() {\n\treturn bind.apply($call, arguments);\n};\n\nmodule.exports.apply = function applyBind() {\n\treturn bind.apply($apply, arguments);\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/which-typed-array/node_modules/es-abstract/helpers/callBind.js?");

	/***/ }),

	/***/ "./node_modules/which-typed-array/node_modules/es-abstract/helpers/callBound.js":
	/*!**************************************************************************************!*\
	  !*** ./node_modules/which-typed-array/node_modules/es-abstract/helpers/callBound.js ***!
	  \**************************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/which-typed-array/node_modules/es-abstract/GetIntrinsic.js\");\n\nvar callBind = __webpack_require__(/*! ./callBind */ \"./node_modules/which-typed-array/node_modules/es-abstract/helpers/callBind.js\");\n\nvar $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));\n\nmodule.exports = function callBoundIntrinsic(name, allowMissing) {\n\tvar intrinsic = GetIntrinsic(name, !!allowMissing);\n\tif (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {\n\t\treturn callBind(intrinsic);\n\t}\n\treturn intrinsic;\n};\n\n\n//# sourceURL=webpack://Quill/./node_modules/which-typed-array/node_modules/es-abstract/helpers/callBound.js?");

	/***/ }),

	/***/ "./node_modules/which-typed-array/node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js":
	/*!*****************************************************************************************************!*\
	  !*** ./node_modules/which-typed-array/node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js ***!
	  \*****************************************************************************************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {
	eval("\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/which-typed-array/node_modules/es-abstract/GetIntrinsic.js\");\n\nvar $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%');\nif ($gOPD) {\n\ttry {\n\t\t$gOPD([], 'length');\n\t} catch (e) {\n\t\t// IE 8 has a broken gOPD\n\t\t$gOPD = null;\n\t}\n}\n\nmodule.exports = $gOPD;\n\n\n//# sourceURL=webpack://Quill/./node_modules/which-typed-array/node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js?");

	/***/ }),

	/***/ "./quill.js":
	/*!******************!*\
	  !*** ./quill.js ***!
	  \******************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ \"./core.js\");\n/* harmony import */ var _formats_align__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formats/align */ \"./formats/align.js\");\n/* harmony import */ var _formats_direction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formats/direction */ \"./formats/direction.js\");\n/* harmony import */ var _formats_indent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formats/indent */ \"./formats/indent.js\");\n/* harmony import */ var _formats_blockquote__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./formats/blockquote */ \"./formats/blockquote.js\");\n/* harmony import */ var _formats_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./formats/header */ \"./formats/header.js\");\n/* harmony import */ var _formats_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./formats/list */ \"./formats/list.js\");\n/* harmony import */ var _formats_background__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./formats/background */ \"./formats/background.js\");\n/* harmony import */ var _formats_color__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./formats/color */ \"./formats/color.js\");\n/* harmony import */ var _formats_font__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./formats/font */ \"./formats/font.js\");\n/* harmony import */ var _formats_size__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./formats/size */ \"./formats/size.js\");\n/* harmony import */ var _formats_bold__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./formats/bold */ \"./formats/bold.js\");\n/* harmony import */ var _formats_italic__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./formats/italic */ \"./formats/italic.js\");\n/* harmony import */ var _formats_link__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./formats/link */ \"./formats/link.js\");\n/* harmony import */ var _formats_script__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./formats/script */ \"./formats/script.js\");\n/* harmony import */ var _formats_strike__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./formats/strike */ \"./formats/strike.js\");\n/* harmony import */ var _formats_underline__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./formats/underline */ \"./formats/underline.js\");\n/* harmony import */ var _formats_formula__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./formats/formula */ \"./formats/formula.js\");\n/* harmony import */ var _formats_image__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./formats/image */ \"./formats/image.js\");\n/* harmony import */ var _formats_video__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./formats/video */ \"./formats/video.js\");\n/* harmony import */ var _formats_code__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./formats/code */ \"./formats/code.js\");\n/* harmony import */ var _modules_syntax__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./modules/syntax */ \"./modules/syntax.js\");\n/* harmony import */ var _modules_table__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./modules/table */ \"./modules/table.js\");\n/* harmony import */ var _modules_toolbar__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./modules/toolbar */ \"./modules/toolbar.js\");\n/* harmony import */ var _ui_icons__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./ui/icons */ \"./ui/icons.js\");\n/* harmony import */ var _ui_picker__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./ui/picker */ \"./ui/picker.js\");\n/* harmony import */ var _ui_color_picker__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./ui/color-picker */ \"./ui/color-picker.js\");\n/* harmony import */ var _ui_icon_picker__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./ui/icon-picker */ \"./ui/icon-picker.js\");\n/* harmony import */ var _ui_tooltip__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./ui/tooltip */ \"./ui/tooltip.js\");\n/* harmony import */ var _themes_bubble__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./themes/bubble */ \"./themes/bubble.js\");\n/* harmony import */ var _themes_snow__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./themes/snow */ \"./themes/snow.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n_core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].register({\n  'attributors/attribute/direction': _formats_direction__WEBPACK_IMPORTED_MODULE_2__[\"DirectionAttribute\"],\n  'attributors/class/align': _formats_align__WEBPACK_IMPORTED_MODULE_1__[\"AlignClass\"],\n  'attributors/class/background': _formats_background__WEBPACK_IMPORTED_MODULE_7__[\"BackgroundClass\"],\n  'attributors/class/color': _formats_color__WEBPACK_IMPORTED_MODULE_8__[\"ColorClass\"],\n  'attributors/class/direction': _formats_direction__WEBPACK_IMPORTED_MODULE_2__[\"DirectionClass\"],\n  'attributors/class/font': _formats_font__WEBPACK_IMPORTED_MODULE_9__[\"FontClass\"],\n  'attributors/class/size': _formats_size__WEBPACK_IMPORTED_MODULE_10__[\"SizeClass\"],\n  'attributors/style/align': _formats_align__WEBPACK_IMPORTED_MODULE_1__[\"AlignStyle\"],\n  'attributors/style/background': _formats_background__WEBPACK_IMPORTED_MODULE_7__[\"BackgroundStyle\"],\n  'attributors/style/color': _formats_color__WEBPACK_IMPORTED_MODULE_8__[\"ColorStyle\"],\n  'attributors/style/direction': _formats_direction__WEBPACK_IMPORTED_MODULE_2__[\"DirectionStyle\"],\n  'attributors/style/font': _formats_font__WEBPACK_IMPORTED_MODULE_9__[\"FontStyle\"],\n  'attributors/style/size': _formats_size__WEBPACK_IMPORTED_MODULE_10__[\"SizeStyle\"]\n}, true);\n_core__WEBPACK_IMPORTED_MODULE_0__[\"default\"].register({\n  'formats/align': _formats_align__WEBPACK_IMPORTED_MODULE_1__[\"AlignClass\"],\n  'formats/direction': _formats_direction__WEBPACK_IMPORTED_MODULE_2__[\"DirectionClass\"],\n  'formats/indent': _formats_indent__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  'formats/background': _formats_background__WEBPACK_IMPORTED_MODULE_7__[\"BackgroundStyle\"],\n  'formats/color': _formats_color__WEBPACK_IMPORTED_MODULE_8__[\"ColorStyle\"],\n  'formats/font': _formats_font__WEBPACK_IMPORTED_MODULE_9__[\"FontClass\"],\n  'formats/size': _formats_size__WEBPACK_IMPORTED_MODULE_10__[\"SizeClass\"],\n  'formats/blockquote': _formats_blockquote__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n  'formats/code-block': _formats_code__WEBPACK_IMPORTED_MODULE_20__[\"default\"],\n  'formats/header': _formats_header__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n  'formats/list': _formats_list__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  'formats/bold': _formats_bold__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n  'formats/code': _formats_code__WEBPACK_IMPORTED_MODULE_20__[\"Code\"],\n  'formats/italic': _formats_italic__WEBPACK_IMPORTED_MODULE_12__[\"default\"],\n  'formats/link': _formats_link__WEBPACK_IMPORTED_MODULE_13__[\"default\"],\n  'formats/script': _formats_script__WEBPACK_IMPORTED_MODULE_14__[\"default\"],\n  'formats/strike': _formats_strike__WEBPACK_IMPORTED_MODULE_15__[\"default\"],\n  'formats/underline': _formats_underline__WEBPACK_IMPORTED_MODULE_16__[\"default\"],\n  'formats/formula': _formats_formula__WEBPACK_IMPORTED_MODULE_17__[\"default\"],\n  'formats/image': _formats_image__WEBPACK_IMPORTED_MODULE_18__[\"default\"],\n  'formats/video': _formats_video__WEBPACK_IMPORTED_MODULE_19__[\"default\"],\n  'modules/syntax': _modules_syntax__WEBPACK_IMPORTED_MODULE_21__[\"default\"],\n  'modules/table': _modules_table__WEBPACK_IMPORTED_MODULE_22__[\"default\"],\n  'modules/toolbar': _modules_toolbar__WEBPACK_IMPORTED_MODULE_23__[\"default\"],\n  'themes/bubble': _themes_bubble__WEBPACK_IMPORTED_MODULE_29__[\"default\"],\n  'themes/snow': _themes_snow__WEBPACK_IMPORTED_MODULE_30__[\"default\"],\n  'ui/icons': _ui_icons__WEBPACK_IMPORTED_MODULE_24__[\"default\"],\n  'ui/picker': _ui_picker__WEBPACK_IMPORTED_MODULE_25__[\"default\"],\n  'ui/icon-picker': _ui_icon_picker__WEBPACK_IMPORTED_MODULE_27__[\"default\"],\n  'ui/color-picker': _ui_color_picker__WEBPACK_IMPORTED_MODULE_26__[\"default\"],\n  'ui/tooltip': _ui_tooltip__WEBPACK_IMPORTED_MODULE_28__[\"default\"]\n}, true);\n/* harmony default export */ __webpack_exports__[\"default\"] = (_core__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack://Quill/./quill.js?");

	/***/ }),

	/***/ "./themes/base.js":
	/*!************************!*\
	  !*** ./themes/base.js ***!
	  \************************/
	/*! exports provided: BaseTooltip, default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BaseTooltip\", function() { return BaseTooltip; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BaseTheme; });\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! extend */ \"./node_modules/extend/index.js\");\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(extend__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/emitter */ \"./core/emitter.js\");\n/* harmony import */ var _core_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/theme */ \"./core/theme.js\");\n/* harmony import */ var _ui_color_picker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/color-picker */ \"./ui/color-picker.js\");\n/* harmony import */ var _ui_icon_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/icon-picker */ \"./ui/icon-picker.js\");\n/* harmony import */ var _ui_picker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ui/picker */ \"./ui/picker.js\");\n/* harmony import */ var _ui_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../ui/tooltip */ \"./ui/tooltip.js\");\n\n\n\n\n\n\n\nconst ALIGNS = [false, 'center', 'right', 'justify'];\nconst COLORS = ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'];\nconst FONTS = [false, 'serif', 'monospace'];\nconst HEADERS = ['1', '2', '3', false];\nconst SIZES = ['small', false, 'large', 'huge'];\n\nclass BaseTheme extends _core_theme__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\n  constructor(quill, options) {\n    super(quill, options);\n\n    const listener = e => {\n      if (!document.body.contains(quill.root)) {\n        document.body.removeEventListener('click', listener);\n        return;\n      }\n\n      if (this.tooltip != null && !this.tooltip.root.contains(e.target) && document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus()) {\n        this.tooltip.hide();\n      }\n\n      if (this.pickers != null) {\n        this.pickers.forEach(picker => {\n          if (!picker.container.contains(e.target)) {\n            picker.close();\n          }\n        });\n      }\n    };\n\n    quill.emitter.listenDOM('click', document.body, listener);\n  }\n\n  addModule(name) {\n    const module = super.addModule(name);\n\n    if (name === 'toolbar') {\n      this.extendToolbar(module);\n    }\n\n    return module;\n  }\n\n  buildButtons(buttons, icons) {\n    Array.from(buttons).forEach(button => {\n      const className = button.getAttribute('class') || '';\n      className.split(/\\s+/).forEach(name => {\n        if (!name.startsWith('ql-')) return;\n        name = name.slice('ql-'.length);\n        if (icons[name] == null) return;\n\n        if (name === 'direction') {\n          button.innerHTML = icons[name][''] + icons[name].rtl;\n        } else if (typeof icons[name] === 'string') {\n          button.innerHTML = icons[name];\n        } else {\n          const value = button.value || '';\n\n          if (value != null && icons[name][value]) {\n            button.innerHTML = icons[name][value];\n          }\n        }\n      });\n    });\n  }\n\n  buildPickers(selects, icons) {\n    this.pickers = Array.from(selects).map(select => {\n      if (select.classList.contains('ql-align')) {\n        if (select.querySelector('option') == null) {\n          fillSelect(select, ALIGNS);\n        }\n\n        return new _ui_icon_picker__WEBPACK_IMPORTED_MODULE_4__[\"default\"](select, icons.align);\n      }\n\n      if (select.classList.contains('ql-background') || select.classList.contains('ql-color')) {\n        const format = select.classList.contains('ql-background') ? 'background' : 'color';\n\n        if (select.querySelector('option') == null) {\n          fillSelect(select, COLORS, format === 'background' ? '#ffffff' : '#000000');\n        }\n\n        return new _ui_color_picker__WEBPACK_IMPORTED_MODULE_3__[\"default\"](select, icons[format]);\n      }\n\n      if (select.querySelector('option') == null) {\n        if (select.classList.contains('ql-font')) {\n          fillSelect(select, FONTS);\n        } else if (select.classList.contains('ql-header')) {\n          fillSelect(select, HEADERS);\n        } else if (select.classList.contains('ql-size')) {\n          fillSelect(select, SIZES);\n        }\n      }\n\n      return new _ui_picker__WEBPACK_IMPORTED_MODULE_5__[\"default\"](select);\n    });\n\n    const update = () => {\n      this.pickers.forEach(picker => {\n        picker.update();\n      });\n    };\n\n    this.quill.on(_core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.EDITOR_CHANGE, update);\n  }\n\n}\n\nBaseTheme.DEFAULTS = extend__WEBPACK_IMPORTED_MODULE_0___default()(true, {}, _core_theme__WEBPACK_IMPORTED_MODULE_2__[\"default\"].DEFAULTS, {\n  modules: {\n    toolbar: {\n      handlers: {\n        formula() {\n          this.quill.theme.tooltip.edit('formula');\n        },\n\n        image() {\n          let fileInput = this.container.querySelector('input.ql-image[type=file]');\n\n          if (fileInput == null) {\n            fileInput = document.createElement('input');\n            fileInput.setAttribute('type', 'file');\n            fileInput.setAttribute('accept', this.quill.uploader.options.mimetypes.join(', '));\n            fileInput.classList.add('ql-image');\n            fileInput.addEventListener('change', () => {\n              const range = this.quill.getSelection(true);\n              this.quill.uploader.upload(range, fileInput.files);\n              fileInput.value = '';\n            });\n            this.container.appendChild(fileInput);\n          }\n\n          fileInput.click();\n        },\n\n        video() {\n          this.quill.theme.tooltip.edit('video');\n        }\n\n      }\n    }\n  }\n});\n\nclass BaseTooltip extends _ui_tooltip__WEBPACK_IMPORTED_MODULE_6__[\"default\"] {\n  constructor(quill, boundsContainer) {\n    super(quill, boundsContainer);\n    this.textbox = this.root.querySelector('input[type=\"text\"]');\n    this.listen();\n  }\n\n  listen() {\n    this.textbox.addEventListener('keydown', event => {\n      if (event.key === 'Enter') {\n        this.save();\n        event.preventDefault();\n      } else if (event.key === 'Escape') {\n        this.cancel();\n        event.preventDefault();\n      }\n    });\n  }\n\n  cancel() {\n    this.hide();\n  }\n\n  edit(mode = 'link', preview = null) {\n    this.root.classList.remove('ql-hidden');\n    this.root.classList.add('ql-editing');\n\n    if (preview != null) {\n      this.textbox.value = preview;\n    } else if (mode !== this.root.getAttribute('data-mode')) {\n      this.textbox.value = '';\n    }\n\n    this.position(this.quill.getBounds(this.quill.selection.savedRange));\n    this.textbox.select();\n    this.textbox.setAttribute('placeholder', this.textbox.getAttribute(\"data-\".concat(mode)) || '');\n    this.root.setAttribute('data-mode', mode);\n  }\n\n  restoreFocus() {\n    const {\n      scrollTop\n    } = this.quill.scrollingContainer;\n    this.quill.focus();\n    this.quill.scrollingContainer.scrollTop = scrollTop;\n  }\n\n  save() {\n    let {\n      value\n    } = this.textbox;\n\n    switch (this.root.getAttribute('data-mode')) {\n      case 'link':\n        {\n          const {\n            scrollTop\n          } = this.quill.root;\n\n          if (this.linkRange) {\n            this.quill.formatText(this.linkRange, 'link', value, _core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n            delete this.linkRange;\n          } else {\n            this.restoreFocus();\n            this.quill.format('link', value, _core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n          }\n\n          this.quill.root.scrollTop = scrollTop;\n          break;\n        }\n\n      case 'video':\n        {\n          value = extractVideoUrl(value);\n        }\n      // eslint-disable-next-line no-fallthrough\n\n      case 'formula':\n        {\n          if (!value) break;\n          const range = this.quill.getSelection(true);\n\n          if (range != null) {\n            const index = range.index + range.length;\n            this.quill.insertEmbed(index, this.root.getAttribute('data-mode'), value, _core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n\n            if (this.root.getAttribute('data-mode') === 'formula') {\n              this.quill.insertText(index + 1, ' ', _core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n            }\n\n            this.quill.setSelection(index + 2, _core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n          }\n\n          break;\n        }\n\n      default:\n    }\n\n    this.textbox.value = '';\n    this.hide();\n  }\n\n}\n\nfunction extractVideoUrl(url) {\n  let match = url.match(/^(?:(https?):\\/\\/)?(?:(?:www|m)\\.)?youtube\\.com\\/watch.*v=([a-zA-Z0-9_-]+)/) || url.match(/^(?:(https?):\\/\\/)?(?:(?:www|m)\\.)?youtu\\.be\\/([a-zA-Z0-9_-]+)/);\n\n  if (match) {\n    return \"\".concat(match[1] || 'https', \"://www.youtube.com/embed/\").concat(match[2], \"?showinfo=0\");\n  } // eslint-disable-next-line no-cond-assign\n\n\n  if (match = url.match(/^(?:(https?):\\/\\/)?(?:www\\.)?vimeo\\.com\\/(\\d+)/)) {\n    return \"\".concat(match[1] || 'https', \"://player.vimeo.com/video/\").concat(match[2], \"/\");\n  }\n\n  return url;\n}\n\nfunction fillSelect(select, values, defaultValue = false) {\n  values.forEach(value => {\n    const option = document.createElement('option');\n\n    if (value === defaultValue) {\n      option.setAttribute('selected', 'selected');\n    } else {\n      option.setAttribute('value', value);\n    }\n\n    select.appendChild(option);\n  });\n}\n\n\n\n//# sourceURL=webpack://Quill/./themes/base.js?");

	/***/ }),

	/***/ "./themes/bubble.js":
	/*!**************************!*\
	  !*** ./themes/bubble.js ***!
	  \**************************/
	/*! exports provided: BubbleTooltip, default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BubbleTooltip\", function() { return BubbleTooltip; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BubbleTheme; });\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! extend */ \"./node_modules/extend/index.js\");\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(extend__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/emitter */ \"./core/emitter.js\");\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base */ \"./themes/base.js\");\n/* harmony import */ var _core_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/selection */ \"./core/selection.js\");\n/* harmony import */ var _ui_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui/icons */ \"./ui/icons.js\");\n\n\n\n\n\nconst TOOLBAR_CONFIG = [['bold', 'italic', 'link'], [{\n  header: 1\n}, {\n  header: 2\n}, 'blockquote']];\n\nclass BubbleTooltip extends _base__WEBPACK_IMPORTED_MODULE_2__[\"BaseTooltip\"] {\n  constructor(quill, bounds) {\n    super(quill, bounds);\n    this.quill.on(_core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.EDITOR_CHANGE, (type, range, oldRange, source) => {\n      if (type !== _core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.SELECTION_CHANGE) return;\n\n      if (range != null && range.length > 0 && source === _core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER) {\n        this.show(); // Lock our width so we will expand beyond our offsetParent boundaries\n\n        this.root.style.left = '0px';\n        this.root.style.width = '';\n        this.root.style.width = \"\".concat(this.root.offsetWidth, \"px\");\n        const lines = this.quill.getLines(range.index, range.length);\n\n        if (lines.length === 1) {\n          this.position(this.quill.getBounds(range));\n        } else {\n          const lastLine = lines[lines.length - 1];\n          const index = this.quill.getIndex(lastLine);\n          const length = Math.min(lastLine.length() - 1, range.index + range.length - index);\n          const indexBounds = this.quill.getBounds(new _core_selection__WEBPACK_IMPORTED_MODULE_3__[\"Range\"](index, length));\n          this.position(indexBounds);\n        }\n      } else if (document.activeElement !== this.textbox && this.quill.hasFocus()) {\n        this.hide();\n      }\n    });\n  }\n\n  listen() {\n    super.listen();\n    this.root.querySelector('.ql-close').addEventListener('click', () => {\n      this.root.classList.remove('ql-editing');\n    });\n    this.quill.on(_core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.SCROLL_OPTIMIZE, () => {\n      // Let selection be restored by toolbar handlers before repositioning\n      setTimeout(() => {\n        if (this.root.classList.contains('ql-hidden')) return;\n        const range = this.quill.getSelection();\n\n        if (range != null) {\n          this.position(this.quill.getBounds(range));\n        }\n      }, 1);\n    });\n  }\n\n  cancel() {\n    this.show();\n  }\n\n  position(reference) {\n    const shift = super.position(reference);\n    const arrow = this.root.querySelector('.ql-tooltip-arrow');\n    arrow.style.marginLeft = '';\n\n    if (shift !== 0) {\n      arrow.style.marginLeft = \"\".concat(-1 * shift - arrow.offsetWidth / 2, \"px\");\n    }\n\n    return shift;\n  }\n\n}\n\nBubbleTooltip.TEMPLATE = ['<span class=\"ql-tooltip-arrow\"></span>', '<div class=\"ql-tooltip-editor\">', '<input type=\"text\" data-formula=\"e=mc^2\" data-link=\"https://quilljs.com\" data-video=\"Embed URL\">', '<a class=\"ql-close\"></a>', '</div>'].join('');\n\nclass BubbleTheme extends _base__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\n  constructor(quill, options) {\n    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {\n      options.modules.toolbar.container = TOOLBAR_CONFIG;\n    }\n\n    super(quill, options);\n    this.quill.container.classList.add('ql-bubble');\n  }\n\n  extendToolbar(toolbar) {\n    this.tooltip = new BubbleTooltip(this.quill, this.options.bounds);\n    this.tooltip.root.appendChild(toolbar.container);\n    this.buildButtons(toolbar.container.querySelectorAll('button'), _ui_icons__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n    this.buildPickers(toolbar.container.querySelectorAll('select'), _ui_icons__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\n  }\n\n}\n\nBubbleTheme.DEFAULTS = extend__WEBPACK_IMPORTED_MODULE_0___default()(true, {}, _base__WEBPACK_IMPORTED_MODULE_2__[\"default\"].DEFAULTS, {\n  modules: {\n    toolbar: {\n      handlers: {\n        link(value) {\n          if (!value) {\n            this.quill.format('link', false);\n          } else {\n            this.quill.theme.tooltip.edit();\n          }\n        }\n\n      }\n    }\n  }\n});\n\n\n//# sourceURL=webpack://Quill/./themes/bubble.js?");

	/***/ }),

	/***/ "./themes/snow.js":
	/*!************************!*\
	  !*** ./themes/snow.js ***!
	  \************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! extend */ \"./node_modules/extend/index.js\");\n/* harmony import */ var extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(extend__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _core_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/emitter */ \"./core/emitter.js\");\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base */ \"./themes/base.js\");\n/* harmony import */ var _formats_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../formats/link */ \"./formats/link.js\");\n/* harmony import */ var _core_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/selection */ \"./core/selection.js\");\n/* harmony import */ var _ui_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ui/icons */ \"./ui/icons.js\");\n\n\n\n\n\n\nconst TOOLBAR_CONFIG = [[{\n  header: ['1', '2', '3', false]\n}], ['bold', 'italic', 'underline', 'link'], [{\n  list: 'ordered'\n}, {\n  list: 'bullet'\n}], ['clean']];\n\nclass SnowTooltip extends _base__WEBPACK_IMPORTED_MODULE_2__[\"BaseTooltip\"] {\n  constructor(quill, bounds) {\n    super(quill, bounds);\n    this.preview = this.root.querySelector('a.ql-preview');\n  }\n\n  listen() {\n    super.listen();\n    this.root.querySelector('a.ql-action').addEventListener('click', event => {\n      if (this.root.classList.contains('ql-editing')) {\n        this.save();\n      } else {\n        this.edit('link', this.preview.textContent);\n      }\n\n      event.preventDefault();\n    });\n    this.root.querySelector('a.ql-remove').addEventListener('click', event => {\n      if (this.linkRange != null) {\n        const range = this.linkRange;\n        this.restoreFocus();\n        this.quill.formatText(range, 'link', false, _core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER);\n        delete this.linkRange;\n      }\n\n      event.preventDefault();\n      this.hide();\n    });\n    this.quill.on(_core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].events.SELECTION_CHANGE, (range, oldRange, source) => {\n      if (range == null) return;\n\n      if (range.length === 0 && source === _core_emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sources.USER) {\n        const [link, offset] = this.quill.scroll.descendant(_formats_link__WEBPACK_IMPORTED_MODULE_3__[\"default\"], range.index);\n\n        if (link != null) {\n          this.linkRange = new _core_selection__WEBPACK_IMPORTED_MODULE_4__[\"Range\"](range.index - offset, link.length());\n          const preview = _formats_link__WEBPACK_IMPORTED_MODULE_3__[\"default\"].formats(link.domNode);\n          this.preview.textContent = preview;\n          this.preview.setAttribute('href', preview);\n          this.show();\n          this.position(this.quill.getBounds(this.linkRange));\n          return;\n        }\n      } else {\n        delete this.linkRange;\n      }\n\n      this.hide();\n    });\n  }\n\n  show() {\n    super.show();\n    this.root.removeAttribute('data-mode');\n  }\n\n}\n\nSnowTooltip.TEMPLATE = ['<a class=\"ql-preview\" rel=\"noopener noreferrer\" target=\"_blank\" href=\"about:blank\"></a>', '<input type=\"text\" data-formula=\"e=mc^2\" data-link=\"https://quilljs.com\" data-video=\"Embed URL\">', '<a class=\"ql-action\"></a>', '<a class=\"ql-remove\"></a>'].join('');\n\nclass SnowTheme extends _base__WEBPACK_IMPORTED_MODULE_2__[\"default\"] {\n  constructor(quill, options) {\n    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {\n      options.modules.toolbar.container = TOOLBAR_CONFIG;\n    }\n\n    super(quill, options);\n    this.quill.container.classList.add('ql-snow');\n  }\n\n  extendToolbar(toolbar) {\n    toolbar.container.classList.add('ql-snow');\n    this.buildButtons(toolbar.container.querySelectorAll('button'), _ui_icons__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n    this.buildPickers(toolbar.container.querySelectorAll('select'), _ui_icons__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n    this.tooltip = new SnowTooltip(this.quill, this.options.bounds);\n\n    if (toolbar.container.querySelector('.ql-link')) {\n      this.quill.keyboard.addBinding({\n        key: 'k',\n        shortKey: true\n      }, (range, context) => {\n        toolbar.handlers.link.call(toolbar, !context.format.link);\n      });\n    }\n  }\n\n}\n\nSnowTheme.DEFAULTS = extend__WEBPACK_IMPORTED_MODULE_0___default()(true, {}, _base__WEBPACK_IMPORTED_MODULE_2__[\"default\"].DEFAULTS, {\n  modules: {\n    toolbar: {\n      handlers: {\n        link(value) {\n          if (value) {\n            const range = this.quill.getSelection();\n            if (range == null || range.length === 0) return;\n            let preview = this.quill.getText(range);\n\n            if (/^\\S+@\\S+\\.\\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {\n              preview = \"mailto:\".concat(preview);\n            }\n\n            const {\n              tooltip\n            } = this.quill.theme;\n            tooltip.edit('link', preview);\n          } else {\n            this.quill.format('link', false);\n          }\n        }\n\n      }\n    }\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (SnowTheme);\n\n//# sourceURL=webpack://Quill/./themes/snow.js?");

	/***/ }),

	/***/ "./ui/color-picker.js":
	/*!****************************!*\
	  !*** ./ui/color-picker.js ***!
	  \****************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _picker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./picker */ \"./ui/picker.js\");\n\n\nclass ColorPicker extends _picker__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(select, label) {\n    super(select);\n    this.label.innerHTML = label;\n    this.container.classList.add('ql-color-picker');\n    Array.from(this.container.querySelectorAll('.ql-picker-item')).slice(0, 7).forEach(item => {\n      item.classList.add('ql-primary');\n    });\n  }\n\n  buildItem(option) {\n    const item = super.buildItem(option);\n    item.style.backgroundColor = option.getAttribute('value') || '';\n    return item;\n  }\n\n  selectItem(item, trigger) {\n    super.selectItem(item, trigger);\n    const colorLabel = this.label.querySelector('.ql-color-label');\n    const value = item ? item.getAttribute('data-value') || '' : '';\n\n    if (colorLabel) {\n      if (colorLabel.tagName === 'line') {\n        colorLabel.style.stroke = value;\n      } else {\n        colorLabel.style.fill = value;\n      }\n    }\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ColorPicker);\n\n//# sourceURL=webpack://Quill/./ui/color-picker.js?");

	/***/ }),

	/***/ "./ui/icon-picker.js":
	/*!***************************!*\
	  !*** ./ui/icon-picker.js ***!
	  \***************************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _picker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./picker */ \"./ui/picker.js\");\n\n\nclass IconPicker extends _picker__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(select, icons) {\n    super(select);\n    this.container.classList.add('ql-icon-picker');\n    Array.from(this.container.querySelectorAll('.ql-picker-item')).forEach(item => {\n      item.innerHTML = icons[item.getAttribute('data-value') || ''];\n    });\n    this.defaultItem = this.container.querySelector('.ql-selected');\n    this.selectItem(this.defaultItem);\n  }\n\n  selectItem(target, trigger) {\n    super.selectItem(target, trigger);\n    const item = target || this.defaultItem;\n    if (this.label.innerHTML === item.innerHTML) return;\n    this.label.innerHTML = item.innerHTML;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (IconPicker);\n\n//# sourceURL=webpack://Quill/./ui/icon-picker.js?");

	/***/ }),

	/***/ "./ui/icons.js":
	/*!*********************!*\
	  !*** ./ui/icons.js ***!
	  \*********************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_icons_align_left_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/icons/align-left.svg */ \"./assets/icons/align-left.svg\");\n/* harmony import */ var _assets_icons_align_left_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_align_left_svg__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_icons_align_center_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/icons/align-center.svg */ \"./assets/icons/align-center.svg\");\n/* harmony import */ var _assets_icons_align_center_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_align_center_svg__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_icons_align_right_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/icons/align-right.svg */ \"./assets/icons/align-right.svg\");\n/* harmony import */ var _assets_icons_align_right_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_align_right_svg__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _assets_icons_align_justify_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/icons/align-justify.svg */ \"./assets/icons/align-justify.svg\");\n/* harmony import */ var _assets_icons_align_justify_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_align_justify_svg__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _assets_icons_background_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/icons/background.svg */ \"./assets/icons/background.svg\");\n/* harmony import */ var _assets_icons_background_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_background_svg__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _assets_icons_blockquote_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/icons/blockquote.svg */ \"./assets/icons/blockquote.svg\");\n/* harmony import */ var _assets_icons_blockquote_svg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_blockquote_svg__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _assets_icons_bold_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/icons/bold.svg */ \"./assets/icons/bold.svg\");\n/* harmony import */ var _assets_icons_bold_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_bold_svg__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _assets_icons_clean_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/icons/clean.svg */ \"./assets/icons/clean.svg\");\n/* harmony import */ var _assets_icons_clean_svg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_clean_svg__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _assets_icons_code_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/icons/code.svg */ \"./assets/icons/code.svg\");\n/* harmony import */ var _assets_icons_code_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_code_svg__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _assets_icons_color_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../assets/icons/color.svg */ \"./assets/icons/color.svg\");\n/* harmony import */ var _assets_icons_color_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_color_svg__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _assets_icons_direction_ltr_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../assets/icons/direction-ltr.svg */ \"./assets/icons/direction-ltr.svg\");\n/* harmony import */ var _assets_icons_direction_ltr_svg__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_direction_ltr_svg__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _assets_icons_direction_rtl_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../assets/icons/direction-rtl.svg */ \"./assets/icons/direction-rtl.svg\");\n/* harmony import */ var _assets_icons_direction_rtl_svg__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_direction_rtl_svg__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _assets_icons_formula_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../assets/icons/formula.svg */ \"./assets/icons/formula.svg\");\n/* harmony import */ var _assets_icons_formula_svg__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_formula_svg__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _assets_icons_header_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../assets/icons/header.svg */ \"./assets/icons/header.svg\");\n/* harmony import */ var _assets_icons_header_svg__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_header_svg__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _assets_icons_header_2_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../assets/icons/header-2.svg */ \"./assets/icons/header-2.svg\");\n/* harmony import */ var _assets_icons_header_2_svg__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_header_2_svg__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _assets_icons_italic_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../assets/icons/italic.svg */ \"./assets/icons/italic.svg\");\n/* harmony import */ var _assets_icons_italic_svg__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_italic_svg__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _assets_icons_image_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../assets/icons/image.svg */ \"./assets/icons/image.svg\");\n/* harmony import */ var _assets_icons_image_svg__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_image_svg__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _assets_icons_indent_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../assets/icons/indent.svg */ \"./assets/icons/indent.svg\");\n/* harmony import */ var _assets_icons_indent_svg__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_indent_svg__WEBPACK_IMPORTED_MODULE_17__);\n/* harmony import */ var _assets_icons_outdent_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../assets/icons/outdent.svg */ \"./assets/icons/outdent.svg\");\n/* harmony import */ var _assets_icons_outdent_svg__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_outdent_svg__WEBPACK_IMPORTED_MODULE_18__);\n/* harmony import */ var _assets_icons_link_svg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../assets/icons/link.svg */ \"./assets/icons/link.svg\");\n/* harmony import */ var _assets_icons_link_svg__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_link_svg__WEBPACK_IMPORTED_MODULE_19__);\n/* harmony import */ var _assets_icons_list_bullet_svg__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../assets/icons/list-bullet.svg */ \"./assets/icons/list-bullet.svg\");\n/* harmony import */ var _assets_icons_list_bullet_svg__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_list_bullet_svg__WEBPACK_IMPORTED_MODULE_20__);\n/* harmony import */ var _assets_icons_list_check_svg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../assets/icons/list-check.svg */ \"./assets/icons/list-check.svg\");\n/* harmony import */ var _assets_icons_list_check_svg__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_list_check_svg__WEBPACK_IMPORTED_MODULE_21__);\n/* harmony import */ var _assets_icons_list_ordered_svg__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../assets/icons/list-ordered.svg */ \"./assets/icons/list-ordered.svg\");\n/* harmony import */ var _assets_icons_list_ordered_svg__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_list_ordered_svg__WEBPACK_IMPORTED_MODULE_22__);\n/* harmony import */ var _assets_icons_subscript_svg__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../assets/icons/subscript.svg */ \"./assets/icons/subscript.svg\");\n/* harmony import */ var _assets_icons_subscript_svg__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_subscript_svg__WEBPACK_IMPORTED_MODULE_23__);\n/* harmony import */ var _assets_icons_superscript_svg__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../assets/icons/superscript.svg */ \"./assets/icons/superscript.svg\");\n/* harmony import */ var _assets_icons_superscript_svg__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_superscript_svg__WEBPACK_IMPORTED_MODULE_24__);\n/* harmony import */ var _assets_icons_strike_svg__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../assets/icons/strike.svg */ \"./assets/icons/strike.svg\");\n/* harmony import */ var _assets_icons_strike_svg__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_strike_svg__WEBPACK_IMPORTED_MODULE_25__);\n/* harmony import */ var _assets_icons_table_svg__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../assets/icons/table.svg */ \"./assets/icons/table.svg\");\n/* harmony import */ var _assets_icons_table_svg__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_table_svg__WEBPACK_IMPORTED_MODULE_26__);\n/* harmony import */ var _assets_icons_underline_svg__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../assets/icons/underline.svg */ \"./assets/icons/underline.svg\");\n/* harmony import */ var _assets_icons_underline_svg__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_underline_svg__WEBPACK_IMPORTED_MODULE_27__);\n/* harmony import */ var _assets_icons_video_svg__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../assets/icons/video.svg */ \"./assets/icons/video.svg\");\n/* harmony import */ var _assets_icons_video_svg__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_video_svg__WEBPACK_IMPORTED_MODULE_28__);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  align: {\n    '': _assets_icons_align_left_svg__WEBPACK_IMPORTED_MODULE_0___default.a,\n    center: _assets_icons_align_center_svg__WEBPACK_IMPORTED_MODULE_1___default.a,\n    right: _assets_icons_align_right_svg__WEBPACK_IMPORTED_MODULE_2___default.a,\n    justify: _assets_icons_align_justify_svg__WEBPACK_IMPORTED_MODULE_3___default.a\n  },\n  background: _assets_icons_background_svg__WEBPACK_IMPORTED_MODULE_4___default.a,\n  blockquote: _assets_icons_blockquote_svg__WEBPACK_IMPORTED_MODULE_5___default.a,\n  bold: _assets_icons_bold_svg__WEBPACK_IMPORTED_MODULE_6___default.a,\n  clean: _assets_icons_clean_svg__WEBPACK_IMPORTED_MODULE_7___default.a,\n  code: _assets_icons_code_svg__WEBPACK_IMPORTED_MODULE_8___default.a,\n  'code-block': _assets_icons_code_svg__WEBPACK_IMPORTED_MODULE_8___default.a,\n  color: _assets_icons_color_svg__WEBPACK_IMPORTED_MODULE_9___default.a,\n  direction: {\n    '': _assets_icons_direction_ltr_svg__WEBPACK_IMPORTED_MODULE_10___default.a,\n    rtl: _assets_icons_direction_rtl_svg__WEBPACK_IMPORTED_MODULE_11___default.a\n  },\n  formula: _assets_icons_formula_svg__WEBPACK_IMPORTED_MODULE_12___default.a,\n  header: {\n    '1': _assets_icons_header_svg__WEBPACK_IMPORTED_MODULE_13___default.a,\n    '2': _assets_icons_header_2_svg__WEBPACK_IMPORTED_MODULE_14___default.a\n  },\n  italic: _assets_icons_italic_svg__WEBPACK_IMPORTED_MODULE_15___default.a,\n  image: _assets_icons_image_svg__WEBPACK_IMPORTED_MODULE_16___default.a,\n  indent: {\n    '+1': _assets_icons_indent_svg__WEBPACK_IMPORTED_MODULE_17___default.a,\n    '-1': _assets_icons_outdent_svg__WEBPACK_IMPORTED_MODULE_18___default.a\n  },\n  link: _assets_icons_link_svg__WEBPACK_IMPORTED_MODULE_19___default.a,\n  list: {\n    bullet: _assets_icons_list_bullet_svg__WEBPACK_IMPORTED_MODULE_20___default.a,\n    check: _assets_icons_list_check_svg__WEBPACK_IMPORTED_MODULE_21___default.a,\n    ordered: _assets_icons_list_ordered_svg__WEBPACK_IMPORTED_MODULE_22___default.a\n  },\n  script: {\n    sub: _assets_icons_subscript_svg__WEBPACK_IMPORTED_MODULE_23___default.a,\n    super: _assets_icons_superscript_svg__WEBPACK_IMPORTED_MODULE_24___default.a\n  },\n  strike: _assets_icons_strike_svg__WEBPACK_IMPORTED_MODULE_25___default.a,\n  table: _assets_icons_table_svg__WEBPACK_IMPORTED_MODULE_26___default.a,\n  underline: _assets_icons_underline_svg__WEBPACK_IMPORTED_MODULE_27___default.a,\n  video: _assets_icons_video_svg__WEBPACK_IMPORTED_MODULE_28___default.a\n});\n\n//# sourceURL=webpack://Quill/./ui/icons.js?");

	/***/ }),

	/***/ "./ui/picker.js":
	/*!**********************!*\
	  !*** ./ui/picker.js ***!
	  \**********************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_icons_dropdown_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/icons/dropdown.svg */ \"./assets/icons/dropdown.svg\");\n/* harmony import */ var _assets_icons_dropdown_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_icons_dropdown_svg__WEBPACK_IMPORTED_MODULE_0__);\n\nlet optionsCounter = 0;\n\nfunction toggleAriaAttribute(element, attribute) {\n  element.setAttribute(attribute, !(element.getAttribute(attribute) === 'true'));\n}\n\nclass Picker {\n  constructor(select) {\n    this.select = select;\n    this.container = document.createElement('span');\n    this.buildPicker();\n    this.select.style.display = 'none';\n    this.select.parentNode.insertBefore(this.container, this.select);\n    this.label.addEventListener('mousedown', () => {\n      this.togglePicker();\n    });\n    this.label.addEventListener('keydown', event => {\n      switch (event.key) {\n        case 'Enter':\n          this.togglePicker();\n          break;\n\n        case 'Escape':\n          this.escape();\n          event.preventDefault();\n          break;\n\n        default:\n      }\n    });\n    this.select.addEventListener('change', this.update.bind(this));\n  }\n\n  togglePicker() {\n    this.container.classList.toggle('ql-expanded'); // Toggle aria-expanded and aria-hidden to make the picker accessible\n\n    toggleAriaAttribute(this.label, 'aria-expanded');\n    toggleAriaAttribute(this.options, 'aria-hidden');\n  }\n\n  buildItem(option) {\n    const item = document.createElement('span');\n    item.tabIndex = '0';\n    item.setAttribute('role', 'button');\n    item.classList.add('ql-picker-item');\n\n    if (option.hasAttribute('value')) {\n      item.setAttribute('data-value', option.getAttribute('value'));\n    }\n\n    if (option.textContent) {\n      item.setAttribute('data-label', option.textContent);\n    }\n\n    item.addEventListener('click', () => {\n      this.selectItem(item, true);\n    });\n    item.addEventListener('keydown', event => {\n      switch (event.key) {\n        case 'Enter':\n          this.selectItem(item, true);\n          event.preventDefault();\n          break;\n\n        case 'Escape':\n          this.escape();\n          event.preventDefault();\n          break;\n\n        default:\n      }\n    });\n    return item;\n  }\n\n  buildLabel() {\n    const label = document.createElement('span');\n    label.classList.add('ql-picker-label');\n    label.innerHTML = _assets_icons_dropdown_svg__WEBPACK_IMPORTED_MODULE_0___default.a;\n    label.tabIndex = '0';\n    label.setAttribute('role', 'button');\n    label.setAttribute('aria-expanded', 'false');\n    this.container.appendChild(label);\n    return label;\n  }\n\n  buildOptions() {\n    const options = document.createElement('span');\n    options.classList.add('ql-picker-options'); // Don't want screen readers to read this until options are visible\n\n    options.setAttribute('aria-hidden', 'true');\n    options.tabIndex = '-1'; // Need a unique id for aria-controls\n\n    options.id = \"ql-picker-options-\".concat(optionsCounter);\n    optionsCounter += 1;\n    this.label.setAttribute('aria-controls', options.id);\n    this.options = options;\n    Array.from(this.select.options).forEach(option => {\n      const item = this.buildItem(option);\n      options.appendChild(item);\n\n      if (option.selected === true) {\n        this.selectItem(item);\n      }\n    });\n    this.container.appendChild(options);\n  }\n\n  buildPicker() {\n    Array.from(this.select.attributes).forEach(item => {\n      this.container.setAttribute(item.name, item.value);\n    });\n    this.container.classList.add('ql-picker');\n    this.label = this.buildLabel();\n    this.buildOptions();\n  }\n\n  escape() {\n    // Close menu and return focus to trigger label\n    this.close(); // Need setTimeout for accessibility to ensure that the browser executes\n    // focus on the next process thread and after any DOM content changes\n\n    setTimeout(() => this.label.focus(), 1);\n  }\n\n  close() {\n    this.container.classList.remove('ql-expanded');\n    this.label.setAttribute('aria-expanded', 'false');\n    this.options.setAttribute('aria-hidden', 'true');\n  }\n\n  selectItem(item, trigger = false) {\n    const selected = this.container.querySelector('.ql-selected');\n    if (item === selected) return;\n\n    if (selected != null) {\n      selected.classList.remove('ql-selected');\n    }\n\n    if (item == null) return;\n    item.classList.add('ql-selected');\n    this.select.selectedIndex = Array.from(item.parentNode.children).indexOf(item);\n\n    if (item.hasAttribute('data-value')) {\n      this.label.setAttribute('data-value', item.getAttribute('data-value'));\n    } else {\n      this.label.removeAttribute('data-value');\n    }\n\n    if (item.hasAttribute('data-label')) {\n      this.label.setAttribute('data-label', item.getAttribute('data-label'));\n    } else {\n      this.label.removeAttribute('data-label');\n    }\n\n    if (trigger) {\n      this.select.dispatchEvent(new Event('change'));\n      this.close();\n    }\n  }\n\n  update() {\n    let option;\n\n    if (this.select.selectedIndex > -1) {\n      const item = this.container.querySelector('.ql-picker-options').children[this.select.selectedIndex];\n      option = this.select.options[this.select.selectedIndex];\n      this.selectItem(item);\n    } else {\n      this.selectItem(null);\n    }\n\n    const isActive = option != null && option !== this.select.querySelector('option[selected]');\n    this.label.classList.toggle('ql-active', isActive);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Picker);\n\n//# sourceURL=webpack://Quill/./ui/picker.js?");

	/***/ }),

	/***/ "./ui/tooltip.js":
	/*!***********************!*\
	  !*** ./ui/tooltip.js ***!
	  \***********************/
	/*! exports provided: default */
	/***/ (function(module, __webpack_exports__, __webpack_require__) {
	eval("__webpack_require__.r(__webpack_exports__);\nclass Tooltip {\n  constructor(quill, boundsContainer) {\n    this.quill = quill;\n    this.boundsContainer = boundsContainer || document.body;\n    this.root = quill.addContainer('ql-tooltip');\n    this.root.innerHTML = this.constructor.TEMPLATE;\n\n    if (this.quill.root === this.quill.scrollingContainer) {\n      this.quill.root.addEventListener('scroll', () => {\n        this.root.style.marginTop = \"\".concat(-1 * this.quill.root.scrollTop, \"px\");\n      });\n    }\n\n    this.hide();\n  }\n\n  hide() {\n    this.root.classList.add('ql-hidden');\n  }\n\n  position(reference) {\n    const left = reference.left + reference.width / 2 - this.root.offsetWidth / 2; // root.scrollTop should be 0 if scrollContainer !== root\n\n    const top = reference.bottom + this.quill.root.scrollTop;\n    this.root.style.left = \"\".concat(left, \"px\");\n    this.root.style.top = \"\".concat(top, \"px\");\n    this.root.classList.remove('ql-flip');\n    const containerBounds = this.boundsContainer.getBoundingClientRect();\n    const rootBounds = this.root.getBoundingClientRect();\n    let shift = 0;\n\n    if (rootBounds.right > containerBounds.right) {\n      shift = containerBounds.right - rootBounds.right;\n      this.root.style.left = \"\".concat(left + shift, \"px\");\n    }\n\n    if (rootBounds.left < containerBounds.left) {\n      shift = containerBounds.left - rootBounds.left;\n      this.root.style.left = \"\".concat(left + shift, \"px\");\n    }\n\n    if (rootBounds.bottom > containerBounds.bottom) {\n      const height = rootBounds.bottom - rootBounds.top;\n      const verticalShift = reference.bottom - reference.top + height;\n      this.root.style.top = \"\".concat(top - verticalShift, \"px\");\n      this.root.classList.add('ql-flip');\n    }\n\n    return shift;\n  }\n\n  show() {\n    this.root.classList.remove('ql-editing');\n    this.root.classList.remove('ql-hidden');\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tooltip);\n\n//# sourceURL=webpack://Quill/./ui/tooltip.js?");

	/***/ }),

	/***/ 0:
	/*!************************!*\
	  !*** multi ./quill.js ***!
	  \************************/
	/*! no static exports found */
	/***/ (function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__(/*! ./quill.js */\"./quill.js\");\n\n\n//# sourceURL=webpack://Quill/multi_./quill.js?");

	/***/ }),

	/***/ 1:
	/*!********************************!*\
	  !*** ./util.inspect (ignored) ***!
	  \********************************/
	/*! no static exports found */
	/***/ (function(module, exports) {

	eval("/* (ignored) */\n\n//# sourceURL=webpack://Quill/./util.inspect_(ignored)?");

	/***/ })

	/******/ })["default"];
	});
} (quill));

var Quill$1 = /*@__PURE__*/getDefaultExportFromCjs(quill.exports);

var QuillNamespace = /*#__PURE__*/_mergeNamespaces({
    __proto__: null,
    'default': Quill$1
}, [quill.exports]);

const StateToggle = styled.div `
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
    color: #9da9bb;
    //border: 1px solid #E0E4EB;
    border-top: none;
  }

  button.active {
    background-color: #ffffff;
    box-shadow: 0 1px 0 0 white;
    color: #1e2134;
    :hover {
      color: #1e2134;
    }
  }

  button:hover {
    color: #506176;
  }

  @media screen and (max-width: 769px) {
    position: initial;
    button {
      flex-basis: 50%;
      text-align: center;
      background-color: #f6f7fa;
    }
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

const Embed = Quill$1.import("blots/embed");
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
        if ((data === null || data === void 0 ? void 0 : data.isKeyRegistered) === 'true') {
            node.setAttribute("osn-polka-address", data.id);
            node.setAttribute("osn-polka-network", data.chain);
        }
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
Quill$1.register(MentionBlot);

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
                "disabled",
                "chain",
                "isKeyRegistered"
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
            this.quill.deleteText(this.mentionCharPos, this.cursorPos - this.mentionCharPos, Quill$1.sources.USER);
        }
        else {
            insertAtPos = this.cursorPos;
        }
        this.quill.insertEmbed(insertAtPos, this.options.blotName, render, Quill$1.sources.USER);
        if (this.options.spaceAfterInsert) {
            this.quill.insertText(insertAtPos + 1, " ", Quill$1.sources.USER);
            // setSelection here sets cursor position
            this.quill.setSelection(insertAtPos + 2, Quill$1.sources.USER);
        }
        else {
            this.quill.setSelection(insertAtPos + 1, Quill$1.sources.USER);
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
        this.options = defaultsDeep({}, options, DefaultOptions);
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

const PreviewWrapper = styled.div `
  min-height: 200px;
  padding: 10px 16px;
`;

let Quill = QuillNamespace;
if (Quill.default) {
    Quill = Quill.default;
}
Quill.register("modules/mention", Mention);
Quill.register("modules/ImageResize", ImageResize);
const VerticalDivider = styled.div `
  width: 1px;
  height: 40px;
  background-color: #e0e4eb;
`;
const Wrapper$2 = styled.div `
  ${quillStyle};
`;
const icons = Quill.import("ui/icons");
overrideIcons(icons);
function WYSIWYG(props) {
    var _a;
    const [isPreview, setIsPreview] = useState(false);
    const defaultModules = useMemo(() => ({
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
                var _a;
                const suggestions = (_a = props.loadSuggestions("")) !== null && _a !== void 0 ? _a : [];
                const atValues = [];
                suggestions.map(suggestion => {
                    var _a, _b;
                    return atValues.push({
                        id: (suggestion === null || suggestion === void 0 ? void 0 : suggestion.isKeyRegistered) ? suggestion.address : suggestion.value,
                        value: suggestion.preview,
                        isKeyRegistered: (_b = (_a = suggestion === null || suggestion === void 0 ? void 0 : suggestion.isKeyRegistered) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "false",
                        chain: suggestion === null || suggestion === void 0 ? void 0 : suggestion.chain,
                    });
                });
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
    const [editingArea, setEditingArea] = React__default.useState(null);
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
                editor.root.style.height = `${editor.root.scrollHeight}px`;
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
    useEffect(() => {
        if (editingArea) {
            const element = ReactDOM.findDOMNode(editingArea);
            const editor = createEditor(element, getEditorConfig());
            if (props.value) {
                editor.clipboard.dangerouslyPasteHTML(props.value);
            }
        }
    }, [editingArea]);
    return (React__default.createElement(Wrapper$2, { isPreview: isPreview, height: (_a = props.minHeight) !== null && _a !== void 0 ? _a : 200 },
        React__default.createElement(StateToggle, null,
            React__default.createElement("button", { onClick: () => setIsPreview(false), className: isPreview ? "" : "active", style: { borderTopLeftRadius: 3 } }, "Write"),
            React__default.createElement(VerticalDivider, null),
            React__default.createElement("button", { style: { paddingLeft: 11 }, onClick: () => setIsPreview(true), className: isPreview ? "active" : "" }, "Preview"),
            React__default.createElement(VerticalDivider, null)),
        React__default.createElement("div", Object.assign({ style: { display: isPreview ? "none" : "initial" } }, properties)),
        isPreview && (React__default.createElement(PreviewWrapper, null,
            React__default.createElement(HtmlPreviewer, { content: props.value, plugins: [renderMentionIdentityUserPlugin(props.identifier, { targetElement: { tag: "span" } })] })))));
}

const OpenSquare = {
    wrapper: css ``,
    toolbar: css ``,
    tab: css ``,
    tabActive: css ``,
    textarea: css ``,
    preview: css ``
};

const SubSquare = {
    wrapper: css `
    border: none;
    .mention-list {
      font-size: 14px;
      line-height: 20px;
      li {
        padding: 12px 10px;
      }
    }
  `,
    toolbar: css `
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
    @media screen and (max-width: 769px) {
      padding-top: 40px;
      padding-left: 16px;
    }
  `,
    tabs: css `
    position: absolute;
    left: 0;
    top: 0;
  `,
    tab: css `
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
    tabActive: css `
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
    tabMobile: css `
    margin-left: 0;
    margin-right: 0;
  `,
    textarea: css `
    background-color: white;
    border-bottom: none;
  `,
    preview: css `
    background-color: white;
  `
};

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
    const textController = useMemo(() => {
        return new TextAreaTextController(ref);
    }, [ref]);
    const commandController = useMemo(() => new CommandController(textController, options.commandMap), [ref]);
    return {
        textController,
        commandController,
    };
}

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

const EditorWrapper = styled.div `
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #e2e8f0;
  ${props => props.theme.wrapper};
  ${p => p.disabled &&
    css `
      pointer-events: none;
      cursor: not-allowed;
    `}
`;
const ToolBar = styled.div `
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  flex-basis: 100%;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: content-box;
  /* mobile */
  @media screen and (max-width: 769px) {
    display: block;
    padding-left: 0;
    padding-right: 0;
    ${props => props.isPreview &&
    css `
        padding-top: 0 !important;
      `};
  }
  ${props => props.theme.toolbar};
`;
const TabsWrapper = styled.div `
  display: flex;
  gap: 24px;
  height: 48px;
  /* mobile */
  @media screen and (max-width: 769px) {
    border-bottom: 1px solid #e2e8f0;
    width: 100%;
  }
  ${props => props.theme.tabs};
`;
const Tab = styled.button `
  all: unset;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  border-bottom: 3px solid #ffffff;
  ${props => props.theme.tab};
  ${props => props.active &&
    props.theme === "opensquare" &&
    css `
      border-bottom: 3px solid #04d2c5;
    `};
  ${props => props.active &&
    css `
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
    ${props => props.theme.tabMobile};
  }
`;
const ToolbarItemsWrapper = styled.div `
  display: flex;
  align-items: center;
  gap: 8px;
  ${props => props.hide &&
    css `
      display: none;
    `};
  /* mobile */
  @media screen and (max-width: 769px) {
    height: 48px;
  }
`;
const ToolbarButton = styled.button `
  all: unset;
  cursor: pointer;
  width: 24px;
  height: 24px;

  &:hover svg path {
    fill: #1e2134;
  }
`;
const Textarea = styled.textarea `
  box-sizing: border-box;
  width: 100%;
  min-height: 144px;
  ${props => props.minHeight &&
    css `
      min-height: ${props.minHeight}px;
    `};
  ${props => props.height &&
    css `
      height: ${props.height}px;
    `};
  ${props => props.hide &&
    css `
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

function EditorHeader({ theme, editStatus, setEditStatus, isPreview, commandController }) {
    return (React.createElement(ToolBar, { theme: theme, isPreview: isPreview },
        React.createElement(TabsWrapper, { theme: theme },
            React.createElement(Tab, { active: editStatus === "write", onClick: () => setEditStatus("write"), theme: theme, style: { borderTopLeftRadius: 3 } }, "Write"),
            React.createElement(Tab, { active: editStatus === "preview", onClick: () => setEditStatus("preview"), theme: theme }, "Preview")),
        React.createElement(ToolbarItemsWrapper, { hide: isPreview },
            React.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("bold");
                }) },
                React.createElement(Bold, null)),
            React.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("underline");
                }) },
                React.createElement(Underline, null)),
            React.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("delete");
                }) },
                React.createElement(Delete, null)),
            React.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("ul");
                }) },
                React.createElement(Ul, null)),
            React.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("ol");
                }) },
                React.createElement(Ol, null)),
            React.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("link");
                }) },
                React.createElement(Link, null)),
            React.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("image");
                }) },
                React.createElement(Img, null)),
            React.createElement(ToolbarButton, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield commandController.executeCommand("code");
                }) },
                React.createElement(Code, null)))));
}

const SuggestionsWrapper = styled.ul `
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
  border-radius: 4px;
  overflow: hidden;

  li {
    padding: 6px 16px;

    &:hover,
    &[aria-selected="true"] {
      background-color: #f6f7fa;
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
    const left = caret.left - ((_b = (_a = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _a === void 0 ? void 0 : _a.scrollLeft) !== null && _b !== void 0 ? _b : 0) + 20;
    const top = caret.top - ((_d = (_c = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _c === void 0 ? void 0 : _c.scrollTop) !== null && _d !== void 0 ? _d : 0) + 45;
    const style = {};
    style.top = top;
    if (suggestionsAutoplace &&
        left + ((_g = (_f = (_e = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _e === void 0 ? void 0 : _e.getBoundingClientRect()) === null || _f === void 0 ? void 0 : _f.left) !== null && _g !== void 0 ? _g : 0) > vw / 2)
        style.right = ((_j = (_h = textAreaRef === null || textAreaRef === void 0 ? void 0 : textAreaRef.current) === null || _h === void 0 ? void 0 : _h.offsetWidth) !== null && _j !== void 0 ? _j : 0) - left;
    else
        style.left = left;
    return (React.createElement(SuggestionsWrapper, { className: "mention-list", style: style }, suggestions.slice(0, max).map((s, i) => (React.createElement("li", { onClick: handleSuggestionClick, onMouseDown: handleMouseDown, key: i, "aria-selected": focusIndex === i ? "true" : "false", "data-index": `${i}` }, s.preview)))));
};

const Editor = ({ value, onChange, loadSuggestions, minHeight = 144, theme = "opensquare", disabled = false, identifier }) => {
    const themeCSS = theme === "opensquare" ? OpenSquare : SubSquare;
    const ref = useRef(null);
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
    const [caret, setCaret] = useState({ left: 0, top: 0, lineHeight: 20 });
    const [focusIndex, setFocusIndex] = useState(0);
    const [editStatus, setEditStatus] = React.useState("write");
    const [suggestions, setSuggestions] = React.useState([]);
    const [mentionState, setMentionState] = useState({
        status: "inactive",
        suggestions: []
    });
    const isPreview = React.useMemo(() => {
        return editStatus === "preview";
    }, [editStatus]);
    let observer;
    const [height, setHeight] = useState(100);
    const [userResized, setUserResized] = useState(false);
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
    useEffect(() => {
        //expand height if got default value before inputting
        adjustHeight();
    }, []);
    useEffect(() => {
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
    const isEditingText = React.useMemo(() => {
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
            focusToCursor();
        }
    };
    return (React.createElement(EditorWrapper, { theme: themeCSS, disabled: disabled },
        React.createElement(EditorHeader, Object.assign({}, {
            theme: themeCSS,
            editStatus,
            setEditStatus,
            isPreview,
            commandController
        })),
        React.createElement(Textarea, { ref: ref, value: value, onChange: event => {
                onChange(event.target.value);
                adjustHeight();
            }, onKeyUp: event => {
                handleKeyUp(event);
            }, onKeyDown: event => {
                handleKeyDown(event);
                onEnterNewLine(event);
            }, onKeyPress: handleKeyPress, placeholder: "", minHeight: minHeight, height: height, hide: isPreview, theme: themeCSS }),
        isPreview && (React.createElement(PreviewWrapper, null,
            React.createElement(MarkdownPreviewer, Object.assign({ content: value }, (identifier
                ? { plugins: [renderIdentityOrAddressPlugin(identifier)] }
                : {}))))),
        mentionState.status === "active" && suggestions.length > 0 && (React.createElement(SuggestionsDropdown, { caret: caret, suggestions: suggestions, focusIndex: focusIndex < suggestions.length ? focusIndex : 0, textAreaRef: ref, onSuggestionSelected: handleSuggestionSelected, suggestionsAutoplace: true }))));
};

const Wrapper$1 = styled.div `
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
    ? css `
        background: #EBEEF4;
        > div {
          left: auto;
          right: 4px;
        }
      `
    : p.active
        ? css `
        background: #6848ff;
        > div {
          left: auto;
          right: 4px;
        }
      `
        : null}
  ${(p) => p.size === "small" &&
    css `
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
        css `
          background: #6848ff;
          > div {
            left: auto;
            right: 3px;
          }
        `}
    `}
`;
function Toggle({ disabled, isOn, onToggle, size }) {
    return (React__default.createElement(Wrapper$1, { disabled: disabled, active: isOn, onClick: () => onToggle(!isOn), size: size },
        React__default.createElement("div", null)));
}

const MarkdownIcon = () => (React__default.createElement("svg", { width: "26", height: "16", viewBox: "0 0 26 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React__default.createElement("path", { d: "M3.75 12.25V3.75H6.25L8.75 6.875L11.25 3.75H13.75V12.25H11.25V7.375L8.75 10.5L6.25 7.375V12.25H3.75ZM19.375 12.25L15.625 8.125H18.125V3.75H20.625V8.125H23.125L19.375 12.25Z", fill: "#1E2134" }),
    React__default.createElement("rect", { x: "0.625", y: "0.625", width: "24.75", height: "14.75", rx: "1.375", stroke: "#1E2134", strokeWidth: "1.25" })));

const Flex = styled.div `
  display: flex;
  align-items: center;
`;
const Shade = styled.div `
  z-index: 10;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const Wrapper = styled.div `
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
const Title = styled(Flex) `
  padding: 24px 24px 16px 24px;
  justify-content: space-between;
  font-size: 14px;
  font-weight: bold;

  svg {
    cursor: pointer;
  }
`;
const FormWrapper = styled.div `
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
const TextArea = styled.textarea `
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
const SubmitButtonWrapper = styled.div `
  padding-right: 24px;
  display: flex;
  justify-content: end;
`;
const SubmitButton = styled.button `
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
styled.input `
  visibility: hidden;
  position: absolute;
`;
styled.div `
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
const Hint = styled.p `
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
styled.p `
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
    const [source, setSource] = useState("remote");
    const [link, setLink] = useState("");
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
    return (React__default.createElement(Shade, null,
        React__default.createElement(Wrapper, null,
            React__default.createElement(Title, null,
                React__default.createElement("span", null, "Paste URL"),
                React__default.createElement("svg", { onClick: onClose, width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    React__default.createElement("path", { d: "M8.00007 7.0574L12.0072 3.05029L12.9498 3.99296L8.94273 8.00007L12.9498 12.0072L12.0072 12.9498L8.00007 8.94273L3.99296 12.9498L3.05029 12.0072L7.0574 8.00007L3.05029 3.99296L3.99296 3.05029L8.00007 7.0574Z", fill: "#C8CBD0" }))),
            type === "video" && React__default.createElement(Hint, null, "Embedding Youtube video only"),
            React__default.createElement(FormWrapper, null,
                React__default.createElement(TextArea, { value: link, placeholder: `Please fill available ${type} URL...`, onChange: onChange })),
            React__default.createElement(SubmitButtonWrapper, null,
                React__default.createElement(SubmitButton, { onClick: onInset }, "Confirm")))));
}

const ToggleWrapper = styled.div `
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 8px;
  height: 40px;
  border-top: 1px solid #ebeef4;
  padding-right: 16px;
`;
const UniverseEditor = ({ value, onChange, contentType = "markdown", setContentType, loadSuggestions, disabled = false, minHeight = 200, identifier }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("image");
    const [insetQuillContentsFunc, setInsetQuillContentsFunc] = useState(null);
    const onMarkdownSwitch = () => {
        if (value &&
            !confirm(`Togging editor will empty all typed contents, are you sure ?`)) {
            return;
        }
        const newContentType = contentType === "html" ? "markdown" : "html";
        onChange("");
        setContentType(newContentType);
    };
    return (React.createElement("div", { style: {
            maxWidth: 800,
            border: "1px solid #EBEEF4",
            borderRadius: 4
            // overflow: "hidden"
        } },
        contentType === "markdown" ? (React.createElement(Editor, { value: value, onChange: onChange, loadSuggestions: loadSuggestions, minHeight: minHeight, theme: "subsquare", disabled: disabled, identifier: identifier })) : (React.createElement(React.Fragment, null,
            React.createElement(InsertContentsModal, { showModal: showModal, setShowModal: setShowModal, insetQuillContentsFunc: insetQuillContentsFunc, type: modalType }),
            React.createElement(WYSIWYG, { value: value, onChange: onChange, setModalInsetFunc: (insetFunc, type) => {
                    setModalType(type);
                    setShowModal(true);
                    setInsetQuillContentsFunc(insetFunc);
                }, loadSuggestions: loadSuggestions, minHeight: minHeight, identifier: identifier }))),
        React.createElement(ToggleWrapper, null,
            React.createElement(MarkdownIcon, null),
            React.createElement(Toggle, { size: "small", isOn: contentType === "markdown", onToggle: onMarkdownSwitch }))));
};

export { UniverseEditor, WYSIWYG, Editor as default };
//# sourceMappingURL=index.js.map
