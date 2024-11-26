// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PersonalAgreement {
    struct Agreement {
        address party1;
        address party2;
        string terms;
        bool signedByParty1;
        bool signedByParty2;
    }

    Agreement[] public agreements;

    event AgreementCreated(uint256 agreementId, address party1, address party2, string terms);
    event AgreementSigned(uint256 agreementId, address party);

    function createAgreement(address _party2, string memory _terms) public {
        agreements.push(Agreement({
            party1: msg.sender,
            party2: _party2,
            terms: _terms,
            signedByParty1: false,
            signedByParty2: false
        }));
        emit AgreementCreated(agreements.length - 1, msg.sender, _party2, _terms);
    }

    function signAgreement(uint256 _agreementId) public {
        Agreement storage agreement = agreements[_agreementId];
        require(msg.sender == agreement.party1 || msg.sender == agreement.party2, "Not a party to this agreement");

        if (msg.sender == agreement.party1) {
            agreement.signedByParty1 = true;
        } else if (msg.sender == agreement.party2) {
            agreement.signedByParty2 = true;
        }

        emit AgreementSigned(_agreementId, msg.sender);
    }

    function getAgreement(uint256 _agreementId) public view returns (Agreement memory) {
        return agreements[_agreementId];
    }
}