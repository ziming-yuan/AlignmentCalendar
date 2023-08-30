'use client'

import './styles.scss';
import Heading from '@tiptap/extension-heading'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'

import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import ListItem from '@tiptap/extension-list-item'

import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'

import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import { useCallback } from 'react'

import BoldIcon from '/components/icons/Bold.svg';
import ItalicIcon from '/components/icons/Italic.svg';
import UnderlineIcon from '/components/icons/Underline.svg';
import LinkIcon from '/components/icons/Link.svg';
import UnlinkIcon from '/components/icons/Unlink.svg';
import BulletListIcon from '/components/icons/BulletList.svg';
import NumberedListIcon from '/components/icons/NumberedList.svg';
import LeftIcon from '/components/icons/AlignLeft.svg';
import RightIcon from '/components/icons/AlignRight.svg';
import CenterIcon from '/components/icons/AlignCenter.svg';
import JustifyIcon from '/components/icons/JustifyCenter.svg';

import Select, { components } from 'react-select';

const alignOptions = [
  { value: 'left', label: 'Left', icon: <LeftIcon className='w-4 h-4'/> },
  { value: 'center', label: 'Center', icon: <CenterIcon className='w-4 h-4'/> },
  { value: 'right', label: 'Right', icon: <RightIcon className='w-4 h-4'/> },
  { value: 'justify', label: 'Justify', icon: <JustifyIcon className='w-4 h-4'/> },
];

const alignmentOption = (props) => {
  const { data, label, selectOption } = props;
  return (
    <components.Option {...props}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onClick={() => selectOption(data)}
      >
        <div>{data.icon}</div>
        <div className='ml-2'>{label}</div>
      </div>
    </components.Option>
  );
};

const alignStyles = {
  control: (base) => ({
    ...base,
    width: 115,
  }),
  menu: (base) => ({
    ...base,
    width: 115,
  }),
}

const headingOptions = [
  { value: 1, label: 'Heading 1' },
  { value: 2, label: 'Heading 2' },
  { value: 3, label: 'Heading 3' },
  { value: 4, label: 'Normal' },
];

const headingStyles = {
  control: (base) => ({
    ...base,
    width: 140,
  }),
  menu: (base) => ({
    ...base,
    width: 140,
  }),
}

const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Comic Sans MS, Comic Sans', label: 'Comic Sans' },
  { value: 'serif', label: 'Serif' },
  { value: 'monospace', label: 'Monospace' },
  { value: 'cursive', label: 'Cursive' },
  { value: 'default', label: 'Default Font' }
];

const fontStyles = {
  control: (base) => ({
    ...base,
    width: 155,  
  }),
  menu: (base) => ({
    ...base,
    width: 155,  // adjust width as needed
  }),
}

const customTheme = (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: 'rgba(79, 69, 228, 0.25)',
      primary50: 'rgba(79, 69, 228, 0.5)',
      primary75: 'rgba(79, 69, 228, 0.75)',
      primary: 'rgba(79, 69, 228, 1)'
    }
  }
}

const Tiptap = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Heading, Bold, Italic, Underline, OrderedList, ListItem, BulletList, 
                  TextStyle, FontFamily, Link, 
                  TextAlign.configure({
                    types: ['heading', 'paragraph'],
                  })],
    content: `
        <p>This isn’t bold.</p>
        <p><strong>This is bold.</strong></p>
        <p><b>And this.</b></p>
        <p style="font-weight: bold">This as well.</p>
        <p style="font-weight: bolder">Oh, and this!</p>
        <p style="font-weight: 500">Cool, isn’t it!?</p>
        <p style="font-weight: 999">Up to font weight 999!!!</p>
      `,
  })

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    // cancelled
    if (url === null) {
      return
    }
    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()
      return
    }
    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="border border-gray-300 rounded m-4">
      <div className="p-2 flex gap-x-2 gap-y-4 flex-wrap shrink-0 bg-gray-200/40">

        {/* Heading Style*/}
        <Select 
          options={headingOptions}
          defaultValue={headingOptions[3]}
          theme={customTheme}
          styles={headingStyles}
          onChange={(selectedOption) => {
            const level = selectedOption.value;
            editor.chain().focus().toggleHeading({ level }).run();
          }}
        />

        {/* Font Family */}
        <Select 
          options={fontOptions}
          defaultValue={fontOptions[5]}
          theme={customTheme}
          styles={fontStyles}
          onChange={(selectedOption) => {
            const fontFamily = selectedOption.value;
            if (fontFamily === "default") {
              editor.chain().focus().unsetFontFamily().run();
            } else {
              editor.chain().focus().setFontFamily(fontFamily).run();
            }
          }}
        />

        {/* Align */}
        <Select 
          options={alignOptions}
          defaultValue={alignOptions[0]}
          components={{Option: alignmentOption}}
          theme={customTheme}
          styles={alignStyles}
          onChange={(selectedOption) => {
            const value = selectedOption.value; 
            editor.chain().focus().setTextAlign(value).run();
          }}
        />

        <div className="flex shrink-0 md:ml-4 gap-x-2">
          {/* Bold, Italic, Underline */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon className={`w-6 h-6 ${editor.isActive('bold') ? 'text-indigo-600 font-semibold' : 'text-black'}`}/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <ItalicIcon className={`w-6 h-6 ${editor.isActive('italic') ? 'text-indigo-600' : 'text-black'}`}/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className={`w-6 h-6 mr-4 ${editor.isActive('underline') ? 'text-indigo-600' : 'text-black'}`}/>
          </button>

          {/* Link, Unlink */}
          <button onClick={setLink}>
            <LinkIcon className={`w-6 h-6 ${editor.isActive('link') ? 'text-indigo-600' : 'text-black'}`}/>
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive('link')}
          >
            <UnlinkIcon className={`w-6 h-6 mr-4 text-black`}/>
          </button>

          {/* OrderedList, BulletList */}
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <NumberedListIcon className={`w-6 h-6 ${editor.isActive('orderedList') ? 'text-indigo-600' : 'text-black'}`}/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <BulletListIcon className={`w-6 h-6 ${editor.isActive('bulletList') ? 'text-indigo-600' : 'text-black'}`}/>
          </button>
        </div>

      </div>
      <EditorContent editor={editor}/>
    </div>
  )
}

export default Tiptap