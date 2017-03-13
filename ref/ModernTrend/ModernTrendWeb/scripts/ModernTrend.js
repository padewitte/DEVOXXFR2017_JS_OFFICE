var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
/**
  * This module contains the basic definitions, helpers for parameter validation
  */
var DataViz;
(function (DataViz) {
    var Validate;
    (function (Validate) {
        "use strict";
        /**
          * This is a helper to validate parameters.
          *
          * Sample usage:
          * <code>
          * function foo(bar1: number, bar2: string, bar3: boolean, bar4: any)
          * {
          *     // Any failed validation will throw an exception
          *     DataViz.Validate.Validator.ensures(bar1).isGreaterThan(10).isLessThan(20);
          *     DataViz.Validate.Validator.ensures(bar2).isNotEmpty();
          *     DataViz.Validate.Validator.ensures(bar3).isTrue();
          *     DataViz.Validate.Validator.ensures(bar4).isNotNull();
          *     ...
          * }
          * </code>
          *
          */
        var Validator = (function () {
            /**
              * @param {any} param The parameter to be validated
              */
            function Validator(param) {
                this.param = param;
                this.source = "";
            }
            /**
              * Builds a validator that will validate the given parameter
              * @param {any} param The parameter to be validated
              * @returns {Validator} A validator instance to do the actual validation
              */
            Validator.ensures = function (param) {
                return new Validator(param);
            };
            Validator.assertAndThrowIfNeeded = function (isValid, errorName, message) {
                if (isValid) {
                    return;
                }
                throw new Error(errorName + (message ? (": " + message) : ""));
            };
            /**
              * The information provided by the caller
              * @param {string} source This parameter contains the information of the caller.
              * @returns {Validator} The validator instance used to do chain validation
              */
            Validator.prototype.from = function (source) {
                this.source = source;
                return this;
            };
            /**
              * Checks whether the parameter is neither null nor undefined
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isNotNull = function () {
                Validator.assertAndThrowIfNeeded((this.param !== null) && (this.param !== undefined), Validator.parameterIsNullError, this.source);
                return this;
            };
            /**
              * Checks whether the parameter is of a certain type; also validates against non-null.
              * @param {string} typeName The name of the expected type of the parameter
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isOfType = function (typeName) {
                this.isNotNull();
                Validator.assertAndThrowIfNeeded((typeof (this.param) === typeName), Validator.invalidParameterTypeError, "Expecting a " + typeName + " but actually a " + typeof (this.param) + " source:" + this.source);
                return this;
            };
            /**
              * Checks whether the parameter is a number; also validates against non-null.
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isNumber = function () {
                this.isNotNull();
                var sample = 0;
                return this.isOfType(typeof (sample));
            };
            /**
              * Checks whether the parameter is a string; also validates against non-null.
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isString = function () {
                this.isNotNull();
                var sample = "";
                return this.isOfType(typeof (sample));
            };
            /**
              * Checks whether the parameter is a boolean; also validates against non-null.
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isBool = function () {
                this.isNotNull();
                var sample = true;
                return this.isOfType(typeof (sample));
            };
            /**
              * Checks whether the parameter is a non-zero number; also validates against non-null and isNumber.
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isNotZero = function () {
                this.isNotNull();
                this.isNumber();
                Validator.assertAndThrowIfNeeded((this.param !== 0), Validator.parameterIsZeroError, this.source);
                return this;
            };
            /**
              * Checks whether the parameter is a non-empty ("") string; also validates against non-null and isString.
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isNotEmpty = function () {
                this.isNotNull();
                this.isString();
                Validator.assertAndThrowIfNeeded((this.param !== ""), Validator.parameterIsEmptyError, this.source);
                return this;
            };
            /**
              * Checks whether the parameter is true; also validates against non-null and isBool.
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isTrue = function () {
                this.isNotNull();
                this.isBool();
                Validator.assertAndThrowIfNeeded(this.param === true, Validator.parameterIsNotTrueError, this.source);
                return this;
            };
            /**
              * Checks whether the parameter is a positive number; also validates against non-null and isNumber.
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isPositive = function () {
                this.isNotNull();
                this.isNumber();
                Validator.assertAndThrowIfNeeded((this.param > 0), Validator.parameterIsNotPositiveError, this.source);
                return this;
            };
            /**
              * Checks whether the parameter is no less than the given value; also validates against non-null and isNumber.
              * @param {number} value The value compares to.
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isGreaterThanOrEqualTo = function (value) {
                this.isNotNull();
                this.isNumber();
                Validator.assertAndThrowIfNeeded(this.param >= value, Validator.parameterRangeError, "Must be greater than or equal to " + value + ", actual is " + this.param + " source:" + this.source);
                return this;
            };
            /**
              * Checks whether the parameter is greater than the given value; also validates against non-null and isNumber.
              * @param {number} value The value compares to.
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isGreaterThan = function (value) {
                this.isNotNull();
                this.isNumber();
                Validator.assertAndThrowIfNeeded(this.param > value, Validator.parameterRangeError, "Must be greater than " + value + ", actual is " + this.param + " source:" + this.source);
                return this;
            };
            /**
              * Checks whether the parameter is no larger than the given value; also validates against non-null and isNumber.
              * @param {number} value The value compares to.
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isLessThanOrEqualTo = function (value) {
                this.isNotNull();
                this.isNumber();
                Validator.assertAndThrowIfNeeded(this.param <= value, Validator.parameterRangeError, "Must be less than or equal to " + value + ", actual is " + this.param + " source:" + this.source);
                return this;
            };
            /**
              * Checks whether the parameter is less than the given value; also validates against non-null and isNumber.
              * @param {number} value The value compares to.
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isLessThan = function (value) {
                this.isNotNull();
                this.isNumber();
                Validator.assertAndThrowIfNeeded(this.param < value, Validator.parameterRangeError, "Must be less than " + value + ", actual is " + this.param + " source:" + this.source);
                return this;
            };
            /**
              * Checks whether the parameter is equal to the given value (including null or undefined).
              * @param {number} value The value compares to.
              * @returns {Validator} The validator instance used to do chain validation if this validation passes
              */
            Validator.prototype.isEqualTo = function (value) {
                Validator.assertAndThrowIfNeeded(this.param === value, Validator.parameterIsNotEqualToError, "Expecting: " + value + ", Actual: " + this.param + " source:" + this.source);
                return this;
            };
            Validator.invalidParameterTypeError = "Invalid parameter type";
            Validator.parameterIsNullError = "Parameter cannot be null";
            Validator.parameterIsZeroError = "Parameter cannot be zero";
            Validator.parameterIsEmptyError = "Parameter cannot be empty";
            Validator.parameterIsNotPositiveError = "Parameter must be positive";
            Validator.parameterIsNotTrueError = "Parameter must be true";
            Validator.parameterRangeError = "Parameter must be in the expected range";
            Validator.parameterIsNotEqualToError = "Parameter must be equal to the expected value";
            return Validator;
        }());
        Validate.Validator = Validator;
    })(Validate = DataViz.Validate || (DataViz.Validate = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="validate.ts"/>
/**
  * This module contains the basic definition implementations of the tools
  */
var DataViz;
(function (DataViz) {
    var Tools;
    (function (Tools) {
        "use strict";
        /**
          * A reusable implementation of the {@link IPausable}
          */
        var Pausable = (function () {
            function Pausable() {
                this.paused = false;
            }
            /**
              * Implementing {@link IPausable#Pause}
              */
            Pausable.prototype.pause = function () {
                this.paused = true;
            };
            /**
              * Implementing {@link IPausable#Resume}
              */
            Pausable.prototype.resume = function () {
                this.paused = false;
            };
            /**
              * Implementing {@link IPausable#IsPaused}
              */
            Pausable.prototype.isPaused = function () {
                return this.paused;
            };
            return Pausable;
        }());
        Tools.Pausable = Pausable;
        /**
          * A tool class factory helper
          */
        var ToolsFactory = (function () {
            function ToolsFactory() {
            }
            /**
              * Builds a particular tool with a given class name.
              * @param {string} className The fully qualified class name of the tool
              * @returns {any} The tool instance or null if fails to build
              */
            ToolsFactory.buildTool = function (className) {
                DataViz.Validate.Validator.ensures(className).from("ToolsFactory::buildTool")
                    .isNotNull()
                    .isNotEmpty();
                var existingTool = ToolsFactory.toolsPool[className];
                if (existingTool) {
                    return existingTool;
                }
                var toolClass = eval(className);
                if (!toolClass) {
                    return null;
                }
                var newTool = new toolClass;
                ToolsFactory.toolsPool[className] = newTool;
                return newTool;
            };
            ToolsFactory.toolsPool = {};
            return ToolsFactory;
        }());
        Tools.ToolsFactory = ToolsFactory;
    })(Tools = DataViz.Tools || (DataViz.Tools = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="validate.ts"/>
/**
  * This module contains some helper functions
  */
var DataViz;
(function (DataViz) {
    var Utils;
    (function (Utils) {
        /**
          * Get zoom ratio for the app to adjust some element sizes inside it
          * @returns number The zoom ratio to adjust element sizes
          */
        function getZoomRatioForApp() {
            // No need to zoom in or zoom out as the app size will not change on Office Web Application not matter what's the devicePixelRatio.
            if (DataViz.Utils.isOnWac()) {
                return 1;
            }
            else {
                return getDeviceZoomRatio();
            }
        }
        Utils.getZoomRatioForApp = getZoomRatioForApp;
        /**
          * Get device zoom ratio
          * @returns number The zoom ratio of device
          */
        function getDeviceZoomRatio() {
            // For IE10, IE11, Firefox
            if (window.screen.deviceXDPI && window.screen.logicalXDPI) {
                return window.screen.deviceXDPI / window.screen.logicalXDPI;
            }
            else if (window.devicePixelRatio) {
                return window.devicePixelRatio;
            }
            else {
                return 1;
            }
        }
        Utils.getDeviceZoomRatio = getDeviceZoomRatio;
        /**
          * Determines whether the application is running on an Office Web Application environment.
          */
        function isOnWac() {
            return window["OSF"].DDA.ExcelWebAppDocument !== undefined;
        }
        Utils.isOnWac = isOnWac;
        /**
          * A module to handle events according to differnt browers.
          */
        var BrowserHelper;
        (function (BrowserHelper) {
            var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > 0;
            /**
              * Determines whether the browser is IE.
              * @returns True if the browser is IE, false otherwise.
              */
            function isIE() {
                return navigator.userAgent.toLowerCase().indexOf("trident") > 0;
            }
            BrowserHelper.isIE = isIE;
            /**
              * Determines whether the browser is IE9.
              * @returns True if the browser is IE9, false otherwise.
              */
            function isIE9() {
                var userAgent = navigator.userAgent.toLowerCase();
                return userAgent.indexOf("trident/5.0") > 0 || userAgent.indexOf("msie 9.0") > 0;
            }
            BrowserHelper.isIE9 = isIE9;
            /**
              * Get the width of the svg element
              * @param {SVGSVGElement} node An svg node we need to get its width
              * @returns {number} The width of the svg element
              */
            function getSvgElementWidth(node) {
                if (isFirefox) {
                    return node.getBBox().width; // Works in IE, Chrome, Safari, and Firefox but all have a rendering bug.
                }
                else {
                    return node.clientWidth; // Works well in IE, Chrome, and Safari but not in Firefox.
                }
            }
            BrowserHelper.getSvgElementWidth = getSvgElementWidth;
            /**
              * Get the height of the svg element
              * @param {SVGSVGElement} node An svg node we need to get its height
              * @returns {number} The height of the svg element
              */
            function getSvgElementHeight(node) {
                if (isFirefox) {
                    return node.getBBox().height;
                }
                else {
                    return node.clientHeight;
                }
            }
            BrowserHelper.getSvgElementHeight = getSvgElementHeight;
        })(BrowserHelper = Utils.BrowserHelper || (Utils.BrowserHelper = {}));
        /**
          * Removes a particular item from an array. If there are multiple matches in the array, all will be removed.
          * @param {any[]} array The array that the item is removed from
          * @param {any} item The item to remove
          * @returns True if succeeded; false otherwise (no such item)
          */
        function removeItemFromArray(array, item) {
            DataViz.Validate.Validator.ensures(array).from("Utils.removeItemFromArray [array]").isNotNull();
            DataViz.Validate.Validator.ensures(item).from("Utils.removeItemFromArray [item]").isNotNull();
            var index;
            var removed = false;
            while ((index = array.indexOf(item)) !== -1) {
                array.splice(index, 1);
                removed = true;
            }
            return removed;
        }
        Utils.removeItemFromArray = removeItemFromArray;
        /**
          * Formats a number into a string with thousand separators. For example, 1234567 will becom 1,234,567; 1234567.12345 will become 1,234,567.12345
          * Only supports non-negative float numbers.
          * @param {string} value The value to format
          * @returns {string} The formatted string, or the original string if it's not a non-negative float number
          */
        function formatNumberWithThousandSeparators(value) {
            DataViz.Validate.Validator.ensures(value).from("Utils.formatNumberWithThousandSeparators").isNotNull();
            // If it's not a non-negative float number, don't add comma separator
            if (/^[0-9]+(\.[0-9]+)?$/.test(value)) {
                var decimalPointPosition = value.indexOf(".") >= 0 ? value.indexOf(".") : value.length;
                var result = value.substr(decimalPointPosition);
                var startPos = value.indexOf("-") + 1;
                var index = decimalPointPosition;
                while (index - 3 > startPos) {
                    result = "," + value.substr(index - 3, 3) + result;
                    index -= 3;
                }
                return value.substr(0, index) + result;
            }
            else {
                return value;
            }
        }
        Utils.formatNumberWithThousandSeparators = formatNumberWithThousandSeparators;
        /**
          * Make the buttons of a certain pane tapped in circle
          * @param {string} paneId The id of the target pane which will get the focus
          * @param {string} firstTabId The id of the element which is the first one getting focused
          * @param {string} lastTabId The id of the element which is the last one getting focused
          */
        function setTabFocus(paneId, firstTabId, lastTabId) {
            $("#" + paneId).off("keydown");
            $("#" + paneId).on("keydown", function (event) {
                if (event.keyCode && event.keyCode === 9) {
                    var firstButton = $("#" + firstTabId)[0];
                    var lastButton = $("#" + lastTabId)[0];
                    if (firstButton && lastButton) {
                        if (event.target === lastButton && !event.shiftKey) {
                            event.preventDefault();
                            firstButton.focus();
                        }
                        else if (event.target === firstButton && event.shiftKey) {
                            event.preventDefault();
                            lastButton.focus();
                        }
                    }
                }
            });
        }
        Utils.setTabFocus = setTabFocus;
        /**
          * Replace all the specific sub-strings which contain a number and curly brace like "{1}" with meaningful strings.
          * @param {any[]} ...parameters The parameter[0] is the origin string and others are the replacing strings.
          * @returns {string} The replaced string.
          */
        function stringFormat() {
            var parameters = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                parameters[_i - 0] = arguments[_i];
            }
            var args = arguments;
            var source = args[0];
            return source.replace(/{(\d+)}/gm, function (match, number) {
                var index = parseInt(number, 10) + 1;
                return index >= args.length ? match : (args[index] === null || typeof (args[index]) == 'undefined' ? '' : args[index]);
            });
        }
        Utils.stringFormat = stringFormat;
        ;
    })(Utils = DataViz.Utils || (DataViz.Utils = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="utils.ts"/>
///<reference path="tool.ts"/>
///<reference path="validate.ts"/>
/**
  * This modules contains basic definitions, interfaces and base classes related to configurations
  */
var DataViz;
(function (DataViz) {
    var Config;
    (function (Config) {
        /**
          * The well known configuration keys used in this app
          */
        Config.wellKnownKeys = {
            theme: "theme",
            shape: "shape",
            layout: "layout",
            sku: "sku",
        };
        /**
          * A configuration contains a set of key/value pairs which normally represent user settings, etc.
          */
        var Configuration = (function () {
            /**
              * @param {string[]} keys The keys of supported values in this configuration
              * @param {IConfigurator} configurator The configurator that can actually be used to load/save the configuration from/to host document
              */
            function Configuration(keys, configurator) {
                DataViz.Validate.Validator.ensures(keys).isNotNull();
                DataViz.Validate.Validator.ensures(configurator).isNotNull();
                this.keys = keys;
                this.configurator = configurator;
                this.settings = [];
                this.changeListeners = [];
                this.delaySetTimeOutIDs = {};
                this.registerListener(this.configurator);
            }
            /**
              * Resets the configuration
              */
            Configuration.prototype.reset = function () {
                this.changeListeners.length = 0;
                this.settings.length = 0;
            };
            /**
              * Registers a configuration change listener. This method can be called multiple times to register multiple listeners.
              * @param {IConfigurationChangeListener} listener A configuration change listener to be registered.
              */
            Configuration.prototype.registerListener = function (listener) {
                DataViz.Validate.Validator.ensures(listener).isNotNull();
                if (this.changeListeners.indexOf(listener) === -1) {
                    this.changeListeners.push(listener);
                }
            };
            /**
              * Unregisters a configuration change listener.
              * @param {@link IConfigurationChangeListener} listener: A configuration change listener to be unregistered.
              */
            Configuration.prototype.unregisterListener = function (listener) {
                DataViz.Validate.Validator.ensures(listener).isNotNull();
                DataViz.Utils.removeItemFromArray(this.changeListeners, listener);
            };
            /**
              * Loads all the configurations
              */
            Configuration.prototype.loadAll = function () {
                this.configurator.loadAll(this);
            };
            /**
              * Clears all the configuration values
              */
            Configuration.prototype.clear = function () {
                this.settings.length = 0;
            };
            Object.defineProperty(Configuration.prototype, "Keys", {
                /**
                  * Get a list of the keys of the supported configuration values
                  * @returns {string[]} The keys of the supported configuration values
                  */
                get: function () {
                    return this.keys;
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Gets a configuration value with the specified key
              * @param {string} key The key of the configuration value to get
              * @returns {any} The configuration value retrieved
              */
            Configuration.prototype.get = function (key) {
                DataViz.Validate.Validator.ensures(key).isNotNull();
                return this.settings[key];
            };
            /**
              * Sets a configuration value with the specified key
              * @param {string} key The key of the configuration value to set
              * @param {any} value The configuration value to set
              * @param {boolean} optional notifyListeners whether notify listeners, the default value is true
              */
            Configuration.prototype.set = function (key, value, notifyListeners) {
                if (notifyListeners === void 0) { notifyListeners = true; }
                DataViz.Validate.Validator.ensures(key).isNotNull();
                DataViz.Validate.Validator.ensures(value).isNotNull();
                this.settings[key] = value;
                if (notifyListeners) {
                    this.changeListeners.forEach(function (listener, index, array) {
                        listener.onConfigurationChanged(key, value);
                    });
                }
            };
            /**
              * Delay to set a configuration value with the specified key
              * @param {string} key The key of the configuration value to set
              * @param {any} value The configuration value to set
              * @param {number} optional delay time in milliseconds, the default value is one second
              */
            Configuration.prototype.delaySet = function (key, value, delay) {
                var _this = this;
                if (delay === void 0) { delay = 1000; }
                if (this.delaySetTimeOutIDs[key]) {
                    clearTimeout(this.delaySetTimeOutIDs[key]);
                }
                this.delaySetTimeOutIDs[key] = setTimeout(function () {
                    _this.set(key, value);
                    _this.delaySetTimeOutIDs[key] = null;
                }, delay);
            };
            return Configuration;
        }());
        Config.Configuration = Configuration;
    })(Config = DataViz.Config || (DataViz.Config = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="tool.ts"/>
///<reference path="config.ts"/>
/**
  * This module contains the basic definitions, constants, and base-classes of data related tasks
  */
var DataViz;
(function (DataViz) {
    var Data;
    (function (Data) {
        "use strict";
        /**
          * The binding name used by the app
          */
        Data.DefaultBindingName = "dataVizBinding";
        Data.ExtraBindingName = "dataVizBinding2";
    })(Data = DataViz.Data || (DataViz.Data = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="config.ts"/>
///<reference path="validate.ts"/>
/**
  * This module contains the basic definitions, constants and base-classes of layout related tasks
  */
var DataViz;
(function (DataViz) {
    var Chart;
    (function (Chart) {
        "use strict";
        /**
          * This represents a single HTML attribute name/value pair in the layout HTML element
          */
        var Attribute = (function () {
            function Attribute() {
            }
            return Attribute;
        }());
        Chart.Attribute = Attribute;
        /**
          * This  represents a single CSS style item in the layout HTML element
          */
        var Style = (function () {
            function Style() {
            }
            return Style;
        }());
        Chart.Style = Style;
        /**
          * This represents a single HTML element in the layout definition
          */
        var LayoutElement = (function () {
            function LayoutElement() {
            }
            return LayoutElement;
        }());
        Chart.LayoutElement = LayoutElement;
        /**
          * This represents the layout definition, which contains a set of element definitions
          */
        var Layout = (function () {
            function Layout() {
            }
            return Layout;
        }());
        Chart.Layout = Layout;
        /**
          * A layout instance contains a set of layout element instances. It represents all the definitions of the HTML elements and the values for a concrete layout on the canvas
          */
        var LayoutInstance = (function () {
            /**
              * @param {Layout} layout The layout defination
              * @param {Config.IConfigurator} configurator The configurator used to load element instance values from the host document
              */
            function LayoutInstance(layout, configurator) {
                DataViz.Validate.Validator.ensures(layout).isNotNull();
                DataViz.Validate.Validator.ensures(configurator).isNotNull();
                this.layout = layout;
                this.changeListeners = [];
                this.delaySetTimeOutIDs = {};
                this.reentryFlag = false;
                var keys = layout.elements.map(function (val, index, array) {
                    return LayoutInstance.Prefix + val.id;
                });
                this.storage = new DataViz.Config.Configuration(keys, configurator);
                this.storage.registerListener(this);
            }
            /**
              * Resets the layout instance
              */
            LayoutInstance.prototype.reset = function () {
                this.changeListeners.length = 0;
            };
            /**
              * Loads all the element instance values from the configuration
              */
            LayoutInstance.prototype.loadAll = function () {
                this.storage.loadAll();
            };
            /**
              * Registers a layout change listener. This method can be called multiple times to register multiple listeners.
              * @param {ILayoutChangeListener} listener A layout change listener to be registered.
              */
            LayoutInstance.prototype.registerListener = function (listener) {
                DataViz.Validate.Validator.ensures(listener).isNotNull();
                if (this.changeListeners.indexOf(listener) === -1) {
                    this.changeListeners.push(listener);
                }
            };
            /**
              * Unregisters a layout change listener.
              * @param {@link ILayoutChangeListener} listener: A layout change listener to be unregistered.
              */
            LayoutInstance.prototype.unregisterListener = function (listener) {
                DataViz.Validate.Validator.ensures(listener).isNotNull();
                DataViz.Utils.removeItemFromArray(this.changeListeners, listener);
            };
            /**
              * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
              */
            LayoutInstance.prototype.onConfigurationChanged = function (key, value) {
                DataViz.Validate.Validator.ensures(key).isNotNull().isNotEmpty();
                DataViz.Validate.Validator.ensures(value).isNotNull();
                if (key.indexOf(LayoutInstance.Prefix) === -1) {
                    return;
                }
                if (this.reentryFlag) {
                    return;
                }
                this.reentryFlag = true;
                var id = key.substring(LayoutInstance.Prefix.length);
                this.notifyChange(id, value);
                this.reentryFlag = false;
            };
            /**
              * Sets the value of a layout element with the specified id
              * @param {string} layoutElementId The id of the layout element
              * @param {any} value The value to set into the layout element
              */
            LayoutInstance.prototype.setValue = function (layoutElementId, value) {
                DataViz.Validate.Validator.ensures(layoutElementId).isNotNull().isNotEmpty();
                DataViz.Validate.Validator.ensures(value).isNotNull();
                this.storage.set(LayoutInstance.Prefix + layoutElementId, value);
            };
            /**
              * Sets the value of a layout element with the specified id, but doesn't notify the listeners
              * @param {string} layoutElementId The id of the layout element
              * @param {any} value The value to set into the layout element
              * @param {number} optional delay time in milliseconds, the default value is 300 milliseconds
              */
            LayoutInstance.prototype.delaySetValueNoNotify = function (layoutElementId, value, delay) {
                var _this = this;
                if (delay === void 0) { delay = 300; }
                DataViz.Validate.Validator.ensures(layoutElementId).isNotNull().isNotEmpty();
                DataViz.Validate.Validator.ensures(value).isNotNull();
                var key = LayoutInstance.Prefix + layoutElementId;
                if (this.delaySetTimeOutIDs[key]) {
                    clearTimeout(this.delaySetTimeOutIDs[key]);
                }
                this.delaySetTimeOutIDs[key] = setTimeout(function () {
                    _this.storage.set(key, value, false);
                    if (Office.context.document.settings) {
                        Office.context.document.settings.set(key, value);
                        Office.context.document.settings.saveAsync();
                    }
                    _this.delaySetTimeOutIDs[key] = null;
                }, delay);
            };
            /**
              * Gets the value of a layout element with the specified id
              * @param {string} layoutElementId The id of the layout element
              * @returns {any} The value of the layout element instance
              */
            LayoutInstance.prototype.getValue = function (layoutElementId) {
                DataViz.Validate.Validator.ensures(layoutElementId).isNotNull().isNotEmpty();
                return this.storage.get(LayoutInstance.Prefix + layoutElementId);
            };
            LayoutInstance.prototype.notifyChange = function (layoutElementId, value) {
                var matchedElement = this.layout.elements.filter(function (element, index, array) {
                    return element.id === layoutElementId;
                });
                if (matchedElement.length <= 0) {
                    return;
                }
                this.changeListeners.forEach(function (listener, index, array) {
                    listener.onLayoutElementInstanceChanged(matchedElement[0], value);
                });
            };
            LayoutInstance.Prefix = "layout-element-";
            return LayoutInstance;
        }());
        Chart.LayoutInstance = LayoutInstance;
        /**
          * The layout provider that takes care of the following tasks
          *  - Loads the pre-defined layouts into memory
          *  - Returns all the loaded layouts
          *  - Tracks (via listening to configuration changes) and returns the currently selected layout
          */
        var LayoutProvider = (function () {
            function LayoutProvider() {
                this.currentLayoutId = "";
            }
            Object.defineProperty(LayoutProvider, "Instance", {
                get: function () {
                    if (!LayoutProvider.theInstance) {
                        LayoutProvider.theInstance = new LayoutProvider;
                    }
                    return LayoutProvider.theInstance;
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Loads all the pre-defined layouts. This has to be called before calling any other methods of this class.
              * @param {() => any} callback The callback function that will be called after the loading is finished
              */
            LayoutProvider.prototype.loadAll = function (callback) {
                DataViz.Validate.Validator.ensures(callback).isNotNull();
                if (this.layouts) {
                    callback();
                    return;
                }
                var thisProvider = this;
                $.ajax({
                    type: "get",
                    url: "../layouts/layouts.json?ver=" + LayoutProvider.version,
                    data: null,
                    success: function (data) {
                        thisProvider.layouts = data;
                    },
                    complete: function (jqXHR, textStatus) {
                        callback();
                    },
                    dataType: "json"
                });
            };
            Object.defineProperty(LayoutProvider.prototype, "Layouts", {
                /**
                  * Gets all the loaded layouts.
                  * @returns {Layout[]} All the loaded layouts
                  */
                get: function () {
                    DataViz.Validate.Validator.ensures(this.layouts).isNotNull();
                    return this.layouts;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutProvider.prototype, "Default", {
                /**
                  * Returns the default layout
                  * @returns {Layout} The default layout (normally the first layout in the list)
                  */
                get: function () {
                    return this.Layouts[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutProvider.prototype, "CurrentLayoutId", {
                /**
                  * Returns the id of current layout
                  * @returns {string} The id of current layout
                  */
                get: function () {
                    return this.currentLayoutId;
                },
                /**
                  * Sets the current layout id
                  * @param {string} id The layout id
                  */
                set: function (id) {
                    DataViz.Validate.Validator.ensures(id).isNotNull().isNotEmpty();
                    this.currentLayoutId = id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutProvider.prototype, "CurrentLayout", {
                /**
                 * Returns the current layout
                 * @returns {Layout} The current layout (if at least one is selected) or the default layout (if none is selected)
                 */
                get: function () {
                    return this.getLayoutById(this.CurrentLayoutId);
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
              */
            LayoutProvider.prototype.onConfigurationChanged = function (key, value) {
                DataViz.Validate.Validator.ensures(key).isNotNull().isNotEmpty();
                DataViz.Validate.Validator.ensures(value).isNotNull();
                if (key === DataViz.Config.wellKnownKeys.layout) {
                    this.currentLayoutId = value;
                }
            };
            LayoutProvider.prototype.getLayoutById = function (id) {
                var match = this.Layouts.filter(function (value, index, array) {
                    return (value.id === id);
                });
                return (match.length > 0) ? match[0] : this.Default;
            };
            LayoutProvider.theInstance = null;
            LayoutProvider.version = 3; // To force web browser reload cache, increase this if you are updating layouts.js.
            return LayoutProvider;
        }());
        Chart.LayoutProvider = LayoutProvider;
    })(Chart = DataViz.Chart || (DataViz.Chart = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="data.ts"/>
///<reference path="tool.ts"/>
///<reference path="layout.ts"/>
///<reference path="validate.ts"/>
/**
  * This module contains the basic definitions, constants and base-classes related to rendering
  */
var DataViz;
(function (DataViz) {
    var Chart;
    (function (Chart) {
        "use strict";
        /**
          * A class that takes care of the visualization.
          */
        var Visualizer = (function () {
            /**
              * @param {@link ILayouter} layouter The layouter instance that will do the actual layout actions
              * @param {@link IPlotter} plotter The plotter instance that will do the actual plotting operations
              */
            function Visualizer(layouter, plotter) {
                DataViz.Validate.Validator.ensures(layouter).isNotNull();
                DataViz.Validate.Validator.ensures(plotter).isNotNull();
                this.layouter = layouter;
                this.plotter = plotter;
                this.visualizationListeners = [];
                this.resetTool();
            }
            Object.defineProperty(Visualizer.prototype, "CachedData", {
                /**
                  * Gets the cached data
                  * @returns {string} the cached data of the SKU
                  */
                get: function () {
                    return this.cachedData;
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Visualizes the data to the chart
                @param {any} data The data to be visualized
              */
            Visualizer.prototype.visualize = function (data) {
                this.cachedData = data;
                if (!data) {
                    this.resetTool();
                }
                this.revisualize();
            };
            /**
              * Registers a visualization listener. This method can be called multiple times to register multiple listeners.
              * @param {IVisualizationListener} listener A visualization listener to be registered.
              */
            Visualizer.prototype.registerListener = function (listener) {
                DataViz.Validate.Validator.ensures(listener).isNotNull();
                if (this.visualizationListeners.indexOf(listener) === -1) {
                    this.visualizationListeners.push(listener);
                }
            };
            /**
              * Unregisters a visualization listener.
              * @param {@link IVisualizationListener} listener: A visualization listener to be unregistered.
              */
            Visualizer.prototype.unregisterListener = function (listener) {
                DataViz.Validate.Validator.ensures(listener).isNotNull();
                DataViz.Utils.removeItemFromArray(this.visualizationListeners, listener);
            };
            /**
              * Implementing {@link ITool#resetTool}
              */
            Visualizer.prototype.resetTool = function () {
                this.plotter.resetTool();
                this.layouter.resetTool();
                this.cachedData = null;
                this.visualizationRequestPending = false;
                this.visualizationListeners.length = 0;
            };
            Visualizer.prototype.revisualize = function () {
                var _this = this;
                this.visualizationRequestPending = true;
                var thisVisualizer = this;
                var delay = 100;
                setTimeout(function () {
                    // Repeatedly (< 100ms) invoked visualization requests will be merged into the last request to avoid duplicate computing and rendering
                    if (!thisVisualizer.visualizationRequestPending) {
                        return;
                    }
                    _this.visualizationRequestPending = false;
                    if (thisVisualizer.cachedData) {
                        _this.visualizationListeners.forEach(function (listener, index, array) {
                            listener.onStartVisualizing();
                        });
                        thisVisualizer.layouter.layout(thisVisualizer.cachedData);
                        thisVisualizer.plotter.plot(thisVisualizer.cachedData);
                        _this.visualizationListeners.forEach(function (listener, index, array) {
                            listener.onEndVisualizing();
                        });
                    }
                }, delay);
            };
            return Visualizer;
        }());
        Chart.Visualizer = Visualizer;
    })(Chart = DataViz.Chart || (DataViz.Chart = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="data.ts"/>
///<reference path="chart.ts"/>
///<reference path="config.ts"/>
///<reference path="validate.ts"/>
/**
  * This module contains the controller implementation
  */
var DataViz;
(function (DataViz) {
    var Control;
    (function (Control) {
        "use strict";
        /**
          * The controller behaves like a bridge or a middle man connecting several other components.
          * In general, it listens to certain events from some components and triggers certain operations of other components
          */
        var Controller = (function () {
            /**
              * @param {Visualizer} visualizer The visualizer that will be used for visualization
              * @param {IDataBinder} dataBinder The data binder that will be used to bind data
              * @param {IDataConvertor} visualizer The data convertor that will be used to convert raw data
              */
            function Controller(visualizer, dataBinder, dataConvertor) {
                DataViz.Validate.Validator.ensures(visualizer).from("Controller::ctor [visualizer]").isNotNull();
                DataViz.Validate.Validator.ensures(dataBinder).from("Controller::ctor [dataBinder]").isNotNull();
                DataViz.Validate.Validator.ensures(dataConvertor).from("Controller::ctor [dataConvertor]").isNotNull();
                this.visualizer = visualizer;
                this.dataBinder = dataBinder;
                this.dataConvertor = dataConvertor;
                this.cachedData = null;
                this.isRevisualizeOnThemeChange = false;
                this.dataBinder.registerDataChangeListener(this);
            }
            /**
              * Binds data by prompt (delegate to the data binder)
              * @param {(result: any) => any} [callback] The callback that will be called after the data binding is done. Optional.
              */
            Controller.prototype.bindDataByPrompt = function (callback) {
                this.dataBinder.bindByPrompt(callback);
            };
            /**
              * Binds data by selection (delegate to the data binder)
              * @param {(result: any) => any} [callback] The callback that will be called after the data binding is done. Optional.
              */
            Controller.prototype.bindDataBySelection = function (callback) {
                this.dataBinder.bindBySelection(callback);
            };
            /**
              * Rebinds data directly using the default bind name (delegate to the data binder)
              * @param {() => any} [callback] The callback that will be called after the data binding is done. Optional.
              */
            Controller.prototype.rebindData = function (callback) {
                this.dataBinder.rebind(callback);
            };
            /**
              * Tries to bind the currently selected data (delegate to the data binder)
              * @param {(result: any) => any} [callback] The callback that will be called after the data binding is done. Optional.
              */
            Controller.prototype.tryBindSelection = function (callback) {
                var _this = this;
                this.dataBinder.getSelectedData(function (rawData) {
                    var data = _this.dataConvertor.convert(rawData);
                    if (data) {
                        _this.dataBinder.bindBySelection(callback);
                    }
                    else {
                        if (callback) {
                            callback(null);
                        }
                    }
                });
            };
            /**
              * Visualizes the given data (delegate to the visualizer)
              * @param {any} rawData The raw data to be visualized
              */
            Controller.prototype.visualizeData = function (rawData) {
                this.cachedData = rawData;
                this.revisualize();
            };
            /**
              * Revisualizes the cached data (if any)
              */
            Controller.prototype.revisualize = function () {
                if (this.cachedData) {
                    this.visualizer.visualize(this.dataConvertor.convert(this.cachedData));
                }
            };
            /**
              * Whether revisualize on theme change
              * @param {boolean} isRevisualize set to true if revisualizing on theme change is true
              */
            Controller.prototype.revisualizeOnThemeChange = function (isRevisualize) {
                this.isRevisualizeOnThemeChange = isRevisualize;
            };
            /**
              * Implementing {@link IDataChangeListener#onDataChanged}
              */
            Controller.prototype.onDataChanged = function (rawData) {
                this.visualizeData(rawData);
            };
            /**
              * Implementing {@link IDataChangeListener#onDataBindingTargetChanged}
              */
            Controller.prototype.onDataBindingTargetChanged = function () {
                this.dataConvertor.resetTool();
            };
            /**
              * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
              */
            Controller.prototype.onConfigurationChanged = function (key, value) {
                var _this = this;
                DataViz.Validate.Validator.ensures(key).from("Controller::onConfigurationChanged [key]").isNotNull().isNotEmpty();
                DataViz.Validate.Validator.ensures(value).from("Controller::onConfigurationChanged [key]=" + key + " [value]").isNotNull();
                switch (key) {
                    case DataViz.Config.wellKnownKeys.theme:
                        {
                            var stylesheetLink = $("link#chart-theme");
                            stylesheetLink.attr("href", DataViz.Decoration.ThemeProvider.Instance.CurrentThemeCssUrl);
                            if (this.isRevisualizeOnThemeChange) {
                                stylesheetLink.off("load");
                                $("link#chart-theme").on("load", function () {
                                    _this.revisualize();
                                });
                            }
                        }
                        break;
                    case DataViz.Config.wellKnownKeys.shape:
                        {
                            this.revisualize();
                        }
                        break;
                }
            };
            return Controller;
        }());
        Control.Controller = Controller;
    })(Control = DataViz.Control || (DataViz.Control = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="config.ts"/>
///<reference path="validate.ts"/>
/**
  * This module contains the basic definitions, constants and base-classes of customizable decoration related tasks
  */
var DataViz;
(function (DataViz) {
    var Decoration;
    (function (Decoration) {
        "use strict";
        /**
          * The base class of a single definition in the customizable decoration
          */
        var Customizable = (function () {
            function Customizable() {
            }
            return Customizable;
        }());
        Decoration.Customizable = Customizable;
        /**
          * This class represents a single theme definition
          */
        var Theme = (function (_super) {
            __extends(Theme, _super);
            function Theme() {
                _super.apply(this, arguments);
            }
            return Theme;
        }(Customizable));
        Decoration.Theme = Theme;
        /**
          * This class represents a single shape definition
          */
        var Shape = (function (_super) {
            __extends(Shape, _super);
            function Shape() {
                _super.apply(this, arguments);
            }
            return Shape;
        }(Customizable));
        Decoration.Shape = Shape;
        /**
          * The theme provider that takes care of the following tasks
          *  - Loads the pre-defined themes into memory
          *  - Returns all the loaded themes
          *  - Returns the themes for a particular SKU
          *  - Tracks (via listening to configuration changes) and returns the currently selected theme
          */
        var ThemeProvider = (function () {
            function ThemeProvider() {
                this.definitions = null;
                this.currentThemeId = "";
            }
            Object.defineProperty(ThemeProvider, "Instance", {
                get: function () {
                    if (!ThemeProvider.theInstance) {
                        ThemeProvider.theInstance = new ThemeProvider;
                    }
                    return ThemeProvider.theInstance;
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Loads all the pre-defined themes. This has to be called before calling any other methods of this class.
              * @param {() => any} callback The callback function that will be called after the loading is finished
              */
            ThemeProvider.prototype.loadAll = function (callback) {
                DataViz.Validate.Validator.ensures(callback).from("ThemeProvider::loadAll").isNotNull();
                if (this.definitions) {
                    callback();
                    return;
                }
                // TODO: Consider split and delay loading
                var thisProvider = this;
                $.ajax({
                    type: "get",
                    url: "../themes/themes.json?ver=" + ThemeProvider.version,
                    data: null,
                    success: function (data) {
                        thisProvider.definitions = data;
                    },
                    complete: function (jqXHR, textStatus) {
                        callback();
                    },
                    dataType: "json"
                });
            };
            Object.defineProperty(ThemeProvider.prototype, "Themes", {
                /**
                  * Gets all the loaded themes.
                  * @returns {Theme[]} All the loaded themes
                  */
                get: function () {
                    DataViz.Validate.Validator.ensures(this.definitions).from("ThemeProvider::Themes").isNotNull();
                    return this.definitions;
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Enumerates all the themes for a particular SKU
              * @param {string} skuId The id of SKU
              * @returns {Theme[]} All the themes for a particular SKU, which include all the SKU-neutral themes
              */
            ThemeProvider.prototype.enumerateForSku = function (skuId) {
                DataViz.Validate.Validator.ensures(skuId).from("ThemeProvider::enumerateForSku")
                    .isNotNull()
                    .isNotEmpty();
                return this.Themes.filter(function (theme, index, array) {
                    return (theme.sku === skuId) || (theme.sku === "") || (!theme.sku);
                });
            };
            Object.defineProperty(ThemeProvider.prototype, "Default", {
                /**
                  * Returns the default theme
                  * @returns {Theme} The default theme (normally the first theme in the list)
                  */
                get: function () {
                    return this.Themes[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ThemeProvider.prototype, "CurrentThemeId", {
                /**
                  * Returns the id of the current theme
                  * @returns {string} The id of the current theme
                  */
                get: function () {
                    return this.currentThemeId;
                },
                /**
                  * Sets the current theme id
                  * @param {string} id The theme id
                  */
                set: function (id) {
                    DataViz.Validate.Validator.ensures(id).from("ThemeProvider::CurrentThemeId")
                        .isNotNull()
                        .isNotEmpty();
                    this.currentThemeId = id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ThemeProvider.prototype, "CurrentTheme", {
                /**
                  * Returns the current theme
                  * @returns {Theme} The current theme (if at least one is selected) or the default theme (if none is selected)
                  */
                get: function () {
                    var theme = this.getThemeById(this.currentThemeId);
                    return theme ? theme : this.Default;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ThemeProvider.prototype, "CurrentThemeCssUrl", {
                /**
                  * Returns the CSS URL for the current theme
                  * @returns {string} The CSS URL for the current theme
                  */
                get: function () {
                    return this.CurrentTheme.css + "?ver=" + ThemeProvider.version;
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Gets the theme with the given id
              * @param {string} id The id of a theme
              * @returns {Theme} The theme with the given id or null if not found
              */
            ThemeProvider.prototype.getThemeById = function (id) {
                var match = this.Themes.filter(function (value, index, array) {
                    return (value.id === id);
                });
                return (match.length > 0) ? match[0] : null;
            };
            /**
              * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
              */
            ThemeProvider.prototype.onConfigurationChanged = function (key, value) {
                DataViz.Validate.Validator.ensures(key).from("ThemeProvider::onConfigurationChanged [key]")
                    .isNotNull()
                    .isNotEmpty();
                DataViz.Validate.Validator.ensures(value).from("ThemeProvider::onConfigurationChanged [key]=" + key + " [value]")
                    .isNotNull();
                if (key === DataViz.Config.wellKnownKeys.theme) {
                    this.currentThemeId = value;
                }
            };
            ThemeProvider.theInstance = null;
            ThemeProvider.version = 2; // To force web browser reload cache, increase this if you are updating themes.js or any of the stylesheets.
            return ThemeProvider;
        }());
        Decoration.ThemeProvider = ThemeProvider;
        /**
          * The shape provider that takes care of the following tasks
          *  - Loads the pre-defined shapes into memory
          *  - Returns all the loaded shapes
          *  - Returns the shapes for a particular SKU
          *  - Tracks (via listening to configuration changes) and returns the currently selected shape
          */
        var ShapeProvider = (function () {
            function ShapeProvider() {
                this.definitions = null;
                this.currentShapeId = "";
            }
            Object.defineProperty(ShapeProvider, "Instance", {
                get: function () {
                    if (!ShapeProvider.theInstance) {
                        ShapeProvider.theInstance = new ShapeProvider;
                    }
                    return ShapeProvider.theInstance;
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Loads all the pre-defined shapes. This has to be called before calling any other methods of this class.
              * @param {() => any} callback The callback function that will be called after the loading is finished
              */
            ShapeProvider.prototype.loadAll = function (callback) {
                DataViz.Validate.Validator.ensures(callback).from("ShapeProvider::loadAll").isNotNull();
                if (this.definitions) {
                    callback();
                    return;
                }
                var thisProvider = this;
                $.ajax({
                    type: "get",
                    url: "../shapes/shapes.json?ver=" + ShapeProvider.version,
                    data: null,
                    success: function (data) {
                        thisProvider.definitions = data;
                    },
                    complete: function (jqXHR, textStatus) {
                        callback();
                    },
                    dataType: "json"
                });
            };
            Object.defineProperty(ShapeProvider.prototype, "Shapes", {
                /**
                  * Gets all the loaded shapes.
                  * @returns {Shape[]} All the loaded shapes
                  */
                get: function () {
                    DataViz.Validate.Validator.ensures(this.definitions).from("ShapeProvider::Shapes").isNotNull();
                    return this.definitions;
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Enumerates all the shapes for a particular SKU
              * @param {string} skuId The id of SKU
              * @returns {Shape[]} All the shapes for a particular SKU, which include all the SKU-neutral shapes
              */
            ShapeProvider.prototype.enumerateForSku = function (skuId) {
                DataViz.Validate.Validator.ensures(skuId).from("ShapeProvider::enumerateForSku")
                    .isNotNull()
                    .isNotEmpty();
                return this.Shapes.filter(function (shape, index, array) {
                    return (shape.sku === skuId) || (shape.sku === "") || (!shape.sku);
                });
            };
            Object.defineProperty(ShapeProvider.prototype, "Default", {
                /**
                  * Returns the default shape
                  * @returns {Shape} The default shape (normally the first shape in the list)
                  */
                get: function () {
                    return this.Shapes[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ShapeProvider.prototype, "CurrentShapeId", {
                /**
                  * Returns the id of current shape
                  * @returns {string} The id of current shape
                  */
                get: function () {
                    return this.currentShapeId;
                },
                /**
                  * Sets the current shape id
                  * @param {string} id The shape id
                  */
                set: function (id) {
                    DataViz.Validate.Validator.ensures(id).from("ShapeProvider::CurrentShapeId")
                        .isNotNull()
                        .isNotEmpty();
                    this.currentShapeId = id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ShapeProvider.prototype, "CurrentShape", {
                /**
                  * Returns the current shape
                  * @returns {Shape} The current shape (if at least one is selected) or the default shape (if none is selected)
                  */
                get: function () {
                    var shape = this.getShapeById(this.currentShapeId);
                    return shape ? shape : this.Default;
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Gets the shape with the given id
              * @param {string} id The id the shape to get
              * @returns {Shape} The shape with the given id or null if not found
              */
            ShapeProvider.prototype.getShapeById = function (id) {
                var match = this.Shapes.filter(function (value, index, array) {
                    return (value.id === id);
                });
                return (match.length > 0) ? match[0] : null;
            };
            /**
              * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
              */
            ShapeProvider.prototype.onConfigurationChanged = function (key, value) {
                DataViz.Validate.Validator.ensures(key).from("ShapeProvider::onConfigurationChanged [key]")
                    .isNotNull()
                    .isNotEmpty();
                DataViz.Validate.Validator.ensures(value).from("ShapeProvider::onConfigurationChanged [key]=" + key + " [value]")
                    .isNotNull();
                if (key === DataViz.Config.wellKnownKeys.shape) {
                    this.currentShapeId = value;
                }
            };
            ShapeProvider.theInstance = null;
            ShapeProvider.version = 1; // To force web browser reload cache; increase it if you are updating shapes.js.
            return ShapeProvider;
        }());
        Decoration.ShapeProvider = ShapeProvider;
    })(Decoration = DataViz.Decoration || (DataViz.Decoration = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="tool.ts"/>
///<reference path="chart.ts"/>
///<reference path="data.ts"/>
///<reference path="config.ts"/>
///<reference path="controller.ts"/>
///<reference path="decoration.ts"/>
///<reference path="tool.ts"/>
///<reference path="validate.ts"/>
/**
  * This module contains the basic definitions, constants and base-classes of SKU related tasks
  */
var DataViz;
(function (DataViz) {
    var SKUs;
    (function (SKUs) {
        "use strict";
        /**
          * The SKU definition
          */
        var SKUDefinition = (function (_super) {
            __extends(SKUDefinition, _super);
            function SKUDefinition() {
                _super.apply(this, arguments);
            }
            return SKUDefinition;
        }(DataViz.Decoration.Customizable));
        SKUs.SKUDefinition = SKUDefinition;
        /**
          * This represents an SKU instance, with all tools instantiated
          */
        var SKUInstance = (function () {
            function SKUInstance() {
            }
            /**
              * Creates an SKU instance from the SKU definition
              * @param {SKUDefinition} definition The SKU definition
              * @returns {SKUInstance} An SKU instance created or null if the creation fails
              */
            SKUInstance.fromDefinition = function (definition) {
                DataViz.Validate.Validator.ensures(definition).from("SKUInstance::fromDefinition").isNotNull();
                var instance = new SKUInstance;
                instance.id = definition.id;
                instance.themeId = definition.defaultTheme;
                instance.shapeId = definition.defaultShape;
                instance.layoutId = definition.defaultLayout;
                instance.sampleData = definition.sampleData;
                instance.plotter = DataViz.Tools.ToolsFactory.buildTool(definition.plotter);
                instance.layouter = DataViz.Tools.ToolsFactory.buildTool(definition.layouter);
                instance.dataBinder = DataViz.Tools.ToolsFactory.buildTool(definition.dataBinder);
                instance.dataConvertor = DataViz.Tools.ToolsFactory.buildTool(definition.dataConvertor);
                instance.configurator = DataViz.Tools.ToolsFactory.buildTool(definition.configurator);
                if ((!instance.plotter)
                    || (!instance.layouter)
                    || (!instance.dataBinder)
                    || (!instance.dataConvertor)
                    || (!instance.configurator)) {
                    return null;
                }
                instance.visualizer = new DataViz.Chart.Visualizer(instance.layouter, instance.plotter);
                instance.controller = new DataViz.Control.Controller(instance.visualizer, instance.dataBinder, instance.dataConvertor);
                return instance;
            };
            Object.defineProperty(SKUInstance.prototype, "Id", {
                /**
                  * Gets the id of the SKU
                  * @returns {string} the id of the SKU
                  */
                get: function () {
                    return this.id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUInstance.prototype, "Plotter", {
                /**
                  * Gets the plotter used in this SKU
                  * @returns {DataViz.Chart.IPlotter} The plotter instance
                  */
                get: function () {
                    return this.plotter;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUInstance.prototype, "Layouter", {
                /**
                  * Gets the layouter used in this SKU
                  * @returns {DataViz.Chart.ILayouter} The layouter instance
                  */
                get: function () {
                    return this.layouter;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUInstance.prototype, "DataBinder", {
                /**
                  * Gets the data binder used in this SKU
                  * @returns {DataViz.Data.IDataBinder} The data binder instance
                  */
                get: function () {
                    return this.dataBinder;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUInstance.prototype, "DataConvertor", {
                /**
                  * Gets the data convertor used in this SKU
                  * @returns {DataViz.Data.IDataConvertor} The data convertor instance
                  */
                get: function () {
                    return this.dataConvertor;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUInstance.prototype, "Configurator", {
                /**
                  * The configurator used in the SKU
                  * @returns {DataViz.Config.IConfigurator} The configurator instance
                  */
                get: function () {
                    return this.configurator;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUInstance.prototype, "Visualizer", {
                /**
                  * Gets the visualizer in the SKU
                  * @returns {DataViz.Chart.Visualizer} The visualizer instance
                  */
                get: function () {
                    return this.visualizer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUInstance.prototype, "Controller", {
                /**
                  * Gets the controller in the SKU
                  * @returns {DataViz.Control.Controller} The controller instance
                  */
                get: function () {
                    return this.controller;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUInstance.prototype, "ThemeId", {
                /**
                  * Gets the id of the default theme of the SKU
                  * @returns {string} The id of the default theme
                  */
                get: function () {
                    return this.themeId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUInstance.prototype, "ShapeId", {
                /**
                  * Gets the id of the default shape of the SKU
                  * @returns {string} The id of the default shape
                  */
                get: function () {
                    return this.shapeId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUInstance.prototype, "LayoutId", {
                /**
                  * Gets the id of the default layout of the SKU
                  * @returns {string} The id of the default layout
                  */
                get: function () {
                    return this.layoutId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUInstance.prototype, "SampleData", {
                /**
                  * Gets the sample data of the SKU
                  * @returns {any} The sample data
                  */
                get: function () {
                    return this.sampleData;
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Resets the SKU (basically resets all the tools in the SKU)
              */
            SKUInstance.prototype.reset = function () {
                this.plotter.resetTool();
                this.layouter.resetTool();
                this.dataBinder.resetTool();
                this.dataConvertor.resetTool();
                this.visualizer.resetTool();
            };
            return SKUInstance;
        }());
        SKUs.SKUInstance = SKUInstance;
        /**
          * The SKU provider that takes care of the following tasks
          *  - Loads the pre-defined SKUs into memory
          *  - Returns all the loaded SKUs
          *  - Tracks (via listening to configuration changes) and returns the currently selected SKU
          */
        var SKUProvider = (function () {
            function SKUProvider() {
                this.currentSKUId = null;
            }
            Object.defineProperty(SKUProvider, "Instance", {
                get: function () {
                    if (!SKUProvider.theInstance) {
                        SKUProvider.theInstance = new SKUProvider;
                    }
                    return SKUProvider.theInstance;
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Loads all the pre-defined SKUs. This has to be called before calling any other methods of this class.
              * @param {SKUDefinition[]} preDefines The pre-defined SKU configurations
              * @param {() => any} callback The callback function that will be called after the loading is finished
              */
            SKUProvider.prototype.loadAll = function (preDefines, callback) {
                DataViz.Validate.Validator.ensures(callback).from("SKUProvider::loadAll").isNotNull();
                if (!this.definitions) {
                    this.definitions = preDefines;
                }
                callback();
            };
            Object.defineProperty(SKUProvider.prototype, "SKUs", {
                /**
                  * Gets (lazy loading) all the loaded SKUs.
                  * @returns {SKUDefinition[]} All the loaded SKUs
                  */
                get: function () {
                    DataViz.Validate.Validator.ensures(this.definitions).from("SKUProvider::SKUs").isNotNull();
                    return this.definitions;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUProvider.prototype, "Default", {
                /**
                  * Returns the default SKU
                  * @returns {SKUDefinition} The default SKU (normally the first SKU in the list)
                  */
                get: function () {
                    return this.SKUs[0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUProvider.prototype, "CurrentSKUId", {
                /**
                  * Returns the id of the current SKU
                  * @returns {string} The id of the current SKU
                  */
                get: function () {
                    return this.currentSKUId;
                },
                /**
                  * Sets the current SKU id
                  * @param {string} id The SKU id
                  */
                set: function (id) {
                    DataViz.Validate.Validator.ensures(id).from("SKUProvider::CurrentSKUId")
                        .isNotNull()
                        .isNotEmpty();
                    this.currentSKUId = id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUProvider.prototype, "CurrentSKU", {
                /**
                  * Returns the current SKU
                  * @returns {SKUDefinition} The current SKU (if at least one is selected) or the default SKU (if none is selected)
                  */
                get: function () {
                    return this.getSKUById(this.currentSKUId);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SKUProvider.prototype, "CurrentSKUInstance", {
                /**
                  * Returns the current SKU instance
                  * @returns {SKUInstance} The current SKU instance (if at least one is selected) or null (if none is selected)
                  */
                get: function () {
                    var definition = this.CurrentSKU;
                    return definition ? SKUInstance.fromDefinition(definition) : null;
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
              */
            SKUProvider.prototype.onConfigurationChanged = function (key, value) {
                DataViz.Validate.Validator.ensures(key).from("SKUProvider::onConfigurationChanged [key]")
                    .isNotNull()
                    .isNotEmpty();
                DataViz.Validate.Validator.ensures(value).from("SKUProvider::onConfigurationChanged [key]=" + key + " [value]")
                    .isNotNull();
                if (key === DataViz.Config.wellKnownKeys.sku) {
                    this.currentSKUId = value;
                }
            };
            SKUProvider.prototype.getSKUById = function (id) {
                var match = this.SKUs.filter(function (sku, index, array) {
                    return (sku.id === id);
                });
                return (match.length > 0) ? match[0] : this.Default;
            };
            SKUProvider.theInstance = null;
            SKUProvider.version = 2; // To force web browser reload cache, increase this if you are updating skus.js.
            return SKUProvider;
        }());
        SKUs.SKUProvider = SKUProvider;
    })(SKUs = DataViz.SKUs || (DataViz.SKUs = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="shared/data.ts"/>
///<reference path="shared/utils.ts"/>
///<reference path="shared/validate.ts"/>
/**
  * This module contains the implementation of the specific data binder of the app
  */
var Trends;
(function (Trends) {
    var Data;
    (function (Data) {
        var Agave;
        (function (Agave) {
            "use strict";
            /**
              * This is the specific data binder of the app
              */
            var DataBinder = (function () {
                function DataBinder() {
                    var _this = this;
                    this.isDataBound = false;
                    this.sendDataBindingTelemetry = false;
                    this.dataChangeListeners = [];
                    this.dataChangeHandler = function (eventArgs) {
                        _this.notifyDataChange();
                    };
                }
                /**
                  * Implementing {@link ITool#resetTool}
                  */
                DataBinder.prototype.resetTool = function () {
                    this.dataChangeListeners.length = 0;
                    this.detachHandler(this.bindingName);
                    this.isDataBound = false;
                };
                /**
                  * Implementing {@link IDataBinder#registerDataChangeListener}
                  */
                DataBinder.prototype.registerDataChangeListener = function (listener) {
                    if (this.dataChangeListeners.indexOf(listener) === -1) {
                        this.dataChangeListeners.push(listener);
                    }
                };
                /**
                  * Implementing {@link IDataBinder#unregisterDataChangeListener}
                  */
                DataBinder.prototype.unregisterDataChangeListener = function (listener) {
                    DataViz.Utils.removeItemFromArray(this.dataChangeListeners, listener);
                };
                /**
                  * Implementing {@link IDataBinder#bindByPrompt}
                  */
                DataBinder.prototype.bindByPrompt = function (callback) {
                    this.bind(true, callback);
                };
                /**
                  * Implementing {@link IDataBinder#bindBySelection}
                  */
                DataBinder.prototype.bindBySelection = function (callback) {
                    this.bind(false, callback);
                };
                /**
                  * Implementing {@link IDataBinder#Rebind}
                  */
                DataBinder.prototype.rebind = function (callback) {
                    var _this = this;
                    this.bindingName = DataViz.mainApp.Configuration.get(DataViz.Config.Trends.wellKnownKeys.bindingName);
                    if (!this.bindingName) {
                        if (callback) {
                            callback();
                        }
                        return;
                    }
                    Office.context.document.bindings.getByIdAsync(this.bindingName, function (result) {
                        if (result.status !== Office.AsyncResultStatus.Succeeded) {
                            if (callback) {
                                callback();
                            }
                            return;
                        }
                        if (DataViz.Utils.isOnWac()) {
                            _this.detachHandler(_this.bindingName);
                            _this.isDataBound = true;
                            _this.attachHandler(callback);
                        }
                        else {
                            _this.detachHandler(_this.bindingName, function () {
                                _this.isDataBound = true;
                                _this.attachHandler(callback);
                            });
                        }
                        ;
                    });
                };
                /**
                  * Implementing {@link IDataBinder#getSelectedData}
                  */
                DataBinder.prototype.getSelectedData = function (callback) {
                    Office.context.document.getSelectedDataAsync(Office.CoercionType.Matrix, { valueFormat: Office.ValueFormat.Formatted, filterType: Office.FilterType.OnlyVisible }, function (result) {
                        if (callback) {
                            callback(result.value);
                        }
                    });
                };
                /**
                  * Implementing {@link IDataBinder#IsBound}
                  */
                DataBinder.prototype.isBound = function () {
                    return this.isDataBound;
                };
                /**
                  * Implementing {@link IDataBinder#getData}
                  */
                DataBinder.prototype.getData = function (callback) {
                    var _this = this;
                    DataViz.Validate.Validator.ensures(callback).isNotNull();
                    var finalData = { hasHeader: false, formatted: null, unformatted: null };
                    var bindingName = "bindings#" + this.bindingName;
                    var selection = Office.select(bindingName, function (result) {
                        if (result.status !== Office.AsyncResultStatus.Succeeded) {
                            callback(null);
                        }
                    });
                    // get unformatted data first
                    selection.getDataAsync({ coercionType: Office.CoercionType.Matrix, valueFormat: Office.ValueFormat.Unformatted, filterType: Office.FilterType.OnlyVisible }, function (result) {
                        if (result.status === Office.AsyncResultStatus.Succeeded) {
                            finalData.unformatted = result.value;
                            finalData.hasHeader = _this.detectHeader(result.value);
                            // then get formatted data
                            selection.getDataAsync({ coercionType: Office.CoercionType.Matrix, valueFormat: Office.ValueFormat.Formatted, filterType: Office.FilterType.OnlyVisible }, function (result) {
                                if (result.status === Office.AsyncResultStatus.Succeeded) {
                                    finalData.formatted = result.value;
                                    callback(finalData);
                                    if (_this.sendDataBindingTelemetry) {
                                        _this.sendDataBindingTelemetry = false;
                                    }
                                }
                                else {
                                    callback(null);
                                }
                            });
                        }
                    });
                };
                /**
                  * Implementing {@link IDataBinder#unbind}
                  */
                DataBinder.prototype.unbind = function (callback) {
                    var _this = this;
                    if (!this.bindingName) {
                        if (callback) {
                            callback();
                        }
                        return;
                    }
                    if (DataViz.Utils.isOnWac()) {
                        this.detachHandler(this.bindingName);
                        Office.context.document.bindings.releaseByIdAsync(this.bindingName, function (releaseBindResult) {
                            _this.isDataBound = false;
                            if (callback) {
                                callback();
                            }
                        });
                    }
                    else {
                        this.detachHandler(this.bindingName, function () {
                            Office.context.document.bindings.releaseByIdAsync(_this.bindingName, function (releaseBindResult) {
                                _this.isDataBound = false;
                                if (callback) {
                                    callback();
                                }
                            });
                        });
                    }
                };
                DataBinder.prototype.bind = function (prompt, callback) {
                    this.sendDataBindingTelemetry = true;
                    this.bindInternal(prompt, callback);
                };
                DataBinder.prototype.getBindingName = function () {
                    return this.bindingName === DataViz.Data.DefaultBindingName ?
                        DataViz.Data.ExtraBindingName : DataViz.Data.DefaultBindingName;
                };
                DataBinder.prototype.bindInternal = function (prompt, callback) {
                    var _this = this;
                    var innerCallback = function (result) {
                        if (result.status !== Office.AsyncResultStatus.Succeeded) {
                            return;
                        }
                        _this.unbind(function () {
                            _this.bindingName = _this.getBindingName();
                            DataViz.mainApp.Configuration.set(DataViz.Config.Trends.wellKnownKeys.bindingName, _this.bindingName);
                            _this.isDataBound = true;
                            _this.attachHandler(function () {
                                _this.notifyBindingTargetChange();
                                if (callback) {
                                    callback(result);
                                }
                            });
                        });
                    };
                    if (prompt) {
                        Office.context.document.bindings.addFromPromptAsync(Office.BindingType.Matrix, { id: this.getBindingName() }, innerCallback);
                    }
                    else {
                        Office.context.document.bindings.addFromSelectionAsync(Office.BindingType.Matrix, { id: this.getBindingName() }, innerCallback);
                    }
                };
                DataBinder.prototype.attachHandler = function (callback) {
                    var _this = this;
                    Office.select("bindings#" + this.bindingName).addHandlerAsync(Office.EventType.BindingDataChanged, this.dataChangeHandler, function (result) {
                        if (result.status !== Office.AsyncResultStatus.Succeeded) {
                            return;
                        }
                        _this.notifyDataChange();
                        if (callback) {
                            callback();
                        }
                    });
                };
                DataBinder.prototype.detachHandler = function (bindingName, callback) {
                    Office.select("bindings#" + bindingName, callback) // this callback happens after binding failed, which results into an invalid bindingName, and then bind again.
                        .removeHandlerAsync(Office.EventType.BindingDataChanged, { handler: this.dataChangeHandler }, function (removeHandlerResult) {
                        if (callback) {
                            callback();
                        }
                    });
                };
                DataBinder.prototype.notifyDataChange = function () {
                    var self = this;
                    this.getData(function (data) {
                        if (!data) {
                            return;
                        }
                        self.dataChangeListeners.forEach(function (listener, index, array) {
                            listener.onDataChanged(data);
                        });
                    });
                };
                DataBinder.prototype.notifyBindingTargetChange = function () {
                    DataViz.Config.Trends.resetClickedPointIdArrays();
                    DataViz.Config.Trends.resetLineOrder();
                    DataViz.Config.Trends.resetLineDisplay();
                    DataViz.Config.Trends.resetLineTitleArray();
                    this.dataChangeListeners.forEach(function (listener, index, array) {
                        listener.onDataBindingTargetChanged();
                    });
                };
                DataBinder.prototype.detectHeader = function (data) {
                    DataViz.Validate.Validator.ensures(data).from("DataBinder::detectHeader").isNotNull();
                    var hasHeader = true;
                    for (var i = 1; i < data[0].length; i++) {
                        if (data[0][i] !== null && data[0][i] !== undefined) {
                            var stringData = data[0][i].toString();
                            if (stringData.length > 0 && $.isNumeric(stringData)) {
                                hasHeader = false;
                            }
                        }
                    }
                    return hasHeader;
                };
                return DataBinder;
            }());
            Agave.DataBinder = DataBinder;
        })(Agave = Data.Agave || (Data.Agave = {}));
    })(Data = Trends.Data || (Trends.Data = {}));
})(Trends || (Trends = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="shared/utils.ts"/>
///<reference path="shared/config.ts"/>
/**
  * This module contains the implementation of the app's specific configurator
  */
var DataViz;
(function (DataViz) {
    var Config;
    (function (Config) {
        var Trends;
        (function (Trends) {
            "use strict";
            /**
              * The configuration keys used in this app
              */
            Trends.wellKnownKeys = {
                title: "title",
                shortdes1Title: "shortdes1-title",
                shortdes1Descript: "shortdes1-descript",
                longdesTitle: "longdes-title",
                longdesDescript: "longdes-descript",
                firstRowContainerWidth: "first-row-container-width",
                firstRowContainerHeight: "first-row-container-height",
                titleWidth: "title-parent-width",
                titleHeight: "title-parent-height",
                lineChartWidth: "line-chart-width",
                lineChartHeight: "line-chart-height",
                legendWidth: "legend-width",
                legendHeight: "legend-height",
                secondRowContainerWidth: "second-row-container-width",
                shortdes1GroupWidth: "shortdes1-group-width",
                longdesGroupWidth: "longdes-group-width",
                clickedPointIdArray: "clicked-pointid-array",
                lineOrder: "line-order",
                lineDisplay: "line-display",
                lineTitleArray: "line-title-array",
                bindingName: "binding-name",
                windowWidth: "window-width",
                windowHeight: "window-height",
                isLegendEdited: "is-legend-edited",
            };
            // We can only render five lines at most
            Trends.MaxLineNumber = 5;
            // One "column" means the column on the line chart
            // For example, the first point of each line is inside one column,  the second point is inside another column.
            Trends.MaxColumnNumber = 50;
            // The dafault display language is set to en-US.
            Trends.Culture = "en-US";
            /**
              * Reset clickedPointIdArray
              */
            function resetClickedPointIdArrays() {
                DataViz.mainApp.Configuration.set(DataViz.Config.Trends.wellKnownKeys.clickedPointIdArray, []);
            }
            Trends.resetClickedPointIdArrays = resetClickedPointIdArrays;
            /**
              * Reset lineOrder
              */
            function resetLineOrder() {
                var tempLineOrder = [];
                for (var i = 0; i < Trends.MaxLineNumber; i++) {
                    tempLineOrder[i] = i;
                }
                DataViz.mainApp.Configuration.set(DataViz.Config.Trends.wellKnownKeys.lineOrder, tempLineOrder);
            }
            Trends.resetLineOrder = resetLineOrder;
            /**
              * Reset line display status
              */
            function resetLineDisplay() {
                var tempLineDisplay = [];
                for (var i = 0; i < Trends.MaxLineNumber; i++) {
                    tempLineDisplay[i] = true;
                }
                DataViz.mainApp.Configuration.set(DataViz.Config.Trends.wellKnownKeys.lineDisplay, tempLineDisplay);
            }
            Trends.resetLineDisplay = resetLineDisplay;
            /**
              * Reset line display status
              */
            function resetLineTitleArray() {
                var tempLineTitleArray = [];
                for (var i = 0; i < Trends.MaxLineNumber; i++) {
                    tempLineTitleArray[i] = DataViz.Utils.stringFormat(DataViz.Resources.UI.defaultLegendName, i + 1);
                }
                DataViz.mainApp.Configuration.set(DataViz.Config.Trends.wellKnownKeys.lineTitleArray, tempLineTitleArray);
                DataViz.mainApp.Configuration.set(DataViz.Config.Trends.wellKnownKeys.isLegendEdited, false);
            }
            Trends.resetLineTitleArray = resetLineTitleArray;
            /**
              * This is the sample data structure
              */
            var SampleText = (function () {
                function SampleText() {
                }
                return SampleText;
            }());
            var SampleDataFormat = (function () {
                function SampleDataFormat() {
                }
                return SampleDataFormat;
            }());
            var SampleDataProvider = (function () {
                function SampleDataProvider(jsonData) {
                    this.data = jsonData;
                    this.renderData = {};
                    this.renderData["hasHeader"] = true;
                    this.renderData["formatted"] = this.data.formatted;
                    this.renderData["unformatted"] = this.data.unformatted;
                }
                Object.defineProperty(SampleDataProvider.prototype, "LineTitles", {
                    get: function () {
                        return this.data.lineTitles;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SampleDataProvider.prototype, "RenderData", {
                    get: function () {
                        return this.renderData;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SampleDataProvider.prototype, "Title", {
                    get: function () {
                        return this.data.sampleText.title;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SampleDataProvider.prototype, "SubTitle", {
                    get: function () {
                        return this.data.sampleText.subTitle;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SampleDataProvider.prototype, "SubTitleDescript", {
                    get: function () {
                        return this.data.sampleText.subTitleDescript;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SampleDataProvider.prototype, "Shortdes1Title", {
                    get: function () {
                        return this.data.sampleText.shortdes1Title;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SampleDataProvider.prototype, "Shortdes1Descript", {
                    get: function () {
                        return this.data.sampleText.shortdes1Descript;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SampleDataProvider.prototype, "Shortdes2Title", {
                    get: function () {
                        return this.data.sampleText.shortdes2Title;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SampleDataProvider.prototype, "Shortdes2Descript", {
                    get: function () {
                        return this.data.sampleText.shortdes2Descript;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SampleDataProvider.prototype, "LongdesTitle", {
                    get: function () {
                        return this.data.sampleText.longdesTitle;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SampleDataProvider.prototype, "LongdesDescript", {
                    get: function () {
                        return this.data.sampleText.longdesDescript;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(SampleDataProvider.prototype, "DataPoints", {
                    get: function () {
                        return this.data.dataPoints;
                    },
                    enumerable: true,
                    configurable: true
                });
                return SampleDataProvider;
            }());
            Trends.SampleDataProvider = SampleDataProvider;
            /**
              * This is the specific configurator of the app
              */
            var Configurator = (function () {
                function Configurator() {
                    this.reentryFlag = false;
                }
                /**
                  * Implementing {@link ITool#resetTool}
                  */
                Configurator.prototype.resetTool = function () {
                    // Do nothing.
                };
                /**
                  * Implementing {@link IConfigurator#loadAll}
                  */
                Configurator.prototype.loadAll = function (configuration) {
                    if (!Office.context.document.settings) {
                        return;
                    }
                    configuration.clear();
                    this.reentryFlag = true;
                    configuration.Keys.forEach(function (key, index, array) {
                        var value = Office.context.document.settings.get(key);
                        if ((value !== null) && (value !== undefined)) {
                            configuration.set(key, value);
                        }
                    });
                    this.reentryFlag = false;
                };
                /**
                  * Implementing {@link IConfigurator#Save}
                  */
                Configurator.prototype.save = function (key, value) {
                    if (Office.context.document.settings) {
                        Office.context.document.settings.set(key, value);
                        Office.context.document.settings.saveAsync();
                    }
                };
                /**
                  * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
                  */
                Configurator.prototype.onConfigurationChanged = function (key, value) {
                    if (!this.reentryFlag) {
                        this.save(key, value);
                    }
                };
                return Configurator;
            }());
            Trends.Configurator = Configurator;
        })(Trends = Config.Trends || (Config.Trends = {}));
    })(Config = DataViz.Config || (DataViz.Config = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
var DataViz;
(function (DataViz) {
    var UX;
    (function (UX) {
        UX.infoColors = {
            red: "#a80f22",
            green: "#217346",
        };
        /**
          * This class is the Data Binding Dialog UI.
          */
        var BindingPane = (function () {
            /**
              * Constructor
              */
            function BindingPane() {
                var _this = this;
                this.zoomRatio = 1;
                $("body").append($("<div/>", { id: "binding-pane-dim", "class": "binding-dim-style" })).append($("<div/>", { id: "binding-pane", "class": "binding-pane-style" }).append($("<span/>", { id: "binding-pane-title-span", "class": "binding-pane-title-style" })).append($("<div/>", { id: "subtitle", "class": "binding-pane-subtitle-style" })).append($("<div/>", { id: "sample-data-pane", "class": "sample-data-pane-style" })).append($("<div/>", { id: "binding-pane-info-text", "class": "binding-pane-info-text-style" })).append($("<div/>", { id: "button-group", "class": "button-group" }).append($("<button/>", { id: "binding-pane-cancel", "class": "button button-white binding-pane-cancel" })).append($("<button/>", { id: "binding-pane-ok", "class": "button button-green binding-pane-ok" }))));
                this.bindingPaneDim = $("#binding-pane-dim");
                this.bindingPane = $("#binding-pane");
                this.titleSpan = $("#binding-pane-title-span");
                this.subtitle = $("#subtitle");
                this.sampleDataPane = $("#sample-data-pane");
                this.infoText = $("#binding-pane-info-text");
                this.buttonGroup = $("#button-group");
                this.buttonCancel = $("#binding-pane-cancel");
                this.buttonOk = $("#binding-pane-ok");
                this.resizeHandler = function () {
                    _this.resetPaneContentPosition();
                };
                DataViz.Utils.setTabFocus("binding-pane-content", "binding-pane-cancel", "binding-pane-cancel");
                this.args = {};
            }
            /**
              * Use new arguments to update the Data Binding UI and its event handlers.
              * @param {BindingPaneArgs} args The arguments used to update the binding pane
              */
            BindingPane.prototype.updateBindingPane = function (args) {
                if (args) {
                    this.updateArgs(args);
                    this.handleArgs();
                }
                this.zoomBindingPane();
                return this;
            };
            BindingPane.prototype.zoomBindingPane = function () {
                this.zoomRatio = DataViz.Utils.getZoomRatioForApp();
                this.bindingPaneElementsStyle = {};
                this.handleStyleInHDPI("bindingPane", ["binding-pane-style"]),
                    this.handleStyleInHDPI("title", ["binding-pane-title-style"]),
                    this.handleStyleInHDPI("subtitle", ["binding-pane-subtitle-style"]),
                    this.handleStyleInHDPI("sampleDataPane", ["sample-data-pane-style"]),
                    this.handleStyleInHDPI("infoText", ["binding-pane-info-text-style"]),
                    this.handleStyleInHDPI("buttonGroup", ["button-group"]),
                    this.handleStyleInHDPI("cancel", ["button", "binding-pane-cancel"]),
                    this.handleStyleInHDPI("ok", ["button", "binding-pane-ok"]),
                    this.handleStyleInHDPI("td", ["td"]),
                    this.bindingPane.css(this.bindingPaneElementsStyle.bindingPane);
                this.titleSpan.css(this.bindingPaneElementsStyle.title);
                this.subtitle.css(this.bindingPaneElementsStyle.subtitle);
                this.sampleDataPane.css(this.bindingPaneElementsStyle.sampleDataPane);
                this.infoText.css(this.bindingPaneElementsStyle.infoText);
                this.buttonGroup.css(this.bindingPaneElementsStyle.buttonGroup);
                this.buttonCancel.css(this.bindingPaneElementsStyle.cancel);
                this.buttonOk.css(this.bindingPaneElementsStyle.ok);
                if (this.td[0]) {
                    this.td.css(this.bindingPaneElementsStyle.td);
                }
                return this;
            };
            /**
              * Show the Data Binding UI.
              */
            BindingPane.prototype.show = function () {
                var _this = this;
                this.bindingData = null;
                $(window).on("resize", this.resizeHandler);
                this.bindingPaneDim.fadeIn("fast");
                this.buttonOk.attr("disabled", "disabled");
                if (this.selectionChangeHandler) {
                    this.selectionChangeHandler();
                    Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged, this.selectionChangeHandler);
                }
                this.resetPaneContentPosition();
                this.bindingPane.fadeIn("fast", function () {
                    _this.buttonCancel.focus();
                });
            };
            /**
              * Hide the Data Binding UI.
              */
            BindingPane.prototype.hide = function () {
                $(window).off("resize", this.resizeHandler);
                if (this.selectionChangeHandler) {
                    Office.context.document.removeHandlerAsync(Office.EventType.DocumentSelectionChanged, { handler: this.selectionChangeHandler });
                }
                this.bindingPane.fadeOut("fast");
                this.bindingPaneDim.fadeOut("fast");
            };
            /**
              * Identify whether the string is numeric
              * @param {string} str The string need to be identified
              * @returns True if the string is numeric; false otherwise
              */
            BindingPane.prototype.setInfoTextAndButton = function (text, textColor, buttonEnable) {
                this.infoText.text(text);
                this.infoText.css("color", textColor);
                if (buttonEnable) {
                    DataViz.Utils.setTabFocus("binding-pane", "binding-pane-cancel", "binding-pane-ok");
                    if (this.buttonOk.attr("disabled")) {
                        this.buttonOk.removeAttr("disabled");
                    }
                }
                else {
                    DataViz.Utils.setTabFocus("binding-pane", "binding-pane-cancel", "binding-pane-cancel");
                    if (!this.buttonOk.attr("disabled")) {
                        this.buttonOk.attr("disabled", "disabled");
                    }
                }
            };
            Object.defineProperty(BindingPane.prototype, "bindingData", {
                get: function () {
                    return this.selectedData;
                },
                set: function (data) {
                    this.selectedData = data;
                },
                enumerable: true,
                configurable: true
            });
            BindingPane.prototype.handleDataSelection = function () {
                // Implemented in sub-classes
            };
            BindingPane.prototype.updateArgs = function (args) {
                this.args.sampleData = args.sampleData ? args.sampleData : BindingPane.defaultArgs.sampleData;
                this.args.handleDataSelection = args.handleDataSelection ? args.handleDataSelection : BindingPane.defaultArgs.handleDataSelection;
                this.args.buttonOKCallback = args.buttonOKCallback ? args.buttonOKCallback : BindingPane.defaultArgs.buttonOKCallback;
                this.args.buttonCancelCallback = args.buttonCancelCallback ? args.buttonCancelCallback : BindingPane.defaultArgs.buttonCancelCallback;
                this.args.title = args.title ? args.title : BindingPane.defaultArgs.title;
                this.args.subtitle = args.subtitle ? args.subtitle : BindingPane.defaultArgs.subtitle;
                this.args.infoText = args.infoText ? args.infoText : BindingPane.defaultArgs.infoText;
                this.args.buttonOKText = args.buttonOKText ? args.buttonOKText : BindingPane.defaultArgs.buttonOKText;
                this.args.buttonCancelText = args.buttonCancelText ? args.buttonCancelText : BindingPane.defaultArgs.buttonCancelText;
            };
            BindingPane.prototype.handleArgs = function () {
                var _this = this;
                this.setSampleData(this.args.sampleData);
                this.titleSpan.text(this.args.title);
                this.subtitle.text(this.args.subtitle);
                this.infoText.text(this.args.infoText);
                this.buttonOk.text(this.args.buttonOKText);
                this.buttonCancel.text(this.args.buttonCancelText);
                if (this.args.handleDataSelection) {
                    this.selectionChangeHandler = function () {
                        _this.args.handleDataSelection();
                    };
                }
                else {
                    this.selectionChangeHandler = null;
                }
                this.setEventHandler(this.args.buttonOKCallback, this.args.buttonCancelCallback);
            };
            BindingPane.prototype.setEventHandler = function (funcOK, funcCancel) {
                var _this = this;
                this.buttonOk.off("click");
                this.buttonOk.click(function () {
                    _this.hide();
                    if (funcOK) {
                        funcOK(_this.bindingData);
                    }
                });
                this.buttonCancel.off("click");
                this.buttonCancel.click(function () {
                    _this.hide();
                });
            };
            BindingPane.prototype.setSampleData = function (sampleData) {
                if ($("#sample-table")[0]) {
                    $("#sample-table").remove();
                }
                if (sampleData) {
                    this.sampleDataPane.append($("<table/>", { id: "sample-table" }));
                    var rowNumber = Math.min(sampleData.length, BindingPane.sampleDataMaxRowNumber);
                    for (var i = 0; i < rowNumber; i++) {
                        $("<tr/>", { id: "tr" + i }).appendTo("#sample-table");
                        for (var j = 0; j < sampleData[0].length; j++) {
                            $("<td/>", { text: sampleData[i][j] }).appendTo("#tr" + i);
                        }
                    }
                    this.td = $("td");
                }
            };
            BindingPane.prototype.resetPaneContentPosition = function () {
                this.zoomBindingPane();
                this.bindingPane.css("top", (window.innerHeight - this.bindingPane.height()) / 2);
            };
            BindingPane.prototype.handleStyleInHDPI = function (elementId, classNameArray) {
                if (!classNameArray) {
                    return;
                }
                var elementStyle = {};
                for (var i = 0; i < classNameArray.length; i++) {
                    var styleArray = BindingPane.bindingPaneStyle[classNameArray[i]];
                    if (!styleArray || !styleArray[0]) {
                        return;
                    }
                    for (var j = 0; j < styleArray.length; j++) {
                        if (styleArray[j] && styleArray[j][0] && styleArray[j][1]) {
                            elementStyle[styleArray[j][0]] = (parseFloat(styleArray[j][1]) / this.zoomRatio).toFixed(2) + "px";
                        }
                    }
                    this.bindingPaneElementsStyle[elementId] = elementStyle;
                }
            };
            BindingPane.bindingPaneStyle = {
                "binding-pane-style": [["min-width", "400"]],
                "binding-pane-title-style": [["top", "17"], ["margin-left", "30"], ["font-size", "20"]],
                "binding-pane-subtitle-style": [["margin-top", "38"], ["margin-left", "30"], ["font-size", "12"]],
                "sample-data-pane-style": [["margin-top", "15"], ["margin-left", "30"], ["min-width", "180"]],
                "binding-pane-info-text-style": [["margin-top", "20"], ["margin-left", "30"], ["font-size", "12"], ["line-height", "12"]],
                "button-group": [["height", "30"], ["margin-top", "20"], ["margin-bottom", "20"]],
                "button": [["font-size", "14"], ["min-width", "80"], ["max-width", "200"], ["height", "30"], ["padding-left", "20"], ["padding-right", "20"], ["line-height", "14"]],
                "binding-pane-cancel": [["margin-right", "20"]],
                "binding-pane-ok": [["margin-right", "10"]],
                "td": [["font-size", "12"], ["height", "18"], ["padding-left", "10"], ["padding-right", "10"]],
            };
            BindingPane.sampleDataMaxRowNumber = 5;
            BindingPane.defaultArgs = {
                sampleData: null,
                handleDataSelection: null,
                buttonOKCallback: null,
                buttonCancelCallback: null,
                title: "Select your data to create a chart",
                subtitle: "SAMPLE DATA",
                infoText: "",
                buttonOKText: "Create",
                buttonCancelText: "Cancel",
            };
            return BindingPane;
        }());
        UX.BindingPane = BindingPane;
    })(UX = DataViz.UX || (DataViz.UX = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
var DataViz;
(function (DataViz) {
    var Resources;
    (function (Resources) {
        "use strict";
        var UI = (function () {
            function UI() {
            }
            Object.defineProperty(UI, "backButtonTitle", {
                get: function () {
                    return ScriptsResources.BackButtonTitle;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UI, "floatMenuDataTitle", {
                get: function () {
                    return ScriptsResources.FloatMenuDataTitle;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UI, "floatMenuSettingTitle", {
                get: function () {
                    return ScriptsResources.FloatMenuSettingTitle;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UI, "defaultLegendName", {
                get: function () {
                    return ScriptsResources.DefaultLegendName;
                },
                enumerable: true,
                configurable: true
            });
            return UI;
        }());
        Resources.UI = UI;
        var DataPane = (function () {
            function DataPane() {
            }
            Object.defineProperty(DataPane, "header", {
                get: function () {
                    return ScriptsResources.DataPaneHeader;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataPane, "selectButtonText", {
                get: function () {
                    return ScriptsResources.DataPaneSelectButton;
                },
                enumerable: true,
                configurable: true
            });
            return DataPane;
        }());
        Resources.DataPane = DataPane;
        var SettingPane = (function () {
            function SettingPane() {
            }
            Object.defineProperty(SettingPane, "header", {
                get: function () {
                    return ScriptsResources.SettingPaneHeader;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SettingPane, "themeTab", {
                get: function () {
                    return ScriptsResources.SettingPaneThemeTab;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SettingPane, "themeTitles", {
                get: function () {
                    return [
                        ScriptsResources.SettingPaneThemeTitle1,
                        ScriptsResources.SettingPaneThemeTitle2,
                        ScriptsResources.SettingPaneThemeTitle3,
                        ScriptsResources.SettingPaneThemeTitle4,
                        ScriptsResources.SettingPaneThemeTitle5,
                        ScriptsResources.SettingPaneThemeTitle6,
                    ];
                },
                enumerable: true,
                configurable: true
            });
            return SettingPane;
        }());
        Resources.SettingPane = SettingPane;
        var SampleData = (function () {
            function SampleData() {
            }
            Object.defineProperty(SampleData, "title", {
                get: function () {
                    return ScriptsResources.SampleDataTitle;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "shortDescriptionTitle", {
                get: function () {
                    return ScriptsResources.SampleDataShortDescriptionTitle;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "shortDescription", {
                get: function () {
                    return ScriptsResources.SampleDataShortDescription;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "longDescriptionTitle", {
                get: function () {
                    return ScriptsResources.SampleDataLongDescriptionTitle;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "longDescription", {
                get: function () {
                    return ScriptsResources.SampleDataLongDescription;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "legend1", {
                get: function () {
                    return ScriptsResources.SampleDataLegend1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "legend2", {
                get: function () {
                    return ScriptsResources.SampleDataLegend2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "time1", {
                get: function () {
                    return ScriptsResources.SampleDataTime1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "time2", {
                get: function () {
                    return ScriptsResources.SampleDataTime2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "time3", {
                get: function () {
                    return ScriptsResources.SampleDataTime3;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "time4", {
                get: function () {
                    return ScriptsResources.SampleDataTime4;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "time5", {
                get: function () {
                    return ScriptsResources.SampleDataTime5;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "time6", {
                get: function () {
                    return ScriptsResources.SampleDataTime6;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "time7", {
                get: function () {
                    return ScriptsResources.SampleDataTime7;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "time8", {
                get: function () {
                    return ScriptsResources.SampleDataTime8;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SampleData, "time9", {
                get: function () {
                    return ScriptsResources.SampleDataTime9;
                },
                enumerable: true,
                configurable: true
            });
            return SampleData;
        }());
        Resources.SampleData = SampleData;
        var Pluralization = (function () {
            function Pluralization() {
            }
            Object.defineProperty(Pluralization, "rows", {
                get: function () {
                    return ScriptsResources.PluralizationRows;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Pluralization, "columns", {
                get: function () {
                    return ScriptsResources.PluralizationColumns;
                },
                enumerable: true,
                configurable: true
            });
            return Pluralization;
        }());
        Resources.Pluralization = Pluralization;
        var BindingPane = (function () {
            function BindingPane() {
            }
            Object.defineProperty(BindingPane, "infoNormal", {
                get: function () {
                    return ScriptsResources.BindingPaneInfoNormal;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "infoMaxRow", {
                get: function () {
                    return ScriptsResources.BindingPaneInfoMaxRow;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "infoMaxColumn", {
                get: function () {
                    return ScriptsResources.BindingPaneInfoMaxColumn;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "infoMaxRowAndColumn", {
                get: function () {
                    return ScriptsResources.BindingPaneInfoMaxRowAndColumn;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "infoDataSetTooLarge", {
                get: function () {
                    return ScriptsResources.BindingPaneInfoDataSetTooLarge;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "infoFirstRowEmpty", {
                get: function () {
                    return ScriptsResources.BindingPaneInfoFirstRowEmpty;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "infoFirstColumnEmpty", {
                get: function () {
                    return ScriptsResources.BindingPaneInfoFirstColumnEmpty;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "infoSelectData", {
                get: function () {
                    return ScriptsResources.BindingPaneInfoSelectData;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "infoSelectTwoColumns", {
                get: function () {
                    return ScriptsResources.BindingPaneInfoSelectTwoColumns;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "infoSecondColumnContainNumber", {
                get: function () {
                    return ScriptsResources.BindingPaneInfoSecondColumnContainNumber;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "title", {
                get: function () {
                    return ScriptsResources.BindingPaneTitle;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "subtitle", {
                get: function () {
                    return ScriptsResources.BindingPaneSubtitle;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "buttonOKText", {
                get: function () {
                    return ScriptsResources.BindingPaneButtonOK;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "buttonCancelText", {
                get: function () {
                    return ScriptsResources.BindingPaneButtonCancel;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "sampleDataHeader1", {
                get: function () {
                    return ScriptsResources.BindingPaneSampleDataHeader1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "sampleDataHeader2", {
                get: function () {
                    return ScriptsResources.BindingPaneSampleDataHeader2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "sampleDataHeader3", {
                get: function () {
                    return ScriptsResources.BindingPaneSampleDataHeader3;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "sampleDataTime1", {
                get: function () {
                    return ScriptsResources.BindingPaneSampleDataTime1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "sampleDataTime2", {
                get: function () {
                    return ScriptsResources.BindingPaneSampleDataTime2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BindingPane, "sampleDataTime3", {
                get: function () {
                    return ScriptsResources.BindingPaneSampleDataTime3;
                },
                enumerable: true,
                configurable: true
            });
            return BindingPane;
        }());
        Resources.BindingPane = BindingPane;
    })(Resources = DataViz.Resources || (DataViz.Resources = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="shared/BindingPane.ts"/>
///<reference path="../logic/configurator.agave.ts"/>
///<reference path="../strings/stringadapter.ts"/>
var DataViz;
(function (DataViz) {
    var UX;
    (function (UX) {
        var BindingPaneSpecific = (function (_super) {
            __extends(BindingPaneSpecific, _super);
            function BindingPaneSpecific() {
                _super.apply(this, arguments);
            }
            /**
              * Get the singleton instance.
              */
            BindingPaneSpecific.getInstance = function () {
                if (!BindingPaneSpecific.instance) {
                    BindingPaneSpecific.instance = new BindingPaneSpecific();
                }
                return BindingPaneSpecific.instance;
            };
            BindingPaneSpecific.prototype.handleDataSelection = function () {
                var _this = this;
                Office.context.document.getSelectedDataAsync(Office.CoercionType.Matrix, { valueFormat: Office.ValueFormat.Unformatted, filterType: Office.FilterType.OnlyVisible }, function (result) {
                    if (result.status === Office.AsyncResultStatus.Succeeded) {
                        _this.bindingData = result.value;
                        if (result.value[0].length < 2) {
                            _this.setInfoTextAndButton(DataViz.Resources.BindingPane.infoSelectTwoColumns, DataViz.UX.infoColors.red, false);
                        }
                        else if (!_this.isFirstColumnNonEmpty(result.value)) {
                            _this.setInfoTextAndButton(DataViz.Resources.BindingPane.infoFirstColumnEmpty, DataViz.UX.infoColors.red, false);
                        }
                        else if (!_this.isSecondColumnHasNumber(result.value)) {
                            _this.setInfoTextAndButton(DataViz.Resources.BindingPane.infoSecondColumnContainNumber, DataViz.UX.infoColors.red, false);
                        }
                        else if (!_this.isFirstRowNonEmpty(result.value)) {
                            _this.setInfoTextAndButton(DataViz.Resources.BindingPane.infoFirstRowEmpty, DataViz.UX.infoColors.red, false);
                        }
                        else {
                            var rowCount = result.value.length;
                            var columnCount = result.value[0].length;
                            var culture = DataViz.Config.Trends.Culture;
                            var rowString = _this.getPluralString(DataViz.Resources.Pluralization.rows, rowCount);
                            var columnString = _this.getPluralString(DataViz.Resources.Pluralization.columns, columnCount);
                            var maxRowNumber = DataViz.Config.Trends.MaxColumnNumber;
                            var maxColumnNumber = DataViz.Config.Trends.MaxLineNumber + 1;
                            var maxRowString = _this.getPluralString(DataViz.Resources.Pluralization.rows, maxRowNumber);
                            var maxColumnString = _this.getPluralString(DataViz.Resources.Pluralization.columns, maxColumnNumber);
                            var infoString = "";
                            if (rowCount > maxRowNumber && columnCount > maxColumnNumber) {
                                infoString = DataViz.Utils.stringFormat(DataViz.Resources.BindingPane.infoMaxRowAndColumn, rowCount, rowString, columnCount, columnString, maxRowNumber, maxRowString, maxColumnNumber, maxColumnString);
                            }
                            else if (rowCount > maxRowNumber && columnCount <= maxColumnNumber) {
                                infoString = DataViz.Utils.stringFormat(DataViz.Resources.BindingPane.infoMaxRow, rowCount, rowString, columnCount, columnString, maxRowNumber, maxRowString);
                            }
                            else if (rowCount <= maxRowNumber && columnCount > maxColumnNumber) {
                                infoString = DataViz.Utils.stringFormat(DataViz.Resources.BindingPane.infoMaxColumn, rowCount, rowString, columnCount, columnString, maxColumnNumber, maxColumnString);
                            }
                            else {
                                infoString = DataViz.Utils.stringFormat(DataViz.Resources.BindingPane.infoNormal, rowCount, rowString, columnCount, columnString);
                            }
                            _this.setInfoTextAndButton(infoString, DataViz.UX.infoColors.green, true);
                        }
                    }
                    else if (result.error.code === 1008) {
                        _this.setInfoTextAndButton(DataViz.Resources.BindingPane.infoDataSetTooLarge, DataViz.UX.infoColors.red, false);
                    }
                    else {
                        _this.setInfoTextAndButton(DataViz.Resources.BindingPane.infoSelectData, DataViz.UX.infoColors.red, false);
                    }
                });
            };
            BindingPaneSpecific.prototype.isFirstColumnNonEmpty = function (value) {
                if (!value) {
                    return false;
                }
                for (var i = 0; i < value.length; i++) {
                    if (value[i] && this.isDataValid(value[i][0])) {
                        return true;
                    }
                }
                return false;
            };
            BindingPaneSpecific.prototype.isSecondColumnHasNumber = function (value) {
                if (!value) {
                    return false;
                }
                for (var i = 0; i < value.length; i++) {
                    if (value[i] && this.isDataValid(value[i][1]) && !isNaN(parseFloat(value[i][1]))) {
                        return true;
                    }
                }
                return false;
            };
            BindingPaneSpecific.prototype.isFirstRowNonEmpty = function (value) {
                if (!value || !value[0]) {
                    return false;
                }
                for (var i = 0; i < value[0].length; i++) {
                    if (this.isDataValid(value[0][i])) {
                        return true;
                    }
                }
                return false;
            };
            BindingPaneSpecific.prototype.isDataValid = function (data) {
                return (data !== null) && (data !== undefined) && (data.toString().trim() !== "");
            };
            //This method is for en-us culture only.
            BindingPaneSpecific.prototype.getPluralString = function (combinedStr, count) {
                var pluralStringArray = combinedStr.split("||");
                if (pluralStringArray.length !== 2) {
                    throw "Error: Provided string variations do not match expected amount";
                }
                return count === 1 ? pluralStringArray[0] : pluralStringArray[1];
            };
            return BindingPaneSpecific;
        }(UX.BindingPane));
        UX.BindingPaneSpecific = BindingPaneSpecific;
    })(UX = DataViz.UX || (DataViz.UX = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="../../logic/shared/config.ts"/>
///<reference path="../../logic/shared/skus.ts"/>
///<reference path="../../logic/shared/decoration.ts"/>
///<reference path="../../app.ts"/>
/**
  * This modules contains the implementation of the galleries
  */
var DataViz;
(function (DataViz) {
    var UX;
    (function (UX) {
        var Shared;
        (function (Shared) {
            /**
              * The base class of all the gallery classes
              */
            var BaseGallery = (function () {
                function BaseGallery(parentId, iconStyle, configurationKey) {
                    this.parentId = parentId;
                    this.iconStyle = iconStyle;
                    this.configurationKey = configurationKey;
                    this.reentryFlag = false;
                }
                /**
                  * Sets up the listeners
                  */
                BaseGallery.prototype.setupListener = function () {
                    DataViz.mainApp.Configuration.registerListener(this);
                };
                /**
                  * Populates the gallery
                  */
                BaseGallery.prototype.populate = function (iconNames) {
                    this.refreshList();
                    var currentWidth = 0;
                    var marginTopFromParent = this.iconStyle.marginTop;
                    $("#" + this.parentId + " > img").remove();
                    for (var index = 0; index < this.icons.length; index++) {
                        var nextWidth = currentWidth + this.iconStyle.marginLeft + this.iconStyle.width;
                        if (nextWidth > 210) {
                            if (currentWidth > 0) {
                                currentWidth = 0;
                                nextWidth = currentWidth + this.iconStyle.marginLeft + this.iconStyle.width;
                                marginTopFromParent = marginTopFromParent + this.iconStyle.marginTop + this.iconStyle.height;
                            }
                        }
                        var marginLeftFromParent = currentWidth + this.iconStyle.marginLeft;
                        $("#" + this.parentId).append("<img id=" + this.icons[index].id + " src=" + this.icons[index].thumbnail
                            + " style= 'width:" + this.iconStyle.width + "px; height:" + this.iconStyle.height + "px; margin-left:"
                            + marginLeftFromParent + "px; margin-top:" + marginTopFromParent + "px; cursor: pointer; position:absolute'; class ='gallery-item';"
                            + "alt='" + iconNames[index] + "' title='" + iconNames[index] + "' tabindex='1';/>");
                        currentWidth = nextWidth;
                        this.setIconClickListener(this.icons[index].id, index);
                    }
                    this.updatePaneBorder(this.currentIconId);
                };
                /**
                  * Refreshes the list of the backed customizable items
                  * This ought to be "protected" but unfortunately TypeScript doesn't support "protected" members when the source code is published.
                 */
                BaseGallery.prototype.refreshList = function () {
                    // Implement in sub-classes
                };
                /**
                  * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
                  */
                BaseGallery.prototype.onConfigurationChanged = function (key, value) {
                    if ((key === this.configurationKey) && !this.reentryFlag) {
                        this.currentIconId = value;
                    }
                };
                BaseGallery.prototype.updatePaneBorder = function (iconId) {
                    for (var index = 0; index < this.icons.length; index++) {
                        if (this.icons[index].id === iconId) {
                            $("#" + this.icons[index].id).removeClass("gallery-item");
                            $("#" + this.icons[index].id).addClass("gallery-item-click");
                        }
                        else {
                            $("#" + this.icons[index].id).removeClass("gallery-item-click");
                            $("#" + this.icons[index].id).addClass("gallery-item");
                        }
                    }
                };
                BaseGallery.prototype.setIconClickListener = function (iconId, index) {
                    var _this = this;
                    $("#" + iconId).off("click");
                    $("#" + iconId)
                        .data("iconIndex", index)
                        .click(function (event) {
                        _this.iconClickAction(event, index);
                    })
                        .keydown(function (event) {
                        if (event.which === 13) {
                            _this.iconClickAction(event, index);
                        } // Check the enter key.
                        // Todo: We should have a keymap in the common code.
                    });
                };
                BaseGallery.prototype.iconClickAction = function (event, index) {
                    var iconIndex = $(event.target).data("iconIndex");
                    var iconId = this.icons[iconIndex].id;
                    this.updatePaneBorder(iconId);
                    this.apply(iconId);
                };
                BaseGallery.prototype.apply = function (iconId) {
                    this.reentryFlag = true;
                    DataViz.mainApp.Configuration.set(this.configurationKey, iconId);
                    this.reentryFlag = false;
                };
                return BaseGallery;
            }());
            Shared.BaseGallery = BaseGallery;
            /**
              * The theme gallery
              */
            var ThemeGallery = (function (_super) {
                __extends(ThemeGallery, _super);
                /* private */ function ThemeGallery(parentId, iconStyle, configurationKey) {
                    _super.call(this, parentId, iconStyle, configurationKey);
                }
                /**
                  * Builds and returns a theme gallery instance
                  * @returns {ThemeGallery} A theme gallery instance
                  */
                ThemeGallery.build = function () {
                    return new ThemeGallery("theme-pane", { marginLeft: 10, marginTop: 10, width: 90, height: 40 }, DataViz.Config.wellKnownKeys.theme);
                };
                /**
                  * Overriding {@link BaseGallery#refreshList}
                  */
                ThemeGallery.prototype.refreshList = function () {
                    this.icons = DataViz.Decoration.ThemeProvider.Instance.enumerateForSku(DataViz.SKUs.SKUProvider.Instance.CurrentSKUId);
                    this.currentIconId = DataViz.Decoration.ThemeProvider.Instance.CurrentThemeId;
                };
                return ThemeGallery;
            }(UX.Shared.BaseGallery));
            Shared.ThemeGallery = ThemeGallery;
            /**
              * The shape gallery
              */
            var ShapeGallery = (function (_super) {
                __extends(ShapeGallery, _super);
                /* private */ function ShapeGallery(parentId, iconStyle, configurationKey) {
                    _super.call(this, parentId, iconStyle, configurationKey);
                }
                /**
                  * Builds and returns a shape gallery instance
                  * @returns {ShapeGallery} A shape gallery instance
                  */
                ShapeGallery.build = function () {
                    return new ShapeGallery("shape-pane", { marginLeft: 10, marginTop: 10, width: 40, height: 40 }, DataViz.Config.wellKnownKeys.shape);
                };
                /**
                  * Overriding {@link BaseGallery#refreshList}
                  */
                ShapeGallery.prototype.refreshList = function () {
                    this.icons = DataViz.Decoration.ShapeProvider.Instance.enumerateForSku(DataViz.SKUs.SKUProvider.Instance.CurrentSKUId);
                    this.currentIconId = DataViz.Decoration.ShapeProvider.Instance.CurrentShapeId;
                };
                return ShapeGallery;
            }(UX.Shared.BaseGallery));
            Shared.ShapeGallery = ShapeGallery;
            /**
              * The chart type (SKU) gallery
              */
            var TypeGallery = (function (_super) {
                __extends(TypeGallery, _super);
                /* private */ function TypeGallery(parentId, iconStyle, configurationKey) {
                    _super.call(this, parentId, iconStyle, configurationKey);
                }
                /**
                  * Builds and returns a chart type (SKU) gallery instance
                  * @returns {TypeGallery} A chart type gallery instance
                  */
                TypeGallery.build = function () {
                    return new TypeGallery("type-pane", { marginLeft: 10, marginTop: 10, width: 190, height: 80 }, DataViz.Config.wellKnownKeys.sku);
                };
                /**
                  * Overriding {@link BaseGallery#refreshList}
                  */
                TypeGallery.prototype.refreshList = function () {
                    this.icons = DataViz.SKUs.SKUProvider.Instance.SKUs;
                    this.currentIconId = DataViz.SKUs.SKUProvider.Instance.CurrentSKUId;
                };
                return TypeGallery;
            }(UX.Shared.BaseGallery));
            Shared.TypeGallery = TypeGallery;
        })(Shared = UX.Shared || (UX.Shared = {}));
    })(UX = DataViz.UX || (DataViz.UX = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="../app.ts"/>
///<reference path="shared/Galleries.ts"/>
var DataViz;
(function (DataViz) {
    var UX;
    (function (UX) {
        var SettingPane = (function () {
            function SettingPane() {
                var _this = this;
                this.menuButtonMap = [
                    { buttonId: "theme-button", paneId: "theme-pane" },
                ];
                $("#setting-pane-title").text(DataViz.Resources.SettingPane.header);
                $("#theme-button").text(DataViz.Resources.SettingPane.themeTab);
                $("#setting-pane").off("click");
                $("#setting-pane").click(function () {
                    $("#" + DataViz.mainApp.Configuration.get(DataViz.Config.wellKnownKeys.theme)).focus();
                });
                var backButton = $("#setting-back-button");
                backButton.attr("alt", DataViz.Resources.UI.backButtonTitle);
                backButton.attr("title", DataViz.Resources.UI.backButtonTitle);
                backButton.off("click");
                backButton.click(function () {
                    _this.hide();
                }).keydown(function (event) {
                    if (event.which === 13) {
                        _this.hide();
                    } // Check the enter key.
                });
                this.themeGallery = UX.Shared.ThemeGallery.build();
                this.setMenuClickListener();
                this.showInternalPane("theme-pane");
            }
            SettingPane.prototype.setupListeners = function () {
                this.themeGallery.setupListener();
            };
            Object.defineProperty(SettingPane, "Instance", {
                get: function () {
                    if (!SettingPane.theInstance) {
                        SettingPane.theInstance = new SettingPane();
                    }
                    return SettingPane.theInstance;
                },
                enumerable: true,
                configurable: true
            });
            SettingPane.prototype.show = function () {
                $("#setting-pane").show();
                $("#setting-pane").animate({ width: "220px", height: "100%", float: "right" }, "fast");
                $("#" + DataViz.mainApp.Configuration.get(DataViz.Config.wellKnownKeys.theme)).focus();
            };
            SettingPane.prototype.hide = function () {
                if ($("#setting-pane")[0].style.width > "0 px") {
                    $("#setting-pane").animate({ width: "0px", height: "100%", float: "right" }, "fast", null, function () { $("#setting-pane").hide(); });
                }
            };
            SettingPane.prototype.populate = function () {
                this.themeGallery.populate(DataViz.Resources.SettingPane.themeTitles);
            };
            SettingPane.prototype.setMenuClickListener = function () {
                var _this = this;
                for (var index = 0; index < this.menuButtonMap.length; index++) {
                    $("#" + this.menuButtonMap[index].buttonId).off("click");
                    $("#" + this.menuButtonMap[index].buttonId)
                        .data("menuButtonIndex", index)
                        .click(function (event) {
                        _this.menuClickAction(event);
                    })
                        .keydown(function (event) {
                        if (event.which === 13) {
                            _this.menuClickAction(event);
                        } // Check the enter key.
                    });
                }
            };
            SettingPane.prototype.menuClickAction = function (event) {
                var menuButtonIndex = $(event.target).data("menuButtonIndex");
                this.showInternalPane(this.menuButtonMap[menuButtonIndex].paneId);
            };
            SettingPane.prototype.showInternalPane = function (paneId) {
                for (var index = 0; index < this.menuButtonMap.length; index++) {
                    if (this.menuButtonMap[index].paneId === paneId) {
                        $("#" + this.menuButtonMap[index].paneId).show();
                        $("#" + this.menuButtonMap[index].buttonId).addClass("setting-tab-click");
                        SettingPane.currentButtonId = this.menuButtonMap[index].buttonId;
                    }
                    else {
                        $("#" + this.menuButtonMap[index].paneId).hide();
                        $("#" + this.menuButtonMap[index].buttonId).removeClass("setting-tab-click");
                    }
                }
                DataViz.Utils.setTabFocus("setting-pane", "setting-back-button", "blackwhite");
            };
            SettingPane.currentButtonId = "theme-button";
            return SettingPane;
        }());
        UX.SettingPane = SettingPane;
    })(UX = DataViz.UX || (DataViz.UX = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="../app.ts"/>
///<reference path="../logic/shared/utils.ts"/>
var DataViz;
(function (DataViz) {
    var UX;
    (function (UX) {
        var DataPane = (function () {
            function DataPane() {
                this.reentryFlag = false;
                this.init();
            }
            Object.defineProperty(DataPane, "Instance", {
                get: function () {
                    if (!DataPane.theInstance) {
                        DataPane.theInstance = new DataPane();
                    }
                    return DataPane.theInstance;
                },
                enumerable: true,
                configurable: true
            });
            DataPane.prototype.onDataBindingTargetChanged = function () {
                // Do nothing
            };
            DataPane.prototype.show = function () {
                $("#data-pane").show();
                $("#data-pane").animate({ width: "220px", height: "100%", float: "right" }, "fast");
                $("#data-back-button").focus();
            };
            DataPane.prototype.hide = function () {
                if ($("#data-pane")[0].style.width > "0 px") {
                    $("#data-pane").animate({ width: "0px", height: "100%", float: "right" }, "fast", null, function () { $("#data-pane").hide(); });
                }
            };
            DataPane.prototype.init = function () {
                this.setText();
                this.setEventHandlers();
                DataViz.Utils.setTabFocus("data-pane", "data-back-button", "select-data");
            };
            DataPane.prototype.setText = function () {
                $("#data-back-button").attr("alt", DataViz.Resources.UI.backButtonTitle);
                $("#data-back-button").attr("title", DataViz.Resources.UI.backButtonTitle);
                $("#data-pane-title").text(DataViz.Resources.DataPane.header);
                $("#select-data").text(DataViz.Resources.DataPane.selectButtonText);
            };
            DataPane.prototype.setEventHandlers = function () {
                var _this = this;
                $("#data-pane").off("click");
                $("#data-pane").click(function () {
                    $("#data-back-button").focus();
                });
                $("#data-back-button").off("click");
                $("#data-back-button").click(function () {
                    _this.hide();
                }).keydown(function (event) {
                    if (event.which === 13) {
                        _this.hide();
                    } // Check the enter key.
                });
                $("#select-data").off("click");
                $("#select-data").click(function () {
                    DataViz.mainApp.bindData();
                }).keydown(function (event) {
                    // Check the enter key.
                    if (event.which === 13) {
                        DataViz.mainApp.bindData();
                    }
                });
            };
            DataPane.theInstance = null;
            return DataPane;
        }());
        UX.DataPane = DataPane;
    })(UX = DataViz.UX || (DataViz.UX = {}));
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="../app.ts"/>
///<reference path="shared/Galleries.ts"/>
///<reference path="SettingPane.ts"/>
///<reference path="DataPane.ts"/>
///<reference path="../Logic/configurator.agave.ts"/>
var Trends;
(function (Trends) {
    var UX;
    (function (UX) {
        var MainUX = (function () {
            function MainUX() {
                this.hideFloatMenuTimeoutId = null;
            }
            MainUX.prototype.init = function () {
                var _this = this;
                var showAndHideFloatMenu = function () {
                    _this.showFloatMenu();
                    if (_this.hideFloatMenuTimeoutId !== null) {
                        clearTimeout(_this.hideFloatMenuTimeoutId);
                    }
                    _this.hideFloatMenuTimeoutId = setTimeout(_this.hideFloatMenu, 3000);
                };
                //Disable right click actions in document except for "textarea"
                $(document).on("contextmenu", function (e) {
                    if (e.target.type !== "textarea") {
                        e.preventDefault();
                        return false;
                    }
                });
                //Disable "ctrl + a" in document except for "textarea"
                $(document).on("keydown", function (e) {
                    if (e.target.type !== "textarea" && e.ctrlKey && (e.which === 65 || e.which === 97)) {
                        return false;
                    }
                });
                $("#float-menu-parent").off("hover");
                $("#float-menu-parent").hover(function () { _this.showFloatMenu(); }, showAndHideFloatMenu);
                window.addEventListener("click", showAndHideFloatMenu);
                window.addEventListener("keydown", showAndHideFloatMenu);
                $("#setting-button").off("click");
                $("#setting-button").click(function () {
                    _this.showSettingPane();
                }).keydown(function (event) {
                    // Check the enter key
                    if (event.which === 13) {
                        _this.showSettingPane();
                    }
                });
                $("#data-button").off("click");
                $("#data-button").click(function () {
                    _this.showDataPane();
                }).keydown(function (event) {
                    // Check the enter key
                    if (event.which === 13) {
                        _this.showDataPane();
                    }
                });
                this.setText();
                this.setupListeners();
                showAndHideFloatMenu();
            };
            MainUX.prototype.setupListeners = function () {
                DataViz.UX.SettingPane.Instance.setupListeners();
            };
            MainUX.prototype.setText = function () {
                var dataButton = $("#data-button");
                dataButton.attr("alt", DataViz.Resources.UI.floatMenuDataTitle);
                dataButton.attr("title", DataViz.Resources.UI.floatMenuDataTitle);
                var settingButton = $("#setting-button");
                settingButton.attr("alt", DataViz.Resources.UI.floatMenuSettingTitle);
                settingButton.attr("title", DataViz.Resources.UI.floatMenuSettingTitle);
            };
            MainUX.prototype.showDataPane = function () {
                DataViz.UX.SettingPane.Instance.hide();
                DataViz.UX.DataPane.Instance.show();
            };
            MainUX.prototype.showSettingPane = function () {
                DataViz.UX.DataPane.Instance.hide();
                DataViz.UX.SettingPane.Instance.show();
            };
            MainUX.prototype.showFloatMenu = function () {
                $("#float-menu").fadeIn("slow");
            };
            MainUX.prototype.hideFloatMenu = function () {
                $("#float-menu").fadeOut("slow");
            };
            return MainUX;
        }());
        UX.MainUX = MainUX;
    })(UX = Trends.UX || (Trends.UX = {}));
})(Trends || (Trends = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="logic/shared/controller.ts"/>
///<reference path="logic/shared/config.ts"/>
///<reference path="logic/shared/layout.ts"/>
///<reference path="logic/shared/skus.ts"/>
///<reference path="logic/shared/decoration.ts"/>
///<reference path="logic/data.binder.agave.ts"/>
///<reference path="logic/configurator.agave.ts"/>
///<reference path="UX/BindingPaneSpecific.ts"/>
///<reference path="UX/Home.ts"/>
///<reference path="logic/data.binder.agave.ts"/>
/**
  * This is the main module containing the entry point of the app.
  */
var DataViz;
(function (DataViz) {
    "use strict";
    // On the devices with >100% display ratio, the layout gets mess. Delay 100ms for working around.
    Office.initialize = function (reason) {
        $(document).ready(function () {
            DataViz.mainApp = new App();
            setTimeout(function () {
                var resourceUrl = "../resources/en-us/resources.js";
                // check if the target resource file exists
                $.ajaxSetup({
                    cache: true
                });
                loadResourcesAndInitApp(resourceUrl);
            }, 100);
        });
    };
    function loadResourcesAndInitApp(resourceUrl) {
        var retryCount = 3;
        $.getScript(resourceUrl, function () {
            ensureDependancies(retryCount, function () {
                DataViz.mainApp.init();
            });
        });
    }
    function ensureDependancies(retryCount, callback) {
        if (typeof (d3) !== "undefined") {
            callback();
        }
        else {
            reloadD3Library(retryCount, callback);
        }
    }
    function reloadD3Library(retryCount, callback) {
        if (retryCount > 0) {
            $.getScript("../scripts/opensource/d3/d3.v3.min.js?random=" + Math.floor(Math.random() * 10000000), function () {
                ensureDependancies(retryCount - 1, callback);
            })
                .fail(function () {
                reloadD3Library(retryCount - 1, callback);
            });
        }
    }
    /**
      * This class represents the primary entry-point and workflow of the app
      */
    var App = (function () {
        function App() {
            this.mainUX = null;
            this.currentSKU = null;
            this.configuration = null;
            this.layoutInstance = null;
            this.reentryFlag = false;
            this.bindingPane = null;
        }
        Object.defineProperty(App.prototype, "CurrentSKU", {
            /**
              * Gets the current SKU instance
              * @returns {DataViz.SKUs.SKUInstance} The current SKU instance
              */
            get: function () {
                return this.currentSKU;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "Configuration", {
            /**
              * Gets the configuration instance
              * @returns {Config.Configuration} The configuration instance
              */
            get: function () {
                return this.configuration;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "LayoutInstance", {
            /**
              * Gets the layout instance
              * @returns {DataViz.Chart.LayoutInstance} The layout instance
              */
            get: function () {
                return this.layoutInstance;
            },
            enumerable: true,
            configurable: true
        });
        /**
          * Initializes the app
          */
        App.prototype.init = function () {
            var _this = this;
            var thisApp = this;
            thisApp.bindingPane = DataViz.UX.BindingPaneSpecific.getInstance();
            thisApp.bindingPane.updateBindingPane({
                sampleData: [[DataViz.Resources.BindingPane.sampleDataHeader1, DataViz.Resources.BindingPane.sampleDataHeader2, DataViz.Resources.BindingPane.sampleDataHeader3],
                    [DataViz.Resources.BindingPane.sampleDataTime1, "41", "61"],
                    [DataViz.Resources.BindingPane.sampleDataTime2, "9", "15"],
                    [DataViz.Resources.BindingPane.sampleDataTime3, "29", "40"]],
                handleDataSelection: function () {
                    thisApp.bindingPane.handleDataSelection();
                },
                buttonOKCallback: function (bindingData) {
                    _this.currentSKU.Controller.bindDataBySelection();
                    DataViz.UX.DataPane.Instance.hide();
                },
                title: DataViz.Resources.BindingPane.title,
                subtitle: DataViz.Resources.BindingPane.subtitle,
                buttonOKText: DataViz.Resources.BindingPane.buttonOKText,
                buttonCancelText: DataViz.Resources.BindingPane.buttonCancelText,
            });
            DataViz.SKUs.SKUProvider.Instance.CurrentSKUId = "trends-default";
            DataViz.SKUs.SKUProvider.Instance.loadAll(DataViz.SKUs.Predefines.Instance.getAll(), function () {
                DataViz.Chart.LayoutProvider.Instance.loadAll(function () {
                    DataViz.Decoration.ThemeProvider.Instance.loadAll(function () {
                        thisApp.setupNewSKU();
                    });
                });
            });
        };
        /**
          * Binds to the selected cells (by prompt)
          */
        App.prototype.bindData = function () {
            this.bindingPane.show();
        };
        // Implementing IConfigurationChangeListener
        App.prototype.onConfigurationChanged = function (key, value) {
            switch (key) {
                case DataViz.Config.wellKnownKeys.sku:
                    if (this.reentryFlag) {
                        return;
                    }
                    if ((!this.currentSKU) || (this.currentSKU.Id !== value)) {
                        this.tearDownCurrentSKU();
                        this.reentryFlag = true;
                        this.setupNewSKU();
                        this.reentryFlag = false;
                    }
                    break;
            }
        };
        // Implementing IVisualizationListener
        App.prototype.onStartVisualizing = function () {
            // Nothing special by now
        };
        // Implementing IVisualizationListener
        App.prototype.onEndVisualizing = function () {
            // Do nothing
        };
        App.prototype.tearDownCurrentSKU = function () {
            if (!this.currentSKU) {
                return;
            }
            this.currentSKU.reset();
            this.configuration.reset();
            this.layoutInstance.reset();
        };
        App.prototype.setupNewSKU = function () {
            var _this = this;
            this.currentSKU = DataViz.SKUs.SKUProvider.Instance.CurrentSKUInstance;
            DataViz.Chart.LayoutProvider.Instance.CurrentLayoutId = this.currentSKU.LayoutId;
            this.configuration = new DataViz.Config.Configuration(App.configurationKeys, this.currentSKU.Configurator);
            // Registers listeners for configuration changes. NOTE: ORDER MATTERS!
            this.configuration.registerListener(DataViz.Decoration.ShapeProvider.Instance);
            this.configuration.registerListener(DataViz.Decoration.ThemeProvider.Instance);
            this.configuration.registerListener(this.currentSKU.DataConvertor);
            this.configuration.registerListener(this.currentSKU.Controller);
            this.configuration.registerListener(DataViz.SKUs.SKUProvider.Instance);
            this.configuration.registerListener(this);
            this.currentSKU.Visualizer.registerListener(this);
            this.layoutInstance = new DataViz.Chart.LayoutInstance(DataViz.Chart.LayoutProvider.Instance.CurrentLayout, this.currentSKU.Configurator);
            this.layoutInstance.registerListener(this.currentSKU.Layouter);
            this.mainUX = new Trends.UX.MainUX;
            this.mainUX.init();
            this.configuration.loadAll();
            this.layoutInstance.loadAll();
            this.currentSKU.Layouter.resume();
            var savedSkuId = this.configuration.get(DataViz.Config.wellKnownKeys.sku);
            if (!savedSkuId) {
                DataViz.mainApp.configuration.set(DataViz.Config.wellKnownKeys.sku, this.currentSKU.Id);
            }
            var savedThemeId = this.configuration.get(DataViz.Config.wellKnownKeys.theme);
            var savedTheme = DataViz.Decoration.ThemeProvider.Instance.getThemeById(savedThemeId);
            if ((!savedTheme)
                || ((savedTheme.sku !== "") && (savedTheme.sku !== this.currentSKU.Id))) {
                this.configuration.set(DataViz.Config.wellKnownKeys.theme, this.currentSKU.ThemeId);
            }
            var sampleData = new DataViz.Config.Trends.SampleDataProvider(this.currentSKU.SampleData);
            this.initLayoutElementConfig(DataViz.Config.Trends.wellKnownKeys.title, sampleData.Title);
            this.initLayoutElementConfig(DataViz.Config.Trends.wellKnownKeys.shortdes1Title, sampleData.Shortdes1Title);
            this.initLayoutElementConfig(DataViz.Config.Trends.wellKnownKeys.shortdes1Descript, sampleData.Shortdes1Descript);
            this.initLayoutElementConfig(DataViz.Config.Trends.wellKnownKeys.longdesTitle, sampleData.LongdesTitle);
            this.initLayoutElementConfig(DataViz.Config.Trends.wellKnownKeys.longdesDescript, sampleData.LongdesDescript);
            DataViz.UX.SettingPane.Instance.populate();
            this.currentSKU.Controller.rebindData(function () {
                if (_this.currentSKU.DataBinder.isBound()) {
                    return;
                }
                var savedClickedPoints = _this.configuration.get(DataViz.Config.Trends.wellKnownKeys.clickedPointIdArray);
                if (!savedClickedPoints) {
                    _this.configuration.set(DataViz.Config.Trends.wellKnownKeys.clickedPointIdArray, sampleData.DataPoints);
                }
                _this.currentSKU.Controller.visualizeData(sampleData.RenderData);
            });
            window.addEventListener("click", function (e) {
                if (e.clientX < window.innerWidth - DataViz.App.paneWidth) {
                    DataViz.UX.SettingPane.Instance.hide();
                    DataViz.UX.DataPane.Instance.hide();
                }
            });
        };
        App.prototype.initLayoutElementConfig = function (key, sampleValue) {
            var savedValue = DataViz.mainApp.layoutInstance.getValue(key);
            if ((savedValue === undefined) || (savedValue === null)) {
                DataViz.mainApp.layoutInstance.setValue(key, sampleValue);
            }
        };
        App.paneWidth = 220;
        App.configurationKeys = [
            DataViz.Config.wellKnownKeys.theme,
            DataViz.Config.wellKnownKeys.sku,
            DataViz.Config.Trends.wellKnownKeys.titleWidth,
            DataViz.Config.Trends.wellKnownKeys.titleHeight,
            DataViz.Config.Trends.wellKnownKeys.lineChartWidth,
            DataViz.Config.Trends.wellKnownKeys.lineChartHeight,
            DataViz.Config.Trends.wellKnownKeys.legendWidth,
            DataViz.Config.Trends.wellKnownKeys.legendHeight,
            DataViz.Config.Trends.wellKnownKeys.shortdes1GroupWidth,
            DataViz.Config.Trends.wellKnownKeys.longdesGroupWidth,
            DataViz.Config.Trends.wellKnownKeys.clickedPointIdArray,
            DataViz.Config.Trends.wellKnownKeys.lineOrder,
            DataViz.Config.Trends.wellKnownKeys.lineDisplay,
            DataViz.Config.Trends.wellKnownKeys.lineTitleArray,
            DataViz.Config.Trends.wellKnownKeys.bindingName,
            DataViz.Config.Trends.wellKnownKeys.windowWidth,
            DataViz.Config.Trends.wellKnownKeys.windowHeight,
            DataViz.Config.Trends.wellKnownKeys.isLegendEdited,
        ];
        return App;
    }());
    DataViz.App = App;
})(DataViz || (DataViz = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="shared/data.ts"/>
///<reference path="shared/config.ts"/>
/**
  * This module contains the implementation of the People Bar specific data covnertor
  */
var Trends;
(function (Trends) {
    var Data;
    (function (Data) {
        "use strict";
        /**
          * This is the specific data convertor implementation of the app
          */
        var DataConvertor = (function () {
            function DataConvertor() {
            }
            /**
              * Implementing {@link ITool#resetTool}
              */
            DataConvertor.prototype.resetTool = function () {
                //Do nothing.
            };
            /**
              * Determines whether the binding is a table and its column number is more than one
              * @param {any} binding used to get data.
              * @returns {boolean} True if the binding is valid; false otherwise
              */
            DataConvertor.isBindingValid = function (binding) {
                return (binding && binding.type === Office.BindingType.Matrix && binding.columnCount > 1);
            };
            /**
              * Implementing {@link IDataConvertor#Convert}
              * @param {RawData} the raw data contains both formatted and unformatted data.
              * Example: data.formatted: [["21-Jul", "$41.00"], ["22-Jul", "$29.00"], ...]
              *          data.unformatted: [[41476, 41], [41477, 29], ...]
              * @returns {BindingData} The converted data
              */
            DataConvertor.prototype.convert = function (data) {
                var convertedData = { header: [], xData: [], yData: null };
                if (!this.isDataValid(data.formatted) || !this.isDataValid(data.unformatted)) {
                    return convertedData;
                }
                var lineNumber = Math.min(data.formatted[0].length - 1, DataViz.Config.Trends.MaxLineNumber);
                if (data.hasHeader) {
                    for (var i = 0; i < lineNumber; i++) {
                        convertedData.header[i] = data.formatted[0][i + 1];
                    }
                }
                convertedData.yData = [];
                for (var i = 0; i < lineNumber; i++) {
                    convertedData.yData.push({
                        validDataCount: 0,
                        data: []
                    });
                }
                var columnNumber = Math.min(data.formatted.length, DataViz.Config.Trends.MaxColumnNumber);
                var columnNumberStartIndex = data.hasHeader ? 1 : 0;
                for (var i = columnNumberStartIndex; i < columnNumber; i++) {
                    convertedData.xData[i - columnNumberStartIndex] = data.formatted[i][0];
                    for (var j = 0; j < lineNumber; j++) {
                        var temp = parseFloat(data.unformatted[i][j + 1]);
                        if (!isNaN(temp)) {
                            convertedData.yData[j].validDataCount++;
                            convertedData.yData[j].data.push({
                                originalIndex: i - columnNumberStartIndex,
                                formatted: data.formatted[i][j + 1],
                                unformatted: temp
                            });
                        }
                    }
                }
                return convertedData;
            };
            /**
              * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
              */
            DataConvertor.prototype.onConfigurationChanged = function (key, value) {
                //Do nothing.
            };
            DataConvertor.prototype.isDataValid = function (data) {
                return data !== null && data !== undefined;
            };
            return DataConvertor;
        }());
        Data.DataConvertor = DataConvertor;
    })(Data = Trends.Data || (Trends.Data = {}));
})(Trends || (Trends = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="shared/chart.ts"/>
///<reference path="shared/layout.ts"/>
///<reference path="shared/decoration.ts"/>
///<reference path="../app.ts"/>
/**
  * This module contains the implementation of the base layouter
  */
var Trends;
(function (Trends) {
    var Chart;
    (function (Chart) {
        "use strict";
        /**
          * The base class of all layouters based on D3
          */
        var Layouter = (function (_super) {
            __extends(Layouter, _super);
            function Layouter() {
                _super.call(this);
                var zoomRatio = DataViz.Utils.getZoomRatioForApp();
                var dataButton = $("#data-button");
                var settingButton = $("#setting-button");
                var width = Math.floor(dataButton.width() / zoomRatio);
                dataButton.width(width);
                dataButton.height(width);
                settingButton.width(width);
                settingButton.height(width);
                this.firstRelayout = true;
                this.cachedLayoutElementInstances = {};
                this.layoutElements = new LayoutElements();
                this.currentLayout = DataViz.Chart.LayoutProvider.Instance.CurrentLayout;
            }
            Layouter.getZoomRatioRelativeLast = function () {
                var windowWidth = window.innerWidth ? window.innerWidth : document.body.clientWidth;
                var windowHeight = window.innerHeight ? window.innerHeight : document.body.clientHeight;
                var savedWidowWidth = DataViz.mainApp.Configuration.get(DataViz.Config.Trends.wellKnownKeys.windowWidth);
                var savedWindowHeight = DataViz.mainApp.Configuration.get(DataViz.Config.Trends.wellKnownKeys.windowHeight);
                if (!savedWidowWidth) {
                    savedWidowWidth = Layouter.originWindowWidth;
                    savedWindowHeight = Layouter.originWindowHeight;
                    DataViz.mainApp.Configuration.delaySet(DataViz.Config.Trends.wellKnownKeys.windowWidth, windowWidth);
                    DataViz.mainApp.Configuration.delaySet(DataViz.Config.Trends.wellKnownKeys.windowHeight, windowHeight);
                }
                return new ZoomRatio(savedWidowWidth / windowWidth, savedWindowHeight / windowHeight);
            };
            Layouter.getZoomRatioRelativeOrigin = function () {
                var windowWidth = window.innerWidth ? window.innerWidth : document.body.clientWidth;
                var windowHeight = window.innerHeight ? window.innerHeight : document.body.clientHeight;
                return new ZoomRatio(Layouter.originWindowWidth / windowWidth, Layouter.originWindowHeight / windowHeight);
            };
            /**
              * Implementing {@link ITool#resetTool}
              */
            Layouter.prototype.resetTool = function () {
                this.setWindowResizeListener();
                this.cachedLayoutElementInstances = {};
                this.resume();
            };
            /**
              * Implementing {@link ILayouter#Layout}
              */
            Layouter.prototype.layout = function (data) {
                this.cachedData = data;
                this.relayout();
            };
            /**
              * Implementing {@link ILayoutChangeListener#onLayoutChanged}
              */
            Layouter.prototype.onLayoutChanged = function (layout) {
            };
            /**
              * Implementing {@link ILayoutChangeListener#onLayoutElementChanged}
              */
            Layouter.prototype.onLayoutElementChanged = function (layoutElement) {
            };
            /**
              * Implementing {@link ILayoutChangeListener#onLayoutElementInstanceChanged}
              */
            Layouter.prototype.onLayoutElementInstanceChanged = function (layoutElement, value) {
                this.cachedLayoutElementInstances[layoutElement.id] = value;
                if (!this.isPaused()) {
                    this.layoutOneElementInstance(layoutElement.id, value);
                }
            };
            Layouter.prototype.relayout = function () {
                var _this = this;
                var zoomRatioRelativeOrigin = Layouter.getZoomRatioRelativeOrigin();
                $("body").css("padding", Layouter.bodyOriginPadding);
                $("body").css("min-width", Math.max(Layouter.bodyOriginMinWidth / zoomRatioRelativeOrigin.widthRatio, Layouter.bodyFinalMinWidth));
                $("body").css("min-height", Math.max(Layouter.bodyOriginMinHeight / zoomRatioRelativeOrigin.heightRatio, Layouter.bodyFinalMinHeight));
                $("#float-menu-parent").height(Layouter.floatMenuOriginHeight / zoomRatioRelativeOrigin.heightRatio);
                this.handleNonContentLengthInHDPI($("body"));
                this.currentLayout.elements.forEach(function (layoutElement, index, array) {
                    _this.layoutOneElement(layoutElement);
                });
                for (var elementId in this.cachedLayoutElementInstances) {
                    this.layoutOneElementInstance(elementId, this.cachedLayoutElementInstances[elementId]);
                }
                this.layoutElements.resetLayoutElements();
                var windowWidth = window.innerWidth ? window.innerWidth : document.body.clientWidth;
                var windowHeight = window.innerHeight ? window.innerHeight : document.body.clientHeight;
                $("body").width(windowWidth - this.layoutElements.Body.ElementNonContentWidth);
                $("body").height(windowHeight - this.layoutElements.Body.ElementNonContentHeight);
                if (this.firstRelayout) {
                    this.firstRelayout = false;
                    this.handleWindowResizeWidth(windowWidth);
                    this.handleWindowResizeHeight(windowHeight);
                }
            };
            Layouter.prototype.layoutOneElement = function (layoutElement) {
                var _this = this;
                var thisLayouter = this;
                var parent = d3.select("#" + layoutElement.parentId);
                if (parent.empty()) {
                    return;
                }
                var element = d3.select("#" + layoutElement.id);
                if (!element.empty()) {
                    element.remove();
                }
                element = d3.select("#" + layoutElement.parentId).append(layoutElement.element).attr("id", layoutElement.id);
                if (layoutElement.attributes) {
                    layoutElement.attributes.forEach(function (attr, index, array) {
                        element.attr(attr.name, attr.value);
                    });
                }
                if (layoutElement.styles) {
                    layoutElement.styles.forEach(function (style, index, array) {
                        element.style(style.name, style.value);
                    });
                }
                if (layoutElement.cssClass) {
                    element.classed(layoutElement.cssClass, true);
                }
                if (layoutElement.element === "textarea") {
                    element.on("input", function () {
                        DataViz.mainApp.LayoutInstance.delaySetValueNoNotify($(this)[0].id, $(this)[0].value);
                        thisLayouter.cachedLayoutElementInstances[$(this)[0].id] = $(this)[0].value;
                    });
                    if (layoutElement.forceOneLine) {
                        element.on("keypress", function () {
                            if (d3.event.keyCode === 13 || d3.event.keyCode === 10) {
                                d3.event.preventDefault();
                                return;
                            }
                        });
                    }
                }
                var jqueryElement = $("#" + layoutElement.id); //For using the jquery.ui api: resizable.
                var zoomRatioRelativeOrigin = Layouter.getZoomRatioRelativeOrigin();
                var zoomRatioRelativeLast = Layouter.getZoomRatioRelativeLast();
                jqueryElement.css("min-width", Math.floor(parseInt(jqueryElement.css("min-width")) / zoomRatioRelativeOrigin.widthRatio));
                var width = DataViz.mainApp.Configuration.get(jqueryElement.attr("id") + "-width");
                if (width !== undefined && width !== null) {
                    jqueryElement.css("width", width);
                }
                var height = DataViz.mainApp.Configuration.get(jqueryElement.attr("id") + "-height");
                if (height !== undefined && height !== null) {
                    jqueryElement.css("height", height);
                }
                if (layoutElement.resizable) {
                    jqueryElement.resizable({
                        handles: "e",
                        autoHide: true,
                        grid: [Layouter.xGrid, Layouter.yGrid],
                        resize: function (e, ui) {
                            var elementId = ui.element[0].id;
                            var elementWidth = ui.size.width;
                            var elementOriginWidth = ui.originalSize.width;
                            $("#line-chart").focus();
                            switch (elementId) {
                                case "title-parent":
                                    _this.onElementResize(_this.layoutElements.TitleParent, elementWidth, elementOriginWidth, _this.layoutElements.LineChart, _this.layoutElements.Legend);
                                    DataViz.mainApp.CurrentSKU.Plotter.delayPlot(DataViz.mainApp.CurrentSKU.Visualizer.CachedData);
                                    break;
                                case "line-chart":
                                    _this.onElementResize(_this.layoutElements.LineChart, elementWidth, elementOriginWidth, _this.layoutElements.Legend, _this.layoutElements.TitleParent);
                                    DataViz.mainApp.CurrentSKU.Plotter.delayPlot(DataViz.mainApp.CurrentSKU.Visualizer.CachedData);
                                    break;
                                case "shortdes1-group":
                                    _this.onElementResize(_this.layoutElements.Shortdes1Group, elementWidth, elementOriginWidth, _this.layoutElements.LongdesGroup, null);
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                }
                this.handleNonContentLengthInHDPI(jqueryElement);
                if (layoutElement.element === "textarea") {
                    jqueryElement.css("font-size", parseInt(jqueryElement.css("font-size")) / zoomRatioRelativeOrigin.heightRatio + "px");
                }
                else {
                    var jqueryElementWidth = Math.floor(jqueryElement.width() / zoomRatioRelativeLast.widthRatio);
                    jqueryElement.width(jqueryElementWidth);
                    if (!DataViz.mainApp.Configuration.get(jqueryElement.attr("id") + "-width")) {
                        DataViz.mainApp.Configuration.delaySet(jqueryElement.attr("id") + "-width", jqueryElementWidth);
                    }
                }
                if (jqueryElement.attr("id") !== "title") {
                    jqueryElement.height(Math.floor(jqueryElement.height() / zoomRatioRelativeOrigin.heightRatio));
                }
            };
            Layouter.prototype.handleNonContentLengthInHDPI = function (jqueryElement) {
                var ratio = Layouter.getZoomRatioRelativeOrigin();
                jqueryElement.css("padding-left", Math.floor(parseInt(jqueryElement.css("padding-left")) / ratio.widthRatio));
                jqueryElement.css("padding-right", Math.floor(parseInt(jqueryElement.css("padding-right")) / ratio.widthRatio));
                jqueryElement.css("padding-top", Math.floor(parseInt(jqueryElement.css("padding-top")) / ratio.heightRatio));
                jqueryElement.css("padding-bottom", Math.floor(parseInt(jqueryElement.css("padding-bottom")) / ratio.heightRatio));
                jqueryElement.css("margin-left", Math.floor(parseInt(jqueryElement.css("margin-left")) / ratio.widthRatio));
                jqueryElement.css("margin-right", Math.floor(parseInt(jqueryElement.css("margin-right")) / ratio.widthRatio));
                jqueryElement.css("margin-top", Math.floor(parseInt(jqueryElement.css("margin-top")) / ratio.heightRatio));
                jqueryElement.css("margin-bottom", Math.floor(parseInt(jqueryElement.css("margin-bottom")) / ratio.heightRatio));
            };
            Layouter.prototype.layoutOneElementInstance = function (layoutElementId, value) {
                var element = d3.select("#" + layoutElementId);
                if (element.empty()) {
                    return;
                }
                if ((value !== null) && (value !== undefined)) {
                    element.text(value);
                }
            };
            Layouter.prototype.onElementResize = function (element, elementWidth, elementOriginWidth, peerElement1, peerElement2) {
                if (!this.layoutElements.Body || !element || !peerElement1) {
                    return;
                }
                var bodyWidthNoPadding = this.layoutElements.Body.Element.width() - Layouter.deviationWidth;
                var ElementMinWidth = element.ElementMinWidth;
                var peerElement1MinWidth = peerElement1.ElementMinWidth;
                var peerElement2Width = peerElement2 ? peerElement2.Element.outerWidth() : 0;
                elementWidth += element.ElementNonContentWidth + element.getBorderWidth();
                elementOriginWidth += element.ElementNonContentWidth + element.getBorderWidth();
                if (elementWidth > elementOriginWidth) {
                    var maxWidth = bodyWidthNoPadding - peerElement1MinWidth - peerElement2Width;
                    elementWidth = (elementWidth < maxWidth) ? elementWidth : maxWidth;
                }
                else {
                    if (elementOriginWidth === ElementMinWidth) {
                        return;
                    }
                    elementWidth = (elementWidth > ElementMinWidth) ? elementWidth : ElementMinWidth;
                }
                var actualPeerElement1Width = bodyWidthNoPadding - elementWidth - peerElement2Width;
                this.setWidth(peerElement1, actualPeerElement1Width);
                this.setWidth(element, elementWidth);
            };
            Layouter.prototype.setWindowResizeListener = function () {
                var _this = this;
                var timer;
                var delayTime = 100;
                var resizeHandler = function (e) {
                    if (e.target === window) {
                        if (timer) {
                            clearTimeout(timer);
                        }
                        timer = setTimeout(function () {
                            var windowWidth = window.innerWidth ? window.innerWidth : document.body.clientWidth;
                            var windowHeight = window.innerHeight ? window.innerHeight : document.body.clientHeight;
                            _this.relayout();
                            _this.handleWindowResizeWidth(windowWidth);
                            _this.handleWindowResizeHeight(windowHeight);
                            _this.layoutElements.resetLayoutElements();
                            DataViz.mainApp.CurrentSKU.Plotter.delayPlot(DataViz.mainApp.CurrentSKU.Visualizer.CachedData, 50);
                            DataViz.mainApp.Configuration.set(DataViz.Config.Trends.wellKnownKeys.windowWidth, windowWidth);
                            DataViz.mainApp.Configuration.set(DataViz.Config.Trends.wellKnownKeys.windowHeight, windowHeight);
                        }, delayTime);
                    }
                };
                $(window).off("resize", resizeHandler);
                $(window).on("resize", resizeHandler);
            };
            Layouter.prototype.handleWindowResizeWidth = function (windowWidth) {
                var drawAreaWidth = (windowWidth > this.layoutElements.Body.ElementMinWidth) ? windowWidth - Layouter.deviationWidth : this.layoutElements.Body.ElementMinWidth;
                var drawAreaContentWidth = drawAreaWidth - this.layoutElements.Body.ElementNonContentWidth;
                var lineChart = this.layoutElements.LineChart;
                var titleParent = this.layoutElements.TitleParent;
                var legend = this.layoutElements.Legend;
                this.setWidth(this.layoutElements.FirstRowContainer, drawAreaContentWidth);
                this.setWidth(this.layoutElements.SecondRowContainer, drawAreaContentWidth);
                var lineChartWidth = drawAreaContentWidth - titleParent.Element.outerWidth() - legend.Element.outerWidth();
                lineChartWidth = (lineChartWidth > lineChart.ElementMinWidth) ? lineChartWidth : lineChart.ElementMinWidth;
                this.setWidth(lineChart, lineChartWidth);
                var legendWidth = drawAreaContentWidth - titleParent.Element.outerWidth() - lineChartWidth;
                legendWidth = (legendWidth > legend.ElementMinWidth) ? legendWidth : legend.ElementMinWidth;
                this.setWidth(legend, legendWidth);
                var titleWidth = drawAreaContentWidth - lineChartWidth - legendWidth;
                titleWidth = (titleWidth > titleParent.ElementMinWidth) ? titleWidth : titleParent.ElementMinWidth;
                this.setWidth(titleParent, titleWidth);
                var shortdes1WidthOrigin = this.layoutElements.Shortdes1Group.Element.outerWidth();
                var longdesWidthOrigin = this.layoutElements.LongdesGroup.Element.outerWidth();
                var originWidth = shortdes1WidthOrigin + longdesWidthOrigin;
                this.setWidth(this.layoutElements.Shortdes1Group, Math.floor(shortdes1WidthOrigin * drawAreaContentWidth / originWidth));
                this.setWidth(this.layoutElements.LongdesGroup, Math.floor(longdesWidthOrigin * drawAreaContentWidth / originWidth));
            };
            Layouter.prototype.handleWindowResizeHeight = function (windowHeight) {
                var drawAreaHeight = (windowHeight > this.layoutElements.Body.ElementMinHeight) ? (windowHeight - Layouter.deviationWidth) : this.layoutElements.Body.ElementMinHeight;
                var firstRowContainerHeight = drawAreaHeight - this.layoutElements.Body.ElementNonContentHeight - this.layoutElements.FloatMenuParent.ElementFixedHeight
                    - this.layoutElements.SecondRowContainer.ElementFixedHeight - this.layoutElements.FirstRowContainer.ElementNonContentHeight
                    - this.layoutElements.FirstRowContainer.getBorderHeight();
                this.setHeight(this.layoutElements.FirstRowContainer, firstRowContainerHeight);
                this.setHeight(this.layoutElements.LineChart, firstRowContainerHeight);
                this.setHeight(this.layoutElements.TitleParent, firstRowContainerHeight);
                this.setHeight(this.layoutElements.Legend, firstRowContainerHeight);
            };
            Layouter.prototype.setWidth = function (layoutElement, width) {
                var contentWidth = Math.floor(width - layoutElement.ElementNonContentWidth - layoutElement.getBorderWidth());
                layoutElement.Element.width(contentWidth);
                DataViz.mainApp.Configuration.delaySet(layoutElement.Element.attr("id") + "-width", contentWidth);
            };
            Layouter.prototype.setHeight = function (layoutElement, height) {
                var zoomRatioRelativeOrigin = Layouter.getZoomRatioRelativeOrigin();
                var element = layoutElement.Element;
                element.height(height);
                DataViz.mainApp.Configuration.delaySet(element.attr("id") + "-height", height * zoomRatioRelativeOrigin.heightRatio);
            };
            Layouter.originWindowWidth = 840;
            Layouter.originWindowHeight = 435;
            Layouter.bodyOriginPadding = "0px 20px 10px 20px";
            Layouter.bodyOriginMinWidth = 500;
            Layouter.bodyOriginMinHeight = 290;
            Layouter.bodyFinalMinWidth = 320;
            Layouter.bodyFinalMinHeight = 200;
            Layouter.floatMenuOriginHeight = 35;
            Layouter.xGrid = 5;
            Layouter.yGrid = 5;
            Layouter.deviationWidth = 3;
            return Layouter;
        }(DataViz.Tools.Pausable));
        Chart.Layouter = Layouter;
        var ElementWithFixedProperties = (function () {
            function ElementWithFixedProperties(elementId, isHeightFixed) {
                this.element = $("#" + elementId);
                this.elementNonContentWidth = this.getElementNonContentWidth(this.element);
                this.elementMinWidth = parseInt(this.element.css("min-width")) + this.elementNonContentWidth + this.getBorderWidth();
                if (!isHeightFixed) {
                    this.elementNonContentHeight = this.getElementNonContentHeight(this.element);
                    this.elementMinHeight = parseInt(this.element.css("min-height")) + this.elementNonContentHeight + this.getBorderHeight();
                }
                else {
                    this.elementFixedHeight = this.element.outerHeight();
                }
            }
            Object.defineProperty(ElementWithFixedProperties.prototype, "Element", {
                get: function () {
                    return this.element;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ElementWithFixedProperties.prototype, "ElementNonContentWidth", {
                get: function () {
                    return this.elementNonContentWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ElementWithFixedProperties.prototype, "ElementMinWidth", {
                get: function () {
                    return this.elementMinWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ElementWithFixedProperties.prototype, "ElementNonContentHeight", {
                get: function () {
                    return this.elementNonContentHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ElementWithFixedProperties.prototype, "ElementMinHeight", {
                get: function () {
                    return this.elementMinHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ElementWithFixedProperties.prototype, "ElementFixedHeight", {
                get: function () {
                    return this.elementFixedHeight;
                },
                enumerable: true,
                configurable: true
            });
            ElementWithFixedProperties.prototype.getBorderWidth = function () {
                return Math.ceil(parseFloat(this.element.css("border-left-width")) + parseFloat(this.element.css("border-right-width")));
            };
            ElementWithFixedProperties.prototype.getBorderHeight = function () {
                return Math.ceil(parseFloat(this.element.css("border-top-width")) + parseFloat(this.element.css("border-bottom-width")));
            };
            ElementWithFixedProperties.prototype.getElementNonContentWidth = function (element) {
                return parseInt(element.css("padding-left")) + parseInt(element.css("padding-right")) + parseInt(element.css("margin-left")) + parseInt(element.css("margin-right"));
            };
            ElementWithFixedProperties.prototype.getElementNonContentHeight = function (element) {
                return parseInt(element.css("padding-top")) + parseInt(element.css("padding-bottom")) + parseInt(element.css("margin-top")) + parseInt(element.css("margin-bottom"));
            };
            return ElementWithFixedProperties;
        }());
        Chart.ElementWithFixedProperties = ElementWithFixedProperties;
        var LayoutElements = (function () {
            function LayoutElements() {
                this.body = null;
                this.floatMenuParent = null;
                this.firstRowContainer = null;
                this.secondRowContainer = null;
                this.titleParent = null;
                this.lineChart = null;
                this.legend = null;
                this.shortdes1Group = null;
                this.longdesGroup = null;
            }
            LayoutElements.prototype.resetLayoutElements = function () {
                this.body = new ElementWithFixedProperties("background", false);
                this.floatMenuParent = new ElementWithFixedProperties("float-menu-parent", true);
                this.firstRowContainer = new ElementWithFixedProperties("first-row-container", false);
                this.secondRowContainer = new ElementWithFixedProperties("second-row-container", true);
                this.titleParent = new ElementWithFixedProperties("title-parent", false);
                this.lineChart = new ElementWithFixedProperties("line-chart", false);
                this.legend = new ElementWithFixedProperties("legend", false);
                this.shortdes1Group = new ElementWithFixedProperties("shortdes1-group", true);
                this.longdesGroup = new ElementWithFixedProperties("longdes-group", true);
            };
            Object.defineProperty(LayoutElements.prototype, "Body", {
                get: function () {
                    return this.body;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutElements.prototype, "FloatMenuParent", {
                get: function () {
                    return this.floatMenuParent;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutElements.prototype, "FirstRowContainer", {
                get: function () {
                    return this.firstRowContainer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutElements.prototype, "SecondRowContainer", {
                get: function () {
                    return this.secondRowContainer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutElements.prototype, "TitleParent", {
                get: function () {
                    return this.titleParent;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutElements.prototype, "LineChart", {
                get: function () {
                    return this.lineChart;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutElements.prototype, "Legend", {
                get: function () {
                    return this.legend;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutElements.prototype, "Shortdes1Group", {
                get: function () {
                    return this.shortdes1Group;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LayoutElements.prototype, "LongdesGroup", {
                get: function () {
                    return this.longdesGroup;
                },
                enumerable: true,
                configurable: true
            });
            return LayoutElements;
        }());
        Chart.LayoutElements = LayoutElements;
        var ZoomRatio = (function () {
            function ZoomRatio(widthRatio, heightRatio) {
                this.widthRatio = widthRatio;
                this.heightRatio = heightRatio;
                this.maxRatio = Math.max(this.widthRatio, this.heightRatio);
                this.minRatio = Math.min(this.widthRatio, this.heightRatio);
            }
            return ZoomRatio;
        }());
        Chart.ZoomRatio = ZoomRatio;
    })(Chart = Trends.Chart || (Trends.Chart = {}));
})(Trends || (Trends = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
///<reference path="shared/data.ts" />
///<reference path="shared/chart.ts"/>
///<reference path="data.convertor.agave.ts" />
///<reference path="../app.ts" />
var Trends;
(function (Trends) {
    var Chart;
    (function (Chart) {
        var LineChartPlotter = (function (_super) {
            __extends(LineChartPlotter, _super);
            function LineChartPlotter() {
                _super.call(this);
                this.delayPlotTimeoutId = null;
            }
            /**
              * Implementing {@link ITool#resetTool}
              */
            LineChartPlotter.prototype.resetTool = function () {
                this.resume();
            };
            /**
              * Implementing {@link IPlotter#delayPlot}
              */
            LineChartPlotter.prototype.delayPlot = function (data, delay) {
                var _this = this;
                if (delay === void 0) { delay = 300; }
                if (this.delayPlotTimeoutId !== null) {
                    clearTimeout(this.delayPlotTimeoutId);
                }
                this.delayPlotTimeoutId = setTimeout(function () {
                    _this.plot(data);
                    _this.delayPlotTimeoutId = null;
                }, delay);
            };
            /**
              * Implementing {@link IPlotter#plot}
              */
            LineChartPlotter.prototype.plot = function (data) {
                if (data && data.xData.length > 0 && data.yData.length > 0) {
                    this.onDataChanged(data);
                    this.initData(data);
                    this.drawLineChart();
                }
            };
            LineChartPlotter.prototype.setWidth = function (width) {
                this.lineChartWidth = width;
            };
            LineChartPlotter.prototype.setHeight = function (height) {
                this.lineChartHeight = height;
            };
            LineChartPlotter.prototype.onDataChanged = function (newData) {
                if (!this.bindingData || !newData) {
                    return;
                }
                if (newData.xData.length !== this.bindingData.xData.length) {
                    DataViz.Config.Trends.resetClickedPointIdArrays();
                }
                if (newData.yData.length !== this.bindingData.yData.length) {
                    DataViz.Config.Trends.resetClickedPointIdArrays();
                    DataViz.Config.Trends.resetLineOrder();
                    DataViz.Config.Trends.resetLineDisplay();
                    DataViz.Config.Trends.resetLineTitleArray();
                }
            };
            LineChartPlotter.prototype.initData = function (convertedData) {
                if (!convertedData.xData || !convertedData.yData) {
                    return;
                }
                this.bindingData = convertedData;
                this.configuration = DataViz.mainApp.Configuration;
                this.isLegendEdited = this.configuration.get(DataViz.Config.Trends.wellKnownKeys.isLegendEdited);
                if (this.isLegendEdited === null || this.isLegendEdited === undefined) {
                    this.isLegendEdited = false;
                    this.configuration.set(DataViz.Config.Trends.wellKnownKeys.isLegendEdited, this.isLegendEdited);
                }
                if (!this.isLegendEdited && this.bindingData.header.length) {
                    this.configuration.set(DataViz.Config.Trends.wellKnownKeys.lineTitleArray, this.bindingData.header);
                }
                var savedClickedPointIdArrays = this.configuration.get(DataViz.Config.Trends.wellKnownKeys.clickedPointIdArray);
                if (!savedClickedPointIdArrays) {
                    DataViz.Config.Trends.resetClickedPointIdArrays();
                }
                var savedLineOrder = this.configuration.get(DataViz.Config.Trends.wellKnownKeys.lineOrder);
                if (!savedLineOrder) {
                    DataViz.Config.Trends.resetLineOrder();
                }
                var savedLineDisplay = this.configuration.get(DataViz.Config.Trends.wellKnownKeys.lineDisplay);
                if (!savedLineDisplay) {
                    DataViz.Config.Trends.resetLineDisplay();
                }
                var savedLineTitleArray = this.configuration.get(DataViz.Config.Trends.wellKnownKeys.lineTitleArray);
                if (!savedLineTitleArray) {
                    DataViz.Config.Trends.resetLineTitleArray();
                }
                this.clickedPointIdArray = this.configuration.get(DataViz.Config.Trends.wellKnownKeys.clickedPointIdArray);
                this.lineOrder = this.configuration.get(DataViz.Config.Trends.wellKnownKeys.lineOrder);
                this.lineDisplay = this.configuration.get(DataViz.Config.Trends.wellKnownKeys.lineDisplay);
                this.lineTitleArray = this.configuration.get(DataViz.Config.Trends.wellKnownKeys.lineTitleArray);
                this.zoomRatio = Chart.Layouter.getZoomRatioRelativeOrigin();
                this.lineNumber = this.bindingData.yData.length;
                this.columnNumber = this.bindingData.xData.length;
                this.lineOrder.length = this.lineNumber;
                this.lineDisplay.length = this.lineNumber;
                this.setMaxAndMin();
                this.lineChartHeight = $("#line-chart").height();
                this.lineChartWidth = $("#line-chart").width();
            };
            LineChartPlotter.prototype.drawLineChart = function () {
                if (!this.bindingData) {
                    return;
                }
                var _this = this;
                if (!d3.select("#svg-line-chart").empty()) {
                    d3.select("#svg-line-chart").remove();
                }
                if (!d3.select("#div-legend").empty()) {
                    d3.select("#div-legend").remove();
                }
                this.lineChart = d3.select("#line-chart")
                    .append("svg:svg")
                    .attr("id", "svg-line-chart")
                    .attr("width", this.lineChartWidth)
                    .attr("height", this.lineChartHeight);
                this.legendGroup = d3.select("#legend")
                    .append("div")
                    .attr("id", "div-legend")
                    .style("width", "100%")
                    .style("height", "100%")
                    .style("margin-top", "25px");
                this.yAxis = d3.scale.linear().domain([this.min, this.max]).range([this.lineChartHeight - LineChartPlotter.marginBottom / this.zoomRatio.heightRatio, LineChartPlotter.marginTop / this.zoomRatio.heightRatio]);
                var yTicks = this.drawYLabelAndTicks();
                var marginLeft = this.getMaxYLabelWidth(yTicks) + this.getFirstMaxRadius();
                var marginRight = LineChartPlotter.marginRight / this.zoomRatio.widthRatio;
                var isLineChartMinimum = (this.lineChartWidth - marginLeft - marginRight) < this.lineChartWidth / 2;
                this.xAxisWidth = isLineChartMinimum ? this.lineChartWidth / 2 : this.lineChartWidth - marginLeft - marginRight;
                this.xAxis = d3.scale.linear().domain([0, this.columnNumber - 1])
                    .range([isLineChartMinimum ? this.lineChartWidth - marginRight - this.xAxisWidth : marginLeft, this.lineChartWidth - marginRight]);
                this.linePlotter = d3.svg.line()
                    .x(function (data, index) {
                    return _this.xAxis(data.originalIndex);
                })
                    .y(function (data, index) {
                    return _this.yAxis(data.unformatted);
                })
                    .interpolate("monotone");
                this.drawXLabelAndTicks();
                this.drawLegend();
                for (var i = 0; i < this.lineOrder.length; i++) {
                    var lineId = this.lineOrder[i];
                    this.lineChart.append("svg:g").attr("id", "line-group" + lineId).style("display", this.lineDisplay[lineId] ? "inline" : "none");
                    this.drawLine(lineId);
                }
            };
            LineChartPlotter.prototype.getMaxYLabelWidth = function (yTicks) {
                var maxLength = 0;
                for (var i = 0; i < yTicks.length; ++i) {
                    var yLableWidth = this.getSvgElementWidth("y-label" + i);
                    if (yLableWidth > maxLength) {
                        maxLength = yLableWidth;
                    }
                }
                return maxLength;
            };
            LineChartPlotter.prototype.getFirstMaxRadius = function () {
                var firstMaxRadius = 0;
                var textLength = 0;
                for (var i = 0; i < this.lineNumber; i++) {
                    var data = this.bindingData.yData[i].data;
                    if (data && data[0]) {
                        textLength = Math.min(data[0].formatted.length, LineChartPlotter.maxTextLength);
                        firstMaxRadius = Math.max(LineChartPlotter.radius[textLength - 1], firstMaxRadius);
                    }
                }
                return firstMaxRadius / this.zoomRatio.heightRatio;
            };
            LineChartPlotter.prototype.drawXLabelAndTicks = function () {
                var _this = this;
                this.currentXTickNumber = this.columnNumber;
                var xTicks = (this.currentXTickNumber === 1) ? [0] : this.xAxis.ticks(this.currentXTickNumber);
                while (xTicks.length > this.bindingData.xData.length) {
                    this.currentXTickNumber--;
                    if (this.currentXTickNumber === 1) {
                        xTicks = [0];
                        break;
                    }
                    xTicks = this.xAxis.ticks(this.currentXTickNumber);
                }
                this.drawXLabel(xTicks);
                var maxWidth = 0;
                for (var i = 0; i < xTicks.length; i++) {
                    var xLableWidth = this.getSvgElementWidth("x-label" + xTicks[i]);
                    if (xLableWidth > maxWidth) {
                        maxWidth = xLableWidth;
                    }
                }
                var maxTickNumber = Math.floor(this.xAxisWidth / maxWidth) + 1;
                if (xTicks.length > maxTickNumber) {
                    d3.select("#x-label-group").remove();
                    this.currentXTickNumber = maxTickNumber;
                    if (this.currentXTickNumber > 1) {
                        xTicks = this.xAxis.ticks(this.currentXTickNumber);
                        var isFitFinal = ((this.xAxis(xTicks[xTicks.length - 1]) - this.xAxis(xTicks[0])) / (xTicks.length - 1)) >= maxWidth;
                        while ((maxTickNumber < xTicks.length) || !isFitFinal || xTicks.length > this.bindingData.xData.length) {
                            this.currentXTickNumber--;
                            if (this.currentXTickNumber === 1) {
                                xTicks = [0];
                                break;
                            }
                            xTicks = this.xAxis.ticks(this.currentXTickNumber);
                            isFitFinal = ((this.xAxis(xTicks[xTicks.length - 1]) - this.xAxis(xTicks[0])) / (xTicks.length - 1)) >= maxWidth;
                        }
                    }
                    else {
                        xTicks = [0];
                    }
                    this.drawXLabel(xTicks);
                }
                var lastButOneId = xTicks[xTicks.length - 1];
                var fontSize = LineChartPlotter.defaultXLableFontSize / this.zoomRatio.heightRatio;
                if (lastButOneId !== this.columnNumber - 1) {
                    var xLabelGroup = d3.select("#x-label-group");
                    xLabelGroup.append("svg:line")
                        .attr("id", "x-tick-last")
                        .attr("class", "theme-chart-ticks")
                        .attr("x1", this.xAxis(this.columnNumber - 1))
                        .attr("y1", this.lineChartHeight - LineChartPlotter.xAxisPaddingBottm / this.zoomRatio.heightRatio - fontSize / 2)
                        .attr("x2", this.xAxis(this.columnNumber - 1))
                        .attr("y2", this.lineChartHeight - (LineChartPlotter.xAxisPaddingBottm + LineChartPlotter.xTickWidth) / this.zoomRatio.heightRatio - fontSize / 2);
                    xLabelGroup.append("svg:text")
                        .attr("id", "x-label-last")
                        .attr("class", "layout-chart-x-label theme-chart-label")
                        .attr("x", this.xAxis(this.columnNumber - 1))
                        .attr("y", this.lineChartHeight - fontSize / 2)
                        .style("font-size", fontSize + "px")
                        .text(this.bindingData.xData[this.columnNumber - 1]);
                    var lastTwoTicksWidth = this.xAxis(this.columnNumber - 1) - this.xAxis(lastButOneId);
                    var lastLabelWidth = this.getSvgElementWidth("x-label-last");
                    ;
                    var lastButOneLabelWidth = this.getSvgElementWidth("x-label" + lastButOneId);
                    if (lastTwoTicksWidth < (lastLabelWidth + lastButOneLabelWidth) / 2) {
                        if (!lastButOneId) {
                            d3.select("#x-tick-last").remove();
                            d3.select("#x-label-last").remove();
                        }
                        else {
                            d3.select("#x-label" + lastButOneId).remove();
                            d3.select("#x-tick" + lastButOneId).remove();
                        }
                    }
                }
                this.lineChart.append("svg:line")
                    .attr("class", "theme-chart-ticks")
                    .attr("x1", 0)
                    .attr("y1", this.lineChartHeight - LineChartPlotter.xAxisPaddingBottm / this.zoomRatio.heightRatio - fontSize / 2)
                    .attr("x2", this.lineChartWidth)
                    .attr("y2", this.lineChartHeight - LineChartPlotter.xAxisPaddingBottm / this.zoomRatio.heightRatio - fontSize / 2);
            };
            LineChartPlotter.prototype.drawYLabelAndTicks = function () {
                var _this = this;
                this.currentYTickNumber = LineChartPlotter.defaultYTickNumber;
                var yTicks = this.yAxis.ticks(this.currentYTickNumber);
                var retry = 0;
                while (yTicks.length < LineChartPlotter.defaultYTickNumber) {
                    this.currentYTickNumber++;
                    yTicks = this.yAxis.ticks(this.currentYTickNumber);
                    retry++;
                    if (retry > 9) {
                        break;
                    } // The max retry time is 10;
                }
                var yLabelId = 0;
                var isPercentageFormat = this.isPercentageFormat();
                this.lineChart.selectAll(".yLabel")
                    .data(yTicks)
                    .enter()
                    .append("svg:text")
                    .attr("id", function (data) {
                    return "y-label" + yLabelId++;
                })
                    .attr("class", "layout-chart-y-label theme-chart-label")
                    .attr("x", 0)
                    .attr("y", function (data) {
                    return _this.yAxis(data) - 6;
                }) //"6" is the padding bottom from the yTicks.
                    .style("font-size", LineChartPlotter.defaultYLableFontSize / this.zoomRatio.heightRatio + "px")
                    .text(function (data) {
                    var str = data.toString();
                    var n = str.indexOf(".");
                    if (n !== -1) {
                        if (str.substr(n).length > 10) {
                            data = d3.round(data, 10);
                        } //Show at most 10 digits after the decimal point
                    }
                    if (_this.bindingData && _this.bindingData.yData && isPercentageFormat) {
                        return data * 100 + "%";
                    }
                    else {
                        return data;
                    }
                });
                this.lineChart.selectAll(".yTicks")
                    .data(yTicks)
                    .enter()
                    .append("svg:line")
                    .attr("class", "theme-chart-ticks")
                    .attr("x1", 0)
                    .attr("y1", function (data) {
                    return _this.yAxis(data);
                })
                    .attr("x2", this.lineChartWidth)
                    .attr("y2", function (data) {
                    return _this.yAxis(data);
                })
                    .style("stroke-dasharray", ("5, 3")); //"5" is the dash width and "3" is the width between two dash.
                return yTicks;
            };
            LineChartPlotter.prototype.drawXLabel = function (xTicks) {
                var _this = this;
                var xLabelGroup = this.lineChart.append("svg:g")
                    .attr("id", "x-label-group");
                var fontSize = LineChartPlotter.defaultXLableFontSize / this.zoomRatio.heightRatio;
                xLabelGroup.selectAll(".xLabels")
                    .data(xTicks)
                    .enter()
                    .append("svg:text")
                    .attr("id", function (index) {
                    return "x-label" + index;
                })
                    .attr("class", "layout-chart-x-label theme-chart-label")
                    .attr("x", function (index) {
                    return _this.xAxis(index);
                })
                    .attr("y", this.lineChartHeight - fontSize / 2)
                    .style("font-size", fontSize + "px")
                    .text(function (index) {
                    return _this.bindingData.xData[index];
                });
                xLabelGroup.selectAll(".xTicks")
                    .data(xTicks)
                    .enter()
                    .append("svg:line")
                    .attr("id", function (index) {
                    return "x-tick" + index;
                })
                    .attr("class", "theme-chart-ticks")
                    .attr("x1", function (index) {
                    return _this.xAxis(index);
                })
                    .attr("y1", this.lineChartHeight - LineChartPlotter.xAxisPaddingBottm / this.zoomRatio.heightRatio - fontSize / 2)
                    .attr("x2", function (index) {
                    return _this.xAxis(index);
                })
                    .attr("y2", this.lineChartHeight - (LineChartPlotter.xAxisPaddingBottm + LineChartPlotter.xTickWidth) / this.zoomRatio.heightRatio - fontSize / 2);
            };
            LineChartPlotter.prototype.drawLegend = function () {
                var _this = this;
                for (var i = 0; i < this.lineNumber; i++) {
                    var legendRow = this.legendGroup.append("div")
                        .attr("id", "legend-row-" + i)
                        .attr("class", "legend-row-style");
                    legendRow.append("div")
                        .attr("id", "checkbox" + i + "end")
                        .attr("class", function () {
                        var checkboxTheme = _this.lineDisplay[i] ? "theme-checkbox-line-" + i + "-checked" : "theme-checkbox-line-" + i + "-unchecked";
                        return "layout-checkbox " + checkboxTheme;
                    })
                        .attr("opacity", function () {
                        return _this.lineDisplay[i] ? 1 : 0.85;
                    })
                        .on("click", function () {
                        var checkboxId = $(this).attr("id");
                        var lineId = _this.getLineIdFromCheckboxId(checkboxId);
                        var isOpacity = ($(this).attr("opacity") === "1");
                        $(this).attr("opacity", isOpacity ? "0.85" : "1");
                        $(this).removeClass(isOpacity ? "theme-checkbox-line-" + lineId + "-checked" : "theme-checkbox-line-" + lineId + "-unchecked");
                        $(this).addClass(isOpacity ? "theme-checkbox-line-" + lineId + "-unchecked" : "theme-checkbox-line-" + lineId + "-checked");
                        $("#line-group" + lineId).css("display", isOpacity ? "none" : "inline");
                        _this.lineDisplay[lineId] = !isOpacity;
                        _this.configuration.set(DataViz.Config.Trends.wellKnownKeys.lineDisplay, _this.lineDisplay);
                    });
                    $("#checkbox" + i + "end").width(LineChartPlotter.checkBoxLength / this.zoomRatio.heightRatio);
                    $("#checkbox" + i + "end").height(LineChartPlotter.checkBoxLength / this.zoomRatio.heightRatio);
                    legendRow.append("textarea")
                        .attr("id", "line-title" + i + "end")
                        .attr("class", "element-style layout-chart-legend-textarea" + " theme-legend-textarea-" + i)
                        .style("font-size", LineChartPlotter.legendFontSize / this.zoomRatio.heightRatio + "px")
                        .on("input", function () {
                        var lineId = _this.getLineIdFromLineTitleId($(this).attr("id"));
                        _this.lineTitleArray[lineId] = $(this)[0].value;
                        _this.configuration.delaySet(DataViz.Config.Trends.wellKnownKeys.lineTitleArray, _this.lineTitleArray, 300);
                        if (!_this.isLegendEdited) {
                            _this.isLegendEdited = true;
                            _this.configuration.delaySet(DataViz.Config.Trends.wellKnownKeys.isLegendEdited, true, 300);
                        }
                    })
                        .on("keypress", function () {
                        if (d3.event.keyCode === 13 || d3.event.keyCode === 10) {
                            d3.event.preventDefault();
                            return false;
                        }
                    });
                    $("#line-title" + i + "end").height(22 / this.zoomRatio.heightRatio); //"22" is the line title textarea's height
                    // In TypeScript, jQuery prototype doesn't support to set outerWidth.
                    $("#line-title" + i + "end").outerWidth($("#div-legend").width() - LineChartPlotter.checkBoxLength / this.zoomRatio.heightRatio);
                    $("#line-title" + i + "end")[0].value = this.lineTitleArray[i];
                }
            };
            LineChartPlotter.prototype.drawLine = function (lineId) {
                if (!this.bindingData || !this.bindingData.yData[lineId]) {
                    return;
                }
                var _this = this;
                var line = d3.select("#line-group" + lineId)
                    .append("svg:path")
                    .attr("id", "line" + lineId)
                    .attr("class", "theme-chart-line-" + lineId)
                    .style("stroke-width", function () {
                    return _this.bindingData.xData.length < LineChartPlotter.beSmallerLeastPointNumber ? LineChartPlotter.lineWidth / _this.zoomRatio.heightRatio
                        : LineChartPlotter.lineWidthForMore / _this.zoomRatio.heightRatio;
                })
                    .style("fill", "none")
                    .attr("d", this.linePlotter(this.bindingData.yData[lineId].data));
                var pointGroup = d3.select("#line-group" + lineId)
                    .append("svg:g")
                    .attr("id", "point-group" + lineId)
                    .style("display", "inline");
                var point = pointGroup.selectAll(".point")
                    .data(this.bindingData.yData[lineId].data)
                    .enter().append("svg:circle")
                    .attr("id", function (data, index) {
                    return "#point" + "line" + lineId + "column" + data.originalIndex + "end";
                })
                    .attr("class", "theme-chart-line-" + lineId)
                    .attr("cursor", "pointer")
                    .attr("r", function () {
                    return _this.bindingData.xData.length < LineChartPlotter.beSmallerLeastPointNumber ? LineChartPlotter.pointRadio / _this.zoomRatio.heightRatio
                        : LineChartPlotter.pointRadioForMore / _this.zoomRatio.heightRatio;
                })
                    .attr("cx", function (data, index) { return _this.xAxis(data.originalIndex); })
                    .attr("cy", function (data, index) { return _this.yAxis(data.unformatted); })
                    .on("mouseover", function () {
                    d3.select(this).attr("r", function () {
                        return _this.bindingData.xData.length < LineChartPlotter.beSmallerLeastPointNumber ? LineChartPlotter.pointHoverRadio / _this.zoomRatio.heightRatio
                            : LineChartPlotter.pointHoverRadioForMore / _this.zoomRatio.heightRatio;
                    });
                })
                    .on("mouseout", function () {
                    d3.select(this).attr("r", function () {
                        return _this.bindingData.xData.length < LineChartPlotter.beSmallerLeastPointNumber ? LineChartPlotter.pointRadio / _this.zoomRatio.heightRatio
                            : LineChartPlotter.pointRadioForMore / _this.zoomRatio.heightRatio;
                    });
                })
                    .on("click", function () {
                    var pointId = d3.select(this).attr("id");
                    var lineId = _this.getLineIdFromPointId(pointId);
                    _this.promoteLineToTop(lineId);
                    _this.drawCircleGroup(pointId, true);
                    _this.clickedPointIdArray.push(pointId);
                    _this.configuration.delaySet(DataViz.Config.Trends.wellKnownKeys.clickedPointIdArray, _this.clickedPointIdArray, 300);
                });
                for (var i = 0; i < this.clickedPointIdArray.length; i++) {
                    var index = this.clickedPointIdArray[i].indexOf("line" + lineId);
                    if (index > -1) {
                        this.drawCircleGroup(this.clickedPointIdArray[i], false);
                    }
                }
            };
            LineChartPlotter.prototype.drawCircleGroup = function (pointId, beAnimated) {
                var lineId = this.getLineIdFromPointId(pointId);
                var column = this.getColumnFromPointId(pointId);
                var unformattedData = null;
                var formattedData = null;
                if (!this.bindingData.yData[lineId]) {
                    return;
                }
                for (var i = 0; i < this.bindingData.yData[lineId].data.length; i++) {
                    if (this.bindingData.yData[lineId].data[i].originalIndex === column) {
                        unformattedData = this.bindingData.yData[lineId].data[i].unformatted;
                        formattedData = this.bindingData.yData[lineId].data[i].formatted;
                        break;
                    }
                }
                if (formattedData === null || unformattedData === null) {
                    return;
                }
                var _this = this;
                var circleGroup = d3.select("#point-group" + lineId).append("svg:g")
                    .style("display", "inline")
                    .attr("opacity", 1)
                    .attr("cursor", "pointer")
                    .on("click", function () {
                    d3.select(this).remove();
                    var index = _this.clickedPointIdArray.indexOf("#point" + "line" + lineId + "column" + column + "end");
                    _this.clickedPointIdArray.splice(index, 1);
                    _this.configuration.delaySet(DataViz.Config.Trends.wellKnownKeys.clickedPointIdArray, _this.clickedPointIdArray, 300);
                });
                circleGroup.append("svg:circle")
                    .attr("class", "theme-chart-line-" + lineId)
                    .attr("opacity", 1)
                    .attr("cx", Math.round(this.xAxis(column) * 100) / 100)
                    .attr("cy", this.yAxis(unformattedData))
                    .attr("r", 0)
                    .transition()
                    .duration(function () {
                    if (beAnimated) {
                        return LineChartPlotter.durationTime;
                    }
                    else {
                        return 0;
                    }
                })
                    .attr("r", (formattedData.length > LineChartPlotter.maxTextLength)
                    ? LineChartPlotter.radius[LineChartPlotter.maxTextLength - 1] / this.zoomRatio.heightRatio
                    : LineChartPlotter.radius[formattedData.length - 1] / this.zoomRatio.heightRatio);
                var fontSize = (formattedData.length > LineChartPlotter.maxTextLength)
                    ? LineChartPlotter.fontSize[LineChartPlotter.maxTextLength - 1]
                    : LineChartPlotter.fontSize[formattedData.length - 1];
                circleGroup.append("svg:text")
                    .attr("class", "theme-chart-value layout-chart-value")
                    .attr("x", Math.round(this.xAxis(column) * 100) / 100)
                    .attr("y", this.yAxis(unformattedData))
                    .attr("dy", ".36em")
                    .attr("font-size", fontSize / this.zoomRatio.heightRatio)
                    .text((formattedData.length > LineChartPlotter.maxTextLength) ? formattedData.substring(0, 8) + "..." : formattedData)
                    .attr("opacity", 0)
                    .transition()
                    .duration(function () {
                    if (beAnimated) {
                        return LineChartPlotter.durationTime;
                    }
                    else {
                        return 0;
                    }
                })
                    .attr("opacity", 1);
            };
            LineChartPlotter.prototype.getLineIdFromLineTitleId = function (lineTitleId) {
                return this.getNumberFromString(lineTitleId, "line-title", "end");
            };
            LineChartPlotter.prototype.getLineIdFromCheckboxId = function (checkboxId) {
                return this.getNumberFromString(checkboxId, "checkbox", "end");
            };
            LineChartPlotter.prototype.getLineIdFromPointId = function (pointId) {
                return this.getNumberFromString(pointId, "line", "column");
            };
            LineChartPlotter.prototype.getColumnFromPointId = function (pointId) {
                return this.getNumberFromString(pointId, "column", "end");
            };
            LineChartPlotter.prototype.getNumberFromString = function (orgString, startString, endString) {
                var endIndex = orgString.indexOf(endString);
                var startIndex = orgString.indexOf(startString) + startString.length;
                var num = orgString.substring(startIndex, endIndex);
                return parseInt(num);
            };
            LineChartPlotter.prototype.promoteLineToTop = function (lineId) {
                if (lineId !== this.lineOrder[this.lineOrder.length - 1]) {
                    if (d3.select("#line-group" + lineId)) {
                        d3.select("#line-group" + lineId).remove();
                        this.lineChart.append("svg:g")
                            .attr("id", "line-group" + lineId);
                    }
                    this.drawLine(lineId);
                    //reset line order
                    var index = this.lineOrder.indexOf(lineId);
                    this.lineOrder.splice(index, 1);
                    this.lineOrder.push(lineId);
                    this.configuration.set(DataViz.Config.Trends.wellKnownKeys.lineOrder, this.lineOrder);
                }
            };
            LineChartPlotter.prototype.setMaxAndMin = function () {
                var isFirstNumber = true;
                var temp;
                for (var i = 0; i < this.lineNumber; i++) {
                    if (this.bindingData.yData[i]) {
                        for (var j = 0; j < this.bindingData.yData[i].validDataCount; j++) {
                            temp = this.bindingData.yData[i].data[j].unformatted;
                            if (isFirstNumber) {
                                this.max = temp;
                                this.min = temp;
                                isFirstNumber = false;
                            }
                            this.max = Math.max(this.max, temp);
                            this.min = Math.min(this.min, temp);
                        }
                    }
                }
                // There's no valid data
                if (isFirstNumber || this.max === null || this.max === undefined || this.min === null || this.min === undefined) {
                    this.min = 0;
                    this.max = 1;
                }
                else if (this.min === this.max) {
                    if (this.min > 0) {
                        this.min = 0;
                    }
                    else if (this.min < 0) {
                        this.max = 0;
                    }
                    else {
                        this.min = -1;
                    }
                }
            };
            LineChartPlotter.prototype.isPercentageFormat = function () {
                var count;
                for (var i = 0; i < this.lineNumber; i++) {
                    if (this.bindingData.yData[i]) {
                        count = 0;
                        for (var j = 0; j < this.bindingData.yData[i].validDataCount; j++) {
                            if (this.bindingData.yData[i].data[j].formatted.lastIndexOf("%") !== -1) {
                                count++;
                            }
                        }
                        if (count < j / 2 || count === 0) {
                            return false;
                        }
                    }
                }
                return true;
            };
            LineChartPlotter.prototype.getSvgElementWidth = function (elementId) {
                var element = $("#" + elementId);
                if (element.get(0)) {
                    return element.get(0).getBBox().width;
                }
                return 0;
            };
            LineChartPlotter.durationTime = 300;
            // Different radiuses of the bubble after user clicks a point, which depends on the text length in it
            LineChartPlotter.radius = [13, 16, 20, 25, 29, 29, 29, 29, 29];
            // Different font sizes of the bubble text, which depends on the text length in it
            LineChartPlotter.fontSize = [17, 17, 17, 17, 17, 15, 13, 12, 11];
            LineChartPlotter.defaultYLableFontSize = 18;
            LineChartPlotter.defaultXLableFontSize = 10;
            LineChartPlotter.legendFontSize = 17;
            LineChartPlotter.checkBoxLength = 15;
            LineChartPlotter.xAxisPaddingBottm = 15;
            LineChartPlotter.xTickWidth = 5;
            LineChartPlotter.marginRight = 40;
            LineChartPlotter.marginTop = 40;
            LineChartPlotter.marginBottom = 45;
            LineChartPlotter.maxTextLength = 9;
            LineChartPlotter.defaultYTickNumber = 2;
            LineChartPlotter.pointRadio = 6;
            LineChartPlotter.pointRadioForMore = 4;
            LineChartPlotter.pointHoverRadio = 9;
            LineChartPlotter.pointHoverRadioForMore = 7;
            LineChartPlotter.lineWidth = 5;
            LineChartPlotter.lineWidthForMore = 3;
            LineChartPlotter.beSmallerLeastPointNumber = 21;
            LineChartPlotter.resetAction = {
                deleteColumn: "deleteColumn",
                addColumn: "addColumn",
                revise: "revise"
            };
            return LineChartPlotter;
        }(DataViz.Tools.Pausable));
        Chart.LineChartPlotter = LineChartPlotter;
    })(Chart = Trends.Chart || (Trends.Chart = {}));
})(Trends || (Trends = {}));
/* **************************************************************************************
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. Licensed under the Apache License, Version 2.0.
See License.txt in the project root for license information.
***************************************************************************************** */
/**
  * This module contains the pre-defined SKU configs
  */
var DataViz;
(function (DataViz) {
    var SKUs;
    (function (SKUs) {
        "use strict";
        var Predefines = (function () {
            function Predefines() {
            }
            Object.defineProperty(Predefines, "Instance", {
                get: function () {
                    if (!Predefines.instance) {
                        Predefines.instance = new Predefines;
                    }
                    return Predefines.instance;
                },
                enumerable: true,
                configurable: true
            });
            /**
              * Get all the definitions of SKUs
              * @returns {DataViz.SKUs.SKUDefinition[]} SKU definitions
              */
            Predefines.prototype.getAll = function () {
                var defs = new Array();
                defs.push(this.getDefault());
                return defs;
            };
            Predefines.prototype.getDefault = function () {
                var def = new DataViz.SKUs.SKUDefinition();
                def.id = "trends-default";
                def.thumbnail = "";
                def.displayName = "trends-default";
                def.plotter = "Trends.Chart.LineChartPlotter";
                def.layouter = "Trends.Chart.Layouter";
                def.dataBinder = "Trends.Data.Agave.DataBinder";
                def.dataConvertor = "Trends.Data.DataConvertor";
                def.configurator = "DataViz.Config.Trends.Configurator";
                def.defaultTheme = "default-greenwhite";
                def.defaultShape = "";
                def.defaultLayout = "layout-trends-default";
                var sampleData = {};
                sampleData["formatted"] = [
                    ["Time", DataViz.Resources.SampleData.legend1, DataViz.Resources.SampleData.legend2],
                    [DataViz.Resources.SampleData.time1, "41", "61"],
                    [DataViz.Resources.SampleData.time2, "9", "15"],
                    [DataViz.Resources.SampleData.time3, "29", "40"],
                    [DataViz.Resources.SampleData.time4, "123", "83"],
                    [DataViz.Resources.SampleData.time5, "148", "107"],
                    [DataViz.Resources.SampleData.time6, "148", "109"],
                    [DataViz.Resources.SampleData.time7, "109", "130"],
                    [DataViz.Resources.SampleData.time8, "129", "172"],
                    [DataViz.Resources.SampleData.time9, "73", "110"]
                ];
                sampleData["unformatted"] = [
                    ["Time", DataViz.Resources.SampleData.legend1, DataViz.Resources.SampleData.legend2],
                    [DataViz.Resources.SampleData.time1, "41", "61"],
                    [DataViz.Resources.SampleData.time2, "9", "15"],
                    [DataViz.Resources.SampleData.time3, "29", "40"],
                    [DataViz.Resources.SampleData.time4, "123", "83"],
                    [DataViz.Resources.SampleData.time5, "148", "107"],
                    [DataViz.Resources.SampleData.time6, "148", "109"],
                    [DataViz.Resources.SampleData.time7, "109", "130"],
                    [DataViz.Resources.SampleData.time8, "129", "172"],
                    [DataViz.Resources.SampleData.time9, "73", "110"]
                ];
                sampleData["dataPoints"] = ["#pointline0column4end"];
                sampleData["sampleText"] = {
                    "title": DataViz.Resources.SampleData.title,
                    "shortdes1Title": DataViz.Resources.SampleData.shortDescriptionTitle,
                    "shortdes1Descript": DataViz.Resources.SampleData.shortDescription,
                    "longdesTitle": DataViz.Resources.SampleData.longDescriptionTitle,
                    "longdesDescript": DataViz.Resources.SampleData.longDescription
                };
                def.sampleData = sampleData;
                return def;
            };
            Predefines.instance = null;
            return Predefines;
        }());
        SKUs.Predefines = Predefines;
    })(SKUs = DataViz.SKUs || (DataViz.SKUs = {}));
})(DataViz || (DataViz = {}));
//# sourceMappingURL=ModernTrend.js.map