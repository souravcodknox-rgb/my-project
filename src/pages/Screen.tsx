import { Table, Tag, Badge, Button, Space } from "antd";
import { ReloadOutlined, DesktopOutlined, CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";
import AdminLayout from "../components/layout/AdminLayout";
import type { ColumnsType } from "antd/es/table";
import "../styles/common.css";

interface ScreenData {
  key: string;
  name: string;
  location: string;
  status: "online" | "offline" | "syncing";
  lastSync: string;
  resolution: string;
  playlist: string;
}

const data: ScreenData[] = [
  {
    key: "1",
    name: "Lobby Display",
    location: "Building A - Ground Floor",
    status: "online",
    lastSync: "2 min ago",
    resolution: "1920x1080",
    playlist: "Welcome Playlist",
  },
  {
    key: "2",
    name: "Conference Room B",
    location: "Building A - 2nd Floor",
    status: "syncing",
    lastSync: "Syncing...",
    resolution: "3840x2160",
    playlist: "Meeting Room Content",
  },
  {
    key: "3",
    name: "Cafeteria Screen",
    location: "Building B - Ground Floor",
    status: "online",
    lastSync: "5 min ago",
    resolution: "1920x1080",
    playlist: "Menu & Announcements",
  },
  {
    key: "4",
    name: "Reception Display",
    location: "Building C - Ground Floor",
    status: "offline",
    lastSync: "2 hours ago",
    resolution: "1920x1080",
    playlist: "Company Overview",
  },
  {
    key: "5",
    name: "Training Room",
    location: "Building A - 3rd Floor",
    status: "online",
    lastSync: "1 min ago",
    resolution: "3840x2160",
    playlist: "Training Videos",
  },
];

const statusConfig = {
  online: { color: "success", icon: <CheckCircleOutlined />, text: "Online" },
  offline: { color: "error", icon: <CloseCircleOutlined />, text: "Offline" },
  syncing: { color: "processing", icon: <SyncOutlined spin />, text: "Syncing" },
};

const Screen = () => {
  const columns: ColumnsType<ScreenData> = [
    {
      title: "Screen",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div 
            style={{ 
              width: '2.5rem', 
              height: '2.5rem', 
              borderRadius: '0.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: "hsla(var(--primary), 0.1)"
            }}
          >
            <DesktopOutlined 
              style={{ 
                fontSize: '1.125rem',
                color: "hsl(var(--primary))"
              }}
            />
          </div>
          <div>
            <p 
              style={{ 
                fontWeight: '500',
                color: "hsl(var(--foreground))",
                margin: 0
              }}
            >
              {name}
            </p>
            <p 
              style={{ 
                fontSize: '0.875rem',
                color: "hsl(var(--muted-foreground))",
                margin: 0
              }}
            >
              {record.location}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: keyof typeof statusConfig) => {
        const config = statusConfig[status];
        return (
          <Tag
            icon={config.icon}
            color={config.color}
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', width: 'fit-content' }}
          >
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: "Resolution",
      dataIndex: "resolution",
      key: "resolution",
      render: (resolution) => (
        <span 
          style={{ 
            fontSize: '0.875rem',
            color: "hsl(var(--muted-foreground))"
          }}
        >
          {resolution}
        </span>
      ),
    },
    {
      title: "Current Playlist",
      dataIndex: "playlist",
      key: "playlist",
      render: (playlist) => (
        <Badge color="blue" text={playlist} />
      ),
    },
    {
      title: "Last Sync",
      dataIndex: "lastSync",
      key: "lastSync",
      render: (lastSync) => (
        <span 
          style={{ 
            fontSize: '0.875rem',
            color: "hsl(var(--muted-foreground))"
          }}
        >
          {lastSync}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button size="small" icon={<ReloadOutlined />}>
            Sync
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout title="Screens" subtitle="Monitor and manage all connected displays">











      {/* Stats Cards */}
      <div 
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <div className="admin-card" style={{ padding: '1rem', flex: '1 1 0', maxWidth: 'calc(25% - 0.75rem)' }}>
          <p 
            style={{ 
              fontSize: '0.875rem',
              color: "hsl(var(--muted-foreground))",
              margin: 0
            }}
          >
            Total Screens
          </p>
          <p 
            style={{ 
              fontSize: '1.875rem',
              fontWeight: 'bold',
              marginTop: '0.25rem',
              color: "hsl(var(--foreground))",
              margin: 0
            }}
          >
            24
          </p>
        </div>
        <div className="admin-card" style={{ padding: '1rem', flex: '1 1 0', maxWidth: 'calc(25% - 0.75rem)' }}>
          <p 
            style={{ 
              fontSize: '0.875rem',
              color: "hsl(var(--muted-foreground))",
              margin: 0
            }}
          >
            Online
          </p>
          <p 
            style={{ 
              fontSize: '1.875rem',
              fontWeight: 'bold',
              marginTop: '0.25rem',
              color: "hsl(var(--success))",
              margin: 0
            }}
          >
            20
          </p>
        </div>
        <div className="admin-card" style={{ padding: '1rem', flex: '1 1 0', maxWidth: 'calc(25% - 0.75rem)' }}>
          <p 
            style={{ 
              fontSize: '0.875rem',
              color: "hsl(var(--muted-foreground))",
              margin: 0
            }}
          >
            Offline
          </p>
          <p 
            style={{ 
              fontSize: '1.875rem',
              fontWeight: 'bold',
              marginTop: '0.25rem',
              color: "hsl(var(--destructive))",
              margin: 0
            }}
          >
            3
          </p>
        </div>
        <div className="admin-card" style={{ padding: '1rem', flex: '1 1 0', maxWidth: 'calc(25% - 0.75rem)' }}>
          <p 
            style={{ 
              fontSize: '0.875rem',
              color: "hsl(var(--muted-foreground))",
              margin: 0
            }}
          >
            Syncing
          </p>
          <p 
            style={{ 
              fontSize: '1.875rem',
              fontWeight: 'bold',
              marginTop: '0.25rem',
              color: "hsl(var(--primary))",
              margin: 0
            }}
          >
            1
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </AdminLayout>
  );
};

export default Screen;
