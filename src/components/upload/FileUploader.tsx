import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  error?: string;
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  modifiedAt: Date;
  isFolder: boolean;
  folderId: string | null;
}

const FileUploader = () => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    setUploadedFiles(existing);
  }, []);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).map(file => ({
      id: `${file.name}-${Date.now()}`,
      file,
      progress: 0,
      status: 'uploading' as const
    }));

    setUploadingFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach(fileObj => simulateFileUpload(fileObj.id, fileObj.file));
  };

  const simulateFileUpload = (fileId: string, file: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setUploadingFiles(prev =>
          prev.map(f => f.id === fileId ? { ...f, progress: 100, status: 'complete' } : f)
        );

        const folderId = file.type === 'application/pdf' ? '1'
                        : file.type === 'image/jpeg' ? '2'
                        : null;

        const fileData: UploadedFile = {
          id: fileId,
          name: file.name,
          type: file.type,
          size: file.size,
          modifiedAt: new Date(),
          isFolder: false,
          folderId
        };

        const updatedFiles = [...uploadedFiles, fileData];
        localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
        setUploadedFiles(updatedFiles);

        toast.success("File uploaded successfully");

        setTimeout(() => {
          setUploadingFiles(prev => prev.filter(f => f.id !== fileId));
        }, 2000);
      }

      setUploadingFiles(prev =>
        prev.map(f => f.id === fileId ? { ...f, progress } : f)
      );
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const getTotalProgress = () => {
    if (uploadingFiles.length === 0) return 0;
    return uploadingFiles.reduce((sum, f) => sum + f.progress, 0) / uploadingFiles.length;
  };

  const removeFile = (fileId: string) => {
    setUploadingFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center ${
          isDragging ? 'border-primary bg-primary/5' : 'border-muted'
        } transition-colors`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
          <Upload size={28} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Drag and drop files</h3>
        <p className="text-muted-foreground mb-6">
          or click to browse from your computer
        </p>
        <Button onClick={() => fileInputRef.current?.click()}>Select Files</Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>

      {uploadingFiles.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Uploading Files</h3>
            <p className="text-sm text-muted-foreground">
              {Math.round(getTotalProgress())}% complete
            </p>
          </div>
          <Progress value={getTotalProgress()} className="mb-4" />
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {uploadingFiles.map(file => (
              <div key={file.id} className="flex items-center justify-between border rounded-md p-3">
                <div className="flex items-center">
                  {file.status === 'complete' ? (
                    <CheckCircle size={18} className="text-green-500 mr-3" />
                  ) : (
                    <div className="h-5 w-5 mr-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  )}
                  <div>
                    <p className="font-medium text-sm truncate max-w-xs">{file.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-xs mr-4">{Math.round(file.progress)}%</p>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)}>
                    <X size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
