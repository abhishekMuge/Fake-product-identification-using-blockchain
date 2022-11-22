// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Authentifi {
    struct Customer {
        string name;
        string type_of;
        string phone_number;
        address account_address;
        string uuid;
    }

    struct Manufactuer {
        string uuid;
        string name;
        string location_address;
        address manufactuer_address;
        string phone_number;
    }

    struct Products {
        string uuid;
        string name;
        address owner;
        string manufacturer;
        address[] previous_owners;
        address listed_by;
        string type_of;
        string[] product_images;
        bool is_antique;
        string[] product_certificates;
        bool isVerified;
    }

    mapping(string => Customer) customer_db;
    mapping(string => Products) product_db;
    mapping(string => Manufactuer) manufacturer_db;

    function createCustomer(
        string memory _name, 
        string memory _type_of, 
        string memory _phone_no, 
        address _account_address, 
        string memory _uuid
        ) 
        public payable returns(uint) {
            Customer memory newCustomer;
            newCustomer.name = _name;
            newCustomer.type_of = _type_of;
            newCustomer.phone_number = _phone_no;
            newCustomer.account_address = _account_address;

            customer_db[_uuid] = newCustomer;
            return 1;
    }

    function getCustomer(
        string memory _uuid
    ) view public returns(string memory, string memory, string memory, address){
        return(
            customer_db[_uuid].name, 
            customer_db[_uuid]. type_of, 
            customer_db[_uuid].phone_number, 
            customer_db[_uuid].account_address
        );
    }

    function registerManufacturer(
        string memory _name,
        string memory _location,
        string memory _uuid,
        address _manufacturer_address,
        string memory _phone_no
    ) public payable returns(uint) {
        Manufactuer memory newManufacturer;
        newManufacturer.name = _name;
        newManufacturer.location_address = _location;
        newManufacturer.manufactuer_address = _manufacturer_address;
        newManufacturer.phone_number = _phone_no;
        manufacturer_db[_uuid] = newManufacturer;
        return 1;
    }

    function getManufactuer(
        string memory _uuid
    ) view public returns (
        string memory,
        string memory,
        string memory,
        address,
        string memory
    ) {
        return(
            manufacturer_db[_uuid].uuid,
            manufacturer_db[_uuid].name,
            manufacturer_db[_uuid].location_address,
            manufacturer_db[_uuid].manufactuer_address,
            manufacturer_db[_uuid].phone_number
        );
    }


    function registerProduct(
        string memory _uuid,
        string memory _name,
        string memory _manufacturer,
        string memory _type_of,
        bool _is_antique
    ) public payable returns(uint) {
        Products memory newProduct;
        newProduct.name = _name;
        newProduct.manufacturer = _manufacturer;
        newProduct.type_of = _type_of;
        newProduct.is_antique = _is_antique;
        newProduct.isVerified = true;
        product_db[_uuid] = newProduct;
        return 1;
    }



    function getProduct(string memory _uuid) public view returns (
        string memory, 
        address,
        string memory,
        address[] memory,
        address,
        string memory,
        string[] memory,
        bool, 
        string[] memory
    ){
        Products memory prod = product_db[_uuid];
        return(
            prod.name,
            prod.owner,
            prod.manufacturer,
            prod.previous_owners,
            prod.listed_by,
            prod.type_of,
            prod.product_images,
            prod.is_antique,
            prod.product_certificates
        );
    }

    function uploadDocuments(
        string memory _uuid, 
        string[] memory _product_certificates
    ) payable public returns(uint) {
        require(product_db[_uuid].isVerified);
        product_db[_uuid].product_certificates = _product_certificates;
        return 1;
    }

}

