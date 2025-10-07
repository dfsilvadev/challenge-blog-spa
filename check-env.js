#!/usr/bin/env node

/**
 * Script de verificação das variáveis de ambiente
 * Execute: node check-env.js
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const envPath = join(process.cwd(), '.env');
const envExamplePath = join(process.cwd(), '.env.example');

console.log('🔍 Verificando configuração de variáveis de ambiente...\n');

// Verifica se .env existe
if (!existsSync(envPath)) {
  console.error('❌ Arquivo .env não encontrado!');
  console.log('\n💡 Solução:');
  console.log('   cp .env.example .env');
  console.log('   # Edite o arquivo .env com suas configurações\n');
  process.exit(1);
}

console.log('✅ Arquivo .env encontrado');

// Lê o conteúdo do .env
const envContent = readFileSync(envPath, 'utf-8');
const envVars = envContent
  .split('\n')
  .filter(line => line && !line.startsWith('#'))
  .reduce((acc, line) => {
    const [key, ...valueParts] = line.split('=');
    if (key) acc[key.trim()] = valueParts.join('=').trim();
    return acc;
  }, {});

// Verifica variáveis obrigatórias
const requiredVars = ['VITE_API_URL', 'VITE_API_TIMEOUT'];
let hasError = false;

console.log('\n📋 Variáveis configuradas:');
requiredVars.forEach(varName => {
  const value = envVars[varName];
  if (!value) {
    console.log(`   ❌ ${varName}: NÃO CONFIGURADA`);
    hasError = true;
  } else {
    console.log(`   ✅ ${varName}: ${value}`);
  }
});

if (hasError) {
  console.log('\n💡 Configure as variáveis faltantes no arquivo .env');
  process.exit(1);
}

// Verifica se a URL da API é válida
const apiUrl = envVars.VITE_API_URL;
try {
  new URL(apiUrl);
  console.log(`\n✅ URL da API é válida: ${apiUrl}`);
} catch (error) {
  console.log(`\n⚠️  URL da API pode estar inválida: ${apiUrl}`);
}

console.log('\n✅ Configuração parece correta!');
console.log(
  '\n⚠️  LEMBRE-SE: Se você modificou o .env, reinicie o servidor Vite!'
);
console.log('   1. Pressione Ctrl+C no terminal do Vite');
console.log('   2. Execute: npm run dev\n');
