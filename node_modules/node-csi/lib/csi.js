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
 * csi.js
 *
 * This small library attempts to provide quick functionality to many
 * of the standard ANSI CSI escape sequences for use in logging and
 * console output of your app.
 *
 * @author Brielle Harrison (nyteshade AT gmail.com)
 * @version 0.0.5
 */

var csi = '\x1b[';

var isArray = function(obj) {
  return '[object Array]' === Object.prototype.toString.apply(obj);
};

var isBool = function(obj) {
  return '[object Boolean]' === Object.prototype.toString.apply(obj);
};

var isNumber = function(obj) {
  return '[object Number]' === Object.prototype.toString.apply(obj);
};

var isConsoleFn = /(log|info|warn|error|trace)/i;

var functions = {
  /**
   * Clears the screen and moves the cursor to 1,1. Unlike most of
   * the other functions, this one logs the string instead of returning it.
   */
  cls: function() {
    var string = this.custom(CSI.strGo(1,1), CSI.ERASE_DISPLAY);
    console.log(string);
  },

  /**
   * Return the string for either a foreground or foreground and
   * background. Direct numbers can be inputted for either property
   * rather than using the constants.
   *
   * @param fg the foreground color to use
   * @param bg the background color to use
   */
  color: function(fg, bg) {
    if (bg) {
      if (isNumber(fg) && isNumber(bg)) {
        return [csi, bg, ';', fg, 'm'].join('');
      }
      else {
        return this.custom(
          isNumber(fg) ? fg + 'm' : fg,
          isNumber(bg) ? bg + 'm' : bg
        );
      }
    }

    return this.custom(isNumber(fg) ? fg + 'm' : fg);
  },

  /**
   * Activates one of the cursor codes with a given quantity. The codes
   * are any of UP, DOWN, RIGHT, FORWARD, LEFT, BACK, NEXT_LINE, PREV_LINE,
   * COLUMN, and POSITION constants found in the CSI.CURSOR object.
   *
   * @param code a CSI.CURSOR constant
   * @param quantity how much of the cursor movement should occur
   */
  cursor: function(code, quantity) {
    return this.custom(quantity, code);
  },

  /**
   * Create a custom sequence using CSI.CSI followed by the value of
   * each argument supplied. If the first parameter is the boolean value
   * true, then, in between each argument, an additional CSI character
   * will be inserted.
   *
   * @param optUseCSIForEachArgument if true, each argument is preceded
   * by a CSI character set.
   */
  'custom': function customCSI(optUseCSIForEachArgument) {
    var result = csi;
    var args = Array.prototype.slice.call(arguments, 0);
    var doEachTime = false;

    if (isBool(args[0])) {
      doEachTime = args.splice(0, 1);
    }

    for (var i = 0; i < args.length; i++) {
      result += ((doEachTime) ? csi : '') + args[i];
    }

    return result;
  },

  /**
   * Invokes the erase display functionality with the supplied mode.
   *
   * Mode:
   *  0 = Clear from cursor to end of screen
   *  1 = Clear from cursor to beginning of screen
   *  2 = Clear entire screen
   */
  eraseDisplay: function(mode) {
    return this.custom(mode || 2, 'J');
  },

  /**
   * Invokes the erase line functionality with the supplied mode.
   *
   * Mode:
   *  0 = Clear from cursor to end of line
   *  1 = Clear from cursor to beginning of line
   *  2 = Clear entire line
   */
  eraseInLine: function(mode) {
    return this.custom(mode || 2, 'K');
  },

  /**
   * Move the cursor position to the supplied column and optionally
   * row.
   *
   * @param column_or_x the 1-based column position
   * @param row_or_y the 1-based row position. If omitted the cursor
   * will only move horizontally to the supplied column.
   */
  go: function(column_or_x, row_or_y) {
    var x = column_or_x || 1;
    var y = row_or_y;

    if (y) {
      return this.custom(y, ';', x, CSI.CURSOR.POSITION);
    }
    else {
      return this.custom(x, CSI.CURSOR.COLUMN);
    }
  },

  /**
   * Xterm and recent-enough versions of KDE's Konsole program
   * support ISO-8613-3 24-bit foreground and background color settings.
   * The background color values are optional.
   *
   * @param red the foreground red value presumed to be from 0-255
   * @param green the foreground green value presumed to be from 0-255
   * @param blue the blue foreground value presumed to be from 0-255
   * @param bgred the background red value presumed to be from 0-255
   * @param bggreen the background green value presumed to be from 0-255
   * @param bgblue the background blue value presumed to be from 0-255
   */
  rgbColor: function(red, green, blue, bgred, bggreen, bgblue) {
    var result = [csi, '38;2;', red, ';', green, ';', blue, 'm'];
    if (bgred && bggreen && bgblue) {
      result = result.concat(
        [csi, '48;2;', bgred, ';', bggreen, ';', bgblue, 'm']
      );
    }
    return result.join('');
  },

  /**
   * This function scrolls the display either upward or downward based
   * on the supplied direction code and amount. Amount refers to the number
   * of lines and the direction can be one of CSI.CURSOR.UP, CSI.CURSOR_DOWN,
   * CSI.CURSOR.DOWN, and CSI.CURSOR_DOWN.
   *
   * @param direction the direction code
   * @param amount the quantity to scroll the screen by.
   */
  scroll: function(direction, amount) {
    var code = direction;
    switch(code) {
      case CSI.CURSOR.UP:
      case CSI.SCROLL_UP:
        code = CSI.SCROLL_UP.substring(CSI.SCROLL_UP.length - 1);
        break;

      case CSI.CURSOR.DOWN:
      case CSI.SCROLL_DOWN:
        code = CSI.SCROLL_DOWN.substring(CSI.SCROLL_DOWN.length - 1);
        break;
    }
  },

  /**
   * Values in a 256-color scheme are:
   *
   * 0x00-0x07:  standard colors (as in ESC [ 30–37 m)
   * 0x08-0x0F:  high intensity colors (as in ESC [ 90–97 m)
   * 0x10-0xE7:  6 × 6 × 6 = 216 colors: 16 + 36 × r + 6 × g + b (0 ≤ r, g, b ≤ 5)
   * 0xE8-0xFF:  grayscale from black to white in 24 steps
   *
   * @param foreground one of the above values
   * @param background one of the above values
   */
  xColor: function(foreground, background) {
    var result = [CSI.ESC, ']10;', foreground, CSI.BEL].join('');
    if (background) {
      result += [CSI.ESC, ']11;', background, CSI.BEL].join('');
    }
    return result;
  }
};

