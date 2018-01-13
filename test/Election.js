var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts) {
    var electionInstance;
    var candidateId;
    var candidate;

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

    it("it initializes the candidates with the correct values", function() {
        return Election.deployed().then(function(instance) {
            // For some reason I can't just pass in the instance here...
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate) {
            assert.equal(candidate[0], 1, "contains the correct id");
            assert.equal(candidate[1], "Candidate 1", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");

            return electionInstance.candidates(2);
        }).then(function(candidate) {
            assert.equal(candidate[0], 2, "contains the correct id");
            assert.equal(candidate[1], "Candidate 2", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
        });
    });

    it("allows a voter to cast a vote", function() {
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            candidateId = 1;
            return electionInstance.vote(candidateId, { from: accounts[0] });
        }).then(function(receipt) {
            // Test that article event was triggered here
            return electionInstance.candidates(1);
        }).then(function(candidate) {
            var voteCount = candidate[2];
            assert.equal(voteCount, 1, "increments the candidate's vote count");
        })
    });
});
