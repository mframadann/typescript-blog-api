import { Router } from "express";
import PostControllers from "./postControllers";

class PostRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getMethods();
  }

  private getMethods(): void {
    this.router.get("/", PostControllers.getAllPosts);
  }
}

export default new PostRouter().router;
