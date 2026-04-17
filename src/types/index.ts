// 域名链接
export interface DomainLink {
  id: string;
  url: string;
  subject: string;
  status: 'enabled' | 'disabled';
  lastEditor: string;
  lastEditTime: string;
}

// 支付链接管理
export interface PaymentManagement {
  id: string;
  game: string;
  channel: string;
  paymentLink: string;
  subject: string;
  lastEditor: string;
  lastEditTime: string;
}

// 选项类型
export interface Option {
  value: string;
  label: string;
}

// 查询参数
export interface DomainLinkQuery {
  subject?: string;
  status?: 'all' | 'enabled' | 'disabled';
}

export interface PaymentManagementQuery {
  game?: string;
  channel?: string;
  subject?: string;
}