var CSI = {
  CSI: csi,
  BEL: '\x07',
  ESC: '\x1b',

  FG: {
    BLACK:              csi + '30m',
    RED:                csi + '31m',
    GREEN:              csi + '32m',
    YELLOW:             csi + '33m',
    BLUE:               csi + '34m',
    MAGENTA:            csi + '35m',
    CYAN:               csi + '36m',
    WHITE:              csi + '37m',
    RESET:              csi + '39m'
  },

  BG: {
    BLACK:              csi + '40m',
    RED:                csi + '41m',
    GREEN:              csi + '42m',
    YELLOW:             csi + '43m',
    BLUE:               csi + '44m',
    MAGENTA:            csi + '45m',
    CYAN:               csi + '46m',
    WHITE:              csi + '47m',
    RESET:              csi + '49m'
  },

  HIFG: {
    BLACK:              csi + '90m',
    RED:                csi + '91m',
    GREEN:              csi + '92m',
    YELLOW:             csi + '93m',
    BLUE:               csi + '94m',
    MAGENTA:            csi + '95m',
    CYAN:               csi + '96m',
    WHITE:              csi + '97m'
  },

  HIBG: {
    BLACK:              csi + '100m',
    RED:                csi + '101m',
    GREEN:              csi + '102m',
    YELLOW:             csi + '103m',
    BLUE:               csi + '104m',
    MAGENTA:            csi + '105m',
    CYAN:               csi + '106m',
    WHITE:              csi + '107m'
  },

  ON: {
    BOLD:               csi + '1m',
    BLINK:              csi + '5m',
    BLINK_FAST:         csi + '6m',
    FAINT:              csi + '2m',
    ITALIC:             csi + '3m',
    UNDERLINE:          csi + '4m',
    REVERSE:            csi + '7m',
    CONCEAL:            csi + '8m',  // rare
    CROSSEDOUT:         csi + '9m',  // rare
    FRAMED:             csi + '51m',
    ENCIRCLED:          csi + '52m',
    OVERLINE:           csi + '53m',
    IDEO_UNDERLINE:     csi + '60m', // incredibly rare
    IDEO_DBL_UNDERLINE: csi + '61m', // incredibly rare
    IDEO_OVERLINE:      csi + '62m', // incredibly rare
    IDEO_DBL_OVERLINE:  csi + '63m', // incredibly rare
    IDEO_STRESS:        csi + '64m'  // incredibly rare
  },

  OFF: {
    BOLD:               csi + '21m',
    BLINK:              csi + '25m',
    BLINK_FAST:         csi + '25m',
    FAINT:              csi + '22m',
    ITALIC:             csi + '23m',
    UNDERLINE:          csi + '24m',
    REVERSE:            csi + '27m',
    CONCEAL:            csi + '28m', // rare
    CROSSEDOUT:         csi + '29m', // rare
    FRAMED:             csi + '54m',
    ENCIRCLED:          csi + '54m',
    OVERLINE:           csi + '55m',
    IDEO_UNDERLINE:     csi + '65m', // incredibly rare
    IDEO_DBL_UNDERLINE: csi + '65m', // incredibly rare
    IDEO_OVERLINE:      csi + '65m', // incredibly rare
    IDEO_DBL_OVERLINE:  csi + '65m', // incredibly rare
    IDEO_STRESS:        csi + '65m'  // incredibly rare
  },

  FONT: {
    DEFAULT:            csi + '10m',
    FONT1:              csi + '11m',
    FONT2:              csi + '12m',
    FONT3:              csi + '13m',
    FONT4:              csi + '14m',
    FONT5:              csi + '15m',
    FONT6:              csi + '16m',
    FONT7:              csi + '17m',
    FONT8:              csi + '18m',
    FONT9:              csi + '19m'
  },

  CURSOR: {
    UP:                 'A',
    DOWN:               'B',
    RIGHT:              'C',
    FORWARD:            'C',
    LEFT:               'D',
    BACK:               'D',
    NEXT_LINE:          'E',
    PREV_LINE:          'F',
    COLUMN:             'G',
    POSITION:           'H',

    SAVE:               csi + 's',
    RESTORE:            csi + 'u',
    HIDE:               csi + '?25l',
    SHOW:               csi + '?25h'
  },

  ERASE_DISPLAY:        csi + '2J',
  ERASE_LINE:           csi + '2K',
  SCROLL_UP:            csi + '1S',
  SCROLL_DOWN:          csi + '1T',

  RESET:                csi + '0m'
};

