// HTTP Server Setup
import express from "express";
import cors from "cors";
import { Copilot } from "monacopilot";
import userRouter from "./api/user_routes.js";
import collabRouter from "./api/collab_routes.js";
import {connectdb} from "./api/models/db.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/collab", collabRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Helllo",
  });
});

const copilot = new Copilot("AIzaSyC - KojYDu7jGuMdJPjKYBMQPYM4ASXCqxA", {
  provider: "google",
  model: "gemini-1.5-flash",
});

app.post("/complete", async (req, res) => {
  const { completion, error, raw } = await copilot.complete({
    body: req.body,
  });

  // Process raw LLM response if needed
  // `raw` can be undefined if an error occurred, which happens when `error` is present
//   if (raw) {
//     await calculateCost(raw.usage.input_tokens);
//   }

  // Handle errors if present
  if (error) {
    console.error("Completion error:", error);
    res.status(500).json({ completion: null, error });
  }

  res.status(200).json({ completion });
})




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  connectdb()
});
