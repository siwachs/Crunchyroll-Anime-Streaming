import { NextRequest, NextResponse } from "next/server";

import { getClientIP } from "./lib/utils";
import { ipAddress, geolocation } from "@vercel/functions";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const ip = ipAddress(request);
    const geo = geolocation(request);

    const headers = new Headers(request.headers);
    headers.set("x-client-ip", ip ?? getClientIP(headers));
    headers.set("x-client-geo-country", geo.country ?? "Global");

    return NextResponse.next({ request: { headers } });
  }

  const cmsURL = process.env.CMS_SERVER;
  if (!cmsURL)
    return new NextResponse("CMS server URL is not configured!", {
      status: 500,
    });
  try {
    const response = await fetch(cmsURL, { method: "HEAD" });
    if (!response.ok)
      new NextResponse("CMS server is not running.", { status: 503 });
  } catch (error) {
    return new NextResponse("CMS server is not running.", { status: 503 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/cms/:path*"],
};
