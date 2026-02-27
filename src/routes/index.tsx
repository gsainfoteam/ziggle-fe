import { createFileRoute } from '@tanstack/react-router';

import { LandingFrame } from '@/features/landing';

export const Route = createFileRoute('/')({ component: LandingFrame });
