import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import openapiTS, { astToString } from 'openapi-typescript';
import ts from 'typescript';

const BLOB = ts.factory.createTypeReferenceNode(
  ts.factory.createIdentifier('Blob'),
); // `Blob`
const NULL = ts.factory.createLiteralTypeNode(ts.factory.createNull()); // `null`

async function generateApiSchema() {
  const swaggerUser = Bun.env.SWAGGER_USER;
  const swaggerPassword = Bun.env.SWAGGER_PASSWORD;

  if (!swaggerUser || !swaggerPassword) {
    console.error('SWAGGER_USER and SWAGGER_PASSWORD must be set in .env file');
    process.exit(1);
  }

  const swaggerUrl = 'https://api.stg.ziggle.gistory.me/api-json';
  const outputPath = join(process.cwd(), 'src/@types/api-schema.ts');

  try {
    // Swagger JSON 다운로드
    console.log('Downloading Swagger JSON...');
    const response = await fetch(swaggerUrl, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${swaggerUser}:${swaggerPassword}`).toString('base64')}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to download Swagger JSON: ${response.status} ${response.statusText}`,
      );
    }

    const swaggerJson = await response.json();

    console.log('Generating TypeScript types...');

    for (const path in swaggerJson.paths) {
      for (const method in swaggerJson.paths[path]) {
        for (const res in swaggerJson.paths[path][method].responses) {
          if (Number.parseInt(res) < 400) continue;
          const content =
            swaggerJson.paths[path][method].responses[res].content;
          if (content) continue;
          swaggerJson.paths[path][method].responses[res].content = {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorDto',
              },
            },
          };
        }
      }
    }

    swaggerJson.components.schemas['ErrorDto'] = {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        error: {
          type: 'string',
        },
        statusCode: {
          type: 'number',
        },
      },
      required: ['message', 'error', 'statusCode'],
    };

    const ast = await openapiTS(swaggerJson, {
      enum: true,
      dedupeEnums: true,
      makePathsEnum: true,
      arrayLength: true,
      transform(schemaObject) {
        if (schemaObject.format === 'binary') {
          return schemaObject.nullable
            ? ts.factory.createUnionTypeNode([BLOB, NULL])
            : BLOB;
        }
        return undefined;
      },
    });

    const contents = astToString(ast);

    const outputDir = dirname(outputPath);
    mkdirSync(outputDir, { recursive: true });

    writeFileSync(outputPath, contents, 'utf-8');

    console.log('API schema generated successfully!');
  } catch (error) {
    console.error('Error generating API schema:', error);
    process.exit(1);
  }
}

generateApiSchema();
