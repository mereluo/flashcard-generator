import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Button, IconButton, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Flashcard from './Flashcard';

const FlashcardList = ({ flashcards, onEdit }) => {
  const theme = useTheme(); // Get theme colors
  const flashcardsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // TODO: This logic needs to be improved: only reset if the whole set is changed
  //   useEffect(() => {
  //     setCurrentPage(1);
  //   }, [flashcards]);

  const totalPages = Math.ceil(flashcards.length / flashcardsPerPage);
  const startIndex = (currentPage - 1) * flashcardsPerPage;
  const currentFlashcards = flashcards.slice(startIndex, startIndex + flashcardsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
        {currentFlashcards.map((card, index) => (
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
                  Flashcard {startIndex + index + 1} of {flashcards.length}
                </Typography>
              </Box>
              <Flashcard flashcard={card} onEdit={onEdit} />
            </Box>
            {index < currentFlashcards.length - 1 && <Divider sx={{ width: '100%' }} />}
          </React.Fragment>
        ))}
      </Box>

      {/* Pagination Controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mt: 4,
        }}
      >
        <IconButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          sx={{
            borderRadius: 2,
            backgroundColor: currentPage === 1 ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        {/* Page Number Buttons - Shows All Pages */}
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index + 1}
            variant={index + 1 === currentPage ? 'outlined' : 'text'}
            onClick={() => handlePageChange(index + 1)}
            sx={{
              minWidth: 40,
              height: 40,
              fontWeight: 600,
              borderRadius: 2,
              borderColor: index + 1 === currentPage ? theme.palette.primary.main : 'transparent',
              color: index + 1 === currentPage ? theme.palette.primary.main : theme.palette.text.primary,
              '&:hover': { backgroundColor: theme.palette.action.hover },
            }}
          >
            {index + 1}
          </Button>
        ))}

        {/* Next Button */}
        <IconButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          sx={{
            borderRadius: 2,
            backgroundColor: currentPage === totalPages ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FlashcardList;
