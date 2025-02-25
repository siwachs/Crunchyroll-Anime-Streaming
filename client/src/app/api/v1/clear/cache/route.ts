import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const clearCache = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const cacheTag = searchParams.get("cacheTag");
    if (!cacheTag)
      return NextResponse.json(
        {
          error: true,
          errorMessage: "cacheTag query param is required!",
        },
        { status: 400 },
      );

    revalidateTag(cacheTag);

    return NextResponse.json(
      {
        message: `${cacheTag} is revalidated.`,
        on: Date.now(),
      },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? (error as Error).message
        : "Internal Server Error";

    return NextResponse.json(
      {
        error: true,
        errorMessage,
      },
      { status: 500 },
    );
  }
};

export { clearCache as GET };
