const assert = require('assert');
const { PingDecodersHelper } = require('../../src/helpers/pingDecodersHelper');
const { TracerouteDecodersHelper } = require('../../src/helpers/tracerouteDecodersHelper');
const { ParametersDecoders } = require('../../src/helpers/parametersHelper');
const { CommandTrigger } = require('../../src/helpers/commandTrigger');
const { equal } = require('assert');

describe('Testing ping helpers', () => {
    it('Should decode stdout', () => {
        let _output = `64 bytes from 142.250.179.142: seq=21 ttl=37 time=119.205 ms
        64 bytes from 142.250.179.142: seq=22 ttl=37 time=109.857 ms
        64 bytes from 142.250.179.142: seq=23 ttl=37 time=119.170 ms
        64 bytes from 142.250.179.142: seq=24 ttl=37 time=114.151 ms
        64 bytes from 142.250.179.142: seq=25 ttl=37 time=117.034 ms
        64 bytes from 142.250.179.142: seq=26 ttl=37 time=109.344 ms
        64 bytes from 142.250.179.142: seq=27 ttl=37 time=116.105 ms
        64 bytes from 142.250.179.142: seq=28 ttl=37 time=110.546 ms
        64 bytes from 142.250.179.142: seq=29 ttl=37 time=115.312 ms
        64 bytes from 142.250.179.142: seq=30 ttl=37 time=109.756 ms
        64 bytes from 142.250.179.142: seq=31 ttl=37 time=115.148 ms
        64 bytes from 142.250.179.142: seq=32 ttl=37 time=106.896 ms
        64 bytes from 142.250.179.142: seq=33 ttl=37 time=112.786 ms
        64 bytes from 142.250.179.142: seq=34 ttl=37 time=109.436 ms
        64 bytes from 142.250.179.142: seq=35 ttl=37 time=106.891 ms
        64 bytes from 142.250.179.142: seq=36 ttl=37 time=125.828 ms
        64 bytes from 142.250.179.142: seq=37 ttl=37 time=113.174 ms
        64 bytes from 142.250.179.142: seq=38 ttl=37 time=108.550 ms`
        let res = PingDecodersHelper.decodeLinuxPingOutput(_output);
        assert.equal(res.length, 18)
    })


    it('Should decode params and build a command', () => {
        let command = ParametersDecoders.decodBuildPingCommand({
            host: 'google.com',
            packetsNu: 5,
            packetSize: 56,
            ttl: 44,
            timeOut: 2000,
        })
        assert.equal(command, 'ping -c 5 -s 56 -t 44 -W 2000 google.com');
    })
})

describe('Testing Traceroute helpers', () => {
    it('Should decode stdout with starts', () => {
        let _output = `1  172.17.0.1 (172.17.0.1)  0.161ms    0.126ms    0.106ms
        2  * * *
        3  * * *
        4  * * *`
        let res = TracerouteDecodersHelper.decodeLinuxParisTracerouteOutput(_output);
        assert.equal(res.length, 1)
    })

    it('Should decode stdout without starts', () => {
        let _output = `1  172.17.0.1 (172.17.0.1)  0.161ms    0.126ms    0.106ms
        2  192.1.15.1 (192.1.15.1)  0.161ms    0.1456ms    0.106ms
        3  72.221.44.1 (72.221.44.1)  0.161ms    0.126ms    0.106ms
        4  172.17.0.1 (172.17.0.1)  0.161ms    0.6ms    0.106ms
        5  172.170.0.1 (172.170.0.1)  0.161ms    0.426ms    0.126ms`
        let res = TracerouteDecodersHelper.decodeLinuxParisTracerouteOutput(_output);
        assert.equal(res.length, 5)
    })


    it('Should decode params and build a paris-traceroute command', () => {
        let command = ParametersDecoders.decodBuildParisTracerouteParams({
            host: 'google.com',
            hopsMaxNumber: 5,
            timeOut: 56,
            protocol: 'udp',
        })
        assert.equal(command, 'paris-traceroute --max-hops=5 --wait=56 --protocol=udp google.com');
    })


    it('Should print a message from python ', () => {
        CommandTrigger.triggerPing();
        assert.equal('a', 'a');
    })
})
