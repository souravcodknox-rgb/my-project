import type { ReactNode } from 'react';
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AdminLayout = ({ children, title, subtitle }: AdminLayoutProps) => {
  return (
    <div 
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'hsl(var(--background))'
      }}
    >
      <AdminSidebar />
      <div 
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <AdminHeader title={title} subtitle={subtitle} />
        <main 
          style={{
            flex: 1,
            padding: '1.5rem',
            overflow: 'auto'
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
