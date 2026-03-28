import { Typography, Box, Button, Divider, TextField } from '@mui/material'

const MIN = 1;
const MAX = 20;

const QuizHeader = ({ onShuffle, loading, questionCount, onCountChange }) => {
  const handleChange = (e) => {
    const val = e.target.value;
    if (val === '') { onCountChange(''); return; }
    const num = parseInt(val, 10);
    if (!isNaN(num)) onCountChange(Math.min(MAX, Math.max(MIN, num)));
  };

  const isValid = questionCount >= MIN && questionCount <= MAX;

  return (
    <>
      <Box className="quiz-header">
        <Typography variant="h4" className="quiz-title">Trivia Quiz</Typography>
        <Box className="header-controls">
          <TextField
            label="Questions"
            type="number"
            size="small"
            value={questionCount}
            onChange={handleChange}
            slotProps={{ htmlInput: { min: MIN, max: MAX } }}
            helperText={`${MIN}–${MAX}`}
            error={!isValid}
            sx={{ width: 110 }}
          />
          <Button
            variant="contained"
            onClick={onShuffle}
            disabled={loading || !isValid}
          >
            Shuffle &amp; Reset
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
    </>
  );
};

export default QuizHeader;
