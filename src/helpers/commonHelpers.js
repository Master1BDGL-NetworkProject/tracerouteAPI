const { promisify } = require('util')
const { exec } = require('child_process');

/// Utils for making `exec` as an async-await method
const execAsync = promisify(exec);


module.exports = {
    execAsync
}