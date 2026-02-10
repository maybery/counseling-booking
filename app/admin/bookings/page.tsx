import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function AdminBookingsPage() {
    const { data, error } = await supabaseAdmin
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

    const bookings = data ?? [];

    return (
        <main className="px-6 py-10">
            <div className="max-w-5xl mx-auto space-y-6">
                <header className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight">预约列表（管理员）</h1>
                    {error ? (
                        <p className="text-sm text-red-700">读取失败：{error.message}</p>
                    ) : (
                        <p className="text-neutral-600">仅管理员可见（已加登录保护）。</p>
                    )}
                </header>

                <section className="rounded-2xl border border-neutral-200 overflow-hidden">
                    <div className="grid grid-cols-12 gap-3 px-4 py-3 text-xs font-medium bg-neutral-50">
                        <div className="col-span-2">称呼</div>
                        <div className="col-span-3">联系方式</div>
                        <div className="col-span-5">问题描述</div>
                        <div className="col-span-2">时间</div>
                    </div>

                    <div className="divide-y divide-neutral-200">
                        {bookings.length === 0 ? (
                            <div className="px-4 py-8 text-sm text-neutral-600">暂无数据</div>
                        ) : (
                            bookings.map((b: any) => (
                                <div key={b.id} className="grid grid-cols-12 gap-3 px-4 py-3 text-sm">
                                    <div className="col-span-2 font-medium">{b.name}</div>
                                    <div className="col-span-3 text-neutral-700 break-words">{b.contact}</div>
                                    <div className="col-span-5 text-neutral-700 whitespace-pre-wrap">{b.concern}</div>
                                    <div className="col-span-2 text-neutral-700">{b.preferred_time || "-"}</div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
