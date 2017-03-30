/*
 * cylon-wemo driver
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Chris Taylor
 * Licensed under the MIT License (MIT).
 */

"use strict";

var Cylon = require("cylon"),
	Commands = require("./commands");

var Driver = module.exports = function Driver(opts) {

	Cylon.Logger.info("Driver#construct");

	Driver.__super__.constructor.apply(this, arguments);

	this.setupCommands(Commands);

	this.opts = opts || {};

};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function (callback) {

	Cylon.Logger.info("Driver#start");

	this.connection.on("binaryState", function(value){
		console.log("hello");
	});
	//
	//this.defineDriverEvent("binaryState");

	this.connection.on('error', function(err){
		console.log('error');
	});

	callback();

};

Driver.prototype.halt = function (callback) {

	Cylon.Logger.info("Driver#halt");

	callback();

};

//Commands
Driver.prototype.setPowerState = function(opts) {
	var self = this;

	return new Promise(function(resolve,reject){
		if (!opts.state) {
			reject("must provide state");
		}
		if(!opts.state === "0" && !opts.state === "1"){
			reject("state must be either 0 or 1");
		}
		self.connection.setBinaryState(opts.state, function(err, result){
			if(err){
				reject({success:false, error:err});
			}
			console.log(result);
			resolve({success: true});
		});
	});
};
Driver.prototype.getPowerState = function(opts) {
	self.connection.getBinaryState();
};

Driver.prototype.getConsumption = function(){
	var self = this;
	return new Promise(function(resolve,reject){
		self.connection.getInsightParams(function(err, binaryState, instantPower, data){
			if(err){
				reject(err);
			}
			var power = (instantPower / 1000);
			power = (power / 1000); //convert from w to kw
			resolve({kw: power});
		});
	});
};

Driver.prototype.getInsightStatus = function(){
	var self = this;
	return new Promise(function(resolve,reject){
		self.connection.getInsightParams(function(err, binaryState, instantPower, data){
			if(err){
				reject(err);
			}
			var result = {};
			result.binaryState = binaryState;
			result.instantPower = instantPower;
			result.data = data;
			resolve(result);
		});
	});
};
