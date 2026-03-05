import { PlanType } from '@/types';

// ============================================
// PLAN LIMITS
// ============================================

export interface PlanLimits {
    maxBooks: number;
    maxSessionsPerMonth: number;      // -1 = unlimited
    maxSessionMinutes: number;
    hasSessionHistory: boolean;
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
    free: {
        maxBooks: 1,
        maxSessionsPerMonth: 5,
        maxSessionMinutes: 5,
        hasSessionHistory: false,
    },
    standard: {
        maxBooks: 10,
        maxSessionsPerMonth: 100,
        maxSessionMinutes: 15,
        hasSessionHistory: true,
    },
    pro: {
        maxBooks: 100,
        maxSessionsPerMonth: -1,       // unlimited
        maxSessionMinutes: 60,
        hasSessionHistory: true,
    },
};

// ============================================
// BILLING PERIOD
// ============================================

/** Returns the start of the current calendar month (used for session counting). */
export const getCurrentBillingPeriodStart = (): Date => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
};

// ============================================
// PLAN DISPLAY INFO (for pricing page)
// ============================================

export interface PlanDisplayInfo {
    key: PlanType;
    label: string;
    description: string;
    features: string[];
    highlighted?: boolean;
}

export const PLAN_DISPLAY_INFO: PlanDisplayInfo[] = [
    {
        key: 'free',
        label: 'Free',
        description: 'Get started with the basics',
        features: [
            '1 book',
            '5 sessions / month',
            '5 min per session',
            'No session history',
        ],
    },
    {
        key: 'standard',
        label: 'Standard',
        description: 'For regular readers who want more',
        highlighted: true,
        features: [
            '10 books',
            '100 sessions / month',
            '15 min per session',
            'Full session history',
        ],
    },
    {
        key: 'pro',
        label: 'Pro',
        description: 'Unlimited power for avid readers',
        features: [
            '100 books',
            'Unlimited sessions',
            '60 min per session',
            'Full session history',
        ],
    },
];

