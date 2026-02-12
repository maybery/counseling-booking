import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    let res = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        res.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // 访问 /admin/* 必须先登录
    if (!user && !req.nextUrl.pathname.startsWith("/admin/login")) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
    }

    // 已登录，但必须是管理员
    if (user && !req.nextUrl.pathname.startsWith("/admin/login")) {
        const { data: adminRow } = await supabase
            .from("admin_users")
            .select("user_id")
            .eq("user_id", user.id)
            .maybeSingle();

        if (!adminRow) {
            const url = req.nextUrl.clone();
            url.pathname = "/"; // 不是管理员就回首页（也可换成 /admin/login?err=not_admin）
            return NextResponse.redirect(url);
        }
    }

    return res;
}

export const config = {
    matcher: ["/admin/:path*"],
};
