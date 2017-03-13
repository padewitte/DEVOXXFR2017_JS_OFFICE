/**
  * This module contains the basic definitions, helpers for parameter validation
  */
declare module DataViz.Validate {
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
    class Validator {
        private static invalidParameterTypeError;
        private static parameterIsNullError;
        private static parameterIsZeroError;
        private static parameterIsEmptyError;
        private static parameterIsNotPositiveError;
        private static parameterIsNotTrueError;
        private static parameterRangeError;
        private static parameterIsNotEqualToError;
        private param;
        private source;
        /**
          * Builds a validator that will validate the given parameter
          * @param {any} param The parameter to be validated
          * @returns {Validator} A validator instance to do the actual validation
          */
        static ensures(param: any): Validator;
        private static assertAndThrowIfNeeded(isValid, errorName, message?);
        /**
          * @param {any} param The parameter to be validated
          */
        constructor(param: any);
        /**
          * The information provided by the caller
          * @param {string} source This parameter contains the information of the caller.
          * @returns {Validator} The validator instance used to do chain validation
          */
        from(source: string): Validator;
        /**
          * Checks whether the parameter is neither null nor undefined
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isNotNull(): Validator;
        /**
          * Checks whether the parameter is of a certain type; also validates against non-null.
          * @param {string} typeName The name of the expected type of the parameter
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isOfType(typeName: string): Validator;
        /**
          * Checks whether the parameter is a number; also validates against non-null.
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isNumber(): Validator;
        /**
          * Checks whether the parameter is a string; also validates against non-null.
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isString(): Validator;
        /**
          * Checks whether the parameter is a boolean; also validates against non-null.
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isBool(): Validator;
        /**
          * Checks whether the parameter is a non-zero number; also validates against non-null and isNumber.
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isNotZero(): Validator;
        /**
          * Checks whether the parameter is a non-empty ("") string; also validates against non-null and isString.
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isNotEmpty(): Validator;
        /**
          * Checks whether the parameter is true; also validates against non-null and isBool.
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isTrue(): Validator;
        /**
          * Checks whether the parameter is a positive number; also validates against non-null and isNumber.
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isPositive(): Validator;
        /**
          * Checks whether the parameter is no less than the given value; also validates against non-null and isNumber.
          * @param {number} value The value compares to.
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isGreaterThanOrEqualTo(value: number): Validator;
        /**
          * Checks whether the parameter is greater than the given value; also validates against non-null and isNumber.
          * @param {number} value The value compares to.
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isGreaterThan(value: number): Validator;
        /**
          * Checks whether the parameter is no larger than the given value; also validates against non-null and isNumber.
          * @param {number} value The value compares to.
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isLessThanOrEqualTo(value: number): Validator;
        /**
          * Checks whether the parameter is less than the given value; also validates against non-null and isNumber.
          * @param {number} value The value compares to.
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isLessThan(value: number): Validator;
        /**
          * Checks whether the parameter is equal to the given value (including null or undefined).
          * @param {number} value The value compares to.
          * @returns {Validator} The validator instance used to do chain validation if this validation passes
          */
        isEqualTo(value: any): Validator;
    }
}
/**
  * This module contains the basic definition implementations of the tools
  */
declare module DataViz.Tools {
    /**
      * This interface defines the general behavior of a tool
      */
    interface ITool {
        /**
          * Resets the tool
          */
        resetTool(): void;
    }
    /**
      * This interface defines a generic "pausable" behavior
      */
    interface IPausable {
        /**
          * Pauses the operation
          */
        pause(): void;
        /**
          * Resumes the operation
          */
        resume(): void;
        /**
          * Checks whether the operation is paused.
          * @returns {boolean} true if paused; false otherwise
          */
        isPaused(): boolean;
    }
    /**
      * A reusable implementation of the {@link IPausable}
      */
    class Pausable implements IPausable {
        private paused;
        constructor();
        /**
          * Implementing {@link IPausable#Pause}
          */
        pause(): void;
        /**
          * Implementing {@link IPausable#Resume}
          */
        resume(): void;
        /**
          * Implementing {@link IPausable#IsPaused}
          */
        isPaused(): boolean;
    }
    /**
      * A tool class factory helper
      */
    class ToolsFactory {
        private static toolsPool;
        /**
          * Builds a particular tool with a given class name.
          * @param {string} className The fully qualified class name of the tool
          * @returns {any} The tool instance or null if fails to build
          */
        static buildTool(className: string): any;
    }
}
/**
  * This module contains some helper functions
  */
declare module DataViz.Utils {
    /**
      * Get zoom ratio for the app to adjust some element sizes inside it
      * @returns number The zoom ratio to adjust element sizes
      */
    function getZoomRatioForApp(): number;
    /**
      * Get device zoom ratio
      * @returns number The zoom ratio of device
      */
    function getDeviceZoomRatio(): number;
    /**
      * Determines whether the application is running on an Office Web Application environment.
      */
    function isOnWac(): boolean;
    /**
      * A module to handle events according to differnt browers.
      */
    module BrowserHelper {
        /**
          * Determines whether the browser is IE.
          * @returns True if the browser is IE, false otherwise.
          */
        function isIE(): boolean;
        /**
          * Determines whether the browser is IE9.
          * @returns True if the browser is IE9, false otherwise.
          */
        function isIE9(): boolean;
        /**
          * Get the width of the svg element
          * @param {SVGSVGElement} node An svg node we need to get its width
          * @returns {number} The width of the svg element
          */
        function getSvgElementWidth(node: SVGSVGElement): number;
        /**
          * Get the height of the svg element
          * @param {SVGSVGElement} node An svg node we need to get its height
          * @returns {number} The height of the svg element
          */
        function getSvgElementHeight(node: SVGSVGElement): number;
    }
    /**
      * Removes a particular item from an array. If there are multiple matches in the array, all will be removed.
      * @param {any[]} array The array that the item is removed from
      * @param {any} item The item to remove
      * @returns True if succeeded; false otherwise (no such item)
      */
    function removeItemFromArray(array: any[], item: any): boolean;
    /**
      * Formats a number into a string with thousand separators. For example, 1234567 will becom 1,234,567; 1234567.12345 will become 1,234,567.12345
      * Only supports non-negative float numbers.
      * @param {string} value The value to format
      * @returns {string} The formatted string, or the original string if it's not a non-negative float number
      */
    function formatNumberWithThousandSeparators(value: string): string;
    /**
      * Make the buttons of a certain pane tapped in circle
      * @param {string} paneId The id of the target pane which will get the focus
      * @param {string} firstTabId The id of the element which is the first one getting focused
      * @param {string} lastTabId The id of the element which is the last one getting focused
      */
    function setTabFocus(paneId: string, firstTabId: string, lastTabId: string): void;
    /**
      * Replace all the specific sub-strings which contain a number and curly brace like "{1}" with meaningful strings.
      * @param {any[]} ...parameters The parameter[0] is the origin string and others are the replacing strings.
      * @returns {string} The replaced string.
      */
    function stringFormat(...parameters: any[]): string;
}
/**
  * This modules contains basic definitions, interfaces and base classes related to configurations
  */
