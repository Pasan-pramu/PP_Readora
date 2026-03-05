'use client';

import { useAuth } from '@clerk/nextjs';
import { PlanType } from '@/types';
import { PLAN_LIMITS, PlanLimits } from '@/lib/subscription-constants';

/**
 * Client-side hook that returns the current user's plan and limits.
 * Uses Clerk's `has()` from useAuth() for instant client-side checks.
 */
export const useSubscription = (): { plan: PlanType; limits: PlanLimits } => {
    const { has } = useAuth();

    let plan: PlanType = 'free';

    if (has?.({ plan: 'pro' })) {
        plan = 'pro';
    } else if (has?.({ plan: 'standard' })) {
        plan = 'standard';
    }

    return { plan, limits: PLAN_LIMITS[plan] };
};

export default useSubscription;

