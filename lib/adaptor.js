/*
 * cylon-wemo adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Chris Taylor
 * Licensed under the MIT License (MIT).
 */

"use strict";

var Cylon = require("cylon");
var Commands = require("./commands");
var WeMo = require("wemo-client");
var wemo = new WeMo();
var errors = require("../errors");
var http = require("http");
var url = require("url");


var Adaptor = module.exports = function Adaptor(opts) {
	Adaptor.__super__.constructor.apply(this, arguments);

	opts = opts || {};

	this.ip = opts.ip;
	this.port = opts.port || 49153;
	this.host = this.ip + ":" + this.port;
	this.setupUrl = "http://" + this.host + "/setup.xml";

	if(!this.ip){
		var e = {code:errors.MISSING_FIELD ,message:"No ip specified for Wemo adaptor. Cannot proceed"};
		throw e;
	}
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function (callback) {

	//wemo.discover(cb);

	this.testConnection(function(err){
		if(err){
			return callback(err);
		}
	});
	wemo.load(this.setupUrl, cb.bind(this));

	function cb(deviceInfo) {
		this.connector = wemo.client(deviceInfo);
		this.proxyMethods(Commands, this.connector, this);

		//this.events = ["binaryState"];
		this.defineAdaptorEvent("binaryState");
		this.defineAdaptorEvent('error');
		this.connector.on('binaryState', function(value){
			console.log("hello");
		});

		return callback();
	}

	//return callback(new Error("connecting to wemo"), null );

};

Adaptor.prototype.testConnection = function(callback){
	try {
		var request = require('sync-request');
		if(this.ip){
			var res = request('OPTIONS', this.setupUrl);
		}
		if(this.host){
			var res = request('OPTIONS', this.setupUrl);
		}
	} catch (e) {
		var error = 'http://' + this.ip + ':' + this.port + ' is not a valid host';
		callback(error);
	}
};

Adaptor.prototype.disconnect = function (callback) {
	callback();
};
