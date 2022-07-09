import { Prisma } from "@prisma/client";
import { Response } from "express";

export type ErrorObjectSchema = { status: number; message: string };

/**
 * Utility function to create a  error response
 *
 * Must be used inside the route handler;
 *
 * For generic errors which don't contain the status; We send 400
 */
export const sendErrorResponse = (
  res: Response,
  err: ErrorObjectSchema | Error | Prisma.PrismaClientKnownRequestError
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // TODO: Make error messages better
  }

  return res.status((err as any).status ?? 400).send({
    error: true,
    message: err.message,
  });
};
