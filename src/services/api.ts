import type { DomainLink, PaymentManagement, DomainLinkQuery, PaymentManagementQuery } from '../types';
import {
  mockDomainLinks,
  mockProtocolLinks,
  mockPaymentManagements,
  subjectOptions,
  gameOptions,
  channelOptions,
  linkOptionsBySubject,
} from './mockData';

// 模拟延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 获取域名链接列表
export async function getDomainLinks(query?: DomainLinkQuery): Promise<DomainLink[]> {
  await delay(300);
  let data = [...mockDomainLinks];
  
  if (query?.subject) {
    data = data.filter((item) => item.subject === query.subject);
  }
  if (query?.status && query.status !== 'all') {
    data = data.filter((item) => item.status === query.status);
  }
  
  return data;
}

// 获取协议链接列表
export async function getProtocolLinks(query?: DomainLinkQuery): Promise<DomainLink[]> {
  await delay(300);
  let data = [...mockProtocolLinks];
  
  if (query?.subject) {
    data = data.filter((item) => item.subject === query.subject);
  }
  if (query?.status && query.status !== 'all') {
    data = data.filter((item) => item.status === query.status);
  }
  
  return data;
}

// 创建域名链接
export async function createDomainLink(data: Omit<DomainLink, 'id' | 'lastEditor' | 'lastEditTime'>): Promise<DomainLink> {
  await delay(300);
  const newLink: DomainLink = {
    ...data,
    id: Date.now().toString(),
    lastEditor: '管理员',
    lastEditTime: new Date().toLocaleString('zh-CN'),
  };
  mockDomainLinks.unshift(newLink);
  return newLink;
}

// 更新域名链接
export async function updateDomainLink(id: string, data: Partial<DomainLink>): Promise<DomainLink> {
  await delay(300);
  const index = mockDomainLinks.findIndex((item) => item.id === id);
  if (index === -1) throw new Error('链接不存在');
  
  mockDomainLinks[index] = {
    ...mockDomainLinks[index],
    ...data,
    lastEditor: '管理员',
    lastEditTime: new Date().toLocaleString('zh-CN'),
  };
  return mockDomainLinks[index];
}

// 创建协议链接
export async function createProtocolLink(data: Omit<DomainLink, 'id' | 'lastEditor' | 'lastEditTime'>): Promise<DomainLink> {
  await delay(300);
  const newLink: DomainLink = {
    ...data,
    id: Date.now().toString(),
    lastEditor: '管理员',
    lastEditTime: new Date().toLocaleString('zh-CN'),
  };
  mockProtocolLinks.unshift(newLink);
  return newLink;
}

// 更新协议链接
export async function updateProtocolLink(id: string, data: Partial<DomainLink>): Promise<DomainLink> {
  await delay(300);
  const index = mockProtocolLinks.findIndex((item) => item.id === id);
  if (index === -1) throw new Error('链接不存在');
  
  mockProtocolLinks[index] = {
    ...mockProtocolLinks[index],
    ...data,
    lastEditor: '管理员',
    lastEditTime: new Date().toLocaleString('zh-CN'),
  };
  return mockProtocolLinks[index];
}

// 获取支付管理列表
export async function getPaymentManagements(query?: PaymentManagementQuery): Promise<PaymentManagement[]> {
  await delay(300);
  let data = [...mockPaymentManagements];
  
  if (query?.game) {
    data = data.filter((item) => item.game === query.game);
  }
  if (query?.channel) {
    data = data.filter((item) => item.channel === query.channel);
  }
  if (query?.subject) {
    data = data.filter((item) => item.subject === query.subject);
  }
  
  return data;
}

// 更新支付管理
export async function updatePaymentManagement(id: string, data: Partial<PaymentManagement>): Promise<PaymentManagement> {
  await delay(300);
  const index = mockPaymentManagements.findIndex((item) => item.id === id);
  if (index === -1) throw new Error('记录不存在');
  
  mockPaymentManagements[index] = {
    ...mockPaymentManagements[index],
    ...data,
    lastEditor: '管理员',
    lastEditTime: new Date().toLocaleString('zh-CN'),
  };
  return mockPaymentManagements[index];
}

// 获取选项数据
export function getSubjectOptions() {
  return subjectOptions;
}

export function getGameOptions() {
  return gameOptions;
}

export function getChannelOptions() {
  return channelOptions;
}

export function getLinkOptionsBySubject(subject: string) {
  return linkOptionsBySubject[subject] || [];
}
