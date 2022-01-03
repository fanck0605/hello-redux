import React from 'react';
import { Button, Form, Input } from 'antd';
import styles from './PostList.module.less';
import { useAppDispatch } from '../../app/hooks';
import { postAdded } from './postsSlice';
import { nanoid } from '@reduxjs/toolkit';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const AddPostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  return (
    <Form
      {...layout}
      className={styles.addNewPost}
      form={form}
      onFinish={(values) => {
        dispatch(postAdded({ id: nanoid(), ...values }));
        form.resetFields();
      }}
    >
      <Form.Item name={'title'} label="Post Title">
        <Input />
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
