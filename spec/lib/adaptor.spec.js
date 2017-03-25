"use strict";

var Cylon = require("cylon");

var Adaptor = source("adaptor");

describe("Adaptor", function() {
  var adaptor = new Adaptor({ip:"192.168.2.1"});

  it("is a Cylon adaptor", function() {
    expect(adaptor).to.be.an.instanceOf(Cylon.Adaptor);
  });

  it("must provide ip", function () {
	  var err = function() {
		  return new Adaptor();
	  };

  	expect(err).to
		.throw({
  			code:require("../../errors").MISSING_FIELD ,
			message:"No ip specified for Wemo adaptor. Cannot proceed"
  		});
  });

});
