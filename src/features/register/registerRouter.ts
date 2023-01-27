import { Routers } from "../../core";
import RegisterController from "./registerControllers";

class RegisterRouter extends Routers {
  getMethods(): void {}
  putMethods(): void {}
  deleteMethods(): void {}
  postMethods(): void {
    this.router.post("/", RegisterController.createNewUser);
  }
}

export default new RegisterRouter().router;
