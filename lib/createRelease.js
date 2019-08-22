'use strict';

module.exports = {
    async createRelease() {
        this.serverless.cli.log('Creating release in Sentry...');

        await this.sentryCli.releases.new(this.release);
    },
};
