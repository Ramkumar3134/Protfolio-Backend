const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: './config/.env' });
const Connection = require('./config/dbConnection');
const V1 = require('./route/mainRoute')

Connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["https://portfolio-frontend-34i4.onrender.com",
           "https://portfolio-frontend-34i4.onrender.com/contact",
           "http://localhost:3134"
          ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


app.use('/api/v1', V1);

app.listen(process.env.PORT || 3134, () => {
    console.log(`Server is running successfully ${process.env.PORT}`);
});