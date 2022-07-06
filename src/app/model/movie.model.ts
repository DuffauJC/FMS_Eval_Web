export class Movie {
    id: number
    idTheater: number;
    name: string;
    description: string;
    date: Date;
    img: string

    constructor(id: number, name: string, idTheater: number, description: string, date: Date, img: string) {
        this.id = id
        this.name = name
        this.idTheater = idTheater
        this.description = description
        this.date = date
        this.img = img

    }

}
