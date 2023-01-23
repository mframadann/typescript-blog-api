import { Router } from "express";
import UsersControllers from "./userControllers";
class UsersRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getMethods();
  }

  private getMethods(): void {
    this.router.get("/", UsersControllers.getAllUsers);
    this.router.get("/find", UsersControllers.getOneUser);
  }
}

export default new UsersRouter().router;
