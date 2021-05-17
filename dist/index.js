require('./sourcemap-register.js');module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 907:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Linear = exports.UndefinedError = void 0;
const sdk_1 = __webpack_require__(851);
const yaml_front_matter_1 = __webpack_require__(774);
class UndefinedError extends Error {
    constructor(content) {
        super();
        this.name = "UndefinedError";
        this.message = `${content} is undefined`;
    }
}
exports.UndefinedError = UndefinedError;
class Linear {
    constructor(apiKey, teamId, stateId, isDryrun = false) {
        this.apiKey = apiKey;
        this.teamId = teamId;
        this.stateId = stateId;
        this.isDryrun = isDryrun;
        this.client = new sdk_1.LinearClient({ apiKey });
    }
    /**
     * create task for check renovate.
     */
    createIssue(issueData) {
        return __awaiter(this, void 0, void 0, function* () {
            let inputIssueData = issueData;
            if (inputIssueData === undefined) {
                inputIssueData = this.issueData;
            }
            if (inputIssueData === undefined) {
                throw new UndefinedError("IssueData");
            }
            const issueCreateInput = Object.assign({ teamId: this.teamId, stateId: this.stateId }, inputIssueData);
            if (this.isDryrun) {
                return issueCreateInput;
            }
            return this.client.issueCreate(issueCreateInput);
        });
    }
    readData(data) {
        const front = yaml_front_matter_1.loadFront(data);
        const { __content, title, description } = front, other = __rest(front, ["__content", "title", "description"]);
        this.issueData = Object.assign({ title, description: __content }, other);
        return this.issueData;
    }
}
exports.Linear = Linear;


/***/ }),

/***/ 109:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(186);
const Linear_1 = __webpack_require__(907);
const fs_1 = __webpack_require__(747);
function main(issueFilePath, apiKey, teamId, stateId, isDryrun) {
    return __awaiter(this, void 0, void 0, function* () {
        if (apiKey === undefined || apiKey === "") {
            throw new Linear_1.UndefinedError("LINEAR_API_TOKEN");
        }
        if (teamId === undefined || teamId === "") {
            throw new Linear_1.UndefinedError("LINEAR_TEAM_ID");
        }
        if (stateId === undefined || stateId === "") {
            throw new Linear_1.UndefinedError("LINEAR_STATE_ID");
        }
        if (issueFilePath === undefined ||
            issueFilePath === "" ||
            !issueFilePath.endsWith(".md")) {
            throw new Linear_1.UndefinedError("issueFilePath");
        }
        const client = new Linear_1.Linear(apiKey, teamId, stateId, isDryrun);
        core_1.info(`--- create ${issueFilePath} ---`);
        const data = fs_1.readFileSync(issueFilePath);
        const issueData = client.readData(data);
        core_1.info(JSON.stringify(issueData, null, 2));
        if (isDryrun) {
            core_1.info(`--- !!DRYRUN!! ---`);
        }
        const result = yield client.createIssue();
        core_1.info(`--- result ${issueFilePath} ---`);
        core_1.info(JSON.stringify(result, null, 2));
        core_1.info(`--- done ${issueFilePath} ---`);
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const issueFilePath = core_1.getInput("issueFilePath");
            const apiKey = core_1.getInput("apiKey");
            const teamId = core_1.getInput("teamId");
            const stateId = core_1.getInput("stateId");
            const isDryrun = Boolean(core_1.getInput("isDryrun"));
            yield main(issueFilePath, apiKey, teamId, stateId, isDryrun);
        }
        catch (error) {
            core_1.setFailed(error.message);
        }
    });
}
run();


/***/ }),

/***/ 351:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 186:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const command_1 = __webpack_require__(351);
const file_command_1 = __webpack_require__(717);
const utils_1 = __webpack_require__(278);
const os = __importStar(__webpack_require__(87));
const path = __importStar(__webpack_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// For internal use, subject to change.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__webpack_require__(747));
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 851:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:!0}));var e=__webpack_require__(413),i=__webpack_require__(605),n=__webpack_require__(211),a=__webpack_require__(761);function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var d,l=t(e),o=t(i),r=t(n),s=t(a);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function u(e,i){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&i.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var t=0;for(a=Object.getOwnPropertySymbols(e);t<a.length;t++)i.indexOf(a[t])<0&&Object.prototype.propertyIsEnumerable.call(e,a[t])&&(n[a[t]]=e[a[t]])}return n}function m(e,i,n,a){return new(n||(n=Promise))((function(t,d){function l(e){try{r(a.next(e))}catch(e){d(e)}}function o(e){try{r(a.throw(e))}catch(e){d(e)}}function r(e){var i;e.done?t(e.value):(i=e.value,i instanceof n?i:new n((function(e){e(i)}))).then(l,o)}r((a=a.apply(e,i||[])).next())}))}function k(e){return null!=e}exports.LinearErrorType=void 0,(d=exports.LinearErrorType||(exports.LinearErrorType={})).FeatureNotAccessible="FeatureNotAccessible",d.InvalidInput="InvalidInput",d.Ratelimited="Ratelimited",d.NetworkError="NetworkError",d.AuthenticationError="AuthenticationError",d.Forbidden="Forbidden",d.BootstrapError="BootstrapError",d.Unknown="Unknown",d.InternalError="InternalError",d.Other="Other",d.UserError="UserError",d.GraphqlError="GraphqlError",d.LockTimeout="LockTimeout";const v={[exports.LinearErrorType.FeatureNotAccessible]:"feature not accessible",[exports.LinearErrorType.InvalidInput]:"invalid input",[exports.LinearErrorType.Ratelimited]:"ratelimited",[exports.LinearErrorType.NetworkError]:"network error",[exports.LinearErrorType.AuthenticationError]:"authentication error",[exports.LinearErrorType.Forbidden]:"forbidden",[exports.LinearErrorType.BootstrapError]:"bootstrap error",[exports.LinearErrorType.Unknown]:"unknown",[exports.LinearErrorType.InternalError]:"internal error",[exports.LinearErrorType.Other]:"other",[exports.LinearErrorType.UserError]:"user error",[exports.LinearErrorType.GraphqlError]:"graphql error",[exports.LinearErrorType.LockTimeout]:"lock timeout"};function c(e){var i,n,a;return null!==(n=v,a=e,i=Object.keys(n).find((e=>n[e]===a)))&&void 0!==i?i:exports.LinearErrorType.Unknown}class p{constructor(e){var i,n,a,t,d,l,o;this.type=c(null===(i=null==e?void 0:e.extensions)||void 0===i?void 0:i.type),this.userError=null===(n=null==e?void 0:e.extensions)||void 0===n?void 0:n.userError,this.path=null==e?void 0:e.path,this.message=null!==(o=null!==(d=null!==(t=null===(a=null==e?void 0:e.extensions)||void 0===a?void 0:a.userPresentableMessage)&&void 0!==t?t:null==e?void 0:e.message)&&void 0!==d?d:null===(l=null==e?void 0:e.extensions)||void 0===l?void 0:l.type)&&void 0!==o?o:"Unknown error from LinearClient"}}class N extends Error{constructor(e,i,n){var a,t,d,l,o,r,s,u,m,v;super(null!==(o=Array.from(new Set([(v=null===(t=null===(a=null==e?void 0:e.message)||void 0===a?void 0:a.split(": {"))||void 0===t?void 0:t[0],v?`${v.charAt(0).toUpperCase()}${v.slice(1)}`:void 0),null===(d=null==e?void 0:e.response)||void 0===d?void 0:d.error,null===(l=null==i?void 0:i[0])||void 0===l?void 0:l.message].filter(k))).filter(k).join(" - "))&&void 0!==o?o:"Unknown error from LinearClient"),this.type=n,this.errors=i,this.query=null===(r=null==e?void 0:e.request)||void 0===r?void 0:r.query,this.variables=null===(s=null==e?void 0:e.request)||void 0===s?void 0:s.variables,this.status=null===(u=null==e?void 0:e.response)||void 0===u?void 0:u.status,this.data=null===(m=null==e?void 0:e.response)||void 0===m?void 0:m.data,this.raw=e}}class h extends N{constructor(e,i){super(e,i,exports.LinearErrorType.FeatureNotAccessible)}}class f extends N{constructor(e,i){super(e,i,exports.LinearErrorType.InvalidInput)}}class b extends N{constructor(e,i){super(e,i,exports.LinearErrorType.Ratelimited)}}class y extends N{constructor(e,i){super(e,i,exports.LinearErrorType.NetworkError)}}class S extends N{constructor(e,i){super(e,i,exports.LinearErrorType.AuthenticationError)}}class g extends N{constructor(e,i){super(e,i,exports.LinearErrorType.Forbidden)}}class D extends N{constructor(e,i){super(e,i,exports.LinearErrorType.BootstrapError)}}class V extends N{constructor(e,i){super(e,i,exports.LinearErrorType.Unknown)}}class F extends N{constructor(e,i){super(e,i,exports.LinearErrorType.InternalError)}}class A extends N{constructor(e,i){super(e,i,exports.LinearErrorType.Other)}}class _ extends N{constructor(e,i){super(e,i,exports.LinearErrorType.UserError)}}class T extends N{constructor(e,i){super(e,i,exports.LinearErrorType.GraphqlError)}}class I extends N{constructor(e,i){super(e,i,exports.LinearErrorType.LockTimeout)}}const w={[exports.LinearErrorType.FeatureNotAccessible]:h,[exports.LinearErrorType.InvalidInput]:f,[exports.LinearErrorType.Ratelimited]:b,[exports.LinearErrorType.NetworkError]:y,[exports.LinearErrorType.AuthenticationError]:S,[exports.LinearErrorType.Forbidden]:g,[exports.LinearErrorType.BootstrapError]:D,[exports.LinearErrorType.Unknown]:V,[exports.LinearErrorType.InternalError]:F,[exports.LinearErrorType.Other]:A,[exports.LinearErrorType.UserError]:_,[exports.LinearErrorType.GraphqlError]:T,[exports.LinearErrorType.LockTimeout]:I};function q(e){var i,n,a,t,d,l;if(e instanceof N)return e;const o=(null!==(n=null===(i=null==e?void 0:e.response)||void 0===i?void 0:i.errors)&&void 0!==n?n:[]).map((e=>new p(e))),r=null===(a=null==e?void 0:e.response)||void 0===a?void 0:a.status,s=null!==(d=null===(t=o[0])||void 0===t?void 0:t.type)&&void 0!==d?d:403===r?exports.LinearErrorType.Forbidden:429===r?exports.LinearErrorType.Ratelimited:`${r}`.startsWith("4")?exports.LinearErrorType.AuthenticationError:500===r?exports.LinearErrorType.InternalError:`${r}`.startsWith("5")?exports.LinearErrorType.NetworkError:exports.LinearErrorType.Unknown;return new(null!==(l=w[s])&&void 0!==l?l:N)(e,o)}var x="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):void 0;function C(e){return(C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function O(e){return P(e,[])}function P(e,i){switch(C(e)){case"string":return JSON.stringify(e);case"function":return e.name?"[function ".concat(e.name,"]"):"[function]";case"object":return null===e?"null":function(e,i){if(-1!==i.indexOf(e))return"[Circular]";var n=[].concat(i,[e]),a=function(e){var i=e[String(x)];if("function"==typeof i)return i;if("function"==typeof e.inspect)return e.inspect}(e);if(void 0!==a){var t=a.call(e);if(t!==e)return"string"==typeof t?t:P(t,n)}else if(Array.isArray(e))return function(e,i){if(0===e.length)return"[]";if(i.length>2)return"[Array]";for(var n=Math.min(10,e.length),a=e.length-n,t=[],d=0;d<n;++d)t.push(P(e[d],i));1===a?t.push("... 1 more item"):a>1&&t.push("... ".concat(a," more items"));return"["+t.join(", ")+"]"}(e,n);return function(e,i){var n=Object.keys(e);if(0===n.length)return"{}";if(i.length>2)return"["+function(e){var i=Object.prototype.toString.call(e).replace(/^\[object /,"").replace(/]$/,"");if("Object"===i&&"function"==typeof e.constructor){var n=e.constructor.name;if("string"==typeof n&&""!==n)return n}return i}(e)+"]";return"{ "+n.map((function(n){return n+": "+P(e[n],i)})).join(", ")+" }"}(e,n)}(e,i);default:return String(e)}}function j(e){var i=e.prototype.toJSON;"function"==typeof i||function(e,i){if(!Boolean(e))throw new Error(null!=i?i:"Unexpected invariant triggered.")}(0),e.prototype.inspect=i,x&&(e.prototype[x]=i)}function U(e){return null!=e&&"string"==typeof e.kind}j(function(){function e(e,i,n){this.start=e.start,this.end=i.end,this.startToken=e,this.endToken=i,this.source=n}return e.prototype.toJSON=function(){return{start:this.start,end:this.end}},e}()),j(function(){function e(e,i,n,a,t,d,l){this.kind=e,this.start=i,this.end=n,this.line=a,this.column=t,this.value=l,this.prev=d,this.next=null}return e.prototype.toJSON=function(){return{kind:this.kind,value:this.value,line:this.line,column:this.column}},e}());var B={Name:[],Document:["definitions"],OperationDefinition:["name","variableDefinitions","directives","selectionSet"],VariableDefinition:["variable","type","defaultValue","directives"],Variable:["name"],SelectionSet:["selections"],Field:["alias","name","arguments","directives","selectionSet"],Argument:["name","value"],FragmentSpread:["name","directives"],InlineFragment:["typeCondition","directives","selectionSet"],FragmentDefinition:["name","variableDefinitions","typeCondition","directives","selectionSet"],IntValue:[],FloatValue:[],StringValue:[],BooleanValue:[],NullValue:[],EnumValue:[],ListValue:["values"],ObjectValue:["fields"],ObjectField:["name","value"],Directive:["name","arguments"],NamedType:["name"],ListType:["type"],NonNullType:["type"],SchemaDefinition:["description","directives","operationTypes"],OperationTypeDefinition:["type"],ScalarTypeDefinition:["description","name","directives"],ObjectTypeDefinition:["description","name","interfaces","directives","fields"],FieldDefinition:["description","name","arguments","type","directives"],InputValueDefinition:["description","name","type","defaultValue","directives"],InterfaceTypeDefinition:["description","name","interfaces","directives","fields"],UnionTypeDefinition:["description","name","directives","types"],EnumTypeDefinition:["description","name","directives","values"],EnumValueDefinition:["description","name","directives"],InputObjectTypeDefinition:["description","name","directives","fields"],DirectiveDefinition:["description","name","arguments","locations"],SchemaExtension:["directives","operationTypes"],ScalarTypeExtension:["name","directives"],ObjectTypeExtension:["name","interfaces","directives","fields"],InterfaceTypeExtension:["name","interfaces","directives","fields"],UnionTypeExtension:["name","directives","types"],EnumTypeExtension:["name","directives","values"],InputObjectTypeExtension:["name","directives","fields"]},E=Object.freeze({});function R(e,i,n){var a=e[i];if(a){if(!n&&"function"==typeof a)return a;var t=n?a.leave:a.enter;if("function"==typeof t)return t}else{var d=n?e.leave:e.enter;if(d){if("function"==typeof d)return d;var l=d[i];if("function"==typeof l)return l}}}function z(e){return function(e,i){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:B,a=void 0,t=Array.isArray(e),d=[e],l=-1,o=[],r=void 0,s=void 0,u=void 0,m=[],k=[],v=e;do{var c=++l===d.length,p=c&&0!==o.length;if(c){if(s=0===k.length?void 0:m[m.length-1],r=u,u=k.pop(),p){if(t)r=r.slice();else{for(var N={},h=0,f=Object.keys(r);h<f.length;h++){var b=f[h];N[b]=r[b]}r=N}for(var y=0,S=0;S<o.length;S++){var g=o[S][0],D=o[S][1];t&&(g-=y),t&&null===D?(r.splice(g,1),y++):r[g]=D}}l=a.index,d=a.keys,o=a.edits,t=a.inArray,a=a.prev}else{if(s=u?t?l:d[l]:void 0,null==(r=u?u[s]:v))continue;u&&m.push(s)}var V,F=void 0;if(!Array.isArray(r)){if(!U(r))throw new Error("Invalid AST Node: ".concat(O(r),"."));var A=R(i,r.kind,c);if(A){if((F=A.call(i,r,s,u,m,k))===E)break;if(!1===F){if(!c){m.pop();continue}}else if(void 0!==F&&(o.push([s,F]),!c)){if(!U(F)){m.pop();continue}r=F}}}void 0===F&&p&&o.push([s,r]),c?m.pop():(a={inArray:t,index:l,keys:d,edits:o,prev:a},d=(t=Array.isArray(r))?r:null!==(V=n[r.kind])&&void 0!==V?V:[],l=-1,o=[],u&&k.push(u),u=r)}while(void 0!==a);return 0!==o.length&&(v=o[o.length-1][1]),v}(e,{leave:M})}var M={Name:function(e){return e.value},Variable:function(e){return"$"+e.name},Document:function(e){return W(e.definitions,"\n\n")+"\n"},OperationDefinition:function(e){var i=e.operation,n=e.name,a=H("(",W(e.variableDefinitions,", "),")"),t=W(e.directives," "),d=e.selectionSet;return n||t||a||"query"!==i?W([i,W([n,a]),t,d]," "):d},VariableDefinition:function(e){var i=e.variable,n=e.type,a=e.defaultValue,t=e.directives;return i+": "+n+H(" = ",a)+H(" ",W(t," "))},SelectionSet:function(e){return Q(e.selections)},Field:function(e){var i=e.alias,n=e.name,a=e.arguments,t=e.directives,d=e.selectionSet,l=H("",i,": ")+n,o=l+H("(",W(a,", "),")");return o.length>80&&(o=l+H("(\n",G(W(a,"\n")),"\n)")),W([o,W(t," "),d]," ")},Argument:function(e){return e.name+": "+e.value},FragmentSpread:function(e){return"..."+e.name+H(" ",W(e.directives," "))},InlineFragment:function(e){var i=e.typeCondition,n=e.directives,a=e.selectionSet;return W(["...",H("on ",i),W(n," "),a]," ")},FragmentDefinition:function(e){var i=e.name,n=e.typeCondition,a=e.variableDefinitions,t=e.directives,d=e.selectionSet;return"fragment ".concat(i).concat(H("(",W(a,", "),")")," ")+"on ".concat(n," ").concat(H("",W(t," ")," "))+d},IntValue:function(e){return e.value},FloatValue:function(e){return e.value},StringValue:function(e,i){var n=e.value;return e.block?function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=-1===e.indexOf("\n"),t=" "===e[0]||"\t"===e[0],d='"'===e[e.length-1],l="\\"===e[e.length-1],o=!a||d||l||n,r="";return!o||a&&t||(r+="\n"+i),r+=i?e.replace(/\n/g,"\n"+i):e,o&&(r+="\n"),'"""'+r.replace(/"""/g,'\\"""')+'"""'}(n,"description"===i?"":"  "):JSON.stringify(n)},BooleanValue:function(e){return e.value?"true":"false"},NullValue:function(){return"null"},EnumValue:function(e){return e.value},ListValue:function(e){return"["+W(e.values,", ")+"]"},ObjectValue:function(e){return"{"+W(e.fields,", ")+"}"},ObjectField:function(e){return e.name+": "+e.value},Directive:function(e){return"@"+e.name+H("(",W(e.arguments,", "),")")},NamedType:function(e){return e.name},ListType:function(e){return"["+e.type+"]"},NonNullType:function(e){return e.type+"!"},SchemaDefinition:L((function(e){var i=e.directives,n=e.operationTypes;return W(["schema",W(i," "),Q(n)]," ")})),OperationTypeDefinition:function(e){return e.operation+": "+e.type},ScalarTypeDefinition:L((function(e){return W(["scalar",e.name,W(e.directives," ")]," ")})),ObjectTypeDefinition:L((function(e){var i=e.name,n=e.interfaces,a=e.directives,t=e.fields;return W(["type",i,H("implements ",W(n," & ")),W(a," "),Q(t)]," ")})),FieldDefinition:L((function(e){var i=e.name,n=e.arguments,a=e.type,t=e.directives;return i+(K(n)?H("(\n",G(W(n,"\n")),"\n)"):H("(",W(n,", "),")"))+": "+a+H(" ",W(t," "))})),InputValueDefinition:L((function(e){var i=e.name,n=e.type,a=e.defaultValue,t=e.directives;return W([i+": "+n,H("= ",a),W(t," ")]," ")})),InterfaceTypeDefinition:L((function(e){var i=e.name,n=e.interfaces,a=e.directives,t=e.fields;return W(["interface",i,H("implements ",W(n," & ")),W(a," "),Q(t)]," ")})),UnionTypeDefinition:L((function(e){var i=e.name,n=e.directives,a=e.types;return W(["union",i,W(n," "),a&&0!==a.length?"= "+W(a," | "):""]," ")})),EnumTypeDefinition:L((function(e){var i=e.name,n=e.directives,a=e.values;return W(["enum",i,W(n," "),Q(a)]," ")})),EnumValueDefinition:L((function(e){return W([e.name,W(e.directives," ")]," ")})),InputObjectTypeDefinition:L((function(e){var i=e.name,n=e.directives,a=e.fields;return W(["input",i,W(n," "),Q(a)]," ")})),DirectiveDefinition:L((function(e){var i=e.name,n=e.arguments,a=e.repeatable,t=e.locations;return"directive @"+i+(K(n)?H("(\n",G(W(n,"\n")),"\n)"):H("(",W(n,", "),")"))+(a?" repeatable":"")+" on "+W(t," | ")})),SchemaExtension:function(e){var i=e.directives,n=e.operationTypes;return W(["extend schema",W(i," "),Q(n)]," ")},ScalarTypeExtension:function(e){return W(["extend scalar",e.name,W(e.directives," ")]," ")},ObjectTypeExtension:function(e){var i=e.name,n=e.interfaces,a=e.directives,t=e.fields;return W(["extend type",i,H("implements ",W(n," & ")),W(a," "),Q(t)]," ")},InterfaceTypeExtension:function(e){var i=e.name,n=e.interfaces,a=e.directives,t=e.fields;return W(["extend interface",i,H("implements ",W(n," & ")),W(a," "),Q(t)]," ")},UnionTypeExtension:function(e){var i=e.name,n=e.directives,a=e.types;return W(["extend union",i,W(n," "),a&&0!==a.length?"= "+W(a," | "):""]," ")},EnumTypeExtension:function(e){var i=e.name,n=e.directives,a=e.values;return W(["extend enum",i,W(n," "),Q(a)]," ")},InputObjectTypeExtension:function(e){var i=e.name,n=e.directives,a=e.fields;return W(["extend input",i,W(n," "),Q(a)]," ")}};function L(e){return function(i){return W([i.description,e(i)],"\n")}}function W(e){var i,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return null!==(i=null==e?void 0:e.filter((function(e){return e})).join(n))&&void 0!==i?i:""}function Q(e){return H("{\n",G(W(e,"\n")),"\n}")}function H(e,i){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return null!=i&&""!==i?e+i+n:""}function G(e){return H("  ",e.replace(/\n/g,"\n  "))}function $(e){return-1!==e.indexOf("\n")}function K(e){return null!=e&&e.some($)}var J="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function Z(e){if(e.__esModule)return e;var i=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(e).forEach((function(n){var a=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(i,n,a.get?a:{enumerable:!0,get:function(){return e[n]}})})),i}function Y(e){var i={exports:{}};return e(i,i.exports),i.exports}var X=Object.freeze({__proto__:null,default:function(e,i){return i=i||{},new Promise((function(n,a){var t=new XMLHttpRequest,d=[],l=[],o={},r=function(){return{ok:2==(t.status/100|0),statusText:t.statusText,status:t.status,url:t.responseURL,text:function(){return Promise.resolve(t.responseText)},json:function(){return Promise.resolve(t.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([t.response]))},clone:r,headers:{keys:function(){return d},entries:function(){return l},get:function(e){return o[e.toLowerCase()]},has:function(e){return e.toLowerCase()in o}}}};for(var s in t.open(i.method||"get",e,!0),t.onload=function(){t.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,(function(e,i,n){d.push(i=i.toLowerCase()),l.push([i,n]),o[i]=o[i]?o[i]+","+n:n})),n(r())},t.onerror=a,t.withCredentials="include"==i.credentials,i.headers)t.setRequestHeader(s,i.headers[s]);t.send(i.body||null)}))}}),ee=Y((function(e,i){!function(n){var a=i&&!i.nodeType&&i,t=e&&!e.nodeType&&e,d="object"==typeof J&&J;d.global!==d&&d.window!==d&&d.self!==d||(n=d);var l,o,r=2147483647,s=36,u=/^xn--/,m=/[^\x20-\x7E]/,k=/[\x2E\u3002\uFF0E\uFF61]/g,v={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},c=Math.floor,p=String.fromCharCode;function N(e){throw RangeError(v[e])}function h(e,i){for(var n=e.length,a=[];n--;)a[n]=i(e[n]);return a}function f(e,i){var n=e.split("@"),a="";return n.length>1&&(a=n[0]+"@",e=n[1]),a+h((e=e.replace(k,".")).split("."),i).join(".")}function b(e){for(var i,n,a=[],t=0,d=e.length;t<d;)(i=e.charCodeAt(t++))>=55296&&i<=56319&&t<d?56320==(64512&(n=e.charCodeAt(t++)))?a.push(((1023&i)<<10)+(1023&n)+65536):(a.push(i),t--):a.push(i);return a}function y(e){return h(e,(function(e){var i="";return e>65535&&(i+=p((e-=65536)>>>10&1023|55296),e=56320|1023&e),i+=p(e)})).join("")}function S(e,i){return e+22+75*(e<26)-((0!=i)<<5)}function g(e,i,n){var a=0;for(e=n?c(e/700):e>>1,e+=c(e/i);e>455;a+=s)e=c(e/35);return c(a+36*e/(e+38))}function D(e){var i,n,a,t,d,l,o,u,m,k,v,p=[],h=e.length,f=0,b=128,S=72;for((n=e.lastIndexOf("-"))<0&&(n=0),a=0;a<n;++a)e.charCodeAt(a)>=128&&N("not-basic"),p.push(e.charCodeAt(a));for(t=n>0?n+1:0;t<h;){for(d=f,l=1,o=s;t>=h&&N("invalid-input"),((u=(v=e.charCodeAt(t++))-48<10?v-22:v-65<26?v-65:v-97<26?v-97:s)>=s||u>c((r-f)/l))&&N("overflow"),f+=u*l,!(u<(m=o<=S?1:o>=S+26?26:o-S));o+=s)l>c(r/(k=s-m))&&N("overflow"),l*=k;S=g(f-d,i=p.length+1,0==d),c(f/i)>r-b&&N("overflow"),b+=c(f/i),f%=i,p.splice(f++,0,b)}return y(p)}function V(e){var i,n,a,t,d,l,o,u,m,k,v,h,f,y,D,V=[];for(h=(e=b(e)).length,i=128,n=0,d=72,l=0;l<h;++l)(v=e[l])<128&&V.push(p(v));for(a=t=V.length,t&&V.push("-");a<h;){for(o=r,l=0;l<h;++l)(v=e[l])>=i&&v<o&&(o=v);for(o-i>c((r-n)/(f=a+1))&&N("overflow"),n+=(o-i)*f,i=o,l=0;l<h;++l)if((v=e[l])<i&&++n>r&&N("overflow"),v==i){for(u=n,m=s;!(u<(k=m<=d?1:m>=d+26?26:m-d));m+=s)D=u-k,y=s-k,V.push(p(S(k+D%y,0))),u=c(D/y);V.push(p(S(u,0))),d=g(n,f,a==t),n=0,++a}++n,++i}return V.join("")}if(l={version:"1.3.2",ucs2:{decode:b,encode:y},decode:D,encode:V,toASCII:function(e){return f(e,(function(e){return m.test(e)?"xn--"+V(e):e}))},toUnicode:function(e){return f(e,(function(e){return u.test(e)?D(e.slice(4).toLowerCase()):e}))}},a&&t)if(e.exports==a)t.exports=l;else for(o in l)l.hasOwnProperty(o)&&(a[o]=l[o]);else n.punycode=l}(J)})),ie=function(e){return"string"==typeof e},ne=function(e){return"object"==typeof e&&null!==e},ae=function(e){return null===e},te=function(e){return null==e};
/*! https://mths.be/punycode v1.3.2 by @mathias */function de(e,i){return Object.prototype.hasOwnProperty.call(e,i)}var le=function(e,i,n,a){i=i||"&",n=n||"=";var t={};if("string"!=typeof e||0===e.length)return t;var d=/\+/g;e=e.split(i);var l=1e3;a&&"number"==typeof a.maxKeys&&(l=a.maxKeys);var o=e.length;l>0&&o>l&&(o=l);for(var r=0;r<o;++r){var s,u,m,k,v=e[r].replace(d,"%20"),c=v.indexOf(n);c>=0?(s=v.substr(0,c),u=v.substr(c+1)):(s=v,u=""),m=decodeURIComponent(s),k=decodeURIComponent(u),de(t,m)?Array.isArray(t[m])?t[m].push(k):t[m]=[t[m],k]:t[m]=k}return t},oe=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}},re=function(e,i,n,a){return i=i||"&",n=n||"=",null===e&&(e=void 0),"object"==typeof e?Object.keys(e).map((function(a){var t=encodeURIComponent(oe(a))+n;return Array.isArray(e[a])?e[a].map((function(e){return t+encodeURIComponent(oe(e))})).join(i):t+encodeURIComponent(oe(e[a]))})).join(i):a?encodeURIComponent(oe(a))+n+encodeURIComponent(oe(e)):""},se=Y((function(e,i){i.decode=i.parse=le,i.encode=i.stringify=re})),ue=Te,me=function(e,i){return Te(e,!1,!0).resolve(i)},ke=function(e,i){return e?Te(e,!1,!0).resolveObject(i):i},ve=function(e){ie(e)&&(e=Te(e));return e instanceof pe?e.format():pe.prototype.format.call(e)},ce=pe;function pe(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}var Ne=/^([a-z0-9.+-]+:)/i,he=/:[0-9]*$/,fe=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,be=["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","\t"]),ye=["'"].concat(be),Se=["%","/","?",";","#"].concat(ye),ge=["/","?","#"],De=/^[+a-z0-9A-Z_-]{0,63}$/,Ve=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Fe={javascript:!0,"javascript:":!0},Ae={javascript:!0,"javascript:":!0},_e={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Te(e,i,n){if(e&&ne(e)&&e instanceof pe)return e;var a=new pe;return a.parse(e,i,n),a}pe.prototype.parse=function(e,i,n){if(!ie(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e);var a=e.indexOf("?"),t=-1!==a&&a<e.indexOf("#")?"?":"#",d=e.split(t);d[0]=d[0].replace(/\\/g,"/");var l=e=d.join(t);if(l=l.trim(),!n&&1===e.split("#").length){var o=fe.exec(l);if(o)return this.path=l,this.href=l,this.pathname=o[1],o[2]?(this.search=o[2],this.query=i?se.parse(this.search.substr(1)):this.search.substr(1)):i&&(this.search="",this.query={}),this}var r=Ne.exec(l);if(r){var s=(r=r[0]).toLowerCase();this.protocol=s,l=l.substr(r.length)}if(n||r||l.match(/^\/\/[^@\/]+@[^@\/]+/)){var u="//"===l.substr(0,2);!u||r&&Ae[r]||(l=l.substr(2),this.slashes=!0)}if(!Ae[r]&&(u||r&&!_e[r])){for(var m,k,v=-1,c=0;c<ge.length;c++){-1!==(p=l.indexOf(ge[c]))&&(-1===v||p<v)&&(v=p)}-1!==(k=-1===v?l.lastIndexOf("@"):l.lastIndexOf("@",v))&&(m=l.slice(0,k),l=l.slice(k+1),this.auth=decodeURIComponent(m)),v=-1;for(c=0;c<Se.length;c++){var p;-1!==(p=l.indexOf(Se[c]))&&(-1===v||p<v)&&(v=p)}-1===v&&(v=l.length),this.host=l.slice(0,v),l=l.slice(v),this.parseHost(),this.hostname=this.hostname||"";var N="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!N)for(var h=this.hostname.split(/\./),f=(c=0,h.length);c<f;c++){var b=h[c];if(b&&!b.match(De)){for(var y="",S=0,g=b.length;S<g;S++)b.charCodeAt(S)>127?y+="x":y+=b[S];if(!y.match(De)){var D=h.slice(0,c),V=h.slice(c+1),F=b.match(Ve);F&&(D.push(F[1]),V.unshift(F[2])),V.length&&(l="/"+V.join(".")+l),this.hostname=D.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),N||(this.hostname=ee.toASCII(this.hostname));var A=this.port?":"+this.port:"",_=this.hostname||"";this.host=_+A,this.href+=this.host,N&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==l[0]&&(l="/"+l))}if(!Fe[s])for(c=0,f=ye.length;c<f;c++){var T=ye[c];if(-1!==l.indexOf(T)){var I=encodeURIComponent(T);I===T&&(I=escape(T)),l=l.split(T).join(I)}}var w=l.indexOf("#");-1!==w&&(this.hash=l.substr(w),l=l.slice(0,w));var q=l.indexOf("?");if(-1!==q?(this.search=l.substr(q),this.query=l.substr(q+1),i&&(this.query=se.parse(this.query)),l=l.slice(0,q)):i&&(this.search="",this.query={}),l&&(this.pathname=l),_e[s]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){A=this.pathname||"";var x=this.search||"";this.path=A+x}return this.href=this.format(),this},pe.prototype.format=function(){var e=this.auth||"";e&&(e=(e=encodeURIComponent(e)).replace(/%3A/i,":"),e+="@");var i=this.protocol||"",n=this.pathname||"",a=this.hash||"",t=!1,d="";this.host?t=e+this.host:this.hostname&&(t=e+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(t+=":"+this.port)),this.query&&ne(this.query)&&Object.keys(this.query).length&&(d=se.stringify(this.query));var l=this.search||d&&"?"+d||"";return i&&":"!==i.substr(-1)&&(i+=":"),this.slashes||(!i||_e[i])&&!1!==t?(t="//"+(t||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):t||(t=""),a&&"#"!==a.charAt(0)&&(a="#"+a),l&&"?"!==l.charAt(0)&&(l="?"+l),i+t+(n=n.replace(/[?#]/g,(function(e){return encodeURIComponent(e)})))+(l=l.replace("#","%23"))+a},pe.prototype.resolve=function(e){return this.resolveObject(Te(e,!1,!0)).format()},pe.prototype.resolveObject=function(e){if(ie(e)){var i=new pe;i.parse(e,!1,!0),e=i}for(var n=new pe,a=Object.keys(this),t=0;t<a.length;t++){var d=a[t];n[d]=this[d]}if(n.hash=e.hash,""===e.href)return n.href=n.format(),n;if(e.slashes&&!e.protocol){for(var l=Object.keys(e),o=0;o<l.length;o++){var r=l[o];"protocol"!==r&&(n[r]=e[r])}return _e[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n}if(e.protocol&&e.protocol!==n.protocol){if(!_e[e.protocol]){for(var s=Object.keys(e),u=0;u<s.length;u++){var m=s[u];n[m]=e[m]}return n.href=n.format(),n}if(n.protocol=e.protocol,e.host||Ae[e.protocol])n.pathname=e.pathname;else{for(var k=(e.pathname||"").split("/");k.length&&!(e.host=k.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==k[0]&&k.unshift(""),k.length<2&&k.unshift(""),n.pathname=k.join("/")}if(n.search=e.search,n.query=e.query,n.host=e.host||"",n.auth=e.auth,n.hostname=e.hostname||e.host,n.port=e.port,n.pathname||n.search){var v=n.pathname||"",c=n.search||"";n.path=v+c}return n.slashes=n.slashes||e.slashes,n.href=n.format(),n}var p=n.pathname&&"/"===n.pathname.charAt(0),N=e.host||e.pathname&&"/"===e.pathname.charAt(0),h=N||p||n.host&&e.pathname,f=h,b=n.pathname&&n.pathname.split("/")||[],y=(k=e.pathname&&e.pathname.split("/")||[],n.protocol&&!_e[n.protocol]);if(y&&(n.hostname="",n.port=null,n.host&&(""===b[0]?b[0]=n.host:b.unshift(n.host)),n.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===k[0]?k[0]=e.host:k.unshift(e.host)),e.host=null),h=h&&(""===k[0]||""===b[0])),N)n.host=e.host||""===e.host?e.host:n.host,n.hostname=e.hostname||""===e.hostname?e.hostname:n.hostname,n.search=e.search,n.query=e.query,b=k;else if(k.length)b||(b=[]),b.pop(),b=b.concat(k),n.search=e.search,n.query=e.query;else if(!te(e.search)){if(y)n.hostname=n.host=b.shift(),(F=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@"))&&(n.auth=F.shift(),n.host=n.hostname=F.shift());return n.search=e.search,n.query=e.query,ae(n.pathname)&&ae(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!b.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var S=b.slice(-1)[0],g=(n.host||e.host||b.length>1)&&("."===S||".."===S)||""===S,D=0,V=b.length;V>=0;V--)"."===(S=b[V])?b.splice(V,1):".."===S?(b.splice(V,1),D++):D&&(b.splice(V,1),D--);if(!h&&!f)for(;D--;D)b.unshift("..");!h||""===b[0]||b[0]&&"/"===b[0].charAt(0)||b.unshift(""),g&&"/"!==b.join("/").substr(-1)&&b.push("");var F,A=""===b[0]||b[0]&&"/"===b[0].charAt(0);y&&(n.hostname=n.host=A?"":b.length?b.shift():"",(F=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@"))&&(n.auth=F.shift(),n.host=n.hostname=F.shift()));return(h=h||n.host&&b.length)&&!A&&b.unshift(""),b.length?n.pathname=b.join("/"):(n.pathname=null,n.path=null),ae(n.pathname)&&ae(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=e.auth||n.auth,n.slashes=n.slashes||e.slashes,n.href=n.format(),n},pe.prototype.parseHost=function(){var e=this.host,i=he.exec(e);i&&(":"!==(i=i[0])&&(this.port=i.substr(1)),e=e.substr(0,e.length-i.length)),e&&(this.hostname=e)};var Ie={parse:ue,resolve:me,resolveObject:ke,format:ve,Url:ce};const we=l.default.Readable,qe=Symbol("buffer"),xe=Symbol("type");class Ce{constructor(){this[xe]="";const e=arguments[0],i=arguments[1],n=[];let a=0;if(e){const i=e,t=Number(i.length);for(let e=0;e<t;e++){const t=i[e];let d;d=t instanceof Buffer?t:ArrayBuffer.isView(t)?Buffer.from(t.buffer,t.byteOffset,t.byteLength):t instanceof ArrayBuffer?Buffer.from(t):t instanceof Ce?t[qe]:Buffer.from("string"==typeof t?t:String(t)),a+=d.length,n.push(d)}}this[qe]=Buffer.concat(n);let t=i&&void 0!==i.type&&String(i.type).toLowerCase();t&&!/[^\u0020-\u007E]/.test(t)&&(this[xe]=t)}get size(){return this[qe].length}get type(){return this[xe]}text(){return Promise.resolve(this[qe].toString())}arrayBuffer(){const e=this[qe],i=e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength);return Promise.resolve(i)}stream(){const e=new we;return e._read=function(){},e.push(this[qe]),e.push(null),e}toString(){return"[object Blob]"}slice(){const e=this.size,i=arguments[0],n=arguments[1];let a,t;a=void 0===i?0:i<0?Math.max(e+i,0):Math.min(i,e),t=void 0===n?e:n<0?Math.max(e+n,0):Math.min(n,e);const d=Math.max(t-a,0),l=this[qe].slice(a,a+d),o=new Ce([],{type:arguments[2]});return o[qe]=l,o}}function Oe(e,i,n){Error.call(this,e),this.message=e,this.type=i,n&&(this.code=this.errno=n.code),Error.captureStackTrace(this,this.constructor)}let Pe;Object.defineProperties(Ce.prototype,{size:{enumerable:!0},type:{enumerable:!0},slice:{enumerable:!0}}),Object.defineProperty(Ce.prototype,Symbol.toStringTag,{value:"Blob",writable:!1,enumerable:!1,configurable:!0}),Oe.prototype=Object.create(Error.prototype),Oe.prototype.constructor=Oe,Oe.prototype.name="FetchError";try{Pe=__webpack_require__(877).convert}catch(e){}const je=Symbol("Body internals"),Ue=l.default.PassThrough;function Be(e){var i=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=n.size;let t=void 0===a?0:a;var d=n.timeout;let o=void 0===d?0:d;null==e?e=null:Re(e)?e=Buffer.from(e.toString()):ze(e)||Buffer.isBuffer(e)||("[object ArrayBuffer]"===Object.prototype.toString.call(e)?e=Buffer.from(e):ArrayBuffer.isView(e)?e=Buffer.from(e.buffer,e.byteOffset,e.byteLength):e instanceof l.default||(e=Buffer.from(String(e)))),this[je]={body:e,disturbed:!1,error:null},this.size=t,this.timeout=o,e instanceof l.default&&e.on("error",(function(e){const n="AbortError"===e.name?e:new Oe(`Invalid response body while trying to fetch ${i.url}: ${e.message}`,"system",e);i[je].error=n}))}function Ee(){var e=this;if(this[je].disturbed)return Be.Promise.reject(new TypeError(`body used already for: ${this.url}`));if(this[je].disturbed=!0,this[je].error)return Be.Promise.reject(this[je].error);let i=this.body;if(null===i)return Be.Promise.resolve(Buffer.alloc(0));if(ze(i)&&(i=i.stream()),Buffer.isBuffer(i))return Be.Promise.resolve(i);if(!(i instanceof l.default))return Be.Promise.resolve(Buffer.alloc(0));let n=[],a=0,t=!1;return new Be.Promise((function(d,l){let o;e.timeout&&(o=setTimeout((function(){t=!0,l(new Oe(`Response timeout while trying to fetch ${e.url} (over ${e.timeout}ms)`,"body-timeout"))}),e.timeout)),i.on("error",(function(i){"AbortError"===i.name?(t=!0,l(i)):l(new Oe(`Invalid response body while trying to fetch ${e.url}: ${i.message}`,"system",i))})),i.on("data",(function(i){if(!t&&null!==i){if(e.size&&a+i.length>e.size)return t=!0,void l(new Oe(`content size at ${e.url} over limit: ${e.size}`,"max-size"));a+=i.length,n.push(i)}})),i.on("end",(function(){if(!t){clearTimeout(o);try{d(Buffer.concat(n,a))}catch(i){l(new Oe(`Could not create Buffer from response body for ${e.url}: ${i.message}`,"system",i))}}}))}))}function Re(e){return"object"==typeof e&&"function"==typeof e.append&&"function"==typeof e.delete&&"function"==typeof e.get&&"function"==typeof e.getAll&&"function"==typeof e.has&&"function"==typeof e.set&&("URLSearchParams"===e.constructor.name||"[object URLSearchParams]"===Object.prototype.toString.call(e)||"function"==typeof e.sort)}function ze(e){return"object"==typeof e&&"function"==typeof e.arrayBuffer&&"string"==typeof e.type&&"function"==typeof e.stream&&"function"==typeof e.constructor&&"string"==typeof e.constructor.name&&/^(Blob|File)$/.test(e.constructor.name)&&/^(Blob|File)$/.test(e[Symbol.toStringTag])}function Me(e){let i,n,a=e.body;if(e.bodyUsed)throw new Error("cannot clone body after it is used");return a instanceof l.default&&"function"!=typeof a.getBoundary&&(i=new Ue,n=new Ue,a.pipe(i),a.pipe(n),e[je].body=i,a=n),a}function Le(e){return null===e?null:"string"==typeof e?"text/plain;charset=UTF-8":Re(e)?"application/x-www-form-urlencoded;charset=UTF-8":ze(e)?e.type||null:Buffer.isBuffer(e)||"[object ArrayBuffer]"===Object.prototype.toString.call(e)||ArrayBuffer.isView(e)?null:"function"==typeof e.getBoundary?`multipart/form-data;boundary=${e.getBoundary()}`:e instanceof l.default?null:"text/plain;charset=UTF-8"}function We(e){const i=e.body;return null===i?0:ze(i)?i.size:Buffer.isBuffer(i)?i.length:i&&"function"==typeof i.getLengthSync&&(i._lengthRetrievers&&0==i._lengthRetrievers.length||i.hasKnownLength&&i.hasKnownLength())?i.getLengthSync():null}Be.prototype={get body(){return this[je].body},get bodyUsed(){return this[je].disturbed},arrayBuffer(){return Ee.call(this).then((function(e){return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}))},blob(){let e=this.headers&&this.headers.get("content-type")||"";return Ee.call(this).then((function(i){return Object.assign(new Ce([],{type:e.toLowerCase()}),{[qe]:i})}))},json(){var e=this;return Ee.call(this).then((function(i){try{return JSON.parse(i.toString())}catch(i){return Be.Promise.reject(new Oe(`invalid json response body at ${e.url} reason: ${i.message}`,"invalid-json"))}}))},text(){return Ee.call(this).then((function(e){return e.toString()}))},buffer(){return Ee.call(this)},textConverted(){var e=this;return Ee.call(this).then((function(i){return function(e,i){if("function"!=typeof Pe)throw new Error("The package `encoding` must be installed to use the textConverted() function");const n=i.get("content-type");let a,t,d="utf-8";n&&(a=/charset=([^;]*)/i.exec(n));t=e.slice(0,1024).toString(),!a&&t&&(a=/<meta.+?charset=(['"])(.+?)\1/i.exec(t));!a&&t&&(a=/<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(t),a||(a=/<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(t),a&&a.pop()),a&&(a=/charset=(.*)/i.exec(a.pop())));!a&&t&&(a=/<\?xml.+?encoding=(['"])(.+?)\1/i.exec(t));a&&(d=a.pop(),"gb2312"!==d&&"gbk"!==d||(d="gb18030"));return Pe(e,"UTF-8",d).toString()}(i,e.headers)}))}},Object.defineProperties(Be.prototype,{body:{enumerable:!0},bodyUsed:{enumerable:!0},arrayBuffer:{enumerable:!0},blob:{enumerable:!0},json:{enumerable:!0},text:{enumerable:!0}}),Be.mixIn=function(e){for(const i of Object.getOwnPropertyNames(Be.prototype))if(!(i in e)){const n=Object.getOwnPropertyDescriptor(Be.prototype,i);Object.defineProperty(e,i,n)}},Be.Promise=global.Promise;const Qe=/[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/,He=/[^\t\x20-\x7e\x80-\xff]/;function Ge(e){if(e=`${e}`,Qe.test(e)||""===e)throw new TypeError(`${e} is not a legal HTTP header name`)}function $e(e){if(e=`${e}`,He.test(e))throw new TypeError(`${e} is not a legal HTTP header value`)}function Ke(e,i){i=i.toLowerCase();for(const n in e)if(n.toLowerCase()===i)return n}const Je=Symbol("map");class Ze{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;if(this[Je]=Object.create(null),e instanceof Ze){const i=e.raw(),n=Object.keys(i);for(const e of n)for(const n of i[e])this.append(e,n)}else if(null==e);else{if("object"!=typeof e)throw new TypeError("Provided initializer must be an object");{const i=e[Symbol.iterator];if(null!=i){if("function"!=typeof i)throw new TypeError("Header pairs must be iterable");const n=[];for(const i of e){if("object"!=typeof i||"function"!=typeof i[Symbol.iterator])throw new TypeError("Each header pair must be iterable");n.push(Array.from(i))}for(const e of n){if(2!==e.length)throw new TypeError("Each header pair must be a name/value tuple");this.append(e[0],e[1])}}else for(const i of Object.keys(e)){const n=e[i];this.append(i,n)}}}}get(e){Ge(e=`${e}`);const i=Ke(this[Je],e);return void 0===i?null:this[Je][i].join(", ")}forEach(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,n=Ye(this),a=0;for(;a<n.length;){var t=n[a];const d=t[0],l=t[1];e.call(i,l,d,this),n=Ye(this),a++}}set(e,i){i=`${i}`,Ge(e=`${e}`),$e(i);const n=Ke(this[Je],e);this[Je][void 0!==n?n:e]=[i]}append(e,i){i=`${i}`,Ge(e=`${e}`),$e(i);const n=Ke(this[Je],e);void 0!==n?this[Je][n].push(i):this[Je][e]=[i]}has(e){return Ge(e=`${e}`),void 0!==Ke(this[Je],e)}delete(e){Ge(e=`${e}`);const i=Ke(this[Je],e);void 0!==i&&delete this[Je][i]}raw(){return this[Je]}keys(){return ei(this,"key")}values(){return ei(this,"value")}[Symbol.iterator](){return ei(this,"key+value")}}function Ye(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"key+value";const n=Object.keys(e[Je]).sort();return n.map("key"===i?function(e){return e.toLowerCase()}:"value"===i?function(i){return e[Je][i].join(", ")}:function(i){return[i.toLowerCase(),e[Je][i].join(", ")]})}Ze.prototype.entries=Ze.prototype[Symbol.iterator],Object.defineProperty(Ze.prototype,Symbol.toStringTag,{value:"Headers",writable:!1,enumerable:!1,configurable:!0}),Object.defineProperties(Ze.prototype,{get:{enumerable:!0},forEach:{enumerable:!0},set:{enumerable:!0},append:{enumerable:!0},has:{enumerable:!0},delete:{enumerable:!0},keys:{enumerable:!0},values:{enumerable:!0},entries:{enumerable:!0}});const Xe=Symbol("internal");function ei(e,i){const n=Object.create(ii);return n[Xe]={target:e,kind:i,index:0},n}const ii=Object.setPrototypeOf({next(){if(!this||Object.getPrototypeOf(this)!==ii)throw new TypeError("Value of `this` is not a HeadersIterator");var e=this[Xe];const i=e.target,n=e.kind,a=e.index,t=Ye(i,n);return a>=t.length?{value:void 0,done:!0}:(this[Xe].index=a+1,{value:t[a],done:!1})}},Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));function ni(e){const i=Object.assign({__proto__:null},e[Je]),n=Ke(e[Je],"Host");return void 0!==n&&(i[n]=i[n][0]),i}Object.defineProperty(ii,Symbol.toStringTag,{value:"HeadersIterator",writable:!1,enumerable:!1,configurable:!0});const ai=Symbol("Response internals"),ti=o.default.STATUS_CODES;class di{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Be.call(this,e,i);const n=i.status||200,a=new Ze(i.headers);if(null!=e&&!a.has("Content-Type")){const i=Le(e);i&&a.append("Content-Type",i)}this[ai]={url:i.url,status:n,statusText:i.statusText||ti[n],headers:a,counter:i.counter}}get url(){return this[ai].url||""}get status(){return this[ai].status}get ok(){return this[ai].status>=200&&this[ai].status<300}get redirected(){return this[ai].counter>0}get statusText(){return this[ai].statusText}get headers(){return this[ai].headers}clone(){return new di(Me(this),{url:this.url,status:this.status,statusText:this.statusText,headers:this.headers,ok:this.ok,redirected:this.redirected})}}Be.mixIn(di.prototype),Object.defineProperties(di.prototype,{url:{enumerable:!0},status:{enumerable:!0},ok:{enumerable:!0},redirected:{enumerable:!0},statusText:{enumerable:!0},headers:{enumerable:!0},clone:{enumerable:!0}}),Object.defineProperty(di.prototype,Symbol.toStringTag,{value:"Response",writable:!1,enumerable:!1,configurable:!0});const li=Symbol("Request internals"),oi=Ie.parse,ri=Ie.format,si="destroy"in l.default.Readable.prototype;function ui(e){return"object"==typeof e&&"object"==typeof e[li]}class mi{constructor(e){let i,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};ui(e)?i=oi(e.url):(i=e&&e.href?oi(e.href):oi(`${e}`),e={});let a=n.method||e.method||"GET";if(a=a.toUpperCase(),(null!=n.body||ui(e)&&null!==e.body)&&("GET"===a||"HEAD"===a))throw new TypeError("Request with GET/HEAD method cannot have body");let t=null!=n.body?n.body:ui(e)&&null!==e.body?Me(e):null;Be.call(this,t,{timeout:n.timeout||e.timeout||0,size:n.size||e.size||0});const d=new Ze(n.headers||e.headers||{});if(null!=t&&!d.has("Content-Type")){const e=Le(t);e&&d.append("Content-Type",e)}let l=ui(e)?e.signal:null;if("signal"in n&&(l=n.signal),null!=l&&!function(e){const i=e&&"object"==typeof e&&Object.getPrototypeOf(e);return!(!i||"AbortSignal"!==i.constructor.name)}(l))throw new TypeError("Expected signal to be an instanceof AbortSignal");this[li]={method:a,redirect:n.redirect||e.redirect||"follow",headers:d,parsedURL:i,signal:l},this.follow=void 0!==n.follow?n.follow:void 0!==e.follow?e.follow:20,this.compress=void 0!==n.compress?n.compress:void 0===e.compress||e.compress,this.counter=n.counter||e.counter||0,this.agent=n.agent||e.agent}get method(){return this[li].method}get url(){return ri(this[li].parsedURL)}get headers(){return this[li].headers}get redirect(){return this[li].redirect}get signal(){return this[li].signal}clone(){return new mi(this)}}function ki(e){Error.call(this,e),this.type="aborted",this.message=e,Error.captureStackTrace(this,this.constructor)}Be.mixIn(mi.prototype),Object.defineProperty(mi.prototype,Symbol.toStringTag,{value:"Request",writable:!1,enumerable:!1,configurable:!0}),Object.defineProperties(mi.prototype,{method:{enumerable:!0},url:{enumerable:!0},headers:{enumerable:!0},redirect:{enumerable:!0},clone:{enumerable:!0},signal:{enumerable:!0}}),ki.prototype=Object.create(Error.prototype),ki.prototype.constructor=ki,ki.prototype.name="AbortError";const vi=l.default.PassThrough,ci=Ie.resolve;function pi(e,i){if(!pi.Promise)throw new Error("native promise missing, set fetch.Promise to your favorite alternative");return Be.Promise=pi.Promise,new pi.Promise((function(n,a){const t=new mi(e,i),d=function(e){const i=e[li].parsedURL,n=new Ze(e[li].headers);if(n.has("Accept")||n.set("Accept","*/*"),!i.protocol||!i.hostname)throw new TypeError("Only absolute URLs are supported");if(!/^https?:$/.test(i.protocol))throw new TypeError("Only HTTP(S) protocols are supported");if(e.signal&&e.body instanceof l.default.Readable&&!si)throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");let a=null;if(null==e.body&&/^(POST|PUT)$/i.test(e.method)&&(a="0"),null!=e.body){const i=We(e);"number"==typeof i&&(a=String(i))}a&&n.set("Content-Length",a),n.has("User-Agent")||n.set("User-Agent","node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"),e.compress&&!n.has("Accept-Encoding")&&n.set("Accept-Encoding","gzip,deflate");let t=e.agent;return"function"==typeof t&&(t=t(i)),n.has("Connection")||t||n.set("Connection","close"),Object.assign({},i,{method:e.method,headers:ni(n),agent:t})}(t),u=("https:"===d.protocol?r.default:o.default).request,m=t.signal;let k=null;const v=function(){let e=new ki("The user aborted a request.");a(e),t.body&&t.body instanceof l.default.Readable&&t.body.destroy(e),k&&k.body&&k.body.emit("error",e)};if(m&&m.aborted)return void v();const c=function(){v(),h()},p=u(d);let N;function h(){p.abort(),m&&m.removeEventListener("abort",c),clearTimeout(N)}m&&m.addEventListener("abort",c),t.timeout&&p.once("socket",(function(e){N=setTimeout((function(){a(new Oe(`network timeout at: ${t.url}`,"request-timeout")),h()}),t.timeout)})),p.on("error",(function(e){a(new Oe(`request to ${t.url} failed, reason: ${e.message}`,"system",e)),h()})),p.on("response",(function(e){clearTimeout(N);const i=function(e){const i=new Ze;for(const n of Object.keys(e))if(!Qe.test(n))if(Array.isArray(e[n]))for(const a of e[n])He.test(a)||(void 0===i[Je][n]?i[Je][n]=[a]:i[Je][n].push(a));else He.test(e[n])||(i[Je][n]=[e[n]]);return i}(e.headers);if(pi.isRedirect(e.statusCode)){const d=i.get("Location"),l=null===d?null:ci(t.url,d);switch(t.redirect){case"error":return a(new Oe(`uri requested responds with a redirect, redirect mode is set to error: ${t.url}`,"no-redirect")),void h();case"manual":if(null!==l)try{i.set("Location",l)}catch(e){a(e)}break;case"follow":if(null===l)break;if(t.counter>=t.follow)return a(new Oe(`maximum redirect reached at: ${t.url}`,"max-redirect")),void h();const d={headers:new Ze(t.headers),follow:t.follow,counter:t.counter+1,agent:t.agent,compress:t.compress,method:t.method,body:t.body,signal:t.signal,timeout:t.timeout,size:t.size};return 303!==e.statusCode&&t.body&&null===We(t)?(a(new Oe("Cannot follow redirect with body being a readable stream","unsupported-redirect")),void h()):(303!==e.statusCode&&(301!==e.statusCode&&302!==e.statusCode||"POST"!==t.method)||(d.method="GET",d.body=void 0,d.headers.delete("content-length")),n(pi(new mi(l,d))),void h())}}e.once("end",(function(){m&&m.removeEventListener("abort",c)}));let d=e.pipe(new vi);const l={url:t.url,status:e.statusCode,statusText:e.statusMessage,headers:i,size:t.size,timeout:t.timeout,counter:t.counter},o=i.get("Content-Encoding");if(!t.compress||"HEAD"===t.method||null===o||204===e.statusCode||304===e.statusCode)return k=new di(d,l),void n(k);const r={flush:s.default.Z_SYNC_FLUSH,finishFlush:s.default.Z_SYNC_FLUSH};if("gzip"==o||"x-gzip"==o)return d=d.pipe(s.default.createGunzip(r)),k=new di(d,l),void n(k);if("deflate"!=o&&"x-deflate"!=o){if("br"==o&&"function"==typeof s.default.createBrotliDecompress)return d=d.pipe(s.default.createBrotliDecompress()),k=new di(d,l),void n(k);k=new di(d,l),n(k)}else{e.pipe(new vi).once("data",(function(e){d=8==(15&e[0])?d.pipe(s.default.createInflate()):d.pipe(s.default.createInflateRaw()),k=new di(d,l),n(k)}))}})),function(e,i){const n=i.body;null===n?e.end():ze(n)?n.stream().pipe(e):Buffer.isBuffer(n)?(e.write(n),e.end()):n.pipe(e)}(p,t)}))}pi.isRedirect=function(e){return 301===e||302===e||303===e||307===e||308===e},pi.Promise=global.Promise;var Ni=Object.freeze({__proto__:null,default:pi,Headers:Ze,Request:mi,Response:di,FetchError:Oe}),hi=Z(X),fi=Z(Ni);function bi(e){return e&&e.default||e}var yi,Si,gi,Di,Vi,Fi,Ai,_i=J.fetch=J.fetch||("undefined"==typeof process?bi(hi):function(e,i){return bi(fi)(String(e).replace(/^\/\//g,"https://"),i)});class Ti extends Error{constructor(e,i){super(`${Ti.extractMessage(e)}: ${JSON.stringify({response:e,request:i})}`),Object.setPrototypeOf(this,Ti.prototype),this.response=e,this.request=i,"function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,Ti)}static extractMessage(e){var i,n,a;try{return null!==(a=null===(n=null===(i=e.errors)||void 0===i?void 0:i[0])||void 0===n?void 0:n.message)&&void 0!==a?a:`GraphQL Error (Code: ${e.status})`}catch(i){return`GraphQL Error (Code: ${e.status})`}}}class Ii{constructor(e,i){this.url=e,this.options=i||{}}rawRequest(e,i,n){return m(this,void 0,void 0,(function*(){const a=this.options,{headers:t}=a,d=u(a,["headers"]),l=JSON.stringify({query:e,variables:i}),o=yield _i(this.url,Object.assign({method:"POST",headers:Object.assign(Object.assign(Object.assign({},"string"==typeof l?{"Content-Type":"application/json"}:{}),qi(t)),qi(n)),body:l},d)),r=yield wi(o);if("string"!=typeof r&&o.ok&&!r.errors&&r.data)return Object.assign(Object.assign({},r),{headers:o.headers,status:o.status});throw q(new Ti(Object.assign(Object.assign({},"string"==typeof r?{error:r}:r),{status:o.status,headers:o.headers}),{query:e,variables:i}))}))}request(e,i,n){return m(this,void 0,void 0,(function*(){const a=this.options,{headers:t}=a,d=u(a,["headers"]),l="string"==typeof e?e:z(e),o=JSON.stringify({query:l,variables:i}),r=yield _i(this.url,Object.assign({method:"POST",headers:Object.assign(Object.assign(Object.assign({},"string"==typeof o?{"Content-Type":"application/json"}:{}),qi(t)),qi(n)),body:o},d)),s=yield wi(r);if("string"!=typeof s&&r.ok&&!s.errors&&s.data)return s.data;throw new Ti(Object.assign(Object.assign({},"string"==typeof s?{error:s}:s),{status:r.status,headers:r.headers}),{query:l,variables:i})}))}setHeaders(e){return this.options.headers=e,this}setHeader(e,i){const{headers:n}=this.options;return n?n[e]=i:this.options.headers={[e]:i},this}}function wi(e){const i=e.headers.get("Content-Type");return i&&i.startsWith("application/json")?e.json():e.text()}function qi(e){let i={};return e&&("undefined"!=typeof Headers&&e instanceof Headers?i=function(e){const i={};return e.forEach(((e,n)=>{i[n]=e})),i}(e):Array.isArray(e)?e.forEach((([e,n])=>{i[e]=n})):i=e),i}!function(e){e.Blocks="blocks",e.Duplicate="duplicate",e.Related="related"}(yi||(yi={})),function(e){e.CreatedAt="createdAt",e.UpdatedAt="updatedAt"}(Si||(Si={})),function(e){e.ExcludeTrash="excludeTrash",e.IncludeTrash="includeTrash",e.TrashOnly="trashOnly"}(gi||(gi={})),function(e){e.AnalyticsWelcomeDismissed="analyticsWelcomeDismissed",e.CanPlaySnake="canPlaySnake",e.CompletedOnboarding="completedOnboarding",e.CycleWelcomeDismissed="cycleWelcomeDismissed",e.DesktopDownloadToastDismissed="desktopDownloadToastDismissed",e.DesktopInstalled="desktopInstalled",e.EmptyActiveIssuesDismissed="emptyActiveIssuesDismissed",e.EmptyBacklogDismissed="emptyBacklogDismissed",e.EmptyCustomViewsDismissed="emptyCustomViewsDismissed",e.EmptyMyIssuesDismissed="emptyMyIssuesDismissed",e.FigmaPromptDismissed="figmaPromptDismissed",e.ListSelectionTip="listSelectionTip",e.MigrateThemePreference="migrateThemePreference",e.ProjectWelcomeDismissed="projectWelcomeDismissed"}(Di||(Di={})),function(e){e.Clear="clear",e.Decr="decr",e.Incr="incr",e.Lock="lock"}(Vi||(Vi={})),function(e){e.Organization="organization",e.User="user"}(Fi||(Fi={})),function(e){e.ActiveIssues="activeIssues",e.AllIssues="allIssues",e.Backlog="backlog",e.Board="board",e.CompletedCycle="completedCycle",e.CustomView="customView",e.Cycle="cycle",e.Inbox="inbox",e.Label="label",e.MyIssues="myIssues",e.Project="project",e.Projects="projects",e.Roadmap="roadmap",e.UserProfile="userProfile"}(Ai||(Ai={}));const xi={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Template"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Template"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"templateData"}},{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"type"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"team"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},Ci={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"User"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"User"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"avatarUrl"}},{kind:"Field",name:{kind:"Name",value:"createdIssueCount"}},{kind:"Field",name:{kind:"Name",value:"disableReason"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"lastSeen"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"displayName"}},{kind:"Field",name:{kind:"Name",value:"email"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"inviteHash"}},{kind:"Field",name:{kind:"Name",value:"active"}},{kind:"Field",name:{kind:"Name",value:"admin"}}]}}]},Oi={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UserAccount"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"UserAccount"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"service"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"email"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"users"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"User"}}]}}]}},...Ci.definitions]},Pi={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SyncResponse"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"SyncResponse"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"delta"}},{kind:"Field",name:{kind:"Name",value:"state"}},{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"subscribedSyncGroups"}},{kind:"Field",name:{kind:"Name",value:"databaseVersion"}}]}}]},ji={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ArchiveResponse"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ArchiveResponse"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"archive"}},{kind:"Field",name:{kind:"Name",value:"totalCount"}},{kind:"Field",name:{kind:"Name",value:"databaseVersion"}}]}}]},Ui={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"DependencyResponse"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"DependencyResponse"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dependencies"}}]}}]},Bi={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"GithubRepo"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"GithubRepo"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"name"}}]}}]},Ei={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"GithubOrg"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"GithubOrg"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"repositories"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"GithubRepo"}}]}},{kind:"Field",name:{kind:"Name",value:"login"}},{kind:"Field",name:{kind:"Name",value:"name"}}]}},...Bi.definitions]},Ri={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"GithubOAuthTokenPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"GithubOAuthTokenPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizations"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"GithubOrg"}}]}},{kind:"Field",name:{kind:"Name",value:"token"}}]}},...Ei.definitions]},zi={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"AuthorizedApplication"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"AuthorizedApplication"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"imageUrl"}},{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"developer"}},{kind:"Field",name:{kind:"Name",value:"appId"}},{kind:"Field",name:{kind:"Name",value:"clientId"}},{kind:"Field",name:{kind:"Name",value:"scope"}},{kind:"Field",name:{kind:"Name",value:"developerUrl"}}]}}]},Mi={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UserAuthorizedApplication"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"UserAuthorizedApplication"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"imageUrl"}},{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"developer"}},{kind:"Field",name:{kind:"Name",value:"clientId"}},{kind:"Field",name:{kind:"Name",value:"developerUrl"}},{kind:"Field",name:{kind:"Name",value:"isAuthorized"}}]}}]},Li={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"GoogleSheetsSettings"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"GoogleSheetsSettings"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"sheetId"}},{kind:"Field",name:{kind:"Name",value:"spreadsheetId"}},{kind:"Field",name:{kind:"Name",value:"spreadsheetUrl"}},{kind:"Field",name:{kind:"Name",value:"updatedIssuesAt"}}]}}]},Wi={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SentrySettings"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"SentrySettings"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizationSlug"}}]}}]},Qi={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SlackPostSettings"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"SlackPostSettings"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"channel"}},{kind:"Field",name:{kind:"Name",value:"channelId"}},{kind:"Field",name:{kind:"Name",value:"configurationUrl"}}]}}]},Hi={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ZendeskSettings"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ZendeskSettings"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"botUserId"}},{kind:"Field",name:{kind:"Name",value:"url"}},{kind:"Field",name:{kind:"Name",value:"subdomain"}}]}}]},Gi={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IntegrationSettings"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IntegrationSettings"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"googleSheets"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"GoogleSheetsSettings"}}]}},{kind:"Field",name:{kind:"Name",value:"sentry"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SentrySettings"}}]}},{kind:"Field",name:{kind:"Name",value:"slackPost"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SlackPostSettings"}}]}},{kind:"Field",name:{kind:"Name",value:"slackProjectPost"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SlackPostSettings"}}]}},{kind:"Field",name:{kind:"Name",value:"zendesk"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ZendeskSettings"}}]}}]}},...Li.definitions,...Wi.definitions,...Qi.definitions,...Hi.definitions]},$i={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UserSettings"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"UserSettings"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"unsubscribedFrom"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"notificationPreferences"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},Ki={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Subscription"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Subscription"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"canceledAt"}},{kind:"Field",name:{kind:"Name",value:"nextBillingAt"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"seats"}},{kind:"Field",name:{kind:"Name",value:"pendingChangeType"}},{kind:"Field",name:{kind:"Name",value:"type"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]},Ji={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ApiKey"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ApiKey"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"label"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]},Zi={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"PageInfo"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PageInfo"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"startCursor"}},{kind:"Field",name:{kind:"Name",value:"endCursor"}},{kind:"Field",name:{kind:"Name",value:"hasPreviousPage"}},{kind:"Field",name:{kind:"Name",value:"hasNextPage"}}]}}]},Yi={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ApiKeyConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ApiKeyConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ApiKey"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...Ji.definitions,...Zi.definitions]},Xi={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ApiKeyPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ApiKeyPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"apiKey"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ApiKey"}}]}},{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}},...Ji.definitions]},en={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ArchivePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ArchivePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},nn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Attachment"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Attachment"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"subtitle"}},{kind:"Field",name:{kind:"Name",value:"title"}},{kind:"Field",name:{kind:"Name",value:"metadata"}},{kind:"Field",name:{kind:"Name",value:"groupBySource"}},{kind:"Field",name:{kind:"Name",value:"source"}},{kind:"Field",name:{kind:"Name",value:"url"}},{kind:"Field",name:{kind:"Name",value:"issue"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]},an={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"AttachmentConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"AttachmentConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Attachment"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...nn.definitions,...Zi.definitions]},tn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"AttachmentPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"AttachmentPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"attachment"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},dn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Organization"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Organization"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"allowedAuthServices"}},{kind:"Field",name:{kind:"Name",value:"gitBranchFormat"}},{kind:"Field",name:{kind:"Name",value:"userCount"}},{kind:"Field",name:{kind:"Name",value:"createdIssueCount"}},{kind:"Field",name:{kind:"Name",value:"periodUploadVolume"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"logoUrl"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"urlKey"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"samlEnabled"}},{kind:"Field",name:{kind:"Name",value:"gitLinkbackMessagesEnabled"}},{kind:"Field",name:{kind:"Name",value:"gitPublicLinkbackMessagesEnabled"}},{kind:"Field",name:{kind:"Name",value:"roadmapEnabled"}}]}}]},ln={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"AuthResolverResponse"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"AuthResolverResponse"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"email"}},{kind:"Field",name:{kind:"Name",value:"token"}},{kind:"Field",name:{kind:"Name",value:"availableOrganizations"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Organization"}}]}},{kind:"Field",name:{kind:"Name",value:"allowDomainAccess"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"users"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"User"}}]}}]}},...dn.definitions,...Ci.definitions]},on={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Invoice"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Invoice"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"url"}},{kind:"Field",name:{kind:"Name",value:"created"}},{kind:"Field",name:{kind:"Name",value:"dueDate"}},{kind:"Field",name:{kind:"Name",value:"total"}},{kind:"Field",name:{kind:"Name",value:"status"}}]}}]},rn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Card"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Card"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"brand"}},{kind:"Field",name:{kind:"Name",value:"last4"}}]}}]},sn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"BillingDetailsPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"BillingDetailsPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"invoices"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Invoice"}}]}},{kind:"Field",name:{kind:"Name",value:"email"}},{kind:"Field",name:{kind:"Name",value:"paymentMethod"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Card"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}},...on.definitions,...rn.definitions]},un={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"BillingEmailPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"BillingEmailPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"email"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},mn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"StepsResponse"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"StepsResponse"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"version"}},{kind:"Field",name:{kind:"Name",value:"clientIds"}},{kind:"Field",name:{kind:"Name",value:"steps"}}]}}]},kn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CollaborationDocumentUpdatePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"CollaborationDocumentUpdatePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"steps"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"StepsResponse"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}},...mn.definitions]},vn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Comment"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Comment"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"url"}},{kind:"Field",name:{kind:"Name",value:"body"}},{kind:"Field",name:{kind:"Name",value:"issue"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"editedAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},cn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CommentConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"CommentConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Comment"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...vn.definitions,...Zi.definitions]},pn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CommentPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"CommentPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"comment"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Nn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ContactPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ContactPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},hn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CreateCsvExportReportPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"CreateCsvExportReportPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},fn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CreateOrJoinOrganizationResponse"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"CreateOrJoinOrganizationResponse"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},bn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CustomView"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"CustomView"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"color"}},{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"filters"}},{kind:"Field",name:{kind:"Name",value:"icon"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"team"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"shared"}}]}}]},yn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CustomViewConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"CustomViewConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CustomView"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...bn.definitions,...Zi.definitions]},Sn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CustomViewPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"CustomViewPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"customView"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},gn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Cycle"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Cycle"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"completedAt"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"endsAt"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"completedScopeHistory"}},{kind:"Field",name:{kind:"Name",value:"completedIssueCountHistory"}},{kind:"Field",name:{kind:"Name",value:"number"}},{kind:"Field",name:{kind:"Name",value:"startsAt"}},{kind:"Field",name:{kind:"Name",value:"team"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"autoArchivedAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"scopeHistory"}},{kind:"Field",name:{kind:"Name",value:"issueCountHistory"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]},Dn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CycleConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"CycleConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Cycle"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...gn.definitions,...Zi.definitions]},Vn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CyclePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"CyclePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cycle"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Fn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"DebugPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"DebugPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},An={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"EmailUnsubscribePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"EmailUnsubscribePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},_n={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"EmailUserAccountAuthChallengeResponse"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"EmailUserAccountAuthChallengeResponse"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"authType"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Tn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Emoji"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Emoji"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"url"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"source"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},In={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"EmojiConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"EmojiConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Emoji"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...Tn.definitions,...Zi.definitions]},wn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"EmojiPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"EmojiPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"emoji"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},qn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"EventPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"EventPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},xn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Favorite"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Favorite"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cycle"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"label"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"issue"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"projectTeam"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"project"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"sortOrder"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"type"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]},Cn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"FavoriteConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"FavoriteConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Favorite"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...xn.definitions,...Zi.definitions]},On={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"FavoritePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"FavoritePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"favorite"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Pn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"FeedbackPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"FeedbackPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},jn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"FigmaEmbed"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"FigmaEmbed"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastModified"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"url"}},{kind:"Field",name:{kind:"Name",value:"nodeName"}}]}}]},Un={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"FigmaEmbedPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"FigmaEmbedPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"figmaEmbed"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"FigmaEmbed"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}},...jn.definitions]},Bn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ImageUploadFromUrlPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ImageUploadFromUrlPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"url"}},{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},En={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Integration"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Integration"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"service"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"team"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},Rn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IntegrationConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IntegrationConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Integration"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...En.definitions,...Zi.definitions]},zn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IntegrationPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IntegrationPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"integration"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Mn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"CommitPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"CommitPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"added"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"message"}},{kind:"Field",name:{kind:"Name",value:"modified"}},{kind:"Field",name:{kind:"Name",value:"removed"}},{kind:"Field",name:{kind:"Name",value:"timestamp"}},{kind:"Field",name:{kind:"Name",value:"url"}}]}}]},Ln={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"PullRequestPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PullRequestPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"branch"}},{kind:"Field",name:{kind:"Name",value:"closedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"draft"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"mergedAt"}},{kind:"Field",name:{kind:"Name",value:"number"}},{kind:"Field",name:{kind:"Name",value:"repoLogin"}},{kind:"Field",name:{kind:"Name",value:"repoName"}},{kind:"Field",name:{kind:"Name",value:"status"}},{kind:"Field",name:{kind:"Name",value:"title"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"url"}},{kind:"Field",name:{kind:"Name",value:"userId"}},{kind:"Field",name:{kind:"Name",value:"userLogin"}}]}}]},Wn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SentryIssuePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"SentryIssuePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueId"}},{kind:"Field",name:{kind:"Name",value:"actorId"}},{kind:"Field",name:{kind:"Name",value:"projectId"}},{kind:"Field",name:{kind:"Name",value:"firstSeen"}},{kind:"Field",name:{kind:"Name",value:"webUrl"}},{kind:"Field",name:{kind:"Name",value:"actorName"}},{kind:"Field",name:{kind:"Name",value:"firstVersion"}},{kind:"Field",name:{kind:"Name",value:"shortId"}},{kind:"Field",name:{kind:"Name",value:"projectSlug"}},{kind:"Field",name:{kind:"Name",value:"issueTitle"}},{kind:"Field",name:{kind:"Name",value:"actorType"}}]}}]},Qn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IntegrationResourceData"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IntegrationResourceData"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"githubCommit"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CommitPayload"}}]}},{kind:"Field",name:{kind:"Name",value:"githubPullRequest"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PullRequestPayload"}}]}},{kind:"Field",name:{kind:"Name",value:"gitlabMergeRequest"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PullRequestPayload"}}]}},{kind:"Field",name:{kind:"Name",value:"sentryIssue"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SentryIssuePayload"}}]}}]}},...Mn.definitions,...Ln.definitions,...Wn.definitions]},Hn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IntegrationResource"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IntegrationResource"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"data"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationResourceData"}}]}},{kind:"Field",name:{kind:"Name",value:"pullRequest"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PullRequestPayload"}}]}},{kind:"Field",name:{kind:"Name",value:"resourceId"}},{kind:"Field",name:{kind:"Name",value:"integration"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"resourceType"}},{kind:"Field",name:{kind:"Name",value:"issue"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}},...Qn.definitions,...Ln.definitions]},Gn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IntegrationResourceConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IntegrationResourceConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationResource"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...Hn.definitions,...Zi.definitions]},$n={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"InviteData"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"InviteData"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"avatarURLs"}},{kind:"Field",name:{kind:"Name",value:"teamIds"}},{kind:"Field",name:{kind:"Name",value:"teamNames"}},{kind:"Field",name:{kind:"Name",value:"organizationDomain"}},{kind:"Field",name:{kind:"Name",value:"organizationLogoUrl"}},{kind:"Field",name:{kind:"Name",value:"inviterName"}},{kind:"Field",name:{kind:"Name",value:"organizationName"}},{kind:"Field",name:{kind:"Name",value:"userCount"}}]}}]},Kn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"InvitePagePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"InvitePagePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"inviteData"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"InviteData"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}},...$n.definitions]},Jn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Issue"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Issue"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"trashed"}},{kind:"Field",name:{kind:"Name",value:"url"}},{kind:"Field",name:{kind:"Name",value:"identifier"}},{kind:"Field",name:{kind:"Name",value:"priorityLabel"}},{kind:"Field",name:{kind:"Name",value:"previousIdentifiers"}},{kind:"Field",name:{kind:"Name",value:"customerTicketCount"}},{kind:"Field",name:{kind:"Name",value:"branchName"}},{kind:"Field",name:{kind:"Name",value:"cycle"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"dueDate"}},{kind:"Field",name:{kind:"Name",value:"estimate"}},{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"title"}},{kind:"Field",name:{kind:"Name",value:"number"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"boardOrder"}},{kind:"Field",name:{kind:"Name",value:"subIssueSortOrder"}},{kind:"Field",name:{kind:"Name",value:"parent"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"priority"}},{kind:"Field",name:{kind:"Name",value:"project"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"team"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"autoArchivedAt"}},{kind:"Field",name:{kind:"Name",value:"autoClosedAt"}},{kind:"Field",name:{kind:"Name",value:"canceledAt"}},{kind:"Field",name:{kind:"Name",value:"completedAt"}},{kind:"Field",name:{kind:"Name",value:"startedAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"assignee"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"state"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},Zn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Issue"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...Jn.definitions,...Zi.definitions]},Yn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueDescriptionHistory"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueDescriptionHistory"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"actorId"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"descriptionData"}},{kind:"Field",name:{kind:"Name",value:"type"}}]}}]},Xn={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueDescriptionHistoryPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueDescriptionHistoryPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"history"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueDescriptionHistory"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}},...Yn.definitions]},ea={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueRelationHistoryPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueRelationHistoryPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"identifier"}},{kind:"Field",name:{kind:"Name",value:"type"}}]}}]},ia={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueHistory"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueHistory"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"relationChanges"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueRelationHistoryPayload"}}]}},{kind:"Field",name:{kind:"Name",value:"addedLabelIds"}},{kind:"Field",name:{kind:"Name",value:"removedLabelIds"}},{kind:"Field",name:{kind:"Name",value:"source"}},{kind:"Field",name:{kind:"Name",value:"issue"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"toCycle"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"toParent"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"toProject"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"toState"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"fromCycle"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"fromParent"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"fromProject"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"fromState"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"fromTeam"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"toTeam"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"fromAssignee"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"toAssignee"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"actor"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"fromDueDate"}},{kind:"Field",name:{kind:"Name",value:"toDueDate"}},{kind:"Field",name:{kind:"Name",value:"fromEstimate"}},{kind:"Field",name:{kind:"Name",value:"toEstimate"}},{kind:"Field",name:{kind:"Name",value:"fromPriority"}},{kind:"Field",name:{kind:"Name",value:"toPriority"}},{kind:"Field",name:{kind:"Name",value:"fromTitle"}},{kind:"Field",name:{kind:"Name",value:"toTitle"}},{kind:"Field",name:{kind:"Name",value:"archived"}},{kind:"Field",name:{kind:"Name",value:"updatedDescription"}},{kind:"Field",name:{kind:"Name",value:"autoArchived"}},{kind:"Field",name:{kind:"Name",value:"autoClosed"}}]}},...ea.definitions]},na={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueHistoryConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueHistoryConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueHistory"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...ia.definitions,...Zi.definitions]},aa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueImport"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueImport"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"mapping"}},{kind:"Field",name:{kind:"Name",value:"creatorId"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"service"}},{kind:"Field",name:{kind:"Name",value:"status"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"error"}}]}}]},ta={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueImportDeletePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueImportDeletePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"issueImport"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueImport"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}},...aa.definitions]},da={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueImportPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueImportPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"issueImport"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueImport"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}},...aa.definitions]},la={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueLabel"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueLabel"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"color"}},{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"team"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},oa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueLabelConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueLabelConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueLabel"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...la.definitions,...Zi.definitions]},ra={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueLabelPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueLabelPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"issueLabel"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},sa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssuePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssuePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"issue"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},ua={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssuePriorityValue"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssuePriorityValue"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"label"}},{kind:"Field",name:{kind:"Name",value:"priority"}}]}}]},ma={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueRelation"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueRelation"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issue"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"relatedIssue"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"type"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]},ka={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueRelationConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueRelationConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueRelation"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...ma.definitions,...Zi.definitions]},va={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"IssueRelationPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"IssueRelationPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"issueRelation"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},ca={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Milestone"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Milestone"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"sortOrder"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]},pa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"MilestoneConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"MilestoneConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Milestone"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...ca.definitions,...Zi.definitions]},Na={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"MilestonePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"MilestonePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"milestone"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},ha={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Notification"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Notification"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"reactionEmoji"}},{kind:"Field",name:{kind:"Name",value:"type"}},{kind:"Field",name:{kind:"Name",value:"comment"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"issue"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"team"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"emailedAt"}},{kind:"Field",name:{kind:"Name",value:"readAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]},fa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"NotificationConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"NotificationConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Notification"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...ha.definitions,...Zi.definitions]},ba={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"NotificationPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"NotificationPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"notification"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},ya={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"NotificationSubscription"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"NotificationSubscription"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"project"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"team"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"type"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},Sa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"NotificationSubscriptionConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"NotificationSubscriptionConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"NotificationSubscription"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...ya.definitions,...Zi.definitions]},ga={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"NotificationSubscriptionPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"NotificationSubscriptionPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"notificationSubscription"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Da={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OauthClient"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"OauthClient"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"imageUrl"}},{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"redirectUris"}},{kind:"Field",name:{kind:"Name",value:"developer"}},{kind:"Field",name:{kind:"Name",value:"clientId"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"clientSecret"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"developerUrl"}},{kind:"Field",name:{kind:"Name",value:"publicEnabled"}}]}}]},Va={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OauthClientPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"OauthClientPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"oauthClient"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OauthClient"}}]}},{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}},...Da.definitions]},Fa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OauthTokenRevokePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"OauthTokenRevokePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Aa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OrganizationDeletePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"OrganizationDeletePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},_a={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OrganizationDomain"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"OrganizationDomain"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"verificationEmail"}},{kind:"Field",name:{kind:"Name",value:"verified"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},Ta={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OrganizationDomainPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"OrganizationDomainPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"organizationDomain"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrganizationDomain"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}},..._a.definitions]},Ia={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OrganizationExistsPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"OrganizationExistsPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"success"}},{kind:"Field",name:{kind:"Name",value:"exists"}}]}}]},wa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OrganizationInvite"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"OrganizationInvite"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"external"}},{kind:"Field",name:{kind:"Name",value:"email"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"acceptedAt"}},{kind:"Field",name:{kind:"Name",value:"expiresAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"inviter"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"invitee"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},qa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OrganizationInviteConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"OrganizationInviteConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrganizationInvite"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...wa.definitions,...Zi.definitions]},xa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OrganizationInvitePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"OrganizationInvitePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"organizationInvite"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrganizationInvite"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}},...wa.definitions]},Ca={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OrganizationPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"OrganizationPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Oa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Project"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Project"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"targetDate"}},{kind:"Field",name:{kind:"Name",value:"icon"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"milestone"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"completedScopeHistory"}},{kind:"Field",name:{kind:"Name",value:"completedIssueCountHistory"}},{kind:"Field",name:{kind:"Name",value:"lead"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"color"}},{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"slugId"}},{kind:"Field",name:{kind:"Name",value:"sortOrder"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"autoArchivedAt"}},{kind:"Field",name:{kind:"Name",value:"canceledAt"}},{kind:"Field",name:{kind:"Name",value:"completedAt"}},{kind:"Field",name:{kind:"Name",value:"startedAt"}},{kind:"Field",name:{kind:"Name",value:"scopeHistory"}},{kind:"Field",name:{kind:"Name",value:"issueCountHistory"}},{kind:"Field",name:{kind:"Name",value:"state"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"slackIssueComments"}},{kind:"Field",name:{kind:"Name",value:"slackNewIssue"}},{kind:"Field",name:{kind:"Name",value:"slackIssueStatuses"}},{kind:"Field",name:{kind:"Name",value:"startDate"}}]}}]},Pa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ProjectConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ProjectConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Project"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...Oa.definitions,...Zi.definitions]},ja={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ProjectLink"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ProjectLink"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"url"}},{kind:"Field",name:{kind:"Name",value:"label"}},{kind:"Field",name:{kind:"Name",value:"project"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},Ua={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ProjectLinkConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ProjectLinkConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ProjectLink"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...ja.definitions,...Zi.definitions]},Ba={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ProjectLinkPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ProjectLinkPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"projectLink"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Ea={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ProjectPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ProjectPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"project"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Ra={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"PushSubscription"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PushSubscription"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]},za={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"PushSubscriptionConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PushSubscriptionConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PushSubscription"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...Ra.definitions,...Zi.definitions]},Ma={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"PushSubscriptionPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PushSubscriptionPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},La={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"PushSubscriptionTestPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"PushSubscriptionTestPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Wa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Reaction"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Reaction"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"emoji"}},{kind:"Field",name:{kind:"Name",value:"comment"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},Qa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ReactionConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ReactionConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Reaction"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...Wa.definitions,...Zi.definitions]},Ha={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ReactionPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ReactionPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"reaction"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Ga={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"RotateSecretPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"RotateSecretPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},$a={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SsoUrlFromEmailResponse"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"SsoUrlFromEmailResponse"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"samlSsoUrl"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Ka={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SubscriptionPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"SubscriptionPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"canceledAt"}},{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Ja={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SubscriptionSessionPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"SubscriptionSessionPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"session"}}]}}]},Za={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Team"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Team"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cycleIssueAutoAssignCompleted"}},{kind:"Field",name:{kind:"Name",value:"cycleIssueAutoAssignStarted"}},{kind:"Field",name:{kind:"Name",value:"cycleCalenderUrl"}},{kind:"Field",name:{kind:"Name",value:"upcomingCycleCount"}},{kind:"Field",name:{kind:"Name",value:"private"}},{kind:"Field",name:{kind:"Name",value:"cycleLockToActive"}},{kind:"Field",name:{kind:"Name",value:"autoArchivePeriod"}},{kind:"Field",name:{kind:"Name",value:"autoClosePeriod"}},{kind:"Field",name:{kind:"Name",value:"activeCycle"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"autoCloseStateId"}},{kind:"Field",name:{kind:"Name",value:"cycleCooldownTime"}},{kind:"Field",name:{kind:"Name",value:"cycleStartDay"}},{kind:"Field",name:{kind:"Name",value:"defaultTemplateForMembersId"}},{kind:"Field",name:{kind:"Name",value:"defaultTemplateForNonMembersId"}},{kind:"Field",name:{kind:"Name",value:"cycleDuration"}},{kind:"Field",name:{kind:"Name",value:"issueEstimationType"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"key"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"timezone"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"mergeWorkflowState"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"draftWorkflowState"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"startWorkflowState"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"reviewWorkflowState"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"markedAsDuplicateWorkflowState"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"inviteHash"}},{kind:"Field",name:{kind:"Name",value:"defaultIssueEstimate"}},{kind:"Field",name:{kind:"Name",value:"cyclesEnabled"}},{kind:"Field",name:{kind:"Name",value:"issueEstimationExtended"}},{kind:"Field",name:{kind:"Name",value:"issueEstimationAllowZero"}},{kind:"Field",name:{kind:"Name",value:"groupIssueHistory"}},{kind:"Field",name:{kind:"Name",value:"slackIssueComments"}},{kind:"Field",name:{kind:"Name",value:"slackNewIssue"}},{kind:"Field",name:{kind:"Name",value:"slackIssueStatuses"}}]}}]},Ya={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"TeamConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"TeamConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Team"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...Za.definitions,...Zi.definitions]},Xa={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"TeamMembership"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"TeamMembership"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"team"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"owner"}}]}}]},et={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"TeamMembershipConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"TeamMembershipConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamMembership"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...Xa.definitions,...Zi.definitions]},it={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"TeamMembershipPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"TeamMembershipPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"teamMembership"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},nt={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"TeamPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"TeamPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"team"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},at={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"TemplateConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"TemplateConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...Zi.definitions]},tt={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"TemplatePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"TemplatePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"template"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},dt={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UploadFileHeader"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"UploadFileHeader"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"key"}},{kind:"Field",name:{kind:"Name",value:"value"}}]}}]},lt={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UploadFile"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"UploadFile"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"assetUrl"}},{kind:"Field",name:{kind:"Name",value:"contentType"}},{kind:"Field",name:{kind:"Name",value:"filename"}},{kind:"Field",name:{kind:"Name",value:"uploadUrl"}},{kind:"Field",name:{kind:"Name",value:"size"}},{kind:"Field",name:{kind:"Name",value:"headers"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UploadFileHeader"}}]}},{kind:"Field",name:{kind:"Name",value:"metaData"}}]}},...dt.definitions]},ot={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UploadPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"UploadPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"uploadFile"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UploadFile"}}]}},{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}},...lt.definitions]},rt={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UserAdminPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"UserAdminPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},st={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UserConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"UserConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"User"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...Ci.definitions,...Zi.definitions]},ut={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UserPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"UserPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"user"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},mt={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UserSettingsFlagPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"UserSettingsFlagPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"flag"}},{kind:"Field",name:{kind:"Name",value:"value"}},{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},kt={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UserSettingsFlagsResetPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"UserSettingsFlagsResetPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},vt={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UserSettingsPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"UserSettingsPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},ct={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"UserSubscribeToNewsletterPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"UserSubscribeToNewsletterPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},pt={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ViewPreferences"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ViewPreferences"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"type"}},{kind:"Field",name:{kind:"Name",value:"viewType"}}]}}]},Nt={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"ViewPreferencesPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"ViewPreferencesPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"viewPreferences"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ViewPreferences"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}},...pt.definitions]},ht={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Webhook"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Webhook"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"secret"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"resourceTypes"}},{kind:"Field",name:{kind:"Name",value:"team"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"url"}},{kind:"Field",name:{kind:"Name",value:"label"}},{kind:"Field",name:{kind:"Name",value:"enabled"}}]}}]},ft={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"WebhookConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"WebhookConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Webhook"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...ht.definitions,...Zi.definitions]},bt={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"WebhookPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"WebhookPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"webhook"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},yt={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"WorkflowState"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"WorkflowState"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"position"}},{kind:"Field",name:{kind:"Name",value:"color"}},{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"team"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"type"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]},St={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"WorkflowStateConnection"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"WorkflowStateConnection"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"nodes"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"WorkflowState"}}]}},{kind:"Field",name:{kind:"Name",value:"pageInfo"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PageInfo"}}]}}]}},...yt.definitions,...Zi.definitions]},gt={kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"WorkflowStatePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"WorkflowStatePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}},{kind:"Field",name:{kind:"Name",value:"workflowState"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}},{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},Dt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"apiKeys"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"apiKeys"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ApiKeyConnection"}}]}}]}},...Yi.definitions]},Vt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"applicationWithAuthorization"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"clientId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"scope"}},type:{kind:"NonNullType",type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"applicationWithAuthorization"},arguments:[{kind:"Argument",name:{kind:"Name",value:"clientId"},value:{kind:"Variable",name:{kind:"Name",value:"clientId"}}},{kind:"Argument",name:{kind:"Name",value:"redirectUri"},value:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}}},{kind:"Argument",name:{kind:"Name",value:"scope"},value:{kind:"Variable",name:{kind:"Name",value:"scope"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserAuthorizedApplication"}}]}}]}},...Mi.definitions]},Ft={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"archivedModelSync"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"identifier"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"modelClass"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"archivedModelSync"},arguments:[{kind:"Argument",name:{kind:"Name",value:"identifier"},value:{kind:"Variable",name:{kind:"Name",value:"identifier"}}},{kind:"Argument",name:{kind:"Name",value:"modelClass"},value:{kind:"Variable",name:{kind:"Name",value:"modelClass"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchiveResponse"}}]}}]}},...ji.definitions]},At={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"archivedModelsSync"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"DateTime"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"modelClass"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"teamId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"trashOption"}},type:{kind:"NamedType",name:{kind:"Name",value:"TrashOptionType"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"archivedModelsSync"},arguments:[{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"modelClass"},value:{kind:"Variable",name:{kind:"Name",value:"modelClass"}}},{kind:"Argument",name:{kind:"Name",value:"teamId"},value:{kind:"Variable",name:{kind:"Name",value:"teamId"}}},{kind:"Argument",name:{kind:"Name",value:"trashOption"},value:{kind:"Variable",name:{kind:"Name",value:"trashOption"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchiveResponse"}}]}}]}},...ji.definitions]},_t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"attachment"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachment"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Attachment"}}]}}]}},...nn.definitions]},Tt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"attachmentIssue"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentIssue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Issue"}}]}}]}},...Jn.definitions]},It={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"attachmentIssue_attachments"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentIssue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachments"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"AttachmentConnection"}}]}}]}}]}},...an.definitions]},wt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"attachmentIssue_children"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentIssue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"children"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}}]}},...Zn.definitions]},qt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"attachmentIssue_comments"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentIssue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"comments"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CommentConnection"}}]}}]}}]}},...cn.definitions]},xt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"attachmentIssue_history"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentIssue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"history"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueHistoryConnection"}}]}}]}}]}},...na.definitions]},Ct={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"attachmentIssue_inverseRelations"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentIssue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"inverseRelations"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueRelationConnection"}}]}}]}}]}},...ka.definitions]},Ot={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"attachmentIssue_labels"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentIssue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"labels"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueLabelConnection"}}]}}]}}]}},...oa.definitions]},Pt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"attachmentIssue_relations"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentIssue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"relations"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueRelationConnection"}}]}}]}}]}},...ka.definitions]},jt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"attachmentIssue_subscribers"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentIssue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"subscribers"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserConnection"}}]}}]}}]}},...st.definitions]},Ut={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"attachments"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachments"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"AttachmentConnection"}}]}}]}},...an.definitions]},Bt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"authorizedApplications"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"authorizedApplications"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"AuthorizedApplication"}}]}}]}},...zi.definitions]},Et={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"availableUsers"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"availableUsers"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"AuthResolverResponse"}}]}}]}},...ln.definitions]},Rt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"billingDetails"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"billingDetails"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"BillingDetailsPayload"}}]}}]}},...sn.definitions]},zt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"billingDetails_paymentMethod"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"billingDetails"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"paymentMethod"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Card"}}]}}]}}]}},...rn.definitions]},Mt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"collaborativeDocumentJoin"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"clientId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"issueId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"version"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"collaborativeDocumentJoin"},arguments:[{kind:"Argument",name:{kind:"Name",value:"clientId"},value:{kind:"Variable",name:{kind:"Name",value:"clientId"}}},{kind:"Argument",name:{kind:"Name",value:"issueId"},value:{kind:"Variable",name:{kind:"Name",value:"issueId"}}},{kind:"Argument",name:{kind:"Name",value:"version"},value:{kind:"Variable",name:{kind:"Name",value:"version"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CollaborationDocumentUpdatePayload"}}]}}]}},...kn.definitions]},Lt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"collaborativeDocumentJoin_steps"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"clientId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"issueId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"version"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"collaborativeDocumentJoin"},arguments:[{kind:"Argument",name:{kind:"Name",value:"clientId"},value:{kind:"Variable",name:{kind:"Name",value:"clientId"}}},{kind:"Argument",name:{kind:"Name",value:"issueId"},value:{kind:"Variable",name:{kind:"Name",value:"issueId"}}},{kind:"Argument",name:{kind:"Name",value:"version"},value:{kind:"Variable",name:{kind:"Name",value:"version"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"steps"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"StepsResponse"}}]}}]}}]}},...mn.definitions]},Wt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"comment"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"comment"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Comment"}}]}}]}},...vn.definitions]},Qt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"comments"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"comments"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CommentConnection"}}]}}]}},...cn.definitions]},Ht={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"customView"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"customView"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CustomView"}}]}}]}},...bn.definitions]},Gt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"customViews"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"customViews"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CustomViewConnection"}}]}}]}},...yn.definitions]},$t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"cycle"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cycle"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Cycle"}}]}}]}},...gn.definitions]},Kt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"cycle_issues"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cycle"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issues"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}}]}},...Zn.definitions]},Jt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"cycle_uncompletedIssuesUponClose"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cycle"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"uncompletedIssuesUponClose"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}}]}},...Zn.definitions]},Zt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"cycles"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cycles"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CycleConnection"}}]}}]}},...Dn.definitions]},Yt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"dependentModelSync"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"identifier"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"modelClass"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"dependentModelSync"},arguments:[{kind:"Argument",name:{kind:"Name",value:"identifier"},value:{kind:"Variable",name:{kind:"Name",value:"identifier"}}},{kind:"Argument",name:{kind:"Name",value:"modelClass"},value:{kind:"Variable",name:{kind:"Name",value:"modelClass"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"DependencyResponse"}}]}}]}},...Ui.definitions]},Xt={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"emoji"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"emoji"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Emoji"}}]}}]}},...Tn.definitions]},ed={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"emojis"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"emojis"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"EmojiConnection"}}]}}]}},...In.definitions]},id={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"favorite"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"favorite"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Favorite"}}]}}]}},...xn.definitions]},nd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"favorites"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"favorites"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"FavoriteConnection"}}]}}]}},...Cn.definitions]},ad={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"figmaEmbedInfo"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"fileId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"nodeId"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"figmaEmbedInfo"},arguments:[{kind:"Argument",name:{kind:"Name",value:"fileId"},value:{kind:"Variable",name:{kind:"Name",value:"fileId"}}},{kind:"Argument",name:{kind:"Name",value:"nodeId"},value:{kind:"Variable",name:{kind:"Name",value:"nodeId"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"FigmaEmbedPayload"}}]}}]}},...Un.definitions]},td={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"figmaEmbedInfo_figmaEmbed"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"fileId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"nodeId"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"figmaEmbedInfo"},arguments:[{kind:"Argument",name:{kind:"Name",value:"fileId"},value:{kind:"Variable",name:{kind:"Name",value:"fileId"}}},{kind:"Argument",name:{kind:"Name",value:"nodeId"},value:{kind:"Variable",name:{kind:"Name",value:"nodeId"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"figmaEmbed"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"FigmaEmbed"}}]}}]}}]}},...jn.definitions]},dd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"integration"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integration"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Integration"}}]}}]}},...En.definitions]},ld={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"integrations"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrations"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationConnection"}}]}}]}},...Rn.definitions]},od={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"inviteInfo"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"teamHash"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"userHash"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"inviteInfo"},arguments:[{kind:"Argument",name:{kind:"Name",value:"teamHash"},value:{kind:"Variable",name:{kind:"Name",value:"teamHash"}}},{kind:"Argument",name:{kind:"Name",value:"userHash"},value:{kind:"Variable",name:{kind:"Name",value:"userHash"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"InvitePagePayload"}}]}}]}},...Kn.definitions]},rd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"inviteInfo_inviteData"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"teamHash"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"userHash"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"inviteInfo"},arguments:[{kind:"Argument",name:{kind:"Name",value:"teamHash"},value:{kind:"Variable",name:{kind:"Name",value:"teamHash"}}},{kind:"Argument",name:{kind:"Name",value:"userHash"},value:{kind:"Variable",name:{kind:"Name",value:"userHash"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"inviteData"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"InviteData"}}]}}]}}]}},...$n.definitions]},sd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issue"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Issue"}}]}}]}},...Jn.definitions]},ud={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issue_attachments"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachments"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"AttachmentConnection"}}]}}]}}]}},...an.definitions]},md={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issue_children"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"children"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}}]}},...Zn.definitions]},kd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issue_comments"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"comments"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CommentConnection"}}]}}]}}]}},...cn.definitions]},vd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issue_history"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"history"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueHistoryConnection"}}]}}]}}]}},...na.definitions]},cd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issue_inverseRelations"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"inverseRelations"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueRelationConnection"}}]}}]}}]}},...ka.definitions]},pd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issue_labels"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"labels"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueLabelConnection"}}]}}]}}]}},...oa.definitions]},Nd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issue_relations"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"relations"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueRelationConnection"}}]}}]}}]}},...ka.definitions]},hd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issue_subscribers"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issue"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"subscribers"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserConnection"}}]}}]}}]}},...st.definitions]},fd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issueDescriptionHistory"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueDescriptionHistory"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueDescriptionHistoryPayload"}}]}}]}},...Xn.definitions]},bd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issueImportFinishGithubOAuth"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"code"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueImportFinishGithubOAuth"},arguments:[{kind:"Argument",name:{kind:"Name",value:"code"},value:{kind:"Variable",name:{kind:"Name",value:"code"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"GithubOAuthTokenPayload"}}]}}]}},...Ri.definitions]},yd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issueLabel"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueLabel"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueLabel"}}]}}]}},...la.definitions]},Sd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issueLabel_issues"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueLabel"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issues"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}}]}},...Zn.definitions]},gd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issueLabels"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueLabels"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueLabelConnection"}}]}}]}},...oa.definitions]},Dd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issuePriorityValues"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issuePriorityValues"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssuePriorityValue"}}]}}]}},...ua.definitions]},Vd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issueRelation"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueRelation"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueRelation"}}]}}]}},...ma.definitions]},Fd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issueRelations"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueRelations"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueRelationConnection"}}]}}]}},...ka.definitions]},Ad={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issueSearch"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"query"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueSearch"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}},{kind:"Argument",name:{kind:"Name",value:"query"},value:{kind:"Variable",name:{kind:"Name",value:"query"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}},...Zn.definitions]},_d={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"issues"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issues"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}},...Zn.definitions]},Td={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"milestone"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"milestone"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Milestone"}}]}}]}},...ca.definitions]},Id={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"milestone_projects"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"milestone"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"projects"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ProjectConnection"}}]}}]}}]}},...Pa.definitions]},wd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"milestones"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"milestones"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"MilestoneConnection"}}]}}]}},...pa.definitions]},qd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"notification"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"notification"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Notification"}}]}}]}},...ha.definitions]},xd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"notificationSubscription"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"notificationSubscription"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"NotificationSubscription"}}]}}]}},...ya.definitions]},Cd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"notificationSubscriptions"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"notificationSubscriptions"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"NotificationSubscriptionConnection"}}]}}]}},...Sa.definitions]},Od={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"notifications"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"notifications"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"NotificationConnection"}}]}}]}},...fa.definitions]},Pd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"organization"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organization"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Organization"}}]}}]}},...dn.definitions]},jd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"organization_integrations"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organization"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrations"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationConnection"}}]}}]}}]}},...Rn.definitions]},Ud={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"organization_milestones"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organization"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"milestones"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"MilestoneConnection"}}]}}]}}]}},...pa.definitions]},Bd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"organization_teams"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organization"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teams"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamConnection"}}]}}]}}]}},...Ya.definitions]},Ed={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"organization_users"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organization"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"users"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserConnection"}}]}}]}}]}},...st.definitions]},Rd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"organizationExists"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"urlKey"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizationExists"},arguments:[{kind:"Argument",name:{kind:"Name",value:"urlKey"},value:{kind:"Variable",name:{kind:"Name",value:"urlKey"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrganizationExistsPayload"}}]}}]}},...Ia.definitions]},zd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"organizationInvite"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizationInvite"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueLabel"}}]}}]}},...la.definitions]},Md={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"organizationInvite_issues"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizationInvite"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issues"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}}]}},...Zn.definitions]},Ld={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"organizationInvites"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizationInvites"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrganizationInviteConnection"}}]}}]}},...qa.definitions]},Wd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"project"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"project"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Project"}}]}}]}},...Oa.definitions]},Qd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"project_issues"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"project"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issues"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}}]}},...Zn.definitions]},Hd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"project_links"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"project"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"links"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ProjectLinkConnection"}}]}}]}}]}},...Ua.definitions]},Gd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"project_members"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"project"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"members"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserConnection"}}]}}]}}]}},...st.definitions]},$d={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"project_teams"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"project"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teams"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamConnection"}}]}}]}}]}},...Ya.definitions]},Kd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"projectLink"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"projectLink"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ProjectLink"}}]}}]}},...ja.definitions]},Jd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"projectLinks"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"projectLinks"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ProjectLinkConnection"}}]}}]}},...Ua.definitions]},Zd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"projects"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"projects"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ProjectConnection"}}]}}]}},...Pa.definitions]},Yd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"pushSubscriptionTest"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"pushSubscriptionTest"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PushSubscriptionTestPayload"}}]}}]}},...La.definitions]},Xd={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"reaction"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"reaction"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Reaction"}}]}}]}},...Wa.definitions]},el={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"reactions"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"reactions"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ReactionConnection"}}]}}]}},...Qa.definitions]},il={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"ssoUrlFromEmail"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"email"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"isDesktop"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"ssoUrlFromEmail"},arguments:[{kind:"Argument",name:{kind:"Name",value:"email"},value:{kind:"Variable",name:{kind:"Name",value:"email"}}},{kind:"Argument",name:{kind:"Name",value:"isDesktop"},value:{kind:"Variable",name:{kind:"Name",value:"isDesktop"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SsoUrlFromEmailResponse"}}]}}]}},...$a.definitions]},nl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"subscription"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"subscription"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Subscription"}}]}}]}},...Ki.definitions]},al={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"syncBootstrap"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"databaseVersion"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"sinceSyncId"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"syncGroups"}},type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"syncBootstrap"},arguments:[{kind:"Argument",name:{kind:"Name",value:"databaseVersion"},value:{kind:"Variable",name:{kind:"Name",value:"databaseVersion"}}},{kind:"Argument",name:{kind:"Name",value:"sinceSyncId"},value:{kind:"Variable",name:{kind:"Name",value:"sinceSyncId"}}},{kind:"Argument",name:{kind:"Name",value:"syncGroups"},value:{kind:"Variable",name:{kind:"Name",value:"syncGroups"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SyncResponse"}}]}}]}},...Pi.definitions]},tl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"team"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"team"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Team"}}]}}]}},...Za.definitions]},dl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"team_cycles"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"team"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cycles"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CycleConnection"}}]}}]}}]}},...Dn.definitions]},ll={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"team_issues"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"team"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issues"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}}]}},...Zn.definitions]},ol={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"team_labels"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"team"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"labels"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueLabelConnection"}}]}}]}}]}},...oa.definitions]},rl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"team_members"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"team"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"members"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserConnection"}}]}}]}}]}},...st.definitions]},sl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"team_memberships"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"team"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"memberships"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamMembershipConnection"}}]}}]}}]}},...et.definitions]},ul={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"team_projects"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"team"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"projects"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ProjectConnection"}}]}}]}}]}},...Pa.definitions]},ml={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"team_states"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"team"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"states"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"WorkflowStateConnection"}}]}}]}}]}},...St.definitions]},kl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"team_templates"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"team"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"templates"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TemplateConnection"}}]}}]}}]}},...at.definitions]},vl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"team_webhooks"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"team"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"webhooks"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"WebhookConnection"}}]}}]}}]}},...ft.definitions]},cl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"teamMembership"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teamMembership"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamMembership"}}]}}]}},...Xa.definitions]},pl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"teamMemberships"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teamMemberships"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamMembershipConnection"}}]}}]}},...et.definitions]},Nl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"teams"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teams"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamConnection"}}]}}]}},...Ya.definitions]},hl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"template"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"template"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Template"}}]}}]}},...xi.definitions]},fl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"templates"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"templates"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Template"}}]}}]}},...xi.definitions]},bl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"user"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"User"}}]}}]}},...Ci.definitions]},yl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"user_assignedIssues"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"assignedIssues"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}}]}},...Zn.definitions]},Sl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"user_createdIssues"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"createdIssues"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}}]}},...Zn.definitions]},gl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"user_teamMemberships"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teamMemberships"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamMembershipConnection"}}]}}]}}]}},...et.definitions]},Dl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"user_teams"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"user"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teams"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamConnection"}}]}}]}}]}},...Ya.definitions]},Vl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"userSettings"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userSettings"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserSettings"}}]}}]}},...$i.definitions]},Fl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"users"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"users"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserConnection"}}]}}]}},...st.definitions]},Al={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"viewer"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"viewer"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"User"}}]}}]}},...Ci.definitions]},_l={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"viewer_assignedIssues"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"viewer"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"assignedIssues"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}}]}},...Zn.definitions]},Tl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"viewer_createdIssues"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"viewer"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"createdIssues"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}}]}},...Zn.definitions]},Il={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"viewer_teamMemberships"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"viewer"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teamMemberships"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamMembershipConnection"}}]}}]}}]}},...et.definitions]},wl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"viewer_teams"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"viewer"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teams"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamConnection"}}]}}]}}]}},...Ya.definitions]},ql={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"webhook"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"webhook"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"Webhook"}}]}}]}},...ht.definitions]},xl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"webhooks"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"webhooks"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"WebhookConnection"}}]}}]}},...ft.definitions]},Cl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"workflowState"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"workflowState"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"WorkflowState"}}]}}]}},...yt.definitions]},Ol={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"workflowState_issues"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"workflowState"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issues"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueConnection"}}]}}]}}]}},...Zn.definitions]},Pl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"workflowStates"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"after"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"before"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"first"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"last"}},type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"orderBy"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginationOrderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"workflowStates"},arguments:[{kind:"Argument",name:{kind:"Name",value:"after"},value:{kind:"Variable",name:{kind:"Name",value:"after"}}},{kind:"Argument",name:{kind:"Name",value:"before"},value:{kind:"Variable",name:{kind:"Name",value:"before"}}},{kind:"Argument",name:{kind:"Name",value:"first"},value:{kind:"Variable",name:{kind:"Name",value:"first"}}},{kind:"Argument",name:{kind:"Name",value:"includeArchived"},value:{kind:"Variable",name:{kind:"Name",value:"includeArchived"}}},{kind:"Argument",name:{kind:"Name",value:"last"},value:{kind:"Variable",name:{kind:"Name",value:"last"}}},{kind:"Argument",name:{kind:"Name",value:"orderBy"},value:{kind:"Variable",name:{kind:"Name",value:"orderBy"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"WorkflowStateConnection"}}]}}]}},...St.definitions]},jl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"apiKeyCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ApiKeyCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"apiKeyCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ApiKeyPayload"}}]}}]}},...Xi.definitions]},Ul={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"apiKeyDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"apiKeyDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Bl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"attachmentArchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentArchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},El={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"attachmentCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"AttachmentCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"AttachmentPayload"}}]}}]}},...tn.definitions]},Rl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"attachmentDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},zl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"attachmentLinkZendesk"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"issueId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"ticketId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentLinkZendesk"},arguments:[{kind:"Argument",name:{kind:"Name",value:"issueId"},value:{kind:"Variable",name:{kind:"Name",value:"issueId"}}},{kind:"Argument",name:{kind:"Name",value:"ticketId"},value:{kind:"Variable",name:{kind:"Name",value:"ticketId"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"AttachmentPayload"}}]}}]}},...tn.definitions]},Ml={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"attachmentUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"AttachmentUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"attachmentUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"AttachmentPayload"}}]}}]}},...tn.definitions]},Ll={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"billingEmailUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"BillingEmailUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"billingEmailUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"BillingEmailPayload"}}]}}]}},...un.definitions]},Wl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"collaborativeDocumentUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CollaborationDocumentUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"collaborativeDocumentUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CollaborationDocumentUpdatePayload"}}]}}]}},...kn.definitions]},Ql={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"commentCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CommentCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"commentCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CommentPayload"}}]}}]}},...pn.definitions]},Hl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"commentDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"commentDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Gl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"commentUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CommentUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"commentUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CommentPayload"}}]}}]}},...pn.definitions]},$l={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"contactCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ContactCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"contactCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ContactPayload"}}]}}]}},...Nn.definitions]},Kl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"createCsvExportReport"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"includePrivateTeamIds"}},type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"createCsvExportReport"},arguments:[{kind:"Argument",name:{kind:"Name",value:"includePrivateTeamIds"},value:{kind:"Variable",name:{kind:"Name",value:"includePrivateTeamIds"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CreateCsvExportReportPayload"}}]}}]}},...hn.definitions]},Jl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"createOrganizationFromOnboarding"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CreateOrganizationInput"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"survey"}},type:{kind:"NamedType",name:{kind:"Name",value:"OnboardingCustomerSurvey"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"createOrganizationFromOnboarding"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}},{kind:"Argument",name:{kind:"Name",value:"survey"},value:{kind:"Variable",name:{kind:"Name",value:"survey"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CreateOrJoinOrganizationResponse"}}]}}]}},...fn.definitions]},Zl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"customViewCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CustomViewCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"customViewCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CustomViewPayload"}}]}}]}},...Sn.definitions]},Yl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"customViewDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"customViewDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Xl={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"customViewUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CustomViewUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"customViewUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CustomViewPayload"}}]}}]}},...Sn.definitions]},eo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"cycleArchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cycleArchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},io={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"cycleCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CycleCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cycleCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CyclePayload"}}]}}]}},...Vn.definitions]},no={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"cycleUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CycleUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"cycleUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CyclePayload"}}]}}]}},...Vn.definitions]},ao={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"debugCreateSAMLOrg"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"debugCreateSAMLOrg"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"DebugPayload"}}]}}]}},...Fn.definitions]},to={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"debugFailWithInternalError"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"debugFailWithInternalError"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"DebugPayload"}}]}}]}},...Fn.definitions]},lo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"debugFailWithWarning"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"debugFailWithWarning"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"DebugPayload"}}]}}]}},...Fn.definitions]},oo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"emailTokenUserAccountAuth"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"TokenUserAccountAuthInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"emailTokenUserAccountAuth"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"AuthResolverResponse"}}]}}]}},...ln.definitions]},ro={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"emailUnsubscribe"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"EmailUnsubscribeInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"emailUnsubscribe"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"EmailUnsubscribePayload"}}]}}]}},...An.definitions]},so={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"emailUserAccountAuthChallenge"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"EmailUserAccountAuthChallengeInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"emailUserAccountAuthChallenge"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"EmailUserAccountAuthChallengeResponse"}}]}}]}},..._n.definitions]},uo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"emojiCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"EmojiCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"emojiCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"EmojiPayload"}}]}}]}},...wn.definitions]},mo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"emojiDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"emojiDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},ko={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"eventCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"EventCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"eventCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"EventPayload"}}]}}]}},...qn.definitions]},vo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"favoriteCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"FavoriteCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"favoriteCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"FavoritePayload"}}]}}]}},...On.definitions]},co={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"favoriteDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"favoriteDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},po={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"favoriteUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"FavoriteUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"favoriteUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"FavoritePayload"}}]}}]}},...On.definitions]},No={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"feedbackCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"FeedbackCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"feedbackCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"FeedbackPayload"}}]}}]}},...Pn.definitions]},ho={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"fileUpload"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"contentType"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"filename"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"metaData"}},type:{kind:"NamedType",name:{kind:"Name",value:"JSON"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"size"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"fileUpload"},arguments:[{kind:"Argument",name:{kind:"Name",value:"contentType"},value:{kind:"Variable",name:{kind:"Name",value:"contentType"}}},{kind:"Argument",name:{kind:"Name",value:"filename"},value:{kind:"Variable",name:{kind:"Name",value:"filename"}}},{kind:"Argument",name:{kind:"Name",value:"metaData"},value:{kind:"Variable",name:{kind:"Name",value:"metaData"}}},{kind:"Argument",name:{kind:"Name",value:"size"},value:{kind:"Variable",name:{kind:"Name",value:"size"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UploadPayload"}}]}}]}},...ot.definitions]},fo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"googleUserAccountAuth"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"GoogleUserAccountAuthInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"googleUserAccountAuth"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"AuthResolverResponse"}}]}}]}},...ln.definitions]},bo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"imageUploadFromUrl"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"url"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"imageUploadFromUrl"},arguments:[{kind:"Argument",name:{kind:"Name",value:"url"},value:{kind:"Variable",name:{kind:"Name",value:"url"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ImageUploadFromUrlPayload"}}]}}]}},...Bn.definitions]},yo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"integrationDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrationDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},So={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"integrationFigma"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"code"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrationFigma"},arguments:[{kind:"Argument",name:{kind:"Name",value:"code"},value:{kind:"Variable",name:{kind:"Name",value:"code"}}},{kind:"Argument",name:{kind:"Name",value:"redirectUri"},value:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationPayload"}}]}}]}},...zn.definitions]},go={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"integrationGithubConnect"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"installationId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrationGithubConnect"},arguments:[{kind:"Argument",name:{kind:"Name",value:"installationId"},value:{kind:"Variable",name:{kind:"Name",value:"installationId"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationPayload"}}]}}]}},...zn.definitions]},Do={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"integrationGitlabConnect"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"accessToken"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"gitlabUrl"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrationGitlabConnect"},arguments:[{kind:"Argument",name:{kind:"Name",value:"accessToken"},value:{kind:"Variable",name:{kind:"Name",value:"accessToken"}}},{kind:"Argument",name:{kind:"Name",value:"gitlabUrl"},value:{kind:"Variable",name:{kind:"Name",value:"gitlabUrl"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationPayload"}}]}}]}},...zn.definitions]},Vo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"integrationGoogleSheets"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"code"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrationGoogleSheets"},arguments:[{kind:"Argument",name:{kind:"Name",value:"code"},value:{kind:"Variable",name:{kind:"Name",value:"code"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationPayload"}}]}}]}},...zn.definitions]},Fo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"integrationResourceArchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrationResourceArchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Ao={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"integrationSentryConnect"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"code"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"installationId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"organizationSlug"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrationSentryConnect"},arguments:[{kind:"Argument",name:{kind:"Name",value:"code"},value:{kind:"Variable",name:{kind:"Name",value:"code"}}},{kind:"Argument",name:{kind:"Name",value:"installationId"},value:{kind:"Variable",name:{kind:"Name",value:"installationId"}}},{kind:"Argument",name:{kind:"Name",value:"organizationSlug"},value:{kind:"Variable",name:{kind:"Name",value:"organizationSlug"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationPayload"}}]}}]}},...zn.definitions]},_o={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"integrationSlack"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"code"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"shouldUseV2Auth"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrationSlack"},arguments:[{kind:"Argument",name:{kind:"Name",value:"code"},value:{kind:"Variable",name:{kind:"Name",value:"code"}}},{kind:"Argument",name:{kind:"Name",value:"redirectUri"},value:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}}},{kind:"Argument",name:{kind:"Name",value:"shouldUseV2Auth"},value:{kind:"Variable",name:{kind:"Name",value:"shouldUseV2Auth"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationPayload"}}]}}]}},...zn.definitions]},To={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"integrationSlackImportEmojis"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"code"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrationSlackImportEmojis"},arguments:[{kind:"Argument",name:{kind:"Name",value:"code"},value:{kind:"Variable",name:{kind:"Name",value:"code"}}},{kind:"Argument",name:{kind:"Name",value:"redirectUri"},value:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationPayload"}}]}}]}},...zn.definitions]},Io={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"integrationSlackPersonal"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"code"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrationSlackPersonal"},arguments:[{kind:"Argument",name:{kind:"Name",value:"code"},value:{kind:"Variable",name:{kind:"Name",value:"code"}}},{kind:"Argument",name:{kind:"Name",value:"redirectUri"},value:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationPayload"}}]}}]}},...zn.definitions]},wo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"integrationSlackPost"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"code"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"shouldUseV2Auth"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"teamId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrationSlackPost"},arguments:[{kind:"Argument",name:{kind:"Name",value:"code"},value:{kind:"Variable",name:{kind:"Name",value:"code"}}},{kind:"Argument",name:{kind:"Name",value:"redirectUri"},value:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}}},{kind:"Argument",name:{kind:"Name",value:"shouldUseV2Auth"},value:{kind:"Variable",name:{kind:"Name",value:"shouldUseV2Auth"}}},{kind:"Argument",name:{kind:"Name",value:"teamId"},value:{kind:"Variable",name:{kind:"Name",value:"teamId"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationPayload"}}]}}]}},...zn.definitions]},qo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"integrationSlackProjectPost"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"code"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"projectId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrationSlackProjectPost"},arguments:[{kind:"Argument",name:{kind:"Name",value:"code"},value:{kind:"Variable",name:{kind:"Name",value:"code"}}},{kind:"Argument",name:{kind:"Name",value:"projectId"},value:{kind:"Variable",name:{kind:"Name",value:"projectId"}}},{kind:"Argument",name:{kind:"Name",value:"redirectUri"},value:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationPayload"}}]}}]}},...zn.definitions]},xo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"integrationZendesk"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"code"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"scope"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"subdomain"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"integrationZendesk"},arguments:[{kind:"Argument",name:{kind:"Name",value:"code"},value:{kind:"Variable",name:{kind:"Name",value:"code"}}},{kind:"Argument",name:{kind:"Name",value:"redirectUri"},value:{kind:"Variable",name:{kind:"Name",value:"redirectUri"}}},{kind:"Argument",name:{kind:"Name",value:"scope"},value:{kind:"Variable",name:{kind:"Name",value:"scope"}}},{kind:"Argument",name:{kind:"Name",value:"subdomain"},value:{kind:"Variable",name:{kind:"Name",value:"subdomain"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationPayload"}}]}}]}},...zn.definitions]},Co={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueArchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"trash"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueArchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"trash"},value:{kind:"Variable",name:{kind:"Name",value:"trash"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Oo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"IssueCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssuePayload"}}]}}]}},...sa.definitions]},Po={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},jo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueImportCreateAsana"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"asanaTeamName"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"asanaToken"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"instantProcess"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"teamId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueImportCreateAsana"},arguments:[{kind:"Argument",name:{kind:"Name",value:"asanaTeamName"},value:{kind:"Variable",name:{kind:"Name",value:"asanaTeamName"}}},{kind:"Argument",name:{kind:"Name",value:"asanaToken"},value:{kind:"Variable",name:{kind:"Name",value:"asanaToken"}}},{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"instantProcess"},value:{kind:"Variable",name:{kind:"Name",value:"instantProcess"}}},{kind:"Argument",name:{kind:"Name",value:"teamId"},value:{kind:"Variable",name:{kind:"Name",value:"teamId"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueImportPayload"}}]}}]}},...da.definitions]},Uo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueImportCreateClubhouse"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"clubhouseTeamName"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"clubhouseToken"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"instantProcess"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"teamId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueImportCreateClubhouse"},arguments:[{kind:"Argument",name:{kind:"Name",value:"clubhouseTeamName"},value:{kind:"Variable",name:{kind:"Name",value:"clubhouseTeamName"}}},{kind:"Argument",name:{kind:"Name",value:"clubhouseToken"},value:{kind:"Variable",name:{kind:"Name",value:"clubhouseToken"}}},{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"instantProcess"},value:{kind:"Variable",name:{kind:"Name",value:"instantProcess"}}},{kind:"Argument",name:{kind:"Name",value:"teamId"},value:{kind:"Variable",name:{kind:"Name",value:"teamId"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueImportPayload"}}]}}]}},...da.definitions]},Bo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueImportCreateGithub"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"githubRepoName"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"githubRepoOwner"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"githubShouldImportOrgProjects"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"githubToken"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"instantProcess"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"teamId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueImportCreateGithub"},arguments:[{kind:"Argument",name:{kind:"Name",value:"githubRepoName"},value:{kind:"Variable",name:{kind:"Name",value:"githubRepoName"}}},{kind:"Argument",name:{kind:"Name",value:"githubRepoOwner"},value:{kind:"Variable",name:{kind:"Name",value:"githubRepoOwner"}}},{kind:"Argument",name:{kind:"Name",value:"githubShouldImportOrgProjects"},value:{kind:"Variable",name:{kind:"Name",value:"githubShouldImportOrgProjects"}}},{kind:"Argument",name:{kind:"Name",value:"githubToken"},value:{kind:"Variable",name:{kind:"Name",value:"githubToken"}}},{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"instantProcess"},value:{kind:"Variable",name:{kind:"Name",value:"instantProcess"}}},{kind:"Argument",name:{kind:"Name",value:"teamId"},value:{kind:"Variable",name:{kind:"Name",value:"teamId"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueImportPayload"}}]}}]}},...da.definitions]},Eo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueImportCreateJira"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"instantProcess"}},type:{kind:"NamedType",name:{kind:"Name",value:"Boolean"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"jiraEmail"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"jiraHostname"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"jiraProject"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"jiraToken"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"teamId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueImportCreateJira"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"instantProcess"},value:{kind:"Variable",name:{kind:"Name",value:"instantProcess"}}},{kind:"Argument",name:{kind:"Name",value:"jiraEmail"},value:{kind:"Variable",name:{kind:"Name",value:"jiraEmail"}}},{kind:"Argument",name:{kind:"Name",value:"jiraHostname"},value:{kind:"Variable",name:{kind:"Name",value:"jiraHostname"}}},{kind:"Argument",name:{kind:"Name",value:"jiraProject"},value:{kind:"Variable",name:{kind:"Name",value:"jiraProject"}}},{kind:"Argument",name:{kind:"Name",value:"jiraToken"},value:{kind:"Variable",name:{kind:"Name",value:"jiraToken"}}},{kind:"Argument",name:{kind:"Name",value:"teamId"},value:{kind:"Variable",name:{kind:"Name",value:"teamId"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueImportPayload"}}]}}]}},...da.definitions]},Ro={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueImportDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"issueImportId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueImportDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"issueImportId"},value:{kind:"Variable",name:{kind:"Name",value:"issueImportId"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueImportDeletePayload"}}]}}]}},...ta.definitions]},zo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueImportProcess"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"issueImportId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"mapping"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"JSONObject"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueImportProcess"},arguments:[{kind:"Argument",name:{kind:"Name",value:"issueImportId"},value:{kind:"Variable",name:{kind:"Name",value:"issueImportId"}}},{kind:"Argument",name:{kind:"Name",value:"mapping"},value:{kind:"Variable",name:{kind:"Name",value:"mapping"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueImportPayload"}}]}}]}},...da.definitions]},Mo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueLabelArchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueLabelArchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Lo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueLabelCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"IssueLabelCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueLabelCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueLabelPayload"}}]}}]}},...ra.definitions]},Wo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueLabelUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"IssueLabelUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueLabelUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueLabelPayload"}}]}}]}},...ra.definitions]},Qo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueRelationCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"IssueRelationCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueRelationCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueRelationPayload"}}]}}]}},...va.definitions]},Ho={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueRelationDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueRelationDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Go={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueRelationUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"IssueRelationUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueRelationUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssueRelationPayload"}}]}}]}},...va.definitions]},$o={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueUnarchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueUnarchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Ko={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"issueUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"IssueUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"issueUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IssuePayload"}}]}}]}},...sa.definitions]},Jo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"joinOrganizationFromOnboarding"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"JoinOrganizationInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"joinOrganizationFromOnboarding"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CreateOrJoinOrganizationResponse"}}]}}]}},...fn.definitions]},Zo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"leaveOrganization"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"organizationId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"leaveOrganization"},arguments:[{kind:"Argument",name:{kind:"Name",value:"organizationId"},value:{kind:"Variable",name:{kind:"Name",value:"organizationId"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"CreateOrJoinOrganizationResponse"}}]}}]}},...fn.definitions]},Yo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"milestoneCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"MilestoneCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"milestoneCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"MilestonePayload"}}]}}]}},...Na.definitions]},Xo={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"milestoneDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"milestoneDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},er={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"milestoneUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"MilestoneUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"milestoneUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"MilestonePayload"}}]}}]}},...Na.definitions]},ir={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"notificationArchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"notificationArchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},nr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"notificationCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"NotificationUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"notificationCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"NotificationPayload"}}]}}]}},...ba.definitions]},ar={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"notificationSubscriptionCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"NotificationSubscriptionCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"notificationSubscriptionCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"NotificationSubscriptionPayload"}}]}}]}},...ga.definitions]},tr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"notificationSubscriptionDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"notificationSubscriptionDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},dr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"notificationUnarchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"notificationUnarchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},lr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"notificationUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"NotificationUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"notificationUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"NotificationPayload"}}]}}]}},...ba.definitions]},or={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"oauthClientArchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"oauthClientArchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},rr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"oauthClientCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OauthClientCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"oauthClientCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OauthClientPayload"}}]}}]}},...Va.definitions]},sr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"oauthClientRotateSecret"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"oauthClientRotateSecret"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"RotateSecretPayload"}}]}}]}},...Ga.definitions]},ur={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"oauthClientUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OauthClientUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"oauthClientUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OauthClientPayload"}}]}}]}},...Va.definitions]},mr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"oauthTokenRevoke"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"appId"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"scope"}},type:{kind:"NonNullType",type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"oauthTokenRevoke"},arguments:[{kind:"Argument",name:{kind:"Name",value:"appId"},value:{kind:"Variable",name:{kind:"Name",value:"appId"}}},{kind:"Argument",name:{kind:"Name",value:"scope"},value:{kind:"Variable",name:{kind:"Name",value:"scope"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OauthTokenRevokePayload"}}]}}]}},...Fa.definitions]},kr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"organizationDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"DeleteOrganizationInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizationDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrganizationDeletePayload"}}]}}]}},...Aa.definitions]},vr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"organizationDeleteChallenge"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizationDeleteChallenge"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrganizationDeletePayload"}}]}}]}},...Aa.definitions]},cr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"organizationDomainCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OrganizationDomainCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizationDomainCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrganizationDomainPayload"}}]}}]}},...Ta.definitions]},pr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"organizationDomainDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizationDomainDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Nr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"organizationDomainVerify"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OrganizationDomainVerificationInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizationDomainVerify"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrganizationDomainPayload"}}]}}]}},...Ta.definitions]},hr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"organizationInviteCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"OrganizationInviteCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizationInviteCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrganizationInvitePayload"}}]}}]}},...xa.definitions]},fr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"organizationInviteDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizationInviteDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},br={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"organizationUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"UpdateOrganizationInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"organizationUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"OrganizationPayload"}}]}}]}},...Ca.definitions]},yr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"projectArchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"projectArchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Sr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"projectCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ProjectCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"projectCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ProjectPayload"}}]}}]}},...Ea.definitions]},gr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"projectLinkCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ProjectLinkCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"projectLinkCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ProjectLinkPayload"}}]}}]}},...Ba.definitions]},Dr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"projectLinkDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"projectLinkDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Vr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"projectUnarchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"projectUnarchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Fr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"projectUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ProjectUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"projectUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ProjectPayload"}}]}}]}},...Ea.definitions]},Ar={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"pushSubscriptionCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"PushSubscriptionCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"pushSubscriptionCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PushSubscriptionPayload"}}]}}]}},...Ma.definitions]},_r={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"pushSubscriptionDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"pushSubscriptionDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"PushSubscriptionPayload"}}]}}]}},...Ma.definitions]},Tr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"reactionCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ReactionCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"reactionCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ReactionPayload"}}]}}]}},...Ha.definitions]},Ir={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"reactionDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"reactionDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},wr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"refreshGoogleSheetsData"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"refreshGoogleSheetsData"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"IntegrationPayload"}}]}}]}},...zn.definitions]},qr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"resentOrganizationInvite"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"resentOrganizationInvite"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},xr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"samlTokenUserAccountAuth"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"TokenUserAccountAuthInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"samlTokenUserAccountAuth"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"AuthResolverResponse"}}]}}]}},...ln.definitions]},Cr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"subscriptionArchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"subscriptionArchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Or={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"subscriptionSessionCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"plan"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"subscriptionSessionCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"plan"},value:{kind:"Variable",name:{kind:"Name",value:"plan"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SubscriptionSessionPayload"}}]}}]}},...Ja.definitions]},Pr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"subscriptionUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"SubscriptionUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"subscriptionUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SubscriptionPayload"}}]}}]}},...Ka.definitions]},jr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"subscriptionUpdateSessionCreate"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"subscriptionUpdateSessionCreate"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SubscriptionSessionPayload"}}]}}]}},...Ja.definitions]},Ur={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"subscriptionUpgrade"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"type"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"subscriptionUpgrade"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"type"},value:{kind:"Variable",name:{kind:"Name",value:"type"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"SubscriptionPayload"}}]}}]}},...Ka.definitions]},Br={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"teamArchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teamArchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Er={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"teamCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"copySettingsFromTeamId"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"TeamCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teamCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"copySettingsFromTeamId"},value:{kind:"Variable",name:{kind:"Name",value:"copySettingsFromTeamId"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamPayload"}}]}}]}},...nt.definitions]},Rr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"teamDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teamDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},zr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"teamMembershipCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"TeamMembershipCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teamMembershipCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamMembershipPayload"}}]}}]}},...it.definitions]},Mr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"teamMembershipDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teamMembershipDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Lr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"teamMembershipUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"TeamMembershipUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teamMembershipUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamMembershipPayload"}}]}}]}},...it.definitions]},Wr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"teamUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"TeamUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"teamUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TeamPayload"}}]}}]}},...nt.definitions]},Qr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"templateCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"TemplateCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"templateCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TemplatePayload"}}]}}]}},...tt.definitions]},Hr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"templateDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"templateDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},Gr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"templateUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"TemplateUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"templateUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"TemplatePayload"}}]}}]}},...tt.definitions]},$r={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userDemoteAdmin"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userDemoteAdmin"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserAdminPayload"}}]}}]}},...rt.definitions]},Kr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userFlagUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"flag"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"UserFlagType"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"operation"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"UserFlagUpdateOperation"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userFlagUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"flag"},value:{kind:"Variable",name:{kind:"Name",value:"flag"}}},{kind:"Argument",name:{kind:"Name",value:"operation"},value:{kind:"Variable",name:{kind:"Name",value:"operation"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserSettingsFlagPayload"}}]}}]}},...mt.definitions]},Jr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userPromoteAdmin"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userPromoteAdmin"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserAdminPayload"}}]}}]}},...rt.definitions]},Zr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userSettingsFlagIncrement"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"flag"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userSettingsFlagIncrement"},arguments:[{kind:"Argument",name:{kind:"Name",value:"flag"},value:{kind:"Variable",name:{kind:"Name",value:"flag"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserSettingsFlagPayload"}}]}}]}},...mt.definitions]},Yr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userSettingsFlagsReset"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userSettingsFlagsReset"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserSettingsFlagsResetPayload"}}]}}]}},...kt.definitions]},Xr={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userSettingsUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"UserSettingsUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userSettingsUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserSettingsPayload"}}]}}]}},...vt.definitions]},es={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userSubscribeToNewsletter"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userSubscribeToNewsletter"},selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserSubscribeToNewsletterPayload"}}]}}]}},...ct.definitions]},is={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userSuspend"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userSuspend"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserAdminPayload"}}]}}]}},...rt.definitions]},ns={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userUnsuspend"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userUnsuspend"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserAdminPayload"}}]}}]}},...rt.definitions]},as={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"UpdateUserInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"UserPayload"}}]}}]}},...ut.definitions]},ts={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"viewPreferencesCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ViewPreferencesCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"viewPreferencesCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ViewPreferencesPayload"}}]}}]}},...Nt.definitions]},ds={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"viewPreferencesDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"viewPreferencesDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},ls={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"viewPreferencesUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"ViewPreferencesUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"viewPreferencesUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ViewPreferencesPayload"}}]}}]}},...Nt.definitions]},os={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"webhookCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"WebhookCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"webhookCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"WebhookPayload"}}]}}]}},...bt.definitions]},rs={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"webhookDelete"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"webhookDelete"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},ss={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"webhookUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"WebhookUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"webhookUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"WebhookPayload"}}]}}]}},...bt.definitions]},us={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"workflowStateArchive"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"workflowStateArchive"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"ArchivePayload"}}]}}]}},...en.definitions]},ms={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"workflowStateCreate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"WorkflowStateCreateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"workflowStateCreate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"WorkflowStatePayload"}}]}}]}},...gt.definitions]},ks={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"workflowStateUpdate"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}}},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"WorkflowStateUpdateInput"}}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"workflowStateUpdate"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],selectionSet:{kind:"SelectionSet",selections:[{kind:"FragmentSpread",name:{kind:"Name",value:"WorkflowStatePayload"}}]}}]}},...gt.definitions]};var vs=Object.freeze({__proto__:null,get IssueRelationType(){return yi},get PaginationOrderBy(){return Si},get TrashOptionType(){return gi},get UserFlagType(){return Di},get UserFlagUpdateOperation(){return Vi},get ViewPreferencesType(){return Fi},get ViewType(){return Ai},FileUploadFragmentDoc:{kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"FileUpload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"FileUpload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"metaData"}},{kind:"Field",name:{kind:"Name",value:"size"}},{kind:"Field",name:{kind:"Name",value:"contentType"}},{kind:"Field",name:{kind:"Name",value:"assetUrl"}},{kind:"Field",name:{kind:"Name",value:"filename"}},{kind:"Field",name:{kind:"Name",value:"id"}},{kind:"Field",name:{kind:"Name",value:"creator"},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"}}]}}]}}]},TemplateFragmentDoc:xi,UserFragmentDoc:Ci,UserAccountFragmentDoc:Oi,DocumentStepFragmentDoc:{kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"DocumentStep"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"DocumentStep"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"clientId"}},{kind:"Field",name:{kind:"Name",value:"step"}},{kind:"Field",name:{kind:"Name",value:"version"}},{kind:"Field",name:{kind:"Name",value:"updatedAt"}},{kind:"Field",name:{kind:"Name",value:"archivedAt"}},{kind:"Field",name:{kind:"Name",value:"createdAt"}},{kind:"Field",name:{kind:"Name",value:"id"}}]}}]},SyncResponseFragmentDoc:Pi,ArchiveResponseFragmentDoc:ji,DependencyResponseFragmentDoc:Ui,GithubRepoFragmentDoc:Bi,GithubOrgFragmentDoc:Ei,GithubOAuthTokenPayloadFragmentDoc:Ri,AuthorizedApplicationFragmentDoc:zi,UserAuthorizedApplicationFragmentDoc:Mi,ApplicationFragmentDoc:{kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"Application"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"Application"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"}},{kind:"Field",name:{kind:"Name",value:"imageUrl"}},{kind:"Field",name:{kind:"Name",value:"description"}},{kind:"Field",name:{kind:"Name",value:"developer"}},{kind:"Field",name:{kind:"Name",value:"clientId"}},{kind:"Field",name:{kind:"Name",value:"developerUrl"}}]}}]},GoogleSheetsSettingsFragmentDoc:Li,SentrySettingsFragmentDoc:Wi,SlackPostSettingsFragmentDoc:Qi,ZendeskSettingsFragmentDoc:Hi,IntegrationSettingsFragmentDoc:Gi,SamlConfigurationFragmentDoc:{kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SamlConfiguration"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"SamlConfiguration"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"ssoBinding"}},{kind:"Field",name:{kind:"Name",value:"allowedDomains"}},{kind:"Field",name:{kind:"Name",value:"ssoEndpoint"}},{kind:"Field",name:{kind:"Name",value:"ssoSignAlgo"}},{kind:"Field",name:{kind:"Name",value:"ssoSigningCert"}}]}}]},UserSettingsFragmentDoc:$i,SubscriptionFragmentDoc:Ki,ApiKeyFragmentDoc:Ji,PageInfoFragmentDoc:Zi,ApiKeyConnectionFragmentDoc:Yi,ApiKeyPayloadFragmentDoc:Xi,ArchivePayloadFragmentDoc:en,AttachmentFragmentDoc:nn,AttachmentConnectionFragmentDoc:an,AttachmentPayloadFragmentDoc:tn,OrganizationFragmentDoc:dn,AuthResolverResponseFragmentDoc:ln,InvoiceFragmentDoc:on,CardFragmentDoc:rn,BillingDetailsPayloadFragmentDoc:sn,BillingEmailPayloadFragmentDoc:un,StepsResponseFragmentDoc:mn,CollaborationDocumentUpdatePayloadFragmentDoc:kn,CommentFragmentDoc:vn,CommentConnectionFragmentDoc:cn,CommentPayloadFragmentDoc:pn,ContactPayloadFragmentDoc:Nn,CreateCsvExportReportPayloadFragmentDoc:hn,CreateOrJoinOrganizationResponseFragmentDoc:fn,CustomViewFragmentDoc:bn,CustomViewConnectionFragmentDoc:yn,CustomViewPayloadFragmentDoc:Sn,CycleFragmentDoc:gn,CycleConnectionFragmentDoc:Dn,CyclePayloadFragmentDoc:Vn,DebugPayloadFragmentDoc:Fn,EmailUnsubscribePayloadFragmentDoc:An,EmailUserAccountAuthChallengeResponseFragmentDoc:_n,EmojiFragmentDoc:Tn,EmojiConnectionFragmentDoc:In,EmojiPayloadFragmentDoc:wn,EventPayloadFragmentDoc:qn,FavoriteFragmentDoc:xn,FavoriteConnectionFragmentDoc:Cn,FavoritePayloadFragmentDoc:On,FeedbackPayloadFragmentDoc:Pn,FigmaEmbedFragmentDoc:jn,FigmaEmbedPayloadFragmentDoc:Un,ImageUploadFromUrlPayloadFragmentDoc:Bn,IntegrationFragmentDoc:En,IntegrationConnectionFragmentDoc:Rn,IntegrationPayloadFragmentDoc:zn,CommitPayloadFragmentDoc:Mn,PullRequestPayloadFragmentDoc:Ln,SentryIssuePayloadFragmentDoc:Wn,IntegrationResourceDataFragmentDoc:Qn,IntegrationResourceFragmentDoc:Hn,IntegrationResourceConnectionFragmentDoc:Gn,InviteDataFragmentDoc:$n,InvitePagePayloadFragmentDoc:Kn,IssueFragmentDoc:Jn,IssueConnectionFragmentDoc:Zn,IssueDescriptionHistoryFragmentDoc:Yn,IssueDescriptionHistoryPayloadFragmentDoc:Xn,IssueRelationHistoryPayloadFragmentDoc:ea,IssueHistoryFragmentDoc:ia,IssueHistoryConnectionFragmentDoc:na,IssueImportFragmentDoc:aa,IssueImportDeletePayloadFragmentDoc:ta,IssueImportPayloadFragmentDoc:da,IssueLabelFragmentDoc:la,IssueLabelConnectionFragmentDoc:oa,IssueLabelPayloadFragmentDoc:ra,IssuePayloadFragmentDoc:sa,IssuePriorityValueFragmentDoc:ua,IssueRelationFragmentDoc:ma,IssueRelationConnectionFragmentDoc:ka,IssueRelationPayloadFragmentDoc:va,MilestoneFragmentDoc:ca,MilestoneConnectionFragmentDoc:pa,MilestonePayloadFragmentDoc:Na,NotificationFragmentDoc:ha,NotificationConnectionFragmentDoc:fa,NotificationPayloadFragmentDoc:ba,NotificationSubscriptionFragmentDoc:ya,NotificationSubscriptionConnectionFragmentDoc:Sa,NotificationSubscriptionPayloadFragmentDoc:ga,OauthClientFragmentDoc:Da,OauthClientPayloadFragmentDoc:Va,OauthTokenRevokePayloadFragmentDoc:Fa,OrganizationDeletePayloadFragmentDoc:Aa,OrganizationDomainFragmentDoc:_a,OrganizationDomainPayloadFragmentDoc:Ta,OrganizationDomainSimplePayloadFragmentDoc:{kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"OrganizationDomainSimplePayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"OrganizationDomainSimplePayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"success"}}]}}]},OrganizationExistsPayloadFragmentDoc:Ia,OrganizationInviteFragmentDoc:wa,OrganizationInviteConnectionFragmentDoc:qa,OrganizationInvitePayloadFragmentDoc:xa,OrganizationPayloadFragmentDoc:Ca,ProjectFragmentDoc:Oa,ProjectConnectionFragmentDoc:Pa,ProjectLinkFragmentDoc:ja,ProjectLinkConnectionFragmentDoc:Ua,ProjectLinkPayloadFragmentDoc:Ba,ProjectPayloadFragmentDoc:Ea,PushSubscriptionFragmentDoc:Ra,PushSubscriptionConnectionFragmentDoc:za,PushSubscriptionPayloadFragmentDoc:Ma,PushSubscriptionTestPayloadFragmentDoc:La,ReactionFragmentDoc:Wa,ReactionConnectionFragmentDoc:Qa,ReactionPayloadFragmentDoc:Ha,RotateSecretPayloadFragmentDoc:Ga,SsoUrlFromEmailResponseFragmentDoc:$a,SubscriptionPayloadFragmentDoc:Ka,SubscriptionSessionPayloadFragmentDoc:Ja,SynchronizedPayloadFragmentDoc:{kind:"Document",definitions:[{kind:"FragmentDefinition",name:{kind:"Name",value:"SynchronizedPayload"},typeCondition:{kind:"NamedType",name:{kind:"Name",value:"SynchronizedPayload"}},selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"lastSyncId"}}]}}]},TeamFragmentDoc:Za,TeamConnectionFragmentDoc:Ya,TeamMembershipFragmentDoc:Xa,TeamMembershipConnectionFragmentDoc:et,TeamMembershipPayloadFragmentDoc:it,TeamPayloadFragmentDoc:nt,TemplateConnectionFragmentDoc:at,TemplatePayloadFragmentDoc:tt,UploadFileHeaderFragmentDoc:dt,UploadFileFragmentDoc:lt,UploadPayloadFragmentDoc:ot,UserAdminPayloadFragmentDoc:rt,UserConnectionFragmentDoc:st,UserPayloadFragmentDoc:ut,UserSettingsFlagPayloadFragmentDoc:mt,UserSettingsFlagsResetPayloadFragmentDoc:kt,UserSettingsPayloadFragmentDoc:vt,UserSubscribeToNewsletterPayloadFragmentDoc:ct,ViewPreferencesFragmentDoc:pt,ViewPreferencesPayloadFragmentDoc:Nt,WebhookFragmentDoc:ht,WebhookConnectionFragmentDoc:ft,WebhookPayloadFragmentDoc:bt,WorkflowStateFragmentDoc:yt,WorkflowStateConnectionFragmentDoc:St,WorkflowStatePayloadFragmentDoc:gt,ApiKeysDocument:Dt,ApplicationWithAuthorizationDocument:Vt,ArchivedModelSyncDocument:Ft,ArchivedModelsSyncDocument:At,AttachmentDocument:_t,AttachmentIssueDocument:Tt,AttachmentIssue_AttachmentsDocument:It,AttachmentIssue_ChildrenDocument:wt,AttachmentIssue_CommentsDocument:qt,AttachmentIssue_HistoryDocument:xt,AttachmentIssue_InverseRelationsDocument:Ct,AttachmentIssue_LabelsDocument:Ot,AttachmentIssue_RelationsDocument:Pt,AttachmentIssue_SubscribersDocument:jt,AttachmentsDocument:Ut,AuthorizedApplicationsDocument:Bt,AvailableUsersDocument:Et,BillingDetailsDocument:Rt,BillingDetails_PaymentMethodDocument:zt,CollaborativeDocumentJoinDocument:Mt,CollaborativeDocumentJoin_StepsDocument:Lt,CommentDocument:Wt,CommentsDocument:Qt,CustomViewDocument:Ht,CustomViewsDocument:Gt,CycleDocument:$t,Cycle_IssuesDocument:Kt,Cycle_UncompletedIssuesUponCloseDocument:Jt,CyclesDocument:Zt,DependentModelSyncDocument:Yt,EmojiDocument:Xt,EmojisDocument:ed,FavoriteDocument:id,FavoritesDocument:nd,FigmaEmbedInfoDocument:ad,FigmaEmbedInfo_FigmaEmbedDocument:td,IntegrationDocument:dd,IntegrationsDocument:ld,InviteInfoDocument:od,InviteInfo_InviteDataDocument:rd,IssueDocument:sd,Issue_AttachmentsDocument:ud,Issue_ChildrenDocument:md,Issue_CommentsDocument:kd,Issue_HistoryDocument:vd,Issue_InverseRelationsDocument:cd,Issue_LabelsDocument:pd,Issue_RelationsDocument:Nd,Issue_SubscribersDocument:hd,IssueDescriptionHistoryDocument:fd,IssueImportFinishGithubOAuthDocument:bd,IssueLabelDocument:yd,IssueLabel_IssuesDocument:Sd,IssueLabelsDocument:gd,IssuePriorityValuesDocument:Dd,IssueRelationDocument:Vd,IssueRelationsDocument:Fd,IssueSearchDocument:Ad,IssuesDocument:_d,MilestoneDocument:Td,Milestone_ProjectsDocument:Id,MilestonesDocument:wd,NotificationDocument:qd,NotificationSubscriptionDocument:xd,NotificationSubscriptionsDocument:Cd,NotificationsDocument:Od,OrganizationDocument:Pd,Organization_IntegrationsDocument:jd,Organization_MilestonesDocument:Ud,Organization_TeamsDocument:Bd,Organization_UsersDocument:Ed,OrganizationExistsDocument:Rd,OrganizationInviteDocument:zd,OrganizationInvite_IssuesDocument:Md,OrganizationInvitesDocument:Ld,ProjectDocument:Wd,Project_IssuesDocument:Qd,Project_LinksDocument:Hd,Project_MembersDocument:Gd,Project_TeamsDocument:$d,ProjectLinkDocument:Kd,ProjectLinksDocument:Jd,ProjectsDocument:Zd,PushSubscriptionTestDocument:Yd,ReactionDocument:Xd,ReactionsDocument:el,SsoUrlFromEmailDocument:il,SubscriptionDocument:nl,SyncBootstrapDocument:al,TeamDocument:tl,Team_CyclesDocument:dl,Team_IssuesDocument:ll,Team_LabelsDocument:ol,Team_MembersDocument:rl,Team_MembershipsDocument:sl,Team_ProjectsDocument:ul,Team_StatesDocument:ml,Team_TemplatesDocument:kl,Team_WebhooksDocument:vl,TeamMembershipDocument:cl,TeamMembershipsDocument:pl,TeamsDocument:Nl,TemplateDocument:hl,TemplatesDocument:fl,UserDocument:bl,User_AssignedIssuesDocument:yl,User_CreatedIssuesDocument:Sl,User_TeamMembershipsDocument:gl,User_TeamsDocument:Dl,UserSettingsDocument:Vl,UsersDocument:Fl,ViewerDocument:Al,Viewer_AssignedIssuesDocument:_l,Viewer_CreatedIssuesDocument:Tl,Viewer_TeamMembershipsDocument:Il,Viewer_TeamsDocument:wl,WebhookDocument:ql,WebhooksDocument:xl,WorkflowStateDocument:Cl,WorkflowState_IssuesDocument:Ol,WorkflowStatesDocument:Pl,ApiKeyCreateDocument:jl,ApiKeyDeleteDocument:Ul,AttachmentArchiveDocument:Bl,AttachmentCreateDocument:El,AttachmentDeleteDocument:Rl,AttachmentLinkZendeskDocument:zl,AttachmentUpdateDocument:Ml,BillingEmailUpdateDocument:Ll,CollaborativeDocumentUpdateDocument:Wl,CommentCreateDocument:Ql,CommentDeleteDocument:Hl,CommentUpdateDocument:Gl,ContactCreateDocument:$l,CreateCsvExportReportDocument:Kl,CreateOrganizationFromOnboardingDocument:Jl,CustomViewCreateDocument:Zl,CustomViewDeleteDocument:Yl,CustomViewUpdateDocument:Xl,CycleArchiveDocument:eo,CycleCreateDocument:io,CycleUpdateDocument:no,DebugCreateSamlOrgDocument:ao,DebugFailWithInternalErrorDocument:to,DebugFailWithWarningDocument:lo,EmailTokenUserAccountAuthDocument:oo,EmailUnsubscribeDocument:ro,EmailUserAccountAuthChallengeDocument:so,EmojiCreateDocument:uo,EmojiDeleteDocument:mo,EventCreateDocument:ko,FavoriteCreateDocument:vo,FavoriteDeleteDocument:co,FavoriteUpdateDocument:po,FeedbackCreateDocument:No,FileUploadDocument:ho,GoogleUserAccountAuthDocument:fo,ImageUploadFromUrlDocument:bo,IntegrationDeleteDocument:yo,IntegrationFigmaDocument:So,IntegrationGithubConnectDocument:go,IntegrationGitlabConnectDocument:Do,IntegrationGoogleSheetsDocument:Vo,IntegrationResourceArchiveDocument:Fo,IntegrationSentryConnectDocument:Ao,IntegrationSlackDocument:_o,IntegrationSlackImportEmojisDocument:To,IntegrationSlackPersonalDocument:Io,IntegrationSlackPostDocument:wo,IntegrationSlackProjectPostDocument:qo,IntegrationZendeskDocument:xo,IssueArchiveDocument:Co,IssueCreateDocument:Oo,IssueDeleteDocument:Po,IssueImportCreateAsanaDocument:jo,IssueImportCreateClubhouseDocument:Uo,IssueImportCreateGithubDocument:Bo,IssueImportCreateJiraDocument:Eo,IssueImportDeleteDocument:Ro,IssueImportProcessDocument:zo,IssueLabelArchiveDocument:Mo,IssueLabelCreateDocument:Lo,IssueLabelUpdateDocument:Wo,IssueRelationCreateDocument:Qo,IssueRelationDeleteDocument:Ho,IssueRelationUpdateDocument:Go,IssueUnarchiveDocument:$o,IssueUpdateDocument:Ko,JoinOrganizationFromOnboardingDocument:Jo,LeaveOrganizationDocument:Zo,MilestoneCreateDocument:Yo,MilestoneDeleteDocument:Xo,MilestoneUpdateDocument:er,NotificationArchiveDocument:ir,NotificationCreateDocument:nr,NotificationSubscriptionCreateDocument:ar,NotificationSubscriptionDeleteDocument:tr,NotificationUnarchiveDocument:dr,NotificationUpdateDocument:lr,OauthClientArchiveDocument:or,OauthClientCreateDocument:rr,OauthClientRotateSecretDocument:sr,OauthClientUpdateDocument:ur,OauthTokenRevokeDocument:mr,OrganizationDeleteDocument:kr,OrganizationDeleteChallengeDocument:vr,OrganizationDomainCreateDocument:cr,OrganizationDomainDeleteDocument:pr,OrganizationDomainVerifyDocument:Nr,OrganizationInviteCreateDocument:hr,OrganizationInviteDeleteDocument:fr,OrganizationUpdateDocument:br,ProjectArchiveDocument:yr,ProjectCreateDocument:Sr,ProjectLinkCreateDocument:gr,ProjectLinkDeleteDocument:Dr,ProjectUnarchiveDocument:Vr,ProjectUpdateDocument:Fr,PushSubscriptionCreateDocument:Ar,PushSubscriptionDeleteDocument:_r,ReactionCreateDocument:Tr,ReactionDeleteDocument:Ir,RefreshGoogleSheetsDataDocument:wr,ResentOrganizationInviteDocument:qr,SamlTokenUserAccountAuthDocument:xr,SubscriptionArchiveDocument:Cr,SubscriptionSessionCreateDocument:Or,SubscriptionUpdateDocument:Pr,SubscriptionUpdateSessionCreateDocument:jr,SubscriptionUpgradeDocument:Ur,TeamArchiveDocument:Br,TeamCreateDocument:Er,TeamDeleteDocument:Rr,TeamMembershipCreateDocument:zr,TeamMembershipDeleteDocument:Mr,TeamMembershipUpdateDocument:Lr,TeamUpdateDocument:Wr,TemplateCreateDocument:Qr,TemplateDeleteDocument:Hr,TemplateUpdateDocument:Gr,UserDemoteAdminDocument:$r,UserFlagUpdateDocument:Kr,UserPromoteAdminDocument:Jr,UserSettingsFlagIncrementDocument:Zr,UserSettingsFlagsResetDocument:Yr,UserSettingsUpdateDocument:Xr,UserSubscribeToNewsletterDocument:es,UserSuspendDocument:is,UserUnsuspendDocument:ns,UserUpdateDocument:as,ViewPreferencesCreateDocument:ts,ViewPreferencesDeleteDocument:ds,ViewPreferencesUpdateDocument:ls,WebhookCreateDocument:os,WebhookDeleteDocument:rs,WebhookUpdateDocument:ss,WorkflowStateArchiveDocument:us,WorkflowStateCreateDocument:ms,WorkflowStateUpdateDocument:ks});class cs{constructor(e){this._request=e}}class ps extends cs{}class Ns extends ps{constructor(e,i,n,a){super(e),this._fetch=i,this.nodes=n,this.pageInfo=a}_appendNodes(e){var i;this.nodes=e?[...null!==(i=this.nodes)&&void 0!==i?i:[],...e]:this.nodes}_prependNodes(e){var i;this.nodes=e?[...e,...null!==(i=this.nodes)&&void 0!==i?i:[]]:this.nodes}_appendPageInfo(e){var i,n;this.pageInfo&&(this.pageInfo.endCursor=null!==(i=null==e?void 0:e.endCursor)&&void 0!==i?i:this.pageInfo.startCursor,this.pageInfo.hasNextPage=null!==(n=null==e?void 0:e.hasNextPage)&&void 0!==n?n:this.pageInfo.hasNextPage)}_prependPageInfo(e){var i,n;this.pageInfo&&(this.pageInfo.startCursor=null!==(i=null==e?void 0:e.startCursor)&&void 0!==i?i:this.pageInfo.startCursor,this.pageInfo.hasPreviousPage=null!==(n=null==e?void 0:e.hasPreviousPage)&&void 0!==n?n:this.pageInfo.hasPreviousPage)}fetchNext(){var e,i;return(null===(e=this.pageInfo)||void 0===e?void 0:e.hasNextPage)?this._fetch({after:null===(i=this.pageInfo)||void 0===i?void 0:i.endCursor}).then((e=>(this._appendNodes(null==e?void 0:e.nodes),this._appendPageInfo(null==e?void 0:e.pageInfo),this))):Promise.resolve(this)}fetchPrevious(){var e,i;return(null===(e=this.pageInfo)||void 0===e?void 0:e.hasPreviousPage)?this._fetch({before:null===(i=this.pageInfo)||void 0===i?void 0:i.startCursor}).then((e=>(this._prependNodes(null==e?void 0:e.nodes),this._prependPageInfo(null==e?void 0:e.pageInfo),this))):Promise.resolve(this)}}function hs(e){try{return e?new Date(e):void 0}catch(e){return}}function fs(e){try{return e?JSON.parse(e):void 0}catch(e){return}}class bs extends cs{constructor(e,i){var n,a,t,d,l;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.label=null!==(d=i.label)&&void 0!==d?d:void 0,this.updatedAt=null!==(l=hs(i.updatedAt))&&void 0!==l?l:void 0}delete(){return this.id?new gv(this._request).fetch(this.id):void 0}}class ys extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new bs(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class Ss extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this.apiKey=i.apiKey?new bs(e,i.apiKey):void 0}}class gs extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0}}class Ds extends cs{constructor(e,i){var n,a,t;super(e),this.archive=null!==(n=i.archive)&&void 0!==n?n:void 0,this.databaseVersion=null!==(a=i.databaseVersion)&&void 0!==a?a:void 0,this.totalCount=null!==(t=i.totalCount)&&void 0!==t?t:void 0}}class Vs extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.groupBySource=null!==(t=i.groupBySource)&&void 0!==t?t:void 0,this.id=null!==(d=i.id)&&void 0!==d?d:void 0,this.metadata=null!==(l=fs(i.metadata))&&void 0!==l?l:void 0,this.source=null!==(o=fs(i.source))&&void 0!==o?o:void 0,this.subtitle=null!==(r=i.subtitle)&&void 0!==r?r:void 0,this.title=null!==(s=i.title)&&void 0!==s?s:void 0,this.updatedAt=null!==(u=hs(i.updatedAt))&&void 0!==u?u:void 0,this.url=null!==(m=i.url)&&void 0!==m?m:void 0,this._issue=null!==(k=i.issue)&&void 0!==k?k:void 0}get issue(){var e,i;return(null===(e=this._issue)||void 0===e?void 0:e.id)?new qk(this._request).fetch(null===(i=this._issue)||void 0===i?void 0:i.id):void 0}archive(){return this.id?new Dv(this._request).fetch(this.id):void 0}delete(){return this.id?new Fv(this._request).fetch(this.id):void 0}update(e){return this.id?new _v(this._request).fetch(this.id,e):void 0}}class Fs extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Vs(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class As extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._attachment=null!==(t=i.attachment)&&void 0!==t?t:void 0}get attachment(){var e,i;return(null===(e=this._attachment)||void 0===e?void 0:e.id)?new sk(this._request).fetch(null===(i=this._attachment)||void 0===i?void 0:i.id):void 0}}class _s extends cs{constructor(e,i){var n,a,t,d;super(e),this.allowDomainAccess=null!==(n=i.allowDomainAccess)&&void 0!==n?n:void 0,this.email=null!==(a=i.email)&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.token=null!==(d=i.token)&&void 0!==d?d:void 0,this.availableOrganizations=i.availableOrganizations?i.availableOrganizations.map((i=>new Ku(e,i))):void 0,this.users=i.users?i.users.map((i=>new Rm(e,i))):void 0}}class Ts extends cs{constructor(e,i){var n,a,t,d,l,o,r,s;super(e),this.appId=null!==(n=i.appId)&&void 0!==n?n:void 0,this.clientId=null!==(a=i.clientId)&&void 0!==a?a:void 0,this.description=null!==(t=i.description)&&void 0!==t?t:void 0,this.developer=null!==(d=i.developer)&&void 0!==d?d:void 0,this.developerUrl=null!==(l=i.developerUrl)&&void 0!==l?l:void 0,this.imageUrl=null!==(o=i.imageUrl)&&void 0!==o?o:void 0,this.name=null!==(r=i.name)&&void 0!==r?r:void 0,this.scope=null!==(s=i.scope)&&void 0!==s?s:void 0}}class Is extends cs{constructor(e,i){var n,a;super(e),this.email=null!==(n=i.email)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this.paymentMethod=i.paymentMethod?new qs(e,i.paymentMethod):void 0,this.invoices=i.invoices?i.invoices.map((i=>new fu(e,i))):void 0}}class ws extends cs{constructor(e,i){var n,a;super(e),this.email=null!==(n=i.email)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0}}class qs extends cs{constructor(e,i){var n,a;super(e),this.brand=null!==(n=i.brand)&&void 0!==n?n:void 0,this.last4=null!==(a=i.last4)&&void 0!==a?a:void 0}}class xs extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0,this.steps=i.steps?new Dm(e,i.steps):void 0}}class Cs extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.body=null!==(a=i.body)&&void 0!==a?a:void 0,this.createdAt=null!==(t=hs(i.createdAt))&&void 0!==t?t:void 0,this.editedAt=null!==(d=hs(i.editedAt))&&void 0!==d?d:void 0,this.id=null!==(l=i.id)&&void 0!==l?l:void 0,this.updatedAt=null!==(o=hs(i.updatedAt))&&void 0!==o?o:void 0,this.url=null!==(r=i.url)&&void 0!==r?r:void 0,this._issue=null!==(s=i.issue)&&void 0!==s?s:void 0,this._user=null!==(u=i.user)&&void 0!==u?u:void 0}get issue(){var e,i;return(null===(e=this._issue)||void 0===e?void 0:e.id)?new qk(this._request).fetch(null===(i=this._issue)||void 0===i?void 0:i.id):void 0}get user(){var e,i;return(null===(e=this._user)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._user)||void 0===i?void 0:i.id):void 0}delete(){return this.id?new qv(this._request).fetch(this.id):void 0}update(e){return this.id?new xv(this._request).fetch(this.id,e):void 0}}class Os extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Cs(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class Ps extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._comment=null!==(t=i.comment)&&void 0!==t?t:void 0}get comment(){var e,i;return(null===(e=this._comment)||void 0===e?void 0:e.id)?new Nk(this._request).fetch(null===(i=this._comment)||void 0===i?void 0:i.id):void 0}}class js extends cs{constructor(e,i){var n,a,t,d,l,o,r;super(e),this.added=null!==(n=i.added)&&void 0!==n?n:void 0,this.id=null!==(a=i.id)&&void 0!==a?a:void 0,this.message=null!==(t=i.message)&&void 0!==t?t:void 0,this.modified=null!==(d=i.modified)&&void 0!==d?d:void 0,this.removed=null!==(l=i.removed)&&void 0!==l?l:void 0,this.timestamp=null!==(o=i.timestamp)&&void 0!==o?o:void 0,this.url=null!==(r=i.url)&&void 0!==r?r:void 0}}class Us extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0}}class Bs extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0}}class Es extends cs{constructor(e,i){var n;super(e),this._user=null!==(n=i.user)&&void 0!==n?n:void 0}get organization(){return new Gk(this._request).fetch()}get user(){var e,i;return(null===(e=this._user)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._user)||void 0===i?void 0:i.id):void 0}}class Rs extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k,v;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.color=null!==(a=i.color)&&void 0!==a?a:void 0,this.createdAt=null!==(t=hs(i.createdAt))&&void 0!==t?t:void 0,this.description=null!==(d=i.description)&&void 0!==d?d:void 0,this.filters=null!==(l=fs(i.filters))&&void 0!==l?l:void 0,this.icon=null!==(o=i.icon)&&void 0!==o?o:void 0,this.id=null!==(r=i.id)&&void 0!==r?r:void 0,this.name=null!==(s=i.name)&&void 0!==s?s:void 0,this.shared=null!==(u=i.shared)&&void 0!==u?u:void 0,this.updatedAt=null!==(m=hs(i.updatedAt))&&void 0!==m?m:void 0,this._creator=null!==(k=i.creator)&&void 0!==k?k:void 0,this._team=null!==(v=i.team)&&void 0!==v?v:void 0}get creator(){var e,i;return(null===(e=this._creator)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._creator)||void 0===i?void 0:i.id):void 0}get organization(){return new Gk(this._request).fetch()}get team(){var e,i;return(null===(e=this._team)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._team)||void 0===i?void 0:i.id):void 0}delete(){return this.id?new Uv(this._request).fetch(this.id):void 0}update(e){return this.id?new Bv(this._request).fetch(this.id,e):void 0}}class zs extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Rs(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class Ms extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._customView=null!==(t=i.customView)&&void 0!==t?t:void 0}get customView(){var e,i;return(null===(e=this._customView)||void 0===e?void 0:e.id)?new fk(this._request).fetch(null===(i=this._customView)||void 0===i?void 0:i.id):void 0}}class Ls extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k,v,c,p,N;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.autoArchivedAt=null!==(a=hs(i.autoArchivedAt))&&void 0!==a?a:void 0,this.completedAt=null!==(t=hs(i.completedAt))&&void 0!==t?t:void 0,this.completedIssueCountHistory=null!==(d=i.completedIssueCountHistory)&&void 0!==d?d:void 0,this.completedScopeHistory=null!==(l=i.completedScopeHistory)&&void 0!==l?l:void 0,this.createdAt=null!==(o=hs(i.createdAt))&&void 0!==o?o:void 0,this.endsAt=null!==(r=hs(i.endsAt))&&void 0!==r?r:void 0,this.id=null!==(s=i.id)&&void 0!==s?s:void 0,this.issueCountHistory=null!==(u=i.issueCountHistory)&&void 0!==u?u:void 0,this.name=null!==(m=i.name)&&void 0!==m?m:void 0,this.number=null!==(k=i.number)&&void 0!==k?k:void 0,this.scopeHistory=null!==(v=i.scopeHistory)&&void 0!==v?v:void 0,this.startsAt=null!==(c=hs(i.startsAt))&&void 0!==c?c:void 0,this.updatedAt=null!==(p=hs(i.updatedAt))&&void 0!==p?p:void 0,this._team=null!==(N=i.team)&&void 0!==N?N:void 0}get team(){var e,i;return(null===(e=this._team)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._team)||void 0===i?void 0:i.id):void 0}issues(e){return this.id?new Zp(this._request,this.id,e).fetch(e):void 0}uncompletedIssuesUponClose(e){return this.id?new Yp(this._request,this.id,e).fetch(e):void 0}archive(){return this.id?new Ev(this._request).fetch(this.id):void 0}update(e){return this.id?new zv(this._request).fetch(this.id,e):void 0}}class Ws extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Ls(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class Qs extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._cycle=null!==(t=i.cycle)&&void 0!==t?t:void 0}get cycle(){var e,i;return(null===(e=this._cycle)||void 0===e?void 0:e.id)?new yk(this._request).fetch(null===(i=this._cycle)||void 0===i?void 0:i.id):void 0}}class Hs extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0}}class Gs extends cs{constructor(e,i){var n;super(e),this.dependencies=null!==(n=i.dependencies)&&void 0!==n?n:void 0}}class $s extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0}}class Ks extends cs{constructor(e,i){var n,a;super(e),this.authType=null!==(n=i.authType)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0}}class Js extends cs{constructor(e,i){var n,a,t,d,l,o,r,s;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.name=null!==(d=i.name)&&void 0!==d?d:void 0,this.source=null!==(l=i.source)&&void 0!==l?l:void 0,this.updatedAt=null!==(o=hs(i.updatedAt))&&void 0!==o?o:void 0,this.url=null!==(r=i.url)&&void 0!==r?r:void 0,this._creator=null!==(s=i.creator)&&void 0!==s?s:void 0}get creator(){var e,i;return(null===(e=this._creator)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._creator)||void 0===i?void 0:i.id):void 0}get organization(){return new Gk(this._request).fetch()}delete(){return this.id?new Kv(this._request).fetch(this.id):void 0}}class Zs extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Js(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class Ys extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._emoji=null!==(t=i.emoji)&&void 0!==t?t:void 0}get emoji(){var e,i;return(null===(e=this._emoji)||void 0===e?void 0:e.id)?new Dk(this._request).fetch(null===(i=this._emoji)||void 0===i?void 0:i.id):void 0}}class Xs extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0}}class eu extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k,v;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.sortOrder=null!==(d=i.sortOrder)&&void 0!==d?d:void 0,this.type=null!==(l=i.type)&&void 0!==l?l:void 0,this.updatedAt=null!==(o=hs(i.updatedAt))&&void 0!==o?o:void 0,this._cycle=null!==(r=i.cycle)&&void 0!==r?r:void 0,this._issue=null!==(s=i.issue)&&void 0!==s?s:void 0,this._label=null!==(u=i.label)&&void 0!==u?u:void 0,this._project=null!==(m=i.project)&&void 0!==m?m:void 0,this._projectTeam=null!==(k=i.projectTeam)&&void 0!==k?k:void 0,this._user=null!==(v=i.user)&&void 0!==v?v:void 0}get cycle(){var e,i;return(null===(e=this._cycle)||void 0===e?void 0:e.id)?new yk(this._request).fetch(null===(i=this._cycle)||void 0===i?void 0:i.id):void 0}get issue(){var e,i;return(null===(e=this._issue)||void 0===e?void 0:e.id)?new qk(this._request).fetch(null===(i=this._issue)||void 0===i?void 0:i.id):void 0}get label(){var e,i;return(null===(e=this._label)||void 0===e?void 0:e.id)?new Ok(this._request).fetch(null===(i=this._label)||void 0===i?void 0:i.id):void 0}get project(){var e,i;return(null===(e=this._project)||void 0===e?void 0:e.id)?new Zk(this._request).fetch(null===(i=this._project)||void 0===i?void 0:i.id):void 0}get projectTeam(){var e,i;return(null===(e=this._projectTeam)||void 0===e?void 0:e.id)?new Zk(this._request).fetch(null===(i=this._projectTeam)||void 0===i?void 0:i.id):void 0}get user(){var e,i;return(null===(e=this._user)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._user)||void 0===i?void 0:i.id):void 0}delete(){return this.id?new Yv(this._request).fetch(this.id):void 0}update(e){return this.id?new Xv(this._request).fetch(this.id,e):void 0}}class iu extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new eu(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class nu extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._favorite=null!==(t=i.favorite)&&void 0!==t?t:void 0}get favorite(){var e,i;return(null===(e=this._favorite)||void 0===e?void 0:e.id)?new Fk(this._request).fetch(null===(i=this._favorite)||void 0===i?void 0:i.id):void 0}}class au extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0}}class tu extends cs{constructor(e,i){var n,a,t,d;super(e),this.lastModified=null!==(n=hs(i.lastModified))&&void 0!==n?n:void 0,this.name=null!==(a=i.name)&&void 0!==a?a:void 0,this.nodeName=null!==(t=i.nodeName)&&void 0!==t?t:void 0,this.url=null!==(d=i.url)&&void 0!==d?d:void 0}}class du extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0,this.figmaEmbed=i.figmaEmbed?new tu(e,i.figmaEmbed):void 0}}class lu extends cs{constructor(e,i){var n;super(e),this.token=null!==(n=i.token)&&void 0!==n?n:void 0,this.organizations=i.organizations?i.organizations.map((i=>new ou(e,i))):void 0}}class ou extends cs{constructor(e,i){var n,a,t;super(e),this.id=null!==(n=i.id)&&void 0!==n?n:void 0,this.login=null!==(a=i.login)&&void 0!==a?a:void 0,this.name=null!==(t=i.name)&&void 0!==t?t:void 0,this.repositories=i.repositories?i.repositories.map((i=>new ru(e,i))):void 0}}class ru extends cs{constructor(e,i){var n,a;super(e),this.id=null!==(n=i.id)&&void 0!==n?n:void 0,this.name=null!==(a=i.name)&&void 0!==a?a:void 0}}class su extends cs{constructor(e,i){var n,a,t,d;super(e),this.sheetId=null!==(n=i.sheetId)&&void 0!==n?n:void 0,this.spreadsheetId=null!==(a=i.spreadsheetId)&&void 0!==a?a:void 0,this.spreadsheetUrl=null!==(t=i.spreadsheetUrl)&&void 0!==t?t:void 0,this.updatedIssuesAt=null!==(d=hs(i.updatedIssuesAt))&&void 0!==d?d:void 0}}class uu extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this.url=null!==(t=i.url)&&void 0!==t?t:void 0}}class mu extends cs{constructor(e,i){var n,a,t,d,l,o,r;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.service=null!==(d=i.service)&&void 0!==d?d:void 0,this.updatedAt=null!==(l=hs(i.updatedAt))&&void 0!==l?l:void 0,this._creator=null!==(o=i.creator)&&void 0!==o?o:void 0,this._team=null!==(r=i.team)&&void 0!==r?r:void 0}get creator(){var e,i;return(null===(e=this._creator)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._creator)||void 0===i?void 0:i.id):void 0}get organization(){return new Gk(this._request).fetch()}get team(){var e,i;return(null===(e=this._team)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._team)||void 0===i?void 0:i.id):void 0}delete(){return this.id?new tc(this._request).fetch(this.id):void 0}resourceArchive(){return this.id?new sc(this._request).fetch(this.id):void 0}}class ku extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new mu(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class vu extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._integration=null!==(t=i.integration)&&void 0!==t?t:void 0}get integration(){var e,i;return(null===(e=this._integration)||void 0===e?void 0:e.id)?new Tk(this._request).fetch(null===(i=this._integration)||void 0===i?void 0:i.id):void 0}}class cu extends cs{constructor(e,i){var n,a,t,d,l,o,r,s;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.resourceId=null!==(d=i.resourceId)&&void 0!==d?d:void 0,this.resourceType=null!==(l=i.resourceType)&&void 0!==l?l:void 0,this.updatedAt=null!==(o=hs(i.updatedAt))&&void 0!==o?o:void 0,this.data=i.data?new pu(e,i.data):void 0,this.pullRequest=i.pullRequest?new mm(e,i.pullRequest):void 0,this._integration=null!==(r=i.integration)&&void 0!==r?r:void 0,this._issue=null!==(s=i.issue)&&void 0!==s?s:void 0}get integration(){var e,i;return(null===(e=this._integration)||void 0===e?void 0:e.id)?new Tk(this._request).fetch(null===(i=this._integration)||void 0===i?void 0:i.id):void 0}get issue(){var e,i;return(null===(e=this._issue)||void 0===e?void 0:e.id)?new qk(this._request).fetch(null===(i=this._issue)||void 0===i?void 0:i.id):void 0}archive(){return this.id?new sc(this._request).fetch(this.id):void 0}}class pu extends cs{constructor(e,i){super(e),this.githubCommit=i.githubCommit?new js(e,i.githubCommit):void 0,this.githubPullRequest=i.githubPullRequest?new mm(e,i.githubPullRequest):void 0,this.gitlabMergeRequest=i.gitlabMergeRequest?new mm(e,i.gitlabMergeRequest):void 0,this.sentryIssue=i.sentryIssue?new bm(e,i.sentryIssue):void 0}}class Nu extends cs{constructor(e,i){var n,a,t,d,l,o,r,s;super(e),this.avatarURLs=null!==(n=i.avatarURLs)&&void 0!==n?n:void 0,this.inviterName=null!==(a=i.inviterName)&&void 0!==a?a:void 0,this.organizationDomain=null!==(t=i.organizationDomain)&&void 0!==t?t:void 0,this.organizationLogoUrl=null!==(d=i.organizationLogoUrl)&&void 0!==d?d:void 0,this.organizationName=null!==(l=i.organizationName)&&void 0!==l?l:void 0,this.teamIds=null!==(o=i.teamIds)&&void 0!==o?o:void 0,this.teamNames=null!==(r=i.teamNames)&&void 0!==r?r:void 0,this.userCount=null!==(s=i.userCount)&&void 0!==s?s:void 0}}class hu extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0,this.inviteData=i.inviteData?new Nu(e,i.inviteData):void 0}}class fu extends cs{constructor(e,i){var n,a,t,d,l;super(e),this.created=null!==(n=hs(i.created))&&void 0!==n?n:void 0,this.dueDate=null!==(a=i.dueDate)&&void 0!==a?a:void 0,this.status=null!==(t=i.status)&&void 0!==t?t:void 0,this.total=null!==(d=i.total)&&void 0!==d?d:void 0,this.url=null!==(l=i.url)&&void 0!==l?l:void 0}}class bu extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k,v,c,p,N,h,f,b,y,S,g,D,V,F,A,_,T,I,w,q,x;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.autoArchivedAt=null!==(a=hs(i.autoArchivedAt))&&void 0!==a?a:void 0,this.autoClosedAt=null!==(t=hs(i.autoClosedAt))&&void 0!==t?t:void 0,this.boardOrder=null!==(d=i.boardOrder)&&void 0!==d?d:void 0,this.branchName=null!==(l=i.branchName)&&void 0!==l?l:void 0,this.canceledAt=null!==(o=hs(i.canceledAt))&&void 0!==o?o:void 0,this.completedAt=null!==(r=hs(i.completedAt))&&void 0!==r?r:void 0,this.createdAt=null!==(s=hs(i.createdAt))&&void 0!==s?s:void 0,this.customerTicketCount=null!==(u=i.customerTicketCount)&&void 0!==u?u:void 0,this.description=null!==(m=i.description)&&void 0!==m?m:void 0,this.dueDate=null!==(k=i.dueDate)&&void 0!==k?k:void 0,this.estimate=null!==(v=i.estimate)&&void 0!==v?v:void 0,this.id=null!==(c=i.id)&&void 0!==c?c:void 0,this.identifier=null!==(p=i.identifier)&&void 0!==p?p:void 0,this.number=null!==(N=i.number)&&void 0!==N?N:void 0,this.previousIdentifiers=null!==(h=i.previousIdentifiers)&&void 0!==h?h:void 0,this.priority=null!==(f=i.priority)&&void 0!==f?f:void 0,this.priorityLabel=null!==(b=i.priorityLabel)&&void 0!==b?b:void 0,this.startedAt=null!==(y=hs(i.startedAt))&&void 0!==y?y:void 0,this.subIssueSortOrder=null!==(S=i.subIssueSortOrder)&&void 0!==S?S:void 0,this.title=null!==(g=i.title)&&void 0!==g?g:void 0,this.trashed=null!==(D=i.trashed)&&void 0!==D?D:void 0,this.updatedAt=null!==(V=hs(i.updatedAt))&&void 0!==V?V:void 0,this.url=null!==(F=i.url)&&void 0!==F?F:void 0,this._assignee=null!==(A=i.assignee)&&void 0!==A?A:void 0,this._creator=null!==(_=i.creator)&&void 0!==_?_:void 0,this._cycle=null!==(T=i.cycle)&&void 0!==T?T:void 0,this._parent=null!==(I=i.parent)&&void 0!==I?I:void 0,this._project=null!==(w=i.project)&&void 0!==w?w:void 0,this._state=null!==(q=i.state)&&void 0!==q?q:void 0,this._team=null!==(x=i.team)&&void 0!==x?x:void 0}get assignee(){var e,i;return(null===(e=this._assignee)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._assignee)||void 0===i?void 0:i.id):void 0}get creator(){var e,i;return(null===(e=this._creator)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._creator)||void 0===i?void 0:i.id):void 0}get cycle(){var e,i;return(null===(e=this._cycle)||void 0===e?void 0:e.id)?new yk(this._request).fetch(null===(i=this._cycle)||void 0===i?void 0:i.id):void 0}get parent(){var e,i;return(null===(e=this._parent)||void 0===e?void 0:e.id)?new uk(this._request).fetch(null===(i=this._parent)||void 0===i?void 0:i.id):void 0}get project(){var e,i;return(null===(e=this._project)||void 0===e?void 0:e.id)?new Zk(this._request).fetch(null===(i=this._project)||void 0===i?void 0:i.id):void 0}get state(){var e,i;return(null===(e=this._state)||void 0===e?void 0:e.id)?new bv(this._request).fetch(null===(i=this._state)||void 0===i?void 0:i.id):void 0}get team(){var e,i;return(null===(e=this._team)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._team)||void 0===i?void 0:i.id):void 0}attachments(e){return this.id?new Xp(this._request,this.id,e).fetch(e):void 0}children(e){return this.id?new eN(this._request,this.id,e).fetch(e):void 0}comments(e){return this.id?new iN(this._request,this.id,e).fetch(e):void 0}history(e){return this.id?new nN(this._request,this.id,e).fetch(e):void 0}inverseRelations(e){return this.id?new aN(this._request,this.id,e).fetch(e):void 0}labels(e){return this.id?new tN(this._request,this.id,e).fetch(e):void 0}relations(e){return this.id?new dN(this._request,this.id,e).fetch(e):void 0}subscribers(e){return this.id?new lN(this._request,this.id,e).fetch(e):void 0}archive(e){return this.id?new hc(this._request).fetch(this.id):void 0}delete(){return this.id?new bc(this._request).fetch(this.id):void 0}unarchive(){return this.id?new xc(this._request).fetch(this.id):void 0}update(e){return this.id?new Cc(this._request).fetch(this.id,e):void 0}}class yu extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new bu(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class Su extends cs{constructor(e,i){var n,a,t,d,l;super(e),this.actorId=null!==(n=i.actorId)&&void 0!==n?n:void 0,this.descriptionData=null!==(a=i.descriptionData)&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.type=null!==(d=i.type)&&void 0!==d?d:void 0,this.updatedAt=null!==(l=hs(i.updatedAt))&&void 0!==l?l:void 0}}class gu extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0,this.history=i.history?i.history.map((i=>new Su(e,i))):void 0}}class Du extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k,v,c,p,N,h,f,b,y,S,g,D,V,F,A,_,T,I,w,q,x,C,O;super(e),this.addedLabelIds=null!==(n=i.addedLabelIds)&&void 0!==n?n:void 0,this.archived=null!==(a=i.archived)&&void 0!==a?a:void 0,this.archivedAt=null!==(t=hs(i.archivedAt))&&void 0!==t?t:void 0,this.autoArchived=null!==(d=i.autoArchived)&&void 0!==d?d:void 0,this.autoClosed=null!==(l=i.autoClosed)&&void 0!==l?l:void 0,this.createdAt=null!==(o=hs(i.createdAt))&&void 0!==o?o:void 0,this.fromDueDate=null!==(r=i.fromDueDate)&&void 0!==r?r:void 0,this.fromEstimate=null!==(s=i.fromEstimate)&&void 0!==s?s:void 0,this.fromPriority=null!==(u=i.fromPriority)&&void 0!==u?u:void 0,this.fromTitle=null!==(m=i.fromTitle)&&void 0!==m?m:void 0,this.id=null!==(k=i.id)&&void 0!==k?k:void 0,this.removedLabelIds=null!==(v=i.removedLabelIds)&&void 0!==v?v:void 0,this.source=null!==(c=fs(i.source))&&void 0!==c?c:void 0,this.toDueDate=null!==(p=i.toDueDate)&&void 0!==p?p:void 0,this.toEstimate=null!==(N=i.toEstimate)&&void 0!==N?N:void 0,this.toPriority=null!==(h=i.toPriority)&&void 0!==h?h:void 0,this.toTitle=null!==(f=i.toTitle)&&void 0!==f?f:void 0,this.updatedAt=null!==(b=hs(i.updatedAt))&&void 0!==b?b:void 0,this.updatedDescription=null!==(y=i.updatedDescription)&&void 0!==y?y:void 0,this.relationChanges=i.relationChanges?i.relationChanges.map((i=>new Pu(e,i))):void 0,this._actor=null!==(S=i.actor)&&void 0!==S?S:void 0,this._fromAssignee=null!==(g=i.fromAssignee)&&void 0!==g?g:void 0,this._fromCycle=null!==(D=i.fromCycle)&&void 0!==D?D:void 0,this._fromParent=null!==(V=i.fromParent)&&void 0!==V?V:void 0,this._fromProject=null!==(F=i.fromProject)&&void 0!==F?F:void 0,this._fromState=null!==(A=i.fromState)&&void 0!==A?A:void 0,this._fromTeam=null!==(_=i.fromTeam)&&void 0!==_?_:void 0,this._issue=null!==(T=i.issue)&&void 0!==T?T:void 0,this._toAssignee=null!==(I=i.toAssignee)&&void 0!==I?I:void 0,this._toCycle=null!==(w=i.toCycle)&&void 0!==w?w:void 0,this._toParent=null!==(q=i.toParent)&&void 0!==q?q:void 0,this._toProject=null!==(x=i.toProject)&&void 0!==x?x:void 0,this._toState=null!==(C=i.toState)&&void 0!==C?C:void 0,this._toTeam=null!==(O=i.toTeam)&&void 0!==O?O:void 0}get actor(){var e,i;return(null===(e=this._actor)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._actor)||void 0===i?void 0:i.id):void 0}get fromAssignee(){var e,i;return(null===(e=this._fromAssignee)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._fromAssignee)||void 0===i?void 0:i.id):void 0}get fromCycle(){var e,i;return(null===(e=this._fromCycle)||void 0===e?void 0:e.id)?new yk(this._request).fetch(null===(i=this._fromCycle)||void 0===i?void 0:i.id):void 0}get fromParent(){var e,i;return(null===(e=this._fromParent)||void 0===e?void 0:e.id)?new uk(this._request).fetch(null===(i=this._fromParent)||void 0===i?void 0:i.id):void 0}get fromProject(){var e,i;return(null===(e=this._fromProject)||void 0===e?void 0:e.id)?new Zk(this._request).fetch(null===(i=this._fromProject)||void 0===i?void 0:i.id):void 0}get fromState(){var e,i;return(null===(e=this._fromState)||void 0===e?void 0:e.id)?new bv(this._request).fetch(null===(i=this._fromState)||void 0===i?void 0:i.id):void 0}get fromTeam(){var e,i;return(null===(e=this._fromTeam)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._fromTeam)||void 0===i?void 0:i.id):void 0}get issue(){var e,i;return(null===(e=this._issue)||void 0===e?void 0:e.id)?new qk(this._request).fetch(null===(i=this._issue)||void 0===i?void 0:i.id):void 0}get toAssignee(){var e,i;return(null===(e=this._toAssignee)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._toAssignee)||void 0===i?void 0:i.id):void 0}get toCycle(){var e,i;return(null===(e=this._toCycle)||void 0===e?void 0:e.id)?new yk(this._request).fetch(null===(i=this._toCycle)||void 0===i?void 0:i.id):void 0}get toParent(){var e,i;return(null===(e=this._toParent)||void 0===e?void 0:e.id)?new uk(this._request).fetch(null===(i=this._toParent)||void 0===i?void 0:i.id):void 0}get toProject(){var e,i;return(null===(e=this._toProject)||void 0===e?void 0:e.id)?new Zk(this._request).fetch(null===(i=this._toProject)||void 0===i?void 0:i.id):void 0}get toState(){var e,i;return(null===(e=this._toState)||void 0===e?void 0:e.id)?new bv(this._request).fetch(null===(i=this._toState)||void 0===i?void 0:i.id):void 0}get toTeam(){var e,i;return(null===(e=this._toTeam)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._toTeam)||void 0===i?void 0:i.id):void 0}}class Vu extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Du(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class Fu extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.creatorId=null!==(t=i.creatorId)&&void 0!==t?t:void 0,this.error=null!==(d=i.error)&&void 0!==d?d:void 0,this.id=null!==(l=i.id)&&void 0!==l?l:void 0,this.mapping=null!==(o=fs(i.mapping))&&void 0!==o?o:void 0,this.service=null!==(r=i.service)&&void 0!==r?r:void 0,this.status=null!==(s=i.status)&&void 0!==s?s:void 0,this.updatedAt=null!==(u=hs(i.updatedAt))&&void 0!==u?u:void 0}delete(e){return new Vc(this._request).fetch(e)}}class Au extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this.issueImport=i.issueImport?new Fu(e,i.issueImport):void 0}}class _u extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this.issueImport=i.issueImport?new Fu(e,i.issueImport):void 0}}class Tu extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.color=null!==(a=i.color)&&void 0!==a?a:void 0,this.createdAt=null!==(t=hs(i.createdAt))&&void 0!==t?t:void 0,this.description=null!==(d=i.description)&&void 0!==d?d:void 0,this.id=null!==(l=i.id)&&void 0!==l?l:void 0,this.name=null!==(o=i.name)&&void 0!==o?o:void 0,this.updatedAt=null!==(r=hs(i.updatedAt))&&void 0!==r?r:void 0,this._creator=null!==(s=i.creator)&&void 0!==s?s:void 0,this._team=null!==(u=i.team)&&void 0!==u?u:void 0}get creator(){var e,i;return(null===(e=this._creator)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._creator)||void 0===i?void 0:i.id):void 0}get team(){var e,i;return(null===(e=this._team)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._team)||void 0===i?void 0:i.id):void 0}issues(e){return this.id?new oN(this._request,this.id,e).fetch(e):void 0}archive(){return this.id?new Ac(this._request).fetch(this.id):void 0}update(e){return this.id?new Tc(this._request).fetch(this.id,e):void 0}}class Iu extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Tu(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class wu extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._issueLabel=null!==(t=i.issueLabel)&&void 0!==t?t:void 0}get issueLabel(){var e,i;return(null===(e=this._issueLabel)||void 0===e?void 0:e.id)?new Ok(this._request).fetch(null===(i=this._issueLabel)||void 0===i?void 0:i.id):void 0}}class qu extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._issue=null!==(t=i.issue)&&void 0!==t?t:void 0}get issue(){var e,i;return(null===(e=this._issue)||void 0===e?void 0:e.id)?new qk(this._request).fetch(null===(i=this._issue)||void 0===i?void 0:i.id):void 0}}class xu extends cs{constructor(e,i){var n,a;super(e),this.label=null!==(n=i.label)&&void 0!==n?n:void 0,this.priority=null!==(a=i.priority)&&void 0!==a?a:void 0}}class Cu extends cs{constructor(e,i){var n,a,t,d,l,o,r;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.type=null!==(d=i.type)&&void 0!==d?d:void 0,this.updatedAt=null!==(l=hs(i.updatedAt))&&void 0!==l?l:void 0,this._issue=null!==(o=i.issue)&&void 0!==o?o:void 0,this._relatedIssue=null!==(r=i.relatedIssue)&&void 0!==r?r:void 0}get issue(){var e,i;return(null===(e=this._issue)||void 0===e?void 0:e.id)?new qk(this._request).fetch(null===(i=this._issue)||void 0===i?void 0:i.id):void 0}get relatedIssue(){var e,i;return(null===(e=this._relatedIssue)||void 0===e?void 0:e.id)?new uk(this._request).fetch(null===(i=this._relatedIssue)||void 0===i?void 0:i.id):void 0}delete(){return this.id?new wc(this._request).fetch(this.id):void 0}update(e){return this.id?new qc(this._request).fetch(this.id,e):void 0}}class Ou extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Cu(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class Pu extends cs{constructor(e,i){var n,a;super(e),this.identifier=null!==(n=i.identifier)&&void 0!==n?n:void 0,this.type=null!==(a=i.type)&&void 0!==a?a:void 0}}class ju extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._issueRelation=null!==(t=i.issueRelation)&&void 0!==t?t:void 0}get issueRelation(){var e,i;return(null===(e=this._issueRelation)||void 0===e?void 0:e.id)?new Uk(this._request).fetch(null===(i=this._issueRelation)||void 0===i?void 0:i.id):void 0}}class Uu extends cs{constructor(e,i){var n,a,t,d,l,o;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.name=null!==(d=i.name)&&void 0!==d?d:void 0,this.sortOrder=null!==(l=i.sortOrder)&&void 0!==l?l:void 0,this.updatedAt=null!==(o=hs(i.updatedAt))&&void 0!==o?o:void 0}get organization(){return new Gk(this._request).fetch()}projects(e){return this.id?new rN(this._request,this.id,e).fetch(e):void 0}delete(){return this.id?new Uc(this._request).fetch(this.id):void 0}update(e){return this.id?new Bc(this._request).fetch(this.id,e):void 0}}class Bu extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Uu(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class Eu extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._milestone=null!==(t=i.milestone)&&void 0!==t?t:void 0}get milestone(){var e,i;return(null===(e=this._milestone)||void 0===e?void 0:e.id)?new zk(this._request).fetch(null===(i=this._milestone)||void 0===i?void 0:i.id):void 0}}class Ru extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k,v;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.emailedAt=null!==(t=hs(i.emailedAt))&&void 0!==t?t:void 0,this.id=null!==(d=i.id)&&void 0!==d?d:void 0,this.reactionEmoji=null!==(l=i.reactionEmoji)&&void 0!==l?l:void 0,this.readAt=null!==(o=hs(i.readAt))&&void 0!==o?o:void 0,this.type=null!==(r=i.type)&&void 0!==r?r:void 0,this.updatedAt=null!==(s=hs(i.updatedAt))&&void 0!==s?s:void 0,this._comment=null!==(u=i.comment)&&void 0!==u?u:void 0,this._issue=null!==(m=i.issue)&&void 0!==m?m:void 0,this._team=null!==(k=i.team)&&void 0!==k?k:void 0,this._user=null!==(v=i.user)&&void 0!==v?v:void 0}get comment(){var e,i;return(null===(e=this._comment)||void 0===e?void 0:e.id)?new Nk(this._request).fetch(null===(i=this._comment)||void 0===i?void 0:i.id):void 0}get issue(){var e,i;return(null===(e=this._issue)||void 0===e?void 0:e.id)?new qk(this._request).fetch(null===(i=this._issue)||void 0===i?void 0:i.id):void 0}get team(){var e,i;return(null===(e=this._team)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._team)||void 0===i?void 0:i.id):void 0}get user(){var e,i;return(null===(e=this._user)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._user)||void 0===i?void 0:i.id):void 0}archive(){return this.id?new Ec(this._request).fetch(this.id):void 0}unarchive(){return this.id?new Lc(this._request).fetch(this.id):void 0}update(e){return this.id?new Wc(this._request).fetch(this.id,e):void 0}}class zu extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Ru(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class Mu extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._notification=null!==(t=i.notification)&&void 0!==t?t:void 0}get notification(){var e,i;return(null===(e=this._notification)||void 0===e?void 0:e.id)?new Lk(this._request).fetch(null===(i=this._notification)||void 0===i?void 0:i.id):void 0}}class Lu extends cs{constructor(e,i){var n,a,t,d,l,o,r,s;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.type=null!==(d=i.type)&&void 0!==d?d:void 0,this.updatedAt=null!==(l=hs(i.updatedAt))&&void 0!==l?l:void 0,this._project=null!==(o=i.project)&&void 0!==o?o:void 0,this._team=null!==(r=i.team)&&void 0!==r?r:void 0,this._user=null!==(s=i.user)&&void 0!==s?s:void 0}get project(){var e,i;return(null===(e=this._project)||void 0===e?void 0:e.id)?new Zk(this._request).fetch(null===(i=this._project)||void 0===i?void 0:i.id):void 0}get team(){var e,i;return(null===(e=this._team)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._team)||void 0===i?void 0:i.id):void 0}get user(){var e,i;return(null===(e=this._user)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._user)||void 0===i?void 0:i.id):void 0}delete(){return this.id?new Mc(this._request).fetch(this.id):void 0}}class Wu extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Lu(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class Qu extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._notificationSubscription=null!==(t=i.notificationSubscription)&&void 0!==t?t:void 0}get notificationSubscription(){var e,i;return(null===(e=this._notificationSubscription)||void 0===e?void 0:e.id)?new Wk(this._request).fetch(null===(i=this._notificationSubscription)||void 0===i?void 0:i.id):void 0}}class Hu extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k,v,c;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.clientId=null!==(a=i.clientId)&&void 0!==a?a:void 0,this.clientSecret=null!==(t=i.clientSecret)&&void 0!==t?t:void 0,this.createdAt=null!==(d=hs(i.createdAt))&&void 0!==d?d:void 0,this.description=null!==(l=i.description)&&void 0!==l?l:void 0,this.developer=null!==(o=i.developer)&&void 0!==o?o:void 0,this.developerUrl=null!==(r=i.developerUrl)&&void 0!==r?r:void 0,this.id=null!==(s=i.id)&&void 0!==s?s:void 0,this.imageUrl=null!==(u=i.imageUrl)&&void 0!==u?u:void 0,this.name=null!==(m=i.name)&&void 0!==m?m:void 0,this.publicEnabled=null!==(k=i.publicEnabled)&&void 0!==k?k:void 0,this.redirectUris=null!==(v=i.redirectUris)&&void 0!==v?v:void 0,this.updatedAt=null!==(c=hs(i.updatedAt))&&void 0!==c?c:void 0}archive(){return this.id?new Qc(this._request).fetch(this.id):void 0}rotateSecret(){return this.id?new Gc(this._request).fetch(this.id):void 0}update(e){return this.id?new $c(this._request).fetch(this.id,e):void 0}}class Gu extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this.oauthClient=i.oauthClient?new Hu(e,i.oauthClient):void 0}}class $u extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0}}class Ku extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k,v,c,p,N,h;super(e),this.allowedAuthServices=null!==(n=i.allowedAuthServices)&&void 0!==n?n:void 0,this.archivedAt=null!==(a=hs(i.archivedAt))&&void 0!==a?a:void 0,this.createdAt=null!==(t=hs(i.createdAt))&&void 0!==t?t:void 0,this.createdIssueCount=null!==(d=i.createdIssueCount)&&void 0!==d?d:void 0,this.gitBranchFormat=null!==(l=i.gitBranchFormat)&&void 0!==l?l:void 0,this.gitLinkbackMessagesEnabled=null!==(o=i.gitLinkbackMessagesEnabled)&&void 0!==o?o:void 0,this.gitPublicLinkbackMessagesEnabled=null!==(r=i.gitPublicLinkbackMessagesEnabled)&&void 0!==r?r:void 0,this.id=null!==(s=i.id)&&void 0!==s?s:void 0,this.logoUrl=null!==(u=i.logoUrl)&&void 0!==u?u:void 0,this.name=null!==(m=i.name)&&void 0!==m?m:void 0,this.periodUploadVolume=null!==(k=i.periodUploadVolume)&&void 0!==k?k:void 0,this.roadmapEnabled=null!==(v=i.roadmapEnabled)&&void 0!==v?v:void 0,this.samlEnabled=null!==(c=i.samlEnabled)&&void 0!==c?c:void 0,this.updatedAt=null!==(p=hs(i.updatedAt))&&void 0!==p?p:void 0,this.urlKey=null!==(N=i.urlKey)&&void 0!==N?N:void 0,this.userCount=null!==(h=i.userCount)&&void 0!==h?h:void 0}get subscription(){return new dv(this._request).fetch()}integrations(e){return new sN(this._request,e).fetch(e)}milestones(e){return new uN(this._request,e).fetch(e)}teams(e){return new mN(this._request,e).fetch(e)}users(e){return new kN(this._request,e).fetch(e)}delete(e){return new Jc(this._request).fetch(e)}update(e){return new ap(this._request).fetch(e)}}class Ju extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0}}class Zu extends cs{constructor(e,i){var n,a,t,d,l,o,r,s;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.name=null!==(d=i.name)&&void 0!==d?d:void 0,this.updatedAt=null!==(l=hs(i.updatedAt))&&void 0!==l?l:void 0,this.verificationEmail=null!==(o=i.verificationEmail)&&void 0!==o?o:void 0,this.verified=null!==(r=i.verified)&&void 0!==r?r:void 0,this._creator=null!==(s=i.creator)&&void 0!==s?s:void 0}get creator(){var e,i;return(null===(e=this._creator)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._creator)||void 0===i?void 0:i.id):void 0}delete(){return this.id?new Xc(this._request).fetch(this.id):void 0}}class Yu extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this.organizationDomain=i.organizationDomain?new Zu(e,i.organizationDomain):void 0}}class Xu extends cs{constructor(e,i){var n,a;super(e),this.exists=null!==(n=i.exists)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0}}class em extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m;super(e),this.acceptedAt=null!==(n=hs(i.acceptedAt))&&void 0!==n?n:void 0,this.archivedAt=null!==(a=hs(i.archivedAt))&&void 0!==a?a:void 0,this.createdAt=null!==(t=hs(i.createdAt))&&void 0!==t?t:void 0,this.email=null!==(d=i.email)&&void 0!==d?d:void 0,this.expiresAt=null!==(l=hs(i.expiresAt))&&void 0!==l?l:void 0,this.external=null!==(o=i.external)&&void 0!==o?o:void 0,this.id=null!==(r=i.id)&&void 0!==r?r:void 0,this.updatedAt=null!==(s=hs(i.updatedAt))&&void 0!==s?s:void 0,this._invitee=null!==(u=i.invitee)&&void 0!==u?u:void 0,this._inviter=null!==(m=i.inviter)&&void 0!==m?m:void 0}get invitee(){var e,i;return(null===(e=this._invitee)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._invitee)||void 0===i?void 0:i.id):void 0}get inviter(){var e,i;return(null===(e=this._inviter)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._inviter)||void 0===i?void 0:i.id):void 0}get organization(){return new Gk(this._request).fetch()}issues(e){return this.id?new vN(this._request,this.id,e).fetch(e):void 0}delete(){return this.id?new np(this._request).fetch(this.id):void 0}}class im extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new em(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class nm extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this.organizationInvite=i.organizationInvite?new em(e,i.organizationInvite):void 0}}class am extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0}get organization(){return new Gk(this._request).fetch()}}class tm extends cs{constructor(e,i){var n,a,t,d;super(e),this.endCursor=null!==(n=i.endCursor)&&void 0!==n?n:void 0,this.hasNextPage=null!==(a=i.hasNextPage)&&void 0!==a?a:void 0,this.hasPreviousPage=null!==(t=i.hasPreviousPage)&&void 0!==t?t:void 0,this.startCursor=null!==(d=i.startCursor)&&void 0!==d?d:void 0}}class dm extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k,v,c,p,N,h,f,b,y,S,g,D,V,F,A,_,T;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.autoArchivedAt=null!==(a=hs(i.autoArchivedAt))&&void 0!==a?a:void 0,this.canceledAt=null!==(t=hs(i.canceledAt))&&void 0!==t?t:void 0,this.color=null!==(d=i.color)&&void 0!==d?d:void 0,this.completedAt=null!==(l=hs(i.completedAt))&&void 0!==l?l:void 0,this.completedIssueCountHistory=null!==(o=i.completedIssueCountHistory)&&void 0!==o?o:void 0,this.completedScopeHistory=null!==(r=i.completedScopeHistory)&&void 0!==r?r:void 0,this.createdAt=null!==(s=hs(i.createdAt))&&void 0!==s?s:void 0,this.description=null!==(u=i.description)&&void 0!==u?u:void 0,this.icon=null!==(m=i.icon)&&void 0!==m?m:void 0,this.id=null!==(k=i.id)&&void 0!==k?k:void 0,this.issueCountHistory=null!==(v=i.issueCountHistory)&&void 0!==v?v:void 0,this.name=null!==(c=i.name)&&void 0!==c?c:void 0,this.scopeHistory=null!==(p=i.scopeHistory)&&void 0!==p?p:void 0,this.slackIssueComments=null!==(N=i.slackIssueComments)&&void 0!==N?N:void 0,this.slackIssueStatuses=null!==(h=i.slackIssueStatuses)&&void 0!==h?h:void 0,this.slackNewIssue=null!==(f=i.slackNewIssue)&&void 0!==f?f:void 0,this.slugId=null!==(b=i.slugId)&&void 0!==b?b:void 0,this.sortOrder=null!==(y=i.sortOrder)&&void 0!==y?y:void 0,this.startDate=null!==(S=i.startDate)&&void 0!==S?S:void 0,this.startedAt=null!==(g=hs(i.startedAt))&&void 0!==g?g:void 0,this.state=null!==(D=i.state)&&void 0!==D?D:void 0,this.targetDate=null!==(V=i.targetDate)&&void 0!==V?V:void 0,this.updatedAt=null!==(F=hs(i.updatedAt))&&void 0!==F?F:void 0,this._creator=null!==(A=i.creator)&&void 0!==A?A:void 0,this._lead=null!==(_=i.lead)&&void 0!==_?_:void 0,this._milestone=null!==(T=i.milestone)&&void 0!==T?T:void 0}get creator(){var e,i;return(null===(e=this._creator)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._creator)||void 0===i?void 0:i.id):void 0}get lead(){var e,i;return(null===(e=this._lead)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._lead)||void 0===i?void 0:i.id):void 0}get milestone(){var e,i;return(null===(e=this._milestone)||void 0===e?void 0:e.id)?new zk(this._request).fetch(null===(i=this._milestone)||void 0===i?void 0:i.id):void 0}issues(e){return this.id?new cN(this._request,this.id,e).fetch(e):void 0}links(e){return this.id?new pN(this._request,this.id,e).fetch(e):void 0}members(e){return this.id?new NN(this._request,this.id,e).fetch(e):void 0}teams(e){return this.id?new hN(this._request,this.id,e).fetch(e):void 0}archive(){return this.id?new tp(this._request).fetch(this.id):void 0}unarchive(){return this.id?new rp(this._request).fetch(this.id):void 0}update(e){return this.id?new sp(this._request).fetch(this.id,e):void 0}}class lm extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new dm(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class om extends cs{constructor(e,i){var n,a,t,d,l,o,r,s;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.label=null!==(d=i.label)&&void 0!==d?d:void 0,this.updatedAt=null!==(l=hs(i.updatedAt))&&void 0!==l?l:void 0,this.url=null!==(o=i.url)&&void 0!==o?o:void 0,this._creator=null!==(r=i.creator)&&void 0!==r?r:void 0,this._project=null!==(s=i.project)&&void 0!==s?s:void 0}get creator(){var e,i;return(null===(e=this._creator)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._creator)||void 0===i?void 0:i.id):void 0}get project(){var e,i;return(null===(e=this._project)||void 0===e?void 0:e.id)?new Zk(this._request).fetch(null===(i=this._project)||void 0===i?void 0:i.id):void 0}delete(){return this.id?new op(this._request).fetch(this.id):void 0}}class rm extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new om(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class sm extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._projectLink=null!==(t=i.projectLink)&&void 0!==t?t:void 0}get projectLink(){var e,i;return(null===(e=this._projectLink)||void 0===e?void 0:e.id)?new Yk(this._request).fetch(null===(i=this._projectLink)||void 0===i?void 0:i.id):void 0}}class um extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._project=null!==(t=i.project)&&void 0!==t?t:void 0}get project(){var e,i;return(null===(e=this._project)||void 0===e?void 0:e.id)?new Zk(this._request).fetch(null===(i=this._project)||void 0===i?void 0:i.id):void 0}}class mm extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k,v,c,p,N;super(e),this.branch=null!==(n=i.branch)&&void 0!==n?n:void 0,this.closedAt=null!==(a=i.closedAt)&&void 0!==a?a:void 0,this.createdAt=null!==(t=i.createdAt)&&void 0!==t?t:void 0,this.draft=null!==(d=i.draft)&&void 0!==d?d:void 0,this.id=null!==(l=i.id)&&void 0!==l?l:void 0,this.mergedAt=null!==(o=i.mergedAt)&&void 0!==o?o:void 0,this.number=null!==(r=i.number)&&void 0!==r?r:void 0,this.repoLogin=null!==(s=i.repoLogin)&&void 0!==s?s:void 0,this.repoName=null!==(u=i.repoName)&&void 0!==u?u:void 0,this.status=null!==(m=i.status)&&void 0!==m?m:void 0,this.title=null!==(k=i.title)&&void 0!==k?k:void 0,this.updatedAt=null!==(v=i.updatedAt)&&void 0!==v?v:void 0,this.url=null!==(c=i.url)&&void 0!==c?c:void 0,this.userId=null!==(p=i.userId)&&void 0!==p?p:void 0,this.userLogin=null!==(N=i.userLogin)&&void 0!==N?N:void 0}}class km extends cs{constructor(e,i){var n,a,t,d;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.updatedAt=null!==(d=hs(i.updatedAt))&&void 0!==d?d:void 0}delete(){return this.id?new mp(this._request).fetch(this.id):void 0}}class vm extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0}}class cm extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0}}class pm extends cs{constructor(e,i){var n,a,t,d,l,o,r;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.emoji=null!==(t=i.emoji)&&void 0!==t?t:void 0,this.id=null!==(d=i.id)&&void 0!==d?d:void 0,this.updatedAt=null!==(l=hs(i.updatedAt))&&void 0!==l?l:void 0,this._comment=null!==(o=i.comment)&&void 0!==o?o:void 0,this._user=null!==(r=i.user)&&void 0!==r?r:void 0}get comment(){var e,i;return(null===(e=this._comment)||void 0===e?void 0:e.id)?new Nk(this._request).fetch(null===(i=this._comment)||void 0===i?void 0:i.id):void 0}get user(){var e,i;return(null===(e=this._user)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._user)||void 0===i?void 0:i.id):void 0}delete(){return this.id?new vp(this._request).fetch(this.id):void 0}}class Nm extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new pm(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class hm extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._reaction=null!==(t=i.reaction)&&void 0!==t?t:void 0}get reaction(){var e,i;return(null===(e=this._reaction)||void 0===e?void 0:e.id)?new nv(this._request).fetch(null===(i=this._reaction)||void 0===i?void 0:i.id):void 0}}class fm extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0}}class bm extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k;super(e),this.actorId=null!==(n=i.actorId)&&void 0!==n?n:void 0,this.actorName=null!==(a=i.actorName)&&void 0!==a?a:void 0,this.actorType=null!==(t=i.actorType)&&void 0!==t?t:void 0,this.firstSeen=null!==(d=i.firstSeen)&&void 0!==d?d:void 0,this.firstVersion=null!==(l=i.firstVersion)&&void 0!==l?l:void 0,this.issueId=null!==(o=i.issueId)&&void 0!==o?o:void 0,this.issueTitle=null!==(r=i.issueTitle)&&void 0!==r?r:void 0,this.projectId=null!==(s=i.projectId)&&void 0!==s?s:void 0,this.projectSlug=null!==(u=i.projectSlug)&&void 0!==u?u:void 0,this.shortId=null!==(m=i.shortId)&&void 0!==m?m:void 0,this.webUrl=null!==(k=i.webUrl)&&void 0!==k?k:void 0}}class ym extends cs{constructor(e,i){var n;super(e),this.organizationSlug=null!==(n=i.organizationSlug)&&void 0!==n?n:void 0}}class Sm extends cs{constructor(e,i){var n,a,t;super(e),this.channel=null!==(n=i.channel)&&void 0!==n?n:void 0,this.channelId=null!==(a=i.channelId)&&void 0!==a?a:void 0,this.configurationUrl=null!==(t=i.configurationUrl)&&void 0!==t?t:void 0}}class gm extends cs{constructor(e,i){var n,a;super(e),this.samlSsoUrl=null!==(n=i.samlSsoUrl)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0}}class Dm extends cs{constructor(e,i){var n,a,t;super(e),this.clientIds=null!==(n=i.clientIds)&&void 0!==n?n:void 0,this.steps=null!==(a=i.steps)&&void 0!==a?a:void 0,this.version=null!==(t=i.version)&&void 0!==t?t:void 0}}class Vm extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.canceledAt=null!==(a=hs(i.canceledAt))&&void 0!==a?a:void 0,this.createdAt=null!==(t=hs(i.createdAt))&&void 0!==t?t:void 0,this.id=null!==(d=i.id)&&void 0!==d?d:void 0,this.nextBillingAt=null!==(l=hs(i.nextBillingAt))&&void 0!==l?l:void 0,this.pendingChangeType=null!==(o=i.pendingChangeType)&&void 0!==o?o:void 0,this.seats=null!==(r=i.seats)&&void 0!==r?r:void 0,this.type=null!==(s=i.type)&&void 0!==s?s:void 0,this.updatedAt=null!==(u=hs(i.updatedAt))&&void 0!==u?u:void 0,this._creator=null!==(m=i.creator)&&void 0!==m?m:void 0}get creator(){var e,i;return(null===(e=this._creator)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._creator)||void 0===i?void 0:i.id):void 0}get organization(){return new Gk(this._request).fetch()}archive(){return this.id?new hp(this._request).fetch(this.id):void 0}update(e){return this.id?new bp(this._request).fetch(this.id,e):void 0}upgrade(){return this.id&&this.type?new Sp(this._request).fetch(this.id,this.type):void 0}}class Fm extends cs{constructor(e,i){var n,a,t;super(e),this.canceledAt=null!==(n=hs(i.canceledAt))&&void 0!==n?n:void 0,this.lastSyncId=null!==(a=i.lastSyncId)&&void 0!==a?a:void 0,this.success=null!==(t=i.success)&&void 0!==t?t:void 0}get subscription(){return new dv(this._request).fetch()}}class Am extends cs{constructor(e,i){var n;super(e),this.session=null!==(n=i.session)&&void 0!==n?n:void 0}}class _m extends cs{constructor(e,i){var n,a,t,d,l;super(e),this.databaseVersion=null!==(n=i.databaseVersion)&&void 0!==n?n:void 0,this.delta=null!==(a=i.delta)&&void 0!==a?a:void 0,this.lastSyncId=null!==(t=i.lastSyncId)&&void 0!==t?t:void 0,this.state=null!==(d=i.state)&&void 0!==d?d:void 0,this.subscribedSyncGroups=null!==(l=i.subscribedSyncGroups)&&void 0!==l?l:void 0}}class Tm extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k,v,c,p,N,h,f,b,y,S,g,D,V,F,A,_,T,I,w,q,x,C,O,P,j,U,B,E;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.autoArchivePeriod=null!==(a=i.autoArchivePeriod)&&void 0!==a?a:void 0,this.autoClosePeriod=null!==(t=i.autoClosePeriod)&&void 0!==t?t:void 0,this.autoCloseStateId=null!==(d=i.autoCloseStateId)&&void 0!==d?d:void 0,this.createdAt=null!==(l=hs(i.createdAt))&&void 0!==l?l:void 0,this.cycleCalenderUrl=null!==(o=i.cycleCalenderUrl)&&void 0!==o?o:void 0,this.cycleCooldownTime=null!==(r=i.cycleCooldownTime)&&void 0!==r?r:void 0,this.cycleDuration=null!==(s=i.cycleDuration)&&void 0!==s?s:void 0,this.cycleIssueAutoAssignCompleted=null!==(u=i.cycleIssueAutoAssignCompleted)&&void 0!==u?u:void 0,this.cycleIssueAutoAssignStarted=null!==(m=i.cycleIssueAutoAssignStarted)&&void 0!==m?m:void 0,this.cycleLockToActive=null!==(k=i.cycleLockToActive)&&void 0!==k?k:void 0,this.cycleStartDay=null!==(v=i.cycleStartDay)&&void 0!==v?v:void 0,this.cyclesEnabled=null!==(c=i.cyclesEnabled)&&void 0!==c?c:void 0,this.defaultIssueEstimate=null!==(p=i.defaultIssueEstimate)&&void 0!==p?p:void 0,this.defaultTemplateForMembersId=null!==(N=i.defaultTemplateForMembersId)&&void 0!==N?N:void 0,this.defaultTemplateForNonMembersId=null!==(h=i.defaultTemplateForNonMembersId)&&void 0!==h?h:void 0,this.description=null!==(f=i.description)&&void 0!==f?f:void 0,this.groupIssueHistory=null!==(b=i.groupIssueHistory)&&void 0!==b?b:void 0,this.id=null!==(y=i.id)&&void 0!==y?y:void 0,this.inviteHash=null!==(S=i.inviteHash)&&void 0!==S?S:void 0,this.issueEstimationAllowZero=null!==(g=i.issueEstimationAllowZero)&&void 0!==g?g:void 0,this.issueEstimationExtended=null!==(D=i.issueEstimationExtended)&&void 0!==D?D:void 0,this.issueEstimationType=null!==(V=i.issueEstimationType)&&void 0!==V?V:void 0,this.key=null!==(F=i.key)&&void 0!==F?F:void 0,this.name=null!==(A=i.name)&&void 0!==A?A:void 0,this.private=null!==(_=i.private)&&void 0!==_?_:void 0,this.slackIssueComments=null!==(T=i.slackIssueComments)&&void 0!==T?T:void 0,this.slackIssueStatuses=null!==(I=i.slackIssueStatuses)&&void 0!==I?I:void 0,this.slackNewIssue=null!==(w=i.slackNewIssue)&&void 0!==w?w:void 0,this.timezone=null!==(q=i.timezone)&&void 0!==q?q:void 0,this.upcomingCycleCount=null!==(x=i.upcomingCycleCount)&&void 0!==x?x:void 0,this.updatedAt=null!==(C=hs(i.updatedAt))&&void 0!==C?C:void 0,this._activeCycle=null!==(O=i.activeCycle)&&void 0!==O?O:void 0,this._draftWorkflowState=null!==(P=i.draftWorkflowState)&&void 0!==P?P:void 0,this._markedAsDuplicateWorkflowState=null!==(j=i.markedAsDuplicateWorkflowState)&&void 0!==j?j:void 0,this._mergeWorkflowState=null!==(U=i.mergeWorkflowState)&&void 0!==U?U:void 0,this._reviewWorkflowState=null!==(B=i.reviewWorkflowState)&&void 0!==B?B:void 0,this._startWorkflowState=null!==(E=i.startWorkflowState)&&void 0!==E?E:void 0}get activeCycle(){var e,i;return(null===(e=this._activeCycle)||void 0===e?void 0:e.id)?new yk(this._request).fetch(null===(i=this._activeCycle)||void 0===i?void 0:i.id):void 0}get draftWorkflowState(){var e,i;return(null===(e=this._draftWorkflowState)||void 0===e?void 0:e.id)?new bv(this._request).fetch(null===(i=this._draftWorkflowState)||void 0===i?void 0:i.id):void 0}get markedAsDuplicateWorkflowState(){var e,i;return(null===(e=this._markedAsDuplicateWorkflowState)||void 0===e?void 0:e.id)?new bv(this._request).fetch(null===(i=this._markedAsDuplicateWorkflowState)||void 0===i?void 0:i.id):void 0}get mergeWorkflowState(){var e,i;return(null===(e=this._mergeWorkflowState)||void 0===e?void 0:e.id)?new bv(this._request).fetch(null===(i=this._mergeWorkflowState)||void 0===i?void 0:i.id):void 0}get organization(){return new Gk(this._request).fetch()}get reviewWorkflowState(){var e,i;return(null===(e=this._reviewWorkflowState)||void 0===e?void 0:e.id)?new bv(this._request).fetch(null===(i=this._reviewWorkflowState)||void 0===i?void 0:i.id):void 0}get startWorkflowState(){var e,i;return(null===(e=this._startWorkflowState)||void 0===e?void 0:e.id)?new bv(this._request).fetch(null===(i=this._startWorkflowState)||void 0===i?void 0:i.id):void 0}cycles(e){return this.id?new fN(this._request,this.id,e).fetch(e):void 0}issues(e){return this.id?new bN(this._request,this.id,e).fetch(e):void 0}labels(e){return this.id?new yN(this._request,this.id,e).fetch(e):void 0}members(e){return this.id?new SN(this._request,this.id,e).fetch(e):void 0}memberships(e){return this.id?new gN(this._request,this.id,e).fetch(e):void 0}projects(e){return this.id?new DN(this._request,this.id,e).fetch(e):void 0}states(e){return this.id?new VN(this._request,this.id,e).fetch(e):void 0}templates(e){return this.id?new FN(this._request,this.id,e).fetch(e):void 0}webhooks(e){return this.id?new AN(this._request,this.id,e).fetch(e):void 0}archive(){return this.id?new gp(this._request).fetch(this.id):void 0}delete(){return this.id?new Vp(this._request).fetch(this.id):void 0}update(e){return this.id?new Tp(this._request).fetch(this.id,e):void 0}}class Im extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Tm(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class wm extends cs{constructor(e,i){var n,a,t,d,l,o,r;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.owner=null!==(d=i.owner)&&void 0!==d?d:void 0,this.updatedAt=null!==(l=hs(i.updatedAt))&&void 0!==l?l:void 0,this._team=null!==(o=i.team)&&void 0!==o?o:void 0,this._user=null!==(r=i.user)&&void 0!==r?r:void 0}get team(){var e,i;return(null===(e=this._team)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._team)||void 0===i?void 0:i.id):void 0}get user(){var e,i;return(null===(e=this._user)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._user)||void 0===i?void 0:i.id):void 0}delete(){return this.id?new Ap(this._request).fetch(this.id):void 0}update(e){return this.id?new _p(this._request).fetch(this.id,e):void 0}}class qm extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new wm(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class xm extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._teamMembership=null!==(t=i.teamMembership)&&void 0!==t?t:void 0}get teamMembership(){var e,i;return(null===(e=this._teamMembership)||void 0===e?void 0:e.id)?new rv(this._request).fetch(null===(i=this._teamMembership)||void 0===i?void 0:i.id):void 0}}class Cm extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._team=null!==(t=i.team)&&void 0!==t?t:void 0}get team(){var e,i;return(null===(e=this._team)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._team)||void 0===i?void 0:i.id):void 0}}class Om extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.description=null!==(t=i.description)&&void 0!==t?t:void 0,this.id=null!==(d=i.id)&&void 0!==d?d:void 0,this.name=null!==(l=i.name)&&void 0!==l?l:void 0,this.templateData=null!==(o=fs(i.templateData))&&void 0!==o?o:void 0,this.type=null!==(r=i.type)&&void 0!==r?r:void 0,this.updatedAt=null!==(s=hs(i.updatedAt))&&void 0!==s?s:void 0,this._creator=null!==(u=i.creator)&&void 0!==u?u:void 0,this._team=null!==(m=i.team)&&void 0!==m?m:void 0}get creator(){var e,i;return(null===(e=this._creator)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._creator)||void 0===i?void 0:i.id):void 0}get team(){var e,i;return(null===(e=this._team)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._team)||void 0===i?void 0:i.id):void 0}delete(){return this.id?new wp(this._request).fetch(this.id):void 0}update(e){return this.id?new qp(this._request).fetch(this.id,e):void 0}}class Pm extends cs{constructor(e,i){super(e),this.pageInfo=i.pageInfo?new tm(e,i.pageInfo):void 0}get nodes(){return new kv(this._request).fetch()}}class jm extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._template=null!==(t=i.template)&&void 0!==t?t:void 0}get template(){var e,i;return(null===(e=this._template)||void 0===e?void 0:e.id)?new mv(this._request).fetch(null===(i=this._template)||void 0===i?void 0:i.id):void 0}}class Um extends cs{constructor(e,i){var n,a,t,d,l,o;super(e),this.assetUrl=null!==(n=i.assetUrl)&&void 0!==n?n:void 0,this.contentType=null!==(a=i.contentType)&&void 0!==a?a:void 0,this.filename=null!==(t=i.filename)&&void 0!==t?t:void 0,this.metaData=null!==(d=fs(i.metaData))&&void 0!==d?d:void 0,this.size=null!==(l=i.size)&&void 0!==l?l:void 0,this.uploadUrl=null!==(o=i.uploadUrl)&&void 0!==o?o:void 0,this.headers=i.headers?i.headers.map((i=>new Bm(e,i))):void 0}}class Bm extends cs{constructor(e,i){var n,a;super(e),this.key=null!==(n=i.key)&&void 0!==n?n:void 0,this.value=null!==(a=i.value)&&void 0!==a?a:void 0}}class Em extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this.uploadFile=i.uploadFile?new Um(e,i.uploadFile):void 0}}class Rm extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k,v,c,p;super(e),this.active=null!==(n=i.active)&&void 0!==n?n:void 0,this.admin=null!==(a=i.admin)&&void 0!==a?a:void 0,this.archivedAt=null!==(t=hs(i.archivedAt))&&void 0!==t?t:void 0,this.avatarUrl=null!==(d=i.avatarUrl)&&void 0!==d?d:void 0,this.createdAt=null!==(l=hs(i.createdAt))&&void 0!==l?l:void 0,this.createdIssueCount=null!==(o=i.createdIssueCount)&&void 0!==o?o:void 0,this.disableReason=null!==(r=i.disableReason)&&void 0!==r?r:void 0,this.displayName=null!==(s=i.displayName)&&void 0!==s?s:void 0,this.email=null!==(u=i.email)&&void 0!==u?u:void 0,this.id=null!==(m=i.id)&&void 0!==m?m:void 0,this.inviteHash=null!==(k=i.inviteHash)&&void 0!==k?k:void 0,this.lastSeen=null!==(v=hs(i.lastSeen))&&void 0!==v?v:void 0,this.name=null!==(c=i.name)&&void 0!==c?c:void 0,this.updatedAt=null!==(p=hs(i.updatedAt))&&void 0!==p?p:void 0}get organization(){return new Gk(this._request).fetch()}assignedIssues(e){return this.id?new _N(this._request,this.id,e).fetch(e):void 0}createdIssues(e){return this.id?new TN(this._request,this.id,e).fetch(e):void 0}teamMemberships(e){return this.id?new IN(this._request,this.id,e).fetch(e):void 0}teams(e){return this.id?new wN(this._request,this.id,e).fetch(e):void 0}settingsUpdate(e){return this.id?new Up(this._request).fetch(this.id,e):void 0}suspend(){return this.id?new Ep(this._request).fetch(this.id):void 0}unsuspend(){return this.id?new Rp(this._request).fetch(this.id):void 0}update(e){return this.id?new zp(this._request).fetch(this.id,e):void 0}}class zm extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0}}class Mm extends cs{constructor(e,i){var n,a,t,d,l,o,r;super(e),this.clientId=null!==(n=i.clientId)&&void 0!==n?n:void 0,this.description=null!==(a=i.description)&&void 0!==a?a:void 0,this.developer=null!==(t=i.developer)&&void 0!==t?t:void 0,this.developerUrl=null!==(d=i.developerUrl)&&void 0!==d?d:void 0,this.imageUrl=null!==(l=i.imageUrl)&&void 0!==l?l:void 0,this.isAuthorized=null!==(o=i.isAuthorized)&&void 0!==o?o:void 0,this.name=null!==(r=i.name)&&void 0!==r?r:void 0}}class Lm extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Rm(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class Wm extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._user=null!==(t=i.user)&&void 0!==t?t:void 0}get user(){var e,i;return(null===(e=this._user)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._user)||void 0===i?void 0:i.id):void 0}}class Qm extends cs{constructor(e,i){var n,a,t,d,l,o,r;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.notificationPreferences=null!==(d=fs(i.notificationPreferences))&&void 0!==d?d:void 0,this.unsubscribedFrom=null!==(l=i.unsubscribedFrom)&&void 0!==l?l:void 0,this.updatedAt=null!==(o=hs(i.updatedAt))&&void 0!==o?o:void 0,this._user=null!==(r=i.user)&&void 0!==r?r:void 0}get user(){var e,i;return(null===(e=this._user)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._user)||void 0===i?void 0:i.id):void 0}update(e){return this.id?new Up(this._request).fetch(this.id,e):void 0}}class Hm extends cs{constructor(e,i){var n,a,t,d;super(e),this.flag=null!==(n=i.flag)&&void 0!==n?n:void 0,this.lastSyncId=null!==(a=i.lastSyncId)&&void 0!==a?a:void 0,this.success=null!==(t=i.success)&&void 0!==t?t:void 0,this.value=null!==(d=i.value)&&void 0!==d?d:void 0}}class Gm extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0}}class $m extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0}get userSettings(){return new cv(this._request).fetch()}}class Km extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0}}class Jm extends cs{constructor(e,i){var n,a,t,d,l,o;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.id=null!==(t=i.id)&&void 0!==t?t:void 0,this.type=null!==(d=i.type)&&void 0!==d?d:void 0,this.updatedAt=null!==(l=hs(i.updatedAt))&&void 0!==l?l:void 0,this.viewType=null!==(o=i.viewType)&&void 0!==o?o:void 0}delete(){return this.id?new Lp(this._request).fetch(this.id):void 0}update(e){return this.id?new Wp(this._request).fetch(this.id,e):void 0}}class Zm extends cs{constructor(e,i){var n,a;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this.viewPreferences=i.viewPreferences?new Jm(e,i.viewPreferences):void 0}}class Ym extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m,k;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.enabled=null!==(t=i.enabled)&&void 0!==t?t:void 0,this.id=null!==(d=i.id)&&void 0!==d?d:void 0,this.label=null!==(l=i.label)&&void 0!==l?l:void 0,this.resourceTypes=null!==(o=i.resourceTypes)&&void 0!==o?o:void 0,this.secret=null!==(r=i.secret)&&void 0!==r?r:void 0,this.updatedAt=null!==(s=hs(i.updatedAt))&&void 0!==s?s:void 0,this.url=null!==(u=i.url)&&void 0!==u?u:void 0,this._creator=null!==(m=i.creator)&&void 0!==m?m:void 0,this._team=null!==(k=i.team)&&void 0!==k?k:void 0}get creator(){var e,i;return(null===(e=this._creator)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._creator)||void 0===i?void 0:i.id):void 0}get team(){var e,i;return(null===(e=this._team)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._team)||void 0===i?void 0:i.id):void 0}delete(){return this.id?new Hp(this._request).fetch(this.id):void 0}update(e){return this.id?new Gp(this._request).fetch(this.id,e):void 0}}class Xm extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new Ym(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class ek extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._webhook=null!==(t=i.webhook)&&void 0!==t?t:void 0}get webhook(){var e,i;return(null===(e=this._webhook)||void 0===e?void 0:e.id)?new hv(this._request).fetch(null===(i=this._webhook)||void 0===i?void 0:i.id):void 0}}class ik extends cs{constructor(e,i){var n,a,t,d,l,o,r,s,u,m;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.color=null!==(a=i.color)&&void 0!==a?a:void 0,this.createdAt=null!==(t=hs(i.createdAt))&&void 0!==t?t:void 0,this.description=null!==(d=i.description)&&void 0!==d?d:void 0,this.id=null!==(l=i.id)&&void 0!==l?l:void 0,this.name=null!==(o=i.name)&&void 0!==o?o:void 0,this.position=null!==(r=i.position)&&void 0!==r?r:void 0,this.type=null!==(s=i.type)&&void 0!==s?s:void 0,this.updatedAt=null!==(u=hs(i.updatedAt))&&void 0!==u?u:void 0,this._team=null!==(m=i.team)&&void 0!==m?m:void 0}get team(){var e,i;return(null===(e=this._team)||void 0===e?void 0:e.id)?new ov(this._request).fetch(null===(i=this._team)||void 0===i?void 0:i.id):void 0}issues(e){return this.id?new qN(this._request,this.id,e).fetch(e):void 0}archive(){return this.id?new $p(this._request).fetch(this.id):void 0}update(e){return this.id?new Jp(this._request).fetch(this.id,e):void 0}}class nk extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new ik(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}}class ak extends cs{constructor(e,i){var n,a,t;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0,this.success=null!==(a=i.success)&&void 0!==a?a:void 0,this._workflowState=null!==(t=i.workflowState)&&void 0!==t?t:void 0}get workflowState(){var e,i;return(null===(e=this._workflowState)||void 0===e?void 0:e.id)?new bv(this._request).fetch(null===(i=this._workflowState)||void 0===i?void 0:i.id):void 0}}class tk extends cs{constructor(e,i){var n,a,t;super(e),this.botUserId=null!==(n=i.botUserId)&&void 0!==n?n:void 0,this.subdomain=null!==(a=i.subdomain)&&void 0!==a?a:void 0,this.url=null!==(t=i.url)&&void 0!==t?t:void 0}}class dk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Dt,e).then((i=>{const n=null==i?void 0:i.apiKeys;return n?new ys(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class lk extends cs{constructor(e){super(e)}fetch(e,i,n){return m(this,void 0,void 0,(function*(){return this._request(Vt,Object.assign({clientId:e,scope:i},n)).then((e=>{const i=null==e?void 0:e.applicationWithAuthorization;return i?new Mm(this._request,i):void 0}))}))}}class ok extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Ft,{identifier:e,modelClass:i}).then((e=>{const i=null==e?void 0:e.archivedModelSync;return i?new Ds(this._request,i):void 0}))}))}}class rk extends cs{constructor(e){super(e)}fetch(e,i,n){return m(this,void 0,void 0,(function*(){return this._request(At,Object.assign({modelClass:e,teamId:i},n)).then((e=>{const i=null==e?void 0:e.archivedModelsSync;return i?new Ds(this._request,i):void 0}))}))}}class sk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(_t,{id:e}).then((e=>{const i=null==e?void 0:e.attachment;return i?new Vs(this._request,i):void 0}))}))}}class uk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Tt,{id:e}).then((e=>{const i=null==e?void 0:e.attachmentIssue;return i?new bu(this._request,i):void 0}))}))}}class mk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ut,e).then((i=>{const n=null==i?void 0:i.attachments;return n?new Fs(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class kk extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(Bt,{}).then((e=>{const i=null==e?void 0:e.authorizedApplications;return i?i.map((e=>new Ts(this._request,e))):void 0}))}))}}class vk extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(Et,{}).then((e=>{const i=null==e?void 0:e.availableUsers;return i?new _s(this._request,i):void 0}))}))}}class ck extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(Rt,{}).then((e=>{const i=null==e?void 0:e.billingDetails;return i?new Is(this._request,i):void 0}))}))}}class pk extends cs{constructor(e){super(e)}fetch(e,i,n){return m(this,void 0,void 0,(function*(){return this._request(Mt,{clientId:e,issueId:i,version:n}).then((e=>{const i=null==e?void 0:e.collaborativeDocumentJoin;return i?new xs(this._request,i):void 0}))}))}}class Nk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Wt,{id:e}).then((e=>{const i=null==e?void 0:e.comment;return i?new Cs(this._request,i):void 0}))}))}}class hk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Qt,e).then((i=>{const n=null==i?void 0:i.comments;return n?new Os(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class fk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ht,{id:e}).then((e=>{const i=null==e?void 0:e.customView;return i?new Rs(this._request,i):void 0}))}))}}class bk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Gt,e).then((i=>{const n=null==i?void 0:i.customViews;return n?new zs(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class yk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request($t,{id:e}).then((e=>{const i=null==e?void 0:e.cycle;return i?new Ls(this._request,i):void 0}))}))}}class Sk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Zt,e).then((i=>{const n=null==i?void 0:i.cycles;return n?new Ws(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class gk extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Yt,{identifier:e,modelClass:i}).then((e=>{const i=null==e?void 0:e.dependentModelSync;return i?new Gs(this._request,i):void 0}))}))}}class Dk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Xt,{id:e}).then((e=>{const i=null==e?void 0:e.emoji;return i?new Js(this._request,i):void 0}))}))}}class Vk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ed,e).then((i=>{const n=null==i?void 0:i.emojis;return n?new Zs(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class Fk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(id,{id:e}).then((e=>{const i=null==e?void 0:e.favorite;return i?new eu(this._request,i):void 0}))}))}}class Ak extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(nd,e).then((i=>{const n=null==i?void 0:i.favorites;return n?new iu(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class _k extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(ad,Object.assign({fileId:e},i)).then((e=>{const i=null==e?void 0:e.figmaEmbedInfo;return i?new du(this._request,i):void 0}))}))}}class Tk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(dd,{id:e}).then((e=>{const i=null==e?void 0:e.integration;return i?new mu(this._request,i):void 0}))}))}}class Ik extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ld,e).then((i=>{const n=null==i?void 0:i.integrations;return n?new ku(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class wk extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(od,Object.assign({userHash:e},i)).then((e=>{const i=null==e?void 0:e.inviteInfo;return i?new hu(this._request,i):void 0}))}))}}class qk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(sd,{id:e}).then((e=>{const i=null==e?void 0:e.issue;return i?new bu(this._request,i):void 0}))}))}}class xk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(fd,{id:e}).then((e=>{const i=null==e?void 0:e.issueDescriptionHistory;return i?new gu(this._request,i):void 0}))}))}}class Ck extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(bd,{code:e}).then((e=>{const i=null==e?void 0:e.issueImportFinishGithubOAuth;return i?new lu(this._request,i):void 0}))}))}}class Ok extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(yd,{id:e}).then((e=>{const i=null==e?void 0:e.issueLabel;return i?new Tu(this._request,i):void 0}))}))}}class Pk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(gd,e).then((i=>{const n=null==i?void 0:i.issueLabels;return n?new Iu(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class jk extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(Dd,{}).then((e=>{const i=null==e?void 0:e.issuePriorityValues;return i?i.map((e=>new xu(this._request,e))):void 0}))}))}}class Uk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Vd,{id:e}).then((e=>{const i=null==e?void 0:e.issueRelation;return i?new Cu(this._request,i):void 0}))}))}}class Bk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Fd,e).then((i=>{const n=null==i?void 0:i.issueRelations;return n?new Ou(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class Ek extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Ad,Object.assign({query:e},i)).then((n=>{const a=null==n?void 0:n.issueSearch;return a?new yu(this._request,(n=>this.fetch(e,Object.assign(Object.assign({},i),n))),a):void 0}))}))}}class Rk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(_d,e).then((i=>{const n=null==i?void 0:i.issues;return n?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class zk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Td,{id:e}).then((e=>{const i=null==e?void 0:e.milestone;return i?new Uu(this._request,i):void 0}))}))}}class Mk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(wd,e).then((i=>{const n=null==i?void 0:i.milestones;return n?new Bu(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class Lk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(qd,{id:e}).then((e=>{const i=null==e?void 0:e.notification;return i?new Ru(this._request,i):void 0}))}))}}class Wk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(xd,{id:e}).then((e=>{const i=null==e?void 0:e.notificationSubscription;return i?new Lu(this._request,i):void 0}))}))}}class Qk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Cd,e).then((i=>{const n=null==i?void 0:i.notificationSubscriptions;return n?new Wu(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class Hk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Od,e).then((i=>{const n=null==i?void 0:i.notifications;return n?new zu(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class Gk extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(Pd,{}).then((e=>{const i=null==e?void 0:e.organization;return i?new Ku(this._request,i):void 0}))}))}}class $k extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Rd,{urlKey:e}).then((e=>{const i=null==e?void 0:e.organizationExists;return i?new Xu(this._request,i):void 0}))}))}}class Kk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(zd,{id:e}).then((e=>{const i=null==e?void 0:e.organizationInvite;return i?new Tu(this._request,i):void 0}))}))}}class Jk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ld,e).then((i=>{const n=null==i?void 0:i.organizationInvites;return n?new im(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class Zk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Wd,{id:e}).then((e=>{const i=null==e?void 0:e.project;return i?new dm(this._request,i):void 0}))}))}}class Yk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Kd,{id:e}).then((e=>{const i=null==e?void 0:e.projectLink;return i?new om(this._request,i):void 0}))}))}}class Xk extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Jd,e).then((i=>{const n=null==i?void 0:i.projectLinks;return n?new rm(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class ev extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Zd,e).then((i=>{const n=null==i?void 0:i.projects;return n?new lm(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class iv extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(Yd,{}).then((e=>{const i=null==e?void 0:e.pushSubscriptionTest;return i?new cm(this._request,i):void 0}))}))}}class nv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Xd,{id:e}).then((e=>{const i=null==e?void 0:e.reaction;return i?new pm(this._request,i):void 0}))}))}}class av extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(el,e).then((i=>{const n=null==i?void 0:i.reactions;return n?new Nm(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class tv extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(il,Object.assign({email:e},i)).then((e=>{const i=null==e?void 0:e.ssoUrlFromEmail;return i?new gm(this._request,i):void 0}))}))}}class dv extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(nl,{}).then((e=>{const i=null==e?void 0:e.subscription;return i?new Vm(this._request,i):void 0}))}))}}class lv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(al,e).then((e=>{const i=null==e?void 0:e.syncBootstrap;return i?new _m(this._request,i):void 0}))}))}}class ov extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(tl,{id:e}).then((e=>{const i=null==e?void 0:e.team;return i?new Tm(this._request,i):void 0}))}))}}class rv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(cl,{id:e}).then((e=>{const i=null==e?void 0:e.teamMembership;return i?new wm(this._request,i):void 0}))}))}}class sv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(pl,e).then((i=>{const n=null==i?void 0:i.teamMemberships;return n?new qm(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class uv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Nl,e).then((i=>{const n=null==i?void 0:i.teams;return n?new Im(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class mv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(hl,{id:e}).then((e=>{const i=null==e?void 0:e.template;return i?new Om(this._request,i):void 0}))}))}}class kv extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(fl,{}).then((e=>{const i=null==e?void 0:e.templates;return i?i.map((e=>new Om(this._request,e))):void 0}))}))}}class vv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(bl,{id:e}).then((e=>{const i=null==e?void 0:e.user;return i?new Rm(this._request,i):void 0}))}))}}class cv extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(Vl,{}).then((e=>{const i=null==e?void 0:e.userSettings;return i?new Qm(this._request,i):void 0}))}))}}class pv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Fl,e).then((i=>{const n=null==i?void 0:i.users;return n?new Lm(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class Nv extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(Al,{}).then((e=>{const i=null==e?void 0:e.viewer;return i?new Rm(this._request,i):void 0}))}))}}class hv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ql,{id:e}).then((e=>{const i=null==e?void 0:e.webhook;return i?new Ym(this._request,i):void 0}))}))}}class fv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(xl,e).then((i=>{const n=null==i?void 0:i.webhooks;return n?new Xm(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class bv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Cl,{id:e}).then((e=>{const i=null==e?void 0:e.workflowState;return i?new ik(this._request,i):void 0}))}))}}class yv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Pl,e).then((i=>{const n=null==i?void 0:i.workflowStates;return n?new nk(this._request,(i=>this.fetch(Object.assign(Object.assign({},e),i))),n):void 0}))}))}}class Sv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(jl,{input:e}).then((e=>{const i=null==e?void 0:e.apiKeyCreate;return i?new Ss(this._request,i):void 0}))}))}}class gv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ul,{id:e}).then((e=>{const i=null==e?void 0:e.apiKeyDelete;return i?new gs(this._request,i):void 0}))}))}}class Dv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Bl,{id:e}).then((e=>{const i=null==e?void 0:e.attachmentArchive;return i?new gs(this._request,i):void 0}))}))}}class Vv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(El,{input:e}).then((e=>{const i=null==e?void 0:e.attachmentCreate;return i?new As(this._request,i):void 0}))}))}}class Fv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Rl,{id:e}).then((e=>{const i=null==e?void 0:e.attachmentDelete;return i?new gs(this._request,i):void 0}))}))}}class Av extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(zl,{issueId:e,ticketId:i}).then((e=>{const i=null==e?void 0:e.attachmentLinkZendesk;return i?new As(this._request,i):void 0}))}))}}class _v extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Ml,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.attachmentUpdate;return i?new As(this._request,i):void 0}))}))}}class Tv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ll,{input:e}).then((e=>{const i=null==e?void 0:e.billingEmailUpdate;return i?new ws(this._request,i):void 0}))}))}}class Iv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Wl,{input:e}).then((e=>{const i=null==e?void 0:e.collaborativeDocumentUpdate;return i?new xs(this._request,i):void 0}))}))}}class wv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ql,{input:e}).then((e=>{const i=null==e?void 0:e.commentCreate;return i?new Ps(this._request,i):void 0}))}))}}class qv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Hl,{id:e}).then((e=>{const i=null==e?void 0:e.commentDelete;return i?new gs(this._request,i):void 0}))}))}}class xv extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Gl,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.commentUpdate;return i?new Ps(this._request,i):void 0}))}))}}class Cv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request($l,{input:e}).then((e=>{const i=null==e?void 0:e.contactCreate;return i?new Us(this._request,i):void 0}))}))}}class Ov extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Kl,e).then((e=>{const i=null==e?void 0:e.createCsvExportReport;return i?new Bs(this._request,i):void 0}))}))}}class Pv extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Jl,Object.assign({input:e},i)).then((e=>{const i=null==e?void 0:e.createOrganizationFromOnboarding;return i?new Es(this._request,i):void 0}))}))}}class jv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Zl,{input:e}).then((e=>{const i=null==e?void 0:e.customViewCreate;return i?new Ms(this._request,i):void 0}))}))}}class Uv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Yl,{id:e}).then((e=>{const i=null==e?void 0:e.customViewDelete;return i?new gs(this._request,i):void 0}))}))}}class Bv extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Xl,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.customViewUpdate;return i?new Ms(this._request,i):void 0}))}))}}class Ev extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(eo,{id:e}).then((e=>{const i=null==e?void 0:e.cycleArchive;return i?new gs(this._request,i):void 0}))}))}}class Rv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(io,{input:e}).then((e=>{const i=null==e?void 0:e.cycleCreate;return i?new Qs(this._request,i):void 0}))}))}}class zv extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(no,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.cycleUpdate;return i?new Qs(this._request,i):void 0}))}))}}class Mv extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(ao,{}).then((e=>{const i=null==e?void 0:e.debugCreateSAMLOrg;return i?new Hs(this._request,i):void 0}))}))}}class Lv extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(to,{}).then((e=>{const i=null==e?void 0:e.debugFailWithInternalError;return i?new Hs(this._request,i):void 0}))}))}}class Wv extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(lo,{}).then((e=>{const i=null==e?void 0:e.debugFailWithWarning;return i?new Hs(this._request,i):void 0}))}))}}class Qv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(oo,{input:e}).then((e=>{const i=null==e?void 0:e.emailTokenUserAccountAuth;return i?new _s(this._request,i):void 0}))}))}}class Hv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ro,{input:e}).then((e=>{const i=null==e?void 0:e.emailUnsubscribe;return i?new $s(this._request,i):void 0}))}))}}class Gv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(so,{input:e}).then((e=>{const i=null==e?void 0:e.emailUserAccountAuthChallenge;return i?new Ks(this._request,i):void 0}))}))}}class $v extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(uo,{input:e}).then((e=>{const i=null==e?void 0:e.emojiCreate;return i?new Ys(this._request,i):void 0}))}))}}class Kv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(mo,{id:e}).then((e=>{const i=null==e?void 0:e.emojiDelete;return i?new gs(this._request,i):void 0}))}))}}class Jv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ko,{input:e}).then((e=>{const i=null==e?void 0:e.eventCreate;return i?new Xs(this._request,i):void 0}))}))}}class Zv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(vo,{input:e}).then((e=>{const i=null==e?void 0:e.favoriteCreate;return i?new nu(this._request,i):void 0}))}))}}class Yv extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(co,{id:e}).then((e=>{const i=null==e?void 0:e.favoriteDelete;return i?new gs(this._request,i):void 0}))}))}}class Xv extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(po,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.favoriteUpdate;return i?new nu(this._request,i):void 0}))}))}}class ec extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(No,{input:e}).then((e=>{const i=null==e?void 0:e.feedbackCreate;return i?new au(this._request,i):void 0}))}))}}class ic extends cs{constructor(e){super(e)}fetch(e,i,n,a){return m(this,void 0,void 0,(function*(){return this._request(ho,Object.assign({contentType:e,filename:i,size:n},a)).then((e=>{const i=null==e?void 0:e.fileUpload;return i?new Em(this._request,i):void 0}))}))}}class nc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(fo,{input:e}).then((e=>{const i=null==e?void 0:e.googleUserAccountAuth;return i?new _s(this._request,i):void 0}))}))}}class ac extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(bo,{url:e}).then((e=>{const i=null==e?void 0:e.imageUploadFromUrl;return i?new uu(this._request,i):void 0}))}))}}class tc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(yo,{id:e}).then((e=>{const i=null==e?void 0:e.integrationDelete;return i?new gs(this._request,i):void 0}))}))}}class dc extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(So,{code:e,redirectUri:i}).then((e=>{const i=null==e?void 0:e.integrationFigma;return i?new vu(this._request,i):void 0}))}))}}class lc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(go,{installationId:e}).then((e=>{const i=null==e?void 0:e.integrationGithubConnect;return i?new vu(this._request,i):void 0}))}))}}class oc extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Do,{accessToken:e,gitlabUrl:i}).then((e=>{const i=null==e?void 0:e.integrationGitlabConnect;return i?new vu(this._request,i):void 0}))}))}}class rc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Vo,{code:e}).then((e=>{const i=null==e?void 0:e.integrationGoogleSheets;return i?new vu(this._request,i):void 0}))}))}}class sc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Fo,{id:e}).then((e=>{const i=null==e?void 0:e.integrationResourceArchive;return i?new gs(this._request,i):void 0}))}))}}class uc extends cs{constructor(e){super(e)}fetch(e,i,n){return m(this,void 0,void 0,(function*(){return this._request(Ao,{code:e,installationId:i,organizationSlug:n}).then((e=>{const i=null==e?void 0:e.integrationSentryConnect;return i?new vu(this._request,i):void 0}))}))}}class mc extends cs{constructor(e){super(e)}fetch(e,i,n){return m(this,void 0,void 0,(function*(){return this._request(_o,Object.assign({code:e,redirectUri:i},n)).then((e=>{const i=null==e?void 0:e.integrationSlack;return i?new vu(this._request,i):void 0}))}))}}class kc extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(To,{code:e,redirectUri:i}).then((e=>{const i=null==e?void 0:e.integrationSlackImportEmojis;return i?new vu(this._request,i):void 0}))}))}}class vc extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Io,{code:e,redirectUri:i}).then((e=>{const i=null==e?void 0:e.integrationSlackPersonal;return i?new vu(this._request,i):void 0}))}))}}class cc extends cs{constructor(e){super(e)}fetch(e,i,n,a){return m(this,void 0,void 0,(function*(){return this._request(wo,Object.assign({code:e,redirectUri:i,teamId:n},a)).then((e=>{const i=null==e?void 0:e.integrationSlackPost;return i?new vu(this._request,i):void 0}))}))}}class pc extends cs{constructor(e){super(e)}fetch(e,i,n){return m(this,void 0,void 0,(function*(){return this._request(qo,{code:e,projectId:i,redirectUri:n}).then((e=>{const i=null==e?void 0:e.integrationSlackProjectPost;return i?new vu(this._request,i):void 0}))}))}}class Nc extends cs{constructor(e){super(e)}fetch(e,i,n,a){return m(this,void 0,void 0,(function*(){return this._request(xo,{code:e,redirectUri:i,scope:n,subdomain:a}).then((e=>{const i=null==e?void 0:e.integrationZendesk;return i?new vu(this._request,i):void 0}))}))}}class hc extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Co,Object.assign({id:e},i)).then((e=>{const i=null==e?void 0:e.issueArchive;return i?new gs(this._request,i):void 0}))}))}}class fc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Oo,{input:e}).then((e=>{const i=null==e?void 0:e.issueCreate;return i?new qu(this._request,i):void 0}))}))}}class bc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Po,{id:e}).then((e=>{const i=null==e?void 0:e.issueDelete;return i?new gs(this._request,i):void 0}))}))}}class yc extends cs{constructor(e){super(e)}fetch(e,i,n,a){return m(this,void 0,void 0,(function*(){return this._request(jo,Object.assign({asanaTeamName:e,asanaToken:i,teamId:n},a)).then((e=>{const i=null==e?void 0:e.issueImportCreateAsana;return i?new _u(this._request,i):void 0}))}))}}class Sc extends cs{constructor(e){super(e)}fetch(e,i,n,a){return m(this,void 0,void 0,(function*(){return this._request(Uo,Object.assign({clubhouseTeamName:e,clubhouseToken:i,teamId:n},a)).then((e=>{const i=null==e?void 0:e.issueImportCreateClubhouse;return i?new _u(this._request,i):void 0}))}))}}class gc extends cs{constructor(e){super(e)}fetch(e,i,n,a,t){return m(this,void 0,void 0,(function*(){return this._request(Bo,Object.assign({githubRepoName:e,githubRepoOwner:i,githubToken:n,teamId:a},t)).then((e=>{const i=null==e?void 0:e.issueImportCreateGithub;return i?new _u(this._request,i):void 0}))}))}}class Dc extends cs{constructor(e){super(e)}fetch(e,i,n,a,t,d){return m(this,void 0,void 0,(function*(){return this._request(Eo,Object.assign({jiraEmail:e,jiraHostname:i,jiraProject:n,jiraToken:a,teamId:t},d)).then((e=>{const i=null==e?void 0:e.issueImportCreateJira;return i?new _u(this._request,i):void 0}))}))}}class Vc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ro,{issueImportId:e}).then((e=>{const i=null==e?void 0:e.issueImportDelete;return i?new Au(this._request,i):void 0}))}))}}class Fc extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(zo,{issueImportId:e,mapping:i}).then((e=>{const i=null==e?void 0:e.issueImportProcess;return i?new _u(this._request,i):void 0}))}))}}class Ac extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Mo,{id:e}).then((e=>{const i=null==e?void 0:e.issueLabelArchive;return i?new gs(this._request,i):void 0}))}))}}class _c extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Lo,{input:e}).then((e=>{const i=null==e?void 0:e.issueLabelCreate;return i?new wu(this._request,i):void 0}))}))}}class Tc extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Wo,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.issueLabelUpdate;return i?new wu(this._request,i):void 0}))}))}}class Ic extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Qo,{input:e}).then((e=>{const i=null==e?void 0:e.issueRelationCreate;return i?new ju(this._request,i):void 0}))}))}}class wc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ho,{id:e}).then((e=>{const i=null==e?void 0:e.issueRelationDelete;return i?new gs(this._request,i):void 0}))}))}}class qc extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Go,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.issueRelationUpdate;return i?new ju(this._request,i):void 0}))}))}}class xc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request($o,{id:e}).then((e=>{const i=null==e?void 0:e.issueUnarchive;return i?new gs(this._request,i):void 0}))}))}}class Cc extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Ko,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.issueUpdate;return i?new qu(this._request,i):void 0}))}))}}class Oc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Jo,{input:e}).then((e=>{const i=null==e?void 0:e.joinOrganizationFromOnboarding;return i?new Es(this._request,i):void 0}))}))}}class Pc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Zo,{organizationId:e}).then((e=>{const i=null==e?void 0:e.leaveOrganization;return i?new Es(this._request,i):void 0}))}))}}class jc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Yo,{input:e}).then((e=>{const i=null==e?void 0:e.milestoneCreate;return i?new Eu(this._request,i):void 0}))}))}}class Uc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Xo,{id:e}).then((e=>{const i=null==e?void 0:e.milestoneDelete;return i?new gs(this._request,i):void 0}))}))}}class Bc extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(er,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.milestoneUpdate;return i?new Eu(this._request,i):void 0}))}))}}class Ec extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ir,{id:e}).then((e=>{const i=null==e?void 0:e.notificationArchive;return i?new gs(this._request,i):void 0}))}))}}class Rc extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(nr,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.notificationCreate;return i?new Mu(this._request,i):void 0}))}))}}class zc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ar,{input:e}).then((e=>{const i=null==e?void 0:e.notificationSubscriptionCreate;return i?new Qu(this._request,i):void 0}))}))}}class Mc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(tr,{id:e}).then((e=>{const i=null==e?void 0:e.notificationSubscriptionDelete;return i?new gs(this._request,i):void 0}))}))}}class Lc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(dr,{id:e}).then((e=>{const i=null==e?void 0:e.notificationUnarchive;return i?new gs(this._request,i):void 0}))}))}}class Wc extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(lr,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.notificationUpdate;return i?new Mu(this._request,i):void 0}))}))}}class Qc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(or,{id:e}).then((e=>{const i=null==e?void 0:e.oauthClientArchive;return i?new gs(this._request,i):void 0}))}))}}class Hc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(rr,{input:e}).then((e=>{const i=null==e?void 0:e.oauthClientCreate;return i?new Gu(this._request,i):void 0}))}))}}class Gc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(sr,{id:e}).then((e=>{const i=null==e?void 0:e.oauthClientRotateSecret;return i?new fm(this._request,i):void 0}))}))}}class $c extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(ur,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.oauthClientUpdate;return i?new Gu(this._request,i):void 0}))}))}}class Kc extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(mr,{appId:e,scope:i}).then((e=>{const i=null==e?void 0:e.oauthTokenRevoke;return i?new $u(this._request,i):void 0}))}))}}class Jc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(kr,{input:e}).then((e=>{const i=null==e?void 0:e.organizationDelete;return i?new Ju(this._request,i):void 0}))}))}}class Zc extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(vr,{}).then((e=>{const i=null==e?void 0:e.organizationDeleteChallenge;return i?new Ju(this._request,i):void 0}))}))}}class Yc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(cr,{input:e}).then((e=>{const i=null==e?void 0:e.organizationDomainCreate;return i?new Yu(this._request,i):void 0}))}))}}class Xc extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(pr,{id:e}).then((e=>{const i=null==e?void 0:e.organizationDomainDelete;return i?new gs(this._request,i):void 0}))}))}}class ep extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Nr,{input:e}).then((e=>{const i=null==e?void 0:e.organizationDomainVerify;return i?new Yu(this._request,i):void 0}))}))}}class ip extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(hr,{input:e}).then((e=>{const i=null==e?void 0:e.organizationInviteCreate;return i?new nm(this._request,i):void 0}))}))}}class np extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(fr,{id:e}).then((e=>{const i=null==e?void 0:e.organizationInviteDelete;return i?new gs(this._request,i):void 0}))}))}}class ap extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(br,{input:e}).then((e=>{const i=null==e?void 0:e.organizationUpdate;return i?new am(this._request,i):void 0}))}))}}class tp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(yr,{id:e}).then((e=>{const i=null==e?void 0:e.projectArchive;return i?new gs(this._request,i):void 0}))}))}}class dp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Sr,{input:e}).then((e=>{const i=null==e?void 0:e.projectCreate;return i?new um(this._request,i):void 0}))}))}}class lp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(gr,{input:e}).then((e=>{const i=null==e?void 0:e.projectLinkCreate;return i?new sm(this._request,i):void 0}))}))}}class op extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Dr,{id:e}).then((e=>{const i=null==e?void 0:e.projectLinkDelete;return i?new gs(this._request,i):void 0}))}))}}class rp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Vr,{id:e}).then((e=>{const i=null==e?void 0:e.projectUnarchive;return i?new gs(this._request,i):void 0}))}))}}class sp extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Fr,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.projectUpdate;return i?new um(this._request,i):void 0}))}))}}class up extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ar,{input:e}).then((e=>{const i=null==e?void 0:e.pushSubscriptionCreate;return i?new vm(this._request,i):void 0}))}))}}class mp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(_r,{id:e}).then((e=>{const i=null==e?void 0:e.pushSubscriptionDelete;return i?new vm(this._request,i):void 0}))}))}}class kp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Tr,{input:e}).then((e=>{const i=null==e?void 0:e.reactionCreate;return i?new hm(this._request,i):void 0}))}))}}class vp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ir,{id:e}).then((e=>{const i=null==e?void 0:e.reactionDelete;return i?new gs(this._request,i):void 0}))}))}}class cp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(wr,{id:e}).then((e=>{const i=null==e?void 0:e.refreshGoogleSheetsData;return i?new vu(this._request,i):void 0}))}))}}class pp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(qr,{id:e}).then((e=>{const i=null==e?void 0:e.resentOrganizationInvite;return i?new gs(this._request,i):void 0}))}))}}class Np extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(xr,{input:e}).then((e=>{const i=null==e?void 0:e.samlTokenUserAccountAuth;return i?new _s(this._request,i):void 0}))}))}}class hp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Cr,{id:e}).then((e=>{const i=null==e?void 0:e.subscriptionArchive;return i?new gs(this._request,i):void 0}))}))}}class fp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Or,{plan:e}).then((e=>{const i=null==e?void 0:e.subscriptionSessionCreate;return i?new Am(this._request,i):void 0}))}))}}class bp extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Pr,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.subscriptionUpdate;return i?new Fm(this._request,i):void 0}))}))}}class yp extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(jr,{}).then((e=>{const i=null==e?void 0:e.subscriptionUpdateSessionCreate;return i?new Am(this._request,i):void 0}))}))}}class Sp extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Ur,{id:e,type:i}).then((e=>{const i=null==e?void 0:e.subscriptionUpgrade;return i?new Fm(this._request,i):void 0}))}))}}class gp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Br,{id:e}).then((e=>{const i=null==e?void 0:e.teamArchive;return i?new gs(this._request,i):void 0}))}))}}class Dp extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Er,Object.assign({input:e},i)).then((e=>{const i=null==e?void 0:e.teamCreate;return i?new Cm(this._request,i):void 0}))}))}}class Vp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Rr,{id:e}).then((e=>{const i=null==e?void 0:e.teamDelete;return i?new gs(this._request,i):void 0}))}))}}class Fp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(zr,{input:e}).then((e=>{const i=null==e?void 0:e.teamMembershipCreate;return i?new xm(this._request,i):void 0}))}))}}class Ap extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Mr,{id:e}).then((e=>{const i=null==e?void 0:e.teamMembershipDelete;return i?new gs(this._request,i):void 0}))}))}}class _p extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Lr,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.teamMembershipUpdate;return i?new xm(this._request,i):void 0}))}))}}class Tp extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Wr,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.teamUpdate;return i?new Cm(this._request,i):void 0}))}))}}class Ip extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Qr,{input:e}).then((e=>{const i=null==e?void 0:e.templateCreate;return i?new jm(this._request,i):void 0}))}))}}class wp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Hr,{id:e}).then((e=>{const i=null==e?void 0:e.templateDelete;return i?new gs(this._request,i):void 0}))}))}}class qp extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Gr,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.templateUpdate;return i?new jm(this._request,i):void 0}))}))}}class xp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request($r,{id:e}).then((e=>{const i=null==e?void 0:e.userDemoteAdmin;return i?new zm(this._request,i):void 0}))}))}}class Cp extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Kr,{flag:e,operation:i}).then((e=>{const i=null==e?void 0:e.userFlagUpdate;return i?new Hm(this._request,i):void 0}))}))}}class Op extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Jr,{id:e}).then((e=>{const i=null==e?void 0:e.userPromoteAdmin;return i?new zm(this._request,i):void 0}))}))}}class Pp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Zr,{flag:e}).then((e=>{const i=null==e?void 0:e.userSettingsFlagIncrement;return i?new Hm(this._request,i):void 0}))}))}}class jp extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(Yr,{}).then((e=>{const i=null==e?void 0:e.userSettingsFlagsReset;return i?new Gm(this._request,i):void 0}))}))}}class Up extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(Xr,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.userSettingsUpdate;return i?new $m(this._request,i):void 0}))}))}}class Bp extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(es,{}).then((e=>{const i=null==e?void 0:e.userSubscribeToNewsletter;return i?new Km(this._request,i):void 0}))}))}}class Ep extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(is,{id:e}).then((e=>{const i=null==e?void 0:e.userSuspend;return i?new zm(this._request,i):void 0}))}))}}class Rp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ns,{id:e}).then((e=>{const i=null==e?void 0:e.userUnsuspend;return i?new zm(this._request,i):void 0}))}))}}class zp extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(as,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.userUpdate;return i?new Wm(this._request,i):void 0}))}))}}class Mp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ts,{input:e}).then((e=>{const i=null==e?void 0:e.viewPreferencesCreate;return i?new Zm(this._request,i):void 0}))}))}}class Lp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ds,{id:e}).then((e=>{const i=null==e?void 0:e.viewPreferencesDelete;return i?new gs(this._request,i):void 0}))}))}}class Wp extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(ls,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.viewPreferencesUpdate;return i?new Zm(this._request,i):void 0}))}))}}class Qp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(os,{input:e}).then((e=>{const i=null==e?void 0:e.webhookCreate;return i?new ek(this._request,i):void 0}))}))}}class Hp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(rs,{id:e}).then((e=>{const i=null==e?void 0:e.webhookDelete;return i?new gs(this._request,i):void 0}))}))}}class Gp extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(ss,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.webhookUpdate;return i?new ek(this._request,i):void 0}))}))}}class $p extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(us,{id:e}).then((e=>{const i=null==e?void 0:e.workflowStateArchive;return i?new gs(this._request,i):void 0}))}))}}class Kp extends cs{constructor(e){super(e)}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ms,{input:e}).then((e=>{const i=null==e?void 0:e.workflowStateCreate;return i?new ak(this._request,i):void 0}))}))}}class Jp extends cs{constructor(e){super(e)}fetch(e,i){return m(this,void 0,void 0,(function*(){return this._request(ks,{id:e,input:i}).then((e=>{const i=null==e?void 0:e.workflowStateUpdate;return i?new ak(this._request,i):void 0}))}))}}class Zp extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Kt,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.cycle)||void 0===n?void 0:n.issues;return a?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class Yp extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Jt,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.cycle)||void 0===n?void 0:n.uncompletedIssuesUponClose;return a?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class Xp extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ud,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.issue)||void 0===n?void 0:n.attachments;return a?new Fs(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class eN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(md,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.issue)||void 0===n?void 0:n.children;return a?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class iN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(kd,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.issue)||void 0===n?void 0:n.comments;return a?new Os(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class nN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(vd,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.issue)||void 0===n?void 0:n.history;return a?new Vu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class aN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(cd,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.issue)||void 0===n?void 0:n.inverseRelations;return a?new Ou(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class tN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(pd,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.issue)||void 0===n?void 0:n.labels;return a?new Iu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class dN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Nd,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.issue)||void 0===n?void 0:n.relations;return a?new Ou(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class lN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(hd,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.issue)||void 0===n?void 0:n.subscribers;return a?new Lm(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class oN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Sd,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.issueLabel)||void 0===n?void 0:n.issues;return a?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class rN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Id,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.milestone)||void 0===n?void 0:n.projects;return a?new lm(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class sN extends cs{constructor(e,i){super(e),this._variables=i}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(jd,e).then((i=>{var n;const a=null===(n=null==i?void 0:i.organization)||void 0===n?void 0:n.integrations;return a?new ku(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class uN extends cs{constructor(e,i){super(e),this._variables=i}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ud,e).then((i=>{var n;const a=null===(n=null==i?void 0:i.organization)||void 0===n?void 0:n.milestones;return a?new Bu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class mN extends cs{constructor(e,i){super(e),this._variables=i}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Bd,e).then((i=>{var n;const a=null===(n=null==i?void 0:i.organization)||void 0===n?void 0:n.teams;return a?new Im(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class kN extends cs{constructor(e,i){super(e),this._variables=i}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ed,e).then((i=>{var n;const a=null===(n=null==i?void 0:i.organization)||void 0===n?void 0:n.users;return a?new Lm(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class vN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Md,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.organizationInvite)||void 0===n?void 0:n.issues;return a?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class cN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Qd,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.project)||void 0===n?void 0:n.issues;return a?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class pN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Hd,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.project)||void 0===n?void 0:n.links;return a?new rm(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class NN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Gd,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.project)||void 0===n?void 0:n.members;return a?new Lm(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class hN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request($d,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.project)||void 0===n?void 0:n.teams;return a?new Im(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class fN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(dl,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.team)||void 0===n?void 0:n.cycles;return a?new Ws(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class bN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ll,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.team)||void 0===n?void 0:n.issues;return a?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class yN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ol,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.team)||void 0===n?void 0:n.labels;return a?new Iu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class SN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(rl,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.team)||void 0===n?void 0:n.members;return a?new Lm(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class gN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(sl,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.team)||void 0===n?void 0:n.memberships;return a?new qm(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class DN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ul,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.team)||void 0===n?void 0:n.projects;return a?new lm(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class VN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(ml,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.team)||void 0===n?void 0:n.states;return a?new nk(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class FN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(kl,Object.assign(Object.assign({id:this._id},this._variables),e)).then((e=>{var i;const n=null===(i=null==e?void 0:e.team)||void 0===i?void 0:i.templates;return n?new Pm(this._request,n):void 0}))}))}}class AN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(vl,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.team)||void 0===n?void 0:n.webhooks;return a?new Xm(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class _N extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(yl,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.user)||void 0===n?void 0:n.assignedIssues;return a?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class TN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Sl,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.user)||void 0===n?void 0:n.createdIssues;return a?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class IN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(gl,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.user)||void 0===n?void 0:n.teamMemberships;return a?new qm(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class wN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Dl,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.user)||void 0===n?void 0:n.teams;return a?new Im(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class qN extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ol,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.workflowState)||void 0===n?void 0:n.issues;return a?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}}class xN extends cs{constructor(e){super(e)}apiKeys(e){return new dk(this._request).fetch(e)}applicationWithAuthorization(e,i,n){return new lk(this._request).fetch(e,i,n)}archivedModelSync(e,i){return new ok(this._request).fetch(e,i)}archivedModelsSync(e,i,n){return new rk(this._request).fetch(e,i,n)}attachment(e){return new sk(this._request).fetch(e)}attachmentIssue(e){return new uk(this._request).fetch(e)}attachments(e){return new mk(this._request).fetch(e)}get authorizedApplications(){return new kk(this._request).fetch()}get availableUsers(){return new vk(this._request).fetch()}get billingDetails(){return new ck(this._request).fetch()}collaborativeDocumentJoin(e,i,n){return new pk(this._request).fetch(e,i,n)}comment(e){return new Nk(this._request).fetch(e)}comments(e){return new hk(this._request).fetch(e)}customView(e){return new fk(this._request).fetch(e)}customViews(e){return new bk(this._request).fetch(e)}cycle(e){return new yk(this._request).fetch(e)}cycles(e){return new Sk(this._request).fetch(e)}dependentModelSync(e,i){return new gk(this._request).fetch(e,i)}emoji(e){return new Dk(this._request).fetch(e)}emojis(e){return new Vk(this._request).fetch(e)}favorite(e){return new Fk(this._request).fetch(e)}favorites(e){return new Ak(this._request).fetch(e)}figmaEmbedInfo(e,i){return new _k(this._request).fetch(e,i)}integration(e){return new Tk(this._request).fetch(e)}integrations(e){return new Ik(this._request).fetch(e)}inviteInfo(e,i){return new wk(this._request).fetch(e,i)}issue(e){return new qk(this._request).fetch(e)}issueDescriptionHistory(e){return new xk(this._request).fetch(e)}issueImportFinishGithubOAuth(e){return new Ck(this._request).fetch(e)}issueLabel(e){return new Ok(this._request).fetch(e)}issueLabels(e){return new Pk(this._request).fetch(e)}get issuePriorityValues(){return new jk(this._request).fetch()}issueRelation(e){return new Uk(this._request).fetch(e)}issueRelations(e){return new Bk(this._request).fetch(e)}issueSearch(e,i){return new Ek(this._request).fetch(e,i)}issues(e){return new Rk(this._request).fetch(e)}milestone(e){return new zk(this._request).fetch(e)}milestones(e){return new Mk(this._request).fetch(e)}notification(e){return new Lk(this._request).fetch(e)}notificationSubscription(e){return new Wk(this._request).fetch(e)}notificationSubscriptions(e){return new Qk(this._request).fetch(e)}notifications(e){return new Hk(this._request).fetch(e)}get organization(){return new Gk(this._request).fetch()}organizationExists(e){return new $k(this._request).fetch(e)}organizationInvite(e){return new Kk(this._request).fetch(e)}organizationInvites(e){return new Jk(this._request).fetch(e)}project(e){return new Zk(this._request).fetch(e)}projectLink(e){return new Yk(this._request).fetch(e)}projectLinks(e){return new Xk(this._request).fetch(e)}projects(e){return new ev(this._request).fetch(e)}get pushSubscriptionTest(){return new iv(this._request).fetch()}reaction(e){return new nv(this._request).fetch(e)}reactions(e){return new av(this._request).fetch(e)}ssoUrlFromEmail(e,i){return new tv(this._request).fetch(e,i)}get subscription(){return new dv(this._request).fetch()}syncBootstrap(e){return new lv(this._request).fetch(e)}team(e){return new ov(this._request).fetch(e)}teamMembership(e){return new rv(this._request).fetch(e)}teamMemberships(e){return new sv(this._request).fetch(e)}teams(e){return new uv(this._request).fetch(e)}template(e){return new mv(this._request).fetch(e)}get templates(){return new kv(this._request).fetch()}user(e){return new vv(this._request).fetch(e)}get userSettings(){return new cv(this._request).fetch()}users(e){return new pv(this._request).fetch(e)}get viewer(){return new Nv(this._request).fetch()}webhook(e){return new hv(this._request).fetch(e)}webhooks(e){return new fv(this._request).fetch(e)}workflowState(e){return new bv(this._request).fetch(e)}workflowStates(e){return new yv(this._request).fetch(e)}apiKeyCreate(e){return new Sv(this._request).fetch(e)}apiKeyDelete(e){return new gv(this._request).fetch(e)}attachmentArchive(e){return new Dv(this._request).fetch(e)}attachmentCreate(e){return new Vv(this._request).fetch(e)}attachmentDelete(e){return new Fv(this._request).fetch(e)}attachmentLinkZendesk(e,i){return new Av(this._request).fetch(e,i)}attachmentUpdate(e,i){return new _v(this._request).fetch(e,i)}billingEmailUpdate(e){return new Tv(this._request).fetch(e)}collaborativeDocumentUpdate(e){return new Iv(this._request).fetch(e)}commentCreate(e){return new wv(this._request).fetch(e)}commentDelete(e){return new qv(this._request).fetch(e)}commentUpdate(e,i){return new xv(this._request).fetch(e,i)}contactCreate(e){return new Cv(this._request).fetch(e)}createCsvExportReport(e){return new Ov(this._request).fetch(e)}createOrganizationFromOnboarding(e,i){return new Pv(this._request).fetch(e,i)}customViewCreate(e){return new jv(this._request).fetch(e)}customViewDelete(e){return new Uv(this._request).fetch(e)}customViewUpdate(e,i){return new Bv(this._request).fetch(e,i)}cycleArchive(e){return new Ev(this._request).fetch(e)}cycleCreate(e){return new Rv(this._request).fetch(e)}cycleUpdate(e,i){return new zv(this._request).fetch(e,i)}get debugCreateSAMLOrg(){return new Mv(this._request).fetch()}get debugFailWithInternalError(){return new Lv(this._request).fetch()}get debugFailWithWarning(){return new Wv(this._request).fetch()}emailTokenUserAccountAuth(e){return new Qv(this._request).fetch(e)}emailUnsubscribe(e){return new Hv(this._request).fetch(e)}emailUserAccountAuthChallenge(e){return new Gv(this._request).fetch(e)}emojiCreate(e){return new $v(this._request).fetch(e)}emojiDelete(e){return new Kv(this._request).fetch(e)}eventCreate(e){return new Jv(this._request).fetch(e)}favoriteCreate(e){return new Zv(this._request).fetch(e)}favoriteDelete(e){return new Yv(this._request).fetch(e)}favoriteUpdate(e,i){return new Xv(this._request).fetch(e,i)}feedbackCreate(e){return new ec(this._request).fetch(e)}fileUpload(e,i,n,a){return new ic(this._request).fetch(e,i,n,a)}googleUserAccountAuth(e){return new nc(this._request).fetch(e)}imageUploadFromUrl(e){return new ac(this._request).fetch(e)}integrationDelete(e){return new tc(this._request).fetch(e)}integrationFigma(e,i){return new dc(this._request).fetch(e,i)}integrationGithubConnect(e){return new lc(this._request).fetch(e)}integrationGitlabConnect(e,i){return new oc(this._request).fetch(e,i)}integrationGoogleSheets(e){return new rc(this._request).fetch(e)}integrationResourceArchive(e){return new sc(this._request).fetch(e)}integrationSentryConnect(e,i,n){return new uc(this._request).fetch(e,i,n)}integrationSlack(e,i,n){return new mc(this._request).fetch(e,i,n)}integrationSlackImportEmojis(e,i){return new kc(this._request).fetch(e,i)}integrationSlackPersonal(e,i){return new vc(this._request).fetch(e,i)}integrationSlackPost(e,i,n,a){return new cc(this._request).fetch(e,i,n,a)}integrationSlackProjectPost(e,i,n){return new pc(this._request).fetch(e,i,n)}integrationZendesk(e,i,n,a){return new Nc(this._request).fetch(e,i,n,a)}issueArchive(e,i){return new hc(this._request).fetch(e,i)}issueCreate(e){return new fc(this._request).fetch(e)}issueDelete(e){return new bc(this._request).fetch(e)}issueImportCreateAsana(e,i,n,a){return new yc(this._request).fetch(e,i,n,a)}issueImportCreateClubhouse(e,i,n,a){return new Sc(this._request).fetch(e,i,n,a)}issueImportCreateGithub(e,i,n,a,t){return new gc(this._request).fetch(e,i,n,a,t)}issueImportCreateJira(e,i,n,a,t,d){return new Dc(this._request).fetch(e,i,n,a,t,d)}issueImportDelete(e){return new Vc(this._request).fetch(e)}issueImportProcess(e,i){return new Fc(this._request).fetch(e,i)}issueLabelArchive(e){return new Ac(this._request).fetch(e)}issueLabelCreate(e){return new _c(this._request).fetch(e)}issueLabelUpdate(e,i){return new Tc(this._request).fetch(e,i)}issueRelationCreate(e){return new Ic(this._request).fetch(e)}issueRelationDelete(e){return new wc(this._request).fetch(e)}issueRelationUpdate(e,i){return new qc(this._request).fetch(e,i)}issueUnarchive(e){return new xc(this._request).fetch(e)}issueUpdate(e,i){return new Cc(this._request).fetch(e,i)}joinOrganizationFromOnboarding(e){return new Oc(this._request).fetch(e)}leaveOrganization(e){return new Pc(this._request).fetch(e)}milestoneCreate(e){return new jc(this._request).fetch(e)}milestoneDelete(e){return new Uc(this._request).fetch(e)}milestoneUpdate(e,i){return new Bc(this._request).fetch(e,i)}notificationArchive(e){return new Ec(this._request).fetch(e)}notificationCreate(e,i){return new Rc(this._request).fetch(e,i)}notificationSubscriptionCreate(e){return new zc(this._request).fetch(e)}notificationSubscriptionDelete(e){return new Mc(this._request).fetch(e)}notificationUnarchive(e){return new Lc(this._request).fetch(e)}notificationUpdate(e,i){return new Wc(this._request).fetch(e,i)}oauthClientArchive(e){return new Qc(this._request).fetch(e)}oauthClientCreate(e){return new Hc(this._request).fetch(e)}oauthClientRotateSecret(e){return new Gc(this._request).fetch(e)}oauthClientUpdate(e,i){return new $c(this._request).fetch(e,i)}oauthTokenRevoke(e,i){return new Kc(this._request).fetch(e,i)}organizationDelete(e){return new Jc(this._request).fetch(e)}get organizationDeleteChallenge(){return new Zc(this._request).fetch()}organizationDomainCreate(e){return new Yc(this._request).fetch(e)}organizationDomainDelete(e){return new Xc(this._request).fetch(e)}organizationDomainVerify(e){return new ep(this._request).fetch(e)}organizationInviteCreate(e){return new ip(this._request).fetch(e)}organizationInviteDelete(e){return new np(this._request).fetch(e)}organizationUpdate(e){return new ap(this._request).fetch(e)}projectArchive(e){return new tp(this._request).fetch(e)}projectCreate(e){return new dp(this._request).fetch(e)}projectLinkCreate(e){return new lp(this._request).fetch(e)}projectLinkDelete(e){return new op(this._request).fetch(e)}projectUnarchive(e){return new rp(this._request).fetch(e)}projectUpdate(e,i){return new sp(this._request).fetch(e,i)}pushSubscriptionCreate(e){return new up(this._request).fetch(e)}pushSubscriptionDelete(e){return new mp(this._request).fetch(e)}reactionCreate(e){return new kp(this._request).fetch(e)}reactionDelete(e){return new vp(this._request).fetch(e)}refreshGoogleSheetsData(e){return new cp(this._request).fetch(e)}resentOrganizationInvite(e){return new pp(this._request).fetch(e)}samlTokenUserAccountAuth(e){return new Np(this._request).fetch(e)}subscriptionArchive(e){return new hp(this._request).fetch(e)}subscriptionSessionCreate(e){return new fp(this._request).fetch(e)}subscriptionUpdate(e,i){return new bp(this._request).fetch(e,i)}get subscriptionUpdateSessionCreate(){return new yp(this._request).fetch()}subscriptionUpgrade(e,i){return new Sp(this._request).fetch(e,i)}teamArchive(e){return new gp(this._request).fetch(e)}teamCreate(e,i){return new Dp(this._request).fetch(e,i)}teamDelete(e){return new Vp(this._request).fetch(e)}teamMembershipCreate(e){return new Fp(this._request).fetch(e)}teamMembershipDelete(e){return new Ap(this._request).fetch(e)}teamMembershipUpdate(e,i){return new _p(this._request).fetch(e,i)}teamUpdate(e,i){return new Tp(this._request).fetch(e,i)}templateCreate(e){return new Ip(this._request).fetch(e)}templateDelete(e){return new wp(this._request).fetch(e)}templateUpdate(e,i){return new qp(this._request).fetch(e,i)}userDemoteAdmin(e){return new xp(this._request).fetch(e)}userFlagUpdate(e,i){return new Cp(this._request).fetch(e,i)}userPromoteAdmin(e){return new Op(this._request).fetch(e)}userSettingsFlagIncrement(e){return new Pp(this._request).fetch(e)}get userSettingsFlagsReset(){return new jp(this._request).fetch()}userSettingsUpdate(e,i){return new Up(this._request).fetch(e,i)}get userSubscribeToNewsletter(){return new Bp(this._request).fetch()}userSuspend(e){return new Ep(this._request).fetch(e)}userUnsuspend(e){return new Rp(this._request).fetch(e)}userUpdate(e,i){return new zp(this._request).fetch(e,i)}viewPreferencesCreate(e){return new Mp(this._request).fetch(e)}viewPreferencesDelete(e){return new Lp(this._request).fetch(e)}viewPreferencesUpdate(e,i){return new Wp(this._request).fetch(e,i)}webhookCreate(e){return new Qp(this._request).fetch(e)}webhookDelete(e){return new Hp(this._request).fetch(e)}webhookUpdate(e,i){return new Gp(this._request).fetch(e,i)}workflowStateArchive(e){return new $p(this._request).fetch(e)}workflowStateCreate(e){return new Kp(this._request).fetch(e)}workflowStateUpdate(e,i){return new Jp(this._request).fetch(e,i)}}exports.ApiKey=bs,exports.ApiKeyConnection=ys,exports.ApiKeyCreateMutation=Sv,exports.ApiKeyDeleteMutation=gv,exports.ApiKeyPayload=Ss,exports.ApiKeysQuery=dk,exports.Application=class extends cs{constructor(e,i){var n,a,t,d,l,o;super(e),this.clientId=null!==(n=i.clientId)&&void 0!==n?n:void 0,this.description=null!==(a=i.description)&&void 0!==a?a:void 0,this.developer=null!==(t=i.developer)&&void 0!==t?t:void 0,this.developerUrl=null!==(d=i.developerUrl)&&void 0!==d?d:void 0,this.imageUrl=null!==(l=i.imageUrl)&&void 0!==l?l:void 0,this.name=null!==(o=i.name)&&void 0!==o?o:void 0}},exports.ApplicationWithAuthorizationQuery=lk,exports.ArchivePayload=gs,exports.ArchiveResponse=Ds,exports.ArchivedModelSyncQuery=ok,exports.ArchivedModelsSyncQuery=rk,exports.Attachment=Vs,exports.AttachmentArchiveMutation=Dv,exports.AttachmentConnection=Fs,exports.AttachmentCreateMutation=Vv,exports.AttachmentDeleteMutation=Fv,exports.AttachmentIssueQuery=uk,exports.AttachmentIssue_AttachmentsQuery=class extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(It,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.attachmentIssue)||void 0===n?void 0:n.attachments;return a?new Fs(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}},exports.AttachmentIssue_ChildrenQuery=class extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(wt,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.attachmentIssue)||void 0===n?void 0:n.children;return a?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}},exports.AttachmentIssue_CommentsQuery=class extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(qt,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.attachmentIssue)||void 0===n?void 0:n.comments;return a?new Os(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}},exports.AttachmentIssue_HistoryQuery=class extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(xt,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.attachmentIssue)||void 0===n?void 0:n.history;return a?new Vu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}},exports.AttachmentIssue_InverseRelationsQuery=class extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ct,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.attachmentIssue)||void 0===n?void 0:n.inverseRelations;return a?new Ou(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}},exports.AttachmentIssue_LabelsQuery=class extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Ot,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.attachmentIssue)||void 0===n?void 0:n.labels;return a?new Iu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}},exports.AttachmentIssue_RelationsQuery=class extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Pt,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.attachmentIssue)||void 0===n?void 0:n.relations;return a?new Ou(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}},exports.AttachmentIssue_SubscribersQuery=class extends cs{constructor(e,i,n){super(e),this._id=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(jt,Object.assign(Object.assign({id:this._id},this._variables),e)).then((i=>{var n;const a=null===(n=null==i?void 0:i.attachmentIssue)||void 0===n?void 0:n.subscribers;return a?new Lm(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}},exports.AttachmentLinkZendeskMutation=Av,exports.AttachmentPayload=As,exports.AttachmentQuery=sk,exports.AttachmentUpdateMutation=_v,exports.AttachmentsQuery=mk,exports.AuthResolverResponse=_s,exports.AuthenticationLinearError=S,exports.AuthorizedApplication=Ts,exports.AuthorizedApplicationsQuery=kk,exports.AvailableUsersQuery=vk,exports.BillingDetailsPayload=Is,exports.BillingDetailsQuery=ck,exports.BillingDetails_PaymentMethodQuery=class extends cs{constructor(e){super(e)}fetch(){return m(this,void 0,void 0,(function*(){return this._request(zt,{}).then((e=>{var i;const n=null===(i=null==e?void 0:e.billingDetails)||void 0===i?void 0:i.paymentMethod;return n?new qs(this._request,n):void 0}))}))}},exports.BillingEmailPayload=ws,exports.BillingEmailUpdateMutation=Tv,exports.BootstrapLinearError=D,exports.Card=qs,exports.CollaborationDocumentUpdatePayload=xs,exports.CollaborativeDocumentJoinQuery=pk,exports.CollaborativeDocumentJoin_StepsQuery=class extends cs{constructor(e,i,n,a){super(e),this._clientId=i,this._issueId=n,this._version=a}fetch(){return m(this,void 0,void 0,(function*(){return this._request(Lt,{clientId:this._clientId,issueId:this._issueId,version:this._version}).then((e=>{var i;const n=null===(i=null==e?void 0:e.collaborativeDocumentJoin)||void 0===i?void 0:i.steps;return n?new Dm(this._request,n):void 0}))}))}},exports.CollaborativeDocumentUpdateMutation=Iv,exports.Comment=Cs,exports.CommentConnection=Os,exports.CommentCreateMutation=wv,exports.CommentDeleteMutation=qv,exports.CommentPayload=Ps,exports.CommentQuery=Nk,exports.CommentUpdateMutation=xv,exports.CommentsQuery=hk,exports.CommitPayload=js,exports.Connection=Ns,exports.ContactCreateMutation=Cv,exports.ContactPayload=Us,exports.CreateCsvExportReportMutation=Ov,exports.CreateCsvExportReportPayload=Bs,exports.CreateOrJoinOrganizationResponse=Es,exports.CreateOrganizationFromOnboardingMutation=Pv,exports.CustomView=Rs,exports.CustomViewConnection=zs,exports.CustomViewCreateMutation=jv,exports.CustomViewDeleteMutation=Uv,exports.CustomViewPayload=Ms,exports.CustomViewQuery=fk,exports.CustomViewUpdateMutation=Bv,exports.CustomViewsQuery=bk,exports.Cycle=Ls,exports.CycleArchiveMutation=Ev,exports.CycleConnection=Ws,exports.CycleCreateMutation=Rv,exports.CyclePayload=Qs,exports.CycleQuery=yk,exports.CycleUpdateMutation=zv,exports.Cycle_IssuesQuery=Zp,exports.Cycle_UncompletedIssuesUponCloseQuery=Yp,exports.CyclesQuery=Sk,exports.DebugCreateSamlOrgMutation=Mv,exports.DebugFailWithInternalErrorMutation=Lv,exports.DebugFailWithWarningMutation=Wv,exports.DebugPayload=Hs,exports.DependencyResponse=Gs,exports.DependentModelSyncQuery=gk,exports.DocumentStep=class extends cs{constructor(e,i){var n,a,t,d,l,o,r;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.clientId=null!==(a=i.clientId)&&void 0!==a?a:void 0,this.createdAt=null!==(t=hs(i.createdAt))&&void 0!==t?t:void 0,this.id=null!==(d=i.id)&&void 0!==d?d:void 0,this.step=null!==(l=fs(i.step))&&void 0!==l?l:void 0,this.updatedAt=null!==(o=hs(i.updatedAt))&&void 0!==o?o:void 0,this.version=null!==(r=i.version)&&void 0!==r?r:void 0}},exports.EmailTokenUserAccountAuthMutation=Qv,exports.EmailUnsubscribeMutation=Hv,exports.EmailUnsubscribePayload=$s,exports.EmailUserAccountAuthChallengeMutation=Gv,exports.EmailUserAccountAuthChallengeResponse=Ks,exports.Emoji=Js,exports.EmojiConnection=Zs,exports.EmojiCreateMutation=$v,exports.EmojiDeleteMutation=Kv,exports.EmojiPayload=Ys,exports.EmojiQuery=Dk,exports.EmojisQuery=Vk,exports.EventCreateMutation=Jv,exports.EventPayload=Xs,exports.Favorite=eu,exports.FavoriteConnection=iu,exports.FavoriteCreateMutation=Zv,exports.FavoriteDeleteMutation=Yv,exports.FavoritePayload=nu,exports.FavoriteQuery=Fk,exports.FavoriteUpdateMutation=Xv,exports.FavoritesQuery=Ak,exports.FeatureNotAccessibleLinearError=h,exports.FeedbackCreateMutation=ec,exports.FeedbackPayload=au,exports.FigmaEmbed=tu,exports.FigmaEmbedInfoQuery=_k,exports.FigmaEmbedInfo_FigmaEmbedQuery=class extends cs{constructor(e,i,n){super(e),this._fileId=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(td,Object.assign(Object.assign({fileId:this._fileId},this._variables),e)).then((e=>{var i;const n=null===(i=null==e?void 0:e.figmaEmbedInfo)||void 0===i?void 0:i.figmaEmbed;return n?new tu(this._request,n):void 0}))}))}},exports.FigmaEmbedPayload=du,exports.FileUpload=class extends cs{constructor(e,i){var n,a,t,d,l,o,r;super(e),this.assetUrl=null!==(n=i.assetUrl)&&void 0!==n?n:void 0,this.contentType=null!==(a=i.contentType)&&void 0!==a?a:void 0,this.filename=null!==(t=i.filename)&&void 0!==t?t:void 0,this.id=null!==(d=i.id)&&void 0!==d?d:void 0,this.metaData=null!==(l=fs(i.metaData))&&void 0!==l?l:void 0,this.size=null!==(o=i.size)&&void 0!==o?o:void 0,this._creator=null!==(r=i.creator)&&void 0!==r?r:void 0}get creator(){var e,i;return(null===(e=this._creator)||void 0===e?void 0:e.id)?new vv(this._request).fetch(null===(i=this._creator)||void 0===i?void 0:i.id):void 0}get organization(){return new Gk(this._request).fetch()}},exports.FileUploadMutation=ic,exports.ForbiddenLinearError=g,exports.GithubOAuthTokenPayload=lu,exports.GithubOrg=ou,exports.GithubRepo=ru,exports.GoogleSheetsSettings=su,exports.GoogleUserAccountAuthMutation=nc,exports.GraphQLClientError=Ti,exports.GraphqlLinearError=T,exports.ImageUploadFromUrlMutation=ac,exports.ImageUploadFromUrlPayload=uu,exports.Integration=mu,exports.IntegrationConnection=ku,exports.IntegrationDeleteMutation=tc,exports.IntegrationFigmaMutation=dc,exports.IntegrationGithubConnectMutation=lc,exports.IntegrationGitlabConnectMutation=oc,exports.IntegrationGoogleSheetsMutation=rc,exports.IntegrationPayload=vu,exports.IntegrationQuery=Tk,exports.IntegrationResource=cu,exports.IntegrationResourceArchiveMutation=sc,exports.IntegrationResourceConnection=class extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new cu(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}},exports.IntegrationResourceData=pu,exports.IntegrationSentryConnectMutation=uc,exports.IntegrationSettings=class extends cs{constructor(e,i){super(e),this.googleSheets=i.googleSheets?new su(e,i.googleSheets):void 0,this.sentry=i.sentry?new ym(e,i.sentry):void 0,this.slackPost=i.slackPost?new Sm(e,i.slackPost):void 0,this.slackProjectPost=i.slackProjectPost?new Sm(e,i.slackProjectPost):void 0,this.zendesk=i.zendesk?new tk(e,i.zendesk):void 0}},exports.IntegrationSlackImportEmojisMutation=kc,exports.IntegrationSlackMutation=mc,exports.IntegrationSlackPersonalMutation=vc,exports.IntegrationSlackPostMutation=cc,exports.IntegrationSlackProjectPostMutation=pc,exports.IntegrationZendeskMutation=Nc,exports.IntegrationsQuery=Ik,exports.InternalLinearError=F,exports.InvalidInputLinearError=f,exports.InviteData=Nu,exports.InviteInfoQuery=wk,exports.InviteInfo_InviteDataQuery=class extends cs{constructor(e,i,n){super(e),this._userHash=i,this._variables=n}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(rd,Object.assign(Object.assign({userHash:this._userHash},this._variables),e)).then((e=>{var i;const n=null===(i=null==e?void 0:e.inviteInfo)||void 0===i?void 0:i.inviteData;return n?new Nu(this._request,n):void 0}))}))}},exports.InvitePagePayload=hu,exports.Invoice=fu,exports.Issue=bu,exports.IssueArchiveMutation=hc,exports.IssueConnection=yu,exports.IssueCreateMutation=fc,exports.IssueDeleteMutation=bc,exports.IssueDescriptionHistory=Su,exports.IssueDescriptionHistoryPayload=gu,exports.IssueDescriptionHistoryQuery=xk,exports.IssueHistory=Du,exports.IssueHistoryConnection=Vu,exports.IssueImport=Fu,exports.IssueImportCreateAsanaMutation=yc,exports.IssueImportCreateClubhouseMutation=Sc,exports.IssueImportCreateGithubMutation=gc,exports.IssueImportCreateJiraMutation=Dc,exports.IssueImportDeleteMutation=Vc,exports.IssueImportDeletePayload=Au,exports.IssueImportFinishGithubOAuthQuery=Ck,exports.IssueImportPayload=_u,exports.IssueImportProcessMutation=Fc,exports.IssueLabel=Tu,exports.IssueLabelArchiveMutation=Ac,exports.IssueLabelConnection=Iu,exports.IssueLabelCreateMutation=_c,exports.IssueLabelPayload=wu,exports.IssueLabelQuery=Ok,exports.IssueLabelUpdateMutation=Tc,exports.IssueLabel_IssuesQuery=oN,exports.IssueLabelsQuery=Pk,exports.IssuePayload=qu,exports.IssuePriorityValue=xu,exports.IssuePriorityValuesQuery=jk,exports.IssueQuery=qk,exports.IssueRelation=Cu,exports.IssueRelationConnection=Ou,exports.IssueRelationCreateMutation=Ic,exports.IssueRelationDeleteMutation=wc,exports.IssueRelationHistoryPayload=Pu,exports.IssueRelationPayload=ju,exports.IssueRelationQuery=Uk,exports.IssueRelationUpdateMutation=qc,exports.IssueRelationsQuery=Bk,exports.IssueSearchQuery=Ek,exports.IssueUnarchiveMutation=xc,exports.IssueUpdateMutation=Cc,exports.Issue_AttachmentsQuery=Xp,exports.Issue_ChildrenQuery=eN,exports.Issue_CommentsQuery=iN,exports.Issue_HistoryQuery=nN,exports.Issue_InverseRelationsQuery=aN,exports.Issue_LabelsQuery=tN,exports.Issue_RelationsQuery=dN,exports.Issue_SubscribersQuery=lN,exports.IssuesQuery=Rk,exports.JoinOrganizationFromOnboardingMutation=Oc,exports.LeaveOrganizationMutation=Pc,exports.LinearClient=class extends xN{constructor(e){const i=function(e){var i,n,a,{apiKey:t,accessToken:d,apiUrl:l,headers:o}=e,r=u(e,["apiKey","accessToken","apiUrl","headers"]);if(!d&&!t)throw new Error("No accessToken or apiKey provided to the LinearClient - create one here: https://linear.app/settings/api");return Object.assign({headers:Object.assign(Object.assign({Authorization:d?d.startsWith("Bearer ")?d:`Bearer ${d}`:null!=t?t:""},o),{"User-Agent":(a={[null!==(i=process.env.npm_package_name)&&void 0!==i?i:"@linear/sdk"]:null!==(n=process.env.npm_package_version)&&void 0!==n?n:"unknown"},Object.entries(a).reduce(((e,[i,n])=>{const a=`${i}@${encodeURIComponent(n)}`;return e?`${e} ${a}`:a}),""))}),apiUrl:null!=l?l:"https://api.linear.app/graphql"},r)}(e),n=new Ii(i.apiUrl,i);super(((e,i)=>this.client.request(e,i).catch((e=>{throw q(e)})))),this.options=i,this.client=n}},exports.LinearConnection=ps,exports.LinearDocument=vs,exports.LinearError=N,exports.LinearGraphQLClient=Ii,exports.LinearGraphQLError=p,exports.LinearSdk=xN,exports.LockTimeoutLinearError=I,exports.Milestone=Uu,exports.MilestoneConnection=Bu,exports.MilestoneCreateMutation=jc,exports.MilestoneDeleteMutation=Uc,exports.MilestonePayload=Eu,exports.MilestoneQuery=zk,exports.MilestoneUpdateMutation=Bc,exports.Milestone_ProjectsQuery=rN,exports.MilestonesQuery=Mk,exports.NetworkLinearError=y,exports.Notification=Ru,exports.NotificationArchiveMutation=Ec,exports.NotificationConnection=zu,exports.NotificationCreateMutation=Rc,exports.NotificationPayload=Mu,exports.NotificationQuery=Lk,exports.NotificationSubscription=Lu,exports.NotificationSubscriptionConnection=Wu,exports.NotificationSubscriptionCreateMutation=zc,exports.NotificationSubscriptionDeleteMutation=Mc,exports.NotificationSubscriptionPayload=Qu,exports.NotificationSubscriptionQuery=Wk,exports.NotificationSubscriptionsQuery=Qk,exports.NotificationUnarchiveMutation=Lc,exports.NotificationUpdateMutation=Wc,exports.NotificationsQuery=Hk,exports.OauthClient=Hu,exports.OauthClientArchiveMutation=Qc,exports.OauthClientCreateMutation=Hc,exports.OauthClientPayload=Gu,exports.OauthClientRotateSecretMutation=Gc,exports.OauthClientUpdateMutation=$c,exports.OauthTokenRevokeMutation=Kc,exports.OauthTokenRevokePayload=$u,exports.Organization=Ku,exports.OrganizationDeleteChallengeMutation=Zc,exports.OrganizationDeleteMutation=Jc,exports.OrganizationDeletePayload=Ju,exports.OrganizationDomain=Zu,exports.OrganizationDomainCreateMutation=Yc,exports.OrganizationDomainDeleteMutation=Xc,exports.OrganizationDomainPayload=Yu,exports.OrganizationDomainSimplePayload=class extends cs{constructor(e,i){var n;super(e),this.success=null!==(n=i.success)&&void 0!==n?n:void 0}},exports.OrganizationDomainVerifyMutation=ep,exports.OrganizationExistsPayload=Xu,exports.OrganizationExistsQuery=$k,exports.OrganizationInvite=em,exports.OrganizationInviteConnection=im,exports.OrganizationInviteCreateMutation=ip,exports.OrganizationInviteDeleteMutation=np,exports.OrganizationInvitePayload=nm,exports.OrganizationInviteQuery=Kk,exports.OrganizationInvite_IssuesQuery=vN,exports.OrganizationInvitesQuery=Jk,exports.OrganizationPayload=am,exports.OrganizationQuery=Gk,exports.OrganizationUpdateMutation=ap,exports.Organization_IntegrationsQuery=sN,exports.Organization_MilestonesQuery=uN,exports.Organization_TeamsQuery=mN,exports.Organization_UsersQuery=kN,exports.OtherLinearError=A,exports.PageInfo=tm,exports.Project=dm,exports.ProjectArchiveMutation=tp,exports.ProjectConnection=lm,exports.ProjectCreateMutation=dp,exports.ProjectLink=om,exports.ProjectLinkConnection=rm,exports.ProjectLinkCreateMutation=lp,exports.ProjectLinkDeleteMutation=op,exports.ProjectLinkPayload=sm,exports.ProjectLinkQuery=Yk,exports.ProjectLinksQuery=Xk,exports.ProjectPayload=um,exports.ProjectQuery=Zk,exports.ProjectUnarchiveMutation=rp,exports.ProjectUpdateMutation=sp,exports.Project_IssuesQuery=cN,exports.Project_LinksQuery=pN,exports.Project_MembersQuery=NN,exports.Project_TeamsQuery=hN,exports.ProjectsQuery=ev,exports.PullRequestPayload=mm,exports.PushSubscription=km,exports.PushSubscriptionConnection=class extends Ns{constructor(e,i,n){super(e,i,(null==n?void 0:n.nodes)?n.nodes.map((i=>new km(e,i))):void 0,(null==n?void 0:n.pageInfo)?new tm(e,n.pageInfo):void 0)}},exports.PushSubscriptionCreateMutation=up,exports.PushSubscriptionDeleteMutation=mp,exports.PushSubscriptionPayload=vm,exports.PushSubscriptionTestPayload=cm,exports.PushSubscriptionTestQuery=iv,exports.RatelimitedLinearError=b,exports.Reaction=pm,exports.ReactionConnection=Nm,exports.ReactionCreateMutation=kp,exports.ReactionDeleteMutation=vp,exports.ReactionPayload=hm,exports.ReactionQuery=nv,exports.ReactionsQuery=av,exports.RefreshGoogleSheetsDataMutation=cp,exports.Request=cs,exports.ResentOrganizationInviteMutation=pp,exports.RotateSecretPayload=fm,exports.SamlConfiguration=class extends cs{constructor(e,i){var n,a,t,d,l;super(e),this.allowedDomains=null!==(n=i.allowedDomains)&&void 0!==n?n:void 0,this.ssoBinding=null!==(a=i.ssoBinding)&&void 0!==a?a:void 0,this.ssoEndpoint=null!==(t=i.ssoEndpoint)&&void 0!==t?t:void 0,this.ssoSignAlgo=null!==(d=i.ssoSignAlgo)&&void 0!==d?d:void 0,this.ssoSigningCert=null!==(l=i.ssoSigningCert)&&void 0!==l?l:void 0}},exports.SamlTokenUserAccountAuthMutation=Np,exports.SentryIssuePayload=bm,exports.SentrySettings=ym,exports.SlackPostSettings=Sm,exports.SsoUrlFromEmailQuery=tv,exports.SsoUrlFromEmailResponse=gm,exports.StepsResponse=Dm,exports.Subscription=Vm,exports.SubscriptionArchiveMutation=hp,exports.SubscriptionPayload=Fm,exports.SubscriptionQuery=dv,exports.SubscriptionSessionCreateMutation=fp,exports.SubscriptionSessionPayload=Am,exports.SubscriptionUpdateMutation=bp,exports.SubscriptionUpdateSessionCreateMutation=yp,exports.SubscriptionUpgradeMutation=Sp,exports.SyncBootstrapQuery=lv,exports.SyncResponse=_m,exports.SynchronizedPayload=class extends cs{constructor(e,i){var n;super(e),this.lastSyncId=null!==(n=i.lastSyncId)&&void 0!==n?n:void 0}},exports.Team=Tm,exports.TeamArchiveMutation=gp,exports.TeamConnection=Im,exports.TeamCreateMutation=Dp,exports.TeamDeleteMutation=Vp,exports.TeamMembership=wm,exports.TeamMembershipConnection=qm,exports.TeamMembershipCreateMutation=Fp,exports.TeamMembershipDeleteMutation=Ap,exports.TeamMembershipPayload=xm,exports.TeamMembershipQuery=rv,exports.TeamMembershipUpdateMutation=_p,exports.TeamMembershipsQuery=sv,exports.TeamPayload=Cm,exports.TeamQuery=ov,exports.TeamUpdateMutation=Tp,exports.Team_CyclesQuery=fN,exports.Team_IssuesQuery=bN,exports.Team_LabelsQuery=yN,exports.Team_MembersQuery=SN,exports.Team_MembershipsQuery=gN,exports.Team_ProjectsQuery=DN,exports.Team_StatesQuery=VN,exports.Team_TemplatesQuery=FN,exports.Team_WebhooksQuery=AN,exports.TeamsQuery=uv,exports.Template=Om,exports.TemplateConnection=Pm,exports.TemplateCreateMutation=Ip,exports.TemplateDeleteMutation=wp,exports.TemplatePayload=jm,exports.TemplateQuery=mv,exports.TemplateUpdateMutation=qp,exports.TemplatesQuery=kv,exports.UnknownLinearError=V,exports.UploadFile=Um,exports.UploadFileHeader=Bm,exports.UploadPayload=Em,exports.User=Rm,exports.UserAccount=class extends cs{constructor(e,i){var n,a,t,d,l,o,r;super(e),this.archivedAt=null!==(n=hs(i.archivedAt))&&void 0!==n?n:void 0,this.createdAt=null!==(a=hs(i.createdAt))&&void 0!==a?a:void 0,this.email=null!==(t=i.email)&&void 0!==t?t:void 0,this.id=null!==(d=i.id)&&void 0!==d?d:void 0,this.name=null!==(l=i.name)&&void 0!==l?l:void 0,this.service=null!==(o=i.service)&&void 0!==o?o:void 0,this.updatedAt=null!==(r=hs(i.updatedAt))&&void 0!==r?r:void 0,this.users=i.users?i.users.map((i=>new Rm(e,i))):void 0}},exports.UserAdminPayload=zm,exports.UserAuthorizedApplication=Mm,exports.UserConnection=Lm,exports.UserDemoteAdminMutation=xp,exports.UserFlagUpdateMutation=Cp,exports.UserLinearError=_,exports.UserPayload=Wm,exports.UserPromoteAdminMutation=Op,exports.UserQuery=vv,exports.UserSettings=Qm,exports.UserSettingsFlagIncrementMutation=Pp,exports.UserSettingsFlagPayload=Hm,exports.UserSettingsFlagsResetMutation=jp,exports.UserSettingsFlagsResetPayload=Gm,exports.UserSettingsPayload=$m,exports.UserSettingsQuery=cv,exports.UserSettingsUpdateMutation=Up,exports.UserSubscribeToNewsletterMutation=Bp,exports.UserSubscribeToNewsletterPayload=Km,exports.UserSuspendMutation=Ep,exports.UserUnsuspendMutation=Rp,exports.UserUpdateMutation=zp,exports.User_AssignedIssuesQuery=_N,exports.User_CreatedIssuesQuery=TN,exports.User_TeamMembershipsQuery=IN,exports.User_TeamsQuery=wN,exports.UsersQuery=pv,exports.ViewPreferences=Jm,exports.ViewPreferencesCreateMutation=Mp,exports.ViewPreferencesDeleteMutation=Lp,exports.ViewPreferencesPayload=Zm,exports.ViewPreferencesUpdateMutation=Wp,exports.ViewerQuery=Nv,exports.Viewer_AssignedIssuesQuery=class extends cs{constructor(e,i){super(e),this._variables=i}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(_l,e).then((i=>{var n;const a=null===(n=null==i?void 0:i.viewer)||void 0===n?void 0:n.assignedIssues;return a?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}},exports.Viewer_CreatedIssuesQuery=class extends cs{constructor(e,i){super(e),this._variables=i}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Tl,e).then((i=>{var n;const a=null===(n=null==i?void 0:i.viewer)||void 0===n?void 0:n.createdIssues;return a?new yu(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}},exports.Viewer_TeamMembershipsQuery=class extends cs{constructor(e,i){super(e),this._variables=i}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(Il,e).then((i=>{var n;const a=null===(n=null==i?void 0:i.viewer)||void 0===n?void 0:n.teamMemberships;return a?new qm(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}},exports.Viewer_TeamsQuery=class extends cs{constructor(e,i){super(e),this._variables=i}fetch(e){return m(this,void 0,void 0,(function*(){return this._request(wl,e).then((i=>{var n;const a=null===(n=null==i?void 0:i.viewer)||void 0===n?void 0:n.teams;return a?new Im(this._request,(i=>this.fetch(Object.assign(Object.assign(Object.assign({},this._variables),e),i))),a):void 0}))}))}},exports.Webhook=Ym,exports.WebhookConnection=Xm,exports.WebhookCreateMutation=Qp,exports.WebhookDeleteMutation=Hp,exports.WebhookPayload=ek,exports.WebhookQuery=hv,exports.WebhookUpdateMutation=Gp,exports.WebhooksQuery=fv,exports.WorkflowState=ik,exports.WorkflowStateArchiveMutation=$p,exports.WorkflowStateConnection=nk,exports.WorkflowStateCreateMutation=Kp,exports.WorkflowStatePayload=ak,exports.WorkflowStateQuery=bv,exports.WorkflowStateUpdateMutation=Jp,exports.WorkflowState_IssuesQuery=qN,exports.WorkflowStatesQuery=yv,exports.ZendeskSettings=tk,exports.parseLinearError=q;
//# sourceMappingURL=index-cjs.min.js.map


/***/ }),

/***/ 774:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(789)):0}(this,(function(e){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n.r(t),n.d(t,"loadFront",(function(){return f})),n.d(t,"safeLoadFront",(function(){return i}));var r=n(1);function u(e,t,n){var u,f=t&&"string"==typeof t?t:t&&t.contentKeyName?t.contentKeyName:"__content",i=t&&"object"===o(t)?t:void 0,c=/^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/.exec(e),l={};return(u=c[2])&&(l="{"===u.charAt(0)?JSON.parse(u):n?r.safeLoad(u,i):r.load(u,i)),l[f]=c[3]||"",l}function f(e,t){return u(e,t,!1)}function i(e,t){return u(e,t,!0)}},function(t,n){t.exports=e}])}));

/***/ }),

/***/ 789:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



var yaml = __webpack_require__(660);


module.exports = yaml;


/***/ }),

/***/ 660:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



var loader = __webpack_require__(414);
var dumper = __webpack_require__(150);


function deprecated(name) {
  return function () {
    throw new Error('Function ' + name + ' is deprecated and cannot be used.');
  };
}


module.exports.Type = __webpack_require__(930);
module.exports.Schema = __webpack_require__(491);
module.exports.FAILSAFE_SCHEMA = __webpack_require__(35);
module.exports.JSON_SCHEMA = __webpack_require__(148);
module.exports.CORE_SCHEMA = __webpack_require__(29);
module.exports.DEFAULT_SAFE_SCHEMA = __webpack_require__(468);
module.exports.DEFAULT_FULL_SCHEMA = __webpack_require__(83);
module.exports.load                = loader.load;
module.exports.loadAll             = loader.loadAll;
module.exports.safeLoad            = loader.safeLoad;
module.exports.safeLoadAll         = loader.safeLoadAll;
module.exports.dump                = dumper.dump;
module.exports.safeDump            = dumper.safeDump;
module.exports.YAMLException = __webpack_require__(778);

// Deprecated schema names from JS-YAML 2.0.x
module.exports.MINIMAL_SCHEMA = __webpack_require__(35);
module.exports.SAFE_SCHEMA = __webpack_require__(468);
module.exports.DEFAULT_SCHEMA = __webpack_require__(83);

// Deprecated functions from JS-YAML 1.x.x
module.exports.scan           = deprecated('scan');
module.exports.parse          = deprecated('parse');
module.exports.compose        = deprecated('compose');
module.exports.addConstructor = deprecated('addConstructor');


/***/ }),

/***/ 537:
/***/ ((module) => {

"use strict";



function isNothing(subject) {
  return (typeof subject === 'undefined') || (subject === null);
}


function isObject(subject) {
  return (typeof subject === 'object') && (subject !== null);
}


function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];

  return [ sequence ];
}


function extend(target, source) {
  var index, length, key, sourceKeys;

  if (source) {
    sourceKeys = Object.keys(source);

    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }

  return target;
}


function repeat(string, count) {
  var result = '', cycle;

  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }

  return result;
}


function isNegativeZero(number) {
  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
}


module.exports.isNothing      = isNothing;
module.exports.isObject       = isObject;
module.exports.toArray        = toArray;
module.exports.repeat         = repeat;
module.exports.isNegativeZero = isNegativeZero;
module.exports.extend         = extend;


/***/ }),

/***/ 150:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*eslint-disable no-use-before-define*/

var common              = __webpack_require__(537);
var YAMLException       = __webpack_require__(778);
var DEFAULT_FULL_SCHEMA = __webpack_require__(83);
var DEFAULT_SAFE_SCHEMA = __webpack_require__(468);

var _toString       = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;

var CHAR_TAB                  = 0x09; /* Tab */
var CHAR_LINE_FEED            = 0x0A; /* LF */
var CHAR_CARRIAGE_RETURN      = 0x0D; /* CR */
var CHAR_SPACE                = 0x20; /* Space */
var CHAR_EXCLAMATION          = 0x21; /* ! */
var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
var CHAR_SHARP                = 0x23; /* # */
var CHAR_PERCENT              = 0x25; /* % */
var CHAR_AMPERSAND            = 0x26; /* & */
var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
var CHAR_ASTERISK             = 0x2A; /* * */
var CHAR_COMMA                = 0x2C; /* , */
var CHAR_MINUS                = 0x2D; /* - */
var CHAR_COLON                = 0x3A; /* : */
var CHAR_EQUALS               = 0x3D; /* = */
var CHAR_GREATER_THAN         = 0x3E; /* > */
var CHAR_QUESTION             = 0x3F; /* ? */
var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
var CHAR_VERTICAL_LINE        = 0x7C; /* | */
var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */

var ESCAPE_SEQUENCES = {};

ESCAPE_SEQUENCES[0x00]   = '\\0';
ESCAPE_SEQUENCES[0x07]   = '\\a';
ESCAPE_SEQUENCES[0x08]   = '\\b';
ESCAPE_SEQUENCES[0x09]   = '\\t';
ESCAPE_SEQUENCES[0x0A]   = '\\n';
ESCAPE_SEQUENCES[0x0B]   = '\\v';
ESCAPE_SEQUENCES[0x0C]   = '\\f';
ESCAPE_SEQUENCES[0x0D]   = '\\r';
ESCAPE_SEQUENCES[0x1B]   = '\\e';
ESCAPE_SEQUENCES[0x22]   = '\\"';
ESCAPE_SEQUENCES[0x5C]   = '\\\\';
ESCAPE_SEQUENCES[0x85]   = '\\N';
ESCAPE_SEQUENCES[0xA0]   = '\\_';
ESCAPE_SEQUENCES[0x2028] = '\\L';
ESCAPE_SEQUENCES[0x2029] = '\\P';

var DEPRECATED_BOOLEANS_SYNTAX = [
  'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
  'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
];

function compileStyleMap(schema, map) {
  var result, keys, index, length, tag, style, type;

  if (map === null) return {};

  result = {};
  keys = Object.keys(map);

  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map[tag]);

    if (tag.slice(0, 2) === '!!') {
      tag = 'tag:yaml.org,2002:' + tag.slice(2);
    }
    type = schema.compiledTypeMap['fallback'][tag];

    if (type && _hasOwnProperty.call(type.styleAliases, style)) {
      style = type.styleAliases[style];
    }

    result[tag] = style;
  }

  return result;
}

function encodeHex(character) {
  var string, handle, length;

  string = character.toString(16).toUpperCase();

  if (character <= 0xFF) {
    handle = 'x';
    length = 2;
  } else if (character <= 0xFFFF) {
    handle = 'u';
    length = 4;
  } else if (character <= 0xFFFFFFFF) {
    handle = 'U';
    length = 8;
  } else {
    throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
  }

  return '\\' + handle + common.repeat('0', length - string.length) + string;
}

function State(options) {
  this.schema        = options['schema'] || DEFAULT_FULL_SCHEMA;
  this.indent        = Math.max(1, (options['indent'] || 2));
  this.noArrayIndent = options['noArrayIndent'] || false;
  this.skipInvalid   = options['skipInvalid'] || false;
  this.flowLevel     = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
  this.styleMap      = compileStyleMap(this.schema, options['styles'] || null);
  this.sortKeys      = options['sortKeys'] || false;
  this.lineWidth     = options['lineWidth'] || 80;
  this.noRefs        = options['noRefs'] || false;
  this.noCompatMode  = options['noCompatMode'] || false;
  this.condenseFlow  = options['condenseFlow'] || false;

  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;

  this.tag = null;
  this.result = '';

  this.duplicates = [];
  this.usedDuplicates = null;
}

// Indents every line in a string. Empty lines (\n only) are not indented.
function indentString(string, spaces) {
  var ind = common.repeat(' ', spaces),
      position = 0,
      next = -1,
      result = '',
      line,
      length = string.length;

  while (position < length) {
    next = string.indexOf('\n', position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }

    if (line.length && line !== '\n') result += ind;

    result += line;
  }

  return result;
}

function generateNextLine(state, level) {
  return '\n' + common.repeat(' ', state.indent * level);
}

function testImplicitResolving(state, str) {
  var index, length, type;

  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type = state.implicitTypes[index];

    if (type.resolve(str)) {
      return true;
    }
  }

  return false;
}

// [33] s-white ::= s-space | s-tab
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}

// Returns true if the character can be printed without escaping.
// From YAML 1.2: "any allowed characters known to be non-printable
// should also be escaped. [However,] This isn’t mandatory"
// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
function isPrintable(c) {
  return  (0x00020 <= c && c <= 0x00007E)
      || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
      || ((0x0E000 <= c && c <= 0x00FFFD) && c !== 0xFEFF /* BOM */)
      ||  (0x10000 <= c && c <= 0x10FFFF);
}

// [34] ns-char ::= nb-char - s-white
// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
// [26] b-char  ::= b-line-feed | b-carriage-return
// [24] b-line-feed       ::=     #xA    /* LF */
// [25] b-carriage-return ::=     #xD    /* CR */
// [3]  c-byte-order-mark ::=     #xFEFF
function isNsChar(c) {
  return isPrintable(c) && !isWhitespace(c)
    // byte-order-mark
    && c !== 0xFEFF
    // b-char
    && c !== CHAR_CARRIAGE_RETURN
    && c !== CHAR_LINE_FEED;
}

// Simplified test for values allowed after the first character in plain style.
function isPlainSafe(c, prev) {
  // Uses a subset of nb-char - c-flow-indicator - ":" - "#"
  // where nb-char ::= c-printable - b-char - c-byte-order-mark.
  return isPrintable(c) && c !== 0xFEFF
    // - c-flow-indicator
    && c !== CHAR_COMMA
    && c !== CHAR_LEFT_SQUARE_BRACKET
    && c !== CHAR_RIGHT_SQUARE_BRACKET
    && c !== CHAR_LEFT_CURLY_BRACKET
    && c !== CHAR_RIGHT_CURLY_BRACKET
    // - ":" - "#"
    // /* An ns-char preceding */ "#"
    && c !== CHAR_COLON
    && ((c !== CHAR_SHARP) || (prev && isNsChar(prev)));
}

// Simplified test for values allowed as the first character in plain style.
function isPlainSafeFirst(c) {
  // Uses a subset of ns-char - c-indicator
  // where ns-char = nb-char - s-white.
  return isPrintable(c) && c !== 0xFEFF
    && !isWhitespace(c) // - s-white
    // - (c-indicator ::=
    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
    && c !== CHAR_MINUS
    && c !== CHAR_QUESTION
    && c !== CHAR_COLON
    && c !== CHAR_COMMA
    && c !== CHAR_LEFT_SQUARE_BRACKET
    && c !== CHAR_RIGHT_SQUARE_BRACKET
    && c !== CHAR_LEFT_CURLY_BRACKET
    && c !== CHAR_RIGHT_CURLY_BRACKET
    // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
    && c !== CHAR_SHARP
    && c !== CHAR_AMPERSAND
    && c !== CHAR_ASTERISK
    && c !== CHAR_EXCLAMATION
    && c !== CHAR_VERTICAL_LINE
    && c !== CHAR_EQUALS
    && c !== CHAR_GREATER_THAN
    && c !== CHAR_SINGLE_QUOTE
    && c !== CHAR_DOUBLE_QUOTE
    // | “%” | “@” | “`”)
    && c !== CHAR_PERCENT
    && c !== CHAR_COMMERCIAL_AT
    && c !== CHAR_GRAVE_ACCENT;
}

// Determines whether block indentation indicator is required.
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}

var STYLE_PLAIN   = 1,
    STYLE_SINGLE  = 2,
    STYLE_LITERAL = 3,
    STYLE_FOLDED  = 4,
    STYLE_DOUBLE  = 5;

// Determines which scalar styles are possible and returns the preferred style.
// lineWidth = -1 => no limit.
// Pre-conditions: str.length > 0.
// Post-conditions:
//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
  var i;
  var char, prev_char;
  var hasLineBreak = false;
  var hasFoldableLine = false; // only checked if shouldTrackWidth
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1; // count the first line correctly
  var plain = isPlainSafeFirst(string.charCodeAt(0))
          && !isWhitespace(string.charCodeAt(string.length - 1));

  if (singleLineOnly) {
    // Case: no block styles.
    // Check for disallowed characters to rule out plain and single.
    for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
      plain = plain && isPlainSafe(char, prev_char);
    }
  } else {
    // Case: block styles permitted.
    for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        // Check if any line can be folded.
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine ||
            // Foldable line = too long, and not more-indented.
            (i - previousLineBreak - 1 > lineWidth &&
             string[previousLineBreak + 1] !== ' ');
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
      plain = plain && isPlainSafe(char, prev_char);
    }
    // in case the end is missing a \n
    hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
      (i - previousLineBreak - 1 > lineWidth &&
       string[previousLineBreak + 1] !== ' '));
  }
  // Although every style can represent \n without escaping, prefer block styles
  // for multiline, since they're more readable and they don't add empty lines.
  // Also prefer folding a super-long line.
  if (!hasLineBreak && !hasFoldableLine) {
    // Strings interpretable as another type have to be quoted;
    // e.g. the string 'true' vs. the boolean true.
    return plain && !testAmbiguousType(string)
      ? STYLE_PLAIN : STYLE_SINGLE;
  }
  // Edge case: block indentation indicator can only have one digit.
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  // At this point we know block styles are valid.
  // Prefer literal style unless we want to fold.
  return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
}

// Note: line breaking/folding is implemented for only the folded style.
// NB. We drop the last trailing newline (if any) of a returned block scalar
//  since the dumper adds its own newline. This always works:
//    • No ending newline => unaffected; already using strip "-" chomping.
//    • Ending newline    => removed then restored.
//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
function writeScalar(state, string, level, iskey) {
  state.dump = (function () {
    if (string.length === 0) {
      return "''";
    }
    if (!state.noCompatMode &&
        DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
      return "'" + string + "'";
    }

    var indent = state.indent * Math.max(1, level); // no 0-indent scalars
    // As indentation gets deeper, let the width decrease monotonically
    // to the lower bound min(state.lineWidth, 40).
    // Note that this implies
    //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
    //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
    // This behaves better than a constant minimum width which disallows narrower options,
    // or an indent threshold which causes the width to suddenly increase.
    var lineWidth = state.lineWidth === -1
      ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

    // Without knowing if keys are implicit/explicit, assume implicit for safety.
    var singleLineOnly = iskey
      // No block styles in flow mode.
      || (state.flowLevel > -1 && level >= state.flowLevel);
    function testAmbiguity(string) {
      return testImplicitResolving(state, string);
    }

    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return '|' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return '>' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string, lineWidth) + '"';
      default:
        throw new YAMLException('impossible error: invalid scalar style');
    }
  }());
}

// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';

  // note the special case: the string '\n' counts as a "trailing" empty line.
  var clip =          string[string.length - 1] === '\n';
  var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
  var chomp = keep ? '+' : (clip ? '' : '-');

  return indentIndicator + chomp + '\n';
}

// (See the note for writeScalar.)
function dropEndingNewline(string) {
  return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
}

// Note: a long line without a suitable break point will exceed the width limit.
// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
function foldString(string, width) {
  // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
  // unless they're before or after a more-indented line, or at the very
  // beginning or end, in which case $k$ maps to $k$.
  // Therefore, parse each chunk as newline(s) followed by a content line.
  var lineRe = /(\n+)([^\n]*)/g;

  // first line (possibly an empty line)
  var result = (function () {
    var nextLF = string.indexOf('\n');
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }());
  // If we haven't reached the first content line yet, don't add an extra \n.
  var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
  var moreIndented;

  // rest of the lines
  var match;
  while ((match = lineRe.exec(string))) {
    var prefix = match[1], line = match[2];
    moreIndented = (line[0] === ' ');
    result += prefix
      + (!prevMoreIndented && !moreIndented && line !== ''
        ? '\n' : '')
      + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }

  return result;
}

// Greedy line breaking.
// Picks the longest line under the limit each time,
// otherwise settles for the shortest line over the limit.
// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
function foldLine(line, width) {
  if (line === '' || line[0] === ' ') return line;

  // Since a more-indented line adds a \n, breaks can't be followed by a space.
  var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
  var match;
  // start is an inclusive index. end, curr, and next are exclusive.
  var start = 0, end, curr = 0, next = 0;
  var result = '';

  // Invariants: 0 <= start <= length-1.
  //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
  // Inside the loop:
  //   A match implies length >= 2, so curr and next are <= length-2.
  while ((match = breakRe.exec(line))) {
    next = match.index;
    // maintain invariant: curr - start <= width
    if (next - start > width) {
      end = (curr > start) ? curr : next; // derive end <= length-2
      result += '\n' + line.slice(start, end);
      // skip the space that was output as \n
      start = end + 1;                    // derive start <= length-1
    }
    curr = next;
  }

  // By the invariants, start <= length-1, so there is something left over.
  // It is either the whole string or a part starting from non-whitespace.
  result += '\n';
  // Insert a break if the remainder is too long and there is a break available.
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }

  return result.slice(1); // drop extra \n joiner
}

// Escapes a double-quoted string.
function escapeString(string) {
  var result = '';
  var char, nextChar;
  var escapeSeq;

  for (var i = 0; i < string.length; i++) {
    char = string.charCodeAt(i);
    // Check for surrogate pairs (reference Unicode 3.0 section "3.7 Surrogates").
    if (char >= 0xD800 && char <= 0xDBFF/* high surrogate */) {
      nextChar = string.charCodeAt(i + 1);
      if (nextChar >= 0xDC00 && nextChar <= 0xDFFF/* low surrogate */) {
        // Combine the surrogate pair and store it escaped.
        result += encodeHex((char - 0xD800) * 0x400 + nextChar - 0xDC00 + 0x10000);
        // Advance index one extra since we already used that char here.
        i++; continue;
      }
    }
    escapeSeq = ESCAPE_SEQUENCES[char];
    result += !escapeSeq && isPrintable(char)
      ? string[i]
      : escapeSeq || encodeHex(char);
  }

  return result;
}

function writeFlowSequence(state, level, object) {
  var _result = '',
      _tag    = state.tag,
      index,
      length;

  for (index = 0, length = object.length; index < length; index += 1) {
    // Write only valid elements.
    if (writeNode(state, level, object[index], false, false)) {
      if (index !== 0) _result += ',' + (!state.condenseFlow ? ' ' : '');
      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = '[' + _result + ']';
}

function writeBlockSequence(state, level, object, compact) {
  var _result = '',
      _tag    = state.tag,
      index,
      length;

  for (index = 0, length = object.length; index < length; index += 1) {
    // Write only valid elements.
    if (writeNode(state, level + 1, object[index], true, true)) {
      if (!compact || index !== 0) {
        _result += generateNextLine(state, level);
      }

      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += '-';
      } else {
        _result += '- ';
      }

      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = _result || '[]'; // Empty sequence if no valid values.
}

function writeFlowMapping(state, level, object) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      pairBuffer;

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {

    pairBuffer = '';
    if (index !== 0) pairBuffer += ', ';

    if (state.condenseFlow) pairBuffer += '"';

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (!writeNode(state, level, objectKey, false, false)) {
      continue; // Skip this pair because of invalid key;
    }

    if (state.dump.length > 1024) pairBuffer += '? ';

    pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');

    if (!writeNode(state, level, objectValue, false, false)) {
      continue; // Skip this pair because of invalid value.
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = '{' + _result + '}';
}

function writeBlockMapping(state, level, object, compact) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      explicitPair,
      pairBuffer;

  // Allow sorting keys so that the output file is deterministic
  if (state.sortKeys === true) {
    // Default sorting
    objectKeyList.sort();
  } else if (typeof state.sortKeys === 'function') {
    // Custom sort function
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    // Something is wrong
    throw new YAMLException('sortKeys must be a boolean or a function');
  }

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = '';

    if (!compact || index !== 0) {
      pairBuffer += generateNextLine(state, level);
    }

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue; // Skip this pair because of invalid key.
    }

    explicitPair = (state.tag !== null && state.tag !== '?') ||
                   (state.dump && state.dump.length > 1024);

    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += '?';
      } else {
        pairBuffer += '? ';
      }
    }

    pairBuffer += state.dump;

    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }

    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue; // Skip this pair because of invalid value.
    }

    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ':';
    } else {
      pairBuffer += ': ';
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = _result || '{}'; // Empty mapping if no valid pairs.
}

function detectType(state, object, explicit) {
  var _result, typeList, index, length, type, style;

  typeList = explicit ? state.explicitTypes : state.implicitTypes;

  for (index = 0, length = typeList.length; index < length; index += 1) {
    type = typeList[index];

    if ((type.instanceOf  || type.predicate) &&
        (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
        (!type.predicate  || type.predicate(object))) {

      state.tag = explicit ? type.tag : '?';

      if (type.represent) {
        style = state.styleMap[type.tag] || type.defaultStyle;

        if (_toString.call(type.represent) === '[object Function]') {
          _result = type.represent(object, style);
        } else if (_hasOwnProperty.call(type.represent, style)) {
          _result = type.represent[style](object, style);
        } else {
          throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
        }

        state.dump = _result;
      }

      return true;
    }
  }

  return false;
}

// Serializes `object` and writes it to global `result`.
// Returns true on success, or false on invalid object.
//
function writeNode(state, level, object, block, compact, iskey) {
  state.tag = null;
  state.dump = object;

  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }

  var type = _toString.call(state.dump);

  if (block) {
    block = (state.flowLevel < 0 || state.flowLevel > level);
  }

  var objectOrArray = type === '[object Object]' || type === '[object Array]',
      duplicateIndex,
      duplicate;

  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }

  if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
    compact = false;
  }

  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = '*ref_' + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type === '[object Object]') {
      if (block && (Object.keys(state.dump).length !== 0)) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object Array]') {
      var arrayLevel = (state.noArrayIndent && (level > 0)) ? level - 1 : level;
      if (block && (state.dump.length !== 0)) {
        writeBlockSequence(state, arrayLevel, state.dump, compact);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, arrayLevel, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object String]') {
      if (state.tag !== '?') {
        writeScalar(state, state.dump, level, iskey);
      }
    } else {
      if (state.skipInvalid) return false;
      throw new YAMLException('unacceptable kind of an object to dump ' + type);
    }

    if (state.tag !== null && state.tag !== '?') {
      state.dump = '!<' + state.tag + '> ' + state.dump;
    }
  }

  return true;
}

function getDuplicateReferences(object, state) {
  var objects = [],
      duplicatesIndexes = [],
      index,
      length;

  inspectNode(object, objects, duplicatesIndexes);

  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}

function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList,
      index,
      length;

  if (object !== null && typeof object === 'object') {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);

      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);

        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}

function dump(input, options) {
  options = options || {};

  var state = new State(options);

  if (!state.noRefs) getDuplicateReferences(input, state);

  if (writeNode(state, 0, input, true, true)) return state.dump + '\n';

  return '';
}

function safeDump(input, options) {
  return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}

module.exports.dump     = dump;
module.exports.safeDump = safeDump;


/***/ }),

/***/ 778:
/***/ ((module) => {

"use strict";
// YAML error class. http://stackoverflow.com/questions/8458984
//


function YAMLException(reason, mark) {
  // Super constructor
  Error.call(this);

  this.name = 'YAMLException';
  this.reason = reason;
  this.mark = mark;
  this.message = (this.reason || '(unknown reason)') + (this.mark ? ' ' + this.mark.toString() : '');

  // Include stack trace in error object
  if (Error.captureStackTrace) {
    // Chrome and NodeJS
    Error.captureStackTrace(this, this.constructor);
  } else {
    // FF, IE 10+ and Safari 6+. Fallback for others
    this.stack = (new Error()).stack || '';
  }
}


// Inherit from Error
YAMLException.prototype = Object.create(Error.prototype);
YAMLException.prototype.constructor = YAMLException;


YAMLException.prototype.toString = function toString(compact) {
  var result = this.name + ': ';

  result += this.reason || '(unknown reason)';

  if (!compact && this.mark) {
    result += ' ' + this.mark.toString();
  }

  return result;
};


module.exports = YAMLException;


/***/ }),

/***/ 414:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*eslint-disable max-len,no-use-before-define*/

var common              = __webpack_require__(537);
var YAMLException       = __webpack_require__(778);
var Mark                = __webpack_require__(993);
var DEFAULT_SAFE_SCHEMA = __webpack_require__(468);
var DEFAULT_FULL_SCHEMA = __webpack_require__(83);


var _hasOwnProperty = Object.prototype.hasOwnProperty;


var CONTEXT_FLOW_IN   = 1;
var CONTEXT_FLOW_OUT  = 2;
var CONTEXT_BLOCK_IN  = 3;
var CONTEXT_BLOCK_OUT = 4;


var CHOMPING_CLIP  = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP  = 3;


var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;


function _class(obj) { return Object.prototype.toString.call(obj); }

function is_EOL(c) {
  return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
}

function is_WHITE_SPACE(c) {
  return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
}

function is_WS_OR_EOL(c) {
  return (c === 0x09/* Tab */) ||
         (c === 0x20/* Space */) ||
         (c === 0x0A/* LF */) ||
         (c === 0x0D/* CR */);
}

function is_FLOW_INDICATOR(c) {
  return c === 0x2C/* , */ ||
         c === 0x5B/* [ */ ||
         c === 0x5D/* ] */ ||
         c === 0x7B/* { */ ||
         c === 0x7D/* } */;
}

function fromHexCode(c) {
  var lc;

  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  /*eslint-disable no-bitwise*/
  lc = c | 0x20;

  if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
    return lc - 0x61 + 10;
  }

  return -1;
}

function escapedHexLen(c) {
  if (c === 0x78/* x */) { return 2; }
  if (c === 0x75/* u */) { return 4; }
  if (c === 0x55/* U */) { return 8; }
  return 0;
}

function fromDecimalCode(c) {
  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  return -1;
}

function simpleEscapeSequence(c) {
  /* eslint-disable indent */
  return (c === 0x30/* 0 */) ? '\x00' :
        (c === 0x61/* a */) ? '\x07' :
        (c === 0x62/* b */) ? '\x08' :
        (c === 0x74/* t */) ? '\x09' :
        (c === 0x09/* Tab */) ? '\x09' :
        (c === 0x6E/* n */) ? '\x0A' :
        (c === 0x76/* v */) ? '\x0B' :
        (c === 0x66/* f */) ? '\x0C' :
        (c === 0x72/* r */) ? '\x0D' :
        (c === 0x65/* e */) ? '\x1B' :
        (c === 0x20/* Space */) ? ' ' :
        (c === 0x22/* " */) ? '\x22' :
        (c === 0x2F/* / */) ? '/' :
        (c === 0x5C/* \ */) ? '\x5C' :
        (c === 0x4E/* N */) ? '\x85' :
        (c === 0x5F/* _ */) ? '\xA0' :
        (c === 0x4C/* L */) ? '\u2028' :
        (c === 0x50/* P */) ? '\u2029' : '';
}

function charFromCodepoint(c) {
  if (c <= 0xFFFF) {
    return String.fromCharCode(c);
  }
  // Encode UTF-16 surrogate pair
  // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
  return String.fromCharCode(
    ((c - 0x010000) >> 10) + 0xD800,
    ((c - 0x010000) & 0x03FF) + 0xDC00
  );
}

var simpleEscapeCheck = new Array(256); // integer, for fast access
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}


function State(input, options) {
  this.input = input;

  this.filename  = options['filename']  || null;
  this.schema    = options['schema']    || DEFAULT_FULL_SCHEMA;
  this.onWarning = options['onWarning'] || null;
  this.legacy    = options['legacy']    || false;
  this.json      = options['json']      || false;
  this.listener  = options['listener']  || null;

  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap       = this.schema.compiledTypeMap;

  this.length     = input.length;
  this.position   = 0;
  this.line       = 0;
  this.lineStart  = 0;
  this.lineIndent = 0;

  this.documents = [];

  /*
  this.version;
  this.checkLineBreaks;
  this.tagMap;
  this.anchorMap;
  this.tag;
  this.anchor;
  this.kind;
  this.result;*/

}


function generateError(state, message) {
  return new YAMLException(
    message,
    new Mark(state.filename, state.input, state.position, state.line, (state.position - state.lineStart)));
}

function throwError(state, message) {
  throw generateError(state, message);
}

function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}


var directiveHandlers = {

  YAML: function handleYamlDirective(state, name, args) {

    var match, major, minor;

    if (state.version !== null) {
      throwError(state, 'duplication of %YAML directive');
    }

    if (args.length !== 1) {
      throwError(state, 'YAML directive accepts exactly one argument');
    }

    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);

    if (match === null) {
      throwError(state, 'ill-formed argument of the YAML directive');
    }

    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);

    if (major !== 1) {
      throwError(state, 'unacceptable YAML version of the document');
    }

    state.version = args[0];
    state.checkLineBreaks = (minor < 2);

    if (minor !== 1 && minor !== 2) {
      throwWarning(state, 'unsupported YAML version of the document');
    }
  },

  TAG: function handleTagDirective(state, name, args) {

    var handle, prefix;

    if (args.length !== 2) {
      throwError(state, 'TAG directive accepts exactly two arguments');
    }

    handle = args[0];
    prefix = args[1];

    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
    }

    if (_hasOwnProperty.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }

    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
    }

    state.tagMap[handle] = prefix;
  }
};


function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;

  if (start < end) {
    _result = state.input.slice(start, end);

    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 0x09 ||
              (0x20 <= _character && _character <= 0x10FFFF))) {
          throwError(state, 'expected valid JSON character');
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, 'the stream contains non-printable characters');
    }

    state.result += _result;
  }
}

function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;

  if (!common.isObject(source)) {
    throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
  }

  sourceKeys = Object.keys(source);

  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];

    if (!_hasOwnProperty.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}

function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
  var index, quantity;

  // The output is a plain object here, so keys can only be strings.
  // We need to convert keyNode to a string, but doing so can hang the process
  // (deeply nested arrays that explode exponentially using aliases).
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);

    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, 'nested arrays are not supported inside keys');
      }

      if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
        keyNode[index] = '[object Object]';
      }
    }
  }

  // Avoid code execution in load() via toString property
  // (still use its own toString for arrays, timestamps,
  // and whatever user schema extensions happen to have @@toStringTag)
  if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
    keyNode = '[object Object]';
  }


  keyNode = String(keyNode);

  if (_result === null) {
    _result = {};
  }

  if (keyTag === 'tag:yaml.org,2002:merge') {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json &&
        !_hasOwnProperty.call(overridableKeys, keyNode) &&
        _hasOwnProperty.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.position = startPos || state.position;
      throwError(state, 'duplicated mapping key');
    }
    _result[keyNode] = valueNode;
    delete overridableKeys[keyNode];
  }

  return _result;
}

function readLineBreak(state) {
  var ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x0A/* LF */) {
    state.position++;
  } else if (ch === 0x0D/* CR */) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
      state.position++;
    }
  } else {
    throwError(state, 'a line break is expected');
  }

  state.line += 1;
  state.lineStart = state.position;
}

function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0,
      ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    if (allowComments && ch === 0x23/* # */) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
    }

    if (is_EOL(ch)) {
      readLineBreak(state);

      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;

      while (ch === 0x20/* Space */) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }

  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, 'deficient indentation');
  }

  return lineBreaks;
}

function testDocumentSeparator(state) {
  var _position = state.position,
      ch;

  ch = state.input.charCodeAt(_position);

  // Condition state.position === state.lineStart is tested
  // in parent on each call, for efficiency. No needs to test here again.
  if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
      ch === state.input.charCodeAt(_position + 1) &&
      ch === state.input.charCodeAt(_position + 2)) {

    _position += 3;

    ch = state.input.charCodeAt(_position);

    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }

  return false;
}

function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += ' ';
  } else if (count > 1) {
    state.result += common.repeat('\n', count - 1);
  }
}


function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding,
      following,
      captureStart,
      captureEnd,
      hasPendingContent,
      _line,
      _lineStart,
      _lineIndent,
      _kind = state.kind,
      _result = state.result,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (is_WS_OR_EOL(ch)      ||
      is_FLOW_INDICATOR(ch) ||
      ch === 0x23/* # */    ||
      ch === 0x26/* & */    ||
      ch === 0x2A/* * */    ||
      ch === 0x21/* ! */    ||
      ch === 0x7C/* | */    ||
      ch === 0x3E/* > */    ||
      ch === 0x27/* ' */    ||
      ch === 0x22/* " */    ||
      ch === 0x25/* % */    ||
      ch === 0x40/* @ */    ||
      ch === 0x60/* ` */) {
    return false;
  }

  if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
    following = state.input.charCodeAt(state.position + 1);

    if (is_WS_OR_EOL(following) ||
        withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }

  state.kind = 'scalar';
  state.result = '';
  captureStart = captureEnd = state.position;
  hasPendingContent = false;

  while (ch !== 0) {
    if (ch === 0x3A/* : */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following) ||
          withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }

    } else if (ch === 0x23/* # */) {
      preceding = state.input.charCodeAt(state.position - 1);

      if (is_WS_OR_EOL(preceding)) {
        break;
      }

    } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
               withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;

    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);

      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }

    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }

    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }

    ch = state.input.charCodeAt(++state.position);
  }

  captureSegment(state, captureStart, captureEnd, false);

  if (state.result) {
    return true;
  }

  state.kind = _kind;
  state.result = _result;
  return false;
}

function readSingleQuotedScalar(state, nodeIndent) {
  var ch,
      captureStart, captureEnd;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x27/* ' */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x27/* ' */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (ch === 0x27/* ' */) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a single quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a single quoted scalar');
}

function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart,
      captureEnd,
      hexLength,
      hexResult,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x22/* " */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x22/* " */) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;

    } else if (ch === 0x5C/* \ */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);

        // TODO: rework to inline fn with no type cast?
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;

      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;

        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);

          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;

          } else {
            throwError(state, 'expected hexadecimal character');
          }
        }

        state.result += charFromCodepoint(hexResult);

        state.position++;

      } else {
        throwError(state, 'unknown escape sequence');
      }

      captureStart = captureEnd = state.position;

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a double quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a double quoted scalar');
}

function readFlowCollection(state, nodeIndent) {
  var readNext = true,
      _line,
      _tag     = state.tag,
      _result,
      _anchor  = state.anchor,
      following,
      terminator,
      isPair,
      isExplicitPair,
      isMapping,
      overridableKeys = {},
      keyNode,
      keyTag,
      valueNode,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x5B/* [ */) {
    terminator = 0x5D;/* ] */
    isMapping = false;
    _result = [];
  } else if (ch === 0x7B/* { */) {
    terminator = 0x7D;/* } */
    isMapping = true;
    _result = {};
  } else {
    return false;
  }

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(++state.position);

  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? 'mapping' : 'sequence';
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, 'missed comma between flow collection entries');
    }

    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;

    if (ch === 0x3F/* ? */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }

    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }

    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
    } else {
      _result.push(keyNode);
    }

    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === 0x2C/* , */) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }

  throwError(state, 'unexpected end of the stream within a flow collection');
}

function readBlockScalar(state, nodeIndent) {
  var captureStart,
      folding,
      chomping       = CHOMPING_CLIP,
      didReadContent = false,
      detectedIndent = false,
      textIndent     = nodeIndent,
      emptyLines     = 0,
      atMoreIndented = false,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x7C/* | */) {
    folding = false;
  } else if (ch === 0x3E/* > */) {
    folding = true;
  } else {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';

  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);

    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
      if (CHOMPING_CLIP === chomping) {
        chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, 'repeat of a chomping mode identifier');
      }

    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, 'repeat of an indentation width identifier');
      }

    } else {
      break;
    }
  }

  if (is_WHITE_SPACE(ch)) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (is_WHITE_SPACE(ch));

    if (ch === 0x23/* # */) {
      do { ch = state.input.charCodeAt(++state.position); }
      while (!is_EOL(ch) && (ch !== 0));
    }
  }

  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;

    ch = state.input.charCodeAt(state.position);

    while ((!detectedIndent || state.lineIndent < textIndent) &&
           (ch === 0x20/* Space */)) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }

    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }

    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }

    // End of the scalar.
    if (state.lineIndent < textIndent) {

      // Perform the chomping.
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) { // i.e. only if the scalar is not empty.
          state.result += '\n';
        }
      }

      // Break this `while` cycle and go to the funciton's epilogue.
      break;
    }

    // Folded style: use fancy rules to handle line breaks.
    if (folding) {

      // Lines starting with white space characters (more-indented lines) are not folded.
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        // except for the first content line (cf. Example 8.1)
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

      // End of more-indented block.
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat('\n', emptyLines + 1);

      // Just one line break - perceive as the same line.
      } else if (emptyLines === 0) {
        if (didReadContent) { // i.e. only if we have already read some scalar content.
          state.result += ' ';
        }

      // Several line breaks - perceive as different lines.
      } else {
        state.result += common.repeat('\n', emptyLines);
      }

    // Literal style: just add exact number of line breaks between content lines.
    } else {
      // Keep all line breaks except the header line break.
      state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
    }

    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;

    while (!is_EOL(ch) && (ch !== 0)) {
      ch = state.input.charCodeAt(++state.position);
    }

    captureSegment(state, captureStart, state.position, false);
  }

  return true;
}

function readBlockSequence(state, nodeIndent) {
  var _line,
      _tag      = state.tag,
      _anchor   = state.anchor,
      _result   = [],
      following,
      detected  = false,
      ch;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {

    if (ch !== 0x2D/* - */) {
      break;
    }

    following = state.input.charCodeAt(state.position + 1);

    if (!is_WS_OR_EOL(following)) {
      break;
    }

    detected = true;
    state.position++;

    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }

    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
      throwError(state, 'bad indentation of a sequence entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'sequence';
    state.result = _result;
    return true;
  }
  return false;
}

function readBlockMapping(state, nodeIndent, flowIndent) {
  var following,
      allowCompact,
      _line,
      _pos,
      _tag          = state.tag,
      _anchor       = state.anchor,
      _result       = {},
      overridableKeys = {},
      keyTag        = null,
      keyNode       = null,
      valueNode     = null,
      atExplicitKey = false,
      detected      = false,
      ch;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line; // Save the current line.
    _pos = state.position;

    //
    // Explicit notation case. There are two separate blocks:
    // first for the key (denoted by "?") and second for the value (denoted by ":")
    //
    if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {

      if (ch === 0x3F/* ? */) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
          keyTag = keyNode = valueNode = null;
        }

        detected = true;
        atExplicitKey = true;
        allowCompact = true;

      } else if (atExplicitKey) {
        // i.e. 0x3A/* : */ === character after the explicit key.
        atExplicitKey = false;
        allowCompact = true;

      } else {
        throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
      }

      state.position += 1;
      ch = following;

    //
    // Implicit notation case. Flow-style node as the key first, then ":", and the value.
    //
    } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {

      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);

        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }

        if (ch === 0x3A/* : */) {
          ch = state.input.charCodeAt(++state.position);

          if (!is_WS_OR_EOL(ch)) {
            throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
          }

          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
            keyTag = keyNode = valueNode = null;
          }

          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;

        } else if (detected) {
          throwError(state, 'can not read an implicit mapping pair; a colon is missed');

        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true; // Keep the result of `composeNode`.
        }

      } else if (detected) {
        throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');

      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true; // Keep the result of `composeNode`.
      }

    } else {
      break; // Reading is done. Go to the epilogue.
    }

    //
    // Common reading code for both explicit and implicit notations.
    //
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }

      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
        keyTag = keyNode = valueNode = null;
      }

      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }

    if (state.lineIndent > nodeIndent && (ch !== 0)) {
      throwError(state, 'bad indentation of a mapping entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  //
  // Epilogue.
  //

  // Special case: last mapping's node contains only the key in explicit notation.
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
  }

  // Expose the resulting mapping.
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'mapping';
    state.result = _result;
  }

  return detected;
}

function readTagProperty(state) {
  var _position,
      isVerbatim = false,
      isNamed    = false,
      tagHandle,
      tagName,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x21/* ! */) return false;

  if (state.tag !== null) {
    throwError(state, 'duplication of a tag property');
  }

  ch = state.input.charCodeAt(++state.position);

  if (ch === 0x3C/* < */) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);

  } else if (ch === 0x21/* ! */) {
    isNamed = true;
    tagHandle = '!!';
    ch = state.input.charCodeAt(++state.position);

  } else {
    tagHandle = '!';
  }

  _position = state.position;

  if (isVerbatim) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (ch !== 0 && ch !== 0x3E/* > */);

    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, 'unexpected end of the stream within a verbatim tag');
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {

      if (ch === 0x21/* ! */) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);

          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, 'named tag handle cannot contain such characters');
          }

          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, 'tag suffix cannot contain exclamation marks');
        }
      }

      ch = state.input.charCodeAt(++state.position);
    }

    tagName = state.input.slice(_position, state.position);

    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, 'tag suffix cannot contain flow indicator characters');
    }
  }

  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, 'tag name cannot contain such characters: ' + tagName);
  }

  if (isVerbatim) {
    state.tag = tagName;

  } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;

  } else if (tagHandle === '!') {
    state.tag = '!' + tagName;

  } else if (tagHandle === '!!') {
    state.tag = 'tag:yaml.org,2002:' + tagName;

  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }

  return true;
}

function readAnchorProperty(state) {
  var _position,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x26/* & */) return false;

  if (state.anchor !== null) {
    throwError(state, 'duplication of an anchor property');
  }

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an anchor node must contain at least one character');
  }

  state.anchor = state.input.slice(_position, state.position);
  return true;
}

function readAlias(state) {
  var _position, alias,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x2A/* * */) return false;

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an alias node must contain at least one character');
  }

  alias = state.input.slice(_position, state.position);

  if (!_hasOwnProperty.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }

  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}

function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles,
      allowBlockScalars,
      allowBlockCollections,
      indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
      atNewLine  = false,
      hasContent = false,
      typeIndex,
      typeQuantity,
      type,
      flowIndent,
      blockIndent;

  if (state.listener !== null) {
    state.listener('open', state);
  }

  state.tag    = null;
  state.anchor = null;
  state.kind   = null;
  state.result = null;

  allowBlockStyles = allowBlockScalars = allowBlockCollections =
    CONTEXT_BLOCK_OUT === nodeContext ||
    CONTEXT_BLOCK_IN  === nodeContext;

  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;

      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }

  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;

        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }

  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }

  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }

    blockIndent = state.position - state.lineStart;

    if (indentStatus === 1) {
      if (allowBlockCollections &&
          (readBlockSequence(state, blockIndent) ||
           readBlockMapping(state, blockIndent, flowIndent)) ||
          readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
            readSingleQuotedScalar(state, flowIndent) ||
            readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;

        } else if (readAlias(state)) {
          hasContent = true;

          if (state.tag !== null || state.anchor !== null) {
            throwError(state, 'alias node should not have any properties');
          }

        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;

          if (state.tag === null) {
            state.tag = '?';
          }
        }

        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      // Special case: block sequences are allowed to have same indentation level as the parent.
      // http://www.yaml.org/spec/1.2/spec.html#id2799784
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }

  if (state.tag !== null && state.tag !== '!') {
    if (state.tag === '?') {
      // Implicit resolving is not allowed for non-scalar types, and '?'
      // non-specific tag is only automatically assigned to plain scalars.
      //
      // We only need to check kind conformity in case user explicitly assigns '?'
      // tag, for example like this: "!<?> [0]"
      //
      if (state.result !== null && state.kind !== 'scalar') {
        throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
      }

      for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
        type = state.implicitTypes[typeIndex];

        if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
          state.result = type.construct(state.result);
          state.tag = type.tag;
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
          break;
        }
      }
    } else if (_hasOwnProperty.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
      type = state.typeMap[state.kind || 'fallback'][state.tag];

      if (state.result !== null && type.kind !== state.kind) {
        throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
      }

      if (!type.resolve(state.result)) { // `state.result` updated in resolver if matched
        throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
      } else {
        state.result = type.construct(state.result);
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else {
      throwError(state, 'unknown tag !<' + state.tag + '>');
    }
  }

  if (state.listener !== null) {
    state.listener('close', state);
  }
  return state.tag !== null ||  state.anchor !== null || hasContent;
}

function readDocument(state) {
  var documentStart = state.position,
      _position,
      directiveName,
      directiveArgs,
      hasDirectives = false,
      ch;

  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = {};
  state.anchorMap = {};

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if (state.lineIndent > 0 || ch !== 0x25/* % */) {
      break;
    }

    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;

    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];

    if (directiveName.length < 1) {
      throwError(state, 'directive name must not be less than one character in length');
    }

    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      if (ch === 0x23/* # */) {
        do { ch = state.input.charCodeAt(++state.position); }
        while (ch !== 0 && !is_EOL(ch));
        break;
      }

      if (is_EOL(ch)) break;

      _position = state.position;

      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      directiveArgs.push(state.input.slice(_position, state.position));
    }

    if (ch !== 0) readLineBreak(state);

    if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }

  skipSeparationSpace(state, true, -1);

  if (state.lineIndent === 0 &&
      state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);

  } else if (hasDirectives) {
    throwError(state, 'directives end mark is expected');
  }

  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);

  if (state.checkLineBreaks &&
      PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, 'non-ASCII line breaks are interpreted as content');
  }

  state.documents.push(state.result);

  if (state.position === state.lineStart && testDocumentSeparator(state)) {

    if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }

  if (state.position < (state.length - 1)) {
    throwError(state, 'end of the stream or a document separator is expected');
  } else {
    return;
  }
}


function loadDocuments(input, options) {
  input = String(input);
  options = options || {};

  if (input.length !== 0) {

    // Add tailing `\n` if not exists
    if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
        input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
      input += '\n';
    }

    // Strip BOM
    if (input.charCodeAt(0) === 0xFEFF) {
      input = input.slice(1);
    }
  }

  var state = new State(input, options);

  var nullpos = input.indexOf('\0');

  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, 'null byte is not allowed in input');
  }

  // Use 0 as string terminator. That significantly simplifies bounds check.
  state.input += '\0';

  while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
    state.lineIndent += 1;
    state.position += 1;
  }

  while (state.position < (state.length - 1)) {
    readDocument(state);
  }

  return state.documents;
}


function loadAll(input, iterator, options) {
  if (iterator !== null && typeof iterator === 'object' && typeof options === 'undefined') {
    options = iterator;
    iterator = null;
  }

  var documents = loadDocuments(input, options);

  if (typeof iterator !== 'function') {
    return documents;
  }

  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}


function load(input, options) {
  var documents = loadDocuments(input, options);

  if (documents.length === 0) {
    /*eslint-disable no-undefined*/
    return undefined;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new YAMLException('expected a single document in the stream, but found more');
}


function safeLoadAll(input, iterator, options) {
  if (typeof iterator === 'object' && iterator !== null && typeof options === 'undefined') {
    options = iterator;
    iterator = null;
  }

  return loadAll(input, iterator, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}


function safeLoad(input, options) {
  return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}


module.exports.loadAll     = loadAll;
module.exports.load        = load;
module.exports.safeLoadAll = safeLoadAll;
module.exports.safeLoad    = safeLoad;


/***/ }),

/***/ 993:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";



var common = __webpack_require__(537);


function Mark(name, buffer, position, line, column) {
  this.name     = name;
  this.buffer   = buffer;
  this.position = position;
  this.line     = line;
  this.column   = column;
}


Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
  var head, start, tail, end, snippet;

  if (!this.buffer) return null;

  indent = indent || 4;
  maxLength = maxLength || 75;

  head = '';
  start = this.position;

  while (start > 0 && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1)) === -1) {
    start -= 1;
    if (this.position - start > (maxLength / 2 - 1)) {
      head = ' ... ';
      start += 5;
      break;
    }
  }

  tail = '';
  end = this.position;

  while (end < this.buffer.length && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end)) === -1) {
    end += 1;
    if (end - this.position > (maxLength / 2 - 1)) {
      tail = ' ... ';
      end -= 5;
      break;
    }
  }

  snippet = this.buffer.slice(start, end);

  return common.repeat(' ', indent) + head + snippet + tail + '\n' +
         common.repeat(' ', indent + this.position - start + head.length) + '^';
};


Mark.prototype.toString = function toString(compact) {
  var snippet, where = '';

  if (this.name) {
    where += 'in "' + this.name + '" ';
  }

  where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);

  if (!compact) {
    snippet = this.getSnippet();

    if (snippet) {
      where += ':\n' + snippet;
    }
  }

  return where;
};


module.exports = Mark;


/***/ }),

/***/ 491:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*eslint-disable max-len*/

var common        = __webpack_require__(537);
var YAMLException = __webpack_require__(778);
var Type          = __webpack_require__(930);


function compileList(schema, name, result) {
  var exclude = [];

  schema.include.forEach(function (includedSchema) {
    result = compileList(includedSchema, name, result);
  });

  schema[name].forEach(function (currentType) {
    result.forEach(function (previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
        exclude.push(previousIndex);
      }
    });

    result.push(currentType);
  });

  return result.filter(function (type, index) {
    return exclude.indexOf(index) === -1;
  });
}


function compileMap(/* lists... */) {
  var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
      }, index, length;

  function collectType(type) {
    result[type.kind][type.tag] = result['fallback'][type.tag] = type;
  }

  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}


function Schema(definition) {
  this.include  = definition.include  || [];
  this.implicit = definition.implicit || [];
  this.explicit = definition.explicit || [];

  this.implicit.forEach(function (type) {
    if (type.loadKind && type.loadKind !== 'scalar') {
      throw new YAMLException('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
    }
  });

  this.compiledImplicit = compileList(this, 'implicit', []);
  this.compiledExplicit = compileList(this, 'explicit', []);
  this.compiledTypeMap  = compileMap(this.compiledImplicit, this.compiledExplicit);
}


Schema.DEFAULT = null;


Schema.create = function createSchema() {
  var schemas, types;

  switch (arguments.length) {
    case 1:
      schemas = Schema.DEFAULT;
      types = arguments[0];
      break;

    case 2:
      schemas = arguments[0];
      types = arguments[1];
      break;

    default:
      throw new YAMLException('Wrong number of arguments for Schema.create function');
  }

  schemas = common.toArray(schemas);
  types = common.toArray(types);

  if (!schemas.every(function (schema) { return schema instanceof Schema; })) {
    throw new YAMLException('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
  }

  if (!types.every(function (type) { return type instanceof Type; })) {
    throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
  }

  return new Schema({
    include: schemas,
    explicit: types
  });
};


module.exports = Schema;


/***/ }),

/***/ 29:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Standard YAML's Core schema.
// http://www.yaml.org/spec/1.2/spec.html#id2804923
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, Core schema has no distinctions from JSON schema is JS-YAML.





var Schema = __webpack_require__(491);


module.exports = new Schema({
  include: [
    __webpack_require__(148)
  ]
});


/***/ }),

/***/ 83:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// JS-YAML's default schema for `load` function.
// It is not described in the YAML specification.
//
// This schema is based on JS-YAML's default safe schema and includes
// JavaScript-specific types: !!js/undefined, !!js/regexp and !!js/function.
//
// Also this schema is used as default base schema at `Schema.create` function.





var Schema = __webpack_require__(491);


module.exports = Schema.DEFAULT = new Schema({
  include: [
    __webpack_require__(468)
  ],
  explicit: [
    __webpack_require__(645),
    __webpack_require__(152),
    __webpack_require__(354)
  ]
});


/***/ }),

/***/ 468:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// JS-YAML's default schema for `safeLoad` function.
// It is not described in the YAML specification.
//
// This schema is based on standard YAML's Core schema and includes most of
// extra types described at YAML tag repository. (http://yaml.org/type/)





var Schema = __webpack_require__(491);


module.exports = new Schema({
  include: [
    __webpack_require__(29)
  ],
  implicit: [
    __webpack_require__(800),
    __webpack_require__(322)
  ],
  explicit: [
    __webpack_require__(838),
    __webpack_require__(193),
    __webpack_require__(265),
    __webpack_require__(7)
  ]
});


/***/ }),

/***/ 35:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Standard YAML's Failsafe schema.
// http://www.yaml.org/spec/1.2/spec.html#id2802346





var Schema = __webpack_require__(491);


module.exports = new Schema({
  explicit: [
    __webpack_require__(969),
    __webpack_require__(461),
    __webpack_require__(917)
  ]
});


/***/ }),

/***/ 148:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Standard YAML's JSON schema.
// http://www.yaml.org/spec/1.2/spec.html#id2803231
//
// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
// So, this schema is not such strict as defined in the YAML specification.
// It allows numbers in binary notaion, use `Null` and `NULL` as `null`, etc.





var Schema = __webpack_require__(491);


module.exports = new Schema({
  include: [
    __webpack_require__(35)
  ],
  implicit: [
    __webpack_require__(188),
    __webpack_require__(13),
    __webpack_require__(301),
    __webpack_require__(406)
  ]
});


/***/ }),

/***/ 930:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var YAMLException = __webpack_require__(778);

var TYPE_CONSTRUCTOR_OPTIONS = [
  'kind',
  'resolve',
  'construct',
  'instanceOf',
  'predicate',
  'represent',
  'defaultStyle',
  'styleAliases'
];

var YAML_NODE_KINDS = [
  'scalar',
  'sequence',
  'mapping'
];

function compileStyleAliases(map) {
  var result = {};

  if (map !== null) {
    Object.keys(map).forEach(function (style) {
      map[style].forEach(function (alias) {
        result[String(alias)] = style;
      });
    });
  }

  return result;
}

function Type(tag, options) {
  options = options || {};

  Object.keys(options).forEach(function (name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });

  // TODO: Add tag format check.
  this.tag          = tag;
  this.kind         = options['kind']         || null;
  this.resolve      = options['resolve']      || function () { return true; };
  this.construct    = options['construct']    || function (data) { return data; };
  this.instanceOf   = options['instanceOf']   || null;
  this.predicate    = options['predicate']    || null;
  this.represent    = options['represent']    || null;
  this.defaultStyle = options['defaultStyle'] || null;
  this.styleAliases = compileStyleAliases(options['styleAliases'] || null);

  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}

module.exports = Type;


/***/ }),

/***/ 838:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/*eslint-disable no-bitwise*/

var NodeBuffer;

try {
  // A trick for browserified version, to not include `Buffer` shim
  var _require = require;
  NodeBuffer = _require('buffer').Buffer;
} catch (__) {}

var Type       = __webpack_require__(930);


// [ 64, 65, 66 ] -> [ padding, CR, LF ]
var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


function resolveYamlBinary(data) {
  if (data === null) return false;

  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

  // Convert one by one.
  for (idx = 0; idx < max; idx++) {
    code = map.indexOf(data.charAt(idx));

    // Skip CR/LF
    if (code > 64) continue;

    // Fail on illegal characters
    if (code < 0) return false;

    bitlen += 6;
  }

  // If there are any bits left, source was corrupted
  return (bitlen % 8) === 0;
}

function constructYamlBinary(data) {
  var idx, tailbits,
      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
      max = input.length,
      map = BASE64_MAP,
      bits = 0,
      result = [];

  // Collect by 6*4 bits (3 bytes)

  for (idx = 0; idx < max; idx++) {
    if ((idx % 4 === 0) && idx) {
      result.push((bits >> 16) & 0xFF);
      result.push((bits >> 8) & 0xFF);
      result.push(bits & 0xFF);
    }

    bits = (bits << 6) | map.indexOf(input.charAt(idx));
  }

  // Dump tail

  tailbits = (max % 4) * 6;

  if (tailbits === 0) {
    result.push((bits >> 16) & 0xFF);
    result.push((bits >> 8) & 0xFF);
    result.push(bits & 0xFF);
  } else if (tailbits === 18) {
    result.push((bits >> 10) & 0xFF);
    result.push((bits >> 2) & 0xFF);
  } else if (tailbits === 12) {
    result.push((bits >> 4) & 0xFF);
  }

  // Wrap into Buffer for NodeJS and leave Array for browser
  if (NodeBuffer) {
    // Support node 6.+ Buffer API when available
    return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
  }

  return result;
}

function representYamlBinary(object /*, style*/) {
  var result = '', bits = 0, idx, tail,
      max = object.length,
      map = BASE64_MAP;

  // Convert every three bytes to 4 ASCII characters.

  for (idx = 0; idx < max; idx++) {
    if ((idx % 3 === 0) && idx) {
      result += map[(bits >> 18) & 0x3F];
      result += map[(bits >> 12) & 0x3F];
      result += map[(bits >> 6) & 0x3F];
      result += map[bits & 0x3F];
    }

    bits = (bits << 8) + object[idx];
  }

  // Dump tail

  tail = max % 3;

  if (tail === 0) {
    result += map[(bits >> 18) & 0x3F];
    result += map[(bits >> 12) & 0x3F];
    result += map[(bits >> 6) & 0x3F];
    result += map[bits & 0x3F];
  } else if (tail === 2) {
    result += map[(bits >> 10) & 0x3F];
    result += map[(bits >> 4) & 0x3F];
    result += map[(bits << 2) & 0x3F];
    result += map[64];
  } else if (tail === 1) {
    result += map[(bits >> 2) & 0x3F];
    result += map[(bits << 4) & 0x3F];
    result += map[64];
    result += map[64];
  }

  return result;
}

function isBinary(object) {
  return NodeBuffer && NodeBuffer.isBuffer(object);
}

module.exports = new Type('tag:yaml.org,2002:binary', {
  kind: 'scalar',
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});


/***/ }),

/***/ 13:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(930);

function resolveYamlBoolean(data) {
  if (data === null) return false;

  var max = data.length;

  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
}

function constructYamlBoolean(data) {
  return data === 'true' ||
         data === 'True' ||
         data === 'TRUE';
}

function isBoolean(object) {
  return Object.prototype.toString.call(object) === '[object Boolean]';
}

module.exports = new Type('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function (object) { return object ? 'true' : 'false'; },
    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
    camelcase: function (object) { return object ? 'True' : 'False'; }
  },
  defaultStyle: 'lowercase'
});


/***/ }),

/***/ 406:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var common = __webpack_require__(537);
var Type   = __webpack_require__(930);

var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  '^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
  // .2e4, .2
  // special case, seems not from spec
  '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
  // 20:59
  '|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' +
  // .inf
  '|[-+]?\\.(?:inf|Inf|INF)' +
  // .nan
  '|\\.(?:nan|NaN|NAN))$');

function resolveYamlFloat(data) {
  if (data === null) return false;

  if (!YAML_FLOAT_PATTERN.test(data) ||
      // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === '_') {
    return false;
  }

  return true;
}

function constructYamlFloat(data) {
  var value, sign, base, digits;

  value  = data.replace(/_/g, '').toLowerCase();
  sign   = value[0] === '-' ? -1 : 1;
  digits = [];

  if ('+-'.indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }

  if (value === '.inf') {
    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

  } else if (value === '.nan') {
    return NaN;

  } else if (value.indexOf(':') >= 0) {
    value.split(':').forEach(function (v) {
      digits.unshift(parseFloat(v, 10));
    });

    value = 0.0;
    base = 1;

    digits.forEach(function (d) {
      value += d * base;
      base *= 60;
    });

    return sign * value;

  }
  return sign * parseFloat(value, 10);
}


var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

function representYamlFloat(object, style) {
  var res;

  if (isNaN(object)) {
    switch (style) {
      case 'lowercase': return '.nan';
      case 'uppercase': return '.NAN';
      case 'camelcase': return '.NaN';
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '.inf';
      case 'uppercase': return '.INF';
      case 'camelcase': return '.Inf';
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '-.inf';
      case 'uppercase': return '-.INF';
      case 'camelcase': return '-.Inf';
    }
  } else if (common.isNegativeZero(object)) {
    return '-0.0';
  }

  res = object.toString(10);

  // JS stringifier can build scientific format without dots: 5e-100,
  // while YAML requres dot: 5.e-100. Fix it with simple hack

  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
}

function isFloat(object) {
  return (Object.prototype.toString.call(object) === '[object Number]') &&
         (object % 1 !== 0 || common.isNegativeZero(object));
}

module.exports = new Type('tag:yaml.org,2002:float', {
  kind: 'scalar',
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: 'lowercase'
});


/***/ }),

/***/ 301:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var common = __webpack_require__(537);
var Type   = __webpack_require__(930);

function isHexCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
}

function isOctCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
}

function isDecCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
}

function resolveYamlInteger(data) {
  if (data === null) return false;

  var max = data.length,
      index = 0,
      hasDigits = false,
      ch;

  if (!max) return false;

  ch = data[index];

  // sign
  if (ch === '-' || ch === '+') {
    ch = data[++index];
  }

  if (ch === '0') {
    // 0
    if (index + 1 === max) return true;
    ch = data[++index];

    // base 2, base 8, base 16

    if (ch === 'b') {
      // base 2
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (ch !== '0' && ch !== '1') return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'x') {
      // base 16
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }

    // base 8
    for (; index < max; index++) {
      ch = data[index];
      if (ch === '_') continue;
      if (!isOctCode(data.charCodeAt(index))) return false;
      hasDigits = true;
    }
    return hasDigits && ch !== '_';
  }

  // base 10 (except 0) or base 60

  // value should not start with `_`;
  if (ch === '_') return false;

  for (; index < max; index++) {
    ch = data[index];
    if (ch === '_') continue;
    if (ch === ':') break;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }

  // Should have digits and should not end with `_`
  if (!hasDigits || ch === '_') return false;

  // if !base60 - done;
  if (ch !== ':') return true;

  // base60 almost not used, no needs to optimize
  return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
}

function constructYamlInteger(data) {
  var value = data, sign = 1, ch, base, digits = [];

  if (value.indexOf('_') !== -1) {
    value = value.replace(/_/g, '');
  }

  ch = value[0];

  if (ch === '-' || ch === '+') {
    if (ch === '-') sign = -1;
    value = value.slice(1);
    ch = value[0];
  }

  if (value === '0') return 0;

  if (ch === '0') {
    if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
    if (value[1] === 'x') return sign * parseInt(value, 16);
    return sign * parseInt(value, 8);
  }

  if (value.indexOf(':') !== -1) {
    value.split(':').forEach(function (v) {
      digits.unshift(parseInt(v, 10));
    });

    value = 0;
    base = 1;

    digits.forEach(function (d) {
      value += (d * base);
      base *= 60;
    });

    return sign * value;

  }

  return sign * parseInt(value, 10);
}

function isInteger(object) {
  return (Object.prototype.toString.call(object)) === '[object Number]' &&
         (object % 1 === 0 && !common.isNegativeZero(object));
}

module.exports = new Type('tag:yaml.org,2002:int', {
  kind: 'scalar',
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
    octal:       function (obj) { return obj >= 0 ? '0'  + obj.toString(8) : '-0'  + obj.toString(8).slice(1); },
    decimal:     function (obj) { return obj.toString(10); },
    /* eslint-disable max-len */
    hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
  },
  defaultStyle: 'decimal',
  styleAliases: {
    binary:      [ 2,  'bin' ],
    octal:       [ 8,  'oct' ],
    decimal:     [ 10, 'dec' ],
    hexadecimal: [ 16, 'hex' ]
  }
});


/***/ }),

/***/ 354:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var esprima;

// Browserified version does not have esprima
//
// 1. For node.js just require module as deps
// 2. For browser try to require mudule via external AMD system.
//    If not found - try to fallback to window.esprima. If not
//    found too - then fail to parse.
//
try {
  // workaround to exclude package from browserify list.
  var _require = require;
  esprima = _require('esprima');
} catch (_) {
  /* eslint-disable no-redeclare */
  /* global window */
  if (typeof window !== 'undefined') esprima = window.esprima;
}

var Type = __webpack_require__(930);

function resolveJavascriptFunction(data) {
  if (data === null) return false;

  try {
    var source = '(' + data + ')',
        ast    = esprima.parse(source, { range: true });

    if (ast.type                    !== 'Program'             ||
        ast.body.length             !== 1                     ||
        ast.body[0].type            !== 'ExpressionStatement' ||
        (ast.body[0].expression.type !== 'ArrowFunctionExpression' &&
          ast.body[0].expression.type !== 'FunctionExpression')) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

function constructJavascriptFunction(data) {
  /*jslint evil:true*/

  var source = '(' + data + ')',
      ast    = esprima.parse(source, { range: true }),
      params = [],
      body;

  if (ast.type                    !== 'Program'             ||
      ast.body.length             !== 1                     ||
      ast.body[0].type            !== 'ExpressionStatement' ||
      (ast.body[0].expression.type !== 'ArrowFunctionExpression' &&
        ast.body[0].expression.type !== 'FunctionExpression')) {
    throw new Error('Failed to resolve function');
  }

  ast.body[0].expression.params.forEach(function (param) {
    params.push(param.name);
  });

  body = ast.body[0].expression.body.range;

  // Esprima's ranges include the first '{' and the last '}' characters on
  // function expressions. So cut them out.
  if (ast.body[0].expression.body.type === 'BlockStatement') {
    /*eslint-disable no-new-func*/
    return new Function(params, source.slice(body[0] + 1, body[1] - 1));
  }
  // ES6 arrow functions can omit the BlockStatement. In that case, just return
  // the body.
  /*eslint-disable no-new-func*/
  return new Function(params, 'return ' + source.slice(body[0], body[1]));
}

function representJavascriptFunction(object /*, style*/) {
  return object.toString();
}

function isFunction(object) {
  return Object.prototype.toString.call(object) === '[object Function]';
}

module.exports = new Type('tag:yaml.org,2002:js/function', {
  kind: 'scalar',
  resolve: resolveJavascriptFunction,
  construct: constructJavascriptFunction,
  predicate: isFunction,
  represent: representJavascriptFunction
});


/***/ }),

/***/ 152:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(930);

function resolveJavascriptRegExp(data) {
  if (data === null) return false;
  if (data.length === 0) return false;

  var regexp = data,
      tail   = /\/([gim]*)$/.exec(data),
      modifiers = '';

  // if regexp starts with '/' it can have modifiers and must be properly closed
  // `/foo/gim` - modifiers tail can be maximum 3 chars
  if (regexp[0] === '/') {
    if (tail) modifiers = tail[1];

    if (modifiers.length > 3) return false;
    // if expression starts with /, is should be properly terminated
    if (regexp[regexp.length - modifiers.length - 1] !== '/') return false;
  }

  return true;
}

function constructJavascriptRegExp(data) {
  var regexp = data,
      tail   = /\/([gim]*)$/.exec(data),
      modifiers = '';

  // `/foo/gim` - tail can be maximum 4 chars
  if (regexp[0] === '/') {
    if (tail) modifiers = tail[1];
    regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
  }

  return new RegExp(regexp, modifiers);
}

function representJavascriptRegExp(object /*, style*/) {
  var result = '/' + object.source + '/';

  if (object.global) result += 'g';
  if (object.multiline) result += 'm';
  if (object.ignoreCase) result += 'i';

  return result;
}

function isRegExp(object) {
  return Object.prototype.toString.call(object) === '[object RegExp]';
}

module.exports = new Type('tag:yaml.org,2002:js/regexp', {
  kind: 'scalar',
  resolve: resolveJavascriptRegExp,
  construct: constructJavascriptRegExp,
  predicate: isRegExp,
  represent: representJavascriptRegExp
});


/***/ }),

/***/ 645:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(930);

function resolveJavascriptUndefined() {
  return true;
}

function constructJavascriptUndefined() {
  /*eslint-disable no-undefined*/
  return undefined;
}

function representJavascriptUndefined() {
  return '';
}

function isUndefined(object) {
  return typeof object === 'undefined';
}

module.exports = new Type('tag:yaml.org,2002:js/undefined', {
  kind: 'scalar',
  resolve: resolveJavascriptUndefined,
  construct: constructJavascriptUndefined,
  predicate: isUndefined,
  represent: representJavascriptUndefined
});


/***/ }),

/***/ 917:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(930);

module.exports = new Type('tag:yaml.org,2002:map', {
  kind: 'mapping',
  construct: function (data) { return data !== null ? data : {}; }
});


/***/ }),

/***/ 322:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(930);

function resolveYamlMerge(data) {
  return data === '<<' || data === null;
}

module.exports = new Type('tag:yaml.org,2002:merge', {
  kind: 'scalar',
  resolve: resolveYamlMerge
});


/***/ }),

/***/ 188:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(930);

function resolveYamlNull(data) {
  if (data === null) return true;

  var max = data.length;

  return (max === 1 && data === '~') ||
         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
}

function constructYamlNull() {
  return null;
}

function isNull(object) {
  return object === null;
}

module.exports = new Type('tag:yaml.org,2002:null', {
  kind: 'scalar',
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function () { return '~';    },
    lowercase: function () { return 'null'; },
    uppercase: function () { return 'NULL'; },
    camelcase: function () { return 'Null'; }
  },
  defaultStyle: 'lowercase'
});


/***/ }),

/***/ 193:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(930);

var _hasOwnProperty = Object.prototype.hasOwnProperty;
var _toString       = Object.prototype.toString;

function resolveYamlOmap(data) {
  if (data === null) return true;

  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
      object = data;

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;

    if (_toString.call(pair) !== '[object Object]') return false;

    for (pairKey in pair) {
      if (_hasOwnProperty.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }

    if (!pairHasKey) return false;

    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }

  return true;
}

function constructYamlOmap(data) {
  return data !== null ? data : [];
}

module.exports = new Type('tag:yaml.org,2002:omap', {
  kind: 'sequence',
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});


/***/ }),

/***/ 265:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(930);

var _toString = Object.prototype.toString;

function resolveYamlPairs(data) {
  if (data === null) return true;

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    if (_toString.call(pair) !== '[object Object]') return false;

    keys = Object.keys(pair);

    if (keys.length !== 1) return false;

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return true;
}

function constructYamlPairs(data) {
  if (data === null) return [];

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    keys = Object.keys(pair);

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return result;
}

module.exports = new Type('tag:yaml.org,2002:pairs', {
  kind: 'sequence',
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});


/***/ }),

/***/ 461:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(930);

module.exports = new Type('tag:yaml.org,2002:seq', {
  kind: 'sequence',
  construct: function (data) { return data !== null ? data : []; }
});


/***/ }),

/***/ 7:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(930);

var _hasOwnProperty = Object.prototype.hasOwnProperty;

function resolveYamlSet(data) {
  if (data === null) return true;

  var key, object = data;

  for (key in object) {
    if (_hasOwnProperty.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }

  return true;
}

function constructYamlSet(data) {
  return data !== null ? data : {};
}

module.exports = new Type('tag:yaml.org,2002:set', {
  kind: 'mapping',
  resolve: resolveYamlSet,
  construct: constructYamlSet
});


/***/ }),

/***/ 969:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(930);

module.exports = new Type('tag:yaml.org,2002:str', {
  kind: 'scalar',
  construct: function (data) { return data !== null ? data : ''; }
});


/***/ }),

/***/ 800:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Type = __webpack_require__(930);

var YAML_DATE_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9])'                    + // [2] month
  '-([0-9][0-9])$');                   // [3] day

var YAML_TIMESTAMP_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9]?)'                   + // [2] month
  '-([0-9][0-9]?)'                   + // [3] day
  '(?:[Tt]|[ \\t]+)'                 + // ...
  '([0-9][0-9]?)'                    + // [4] hour
  ':([0-9][0-9])'                    + // [5] minute
  ':([0-9][0-9])'                    + // [6] second
  '(?:\\.([0-9]*))?'                 + // [7] fraction
  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}

function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0,
      delta = null, tz_hour, tz_minute, date;

  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

  if (match === null) throw new Error('Date resolve error');

  // match: [1] year [2] month [3] day

  year = +(match[1]);
  month = +(match[2]) - 1; // JS month starts with 0
  day = +(match[3]);

  if (!match[4]) { // no hour
    return new Date(Date.UTC(year, month, day));
  }

  // match: [4] hour [5] minute [6] second [7] fraction

  hour = +(match[4]);
  minute = +(match[5]);
  second = +(match[6]);

  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) { // milli-seconds
      fraction += '0';
    }
    fraction = +fraction;
  }

  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

  if (match[9]) {
    tz_hour = +(match[10]);
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
    if (match[9] === '-') delta = -delta;
  }

  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

  if (delta) date.setTime(date.getTime() - delta);

  return date;
}

function representYamlTimestamp(object /*, style*/) {
  return object.toISOString();
}

module.exports = new Type('tag:yaml.org,2002:timestamp', {
  kind: 'scalar',
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});


/***/ }),

/***/ 877:
/***/ ((module) => {

module.exports = eval("require")("encoding");


/***/ }),

/***/ 747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 605:
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 87:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(109);
/******/ })()
;
//# sourceMappingURL=index.js.map