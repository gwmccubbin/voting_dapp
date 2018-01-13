pragma solidity ^0.4.11;

contract Election {
    // Data structure; read values by index
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Keeps track that an address voted
    mapping(address => bool) public voters; // TODO: public for debugging
    // Keeps track of candidates
    mapping(uint => Candidate) public candidates;
    // Keeps track of candidates to compare ids
    uint public candidatesCount;

    // voted event

    // We could initialize this with other values, but let's keep it simple for now.
    function Election () {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }

    function addCandidate (string _name) {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateIndex) public {
        // _hasVoted = voters(msg.sender);
        // require(!voters[msg.sender]);
        require(!voters[msg.sender]);
        // require that they haven't voted before

        // require a valid candidate; make sure the name isn't empty string?
        // Compare candidate index with candidate id here;
        require(_candidateIndex > 0 && _candidateIndex <= candidatesCount);

        voters[msg.sender] = true;
        // mark voted true

        // update candidate vote counter
        candidates[_candidateIndex].voteCount ++;

        // trigger voted event
    }
}
