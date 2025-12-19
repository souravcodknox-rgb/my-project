import { useState } from "react";
import { Table, DatePicker, Select, Tag, Button } from "antd";
import { DownloadOutlined, FilterOutlined, PlayCircleOutlined, DesktopOutlined } from "@ant-design/icons";
import AdminLayout from "../components/layout/AdminLayout";
import type { ColumnsType } from "antd/es/table";
import "../styles/common.css";

const { RangePicker } = DatePicker;

interface LogData {
  key: string;
  timestamp: string;
  screen: string;
  playlist: string;
  video: string;
  duration: string;
  status: "completed" | "interrupted" | "skipped";
}

const logData: LogData[] = [
  {
    key: "1",
    timestamp: "2024-01-15 14:30:22",
    screen: "Lobby Display",
    playlist: "Welcome Playlist",
    video: "Company Overview.mp4",
    duration: "2:30",
    status: "completed",
  },
  {
    key: "2",
    timestamp: "2024-01-15 14:27:52",
    screen: "Lobby Display",
    playlist: "Welcome Playlist",
    video: "Product Demo.mp4",
    duration: "3:45",
    status: "completed",
  },
  {
    key: "3",
    timestamp: "2024-01-15 14:25:00",
    screen: "Conference Room B",
    playlist: "Meeting Content",
    video: "Q1 Results.mp4",
    duration: "1:20",
    status: "interrupted",
  },
  {
    key: "4",
    timestamp: "2024-01-15 14:20:15",
    screen: "Cafeteria Screen",
    playlist: "Menu & Announcements",
    video: "Daily Menu.mp4",
    duration: "0:45",
    status: "completed",
  },
  {
    key: "5",
    timestamp: "2024-01-15 14:15:30",
    screen: "Reception Display",
    playlist: "Company Overview",
    video: "Team Introduction.mp4",
    duration: "0:00",
    status: "skipped",
  },
  {
    key: "6",
    timestamp: "2024-01-15 14:10:00",
    screen: "Training Room",
    playlist: "Training Videos",
    video: "Safety Guidelines.mp4",
    duration: "4:00",
    status: "completed",
  },
];

const statusConfig = {
  completed: { color: "success", text: "Completed" },
  interrupted: { color: "warning", text: "Interrupted" },
  skipped: { color: "error", text: "Skipped" },
};

