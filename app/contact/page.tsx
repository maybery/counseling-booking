import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">联系方式</h1>
          <p className="text-neutral-600">
            （示例）这里放你的联系渠道与可咨询时间说明。
          </p>
        </header>

        <section className="rounded-2xl border border-neutral-200 p-5 space-y-3">
          <p className="text-neutral-700">邮箱：example@email.com（演示）</p>
          <p className="text-neutral-700">微信：Maybery（演示）</p>
          <p className="text-neutral-700">城市：上海（演示）</p>
        </section>


      </div>
    </main>
  );
}
