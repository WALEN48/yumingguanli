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
    <Card bordered={false}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>
          微小iOS客服支付链接管理
        </h2>
      </div>

      {/* 搜索区 */}
      <Form form={searchForm} layout="vertical">
        <Row gutter={16} align="bottom">
          <Col span={6}>
            <Form.Item label="游戏" name="game">
              <Select
                placeholder="请选择游戏"
                options={gameOptions}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="渠道" name="channel">
              <Select
                placeholder="请选择渠道"
                options={channelOptions}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="主体" name="subject">
              <Select
                placeholder="请选择主体"
                options={subjectOptions}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
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

      {/* 弹窗 */}
      <Modal
        title="编辑支付链接"
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        width={560}
        destroyOnClose
      >
        <PaymentManagementForm
          form={modalForm}
          initialValues={editingRecord || undefined}
        />
      </Modal>
    </Card>
  );
};

export default PaymentManagementPage;
