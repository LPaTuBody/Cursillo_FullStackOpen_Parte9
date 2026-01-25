import express from "express";

const app = express();
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("ping-pong, cara pálida")
  res.send("pong");
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});