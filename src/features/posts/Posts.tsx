import React from 'react';
import PostList from './PostList';
import AddPostForm from './AddPostForm';

const Posts: React.FC = () => {
  return <PostList addNewPost={<AddPostForm />} />;
};

export default Posts;
