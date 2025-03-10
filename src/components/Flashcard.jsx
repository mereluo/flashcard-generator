import React, { useState } from 'react';

const Flashcard = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard" onClick={() => setFlipped(!flipped)} style={{ border: '1px solid black', padding: '20px', cursor: 'pointer' }}>
      <p>{flipped ? flashcard.back : flashcard.front}</p>
    </div>
  );
};

export default Flashcard;
