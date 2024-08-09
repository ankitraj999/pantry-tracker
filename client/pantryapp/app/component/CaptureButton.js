
'use client';
import { useState } from 'react';
import { uploadImage, addProduct } from '../utils/firebase';

export default function CaptureButton({ onCapture }) {
  const [capturing, setCapturing] = useState(false);

  const captureImage = async () => {
    setCapturing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);

      const imageDataUrl = canvas.toDataURL('image/jpeg');
      const imageFile = dataURLtoFile(imageDataUrl, 'captured_image.jpg');

      const imageUrl = await uploadImage(imageFile);

      const productData = {
        Brand: "Carbotrol",
        Category: "Fruit",
        "Estimated Quantity": "105 oz. (2.98 kg)",
        Expiration: "",
        "Item Name": "Apple"
      };

      await addProduct(productData, imageUrl);
      onCapture();
    } catch (error) {
      console.error('Error capturing image:', error);
    } finally {
      setCapturing(false);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <button
      onClick={captureImage}
      disabled={capturing}
      className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300
        ${capturing ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
        ${capturing ? '' : 'shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500'}
      `}
    >
      {capturing ? 'Capturing...' : 'Capture Product'}
    </button>
  );
}