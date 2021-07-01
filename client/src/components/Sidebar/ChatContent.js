import React, { useState, useEffect } from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadText: {
    fontWeight: "bolder",
    fontSize: 12,
    letterSpacing: -0.17,
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  unreadBuble: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: 30,
    backgroundColor: "#3f92FF",
  },
  badgeText: {
    fontFamily: "sans-serif",
    fontSize: 12,
    fontWeight: "bolder",
    padding: "auto",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const { conversation, activeConversation } = props;
  const { latestMessageText, otherUser } = conversation;

  const [unreadMsgCount, setUnreadMsgCount] = useState(0);
  const countUnreadMsg = () => {
    let unreadCount = 0;
    // count unread if it is not active conversation
    if (activeConversation !== otherUser.username)
      for (let message of conversation.messages) {
        if (!message.read && message.senderId === otherUser.id) {
          unreadCount++;
        }
      }
    setUnreadMsgCount(unreadCount);
  };

  useEffect(() => {
    countUnreadMsg();
  }, [conversation, activeConversation]);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            unreadMsgCount === 0 ? classes.previewText : classes.unreadText
          }
        >
          {latestMessageText}
        </Typography>
      </Box>
      <Badge
        badgeContent={unreadMsgCount}
        color="primary"
        className={classes.unreadBuble}
        classes={{ badge: classes.badgeText }}
      ></Badge>
    </Box>
  );
};

export default ChatContent;
