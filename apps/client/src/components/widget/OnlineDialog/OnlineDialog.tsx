'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  InputField,
  Label,
} from '@/components/ui';
import { NICKNAME_COOKIE } from '@/lib/cookie';
import {
  Code,
  CodeError,
  Nickname,
  NicknameError,
  codeSchema,
  nicknameSchema,
  structureError,
} from '@xo/games';
import { useRouter } from 'next/navigation';
import React from 'react';
import { getCookie, setCookie } from 'react-use-cookie';

export const OnlineDialog: React.FC<{
  href: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}> = ({ href, open, onOpenChange }) => {
  const [nickname, setNickname] = React.useState<Nickname>(
    getCookie(NICKNAME_COOKIE, '')
  );
  const [nicknameError, setNicknameError] = React.useState<NicknameError>();
  const [friendCode, setFriendCode] = React.useState<Code>('');
  const [friendCodeError, setFriendCodeError] = React.useState<CodeError>();
  const router = useRouter();

  React.useEffect(() => {
    setCookie(NICKNAME_COOKIE, nickname, {
      days: 365 * 50,
      SameSite: 'Lax',
    });
  }, [nickname]);

  const onBlurNickname = () => {
    const result = nicknameSchema.safeParse(nickname);

    if (result.success) {
      setNicknameError(undefined);
      setNickname(result.data);

      return;
    }
    setNicknameError(structureError(result.error));
  };

  const onBlurFriendCode = () => {
    if (!friendCode) {
      setFriendCodeError(undefined);

      return;
    }
    const result = codeSchema.safeParse(friendCode);

    if (result.success) {
      setFriendCodeError(undefined);
      setFriendCode(result.data);

      return;
    }
    setFriendCodeError(structureError(result.error));
  };

  const onConnectToFriendClick = () => {
    router.push(`${href}/${friendCode}`);
  };

  const onCreateClick = () => {
    router.push(`${href}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Online settings</DialogTitle>
        </DialogHeader>
        <InputField error={nicknameError}>
          <Label htmlFor="nickname" required>
            Nickname
          </Label>
          <Input
            required
            id="nickname"
            name="nickname"
            autoComplete="off"
            minLength={3}
            maxLength={32}
            value={nickname}
            onChange={(e) => setNickname(e.currentTarget.value)}
            onBlur={onBlurNickname}
          />
        </InputField>
        <InputField error={friendCodeError}>
          <Label htmlFor="code">Friend Code</Label>
          <Input
            id="code"
            name="code"
            autoComplete="off"
            minLength={12}
            maxLength={12}
            value={friendCode}
            onChange={(e) => setFriendCode(e.currentTarget.value)}
            onBlur={onBlurFriendCode}
          />
        </InputField>
        <DialogFooter>
          <Button
            variant="secondary"
            disabled={!nickname || !!nicknameError}
            onClick={onCreateClick}
          >
            Create
          </Button>
          <Button
            disabled={
              !friendCode || !!friendCodeError || !nickname || !!nicknameError
            }
            onClick={onConnectToFriendClick}
          >
            Connect to friend
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