var log = function __log_wrapper(csiFnName) {
  var execThese = ['go', 'scroll', 'eraseInLine', 'eraseDisplay'];
  /**
   * By default, the functions above are all wrapped by the results
   * of this function wherein, after the expected number of arguments
   * determined by function.length, subsequent arguments are stored
   * for a secondary console.log call.
   *
   * Normally the functions all return a string formatted based on the
   * purpose of the function using the CSI constants and format necessary.
   * When those functions are wrapped with a __log_wrapper result (i.e.
   * the result of this function) the generated string is immedately
   * logged to the console.
   *
   * This only occurs when more than expected number of parameters is
   * found. For example, the color(fg,bg) function from above takes two
   * parameters in it's definition. When called with only two parameters
   * it simply returns the string to invoke the desired colors. If it is
   * invoked more arguments then every argument appearing after the expected
   * count is an argument to another console.log call. This allows one to
   * change a color and print the word hello doing something like:
   * CSI.color(CSI.FG.RED, CSI.BG.BLACK, 'hello').
   *
   * When a function is invoked in this manner the returned value
   * is the CSI object. The reason is to enable inlining or chaining of
   * calls. This bit of functionality is almost over-engineering and as such
   * I may end up removing the feature in the future.
   */
  return function() {
    var argCount = this.argCount;
    var csiFn = this.csiFn;
    var logArgs = Array.prototype.slice.call(arguments, 0);
    var csiArgs = logArgs.splice(0, argCount);
    var string = csiFn.apply(CSI, csiArgs);
    var logFn = 'log';

    if (logArgs.length && isConsoleFn.exec(logArgs[0])) {
      logFn = logArgs.splice(0, 1);
    }

    if (logArgs.length || execThese.indexOf(this.csiFnName) !== -1) {
      global.console.log(string);
      global.console[logFn].apply(global.console, logArgs);
      return CSI;
    }
    else {
      return string;
    }
  };
};

var skipThese = ['cls','custom'];
for (var name in functions) {
  if (functions.hasOwnProperty(name)) {
    var strName = [
      'str', name.charAt(0).toUpperCase(), name.substring(1)
    ].join('');

    var fn = functions[name];
    var len = fn.length;

    if (skipThese.indexOf(name) !== -1) {
      CSI[name] = fn;
      continue;
    }

    // The raw non-overloaded version of the functions are attached to the
    // CSI object with the str prefix. go() becoming strGo(), for example.
    CSI[strName] = fn;

    // This creates the overloaded version of the function. See log() above
    CSI[name] = log(name).bind({
      argCount: len,
      csiFn: fn,
      csiFnName: name
    });
  }
}

module.exports = CSI;
