class CustomError extends Error {
  public statusCode: number;
  public details?: any;

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

function doSomething(input: number): void {
  if (input < 0) {
    throw new CustomError("Input cannot be negative", 400, {input});
  }
  console.log("Processing input:", input);
}

try {
  doSomething(-5);
} catch (error) {
  if (error instanceof CustomError) {
    console.error(`Custom Error: ${error.message}, Status: ${error.statusCode}, Details:`, error.details);
  } else {
    console.error("Unexpected error:", error);
  }
}