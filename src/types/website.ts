export interface NewWebsite {
  url: string;
  name: string;
  checkInterval: number;
  monitorSSL: boolean;
  monitorDomain: boolean;
  alertThreshold: number;
}

export interface Website {
  id: number;
  url: string;
  status: 'up' | 'down';
  latency: number;
  sslExpiry: string;
  domainExpiry: string;
  uptimeData: { time: string; value: number }[];
} 