import { Router } from "express";
import { IRouters } from "../../interfaces";
import PostControllers from "./postControllers";

class PostRouter implements IRouters {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getMethods();
    this.postMethods();
    this.putMethods();
    this.deleteMethods();
  }
  getMethods(): void {
    this.router.get("/", PostControllers.getAllPosts);
    this.router.get("/find", PostControllers.getPostById);
  }
  postMethods(): void {
    this.router.post("/create", PostControllers.createNewPosts);
  }
  putMethods(): void {
    this.router.put("/update", PostControllers.updatePost);
  }
  deleteMethods(): void {
    this.router.delete("/delete", PostControllers.deletePosts);
  }
}

export default new PostRouter().router;
