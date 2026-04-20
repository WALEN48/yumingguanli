import { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  DesktopOutlined,
  LinkOutlined,
  SettingOutlined,
} from '@ant-design/icons'

const { Header, Sider, Content } = Layout

// 鑿滃崟閰嶇疆
const menuItems = [
  {
    key: 'platform',
    icon: <LinkOutlined />,
    label: '骞冲彴鍩熷悕閾炬帴绠＄悊',
    children: [
      {
        key: '/platform/ios-payment',
        label: <Link to="/platform/ios-payment">寰皬 iOS 瀹㈡湇鏀粯閾炬帴</Link>,
      },
      {
        key: '/platform/agreement',
        label: <Link to="/platform/agreement">娓告垙/SDK鍗忚閾炬帴</Link>,
      },
    ],
  },
  {
    key: '/payment-link-manage',
    icon: <SettingOutlined />,
    label: <Link to="/payment-link-manage">寰皬 iOS 瀹㈡湇鏀粯閾炬帴绠＄悊</Link>,
  },
]

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // 鑾峰彇褰撳墠灞曞紑鐨勮彍鍗?  const getOpenKeys = () => {
    if (location.pathname.startsWith('/platform')) {
      return ['platform']
    }
    return []
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 椤堕儴瀵艰埅 */}
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center',
        background: '#001529',
        padding: '0 24px'
      }}>
        <div style={{ 
          color: '#fff', 
          fontSize: '18px', 
          fontWeight: 'bold',
          marginRight: '48px'
        }}>
          <DesktopOutlined style={{ marginRight: '8px' }} />
          娓告垙杩愯惀鍚庡彴
        </div>
      </Header>

      <Layout>
        {/* 宸︿晶鑿滃崟 */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
          style={{
            boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultOpenKeys={getOpenKeys()}
            items={menuItems}
            style={{ height: '100%', borderRight: 0 }}
          />
        </Sider>

        {/* 鍙充晶鍐呭鍖?*/}
        <Content style={{ 
          margin: '24px',
          padding: '24px',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          minHeight: 280,
          overflow: 'auto'
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
