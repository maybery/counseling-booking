import Link from "next/link";

export default function Home() {
  return (
    <main className="px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-10">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight">
              心理咨询预约（演示站）
            </h1>
            <p className="text-neutral-600 text-base leading-relaxed">
              用于展示“个人咨询师官网 + 在线预约”的示例项目（30天作品）。
              页面文案为演示用途，后续可以替换成你的真实风格与定位。
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="rounded-xl bg-black text-white px-5 py-3 text-sm font-medium hover:opacity-90 transition"
              >
                去预约
              </Link>
              <Link
                href="/services"
                className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium hover:bg-neutral-50 transition"
              >
                查看服务
              </Link>
            </div>

            <p className="text-xs text-neutral-500">
              Day3：统一导航与页脚，让网站更像可交付产品。
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-6 space-y-4">
            <h2 className="text-lg font-medium">我可以提供的帮助（示例）</h2>
            <ul className="space-y-2 text-neutral-700">
              <li>• 情绪压力：焦虑、内耗、失眠与压力管理</li>
              <li>• 关系困扰：亲密关系、沟通冲突、边界感</li>
              <li>• 自我探索：自我价值、选择困难、人生方向</li>
            </ul>

            <div className="pt-2 text-sm text-neutral-600">
              首次会谈通常用于了解你的诉求与期待，并共同商定目标与节奏。
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-neutral-200 p-5 space-y-2">
            <h3 className="font-medium">保密与尊重</h3>
            <p className="text-sm text-neutral-600">
              在专业伦理框架内保护你的隐私与表达空间。
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-5 space-y-2">
            <h3 className="font-medium">清晰的咨询设置</h3>
            <p className="text-sm text-neutral-600">
              时长、频率、费用与边界提前说明，减少不确定感。
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-5 space-y-2">
            <h3 className="font-medium">稳定的陪伴</h3>
            <p className="text-sm text-neutral-600">
              不急着给建议，先把感受和需求理清楚。
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
