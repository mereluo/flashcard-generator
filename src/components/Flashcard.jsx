import React, { useState } from 'react';
import { Card, Typography, IconButton, TextareaAutosize } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const FlipCardContainer = styled('div')({
  perspective: '1000px',
  width: '520px',
  height: '200px',
  position: 'relative',
});

const FlipCardInner = styled('div')(({ flipped }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const FlipCardSide = styled(Card)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  position: 'absolute',
  backfaceVisibility: 'hidden',
  overflow: 'hidden',
});

const FrontSide = styled(FlipCardSide)({
  backgroundColor: '#fdfdfb',
});
const BackSide = styled(FlipCardSide)({
  transform: 'rotateY(180deg)',
  backgroundColor: '#ebf4f9',
});

const StyledTextarea = styled(TextareaAutosize)({
  width: '100%',
  height: '100px',
  maxHeight: '150px',
  minHeight: '50px',
  resize: 'vertical',
  fontSize: '16px',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  outline: 'none',
  overflowY: 'scroll',
  display: 'block',
  boxSizing: 'border-box',
});

const Flashcard = ({ flashcard, onEdit }) => {
  const [flipped, setFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [frontText, setFrontText] = useState(flashcard.front);
  const [backText, setBackText] = useState(flashcard.back);

  const handleEditToggle = (e) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
    if (isEditing) {
      onEdit({ front: frontText, back: backText });
    }
  };

  return (
    <FlipCardContainer onClick={() => !isEditing && setFlipped(!flipped)}>
      <FlipCardInner flipped={flipped}>
        <FrontSide>
          {isEditing ? (
            <StyledTextarea value={frontText} onChange={(e) => setFrontText(e.target.value)} />
          ) : (
            <Typography variant="h6" sx={{ wordWrap: 'break-word', overflow: 'auto', textOverflow: 'ellipsis', maxHeight: '170px' }}>
              {frontText}
            </Typography>
          )}
        </FrontSide>
        <BackSide>
          {isEditing ? (
            <StyledTextarea value={backText} onChange={(e) => setBackText(e.target.value)} />
          ) : (
            <Typography variant="h6" sx={{ wordWrap: 'break-word', overflow: 'auto', textOverflow: 'ellipsis', maxHeight: '170px' }}>
              {backText}
            </Typography>
          )}
        </BackSide>
      </FlipCardInner>
      <IconButton color="info" onClick={handleEditToggle} style={{ position: 'absolute', top: 8, right: 8 }}>
        {isEditing ? <CheckIcon /> : <EditIcon />}
      </IconButton>
    </FlipCardContainer>
  );
};

export default Flashcard;
