import React from 'react';
import { Button, Form, Input } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import { Post, postUpdated } from './postsSlice';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const EditPostForm: React.FC<{
  post: Post;
}> = ({ post }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
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