declare module DataViz.Config {
    /**
      * The well known configuration keys used in this app
      */
    var wellKnownKeys: {
        theme: string;
        shape: string;
        layout: string;
        sku: string;
    };
    /**
      * This interface defines the behavior of the configuration change listener, which will be notified when any configuration value is changed
      */
    interface IConfigurationChangeListener {
        /**
          * The event when a certain configuration value is changed.
          * @param {string} key The key of the configuration value that is changing
          * @param {any} value The actual configuration value that is changing
          */
        onConfigurationChanged(key: string, value: any): void;
    }
    /**
      * This interface defines the behavior of the configurator, which reads/saves configurations from/to the host document
      */
    interface IConfigurator extends DataViz.Tools.ITool, IConfigurationChangeListener {
        /**
          * Loads all the values from the specified configuration
          * @param {Configuration} configuration The configuration to load
          */
        loadAll(configuration: Configuration): void;
        /**
          * Saves a configuration value specified by a particular key
          * @param {string} key The key of the configuration value to save
          * @param {any} value The value of the configuration
          */
        save(key: string, value: any): void;
    }
    /**
      * A configuration contains a set of key/value pairs which normally represent user settings, etc.
      */
    class Configuration {
        private settings;
        private changeListeners;
        private keys;
        private configurator;
        private delaySetTimeOutIDs;
        /**
          * @param {string[]} keys The keys of supported values in this configuration
          * @param {IConfigurator} configurator The configurator that can actually be used to load/save the configuration from/to host document
          */
        constructor(keys: string[], configurator: IConfigurator);
        /**
          * Resets the configuration
          */
        reset(): void;
        /**
          * Registers a configuration change listener. This method can be called multiple times to register multiple listeners.
          * @param {IConfigurationChangeListener} listener A configuration change listener to be registered.
          */
        registerListener(listener: IConfigurationChangeListener): void;
        /**
          * Unregisters a configuration change listener.
          * @param {@link IConfigurationChangeListener} listener: A configuration change listener to be unregistered.
          */
        unregisterListener(listener: IConfigurationChangeListener): void;
        /**
          * Loads all the configurations
          */
        loadAll(): void;
        /**
          * Clears all the configuration values
          */
        clear(): void;
        /**
          * Get a list of the keys of the supported configuration values
          * @returns {string[]} The keys of the supported configuration values
          */
        Keys: string[];
        /**
          * Gets a configuration value with the specified key
          * @param {string} key The key of the configuration value to get
          * @returns {any} The configuration value retrieved
          */
        get(key: string): any;
        /**
          * Sets a configuration value with the specified key
          * @param {string} key The key of the configuration value to set
          * @param {any} value The configuration value to set
          * @param {boolean} optional notifyListeners whether notify listeners, the default value is true
          */
        set(key: string, value: any, notifyListeners?: boolean): void;
        /**
          * Delay to set a configuration value with the specified key
          * @param {string} key The key of the configuration value to set
          * @param {any} value The configuration value to set
          * @param {number} optional delay time in milliseconds, the default value is one second
          */
        delaySet(key: string, value: any, delay?: number): void;
    }
}
/**
  * This module contains the basic definitions, constants, and base-classes of data related tasks
  */
declare module DataViz.Data {
    /**
      * The binding name used by the app
      */
    var DefaultBindingName: string;
    var ExtraBindingName: string;
    /**
      * This interface defines the behavior of the data change listener, which will get notified for data related events
      */
    interface IDataChangeListener {
        /**
          * The event when the bound data is being changed
          * @param {any} data The new data
          */
        onDataChanged(data: any): void;
        /**
          * The event when the binder is binding to a different target
          */
        onDataBindingTargetChanged(): void;
    }
    /**
      * This interface defines the behavior of the data convertor, which can convert the raw data (normally from host document) to the data of a particular form.
      * For example, the people bar data convertor can convert the raw data to data in key/value pairs
      */
    interface IDataConvertor extends DataViz.Tools.ITool, DataViz.Config.IConfigurationChangeListener {
        /**
          * Converts the raw data
          * @param {any} data The raw data to convert
          * @returns {any} The converted data
          */
        convert(data: any): any;
    }
    /**
      * This interface defines the behavior of the data binder, which can:
      *  - Get/set data from/to the host application
      *  - Bind data in the host application
      *  - Listen to data changes of the bound data
      */
    interface IDataBinder extends DataViz.Tools.ITool {
        /**
          * Registers a data change listener. This method can be called multiple times to register multiple listeners.
          * @param {IDataChangeListener} listener A data change listener to be registered.
          */
        registerDataChangeListener(listener: IDataChangeListener): void;
        /**
          * Unregisters a data change listener.
          * @param {@link IDataChangeListener} listener: A data change listener to be unregistered.
          */
        unregisterDataChangeListener(listener: IDataChangeListener): void;
        /**
          * Binds data by prompt
          * @param {(result: any) => any} [callback] The callback that will be called after the data binding is done. Optional.
          */
        bindByPrompt(callback?: (result: any) => any): void;
        /**
          * Binds the currently selected data
          * @param {(result: any) => any} [callback] The callback that will be called after the data binding is done. Optional.
          */
        bindBySelection(callback?: (result: any) => any): void;
        /**
          * Rebinds data directly using the default bind name
          * @param {() => any} [callback] The callback that will be called after the data binding is done. Optional.
          */
        rebind(callback?: () => any): void;
        /**
          * unbind data directly using the default bind name
          * @param {() => any} [callback] The callback that will be called after the data unbinding is done. Optional.
          */
        unbind(callback?: () => any): void;
        /**
          * Determines whether the binder is currently bound to any data
          * @returns {boolean} true if bound; false otherwise.
          */
        isBound(): boolean;
        /**
          * Retrieves the values of the bound data
          * @param {(data: any) => any} [callback] The callback that will be called after the values are retrieved. Required.
          */
        getData(callback: (data: any) => any): void;
        /**
          * Retrieves the values of the currently selected data
          * @param {(data: any) => any} [callback] The callback that will be called after the values are retrieved. Optional.
          */
        getSelectedData(callback: (data: any) => any): void;
    }
}
declare var $: any;
/**
  * This module contains the basic definitions, constants and base-classes of layout related tasks
  */
