var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
    it("initializes correctly", function() {
        return Election.deployed().then(function(instance) {
            return instance.getValue.call();
        }).then(function(data) {
            assert.equal(data, "Hello, world!");
        });
    });
});
