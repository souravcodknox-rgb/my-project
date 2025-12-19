import { Input, Badge, Avatar, Dropdown } from "antd";
import { SearchOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import "../../styles/common.css";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

const items: MenuProps["items"] = [
  { key: "profile", label: "Profile" },
  { key: "settings", label: "Settings" },
  { type: "divider" },
  { key: "logout", label: "Logout" },
];

const AdminHeader = ({ title, subtitle }: AdminHeaderProps) => {
  return (
    <header 
      style={{
        backgroundColor: 'hsl(var(--card))',
        borderBottom: '1px solid hsl(var(--border))',
        padding: '1rem 1.5rem'
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h1 
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'hsl(var(--foreground))',
              margin: 0
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p 
              style={{
                color: 'hsl(var(--muted-foreground))',
                fontSize: '0.875rem',
                marginTop: '0.25rem',
                margin: 0
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined style={{ color: 'hsl(var(--muted-foreground))' }} />}
            style={{
              width: '16rem'
            }}
          />

          <Badge count={3} size="small">
            <div 
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '0.5rem',
                backgroundColor: 'hsl(var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsla(var(--secondary), 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--secondary))';
              }}
            >
              <BellOutlined 
                style={{ 
                  color: 'hsl(var(--foreground))',
                  fontSize: '1rem'
                }}
              />
            </div>
          </Badge>

          <Dropdown menu={{ items }} placement="bottomRight">
            <Avatar
              size={40}
              icon={<UserOutlined />}
              style={{
                cursor: 'pointer',
                backgroundColor: 'hsl(var(--primary))'
              }}
            />
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
