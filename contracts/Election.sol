pragma solidity ^0.4.2;

contract Election {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Keeps track that an address voted
    mapping(address => bool) voters;
    // Keeps track of candidates
    mapping(uint => Candidate) public candidates;
    // Keeps track of candidates to compare ids
    uint public candidatesCount;

    // voted event

    // We could initialize this with other values, but let's keep it simple for now.
    function Election () {
        // Refactor This?
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, "Candidate 1", 0);
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, "Candidate 2", 0);
    }

    function vote (uint _candidateIndex) public {
        // require that they haven't voted before
        // require a valid candidate; make sure the name isn't empty string?
        // Compare candidate index with candidate id here;

        // mark voted true

        // update candidate vote counter

        // trigger voted event
    }
}
