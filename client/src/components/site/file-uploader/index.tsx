import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Upload, X, FileText, ImageIcon, Maximize2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "react-toastify";

interface FileUploaderProps {
	onFileUpload: (file: File | null) => void;
	preview?: string | null;
	accept?: string;
	maxSize?: number; // in MB
}

export function FileUploader({
	onFileUpload,
	preview,
	accept = "*",
	maxSize = 10,
}: FileUploaderProps) {
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File>();
	const [fileType, setFileType] = useState<string>();

	useEffect(() => {
		// Clean up the URL when component unmounts or when file changes
		return () => {
			if (preview) {
				URL.revokeObjectURL(preview);
			}
		};
	}, [preview]);

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const validateFile = (file: File): boolean => {
		// Check file size
		if (file.size > maxSize * 1024 * 1024) {
			toast.error(`File size should not exceed ${maxSize}MB`);
			return false;
		}

		// Check file type if accept is specified
		if (accept !== "*") {
			const acceptedTypes = accept.split(",").map((type) => type.trim());
			const fileType = file.type;

			// Check if the file type matches any of the accepted types
			const isAccepted = acceptedTypes.some((type) => {
				if (type.includes("*")) {
					// Handle wildcard types like "image/*"
					return fileType.startsWith(type.split("*")[0]);
				}
				return type === fileType;
			});

			if (!isAccepted) {
				toast.error(`Please upload a file of type: ${accept}`);
				return false;
			}
		}

		return true;
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const droppedFile = e.dataTransfer.files[0];
			if (validateFile(droppedFile)) {
				onFileUpload(droppedFile);
			}
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];
			if (validateFile(selectedFile)) {
				setFile(selectedFile);
				setFileType(selectedFile.type);
				onFileUpload(selectedFile);
			}
		}
	};

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleRemoveFile = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent triggering the parent div's onClick
		onFileUpload(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const formatFileSize = (bytes: number): string => {
		if (bytes < 1024) return bytes + " B";
		else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
		else return (bytes / 1048576).toFixed(1) + " MB";
	};

	return (
		<div className="space-y-4">
			{!preview ? (
				<div
					className={cn(
						"border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer",
						isDragging
							? "border-primary bg-primary/5"
							: "border-muted-foreground/25"
					)}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					onClick={handleButtonClick}>
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileChange}
						className="hidden"
						accept={accept}
					/>
					<Upload className="h-10 w-10 mb-2 text-muted-foreground" />
					<p className="text-sm text-center text-muted-foreground mb-1">
						Drag & drop your file here
					</p>
					<p className="text-xs text-center text-muted-foreground">
						or click to browse
					</p>
					<p className="text-xs text-center text-muted-foreground mt-2">
						Max file size: {maxSize}MB
					</p>
				</div>
			) : (
				<div className="relative group">
					{/* File preview card with hover effect */}
					<div className="bg-background rounded-lg shadow-sm border overflow-hidden transition-all duration-200 group-hover:shadow-md ">
						{/* Preview area */}
						{fileType?.startsWith("image/") && preview ? (
							<div className="relative">
								<div className="aspect-[16/9] w-full overflow-hidden bg-muted/30 max-h-[100px]">
									<img
										src={preview || "/placeholder.svg"}
										alt="Document preview"
										className="object-contain w-full h-full"
									/>
								</div>

								{/* Fullscreen preview dialog */}
								<Dialog>
									<DialogTrigger asChild>
										<Button
											variant="ghost"
											size="icon"
											className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-80 hover:opacity-100 transition-opacity">
											<Maximize2 className="h-4 w-4" />
											<span className="sr-only">
												View full size
											</span>
										</Button>
									</DialogTrigger>
									<DialogContent className="max-w-4xl">
										<div className="aspect-auto max-h-[80vh] w-full overflow-hidden">
											<img
												src={
													preview ||
													"/placeholder.svg"
												}
												alt="Document preview"
												className="object-contain w-full h-full"
											/>
										</div>
									</DialogContent>
								</Dialog>
							</div>
						) : (
							<div className="aspect-[16/9] w-full flex items-center justify-center bg-muted/30 p-6">
								{fileType === "application/pdf" ? (
									<div className="flex flex-col items-center justify-center">
										<FileText className="h-12 w-12 text-primary/70 mb-2" />
										<p className="text-sm font-medium text-center">
											PDF Document
										</p>
									</div>
								) : (
									<div className="flex flex-col items-center justify-center">
										<FileText className="h-12 w-12 text-primary/70 mb-2" />
										<p className="text-sm font-medium text-center">
											File Uploaded
										</p>
									</div>
								)}
							</div>
						)}

						{/* File info footer */}
						<div className="p-3 bg-background border-t flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
									{fileType?.startsWith("image/") ? (
										<ImageIcon className="h-5 w-5 text-primary" />
									) : (
										<FileText className="h-5 w-5 text-primary" />
									)}
								</div>
								<div className="flex flex-col">
									<span className="text-sm font-medium truncate max-w-[180px]">
										{file?.name}
									</span>
									<span className="text-xs text-muted-foreground">
										{file ? formatFileSize(file.size) : ""}
									</span>
								</div>
							</div>
							<div className="flex items-center space-x-1">
								<Button
									variant="ghost"
									size="sm"
									className="h-8 text-xs"
									onClick={handleButtonClick}>
									Change
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
									onClick={handleRemoveFile}>
									<X className="h-4 w-4" />
									<span className="sr-only">Remove file</span>
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
