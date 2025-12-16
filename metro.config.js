const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Agregar extensiones de assets para manejar .wasm
config.resolver.assetExts.push('wasm');

module.exports = config;