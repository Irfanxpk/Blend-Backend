// export class CustomError extends Error {
//   constructor(message: string) {
//     super(message);
//     this.name = "CustomError";
//   }
// }

import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

// const errorHandler = (
//   err: Error | CustomError,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (err instanceof CustomError) {
//     res.status(err.statusCode).json({
//       message: err.message,
//       statusCode: err.statusCode,
//     });
//   } else {
//     res.status(500).json({
//       message: "Internal Server Error",
//       statusCode: 500,
//     });
//   }
// };

export { CustomError};
