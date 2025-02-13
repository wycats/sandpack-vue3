import { HighlightStyle, tags } from '@codemirror/highlight';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import type { LanguageSupport } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import type { Text } from '@codemirror/text';
import { EditorView } from '@codemirror/view';

import { THEME_PREFIX } from '../../styles';
import type { CustomLanguage, SandpackTheme } from '../../types';

export const getCodeMirrorPosition = (
  doc: Text,
  { line, column }: { line: number; column?: number },
): number => doc.line(line).from + (column ?? 0) - 1;

export const getEditorTheme = (): Extension => EditorView.theme({
  '&': {
    backgroundColor: `var(--${THEME_PREFIX}-colors-surface1)`,
    color: `var(--${THEME_PREFIX}-syntax-color-plain)`,
    height: '100%',
  },

  '.cm-matchingBracket, .cm-nonmatchingBracket, &.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket':
      {
        color: 'inherit',
        backgroundColor: 'rgba(128,128,128,.25)',
        backgroundBlendMode: 'difference',
      },

  '&.cm-editor.cm-focused': {
    outline: 'none',
  },

  '.cm-activeLine': {
    backgroundColor: `var(--${THEME_PREFIX}-colors-surface3)`,
    borderRadius: `var(--${THEME_PREFIX}-border-radius)`,
  },

  '.cm-errorLine': {
    backgroundColor: `var(--${THEME_PREFIX}-colors-errorSurface)`,
    borderRadius: `var(--${THEME_PREFIX}-border-radius)`,
  },

  '.cm-content': {
    caretColor: `var(--${THEME_PREFIX}-colors-accent)`,
    padding: `0 var(--${THEME_PREFIX}-space-4)`,
  },

  '.cm-scroller': {
    fontFamily: `var(--${THEME_PREFIX}-font-mono)`,
    lineHeight: `var(--${THEME_PREFIX}-font-lineHeight)`,
  },

  '.cm-gutters': {
    backgroundColor: `var(--${THEME_PREFIX}-colors-surface1)`,
    color: `var(--${THEME_PREFIX}-colors-disabled)`,
    border: 'none',
    paddingLeft: `var(--${THEME_PREFIX}-space-1)`,
  },

  '.cm-gutter.cm-lineNumbers': {
    fontSize: '.6em',
  },

  '.cm-lineNumbers .cm-gutterElement': {
    lineHeight: `var(--${THEME_PREFIX}-font-lineHeight)`,
    minWidth: `var(--${THEME_PREFIX}-space-5)`,
  },

  '.cm-content .cm-line': { paddingLeft: `var(--${THEME_PREFIX}-space-1)` },
  '.cm-content.cm-readonly .cm-line': { paddingLeft: 0 },
});

const classNameToken = (name: string): string => `${THEME_PREFIX}-syntax-${name}`;

export const styleTokens = (): Record<string, string> => {
  const syntaxHighLightTokens: Array<keyof SandpackTheme['syntax']> = [
    'string',
    'plain',
    'comment',
    'keyword',
    'definition',
    'punctuation',
    'property',
    'tag',
    'static',
  ];

  return syntaxHighLightTokens.reduce((acc, token) => ({
    ...acc,
    [`.${classNameToken(token)}`]: {
      color: `$syntax$color$${token}`,
      fontStyle: `$syntax$fontStyle$${token}`,
    },
  }), {});
};

export const getSyntaxHighlight = (theme: SandpackTheme): HighlightStyle => HighlightStyle.define([
  { tag: tags.link, textDecoration: 'underline' },
  { tag: tags.emphasis, fontStyle: 'italic' },
  { tag: tags.strong, fontWeight: 'bold' },

  {
    tag: tags.keyword,
    class: classNameToken('keyword'),
  },
  {
    tag: [tags.atom, tags.number, tags.bool],
    class: classNameToken('static'),
  },
  {
    tag: tags.tagName,
    class: classNameToken('tag'),
  },
  { tag: tags.variableName, class: classNameToken('plain') },
  {
    // Highlight function call
    tag: tags.function(tags.variableName),
    class: classNameToken('definition'),
  },
  {
    // Highlight function definition differently (eg: functional component def in React)
    tag: tags.definition(tags.function(tags.variableName)),
    class: classNameToken('definition'),
  },
  {
    tag: tags.propertyName,
    class: classNameToken('property'),
  },
  {
    tag: [tags.literal, tags.inserted],
    class: classNameToken(theme.syntax.string ? 'string' : 'static'),
  },
  {
    tag: tags.punctuation,
    class: classNameToken('punctuation'),
  },
  {
    tag: [tags.comment, tags.quote],
    class: classNameToken('comment'),
  },
]);

type SandpackLanguageSupport =
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'css';

export const getLanguageFromFile = (
  filePath: string | undefined,
  fileType: string | undefined,
  additionalLanguages: CustomLanguage[],
): string => {
  if (!filePath && !fileType) return 'javascript';

  let extension = fileType;
  if (!extension && filePath) {
    const extensionDotIndex = filePath.lastIndexOf('.');
    extension = filePath.slice(extensionDotIndex + 1);
  }

  for (const additionalLanguage of additionalLanguages) {
    if (
      extension === additionalLanguage.name ||
      additionalLanguage.extensions.includes(extension || '')
    ) {
      return additionalLanguage.name;
    }
  }

  switch (extension) {
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'html':
    case 'svelte':
    case 'vue':
      return 'html';
    case 'css':
    case 'less':
    case 'scss':
      return 'css';
    case 'js':
    case 'jsx':
    case 'json':
    default:
      return 'javascript';
  }
};

export const getCodeMirrorLanguage = (
  extension: string,
  additionalLanguages: CustomLanguage[],
): LanguageSupport => {
  const options: Record<SandpackLanguageSupport, LanguageSupport> = {
    javascript: javascript({ jsx: true, typescript: false }),
    typescript: javascript({ jsx: true, typescript: true }),
    html: html(),
    css: css(),
  };

  for (const additionalLanguage of additionalLanguages) {
    if (extension === additionalLanguage.name) {
      return additionalLanguage.language;
    }
  }

  return options[extension as keyof typeof options];
};
