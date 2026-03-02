import { clerkMiddleware } from '@clerk/nextjs/server';

// Clerk middleware is REQUIRED for server-side auth() to work in API routes.
// Without this, auth() always returns { userId: null }, which causes
// the /api/upload route to reject requests as "Unauthorized",
// surfacing as "failed to retrieve the client token" on the client.
export default clerkMiddleware();

export const config = {
    matcher: [
        // Run on all routes except static files and Next.js internals
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run on API routes
        '/(api|trpc)(.*)',
    ],
};
