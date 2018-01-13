pragma solidity ^0.4.11;

contract Election {
    // Struct
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Keeps track that an address voted
    mapping(address => bool) voters; // TODO: public for debugging
    // Keeps track of candidates
    mapping(uint => Candidate) public candidates;
    // Keeps track of candidates to compare ids
    uint public candidatesCount;

    // voted event

    function Election () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate (string _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateIndex) public {
        // require that they haven't voted before
        // msg.sender is the address that sent the transaction
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateIndex > 0 && _candidateIndex <= candidatesCount);

        // record that candidate has voted
        voters[msg.sender] = true;

        // update candidate vote counter
        candidates[_candidateIndex].voteCount ++;

        // trigger voted event
    }
}
