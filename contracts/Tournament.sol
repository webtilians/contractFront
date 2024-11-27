// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tournament {
    struct TournamentInfo {
        uint256 id;
        string name;
        uint256 entryFee;
        uint256 prizePool;
        address[] participants;
        bool active;
    }

    uint256 public tournamentCount;
    mapping(uint256 => TournamentInfo) public tournaments;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "No autorizado");
        _;
    }

    function createTournament(string memory _name, uint256 _entryFee) public onlyOwner {
        tournamentCount++;
        tournaments[tournamentCount] = TournamentInfo({
            id: tournamentCount,
            name: _name,
            entryFee: _entryFee,
            prizePool: 0,
            participants: new address[](0),
            active: true
        });
    }

    function registerParticipant(uint256 _tournamentId) public payable {
        TournamentInfo storage tournament = tournaments[_tournamentId];
        require(tournament.active, "Torneo inactivo");
        require(msg.value == tournament.entryFee, "Cuota incorrecta");
        tournament.participants.push(msg.sender);
        tournament.prizePool += msg.value;
    }

    function endTournament(uint256 _tournamentId, address _winner) public onlyOwner {
        TournamentInfo storage tournament = tournaments[_tournamentId];
        require(tournament.active, "Ya finalizado");
        tournament.active = false;
        payable(_winner).transfer(tournament.prizePool);
    }

    function getParticipants(uint256 _tournamentId) public view returns (address[] memory) {
        return tournaments[_tournamentId].participants;
    }

    function getPrizePool(uint256 _tournamentId) public view returns (uint256) {
        return tournaments[_tournamentId].prizePool;
    }
}