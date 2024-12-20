import React, { useState } from 'react';

const TeamSetup = ({ onTeamsConfigured }) => {
  const [teamCount, setTeamCount] = useState(2); // Default to 2 teams
  const [teamNames, setTeamNames] = useState(['', '']);

  const handleTeamCountChange = (event) => {
    const count = Math.max(2, Math.min(10, Number(event.target.value))); // Limit between 2 and 10 teams
    setTeamCount(count);
    setTeamNames((prevNames) => {
      const newNames = [...prevNames];
      if (count > prevNames.length) {
        for (let i = prevNames.length; i < count; i++) {
          newNames.push(`Team ${i + 1}`);
        }
      } else {
        newNames.length = count;
      }
      return newNames;
    });
  };

  const handleNameChange = (index, event) => {
    const newNames = [...teamNames];
    newNames[index] = event.target.value;
    setTeamNames(newNames);
  };

  const handleSubmit = () => {
    if (teamNames.some((name) => name.trim() === '')) {
      alert('All teams must have a name.');
      return;
    }
    onTeamsConfigured(teamNames);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Team Setup</h1>

      <label htmlFor="team-count">Number of Teams: </label>
      <input
        id="team-count"
        type="number"
        value={teamCount}
        onChange={handleTeamCountChange}
        min={2}
        max={10}
        style={{ width: '50px', marginLeft: '10px' }}
      />

      <div style={{ marginTop: '20px' }}>
        {teamNames.map((name, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <label htmlFor={`team-name-${index}`}>Team {index + 1} Name: </label>
            <input
              id={`team-name-${index}`}
              type="text"
              value={name}
              onChange={(event) => handleNameChange(index, event)}
              style={{ marginLeft: '10px' }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Start Game
      </button>
    </div>
  );
};

export default TeamSetup;
