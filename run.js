var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const fs = require('fs');

var { Miembro, Persona } = require("./miembro")

const jsonString = fs.readFileSync('./familia.json')
const familia = JSON.parse(jsonString)
console.log(Miembro.schema())
var schema = buildSchema(`
  type Miembro{
    name:String!
    age: Int!
  }
  type Query {
    getAllFamily: [Miembro],
    getFamilyNumber(name:String!):Miembro
  }
`);

var root = {
  getFamilyNumber:({name}) => {
    for (let index = 0; index < familia.length; index++) {
      if(familia[index].name == name)
        return familia[index];
    }
    return{name:"ERROR", age:-1};
  },
  getAllFamily:()=>{
    fam = []
    for (let index = 0; index < familia.length; index++) {
      let aux = Object.assign(new Miembro, familia[index])
      fam.push(aux)
    }
    return fam;
  }
}


var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));