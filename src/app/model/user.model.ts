export class User {
   
    name: string
    firstName: string
    address: string
    phone: string
    email: string
    password: string
    role: string

    constructor( name: string, firstName: string, address: string, phone: string, email: string, password: string, role: string) {

       
        this.name = name
        this.firstName = firstName
        this.address = address
        this.phone = phone
        this.email = email
        this.password = password
        this.role = role

    }

}