#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración
const QUALITY = {
  jpg: 80,
  png: 85,
  webp: 82
};

const MAX_WIDTH = 2000; // Ancho máximo para imágenes grandes

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

async function optimizeImage(inputPath, outputPath) {
  const ext = extname(inputPath).toLowerCase();
  const originalSize = await getFileSize(inputPath);
  
  try {
    let image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Redimensionar si es muy grande
    if (metadata.width > MAX_WIDTH) {
      image = image.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    const results = [];
    
    // 1. Generar WebP (siempre, es el formato principal)
    const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    await sharp(inputPath)
      .resize(metadata.width > MAX_WIDTH ? MAX_WIDTH : metadata.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY.webp, effort: 6 })
      .toFile(webpPath);
    
    const webpSize = await getFileSize(webpPath);
    
    // 2. Generar formato original optimizado (como fallback)
    if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .jpeg({ quality: QUALITY.jpg, progressive: true, mozjpeg: true })
        .toFile(outputPath);
    } else if (ext === '.png') {
      await image
        .png({ quality: QUALITY.png, compressionLevel: 9, progressive: true })
        .toFile(outputPath);
    } else if (ext === '.webp') {
      await image
        .webp({ quality: QUALITY.webp })
        .toFile(outputPath);
    } else {
      console.log(`${colors.yellow}⚠️  Formato no soportado: ${basename(inputPath)}${colors.reset}`);
      return null;
    }
    
    const optimizedSize = await getFileSize(outputPath);
    const saved = originalSize - optimizedSize;
    const savedPercent = ((saved / originalSize) * 100).toFixed(1);
    const webpSaved = originalSize - webpSize;
    const webpSavedPercent = ((webpSaved / originalSize) * 100).toFixed(1);
    
    return {
      file: basename(inputPath),
      originalSize,
      optimizedSize,
      webpSize,
      saved,
      savedPercent,
      webpSavedPercent
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
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        console.log(`${colors.blue}🔄 Optimizando: ${file.name}${colors.reset}`);
        const result = await optimizeImage(inputPath, outputPath);
        if (result) {
          results.push(result);
          console.log(`${colors.green}✅ ${result.file}:${colors.reset}`);
          console.log(`   Original: ${formatBytes(result.originalSize)}`);
          console.log(`   WebP: ${formatBytes(result.webpSize)} (${result.webpSavedPercent}% ahorrado) ${colors.yellow}⭐${colors.reset}`);
          console.log(`   Fallback: ${formatBytes(result.optimizedSize)} (${result.savedPercent}% ahorrado)`);
        }
      }
    }
  }
  
  return results;
}

async function main() {
  console.log(`\n${colors.blue}🚀 Iniciando optimización de imágenes...${colors.reset}\n`);
  
  const projectRoot = join(__dirname, '..');
  const inputDir = join(projectRoot, 'public', 'assets', 'images');
  const outputDir = join(projectRoot, 'public', 'assets', 'images-optimized');
  
  console.log(`📂 Directorio de entrada: ${inputDir}`);
  console.log(`📂 Directorio de salida: ${outputDir}\n`);
  
  const results = await processDirectory(inputDir, outputDir);
  
  // Resumen
  console.log(`\n${colors.green}═══════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.green}✨ RESUMEN DE OPTIMIZACIÓN${colors.reset}`);
  console.log(`${colors.green}═══════════════════════════════════════════════${colors.reset}\n`);
  
  const totalOriginal = results.reduce((acc, r) => acc + r.originalSize, 0);
  const totalOptimized = results.reduce((acc, r) => acc + r.optimizedSize, 0);
  const totalWebP = results.reduce((acc, r) => acc + r.webpSize, 0);
  const totalSaved = totalOriginal - totalOptimized;
  const totalWebPSaved = totalOriginal - totalWebP;
  const totalSavedPercent = ((totalSaved / totalOriginal) * 100).toFixed(1);
  const totalWebPSavedPercent = ((totalWebPSaved / totalOriginal) * 100).toFixed(1);
  
  console.log(`📊 Archivos procesados: ${results.length}`);
  console.log(`\n📦 Tamaño original total: ${formatBytes(totalOriginal)}`);
  console.log(`\n${colors.yellow}⭐ WEBP (Recomendado):${colors.reset}`);
  console.log(`   Tamaño: ${formatBytes(totalWebP)}`);
  console.log(`   Ahorrado: ${formatBytes(totalWebPSaved)} (${totalWebPSavedPercent}%)`);
  console.log(`\n📦 Fallback (JPG/PNG optimizados):`);
  console.log(`   Tamaño: ${formatBytes(totalOptimized)}`);
  console.log(`   Ahorrado: ${formatBytes(totalSaved)} (${totalSavedPercent}%)`);
  
  console.log(`\n${colors.blue}📋 Próximo paso: Revisa las imágenes en ${outputDir}${colors.reset}`);
  console.log(`${colors.blue}   Verás archivos .webp y sus fallbacks originales.${colors.reset}`);
  console.log(`${colors.blue}   Si todo se ve bien, reemplaza la carpeta original.${colors.reset}\n`);
}

main().catch(console.error);