declare module DataViz.Chart {
    /**
      * This represents a single HTML attribute name/value pair in the layout HTML element
      */
    class Attribute {
        /**
          * The name of the attribute
          */
        name: string;
        /**
          * The value of the attribute
          */
        value: any;
    }
    /**
      * This  represents a single CSS style item in the layout HTML element
      */
    class Style {
        /**
          * The name of the style item
          */
        name: string;
        /**
          * The value of the style item
          */
        value: string;
    }
    /**
      * This represents a single HTML element in the layout definition
      */
    class LayoutElement {
        /**
          * The id of the element
          */
        id: string;
        /**
          * The parent id of the element
          */
        parentId: string;
        /**
          * The tag name of the element like "text", "line", "rect".
          */
        element: string;
        /**
          * The name of the CSS class for this element
          */
        cssClass: string;
        /**
          * A list of HTML attributes of this element. @see Attribute
          */
        attributes: Attribute[];
        /**
          * A list of CSS styles of this element. @see Style
          */
        styles: Style[];
        /**
          * A boolean to identify whether this element is resizable
          */
        resizable: boolean;
        /**
          * A boolean to identify whether this element only allows one line
          */
        forceOneLine: boolean;
    }
    /**
      * This represents the layout definition, which contains a set of element definitions
      */
    class Layout {
        /**
          * The id of the layout
          */
        id: string;
        /**
          * The HTML elements contained in this layout. @see LayoutElement
          */
        elements: LayoutElement[];
    }
    /**
      * This interface defines the behavior of the layout chage listener
      */
    interface ILayoutChangeListener {
        /**
          * The event when the whole layout is being changed
          * @param {Layout} layout The layout that is being changed
          */
        onLayoutChanged(layout: Layout): void;
        /**
          * The event when a particular element is being changed
          * @param {LayoutElement} layoutElement The layout element that is being changed
          */
        onLayoutElementChanged(layoutElement: LayoutElement): void;
        /**
          * The event when a particular element instance is being changed
          * @param {LayoutElement} layoutElement The layout element whose value is being changed
          * @param {any} value The new value of the layout element
          */
        onLayoutElementInstanceChanged(layoutElement: LayoutElement, value: any): void;
    }
    /**
      * A layout instance contains a set of layout element instances. It represents all the definitions of the HTML elements and the values for a concrete layout on the canvas
      */
    class LayoutInstance implements Config.IConfigurationChangeListener {
        private static Prefix;
        private changeListeners;
        private storage;
        private layout;
        private reentryFlag;
        private delaySetTimeOutIDs;
        /**
          * @param {Layout} layout The layout defination
          * @param {Config.IConfigurator} configurator The configurator used to load element instance values from the host document
          */
        constructor(layout: Layout, configurator: Config.IConfigurator);
        /**
          * Resets the layout instance
          */
        reset(): void;
        /**
          * Loads all the element instance values from the configuration
          */
        loadAll(): void;
        /**
          * Registers a layout change listener. This method can be called multiple times to register multiple listeners.
          * @param {ILayoutChangeListener} listener A layout change listener to be registered.
          */
        registerListener(listener: ILayoutChangeListener): void;
        /**
          * Unregisters a layout change listener.
          * @param {@link ILayoutChangeListener} listener: A layout change listener to be unregistered.
          */
        unregisterListener(listener: ILayoutChangeListener): void;
        /**
          * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
          */
        onConfigurationChanged(key: string, value: any): void;
        /**
          * Sets the value of a layout element with the specified id
          * @param {string} layoutElementId The id of the layout element
          * @param {any} value The value to set into the layout element
          */
        setValue(layoutElementId: string, value: any): void;
        /**
          * Sets the value of a layout element with the specified id, but doesn't notify the listeners
          * @param {string} layoutElementId The id of the layout element
          * @param {any} value The value to set into the layout element
          * @param {number} optional delay time in milliseconds, the default value is 300 milliseconds
          */
        delaySetValueNoNotify(layoutElementId: string, value: any, delay?: number): void;
        /**
          * Gets the value of a layout element with the specified id
          * @param {string} layoutElementId The id of the layout element
          * @returns {any} The value of the layout element instance
          */
        getValue(layoutElementId: string): any;
        private notifyChange(layoutElementId, value);
    }
    /**
      * The layout provider that takes care of the following tasks
      *  - Loads the pre-defined layouts into memory
      *  - Returns all the loaded layouts
      *  - Tracks (via listening to configuration changes) and returns the currently selected layout
      */
    class LayoutProvider implements Config.IConfigurationChangeListener {
        private static theInstance;
        private static version;
        private layouts;
        private currentLayoutId;
        static Instance: LayoutProvider;
        /**
          * Loads all the pre-defined layouts. This has to be called before calling any other methods of this class.
          * @param {() => any} callback The callback function that will be called after the loading is finished
          */
        loadAll(callback: () => any): void;
        /**
          * Gets all the loaded layouts.
          * @returns {Layout[]} All the loaded layouts
          */
        Layouts: Layout[];
        /**
          * Returns the default layout
          * @returns {Layout} The default layout (normally the first layout in the list)
          */
        Default: Layout;
        /**
          * Returns the id of current layout
          * @returns {string} The id of current layout
          */
        /**
          * Sets the current layout id
          * @param {string} id The layout id
          */
        CurrentLayoutId: string;
        /**
         * Returns the current layout
         * @returns {Layout} The current layout (if at least one is selected) or the default layout (if none is selected)
         */
        CurrentLayout: Layout;
        /**
          * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
          */
        onConfigurationChanged(key: string, value: any): void;
        private getLayoutById(id);
    }
}
/**
  * This module contains the basic definitions, constants and base-classes related to rendering
  */
declare module DataViz.Chart {
    /**
      * This interface defines the layouter behavior, which takes care of the rendering/positioning/styling of non-quantitative elements on the chart.
      * Non-quantitative elements normally are things like title, backdrop, separator or some other decorative elements that are not bound to any particular data
      */
    interface ILayouter extends DataViz.Tools.ITool, DataViz.Chart.ILayoutChangeListener, DataViz.Tools.IPausable {
        /**
          * Renders the layout.
          * @param {any} data The bound data to be visualized. The actual layouter might not need the data at all but we just provide it here just in case...
          */
        layout(data: any): void;
    }
    /**
      * This interface defines the plotter behavior, which takes care of the rendering/positioning/styling of quantitative elements on the chart.
      * Quantitiative elements include those such as labels, numbers, and shapes representing the data being bounded.
      */
    interface IPlotter extends DataViz.Tools.ITool, DataViz.Tools.IPausable {
        /**
          * Plots the data to the chart.
          * @param {any} data The bound data to be plotterd.
          */
        plot(data: any): void;
        /**
          * Delay plots the data to the chart.
          * @param {any} data The bound data to be plotterd.
          * @param {number} optional delay time in millisecond.
          */
        delayPlot(data: any, delay?: number): void;
    }
    /**
      * This interface defines the behavior of the visualization listener, which will be notified for events of the visualization life-cycle.
      */
    interface IVisualizationListener {
        /**
          * The event when the visualization is being started
          */
        onStartVisualizing(): void;
        /**
          * The event when the visualization has been ended
          */
        onEndVisualizing(): void;
    }
    /**
      * A class that takes care of the visualization.
      */
    class Visualizer implements DataViz.Tools.ITool {
        private layouter;
        private plotter;
        private visualizationRequestPending;
        private cachedData;
        private visualizationListeners;
        /**
          * @param {@link ILayouter} layouter The layouter instance that will do the actual layout actions
          * @param {@link IPlotter} plotter The plotter instance that will do the actual plotting operations
          */
        constructor(layouter: ILayouter, plotter: IPlotter);
        /**
          * Gets the cached data
          * @returns {string} the cached data of the SKU
          */
        CachedData: any;
        /**
          * Visualizes the data to the chart
            @param {any} data The data to be visualized
          */
        visualize(data: any): void;
        /**
          * Registers a visualization listener. This method can be called multiple times to register multiple listeners.
          * @param {IVisualizationListener} listener A visualization listener to be registered.
          */
        registerListener(listener: IVisualizationListener): void;
        /**
          * Unregisters a visualization listener.
          * @param {@link IVisualizationListener} listener: A visualization listener to be unregistered.
          */
        unregisterListener(listener: IVisualizationListener): void;
        /**
          * Implementing {@link ITool#resetTool}
          */
        resetTool(): void;
        private revisualize();
    }
}
/**
  * This module contains the controller implementation
  */
