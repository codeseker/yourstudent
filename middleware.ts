import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { isEmailValid} from "@/app/lib/firebaseFunctions";

export async function middleware(req: NextRequest) {

    console.log('I am middleware');
  // Define paths for easier management
  const loginPath = "/auth/login";
  const errorPath = "/error";
  const currentPath = req.nextUrl.pathname;

  // Skip middleware for login-related paths to avoid redirect loops
  if (currentPath === loginPath || currentPath === errorPath) {
    return NextResponse.next();
  }

  try {
    // Get session token with strict configuration
    const session = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET,
      // Setting secure cookie options for better security and incognito support
      secureCookie: process.env.NODE_ENV === 'production',
    });

    // Redirect to login if no session exists
    if (!session || !session.email) {
      console.log("No valid session found, redirecting to login");
      // Create a new URL for redirection that includes the callbackUrl
      const callbackUrl = encodeURIComponent(req.nextUrl.pathname);
      const loginUrl = new URL(`${loginPath}?callbackUrl=${callbackUrl}`, req.url);
      
      return NextResponse.redirect(loginUrl);
    }

    // Check validity of email against Firebase collection
    const email = session.email as string;
    const isValidEmail = await isEmailValid(email);
    
    if (!isValidEmail) {
      // Redirect to error page if email is not valid
      console.log(`Invalid email: ${email}, redirecting to error page`);
      return NextResponse.redirect(new URL(`${errorPath}?reason=invalid_email`, req.url));
    }

    // Check admin access for admin routes
    if (currentPath.startsWith('/admin/')) {
      const hasAdminAccess = email === process.env.NEXT_PUBLIC_HOD_SIR_EMAIL;
      
      if (!hasAdminAccess) {
        // Redirect to error page if user lacks admin rights
        console.log(`User ${email} attempted to access admin route without permission`);
        return NextResponse.redirect(new URL(`${errorPath}?reason=unauthorized`, req.url));
      }
    }

    // Continue to requested page if all checks pass
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    // Redirect to error page on unexpected errors
    return NextResponse.redirect(new URL(`${errorPath}?reason=server_error`, req.url));
  }
}

// Make sure to match ALL protected routes, with NO exceptions
// that could allow unauthorized access
export const config = {
  matcher: [
    // This will match ALL routes except those explicitly excluded
    "/((?!api|_next/static|_next/image|favicon.ico|public|images|assets|auth/login|error).*)",
  ],
};