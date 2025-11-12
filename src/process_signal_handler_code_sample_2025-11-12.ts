import { once } from 'events';

async function main() {
  console.log(`Process PID: ${process.pid}`);

  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGUSR2'];

  for (const signal of signals) {
    process.on(signal, () => {
      console.log(`Received ${signal}! Cleaning up...`);
      process.exit(0);
    });
  }

  console.log('Waiting for signals...');
  await once(process, 'beforeExit');
  console.log('Exiting gracefully.');
}

main().catch(err => {
  console.error('An error occurred:', err);
  process.exit(1);
});