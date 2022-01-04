import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Post, postUpdated } from './postsSlice';
import { User } from '../users/usersSlice';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const EditPostForm: React.FC<{
  post: Post;
}> = ({ post }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const users = useAppSelector((rootState) => rootState.users);

  const renderUserOption = (user: User) => {
    return <Select.Option value={user.id}>{user.name}</Select.Option>;
  };

  return (
    <Form
      {...layout}
      form={form}
      initialValues={post}
      onFinish={(values) => {
        dispatch(postUpdated({ id: post.id, ...values }));
      }}
    >
      <Form.Item name={'title'} label="Post Title">
        <Input />
      </Form.Item>
      <Form.Item name={'userId'} label="User">
        <Select placeholder="Please select a user!">
          {users.map(renderUserOption)}
        </Select>
      </Form.Item>
      <Form.Item name={'content'} label="Content">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Post
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditPostForm;
