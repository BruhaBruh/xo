import React from 'react';
import { InputWithCopy } from './InputWithCopy';

export const CodeLinkCopy: React.FC<{
  code: string;
}> = ({ code }) => {
  return (
    <>
      <InputWithCopy id="code" label="Code" value={code} />
      <InputWithCopy
        id="link"
        label="Link"
        value={typeof window === 'undefined' ? '' : window.location.href}
      />
    </>
  );
};
