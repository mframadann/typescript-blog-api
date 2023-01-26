import { Router } from "express";
import { IRouters } from "../../interfaces";
import { upload } from "../../utils";
import MediaControllers from "./mediaControllers";

class MediaRouter implements IRouters {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getMethods();
    this.postMethods();
    this.putMethods();
    this.deleteMethods();
  }
  getMethods(): void {}
  postMethods(): void {
    this.router.post(
      "/upload",
      upload.single("image"),
      MediaControllers.uploadNewMedia
    );
  }
  putMethods(): void {}
  deleteMethods(): void {}
}

export default new MediaRouter().router;
