import { useState, useEffect } from 'react';
import { Card, Typography, IconButton, TextareaAutosize, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import FlipIcon from '@mui/icons-material/Flip';

const FlipCardContainer = styled('div')({
  perspective: '1000px',
  width: '100%',
  height: '220px',
  position: 'relative',
});

const FlipCardInner = styled('div')(({ flipped }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const FlipCardSide = styled(Card)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'flex-start',
  position: 'absolute',
  backfaceVisibility: 'hidden',
  overflow: 'hidden',
  padding: '16px',
  boxSizing: 'border-box',
});

const FrontSide = styled(FlipCardSide)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderLeft: `6px solid ${theme.palette.primary.main}`,
}));

const BackSide = styled(FlipCardSide)(({ theme }) => ({
  transform: 'rotateY(180deg)',
  backgroundColor: '#f5f7ff',
  borderLeft: `6px solid ${theme.palette.secondary.main}`,
}));

const StyledTextarea = styled('textarea')(({ theme }) => ({
  width: '100%',
  height: '150px', // Fixed height ensures scroll behavior
  resize: 'none',
  fontSize: '16px',
  padding: '12px',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  outline: 'none',
  fontFamily: theme.typography.fontFamily,
  overflowY: 'scroll', // Ensures scrollbar appears when needed
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}30`,
  },
}));

const CardContent = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px',
  overflow: 'auto',
});

const HighlightedLink = styled('a')(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  textDecoration: 'underline',
}));

const highlightTerminology = (text, terminology, onClick) => {
  if (!terminology) return text;
  const parts = text.split(new RegExp(`(${terminology})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === terminology.toLowerCase() ? (
      <HighlightedLink key={index} onClick={onClick}>
        {part}
      </HighlightedLink>
    ) : (
      part
    )
  );
};

const Flashcard = ({ flashcard, onEdit, onAddFlashcard }) => {
  const [flipped, setFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [frontText, setFrontText] = useState(flashcard.front);
  const [backText, setBackText] = useState(flashcard.back);

  // Update state when flashcard content changes
  useEffect(() => {
    setFrontText(flashcard.front);
    setBackText(flashcard.back);
  }, [flashcard]);

  const handleEditToggle = (e) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
    if (isEditing) {
      onEdit({ ...flashcard, front: frontText, back: backText });
    }
  };

  const handleFlip = (e) => {
    if (!isEditing) {
      e.stopPropagation();
      setFlipped(!flipped);
    }
  };

  const handleTerminologyClick = async (e) => {
    e.stopPropagation();
    const response = await fetch('http://127.0.0.1:1111/api/generate_flashcards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: flashcard.filename,
        userPrompt: `Create a flashcard for the term "${flashcard.terminology}".`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch flashcards.');
    }

    const data = await response.json();
    const newFlashcard = {
      id: data.id,
      front: data.question,
      back: data.answer,
      terminology: data.terminology,
    };

    onAddFlashcard(newFlashcard);
  };

  return (
    <FlipCardContainer>
      <FlipCardInner flipped={flipped}>
        <FrontSide elevation={3} onClick={handleFlip}>
          <CardContent>
            {isEditing ? (
              <StyledTextarea value={frontText} onChange={(e) => setFrontText(e.target.value)} onClick={(e) => e.stopPropagation()} />
            ) : (
              <Typography
                variant="h6"
                sx={{
                  wordWrap: 'break-word',
                  overflow: 'auto',
                  textOverflow: 'ellipsis',
                  maxHeight: '170px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}
              >
                {highlightTerminology(frontText, flashcard.terminology, handleTerminologyClick)}
              </Typography>
            )}
          </CardContent>
        </FrontSide>
        <BackSide elevation={3} onClick={handleFlip}>
          <CardContent>
            {isEditing ? (
              <StyledTextarea value={backText} onChange={(e) => setBackText(e.target.value)} onClick={(e) => e.stopPropagation()} />
            ) : (
              <Typography
                variant="h6"
                sx={{
                  wordWrap: 'break-word',
                  overflow: 'auto',
                  textOverflow: 'ellipsis',
                  maxHeight: '170px',
                  fontWeight: 500,
                  lineHeight: 1.5,
                }}
              >
                {highlightTerminology(backText, flashcard.terminology, handleTerminologyClick)}
              </Typography>
            )}
          </CardContent>
        </BackSide>
      </FlipCardInner>

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
          <IconButton color={isEditing ? 'success' : 'primary'} onClick={handleEditToggle} size="small">
            {isEditing ? <CheckIcon /> : <EditIcon />}
          </IconButton>
        </Paper>

        {!isEditing && (
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
            <IconButton color="secondary" onClick={handleFlip} size="small">
              <FlipIcon />
            </IconButton>
          </Paper>
        )}
      </Box>

      {!isEditing && (
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
          {flipped ? 'Back' : 'Front'} • Click to flip
        </Typography>
      )}
    </FlipCardContainer>
  );
};

export default Flashcard;
