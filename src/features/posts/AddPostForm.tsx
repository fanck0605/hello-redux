import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import styles from './PostList.module.less';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postAdded } from './postsSlice';
import { User } from '../users/usersSlice';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const AddPostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const users = useAppSelector((rootState) => rootState.users);

  const renderUserOption = (user: User) => {
    return <Select.Option value={user.id}>{user.name}</Select.Option>;
  };

  return (
    <Form
      {...layout}
      className={styles.addNewPost}
      form={form}
      onFinish={(values) => {
        dispatch(postAdded(values));
        form.resetFields();
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

export default AddPostForm;
