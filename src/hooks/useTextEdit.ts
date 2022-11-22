import {useEffect, useState} from 'react';

export default function useTextEdit(initialText: string) {
  const [text, setText] = useState(initialText);
  const textHasChanged = initialText !== text;
  useEffect(() => {
    setText(initialText);
  }, [initialText]);
  const handleChangeText = (string: string) => {
    setText(string);
  };
  return {text, textHasChanged, handleChangeText};
}
