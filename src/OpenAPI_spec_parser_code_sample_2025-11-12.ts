import { OpenAPIObject, parse } from 'openapi3-ts';

async function parseOpenAPI(specPath: string): Promise<OpenAPIObject | null> {
  try {
    const spec: OpenAPIObject = await parse(specPath);
    return spec;
  } catch (error: any) {
    console.error(`Error parsing OpenAPI spec: ${error.message}`);
    return null;
  }
}

async function main() {
  const specPath = 'openapi.yaml'; // Replace with your spec path
  const openAPIObject = await parseOpenAPI(specPath);

  if (openAPIObject) {
    console.log('OpenAPI Spec Parsed Successfully!');
    console.log(`API Title: ${openAPIObject.info.title}`);
    // Further processing of openAPIObject
  } else {
    console.log('Failed to parse OpenAPI Spec.');
  }
}

if (require.main === module) {
  main();
}