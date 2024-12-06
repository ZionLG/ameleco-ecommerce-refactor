import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { Separator } from "~/components/ui/Separator";
import { SidebarNav } from "./_components/sidebar-nav";
import { auth } from "~/server/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin utilities",
};

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/admin",
  },
  {
    title: "Categories",
    href: "/admin/categories",
  },
  {
    title: "items",
    href: "/admin/items",
  },
  {
    title: "users",
    href: "/admin/users",
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="container space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">Utilities and management tools</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
