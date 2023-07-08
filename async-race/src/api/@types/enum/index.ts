export enum StatusCode {
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
  TooManyRequests = 429,
  OK = 200
}

export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}
