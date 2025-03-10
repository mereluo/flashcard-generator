import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const FileUpload = ({ onUpload }) => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setPdfFile(file);
    } else {
      alert('Invalid file type. Please upload the correct format.');
    }
  };

  const handleUpload = () => {
    if (!pdfFile) {
      alert('Please upload a PDF file');
      return;
    }

    // PDF file is passed as File object
    if (pdfFile) {
      onUpload(pdfFile.name, pdfFile);
    }
  };

  return (
    <div>
      {/* Row container for PDF/JSON sections */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 2 }}>
        {/* PDF Upload Section */}
        <Typography variant="body" sx={{ fontFamily: 'Open Sans' }}>
          Upload PDF for new flashcards
        </Typography>
        <Button variant="outlined" startIcon={<UploadIcon />} component="label">
          {pdfFile ? `Selected: ${pdfFile.name}` : 'Choose PDF'}
          <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, 'pdf')} hidden />
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2, marginBottom: 3 }}>
        <Button variant="outlined" color="primary" onClick={handleUpload} sx={{ width: '50%' }}>
          Upload File
        </Button>
      </Box>
    </div>
  );
};

export default FileUpload;
