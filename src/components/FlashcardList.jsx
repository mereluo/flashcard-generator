import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Flashcard from './Flashcard';

const FlashcardList = ({ flashcards, onEdit }) => {
  if (!flashcards.length) {
    return null;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          width: '100%',
        }}
      >
        {flashcards.map((card, index) => (
          <React.Fragment key={card.id}>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                  }}
                >
                  Flashcard {index + 1} of {flashcards.length}
                </Typography>
              </Box>
              <Flashcard flashcard={card} onEdit={onEdit} />
            </Box>
            {index < flashcards.length - 1 && <Divider sx={{ width: '100%' }} />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default FlashcardList;
