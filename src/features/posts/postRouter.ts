import { Routers } from "../../core";
import PostControllers from "./postControllers";

class PostRouter extends Routers {
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
