import { Routers } from "../../core";
import UsersControllers from "./userControllers";
class UsersRouter extends Routers {
  getMethods(): void {
    this.router.get("/", UsersControllers.getAllUsers);
    this.router.get("/find", UsersControllers.getOneUser);
  }
  postMethods(): void {}
  putMethods(): void {}
  deleteMethods(): void {}
}

export default new UsersRouter().router;
