pragma solidity ^0.4.2;

contract Election {
    string value;

    function Election () {
        value = "Hello, world!";
    }

    function getValue() public constant returns(string _value) {
        return(value);
    }
}
