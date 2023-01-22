import express, { Application } from "express";
import { Register } from "./features";

class Applications {
  public app: Application;
  public port: Number;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.port = 3000;
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
  }

  private routes(): void {
    this.app.use("/register", Register);
  }
}

const app = new Applications();
app.app.listen(app.port, () => {
  console.log(`Server running at http://localhost:${app.port}`);
});
