import React, { ReactNode } from 'react';
import { List } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';

const PostList: React.FC<{
  addNewPost: ReactNode;
}> = ({ addNewPost }) => {
  const postList = useAppSelector((rootState) => rootState.posts);

  const renderPost = (post: typeof postList[number]) => (
    <List.Item key={post.id}>
      <List.Item.Meta
        title={<Link to={`/posts/${post.id}`}>{post.title}</Link>}
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
