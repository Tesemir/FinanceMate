const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path"); // Добавляем path для работы с путями
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes); 
app.use("/api/records", recordRoutes); 
app.use("/api/budgets", budgetRoutes);

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/financeMate")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Раздача статических файлов (фронтенда)
app.use(express.static(path.join(__dirname, "FinanceMate")));

// Отправка index.html при запросе корневого URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "FinanceMate", "index.html"));
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
