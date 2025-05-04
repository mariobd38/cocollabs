import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'


const isProtectedRoute = createRouteMatcher(['/']);


export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect({unauthenticatedUrl: 'http://localhost:3001/login'})
  if (isProtectedRoute(req)) await auth.protect()
});

// export default clerkMiddleware(async (auth) => {
//   return await auth().protect();
// });

export const config = {
  matcher: [
    '/',
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
