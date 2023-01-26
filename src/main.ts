import app from "./app";

app.app.listen(app.port, () => {
  console.log(`Server running at http://localhost:${app.port}`);
});
