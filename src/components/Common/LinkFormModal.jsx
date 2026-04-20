import { useState, useEffect } from 'react'
import { Modal, Form, Input, Radio, Select } from 'antd'
import { urlValidator, requiredValidator } from '../../utils/validators'
import { iosPaymentApi } from '../../services/api'

const { Option } = Select
const { TextArea } = Input

const LinkFormModal = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  title,
  loading = false
}) => {
  const [form] = Form.useForm()
  const isEdit = !!initialValues?.id
  const [entityOptions, setEntityOptions] = useState([])

  // 鑾峰彇涓讳綋閫夐」
  useEffect(() => {
    iosPaymentApi.getEntityOptions().then(options => {
      setEntityOptions(options)
    })
  }, [])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      await onSubmit(values, isEdit ? initialValues.id : null)
      form.resetFields()
    } catch (error) {
      console.error('琛ㄥ崟鏍￠獙澶辫触:', error)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  return (
    <Modal
      title={title || (isEdit ? '缂栬緫閾炬帴' : '鏂板閾炬帴')}
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="淇濆瓨"
      cancelText="鍙栨秷"
      width={520}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: 1,
          ...initialValues
        }}
        style={{ marginTop: '16px' }}
      >
        <Form.Item
          label="閾炬帴鍦板潃"
          name="url"
          rules={[
            requiredValidator('璇疯緭鍏ラ摼鎺ュ湴鍧€'),
            { validator: urlValidator }
          ]}
        >
          <Input placeholder="璇疯緭鍏ュ悎娉曠殑 URL 鍦板潃" />
        </Form.Item>

        <Form.Item
          label="涓讳綋"
          name="entity"
          rules={[requiredValidator('璇烽€夋嫨涓讳綋')]}
        >
          <Select
            placeholder="璇烽€夋嫨涓讳綋"
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {entityOptions.map(opt => (
              <Option key={opt.value} value={opt.value}>{opt.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="灞曠ず鐘舵€?
          name="status"
          rules={[requiredValidator('璇烽€夋嫨灞曠ず鐘舵€?)]}
        >
          <Radio.Group>
            <Radio value={1}>鍚敤</Radio>
            <Radio value={0}>绂佺敤</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="澶囨敞"
          name="remark"
        >
          <TextArea
            placeholder="璇疯緭鍏ュ娉ㄥ唴瀹?
            rows={3}
            maxLength={500}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default LinkFormModal
