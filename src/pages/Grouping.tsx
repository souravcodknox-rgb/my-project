import { useState } from "react";
import { Button, Modal, Input, Card, Tag, Empty, message } from "antd";
import { PlusOutlined, GroupOutlined, DesktopOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AdminLayout from "../components/layout/AdminLayout";
import "../styles/common.css";

interface Group {
  id: string;
  name: string;
  description: string;
  screens: string[];
  color: string;
}

const initialGroups: Group[] = [
  {
    id: "1",
    name: "Building A - All Floors",
    description: "All screens in Building A",
    screens: ["Lobby Display", "Conference Room B", "Training Room"],
    color: "blue",
  },
  {
    id: "2",
    name: "Reception Areas",
    description: "All reception and lobby displays",
    screens: ["Lobby Display", "Reception Display"],
    color: "green",
  },
  {
    id: "3",
    name: "Meeting Rooms",
    description: "Conference and meeting room screens",
    screens: ["Conference Room B"],
    color: "purple",
  },
];

const colorOptions = ["blue", "green", "purple", "orange", "red", "cyan"];

const Grouping = () => {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    color: "blue",
  });

  const openEditModal = (group: Group) => {
    setEditingGroup(group);
    setNewGroup({
      name: group.name,
      description: group.description,
      color: group.color,
    });
    setIsModalOpen(true);
  };

  const saveGroup = () => {
    if (!newGroup.name.trim()) {
      message.error("Please enter a group name");
      return;
    }

    if (editingGroup) {
      setGroups(
        groups.map((g) =>
          g.id === editingGroup.id
            ? { ...g, name: newGroup.name, description: newGroup.description, color: newGroup.color }
            : g
        )
      );
      message.success("Group updated successfully!");
    } else {
      const group: Group = {
        id: Date.now().toString(),
        name: newGroup.name,
        description: newGroup.description,
        screens: [],
        color: newGroup.color,
      };
      setGroups([...groups, group]);
      message.success("Group created successfully!");
    }

    setNewGroup({ name: "", description: "", color: "blue" });
    setEditingGroup(null);
    setIsModalOpen(false);
  };

  const deleteGroup = (id: string) => {
    setGroups(groups.filter((g) => g.id !== id));
    message.success("Group deleted");
  };

  return (
    <AdminLayout title="Grouping" subtitle="Organize screens into logical groups">

      {/* Actions */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingGroup(null);
            setNewGroup({ name: "", description: "", color: "blue" });
            setIsModalOpen(true);
          }}
        >
          Create Group
        </Button>
      </div>


      {/* Groups Grid */}
      {groups.length > 0 ? (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))", 
          gap: "1.5rem" 
        }}>
          {groups.map((group) => (
            <Card
              key={group.id}
              className="admin-card"
              style={{
                transition: "box-shadow 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
              }}

              title={
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{ 
                      width: "2.5rem", 
                      height: "2.5rem", 
                      borderRadius: "0.5rem", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      backgroundColor: "var(--ant-color-${group.color}-1)" 
                    }}
                  >
                    <GroupOutlined
                      style={{ fontSize: "1.125rem", color: "var(--ant-color-${group.color})" }}
                    />
                  </div>
                  <div>
                    <h3 
                      style={{ 
                        fontWeight: "600",
                        color: "hsl(var(--foreground))" 
                      }}
                    >
                      {group.name}
                    </h3>
                    <p 
                      style={{ 
                        fontSize: "0.75rem", 
                        fontWeight: "400",
                        color: "hsl(var(--muted-foreground))" 
                      }}
                    >
                      {group.screens.length} screens
                    </p>
                  </div>
                </div>
              }

              extra={
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => openEditModal(group)}
                  />
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteGroup(group.id)}
                  />
                </div>
              }
            >

              <p 
                style={{ 
                  fontSize: "0.875rem", 
                  marginBottom: "1rem",
                  color: "hsl(var(--muted-foreground))" 
                }}
              >
                {group.description}
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p 
                  style={{ 
                    fontSize: "0.75rem", 
                    fontWeight: "500", 
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "hsl(var(--foreground))" 
                  }}
                >
                  Assigned Screens
                </p>
                {group.screens.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {group.screens.map((screen) => (
                      <Tag
                        key={screen}
                        icon={<DesktopOutlined />}
                        style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
                      >
                        {screen}
                      </Tag>
                    ))}
                  </div>
                ) : (
                  <p 
                    style={{ 
                      fontSize: "0.875rem",
                      color: "hsl(var(--muted-foreground))" 
                    }}
                  >
                    No screens assigned
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>

      ) : (
        <div style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <Empty
            description={
              <div style={{ textAlign: "center" }}>
                <p 
                  style={{ 
                    marginBottom: "1rem",
                    color: "hsl(var(--muted-foreground))" 
                  }}
                >
                  No groups created yet. Create your first group to organize screens.
                </p>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Create Group
                </Button>
              </div>
            }
          />
        </div>
      )}

      {/* Create/Edit Group Modal */}
      <Modal
        title={editingGroup ? "Edit Group" : "Create New Group"}
        open={isModalOpen}
        onOk={saveGroup}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingGroup(null);
          setNewGroup({ name: "", description: "", color: "blue" });
        }}
        okText={editingGroup ? "Save" : "Create"}
      >

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "1rem", paddingBottom: "1rem" }}>
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
              Group Name
            </label>
            <Input
              placeholder="Enter group name"
              value={newGroup.name}
              onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
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
              Description
            </label>
            <Input.TextArea
              placeholder="Enter description"
              value={newGroup.description}
              onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
              rows={3}
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
              Color
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {colorOptions.map((color) => (
                <button
                  key={color}
                  onClick={() => setNewGroup({ ...newGroup, color })}
                  style={{ 
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    border: "2px solid",
                    borderColor: newGroup.color === color ? "hsl(var(--foreground))" : "transparent",
                    transform: newGroup.color === color ? "scale(1.1)" : "scale(1)",
                    transition: "all 0.2s",
                    backgroundColor: `var(--ant-color-${color})`,
                    cursor: "pointer"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default Grouping;
