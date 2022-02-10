class TracerouteDecodersHelper {
    // Pattern to mach hops index or number
    static hopsNumberPattern = /[1-9]+\s+([0-9.]{1,3}.){4}/i;
    // Pattern to mach host
    static hopsIpAdressPattern = /([0-9.]{1,3}.){4}/i;
    // Pattern to mach sequence number
    static packetTimePattern = /\s+[0-9]+.?[0-9]*ms/gi;

    /// Extract matches from stdout
    static decodeLinuxParisTracerouteOutput = (output) => {
        const pattern = /[1-9]+\s+([0-9.]{1,3}.){4}\s+\(([0-9.]{1,3}.){4}\)(\s+[0-9]+.?[0-9]+ms){3}/gi;
        let occurences = output.trim().match(pattern);
        let results = occurences.map((_occurence) => {
            let hopsNumber = this.extractHopsNumber(_occurence);
            let hopsIpAdress = this.extractHopsIpAdress(_occurence);
            let packetTime = this.extractPacketTime(_occurence); /// [packet1Time,pocket2Time,packet3Time]

            // Return object
            return { hopsNumber, hopsIpAdress, packetTime }
        })
        return results;
    }

    static extractHopsNumber = (data) => {
        let match = (TracerouteDecodersHelper.hopsNumberPattern.exec(data))[0];
        return match.trim().split(/\s+/)[0].trim();
    }

    static extractHopsIpAdress = (data) => {
        let match = (TracerouteDecodersHelper.hopsIpAdressPattern.exec(data))[0];
        return match.trim();
    }

    static extractPacketTime = (data) => {
        let matches = data.match(TracerouteDecodersHelper.packetTimePattern);
        return matches.map((match) => {
            return parseFloat(match.trim().split('ms')[0]);
        })
    }
}



module.exports = {
    TracerouteDecodersHelper
}