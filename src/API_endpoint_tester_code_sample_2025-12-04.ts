interface EndpointTestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  expectedStatus: number;
  expectedResponse?: any;
}

async function testEndpoint(config: EndpointTestConfig): Promise<boolean> {
  try {
    const response = await fetch(config.url, {
      method: config.method,
      headers: config.headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
    });

    if (response.status !== config.expectedStatus) {
      console.error(`Status code mismatch: Expected ${config.expectedStatus}, got ${response.status}`);
      return false;
    }

    const data = await response.json();

    if (config.expectedResponse && JSON.stringify(data) !== JSON.stringify(config.expectedResponse)) {
      console.error(`Response mismatch: Expected ${JSON.stringify(config.expectedResponse)}, got ${JSON.stringify(data)}`);
      return false;
    }

    return true;

  } catch (error) {
    console.error("Error during API call:", error);
    return false;
  }
}

async function runTests(tests: EndpointTestConfig[]): Promise<void> {
  let allPassed = true;
  for (const test of tests) {
    const passed = await testEndpoint(test);
    console.log(`Test for ${test.url} ${passed ? 'passed' : 'failed'}`);
    if (!passed) {
      allPassed = false;
    }
  }
  console.log(`All tests ${allPassed ? 'passed' : 'failed'}`);
}