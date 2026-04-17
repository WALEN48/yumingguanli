import React from 'react';
import { Layout, Menu, Avatar, Dropdown, Breadcrumb } from 'antd';
import {
  LinkOutlined,
  DollarOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 根据路径获取选中的菜单项
  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path.includes('/domain-link')) return ['domain-link'];
    if (path.includes('/payment-management')) return ['payment-management'];
    return ['domain-link'];
  };

  // 菜单项
  const menuItems = [
    {
      key: 'domain-link',
      icon: <LinkOutlined />,
      label: '平台域名链接管理',
      onClick: () => navigate('/domain-link'),
    },
    {
      key: 'payment-management',
      icon: <DollarOutlined />,
      label: '微小iOS客服支付链接管理',
      onClick: () => navigate('/payment-management'),
    },
  ];

  // 面包屑配置
  const getBreadcrumbItems = () => {
    const path = location.pathname;
    if (path.includes('/domain-link')) {
      return [
        { title: '首页' },
        { title: '平台域名链接管理' },
      ];
    }
    if (path.includes('/payment-management')) {
      return [
        { title: '首页' },
        { title: '微小iOS客服支付链接管理' },
      ];
    }
    return [{ title: '首页' }];
  };

  // 用户菜单
  const userMenuItems = [
    { key: 'profile', label: '个人中心' },
    { key: 'settings', label: '系统设置' },
    { key: 'logout', label: '退出登录' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 顶部导航 */}
      <Header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          background: '#001529',
          height: 50,
          lineHeight: '50px',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, #1890ff, #36cfc9)',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 500 }}>
            发行运营后台
          </span>
        </div>

        {/* 右侧用户信息 */}
        <div style={{ marginLeft: 'auto' }}>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <Avatar
                size="small"
                style={{ backgroundColor: '#1890ff' }}
                icon={<UserOutlined />}
              >
                管
              </Avatar>
              <span>管理员</span>
              <DownOutlined style={{ fontSize: 12 }} />
            </div>
          </Dropdown>
        </div>
      </Header>

      <Layout style={{ marginTop: 50 }}>
        {/* 左侧菜单 */}
        <Sider
          trigger={null}
          collapsible
          theme="dark"
          width={220}
          style={{
            background: '#001529',
            overflow: 'auto',
            height: 'calc(100vh - 50px)',
            position: 'fixed',
            left: 0,
            top: 50,
            bottom: 0,
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={getSelectedKeys()}
            items={menuItems}
            style={{
              background: '#001529',
              borderRight: 0,
            }}
          />
        </Sider>

        {/* 内容区 */}
        <Layout
          style={{
            marginLeft: 220,
            transition: 'all 0.2s',
          }}
        >
          {/* 面包屑 */}
          <div
            style={{
              background: '#fff',
              padding: '12px 24px',
              borderBottom: '1px solid #e8e8e8',
            }}
          >
            <Breadcrumb items={getBreadcrumbItems()} />
          </div>

          {/* 主内容 */}
          <Content
            style={{
              margin: 16,
              padding: 24,
              background: '#fff',
              borderRadius: 4,
              minHeight: 'calc(100vh - 180px)',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
