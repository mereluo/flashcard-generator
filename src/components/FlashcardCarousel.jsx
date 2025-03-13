import { useState } from 'react';
import { Box, Typography, IconButton, Card, CardContent, Paper, useTheme } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FlipIcon from '@mui/icons-material/Flip';

const FlashcardCarousel = ({ cards }) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cards || cards.length === 0) {
    return null;
  }

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
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
              backgroundColor: 'rgba(25, 118, 210, 0.04)'
            }
          }}
          aria-label="Previous flashcard"
        >
          <NavigateBeforeIcon fontSize="large" />
        </IconButton>

        <Box 
          sx={{ 
            position: 'relative',
            width: '100%',
            height: '300px',
            perspective: '1000px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              position: 'relative',
            }}
          >
            {/* front side */}
            <Card
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backfaceVisibility: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                boxShadow: 3,
                backgroundColor: '#ffffff',
                borderLeft: `6px solid ${theme.palette.primary.main}`,
                cursor: 'pointer',
                padding: 2,
              }}
              onClick={handleFlip}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  padding: 4,
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    wordWrap: 'break-word',
                    overflow: 'auto',
                    textOverflow: 'ellipsis',
                    maxHeight: '220px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  {cards[currentIndex]?.front}
                </Typography>
              </CardContent>

              <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                <Paper
                  elevation={2}
                  sx={{
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                  }}
                >
                  <IconButton 
                    color="secondary" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFlip();
                    }} 
                    size="small"
                  >
                    <FlipIcon />
                  </IconButton>
                </Paper>
              </Box>

              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  color: 'text.secondary',
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                Front • Click to flip
              </Typography>
            </Card>

            {/* back side */}
            <Card
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backfaceVisibility: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                boxShadow: 3,
                backgroundColor: '#f5f7ff',
                borderLeft: `6px solid ${theme.palette.secondary.main}`,
                cursor: 'pointer',
                transform: 'rotateY(180deg)',
                padding: 2,
              }}
              onClick={handleFlip}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  padding: 4,
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    wordWrap: 'break-word',
                    overflow: 'auto',
                    textOverflow: 'ellipsis',
                    maxHeight: '220px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  {cards[currentIndex]?.back}
                </Typography>
              </CardContent>

              <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                <Paper
                  elevation={2}
                  sx={{
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                  }}
                >
                  <IconButton 
                    color="secondary" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFlip();
                    }} 
                    size="small"
                  >
                    <FlipIcon />
                  </IconButton>
                </Paper>
              </Box>

              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  color: 'text.secondary',
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                Back • Click to flip
              </Typography>
            </Card>
          </Box>
        </Box>

        <IconButton
          onClick={handleNext}
          sx={{ 
            color: 'primary.main',
            '&:hover': { 
              backgroundColor: 'rgba(25, 118, 210, 0.04)'
            }
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