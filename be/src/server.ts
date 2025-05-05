import express from "express";
import cors from "cors";
import { adminRouter } from "./routes/adminRoutes";
import { userRouter } from "./routes/userRoutes";

const app = express();
const port = 4646;
app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
