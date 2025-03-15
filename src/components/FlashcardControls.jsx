import { useState } from 'react';
import { mockFlashcards } from '../data/mockFlashcards';
import { MenuItem, TextField, Button, Box, Typography, Divider, Paper, FormControl, InputLabel, Select, Chip, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import FlashcardCarousel from './FlashcardCarousel'; // flashcard carousel is in App.jsx

const FlashcardControls = ({ setFlashcards, flashcards, onEdit }) => {
  const [selectedType, setSelectedType] = useState('10 Definition Flashcards');
  const [customType, setCustomType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);

    // will be replaced after completing backend
    setTimeout(() => {
      const key = selectedType.includes('Definition') ? 'definitions' : 'qna';
      const generatedCards = mockFlashcards[key];

      setFlashcards(generatedCards);

      setIsLoading(false);
    }, 1500);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(245, 247, 250, 0.5)',
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
          Custom Prompt
        </Typography>

        <TextField
          label="Describe what kind of flashcards you want"
          variant="outlined"
          value={customType}
          onChange={(e) => setCustomType(e.target.value)}
          fullWidth
          multiline
          minRows={3}
          placeholder="Example: Create 10 flashcards about the key concepts of quantum physics with simple explanations"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
      </Paper>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          my: 2,
        }}
      >
        <Divider sx={{ flex: 1 }} />
        <Chip
          label="OR"
          variant="outlined"
          sx={{
            mx: 2,
            px: 1,
            fontWeight: 500,
          }}
        />
        <Divider sx={{ flex: 1 }} />
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="flashcard-type-label">Select Flashcard Type</InputLabel>
        <Select labelId="flashcard-type-label" value={selectedType} onChange={(e) => setSelectedType(e.target.value)} label="Select Flashcard Type" sx={{ borderRadius: 2 }}>
          <MenuItem value="10 Definition Flashcards">Definition Flashcards</MenuItem>
          <MenuItem value="10 Q&A Flashcards">Q&A Flashcards</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerate}
        fullWidth
        disabled={isLoading}
        startIcon={isLoading ? null : <AutoAwesomeIcon />}
        sx={{
          height: '48px',
          fontWeight: 600,
          position: 'relative',
        }}
      >
        {isLoading ? 'Generating...' : 'Generate Flashcards'}
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              left: '30%',
              top: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Button>

      {/* {flashcards.length > 0 && <FlashcardCarousel cards={flashcards} onEdit={onEdit} />} */}
    </Box>
  );
};

export default FlashcardControls;
