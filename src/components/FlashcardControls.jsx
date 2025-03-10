import React, { useState } from 'react';
import { mockFlashcards } from '../data/mockFlashcards';
import { MenuItem, TextField, Button, Box, Typography } from '@mui/material';

const FlashcardControls = ({ onGenerate }) => {
  const [selectedType, setSelectedType] = useState('10 Definition Flashcards');
  const [customType, setCustomType] = useState('');

  const handleGenerate = () => {
    const key = selectedType.includes('Definition') ? 'definitions' : 'qna';
    onGenerate(mockFlashcards[key]);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Custom Flashcard Type"
          variant="outlined"
          value={customType}
          onChange={(e) => setCustomType(e.target.value)}
          sx={{ width: '500px' }}
          multiline
          minRows={3} // Adjust the number of rows to approximate 200px height
        />

        <Typography>or</Typography>

        <TextField select label="Select Flashcard Type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)} variant="outlined" fullWidth>
          <MenuItem value="10 Definition Flashcards">10 Definition Flashcards</MenuItem>
          <MenuItem value="10 Q&A Flashcards">10 Q&A Flashcards</MenuItem>
        </TextField>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2, marginBottom: 3 }}>
        <Button variant="outlined" color="info" onClick={handleGenerate} sx={{ width: '50%' }}>
          Generate
        </Button>
      </Box>
    </div>
  );
};

export default FlashcardControls;
