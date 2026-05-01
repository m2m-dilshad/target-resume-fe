'use client';

import React, { useId } from 'react';
import { useState, useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadBoxProps {
  title: string;
  description: string;
  accept?: string;
  onFileSelect?: (file: File | null) => void;
  className?: string;
}

export function UploadBox({
  title,
  description,
  accept = '.pdf,.docx,.doc',
  onFileSelect,
  className,
}: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputId = useId();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    },
    [onFileSelect]
  );

  const handleRemove = useCallback(() => {
    setSelectedFile(null);
    onFileSelect?.(null);
  }, [onFileSelect]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const input = document.getElementById(inputId);
        input?.click();
      }
    },
    [inputId]
  );

  return (
    <div
      className={cn(
        'relative rounded-lg border-2 border-dashed p-8 transition-colors',
        isDragging
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50 focus-within:border-primary focus-within:ring-ring focus-within:ring-2 focus-within:ring-offset-2',
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="region"
      aria-label={`File upload: ${title}`}
    >
      {selectedFile ? (
        <div className="flex items-center justify-between" role="status" aria-live="polite">
          <div className="flex items-center gap-3">
            <div
              className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg"
              aria-hidden="true"
            >
              <FileText className="text-primary h-5 w-5" />
            </div>
            <div>
              <p className="text-foreground font-medium">{selectedFile.name}</p>
              <p className="text-muted-foreground text-sm">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="hover:bg-muted focus-visible:outline-ring rounded-full p-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label={`Remove file: ${selectedFile.name}`}
          >
            <X className="text-muted-foreground h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="flex cursor-pointer flex-col items-center gap-3"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-describedby={`${inputId}-description`}
        >
          <div
            className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-full"
            aria-hidden="true"
          >
            <Upload className="text-primary h-6 w-6" />
          </div>
          <div className="text-center">
            <p className="text-foreground font-medium">{title}</p>
            <p id={`${inputId}-description`} className="text-muted-foreground text-sm">
              {description}
            </p>
          </div>
          <input
            id={inputId}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="sr-only"
            aria-describedby={`${inputId}-description`}
          />
        </label>
      )}
    </div>
  );
}
