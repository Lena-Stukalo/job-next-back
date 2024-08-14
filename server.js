import app from "./app.js";
import { connect } from "mongoose";
import "dotenv/config";

const { DB_HOST, PORT = 3000 } = process.env;
connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
