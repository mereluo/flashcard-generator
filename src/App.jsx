import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import FileUpload from './components/FileUpload';
import FlashcardList from './components/FlashcardList';
import FlashcardControls from './components/FlashcardControls';

const App = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = (fileName, content) => {
    setUploadedFiles((prev) => [...prev, { name: fileName, content }]);
  };

  const handleGenerate = (generatedFlashcards) => {
    setFlashcards(generatedFlashcards);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%', // Full width for proper centering
          minHeight: '100vh', // Full viewport height
          pt: 2, // Padding top for spacing
          boxSizing: 'border-box', // Makes padding behave consistently
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'medium', fontFamily: 'Monospace', mb: 2 }}>
          Flashcard Generator
        </Typography>

        <FileUpload onUpload={handleUpload} />
        <FlashcardControls onGenerate={handleGenerate} />
        <FlashcardList flashcards={flashcards} />
      </Box>
    </div>
  );
};

export default App;
