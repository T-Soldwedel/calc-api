import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/calc', (req, res) => {
  const { term1, term2, operator } = req.query;
  
  if (!term1 || !term2 || !operator) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const num1 = parseFloat(term1);
  const num2 = parseFloat(term2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  let result;
  switch(operator) {
    case '+': result = num1 + num2; break;
    case '-': result = num1 - num2; break;
    case '*': result = num1 * num2; break;
    case '/':
      if (num2 === 0) return res.status(400).json({ error: 'Division by zero' });
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operator' });
  }

  res.json({
    term1: num1,
    term2: num2,
    operator,
    result
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});