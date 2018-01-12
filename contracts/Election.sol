pragma solidity ^0.4.2;

contract Election {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Ugh, do a candidates struct, and give it an ID...


    // Keeps track that an address voted
    mapping(address => bool) voters;
    // Gives us access to the candidates's index publicly
    // You must keep track of a candidates count;
    uint public candidatesCount;
    mapping(uint => Candidate) public candidates;

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
        // 
        // Do this with a mapping

        // mark voted true

        // update candidate vote counter

        // trigger voted event
    }
}
