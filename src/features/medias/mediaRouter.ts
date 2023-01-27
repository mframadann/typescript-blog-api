import { Routers } from "../../core";
import { upload } from "../../utils";
import MediaControllers from "./mediaControllers";

class MediaRouter extends Routers {
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
