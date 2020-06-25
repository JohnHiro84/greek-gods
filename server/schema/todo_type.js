const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const Todo = mongoose.model("todo");

const TodoType = new GraphQLObjectType({
  name: "TodoType",
  fields: () => ({
    id: { type: GraphQLID },
    type:  { type: GraphQLString }
  })
});

module.exports = TodoType;
