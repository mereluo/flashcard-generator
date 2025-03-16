import { useState } from 'react';
import { mockFlashcards } from '../data/mockFlashcards';
import { MenuItem, TextField, Button, Box, Typography, Divider, Paper, FormControl, InputLabel, Select, Chip, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import FlashcardCarousel from './FlashcardCarousel'; // flashcard carousel is in App.jsx

const FlashcardControls = ({ setFlashcards, filename }) => {
  const [flashcardCount, setFlashcardCount] = useState('complete');
  const [role, setRole] = useState('student');
  const [purpose, setPurpose] = useState('review');
  const [customType, setCustomType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    console.log('in control: ', filename);

    try {
      let userPrompt;
      const cardCount = flashcardCount === 'complete' ? '5' : '3';

      // Simplified logic:
      // 1. If custom prompt has content, use it directly
      // 2. If custom prompt is empty, use a simple combination of the dropdown selections
      if (customType.trim()) {
        userPrompt = customType;
      } else {
        userPrompt = `Create ${cardCount} flashcards for ${role} for ${purpose} purpose.`;
      }

      console.log('final user prompt: ', userPrompt);

      const response = await fetch('http://127.0.0.1:8000/api/generate_flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: filename,
          userPrompt: userPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch flashcards.');
      }

      const data = await response.json();

      // Transform data into the expected flashcard format for the frontend
      const formattedFlashcards = data.map((item) => ({
        id: item.id,
        front: item.question,
        back: item.answer,
        terminology: item.terminology, // Include terminology field
      }));

      setFlashcards(formattedFlashcards);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    } finally {
      setIsLoading(false);
    }
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
          placeholder="Optional: Specify content or topics (e.g., key concepts of quantum physics with simple explanations)"
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

      {/* First dropdown: Flashcard Count */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="flashcard-count-label">Flashcard Number</InputLabel>
        <Select labelId="flashcard-count-label" value={flashcardCount} onChange={(e) => setFlashcardCount(e.target.value)} label="Flashcard Number" sx={{ borderRadius: 2 }}>
          <MenuItem value="complete">Complete (5)</MenuItem>
          <MenuItem value="concise">Concise (3)</MenuItem>
        </Select>
      </FormControl>

      {/* Second dropdown: Role */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="role-label">Role</InputLabel>
        <Select labelId="role-label" value={role} onChange={(e) => setRole(e.target.value)} label="Role" sx={{ borderRadius: 2 }}>
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="interviewee">Interviewee</MenuItem>
        </Select>
      </FormControl>

      {/* Third dropdown: Purpose */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="purpose-label">Purpose</InputLabel>
        <Select labelId="purpose-label" value={purpose} onChange={(e) => setPurpose(e.target.value)} label="Purpose" sx={{ borderRadius: 2 }}>
          <MenuItem value="review">Review</MenuItem>
          <MenuItem value="interview">Interview</MenuItem>
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
