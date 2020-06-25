const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLID } = graphql;
const mongoose = require('mongoose');

const God = mongoose.model("god");
const GodType = require("./god_type");

const Abode = mongoose.model("abode");
const AbodeType = require("./abode_type");

const Emblem = mongoose.model("emblem");
const EmblemType = require("./emblem_type");

const Todo = mongoose.model("todo");
const TodoType = require("./todo_type");



const ArtistType = require("./artist_type");
const Artist = mongoose.model("artist");

const AlbumType = require("./album_type");
const Album = mongoose.model("album");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addArtist: {
      type: ArtistType,
      args:{
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }){
        return new Artist({ name }).save();
      }
    },
    addAlbum: {
      type: AlbumType,
      args:{
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }){
        return new Album({ name }).save();
      }
    },
    addTodo: {
      type: TodoType,
      args:{
        type: { type: GraphQLString }
      },
      resolve(parentValue, { type }){
        return new Todo({ type }).save();
      }
    },
    addArtistAlbum: {
      type: ArtistType,
      args: {
        artistId: { type: new GraphQLNonNull(GraphQLID) },
        albumId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { artistId, albumId}){
        return Artist.addAlbum(artistId, albumId);
      }
    },
    removeArtistAlbum: {
      type: ArtistType,
      args: {
        artistId: { type: new GraphQLNonNull(GraphQLID) },
        albumId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { artistId, albumId}){
        return Artist.removeAlbum(artistId, albumId);
      }
    },

    updateTodo: {
      type: TodoType,
      args:{
        id: { type: GraphQLID },
        type: { type: GraphQLString }
      },
      resolve(parentValue, { id, type }){
        console.log(id);
        console.log(type);
        const updateObj = {};

        updateObj.id = id;

        if(type) updateObj.type = type;

        return Todo.findOneAndUpdate({ _id: id }, {$set: {type: type} }, { new: true }, (err, todo) => {
          return todo;
        });
      }
    },

    newGod: {
      type: GodType,
      args:{
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: {type: GraphQLString }
      },
      resolve(parentValue, { name, type, description }){
        return new God({ name, type, description }).save();
      }
    },
    deleteGod: {
      type: GodType,
      args:{
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }){
        return God.remove({ _id: id });
      }
    },
    updateGod: {
      type: GodType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, { id, name, type, description}){
        const updateObj = {};

        updateObj.id = id;
        if(name) updateObj.name = name;
        if(type) updateObj.type = type;
        if(description) updateObj.description = description;

        return God.findOneAndUpdate({ _id: id }, { $set: updateObj }, { new: true }, (err, god) => {
          return god;
        });
      }
    },
    addGodRelative: {
      type: GodType,
      args: {
        godId: { type: new GraphQLNonNull(GraphQLID) },
        relativeId: { type: new GraphQLNonNull(GraphQLID) },
        relationship: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { godId, relativeId, relationship}){
        return God.addRelative(godId, relativeId, relationship);
      }
    },
    removeGodRelative: {
      type: GodType,
      args: {
        godId: { type: new GraphQLNonNull(GraphQLID) },
        relativeId: { type: new GraphQLNonNull(GraphQLID) },
        relationship: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { godId, relativeId, relationship}){
        return God.removeRelative(godId, relativeId, relationship);
      }
    },
    addGodEmblem: {
      type: GodType,
      args: {
        godId: { type: new GraphQLNonNull(GraphQLID) },
        emblemId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { godId, emblemId}){
        return God.addEmblem(godId, emblemId);
      }
    },
    removeGodEmblem: {
      type: GodType,
      args: {
        godId: { type: new GraphQLNonNull(GraphQLID) },
        emblemId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { godId, emblemId}){
        return God.removeEmblem(godId, emblemId);
      }
    },
    updateGodAbode: {
      type: GodType,
      args: {
        godId: { type: new GraphQLNonNull(GraphQLID) },
        abodeId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { godId, abodeId}){
        return God.updateAbode(godId, abodeId);
      }
    },
    addGodDomain: {
      type: GodType,
      args: {
        godId: { type: new GraphQLNonNull(GraphQLID) },
        domain: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { godId, domain}){
        return God.addDomain(godId, domain);
      }
    },
    removeGodDomain: {
      type: GodType,
      args: {
        godId: { type: new GraphQLNonNull(GraphQLID) },
        domain: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { godId, domain}){
        return God.removeDomain(godId, domain);
      }
    },
    newAbode: {
      type: AbodeType,
      args:{
        name: { type: GraphQLString },
        coordinate: { type: GraphQLString },
      },
      resolve(parentValue, { name, coordinate }){
        return new Abode({ name, coordinate }).save();
      }
    },
    deleteAbode: {
      type: AbodeType,
      args:{
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }){
        return Abode.remove({ _id: id });
      }
    },
    updateAbode: {
      type: AbodeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)},
        name: { type: GraphQLString}
      },
      resolve(parentValue, { id, name }){
        return Abode.findOneAndUpdate(
          { _id: id },
          { $set: { name } },
          { new: true},
          (err, abode) => {
            return abode;
          }
        );
      }
    },

    newEmblem: {
      type: EmblemType,
      args:{
        name: { type: GraphQLString },
      },
      resolve(parentValue, { name }){
        return new Emblem({ name }).save();
      }
    },
    deleteEmblem: {
      type: EmblemType,
      args:{
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }){
        return Emblem.remove({ _id: id });
      }
    },
    updateEmblem: {
      type: EmblemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString }
      },
      resolve(parentValue, { id, name }){
        return Emblem.findOneAndUpdate(
          { _id: id },
          { $set: { name } },
          { new: true },
          (err, emblem) => {
            return emblem;
          }
        );
      }
    }
  }
});

module.exports = mutation;
