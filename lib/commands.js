/*
 * cylon-wemo commands
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Chris Taylor
 * Licensed under the MIT License (MIT).
 */

"use strict";

module.exports = [

/**
 * Gets the state of the WeMo
 *
 * @param {Function} callback
 * @export
 */
	"getBinaryState",

/**
 * Sets state of the WeMo
 *
 * @param {Number} state Either 1 for on, or 0 for off
 * @param {Function} callback
 * @export
 */
	"setBinaryState",

/**
 * Sets state of the WeMo
 *
 * @param {state} state Either 1 for on, or 0 for off
 * @returns (Promise}
 * @export
 */
	"setPowerState",

	/**
	 * Sets state of the WeMo
	 *
	 * @param {state} state Either 1 for on, or 0 for off
	 * @returns (Promise}
	 * @export
	 */
	"getPowerState",

	/**
	 * Sets state of the WeMo
	 *
	 * @param {state} state Either 1 for on, or 0 for off
	 * @returns (Promise}
	 * @export
	 */
	"getConsumption",
/**
 * gets status of the WeMo
 *
 * @returns (Promise}
 * @export
 */
	"getInsightStatus",

	/**
	 * gets status of the WeMo
	 *
	 * @returns (Promise}
	 * @export
	 */
	"getInsightParams"


];
