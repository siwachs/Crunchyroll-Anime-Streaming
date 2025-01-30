import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // const cmsURL = process.env.CMS_SERVER;
  // if (!cmsURL)
  //   return new NextResponse("CMS server URL is not configured!", {
  //     status: 500,
  //   });
  // try {
  //   const response = await fetch(cmsURL, { method: "HEAD" });
  //   if (!response.ok)
  //     new NextResponse("CMS server is not running.", { status: 503 });
  // } catch (error) {
  //   return new NextResponse("CMS server is not running.", { status: 503 });
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: ["/cms/:path*"],
};
