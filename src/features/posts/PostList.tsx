import React, { ReactNode } from 'react';
import { List } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { Post, postEditing } from './postsSlice';
import EditPostForm from './EditPostForm';
import PostAuthor from './PostAuthor';

const PostList: React.FC<{
  addNewPost: ReactNode;
}> = ({ addNewPost }) => {
  const postList = useAppSelector((rootState) => rootState.posts);

  const dispatch = useAppDispatch();

  const renderPost = (post: Post) =>
    post.isEditing ? (
      <List.Item key={post.id}>
        <EditPostForm post={post} />
      </List.Item>
    ) : (
      <List.Item
        key={post.id}
        actions={[
          <a
            href="#"
            onClick={() => {
              dispatch(postEditing(post.id));
            }}
          >
            Edit
          </a>,
        ]}
      >
        <List.Item.Meta
          title={<Link to={`/posts/${post.id}`}>{post.title}</Link>}
          description={<PostAuthor userId={post.userId} />}
        />
        {post.content}
      </List.Item>
    );

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={postList}
      renderItem={renderPost}
      footer={addNewPost}
    />
  );
};

export default PostList;
