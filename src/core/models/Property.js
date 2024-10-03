export default class Property {
    constructor(id, price, description, address, area, action, room, hasElevator, floors, bathroom, house) {
        this.id = id;
        this.price = price;
        this.description = description;
        this.address = address;
        this.area = area;
        this.action = action;
        this.room = room; 
        this.hasElevator = hasElevator;
        this.floors = floors;
        this.bathroom = bathroom;
        this.house = house;
    }
}