const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    dateCreated: { type: Date, required: true },
    status: { type: String, required: true, maxLength: 100 },
    priority: { type: String, required: true, maxLength: 100 },
    lead: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    team: [ { type: Schema.Types.ObjectId, ref: 'Member', required: true } ]
});

module.exports = mongoose.model('Project', ProjectSchema);