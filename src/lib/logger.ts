export interface Logger {
  info(message: string, data?: any): void
  warn(message: string, data?: any): void
  error(message: string, data?: any): void
  debug(message: string, data?: any): void
}

class ConsoleLogger implements Logger {
  private log(level: string, message: string, data?: any) {
    const timestamp = new Date().toISOString()
    const logData = data ? ` | Data: ${JSON.stringify(data)}` : ""
    console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}${logData}`)
  }

  info(message: string, data?: any) {
    this.log("info", message, data)
  }

  warn(message: string, data?: any) {
    this.log("warn", message, data)
  }

  error(message: string, data?: any) {
    this.log("error", message, data)
  }

  debug(message: string, data?: any) {
    this.log("debug", message, data)
  }
}

export const logger: Logger = new ConsoleLogger()
