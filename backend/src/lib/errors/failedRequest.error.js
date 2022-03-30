class FailedRequestError extends Error {
  constructor() {
    const message = "Something went wrong";
    super(message);
  }
}

module.export = FailedRequestError;
