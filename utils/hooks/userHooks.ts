import EspController from '../../controllers/espController';
import UserController from '../../controllers/userController';

const espController = EspController.Instance;
const userController = UserController.Instance;

export const userAddDevicePreHandler = espController.exist;

export const userRegisterPreHandler = userController.exist;
