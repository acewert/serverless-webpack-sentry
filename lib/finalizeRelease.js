'use strict';

module.exports = {
    async finalizeRelease() {
        this.serverless.cli.log('Finalizing release in Sentry...');

        await this.sentryCli.releases.finalize(this.release);
    },
};
