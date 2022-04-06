// Moment
import moment from "moment";

// Semantice ui
import { Card, Icon, Image, Label, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Components
import LikeButton from "./LikeButton.jsx";
import DeleteButton from "./DeleteButton.jsx";

// Context
import { AuthContext } from "../context/auth";
import { useContext } from "react";
import MyPopup from "../util/MyPopup.js";

const PostCard = ({
  post: { body, createdAt, commentCount, likeCount, id, likes, username },
}) => {
  const { userData } = useContext(AuthContext);
  //console.log(likes);

  return (
    <Card fluid>
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton userData={userData} post={{ id, likes, likeCount }} />
        <MyPopup content="Comment on Post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
        {userData && userData.username === username && (
          <DeleteButton postId={id} />
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
