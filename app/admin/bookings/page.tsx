export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import DeleteBookingButton from "@/components/DeleteBookingButton";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function AdminBookingsPage() {
    // ✅ Server Action：删除
    async function deleteBookingAction(formData: FormData) {
        "use server";

        const id = formData.get("id");
        if (!id) throw new Error("Missing id");

        // 1) 必须登录
        const supabase = await supabaseServer();
        const { data: userRes } = await supabase.auth.getUser();
        const user = userRes.user;
        if (!user) redirect("/admin/login");

        // 2) 必须是管理员（查 admin_users）
        const { data: adminRow } = await supabaseAdmin
            .from("admin_users")
            .select("user_id")
            .eq("user_id", user.id)
            .maybeSingle();

        if (!adminRow) throw new Error("Not admin");

        // 3) 执行删除
        const { error } = await supabaseAdmin
            .from("bookings")
            .delete()
            .eq("id", id);

        if (error) throw new Error(error.message);

        // 4) 刷新列表
        revalidatePath("/admin/bookings");
    }

    // 读取数据（你原来的逻辑）
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
                        {/* ✅ 新增一列：操作 */}
                        <div className="col-span-12 md:col-span-12 hidden"></div>
                    </div>

                    <div className="divide-y divide-neutral-200">
                        {bookings.length === 0 ? (
                            <div className="px-4 py-8 text-sm text-neutral-600">暂无数据</div>
                        ) : (
                            bookings.map((b: any) => (
                                <div
                                    key={b.id}
                                    className="grid grid-cols-12 gap-3 px-4 py-3 text-sm items-start"
                                >
                                    <div className="col-span-2 font-medium">{b.name}</div>
                                    <div className="col-span-3 text-neutral-700 break-words">{b.contact}</div>
                                    <div className="col-span-5 text-neutral-700 whitespace-pre-wrap">{b.concern}</div>
                                    <div className="col-span-2 text-neutral-700">{b.preferred_time || "-"}</div>

                                    {/* ✅ 删除按钮（独占一行更不挤；你也可以放到最后一列） */}
                                    <div className="col-span-12 flex justify-end">
                                        <DeleteBookingButton id={b.id} action={deleteBookingAction} />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
