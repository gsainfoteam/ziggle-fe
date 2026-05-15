import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react';

import type { Editor } from 'tinymce';

interface EditorRefs {
  koreanRef: RefObject<Editor | null>;
  englishRef: RefObject<Editor | null>;
}

const EditorRefsContext = createContext<EditorRefs | null>(null);

export const EditorRefsProvider = ({ children }: { children: ReactNode }) => {
  const koreanRef = useRef<Editor | null>(null);
  const englishRef = useRef<Editor | null>(null);
  return (
    <EditorRefsContext.Provider value={{ koreanRef, englishRef }}>
      {children}
    </EditorRefsContext.Provider>
  );
};

export const useEditorRefs = () => {
  const ctx = useContext(EditorRefsContext);
  if (!ctx) {
    throw new Error('useEditorRefs must be used within EditorRefsProvider');
  }
  return ctx;
};
