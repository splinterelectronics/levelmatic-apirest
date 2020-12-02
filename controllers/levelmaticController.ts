/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import { FastifyReply } from 'fastify';
import { ILevelmaticCred } from '../interfaces/levelmaticInterfaces';
import LevelmaticService from '../services/levelmaticService';

const service = LevelmaticService.Instance;

export default class LevelmaticController {
  private static instance: LevelmaticController;

  public static get Instance(): LevelmaticController {
    if (!LevelmaticController.instance) {
      LevelmaticController.instance = new LevelmaticController();
    }
    return LevelmaticController.instance;
  }

  public async existByCred(req: any, reply: FastifyReply) {
    try {
      const { ipNet, wifiPassword, wifiSSID } = <ILevelmaticCred>req.body;
      const levelmaticExist = await service.getLevelmaticByCredentials({
        ipNet,
        wifiPassword,
        wifiSSID,
      });
      if (!levelmaticExist) {
        return reply.code(400).send({
          ok: false,
          message: 'No se pudo encontrar ningún levelmaticWiFi',
        });
      }
      req.idLevelmatic = levelmaticExist._id;
      return true;
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, message: 'Internal Error' });
    }
  }
}
