/* eslint-disable no-console */
const chalk = require('chalk')

/**
 * Error level logging
 * @param {Error} error - Error object
 */
function error(error) {
  console.error(chalk.red(error.stack))
}

/**
 * OK level logging
 * @param {string} message - OK meesage
 */
function ok(message) {
  console.log(chalk.green(message))
}

/**
 * Info level logging
 * @param {string} message - Info message
 */
function info(message) {
  console.log(chalk.blue(message))
}

/**
 * Debug level logging
 * @param {string} message - Info message
 */
function debug(message) {
  console.log(chalk.yellow(message))
}

/**
 * Trace level logging
 * @param {string} message - Info message
 */
function trace(message) {
  console.log(chalk.cyan(message))
}


module.exports = { ok, error, info, trace, debug }
