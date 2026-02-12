"use client";

import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function AdminLogoutButton() {
    const router = useRouter();

    return (
        <button
            className="text-sm text-neutral-600 hover:text-black underline"
            onClick={async () => {
                await supabaseBrowser.auth.signOut();
                router.replace("/admin/login");
                router.refresh();
            }}
        >
            退出登录
        </button>
    );
}
