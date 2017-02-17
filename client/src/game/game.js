/*!  2017-01-21 */
//! moment.js
//! version : 2.11.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function Locale() {
    }

    // internal storage for locale config files
    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, values) {
        if (values !== null) {
            values.abbr = name;
            locales[name] = locales[name] || new Locale();
            locales[name].set(values);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function get_set__set (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        return isArray(this._months) ? this._months[m.month()] :
            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')$', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')$', 'i');
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (firstTime) {
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', false);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(utils_hooks__hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        if (!valid__isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             if (this.isValid() && other.isValid()) {
                 return other < this ? this : other;
             } else {
                 return valid__createInvalid();
             }
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = ((string || '').match(matcher) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(matchOffset, this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    var isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                d : parseIso(match[4], sign),
                h : parseIso(match[5], sign),
                m : parseIso(match[6], sign),
                s : parseIso(match[7], sign),
                w : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return +this > +localInput;
        } else {
            return +localInput < +this.clone().startOf(units);
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return +this < +localInput;
        } else {
            return +this.clone().endOf(units) < +localInput;
        }
    }

    function isBetween (from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units);
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return +this === +localInput;
        } else {
            inputMs = +localInput;
            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust);
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }
        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return +this._d - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(+this / 1000);
    }

    function toDate () {
        return this._offset ? new Date(+this) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // JSON.stringify(new Date(NaN)) === 'null'
        return this.isValid() ? this.toISOString() : 'null';
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        // console.log("got", weekYear, week, weekday, "set", date.toISOString());
        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   matchWord);
    addRegexToken('ddd',  matchWord);
    addRegexToken('dddd', matchWord);

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = local__createLocal([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add               = add_subtract__add;
    momentPrototype__proto.calendar          = moment_calendar__calendar;
    momentPrototype__proto.clone             = clone;
    momentPrototype__proto.diff              = diff;
    momentPrototype__proto.endOf             = endOf;
    momentPrototype__proto.format            = format;
    momentPrototype__proto.from              = from;
    momentPrototype__proto.fromNow           = fromNow;
    momentPrototype__proto.to                = to;
    momentPrototype__proto.toNow             = toNow;
    momentPrototype__proto.get               = getSet;
    momentPrototype__proto.invalidAt         = invalidAt;
    momentPrototype__proto.isAfter           = isAfter;
    momentPrototype__proto.isBefore          = isBefore;
    momentPrototype__proto.isBetween         = isBetween;
    momentPrototype__proto.isSame            = isSame;
    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
    momentPrototype__proto.isValid           = moment_valid__isValid;
    momentPrototype__proto.lang              = lang;
    momentPrototype__proto.locale            = locale;
    momentPrototype__proto.localeData        = localeData;
    momentPrototype__proto.max               = prototypeMax;
    momentPrototype__proto.min               = prototypeMin;
    momentPrototype__proto.parsingFlags      = parsingFlags;
    momentPrototype__proto.set               = getSet;
    momentPrototype__proto.startOf           = startOf;
    momentPrototype__proto.subtract          = add_subtract__subtract;
    momentPrototype__proto.toArray           = toArray;
    momentPrototype__proto.toObject          = toObject;
    momentPrototype__proto.toDate            = toDate;
    momentPrototype__proto.toISOString       = moment_format__toISOString;
    momentPrototype__proto.toJSON            = toJSON;
    momentPrototype__proto.toString          = toString;
    momentPrototype__proto.unix              = unix;
    momentPrototype__proto.valueOf           = to_type__valueOf;
    momentPrototype__proto.creationData      = creationData;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months            =        localeMonths;
    prototype__proto._months           = defaultLocaleMonths;
    prototype__proto.monthsShort       =        localeMonthsShort;
    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
    prototype__proto.monthsParse       =        localeMonthsParse;
    prototype__proto._monthsRegex      = defaultMonthsRegex;
    prototype__proto.monthsRegex       = monthsRegex;
    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
    prototype__proto.monthsShortRegex  = monthsShortRegex;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function list (format, index, field, count, setter) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, setter);
        }

        var i;
        var out = [];
        for (i = 0; i < count; i++) {
            out[i] = lists__get(format, i, field, setter);
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return list(format, index, 'months', 12, 'month');
    }

    function lists__listMonthsShort (format, index) {
        return list(format, index, 'monthsShort', 12, 'month');
    }

    function lists__listWeekdays (format, index) {
        return list(format, index, 'weekdays', 7, 'day');
    }

    function lists__listWeekdaysShort (format, index) {
        return list(format, index, 'weekdaysShort', 7, 'day');
    }

    function lists__listWeekdaysMin (format, index) {
        return list(format, index, 'weekdaysMin', 7, 'day');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes <= 1           && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   <= 1           && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    <= 1           && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  <= 1           && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.11.1';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.now                   = now;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.prototype             = momentPrototype;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
(function(window) {
    var re = {
        not_string: /[^s]/,
        number: /[diefg]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
    }

    function sprintf() {
        var key = arguments[0], cache = sprintf.cache
        if (!(cache[key] && cache.hasOwnProperty(key))) {
            cache[key] = sprintf.parse(key)
        }
        return sprintf.format.call(null, cache[key], arguments)
    }

    sprintf.format = function(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, node_type = "", arg, output = [], i, k, match, pad, pad_character, pad_length, is_positive = true, sign = ""
        for (i = 0; i < tree_length; i++) {
            node_type = get_type(parse_tree[i])
            if (node_type === "string") {
                output[output.length] = parse_tree[i]
            }
            else if (node_type === "array") {
                match = parse_tree[i] // convenience purposes only
                if (match[2]) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw new Error(sprintf("[sprintf] property '%s' does not exist", match[2][k]))
                        }
                        arg = arg[match[2][k]]
                    }
                }
                else if (match[1]) { // positional argument (explicit)
                    arg = argv[match[1]]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (get_type(arg) == "function") {
                    arg = arg()
                }

                if (re.not_string.test(match[8]) && re.not_json.test(match[8]) && (get_type(arg) != "number" && isNaN(arg))) {
                    throw new TypeError(sprintf("[sprintf] expecting number but found %s", get_type(arg)))
                }

                if (re.number.test(match[8])) {
                    is_positive = arg >= 0
                }

                switch (match[8]) {
                    case "b":
                        arg = arg.toString(2)
                    break
                    case "c":
                        arg = String.fromCharCode(arg)
                    break
                    case "d":
                    case "i":
                        arg = parseInt(arg, 10)
                    break
                    case "j":
                        arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)
                    break
                    case "e":
                        arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential()
                    break
                    case "f":
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
                    break
                    case "g":
                        arg = match[7] ? parseFloat(arg).toPrecision(match[7]) : parseFloat(arg)
                    break
                    case "o":
                        arg = arg.toString(8)
                    break
                    case "s":
                        arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg)
                    break
                    case "u":
                        arg = arg >>> 0
                    break
                    case "x":
                        arg = arg.toString(16)
                    break
                    case "X":
                        arg = arg.toString(16).toUpperCase()
                    break
                }
                if (re.json.test(match[8])) {
                    output[output.length] = arg
                }
                else {
                    if (re.number.test(match[8]) && (!is_positive || match[3])) {
                        sign = is_positive ? "+" : "-"
                        arg = arg.toString().replace(re.sign, "")
                    }
                    else {
                        sign = ""
                    }
                    pad_character = match[4] ? match[4] === "0" ? "0" : match[4].charAt(1) : " "
                    pad_length = match[6] - (sign + arg).length
                    pad = match[6] ? (pad_length > 0 ? str_repeat(pad_character, pad_length) : "") : ""
                    output[output.length] = match[5] ? sign + arg + pad : (pad_character === "0" ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output.join("")
    }

    sprintf.cache = {}

    sprintf.parse = function(fmt) {
        var _fmt = fmt, match = [], parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = match[0]
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = "%"
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list[field_list.length] = field_match[1]
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1]
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1]
                            }
                            else {
                                throw new SyntaxError("[sprintf] failed to parse named argument key")
                            }
                        }
                    }
                    else {
                        throw new SyntaxError("[sprintf] failed to parse named argument key")
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported")
                }
                parse_tree[parse_tree.length] = match
            }
            else {
                throw new SyntaxError("[sprintf] unexpected placeholder")
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return parse_tree
    }

    var vsprintf = function(fmt, argv, _argv) {
        _argv = (argv || []).slice(0)
        _argv.splice(0, 0, fmt)
        return sprintf.apply(null, _argv)
    }

    /**
     * helpers
     */
    function get_type(variable) {
        return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase()
    }

    function str_repeat(input, multiplier) {
        return Array(multiplier + 1).join(input)
    }

    /**
     * export to either browser or node.js
     */
    if (typeof exports !== "undefined") {
        exports.sprintf = sprintf
        exports.vsprintf = vsprintf
    }
    else {
        window.sprintf = sprintf
        window.vsprintf = vsprintf

        if (typeof define === "function" && define.amd) {
            define(function() {
                return {
                    sprintf: sprintf,
                    vsprintf: vsprintf
                }
            })
        }
    }
})(typeof window === "undefined" ? this : window);

//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

/*global window, require, define */
(function(_window) {
  'use strict';

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  var _rng, _mathRNG, _nodeRNG, _whatwgRNG, _previousRoot;

  function setupBrowser() {
    // Allow for MSIE11 msCrypto
    var _crypto = _window.crypto || _window.msCrypto;

    if (!_rng && _crypto && _crypto.getRandomValues) {
      // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
      //
      // Moderately fast, high quality
      try {
        var _rnds8 = new Uint8Array(16);
        _whatwgRNG = _rng = function whatwgRNG() {
          _crypto.getRandomValues(_rnds8);
          return _rnds8;
        };
        _rng();
      } catch(e) {}
    }

    if (!_rng) {
      // Math.random()-based (RNG)
      //
      // If all else fails, use Math.random().  It's fast, but is of unspecified
      // quality.
      var  _rnds = new Array(16);
      _mathRNG = _rng = function() {
        for (var i = 0, r; i < 16; i++) {
          if ((i & 0x03) === 0) { r = Math.random() * 0x100000000; }
          _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
        }

        return _rnds;
      };
      if ('undefined' !== typeof console && console.warn) {
        console.warn("[SECURITY] node-uuid: crypto not usable, falling back to insecure Math.random()");
      }
    }
  }

  function setupNode() {
    // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
    //
    // Moderately fast, high quality
    if ('function' === typeof require) {
      try {
        var _rb = require('crypto').randomBytes;
        _nodeRNG = _rng = _rb && function() {return _rb(16);};
        _rng();
      } catch(e) {}
    }
  }

  if (_window) {
    setupBrowser();
  } else {
    setupNode();
  }

  // Buffer class to use
  var BufferClass = ('function' === typeof Buffer) ? Buffer : Array;

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = (buf && offset) || 0, ii = 0;

    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
      if (ii < 16) { // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }

    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return  bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [
    _seedBytes[0] | 0x01,
    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
  ];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

  // Previous uuid creation time
  var _lastMSecs = 0, _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];

    options = options || {};

    var clockseq = (options.clockseq != null) ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = (options.msecs != null) ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = (options.nsecs != null) ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }

    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;

    if (typeof(options) === 'string') {
      buf = (options === 'binary') ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;
  uuid._rng = _rng;
  uuid._mathRNG = _mathRNG;
  uuid._nodeRNG = _nodeRNG;
  uuid._whatwgRNG = _whatwgRNG;

  if (typeof exports === 'object' && typeof module !== 'undefined') {
    // Publish as node.js module
    module.exports = uuid;
  } else if (typeof define === 'function' && define.amd) {
    // Publish as AMD module
    define(function() {return uuid;});


  } else {
    // Publish as global (in browsers)
    _previousRoot = _window.uuid;

    // **`noConflict()` - (browser only) to reset global 'uuid' var**
    uuid.noConflict = function() {
      _window.uuid = _previousRoot;
      return uuid;
    };

    _window.uuid = uuid;
  }
})(this);

(function() {
    // Establish the root object,
    // `window` (`self`) in the browser,
    // `global`on the server,
    // `this` in some virtual machines.
    // We use `self` instead of `window` for `WebWorker` support.
    var root = typeof self === 'object' && self.self === self && self ||
        typeof global === 'object' && global.global === global && global ||
        this;

    //Declare game's namespace
    var Namespace = root.Game = root.hGame006 = {};

    Namespace.isNodeJS = (typeof exports === "object");

    Namespace.inherits = function(ctor, superCtor) {
        ctor._super = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });

        ctor.prototype._super = superCtor;
        ctor.super = function(o) { ctor._super.call(o) };
    };

    Namespace.extend = function(origin, add) {
        if (add === null || typeof add !== 'object') return origin;

        var keys = Object.keys(add);
        var i = keys.length;
        while (i--) {
            origin[keys[i]] = add[keys[i]];
        }
        return origin;
    };

    //init libs reference
    if (Namespace.isNodeJS) {
        Namespace.uuid      = require('uuid');
        Namespace.moment    = require('moment');
        Namespace.sprintf   = require('../libs/sprintf').sprintf;
        Namespace.CryptoJS  = require('crypto-js');
    } else {
        Namespace.uuid      = root.uuid;
        Namespace.moment    = root.moment;
        Namespace.sprintf   = root.sprintf;
        Namespace.CryptoJS  = root.CryptoJS;

        if (typeof console.info != "function") {
            console.info = console.log;
        }
    }
}());

(function(root) {
    var Handler = root.Handler = function(caller,method,args,once) {
        //this.caller = null;
        //this.method = null;
        //this.args = null;
        this.once = false;
        this._id = 0;
        (once===void 0)&& (once=false);
        this.setTo(caller,method,args,once);
    };

    var __proto = Handler.prototype;
    /**
     *设置此对象的指定属性值。
     *@param caller 执行域(this)。
     *@param method 回调方法。
     *@param args 携带的参数。
     *@param once 是否只执行一次，如果为true，执行后执行recover()进行回收。
     *@return 返回 handler 本身。
     */
    __proto.setTo=function(caller,method,args,once){
        this._id=Handler._gid++;
        this.caller=caller;
        this.method=method;
        this.args=args;
        this.once=once;
        return this;
    };

    /**
     *执行处理器。
     */
    __proto.run=function(){
        if (this.method==null)return null;
        var id=this._id;
        var result=this.method.apply(this.caller,this.args);
        this._id===id && this.once && this.recover();
        return result;
    };

    /**
     *执行处理器，携带额外数据。
     *@param data 附加的回调数据，可以是单数据或者Array(作为多参)。
     */
    __proto.runWith=function(data){
        if (this.method==null)return null;
        var id=this._id;
        if (data==null)
            var result=this.method.apply(this.caller,this.args);
        else if (!this.args && !data.unshift)result=this.method.call(this.caller,data);
        else if (this.args)result=this.method.apply(this.caller,this.args.concat(data));
        else result=this.method.apply(this.caller,data);
        this._id===id && this.once && this.recover();
        return result;
    };

    /**
     *清理对象引用。
     */
    __proto.clear=function(){
        this.caller=null;
        this.method=null;
        this.args=null;
        return this;
    };

    /**
     *清理并回收到 Handler 对象池内。
     */
    __proto.recover=function(){
        if (this._id > 0){
            this._id=0;
            Handler._pool.push(this.clear());
        }
    };

    Handler.create = function(caller,method,args,once){
        (once===void 0) && (once=true);
        if (Handler._pool.length) {
            return Handler._pool.pop().setTo(caller,method,args,once);
        }
        return new Handler(caller,method,args,once);
    };

    Handler._pool=[];
    Handler._gid=1;
})(hGame006);

(function(root){
    var _super = root.Handler;
    
    var EventHandler = root.EventHandler = function(caller, method, args, once) {
        _super.call(this, caller, method, args, once);
    };

    root.inherits(EventHandler, _super);

    var __proto=EventHandler.prototype;

    __proto.recover = function() {
        if (this._id > 0){
            this._id=0;
            EventHandler._pool.push(this.clear());
        }
    };

    EventHandler.create = function(caller,method,args,once){
        (once===void 0)&& (once=true);
        if (EventHandler._pool.length) {
            return EventHandler._pool.pop().setTo(caller,method,args,once);
        }
        return new EventHandler(caller,method,args,once);
    };

    EventHandler._pool = [];
})(hGame006);

(function(root) {
    var EventHandler = root.EventHandler;
    var EventDispatcher = root.EventDispatcher = function() {
        this._events = null;
    };

    var __proto = EventDispatcher.prototype;
    /**
     *检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器。
     *@param type 事件的类型。
     *@return 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
     */
    __proto.hasListener = function(type) {
        var listener= this._events && this._events[type];
        return !!listener;
    };

    /**
     *派发事件。
     *@param type 事件类型。
     *@param data 回调数据。
     *<b>注意：</b>如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；如果需要回调单个参数 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
     *@return 此事件类型是否有侦听者，如果有侦听者则值为 true，否则值为 false。
     */
    __proto.event = function(type, data) {
        if (!this._events || !this._events[type]) {
            return false;
        }
        var listeners=this._events[type];
        if (listeners.run) {
            if (listeners.once)delete this._events[type];
            data !=null ? listeners.runWith(data): listeners.run();
        } else {
            for (var i=0, n=listeners.length; i < n; i++) {
                var listener=listeners[i];
                if (listener) {
                    (data !=null)? listener.runWith(data):listener.run();
                }
                if (!listener || listener.once) {
                    listeners.splice(i,1);
                    i--;
                    n--;
                }
            }
            if (listeners.length===0)delete this._events[type];
        }
        return true;
    };

    /**
     *使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
     *@param type 事件的类型。
     *@param caller 事件侦听函数的执行域。
     *@param listener 事件侦听函数。
     *@param args 事件侦听函数的回调参数。
     *@return 此 EventDispatcher 对象。
     */
    __proto.on=function(type, caller, listener, args) {
        return this._createListener(type, caller, listener, args, false);
    };

    /**
     *使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
     *@param type 事件的类型。
     *@param caller 事件侦听函数的执行域。
     *@param listener 事件侦听函数。
     *@param args 事件侦听函数的回调参数。
     *@return 此 EventDispatcher 对象。
     */
    __proto.once = function(type,caller,listener,args){
        return this._createListener(type,caller,listener,args,true);
    };

    __proto._createListener=function(type,caller,listener,args,once){
        this.off(type,caller,listener,once);
        var handler=EventHandler.create(caller || this,listener,args,once);
        this._events || (this._events={});
        var events=this._events;
        if (!events[type])events[type]=handler;
        else {
            if (!events[type].run)events[type].push(handler);
            else events[type]=[events[type],handler];
        }
        return this;
    };

    /**
     *从 EventDispatcher 对象中删除侦听器。
     *@param type 事件的类型。
     *@param caller 事件侦听函数的执行域。
     *@param listener 事件侦听函数。
     *@param onceOnly 如果值为 true ,则只移除通过 once 方法添加的侦听器。
     *@return 此 EventDispatcher 对象。
     */
    __proto.off=function(type,caller,listener,onceOnly){
        (onceOnly===void 0)&& (onceOnly=false);
        if (!this._events || !this._events[type])return this;
        var listeners=this._events[type];
        if (listener !=null){
            if (listeners.run){
                if ((!caller || listeners.caller===caller)&& listeners.method===listener && (!onceOnly || listeners.once)){
                    delete this._events[type];
                    listeners.recover();
                }
            }else {
                var count=0;
                for (var i=0,n=listeners.length;i < n;i++){
                    var item=listeners[i];
                    if (item && (!caller || item.caller===caller)&& item.method===listener && (!onceOnly || item.once)){
                        count++;
                        listeners[i]=null;
                        item.recover();
                    }
                }
                if (count===n)delete this._events[type];
            }
        }
        return this;
    };

    /**
     *从 EventDispatcher 对象中删除指定事件类型的所有侦听器。
     *@param type 事件类型，如果值为 null，则移除本对象所有类型的侦听器。
     *@return 此 EventDispatcher 对象。
     */
    __proto.offAll=function(type){
        var events=this._events;
        if (!events)return this;
        if (type){
            this._recoverHandlers(events[type]);
            delete events[type];
        }else {
            for (var name in events){
                this._recoverHandlers(events[name]);
            }
            this._events=null;
        }
        return this;
    };

    __proto._recoverHandlers=function(arr){
        if(!arr)return;
        if (arr.run){
            arr.recover();
        }else {
            for (var i=arr.length-1;i >-1;i--){
                if (arr[i]){
                    arr[i].recover();
                    arr[i]=null;
                }
            }
        }
    };
})(hGame006);

