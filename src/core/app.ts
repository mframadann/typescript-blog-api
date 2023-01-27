import express, { Application } from "express";
import { Categories, Medias, Posts, Register, Users } from "../features";
import logger from "morgan";
import path from "path";
import compression from "compression";

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
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(logger("dev"));
    this.app.use("/tmp", express.static(path.join(__dirname, "/tmp/uploads")));
  }

  private routes(): void {
    this.app.use("/register", Register);
    this.app.use("/users", Users);
    this.app.use("/posts", Posts);
    this.app.use("/categories", Categories);
    this.app.use("/medias", Medias);
  }
}

export default new Applications();
