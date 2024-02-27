import fs from 'fs'
import fsp from 'fs/promises'
import path from 'node:path'
import ts from 'typescript'

const paths = {
  '@framework': ['/home/jorge/agile/src/framework/index.ts'],
  '@domain': ['/home/jorge/agile/src/backend/domain/index.ts'],
  '@application': ['/home/jorge/agile/src/backend/application/index.ts'],
  '@presentation': ['/home/jorge/agile/src/backend/presentation/index.ts'],
  '@infrastructure': ['/home/jorge/agile/src/backend/infrastructure/index.ts'],
}

async function resolveTs(specifier, context) {
  if (paths[specifier]) return `file://${paths[specifier]}`
  const { parentURL } = context
  if (
    !specifier.startsWith('.') &&
    !specifier.startsWith('/') &&
    !specifier.startsWith('file://')
  ) {
    return null
  }
  const url = new URL(parentURL ?? specifier)
  let specifierPath = parentURL
    ? path.join(path.dirname(url.pathname), specifier)
    : url.pathname
  const isDirectory =
    fs.existsSync(specifierPath) && fs.statSync(specifierPath).isDirectory()
  const extension = path.basename(specifier).split('.').at(-1)
  if (['js', 'cjs', 'mjs'].includes(extension) && !isDirectory) {
    return null
  }

  if (fs.existsSync(specifierPath + '.ts')) {
    return `file://${specifierPath + '.ts'}`
  } else if (isDirectory) {
    const indexPath = path.join(specifierPath, 'index.ts')
    if (fs.existsSync(indexPath)) {
      return `file://${indexPath}`
    }
  }
  return null
}

// export async function initialize() {
//   // Receives data from `register`.
// }

export async function resolve(specifier, context, nextResolve) {
  // if(specifier == "class-validator") return {
  //   shortCircuit: true,
  //   url: 'file:///home/jorge/agile/node_modules/class-validator/esm2015/index.js',

  // }
  const tsFileUrl = await resolveTs(specifier, context)
  if (tsFileUrl) {
    return {
      shortCircuit: true,
      url: tsFileUrl,
    }
  }
  return nextResolve(specifier)
}

export async function load(url, context, nextLoad) {
  const urlObj = new URL(url)
  if (urlObj.protocol === 'file:' && urlObj.pathname.endsWith('.ts')) {
    const filename = path.basename(urlObj.pathname)
    const tsSource = await fsp.readFile(urlObj.pathname, { encoding: 'utf-8' })
    const transpileResult = ts.transpileModule(tsSource, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: 'es2015',
        esModuleInterop: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        sourceMap: true,
        allowJs: true,
        resolveJsonModule: true,
        allowSyntheticDefaultImports: true,
      },
    })
    const sourceMap = JSON.parse(transpileResult.sourceMapText)
    sourceMap.file = filename
    sourceMap.sources[0] = `./${filename}`
    let source = transpileResult.outputText
    source = `${source.substring(0, source.lastIndexOf('\n'))}\n//# sourceMappingURL=data:application/json;base64,${btoa(JSON.stringify(sourceMap))}`
    return {
      shortCircuit: true,
      format: 'module',
      source,
    }
  }
  return nextLoad(url)
}
