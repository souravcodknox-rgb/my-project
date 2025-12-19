import { PlayCircleFilled, MoreOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import "../styles/common.css";

interface VideoCardProps {
  name: string;
  duration: string;
  thumbnail?: string;
  size: string;
  onPlay?: () => void;
  onDelete?: () => void;
}

const VideoCard = ({ name, duration, thumbnail, size, onPlay, onDelete }: VideoCardProps) => {
  const menuItems: MenuProps["items"] = [
    { key: "play", label: "Play", onClick: onPlay },
    { key: "download", label: "Download" },
    { type: "divider" },
    { key: "delete", label: "Delete", danger: true, onClick: onDelete },
  ];

  return (
    <div 
      className="admin-card overflow-hidden group cursor-pointer" 
      style={{
        transition: "box-shadow 0.2s"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative h-36 flex items-center justify-center"
        style={{ backgroundColor: "hsla(var(--foreground), 0.05)" }}
        onClick={onPlay}
      >
        {thumbnail ? (
          <img src={thumbnail} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center" 
            style={{ backgroundColor: "hsla(var(--primary), 0.1)" }}
          >
            <PlayCircleFilled 
              className="text-3xl" 
              style={{ color: "hsl(var(--primary))" }}
            />
          </div>
        )}
        
        {/* Duration Badge */}
        <div 
          className="absolute bottom-2 right-2 px-2 py-1 text-xs font-medium rounded flex items-center gap-1"
          style={{ 
            backgroundColor: "hsla(var(--foreground), 0.8)",
            color: "hsl(var(--background))"
          }}
        >
          <ClockCircleOutlined />
          {duration}
        </div>

        {/* Play Overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: "hsla(var(--foreground), 0.5)" }}
        >
          <PlayCircleFilled 
            className="text-5xl" 
            style={{ color: "hsl(var(--background))" }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h4 
              className="font-medium truncate" 
              style={{ color: "hsl(var(--foreground))" }}
            >
              {name}
            </h4>
            <p 
              className="text-sm mt-1" 
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {size}
            </p>
          </div>
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-secondary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreOutlined 
                style={{ color: "hsl(var(--muted-foreground))" }}
              />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
