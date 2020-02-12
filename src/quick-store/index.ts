import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function quickStore(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log(_options.name)
    return tree;
  };
}
