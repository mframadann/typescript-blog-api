import { App } from "./core";

App.app.listen(App.port, () => {
  console.log(`Server running at http://localhost:${App.port}`);
});
