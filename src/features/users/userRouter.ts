import { Router } from "express";
import { IRouters } from "../../interfaces";
import UsersControllers from "./userControllers";
class UsersRouter implements IRouters {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getMethods();
  }

  getMethods(): void {
    this.router.get("/", UsersControllers.getAllUsers);
    this.router.get("/find", UsersControllers.getOneUser);
  }
  postMethods(): void {}
  putMethods(): void {}
  deleteMethods(): void {}
}

export default new UsersRouter().router;
