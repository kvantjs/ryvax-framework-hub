export type PackageManager = 'pnpm' | 'npm' | 'bun' | 'yarn';

export type BenchmarkMetric = 'coldStart' | 'ttfb' | 'bundleSize' | 'throughput';

export interface BenchmarkData {
  framework: string;
  isRyvax?: boolean;
  coldStart: number; // ms
  ttfb: number; // ms
  bundleSize: number; // kB
  throughput: number; // req/sec
  color: string;
}

export interface CodeExample {
  id: string;
  title: string;
  filename: string;
  badge: string;
  description: string;
  code: string;
  executionOutput: {
    type: 'server' | 'client' | 'edge';
    status: number;
    latency: string;
    payload: Record<string, unknown> | string;
    logs: string[];
  };
}

export interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  highlight: string;
  capabilities: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  iconName: string;
  latency: string;
  details: string[];
}

export interface EcosystemPackage {
  name: string;
  version: string;
  description: string;
  downloads: string;
  category: 'Core' | 'Edge' | 'Tooling' | 'Data';
  command: string;
}

export interface Maintainer {
  name: string;
  role: string;
  org: string;
  avatar: string;
  github: string;
  focus: string;
}

export interface ProjectTemplateConfig {
  template: 'saas' | 'minimal' | 'edge-api' | 'realtime';
  database: 'drizzle' | 'prisma' | 'kysely' | 'none';
  styling: 'tailwind' | 'css-modules' | 'vanilla';
  auth: 'ryvax-vault' | 'oauth' | 'none';
  typescript: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PersonaItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  quote?: string;
}

export interface ImpactMetricItem {
  id: string;
  label: string;
  info: string;
  value: string;
}

