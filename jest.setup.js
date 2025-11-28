import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.Request = class Request {
  constructor(url, options) {
    this.url = url;
    this.options = options;
  }
};

global.Response = class Response {
  constructor(body, options) {
    this.body = body;
    this.options = options;
  }
};

global.Headers = class Headers {
  constructor(headers) {
    this.headers = headers || {};
  }
};