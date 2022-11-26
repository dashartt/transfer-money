import { Request, Response, NextFunction } from "express";

export interface CustomError {
  message: string;
}

class ErrorHandler {
  catchErrors(err: Error, _req: Request, res: Response, next: NextFunction) {
    if (err.message.includes("|")) {
      const [status, messages] = err.message.split("|");
      const errorMessages = messages.split(",");
      return res.status(Number(status)).json({ errors: errorMessages });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default ErrorHandler;
