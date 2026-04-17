import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Tabs,
  Form,
  Select,
  Button,
  Table,
  Tag,
  Space,
  Modal,
  message,
  Row,
  Col,
  Divider,
} from 'antd';
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { DomainLink, Option } from '../../types';
import {
  getDomainLinks,
  getProtocolLinks,
  createDomainLink,
  updateDomainLink,
  createProtocolLink,
  updateProtocolLink,
  getSubjectOptions,
} from '../../services/api';
import DomainLinkForm from '../../components/DomainLinkForm';

const { TabPane } = Tabs;

const statusOptions = [
  { value: 'all', label: '全部' },
  { value: 'enabled', label: '启用' },
  { value: 'disabled', label: '禁用' },
];

const DomainLinkPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('payment');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DomainLink[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<Option[]>([]);
  const [searchForm] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DomainLink | null>(null);
  const [modalForm] = Form.useForm();
  const [lastUpdateTime, setLastUpdateTime] = useState<string>('-');

  // 获取选项数据
  useEffect(() => {
    setSubjectOptions(getSubjectOptions());
  }, []);

  // 获取列表数据
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const values = searchForm.getFieldsValue();
      const query = {
        subject: values.subject,
        status: values.status,
      };

      const result = activeTab === 'payment'
        ? await getDomainLinks(query)
        : await getProtocolLinks(query);

      setData(result);
      setLastUpdateTime(new Date().toLocaleString('zh-CN'));
    } catch (error) {
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchForm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 查询
  const handleSearch = () => {
    fetchData();
  };

  // 重置
  const handleReset = () => {
    searchForm.resetFields();
    fetchData();
  };

  // 打开新增弹窗
  const handleAdd = () => {
    setEditingRecord(null);
    modalForm.resetFields();
    setModalVisible(true);
  };

  // 打开编辑弹窗
  const handleEdit = (record: DomainLink) => {
    setEditingRecord(record);
    modalForm.setFieldsValue(record);
    setModalVisible(true);
  };

  // 保存
  const handleSave = async () => {
    try {
      const values = await modalForm.validateFields();

      if (editingRecord) {
        // 编辑
        if (activeTab === 'payment') {
          await updateDomainLink(editingRecord.id, values);
        } else {
          await updateProtocolLink(editingRecord.id, values);
        }
        message.success('更新成功');
      } else {
        // 新增
        if (activeTab === 'payment') {
          await createDomainLink(values);
        } else {
          await createProtocolLink(values);
        }
        message.success('新增成功');
      }

      setModalVisible(false);
      fetchData();
    } catch (error) {
      // 表单校验失败
    }
  };

  // 表格列
  const columns = [
    {
      title: '链接地址',
      dataIndex: 'url',
      key: 'url',
      ellipsis: true,
    },
    {
      title: '主体',
      dataIndex: 'subject',
      key: 'subject',
      width: 120,
    },
    {
      title: '展示状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'enabled' ? 'success' : 'default'}>
          {status === 'enabled' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '最后编辑人',
      dataIndex: 'lastEditor',
      key: 'lastEditor',
      width: 120,
    },
    {
      title: '最后编辑时间',
      dataIndex: 'lastEditTime',
      key: 'lastEditTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: any, record: DomainLink) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          编辑
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* 筛选区 - 参考截图样式 */}
      <Card bordered={false} style={{ marginBottom: 16 }}>
        <Form form={searchForm} layout="inline">
          <Row gutter={[16, 16]} align="middle" style={{ width: '100%' }}>
            <Col>
              <Form.Item
                label="主体"
                name="subject"
                style={{ marginBottom: 0 }}
                labelCol={{ style: { width: 80, textAlign: 'right' } }}
              >
                <Select
                  placeholder="请选择主体"
                  options={subjectOptions}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  allowClear
                  style={{ width: 200 }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="展示状态"
                name="status"
                initialValue="all"
                style={{ marginBottom: 0 }}
                labelCol={{ style: { width: 80, textAlign: 'right' } }}
              >
                <Select options={statusOptions} style={{ width: 200 }} />
              </Form.Item>
            </Col>
            <Col style={{ marginLeft: 'auto' }}>
              <Form.Item style={{ marginBottom: 0 }}>
                <Space>
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={handleSearch}
                  >
                    查询
                  </Button>
                  <Button icon={<ReloadOutlined />} onClick={handleReset}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 列表区 */}
      <Card bordered={false}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          tabBarExtraContent={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新增链接
            </Button>
          }
        >
          <TabPane tab="微小iOS客服支付链接" key="payment" />
          <TabPane tab="协议链接" key="protocol" />
        </Tabs>

        <Divider style={{ margin: '16px 0' }} />

        {/* 更新时间和操作栏 */}
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <span style={{ color: '#666', fontSize: 14 }}>
              最后更新时间：{lastUpdateTime}
            </span>
          </Col>
        </Row>

        {/* 表格 */}
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>

      {/* 弹窗 */}
      <Modal
        title={editingRecord ? '编辑链接' : '新增链接'}
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        width={560}
        destroyOnClose
        okText="保存"
        cancelText="取消"
      >
        <DomainLinkForm form={modalForm} initialValues={editingRecord || undefined} />
      </Modal>
    </>
  );
};

export default DomainLinkPage;
