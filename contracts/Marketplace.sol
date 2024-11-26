// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Marketplace {
    enum ItemStatus { Listed, Sold, Shipped, Completed }

    struct Item {
        uint256 itemId;
        address payable seller;
        address buyer;
        string name;
        string description;
        uint256 price;
        ItemStatus status;
    }

    uint256 public itemCount = 0;
    mapping(uint256 => Item) public items;
    mapping(address => uint256) public reputation;
    mapping(address => uint256) public ratingsCount;

    event ItemListed(uint256 itemId, address seller, uint256 price);
    event ItemPurchased(uint256 itemId, address buyer);
    event ItemShipped(uint256 itemId);
    event ItemReceived(uint256 itemId);
    event UserRated(address user, uint256 rating);

    // Listar un nuevo artículo
    function listItem(string memory _name, string memory _description, uint256 _price) public {
        require(_price > 0, "El precio debe ser mayor que cero");

        itemCount++;
        items[itemCount] = Item({
            itemId: itemCount,
            seller: payable(msg.sender),
            buyer: address(0),
            name: _name,
            description: _description,
            price: _price,
            status: ItemStatus.Listed
        });

        emit ItemListed(itemCount, msg.sender, _price);
    }

    // Comprar un artículo
    function purchaseItem(uint256 _itemId) public payable {
        Item storage item = items[_itemId];
        require(item.itemId != 0, "El articulo no existe");
        require(item.status == ItemStatus.Listed, "El articulo no esta disponible");
        require(msg.value == item.price, "El valor enviado no coincide con el precio del articulo");
        require(msg.sender != item.seller, "El vendedor no puede comprar su propio articulo");

        item.buyer = msg.sender;
        item.status = ItemStatus.Sold;

        emit ItemPurchased(_itemId, msg.sender);
    }

    // Enviar el artículo (el vendedor confirma el envio)
    function shipItem(uint256 _itemId) public {
        Item storage item = items[_itemId];
        require(msg.sender == item.seller, "Solo el vendedor puede enviar el articulo");
        require(item.status == ItemStatus.Sold, "El articulo no ha sido vendido");

        item.status = ItemStatus.Shipped;

        emit ItemShipped(_itemId);
    }

    // Confirmar recepción del artículo (el comprador confirma la recepcion)
    function confirmDelivery(uint256 _itemId) public {
        Item storage item = items[_itemId];
        require(msg.sender == item.buyer, "Solo el comprador puede confirmar la recepcion");
        require(item.status == ItemStatus.Shipped, "El articulo no ha sido enviado");

        item.status = ItemStatus.Completed;

        // Transferir los fondos al vendedor
        item.seller.transfer(item.price);

        emit ItemReceived(_itemId);
    }

    // Obtener detalles de un artículo
    function getItem(uint256 _itemId) public view returns (Item memory) {
        return items[_itemId];
    }

    function rateUser(address _user, uint256 _rating) public {
        require(_rating >= 1 && _rating <= 5, "La calificacion debe estar entre 1 y 5");
        reputation[_user] += _rating;
        ratingsCount[_user] += 1;

        emit UserRated(_user, _rating);
    }

    function getUserRating(address _user) public view returns (uint256) {
        if (ratingsCount[_user] == 0) {
            return 0;
        }
        return reputation[_user] / ratingsCount[_user];
    }
}