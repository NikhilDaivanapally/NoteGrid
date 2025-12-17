export type ActionResponse<T = unknown> =
  | {
      success: true;
      message: string;
      data: T;
    }
  | {
      success: false;
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
      error?: {
        code?: string;
        message?: string;
        details?: unknown;
      };
    };

