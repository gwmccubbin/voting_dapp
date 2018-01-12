pragma solidity ^0.4.2;

contract Election {
    string value;

    struct Candidate {
        string name;
        uint voteCount;
    }

    // Must keep track of vote because we'll always have a default value for voters;
    // We don't want to do an id because we'd have to keep a counter and update it;
    struct Voter {
        bool voted;
    }

    // How do I make this private?
    mapping(address => Voter) public voters;
    // Gives us access to the candidates's index publicly
    Candidate[] public candidates;

    // voted event

    function Election () {
        value = "Hello, world!";
    }


    function Vote (uint _candidateIndex) public payable {
        // require that they haven't voted before
        // require a valid candidate

        // mark voted true

        // update candidate vote counter

        // trigger voted event
    }

}
