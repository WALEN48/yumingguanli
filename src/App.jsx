import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import PlatformDomain from './pages/PlatformDomain/PlatformDomain'
import PaymentLinkManage from './pages/PaymentLinkManage/PaymentLinkManage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/platform/ios-payment" replace />} />
          <Route path="platform/ios-payment" element={<PlatformDomain />} />
          <Route path="platform/agreement" element={<PlatformDomain />} />
          <Route path="payment-link-manage" element={<PaymentLinkManage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
