import "./globals.css";
import Link from "next/link";
import AdminNavLink from "@/components/AdminNavLink";


export const metadata = {
  title: "心理咨询预约（演示站）",
  description: "个人咨询师官网 + 在线预约示例（30天作品）",
};

function Header() {
  return (
    <header className="border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          咨询预约（演示）
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link className="hover:underline" href="/services">服务</Link>
          <Link className="hover:underline" href="/about">关于</Link>
          <Link className="hover:underline" href="/contact">联系</Link>
          <Link
            href="/booking"
            className="rounded-xl bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition"
          >
            去预约
          </Link>
          <AdminNavLink />
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="max-w-5xl mx-auto px-6 py-6 text-xs text-neutral-500 flex flex-col gap-2">
        <p>© {new Date().getFullYear()} 心理咨询预约（演示站）</p>
        <p>
          免责声明：本网站为作品演示，不提供真实医疗/心理治疗服务。若你正处于危机或有自伤风险，请立即联系当地紧急救助资源。
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
