var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
    // Smoke test
    it("initializes with an address", function() {
        return Election.deployed().then(function(instance) {
            return instance.address;
        }).then(function(address) {
            assert.notEqual(address, 0x0);
        });
    });

    it("initializes with two candidates", function() {
        return Election.deployed().then(function(instance) {
            return instance.candidatesCount();
        }).then(function(count) {
            assert.equal(count, 2);
        });
    });

    it("it initializes with correct candidate names", function() {
        return Election.deployed().then(function(instance) {
            return instance;
        }).then(function(instance) {
            assert.equal(instance.candidates(1), "Candidate 1");
            assert.equal(instance.candidates(2), "Candidate 2");
        });
    });
});
