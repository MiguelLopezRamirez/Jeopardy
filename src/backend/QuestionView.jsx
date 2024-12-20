import React, { useState } from 'react';
const QuestionView = ({ question, onAnswerSelected }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
  
    const handleAnswerClick = (answer) => {
      setSelectedAnswer(answer);
      onAnswerSelected(answer);
    };
  
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>{question.text}</h2>
        <div>
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              style={{
                margin: '10px',
                padding: '10px 20px',
                cursor: 'pointer',
                backgroundColor: selectedAnswer === option ? 'lightblue' : 'white',
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

export default QuestionView;