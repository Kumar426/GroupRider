const mongoose = require('mongoose');
const validator = require('validator');
const user = require('./User');

const groupSchema = mongoose.Schema({
    id: String,
    group_name : {
        type:String,
        required: true
    },
    No_of_members: {
        type: Number,
        required: true
    },
    member_id: {
        type: Array,
        default: user.id
    }
});

groupSchema.statics.validateMember =  async (member_id) => {
    const user  = await User.findOne({member_id});
    if(!user) {
        throw new Error("No User found. Please send a request to member to join this group.")
    }
    return user;
};

const groupInfo = mongoose.model('Group', groupSchema);
module.exports = groupInfo;