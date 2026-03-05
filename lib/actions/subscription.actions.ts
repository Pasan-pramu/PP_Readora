'use server';

import { auth } from '@clerk/nextjs/server';
import { PlanType } from '@/types';
import { PLAN_LIMITS, PlanLimits } from '@/lib/subscription-constants';

// ============================================
// SERVER-SIDE PLAN DETECTION
// ============================================

/**
 * Determines the current user's plan using Clerk's has() method.
 * Plans "standard" and "pro" are configured in the Clerk Dashboard.
 * Users without any subscription are on the free tier.
 */
export const getUserPlan = async (): Promise<PlanType> => {
    const { has } = await auth();

    if (has({ plan: 'pro' })) return 'pro';
    if (has({ plan: 'standard' })) return 'standard';

    return 'free';
};

/**
 * Returns the current user's plan and its associated limits.
 */
export const getUserPlanWithLimits = async (): Promise<{
    plan: PlanType;
    limits: PlanLimits;
}> => {
    const plan = await getUserPlan();
    return { plan, limits: PLAN_LIMITS[plan] };
};

