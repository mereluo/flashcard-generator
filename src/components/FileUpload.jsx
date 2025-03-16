import { useState } from 'react';
import { Button, Typography, Box, Paper, Alert, IconButton } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import FileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';

const FileUpload = ({ onUpload }) => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [error, setError] = useState('');

  const maxFileCount = 10;
  const maxTotalSize = 50 * 1024 * 1024; // 50 MB in bytes

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setError('');

    if (selectedFiles.length === 0) return;

    // Filter out valid PDF files and ignore others
    const validFiles = selectedFiles.filter((file) => file.type === 'application/pdf');
    const invalidFiles = selectedFiles.filter((file) => file.type !== 'application/pdf');

    let errorMessages = [];
    if (invalidFiles.length > 0) {
      errorMessages.push('Some files are not valid PDF format and have been ignored.');
    }

    // Calculate the current total size of already selected files
    const currentSize = pdfFiles.reduce((acc, file) => acc + file.size, 0);
    let acceptedFiles = [];
    let acceptedSize = 0;
    let countError = false;
    let sizeError = false;

    // Process each valid file and check against count and size limits
    for (const file of validFiles) {
      if (pdfFiles.length + acceptedFiles.length >= maxFileCount) {
        countError = true;
        break; // Stop processing additional files if max count reached
      }
      if (currentSize + acceptedSize + file.size > maxTotalSize) {
        sizeError = true;
        continue; // Skip this file if total size limit would be exceeded
      }
      acceptedFiles.push(file);
      acceptedSize += file.size;
    }

    if (countError) {
      errorMessages.push('Maximum file count reached. Only the first 10 files are allowed.');
    }
    if (sizeError) {
      errorMessages.push('Total file size exceeds 50MB limit. Some files were skipped.');
    }

    if (errorMessages.length > 0) {
      setError(errorMessages.join(' '));
    }

    if (acceptedFiles.length > 0) {
      // Append the newly accepted PDF files to the existing list
      setPdfFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }
  };

  const handleDelete = (index) => {
    setPdfFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (pdfFiles.length === 0) {
      setError('Please upload at least one PDF file.');
      return;
    }

    const file = pdfFiles[0]; // Assuming single-file uploads for now
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed.');
      }

      const data = await response.json();
      console.log('Upload successful:', data);

      // Pass filename to parent component
      console.log('inside upload: ', data.filename);
      onUpload(data.filename);
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload file.');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
          mb: 2,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 500, minWidth: '200px' }}>
          Upload PDF(s) for new flashcards
        </Typography>

        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          component="label"
          fullWidth
          sx={{
            height: '48px',
            borderColor: pdfFiles.length > 0 ? 'primary.main' : 'grey.300',
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
            },
          }}
        >
          Choose PDF(s)
          <input type="file" accept="application/pdf" onChange={handleFileChange} hidden multiple />
        </Button>
      </Box>

      {/* PDF file list area */}
      {pdfFiles.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {pdfFiles.map((file, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                p: 2,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                backgroundColor: 'rgba(0, 188, 212, 0.05)',
              }}
            >
              <FileIcon color="primary" />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {file.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                {(file.size / 1024).toFixed(1)} KB
              </Typography>
              <IconButton onClick={() => handleDelete(index)}>
                <CloseIcon />
              </IconButton>
            </Paper>
          ))}
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={pdfFiles.length === 0}
        fullWidth
        sx={{
          height: '48px',
          mt: 1,
        }}
      >
        Upload File(s)
      </Button>
    </Box>
  );
};

export default FileUpload;
