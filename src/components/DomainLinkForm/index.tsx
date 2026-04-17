import React from 'react';
import { Form, Input, Radio } from 'antd';
import type { DomainLink } from '../../types';
import { isValidUrl } from '../../utils/validators';

interface DomainLinkFormProps {
  initialValues?: Partial<DomainLink>;
  form: any;
}

const DomainLinkForm: React.FC<DomainLinkFormProps> = ({ initialValues, form }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        status: 'enabled',
        ...initialValues,
      }}
    >
      <Form.Item
        label="链接地址"
        name="url"
        rules={[
          { required: true, message: '请输入链接地址' },
          {
            validator: (_, value) => {
              if (!value || isValidUrl(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('请输入合法的 URL 地址'));
            },
          },
        ]}
      >
        <Input placeholder="请输入合法的 URL 地址" />
      </Form.Item>

      <Form.Item
        label="主体"
        name="subject"
        rules={[{ required: true, message: '请输入主体' }]}
      >
        <Input placeholder="请输入主体" />
      </Form.Item>

      <Form.Item
        label="展示状态"
        name="status"
        rules={[{ required: true, message: '请选择展示状态' }]}
      >
        <Radio.Group>
          <Radio value="enabled">启用</Radio>
          <Radio value="disabled">禁用</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default DomainLinkForm;
