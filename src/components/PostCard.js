import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button,Popup} from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useQuery } from "@apollo/client";

import LikeButton from "./LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";

import { FETCH_USER_QUERY } from "../util/graphql";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
  userId,
}) {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId,
    },
  });

  if (loading) return "Loading...";
  console.log(data);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          as={Link}
          to={`/profile/${userId}`}
          src={
            data.getUser.profilePhoto
              ? data.getUser.profilePhoto
              : "https://react.semantic-ui.com/images/avatar/large/steve.jpg"
          }
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>
          {body.length > 100 ? body.substr(0, 85) + ".........." : body}{" "}
          {body.length > 100 ? (
            <Link to={`/posts/${id}`}>
              <strong>Show More</strong>
            </Link>
          ) : (
            ""
          )}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }}></LikeButton>
        <Popup
          content="Comment on post"
          inverted
          trigger={
            <Button
              labelPosition="right"
              size="mini"
              as={Link}
              to={`/posts/${id}`}
            >
              <Button color="blue" basic size="mini">
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
