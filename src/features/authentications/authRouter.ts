import { AuthRouters } from "../../core";
import AuthControllers from "./authControllers";

class AuthRouter extends AuthRouters {
  getMethods(): void {}
  postMethods(): void {
    this.router.post("/login", AuthControllers.login);
    this.router.post("/refresh", AuthControllers.refreshToken);
  }
  putMethods(): void {}
  deleteMethods(): void {}
}

export default new AuthRouter().router;
