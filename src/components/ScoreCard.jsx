import { Box, Typography, Divider } from '@mui/material'

const ScoreCard = ({ correct, total }) => {
  const pct = Math.round((correct / total) * 100);

  return (
    <Box className="score-card">
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h5" className="score-title">Your Score</Typography>
      <Typography variant="h3" className={`score-value ${pct >= 60 ? 'pass' : 'fail'}`}>
        {correct} / {total}
      </Typography>
    </Box>
  );
};

export default ScoreCard;
