import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const FileUpload = ({ onUpload }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];

    if (file) {
      if (type === 'pdf' && file.type === 'application/pdf') {
        setPdfFile(file);
      } else if (type === 'json' && file.type === 'application/json') {
        setJsonFile(file);
      } else {
        alert('Invalid file type. Please upload the correct format.');
      }
    }
  };

  const handleUpload = () => {
    if (!pdfFile && !jsonFile) {
      alert('Please upload at least one file (PDF or JSON).');
      return;
    }

    // PDF file is passed as File object
    if (pdfFile) {
      onUpload(pdfFile.name, pdfFile);
    }

    // JSON file is parsed as text, so we can process or store it
    if (jsonFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpload(jsonFile.name, e.target.result);
      };
      reader.readAsText(jsonFile);
    }
  };

  return (
    <div>
      {/* Row container for PDF/JSON sections */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 2 }}>
        {/* PDF Upload Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body" sx={{ fontFamily: 'Open Sans' }}>
            Upload PDF for new flashcards
          </Typography>
          <Button variant="outlined" startIcon={<UploadIcon />} component="label">
            {pdfFile ? `Selected: ${pdfFile.name}` : 'Choose PDF'}
            <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, 'pdf')} hidden />
          </Button>
        </Box>
        <Typography>or/and</Typography>
        {/* JSON Upload Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body" sx={{ fontFamily: 'Open Sans' }}>
            Upload previous flashcards
          </Typography>
          <Button variant="outlined" startIcon={<UploadIcon />} component="label">
            {jsonFile ? `Selected: ${jsonFile.name}` : 'Choose JSON'}
            <input type="file" accept="application/json" onChange={(e) => handleFileChange(e, 'json')} hidden />
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2, marginBottom: 3 }}>
        <Button variant="outlined" color="primary" onClick={handleUpload} sx={{ width: '50%' }}>
          Upload File(s)
        </Button>
      </Box>
    </div>
  );
};

export default FileUpload;
