const mongoose = require('mongoose');
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;


const ArtistType = require("./artist_type");
const Artist = mongoose.model("artist");

const Album = mongoose.model("album");


// const God = mongoose.model("god");

const AlbumType = new GraphQLObjectType({
  name: "AlbumType",

  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    artist: {
      type: ArtistType,
      resolve(parentValue) {
        return Artist.findById(parentValue.artist)
        .then(artist => artist)
        .catch(err => null)
      }
    }
  })
});

module.exports = AlbumType;
