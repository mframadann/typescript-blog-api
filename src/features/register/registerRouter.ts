import { Router } from "express";
import { IRouters } from "../../interfaces";
import RegisterController from "./registerControllers";

class RegisterRouter implements IRouters {
  public router: Router;
  constructor() {
    this.router = Router();
    this.postMethods();
  }
  getMethods(): void {}
  putMethods(): void {}
  deleteMethods(): void {}
  postMethods(): void {
    this.router.post("/", RegisterController.createNewUser);
  }
}

export default new RegisterRouter().router;
