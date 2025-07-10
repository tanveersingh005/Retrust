import React, { useRef } from 'react';

const ImageUploader = ({ images, setImages }) => {
  const fileInput = useRef();

  const handleFiles = files => {
    const fileArr = Array.from(files);
    const previews = fileArr.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages([...(images || []), ...previews]);
  };

  const handleDrop = e => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = e => {
    handleFiles(e.target.files);
  };

  const removeImage = idx => {
    setImages(images.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors mb-4"
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
        <span className="text-gray-500 mb-2">Drag and drop or browse to upload images of your product.</span>
        <button
          type="button"
          className="px-5 py-2 bg-[#2e7d32] text-white font-bold rounded border border-[#2e7d32] shadow hover:bg-[#256427] transition-colors"
        >
          Browse Files
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {images && images.map((img, idx) => (
          <div key={idx} className="relative w-20 h-20">
            <img src={img.url} alt="preview" className="w-full h-full object-cover rounded-lg border" />
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-blue-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-600"
              onClick={e => { e.stopPropagation(); removeImage(idx); }}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader; 