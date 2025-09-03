export type Cpu = {
  systemLoad: number;
  processLoad: number;
  availableProcessors: number;
  cpuUsagePercent: number;
  userUsagePercent: number;
  systemUsagePercent: number;
  idlePercent: number;
  perCoreUsage: number[];
};

export type Disk = {
  name: string;
  mountPoint: string;
  filesystemType: string;
  totalSpace: number;
  usedSpace: number;
  freeSpace: number;
  usagePercent: number;
  readBytes: number;
  writeBytes: number;
  readCount: number;
  writeCount: number;
};

export type Memory = {
  totalMemory:number;
  availableMemory:number;
  usedMemory:number;
  usagePercent:number
};

export type Network = {
  interfaceName:string;
  macAddress:string;
  ipv4:string;
  ipv6:string;
  mtu:number;
  speed:number;
  bytesReceived:number;
  bytesSent:number;
  packetsReceived:number;
  packetsSent:number;
  inErros:number;
  outErrors:number;
};

export type Process = {
    pid:number;
    name:string;
    cpu:number;
    memory:number;
    threads:number;
    user:string;
    state:string;
    upTime:number;
};