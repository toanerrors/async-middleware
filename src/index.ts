type Request = any;
type Response = any;
type NextFunction = (error?: any) => void;
type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;

type METHODS =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head"
  | "all";
type Config = { methods?: METHODS[] };

/**
 * Wraps asynchronous request handlers to ensure errors are passed to Express's next function.
 * @param fn The asynchronous request handler function.
 * @returns A RequestHandler function that handles asynchronous operations.
 */
function asyncHandle(fn: RequestHandler): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Enhances an Express-like application object with asynchronous middleware support for specified HTTP methods.
 * @param app The application object representing an Express-like application.
 * @param config Optional configuration object with an array of HTTP methods that need enhanced asynchronous middleware support.
 *               If not provided, it defaults to ["get", "post", "put", "delete", "patch"].
 */
export function asyncMiddleware(app: any, config?: Config): void {
  // Default supported methods if none are provided in the configuration
  const SUPPORTED_METHODS: METHODS[] = config?.methods || [
    "get",
    "post",
    "put",
    "delete",
    "patch",
  ];

  // Iterate over each supported method
  SUPPORTED_METHODS.forEach((method) => {
    // Bind the original method from the app object
    const originalMethod = app[method]?.bind(app);
    if (!originalMethod) return;

    // Override the original method to support asynchronous middleware
    app[method] = (path: string, ...handlers: RequestHandler[]) => {
      // Wrap each handler with asyncHandle to catch errors and pass them to next
      originalMethod(path, ...handlers.map((handler) => asyncHandle(handler)));
    };
  });
}
