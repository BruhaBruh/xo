import { Button, Input, InputField, Label } from '@/components/ui';
import { Check, Copy } from 'lucide-react';
import React from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

export const InputWithCopy: React.FC<{
  id: string;
  label: string;
  value: string;
}> = ({ id, label, value }) => {
  const [copyText, copy] = useCopyToClipboard();
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    if (!copyText) return;
    setIsSuccess(true);
  }, [copyText]);

  React.useEffect(() => {
    if (!isSuccess) return;

    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <InputField className="max-w-max mx-auto mt-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2">
        <Input id={id} readOnly value={value} className="flex-1" />
        <Button size="icon" variant="outline" onClick={() => copy(value)}>
          {isSuccess ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </InputField>
  );
};
