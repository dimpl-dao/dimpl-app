import {useEffect, useState} from 'react';

export default function useEdittableText(initialtext: string) {
  const [text, setText] = useState(initialtext);
  const textHasChanged = initialtext !== text;
  useEffect(() => {
    setText(initialtext);
  }, [initialtext]);
  const handleChangeText = (text: string) => {
    setText(text);
  };
  return [text, textHasChanged, handleChangeText];
}
