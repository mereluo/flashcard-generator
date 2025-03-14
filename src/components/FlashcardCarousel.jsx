import { useState } from 'react';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Flashcard from './Flashcard';

const FlashcardCarousel = ({ cards, onEdit }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!cards || cards.length === 0) {
    return null;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px',
        mb: 3,
        mt: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <IconButton
          onClick={handlePrevious}
          sx={{
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
            },
          }}
          aria-label="Previous flashcard"
        >
          <NavigateBeforeIcon fontSize="large" />
        </IconButton>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            mx: 2,
          }}
        >
          {/* use FlashCard */}
          {cards[currentIndex] && <Flashcard flashcard={cards[currentIndex]} onEdit={onEdit} />}
        </Box>

        <IconButton
          onClick={handleNext}
          sx={{
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
            },
          }}
          aria-label="Next flashcard"
        >
          <NavigateNextIcon fontSize="large" />
        </IconButton>
      </Box>

      <Typography
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
        }}
      >
        Flashcard {currentIndex + 1} of {cards.length}
      </Typography>
    </Box>
  );
};

export default FlashcardCarousel;
