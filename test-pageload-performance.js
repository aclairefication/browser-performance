import test from 'ava';
import chai from 'chai';

const PAGE_LOAD_THRESHOLD_MS = 5000;
const URL = "https://www.amazon.com/"

var dom_load_time = 0;
var client_load_time = 0;

var Glance = require("glance-webdriver").default;
var glance = new Glance({
    driverConfig: { desiredCapabilities: {browserName: 'chrome'} }
});

chai.should(); //injects this method into all objects so you can use it

test("Amazon home page load performance", async t =>{

    let loadTimes = await glance
        .url(URL)
        .execute(function(){
            return performance.timing
        });

    console.log(loadTimes);

    dom_load_time = loadTimes.domComplete - loadTimes.domLoading;
    client_load_time = loadTimes.loadEventEnd - loadTimes.domLoading;

    console.log("DOM load time is", loadTimes.domComplete - loadTimes.domLoading, "ms");
    console.log("Client side time is", loadTimes.loadEventEnd - loadTimes.domLoading,"ms");

    client_load_time.should.be.below(PAGE_LOAD_THRESHOLD_MS);

    await glance.end();
});