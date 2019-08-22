# Serverless Webpack Sentry

## NOTICE: THIS PLUGIN DOES NOT YET HAVE A WORKING BUILD, WHAT FOLLOWS IS WIP

A Serverless v1.x plugin for use with [serverless-webpack][link-serverless-webpack] which automatically manages your [Sentry][link-sentry] releases and source map uploads.

## Install

```bash
npm install serverless-webpack-sentry --save-dev
```

Add the plugin to your `serverless.yml` file:

```yaml
# serverless.yml

plugins:
  - serverless-webpack-sentry
```

Also configure `serverless-webpack` to leave generated artifacts on disk. This is necessary so that they can be uploaded to Sentry:

```yaml
# serverless.yml

custom:
  webpack:
    keepOutputDirectory: true
```

## Configure

The configuration of the plugin is done by defining a `custom:sentry` object in your `serverless.yml` file with your specific configuration. All settings are optional and will be set to reasonable defaults if missing.

See the sections below for detailed descriptions of the settings. The defaults are:

```yaml
custom:
  sentry:
    rewriteSourceMaps: false
```

## Usage

Coming soon.

## Thanks

Special thanks goes to the authors of [serverless-webpack][link-serverless-webpack], which provided the foundation and a template for this project.

## Release Notes

Coming soon.

[link-serverless-webpack]: https://github.com/serverless-heaven/serverless-webpack
[link-sentry]: https://sentry.io/