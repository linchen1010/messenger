import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { updateUnreadConversation } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";
import store from "../../store";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

class Chat extends Component {
  handleClick = async (conversation) => {
    await this.props.setActiveChat(conversation.otherUser.username);
    await this.props.updateUnreadConversation({
      conversationId: conversation.id,
      senderId: conversation.otherUser.id,
    });
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    const { activeConversation } = store.getState();
    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent
          conversation={this.props.conversation}
          activeConversation={activeConversation}
        />
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    updateUnreadConversation: (message) => {
      dispatch(updateUnreadConversation(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
