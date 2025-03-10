import React from 'react';
import { Grid2, Box } from '@mui/material';
import Flashcard from './Flashcard';

const FlashcardList = ({ flashcards }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Grid2 container spacing={3} justifyContent="center" sx={{ flexDirection: 'column' }}>
        {flashcards.map((card) => (
          <Grid2 item key={card.id}>
            <Flashcard flashcard={card} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default FlashcardList;
