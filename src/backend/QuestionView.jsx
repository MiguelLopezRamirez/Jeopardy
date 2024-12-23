import React, { useState, useContext } from 'react';
import { GameContext } from './GameContext';
const QuestionView = ({ question, onAnswerSelected }) => {
    const {
        options
      } = useContext(GameContext);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
  
    const handleAnswerClick = (answer) => {
      setSelectedAnswer(answer);
      onAnswerSelected(answer);
    };
  
    return (

      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>{question.text}</h2>
        {question.options.map( (option, index) =>(
          <h3>({options[index]}) {option}</h3>
        ))}

        <div>
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              style={{
                margin: '10px',
                padding: '10px 20px',
                cursor: 'pointer',
                backgroundColor: selectedAnswer === option ? 'lightblue' : 'white',
              }}
            >
              {options[index]}
            </button>
          ))}
        </div>
      </div>
    );
  };

export default QuestionView;