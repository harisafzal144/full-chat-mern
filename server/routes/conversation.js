const router = require('express').Router();
const Conversation = require('../models/Conversation');

//new conversation

router.post('/', async (req, res) => {
  // console.log(req.body.senderId);
  //const { senderId, receiverId } = req.body;
  // res.status(200).json(req.body);

  // const obj = {
  //   senderId: req.body.senderId,
  //   receiverId: req.body.receiverId,
  // };
  //create unique converstion id
  // unique_id =  first user + 2nd user + sort + join
  //sender or receiver want to chat with each other then check with both user uniqe id exits or not
  //

  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });
    console.log(conversation, 'dd');
    //return res.status(200).json(req.body);
    if (conversation) {
      res.status(200).json('already have conversation id ');
    } else {
      res.status(200).json('not have conversation id ');
      // const newConversation = new Conversation({
      //   members: [req.body.senderId, req.body.receiverId],
      // });
      // try {
      //   const savedConversation = await newConversation.save();
      //   res.status(200).json(savedConversation);
      // } catch (err) {
      //   res.status(500).json(err);
      // }
    }
  } catch (err) {
    res.status(500).json({ msg: 'somthing got wrong', masla: err.message });
  }
});

//get conv of a user

router.get('/:userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get('/find/:firstUserId/:secondUserId', async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
