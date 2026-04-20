import { useState, useEffect } from 'react'
import { Card, Form, Select, Button, Table, Tag, Space, message } from 'antd'
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import LinkFormModal from '../../components/Common/LinkFormModal'
import { agreementApi } from '../../services/api'

const { Option } = Select

const AgreementLink = () => {
  const [form] = Form.useForm()
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
  const [entityOptions, setEntityOptions] = useState([])

  // 鑾峰彇涓讳綋閫夐」
  useEffect(() => {
    agreementApi.getEntityOptions().then(options => {
      setEntityOptions(options)
    })
  }, [])

  // 鑾峰彇鍒楄〃鏁版嵁
  const fetchData = async (params = {}) => {
    setTableLoading(true)
    try {
      const values = form.getFieldsValue()
      const res = await agreementApi.getList({
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

  // 鏂板
  const handleAdd = () => {
    setCurrentRecord(null)
    setModalOpen(true)
  }

  // 缂栬緫
  const handleEdit = (record) => {
    setCurrentRecord(record)
    setModalOpen(true)
  }

  // 淇濆瓨
  const handleSave = async (values, id) => {
    setLoading(true)
    try {
      if (id) {
        await agreementApi.update(id, values)
        message.success('缂栬緫鎴愬姛')
      } else {
        await agreementApi.create(values)
        message.success('鏂板鎴愬姛')
      }
      setModalOpen(false)
      fetchData()
    } finally {
      setLoading(false)
    }
  }

  // 琛ㄦ牸鍒楀畾涔?  const columns = [
    {
      title: '閾炬帴鍦板潃',
      dataIndex: 'url',
      key: 'url',
      width: 300,
      ellipsis: true,
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>
      )
    },
    {
      title: '涓讳綋',
      dataIndex: 'entity',
      key: 'entity',
      width: 120
    },
    {
      title: '灞曠ず鐘舵€?,
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        status === 1 ? 
          <Tag color="success">鍚敤</Tag> : 
          <Tag color="default">绂佺敤</Tag>
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
        <Button type="link" onClick={() => handleEdit(record)}>
          缂栬緫
        </Button>
      )
    }
  ]

  return (
    <div>
      {/* 绛涢€夊尯 */}
      <Card style={{ marginBottom: '24px' }}>
        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
        >
          <Form.Item label="涓讳綋" name="entity">
            <Select
              placeholder="璇烽€夋嫨涓讳綋"
              allowClear
              showSearch
              style={{ width: 200 }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {entityOptions.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="灞曠ず鐘舵€? name="status">
            <Select
              placeholder="鍏ㄩ儴"
              allowClear
              style={{ width: 120 }}
            >
              <Option value="">鍏ㄩ儴</Option>
              <Option value={1}>鍚敤</Option>
              <Option value={0}>绂佺敤</Option>
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
      <Card
        title="閾炬帴鍒楄〃"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            鏂板閾炬帴
          </Button>
        }
      >
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
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* 鏂板/缂栬緫寮圭獥 */}
      <LinkFormModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSave}
        initialValues={currentRecord}
        title={currentRecord ? '缂栬緫鍗忚閾炬帴' : '鏂板鍗忚閾炬帴'}
        loading={loading}
      />
    </div>
  )
}

export default AgreementLink
