import React from 'react';
import { List } from 'antd';
import { useAppSelector } from '../../app/hooks';

const PostList: React.FC = () => {
  const postList = useAppSelector((rootState) => rootState.posts);

  const renderPost = (post: typeof postList[number]) => (
    <List.Item key={post.title}>
      <List.Item.Meta title={post.title} />
      {post.content}
    </List.Item>
  );

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={postList}
      renderItem={renderPost}
    />
  );
};

export default PostList;
