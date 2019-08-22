'use strict';

module.exports = {
    async setRelease() {
        // proposeVersion() will return the hash of the latest git commit
        const release = await this.sentryCli.releases.proposeVersion();

        this.serverless.cli.log(`Setting release: ${release}...`);

        this.release = release;

        this.serverless.service.provider.environment =
            this.serverless.service.provider.environment || {};
        this.serverless.service.provider.environment.RELEASE = release;
    },
};
