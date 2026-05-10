import { useState } from 'react';

import { overlay } from 'overlay-kit';

import { Button } from '../button';
import { alertDialog } from './alert';
import { chooseDialog } from './choose';
import { confirmDialog } from './confirm';

import { Dialog } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const DialogPlayground = ({
  size,
  closeOnBackdrop,
  closeOnEscape,
}: {
  size?: 'sm' | 'md' | 'lg' | 'full';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Dialog 열기
      </Button>
      <Dialog.Root
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={size}
        closeOnBackdrop={closeOnBackdrop}
        closeOnEscape={closeOnEscape}
      >
        <Dialog.Header>
          <Dialog.Title>다이얼로그 제목</Dialog.Title>
          <Dialog.Description>
            보조 설명 텍스트가 여기에 들어갑니다.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <p>본문 영역입니다. 길어지면 내부에서 스크롤됩니다.</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="muted" onClick={() => setIsOpen(false)} className="flex-1">
            취소
          </Button>
          <Button variant="contained" onClick={() => setIsOpen(false)} className="flex-1">
            확인
          </Button>
        </Dialog.Footer>
        <Dialog.Close />
      </Dialog.Root>
    </div>
  );
};

const meta = {
  title: 'Common/UI/Dialog',
  component: DialogPlayground,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
} satisfies Meta<typeof DialogPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: 'md', closeOnBackdrop: true, closeOnEscape: true },
};

export const Small: Story = {
  args: { size: 'sm', closeOnBackdrop: true, closeOnEscape: true },
};

export const Lightbox: Story = {
  args: { size: 'full', closeOnBackdrop: true, closeOnEscape: true },
};

export const NonDismissible: Story = {
  args: { size: 'md', closeOnBackdrop: false, closeOnEscape: false },
};

const LongContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        긴 본문 Dialog
      </Button>
      <Dialog.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Header>
          <Dialog.Title>이용 약관</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          {Array.from({ length: 30 }).map((_, i) => (
            <p key={i} className="mb-3">
              {i + 1}항. 본 약관의 내용이 길어지더라도 Dialog 내부에서 스크롤만
              발생하고, 페이지 자체 스크롤은 잠겨 있습니다.
            </p>
          ))}
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="contained" onClick={() => setIsOpen(false)} className="flex-1">
            동의
          </Button>
        </Dialog.Footer>
      </Dialog.Root>
    </div>
  );
};

export const ScrollableBody: Story = {
  render: () => <LongContent />,
};

const DeleteNoticeScenario = () => {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        variant="contained"
        onClick={async () => {
          const ok = await confirmDialog({
            description: '공지를 정말 삭제하시겠습니까?',
            destructive: true,
          });
          if (ok) setLog((l) => [...l, 'deleteNotice 호출됨 → 홈으로 이동']);
          else setLog((l) => [...l, '취소됨']);
        }}
      >
        공지 삭제
      </Button>
      <ul className="text-sm">
        {log.map((entry, i) => (
          <li key={i}>· {entry}</li>
        ))}
      </ul>
    </div>
  );
};

export const DeleteNoticeConfirm: Story = {
  render: () => <DeleteNoticeScenario />,
};

const WithdrawalScenario = () => {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        variant="contained"
        onClick={async () => {
          const ok = await confirmDialog({
            title: '정말 탈퇴하시겠어요?',
            description:
              '계정과 관련된 모든 정보가 삭제됩니다.\n이 작업은 되돌릴 수 없어요.',
            destructive: true,
          });
          setLog((l) => [
            ...l,
            ok ? 'withdraw → logout 흐름 진입' : '취소됨',
          ]);
        }}
      >
        회원 탈퇴
      </Button>
      <ul className="text-sm">
        {log.map((entry, i) => (
          <li key={i}>· {entry}</li>
        ))}
      </ul>
    </div>
  );
};

export const WithdrawalConfirm: Story = {
  render: () => <WithdrawalScenario />,
};

const SendPushScenario = () => {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        variant="contained"
        onClick={async () => {
          const ok = await confirmDialog({
            description:
              '예약된 푸시 알림을 즉시 보냅니다. 한 번 보낸 알림은 취소할 수 없어요.',
          });
          setLog((l) => [...l, ok ? 'sendAlarm 호출됨' : '취소됨']);
        }}
      >
        지금 푸시 보내기
      </Button>
      <ul className="text-sm">
        {log.map((entry, i) => (
          <li key={i}>· {entry}</li>
        ))}
      </ul>
    </div>
  );
};

export const SendPushConfirm: Story = {
  render: () => <SendPushScenario />,
};

