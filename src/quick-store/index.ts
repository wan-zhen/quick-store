import { Rule, SchematicContext, Tree, url, apply, template, mergeWith } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { strings } from '@angular-devkit/core';
//import * as ts from 'typescript';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function quickStore(_options: Schema): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const AKITA_PATH = './src/app/@akita';
    const storeName = _options.name;

    ['mock', 'query', 'services', 'store']
      .forEach(file => {
        if (file === 'mock' && !_options.hasMock) {
          return
        }
        tree.commitUpdate(
          tree.beginUpdate(`${AKITA_PATH}/${file}/index.ts`)
            .insertLeft(
              (tree.read(`${AKITA_PATH}/${file}/index.ts`) || []).toString().length,
              `export * from './${strings.dasherize(storeName)}.${file}';\n`
            )
        )
      })

    const sourceTemplates = url('./files'); // 使用範本
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options, // 使用者所輸入的參數
        ...strings
      }),
    ]);

    return mergeWith(sourceParametrizedTemplates);
  };
}
