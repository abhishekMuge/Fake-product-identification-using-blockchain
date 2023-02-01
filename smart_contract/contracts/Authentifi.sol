// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract Authentifi {
    struct Customer {
        string name;
        string type_of;
        string phone_number;
        address account_address;
        string uuid;
        string location_address;
        bool isRegister;
        string[] codes;
    }

    struct TransactionLog {
        string query;
        string message;
        address issuedBy;
        uint256 date;
        string productcode;
        bool isCompleted;
    }

    struct Products {
        string uuid;
        string name;
        string description;
        string ownerId;
        address owner_address;
        string manufacturerId;
        address manufactuer_address;
        string[] logsId;
        string type_of;
        bool is_antique;
        string product_certificates;
        bool isRegister;
    }

    mapping(string => Customer) customer_db;
    mapping(string => Products) product_db;
    mapping(string => TransactionLog) logs_db;

    // mapping(string => Manufactuer) manufacturer_db;

    function createCustomer(
        string memory _name,
        string memory _type_of,
        string memory _phone_no,
        string memory _uuid,
        string memory _location_address
    ) public returns (uint256) {
        Customer memory newCustomer;
        newCustomer.name = _name;
        newCustomer.type_of = _type_of;
        newCustomer.phone_number = _phone_no;
        newCustomer.account_address = msg.sender;
        newCustomer.location_address = _location_address;
        newCustomer.isRegister = true;
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
            address,
            string memory
        )
    {
        return (
            customer_db[_uuid].name,
            customer_db[_uuid].type_of,
            customer_db[_uuid].phone_number,
            customer_db[_uuid].account_address,
            customer_db[_uuid].location_address
        );
    }

    function getCustomerProducts(string memory _uuid)
        public
        view
        returns (string[] memory)
    {
        return (customer_db[_uuid].codes);
    }

    function registerProduct(
        string memory _uuid,
        string memory _name,
        string memory _description,
        string memory _manufacturerId,
        string memory _type_of,
        bool _is_antique,
        string memory _ownerId,
        address _manufacturer_address
    ) public returns (uint256) {
        //register new product placed product under its db instance
        Products memory newProduct;
        newProduct.name = _name;
        newProduct.description = _description;
        newProduct.manufacturerId = _manufacturerId;
        newProduct.manufactuer_address = _manufacturer_address;
        newProduct.type_of = _type_of;
        newProduct.is_antique = _is_antique;
        newProduct.ownerId = _ownerId;
        newProduct.owner_address = msg.sender;
        newProduct.isRegister = true;
        product_db[_uuid] = newProduct;
        //add product to users
        customer_db[_ownerId].codes.push(_uuid);

        return 1;
    }

    function getProduct(string memory _uuid)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            address,
            string memory,
            address,
            string memory,
            bool,
            string memory,
            string[] memory
        )
    {
        Products memory prod = product_db[_uuid];
        return (
            prod.name,
            prod.description,
            prod.ownerId,
            prod.owner_address,
            prod.manufacturerId,
            prod.manufactuer_address,
            prod.type_of,
            prod.is_antique,
            prod.product_certificates,
            prod.logsId
        );
    }

    function uploadDocuments(
        string memory _uuid,
        string memory _product_certificates
    ) public returns (string memory) {
        if (product_db[_uuid].isRegister) {
            product_db[_uuid].product_certificates = _product_certificates;
            return "documents has been uploaded in blockchain successfully!";
        }
        return
            "Give hash key has not associated with any products in blockchain";
    }

    function changeOwner(
        string memory _uuid,
        string memory _prev_owner_id,
        address _new_owner_address,
        string memory _new_owner_id
    ) public returns (string memory) {
        product_db[_uuid].ownerId = _new_owner_id;
        product_db[_uuid].owner_address = _new_owner_address;

        //remove code from old customer space and add to new customer space
        customer_db[_new_owner_id].codes.push(_uuid);
        //remove from old customer
        uint256 len = customer_db[_prev_owner_id].codes.length - 1;
        uint256 idx;
        for (uint256 i = 0; i <= len; i++) {
            if (compareStrings(customer_db[_prev_owner_id].codes[i], _uuid)) {
                idx = i;
                break;
            }
        }
        string memory lastEle = customer_db[_prev_owner_id].codes[len];
        customer_db[_prev_owner_id].codes[idx] = lastEle;
        customer_db[_prev_owner_id].codes.pop();
        return "Success";
    }

    function createProductLog(
        string memory _prod_uuid,
        string memory _log_uuid,
        string memory _query,
        string memory _message
    ) public returns (string memory) {
        TransactionLog memory Log;
        Log.query = _query;
        Log.message = _message;
        Log.issuedBy = msg.sender;
        Log.date = block.timestamp;
        Log.productcode = _prod_uuid;
        Log.isCompleted = true;
        logs_db[_log_uuid] = Log;
        product_db[_prod_uuid].logsId.push(_log_uuid);
        return "Log has been successfully recorded";
    }

    function getProductLog(string memory _uuid)
        public
        view
        returns (
            string memory,
            string memory,
            address,
            uint256,
            string memory
        )
    {
        return (
            logs_db[_uuid].query,
            logs_db[_uuid].message,
            logs_db[_uuid].issuedBy,
            logs_db[_uuid].date,
            logs_db[_uuid].productcode
        );
    }

    function compareStrings(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}

// Current Contract Address: 0xE7a0D047279E13cd17803da2cF70167940a6243b
