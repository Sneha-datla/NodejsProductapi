const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const productRoutes = require("./routes/products.router");

app.use(cors());
app.use(express.json());

// Prefix your API routes
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
