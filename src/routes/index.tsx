import { createFileRoute } from '@tanstack/react-router';

import { LandingFrame } from '#/features/landing/views/frames';

export const Route = createFileRoute('/')({ component: LandingFrame });