declare module DataViz.Control {
    /**
      * The controller behaves like a bridge or a middle man connecting several other components.
      * In general, it listens to certain events from some components and triggers certain operations of other components
      */
    class Controller implements Data.IDataChangeListener, Config.IConfigurationChangeListener {
        private visualizer;
        private dataBinder;
        private dataConvertor;
        private cachedData;
        private isRevisualizeOnThemeChange;
        /**
          * @param {Visualizer} visualizer The visualizer that will be used for visualization
          * @param {IDataBinder} dataBinder The data binder that will be used to bind data
          * @param {IDataConvertor} visualizer The data convertor that will be used to convert raw data
          */
        constructor(visualizer: Chart.Visualizer, dataBinder: Data.IDataBinder, dataConvertor: Data.IDataConvertor);
        /**
          * Binds data by prompt (delegate to the data binder)
          * @param {(result: any) => any} [callback] The callback that will be called after the data binding is done. Optional.
          */
        bindDataByPrompt(callback?: (result: any) => any): void;
        /**
          * Binds data by selection (delegate to the data binder)
          * @param {(result: any) => any} [callback] The callback that will be called after the data binding is done. Optional.
          */
        bindDataBySelection(callback?: (result: any) => any): void;
        /**
          * Rebinds data directly using the default bind name (delegate to the data binder)
          * @param {() => any} [callback] The callback that will be called after the data binding is done. Optional.
          */
        rebindData(callback?: () => any): void;
        /**
          * Tries to bind the currently selected data (delegate to the data binder)
          * @param {(result: any) => any} [callback] The callback that will be called after the data binding is done. Optional.
          */
        tryBindSelection(callback?: (result: any) => any): void;
        /**
          * Visualizes the given data (delegate to the visualizer)
          * @param {any} rawData The raw data to be visualized
          */
        visualizeData(rawData: any): void;
        /**
          * Revisualizes the cached data (if any)
          */
        revisualize(): void;
        /**
          * Whether revisualize on theme change
          * @param {boolean} isRevisualize set to true if revisualizing on theme change is true
          */
        revisualizeOnThemeChange(isRevisualize: boolean): void;
        /**
          * Implementing {@link IDataChangeListener#onDataChanged}
          */
        onDataChanged(rawData: any): void;
        /**
          * Implementing {@link IDataChangeListener#onDataBindingTargetChanged}
          */
        onDataBindingTargetChanged(): void;
        /**
          * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
          */
        onConfigurationChanged(key: string, value: any): void;
    }
}
/**
  * This module contains the basic definitions, constants and base-classes of customizable decoration related tasks
  */
declare module DataViz.Decoration {
    /**
      * The base class of a single definition in the customizable decoration
      */
    class Customizable {
        /**
          * The id of the item
          */
        id: string;
        /**
          * The thumbnail image URL of the item
          */
        thumbnail: string;
    }
    /**
      * This class represents a single theme definition
      */
    class Theme extends Customizable {
        /**
          * The ID of the SKU that uses this theme. Empty (null/""/undefined) if this theme is SKU-neutral.
          */
        sku: string;
        /**
          * The CSS URL of this theme
          */
        css: string;
    }
    /**
      * This class represents a single shape definition
      */
    class Shape extends Customizable {
        /**
          * The ID of the SKU that uses this shape. Empty (null/""/undefined) if this shape is SKU-neutral.
          */
        sku: string;
        /**
          * The data of the SVG <path> definition of this shape
          */
        path: string;
        /**
          * The original width of this shape
          */
        width: number;
        /**
          * The original height of this shape
          */
        height: number;
    }
    /**
      * The theme provider that takes care of the following tasks
      *  - Loads the pre-defined themes into memory
      *  - Returns all the loaded themes
      *  - Returns the themes for a particular SKU
      *  - Tracks (via listening to configuration changes) and returns the currently selected theme
      */
    class ThemeProvider implements Config.IConfigurationChangeListener {
        private static theInstance;
        private static version;
        private definitions;
        private currentThemeId;
        static Instance: ThemeProvider;
        /**
          * Loads all the pre-defined themes. This has to be called before calling any other methods of this class.
          * @param {() => any} callback The callback function that will be called after the loading is finished
          */
        loadAll(callback: () => any): void;
        /**
          * Gets all the loaded themes.
          * @returns {Theme[]} All the loaded themes
          */
        Themes: Theme[];
        /**
          * Enumerates all the themes for a particular SKU
          * @param {string} skuId The id of SKU
          * @returns {Theme[]} All the themes for a particular SKU, which include all the SKU-neutral themes
          */
        enumerateForSku(skuId: string): Theme[];
        /**
          * Returns the default theme
          * @returns {Theme} The default theme (normally the first theme in the list)
          */
        Default: Theme;
        /**
          * Returns the id of the current theme
          * @returns {string} The id of the current theme
          */
        /**
          * Sets the current theme id
          * @param {string} id The theme id
          */
        CurrentThemeId: string;
        /**
          * Returns the current theme
          * @returns {Theme} The current theme (if at least one is selected) or the default theme (if none is selected)
          */
        CurrentTheme: Theme;
        /**
          * Returns the CSS URL for the current theme
          * @returns {string} The CSS URL for the current theme
          */
        CurrentThemeCssUrl: string;
        /**
          * Gets the theme with the given id
          * @param {string} id The id of a theme
          * @returns {Theme} The theme with the given id or null if not found
          */
        getThemeById(id: string): Theme;
        /**
          * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
          */
        onConfigurationChanged(key: string, value: any): void;
    }
    /**
      * The shape provider that takes care of the following tasks
      *  - Loads the pre-defined shapes into memory
      *  - Returns all the loaded shapes
      *  - Returns the shapes for a particular SKU
      *  - Tracks (via listening to configuration changes) and returns the currently selected shape
      */
    class ShapeProvider implements Config.IConfigurationChangeListener {
        private static theInstance;
        private static version;
        private definitions;
        private currentShapeId;
        static Instance: ShapeProvider;
        /**
          * Loads all the pre-defined shapes. This has to be called before calling any other methods of this class.
          * @param {() => any} callback The callback function that will be called after the loading is finished
          */
        loadAll(callback: () => any): void;
        /**
          * Gets all the loaded shapes.
          * @returns {Shape[]} All the loaded shapes
          */
        Shapes: Shape[];
        /**
          * Enumerates all the shapes for a particular SKU
          * @param {string} skuId The id of SKU
          * @returns {Shape[]} All the shapes for a particular SKU, which include all the SKU-neutral shapes
          */
        enumerateForSku(skuId: string): Shape[];
        /**
          * Returns the default shape
          * @returns {Shape} The default shape (normally the first shape in the list)
          */
        Default: Shape;
        /**
          * Returns the id of current shape
          * @returns {string} The id of current shape
          */
        /**
          * Sets the current shape id
          * @param {string} id The shape id
          */
        CurrentShapeId: string;
        /**
          * Returns the current shape
          * @returns {Shape} The current shape (if at least one is selected) or the default shape (if none is selected)
          */
        CurrentShape: Shape;
        /**
          * Gets the shape with the given id
          * @param {string} id The id the shape to get
          * @returns {Shape} The shape with the given id or null if not found
          */
        getShapeById(id: string): Shape;
        /**
          * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
          */
        onConfigurationChanged(key: string, value: any): void;
    }
}
declare var $: any;
/**
  * This module contains the basic definitions, constants and base-classes of SKU related tasks
  */
