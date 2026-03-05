'use server';

import {EndSessionResult, StartSessionResult} from "@/types";
import {connectToDatabase} from "@/database/mongoose";
import VoiceSession from "@/database/models/voice-session.model";
import {getCurrentBillingPeriodStart} from "@/lib/subscription-constants";
import {getUserPlanWithLimits} from "@/lib/actions/subscription.actions";

export const startVoiceSession = async (clerkId: string, bookId: string): Promise<StartSessionResult> => {
    try {
        await connectToDatabase();

        // Check session limits for the user's plan
        const { plan, limits } = await getUserPlanWithLimits();
        const billingPeriodStart = getCurrentBillingPeriodStart();

        if (limits.maxSessionsPerMonth !== -1) {
            const sessionCount = await VoiceSession.countDocuments({
                clerkId,
                billingPeriodStart,
            });

            if (sessionCount >= limits.maxSessionsPerMonth) {
                return {
                    success: false,
                    error: `You've reached the ${plan} plan limit of ${limits.maxSessionsPerMonth} sessions this month. Upgrade your plan for more sessions.`,
                };
            }
        }

        const session = await VoiceSession.create({
            clerkId,
            bookId,
            startedAt: new Date(),
            billingPeriodStart,
            durationSeconds: 0,
        });

        return {
            success: true,
            sessionId: session._id.toString(),
            maxDurationMinutes: limits.maxSessionMinutes,
        }
    } catch (e) {
        console.error('Error starting voice session', e);
        return { success: false, error: 'Failed to start voice session. Please try again later.' }
    }
}

export const endVoiceSession = async (sessionId: string, durationSeconds: number): Promise<EndSessionResult> => {
    try {
        await connectToDatabase();

        const result = await VoiceSession.findByIdAndUpdate(sessionId, {
            endedAt: new Date(),
            durationSeconds,
        });

        if(!result) return { success: false, error: 'Voice session not found.' }

        return { success: true }
    } catch (e) {
        console.error('Error ending voice session', e);
        return { success: false, error: 'Failed to end voice session. Please try again later.' }
    }
}
