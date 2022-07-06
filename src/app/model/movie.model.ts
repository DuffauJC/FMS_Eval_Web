export class Movie {
    id: number
    theaters:number[]
    name: string;
    description: string;
    date: Date;
    img: string

    constructor(id: number, name: string, theaters:number[], description: string, date: Date, img: string) {
        this.id = id
        this.name = name
        this.theaters = theaters
        this.description = description
        this.date = date
        this.img = img

    }

}
