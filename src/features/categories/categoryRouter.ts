import { Router } from "express";
import { IRouters } from "../../interfaces";
import { Authorization } from "../../utils";
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
    this.router.use(Authorization);
    this.router.get("/", CategoryControllers.getAllCategories);
    this.router.get("/find", CategoryControllers.getCategoryById);
  }
  postMethods(): void {
    this.router.use(Authorization);
    this.router.post("/create", CategoryControllers.createNewCategory);
  }
  putMethods(): void {
    this.router.put("/update", CategoryControllers.updateCategory);
  }
  deleteMethods(): void {
    this.router.delete("/delete", CategoryControllers.deleteCategory);
  }
}

export default new CategoryRouter().router;
