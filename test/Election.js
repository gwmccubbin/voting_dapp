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

    it("it initializes with correct candidate name", function() {
        return Election.deployed().then(function(instance) {
            // For some reason I can't just pass in the instance here...
            return instance.candidates(1);
        }).then(function(candidate) {
            assert.equal(candidate[1], "Candidate 1");
        });
    });
});
