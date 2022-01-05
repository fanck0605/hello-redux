import React, { ReactNode } from 'react';
import { List, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { Post, postEditing, reactionAdded } from './postsSlice';
import EditPostForm from './EditPostForm';
import PostAuthor from './PostAuthor';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';

const IconText: React.FC<{
  icon: ReactNode;
  text: string;
}> = ({ icon, text }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

const PostList: React.FC<{
  addNewPost: ReactNode;
}> = ({ addNewPost }) => {
  const postList = useAppSelector((rootState) => rootState.posts);

  const sortedPostList = postList
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

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
          <IconText
            icon={
              <StarOutlined
                onClick={() =>
                  dispatch(reactionAdded({ postId: post.id, reaction: 'star' }))
                }
              />
            }
            text={`${post.reactions.star ?? 0}`}
          />,
          <IconText
            icon={
              <LikeOutlined
                onClick={() =>
                  dispatch(reactionAdded({ postId: post.id, reaction: 'like' }))
                }
              />
            }
            text={`${post.reactions.like ?? 0}`}
          />,
          <IconText icon={<MessageOutlined />} text="0" />,
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
      dataSource={sortedPostList}
      renderItem={renderPost}
      footer={addNewPost}
    />
  );
};

export default PostList;
