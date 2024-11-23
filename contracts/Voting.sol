// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string description;
        uint256 voteCount;
    }

    Proposal[] public proposals;
    mapping(address => bool) public voters;

    event ProposalCreated(uint256 proposalId, string description);
    event Voted(address voter, uint256 proposalId);

    function createProposal(string memory description) public {
        proposals.push(Proposal({
            description: description,
            voteCount: 0
        }));
        emit ProposalCreated(proposals.length - 1, description);
    }

    function vote(uint256 proposalId) public {
        require(!voters[msg.sender], "Ya has votado.");
        require(proposalId < proposals.length, "ID de propuesta no valido.");

        proposals[proposalId].voteCount++;
        voters[msg.sender] = true;

        emit Voted(msg.sender, proposalId);
    }

    function getProposal(uint256 proposalId) public view returns (string memory, uint256) {
        require(proposalId < proposals.length, "ID de propuesta no valido.");
        Proposal storage proposal = proposals[proposalId];
        return (proposal.description, proposal.voteCount);
    }
}
