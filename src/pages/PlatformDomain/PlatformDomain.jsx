import { Tabs } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import IosPaymentLink from './IosPaymentLink'
import AgreementLink from './AgreementLink'

const PlatformDomain = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const items = [
    {
      key: '/platform/ios-payment',
      label: '寰皬iOS瀹㈡湇鏀粯閾炬帴',
      children: <IosPaymentLink />,
    },
    {
      key: '/platform/agreement',
      label: '娓告垙/SDK鍗忚閾炬帴',
      children: <AgreementLink />,
    },
  ]

  return (
    <div>
      <h2 style={{ marginBottom: '24px' }}>骞冲彴鍩熷悕閾炬帴绠＄悊</h2>
      <Tabs
        activeKey={location.pathname}
        items={items}
        onChange={(key) => navigate(key)}
        type="card"
      />
    </div>
  )
}

export default PlatformDomain
