import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import styles from './App.module.less';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import NavBar from './app/NavBar';
import Posts from './features/posts/Posts';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout className={styles['site-layout']}>
        <Layout.Header
          className={styles['site-layout-background']}
          style={{ padding: 0 }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined
              className={styles['trigger']}
              onClick={() => setCollapsed(false)}
            />
          ) : (
            <MenuFoldOutlined
              className={styles['trigger']}
              onClick={() => setCollapsed(true)}
            />
          )}
        </Layout.Header>
        <Layout.Content
          className={styles['site-layout-background']}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 360,
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

const Home = () => <h2>Home</h2>;

const Users = () => <h2>Users</h2>;

const About = () => <h2>About</h2>;
