const  mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    tile: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    // images: [
    //     {public_id: {type: String,required: true,},
    //       url: {type: String,required: true,},},],

    user: {type: mongoose.Schema.ObjectId, ref: "User", required: true,},
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);