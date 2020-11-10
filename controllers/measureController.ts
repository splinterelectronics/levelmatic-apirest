import { FastifyReply } from 'fastify';
import MeasureService from '../services/measureService';
import { MeasureReadRequest } from '../interfaces/measureInterfaces';

const service = MeasureService.Instance;

export default class MeasureController {
  private static instance: MeasureController;

  public static get Instance(): MeasureController {
    if (!MeasureController.instance) {
      MeasureController.instance = new MeasureController();
    }
    return MeasureController.instance;
  }

  /**
   * read
   */
  public async read(req: MeasureReadRequest, reply: FastifyReply) {
    try {
      const { idESP } = req.query;
      const measures = await service.getByEspId(idESP);
      return reply.send(measures);
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, code: 500 });
    }
  }
}
