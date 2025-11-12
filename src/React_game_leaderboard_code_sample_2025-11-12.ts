import React, { useState, useEffect } from 'react';

interface PlayerScore {
  name: string;
  score: number;
}

const initialLeaderboard: PlayerScore[] = [
  { name: 'Player 1', score: 1000 },
  { name: 'Player 2', score: 800 },
  { name: 'Player 3', score: 600 },
];

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<PlayerScore[]>(initialLeaderboard);
  const [newName, setNewName] = useState('');
  const [newScore, setNewScore] = useState('');

  useEffect(() => {
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.score - a.score);
    setLeaderboard(sortedLeaderboard);
  }, [leaderboard]);

  const handleAddScore = () => {
    if (newName && newScore && !isNaN(Number(newScore))) {
      const newPlayer: PlayerScore = { name: newName, score: parseInt(newScore) };
      setLeaderboard([...leaderboard, newPlayer]);
      setNewName('');
      setNewScore('');
    }
  };

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Score"
          value={newScore}
          onChange={(e) => setNewScore(e.target.value)}
        />
        <button onClick={handleAddScore}>Add Score</button>
      </div>
    </div>
  );
};

export default Leaderboard;