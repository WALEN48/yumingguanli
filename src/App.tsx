import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Layout from './components/Layout';
import DomainLinkPage from './pages/DomainLink';
import PaymentManagementPage from './pages/PaymentManagement';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/domain-link" replace />} />
            <Route path="domain-link" element={<DomainLinkPage />} />
            <Route path="payment-management" element={<PaymentManagementPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
