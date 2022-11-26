import "dotenv/config";
import "express-async-errors";
import app from "./server";

const PORT = process.env.API_PORT;

app.listen(PORT, () => console.log(`server runnin in ${PORT} port`));
