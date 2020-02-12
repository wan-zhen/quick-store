//import { Rule, SchematicContext, Tree, url, apply, template, mergeWith } from '@angular-devkit/schematics';
import { Rule, url, apply, template, mergeWith } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { strings } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function quickStore(_options: Schema): Rule {
  // return (tree: Tree, _context: SchematicContext) => {
  return () => {
    // const AKITA_PATH = './src/app/@akita/';
    // const storeName = _options.name;
    const sourceTemplates = url('./files'); // 使用範本
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options, // 使用者所輸入的參數
        ...strings
      }),
    ]);
    // tree.create(`${AKITA_PATH}/mock/${storeName}-mock.service.ts`, `console.log('hello ${_options.name}')`)
    // return tree;
    return mergeWith(sourceParametrizedTemplates);
  };
}
