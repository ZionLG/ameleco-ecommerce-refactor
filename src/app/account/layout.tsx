import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import SidebarDashboard from "./_components/SidebarDashboard";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/account/profile",
  },
  {
    title: "My Orders",
    href: "/account/orders",
  },
];

export const metadata: Metadata = {
  title: "Account Dashboard",
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AccountLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="grid grid-cols-1 gap-10 p-5 lg:grid-cols-[min-content_minmax(0,1fr)] lg:p-10">
      <aside>
        <SidebarDashboard items={sidebarNavItems} />
      </aside>
      <div className="bg-background p-5 md:rounded-lg md:shadow-lg">
        {children}
      </div>
    </main>
  );
}
