const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const User = require("./user");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id],
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id],
      },
    },
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

// check ownership of conversation given conversation id and user id

Conversation.checkConversationOwner = async function (conversationId, userId) {
  const conversation = await Conversation.findOne({
    where: {
      id: {
        [Op.eq]: conversationId,
      },
      [Op.or]: {
        user1Id: userId,
        user2Id: userId,
      },
    },
  });
  if (conversation) return true;
  return false;
};

// get the contacts (id) of user given userId

Conversation.getUserContacts = async (userId) => {
  const conversations = await Conversation.findAll({
    where: {
      [Op.or]: {
        user1Id: userId,
        user2Id: userId,
      },
    },
    attribute: ["id"],
  });
  const userIdSet = new Set();
  for (let i = 0; i < conversations.length; i++) {
    userIdSet.add(conversations[i].dataValues.user1Id);
    userIdSet.add(conversations[i].dataValues.user2Id);
  }
  userIdSet.delete(userId);
  const userContacts = Array.from(userIdSet);
  return userContacts;
};

module.exports = Conversation;
