import { FastifyReply } from 'fastify';
import MeasureService from '../services/measureService';
import { MeasureReadRequest } from '../interfaces/measureInterfaces';
import getDateArray from '../utils/helpers/getDateArray';

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
      const { idESP, range } = req.query;
      const measures = await service.getByEspId(idESP, range);
      const dataY: any[] = measures;
      const liquidLevels = measures[0]?.liquidLevel
        ? dataY.map(({ liquidLevel }) => liquidLevel)
        : dataY.map(({ avgValue }) => avgValue);
      return reply
        .code(200)
        .send({ liquidLevels, dataX: getDateArray(measures, range) });
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, code: 500 });
    }
  }
}
