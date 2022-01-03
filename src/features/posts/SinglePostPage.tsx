import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Typography } from 'antd';

const SinglePostPage: React.FC = () => {
  const params = useParams<'postId'>();
  const postId = params.postId;

  const post = useAppSelector((rootState) =>
    rootState.posts.find((post) => post.id === postId)
  ) ?? {
    title: 'Not Found!',
    content: '',
  };

  return (
    <Typography>
      <Typography.Title>{post.title}</Typography.Title>
      <Typography.Text>{post.content}</Typography.Text>
    </Typography>
  );
};

export default SinglePostPage;
