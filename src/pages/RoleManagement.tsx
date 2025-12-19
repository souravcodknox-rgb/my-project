import { useState } from "react";
import { Table, Tag, Button, Modal, Input, Select, Space, Avatar, message } from "antd";
import { PlusOutlined, UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminLayout from "../components/layout/AdminLayout";
import type { ColumnsType } from "antd/es/table";
import "../styles/common.css";

interface UserData {
  key: string;
  name: string;
  email: string;
  role: "admin" | "operator" | "client";
  status: "active" | "inactive";
  lastActive: string;
}

const initialUsers: UserData[] = [
  {
    key: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "admin",
    status: "active",
    lastActive: "Just now",
  },
  {
    key: "2",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    role: "operator",
    status: "active",
    lastActive: "5 min ago",
  },
  {
    key: "3",
    name: "Mike Wilson",
    email: "m.wilson@client.com",
    role: "client",
    status: "active",
    lastActive: "1 hour ago",
  },
  {
    key: "4",
    name: "Emily Brown",
    email: "emily.b@company.com",
    role: "operator",
    status: "inactive",
    lastActive: "3 days ago",
  },
  {
    key: "5",
    name: "David Lee",
    email: "d.lee@client.com",
    role: "client",
    status: "active",
    lastActive: "2 hours ago",
  },
];

const roleColors = {
  admin: "red",
  operator: "blue",
  client: "green",
};

const roleDescriptions = {
  admin: "Full system access",
  operator: "Manage content & screens",
  client: "View assigned content",
};

const RoleManagement = () => {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "client" as const });

  const createUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      message.error("Please fill in all fields");
      return;
    }

    const user: UserData = {
      key: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      lastActive: "Just now",
    };

    setUsers([user, ...users]);
    setNewUser({ name: "", email: "", role: "client" });
    setIsModalOpen(false);
    message.success("User created successfully!");
  };

  const deleteUser = (key: string) => {
    setUsers(users.filter((u) => u.key !== key));
    message.success("User deleted");
  };


  const columns: ColumnsType<UserData> = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Avatar 
            icon={<UserOutlined />} 
            style={{ backgroundColor: "hsl(var(--primary))" }}
          />
          <div>
            <p 
              style={{ 
                fontWeight: "500",
                color: "hsl(var(--foreground))" 
              }}
            >
              {name}
            </p>
            <p 
              style={{ 
                fontSize: "0.875rem",
                color: "hsl(var(--muted-foreground))" 
              }}
            >
              {record.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: keyof typeof roleColors) => (
        <div>
          <Tag color={roleColors[role]} style={{ textTransform: "capitalize" }}>
            {role}
          </Tag>
          <p 
            style={{ 
              fontSize: "0.75rem", 
              marginTop: "0.25rem",
              color: "hsl(var(--muted-foreground))" 
            }}
          >
            {roleDescriptions[role]}
          </p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "success" : "default"} style={{ textTransform: "capitalize" }}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
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
          <Button
            size="small"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteUser(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout title="Role Management" subtitle="Manage users and their access levels">

      {/* Role Overview Cards */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))", 
        gap: "1rem", 
        marginBottom: "1.5rem" 
      }}>
        <div 
          className="admin-card" 
          style={{ padding: "1rem", borderLeft: "4px solid hsl(var(--destructive))" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p 
                style={{ 
                  fontSize: "0.875rem",
                  color: "hsl(var(--muted-foreground))" 
                }}
              >
                Admins
              </p>
              <p 
                style={{ 
                  fontSize: "1.5rem", 
                  fontWeight: "700",
                  color: "hsl(var(--foreground))" 
                }}
              >
                {users.filter((u) => u.role === "admin").length}
              </p>
            </div>
            <Tag color="red">Full Access</Tag>
          </div>
        </div>
        <div 
          className="admin-card" 
          style={{ padding: "1rem", borderLeft: "4px solid hsl(var(--primary))" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p 
                style={{ 
                  fontSize: "0.875rem",
                  color: "hsl(var(--muted-foreground))" 
                }}
              >
                Operators
              </p>
              <p 
                style={{ 
                  fontSize: "1.5rem", 
                  fontWeight: "700",
                  color: "hsl(var(--foreground))" 
                }}
              >
                {users.filter((u) => u.role === "operator").length}
              </p>
            </div>
            <Tag color="blue">Content Manager</Tag>
          </div>
        </div>
        <div 
          className="admin-card" 
          style={{ padding: "1rem", borderLeft: "4px solid hsl(var(--success))" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p 
                style={{ 
                  fontSize: "0.875rem",
                  color: "hsl(var(--muted-foreground))" 
                }}
              >
                Clients
              </p>
              <p 
                style={{ 
                  fontSize: "1.5rem", 
                  fontWeight: "700",
                  color: "hsl(var(--foreground))" 
                }}
              >
                {users.filter((u) => u.role === "client").length}
              </p>
            </div>
            <Tag color="green">View Only</Tag>
          </div>
        </div>
      </div>


      {/* Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <Select
          placeholder="Filter by role"
          allowClear
          style={{ width: "10rem" }}
          options={[
            { value: "admin", label: "Admin" },
            { value: "operator", label: "Operator" },
            { value: "client", label: "Client" },
          ]}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Add User
        </Button>
      </div>

      {/* Table */}
      <div className="admin-card">
        <Table
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 10 }}
          className="[&_.ant-table]:bg-transparent [&_.ant-table-thead>tr>th]:bg-secondary [&_.ant-table-tbody>tr>td]:border-border"
        />
      </div>

      {/* Add User Modal */}
      <Modal
        title="Add New User"
        open={isModalOpen}
        onOk={createUser}
        onCancel={() => {
          setIsModalOpen(false);
          setNewUser({ name: "", email: "", role: "client" });
        }}
        okText="Create"
      >

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem 0" }}>
          <div>
            <label 
              style={{ 
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                marginBottom: "0.5rem",
                color: "hsl(var(--foreground))" 
              }}
            >
              Name
            </label>
            <Input
              placeholder="Enter full name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div>
            <label 
              style={{ 
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                marginBottom: "0.5rem",
                color: "hsl(var(--foreground))" 
              }}
            >
              Email
            </label>
            <Input
              placeholder="Enter email address"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
          <div>
            <label 
              style={{ 
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                marginBottom: "0.5rem",
                color: "hsl(var(--foreground))" 
              }}
            >
              Role
            </label>
            <Select
              value={newUser.role}
              onChange={(role) => setNewUser({ ...newUser, role })}
              style={{ width: "100%" }}
              options={[
                { value: "admin", label: "Admin - Full system access" },
                { value: "operator", label: "Operator - Manage content & screens" },
                { value: "client", label: "Client - View assigned content" },
              ]}
            />
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default RoleManagement;
