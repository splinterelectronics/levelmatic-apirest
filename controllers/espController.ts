/* eslint-disable consistent-return */
import { FastifyReply, FastifyRequest } from 'fastify';
import EspService from '../services/espService';

const service = EspService.Instance;

export default class EspController {
  private static instance: EspController;

  public static get Instance(): EspController {
    if (!EspController.instance) {
      EspController.instance = new EspController();
    }
    return EspController.instance;
  }

  public async exist(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { idESP } = <any>req.body;
      const espExist = await service.getById(idESP);
      if (!espExist) {
        return reply
          .code(400)
          .send({ ok: false, message: 'No existe el ESP con esa ID' });
      }
      return;
    } catch (error) {
      console.log(error);
      return reply.send(500).send({ ok: false, message: 'Internal Error' });
    }
  }
}