declare module DataViz.SKUs {
    /**
      * The SKU definition
      */
    class SKUDefinition extends DataViz.Decoration.Customizable {
        /**
          * The display name
          */
        displayName: string;
        /**
          * The plotter class name
          */
        plotter: string;
        /**
          * The layouter class name
          */
        layouter: string;
        /**
          * The data binder class name
          */
        dataBinder: string;
        /**
          * The data convertor class name
          */
        dataConvertor: string;
        /**
          * The configurator class name
          */
        configurator: string;
        /**
          * The id of the default theme
          */
        defaultTheme: string;
        /**
          * The id of the default shape
          */
        defaultShape: string;
        /**
          * The id of the default layout
          */
        defaultLayout: string;
        /**
          * The sample data
          */
        sampleData: any;
    }
    /**
      * This represents an SKU instance, with all tools instantiated
      */
    class SKUInstance {
        private id;
        private plotter;
        private layouter;
        private dataBinder;
        private dataConvertor;
        private configurator;
        private visualizer;
        private controller;
        private themeId;
        private shapeId;
        private layoutId;
        private sampleData;
        /**
          * Creates an SKU instance from the SKU definition
          * @param {SKUDefinition} definition The SKU definition
          * @returns {SKUInstance} An SKU instance created or null if the creation fails
          */
        static fromDefinition(definition: SKUDefinition): SKUInstance;
        /**
          * Gets the id of the SKU
          * @returns {string} the id of the SKU
          */
        Id: string;
        /**
          * Gets the plotter used in this SKU
          * @returns {DataViz.Chart.IPlotter} The plotter instance
          */
        Plotter: DataViz.Chart.IPlotter;
        /**
          * Gets the layouter used in this SKU
          * @returns {DataViz.Chart.ILayouter} The layouter instance
          */
        Layouter: DataViz.Chart.ILayouter;
        /**
          * Gets the data binder used in this SKU
          * @returns {DataViz.Data.IDataBinder} The data binder instance
          */
        DataBinder: DataViz.Data.IDataBinder;
        /**
          * Gets the data convertor used in this SKU
          * @returns {DataViz.Data.IDataConvertor} The data convertor instance
          */
        DataConvertor: DataViz.Data.IDataConvertor;
        /**
          * The configurator used in the SKU
          * @returns {DataViz.Config.IConfigurator} The configurator instance
          */
        Configurator: DataViz.Config.IConfigurator;
        /**
          * Gets the visualizer in the SKU
          * @returns {DataViz.Chart.Visualizer} The visualizer instance
          */
        Visualizer: DataViz.Chart.Visualizer;
        /**
          * Gets the controller in the SKU
          * @returns {DataViz.Control.Controller} The controller instance
          */
        Controller: DataViz.Control.Controller;
        /**
          * Gets the id of the default theme of the SKU
          * @returns {string} The id of the default theme
          */
        ThemeId: string;
        /**
          * Gets the id of the default shape of the SKU
          * @returns {string} The id of the default shape
          */
        ShapeId: string;
        /**
          * Gets the id of the default layout of the SKU
          * @returns {string} The id of the default layout
          */
        LayoutId: string;
        /**
          * Gets the sample data of the SKU
          * @returns {any} The sample data
          */
        SampleData: any;
        /**
          * Resets the SKU (basically resets all the tools in the SKU)
          */
        reset(): void;
    }
    /**
      * The SKU provider that takes care of the following tasks
      *  - Loads the pre-defined SKUs into memory
      *  - Returns all the loaded SKUs
      *  - Tracks (via listening to configuration changes) and returns the currently selected SKU
      */
    class SKUProvider implements DataViz.Config.IConfigurationChangeListener {
        private static theInstance;
        private static version;
        private definitions;
        private currentSKUId;
        static Instance: SKUProvider;
        /**
          * Loads all the pre-defined SKUs. This has to be called before calling any other methods of this class.
          * @param {SKUDefinition[]} preDefines The pre-defined SKU configurations
          * @param {() => any} callback The callback function that will be called after the loading is finished
          */
        loadAll(preDefines: SKUDefinition[], callback: () => any): void;
        /**
          * Gets (lazy loading) all the loaded SKUs.
          * @returns {SKUDefinition[]} All the loaded SKUs
          */
        SKUs: SKUDefinition[];
        /**
          * Returns the default SKU
          * @returns {SKUDefinition} The default SKU (normally the first SKU in the list)
          */
        Default: SKUDefinition;
        /**
          * Returns the id of the current SKU
          * @returns {string} The id of the current SKU
          */
        /**
          * Sets the current SKU id
          * @param {string} id The SKU id
          */
        CurrentSKUId: string;
        /**
          * Returns the current SKU
          * @returns {SKUDefinition} The current SKU (if at least one is selected) or the default SKU (if none is selected)
          */
        CurrentSKU: SKUDefinition;
        /**
          * Returns the current SKU instance
          * @returns {SKUInstance} The current SKU instance (if at least one is selected) or null (if none is selected)
          */
        CurrentSKUInstance: SKUInstance;
        /**
          * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
          */
        onConfigurationChanged(key: string, value: any): void;
        private getSKUById(id);
    }
}
declare var Office: any;
/**
  * This module contains the implementation of the specific data binder of the app
  */
