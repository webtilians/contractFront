// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is Ownable {
    struct LotteryRound {
        uint256 ticketPrice;
        uint256 endTime;
        address[] participants;
        bool isActive;
        address winner;
    }

    LotteryRound[] public lotteries;
    mapping(address => uint256) public winnings;

    event LotteryCreated(uint256 indexed lotteryId, uint256 ticketPrice, uint256 endTime);
    event TicketPurchased(uint256 indexed lotteryId, address indexed participant);
    event WinnerDeclared(uint256 indexed lotteryId, address indexed winner, uint256 prize);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function createLottery(uint256 ticketPrice, uint256 duration) external onlyOwner {
        require(ticketPrice > 0, "El precio del boleto debe ser mayor que 0");
        require(duration > 0, "La duracion debe ser mayor que 0");

        uint256 endTime = block.timestamp + duration;
        lotteries.push(LotteryRound({
            ticketPrice: ticketPrice,
            endTime: endTime,
            participants: new address[](0),
            isActive: true,
            winner: address(0)
        }));

        emit LotteryCreated(lotteries.length - 1, ticketPrice, endTime);
    }

    function buyTicket(uint256 lotteryId) external payable {
        require(lotteryId < lotteries.length, "Loteria no valida");
        LotteryRound storage lottery = lotteries[lotteryId];
        require(lottery.isActive, "La loteria no esta activa");
        require(block.timestamp < lottery.endTime, "La loteria ha terminado");
        require(msg.value == lottery.ticketPrice, "Cantidad incorrecta de ETH enviada");

        lottery.participants.push(msg.sender);
        emit TicketPurchased(lotteryId, msg.sender);
    }

    function drawWinner(uint256 lotteryId) external onlyOwner {
        require(lotteryId < lotteries.length, "Loteria no valida");
        LotteryRound storage lottery = lotteries[lotteryId];
        require(lottery.isActive, "La loteria no esta activa");
        require(block.timestamp >= lottery.endTime, "La loteria aun no ha terminado");

        lottery.isActive = false;
        if (lottery.participants.length > 0) {
            uint256 winnerIndex = random() % lottery.participants.length;
            address winner = lottery.participants[winnerIndex];
            lottery.winner = winner;
            uint256 prize = lottery.ticketPrice * lottery.participants.length;
            winnings[winner] += prize;

            emit WinnerDeclared(lotteryId, winner, prize);
        }
    }

    function claimWinnings() external {
        uint256 amount = winnings[msg.sender];
        require(amount > 0, "No hay ganancias para reclamar");

        winnings[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function getLotteries() external view returns (LotteryRound[] memory) {
        return lotteries;
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, lotteries.length)));
    }
}