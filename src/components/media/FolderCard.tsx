import { FolderFilled, MoreOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import "../../styles/common.css";

interface FolderCardProps {
  name: string;
  itemCount: number;
  onClick: () => void;
  onRename?: () => void;
  onDelete?: () => void;
}

const FolderCard = ({ name, itemCount, onClick, onRename, onDelete }: FolderCardProps) => {
  const menuItems: MenuProps["items"] = [
    { key: "rename", label: "Rename", onClick: onRename },
    { key: "delete", label: "Delete", danger: true, onClick: onDelete },
  ];

  return (
    <div 
      className="folder-item group" 
      onClick={onClick}
      style={{
        opacity: 1,
        transition: "opacity 0.2s, background-color 0.2s"
      }}
      onMouseEnter={(e) => {
        const dropdown = e.currentTarget.querySelector('[data-dropdown]') as HTMLElement;
        if (dropdown) dropdown.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const dropdown = e.currentTarget.querySelector('[data-dropdown]') as HTMLElement;
        if (dropdown) dropdown.style.opacity = "0";
      }}
    >
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center" 
        style={{ backgroundColor: "hsla(var(--primary), 0.1)" }}
      >
        <FolderFilled 
          className="text-2xl" 
          style={{ color: "hsl(var(--primary))" }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 
          className="font-medium truncate" 
          style={{ color: "hsl(var(--foreground))" }}
        >
          {name}
        </h3>
        <p 
          className="text-sm" 
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          {itemCount} items
        </p>
      </div>
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <div
          className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-secondary transition-all"
          style={{ opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          data-dropdown
        >
          <MoreOutlined 
            style={{ color: "hsl(var(--muted-foreground))" }}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default FolderCard;
