const express = require('express');


const app = require('./server/server');

// const app = express();

////////////////////////////////
// const God = require("./server/models/God");
// const Abode = require("./server/models/Abode");
// const Emblem = require("./server/models/Emblem");


const bodyParser = require('body-parser');
  

app.use(bodyParser.urlencoded({
  extended: true
}))

const router = express.Router();

// const createNewGod = router.post("/new", (req, res) =>{
//   God.findOne({ name: req.body.name}).then(god => {
//     if(god){
//       return res
//         .status(400)
//         .json({ email: "A user has already registered with that address"});
//     } else {
//       console.log(req.body);
//       const newUserObj = new God({
//         name: req.body.name,
//         type: req.body.type,
//         description: req.body.description,
//         domains: req.body.domains,
//         abode: req.body.abode,
//
//         parents: req.body.parents,
//         children: req.body.children,
//         siblings: req.body.siblings
//
//       });
//
//       newUserObj
//       .save()
//       .then(savedUser => res.json(savedUser))
//       .catch(err => console.log(err))
//     }
//   });
// });
// app.use("/gods", createNewGod);



// const createNewAbode = router.post("/new", (req, res) =>{
//   console.log("createNewAbode");
//   Abode.findOne({ name: req.body.name}).then(abode => {
//     if(abode){
//       return res
//         .status(400)
//         .json({ email: "A user has already registered with that address"});
//     } else {
//       console.log(req.body);
//
//       const newUserObj = new Abode({
//         name: req.body.name,
//         coordinate: req.body.coordinate,
//         gods: req.body.gods
//
//       });
//
//       newUserObj
//       .save()
//       .then(savedUser => res.json(savedUser))
//       .catch(err => console.log(err))
//     }
//   });
// });
//


// app.use("/abodes", createNewAbode);
//
// const createNewEmblem = router.post("/new", (req, res) =>{
//   console.log("createNewEmblem");
//   Emblem.findOne({ name: req.body.name}).then(emblem => {
//     if(emblem){
//       return res
//         .status(400)
//         .json({ email: "A user has already registered with that address"});
//     } else {
//       console.log(req.body);
//
//       const newUserObj = new Emblem({
//         name: req.body.name,
//         gods: req.body.gods
//
//       });
//
//       newUserObj
//       .save()
//       .then(savedUser => res.json(savedUser))
//       .catch(err => console.log(err))
//     }
//   });
// });
//
// app.use("/emblems", createNewEmblem);




//////////////////////////////
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})
