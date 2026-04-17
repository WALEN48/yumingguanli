import React, { useEffect, useState } from 'react';
import { Form, Select, Typography } from 'antd';
import type { PaymentManagement } from '../../types';
import { getSubjectOptions, getLinkOptionsBySubject } from '../../services/api';
import type { Option } from '../../types';

const { Text } = Typography;

interface PaymentManagementFormProps {
  initialValues?: Partial<PaymentManagement>;
  form: any;
}

const PaymentManagementForm: React.FC<PaymentManagementFormProps> = ({
  initialValues,
  form,
}) => {
  const [subjectOptions, setSubjectOptions] = useState<Option[]>([]);
  const [linkOptions, setLinkOptions] = useState<Option[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>(initialValues?.subject || '');

  useEffect(() => {
    setSubjectOptions(getSubjectOptions());
    if (initialValues?.subject) {
      setLinkOptions(getLinkOptionsBySubject(initialValues.subject));
    }
  }, [initialValues]);

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    form.setFieldValue('paymentLink', undefined);
    setLinkOptions(getLinkOptionsBySubject(value));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item label="游戏">
        <Text type="secondary">{initialValues?.game || '-'}</Text>
      </Form.Item>

      <Form.Item label="渠道">
        <Text type="secondary">{initialValues?.channel || '-'}</Text>
      </Form.Item>

      <Form.Item
        label="主体"
        name="subject"
        rules={[{ required: true, message: '请选择主体' }]}
      >
        <Select
          placeholder="请选择主体"
          options={subjectOptions}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          onChange={handleSubjectChange}
        />
      </Form.Item>

      <Form.Item
        label="链接"
        name="paymentLink"
        rules={[{ required: true, message: '请选择链接' }]}
      >
        <Select
          placeholder="请选择链接"
          options={linkOptions}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase()) ||
            (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
          }
          disabled={!selectedSubject}
        />
      </Form.Item>
    </Form>
  );
};

export default PaymentManagementForm;
