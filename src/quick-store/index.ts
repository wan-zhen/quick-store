import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function quickStore(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const AKITA_PATH = './src/app/@akita/';
    const storeName = _options.name;
    tree.create(`${AKITA_PATH}/mock/${storeName}-mock.service.ts`, `console.log('hello ${_options.name}')`)
    return tree;
  };
}
