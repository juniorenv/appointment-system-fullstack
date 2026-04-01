import { QueryFailedError } from "typeorm";

interface DatabaseError {
  code: string;
  detail?: string;
  constraint?: string;
}

function isDatabaseError(error: unknown): error is DatabaseError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as DatabaseError).code === "string"
  );
}

export function isUniqueViolation(error: unknown): boolean {
  if (error instanceof QueryFailedError) {
    return (
      isDatabaseError(error.driverError) && error.driverError.code === "23505"
    );
  }
  return false;
}
