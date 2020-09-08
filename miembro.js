class Miembro{
    constructor(id, nombre, edad){
        this.id = id
        this.nombre = nombre;
        this.edad = edad;
    }
    static schema(){
        return `type Miembro{
            id: Int!
            name:String!
            age: Int!
        }`
    }
}

module.exports = { Miembro };