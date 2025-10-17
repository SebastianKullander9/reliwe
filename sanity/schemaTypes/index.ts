import { type SchemaTypeDefinition } from 'sanity';
import { estateProject } from './schemas/estateProject';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [estateProject],
}
