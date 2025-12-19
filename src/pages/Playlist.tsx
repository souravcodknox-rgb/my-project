import { useState } from "react";
import { Table, Tag, Button, Modal, Input, Select, Space, message } from "antd";
import { PlusOutlined, PlayCircleOutlined, EditOutlined, DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import AdminLayout from "../components/layout/AdminLayout";
import type { ColumnsType } from "antd/es/table";
import "../styles/common.css";

interface PlaylistData {
  key: string;
  name: string;
  videos: number;
  totalDuration: string;
  status: "active" | "draft" | "scheduled";
  assignedScreens: number;
  lastModified: string;
}

const initialData: PlaylistData[] = [
  {
    key: "1",
    name: "Welcome Playlist",
    videos: 5,
    totalDuration: "12:30",
    status: "active",
    assignedScreens: 3,
    lastModified: "2 hours ago",
  },
  {
    key: "2",
    name: "Product Showcase",
    videos: 8,
    totalDuration: "18:45",
    status: "active",
    assignedScreens: 5,
    lastModified: "1 day ago",
  },
  {
    key: "3",
    name: "Holiday Campaign",
    videos: 4,
    totalDuration: "8:20",
    status: "scheduled",
    assignedScreens: 0,
    lastModified: "3 days ago",
  },
  {
    key: "4",
    name: "Training Videos",
    videos: 12,
    totalDuration: "35:00",
    status: "active",
    assignedScreens: 2,
    lastModified: "5 hours ago",
  },
  {
    key: "5",
    name: "New Product Launch",
    videos: 3,
    totalDuration: "6:15",
    status: "draft",
    assignedScreens: 0,
    lastModified: "Just now",
  },
];

const statusColors = {
  active: "success",
  draft: "default",
  scheduled: "processing",
};

const Playlist = () => {
  const [data, setData] = useState<PlaylistData[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"active" | "draft" | "scheduled">("draft");

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) {
      message.error("Please enter a playlist name");
      return;
    }

    const newPlaylist: PlaylistData = {
      key: Date.now().toString(),
      name: newPlaylistName,
      videos: 0,
      totalDuration: "0:00",
      status: selectedStatus,
      assignedScreens: 0,
      lastModified: "Just now",
    };

    setData([newPlaylist, ...data]);
    setNewPlaylistName("");
    setSelectedStatus("draft");
    setIsModalOpen(false);
    message.success("Playlist created successfully!");
  };

  const deletePlaylist = (key: string) => {
    setData(data.filter((item) => item.key !== key));
    message.success("Playlist deleted");
  };

  const columns: ColumnsType<PlaylistData> = [
    {
      title: "Playlist",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center" 
            style={{ backgroundColor: "hsla(var(--primary), 0.1)" }}
          >
            <PlayCircleOutlined 
              className="text-lg" 
              style={{ color: "hsl(var(--primary))" }}
            />
          </div>
          <div>
            <p 
              className="font-medium" 
              style={{ color: "hsl(var(--foreground))" }}
            >
              {name}
            </p>
            <p 
              className="text-sm" 
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {record.videos} videos • {record.totalDuration}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: keyof typeof statusColors) => (
        <Tag color={statusColors[status]} className="capitalize">
          {status}
        </Tag>
      ),
    },
    {
      title: "Assigned Screens",
      dataIndex: "assignedScreens",
      key: "assignedScreens",
      render: (count) => (
        <span 
          style={{ 
            color: count > 0 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" 
          }}
        >
          {count} {count === 1 ? "screen" : "screens"}
        </span>
      ),
    },
    {
      title: "Last Modified",
      dataIndex: "lastModified",
      key: "lastModified",
      render: (time) => (
        <span 
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          {time}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button size="small" icon={<CopyOutlined />}>
            Duplicate
          </Button>
          <Button
            size="small"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deletePlaylist(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout title="Playlists" subtitle="Create and manage video playlists">
      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Select
            placeholder="Filter by status"
            allowClear
            className="w-40"
            options={[
              { value: "active", label: "Active" },
              { value: "draft", label: "Draft" },
              { value: "scheduled", label: "Scheduled" },
            ]}
          />
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Create Playlist
        </Button>
      </div>

      {/* Table */}
      <div className="admin-card">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          className="[&_.ant-table]:bg-transparent [&_.ant-table-thead>tr>th]:bg-secondary [&_.ant-table-tbody>tr>td]:border-border"
        />
      </div>

      {/* Create Playlist Modal */}
      <Modal
        title="Create New Playlist"
        open={isModalOpen}
        onOk={createPlaylist}
        onCancel={() => {
          setIsModalOpen(false);
          setNewPlaylistName("");
        }}
        okText="Create"
      >
        <div className="space-y-4 py-4">
          <div>
            <label 
              className="block text-sm font-medium mb-2" 
              style={{ color: "hsl(var(--foreground))" }}
            >
              Playlist Name
            </label>
            <Input
              placeholder="Enter playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <label 
              className="block text-sm font-medium mb-2" 
              style={{ color: "hsl(var(--foreground))" }}
            >
              Initial Status
            </label>
            <Select
              value={selectedStatus}
              onChange={setSelectedStatus}
              className="w-full"
              options={[
                { value: "draft", label: "Draft" },
                { value: "active", label: "Active" },
                { value: "scheduled", label: "Scheduled" },
              ]}
            />
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default Playlist;