declare module Trends.Data.Agave {
    /**
      * This is the specific data binder of the app
      */
    class DataBinder implements DataViz.Data.IDataBinder {
        private isDataBound;
        private sendDataBindingTelemetry;
        private bindingName;
        private dataChangeListeners;
        private dataChangeHandler;
        constructor();
        /**
          * Implementing {@link ITool#resetTool}
          */
        resetTool(): void;
        /**
          * Implementing {@link IDataBinder#registerDataChangeListener}
          */
        registerDataChangeListener(listener: DataViz.Data.IDataChangeListener): void;
        /**
          * Implementing {@link IDataBinder#unregisterDataChangeListener}
          */
        unregisterDataChangeListener(listener: DataViz.Data.IDataChangeListener): void;
        /**
          * Implementing {@link IDataBinder#bindByPrompt}
          */
        bindByPrompt(callback?: (result: any) => any): void;
        /**
          * Implementing {@link IDataBinder#bindBySelection}
          */
        bindBySelection(callback?: () => any): void;
        /**
          * Implementing {@link IDataBinder#Rebind}
          */
        rebind(callback?: () => any): void;
        /**
          * Implementing {@link IDataBinder#getSelectedData}
          */
        getSelectedData(callback: (data: any) => any): void;
        /**
          * Implementing {@link IDataBinder#IsBound}
          */
        isBound(): boolean;
        /**
          * Implementing {@link IDataBinder#getData}
          */
        getData(callback: (data: Trends.Data.RawData) => any): void;
        /**
          * Implementing {@link IDataBinder#unbind}
          */
        unbind(callback?: () => any): void;
        private bind(prompt, callback?);
        getBindingName(): string;
        private bindInternal(prompt, callback?);
        private attachHandler(callback?);
        private detachHandler(bindingName, callback?);
        private notifyDataChange();
        private notifyBindingTargetChange();
        private detectHeader(data);
    }
}
declare var Office: any;
/**
  * This module contains the implementation of the app's specific configurator
  */
declare module DataViz.Config.Trends {
    /**
      * The configuration keys used in this app
      */
    var wellKnownKeys: {
        title: string;
        shortdes1Title: string;
        shortdes1Descript: string;
        longdesTitle: string;
        longdesDescript: string;
        firstRowContainerWidth: string;
        firstRowContainerHeight: string;
        titleWidth: string;
        titleHeight: string;
        lineChartWidth: string;
        lineChartHeight: string;
        legendWidth: string;
        legendHeight: string;
        secondRowContainerWidth: string;
        shortdes1GroupWidth: string;
        longdesGroupWidth: string;
        clickedPointIdArray: string;
        lineOrder: string;
        lineDisplay: string;
        lineTitleArray: string;
        bindingName: string;
        windowWidth: string;
        windowHeight: string;
        isLegendEdited: string;
    };
    var MaxLineNumber: number;
    var MaxColumnNumber: number;
    var Culture: string;
    /**
      * Reset clickedPointIdArray
      */
    function resetClickedPointIdArrays(): void;
    /**
      * Reset lineOrder
      */
    function resetLineOrder(): void;
    /**
      * Reset line display status
      */
    function resetLineDisplay(): void;
    /**
      * Reset line display status
      */
    function resetLineTitleArray(): void;
    class SampleDataProvider {
        private data;
        private renderData;
        constructor(jsonData: any);
        LineTitles: string[];
        RenderData: any;
        Title: string;
        SubTitle: string;
        SubTitleDescript: string;
        Shortdes1Title: string;
        Shortdes1Descript: string;
        Shortdes2Title: string;
        Shortdes2Descript: string;
        LongdesTitle: string;
        LongdesDescript: string;
        DataPoints: string[];
    }
    /**
      * This is the specific configurator of the app
      */
    class Configurator implements IConfigurator {
        private reentryFlag;
        constructor();
        /**
          * Implementing {@link ITool#resetTool}
          */
        resetTool(): void;
        /**
          * Implementing {@link IConfigurator#loadAll}
          */
        loadAll(configuration: Configuration): void;
        /**
          * Implementing {@link IConfigurator#Save}
          */
        save(key: string, value: any): void;
        /**
          * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
          */
        onConfigurationChanged(key: string, value: any): void;
    }
}
declare var $: any;
declare var Office: any;
declare module DataViz.UX {
    var infoColors: {
        red: string;
        green: string;
    };
    /**
      * This class is the Data Binding Dialog UI.
      */
    class BindingPane {
        private static bindingPaneStyle;
        private static sampleDataMaxRowNumber;
        private static defaultArgs;
        private selectionChangeHandler;
        private resizeHandler;
        private args;
        private bindingPaneElementsStyle;
        private selectedData;
        private bindingPaneDim;
        private bindingPane;
        private titleSpan;
        private subtitle;
        private sampleDataPane;
        private infoText;
        private buttonGroup;
        private buttonCancel;
        private buttonOk;
        private td;
        private zoomRatio;
        /**
          * Constructor
          */
        constructor();
        /**
          * Use new arguments to update the Data Binding UI and its event handlers.
          * @param {BindingPaneArgs} args The arguments used to update the binding pane
          */
        updateBindingPane(args: BindingPaneArgs): BindingPane;
        zoomBindingPane(): BindingPane;
        /**
          * Show the Data Binding UI.
          */
        show(): void;
        /**
          * Hide the Data Binding UI.
          */
        hide(): void;
        /**
          * Identify whether the string is numeric
          * @param {string} str The string need to be identified
          * @returns True if the string is numeric; false otherwise
          */
        setInfoTextAndButton(text: string, textColor: string, buttonEnable: boolean): void;
        bindingData: any;
        handleDataSelection(): void;
        private updateArgs(args);
        private handleArgs();
        private setEventHandler(funcOK?, funcCancel?);
        private setSampleData(sampleData?);
        private resetPaneContentPosition();
        private handleStyleInHDPI(elementId, classNameArray);
    }
    interface BindingPaneArgs {
        sampleData?: any;
        handleDataSelection?: any;
        buttonOKCallback?: any;
        buttonCancelCallback?: any;
        title?: any;
        subtitle?: any;
        infoText?: any;
        buttonOKText?: any;
        buttonCancelText?: any;
    }
}
declare var ScriptsResources: any;
declare module DataViz.Resources {
    class UI {
        static backButtonTitle: string;
        static floatMenuDataTitle: string;
        static floatMenuSettingTitle: string;
        static defaultLegendName: string;
    }
    class DataPane {
        static header: string;
        static selectButtonText: string;
    }
    class SettingPane {
        static header: string;
        static themeTab: string;
        static themeTitles: string[];
    }
    class SampleData {
        static title: string;
        static shortDescriptionTitle: string;
        static shortDescription: string;
        static longDescriptionTitle: string;
        static longDescription: string;
        static legend1: string;
        static legend2: string;
        static time1: string;
        static time2: string;
        static time3: string;
        static time4: string;
        static time5: string;
        static time6: string;
        static time7: string;
        static time8: string;
        static time9: string;
    }
    class Pluralization {
        static rows: string;
        static columns: string;
    }
    class BindingPane {
        static infoNormal: string;
        static infoMaxRow: string;
        static infoMaxColumn: string;
        static infoMaxRowAndColumn: string;
        static infoDataSetTooLarge: string;
        static infoFirstRowEmpty: string;
        static infoFirstColumnEmpty: string;
        static infoSelectData: string;
        static infoSelectTwoColumns: string;
        static infoSecondColumnContainNumber: string;
        static title: string;
        static subtitle: string;
        static buttonOKText: string;
        static buttonCancelText: string;
        static sampleDataHeader1: string;
        static sampleDataHeader2: string;
        static sampleDataHeader3: string;
        static sampleDataTime1: string;
        static sampleDataTime2: string;
        static sampleDataTime3: string;
    }
}
declare var $: any;
declare var Office: any;
declare module DataViz.UX {
    class BindingPaneSpecific extends BindingPane {
        private static instance;
        /**
          * Get the singleton instance.
          */
        static getInstance(): BindingPaneSpecific;
        handleDataSelection(): void;
        private isFirstColumnNonEmpty(value);
        private isSecondColumnHasNumber(value);
        private isFirstRowNonEmpty(value);
        private isDataValid(data);
        private getPluralString(combinedStr, count);
    }
}
declare var $: any;
/**
  * This modules contains the implementation of the galleries
  */
