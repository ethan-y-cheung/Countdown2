import { useState, useMemo } from 'react'
import { Button, Typography, Box, Divider } from '@mui/material'

function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const QuestionItem = ({ question, index, onAnswer }) => {
  const [selected, setSelected] = useState(null);

  const answers = useMemo(() => shuffled([
    question.correctAnswer,
    ...question.incorrectAnswers
  ]), [question]);

  const handleSelect = (answer) => {
    if (selected) return;
    setSelected(answer);
    onAnswer(question.id, answer === question.correctAnswer);
  };

  const getColor = (answer) => {
    if (!selected) return 'primary';
    if (answer === question.correctAnswer) return 'success';
    if (answer === selected) return 'error';
    return 'primary';
  };

  return (
    <Box className="question-block">
      <Typography variant="h6" className="question-text">
        {index + 1}. {question.question.text}
      </Typography>
      <Typography variant="caption" className="question-meta">
        {question.category} · {question.difficulty}
      </Typography>
      <Box className="answer-list">
        {answers.map((answer) => (
          <Button
            key={answer}
            variant={selected && (answer === question.correctAnswer || answer === selected) ? 'contained' : 'outlined'}
            color={getColor(answer)}
            onClick={() => handleSelect(answer)}
            sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
            fullWidth
          >
            {answer}
          </Button>
        ))}
      </Box>
      {selected && (
        <Typography className={`feedback ${selected === question.correctAnswer ? 'correct' : 'incorrect'}`}>
          {selected === question.correctAnswer ? 'Correct!' : `Incorrect — the answer was: ${question.correctAnswer}`}
        </Typography>
      )}
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};

export default QuestionItem;
