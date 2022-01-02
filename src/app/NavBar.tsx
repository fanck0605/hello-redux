import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../App.module.less';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const NavBar: React.FC<{
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}> = ({ collapsed, onCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Layout.Sider
      trigger={null}
      breakpoint="lg"
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div className={styles.logo} />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="/about" icon={<InfoCircleOutlined />}>
          About
        </Menu.Item>
        <Menu.Item key="/users" icon={<TeamOutlined />}>
          Users
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default NavBar;
