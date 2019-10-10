let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let headlineSchema = new Schema({
    headlineId:{
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

let Headline = mongoose.model('Headline', headlineSchema);

module.exports = Headline;