const AutoSaveScenario = () => {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        variant="contained"
        onClick={async () => {
          const ok = await confirmDialog({
            description:
              '저장된 임시글이 있습니다. 이어서 작성하시겠습니까?',
          });
          setLog((l) => [...l, ok ? '초안 복원됨' : '초안 폐기']);
        }}
      >
        작성 페이지 진입(자동저장 있음)
      </Button>
      <ul className="text-sm">
        {log.map((entry, i) => (
          <li key={i}>· {entry}</li>
        ))}
      </ul>
    </div>
  );
};

export const AutoSaveDraftConfirm: Story = {
  render: () => <AutoSaveScenario />,
};

const PushDelayedAlertScenario = () => {
  const [submittedCount, setSubmittedCount] = useState(0);
  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        variant="contained"
        onClick={async () => {
          await alertDialog({
            description:
              '공지 등록 후 푸시 알림이 발송되기까지 약 5분 정도 소요될 수 있어요.',
          });
          setSubmittedCount((c) => c + 1);
        }}
      >
        공지 제출
      </Button>
      <p className="text-sm">제출 시도: {submittedCount}회</p>
    </div>
  );
};

export const PushDelayedAlert: Story = {
  render: () => <PushDelayedAlertScenario />,
};

const EnglishNoticeFailScenario = () => {
  const [log, setLog] = useState<string[]>([]);
  const englishBody = '<p>This is the english body that failed to upload.</p>';
  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        variant="contained"
        onClick={async () => {
          const result = await chooseDialog({
            description:
              '영문 본문 등록에 실패했어요. 작성한 본문을 클립보드에 복사할까요?',
            denyLabel: '본문 복사',
          });
          if (result.outcome === 'denied') {
            await navigator.clipboard.writeText(englishBody).catch(() => {});
            setLog((l) => [...l, '클립보드에 복사됨']);
          } else if (result.outcome === 'confirmed') {
            setLog((l) => [...l, '확인 (다시 시도)']);
          } else {
            setLog((l) => [...l, 'dismiss (backdrop/Escape)']);
          }
        }}
      >
        영문 본문 등록 실패 시뮬레이션
      </Button>
      <ul className="text-sm">
        {log.map((entry, i) => (
          <li key={i}>· {entry}</li>
        ))}
      </ul>
    </div>
  );
};

export const EnglishNoticeFailChoose: Story = {
  render: () => <EnglishNoticeFailScenario />,
};

const LandingScenario = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex flex-col items-start gap-3">
      {!isOpen && (
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          Landing 다시 열기
        </Button>
      )}
      <Dialog.Root
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnBackdrop={false}
        closeOnEscape={false}
        size="lg"
        className="max-h-none w-auto max-w-none border-none p-0 shadow-none"
      >
        <div className="flex h-95 w-80 overflow-hidden rounded-2xl bg-white md:h-145 md:w-160">
          <div className="from-primary/20 to-primary/5 hidden flex-1 bg-gradient-to-br md:block" />
          <div className="flex w-full flex-col items-center justify-between p-6 md:w-96">
            <div className="flex flex-1 flex-col items-center justify-center gap-3">
              <div className="bg-primary h-20 w-20 rounded-2xl" />
              <div className="text-center text-lg font-bold">
                지스트 학생을 위한 통합 공지 플랫폼
              </div>
            </div>
            <div className="flex w-full flex-col items-center gap-3">
              <p className="text-greyDark dark:text-dark_grey text-center text-xs">
                계속 진행하면 개인정보 처리방침과 서비스 이용약관에 동의하는
                것으로 간주됩니다.
              </p>
              <Button
                className="w-full"
                variant="outlined"
                onClick={() => setIsOpen(false)}
              >
                GIST 계정으로 로그인
              </Button>
            </div>
          </div>
        </div>
      </Dialog.Root>
    </div>
  );
};

export const LandingDialog: Story = {
  render: () => <LandingScenario />,
  parameters: { layout: 'fullscreen' },
};

const ImperativeHelper = () => {
  const [opened, setOpened] = useState(0);
  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        variant="contained"
        onClick={() => {
          overlay.open(({ isOpen, close, unmount }) => (
            <Dialog.Root
              isOpen={isOpen}
              onClose={close}
              onExitComplete={unmount}
            >
              <Dialog.Header>
                <Dialog.Title>overlay.open</Dialog.Title>
                <Dialog.Description>
                  overlay-kit의 imperative API로 마운트 됨
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>
                view-only compound 패턴이라 호출처에서 close를 직접 호출합니다.
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="contained" onClick={close} className="flex-1">
                  닫기
                </Button>
              </Dialog.Footer>
              <Dialog.Close />
            </Dialog.Root>
          ));
          setOpened((n) => n + 1);
        }}
      >
        overlay.open 호출
      </Button>
      <p className="text-sm">호출 횟수: {opened}</p>
    </div>
  );
};

export const ImperativeOpen: Story = {
  render: () => <ImperativeHelper />,
};
