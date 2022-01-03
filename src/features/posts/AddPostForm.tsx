import React from 'react';
import { Button, Form, Input } from 'antd';
import styles from './PostList.module.less';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const AddPostForm: React.FC = () => {
  return (
    <Form
      {...layout}
      className={styles.addNewPost}
      onFinish={(values) => {
        console.log(values);
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
