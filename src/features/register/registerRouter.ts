import { AuthRouters } from "../../core";
import RegisterController from "./registerControllers";

class RegisterRouter extends AuthRouters {
  getMethods(): void {}
  putMethods(): void {}
  deleteMethods(): void {}
  postMethods(): void {
    this.router.post("/", RegisterController.createNewUser);
  }
}

export default new RegisterRouter().router;
