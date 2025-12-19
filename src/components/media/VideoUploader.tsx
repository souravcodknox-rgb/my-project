import { useState, useRef } from "react";
import { Upload, Progress, message } from "antd";
import { CloudUploadOutlined, VideoCameraOutlined, DeleteOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";

interface VideoUploaderProps {
  folderId: string;
  onUploadComplete?: (file: UploadFile) => void;
}

interface VideoInfo {
  file: File;
  duration: number;
  preview: string;
}

const MAX_DURATION_SECONDS = 240; // 4 minutes folderId

const VideoUploader = ({  onUploadComplete }: VideoUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const validateVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        
        if (duration > MAX_DURATION_SECONDS) {
          reject(
            new Error(
              `Video duration (${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, "0")}) exceeds maximum allowed duration of 4 minutes`
            )
          );
        } else {
          resolve(duration);
        }
      };

      video.onerror = () => {
        reject(new Error("Failed to load video file"));
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (file: File) => {
    setError(null);
    setVideoInfo(null);

    if (!file.type.startsWith("video/")) {
      setError("Please select a valid video file");
      return false;
    }

    try {
      const duration = await validateVideoDuration(file);
      const preview = URL.createObjectURL(file);
      
      setVideoInfo({
        file,
        duration,
        preview,
      });

      return false; // Prevent auto upload
    } catch (err) {
      setError((err as Error).message);
      message.error((err as Error).message);
      return false;
    }
  };

  const handleUpload = async () => {
    if (!videoInfo) return;

    setUploading(true);
    setProgress(0);

    // Simulating upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setUploading(false);
      message.success("Video uploaded successfully!");
      
      if (onUploadComplete) {
        onUploadComplete({
          uid: Date.now().toString(),
          name: videoInfo.file.name,
          status: "done",
          size: videoInfo.file.size,
        });
      }

      // Reset after success
      setTimeout(() => {
        setVideoInfo(null);
        setProgress(0);
      }, 1000);
    }, 2500);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const clearVideo = () => {
    if (videoInfo?.preview) {
      URL.revokeObjectURL(videoInfo.preview);
    }
    setVideoInfo(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {!videoInfo ? (
        <Upload.Dragger
          accept="video/*"
          showUploadList={false}
          beforeUpload={handleFileSelect}
          className="upload-zone"
        >
          <div className="py-8">
            <CloudUploadOutlined className="text-5xl text-primary mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">
              Drop video file here or click to upload
            </p>
            <p className="text-muted-foreground">
              Maximum duration: 4 minutes | Supported formats: MP4, WebM, MOV
            </p>
          </div>
        </Upload.Dragger>
      ) : (
        <div className="admin-card p-4">
          <div className="flex gap-4">
            {/* Video Preview */}
            <div className="w-48 h-28 rounded-lg overflow-hidden bg-foreground/5 shrink-0">
              <video
                ref={videoRef}
                src={videoInfo.preview}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-foreground truncate">
                    {videoInfo.file.name}
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <VideoCameraOutlined />
                      {formatDuration(videoInfo.duration)}
                    </span>
                    <span>{formatFileSize(videoInfo.file.size)}</span>
                  </div>
                </div>
                <button
                  onClick={clearVideo}
                  className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-destructive/10 text-destructive transition-colors"
                >
                  <DeleteOutlined />
                </button>
              </div>

              {uploading && (
                <div className="mt-4">
                  <Progress percent={progress} status="active" />
                </div>
              )}

              {!uploading && (
                <button
                  onClick={handleUpload}
                  className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Upload to S3
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
