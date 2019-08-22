'use strict';

const slsw = require('serverless-webpack');

module.exports = {
    async uploadSourceMaps() {
        this.serverless.cli.log('Uploading source maps to Sentry...');

        await this.sentryCli.releases.uploadSourceMaps(this.release, {
            ignore: [
                'node_modules',
            ],
            include: this.compileOutputPaths,
            rewrite: this.config.rewriteSourceMaps,
        });
    },
};
