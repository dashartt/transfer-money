import { Request, Response, NextFunction } from "express";

class ErrorHandler {
  middleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err.message.includes("|")) {
      const [status, messages] = err.message.split("|");
      const errorMessages = messages.split(",");
      return res.status(Number(status)).json({ errors: errorMessages });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default ErrorHandler;
