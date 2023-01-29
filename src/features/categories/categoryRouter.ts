import { Routers } from "../../core";
import CategoryControllers from "./categoryControllers";

class CategoryRouter extends Routers {
  getMethods(): void {
    this.router.get("/", CategoryControllers.getAllCategories);
    this.router.get("/find", CategoryControllers.getCategoryById);
  }
  postMethods(): void {
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
