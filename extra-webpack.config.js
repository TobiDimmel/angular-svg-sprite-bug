const path = require('path');
const SvgSpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const iconsFolderPath = path.resolve(__dirname, 'src/icons');

/**
 * Entry point for custom webpack configuration.
 *
 * @angular-builders/custom-webpack passes the Angular CLI prepared
 * webpack config, which we can customize here.
 *
 */
function customizeWebpackConfig(config, _) {
  excludeIconsFromModuleRulesForSvg(config);
  addModuleRuleForIconSprite(config);
  addPluginForIconSprite(config);

  return config;
}

function excludeIconsFromModuleRulesForSvg(config) {
  config.module.rules.forEach(rule => {
    if (!rule.test.toString().includes('svg'))
      return;

    excludeIconsFromModuleRule(rule);
  });
}

function excludeIconsFromModuleRule(rule) {
  if (!rule.exclude) {
    rule.exclude = iconsFolderPath;
    return;
  }

  if (rule.exclude instanceof Array) {
    rule.exclude.push(iconsFolderPath);
    return;
  }

  rule.exclude = [rule.exclude, iconsFolderPath];
}

function addModuleRuleForIconSprite(config) {
  config.module.rules.push({
    test: /\.svg$/,
    loader: 'svg-sprite-loader',
    include: iconsFolderPath,
    options: {
      extract: true,
      spriteFilename: 'icons.[contenthash].svg',
      publicPath: '/assets/',
      symbolId: '[name]',
    }
  });
}

function addPluginForIconSprite(config) {
  config.plugins.push(new SvgSpriteLoaderPlugin({ plainSprite: true }));
}

module.exports = customizeWebpackConfig;