declare module DataViz.UX.Shared {
    /**
      * This defines the basic styles of a thumbnail icon in the gallery
      */
    interface IconStyle {
        /**
          * The left margin
          */
        marginLeft: number;
        /**
          * The top margin
          */
        marginTop: number;
        /**
          * The width
          */
        width: number;
        /**
          * The height
          */
        height: number;
    }
    /**
      * The base class of all the gallery classes
      */
    class BaseGallery implements Config.IConfigurationChangeListener {
        icons: Decoration.Customizable[];
        currentIconId: string;
        private parentId;
        private reentryFlag;
        private iconStyle;
        private configurationKey;
        constructor(parentId: string, iconStyle: IconStyle, configurationKey: string);
        /**
          * Sets up the listeners
          */
        setupListener(): void;
        /**
          * Populates the gallery
          */
        populate(iconNames: string[]): void;
        /**
          * Refreshes the list of the backed customizable items
          * This ought to be "protected" but unfortunately TypeScript doesn't support "protected" members when the source code is published.
         */
        refreshList(): void;
        /**
          * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
          */
        onConfigurationChanged(key: string, value: any): void;
        private updatePaneBorder(iconId);
        private setIconClickListener(iconId, index);
        private iconClickAction(event, index);
        private apply(iconId);
    }
    /**
      * The theme gallery
      */
    class ThemeGallery extends UX.Shared.BaseGallery {
        /**
          * Builds and returns a theme gallery instance
          * @returns {ThemeGallery} A theme gallery instance
          */
        static build(): ThemeGallery;
        constructor(parentId: string, iconStyle: IconStyle, configurationKey: string);
        /**
          * Overriding {@link BaseGallery#refreshList}
          */
        refreshList(): void;
    }
    /**
      * The shape gallery
      */
    class ShapeGallery extends UX.Shared.BaseGallery {
        /**
          * Builds and returns a shape gallery instance
          * @returns {ShapeGallery} A shape gallery instance
          */
        static build(): ShapeGallery;
        constructor(parentId: string, iconStyle: IconStyle, configurationKey: string);
        /**
          * Overriding {@link BaseGallery#refreshList}
          */
        refreshList(): void;
    }
    /**
      * The chart type (SKU) gallery
      */
    class TypeGallery extends UX.Shared.BaseGallery {
        /**
          * Builds and returns a chart type (SKU) gallery instance
          * @returns {TypeGallery} A chart type gallery instance
          */
        static build(): TypeGallery;
        constructor(parentId: string, iconStyle: IconStyle, configurationKey: string);
        /**
          * Overriding {@link BaseGallery#refreshList}
          */
        refreshList(): void;
    }
}
declare var $: any;
declare module DataViz.UX {
    interface MenuButtonMap {
        buttonId: string;
        paneId: string;
    }
    class SettingPane {
        private static theInstance;
        private static currentButtonId;
        private menuButtonMap;
        private themeGallery;
        constructor();
        setupListeners(): void;
        static Instance: SettingPane;
        show(): void;
        hide(): void;
        populate(): void;
        private setMenuClickListener();
        private menuClickAction(event);
        private showInternalPane(paneId);
    }
}
declare var $: any;
declare module DataViz.UX {
    class DataPane {
        private static theInstance;
        private reentryFlag;
        private titleChanged;
        constructor();
        static Instance: DataPane;
        onDataBindingTargetChanged(): void;
        show(): void;
        hide(): void;
        private init();
        private setText();
        private setEventHandlers();
    }
}
declare var $: any;
declare module Trends.UX {
    class MainUX {
        private hideFloatMenuTimeoutId;
        constructor();
        init(): void;
        setupListeners(): void;
        private setText();
        private showDataPane();
        private showSettingPane();
        private showFloatMenu();
        private hideFloatMenu();
    }
}
declare var $: any;
declare var Office: any;
/**
  * This is the main module containing the entry point of the app.
  */
declare module DataViz {
    /**
      * The main app instance
      */
    var mainApp: App;
    /**
      * This class represents the primary entry-point and workflow of the app
      */
    class App implements DataViz.Config.IConfigurationChangeListener, DataViz.Chart.IVisualizationListener {
        private static paneWidth;
        private static configurationKeys;
        private mainUX;
        private currentSKU;
        private configuration;
        private layoutInstance;
        private reentryFlag;
        private bindingPane;
        constructor();
        /**
          * Gets the current SKU instance
          * @returns {DataViz.SKUs.SKUInstance} The current SKU instance
          */
        CurrentSKU: DataViz.SKUs.SKUInstance;
        /**
          * Gets the configuration instance
          * @returns {Config.Configuration} The configuration instance
          */
        Configuration: DataViz.Config.Configuration;
        /**
          * Gets the layout instance
          * @returns {DataViz.Chart.LayoutInstance} The layout instance
          */
        LayoutInstance: DataViz.Chart.LayoutInstance;
        /**
          * Initializes the app
          */
        init(): void;
        /**
          * Binds to the selected cells (by prompt)
          */
        bindData(): void;
        onConfigurationChanged(key: string, value: any): void;
        onStartVisualizing(): void;
        onEndVisualizing(): void;
        private tearDownCurrentSKU();
        private setupNewSKU();
        private initLayoutElementConfig(key, sampleValue);
    }
}
/**
  * This module contains the implementation of the People Bar specific data covnertor
  */
declare module Trends.Data {
    interface RawData {
        hasHeader: boolean;
        formatted: any;
        unformatted: any;
    }
    interface PointDataOnLine {
        originalIndex: number;
        formatted: string;
        unformatted: number;
    }
    interface LineDataConverted {
        validDataCount: number;
        data: PointDataOnLine[];
    }
    interface BindingData {
        header: string[];
        xData: string[];
        yData: LineDataConverted[];
    }
    /**
      * This is the specific data convertor implementation of the app
      */
    class DataConvertor implements DataViz.Data.IDataConvertor {
        /**
          * Implementing {@link ITool#resetTool}
          */
        resetTool(): void;
        /**
          * Determines whether the binding is a table and its column number is more than one
          * @param {any} binding used to get data.
          * @returns {boolean} True if the binding is valid; false otherwise
          */
        static isBindingValid(binding: any): boolean;
        /**
          * Implementing {@link IDataConvertor#Convert}
          * @param {RawData} the raw data contains both formatted and unformatted data.
          * Example: data.formatted: [["21-Jul", "$41.00"], ["22-Jul", "$29.00"], ...]
          *          data.unformatted: [[41476, 41], [41477, 29], ...]
          * @returns {BindingData} The converted data
          */
        convert(data: RawData): BindingData;
        /**
          * Implementing {@link IConfigurationChangeListener#onConfigurationChanged}
          */
        onConfigurationChanged(key: string, value: any): void;
        private isDataValid(data);
    }
}
declare var d3: any;
declare var $: any;
/**
  * This module contains the implementation of the base layouter
  */
