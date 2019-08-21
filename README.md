# Serverless Webpack Sentry

A Serverless v1.x plugin for use with [serverless-webpack][link-serverless-webpack].

This plugin helps you automatically manage your Sentry releases and source map uploads.

## Install

```bash
npm install serverless-webpack-sentry --save-dev
```

Add the plugin to your `serverless.yml` file:

```yaml
plugins:
  - serverless-webpack-sentry
```

## Configure

The configuration of the plugin is done by defining a `custom:sentry` object in your `serverless.yml` file with your specific configuration. All settings are optional and will be set to reasonable defaults if missing.

See the sections below for detailed descriptions of the settings. The defaults are:

```yaml
custom:
  sentry:
    rewriteSourceMaps: false
```

[link-serverless-webpack]: https://github.com/serverless-heaven/serverless-webpack