import { FastifyReply, FastifyRequest } from 'fastify';
import { sendMail } from '../utils/nodemailer/config';

export default class EmailController {
  private static instance: EmailController;

  public static get Instance(): EmailController {
    if (!EmailController.instance) {
      EmailController.instance = new EmailController();
    }
    return EmailController.instance;
  }

  /**
   * recoverPassword
   */
  public async recoverPassword(req: FastifyRequest, reply: FastifyReply) {
    try {
      const emailSent = await sendMail({
        from: 'info@levelmatic.net',
        to: 'jomiva5016@gmail.com',
        subject: 'message title',
        text: 'probando mensajes',
      });
      if (emailSent) {
        console.log(emailSent);
        reply.send({ ok: true, message: 'email enviado' });
      }
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ ok: false, code: 500 });
    }
  }
}
