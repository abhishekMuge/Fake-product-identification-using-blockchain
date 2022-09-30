//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Authentifi {
    struct Customer {
        string title;
        string type_of;
        string phone_number;
        address account_address;
        string uuid;
    }

    mapping(string => Customer) customer_db;

    function createCustomer(
        string memory _title,
        string memory _type_of,
        string memory _phone_no,
        address _account_address,
        string memory _uuid
    ) public payable returns (uint256) {
        Customer memory newCustomer;
        newCustomer.title = _title;
        newCustomer.type_of = _type_of;
        newCustomer.phone_number = _phone_no;
        newCustomer.account_address = _account_address;

        customer_db[_uuid] = newCustomer;
        return 1;
    }

    function getCustomer(string memory _uuid)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            address
        )
    {
        return (
            customer_db[_uuid].title,
            customer_db[_uuid].type_of,
            customer_db[_uuid].phone_number,
            customer_db[_uuid].account_address
        );
    }
}
