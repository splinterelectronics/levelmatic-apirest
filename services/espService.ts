export default class EspService {
  private static instance: EspService;

  public static get Instance(): EspService {
    if (!EspService.instance) {
      EspService.instance = new EspService();
    }
    return EspService.instance;
  }

  public Testing() {}
}
