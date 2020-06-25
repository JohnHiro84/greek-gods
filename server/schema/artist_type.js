const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;


const Artist = mongoose.model("artist");

// const AlbumType = require("./album_type");
// const Album = mongoose.model("album");



const ArtistType = new GraphQLObjectType({
  name: "ArtistType",
  fields: () => ({
    id: { type: GraphQLID },
    name:  { type: GraphQLString },
    albums: {
      type: new GraphQLList(require("./album_type")),

      resolve(parentValue){
        return Artist.findById(parentValue.id)
        .populate("albums")
        .then(artist => artist.albums);
      }
    }
  })
});

module.exports = ArtistType;
