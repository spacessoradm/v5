import React, { useRef, useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import Cropper from 'react-cropper';
import ImageEditor from './ImageEditor';
import 'cropperjs/dist/cropper.css';

interface MultiImageUploaderProps {
  maxWidth: number;
  maxHeight: number;
  maxImages: number;
  onImagesUpdate: (images: string[]) => void;
  existingImages?: string[];
}

export default function MultiImageUploader({
  maxWidth,
  maxHeight,
  maxImages,
  onImagesUpdate,
  existingImages = []
}: MultiImageUploaderProps) {
  const [originalImages, setOriginalImages] = useState<string[]>([]);
  const [croppedImages, setCroppedImages] = useState<string[]>(existingImages);
  const [showCropper, setShowCropper] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const cropperRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existingImages.length > 0) {
      setCroppedImages(existingImages);
      onImagesUpdate(existingImages);
    }
  }, [existingImages, onImagesUpdate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = maxImages - croppedImages.filter(Boolean).length;
    const selectedFiles = files.slice(0, remainingSlots).filter(file => file.type.startsWith('image/'));

    const validFiles = selectedFiles.filter((file) => file.size <= 10 * 1024 * 1024);
    if (selectedFiles.length !== validFiles.length) {
      alert('Some files are too large. Please upload files smaller than 10MB.');
    }

    Promise.all(
      validFiles.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              // Pre-process image for better quality
              const img = new Image();
              img.onload = () => {
                const canvas = document.createElement('canvas');
                // Set canvas size to maintain high resolution
                const scale = Math.max(1, Math.max(maxWidth / img.width, maxHeight / img.height));
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  ctx.imageSmoothingEnabled = true;
                  ctx.imageSmoothingQuality = 'high';
                  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                  resolve(canvas.toDataURL('image/jpeg', 1.0));
                } else {
                  resolve(reader.result as string);
                }
              };
              img.src = reader.result as string;
            };
            reader.readAsDataURL(file);
          })
      )
    ).then((results) => {
      setOriginalImages((prev) => [...prev, ...results]);
      setCroppedImages((prev) => [...prev, ...Array(results.length).fill('')]);
      setCurrentImageIndex(croppedImages.length);
      setShowCropper(true);
    });

    e.target.value = '';
  };

  const handleCrop = () => {
    if (cropperRef.current && currentImageIndex !== null) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
        width: maxWidth * 2, // Double the size for better quality
        height: maxHeight * 2,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high',
      });

      const croppedImageURL = croppedCanvas.toDataURL('image/jpeg', 1.0);
      setCroppedImages((prev) => {
        const newImages = [...prev];
        newImages[currentImageIndex] = croppedImageURL;
        return newImages;
      });

      const nextIndex = originalImages.findIndex((_, i) => i > currentImageIndex && !croppedImages[i]);
      if (nextIndex !== -1) {
        setCurrentImageIndex(nextIndex);
      } else {
        setShowCropper(false);
        setCurrentImageIndex(null);
      }

      const newImages = [...croppedImages];
      newImages[currentImageIndex] = croppedImageURL;
      onImagesUpdate(newImages.filter(Boolean));
    }
  };

  const handleImageUpdate = (editedImage: string, index: number) => {
    setCroppedImages((prev) => {
      const newImages = [...prev];
      newImages[index] = editedImage;
      onImagesUpdate(newImages.filter(Boolean));
      return newImages;
    });
  };

  const removeImage = (index: number) => {
    setOriginalImages((prev) => prev.filter((_, i) => i !== index));
    setCroppedImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      onImagesUpdate(newImages.filter(Boolean));
      return newImages;
    });
  };

  return (
    <div className="space-y-6">
      {croppedImages.filter(Boolean).length < maxImages && !showCropper && (
        <div className="flex justify-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full max-w-md p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors"
          >
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-600">Upload Images</span>
            <span className="mt-1 text-xs text-gray-400">
              {maxImages - croppedImages.filter(Boolean).length} images remaining
            </span>
          </button>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />

      {showCropper && currentImageIndex !== null && (
        <div className="space-y-4">
          <Cropper
            ref={cropperRef}
            src={originalImages[currentImageIndex]}
            style={{ height: 400, width: '100%' }}
            aspectRatio={maxWidth / maxHeight}
            guides={true}
            viewMode={2}
            dragMode="move"
            background={false}
            cropBoxMovable={true}
            cropBoxResizable={true}
            minCropBoxWidth={100}
            minCropBoxHeight={100}
            responsive={true}
            checkOrientation={false}
            autoCropArea={1}
            checkCrossOrigin={false}
            scalable={true}
            zoomable={true}
            zoomOnTouch={true}
            zoomOnWheel={true}
            wheelZoomRatio={0.1}
            toggleDragModeOnDblclick={true}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Image {currentImageIndex + 1} of {originalImages.length}
            </span>
            <button
              onClick={handleCrop}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Confirm Crop
            </button>
          </div>
        </div>
      )}

      {croppedImages.filter(Boolean).length > 0 && !showCropper && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {croppedImages.map((image, index) => (
            image && (
              <div key={index} className="relative">
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 z-10 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
                <ImageEditor
                  image={image}
                  originalImage={originalImages[index] || image}
                  onUpdate={(editedImage) => handleImageUpdate(editedImage, index)}
                  maxWidth={maxWidth}
                  maxHeight={maxHeight}
                />
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}