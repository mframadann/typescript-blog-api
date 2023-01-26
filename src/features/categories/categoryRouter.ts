import { Router } from "express";
import { IRouters } from "../../interfaces";
import CategoryControllers from "./categoryControllers";

class CategoryRouter implements IRouters {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getMethods();
    this.postMethods();
    this.putMethods();
    this.deleteMethods();
  }

  getMethods(): void {
    this.router.get("/", CategoryControllers.getAllCategories);
  }
  postMethods(): void {
    this.router.post("/create", CategoryControllers.createNewCategory);
  }
  putMethods(): void {}
  deleteMethods(): void {}
}

export default new CategoryRouter().router;
