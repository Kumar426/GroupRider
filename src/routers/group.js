const express = require('express');
const User = require('../models/User');
const Group = require('../models/Group');
const auth = require('../middleware/auth');

const router = express.Router();

//Save group information
router.post('/group', auth, async (req, res) => {
 if (req.body = null) {
   res.status(400).status({err: "Bad request"});
 }
 const groupInfo = new Group(req.body);
 const user = await Group.validateMember(groupInfo.member_id);
 if (!user) {
     res.status(400).status({err: "Please provide valid user"});
 }
 groupInfo.save().then(doc => {
    if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
    }
    res.status(200).send({groupInfo});
 });
});

module.exports = router;