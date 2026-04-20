import { useState, useEffect } from 'react'
import { Card, Form, Select, Button, Table, Space, message, Modal } from 'antd'
import { EditOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import { paymentLinkManageApi } from '../../services/api'

const { Option } = Select

const PaymentLinkManage = () => {
  const [form] = Form.useForm()
  const [editForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [tableLoading, setTableLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })
  
  // 閫夐」鏁版嵁
  const [gameOptions, setGameOptions] = useState([])
  const [channelOptions, setChannelOptions] = useState([])
  const [entityOptions, setEntityOptions] = useState([])
  const [linkOptions, setLinkOptions] = useState([])

  // 鑾峰彇閫夐」鏁版嵁
  useEffect(() => {
    paymentLinkManageApi.getGameOptions().then(setGameOptions)
    paymentLinkManageApi.getChannelOptions().then(setChannelOptions)
    paymentLinkManageApi.getEntityOptions().then(setEntityOptions)
  }, [])

  // 鑾峰彇鍒楄〃鏁版嵁
  const fetchData = async (params = {}) => {
    setTableLoading(true)
    try {
      const values = form.getFieldsValue()
      const res = await paymentLinkManageApi.getList({
        page: pagination.current,
        pageSize: pagination.pageSize,
        ...values,
        ...params
      })
      setData(res.list)
      setPagination({
        ...pagination,
        total: res.total,
        ...params
      })
    } finally {
      setTableLoading(false)
    }
  }

  // 鍒濆鍔犺浇
  useEffect(() => {
    fetchData()
  }, [])

  // 鏌ヨ
  const handleSearch = () => {
    fetchData({ current: 1 })
  }

  // 閲嶇疆
  const handleReset = () => {
    form.resetFields()
    fetchData({ current: 1 })
  }

  // 缂栬緫
  const handleEdit = (record) => {
    setCurrentRecord(record)
    editForm.setFieldsValue({
      game: record.game,
      channel: record.channel,
      entity: record.entity,
      link: record.link
    })
    // 濡傛灉鏈変富浣擄紝鍔犺浇瀵瑰簲鐨勯摼鎺ラ€夐」
    if (record.entity) {
      paymentLinkManageApi.getLinkOptionsByEntity(record.entity).then(setLinkOptions)
    }
    setModalOpen(true)
  }

  // 淇濆瓨
  const handleSave = async () => {
    try {
      const values = await editForm.validateFields()
      setLoading(true)
      await paymentLinkManageApi.update(currentRecord.id, values)
      message.success('缂栬緫鎴愬姛')
      setModalOpen(false)
      fetchData()
    } catch (error) {
      console.error('淇濆瓨澶辫触:', error)
    } finally {
      setLoading(false)
    }
  }

  // 鍙栨秷
  const handleCancel = () => {
    editForm.resetFields()
    setLinkOptions([])
    setModalOpen(false)
  }

  // 琛ㄦ牸鍒楀畾涔?  const columns = [
    {
      title: '娓告垙',
      dataIndex: 'game',
      key: 'game',
      width: 150
    },
    {
      title: '娓犻亾',
      dataIndex: 'channel',
      key: 'channel',
      width: 120
    },
    {
      title: '杩愯惀涓讳綋',
      dataIndex: 'entity',
      key: 'entity',
      width: 200
    },
    {
      title: '鏀粯閾炬帴',
      dataIndex: 'link',
      key: 'link',
      width: 300,
      ellipsis: true,
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>
      )
    },
    {
      title: '鏈€鍚庣紪杈戜汉',
      dataIndex: 'editor',
      key: 'editor',
      width: 120
    },
    {
      title: '鏈€鍚庣紪杈戞椂闂?,
      dataIndex: 'editTime',
      key: 'editTime',
      width: 180
    },
    {
      title: '鎿嶄綔',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Button 
          type="link" 
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          缂栬緫
        </Button>
      )
    }
  ]

  return (
    <div>
      <h2 style={{ marginBottom: '24px' }}>寰皬 iOS 瀹㈡湇鏀粯閾炬帴绠＄悊</h2>
      
      {/* 绛涢€夊尯 */}
      <Card style={{ marginBottom: '24px' }}>
        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
        >
          <Form.Item label="娓告垙" name="game">
            <Select
              placeholder="璇烽€夋嫨娓告垙"
              allowClear
              showSearch
              style={{ width: 180 }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {gameOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="娓犻亾" name="channel">
            <Select
              placeholder="璇烽€夋嫨娓犻亾"
              allowClear
              showSearch
              style={{ width: 160 }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {channelOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="涓讳綋" name="entity">
            <Select
              placeholder="璇烽€夋嫨涓讳綋"
              allowClear
              showSearch
              style={{ width: 160 }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {entityOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                鏌ヨ
              </Button>
              <Button icon={<ReloadOutlined />} onClick={handleReset}>
                閲嶇疆
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* 鍒楄〃鍖?*/}
      <Card title="閾炬帴绠＄悊鍒楄〃">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={tableLoading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => `鍏?${total} 鏉,
            onChange: (page, pageSize) => {
              fetchData({ current: page, pageSize })
            }
          }}
          scroll={{ x: 1100 }}
        />
      </Card>

      {/* 缂栬緫寮圭獥 */}
      <Modal
        title="缂栬緫鏀粯閾炬帴"
        open={modalOpen}
        onOk={handleSave}
        onCancel={handleCancel}
        confirmLoading={loading}
        okText="淇濆瓨"
        cancelText="鍙栨秷"
        width={520}
        destroyOnClose
      >
        <Form
          form={editForm}
          layout="vertical"
          style={{ marginTop: '16px' }}
        >
          <Form.Item
            label="娓告垙"
            name="game"
          >
            <span style={{ 
              display: 'inline-block', 
              padding: '4px 11px',
              background: '#f5f5f5',
              borderRadius: '6px',
              color: '#666'
            }}>
              {currentRecord?.game}
            </span>
          </Form.Item>

          <Form.Item
            label="娓犻亾"
            name="channel"
          >
            <span style={{
              display: 'inline-block',
              padding: '4px 11px',
              background: '#f5f5f5',
              borderRadius: '6px',
              color: '#666'
            }}>
              {currentRecord?.channel}
            </span>
          </Form.Item>

          <Form.Item
            label="杩愯惀涓讳綋"
          >
            <span style={{
              display: 'inline-block',
              padding: '4px 11px',
              background: '#f5f5f5',
              borderRadius: '6px',
              color: '#666'
            }}>
              {currentRecord?.entity}
            </span>
          </Form.Item>

          <Form.Item
            label="閾炬帴"
            name="link"
            rules={[{ required: true, message: '璇烽€夋嫨閾炬帴' }]}
          >
            <Select
              placeholder="璇烽€夋嫨閾炬帴"
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {linkOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PaymentLinkManage
