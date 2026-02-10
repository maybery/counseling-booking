import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">关于我</h1>
          <p className="text-neutral-600">
            （示例）这里介绍你的背景、咨询理念、你想为来访者提供什么样的陪伴。
          </p>
        </header>

        <section className="rounded-2xl border border-neutral-200 p-5 space-y-3">
          <h2 className="text-lg font-medium">我的理念</h2>
          <ul className="list-disc pl-5 text-neutral-700 space-y-1">
            <li>关系是改变发生的地方</li>
            <li>尊重、保密与不评判</li>
            <li>一起把感受说清楚</li>
          </ul>
        </section>


      </div>
    </main>
  );
}
