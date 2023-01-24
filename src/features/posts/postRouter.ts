import { Router } from "express";
import PostControllers from "./postControllers";

class PostRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getMethods();
    this.postMethods();
  }

  private getMethods(): void {
    this.router.get("/", PostControllers.getAllPosts);
    this.router.get("/find", PostControllers.getPostById);
  }
  private postMethods(): void {
    this.router.post("/create", PostControllers.createNewPosts);
  }
}

export default new PostRouter().router;
