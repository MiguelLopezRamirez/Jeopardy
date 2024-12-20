import React, { useState } from 'react';
import TeamSetup from './backend/TeamSetup';
import QuestionTable from './backend/QuestionTable';
import QuestionView from './backend/QuestionView';

const App = () => {
  const [teams, setTeams] = useState(null);
  const [categories] = useState([
    {
      name: 'Category 1',
      questions: [
        { text: 'Question 1.1', options: ['A', 'B', 'C', 'D'], correct: 'A' },
        { text: 'Question 1.2', options: ['A', 'B', 'C', 'D'], correct: 'B' },
        { text: 'Question 1.3', options: ['A', 'B', 'C', 'D'], correct: 'C' },
        { text: 'Question 1.4', options: ['A', 'B', 'C', 'D'], correct: 'D' },
        { text: 'Question 1.5', options: ['A', 'B', 'C', 'D'], correct: 'A' },
      ],
    },
    {
      name: 'Category 2',
      questions: [
        { text: 'Question 2.1', options: ['A', 'B', 'C', 'D'], correct: 'A' },
        { text: 'Question 2.2', options: ['A', 'B', 'C', 'D'], correct: 'B' },
        { text: 'Question 2.3', options: ['A', 'B', 'C', 'D'], correct: 'C' },
        { text: 'Question 2.4', options: ['A', 'B', 'C', 'D'], correct: 'D' },
        { text: 'Question 2.5', options: ['A', 'B', 'C', 'D'], correct: 'A' },
      ],
    },
    {
      name: 'Category 3',
      questions: [
        { text: 'Question 3.1', options: ['A', 'B', 'C', 'D'], correct: 'A' },
        { text: 'Question 3.2', options: ['A', 'B', 'C', 'D'], correct: 'B' },
        { text: 'Question 3.3', options: ['A', 'B', 'C', 'D'], correct: 'C' },
        { text: 'Question 3.4', options: ['A', 'B', 'C', 'D'], correct: 'D' },
        { text: 'Question 3.5', options: ['A', 'B', 'C', 'D'], correct: 'A' },
      ],
    },
    {
      name: 'Category 4',
      questions: [
        { text: 'Question 4.1', options: ['A', 'B', 'C', 'D'], correct: 'A' },
        { text: 'Question 4.2', options: ['A', 'B', 'C', 'D'], correct: 'B' },
        { text: 'Question 4.3', options: ['A', 'B', 'C', 'D'], correct: 'C' },
        { text: 'Question 4.4', options: ['A', 'B', 'C', 'D'], correct: 'D' },
        { text: 'Question 4.5', options: ['A', 'B', 'C', 'D'], correct: 'A' },
      ],
    },
    {
      name: 'Category 5',
      questions: [
        { text: 'Question 5.1', options: ['A', 'B', 'C', 'D'], correct: 'A' },
        { text: 'Question 5.2', options: ['A', 'B', 'C', 'D'], correct: 'B' },
        { text: 'Question 5.3', options: ['A', 'B', 'C', 'D'], correct: 'C' },
        { text: 'Question 5.4', options: ['A', 'B', 'C', 'D'], correct: 'D' },
        { text: 'Question 5.5', options: ['A', 'B', 'C', 'D'], correct: 'A' },
      ],
    },
  ]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleTeamsConfigured = (teamNames) => {
    setTeams(teamNames);
  };

  const handleQuestionSelected = (question) => {
    setSelectedQuestion(question);
  };

  const handleAnswerSelected = (answer) => {
    alert(`You selected: ${answer}`);
    setSelectedQuestion(null);
  };

  return (
    <div>
      {!teams ? ( //miestras no esten configurados los equipos
        <TeamSetup onTeamsConfigured={handleTeamsConfigured} />
      ) : (
        //Equipos configurados
        <div>
          <h1>Game Ready!</h1>
            { ! selectedQuestion ?

            (<QuestionTable categories={categories} onQuestionSelected={handleQuestionSelected} />) : (<QuestionView question={selectedQuestion} onAnswerSelected={handleAnswerSelected} />)
            }
            
            
            
          <ul>
            {teams.map((team, index) => (
              <li key={index}>{team}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
