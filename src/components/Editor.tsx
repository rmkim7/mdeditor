'use client'; // this registers <Editor> as a Client Component

import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView, darkDefaultTheme, lightDefaultTheme } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { locales } from '@blocknote/core';

// Uploads a file to tmpfiles.org and returns the URL to the uploaded file.
async function uploadFile(file: File) {
  const body = new FormData();
  body.append("file", file);
 
  const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: body,
  });
  return (await ret.json()).data.url.replace(
    "tmpfiles.org/",
    "tmpfiles.org/dl/"
  );
}

interface EditorProps {
  onChange: () => void;
  initialContent?: string;
  editable?: boolean;
}

// Creates a new editor instance
const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  editable,
}) => {
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent 
    ? (JSON.parse(initialContent) as PartialBlock[]) 
    : undefined, 
    dictionary: locales.ko, // localization
    uploadFile,
  });
  
  return (
    <div className='-mx-[54px] my-4'>
      <BlockNoteView 
        editor={editor} 
        editable={editable} 
        theme='light'
        onChange={onChange}
      />
    </div>
  );
};

export default Editor