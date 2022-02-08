const { promisify } = require('util')
const { exec } = require('child_process');

/// Utils for making `exec` as an async-await method
const execAsync = promisify(exec);



class DecoderHelpers {
    // Pattern to mach bits
    static bitsPattern = /[0-9]+ bytes/i;
    // Pattern to mach host
    static hostPattern = /([0-9.]{2,3}.){4}/i;
    // Pattern to mach sequence number
    static sequenceNoPattern = /seq=[0-9]+/i;
    // Pattern to mach ttl
    static ttlPattern = /ttl=[0-9]+/i;
    // Pattern to mach time
    static timePattern = /[0-9]+.?[0-9]*/i;


    // Pattern to mach bits
    static bitsPatternWin = /octets=[0-9]+/i;
    // PatternWin to mach host
    static hostPatternWin = /([0-9.]{2,3}.){4}/i;
    // PatternWin to mach ttl
    static ttlPatternWin = /TTL=[0-9]+/i;
    // PatternWin to mach time
    static timePatternWin = /temps=[0-9]+/i;

    /// Extract matches from stdout
    static decodeLinuxPingOutput = (output) => {
        const pattern = /[0-9]+ bytes from ([0-9.]{2,3}.){4} seq=[0-9]+ ttl=[0-9]+ time=[0-9]+.?[0-9]* ms/gi;
        let occurences = output.trim().match(pattern);
        let results = occurences.map((_occurence) => {
            let bits = this.extractBits(_occurence);
            let host = this.extractHost(_occurence);
            let sequenceNo = this.extractSequenceNumber(_occurence);
            let time = this.extractTime(_occurence);
            let ttl = this.extractTtl(_occurence);

            // Return object
            return {
                bits,
                host,
                sequenceNo,
                time,
                ttl
            }
        })
        return results;
    }

    /// Extract matches from stdout
    static decodeWindowsPingOutput = (output) => {
        let initialSequeNo = 0;
        const pattern = /([0-9.]{2,3}.){4}: octets=[0-9]+ temps=[0-9]+ ms TTL=[0-9]+/gi;
        let occurences = output.trim().match(pattern);
        let results = occurences.map((_occurence) => {
            let bits = this.extractBitsWin(_occurence);
            let host = this.extractHostWin(_occurence);
            let sequenceNo = initialSequeNo;
            let time = this.extractTimeWin(_occurence);
            let ttl = this.extractTtlWin(_occurence);
            initialSequeNo++;

            // Return object
            return {
                bits,
                host,
                sequenceNo,
                time,
                ttl
            }
        })
        return results;
    }

    static extractBits = (data) => {
        let match = (DecoderHelpers.bitsPattern.exec(data))[0];
        return match.trim().split(' ')[0].trim();
    }

    static extractHost = (data) => {
        let match = (DecoderHelpers.hostPattern.exec(data))[0];
        return match.trim().split(':')[0].trim();
    }

    static extractSequenceNumber = (data) => {
        let match = (DecoderHelpers.sequenceNoPattern.exec(data))[0];
        return match.trim().split('=')[1].trim();
    }

    static extractTime = (data) => {
        let match = (DecoderHelpers.timePattern.exec(data))[0];
        return match.trim();
    }

    static extractTtl = (data) => {
        let match = (DecoderHelpers.ttlPattern.exec(data))[0];
        return match.trim().split('=')[1].trim();
    }



    static extractBitsWin = (data) => {
        return '32';
    }

    static extractHostWin = (data) => {
        let match = (DecoderHelpers.hostPatternWin.exec(data))[0];
        return match.trim();
    }

    static extractTimeWin = (data) => {
        let match = (DecoderHelpers.timePatternWin.exec(data))[0];
        return match.trim().split('=')[1].trim();
    }

    static extractTtlWin = (data) => {
        let match = (DecoderHelpers.ttlPatternWin.exec(data))[0];
        return match.trim().split('=')[1].trim();
    }
}



module.exports = {
    execAsync,
    DecoderHelpers
}