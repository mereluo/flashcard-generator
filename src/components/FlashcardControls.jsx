import React, { useState } from 'react';
import { mockFlashcards } from '../data/mockFlashcards';

const FlashcardControls = ({ onGenerate }) => {
  const [selectedType, setSelectedType] = useState('definitions');

  const handleGenerate = () => {
    onGenerate(mockFlashcards[selectedType]);
  };

  return (
    <div>
      <select onChange={(e) => setSelectedType(e.target.value)}>
        <option value="definitions">10 Definition Flashcards</option>
        <option value="qna">10 Q&A Flashcards</option>
      </select>
      <button onClick={handleGenerate}>Generate</button>
    </div>
  );
};

export default FlashcardControls;
