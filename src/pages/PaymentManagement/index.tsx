import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Form,
  Select,
  Button,
  Table,
  Modal,
  message,
  Row,
  Col,
  Space,
  Divider,
} from 'antd';
import { SearchOutlined, ReloadOutlined, EditOutlined } from '@ant-design/icons';
import type { PaymentManagement, Option } from '../../types';
import {
  getPaymentManagements,
  updatePaymentManagement,
  getSubjectOptions,
  getGameOptions,
  getChannelOptions,
} from '../../services/api';
import PaymentManagementForm from '../../components/PaymentManagementForm';

const PaymentManagementPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PaymentManagement[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<Option[]>([]);
  const [gameOptions, setGameOptions] = useState<Option[]>([]);
  const [channelOptions, setChannelOptions] = useState<Option[]>([]);
  const [searchForm] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PaymentManagement | null>(null);
  const [modalForm] = Form.useForm();
  const [lastUpdateTime, setLastUpdateTime] = useState<string>('-');

  // 获取选项数据
  useEffect(() => {
    setSubjectOptions(getSubjectOptions());
    setGameOptions(getGameOptions());
    setChannelOptions(getChannelOptions());
  }, []);

  // 获取列表数据
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const values = searchForm.getFieldsValue();
      const query = {
        game: values.game,
        channel: values.channel,
        subject: values.subject,
      };

      const result = await getPaymentManagements(query);
      setData(result);
      setLastUpdateTime(new Date().toLocaleString('zh-CN'));
    } catch (error) {
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  }, [searchForm]);

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

  // 打开编辑弹窗
  const handleEdit = (record: PaymentManagement) => {
    setEditingRecord(record);
    modalForm.setFieldsValue(record);
    setModalVisible(true);
  };

  // 保存
  const handleSave = async () => {
    try {
      const values = await modalForm.validateFields();

      if (editingRecord) {
        await updatePaymentManagement(editingRecord.id, values);
        message.success('更新成功');
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
      title: '游戏',
      dataIndex: 'game',
      key: 'game',
      width: 150,
    },
    {
      title: '渠道',
      dataIndex: 'channel',
      key: 'channel',
      width: 150,
    },
    {
      title: '支付链接',
      dataIndex: 'paymentLink',
      key: 'paymentLink',
      ellipsis: true,
    },
    {
      title: '主体',
      dataIndex: 'subject',
      key: 'subject',
      width: 120,
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
      render: (_: any, record: PaymentManagement) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
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
                label="游戏"
                name="game"
                style={{ marginBottom: 0 }}
                labelCol={{ style: { width: 80, textAlign: 'right' } }}
              >
                <Select
                  placeholder="请选择游戏"
                  options={gameOptions}
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
                label="渠道"
                name="channel"
                style={{ marginBottom: 0 }}
                labelCol={{ style: { width: 80, textAlign: 'right' } }}
              >
                <Select
                  placeholder="请选择渠道"
                  options={channelOptions}
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
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>
            微小iOS客服支付链接管理
          </h2>
        </div>

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
        title="编辑支付链接"
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        width={560}
        destroyOnClose
        okText="保存"
        cancelText="取消"
      >
        <PaymentManagementForm
          form={modalForm}
          initialValues={editingRecord || undefined}
        />
      </Modal>
    </>
  );
};

export default PaymentManagementPage;
