import { Router } from "express";
import { IRouters } from "../interfaces";

abstract class Routers implements IRouters {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getMethods();
    this.postMethods();
    this.putMethods();
    this.deleteMethods();
  }
  abstract getMethods(): void;
  abstract postMethods(): void;
  abstract putMethods(): void;
  abstract deleteMethods(): void;
}

export default Routers;
