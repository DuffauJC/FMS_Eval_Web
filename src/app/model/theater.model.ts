export class Theater {
    id: number
    idCity: number;
    name: string;
    address: string;


    constructor(id: number, name: string, idCity: number, address: string) {
        this.id = id
        this.name = name
        this.idCity = idCity
        this.address = address

    }

}
