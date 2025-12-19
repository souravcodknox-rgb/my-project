import {
    DesktopOutlined,
    FolderOutlined,
    PlaySquareOutlined,
    GroupOutlined,
    HistoryOutlined,
    TeamOutlined,
    SettingOutlined,
  } from "@ant-design/icons";
  import { useLocation, useNavigate } from "react-router-dom";
  import "../../styles/common.css";
  
  interface NavItem {
    key: string;
    label: string;
    icon: React.ReactNode;
    path: string;
  }
  
  const navItems: NavItem[] = [
    { key: "screen", label: "Screen", icon: <DesktopOutlined />, path: "/" },
    { key: "media", label: "Media", icon: <FolderOutlined />, path: "/media" },
    { key: "playlist", label: "Playlist", icon: <PlaySquareOutlined />, path: "/playlist" },
    { key: "grouping", label: "Grouping", icon: <GroupOutlined />, path: "/grouping" },
    { key: "playback-log", label: "Playback Log", icon: <HistoryOutlined />, path: "/playback-log" },
    { key: "role-management", label: "Role Management", icon: <TeamOutlined />, path: "/role-management" },
  ];
  
  const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    return (
      <aside 
        className="admin-sidebar"
        style={{
          width: '16rem',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'hsl(var(--sidebar-background))',
          color: 'hsl(var(--sidebar-foreground))'
        }}
      >
        {/* Logo */}
        <div 
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid hsl(var(--sidebar-border))'
          }}
        >
          <h1 
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: 'hsl(var(--sidebar-foreground))'
            }}
          >
            Media Admin
          </h1>
          <p 
            style={{
              fontSize: '0.875rem',
              color: 'hsl(var(--sidebar-muted))',
              marginTop: '0.25rem'
            }}
          >
            Playlist Management
          </p>
        </div>
  
        {/* Navigation */}
        <nav 
          style={{
            flex: 1,
            paddingTop: '1rem',
            paddingBottom: '1rem'
          }}
        >
          <div>
            {navItems.map((item) => (
              <div
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`admin-sidebar-item ${
                  location.pathname === item.path ? "active" : ""
                }`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  color: location.pathname === item.path 
                    ? 'hsl(var(--sidebar-primary-foreground))'
                    : 'hsla(var(--sidebar-foreground), 0.8)',
                  backgroundColor: location.pathname === item.path 
                    ? 'hsl(var(--sidebar-primary))'
                    : 'transparent',
                  borderRadius: '0.5rem',
                  margin: '0 0.5rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--sidebar-accent))';
                    e.currentTarget.style.color = 'hsl(var(--sidebar-foreground))';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'hsla(var(--sidebar-foreground), 0.8)';
                  }
                }}
              >
                <span style={{ fontSize: '1.125rem' }}>{item.icon}</span>
                <span style={{ fontWeight: '500' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </nav>
  
        {/* Settings */}
        <div 
          style={{
            padding: '1rem',
            borderTop: '1px solid hsl(var(--sidebar-border))'
          }}
        >
          <div 
            className="admin-sidebar-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              color: 'hsla(var(--sidebar-foreground), 0.8)',
              borderRadius: '0.5rem',
              margin: '0 0.5rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s, color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--sidebar-accent))';
              e.currentTarget.style.color = 'hsl(var(--sidebar-foreground))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'hsla(var(--sidebar-foreground), 0.8)';
            }}
          >
            <SettingOutlined style={{ fontSize: '1.125rem' }} />
            <span style={{ fontWeight: '500' }}>Settings</span>
          </div>
        </div>
      </aside>
    );
  };
  
  export default AdminSidebar;
