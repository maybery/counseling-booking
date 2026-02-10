import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { password } = await req.json().catch(() => ({ password: "" }));
    const correct = process.env.ADMIN_PASSWORD;

    if (!correct) {
        return NextResponse.json({ ok: false, error: "未设置 ADMIN_PASSWORD" }, { status: 500 });
    }

    if (String(password) !== String(correct)) {
        return NextResponse.json({ ok: false, error: "密码错误" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });

    res.cookies.set({
        name: "admin_session",
        value: "1",
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
    });

    return res;
}
