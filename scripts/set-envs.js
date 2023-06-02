const { writeFileSync, mkdirSync } = require('fs')
require('dotenv').config();

const targerPath = './src/environments/environments.ts';

const envFileContent = `
export const environment={
  mapbox_key: "${process.env['MAPBOX_KEY']}"
}
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync( targerPath, envFileContent )

