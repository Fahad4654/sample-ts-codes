import { spawn, ChildProcess } from 'child_process';
import { EventEmitter } from 'events';

interface ProcessResult {
  exitCode: number | null;
  stdout: string;
  stderr: string;
}

class ChildProcessWrapper extends EventEmitter {
  private childProcess: ChildProcess;
  private stdout: string = '';
  private stderr: string = '';
  private completed: boolean = false;

  constructor(command: string, args: string[], options?: any) {
    super();
    this.childProcess = spawn(command, args, options);

    this.childProcess.stdout?.on('data', (data: Buffer) => {
      this.stdout += data.toString();
      this.emit('stdout', data.toString());
    });

    this.childProcess.stderr?.on('data', (data: Buffer) => {
      this.stderr += data.toString();
      this.emit('stderr', data.toString());
    });

    this.childProcess.on('close', (code: number | null) => {
      this.completed = true;
      this.emit('close', code);
      this.emit('done', { exitCode: code, stdout: this.stdout, stderr: this.stderr });
    });

    this.childProcess.on('error', (err: Error) => {
      this.emit('error', err);
    });
  }

  public kill(signal?: NodeJS.Signals): void {
    this.childProcess.kill(signal);
  }

  public promise(): Promise<ProcessResult> {
    return new Promise((resolve, reject) => {
      this.on('done', (result: ProcessResult) => {
        resolve(result);
      });
      this.on('error', (err: Error) => {
        reject(err);
      });
    });
  }

  public isCompleted(): boolean {
    return this.completed;
  }

  public getStdout(): string {
    return this.stdout;
  }

  public getStderr(): string {
    return this.stderr;
  }
}

export default ChildProcessWrapper;