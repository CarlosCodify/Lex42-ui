#!/usr/bin/env node
import { optimize } from 'svgo';
import { readdir, readFile, writeFile, mkdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de SVGO
const svgoConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIds: false
        }
      }
    },
    'removeDimensions',
    'removeTitle',
    'removeDesc',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupAttrs',
    'mergeStyles',
    'inlineStyles',
    'minifyStyles',
    'convertStyleToAttrs',
    'cleanupIds',
    'removeUselessDefs',
    'cleanupNumericValues',
    'convertColors',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'removeHiddenElems',
    'removeEmptyText',
    'convertShapeToPath',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    'convertPathData',
    'convertTransform',
    'removeEmptyAttrs',
    'removeEmptyContainers',
    'mergePaths',
    'removeUnusedNS',
    'sortAttrs',
    'sortDefsChildren',
    'removeOffCanvasPaths'
  ]
};

// Colores para el log
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

async function getFileSize(filePath) {
  const stats = await stat(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function optimizeSVG(inputPath, outputPath) {
  try {
    const svgString = await readFile(inputPath, 'utf-8');
    const originalSize = Buffer.byteLength(svgString, 'utf8');
    
    const result = optimize(svgString, {
      path: inputPath,
      ...svgoConfig
    });
    
    await writeFile(outputPath, result.data, 'utf-8');
    
    const optimizedSize = Buffer.byteLength(result.data, 'utf8');
    const saved = originalSize - optimizedSize;
    const savedPercent = ((saved / originalSize) * 100).toFixed(1);
    
    return {
      file: basename(inputPath),
      originalSize,
      optimizedSize,
      saved,
      savedPercent
    };
  } catch (error) {
    console.error(`${colors.red}❌ Error optimizando ${basename(inputPath)}: ${error.message}${colors.reset}`);
    return null;
  }
}

async function processDirectory(inputDir, outputDir) {
  try {
    await mkdir(outputDir, { recursive: true });
  } catch (error) {
    // Directorio ya existe
  }
  
  const files = await readdir(inputDir, { withFileTypes: true });
  const results = [];
  
  for (const file of files) {
    const inputPath = join(inputDir, file.name);
    const outputPath = join(outputDir, file.name);
    
    if (file.isDirectory()) {
      const subResults = await processDirectory(inputPath, outputPath);
      results.push(...subResults);
    } else {
      const ext = extname(file.name).toLowerCase();
      if (ext === '.svg') {
        console.log(`${colors.blue}🔄 Optimizando: ${file.name}${colors.reset}`);
        const result = await optimizeSVG(inputPath, outputPath);
        if (result) {
          results.push(result);
          console.log(`${colors.green}✅ ${result.file}: ${formatBytes(result.originalSize)} → ${formatBytes(result.optimizedSize)} (${result.savedPercent}% ahorrado)${colors.reset}`);
        }
      }
    }
  }
  
  return results;
}

async function main() {
  console.log(`\n${colors.blue}🚀 Iniciando optimización de SVGs...${colors.reset}\n`);
  
  const projectRoot = join(__dirname, '..');
  const inputDir = join(projectRoot, 'public', 'assets', 'images');
  const outputDir = join(projectRoot, 'public', 'assets', 'images-optimized');
  
  console.log(`📂 Directorio de entrada: ${inputDir}`);
  console.log(`📂 Directorio de salida: ${outputDir}\n`);
  
  const results = await processDirectory(inputDir, outputDir);
  
  // Resumen
  console.log(`\n${colors.green}═══════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.green}✨ RESUMEN DE OPTIMIZACIÓN SVG${colors.reset}`);
  console.log(`${colors.green}═══════════════════════════════════════════════${colors.reset}\n`);
  
  const totalOriginal = results.reduce((acc, r) => acc + r.originalSize, 0);
  const totalOptimized = results.reduce((acc, r) => acc + r.optimizedSize, 0);
  const totalSaved = totalOriginal - totalOptimized;
  const totalSavedPercent = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : 0;
  
  console.log(`📊 SVGs procesados: ${results.length}`);
  console.log(`📦 Tamaño original: ${formatBytes(totalOriginal)}`);
  console.log(`📦 Tamaño optimizado: ${formatBytes(totalOptimized)}`);
  console.log(`${colors.yellow}💾 Espacio ahorrado: ${formatBytes(totalSaved)} (${totalSavedPercent}%)${colors.reset}\n`);
  
  console.log(`${colors.blue}📋 Próximo paso: Revisa los SVGs en ${outputDir}${colors.reset}`);
  console.log(`${colors.blue}   Si todo se ve bien, reemplaza la carpeta original.${colors.reset}\n`);
}

main().catch(console.error);

