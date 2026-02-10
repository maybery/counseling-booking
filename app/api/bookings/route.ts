import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
    const { data, error } = await supabaseAdmin
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, bookings: data ?? [] });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const name = String(body?.name ?? "").trim();
        const contact = String(body?.contact ?? "").trim();
        const concern = String(body?.concern ?? "").trim();
        const preferredTime = String(body?.preferredTime ?? "").trim();

        if (!name || !contact || !concern) {
            return NextResponse.json(
                { ok: false, error: "请填写称呼、联系方式、咨询问题。" },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from("bookings")
            .insert({
                name,
                contact,
                concern,
                preferred_time: preferredTime || null,
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ ok: true, booking: data });
    } catch {
        return NextResponse.json({ ok: false, error: "提交失败，请稍后再试。" }, { status: 500 });
    }
}
