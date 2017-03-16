/*
 * cylon-wemo adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Chris Taylor
 * Licensed under the MIT License (MIT).
 */

"use strict";

var Cylon = require("cylon");
var	WeMo = require("wemo-client");
var	Commands = require("./commands");
var http = require("http");
var url = require("url");

var wemo = new WeMo();

var Adaptor = module.exports = function Adaptor(opts) {

	Cylon.Logger.info("Adaptor#construct");

	Adaptor.__super__.constructor.apply(this, arguments);

	opts = opts || {};

	if(opts.ip){
		this.ip = opts.ip;
		this.port = opts.port || 49153;
		this.host = this.ip + ":" + this.port;
		this.setupUrl = "http://" + this.host + "/setup.xml";
	} else if(opts.host) {
		this.host = opts.host;
		this.setupUrl = "http://" + this.host + "/setup.xml";
	}

	this.connector = null;

};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.connect = function (callback) {

	Cylon.Logger.info("Adaptor#connect");
	var adaptor = this;

	var cb = function cb(deviceInfo) {
		this.connector = wemo.client(deviceInfo);
		this.proxyMethods(Commands, this.connector, this);

		//this.events = ["binaryState"];
		this.defineAdaptorEvent("binaryState");
		this.defineAdaptorEvent('error');
		this.connector.on('binaryState', function(value){
			console.log("hello");
		});

		callback();
	}.bind(this);

	if(this.setupUrl){
		this.testConnection();
		wemo.load(this.setupUrl, cb);
	}

	wemo.discover(cb);
};

Adaptor.prototype.testConnection = function(){
	try {
		var request = require('sync-request');
		if(this._ip){
			var res = request('OPTIONS', this.setupUrl);
		}
		if(this._host){
			var res = request('OPTIONS', this.setupUrl);
		}

	} catch (e) {
		//console.log(e);
		throw new Error('http://' + this._ip + ':' + this._port + ' is not a valid host');
	}
};

Adaptor.prototype.disconnect = function (callback) {

	Cylon.Logger.info("Adaptor#disconnect");

	// Don"t need to do anything

	callback();

};
