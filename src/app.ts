import express, { Application } from "express";
import { Categories, Posts, Register, Users } from "./features";
import logger from "morgan";

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
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(logger("dev"));
  }

  private routes(): void {
    this.app.use("/register", Register);
    this.app.use("/users", Users);
    this.app.use("/posts", Posts);
    this.app.use("/categories", Categories);
  }
}

export default new Applications();