const PlaybackLog = () => {
  const [filteredScreen, setFilteredScreen] = useState<string | null>(null);


  const columns: ColumnsType<LogData> = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (time) => (
        <span 
          style={{ 
            fontFamily: "monospace",
            fontSize: "0.875rem",
            color: "hsl(var(--foreground))" 
          }}
        >
          {time}
        </span>
      ),
    },
    {
      title: "Screen",
      dataIndex: "screen",
      key: "screen",
      render: (screen) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <DesktopOutlined 
            style={{ color: "hsl(var(--muted-foreground))" }}
          />
          <span 
            style={{ color: "hsl(var(--foreground))" }}
          >
            {screen}
          </span>
        </div>
      ),
    },
    {
      title: "Playlist",
      dataIndex: "playlist",
      key: "playlist",
      render: (playlist) => (
        <Tag color="blue" style={{ display: "flex", alignItems: "center", gap: "0.25rem", width: "fit-content" }}>
          <PlayCircleOutlined />
          {playlist}
        </Tag>
      ),
    },
    {
      title: "Video",
      dataIndex: "video",
      key: "video",
      render: (video) => (
        <span 
          style={{ color: "hsl(var(--foreground))" }}
        >
          {video}
        </span>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => (
        <span 
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          {duration}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: keyof typeof statusConfig) => (
        <Tag color={statusConfig[status].color}>{statusConfig[status].text}</Tag>
      ),
    },
  ];

  const uniqueScreens = [...new Set(logData.map((log) => log.screen))];


  return (
    <AdminLayout title="Playback Log" subtitle="View playback history across all screens">
      {/* Filters */}
      <div className="admin-card" style={{ padding: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FilterOutlined 
              style={{ color: "hsl(var(--muted-foreground))" }}
            />
            <span 
              style={{ 
                fontWeight: "500",
                color: "hsl(var(--foreground))" 
              }}
            >
              Filters:
            </span>
          </div>
          
          <RangePicker style={{ width: "16rem" }} />
          
          <Select
            placeholder="Select Screen"
            allowClear
            style={{ width: "12rem" }}
            value={filteredScreen}
            onChange={setFilteredScreen}
            options={uniqueScreens.map((screen) => ({
              value: screen,
              label: screen,
            }))}
          />

          <Select
            placeholder="Status"
            allowClear
            style={{ width: "9rem" }}
            options={[
              { value: "completed", label: "Completed" },
              { value: "interrupted", label: "Interrupted" },
              { value: "skipped", label: "Skipped" },
            ]}
          />

          <div style={{ marginLeft: "auto" }}>
            <Button icon={<DownloadOutlined />}>Export CSV</Button>
          </div>
        </div>
      </div>


      {/* Stats */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))", 
        gap: "1rem", 
        marginBottom: "1.5rem" 
      }}>
        <div className="admin-card" style={{ padding: "1rem" }}>
          <p 
            style={{ 
              fontSize: "0.875rem",
              color: "hsl(var(--muted-foreground))" 
            }}
          >
            Total Plays
          </p>
          <p 
            style={{ 
              fontSize: "1.875rem", 
              fontWeight: "700", 
              marginTop: "0.25rem",
              color: "hsl(var(--foreground))" 
            }}
          >
            1,247
          </p>
          <p 
            style={{ 
              fontSize: "0.75rem", 
              marginTop: "0.25rem",
              color: "hsl(var(--success))" 
            }}
          >
            ↑ 12% from yesterday
          </p>
        </div>
        <div className="admin-card" style={{ padding: "1rem" }}>
          <p 
            style={{ 
              fontSize: "0.875rem",
              color: "hsl(var(--muted-foreground))" 
            }}
          >
            Completed
          </p>
          <p 
            style={{ 
              fontSize: "1.875rem", 
              fontWeight: "700", 
              marginTop: "0.25rem",
              color: "hsl(var(--success))" 
            }}
          >
            1,180
          </p>
          <p 
            style={{ 
              fontSize: "0.75rem", 
              marginTop: "0.25rem",
              color: "hsl(var(--muted-foreground))" 
            }}
          >
            94.6% completion rate
          </p>
        </div>
        <div className="admin-card" style={{ padding: "1rem" }}>
          <p 
            style={{ 
              fontSize: "0.875rem",
              color: "hsl(var(--muted-foreground))" 
            }}
          >
            Interrupted
          </p>
          <p 
            style={{ 
              fontSize: "1.875rem", 
              fontWeight: "700", 
              marginTop: "0.25rem",
              color: "hsl(var(--warning))" 
            }}
          >
            52
          </p>
          <p 
            style={{ 
              fontSize: "0.75rem", 
              marginTop: "0.25rem",
              color: "hsl(var(--muted-foreground))" 
            }}
          >
            4.2% of total plays
          </p>
        </div>
        <div className="admin-card" style={{ padding: "1rem" }}>
          <p 
            style={{ 
              fontSize: "0.875rem",
              color: "hsl(var(--muted-foreground))" 
            }}
          >
            Skipped
          </p>
          <p 
            style={{ 
              fontSize: "1.875rem", 
              fontWeight: "700", 
              marginTop: "0.25rem",
              color: "hsl(var(--destructive))" 
            }}
          >
            15
          </p>
          <p 
            style={{ 
              fontSize: "0.75rem", 
              marginTop: "0.25rem",
              color: "hsl(var(--muted-foreground))" 
            }}
          >
            1.2% of total plays
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <Table
          columns={columns}
          dataSource={
            filteredScreen
              ? logData.filter((log) => log.screen === filteredScreen)
              : logData
          }
          pagination={{ pageSize: 10 }}
          className="[&_.ant-table]:bg-transparent [&_.ant-table-thead>tr>th]:bg-secondary [&_.ant-table-tbody>tr>td]:border-border"
        />
      </div>
    </AdminLayout>
  );
};

export default PlaybackLog;
