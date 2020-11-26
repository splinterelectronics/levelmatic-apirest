/* eslint-disable consistent-return */
import { FastifyReply, FastifyRequest } from 'fastify';
import EspService from '../services/espService';
import { EspUpdateRequest } from '../interfaces/espInterfaces';

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
      return reply.code(500).send({ ok: false, message: 'Internal Error' });
    }
  }

  public async update(req: EspUpdateRequest, reply: FastifyReply) {
    try {
      const { id, name, notification, minLevel } = req.body;
      const data = { name, notification, minLevel };
      const espUpdated = await service.updateById(id, data);
      if (!espUpdated) {
        return reply
          .code(400)
          .send({ ok: false, message: 'No se pudo actualizar' });
      }
      return reply.code(200).send({ ok: true, espUpdated });
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, message: 'Internal Error' });
    }
  }
}
