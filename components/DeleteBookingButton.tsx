"use client";

export default function DeleteBookingButton({
    id,
    action,
}: {
    id: string | number;
    action: (formData: FormData) => Promise<void>;
}) {
    return (
        <form action={action}>
            <input type="hidden" name="id" value={String(id)} />
            <button
                type="submit"
                className="text-red-600 hover:underline"
                onClick={(e) => {
                    if (!confirm("确定删除这条预约吗？此操作不可恢复。")) {
                        e.preventDefault();
                    }
                }}
            >
                删除
            </button>
        </form>
    );
}
