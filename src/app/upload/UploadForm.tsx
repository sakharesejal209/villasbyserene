'use client';

import { uploadMedia } from '@/utils/uploafFiles';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    try {
      const downloadURL = await uploadMedia(file);
      setUrl(downloadURL);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Button onClick={handleUpload}>Upload</Button>
      {url && <p>Uploaded URL: <a href={url}>{url}</a></p>}
    </div>
  );
}
