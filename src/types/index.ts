export interface WorkstationSession {
  id: string;
  user: string;
  department: string;
  activeDomain: string;
  activeTime: string;
  status: 'active' | 'idle' | 'flagged';
  dlpIncidents: number;
  os: string;
  ip: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  department: string;
  eventType: 'DLP_BLOCK' | 'URL_VISIT' | 'AUTH_SUCCESS' | 'CLIPBOARD_SHIELD' | 'POLICY_UPDATE';
  details: string;
  severity: 'low' | 'medium' | 'high';
}

export interface PolicyState {
  clipboardShield: boolean;
  watermarking: boolean;
  cloudStorageBlock: boolean;
  aiPromptInspection: boolean;
  airGapIntranetOnly: boolean;
  usbDownloadLock: boolean;
}

export interface BrochurePage {
  pageNumber: number;
  title: string;
  summary: string;
  keySpecs: string[];
}
