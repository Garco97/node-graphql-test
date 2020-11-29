var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var  mysql = require('mysql');
const fs = require('fs');
var { Miembro } = require("./miembro.js")
require('dotenv').config();
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password:  process.env.DB_PASSWORD,
  database:  process.env.DB_DATABSE
});


var schema = buildSchema(
  Miembro.schema() +
  `type Query {
      getMemberById(id:Int!):Miembro
      getAllFamily: [Miembro],
    }`
  );

var root = {
  getMemberById:({id}) => {
    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM Miembro where id="+id+";", function (err, result, fields) {
        if (err) throw err;
		  let aux = Object.assign(new Miembro, result[0])
			console.log(result[0]);
			console.log(aux);
        if (result == []){
          aux = Object.assign(new Miembro, {id:-1, nombre:"ERROR", edad:-1})
        }
        return aux;
      });
    });
  },
  getAllFamily:() => {
	  var aux = new Miembro(1, "Diego", 24);
	  return [aux]
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
