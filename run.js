var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var  mysql = require('mysql');
const fs = require('fs');
var { Miembro } = require("./miembro")
const jsonString = fs.readFileSync('./familia.json')
const miembros = JSON.parse(jsonString)

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "diego",
  password: "",
  database: "graphql"
});

var sql = "SELECT * FROM Miembro WHERE id=1"

con.connect(function(err) {
  if (err) throw err;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
var schema = buildSchema(
  Miembro.schema() +
  `type Query {
      getMemberByName(id:Int!):Miembro
      getAllFamily: [Miembro],
    }`
  );

var root = {
  getMemberByName:({id}) => {
    for (let index = 0; index < miembros.length; index++) {
      if(miembros[index].id == id)
        return miembros[index];
    }
    return{id:-1, name:"ERROR", age:-1};
  },
  getAllFamily:() => {
    fam = []
    for (let index = 0; index < miembros.length; index++) {
      let aux = Object.assign(new Miembro, miembros[index])
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