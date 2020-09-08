class Miembro{
    constructor(nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    }
    static schema(){
        return 
        `type Miembro{
            name:String!
            age: Int!
          }
        `
    }
}
class Persona{
    constructor(nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    }
}

module.exports = { Miembro, Persona};