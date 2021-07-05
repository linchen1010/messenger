import React, { useState, useEffect } from "react";
import { Box, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const useStyles = makeStyles(() => ({
  container: {
    flexDirection: "column",
    display: "flex",
  },
  lastReadAvatar: {
    width: "20px",
    height: "20px",
    alignSelf: "flex-end",
    marginTop: "5px",
    marginBottom: "5px",
  },
}));

const Messages = (props) => {
  const classes = useStyles();
  const { messages, otherUser, userId } = props;
  const [lastReadMsgId, setLastReadMsgId] = useState(0);

  const getLastReadMsgId = () => {
    for (let i = messages.length - 1; i > 0; i--) {
      if (messages[i].read && messages[i].senderId === userId) {
        setLastReadMsgId(messages[i].id);
        break;
      }
    }
  };

  useEffect(() => {
    getLastReadMsgId();
  }, [messages, otherUser]);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <div key={message.id} className={classes.container}>
            <SenderBubble key={message.id} text={message.text} time={time} />
            {message.id === lastReadMsgId && (
              <Avatar
                alt={otherUser.username}
                src={otherUser.photoUrl}
                className={classes.lastReadAvatar}
              ></Avatar>
            )}
          </div>
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
