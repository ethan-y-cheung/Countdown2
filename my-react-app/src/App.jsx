import { useState, useEffect } from 'react'
import { CircularProgress, Typography, Box } from '@mui/material'
import './App.css'
import QuestionItem from './components/QuestionItem'
import QuizHeader from './components/QuizHeader'
import ScoreCard from './components/ScoreCard'

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [answers, setAnswers] = useState({});

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    setAnswers({});
    try {
      const res = await fetch(`https://the-trivia-api.com/v2/questions?limit=${questionCount}`);
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswer = (id, isCorrect) => {
    setAnswers(prev => ({ ...prev, [id]: isCorrect }));
  };

  const answeredCount = Object.keys(answers).length;
  const allAnswered = questions.length > 0 && answeredCount === questions.length;
  const correctCount = Object.values(answers).filter(Boolean).length;

  return (
    <Box className="app-container">
      <QuizHeader
        onShuffle={fetchQuestions}
        loading={loading}
        questionCount={questionCount}
        onCountChange={setQuestionCount}
      />
      {loading && (
        <Box className="loading-box">
          <CircularProgress />
        </Box>
      )}
      {error && <Typography color="error">Error: {error}</Typography>}
      {!loading && !error && questions.map((q, i) => (
        <QuestionItem
          key={q.id}
          question={q}
          index={i}
          onAnswer={handleAnswer}
        />
      ))}
      {allAnswered && (
        <ScoreCard correct={correctCount} total={questions.length} />
      )}
    </Box>
  );
}

export default App
