interface LogContext {
  userId?: number
  action: string
  details?: any
  error?: Error
}

export class Logger {
  static info(message: string, context?: LogContext) {
    console.log(`[INFO] ${message}`, context ? JSON.stringify(context, null, 2) : '')
  }

  static error(message: string, context?: LogContext) {
    console.error(`[ERROR] ${message}`, context ? JSON.stringify(context, null, 2) : '')
  }

  static warn(message: string, context?: LogContext) {
    console.warn(`[WARN] ${message}`, context ? JSON.stringify(context, null, 2) : '')
  }
}