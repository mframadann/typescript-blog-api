import { Router } from "express";
import RegisterController from "./registerControllers";

class RegisterRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.postMethods();
  }
  private postMethods(): void {
    this.router.post("/", RegisterController.createNewUser);
  }
}

export default new RegisterRouter().router;
