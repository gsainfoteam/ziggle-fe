import { cn } from '@/common/utils';

/** 작성 폼 공통 필드 크롬 — notice 검색 인풋과 톤 맞춤 */
export const writeFieldClassName =
  'border-border bg-muted text-foreground placeholder:text-muted-foreground w-full rounded-xl border px-4 py-2.5 outline-none focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60';

/** Zod/RHF 에러 시 필드 테두리 */
export const writeFieldInvalidClassName = 'border-red-500';

export const writeFieldShellClassName =
  'border-border bg-muted flex flex-wrap items-center gap-1.5 rounded-xl border px-2 py-1.5 outline-none focus-within:outline-none';

/** 섹션 제목 (설정 / 본문 / 부가 정보) */
export const writeBlockHeadingClassName =
  'text-foreground text-lg font-semibold tracking-tight';

/** 필드 스택: 라벨·힌트·컨트롤·에러 — 부모에서 flex flex-col gap-2 */
export const writeFieldStackClassName = 'flex flex-col gap-2';

/** 섹션 안 필드 라벨 — margin 없이 텍스트만 (간격은 부모 gap) */
export const writeFieldLabelClassName =
  'text-foreground block text-sm font-medium';

export const writeHintClassName = 'text-muted-foreground text-sm';

/** Zod 필수 필드 표시 — consent 모달과 동일 톤 */
export const writeRequiredMarkClassName = 'text-primary ml-0.5';

/** Zod 에러 메시지 — 이모지 없이 빨간 텍스트 */
export const writeErrorClassName = 'text-red-500 text-sm';

export function writeFieldClassNames(invalid?: boolean) {
  return cn(writeFieldClassName, invalid && writeFieldInvalidClassName);
}
