import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">咨询服务</h1>
          <p className="text-neutral-600">
            （示例）这里写你能提供的服务方向、适合人群、咨询设置等。
          </p>
        </header>

        <section className="rounded-2xl border border-neutral-200 p-5 space-y-4">
          <div>
            <h2 className="text-lg font-medium">服务方向（示例）</h2>
            <p className="text-neutral-700">
              情绪压力、关系困扰、自我探索、职业迷茫等。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium">咨询流程（示例）</h2>
            <ol className="list-decimal pl-5 text-neutral-700 space-y-1">
              <li>提交预约 → 简短确认</li>
              <li>首次会谈：了解诉求与目标</li>
              <li>按周/双周频率持续会谈</li>
            </ol>
          </div>

          <div>
            <h2 className="text-lg font-medium">费用说明（示例）</h2>
            <p className="text-neutral-700">
              费用与设置会在首次沟通后确认。（演示用文案）
            </p>
          </div>
        </section>


      </div>
    </main>
  );
}
