import LevelmaticController from '../../controllers/levelmaticController';
import UserController from '../../controllers/userController';

const userController = UserController.Instance;
const levelmaticController = LevelmaticController.Instance;

export const userAddDevicePreHandler = levelmaticController.existByCred;
export const userRegisterPreHandler = userController.exist;
