'use client';

import { PricingTable } from '@clerk/nextjs';

const SubscriptionsPage = () => {
    return (
        <main className="clerk-subscriptions">
            {/* Header */}
            <section className="flex flex-col gap-3 text-center mb-10">
                <h1 className="page-title-xl">Choose Your Plan</h1>
                <p className="subtitle">
                    Unlock longer sessions, more books, and premium voices
                </p>
            </section>

            {/* Clerk pricing table — features are injected via CSS ::after */}
            <div className="clerk-pricing-table-wrapper w-full max-w-4xl">
                <PricingTable />
            </div>
        </main>
    );
};

export default SubscriptionsPage;

