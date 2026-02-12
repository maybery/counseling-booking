import "server-only";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function AdminNavLink() {
    const supabase = await supabaseServer();

    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) return null;

    const { data: adminRow } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (!adminRow) return null;

    return (
        <Link className="hover:underline" href="/admin/bookings">
            管理后台
        </Link>
    );
}
