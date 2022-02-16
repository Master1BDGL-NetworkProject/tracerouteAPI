const path = require('path')
const { PythonShell } = require('python-shell');
const { promisify } = require('util');

class CommandTrigger {
    static getScriptsPath() {
        return path.join(process.cwd(), 'py-src', 'src');
    }

    /**
     * Trigger ping from python script 'ping.py'
     */
    static triggerPing() {
        PythonShell.run(this.getPathForScript('ping'), null, (err, result) => {
            if (!err) {
                console.log(result);
            }
            else {
                console.log(err);
            }
        })
    }


    /**
     * 
     * @param type - type of request either [ping] or [traceroute]
     */
    static getPathForScript(type) {
        switch (type) {
            case 'ping':
                return path.join(this.getScriptsPath(), 'ping', 'ping.py');

            case 'traceroute':
                return path.join(this.getPathForScript('traceroute'), 'traceroute', 'traceroute.py');
        }
    }
}

module.exports = {
    CommandTrigger
}