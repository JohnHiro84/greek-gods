const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;



const GodType = require("./god_type");
const God = mongoose.model("god");


const AbodeType = require("./abode_type");
const Abode = mongoose.model("abode");


const EmblemType = require("./emblem_type");
const Emblem = mongoose.model("emblem");


const TodoType = require("./todo_type");
const Todo = mongoose.model("todo");



const ArtistType = require("./artist_type");
const Artist = mongoose.model("artist");

const AlbumType = require("./album_type");
const Album = mongoose.model("album");



const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    artists: {
      type: new GraphQLList(ArtistType),
      resolve() {
        return Artist.find({});
      }
    },
    artist: {
      type: ArtistType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }){
        return Artist.findById(id);
      }
    },
    albums: {
      type: new GraphQLList(AlbumType),
      resolve() {
        return Album.find({});
      }
    },
    album: {
      type: AlbumType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }){
        return Album.findById(id);
      }
    },

    todos: {
      type: new GraphQLList(TodoType),
      resolve() {
        return Todo.find({});
      }
    },
    todo: {
      type: TodoType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }){
        return Todo.findById(id);
      }
    },

    gods: {
      type: new GraphQLList(GodType),
      resolve() {
        return God.find({});
      }
    },
    god: {
      type: GodType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }){
        return God.findById(id);
      }
    },


    emblems: {
      type: new GraphQLList(EmblemType),
      resolve() {
        return Emblem.find({});
      }
    },
    emblem: {
      type: EmblemType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }){
        return Emblem.findById(id);
      }
    },


    abodes: {
      type: new GraphQLList(AbodeType),
      resolve() {
        return Abode.find({});
      }
    },
    abode: {
      type: AbodeType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }){
        return Abode.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