(function(root) {
    var _super = root.EventDispatcher;

    var Serialize = root.Serialize = function(opts) {
        opts = opts || {};

        _super.call(this, opts);
    };

    root.inherits(Serialize, _super);

    root.extend(Serialize.prototype, {
        inspector: function(obj) {
            if (obj == null) {
                return obj;
            }

            if (typeof obj !== 'object') {
                return obj;
            }

            if (obj instanceof Array) {
                var new_arr = [];

                for (var i in obj) {
                    if (typeof obj[i] === 'object') {
                        new_arr[i] = this.inspector(obj[i]);
                    } else {
                        new_arr[i] = obj[i];
                    }
                }

                return new_arr;
            }

            if (typeof obj.clone === 'function') {
                return obj.clone();
            }

            var new_obj = {};
            for (var key in obj) {
                var val = obj[key];
                if (typeof val === 'object') {
                    new_obj[key] = this.inspector(val);
                } else {
                    if (obj.hasOwnProperty(key)) {
                        new_obj[key] = val;
                    }
                }
            }

            return new_obj;
        },

        clone: function() {
            var obj = {};

            for (var key in this) {
                var val = this[key];

                if (this.hasOwnProperty(key) == false) {
                    continue;
                }

                if (key[0] == '_') {
                    continue;
                }

                obj[key] = this.inspector(val);
            }

            return obj;
        },

        toString: function() {
            return JSON.stringify(this.clone());
        },

        sync: function(opts) {
            for (var key in opts) {
                if (this.hasOwnProperty(key)) {
                    this[key] = opts[key];
                }
            }
        }
    });
}(hGame006));

