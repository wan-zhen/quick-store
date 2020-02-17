import { Rule, SchematicContext, Tree, url, apply, mergeWith, applyTemplates, filter } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { strings } from '@angular-devkit/core';
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function quickStore(_options: Schema): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const AKITA_PATH = './src/app/@akita';
    const storeName = _options.name;
    // add index code
    ['mock', 'query', 'services', 'store']
      .forEach(file => {
        if (file === 'mock' && !_options.hasMock) {
          return
        }
        const path = `${AKITA_PATH}/${file}/index.ts`;
        tree.commitUpdate(
          tree.beginUpdate(path)
            .insertLeft(
              (tree.read(path) || []).toString().length,
              `export * from './${strings.dasherize(storeName)}.${file}';\n`
            )
        )
      });

    // edit module code
    const modulePath = `${AKITA_PATH}/@akita.module.ts`;
    const importModuleName = ['MockService', 'Query', 'Service', 'Store'];
    ['mock', 'queries', 'services', 'stores']
      .forEach((file, index) => {
        if (file === 'mock' && !_options.hasMock) {
          return
        }
        tree.commitUpdate(
          tree.beginUpdate(modulePath)
            .insertLeft(
              (tree.read(modulePath) || []).toString().indexOf(`} from './${file}'`),
              `  ${strings.classify(storeName)}${importModuleName[index]},\n`
            )
        )
      });
    // insert provider
    tree.commitUpdate(
      tree.beginUpdate(modulePath)
        .insertLeft(
          (tree.read(modulePath) || []).toString().indexOf(`{ provide:`),
          `  ${strings.classify(storeName)}Query,\n  ${strings.classify(storeName)}Store,\n`
        )
    )

    tree.commitUpdate(
      tree.beginUpdate(modulePath)
        .insertLeft(
          (tree.read(modulePath) || []).toString().indexOf(`];`),
          _options.hasMock ?
            `  { provide: ${strings.classify(storeName)}Service, useClass: useMock ? ${strings.classify(storeName)}MockService : ${strings.classify(storeName)}Service },\n`
            :
            `  ${strings.classify(storeName)}Service,\n`
        )
    )
    //add template
    const sourceTemplates = url('./files'); // 使用範本
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      filterTemplates(_options),
      applyTemplates({
        ..._options, // 使用者所輸入的參數
        ...strings
      }),
    ]);

    return mergeWith(sourceParametrizedTemplates);
  };
}

function filterTemplates(_options: Schema): Rule {
  if (!_options.hasMock) {
    return filter(path => path.indexOf('mock') === -1)
  }
  return filter(() => true)
}