pragma solidity ^0.4.11;

contract Election {
    // Struct
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Keeps track that an address voted
    mapping(address => bool) public voters;
    // Keeps track of candidates
    mapping(uint => Candidate) public candidates;
    // Keeps track of candidates to compare ids
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    function Election () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate (string _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that candidate has voted
        voters[msg.sender] = true;

        // update candidate vote counter
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        votedEvent(_candidateId);
    }
}
