import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data && typeof data === "string") {
      return data.replace("Something went wrong. Error: ", "");
    }

    // Check for Zod-style errors in the 'error' field
    if (data && typeof data === "object" && "error" in data) {
      const errorData = data as {
        error: Array<{ path: string[]; message: string }>
      };
      if (Array.isArray(errorData.error)) {
        return errorData.error
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join(", ");
      }
    }

    return "Unrecognized axios error";
  }

  if (error instanceof Error) return error.message;

  console.error("Unknown error", error);
  return "Unknown error";
};
