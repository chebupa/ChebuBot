/**
 * The MIT License
 *
 * Copyright (c) 2015 Brielle Harrison
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * console_colors.js
 * 
 * Provides ANSI escape sequence coloring to all the console logging functions
 * within node and/or the browser (however, don't expect it to work well in
 * the browser as the inspector console doesn't understand ANSI escape codes).
 *
 * Usage:
 *   require('console_colors').patchConsole();
 *
 * To remove within a given session:
 *   require('console_colors').unpatchConsole();
 *
 * @author Brielle Harrison (nyteshade AT gmail.com)
 * @version 0.0.5
 */

var CSI = require('node-csi');
var util = require('util');

// Backup console functions
(function () {
  var key;

  if (global.console._orig) {
    return;
  }

  global.console._orig = {};
  for (key in global.console) {
    if (global.console.hasOwnProperty(key)) {
      global.console._orig[key] = global.console[key];
    }
  }
}());

/**
 * This function patches the existing console functions to be colorized
 * appropriately.
 */
exports.patchConsole = function () {
  console.log = function () {
    var bulk = util.format.apply(this, arguments);
    global.console._orig.log('%s%s%s', CSI.HIFG.WHITE, bulk, CSI.RESET);
  };

  console.info = function () {
    var bulk = util.format.apply(this, arguments);
    global.console._orig.info('%s%s%s', CSI.HIFG.BLUE, bulk, CSI.RESET);
  };

  console.warn = function () {
    var bulk = util.format.apply(this, arguments);
    global.console._orig.warn('%s%s%s', CSI.HIFG.YELLOW, bulk, CSI.RESET);
  };

  console.error = function () {
    var bulk = util.format.apply(this, arguments);
    global.console._orig.error('%s%s%s', CSI.HIFG.RED, bulk, CSI.RESET);
  };

  console.log('%sConsole %sC%sO%sL%sO%sR%sS%s patched!',
    CSI.HIFG.BLACK, CSI.HIFG.RED, CSI.HIFG.GREEN, CSI.HIFG.YELLOW, 
    CSI.HIFG.BLUE, CSI.HIFG.MAGENTA, CSI.HIFG.CYAN, CSI.HIFG.BLACK);
};

/**
 * Restores the original console logging functions to their unpatched versions.
 */
exports.unpatchConsole = function () {
  global.console.log   = console._orig.log;
  global.console.info  = console._orig.info;
  global.console.warn  = console._orig.warn;
  global.console.error = console._orig.error;
  console.info('Console COLORS reverted :(');
};
