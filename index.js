'use strict';

/**
 * TODO:
 *     - Add process environment variables for serverless-offline as well
 *     - Automatically disable and then respect custom:webpack:keepOutputDirectory setting
 *     - Self-documentation
 *     - Fail if uncommited changes present
 *     - Tests
 *     - Add 'usage' to commands
 *
 *     - Better/more stable way to determine compile output path ?
 *     - Rewrite in TypeScript ?
 *     - Configuration object a la serverless-webpack ?
 */

const SentryCli = require('@sentry/cli');
const BbPromise = require('bluebird');
const _ = require('lodash');
const ServerlessWebpack = require('serverless-webpack');

const createRelease = require('./lib/createRelease');
const finalizeRelease = require('./lib/finalizeRelease');
const setRelease = require('./lib/setRelease');
const uploadSourceMaps = require('./lib/uploadSourceMaps');

const defaultConfig = {
    rewriteSourceMaps: false,
};

class ServerlessWebpackSentry {
    constructor(serverless, options) {
        this.serverless = serverless;
        this.options = options;

        this.config = this.getConfig();

        this.sentryCli = new SentryCli();

        _.assign(
            this,
            createRelease,
            finalizeRelease,
            setRelease,
            uploadSourceMaps,
        );

        this.commands = {
            sentry: {
                commands: {
                    setRelease: {
                        lifecycleEvents: [
                            'setRelease',
                        ],
                    },
                    deploy: {
                        lifecycleEvents: [
                            'createRelease',
                            'uploadSourceMaps',
                            'finalizeRelease',
                        ],
                    },
                },
            },
        };

        this.hooks = {
            'before:package:initialize': () => BbPromise.bind(this)
                .then(() => this.serverless.pluginManager.spawn('sentry:setRelease')),

            'after:webpack:compile:compile': this.getOutputPath.bind(this),

            'before:deploy:deploy': () => BbPromise.bind(this)
                .then(() => this.serverless.pluginManager.spawn('sentry:deploy')),

            /**
            * Internal sentry events (can be hooked by plugins)
            */
            'sentry:setRelease:setRelease': this.setRelease.bind(this),
            'sentry:deploy:createRelease': this.createRelease.bind(this),
            'sentry:deploy:uploadSourceMaps': this.uploadSourceMaps.bind(this),
            'sentry:deploy:finalizeRelease': this.finalizeRelease.bind(this),
        };
    }

    getOutputPath() {
        const plugins = this.serverless.pluginManager.getPlugins();
        const slsw = _.find(plugins, plugin => plugin instanceof ServerlessWebpack);
        this.compileOutputPaths = slsw.compileOutputPaths;
    }

    getConfig() {
        const config = {};

        if (_.has(this.serverless.service, 'custom.sentry')) {
            _.assign(config, this.serverless.service.custom.sentry);
        }

        // Set defaults for all missing properties
        _.defaults(config, defaultConfig);

        return config;
    }
}

module.exports = ServerlessWebpackSentry;
