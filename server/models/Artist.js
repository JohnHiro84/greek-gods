const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: "album"
    }
  ]
});

ArtistSchema.statics.addAlbum = (artistId, albumId) =>{
  const Artist = mongoose.model("artist");
  const Album = mongoose.model("album");

  return Artist.findById(artistId).then(artist => {
    return Album.findById(albumId).then(album => {
      artist.albums.push(album);
      album.artist = artist;

      return Promise.all([artist.save(), album.save()]).then(
        ([artist, album]) => artist
      );
    });
  });
};

ArtistSchema.statics.removeAlbum = (artistId, albumId) =>{
  const Artist = mongoose.model("artist");
  const Album = mongoose.model("album");

  return Artist.findById(artistId).then(artist => {
    return Album.findById(albumId).then(album => {
      artist.albums.pull(album);
      album.artist = null;

      return Promise.all([artist.save(), album.save()]).then(
        ([artist, album]) => artist
      );
    });
  });
};
module.exports = mongoose.model("artist", ArtistSchema);
