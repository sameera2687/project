const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory storage for bookings (for simplicity)
let bookings = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { bookings });
});

app.post('/book', (req, res) => {
  const { name, email, event, tickets } = req.body;
  const booking = {
    id: Date.now(),
    name,
    email,
    event,
    tickets: parseInt(tickets),
    date: new Date().toISOString()
  };
  bookings.push(booking);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Ticket booking app listening at http://localhost:${port}`);
});
