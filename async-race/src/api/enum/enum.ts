export enum EngineStatus {
  Start = 'started',
  Stop = 'stopped',
  Drive = 'drive'
}

export enum Endpoint {
  Garage = '/garage',
  Winners = '/winners',
  Engine = '/engine'
}

export enum ServerErrorCode {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
  ServiceUnavailable = 503
}
