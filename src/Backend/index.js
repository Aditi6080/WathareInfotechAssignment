const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // To enable CORS for frontend requests

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port

// Connect to MongoDB using the connection string
mongoose.connect('CONN_STR', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


const DataSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  sample: { type: Number, required: true },
});

const Data = mongoose.model('Data', DataSchema);

const timestamps = sampleData.map(entry => new Date(entry.ts));
const vibrationValues = sampleData.map(entry => entry.vibration);


// Enable CORS for frontend requests
app.use(cors());

// API endpoint to get all data
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});


app.get('/api/data/filter', async (req, res) => {
  const { startTime, frequency } = req.query;
 
  try {
    const filteredData = await Data.find();
    res.json(filteredData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error filtering data' });
  }
});


app.get('/api/weather', async (req, res) => {
  const { location } = req.query; 
  const apiKey = '<your_openweathermap_api_key>'; 

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=<span class="math-inline">\{location\}&appid\=</span>{apiKey}`);
    res.json(response.data); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));