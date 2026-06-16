import React, { useRef } from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import axios from 'axios';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

async function uploadToCloudinary(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'Retrust_Images'); // e.g., 'retrust_unsigned'
  const res = await axios.post(
    'https://api.cloudinary.com/v1_1/dez3vx8pi/image/upload',
    data
  );
  return res.data.secure_url; // This is the image URL to save in your DB
}

const ImageUploader = ({ images, setImages, loading, setLoading }) => {
  const fileInput = useRef();

  const handleFiles = async (files) => {
    setLoading(true);
    try {
      const fileArr = Array.from(files);
      // Upload all files to Cloudinary
      const uploadPromises = fileArr.map(file => uploadToCloudinary(file));
      const urls = await Promise.all(uploadPromises);
      setImages([...(images || []), ...urls.map(url => ({ url }))]);
    } catch (err) {
      console.error('Cloudinary upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    await handleFiles(e.dataTransfer.files);
  };

  const handleChange = async (e) => {
    await handleFiles(e.target.files);
  };

  const removeImage = idx => {
    setImages(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="relative w-full">
      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 bg-slate-50/50 dark:bg-slate-950/20 hover:bg-slate-50 dark:hover:bg-slate-950/45 ${
          loading
            ? 'border-teal-300 pointer-events-none opacity-60'
            : 'border-slate-200 dark:border-slate-800 hover:border-teal-500/50 dark:hover:border-teal-500/30'
        }`}
        onClick={() => fileInput.current.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInput}
          className="hidden"
          onChange={handleChange}
        />
        <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-3 shadow-sm">
          <UploadCloud className="w-6 h-6" />
        </div>
        <p className="text-slate-655 dark:text-slate-300 text-sm font-semibold mb-1 text-center">
          Drag and drop your product photos
        </p>
        <p className="text-slate-400 dark:text-slate-550 text-xs text-center mb-4">
          PNG, JPG, or WEBP files up to 10MB
        </p>
        <button
          type="button"
          className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 active:scale-95 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl shadow-sm transition-all"
        >
          Select Images
        </button>
      </div>

      {/* Uploading Status Overlay */}
      {loading && (
        <div className="mt-4 flex flex-col items-center justify-center p-6 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 rounded-2xl animate-pulse">
          <PacmanLoader color="#0d9488" size={12} speedMultiplier={2} />
          <span className="mt-4 text-teal-800 dark:text-teal-400 font-bold text-xs">Uploading images to secure vault...</span>
        </div>
      )}

      {/* Previews Grid */}
      {images && images.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-24 h-24 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-sm group"
            >
              <img src={img.url} alt="preview" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              <button
                type="button"
                className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-rose-600 text-white rounded-lg p-1.5 flex items-center justify-center shadow-md transition-all duration-200"
                onClick={e => { e.stopPropagation(); removeImage(idx); }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;