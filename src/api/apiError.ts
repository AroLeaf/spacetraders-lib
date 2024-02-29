export interface APIErrorData {
  message: string;
  code: number;
  data?: any;
}

export class APIError extends Error {
  code: number;
  data?: any;

  constructor(path: string, error: APIErrorData) {
    super(error.message);
    this.name = `APIError(${path})`;
    this.code = error.code;
    this.data = error.data;
  }
}