declare module Trends.Chart {
    /**
      * The base class of all layouters based on D3
      */
    class Layouter extends DataViz.Tools.Pausable implements DataViz.Chart.ILayouter {
        private static originWindowWidth;
        private static originWindowHeight;
        private static bodyOriginPadding;
        private static bodyOriginMinWidth;
        private static bodyOriginMinHeight;
        private static bodyFinalMinWidth;
        private static bodyFinalMinHeight;
        private static floatMenuOriginHeight;
        private static xGrid;
        private static yGrid;
        private static deviationWidth;
        private cachedData;
        private cachedLayoutElementInstances;
        private currentLayout;
        private layoutElements;
        private firstRelayout;
        static getZoomRatioRelativeLast(): ZoomRatio;
        static getZoomRatioRelativeOrigin(): ZoomRatio;
        constructor();
        /**
          * Implementing {@link ITool#resetTool}
          */
        resetTool(): void;
        /**
          * Implementing {@link ILayouter#Layout}
          */
        layout(data: any): void;
        /**
          * Implementing {@link ILayoutChangeListener#onLayoutChanged}
          */
        onLayoutChanged(layout: DataViz.Chart.Layout): void;
        /**
          * Implementing {@link ILayoutChangeListener#onLayoutElementChanged}
          */
        onLayoutElementChanged(layoutElement: DataViz.Chart.LayoutElement): void;
        /**
          * Implementing {@link ILayoutChangeListener#onLayoutElementInstanceChanged}
          */
        onLayoutElementInstanceChanged(layoutElement: DataViz.Chart.LayoutElement, value: any): void;
        private relayout();
        private layoutOneElement(layoutElement);
        private handleNonContentLengthInHDPI(jqueryElement);
        private layoutOneElementInstance(layoutElementId, value);
        private onElementResize(element, elementWidth, elementOriginWidth, peerElement1, peerElement2);
        private setWindowResizeListener();
        private handleWindowResizeWidth(windowWidth);
        private handleWindowResizeHeight(windowHeight);
        private setWidth(layoutElement, width);
        private setHeight(layoutElement, height);
    }
    class ElementWithFixedProperties {
        private element;
        private elementNonContentWidth;
        private elementMinWidth;
        private elementNonContentHeight;
        private elementMinHeight;
        private elementFixedHeight;
        constructor(elementId: string, isHeightFixed: boolean);
        Element: any;
        ElementNonContentWidth: number;
        ElementMinWidth: number;
        ElementNonContentHeight: number;
        ElementMinHeight: number;
        ElementFixedHeight: number;
        getBorderWidth(): number;
        getBorderHeight(): number;
        private getElementNonContentWidth(element);
        private getElementNonContentHeight(element);
    }
    class LayoutElements {
        private body;
        private floatMenuParent;
        private firstRowContainer;
        private secondRowContainer;
        private titleParent;
        private lineChart;
        private legend;
        private shortdes1Group;
        private longdesGroup;
        constructor();
        resetLayoutElements(): void;
        Body: ElementWithFixedProperties;
        FloatMenuParent: ElementWithFixedProperties;
        FirstRowContainer: ElementWithFixedProperties;
        SecondRowContainer: ElementWithFixedProperties;
        TitleParent: ElementWithFixedProperties;
        LineChart: ElementWithFixedProperties;
        Legend: ElementWithFixedProperties;
        Shortdes1Group: ElementWithFixedProperties;
        LongdesGroup: ElementWithFixedProperties;
    }
    class ZoomRatio {
        widthRatio: number;
        heightRatio: number;
        maxRatio: number;
        minRatio: number;
        constructor(widthRatio: number, heightRatio: number);
    }
}
declare var d3: any;
declare var $: any;
declare module Trends.Chart {
    interface ChangedDataSet {
        beDeletedIds: number[];
        beRevisedIds: number[];
        reviseIds: number[];
        beAddedIds: number[];
    }
    class LineChartPlotter extends DataViz.Tools.Pausable implements DataViz.Chart.IPlotter {
        private static durationTime;
        private static radius;
        private static fontSize;
        private static defaultYLableFontSize;
        private static defaultXLableFontSize;
        private static legendFontSize;
        private static checkBoxLength;
        private static xAxisPaddingBottm;
        private static xTickWidth;
        private static marginRight;
        private static marginTop;
        private static marginBottom;
        private static maxTextLength;
        private static defaultYTickNumber;
        private static pointRadio;
        private static pointRadioForMore;
        private static pointHoverRadio;
        private static pointHoverRadioForMore;
        private static lineWidth;
        private static lineWidthForMore;
        private static beSmallerLeastPointNumber;
        private static resetAction;
        private zoomRatio;
        private configuration;
        private bindingData;
        private lineChartHeight;
        private lineChartWidth;
        private max;
        private min;
        private linePlotter;
        private xAxis;
        private yAxis;
        private clickedPointIdArray;
        private lineOrder;
        private lineDisplay;
        private lineTitleArray;
        private lineChart;
        private legendGroup;
        private lineNumber;
        private columnNumber;
        private delayPlotTimeoutId;
        private xAxisWidth;
        private currentXTickNumber;
        private currentYTickNumber;
        private isLegendEdited;
        constructor();
        /**
          * Implementing {@link ITool#resetTool}
          */
        resetTool(): void;
        /**
          * Implementing {@link IPlotter#delayPlot}
          */
        delayPlot(data: Trends.Data.BindingData, delay?: number): void;
        /**
          * Implementing {@link IPlotter#plot}
          */
        plot(data: Trends.Data.BindingData): void;
        setWidth(width: number): void;
        setHeight(height: number): void;
        private onDataChanged(newData);
        private initData(convertedData);
        private drawLineChart();
        private getMaxYLabelWidth(yTicks);
        private getFirstMaxRadius();
        private drawXLabelAndTicks();
        private drawYLabelAndTicks();
        private drawXLabel(xTicks);
        private drawLegend();
        private drawLine(lineId);
        private drawCircleGroup(pointId, beAnimated);
        private getLineIdFromLineTitleId(lineTitleId);
        private getLineIdFromCheckboxId(checkboxId);
        private getLineIdFromPointId(pointId);
        private getColumnFromPointId(pointId);
        private getNumberFromString(orgString, startString, endString);
        private promoteLineToTop(lineId);
        private setMaxAndMin();
        private isPercentageFormat();
        private getSvgElementWidth(elementId);
    }
}
/**
  * This module contains the pre-defined SKU configs
  */
declare module DataViz.SKUs {
    class Predefines {
        private static instance;
        static Instance: Predefines;
        /**
          * Get all the definitions of SKUs
          * @returns {DataViz.SKUs.SKUDefinition[]} SKU definitions
          */
        getAll(): DataViz.SKUs.SKUDefinition[];
        private getDefault();
    }
}
