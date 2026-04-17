import type { DomainLink, PaymentManagement, Option } from '../types';

// Mock 域名链接数据
export const mockDomainLinks: DomainLink[] = [
  {
    id: '1',
    url: 'https://pay.example.com/ios/service1',
    subject: '主体A',
    status: 'enabled',
    lastEditor: '张三',
    lastEditTime: '2025-04-15 10:30:00',
  },
  {
    id: '2',
    url: 'https://pay.example.com/ios/service2',
    subject: '主体B',
    status: 'disabled',
    lastEditor: '李四',
    lastEditTime: '2025-04-14 16:45:00',
  },
  {
    id: '3',
    url: 'https://pay.example.com/ios/service3',
    subject: '主体A',
    status: 'enabled',
    lastEditor: '王五',
    lastEditTime: '2025-04-13 09:20:00',
  },
  {
    id: '4',
    url: 'https://pay.example.com/ios/service4',
    subject: '主体C',
    status: 'enabled',
    lastEditor: '张三',
    lastEditTime: '2025-04-12 14:10:00',
  },
  {
    id: '5',
    url: 'https://pay.example.com/ios/service5',
    subject: '主体B',
    status: 'disabled',
    lastEditor: '李四',
    lastEditTime: '2025-04-11 11:30:00',
  },
];

// Mock 协议链接数据
export const mockProtocolLinks: DomainLink[] = [
  {
    id: '1',
    url: 'https://protocol.example.com/terms1',
    subject: '主体A',
    status: 'enabled',
    lastEditor: '张三',
    lastEditTime: '2025-04-15 10:30:00',
  },
  {
    id: '2',
    url: 'https://protocol.example.com/privacy2',
    subject: '主体B',
    status: 'enabled',
    lastEditor: '李四',
    lastEditTime: '2025-04-14 16:45:00',
  },
  {
    id: '3',
    url: 'https://protocol.example.com/agreement3',
    subject: '主体A',
    status: 'disabled',
    lastEditor: '王五',
    lastEditTime: '2025-04-13 09:20:00',
  },
];

// Mock 支付管理数据
export const mockPaymentManagements: PaymentManagement[] = [
  {
    id: '1',
    game: '王者荣耀',
    channel: 'App Store',
    paymentLink: 'https://pay.example.com/ios/service1',
    subject: '主体A',
    lastEditor: '张三',
    lastEditTime: '2025-04-15 10:30:00',
  },
  {
    id: '2',
    game: '和平精英',
    channel: 'App Store',
    paymentLink: 'https://pay.example.com/ios/service2',
    subject: '主体B',
    lastEditor: '李四',
    lastEditTime: '2025-04-14 16:45:00',
  },
  {
    id: '3',
    game: '王者荣耀',
    channel: 'TestFlight',
    paymentLink: 'https://pay.example.com/ios/service3',
    subject: '主体A',
    lastEditor: '王五',
    lastEditTime: '2025-04-13 09:20:00',
  },
];

// 选项数据
export const subjectOptions: Option[] = [
  { value: '主体A', label: '主体A' },
  { value: '主体B', label: '主体B' },
  { value: '主体C', label: '主体C' },
];

export const gameOptions: Option[] = [
  { value: '王者荣耀', label: '王者荣耀' },
  { value: '和平精英', label: '和平精英' },
  { value: '原神', label: '原神' },
];

export const channelOptions: Option[] = [
  { value: 'App Store', label: 'App Store' },
  { value: 'TestFlight', label: 'TestFlight' },
  { value: '企业签名', label: '企业签名' },
];

// 根据主体获取链接选项
export const linkOptionsBySubject: Record<string, Option[]> = {
  '主体A': [
    { value: 'https://pay.example.com/ios/service1', label: '链接1' },
    { value: 'https://pay.example.com/ios/service3', label: '链接3' },
  ],
  '主体B': [
    { value: 'https://pay.example.com/ios/service2', label: '链接2' },
    { value: 'https://pay.example.com/ios/service5', label: '链接5' },
  ],
  '主体C': [
    { value: 'https://pay.example.com/ios/service4', label: '链接4' },
  ],
};