(function(root) {
    var _super = root.Serialize;
    var Entity = root.Entity = function(opts) {
        opts = opts || {};

        Entity.super(this, opts);

        //private members
        this._properties    = {};

        //public members
        this.uuid           = opts.uuid || root.uuid.v4();
        this.createTime     = opts.createTime || Number(root.moment().format('x'));
    };

    //Inherits Class
    root.inherits(Entity, _super);

    //Extend Prototype
    root.extend(Entity.prototype, {
        set: function(key, val) {
            this._properties[key] = val;
        },

        get: function(key) {
            return this._properties[key];
        }
    });
}(hGame006));
(function(root) {
    root.Code = {
        OK: 200,
        FAILED: 500,
        TIMEOUT: 1000,

        MySQL: {
            DB_ERROR: 1001,
            RECORD_ERROR: 1002,
            PROCEDURE_ERROR: 1003
        },

        REDIS: {
            REDIS_ERROR: 1101
        },

        HTTP: {
            REQUEST_ERROR: 1201,
            STATUS_ERROR: 1202,
            BODY_ERROR: 1203
        },

        GAME_ERR: {
            NOT_ENOUGH_GOLD:        10001,      //金币不足
            HERO_ID_ERR:            10002,      //英雄ID错误
            WRONG_SKILL:            10003,      //没有这个技能
            ALREADY_LEARN:          10004,      //已经学习了
            NOT_ENOUGH_LEVEL:       10005,      //等级不足
            SKILL_IS_ON_CD:         10006,      //技能正在cd
            CANT_EVOLUTION:         10007,      //未满足转生条件
            NOT_ENOUGH_RELIC:       10008,      //荣誉不足
            NOT_ENOUGH_DIAMOND:     10009,      //钻石不足
            NO_ARTIFACT_BUY:        10010,      //暂时没有新神器可购买
            NOT_ARTIFACT:           10011,      //还未获得此神器
            ARTIFACT_LEVEL_MAX:     10012,      //神器已达最高级
            ARTIFACT_NOT_FOR_SALE:  10013,      //该神器无法出售
            HERO_CANT_REVIVED:      10014,      //英雄无需复活 一般是没有邀请到的英雄或者没有死亡的英雄
            ITEM_IS_ON_CD:          10015,      //道具正在cd
            NO_ERR:                 null        //没有错误 一般不用
        },

        AUTH: {

        },

        REQUEST: {
            INVALID_PARAMS: 1500,
            INVALID_SIGNATURE: 1501,
            UNZIP_ERROR: 1502,
            JSON_ERROR: 1503,
            TOKEN_ERROR: 1504,
            SDK_ERROR: 1505,
            DATA_ERROR: 1506,
            INVALID_PLATFORM: 1507,
            INVALID_SERVER: 1508,
            INTERNAL_ERROR: 1509
        }
    };
}(hGame006));
(function(root) {
    var Game = root.Game = function() {
          
    };

    Game.MAX_SKILL = 6;
    Game.MAX_HERO = 30;
    Game.MAX_HERO_SKILL = 7;
    Game.SKILL_AT_LEVEL = [10, 25, 50, 100, 200, 400, 800];
    Game.BOSS_MULTIPLIER = [2, 4, 6, 7, 10];

    Game.TANK_REBORN_LEVEL = 600;
    Game.TANK_REBORN_STAGE = 75;

    Game.SKILL_TRASLACTION = {
        heroDamage: "英雄自身攻击力加成",
        allDamage: "所有攻击加成",
        criticalDamage: "暴击伤害加成",
        bossDamage: "对魔王伤害加成",
        tapDamage: "点击攻击力加成",
        tapDPS: "点击攻击力提升总DPS的",
        criticalChance: "暴击率提高",
        goldAmount: "掉落黄金加成",
        chestGold: "宝箱怪掉落金币加成",
        reborn:"重置这个英雄并大幅增加攻击力"
    };

    Game.SKILL_NAMELIST = ["heavenlyStrike", "shadowClone", "criticalStrike", "warCry", "berserkerRage", "handOfMidas"];

    Game.SKILL_LIST = {
        "heavenlyStrike": { 
            name: "战士狂怒",
            cost: function(level) {
                return level * 160 + 50;  
            },
            effect: function(level) {
                return level*70 + 70;  
            },
            cd: 600,
            cdArtifact: "heavenlyStrikeCD",
            duration: 0,
            dtArtifact: "heavenlyStrikeDuration",
            id: 10001,
            startLevel: 50,
            effectDesc: function(effect){
                return "瞬间攻击力提升" + effect + "倍";
            }
        },

        "shadowClone": {
            name: "旋风斩",
            cost: function(level) {
                return level * 100 + 100;
            },
            effect: function(level) {
                return level*3 + 4;
            },
            cd: 600,
            cdArtifact: "shadowCloneCD",
            duration: 30,
            dtArtifact: "shadowCloneDuration",
            id: 10002,
            startLevel: 100,
            effectDesc: function(effect){
                return "召唤" + effect + "次/秒的影子战士";
            }
        },

        "criticalStrike": {
            name: "嗜血斩击",
            cost: function(level) {
                return level * 140 + 200;
            },
            effect: function(level) {
                return (level*3 + 14)/100;
            },
            cd: 1800,
            cdArtifact: "criticalStrikeCD",
            duration: 30,
            dtArtifact: "criticalStrikeDuration",
            id: 10003,
            startLevel: 200,
            effectDesc: function(effect){
                return "暴击率提升" + (Math.floor(effect * 100)) + "%";
            }
        },

        "warCry": {
            name: "冲锋号角",
            cost: function(level) {
                return level * 110 + 300;
            },
            effect: function(level) {
                return (level*50 + 100)/100;
            },
            cd: 1800,
            cdArtifact: "warCryCD",
            duration: 30,
            dtArtifact: "warCryDuration",
            id: 10004,
            startLevel: 300,
            effectDesc: function(effect){
                return "所有英雄的攻击速度提升" + (Math.floor(effect * 100)) + "%";
            }
        },

        "berserkerRage": {
            name: "巨龙怒吼",
            cost: function(level) {
                return level * 130 + 400;
            },
            effect: function(level) {
                return (level*30 + 40)/100;
            },
            cd: 3600,
            cdArtifact: "berserkerRageCD",
            duration: 30,
            dtArtifact: "berserkerRageDuration",
            id: 10005,
            startLevel: 400,
            effectDesc: function(effect){
                return "点击攻击力提升" + (Math.floor(effect * 100)) + "%";
            }
        },

        "handOfMidas": {
            name: "黄金风暴",
            cost: function(level) {
                return level * 130 + 500;
            },
            effect: function(level) {
                return (level*5 + 10)/100;
            },
            cd: 3600,
            cdArtifact: "handOfMidasCD",
            duration: 30,
            dtArtifact: "handOfMidasDuration",
            id: 10006,
            startLevel: 500,
            effectDesc: function(effect){
                return "每次点击可获得" + (Math.floor(effect * 100)) + "%怪物金币";
            }
        }
    };

    Game.HERO_LIST = [
        {id: 1001, name:"风暴米酒.李", dps:4, cost:"50", freq: 1000, skillType:["heroDamage", "heroDamage", "allDamage", "criticalDamage", "heroDamage", "allDamage", "heroDamage"], skillValue:[0.5, 1, 0.1, 0.1, 10, 0.25, 100]},
        {id: 1002, name:"詹姆斯.克劳森", dps:16, cost:"175", freq: 2400, skillType:["tapDamage", "heroDamage", "heroDamage", "tapDPS", "allDamage", "goldAmount", "heroDamage"], skillValue:[0.05, 1, 10, 0.004, 0.1, 0.1, 100]},
        {id: 1003, name:"麦格伦", dps:56, cost:"674",freq: 1900,  skillType:["heroDamage", "goldAmount", "allDamage", "tapDPS", "chestGold", "criticalChance", "allDamage"], skillValue:[1.5, 0.1, 0.1, 0.004, 0.2, 0.01, 0.3]},
        {id: 1004, name:"奥瑞姆.钢趾", dps:207, cost:"2.85E+3", freq: 3200, skillType:["heroDamage", "heroDamage", "goldAmount", "heroDamage", "criticalDamage", "allDamage", "chestGold"], skillValue:[1, 8, 0.06, 5, 0.05, 0.2, 0.2]},
        {id: 1005, name:"欧沃斯巴克", dps:807, cost:"13.3E+3", freq: 3900, skillType:["heroDamage", "goldAmount", "tapDPS", "goldAmount", "chestGold", "tapDamage", "heroDamage"], skillValue:[3, 0.1, 0.004, 0.15, 0.2, 0.05, 100]},
        {id: 1006, name:"吉娜.羽弓", dps:3.29E+3, cost:"68.1E+3", freq: 3700, skillType:["heroDamage", "heroDamage", "allDamage", "allDamage", "criticalDamage", "criticalChance", "heroDamage"], skillValue:[2, 7, 0.1, 0.2, 0.05, 0.02, 100]},
        {id: 1007, name:"奇普.英代尔", dps:14.14E+3, cost:"384E+3", freq: 1700, skillType:["heroDamage", "bossDamage", "bossDamage", "heroDamage", "tapDamage", "chestGold", "allDamage"], skillValue:[2, 0.05, 0.07, 6, 0.05, 0.2, 0.3]},
        {id: 1008, name:"艾莉恩蒂", dps:63.64E+3, cost:"2.36E+6", freq: 3100, skillType:["heroDamage", "allDamage", "tapDPS", "goldAmount", "chestGold", "heroDamage", "allDamage"], skillValue:[2, 0.1, 0.004, 0.15, 0.2, 19, 0.2]},
        {id: 1009, name:"罗格姆地狱咆哮", dps:440.12E+3, cost:"23.8E+6", freq: 1500, skillType:["heroDamage", "bossDamage", "allDamage", "criticalDamage", "heroDamage", "allDamage", "heroDamage"], skillValue:[1.5, 0.05, 0.3, 0.05, 50, 0.25, 100]},
        {id: 1010, name:"鹰风酋长", dps:1.73E+6, cost:"143E+6", freq: 2900, skillType:["heroDamage", "criticalChance", "bossDamage", "goldAmount", "chestGold", "chestGold", "allDamage"], skillValue:[1.5, 0.01, 0.05, 0.15, 0.2, 0.25, 0.15]},
        {id: 1011, name:"金萨拉", dps:7.15E+6, cost:"943E+6", freq: 2800, skillType:["heroDamage", "heroDamage", "tapDamage", "tapDPS", "goldAmount", "criticalChance", "heroDamage"], skillValue:[2, 8.5, 0.05, 0.004, 0.15, 0.01, 38]},
        {id: 1012, name:"马克西米琳", dps:30.65E+6, cost:"6.84E+9", freq: 3800, skillType:["heroDamage", "heroDamage", "bossDamage", "criticalDamage", "tapDPS", "tapDamage", "goldAmount"], skillValue:[2.5, 13, 0.07, 0.05, 0.004, 0.05, 0.2]},
        {id: 1013, name:"祖金", dps:136.87E+6, cost:"54.7E+9", freq: 3500, skillType:["heroDamage", "heroDamage", "tapDamage", "allDamage", "allDamage", "criticalDamage", "heroDamage"], skillValue:[1.5, 8.5, 0.05, 0.2, 0.3, 0.05, 120]},
        {id: 1014, name:"姆拉", dps:1.08E+9, cost:"820E+9", freq: 3400, skillType:["heroDamage", "heroDamage", "tapDPS", "heroDamage", "goldAmount", "criticalDamage", "goldAmount"], skillValue:[2, 11, 0.004, 4, 0.1, 0.1, 0.2]},
        {id: 1015, name:"凯拉.风刃", dps:5.38E+9, cost:"8.2E+12", freq: 2300, skillType:["heroDamage", "allDamage", "bossDamage", "criticalChance", "criticalDamage", "chestGold", "heroDamage"], skillValue:[3, 0.4, 0.05, 0.02, 0.15, 0.2, 100]},
        {id: 1016, name:"德利奥斯.银刃", dps:76.51E+9, cost:"164E+12", freq: 1200, skillType:["heroDamage", "chestGold", "goldAmount", "bossDamage", "bossDamage", "allDamage", "allDamage"], skillValue:[3.5, 0.25, 0.2, 0.05, 0.07, 0.15, 0.2]},
        {id: 1017, name:"伊莎贝拉", dps:547.07E+9, cost:"1.64E+15", freq: 1600, skillType:["heroDamage", "heroDamage", "goldAmount", "goldAmount", "tapDamage", "criticalDamage", "goldAmount"], skillValue:[1.5, 9, 0.1, 0.1, 0.05, 0.1, 0.25]},
        {id: 1018, name:"扎布拉暗矛", dps:11.73E+12, cost:"49.2E+15", freq: 1800, skillType:["heroDamage", "heroDamage", "bossDamage", "heroDamage", "tapDamage", "chestGold", "allDamage"], skillValue:[4, 5, 0.05, 4.5, 0.05, 0.2, 0.15]},
        {id: 1019, name:"麦格尼.铜须", dps:419.51E+12, cost:"2.46E+18", freq: 2100, skillType:["heroDamage", "heroDamage", "tapDPS", "tapDamage", "allDamage", "goldAmount", "allDamage"], skillValue:[2, 10, 0.005, 0.05, 0.1, 0.1, 0.1]},
        {id: 1020, name:"格尔宾.梅卡托克", dps:8.99E+15, cost:"73.8E+18", freq: 3000, skillType:["heroDamage", "heroDamage", "criticalDamage", "heroDamage", "tapDPS", "tapDamage", "goldAmount"], skillValue:[2.5, 6, 0.2, 4.5, 0.004, 0.1, 0.1]},
        {id: 1021, name:"周铁拳", dps:212.72E+15, cost:"2.44E+21", freq: 3300, skillType:["heroDamage", "tapDamage", "allDamage", "criticalChance", "allDamage", "chestGold", "heroDamage"], skillValue:[2, 0.05, 0.3, 0.02, 0.1, 0.2, 100]},
        {id: 1022, name:"NX01型", dps:15.2E+18, cost:"244E+21", freq: 1300, skillType:["heroDamage", "heroDamage", "allDamage", "heroDamage", "allDamage", "criticalDamage", "allDamage"], skillValue:[2.5, 7.5, 0.1, 5, 0.1, 0.3, 0.2]},
        {id: 1023, name:"阿鲁高", dps:2.17E+21, cost:"48.7E+24", freq: 2700, skillType:["heroDamage", "heroDamage", "tapDPS", "criticalDamage", "tapDamage", "criticalChance", "heroDamage"], skillValue:[3, 8, 0.004, 0.2, 0.1, 0.02, 100]},
        {id: 1024, name:"魔导师艾洛娜", dps:621.41E+21, cost:"19.5E+27", freq: 4000, skillType:["heroDamage", "heroDamage", "heroDamage", "goldAmount", "chestGold", "heroDamage", "allDamage"], skillValue:[2, 5, 12, 0.15, 0.2, 90, 0.15]},
        {id: 1025, name:"考格斯宾", dps:487.6E+24, cost:"21.4E+30", freq: 1100, skillType:["tapDamage", "tapDamage", "tapDPS", "allDamage", "goldAmount", "criticalChance", "heroDamage"], skillValue:[0.05, 0.05, 0.004, 0.1, 0.15, 0.02, 150]},
        {id: 1026, name:"吉安娜", dps:38.44E+30, cost:"2.36E+36", freq: 3600, skillType:["heroDamage", "heroDamage", "tapDPS", "bossDamage", "allDamage", "bossDamage", "goldAmount"], skillValue:[3.5, 6.5, 0.004, 0.05, 0.1, 0.05, 0.12]},
        {id: 1027, name:"沙娜安", dps:301.69E+42, cost:"25.9E+45", freq: 2600, skillType:["heroDamage", "heroDamage", "allDamage", "bossDamage", "criticalChance", "criticalDamage", "chestGold"], skillValue:[3, 7, 0.1, 0.1, 0.02, 0.3, 0.2]},
        {id: 1028, name:"娅琳石蹄", dps:237.66E+54, cost:"28.5E+60", freq: 2200, skillType:["heroDamage", "allDamage", "heroDamage", "heroDamage", "criticalDamage", "criticalChance", "allDamage"], skillValue:[3.5, 0.01, 4, 6, 0.2, 0.03, 0.15]},
        {id: 1029, name:"达拉那.克拉克", dps:18.69E+75, cost:"3.14E+81", freq: 2600, skillType:["heroDamage", "heroDamage", "goldAmount", "tapDamage", "goldAmount", "allDamage", "goldAmount"], skillValue:[3.3, 5.5, 0.1, 0.1, 0.2, 0.1, 0.3]},
        {id: 1030, name:"克里多尔米", dps:13.36E+90, cost:"3.14E+96", freq: 2200, skillType:["criticalDamage", "tapDamage", "tapDPS", "goldAmount", "allDamage", "allDamage", "allDamage"], skillValue:[0.4, 0.2, 0.01, 0.6, 0.2, 0.3, 0.4]},
        {id: 1031, name:"Pixie the Rebel Fairy", dps:1.14E+96, cost:"3.76E+116", freq: 1000,skillType:["heroDamage", "heroDamage", "criticalChance", "tapDamage", "chestGold", "allDamage", "goldAmount"], skillValue:[9.0, 20.0, 0.01, 0.6, 0.25, 0.1, 0.15]},
        {id: 1032, name:"Jackalope the Fireballer", dps:9.01E+115, cost:"4.14E+136", freq: 1000,skillType:["heroDamage", "heroDamage", "goldAmount", "tapDamage", "criticalChance", "allDamage", "bossDamage"], skillValue:[0.4, 0.2, 0.25, 0.6, 0.2, 0.3, 0.1]},
        {id: 1033, name:"Dark Lord", dps:7.10E+135, cost:"4.56E+156", freq: 1000,skillType:["heroDamage", "tapDamage", "tapDPS", "goldAmound", "allDamage", "allDamage", "allDamage"], skillValue:[20.0, 0.2, 0.01, 0.25, 0.2, 0.3, 0.4]}
    ];

    Game.ITEM_LIST = {
        "storm": {
            id: 1001,
            name: "天降黄金",
            desc: "获得黄金",
            cd: 10,
            duration: 0,
            cost: 100
        },
        "doom": {
            id: 1002,
            name: "秒杀",
            desc: "秒杀当前怪物",
            cd: 10,
            duration: 0,
            cost: 50
        },
        "holding": {
            id: 1003,
            name: "坚持神力",
            desc: "让你每秒点击30下，效果持续",
            //cd0秒 启动之后还可以继续启动 这时叠加时间
            cd: 0,
            duration: 120,
            cost: 100
        },
        "shield": {
            id: 1004,
            name: "守卫护盾",
            desc: "所有英雄获得24小时免疫死亡效果",
            cd: 86400,
            duration: 86400,
            cost: 100
        },
        "refresh": {
            id: 1005,
            name: "技能刷新",
            desc: "重置所有主角技能冷却时间",
            cd: 10,
            duration: 10,
            cost: 120
        }
    };

    Game.ARTIFACT_LIST = {
        "savior": {
            id: 1023,
            name: "正义之盾",
            maxLevel: 25,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.5,
            costY: 1.7,
            effect: "bossTime",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%与魔王的战斗时间";},
            description: "集正义之力打造的正义之盾，是有效抵挡魔王伤害的强大神器。",
            weight: 50
        },
        "fissure": {
            id: 1015,
            name: "太阳井能量",
            maxLevel: -1,
            baseDamage: 0.6,
            incrementDamage: 0.6,
            costX: 0.5,
            costY: 1.7,
            effect: "warCryDuration",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%冲锋号角持续时间";},
            description: "太阳井是覆盖整个奎尔萨拉斯地域的强大魔法能量的储存器。它是由高等精灵们利用从永恒之井中取出的一瓶圣水制造的，蕴含着巨大的魔法能量。",
            weight: 50
        },
        "tincture": {
            id: 1004,
            name: "霜之哀伤",
            maxLevel: -1,
            baseDamage: 0.05,
            incrementDamage: 0.05,
            costX: 0.6,
            costY: 2.5,
            effect: "DPS",
            efFunc: function(level) { return level * 0.05; },
            efDesc: function(level) { return "+" + (level * 5) + "%所有攻击力额外加成";},
            description: "霜之哀伤的持有者将获得永恒的力量，然而也将付出代价：“剑锋饮血之时，亦将重创灵魂。”",
            weight: 25
        },
        "valrunes": {
            id: 1001,
            name: "恶魔之魂",
            maxLevel: -1,
            baseDamage: 0.25,
            incrementDamage: 0.25,
            costX: 0.7,
            costY: 2,
            effect: "mobGold",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%怪物黄金"; },
            description: "巨龙之魂聚集了几大守护巨龙的力量，守护着艾泽拉斯最强大的怪兽宝藏。",
            weight: 40
        },
        "hammer": {
            id: 1007,
            name: "蛋刀",
            maxLevel: -1,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.5,
            costY: 1.7,
            effect: "tapDamage",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%点击攻击力"; },
            description: "相传这是在一万年前的上古之战中，从末日守卫军官手中缴获，具有无法想象的攻击力。",
            not_for_sale: true,
            weight: 0
        },
        "chalice": {
            id: 1013,
            name: "古尔丹之颅",
            maxLevel: -1,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.7,
            costY: 1.7,
            effect: "goldx10Chance",
            efFunc: function(level) { return level * 0.005; },
            efDesc: function(level) { return "+" + (level * 0.5).toFixed(1) + "%10倍黄金几率";},
            description: "曾经强大兽人首领古尔丹，为了得到萨格拉斯力量的秘密，进入远古地牢的大门后被大门后面的恶魔撕碎。古尔丹死了，而他的魔法能量却奇迹般地留存在他的头颅里面。",
            weight: 10
        },
        "pendant": {
            id: 1028,
            name: "矿工护身符",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.7,
            costY: 1.5,
            effect: "handOfMidasCD",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%黄金风暴冷却时间"; },
            description: "地精专用的护身符，能让她们在挖掘矿石时能更大几率地找到黄金。",
            weight: 50
        },
        "seeker": {
            id: 1017,
            name: "末日亡灵",
            maxLevel: 25,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.5,
            costY: 2,
            effect: "criticalChance",
            efFunc: function(level) { return level * 0.02; },
            efDesc: function(level) { return "+" + (level * 2) + "%暴击几率"; },
            description: "由暗黑精灵打造的封存了大量亡灵力量创造出来的特级武器。",
            weight: 40
        },
        "thrust": {
            id: 1003,
            name: "灰烬使者",
            maxLevel: -1,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.7,
            costY: 1.7,
            effect: "criticalDamage",
            efFunc: function(level) { return level * 0.2; },
            efDesc: function(level) { return "+" + (level * 20) + "%暴击伤害"; },
            description: "曾经的血色十字军领袖之剑，拥有着神秘而强大的力量。",
            weight: 40
        },
        "fortune": {
            id: 1018,
            name: "未来的财富",
            maxLevel: -1,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.7,
            costY: 2,
            effect: "goldCollection",
            efFunc: function(level) { return level * 0.05; },
            efDesc: function(level) { return "+" + (level * 5) + "%获得金币数量比例"; },
            description: "月之女神指引的藏于密林中的财富宝藏。",
            weight: 10
        },
        "opulence": {
            id: 1002,
            name: "萨格拉斯之眼",
            maxLevel: -1,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.7,
            costY: 1.7,
            effect: "handOfMidasDuration",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%黄金风暴持续时间"; },
            description: "拥有撕裂诺森德大陆力量的强大神器，并能产生强大的黄金风暴。",
            weight: 50
        },
        "mettle": {
            id: 1022,
            name: "战士勇气",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.4,
            costY: 1.5,
            effect: "berserkerRageDuration",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%巨龙怒吼冷却时间"; },
            description: "月之女神为正义的战士打造的神奇药剂，能让战士在一定时间内充满了力量。",
            weight: 50
        },
        "lotion": {
            id: 1016,
            name: "影魔药剂",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.4,
            costY: 1.5,
            effect: "shadowCloneCD",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%旋风斩冷却时间"; },
            description: "由德鲁伊战士发明的，充满了大自然精华的药剂，服用后能迅速恢复体力。",
            weight: 50
        },
        "elixir": {
            id: 1020,
            name: "矮人的灵药",
            maxLevel: -1,
            baseDamage: 0.2,
            incrementDamage: 0.2,
            costX: 0.5,
            costY: 1.8,
            effect: "goldPlaying",
            efFunc: function(level) { return level * 0.15; },
            efDesc: function(level) { return "+" + (level * 15) + "%游戏期间获得金币数量比例"; },
            description: "爱财的矮人发明的神奇药剂，能够让你充满了对财富的灵感，轻易获得更多财富。",
            weight: 50
        },
        "resolution": {
            id: 1005,
            name: "毁灭之锤",
            maxLevel: -1,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.5,
            costY: 1.7,
            effect: "berserkerRageDuration",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%巨龙怒吼持续时间"; },
            description: "部落酋长奥格瑞姆在解救敦霍尔德监狱兽人俘虏的战斗中受到伏击，生命垂危。临死前把自己的黑色战锤交给了萨尔，宣布其为新的部落大酋长。",
            weight: 50
        },
        "aura": {
            id: 1014,
            name: "泰兰德的回忆",
            maxLevel: -1,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.7,
            costY: 2,
            effect: "evolutionBonus",
            efFunc: function(level) { return level * 0.05; },
            efDesc: function(level) { return "+" + (level * 5) + "%进化时获得的额外荣誉"; },
            description: "封存着大恶魔的伊利丹对月之女祭司泰兰德的美好回忆的风干玫瑰。",
            weight: 10
        },
        "egg": {
            id: 1027,
            name: "魔王秘宝",
            maxLevel: -1,
            baseDamage: 0.2,
            incrementDamage: 0.2,
            costX: 1,
            costY: 1.5,
            effect: "chestChance",
            efFunc: function(level) { return level * 0.02; },
            efDesc: function(level) { return "+" + (level * 20) + "%金币宝箱几率"; },
            description: "获得魔王秘宝的典籍能够让你得到大量财富。",
            weight: 10
        },
        "parchment": {
            id: 1012,
            name: "群星之怒",
            maxLevel: -1,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.5,
            costY: 1.7,
            effect: "criticalStrikeDuration",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%嗜血斩击持续时间"; },
            description: "索利达尔在太阳之井中沐浴多年，吸收了无尽的魔法能量之后拥有了传奇般的能力。在它张开弓弦时就会自动制造魔法箭矢，不需要装备弹药。",
            weight: 50
        },
        "cloak": {
            id: 1009,
            name: "龙父之牙",
            maxLevel: 25,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.5,
            costY: 2,
            effect: "bossLife",
            efFunc: function(level) { return -0.02 * level; },
            efDesc: function(level) { return "-" + (level * 2) + "%魔王生命力"; },
            description: "黑龙王子用父亲的龙牙制成的匕首，威力无比，是一件能震慑魔王的神器。",
            weight: 25
        },
        "shield": {
            id: 1010,
            name: "巨龙之怒",
            maxLevel: -1,
            baseDamage: 0.3,
            incrementDamage: 0.3,
            costX: 0.7,
            costY: 1.5,
            effect: "bossGold",
            efFunc: function(level) { return level; },
            efDesc: function(level) { return "+" + (level * 100) + "%魔王黄金"; },
            description: "牺牲了的蓝龙的寄魂之杖，得到这个神器就如同跟蓝龙合体，得到蓝龙的强大法力。",
            weight: 10
        },
        "contentment": {
            id: 1029,
            name: "魅魔的赏赐",
            maxLevel: -1,
            baseDamage: 0.2,
            incrementDamage: 0.2,
            costX: 1,
            costY: 1.5,
            effect: "chestGold",
            efFunc: function(level) { return level * 0.2; },
            efDesc: function(level) { return "+" + (level * 20) + "%宝箱金币"; },
            description: "魅魔总是喜欢给凡人赏赐财宝以更容易控制其心智。",
            weight: 10
        },
        "ointment": {
            id: 1025,
            name: "巫医药膏",
            maxLevel: 10,
            baseDamage: 0.6,
            incrementDamage: 0.6,
            costX: 0.4,
            costY: 1.5,
            effect: "warCryCD",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%冲锋号角的冷却时间"; },
            description: "巫医药膏能让所有使用的英雄迅速恢复神勇无比的战斗状态。",
            weight: 50
        },
        "gauntlet": {
            id: 1011,
            name: "影之哀伤",
            maxLevel: -1,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.5,
            costY: 1.7,
            effect: "shadowCloneCD",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%旋风斩持续时间"; },
            description: "它诞生于神圣和堕落的力量当中，束缚着一千个亡魂，只有艾泽拉斯最强健的武器大师才能将其挥动。",
            weight: 50
        },
        "charm": {
            id: 1019,
            name: "魔王之戒",
            maxLevel: 25,
            baseDamage: 0.15,
            incrementDamage: 0.15,
            costX: 0.5,
            costY: 1.7,
            effect: "upgradeCost",
            efFunc: function(level) { return -0.02 * level; },
            efDesc: function(level) { return "-" + (level * 2) + "%升级花费"; },
            description: "拥有魔王之戒能让你轻易获得强大的战斗力。",
            weight: 40
        },
        "scroll": {
            id: 1021,
            name: "圣骑之盾",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.4,
            costY: 1.5,
            effect: "criticalStrikeCD",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%嗜血斩击的冷却时间"; },
            description: "能让战士获得强大的保护，并大量缩短战士的恢复时间与提升战斗力。",
            weight: 50
        },
        "saintly": {
            id: 1026,
            name: "贤者之盾",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 0.3,
            costY: 1.5,
            effect: "heavenlyStrikeCD",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%战士狂怒的冷却时间"; },
            description: "贤者之盾能帮助战士在最短的时间内恢复强大的能量使用必杀技。",
            weight: 50
        },
        "revival": {
            id: 1008,
            name: "橡木之斧",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 1,
            costY: 2.2,
            effect: "reviveTime",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%英雄重生时间"; },
            description: "由森林之王半神赛纳留斯和玛法里奥亲手为布洛克斯铸造的，一把拥有着完美平衡性的橡木之斧，这等殊荣凡人岂可有之。",
            weight: 25
        },
        "worldly": {
            id: 1006,
            name: "大皇家之剑",
            maxLevel: 5,
            baseDamage: 1.5,
            incrementDamage: 1.5,
            costX: 0.6,
            costY: 3,
            effect: "mobCount",
            efFunc: function(level) { return -1 * level; },
            efDesc: function(level) { return "-" + level + "个关卡怪物"; },
            description: "洛萨使用的武器，在跟毁灭之锤对垒时被折断，之后的去向无人知晓……",
            weight: 40
        },
        "armor": {
            id: 1024,
            name: "蛋盾",
            maxLevel: 10,
            baseDamage: 0.35,
            incrementDamage: 0.35,
            costX: 1,
            costY: 2.2,
            effect: "deathChance",
            efFunc: function(level) { return -0.05 * level; },
            efDesc: function(level) { return "-" + (level * 5) + "%英雄死亡几率"; },
            description: "相传这是在一万年前的上古之战中，从末日守卫军官手中缴获，是防护英雄最好的神器，没有之一。",
            not_for_sale: true,
            weight: 0
        },
        "indian": {
            id: 1030,
            name: "狂野之血",
            maxLevel: 10,
            baseDamage: 0.45,
            incrementDamage: 0.45,
            costX: 80,
            costY: 2,
            effect: "powerOfHoldingDuration",
            efFunc: function(level) { return level * 0.1; },
            efDesc: function(level) { return "+" + (level * 10) + "%坚持神力持续时间"; },
            description: "饮用之前摇一摇，喝了之后猛如虎，效果堪比“印度神油”！",
            not_for_sale: true,
            only_lottery: true,
            weight: 10
        },
        "stagejump": {
            id: 1031,
            name: "越级弹簧",
            maxLevel: 1000,
            baseDamage: 0,
            incrementDamage: 0.45,
            costX: 1,
            costY: 2,
            effect: "stageJump",
            efFunc: function(level) { return level; },
            efDesc: function(level) { return "+" + level + "初始关卡"; },
            description: "跳级能手，从1直升100不是梦。",
            not_for_sale: true,
            only_lottery: true,
            weight: 25
        },
        "autoclick": {
            id: 1032,
            name: "风行合剂",
            maxLevel: 10,
            baseDamage: 0.45,
            incrementDamage: 0.45,
            costX: 80,
            costY: 2,
            effect: "autoClick",
            efFunc: function(level) { return level; },
            efDesc: function(level) { return "+" + level + "次每秒自动点击"; },
            description: "喝了之后根本停不下来！",
            not_for_sale: true,
            only_lottery: true,
            weight: 10
        },
        "evobonus": {
            id: 1033,
            name: "狡诈护符",
            maxLevel: 1000,
            baseDamage: 0.30,
            incrementDamage: 0.30,
            costX: 1,
            costY: 2,
            effect: "goldAfterReborn",
            efFunc: function(level) { return level; },
            efDesc: function(level) { return "+" + level + "关怪物掉落的初始金币"; },
            description: "用于英雄转生后的初始启动金币获取。",
            not_for_sale: true,
            only_lottery: true,
            weight: 10
        },
        "autostage": {
            id: 1034,
            name: "月虎披风",
            maxLevel: 210,
            baseDamage: 0.30,
            incrementDamage: 0.30,
            costX: 1,
            costY: 2,
            effect: "autoStage",
            efFunc: function(level) {
                if (!level || level < 0) {
                    return 0;
                }
                else {
                    return 240 - (level - 1);
                }
            },
            efDesc: function(level) {
                if (!level || level < 0) {
                    return "";
                }
                else {
                    return "+" + (240 - (level - 1)) + "秒下线自动跳关速度";
                }
            },
            description: "玩家离线后，通过自身攻击力，可以离线过关，获得更大的挂机升级效果。",
            not_for_sale: true,
            only_lottery: true,
            weight: 5
        }
    };

    Game.STAGE_LIST = {
        1:{"id":"1","name":"奥妮克希亚的巢穴","list":[10003,10004,10010,10016],"bossId":10001,"bgId":10001},
        2:{"id":"2","name":"奥妮克希亚的巢穴","list":[10003,10004,10010,10016],"bossId":10001,"bgId":10001},
        3:{"id":"3","name":"奥妮克希亚的巢穴","list":[10003,10004,10010,10016],"bossId":10001,"bgId":10001},
        4:{"id":"4","name":"奥妮克希亚的巢穴","list":[10003,10004,10010,10016],"bossId":10001,"bgId":10001},
        5:{"id":"5","name":"奥妮克希亚的巢穴","list":[10003,10004,10010,10016],"bossId":10001,"bgId":10001},
        6:{"id":"6","name":"熔火之心","list":[10003,10004,10010,10016,10001],"bossId":10019,"bgId":10002},
        7:{"id":"7","name":"熔火之心","list":[10003,10004,10010,10016,10001],"bossId":10019,"bgId":10002},
        8:{"id":"8","name":"熔火之心","list":[10003,10004,10010,10016,10001],"bossId":10019,"bgId":10002},
        9:{"id":"9","name":"熔火之心","list":[10003,10004,10010,10016,10001],"bossId":10019,"bgId":10002},
        10:{"id":"10","name":"熔火之心","list":[10003,10004,10010,10016,10001],"bossId":10019,"bgId":10002},
        11:{"id":"11","name":"黑翼之巢","list":[10003,10010,10016,10016,10015,10016,10018],"bossId":10020,"bgId":10003},
        12:{"id":"12","name":"黑翼之巢","list":[10003,10010,10016,10016,10015,10016,10018],"bossId":10020,"bgId":10003},
        13:{"id":"13","name":"黑翼之巢","list":[10003,10010,10016,10016,10015,10016,10018],"bossId":10020,"bgId":10003},
        14:{"id":"14","name":"黑翼之巢","list":[10003,10010,10016,10016,10015,10016,10018],"bossId":10020,"bgId":10003},
        15:{"id":"15","name":"黑翼之巢","list":[10003,10010,10016,10016,10015,10016,10018],"bossId":10020,"bgId":10003},
        16:{"id":"16","name":"安其拉废墟","list":[10003,10004,10010,10016,10017,10020],"bossId":10007,"bgId":10004},
        17:{"id":"17","name":"安其拉废墟","list":[10003,10004,10010,10016,10017,10020],"bossId":10007,"bgId":10004},
        18:{"id":"18","name":"安其拉废墟","list":[10003,10004,10010,10016,10017,10020],"bossId":10007,"bgId":10004},
        19:{"id":"19","name":"安其拉废墟","list":[10003,10004,10010,10016,10017,10020],"bossId":10007,"bgId":10004},
        20:{"id":"20","name":"安其拉废墟","list":[10003,10004,10010,10016,10017,10020],"bossId":10007,"bgId":10004},
        21:{"id":"21","name":"安其拉神殿","list":[10003,10004,10010,10016,10001,10019,10003,10005],"bossId":10013,"bgId":10005},
        22:{"id":"22","name":"安其拉神殿","list":[10003,10004,10010,10016,10001,10019,10003,10005],"bossId":10013,"bgId":10005},
        23:{"id":"23","name":"安其拉神殿","list":[10003,10004,10010,10016,10001,10019,10003,10005],"bossId":10013,"bgId":10005},
        24:{"id":"24","name":"安其拉神殿","list":[10003,10004,10010,10016,10001,10019,10003,10005],"bossId":10013,"bgId":10005},
        25:{"id":"25","name":"安其拉神殿","list":[10003,10004,10010,10016,10001,10019,10003,10005],"bossId":10013,"bgId":10005},
        26:{"id":"26","name":"卡拉赞","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10018,"bgId":10006},
        27:{"id":"27","name":"卡拉赞","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10018,"bgId":10006},
        28:{"id":"28","name":"卡拉赞","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10018,"bgId":10006},
        29:{"id":"29","name":"卡拉赞","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10018,"bgId":10006},
        30:{"id":"30","name":"卡拉赞","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10018,"bgId":10006},
        31:{"id":"31","name":"玛瑟里顿的巢穴","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10001,"bgId":10007},
        32:{"id":"32","name":"玛瑟里顿的巢穴","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10001,"bgId":10007},
        33:{"id":"33","name":"玛瑟里顿的巢穴","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10001,"bgId":10007},
        34:{"id":"34","name":"玛瑟里顿的巢穴","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10001,"bgId":10007},
        35:{"id":"35","name":"玛瑟里顿的巢穴","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10001,"bgId":10007},
        36:{"id":"36","name":"格鲁尔的巢穴","list":[10003,10004,10010,10016,10001,10019,10003,10005,10009,10011],"bossId":10018,"bgId":10008},
        37:{"id":"37","name":"格鲁尔的巢穴","list":[10003,10004,10010,10016,10001,10019,10003,10005,10009,10011],"bossId":10018,"bgId":10008},
        38:{"id":"38","name":"格鲁尔的巢穴","list":[10003,10004,10010,10016,10001,10019,10003,10005,10009,10011],"bossId":10018,"bgId":10008},
        39:{"id":"39","name":"格鲁尔的巢穴","list":[10003,10004,10010,10016,10001,10019,10003,10005,10009,10011],"bossId":10018,"bgId":10008},
        40:{"id":"40","name":"格鲁尔的巢穴","list":[10003,10004,10010,10016,10001,10019,10003,10005,10009,10011],"bossId":10018,"bgId":10008},
        41:{"id":"41","name":"毒蛇神殿","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10017,"bgId":10009},
        42:{"id":"42","name":"毒蛇神殿","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10017,"bgId":10009},
        43:{"id":"43","name":"毒蛇神殿","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10017,"bgId":10009},
        44:{"id":"44","name":"毒蛇神殿","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10017,"bgId":10009},
        45:{"id":"45","name":"毒蛇神殿","list":[10003,10010,10016,10016,10015,10016,10018,10004,10008,10012],"bossId":10017,"bgId":10009},
        46:{"id":"46","name":"风暴要塞","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10019,"bgId":10010},
        47:{"id":"47","name":"风暴要塞","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10019,"bgId":10010},
        48:{"id":"48","name":"风暴要塞","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10019,"bgId":10010},
        49:{"id":"49","name":"风暴要塞","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10019,"bgId":10010},
        50:{"id":"50","name":"风暴要塞","list":[10003,10004,10010,10016,10017,10020,10006,10007,10010],"bossId":10019,"bgId":10010}
    };

    Game.ACHIVEMENT_LIST = {

    };

    Game.MONSTER_LIST = {
        10001: {id: 10001, name: "黑龙"},
        10003: {id: 10003, name: "蚊子"},
        10004: {id: 10004, name: "不撸"},
        10005: {id: 10005, name: "拉加克斯"},
        10006: {id: 10006, name: "莫阿木"},
        10007: {id: 10007, name: "58"},
        10008: {id: 10008, name: "斯可拉姆"},
        10009: {id: 10009, name: "沙尔吐拉"},
        10010: {id: 10010, name: "维希杜斯"},
        10011: {id: 10011, name: "双子哥"},
        10012: {id: 10012, name: "奥塞罗"},
        10013: {id: 10013, name: "克苏"},
        10014: {id: 10014, name: "鲁西弗龙"},
        10015: {id: 10015, name: "玛格蛮达"},
        10016: {id: 10016, name: "甲尔"},
        10017: {id: 10017, name: "元素"},
        10018: {id: 10018, name: "谷磊曼格"},
        10019: {id: 10019, name: "螺丝"},
        10020: {id: 10020, name: "勒什勒尔"},
        10021: {id: 10021, name: "宝箱"},
        10022: {id: 10022, name: "双子弟"}
    };

    //将数值转换成 K M T B aa 等文字显示格式
    Game.formatNumber = function(num) {
        var count = 0;
        while(num >= 1000)
        {
            num /= 1000;
            count++;
        }
        num = +(num).toFixed(2);

        var exp = "E+" + count*3;
        if(count < 31)
        {
            if(count == 0) {
                exp = "";
            } else if(count == 1) {
                exp = "K";
            } else if(count == 2) {
                exp = "M";
            } else if(count == 3) {
                exp = "B";
            } else if(count == 4) {
                exp = "T";
            } else {
                exp = String.fromCharCode(97 + count - 5) + String.fromCharCode(97 + count - 5);
            }
        }

        return num + exp
    };
}(hGame006));
(function(root) {
    var Game = root.Game;
    var Interface = root.Interface = {
        isGoldEnough: function(amount) {
            return this._player.gold >= Math.abs(amount);
        },

        decreaseGold: function(amount) {
            var gold = this._player.gold;
            gold -= Math.abs(amount);
            if (gold < 0) {
                gold = 0;
            }
            this._player.gold = gold;
        },

        increaseGold: function(amount) {
            var gold = this._player.gold;
            if (gold < 0) {
                gold = 0;
            }
            gold += Math.abs(amount);
            this._player.gold = gold;
        },

        getDiamond: function() {
            return this._player.diamond;
        },

        setDiamond: function(x) {
            this._player.diamond = x;
        },

        isDiamondEnough: function(x) {
            return this._player.diamond >= Math.abs(x);
        },

        increaseDiamond: function(x) {
            this._player.diamond += Math.abs(x);
        },

        decreaseDiamond: function(x) {
            this._player.diamond -= Math.abs(x);
            if (this._player.diamond < 0) {
                this._player.diamond = 0;
            }
        },

        getRelic: function() {
            return this._player.relics;
        },

        setRelic: function(x) {
            this._player.relics = x;
        },

        isRelicEnough: function(x) {
            return this._player.relics >= Math.abs(x);
        },

        increaseRelic: function(x) {
            this._player.relics += Math.abs(x);
        },

        decreaseRelic: function(x) {
            this._player.relics -= Math.abs(x);
            if (this._player.relics < 0) {
                this._player.relics = 0;
            }
        },

        addFairy: function(fairy) {
            if (fairy == null) {
                return;
            }

            this._player._fairies[fairy.uuid] = fairy;
        },

        removeFairy: function(uuid) {
            delete this._player._fairies[uuid];
        },

        findFairy: function(uuid) {
            return this._player._fairies[uuid];
        },

        getWeapon: function() {
            return this._player.weapons;
        },

        setWeapon: function(x) {
            this._player.weapons = x;
        },

        isWeaponEnough: function(x) {
            return this._player.weapons >= Math.abs(x);
        },

        increaseWeapon: function(x) {
            this._player.weapons += Math.abs(x);
        },

        decreaseWeapon: function(x) {
            this._player.weapons -= Math.abs(x);
            if (this._player.weapons < 0) {
                this._player.weapons = 0;
            }
        },

        getGameValues: function() {
            return this._player.gameValues;
        },

        getHeroValues: function() {
            return this._player.heroValues;
        },

        getArtifactValues: function() {
            return this._player.artifactValues;
        },

        getStage: function() {
            return this._player.stage;
        },

        getHero: function(heroIndex) {
            return this._player.heros[heroIndex];
        },

        findArtifact: function(key) {
            return this._player.artifacts[key];
        },

        getAchievement: function(achIndex) {
            return this._player.achievements[achIndex];
        },

        findItem: function(key) {
            return this._player.items[key];
        },

        //超过50关之后的boss生成的时候调用来查看是否有英雄死亡
        genHeroKillInfo: function(stage) {
            //todo 盾牌道具效果

            var rate = 0.2;
            if (stage % 5 != 0) {
                rate = 0.05;
            }

            var artifactValues = this.getArtifactValues();
            rate *= (1 + artifactValues.deathChance);

            //暂时百分百
            //if (Math.random() >= rate) {
            //    return null;
            //}

            var heroList = [];
            for (var i = 0; i < Game.MAX_HERO; i++) {
                var hero = this.getHero(i);
                if (hero && hero.active()) {
                    heroList.push(i);
                }
            }

            if (heroList.length == 0) {
                return null;
            }

            var index = Math.floor(Math.random() * heroList.length);
            var heroId = heroList[index];

            //5~25秒之间随机
            var time = Math.random() * 20 + 5;
            time = Math.ceil(time);

            return {heroId: heroId, time: time};
        },

        // 核心计算：更新所有英雄的技能效果
        updateHeroValues: function() {
            var heroValues = this.getHeroValues();
            for (var key in heroValues) {
                if (heroValues.hasOwnProperty(key)) {
                    heroValues[key] = 0;
                }
            }

            for (var index = 0; index < Game.MAX_HERO; index++) {
                var hero = this.getHero(index);

                if (hero.active() == false) {
                    continue;
                }

                var multiplier = 0;
                for (var i = 0; i < Game.MAX_HERO_SKILL; i++) {
                    var type = hero.getSkillType(i);
                    var effect = hero.getSkillEffect(i);

                    if (type == 'heroDamage') {
                        multiplier += effect;
                    }
                    else {
                        heroValues[type] += effect;
                    }
                }

                if (multiplier > 0) {
                    hero._multiplier = multiplier;
                }
            }
        },

        // 核心计算：更新所有神器的效果
        updateArtifactValues: function() {
            var artifactValues = this.getArtifactValues();

            for (var effect in artifactValues) {
                artifactValues[effect] = 0;
            }

            for (var artifactKey in this._player.artifacts) {
                var artifact = this.findArtifact(artifactKey);
                var effectInfo = artifact.getEffect();

                if (artifactValues[effectInfo.effect] == null) {
                    console.log("[ debug ] artifact effect lost " + effectInfo.effect);
                    artifactValues[effectInfo.effect] = 0;
                }

                artifactValues[effectInfo.effect] += effectInfo.value;
                artifactValues.allDamage += artifact.getDamage();
            }
        },

        // 核心计算：更新所有游戏中用的计算数值
        updateTitans: function() {
            this.getStage().update();

            var heroDamage = 0;
            for (var i = 0; i < Game.MAX_HERO; i++) {
                var hero = this.getHero(i);
                if (hero.active() == true) {
                    heroDamage += hero.getDPS();
                }
            }

            this.updateHeroValues();
            this.updateArtifactValues();

            //下面这堆因为都是object 可以直接在赋值的变量上更改
            var gameValues = this.getGameValues();
            var heroValues = this.getHeroValues();
            var artifactValues = this.getArtifactValues();

            gameValues.heroDamage = heroDamage;

            gameValues.tapDamage = this._player.getDamage(this._player.level);
            gameValues.tapBossDamage = Math.ceil(gameValues.tapDamage * (1 + heroValues.bossDamage));

            gameValues.criticalChance = 0.01 + heroValues.criticalChance + artifactValues.criticalChance;
            gameValues.criticalMultiplier = Math.ceil((10 + heroValues.criticalDamage) * (1 + artifactValues.criticalDamage));

            gameValues.criticalDamage = Math.ceil(gameValues.tapDamage * gameValues.criticalMultiplier);
            gameValues.bossCriticalDamage = Math.ceil(gameValues.tapBossDamage * gameValues.criticalMultiplier);
        }
    };
}(hGame006));
(function(root) {
    var _super = root.Serialize;

    var Game = root.Game;
    var Achievement = root.Achievement = function(opts) {
        opts = opts || {};
        
        _super.call(this, opts);
    };

    root.inherits(Achievement, _super);

    root.extend(Achievement.prototype, root.Interface);

    root.extend(Achievement.prototype, {
        
    });

    Achievement.create = function(opts, player) {
        opts = opts || {};

        return {};
    };

    Achievement.load = function(opts, player) {
        opts = opts || {};

        return {};
    };
}(hGame006));
(function(root) {
    var _super = root.Entity;

    var Game = root.Game;
    var Artifact = root.Artifact = function(opts) {
        opts = opts || {};
        
        _super.call(this, opts);
    
        this._player             = opts._player || null;
        this._db                 = opts._db || null;
        this._name               = this._db.name;
    
        this.id                  = opts.id || this._db.id;
        this.level               = opts.level || 0;
        this.key                 = opts.key;
        this.consume             = opts.consume || 0;
    };

    root.inherits(Artifact, _super);

    root.extend(Artifact.prototype, root.Interface);

    root.extend(Artifact.prototype, {
        getName: function() {
            return this._name;
        },

        getDB: function() {
            return this._db;
        },

        getCost: function() {
            return Math.round(this._db.costX * Math.pow(this.level+1, this._db.costY));
        },
        
        getEffect: function() {
            return {effect: this._db.effect, value: this._db.efFunc(this.level)};
        },
        
        getDamage: function(level) {
            level = level || this.level;

            var artifactValues = this.getArtifactValues();
            return (this._db.baseDamage + this._db.incrementDamage * level) * (1 + artifactValues.DPS);
        },

        getEffectDesc: function(level) {
            level = level || this.level;

            return this._db.efDesc(level);
        },

        getLevel: function() {
            return this.level;
        },

        getMaxLevel: function() {
            return this._db.maxLevel;
        },

        getConsume: function() {
            return this.consume;
        },

        getSaleCost: function() {
            return Math.ceil(this.consume / 2) + 49;
        },

        isNotForSale: function() {
            return this._db.not_for_sale || false;
        },
        
        getDescribe: function() {
            return this._db.description;
        },

        upgrade: function(cost) {
            if (this._db.maxLevel != -1 && this.level >= this._db.maxLevel) {
                return;
            }

            cost = cost || 0;

            this.level++;
            this.consume += cost;
        },

        destroy: function() {

        },

        syncArtifact: function(opts) {
            var self = this;
            var i;
            var value;
            opts = opts || {};

            if (opts.upgrade != null) {
                value = parseInt(opts.upgrade);
                self.upgrade(value);
            }
        }
    });

    Artifact.create = function(opts, player) {
        opts = opts || {};
        var data = JSON.parse(JSON.stringify(opts));

        data._player = player;
        data._db = Game.ARTIFACT_LIST[data.key];

        return new Artifact(data);
    };

    Artifact.load = function(opts, player) {
        opts = opts || {};

        var artifacts = {};
        for (var key in opts) {
            var data = opts[key];

            if (opts[key] != null) {
                artifacts[key] = Artifact.create(data, player);
            }
        }

        return artifacts;
    };
}(hGame006));
(function(root) {
    var _super = root.Entity;

    var Game = root.Game;
    var Coin = root.Coin = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this.type                = opts.type || 0;
        this.amount              = opts.amount || 0;
        this.duration            = opts.duration || 5000;       //五秒之后自动拾取
    };

    root.inherits(Coin, _super);

    root.extend(Coin.prototype, root.Interface);

    root.extend(Coin.prototype, {
        getAmount: function() {
            return this.amount || 0;
        },

        getDuration: function() {
            return this.duration;
        },

        isGold: function() {
            return this.type == Coin.TYPE_GOLD;
        },

        isDiamond: function() {
            return this.type == Coin.TYPE_DIAMOND;
        },

        isRelics: function() {
            return this.type == Coin.TYPE_RELICS;
        },

        getType: function() {
            return this.type;
        }
    });

    Coin.TYPE_GOLD = 0;
    Coin.TYPE_DIAMOND = 1;
    Coin.TYPE_RELICS = 2;

    Coin.create = function(opts, player) {
        opts = opts || {};
        var data = JSON.parse(JSON.stringify(opts));

        data._player = player;

        return new Coin(data);
    };

    Coin.load = function(opts, player) {
        opts = opts || {};

        return {};
    };
}(hGame006));
(function(root) {
    var _super = root.Entity;

    var Game = root.Game;
    var Fairy = root.Fairy = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this.type                = opts.type || 0;
        this.amount              = opts.amount || 0;
        this.duration            = opts.duration || 5000;       //五秒之后飞走
        this.autoCollect         = opts.autoCollect || false;   //是否会自动收集
    };

    root.inherits(Fairy, _super);

    root.extend(Fairy.prototype, root.Interface);

    root.extend(Fairy.prototype, {
        getAmount: function() {
            return this.amount || 0;
        },

        getDuration: function() {
            return this.duration;
        },

        getAutoCollect: function() {
            return this.autoCollect;
        },

        isSkill: function() {
            return (this.type == Fairy.TYPE_SHADOW_CLONE
                || this.type == Fairy.TYPE_CRITICAL_STRIKE
                || this.type == Fairy.TYPE_WAR_CRY
                || this.type == Fairy.TYPE_BERSERKER_RAGE
                || this.type == Fairy.TYPE_HAND_OF_MIDAS);
        },

        getType: function() {
            return this.type;
        }
    });

    Fairy.TYPE_GOLD             = "gold";
    Fairy.TYPE_DIAMOND          = "diamond";
    Fairy.TYPE_RELICS           = "relics";
    Fairy.TYPE_SHADOW_CLONE     = "shadowClone";
    Fairy.TYPE_CRITICAL_STRIKE  = "criticalStrike";
    Fairy.TYPE_WAR_CRY          = "warCry";
    Fairy.TYPE_BERSERKER_RAGE   = "berserkerRage";
    Fairy.TYPE_HAND_OF_MIDAS    = "handOfMidas";

    Fairy.create = function(opts, player) {
        opts = opts || {};
        var data = JSON.parse(JSON.stringify(opts));

        data._player = player;

        return new Fairy(data);
    };

    Fairy.load = function(opts, player) {
        opts = opts || {};

        return {};
    };
}(hGame006));
(function(root) {
    var _super = root.Serialize;

    var Game= root.Game;

    var Hero = root.Hero = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this._db                 = opts._db || null;
        this._multiplier         = 0;
        this._name               = this._db.name;

        this.id                  = opts.id || this._db.id;
        this.level               = opts.level || 0;
        this.weapon              = opts.weapon || 0;
        this.soul                = opts.soul || 0;
        this.star                = opts.star || 0;
        this.deadCD              = opts.deadCD || 0;
        this.realDPS             = opts.realDPS || 0;
        this.skillBought         = opts.skillBought || [false, false, false, false, false, false, false];
    };

    root.inherits(Hero, _super);

    root.extend(Hero.prototype, root.Interface);

    root.extend(Hero.prototype, {
        active: function() {
            var nowTime = Number(root.moment().format("X"));

            return this.level > 0 && this.deadCD < nowTime;
        },

        reset: function() {
            this.level = 0;
            this.deadCD = 0;
            this.realDPS = 0;
            this.skillBought = [false, false, false, false, false, false, false];
        },

        getLevel: function() {
            return this.level;
        },

        getDB: function() {
            return this._db;
        },

        getName: function() {
            return this._name;
        },

        //计算level级的战斗力
        calcDPS: function(level) {
            var heroValues = this.getHeroValues();
            var artifactValues = this.getArtifactValues();
            level = level || 1;

            var baseCost = +(this._db.cost);
            var evolved = level > 1000;
            var heroID = +this.id - 1000;

            var A = baseCost * (evolved ? 10 : 1) * Math.pow(1.075, level - 1);
            var B = Math.pow(1.075, evolved ? level - 1000 : level) - 1;
            var C = Math.pow(0.904, evolved ? level - 1001 : level - 1) * Math.pow(1 - (0.019 * (evolved ? 15 : Math.min(heroID + 1, 15))), heroID + 1 + (evolved ? 30 : 0));

            var multiplier = 0;
            var heroDamage = A * (B * C) / 0.75;

            // 技能自身伤害系数
            multiplier += this._multiplier;
            // 技能所有攻击伤害系数
            multiplier += heroValues.allDamage;

            // 英雄技能叠加效果
            heroDamage *= (1 + multiplier);

            // 英雄武器叠加效果
            heroDamage *= (1 + 0.5 * this.weapon);

            // 武器套装叠加效果
            if (this._player.weaponSets > 0) {
                heroDamage *= 10 * this._player.weaponSets;
            }

            // 神器叠加效果
            heroDamage *= (1 + artifactValues.allDamage);

            // 星级叠加效果
            heroDamage *= Math.pow(2, this.star || 0);

            return Math.ceil(heroDamage);
        },

        getDPS: function() {
            var level = this.level || 1;

            this.realDPS = this.calcDPS(level);
            return this.realDPS;
        },

        getReviveCost: function() {
            var nowTime = Number(root.moment().format("X"));
            var leftTime = this.deadCD - nowTime;

            if (leftTime < 0) {
                return 0;
            }

            //5分钟一钻石
            var cost = Math.ceil(leftTime / 300);
            if (cost < 0) {
                cost = 0;
            }
            return cost;
        },

        getBaseCost: function(level) {
            return +(this.getDB().cost) * Math.pow(1.075, level);
        },

        getCost: function(level) {
            var cost = this.getBaseCost(level);
            var artifactValues = this.getArtifactValues();

            // 进化之后要*10
            if (this.level > 1000) {
                cost *= 10;
            }

            cost *= (1 + artifactValues.upgradeCost);

            return Math.ceil(cost);
        },

        calcUpgradeCost: function(level) {
            //这里算出的付款量已经包含神器效果
            var cost = 0;
            for (var i = this.level; i < this.level + level; i++) {
                cost += this.getCost(i);
            }

            return cost;
        },

        mostUpgrade: function(level) {
            level = level || 1;
            var tmp = this.level % level;
            if (tmp > 0) {
                level = level - tmp;
            }

            var cost = 0;
            for (var i = 0; i < level; i++) {
                var lv = this.level + i;
                cost += this.getCost(lv);

                if (this.level < 1000 && lv >= 1000) {
                    return i;
                }

                if (!this.isGoldEnough(cost)) {
                    return i;
                }
            }

            return level;
        },

        canUpgradeLevel: function(level) {
            level = level || 1;

            if (this.level < 1000 && this.level + level > 1000) {
                level = 1000 - this.level;
            }

            return level;
        },

        upgrade: function(level) {
            level = level || 1;

            if (this.level == 1000) {
                return false;
            }

            level = this.canUpgradeLevel(level);

            //等级提升
            this.level += level;

            //调用总的计算
            this.updateTitans();

            return true;
        },

        skillUpgradeCondition: function(skillIndex) {
            if (this.skillBought[skillIndex] == null) {
                return root.Code.GAME_ERR.WRONG_SKILL;
            }

            if (this.skillBought[skillIndex]) {
                return root.Code.GAME_ERR.ALREADY_LEARN;
            }

            if (this.level <= 1000) {
                if (this.level < Game.SKILL_AT_LEVEL[skillIndex]) {
                    return root.Code.GAME_ERR.NOT_ENOUGH_LEVEL;
                }
            }
            else {
                if (this.level < Game.SKILL_AT_LEVEL[skillIndex] + 1000) {
                    return root.Code.GAME_ERR.NOT_ENOUGH_LEVEL;
                }
            }

            for (var i = 0; i < skillIndex; i++) {
                if (this.skillBought[i] == false) {
                    return root.Code.GAME_ERR.WRONG_SKILL;
                }
            }

            return null;
        },

        upgradeSkill: function(skillIndex) {
            this.skillBought[skillIndex] = true;

            this.updateHeroValues();
            this.updateTitans();

            return true;
        },

        upgradeWeapon: function() {
            if (!this.isWeaponEnough(1)) {
                return false;
            }

            this.weapon++;
            this.decreaseWeapon(1);

            var minSets = this.weapon;
            for(var i = 0; i < this.MAX_HERO; i++)
            {
                var hero = this.getHero(i);
                minSets = Math.min(minSets, hero.weapon);
            }
            this.weaponSets = minSets;

            this.updateTitans();

            return true;
        },

        doEvolution: function() {
            if (this.level != 1000) {
                return false;
            }

            this.level++;
            this.skillBought = [false, false, false, false, false, false, false];

            this.updateHeroValues();
            this.updateTitans();

            return true;
        },

        die: function(time) {
            var nowTime = Number(root.moment().format("X"));
            this.deadCD = time + nowTime;
        },

        revive: function() {
            this.deadCD = 0;
        },

        getSkillString: function(skillIndex) {

        },

        getSkillCost: function(skillIndex) {
            if (skillIndex < 0 || skillIndex > 6) {
                return -1;
            }
            var fitLevel = Game.SKILL_AT_LEVEL[skillIndex];

            //英雄转生后
            if ((this.level - 1) > 1000) {
                fitLevel += 1000;
            }
            var baseCost = this.getBaseCost(fitLevel);

            //五倍的原始消耗
            return 5*Math.ceil(baseCost);
        },

        getSkillType: function(skillIndex) {
            return this.getDB().skillType[skillIndex];
        },

        getSkillEffect: function(skillIndex) {
            if (this.skillBought[skillIndex] == true) {
                return this.getDB().skillValue[skillIndex];
            }

            return 0;
        },

        getFreq: function() {
            var skillEffect = 1;
            var warCry = this._player.skills["warCry"];
            if (warCry.isRunning()) {
                var rate = warCry.getEffect();
                skillEffect = 1 + rate;
                if (skillEffect == 0) {
                    skillEffect = 1;
                }
            }
            return this._db.freq / skillEffect;
        },

        // ----------------------- hero actions --------------
        //英雄攻击怪物
        hit: function() {
            var rate = this._db.freq / 1000;
            var damage = Math.ceil(this.realDPS * rate);

            this.getStage().hurtMonster(damage, root.Stage.HURT_HERO, this);

            return {damage: damage};
        },

        syncHero: function(opts) {
            var self = this;
            var needUpdate = false;
            var needEvent = false;
            var needUpTitan = false;
            var i;
            var value;
            opts = opts || {};

            if (opts.upgrade != null) {
                value = parseInt(opts.upgrade);
                self.upgrade(value);
                self.event(Hero.LEVELCHANGE, self);
            }

            if (opts.evolution) {
                self.doEvolution();
                self.event(Hero.EVOLVE, self);
            }

            if (opts.skill != null) {
                value = parseInt(opts.skill);
                self.upgradeSkill(value);
                self.event(Hero.SKILLUPGRADE, self);
            }

            if (opts.die != null) {
                value = parseInt(opts.die);
                self.die(value);
                self.event(Hero.DEAD, self);
                needUpTitan = true;
            }

            if (opts.revive) {
                self.revive();
                self.event(Hero.REVIVED, self);
                needUpTitan = true;
            }

            if (opts.reset != null) {
                self.reset();
                self.event(Hero.RESET, self);
            }

            if (needUpTitan) {
                this.updateTitans();
            }
        }
    });

    Hero.LEVELCHANGE        = "hero.level.change";
    Hero.SKILLUPGRADE       = "hero.skill.upgrade";
    Hero.EVOLVE             = "hero.evolution";
    Hero.RESET              = "hero.reset";
    Hero.DEAD               = "hero.dead";
    Hero.REVIVED            = "hero.revived";

    Hero.create = function(opts, player) {
        opts = opts || {};

        var data = JSON.parse(JSON.stringify(opts));

        data._player = player;
        data._db = Game.HERO_LIST[data.index];

        return new Hero(data);
    };

    Hero.load = function(opts, player) {
        opts = opts || [];

        var arr = [];
        for (var i = 0; i < Game.MAX_HERO; i++) {
            var data = opts[i] || {};
            data.index = i;

            var hero = Hero.create(data, player);

            arr.push(hero);
        }

        return arr;
    };
}(hGame006));
(function(root) {
    var _super = root.Serialize;

    var Game = root.Game;
    var Item = root.Item = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this._db                 = opts._db || null;
        this._name               = this._db.name;

        this.key                 = opts.key;
        this.id                  = opts.id || this._db.id;
        this.count               = opts.count || 0;
        this.availableTime       = opts.availableTime || 0;
        this.durationTime        = opts.durationTime || 0;
    };

    root.inherits(Item, _super);

    root.extend(Item.prototype, root.Interface);

    root.extend(Item.prototype, {
        getName: function() {
            return this._name;
        },

        getCost: function() {
            return this._db.cost;
        },

        getDuration: function() {
            var power = 0;
            if (this.key == "holding") {
                var artifactValues = this.getArtifactValues();
                power = artifactValues.powerOfHoldingDuration;
            }

            return Math.floor(this._db.duration * (1 + power));
        },

        getCoolDown: function() {
            return this._db.cd;
        },

        getEffect: function() {
            var stage = this.getStage();

            switch (this.key) {
                case "storm": {
                    var gold = 1000;
                    if (stage.baseGold) {
                        gold = stage.baseGold * 2000;
                    }

                    return gold;
                }
                case "doom": {
                    return stage.bossHealth * 10;
                }
                case "holding": {
                    return 30;
                }
                case "shield":
                case "refresh": {
                    return this.getDuration();
                }
            }
        },

        getDurationTime: function() {
            return this.durationTime;
        },

        isRunning: function() {
            var nowTime = Number(root.moment().format("X"));

            return this.durationTime > nowTime;
        },

        //获取还要多少秒才能使用该技能 返回0为cd完成可以使用
        getAvailable: function(nowTime) {
            nowTime = nowTime || Number(root.moment().format("X"));

            if (this.availableTime <= 0) {
                return 0;
            }

            var leftTime = this.availableTime - nowTime;
            if (leftTime <= 0) {
                return 0;
            }
            return leftTime;
        },

        getDesc: function() {
            var desc = "花费" + this.getCost() + "钻石，";

            switch (this.key) {
                case "storm": {
                    var gold = this.getEffect();

                    desc += ("获得黄金" + Game.formatNumber(gold));
                    break;
                }
                case "doom": {
                    desc += "秒杀当前怪物";
                    break;
                }
                case "holding": {
                    var effect = this.getEffect();
                    var duration = this.getDuration();

                    desc += ("让你每秒点击" + effect + "下，效果持续" + duration + "秒");
                    break;
                }
                case "shield": {
                    desc += "所有英雄获得24小时免疫死亡效果";
                    break;
                }
                case "refresh": {
                    desc += "重置所有主角技能冷却时间";
                    break;
                }
            }

            return desc;
        },

        increase: function(amount) {
            var count = this.count;
            if (count < 0) {
                count = 0;
            }
            count += Math.abs(amount);
            this.count = count;
        },

        decrease: function(amount) {
            var count = this.count;
            count -= Math.abs(amount);
            if (count < 0) {
                count = 0;
            }
            this.count = count;
        },

        getCount: function() {
            return this.count;
        },

        syncItem: function(opts) {
            var self = this;
            var needUpdate = false;
            var needEvent = false;
            var i;
            var value;
            var array;

            opts = opts || {};

            if (opts.count != null) {
                value = +opts.count;
                if (value < 0) {
                    self.decrease(value);
                    self.event(Item.UPDATECOUNT, self);
                }
                else if (value > 0) {
                    self.increase(value);
                    self.event(Item.UPDATECOUNT, self);
                }
            }

            if (typeof opts.cast == "object") {
                array = opts.cast;
                value = parseInt(array.availableTime);
                self.availableTime = value;
                value = parseInt(array.durationTime);
                self.durationTime = value;
                self.event(Item.CAST, self);
            }
        }
    });

    Item.CAST               = "item.cast";
    Item.UPDATECOUNT        = "item.update.count";

    Item.create = function(opts, player) {
        opts = opts || {};
        var data = JSON.parse(JSON.stringify(opts));

        data._player = player;
        data._db = Game.ITEM_LIST[data.key];

        return new Item(data);
    };

    Item.load = function(opts, player) {
        opts = opts || {};

        var items = {};

        for (var key in Game.ITEM_LIST) {
            var data = opts[key] || {};
            data.key = key;

            items[key] = Item.create(data, player);
        }

        return items;
    };
}(hGame006));
(function(root) {
    var _super = root.Serialize;

    var Monster = root.Monster = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this._db                 = opts._db || null;
        this._stage              = opts._stage || null;

        this.id                  = opts.id || this._db.id || 0;
        this.name                = opts.name || this._db.name || "";
        this.type                = opts.type || Monster.TYPE_MOB;
        this.health              = opts.health || 1;
        this.maxHealth           = opts.maxHealth || this.health;
        this.gold                = opts.gold || 0;
        this.relics              = opts.relics || 0;
        this.diamond             = opts.diamond || 0;
        this.weapon              = opts.weapon || 0;

        this.deadHero            = opts.deadHero || 0;
        this.deadTime            = opts.deadTime || 0;
    };

    root.inherits(Monster, _super);

    root.extend(Monster.prototype, root.Interface);

    root.extend(Monster.prototype, {
        hurtHealth: function(x) {
            x = x || 0;

            if (this.health <= x) {
                this.health = 0;
                this.die();
            }
            else {
                this.health -= x;
            }

            this.event(Monster.HURT, x);
        },

        getKillHeroInfo: function() {
            if (this.deadTime <= 0) {
                return null;
            }
            return {deadTime: this.deadTime, deadHero: this.deadHero};
        },

        die: function() {
            this.event(Monster.DEAD, this);
        },

        drop: function() {

        },

        getType: function() {
            return this.type;
        },

        isBoss: function() {
            return this.type == Monster.TYPE_BOSS;
        }
    });

    Monster.TYPE_MOB = 0;
    Monster.TYPE_BOSS = 1;
    Monster.TYPE_CHEST = 2;

    Monster.DEAD = "mob.dead";
    Monster.DROP = "mob.drop";
    Monster.HURT = "mob.hurt";

    Monster.create = function(opts) {
        opts = opts || {};

        return new Monster(opts);
    };
}(hGame006));
(function(root) {
    var _super = root.Serialize;

    var Game = root.Game;
    var Skill = root.Skill = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this._db                 = opts._db || null;
        this._name               = this._db.name;

        this.id                  = opts.id || this._db.id;
        this.level               = opts.level || 0;
        this.availableTime       = opts.availableTime || 0;
        this.durationTime        = opts.durationTime || 0;
    };

    root.inherits(Skill, _super);

    root.extend(Skill.prototype, root.Interface);

    root.extend(Skill.prototype, {
        active: function() {
            return this.level > 0;
        },

        reset: function() {
            this.level = 0;
            this.availableTime = 0;
            this.durationTime = 0;
        },

        getName: function() {
            return this._name;
        },

        getLevel: function() {
            return this.level;
        },

        getDurationTime: function() {
            return this.durationTime;
        },

        getCost: function() {
            var artifactValues = this.getArtifactValues();

            var cost = this._db.cost(this.level);

            cost = Math.pow(1.075, cost) * 75;
            cost *= (1 + artifactValues.upgradeCost);

            return Math.ceil(cost);
        },

        getDuration: function() {
            var artifactValues = this.getArtifactValues();
            return Math.ceil(this._db.duration * (1 + artifactValues[this._db.dtArtifact]));
        },

        getCoolDown: function() {
            var artifactValues = this.getArtifactValues();
            return Math.ceil(this._db.cd * (1 + artifactValues[this._db.cdArtifact]));
        },

        getEffect: function() {
            return this._db.effect(this.level);
        },

        getEffectDesc: function () {
            var effect = this.getEffect();
            return this._db.effectDesc(effect);
        },

        getStartLevel: function() {
            return this._db.startLevel;
        },

        upgrade: function() {
            this.level++;

            return true;
        },

        isRunning: function() {
            var nowTime = Number(root.moment().format("X"));

            return (this.level > 0) && (this.durationTime > nowTime);
        },

        //获取还要多少秒才能使用该技能 返回0为cd完成可以使用
        getAvailable: function(nowTime) {
            nowTime = nowTime || Number(root.moment().format("X"));

            if (this.availableTime <= 0) {
                return 0;
            }

            var leftTime = this.availableTime - nowTime;
            if (leftTime <= 0) {
                return 0;
            }
            return leftTime;
        },

        castCheck: function() {
            if (this.level <= 0) {
                return root.Code.GAME_ERR.NOT_ENOUGH_LEVEL;
            }

            if (this.getAvailable() != 0) {
                return root.Code.GAME_ERR.SKILL_IS_ON_CD;
            }

            return null;
        },

        syncSkill: function(opts) {
            var self = this;
            var needUpdate = false;
            var needEvent = false;
            var i;
            var value;
            var array;

            opts = opts || {};

            if (opts.upgrade != null) {
                self.upgrade();
                self.event(Skill.LEVELCHANGE, self);
            }

            if (typeof opts.cast == "object") {
                array = opts.cast;
                //精灵获得的技能不会设置cd
                if (array.availableTime != null) {
                    value = parseInt(array.availableTime);
                    self.availableTime = value;
                }
                value = parseInt(array.durationTime);
                self.durationTime = value;
                self.event(Skill.CAST, self);
            }

            if (opts.refresh != null) {
                self.availableTime = 0;
                self.event(Skill.RESET, self);
            }

            if (opts.reset != null) {
                self.reset();
                self.event(Skill.RESET, self);
            }
        }
    });

    Skill.LEVELCHANGE       = "skill.level.change";
    Skill.CAST              = "skill.cast";
    Skill.RESET             = "skill.reset";
    Skill.REFRESH           = "skill.refresh";

    Skill.create = function(opts, player) {
        opts = opts || {};
        var data = JSON.parse(JSON.stringify(opts));

        data._player = player;
        data._db = Game.SKILL_LIST[data.key];

        return new Skill(data);
    };

    Skill.load = function(opts, player) {
        opts = opts || {};

        var skills = {};

        for (var name in Game.SKILL_LIST) {
            var data = opts[name] || {};
            data.key = name;

            skills[name] = Skill.create(data, player);
        }

        return skills;
    };
}(hGame006));
(function(root) {
    var _super = root.Serialize;

    var Game= root.Game;
    var Monster = root.Monster;
    var Stage = root.Stage = function(opts) {
        opts = opts || {};

        _super.call(this, opts);

        this._player             = opts._player || null;
        this._db                 = Game.STAGE_LIST;
        this._monster            = null;
        this._monsterInfo        = null;

        this.mobCount            = opts.mobCount || 10;
        this.highLevel           = opts.highLevel || 1;

        this.level               = opts.level || 1;
        this.progress            = opts.progress || 0;
        this.paused              = opts.paused || false;        //暂停不打boss(离开战斗状态)

        this.mobHealth           = opts.mobHealth || 30;
        this.bossHealth          = opts.bossHealth || 60;

        this.baseGold            = opts.baseGold || 1;
        this.baseMobGold         = opts.baseMobGold || 1;
        this.baseBossGold        = opts.baseBossGold || 1;
        this.baseChestGold       = opts.baseChestGold || 10;

        this.mobGold             = opts.mobGold || 1;
        this.bossGold            = opts.bossGold || 1;
        this.chestGold           = opts.chestGold || 10;
        this.offlineGold         = opts.offlineGold || 1;

        this.chestChance         = opts.chestChance || 0.02;

        this.mobSize             = opts.mobSize || 0.6;
        this.bossSize            = opts.bossSize || 1.2;

        this.init();
    };

    root.inherits(Stage, _super);

    root.extend(Stage.prototype, root.Interface);

    root.extend(Stage.prototype, {
        init: function() {
        },

        reset: function(opts) {
            opts = opts || {};

            this.level               = opts.level || 1;
            this.baseGold            = opts.baseGold || 1;
            this.mobHealth           = opts.mobHealth || 30;
            this.baseMobGold         = opts.baseMobGold || 1;
            this.mobGold             = opts.mobGold || 1;
            this.offlineGold         = opts.offlineGold || 1;
            this.bossHealth          = opts.bossHealth || 60;
            this.baseBossGold        = opts.baseBossGold || 1;
            this.bossGold            = opts.bossGold || 1;
            this.chestChance         = opts.chestChance || 0.02;
            this.baseChestGold       = opts.baseChestGold || 10;
            this.chestGold           = opts.chestGold || 10;
            this.mobSize             = opts.mobSize || 0.6;
            this.bossSize            = opts.bossSize || 1.2;
            this.progress            = opts.progress || 0;
            this.mobCount            = opts.mobCount || 10;

            //关掉暂停按钮
            this.paused              = false;
        },

        calculate: function(stage) {
            var info = {};

            var heroValues = this.getHeroValues();
            var artifactValues = this.getArtifactValues();

            var rmbMultiple = 1;
            var goldMultiple = (1 + heroValues.goldAmount + artifactValues.goldCollection);
            var baseHealth = 18.5 * Math.pow(1.57, Math.min(stage, 156)) * Math.pow(1.17, Math.max(stage - 156, 0));
            var baseGold = baseHealth * (0.02 + (0.00045 * Math.min(stage, 150)));

            info.mobHealth = baseHealth;
            info.bossHealth = baseHealth * Game.BOSS_MULTIPLIER[(stage-1)%5] * (1 + artifactValues.bossLife);

            if (stage <= 80) {
                info.bossHealth *= 0.5;
                if (info.bossHealth < 1) {
                    info.bossHealth = 1;
                }
                info.mobHealth *= 0.5;
                if (info.mobHealth < 1) {
                    info.mobHealth = 1;
                }
            }

            info.bossHealth = Math.ceil(info.bossHealth);
            info.mobHealth = Math.ceil(info.mobHealth);
            info.baseGold = Math.ceil(baseGold);

            info.baseMobGold = Math.ceil(baseGold * goldMultiple);
            //info.mobGold = info.baseMobGold * (1 + this._player.getArtifactEffect("fortune") + this._player.getArtifactEffect("valrunes") + this._player.getArtifactEffect("elixir"));
            info.mobGold = info.baseMobGold
                * (1 + artifactValues.mobGold)
                * (1 + artifactValues.goldPlaying);
            info.mobGold = Math.ceil(info.mobGold * rmbMultiple) ;

            //狡诈护符的金币 与mobGold区别在于没有在线金币加成elixir 和 英雄加成
            //info.rbMobGold = Math.ceil(baseGold * (1 + this._player.getArtifactEffect("fortune") + this._player.getArtifactEffect("valrunes")) * rmbMultiple);
            info.rbMobGold = Math.ceil(baseGold
                * (1 + artifactValues.goldCollection)
                * (1 + artifactValues.mobGold)
                * rmbMultiple);
            //与mobGold区别在于没有在线金币加成elixir
            //info.offlineGold = info.baseMobGold * (1 + this._player.getArtifactEffect("fortune") + this._player.getArtifactEffect("valrunes"));
            info.offlineGold = info.baseMobGold * (1 + artifactValues.mobGold);

            info.baseBossGold = baseGold * Game.BOSS_MULTIPLIER[(stage-1) % 5];
            info.baseBossGold = Math.ceil(info.baseBossGold * goldMultiple);
            //info.bossGold = info.baseBossGold * (1 + this._player.getArtifactEffect("fortune") + this._player.getArtifactEffect("shield") + this._player.getArtifactEffect("elixir"));
            info.bossGold = info.baseBossGold
                * (1 + artifactValues.bossGold)
                * (1 + artifactValues.goldPlaying);
            info.bossGold = Math.ceil(info.bossGold * rmbMultiple);

            //info.baseChestGold = Math.ceil(10 * baseGold * (1 + this._player.values.heroAura["goldAmount"] + this._player.values.heroAura["chestGold"]));
            info.baseChestGold = Math.ceil(10 * baseGold * goldMultiple);
            //info.chestGold = info.baseChestGold * (1 + this._player.getArtifactEffect("fortune") + this._player.getArtifactEffect("contentment") + this._player.getArtifactEffect("elixir"));
            info.chestGold = info.baseChestGold
                * (1 + heroValues.chestGold)
                * (1 + artifactValues.chestGold)
                * (1 + artifactValues.goldPlaying);
            info.chestGold = Math.ceil(info.chestGold * rmbMultiple);

            info.chestChance = 0.02 * (1 + artifactValues.chestChance);

            info.mobSize = 1 + Math.floor(stage/50) * 0.018;
            if (info.mobSize > 1.5) {
                info.mobSize = 1.5;
            }

            info.bossSize = 1.2 + Math.floor(stage/50) * 0.03;
            if (info.bossSize > 1.8) {
                info.bossSize = 1.8;
            }

            return info;
        },

        update: function(stage) {
            stage = stage || this.level;
            if (stage < 1) {
                stage = 1;
            }
            this.level = stage;
            this.highLevel = (this.highLevel < this.level) ? this.level : this.highLevel;

            var info = this.calculate(stage);

            this.baseGold       = info.baseGold;
            this.baseMobGold    = info.baseMobGold;
            this.baseBossGold   = info.baseBossGold;
            this.baseChestGold  = info.baseChestGold;

            this.mobHealth      = info.mobHealth;
            this.bossHealth     = info.bossHealth;

            this.mobGold        = info.mobGold;
            this.bossGold       = info.bossGold;
            this.chestGold      = info.chestGold;
            this.offlineGold    = info.offlineGold;

            this.chestChance    = info.chestChance;

            this.mobSize        = info.mobSize;
            this.bossSize       = info.bossSize;

            this.containers     = {};
        },

        challenge: function() {

        },

        makeMonster: function() {
            var opts = JSON.parse(JSON.stringify(this._monsterInfo));

            var mobId = opts.id || 10001;
            opts._player = this._player;
            opts._stage = this;
            opts._db = Game.MONSTER_LIST[mobId];

            this._monster = Monster.create(opts);
            this._monster.on(Monster.DEAD, this, this.onMobDead);
            //console.log("[ debug ] make monster: " + JSON.stringify(this._monster.clone()));
        },

        process: function() {
            var result = {};

            //如果是暂停状态 不会处理进度
            if (this.progress >= this.mobCount) {
                if (!this.paused) {
                    result.level = this.level + 1;
                    result.progress = 0;
                }
            }
            else {
                result.progress = this.progress + 1;
                if (this.paused) {
                    result.paused = false;
                }
            }

            return result;
        },

        hurtMonster: function(damage, event, actor) {
            this._monster.hurtHealth(damage);
        },

        onMobDead: function(mob) {
        },

        getMonster: function(){
            return this._monster;
        },

        getPaused: function() {
            return this.paused;
        },

        getMobCount: function() {
            return this.mobCount;
        },

        getProgress: function() {
            return this.progress;
        },

        getLevel: function(){
            return this.level;
        },

        getBossTime: function() {
            var artifactValues = this.getArtifactValues();

            return Math.floor(30 * (1 + artifactValues.bossTime));
        },

        getMonsterSize: function() {
            if (this._monster.isBoss()) {
                return this.bossSize;
            }

            return this.mobSize;
        },

        //离线奖励数值，传入离线时长（秒），返回奖励值
        calcOfflineGold: function(offLineSecond) {
            var MAX_SECOND = 86400;
            var gameValues = this.getGameValues();
            //算法：离线时间内英雄可以挂机杀普通怪的数量*普通怪金币数
            var heroDamage = gameValues.heroDamage;
            if (heroDamage <= 0) {
                return 0;
            }
            var killNeedSecond = this.mobHealth / heroDamage;
            //小于1说明一秒可以杀多只怪，这样算他一秒杀1只
            if (killNeedSecond < 1) {
                killNeedSecond = 1;
            }
            killNeedSecond = Math.ceil(killNeedSecond);

            var killTimes = Math.floor(offLineSecond / killNeedSecond);
            //24小时内至少给他一只怪的奖励
            if (killTimes <= 0 && offLineSecond >= MAX_SECOND) {
                killTimes = 1;
            }
            //要除去游戏期间金币加量
            return Math.ceil(this.offlineGold * killTimes);
        },

        genMonster: function() {
            var opts = {};

            var stageLevel = this.getLevel();
            var stageDB = this._db[stageLevel%50 + 1];
            var mobId = 10001;
            //boss
            if (this.progress >= this.mobCount && this.paused == false) {
                mobId = stageDB.bossId;
                opts.id = mobId;

                opts.type = Monster.TYPE_BOSS;
                opts.health = this.bossHealth;
                opts.gold = this.bossGold;
                if (stageLevel > 50) {
                    var deadInfo = this.genHeroKillInfo(stageLevel);
                    if (deadInfo != null) {
                        opts.deadHero = deadInfo.heroId;
                        opts.deadTime = deadInfo.time;
                    }
                }
                //80关以后每10关获得一个荣誉
                if (stageLevel >= 80 && stageLevel % 10 == 0) {
                    opts.relics = 1;
                }
            }
            //普通怪
            else {
                var isChest = (Math.random() < this.chestChance);
                if (isChest) {
                    mobId = 10021;
                    opts.type = Monster.TYPE_CHEST;
                    opts.gold = this.chestGold;
                }
                else {
                    var i = Math.floor(Math.random() * stageDB.list.length);
                    mobId = stageDB.list[i];
                    opts.type = Monster.TYPE_MOB;
                    opts.gold = this.mobGold;
                }

                opts.id = mobId;
                opts.health = this.mobHealth;
            }

            return opts;
        },

        syncStage: function(opts) {
            var self = this;
            var needUpdate = false;
            var needEvent = false;
            var i;
            var value;
            opts = opts || {};

            if (opts.monster != null) {
                value = opts.monster;
                self._monsterInfo = value;
            }

            if (opts.progress != null) {
                value = parseInt(opts.progress);
                self.progress = value;
                needEvent = true;
            }

            if (opts.level != null) {
                value = parseInt(opts.level);
                self.level = value;
                needUpdate = true;
                needEvent = true;
            }

            if (opts.paused != null) {
                value = opts.paused;
                self.paused = value;
                needEvent = true;
            }

            if (opts.reset != null) {
                value = opts.reset;
                self.reset(value);
                needUpdate = true;
                needEvent = true;
            }

            if (needUpdate) {
                self.update();
            }

            if (needEvent) {
                self.event(Stage.UP, self);
            }
        }
    });

    Stage.HURT_TAP = 1;
    Stage.HURT_HERO = 2;
    Stage.HURT_SHADOW = 3;
    Stage.HURT_HEAVENLY = 4;

    Stage.UP = "stage.update";

    Stage.create = function(opts, player) {
        opts = opts || {};

        opts._player = player;

        return new Stage(opts);
    };

    Stage.load = function(opts, player) {
        opts = opts || {};

        return Stage.create(opts, player);
    };
}(hGame006));
(function(root) {
    var _super = root.Entity;

    var Game = root.Game;
    var Code = root.Code;
    var Stage = root.Stage;
    var Skill = root.Skill;
    var Hero = root.Hero;
    var Fairy = root.Fairy;
    var Item = root.Item;
    var Artifact = root.Artifact;
    var Achievement = root.Achievement;
    var Coin = root.Coin;
    var Player = root.Player = function(opts) {
        opts = opts || {};
        _super.call(this, opts);

        this._player            = this;
        this._db                = null;
        this._coins             = {};
        this._fairies            = {};
        this._fairyStamp        = 0;

        this.id                 = opts.id || 1;
        this.name               = opts.name || "强力MT";
        this.level              = opts.level || 1;
        this.location           = opts.location;
        this.lastLogin          = opts.lastLogin || 0;
        this.lastLogout         = opts.lastLogout || 0;
        this.offlineGold        = opts.offlineGold || 0;

        this.gold               = opts.gold || 0;
        this.diamond            = opts.diamond || 0;                                //钻石
        this.relics             = opts.relics || 0;                                 //荣誉
        this.weapons            = opts.weapons || 0;                                //武器点
        this.weaponSets         = opts.weaponSets || 0;

        //统计数据
        this.evoCount           = opts.evoCount || 0;                               //转生次数
        this.lastEvolution      = opts.lastEvolution || 0;                          //上次转身时间
        this.totalPlayTime      = opts.totalPlayTime || 0;                          //游戏总时间
        this.maxStage           = opts.maxStage || 1;                               //最高关卡

        //计算数据
        this.gameValues         = {};
        this.heroValues         = {};
        this.artifactValues     = {};

        // 游戏数据
        this.stage              = Stage.load(opts.stage, this);                     //关卡信息
        this.skills             = Skill.load(opts.skills, this);                    //技能信息
        this.items              = Item.load(opts.items, this);                      //物品信息
        this.heros              = Hero.load(opts.heros, this);                      //英雄信息
        this.artifacts          = Artifact.load(opts.artifacts, this);              //神器信息
        this.achievements       = Achievement.load(opts.achievements, this);        //成就信息

        this.init();
    };

    root.inherits(Player, _super);

    root.extend(Player.prototype, root.Interface);

    root.extend(Player.prototype, {
        init: function() {

            this.gameValues.criticalDamage = 10;        // 暴击伤害
            this.gameValues.bossCriticalDamage = 10;    // 魔王暴击伤害
            this.gameValues.criticalMultiplier = 10;    // 暴击系数
            this.gameValues.criticalChance = 0.01;      // 暴击率
            this.gameValues.tapDamage = 1;              // 点击伤害
            this.gameValues.tapBossDamage = 1;          // 魔王点击伤害
            this.gameValues.heroDamage = 0;             // 英雄伤害

            this.heroValues.heroDamage = 0;
            this.heroValues.allDamage = 0;
            this.heroValues.tapDamage = 0;
            this.heroValues.bossDamage = 0;
            this.heroValues.criticalDamage = 0;
            this.heroValues.criticalChance = 0;
            this.heroValues.goldAmount = 0;
            this.heroValues.chestGold = 0;
            this.heroValues.tapDPS = 0;

            this.artifactValues.allDamage = 0;
            this.artifactValues.DPS = 0;
            this.artifactValues.tapDamage = 0;
            this.artifactValues.heroDamage = 0;
            this.artifactValues.criticalDamage = 0;
            this.artifactValues.criticalChance = 0;
            this.artifactValues.bossTime = 0;
            this.artifactValues.bossLife = 0;
            this.artifactValues.bossGold = 0;
            this.artifactValues.mobGold = 0;
            this.artifactValues.mobCount = 0;
            this.artifactValues.goldCollection = 0;
            this.artifactValues.goldx10Chance = 0;
            this.artifactValues.goldPlaying = 0;
            this.artifactValues.evoRelics = 0;
            this.artifactValues.chestChance = 0;
            this.artifactValues.chestGold = 0;
            this.artifactValues.deathChance = 0;
            this.artifactValues.upgradeCost = 0;
            this.artifactValues.reviveTime = 0;
            this.artifactValues.evolutionBonus = 0;
            this.artifactValues.stageJump = 0;
            this.artifactValues.autoClick = 0;
            this.artifactValues.goldAfterReborn = 0;
            this.artifactValues.autoStage = 0;
            this.artifactValues.heavenlyStrikeCD = 0;
            this.artifactValues.heavenlyStrikeDuration = 0;
            this.artifactValues.shadowCloneCD = 0;
            this.artifactValues.shadowCloneDuration = 0;
            this.artifactValues.criticalStrikeCD = 0;
            this.artifactValues.criticalStrikeDuration = 0;
            this.artifactValues.warCryCD = 0;
            this.artifactValues.warCryDuration = 0;
            this.artifactValues.berserkerRageCD = 0;
            this.artifactValues.berserkerRageDuration = 0;
            this.artifactValues.handOfMidasCD = 0;
            this.artifactValues.handOfMidasDuration = 0;
            this.artifactValues.powerOfHoldingDuration = 0;

            this.updateTitans();
        },

        // ============================== damage methods ==============================
        getDamage: function(level) {
            var heroValues = this.getHeroValues();
            var artifactValues = this.getArtifactValues();
            var gameValues = this.getGameValues();

            var dmg = level * Math.pow(1.05, level);
            //英雄技能增加所有攻击的部分
            dmg *= (1 + heroValues.allDamage);
            //英雄的dps转tap，需要先加上来，后面才开始乘
            dmg += gameValues.heroDamage * heroValues.tapDPS;

            //英雄加成tap
            dmg *= (1 + heroValues.tapDamage);
            //神器全部攻击力加成
            dmg *= (1 + artifactValues.allDamage);
            //
            ////道具加成
            //var itemAdded = 0;
            //if(this.getPerk().isInBuffById(1014)) {
            //    itemAdded = 1;
            //
            //
            //    var foreverPlayerDamage = this.getForeverAugments(FOREVERAUGMENTTYPE.PLAYERDAMAGE);
            //    if( foreverPlayerDamage > 0){
            //        itemAdded += foreverPlayerDamage;
            //    }
            //}
            //
            ////神器特效（蛋刀）
            //dmg *= (1 + this.artifactEffect("hammer") + itemAdded);
            dmg *= (1 + artifactValues.tapDamage);

            return Math.ceil(dmg);
        },

        getBaseCost: function(level) {
            return Math.min(25, 3 + level) * Math.pow(1.074, level);
        },

        getCost: function(level) {
            var cost = this.getBaseCost(level);

            cost *= (1 + this.artifactValues.upgradeCost);

            return Math.ceil(cost);
        },

        calcUpgradeCost: function(cnt) {
            cnt = cnt || 1;
            if (cnt < 0) {
                cnt = 1;
            }

            var cost = 0;
            for (var i = 0; i < cnt; i++) {
                cost += this.getCost(this.level + i);
            }

            return Math.ceil(cost);
        },

        mostUpgrade: function(level) {
            level = level || 1;
            var tmp = this.level % level;
            if (tmp > 0) {
                level = level - tmp;
            }

            var cost = 0;
            for (var i = 0; i < level; i++) {
                var lv = this.level + i;
                cost += this.getCost(lv);

                if (!this.isGoldEnough(cost)) {
                    return i;
                }
            }

            return level;
        },

        upgrade: function(cnt) {
            cnt = cnt || 1;

            if (cnt < 0) {
                cnt = 1;
            }

            this.level += cnt;
            this.updateTitans();
            return cnt;
        },
        
        setLevel: function(level) {
            if (this.level >= level) {
                return false;
            }
    
            this.level = level;
            this.updateTitans();
            return level;
        },

        calcRelicByHeroLevel: function() {
            var totalHeroLevel = 0;
            for (var i = 0; i < this.MAX_HERO; i++) {
                var lv = this.heros[i].getLevel();
                if (lv > 0) {
                    totalHeroLevel += lv;
                }
            }

            var relics = totalHeroLevel/1000;
            return Math.ceil(relics);
        },

        calcRelicByStage: function() {
            var stage =  this.stage.getLevel();
            var relics = Math.pow(Math.floor(Math.max(0, stage - 75)/15), 1.7);

            return Math.ceil(relics);
        },

        calcRelicByArtifact: function() {
            var relics_1 = this.calcRelicByHeroLevel();
            var relics_2 = this.calcRelicByStage();
            var artifactValues = this.getArtifactValues();

            return Math.ceil((relics_1 + relics_2) * artifactValues.evolutionBonus);
        },

        calcRelicOnEvolution: function() {
            var relics = this.calcRelicByHeroLevel() + this.calcRelicByStage() + this.calcRelicByArtifact();
            var heroDead = false;
            for (var i = 0; i < this.MAX_HERO; i++) {
                //要判断英雄是否存在
                if (!this.heros[i].active()) {
                    heroDead = true;
                    break;
                }
            }
            //全英雄奖励
            if (heroDead == false) {
                relics *= 2;
            }
            return relics;
        },

        doEvolution: function() {
            this.level = 1;
            this.gold = 0;
            this.offlineGold = 0;
            this.evoCount++;
            this.lastEvolution = Number(root.moment().format('X'));
        },

        leaveDispose: function() {
            var nowTime = Number(root.moment().format('X'));
            if (this.lastLogin > 0) {
                this.totalPlayTime += nowTime - this.lastLogin;
            }

            this.lastLogout = nowTime;

            var coinCollect = this.collectAllCoin();
            if (coinCollect.gold > 0) {
                this.increaseGold(coinCollect.gold);
            }
            if (coinCollect.diamond > 0) {
                this.increaseDiamond(coinCollect.diamond);
            }
            if (coinCollect.relics > 0) {
                this.increaseRelic(coinCollect.relics);
            }
        },

        collectAllCoin: function() {
            var results = {
                gold: 0,
                diamond: 0,
                relics: 0
            };

            for (var uuid in this._coins) {
                var coin = this._coins[uuid];
                if (coin.isGold()) {
                    results.gold += coin.getAmount();
                }
                else if (coin.isDiamond()) {
                    results.diamond += coin.getAmount();
                }
                else if (coin.isRelics()) {
                    results.relics += coin.getAmount();
                }
            }

            for (var uuid in this._coins) {
                this.removeCoin(uuid);
            }

            return results;
        },

        addCoin: function(coin) {
            if (coin == null) {
                return;
            }

            this._coins[coin.uuid] = coin;
        },

        removeCoin: function(uuid) {
            delete this._coins[uuid];
        },

        findCoin: function(uuid) {
            return this._coins[uuid];
        },

        addArtifact: function(artifact) {
            if (artifact == null) {
                return;
            }

            this.artifacts[artifact.key] = artifact;
        },

        removeArtifact: function(key) {
            delete this.artifacts[key];
        },

        buyArtifactCost: function() {
            var artifactCount = 0;
            for (var key in this.artifacts) {
                var db = this.artifacts[key].getDB();
                if (db.not_for_sale != true) {
                    artifactCount++;
                }
            }
            var cost = (artifactCount + 1) * Math.pow(1.35, (artifactCount + 1));

            return Math.round(cost);
        },

        getFairyStamp: function() {
            return this._fairyStamp;
        },

        setFairyStamp: function(stamp) {
            this._fairyStamp = stamp;
        },

        genFairyStamp: function() {
            var nowTime = Number(root.moment().format("X"));
            // 三到四分钟一次
            //var rand = 180 + Math.ceil(Math.random() * 60);
            var rand = 30 + Math.ceil(Math.random() * 30);

            return nowTime + rand;
        },

        // ----------------------- player actions --------------
        tap: function() {
            var gameValues          = this.getGameValues();
            var stage               = this.getStage();
            var monster             = stage.getMonster();

            var damage              = gameValues.tapDamage;
            var criticalChance      = gameValues.criticalChance;
            var criticalStrike      = this.skills["criticalStrike"];
            var berserkerRage       = this.skills["berserkerRage"];

            var addCriticalChance   = 0;
            var addDamage           = 0;

            //*增加暴击率的技能
            if(criticalStrike.isRunning()){
                var criticalEffect = criticalStrike.getEffect();
                if (criticalEffect > 0) {
                    addCriticalChance = criticalEffect;
                }
            }

            var isCritical = (Math.random() < (criticalChance + addCriticalChance));
            if (monster.isBoss()) {
                if (isCritical) {
                    damage = gameValues.bossCriticalDamage;
                }
                else {
                    damage = gameValues.tapBossDamage;
                }
            }
            else {
                if (isCritical) {
                    damage = gameValues.criticalDamage;
                }
            }

            //*提升攻击力技能
            if (berserkerRage.isRunning()) {
                var berserkerRageEffect = berserkerRage.getEffect();
                if (berserkerRageEffect > 0) {
                    addDamage = berserkerRageEffect;
                    damage = Math.ceil(damage + (damage * addDamage));
                }
            }

            stage.hurtMonster(damage, Stage.HURT_TAP, this);

            return {damage: damage, critical: isCritical};
        },

        //* 战士狂怒技能效果
        heavenlyStrikeTap: function () {
            var gameValues       = this.getGameValues();
            var stage            = this.getStage();
            var damage           = gameValues.tapDamage;
            var skill            = this.skills["heavenlyStrike"];
            var monster          = stage.getMonster();

            if (monster.isBoss()) {
                damage = gameValues.tapBossDamage;
            }

            if (skill.isRunning() == true) {
                var effect = Number(skill.getEffect());
                if(effect > 0){
                    damage *= effect;
                }
            }

            var berserkerRage       = this.skills["berserkerRage"];

            //*提升攻击力技能
            if (berserkerRage.isRunning()) {
                var berserkerRageEffect = berserkerRage.getEffect();
                if (berserkerRageEffect > 0) {
                    var addDamage = berserkerRageEffect;
                    damage = Math.ceil(damage + (damage * addDamage));
                }
            }

            stage.hurtMonster(damage, Stage.HURT_TAP, this);

            return {damage: damage};
        },

        //* 影子战士技能效果
        shadowCloneTap: function () {
            var gameValues       = this.getGameValues();
            var stage            = this.getStage();
            var damage           = gameValues.tapDamage;
            var monster          = stage.getMonster();

            if (monster.isBoss()) {
                damage = gameValues.tapBossDamage;
            }

            stage.hurtMonster(damage, Stage.HURT_TAP, this);

            return {damage: damage};
        },

        // ----------------------- player sync ----------------
        syncPlayer: function(opts) {
            var self = this;
            var i;
            var value;
            var array;
            var info;
            var needUpTitan = false;

            opts = opts || {};

            if (opts.gold != null) {
                value = +opts.gold;
                if (value < 0) {
                    self.decreaseGold(value);
                    self.event(Player.UPDATEGOLD, self);
                }
                else if (value > 0) {
                    self.increaseGold(value);
                    self.event(Player.UPDATEGOLD, self);
                }
            }

            if (opts.diamond != null) {
                value = +opts.diamond;
                if (value < 0) {
                    self.decreaseDiamond(value);
                    self.event(Player.UPDATEDIAMOND, self);
                }
                else if (value > 0) {
                    self.increaseDiamond(value);
                    self.event(Player.UPDATEDIAMOND, self);
                }
            }

            if (opts.relics != null) {
                value = +opts.relics;
                if (value < 0) {
                    self.decreaseRelic(value);
                    self.event(Player.UPDATERELIC, self);
                }
                else if (value > 0) {
                    self.increaseRelic(value);
                    self.event(Player.UPDATERELIC, self);
                }
            }

            if (opts.upgrade != null) {
                value = parseInt(opts.upgrade);
                self.upgrade(value);
                self.event(Player.LEVELCHANGE, self);
            }

            if (opts.lastLogin != null) {
                value = parseInt(opts.lastLogin);
                self.lastLogin = value;
            }

            if (opts.offlineGold != null) {
                value = parseInt(opts.offlineGold);
                self.offlineGold = value;
            }

            if (opts.fairyStamp != null) {
                value = parseInt(opts.fairyStamp);
                self.setFairyStamp(value);
                self.event(Player.FAIRYSTAMP, value);
            }

            if (opts.stage != null) {
                value = opts.stage;
                self.stage.syncStage(value);
            }

            if (opts.hero != null) {
                array = opts.hero;
                for (i in array) {
                    var heroId = array[i].id;
                    if (heroId < 0 || heroId > 29) {
                        continue;
                    }

                    value = array[i].value;
                    self.heros[heroId].syncHero(value);
                }
            }

            if (opts.skill != null) {
                array = opts.skill;
                for (i in array) {
                    var skillName = array[i].name;
                    if (self.skills[skillName] == null) {
                        continue;
                    }

                    value = array[i].value;
                    self.skills[skillName].syncSkill(value);
                }
            }

            if (opts.items != null) {
                array = opts.items;
                for (i in array) {
                    var itemKey = array[i].key;
                    if (self.item[itemKey] == null) {
                        continue;
                    }

                    value = array[i].value;
                    self.item[itemKey].syncItem(value);
                }
            }

            if (opts.fairyCoins != null) {
                array = opts.fairyCoins;
                for (i in array) {
                    //info 是object
                    info = array[i];
                    if (info != null) {
                        self.addCoin(Coin.create(info, self));
                        self.event(Player.ADDFAIRYCOIN, info.uuid);
                    }
                }
            }

            if (opts.coins != null) {
                array = opts.coins;
                for (i in array) {
                    //info 是object
                    info = array[i];
                    if (info != null) {
                        self.addCoin(Coin.create(info, self));
                        self.event(Player.ADDCOIN, info.uuid);
                    }
                }
            }

            if (opts.removeCoins != null) {
                array = opts.removeCoins;
                for (i in array) {
                    //info 是uuid
                    info = array[i];
                    if (info != null) {
                        self.removeCoin(info);
                        self.event(Player.REMOVECOIN, info);
                    }
                }
            }

            if (opts.artifacts != null) {
                array = opts.artifacts;
                for (i in array) {
                    //info 是object
                    info = array[i];
                    if (info != null) {
                        var artifact = this.findArtifact(info.key);
                        if (artifact == null) {
                            self.addArtifact(Artifact.create(info, self));
                            self.event(Player.ADDARTIFACT, info.key);
                        }
                        else {
                            artifact.syncArtifact(info);
                            self.event(Player.UPDATEARTIFACT, info.key);
                        }
                        needUpTitan = true;
                    }
                }
            }

            if (opts.removeArtifacts != null) {
                array = opts.removeArtifacts;
                for (i in array) {
                    //info 是key
                    info = array[i];
                    if (info != null) {
                        self.removeArtifact(info);
                        self.event(Player.REMOVEARTIFACT, info);
                        needUpTitan = true;
                    }
                }
            }

            if (opts.fairies != null) {
                array = opts.fairies;
                for (i in array) {
                    //info 是object
                    info = array[i];
                    if (info != null) {
                        self.addFairy(Fairy.create(info, self));
                        self.event(Player.ADDFAIRY, info.uuid);
                    }
                }
            }

            if (opts.removeFairies != null) {
                array = opts.removeFairies;
                for (i in array) {
                    //info 是uuid
                    info = array[i];
                    if (info != null) {
                        self.removeFairy(info);
                        self.event(Player.REMOVEFAIRY, info);
                    }
                }
            }

            if (opts.evolution) {
                this.doEvolution();
                needUpTitan = true;
            }

            if (needUpTitan) {
                this.updateTitans();
            }
        }
    });

    Player.UPDATEGOLD       = "player.gold.update";
    Player.UPDATEDIAMOND    = "player.diamond.update";
    Player.UPDATERELIC      = "player.relic.update";
    Player.LEVELCHANGE      = "player.level.change";
    Player.ADDCOIN          = "player.add.coin";
    Player.REMOVECOIN       = "player.remove.coin";
    Player.ADDARTIFACT      = "player.add.artifact";
    Player.UPDATEARTIFACT   = "player.update.artifact";
    Player.REMOVEARTIFACT   = "player.remove.artifact";
    Player.FAIRYSTAMP       = "player.fairy.stamp.update";
    Player.ADDFAIRY         = "player.add.fairy";
    Player.ADDFAIRYCOIN     = "player.add.fairy.coin";
    Player.REMOVEFAIRY      = "player.remove.fairy";
}(hGame006));
(function(root) {
    var Game = root.Game;
    var Code = root.Code;
    var Stage = root.Stage;
    var Skill = root.Skill;
    var Hero = root.Hero;
    var Fairy = root.Fairy;
    var Item = root.Item;
    var Artifact = root.Artifact;
    var Achievement = root.Achievement;
    var Coin = root.Coin;
    var Player = root.Player;

    root.extend(Player.prototype, {
        //---------------stage handle begin----------------
        killMonsterHandle: function() {
            var results = {
                coins: [],
                stage: {
                    monster: null
                }
            };

            var currMonsterInfo = this.stage._monsterInfo;
            var gold = currMonsterInfo.gold;
            var coinOpts = {
                type: Coin.TYPE_GOLD,
                amount: gold
            };
            var coin = Coin.create(coinOpts, this);
            if (coin != null) {
                results.coins.push(coin.clone());
            }

            //80关以后每10关获得一个荣誉
            if (currMonsterInfo.type == root.Monster.TYPE_BOSS && currMonsterInfo.relics > 0) {
                coinOpts = {
                    type: Coin.TYPE_RELICS,
                    amount: currMonsterInfo.relics
                };
                coin = Coin.create(coinOpts, this);
                if (coin != null) {
                    results.coins.push(coin.clone());
                }
            }

            var processInfo = this.stage.process();
            for (var i in processInfo) {
                results.stage[i] = processInfo[i];
            }
            this.stage.syncStage(results.stage);

            results.stage.monster = this.stage.genMonster();

            return results;
        },

        pausedHandle: function() {
            var results = {
                stage: {
                    paused: null,
                    monster: null
                }
            };

            var paused = this.stage.getPaused();
            results.stage.paused = paused ? false : true;

            this.stage.syncStage(results.stage);

            //要重新生成怪物
            results.stage.monster = this.stage.genMonster();

            return results;
        },
        //---------------stage handle end----------------

        //---------------player handle begin----------------
        gmHandle: function(opts) {
            var results = {
                gold: null
            };

            for (var key in opts) {
                switch (key) {
                    case "gold": {
                        results.gold = +opts[key];
                        break;
                    }
                    case "relics": {
                        results.relics = +opts[key];
                        break;
                    }
                    case "diamond": {
                        results.diamond = +opts[key];
                        break;
                    }
                }
            }

            return results;
        },
        enterHandle: function() {
            var nowTime = Number(root.moment().format('X'));
            var results = {
                lastLogin: null,
                fairyStamp: null,
                stage: {
                    monster: null
                }
            };
            results.stage.monster = this.stage.genMonster();
            results.lastLogin = nowTime;
            if (this.lastLogout > 0) {
                var currLeaveTime = nowTime - this.lastLogout;
                var currGold = this.stage.calcOfflineGold(currLeaveTime);
                results.offlineGold = this.offlineGold + currGold;
            }

            results.fairyStamp = this.genFairyStamp();

            return results;
        },

        upgradeHandle: function(opts) {
            var results = {
                gold: null,
                upgrade: null
            };

            //这里的level是升级量 需要提升level级
            var level = opts.level;
            var free = opts.free;
            var cost = this.calcUpgradeCost(level);

            if (free == false) {
                if (!this.isGoldEnough(cost)) {
                    return {err: Code.GAME_ERR.NOT_ENOUGH_GOLD};
                }
                results.gold = -1 * cost;
            }

            results.upgrade = level;

            return results;
        },

        skillUpgradeHandle: function(opts) {
            var results = {
                gold: null,
                skill: null
            };

            var name = opts.name;
            var skill = this.skills[name];
            if (skill == null) {
                return {err: Code.GAME_ERR.WRONG_SKILL};
            }

            var cost = skill.getCost();

            if (!this.isGoldEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_GOLD};
            }
            results.gold = -1 * cost;

            results.skill = [
                {
                    name: name,
                    value: {upgrade: true}
                }
            ];

            return results;
        },

        skillCastHandle: function(opts) {
            var results = {
                skill: null
            };

            var name = opts.name;
            var skill = this.skills[name];
            if (skill == null || skill.getLevel() <= 0) {
                return {err: Code.GAME_ERR.WRONG_SKILL};
            }

            var err = skill.castCheck();

            if (err != null) {
                return {err: err};
            }

            var nowTime = Number(root.moment().format("X"));
            var availableTime = skill.getCoolDown() + nowTime;
            var durationTime = skill.getDuration() + nowTime;

            results.skill = [
                {
                    name: name,
                    value: {
                        cast: {
                            availableTime: availableTime,
                            durationTime: durationTime
                        }
                    }
                }
            ];

            return results;
        },

        offlineGoldHandle: function() {
            var results = {
                gold: null,
                offlineGold: null
            };

            if (this.offlineGold > 0) {
                results.gold = this.offlineGold;
                results.offlineGold = 0;
            }

            return results;
        },

        //黄金风暴点击奖励
        midasHandle: function() {
            var results = {
                gold: null
            };

            var skill = this.skills["handOfMidas"];

            if (!skill.isRunning()) {
                return results;
            }

            var gold = this.stage._monsterInfo.gold;
            if (gold <= 0) {
                return results;
            }

            var effect = skill.getEffect();
            gold = Math.ceil(gold * effect);

            results.gold = gold;
            return results;
        },

        getCoinHandle: function(opts) {
            var results = {
                gold: null,
                diamond: null,
                relics: null,
                removeCoins: null
            };

            var uuid = opts.uuid || "";
            var coin = this.findCoin(uuid);
            if (coin == null) {
                return results;
            }

            if (coin.isGold()) {
                results.gold = coin.getAmount();
            }
            else if (coin.isDiamond()) {
                results.diamond = coin.getAmount();
            }
            else if (coin.isRelics()) {
                results.relics = coin.getAmount();
            }

            results.removeCoins = [uuid];

            return results;
        },

        evolutionHandle: function() {
            var results = {
                evolution: true,            //收到evolution会重置主角等级
                hero: [],
                skill: [],
                coins: [],
                removeCoins: [],
                stage: {
                    reset: null,
                    monster: null
                }
            };

            if (this.level < 600 && this.stage.getLevel() <= 75) {
                return {err: Code.GAME_ERR.CANT_EVOLUTION};
            }

            var coin;
            var coinOpts;
            var artifactValues = this.getArtifactValues();

            //检查金币掉落 都删除
            for (var coinId in this._coins) {
                coin = this._coins[coinId];
                if (coin && coin.isGold()) {
                    results.removeCoins.push(coinId);
                }
            }

            //英雄信息重置
            for (var heroId in this.heros) {
                var hero = this.heros[heroId];
                if (hero.getLevel() > 0) {
                    results.hero.push({
                        id: heroId,
                        value: {
                            reset: true
                        }
                    });
                }
            }

            //技能信息重置
            for (var skillName in this.skills) {
                var skill = this.skills[skillName];
                if (skill.getLevel() > 0) {
                    results.skill.push({
                        name: skillName,
                        value: {
                            reset: true
                        }
                    });
                }
            }

            //主角等级在results.evolution 处理
            //gameValues会在updateTitan里面更新 所以不用处理

            var stage = 1;
            //在这里添加越级弹簧的CD判断

            if (artifactValues.stageJump > 0) {
                stage = artifactValues.stageJump;
            }

            results.stage.reset = {level: stage};

            if (stage > 80) {
                coinOpts = {
                    type: Coin.TYPE_RELICS,
                    amount: Math.ceil((stage - 80)/10)
                };
                coin = Coin.create(coinOpts, this);
                if (coin != null) {
                    results.coins.push(coin.clone());
                }
            }

            //重置关卡
            this.stage.syncStage(results.stage);

            //要重新生成怪物
            results.stage.monster = this.stage.genMonster();

            //转生金币神器
            if (artifactValues.goldAfterReborn > 0) {
                var info = this.getStage().calculate(artifactValues.goldAfterReborn);
                var gold = info.rbMobGold * 100;
                coinOpts = {
                    type: Coin.TYPE_GOLD,
                    amount: parseInt(gold)
                };
                coin = Coin.create(coinOpts, this);
                if (coin != null) {
                    results.coins.push(coin.clone());
                }
            }

            //转生获得荣誉
            var relic = this.calcRelicOnEvolution();
            if (relic > 0) {
                coinOpts = {
                    type: Coin.TYPE_RELICS,
                    amount: relic
                };
                coin = Coin.create(coinOpts, this);
                if (coin != null) {
                    results.coins.push(coin.clone());
                }
            }

            return results;
        },
        //---------------player handle end----------------

        //---------------hero handle begin----------------
        heroUpgradeHandle: function(opts) {
            var results = {
                gold: null,
                hero: null
            };

            //这里的level是升级量 需要提升level级
            var level = opts.level;
            var id = opts.id;
            var hero = this.heros[id];
            if (hero == null) {
                return {err: Code.GAME_ERR.HERO_ID_ERR};
            }

            level = hero.canUpgradeLevel(level);

            var cost = hero.calcUpgradeCost(level);

            if (!this.isGoldEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_GOLD};
            }
            results.gold = -1 * cost;

            results.hero = [
                {
                    id: id,
                    value: {upgrade: level}
                }
            ];

            return results;
        },

        heroSkillUpgradeHandle: function(opts) {
            var results = {
                gold: null,
                hero: null
            };

            var skillId = opts.skillId;
            var id = opts.id;

            var hero = this.heros[id];
            if (hero == null) {
                return {err: Code.GAME_ERR.HERO_ID_ERR};
            }

            var err = hero.skillUpgradeCondition(skillId);
            if (err != null) {
                return {err: err};
            }

            var cost = hero.getSkillCost(skillId);

            if (!this.isGoldEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_GOLD};
            }

            results.gold = -1 * cost;

            results.hero = [
                {
                    id: id,
                    value: {skill: skillId}
                }
            ];

            return results;
        },

        heroEvolutionHandle: function(opts) {
            var results = {
                gold: null,
                hero: null
            };

            var id = opts.id;
            var hero = this.heros[id];
            if (hero == null) {
                return {err: Code.GAME_ERR.HERO_ID_ERR};
            }

            if (hero.getLevel() != 1000) {
                return {err: Code.GAME_ERR.CANT_EVOLUTION};
            }

            var cost = hero.calcUpgradeCost(1);

            if (!this.isGoldEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_GOLD};
            }
            results.gold = -1 * cost;

            results.hero = [
                {
                    id: id,
                    value: {evolution: true}
                }
            ];

            return results;
        },

        heroDeadHandle: function() {
            var results = {
                hero: null
            };

            var monsterInfo = this.stage._monsterInfo;

            if (monsterInfo == null || monsterInfo.type != root.Monster.TYPE_BOSS) {
                return results;
            }

            if (monsterInfo.deadHero == null) {
                return results;
            }

            var hero = this.getHero(monsterInfo.deadHero);
            if (!hero.active()) {
                return results;
            }

            var stage = this.stage.getLevel();
            var time = Math.ceil((stage - 50) / 10);
            time *= 3600;
            if (time > 86400) {
                time = 86400;
            }
            //神器加成
            var artifactValues = this.getArtifactValues();
            time *= (1 + artifactValues.reviveTime);
            time = Math.ceil(time);

            results.hero = [
                {
                    id: monsterInfo.deadHero,
                    value: {die: time}
                }
            ];

            return results;
        },

        heroReviveHandle: function(opts) {
            var results = {
                diamond: null,
                hero: null
            };

            var id = opts.id;
            var hero = this.heros[id];
            if (hero == null) {
                return {err: Code.GAME_ERR.HERO_ID_ERR};
            }

            if (hero.active()) {
                return {err: Code.GAME_ERR.HERO_CANT_REVIVED};
            }

            var cost = hero.getReviveCost();
            if (cost <= 0) {
                return {err: Code.GAME_ERR.HERO_CANT_REVIVED};
            }

            if (!this.isDiamondEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_DIAMOND};
            }
            results.diamond = -1 * cost;

            results.hero = [
                {
                    id: id,
                    value: {revive: true}
                }
            ];

            return results;
        },
        //---------------hero handle end----------------

        //---------------artifact handle begin----------------
        buyArtifactHandle: function() {
            var results = {
                relics: null,
                artifacts: []
            };

            var cost = this.buyArtifactCost();
            if (!this.isRelicEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_RELIC};
            }

            var totalWeight = 0;
            var keyList = [];
            for (var key in Game.ARTIFACT_LIST) {
                var row = Game.ARTIFACT_LIST[key];

                if (this.findArtifact(key) != null) {
                    continue;
                }

                //不可出售的都是不能正常抽到的了
                if (row.not_for_sale) {
                    continue;
                }

                keyList.push({key: key, weight: row.weight});
                totalWeight += row.weight;
            }

            if (keyList.length <= 0) {
                return {err: Code.GAME_ERR.NO_ARTIFACT_BUY};
            }

            var rand = Math.floor(Math.random() * totalWeight);
            var buyKey = "";

            for (var i = 0; i < keyList.length; i++) {
                var row = keyList[i];
                if (row.weight < rand) {
                    buyKey = row.key;
                    break;
                }

                rand -= row.weight;
            }

            if (buyKey == "") {
                var debugInfo = "[ debug ] buy artifact rand: " + rand + " totalWeight: " + totalWeight;
                console.log(debugInfo);
                return {err: Code.GAME_ERR.NO_ARTIFACT_BUY, msg: debugInfo};
            }

            var artifactOpts = {
                key: buyKey,
                level: 1,
                consume: cost
            };
            var artifact = Artifact.create(artifactOpts, this);
            if (artifact != null) {
                results.artifacts.push(artifact.clone());
            }

            results.relics = -1 * cost;

            return results;
        },

        saleArtifactHandle: function(opts) {
            var results = {
                relics: null,
                removeArtifacts: []
            };

            var key = opts.key;
            var artifact = this.findArtifact(key);
            if (artifact == null) {
                return {err: Code.GAME_ERR.NOT_ARTIFACT};
            }

            if (artifact.isNotForSale()) {
                return {err: Code.GAME_ERR.ARTIFACT_NOT_FOR_SALE};
            }

            var cost = artifact.getSaleCost();
            if (!this.isDiamondEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_DIAMOND};
            }

            results.relics = artifact.getConsume();
            results.removeArtifacts.push(key);

            return results;
        },

        upgradeArtifactHandle: function(opts) {
            var results = {
                relics: null,
                artifacts: []
            };

            var key = opts.key;
            var artifact = this.findArtifact(key);
            if (artifact == null) {
                return {err: Code.GAME_ERR.NOT_ARTIFACT};
            }

            var level = artifact.getLevel();
            var maxLevel = artifact.getMaxLevel();

            if (maxLevel != -1 && level >= maxLevel) {
                return {err: Code.GAME_ERR.ARTIFACT_LEVEL_MAX};
            }

            var cost = artifact.getCost();
            if (!this.isRelicEnough(cost)) {
                return {err: Code.GAME_ERR.NOT_ENOUGH_RELIC};
            }

            results.relics = -1 * cost;
            results.artifacts.push({key: key, upgrade: cost});

            return results;
        },
        //---------------artifact handle end----------------

        //---------------fairy handle begin----------------
        makeFairyHandle: function() {
            var self = this;
            var results = {
                fairyStamp: null,
                fairies: []
            };
            var times = 1;

            //还没到时间
            //var nowTime = Number(root.moment().format("X"));
            //if (this.getFairyStamp() < nowTime) {
            //    return results;
            //}

            //双飞判断

            var randList = [
                {type: Fairy.TYPE_GOLD, weight: 25},
                {type: Fairy.TYPE_DIAMOND, weight: 10},
                {type: Fairy.TYPE_SHADOW_CLONE, weight: 7},
                {type: Fairy.TYPE_CRITICAL_STRIKE, weight: 7},
                {type: Fairy.TYPE_WAR_CRY, weight: 7},
                {type: Fairy.TYPE_BERSERKER_RAGE, weight: 7},
                {type: Fairy.TYPE_HAND_OF_MIDAS, weight: 7}
            ];

            var i;
            var row;
            var totalWeight = 0;
            for (i = 0; i < randList.length; i++) {
                row = randList[i];
                totalWeight += row.weight;
            }

            while (times > 0) {
                var type = Fairy.TYPE_GOLD;

                //随机 一般times不会大于2 这里做保护 如果列表用光则默认金币
                if (randList.length > 0) {
                    var index = 0;
                    var rand = Math.floor(Math.random() * totalWeight);
                    for (i = 0; i < randList.length; i++) {
                        row = randList[i];
                        if (rand < row.weight) {
                            index = i;
                            break;
                        }
                        rand -= row.weight;
                    }
                    row = randList[index];
                    type = row.type;
                    totalWeight -= row.weight;
                    randList.splice(index, 1);
                }

                var fairyOpts = {
                    type: type
                };
                var fairy = Fairy.create(fairyOpts, self);
                if (fairy != null) {
                    results.fairies.push(fairy.clone());
                }
                times--;
            }

            //下一次小精灵时间
            results.fairyStamp = this.genFairyStamp();

            return results;
        },

        collectFairyHandle: function(opts) {
            var results = {
                fairyCoins: [],
                skill: null,
                removeFairies: []
            };

            var uuid = opts.uuid;
            var fairy = this.findFairy(uuid);
            if (fairy == null) {
                return results;
            }

            //先记录删除精灵的信息
            results.removeFairies.push(uuid);

            var type = fairy.getType();

            if (fairy.isSkill()) {
                //技能的时候 type就是技能名
                var name = type;
                var skill = this.skills[name];
                //没找到这个技能或者技能正在使用 就变成金币奖励
                if (skill == null || skill.isRunning()) {
                    type = Fairy.TYPE_GOLD;
                }
                else {
                    var nowTime = Number(root.moment().format("X"));
                    var availableTime = null;
                    var durationTime = Math.floor(skill.getDuration() / 2 + nowTime);

                    results.skill = [
                        {
                            name: name,
                            value: {
                                cast: {
                                    availableTime: availableTime,
                                    durationTime: durationTime
                                }
                            }
                        }
                    ];

                    return results;
                }
            }

            var coinOpts;

            //钻石奖励 一个钻石
            if (type == Fairy.TYPE_DIAMOND) {
                coinOpts = {
                    type: Coin.TYPE_DIAMOND,
                    amount: 1
                };
            }
            //金币奖励 一个宝箱的金币
            else {
                var stage = this.getStage();
                var gold = 100;
                if (stage != null) {
                    gold = stage.chestGold;
                }

                coinOpts = {
                    type: Coin.TYPE_GOLD,
                    amount: gold
                };
            }

            var coin = Coin.create(coinOpts, this);
            if (coin != null) {
                results.fairyCoins.push(coin.clone());
            }

            return results;
        },

        removeFairyHandle: function(opts) {
            var results = {
                removeFairies: []
            };

            var uuid = opts.uuid;
            var fairy = this.findFairy(uuid);
            if (fairy == null) {
                return results;
            }

            //先记录删除精灵的信息
            results.removeFairies.push(uuid);
            return results;
        },
        //---------------fairy handle end----------------

        //---------------item handle begin----------------
        itemCastHandle: function(opts) {
            var results = {
                diamond: null,
                fairies: [],
                items: [],
                skill: []
            };

            var key = opts.key;
            var item = this.findItem(key);
            if (item == null) {
                return results;
            }

            if (item.getAvailable() > 0) {
                return {err: Code.GAME_ERR.ITEM_IS_ON_CD};
            }

            var castInfo = {key: key};
            //有剩余次数则扣一次次数
            if (item.getCount() > 1) {
                castInfo.count = -1;
            }
            else {
                var cost = item.getCost();
                if (!this.isDiamondEnough(cost)) {
                    return {err: Code.GAME_ERR.NOT_ENOUGH_DIAMOND};
                }
                results.diamond = -1 * cost;
            }


            var nowTime = Number(root.moment().format("X"));
            castInfo.availableTime = item.getCoolDown() + nowTime;
            castInfo.durationTime = item.getDuration() + nowTime;

            results.items.push(castInfo);
            //以上把道具自身的设定搞好了。下面就是部分技能需要服务器处理的

            switch (key) {
                case "storm": {
                    var fairyCount = 10;
                    var totalGold = item.getEffect();
                    var everyGold = totalGold / fairyCount;

                    while (fairyCount > 0) {
                        var fairyOpts = {
                            type: Fairy.TYPE_GOLD,
                            amount: everyGold
                        };
                        var fairy = Fairy.create(fairyOpts, self);
                        if (fairy != null) {
                            results.fairies.push(fairy.clone());
                        }
                        fairyCount--;
                    }
                    break;
                }
                case "refresh": {
                    for (var skillName in Game.SKILL_LIST) {
                        results.skill.push(
                            {
                                name: skillName,
                                value: {
                                    refresh: true
                                }
                            });
                    }
                    break;
                }
            }

            return results;
        }
        //---------------item handle end----------------
    });

}(hGame006));