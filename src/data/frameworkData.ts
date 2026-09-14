import {
  BenchmarkData,
  BenchmarkMetric,
  CodeExample,
  FeatureItem,
  ArchitectureNode,
  EcosystemPackage,
  Maintainer
} from '../types';

export const FRAMEWORK_META = {
  version: 'v2.0.0',
  tagline: 'The full-stack framework with isomorphic signals and zero-overhead RPC runtime',
  organization: 'Kvant',
  githubStars: '2.4k',
  npmDownloads: '12k/mo',
  discordMembers: '4.8k',
  license: 'MIT',
  cliCommand: 'npm install @kvantjs/ryvax.js',
  githubUrl: 'https://github.com/kvantjs/ryvax.js',
  bundleSize: '2.1 kB',
  coldStartLatency: '< 18ms',
  medianTtfb: '7.8ms'
};

export const PLAYGROUND_SNIPPETS: Record<string, { title: string; code: string; latency: string }> = {
  counter: {
    title: 'Cancellable API',
    code: `import { ApiHandler } from '@kvantjs/ryvax.js';
import { db } from './db';

// Explicit cancellation via RequestContext AbortSignal
export const GET: ApiHandler = async ({ signal, request }) => {
  const users = await db.select().from('users').where({
    status: 'active'
  }).execute({ signal }); // Stops if client disconnects!

  return Response.json(users);
};`,
    latency: '0.4ms'
  },
  actions: {
    title: 'Durable Job',
    code: `import { JobQueue } from '@kvantjs/ryvax.js';

// Define background job with delay & idempotency keys
export const taskQueue = new JobQueue({
  name: 'ai-inference',
  async handler(job) {
    const { model, prompt } = job.payload;
    const result = await generate({ model, prompt });
    return result;
  }
});

// Dispatch with 15-second delay and retry tag
await taskQueue.dispatch({
  payload: { model: 'omni', prompt: 'Sync states' },
  delay: 15,
  idempotencyKey: 'tx_9481b'
});`,
    latency: '0.8ms'
  },
  'edge-routing': {
    title: 'Cache Boundary',
    code: `import { ResponseCache, DataCache } from '@kvantjs/ryvax.js';

// Process-local Response caching & private data caching
export const cache = new ResponseCache({
  ttl: 300, // 5 minutes
  scope: 'public', // request | public | private
  staleWhileRevalidate: 60
});

export const GET = cache.wrap(async () => {
  const metrics = await DataCache.get('global-telemetry', async () => {
    return fetchRemoteTelemetry();
  });
  return Response.json(metrics);
});`,
    latency: '1.2ms'
  },
  streaming: {
    title: 'Signed Session',
    code: `import { Session, ApiHandler } from '@kvantjs/ryvax.js';

// Secure cryptographic session with Ed25519 signature
export const POST: ApiHandler = async ({ request }) => {
  const session = await Session.fromRequest(request);
  
  if (!session.isValid()) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Parameterized SQL preventing SQL injection
  const data = await session.getUserData();
  return Response.json({ user: data });
};`,
    latency: '0.6ms'
  }
};

export const CODE_EXAMPLES: CodeExample[] = [
  {
    id: 'universal-action',
    title: 'Explicit Abort Propagation & Cancellation',
    filename: 'routes/api/users.ts',
    badge: 'Cancellable API Routes',
    description: 'Ryvax makes cancellation explicit through AbortSignal integration. Database drivers, model clients, storage operations, or EventStreams can automatically cease work if a client disconnects, saving vital cloud resources.',
    code: `import { ApiHandler } from '@kvantjs/ryvax.js';
import { db } from '@/server/db';

// Explicit cancellation via RequestContext AbortSignal
export const GET: ApiHandler = async ({ signal, request }) => {
  // Database calls, downstream APIs or streams halt immediately 
  // when a client disconnects or connection is closed.
  const users = await db.select().from('users').where({
    status: 'active'
  }).execute({ signal }); 

  return Response.json(users);
};`,
    executionOutput: {
      type: 'edge',
      status: 200,
      latency: '1.4ms',
      payload: {
        success: true,
        data: [
          { id: "usr_1", name: "Elena", role: "admin" },
          { id: "usr_2", name: "Marcus", role: "developer" }
        ],
        activeQueries: 0,
        abortedQueries: 0
      },
      logs: [
        '⚡ [ryvax:api] Incoming GET /api/users',
        '🔍 [ryvax:api] Found valid request context with signal',
        '💾 [ryvax:db] Select query executing with active AbortSignal',
        '✅ [ryvax:api] Response sent: 200 OK (24 active records)'
      ]
    }
  },
  {
    id: 'typed-rpc',
    title: 'Durable Job Queue and Background Tasks',
    filename: 'jobs/cleanup.ts',
    badge: 'JobQueue Contract',
    description: 'The JobQueue contract handles delayed execution, concurrency, idempotency keys, tags, retry metadata, and bounded shutdown hooks to address common failure modes in background tasks.',
    code: `import { JobQueue } from '@kvantjs/ryvax.js';
import { db } from '@/server/db';

export const cleanupQueue = new JobQueue({
  name: 'db-cleanup',
  concurrency: 5,
  async handler(job) {
    const { olderThanDays, targetTable } = job.payload;
    
    // Explicit AbortSignal is also passed to background jobs
    await db.deleteFrom(targetTable)
      .where('createdAt', '<', olderThanDays)
      .execute({ signal: job.signal });
  }
});

// Dispatch background task with delay & idempotency
await cleanupQueue.dispatch({
  payload: { olderThanDays: 30, targetTable: 'sessions' },
  delay: 60, // Run in 60 seconds
  idempotencyKey: 'cleanup_sessions_today'
});`,
    executionOutput: {
      type: 'server',
      status: 200,
      latency: '0.9ms',
      payload: {
        jobId: "job_94c1a",
        queue: "db-cleanup",
        status: "queued",
        delaySeconds: 60,
        idempotencyKey: "cleanup_sessions_today"
      },
      logs: [
        '📦 [ryvax:jobs] Enqueued job "db-cleanup" with delay 60s',
        '🕒 [ryvax:jobs] Job is now active: executing cleanup',
        '💾 [ryvax:db] Executed delete query on "sessions" successfully',
        '✅ [ryvax:jobs] Marked job "cleanup_sessions_today" as completed'
      ]
    }
  },
  {
    id: 'reactive-vault',
    title: 'Cache Boundaries & Invalidation Strategy',
    filename: 'server/cache.ts',
    badge: 'ResponseCache & DataCache',
    description: 'Ryvax separates process-local response caching from application data caching. Define explicit cache scopes (request, public, private) to ensure cache correctness and prevent accidental sharing of private data.',
    code: `import { ResponseCache, DataCache } from '@kvantjs/ryvax.js';
import { fetchSalesData } from '@/server/analytics';

// Define process-local Response cache boundaries
export const apiCache = new ResponseCache({
  ttl: 60, // cache for 60 seconds
  scope: 'public', // public response caching
  staleWhileRevalidate: 30
});

export const GET = apiCache.wrap(async ({ request }) => {
  // Use application-wide DataCache for custom data models
  const sales = await DataCache.get('quarterly-sales', async () => {
    return await fetchSalesData();
  }, { ttl: 600 }); // 10 minutes

  return Response.json(sales);
});`,
    executionOutput: {
      type: 'client',
      status: 200,
      latency: '0.4ms (Cache Hit)',
      payload: {
        source: "response_cache",
        ttlRemaining: "42s",
        stale: false,
        swrActive: true
      },
      logs: [
        '⚡ [ryvax:cache] GET /api/analytics - Response Cache HIT',
        '📦 [ryvax:cache] Scope: public, fresh for another 42s',
        '✅ [ryvax:cache] Returned pre-rendered response (TTFB: 0.2ms)'
      ]
    }
  },
  {
    id: 'edge-streaming',
    title: 'Streaming & Bounded API Behavior',
    filename: 'routes/stream/events.ts',
    badge: 'Streaming API Routes',
    description: 'Support for high-frequency streaming protocols and chunk-by-chunk HTTP responses using standard AsyncIterable<Uint8Array>. Full handling of HTTP methods like OPTIONS, HEAD, and bounded request bodies.',
    code: `import { ApiHandler } from '@kvantjs/ryvax.js';

export const GET: ApiHandler = async ({ signal }) => {
  const encoder = new TextEncoder();
  
  // Custom streaming protocol using standard AsyncIterable<Uint8Array>
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        if (signal.aborted) {
          console.log('[Stream] Client disconnected, halting events!');
          break;
        }
        
        controller.enqueue(encoder.encode(\`event: message\\ndata: chunk \${i}\\n\\n\`));
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      controller.close();
    }
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' }
  });
};`,
    executionOutput: {
      type: 'edge',
      status: 206,
      latency: '0.8ms TTFB',
      payload: {
        streaming: true,
        protocol: "SSE (Server-Sent Events)",
        chunksSent: 10,
        abortedOnClientExit: true
      },
      logs: [
        '⚡ [ryvax:stream] Flushed Event Stream headers',
        '🌊 [ryvax:stream] Pushed chunk #1 to HTTP stream',
        '🌊 [ryvax:stream] Pushed chunk #2 to HTTP stream',
        '🚨 [ryvax:stream] Abort propagation detected: client connection closed'
      ]
    }
  }
];

export const BENCHMARK_METRICS: Record<BenchmarkMetric, { title: string; unit: string; description: string; better: 'lower' | 'higher' }> = {
  coldStart: {
    title: 'Cold Start Latency',
    unit: 'ms',
    description: 'Time from invocation trigger to execution readiness on Serverless containers.',
    better: 'lower'
  },
  ttfb: {
    title: 'Time to First Byte (TTFB)',
    unit: 'ms',
    description: 'Median latency to stream initial HTML headers and static shell to browser.',
    better: 'lower'
  },
  bundleSize: {
    title: 'Baseline Client JS Overhead',
    unit: 'kB',
    description: 'Total JavaScript shipped to client for hydration on standard baseline apps.',
    better: 'lower'
  },
  throughput: {
    title: 'Throughput (Edge QPS)',
    unit: 'k req/s',
    description: 'Maximum queries per second under sustained load on equivalent compute tier.',
    better: 'higher'
  }
};

export const BENCHMARKS: BenchmarkData[] = [
  {
    framework: 'Ryvax.js 2.0.0',
    isRyvax: true,
    coldStart: 18,
    ttfb: 7.8,
    bundleSize: 2.1,
    throughput: 114,
    color: '#ffffff'
  },
  {
    framework: 'SvelteKit 2',
    isRyvax: false,
    coldStart: 118,
    ttfb: 18.4,
    bundleSize: 18.2,
    throughput: 78,
    color: '#a3a3a3'
  },
  {
    framework: 'Remix 2',
    isRyvax: false,
    coldStart: 165,
    ttfb: 26.2,
    bundleSize: 44.8,
    throughput: 62,
    color: '#737373'
  },
  {
    framework: 'Next.js 15 (App Router)',
    isRyvax: false,
    coldStart: 285,
    ttfb: 38.5,
    bundleSize: 84.6,
    throughput: 44,
    color: '#525252'
  }
];

export const FEATURES: FeatureItem[] = [
  {
    id: 'universal-signals',
    title: 'Cancellable Request Pipeline',
    tagline: 'Explicit abort propagation via RequestContext.signal',
    description: 'Every database query, model call, or event stream halts immediately when a client disconnects, preventing wasted resources on abandoned requests.',
    iconName: 'Zap',
    highlight: 'Automatic Abort Signal',
    capabilities: ['Cancellable DB integrations', 'Abort propagation to model clients', 'Event-stream client disconnect tracking']
  },
  {
    id: 'zero-overhead-rpc',
    title: 'Durable Background Job Queue',
    tagline: 'The JobQueue contract handles delays and retries',
    description: 'Built-in support for job concurrency, idempotency keys, retry metadata, tags, and bounded shutdown hooks to easily handle background automation.',
    iconName: 'Cpu',
    highlight: 'Durable Execution',
    capabilities: ['Idempotency keys built-in', 'Custom concurrency limitations', 'Secure bounded shutdown hooks']
  },
  {
    id: 'edge-runtime',
    title: 'Multi-Cloud Portability & Adapters',
    tagline: 'Write once, deploy anywhere with clean contracts',
    description: 'Portability via small, testable contracts for databases, caches, and storage. Built-in deployment adapters for Node, Docker, Cloudflare, Vercel, Netlify, and Cloud Run.',
    iconName: 'Globe',
    highlight: '100% Provider-Neutral',
    capabilities: ['Node.js & Docker deployment', 'Cloudflare Workers adapter', 'Cloud Run & serverless optimization']
  },
  {
    id: 'state-fabric',
    title: 'Cache Boundary Architecture',
    tagline: 'Separate process-local response caching from app data',
    description: 'Define explicit cache scopes (request, public, private) with TTL, stale-while-revalidate, and tag invalidation to ensure cache correctness.',
    iconName: 'Layers',
    highlight: 'ResponseCache & DataCache',
    capabilities: ['Stale-While-Revalidate caching', 'Request, Public, Private scopes', 'Distributed tag invalidation']
  },
  {
    id: 'streaming-islands',
    title: 'Robust Core Guardrails',
    tagline: 'Built-in security, signed sessions, and rate-limiting',
    description: 'Protected route boundaries prevent data leaks by construction. Cryptographic signed sessions, automatic CSRF verification, and rate limiting buckets.',
    iconName: 'Flame',
    highlight: 'Secure By Construction',
    capabilities: ['Ed25519 cryptographic signatures', 'Signed HttpOnly session cookies', 'Automatic CSRF verification']
  },
  {
    id: 'secure-vault',
    title: 'Zero-Overhead Server Rendering',
    tagline: 'Flexible SSR, SSG, and API handler routing',
    description: 'Achieve blazing fast load times and TTFB < 8ms with built-in server-side rendering, static site generation, and optimized JSON API handlers.',
    iconName: 'ShieldCheck',
    highlight: 'Under 18ms Cold Starts',
    capabilities: ['Streamed chunk-by-chunk SSR', 'Optimized SSG pipelines', 'High-throughput API routing']
  }
];

export const ARCHITECTURE_FLOW: ArchitectureNode[] = [
  {
    id: 'client-layer',
    label: 'Client Browser Link',
    sublabel: 'Standard Fetch & SSE',
    description: 'Modern standard-compliant browser queries communicating through standard HTTP methods and Event-Stream connections.',
    iconName: 'Monitor',
    latency: '0.2ms',
    details: ['Browser AbortController propagation', 'EventStream connection lifecycle', 'Optimistic UI update states']
  },
  {
    id: 'edge-gateway',
    label: 'Ryvax Router Engine',
    sublabel: 'WinterCG HTTP Core',
    description: 'Ultra-fast API and page router matching dynamic routes, validating incoming HTTP methods, and dispatching RequestContext.',
    iconName: 'Network',
    latency: '1.1ms',
    details: ['BGP Geo-steering routing', 'Parameterized route matching', 'Request timeout & deadline enforcement']
  },
  {
    id: 'shield-auth',
    label: 'Authentication Shield',
    sublabel: 'Signed Session Vault',
    description: 'Cryptographic security layer checking Ed25519 session signatures, enforcing rate-limiting buckets, and verifying CSRF tokens.',
    iconName: 'Shield',
    latency: '0.4ms',
    details: ['Ed25519 cookie signature verification', 'Token bucket rate-limiter check', 'Auto-generated CSRF token validation']
  },
  {
    id: 'reactive-store',
    label: 'Cache Management Layer',
    sublabel: 'ResponseCache & DataCache',
    description: 'Resolves process-local response caching boundaries or queries distributed DataCache pools before invoking handlers.',
    iconName: 'Boxes',
    latency: '0.8ms',
    details: ['Response cache TTL validation', 'Stale-While-Revalidate thread spawning', 'Data cache tag invalidation checks']
  },
  {
    id: 'persistence',
    label: 'Explicit DB & Job Contracts',
    sublabel: 'Abort Propagation Database Pool',
    description: 'Executes parameterized SQL statements, or dispatches background tasks via JobQueue contracts with full abort propagation.',
    iconName: 'Database',
    latency: '2.4ms',
    details: ['Database driver abort propagation', 'JobQueue delay & idempotency check', 'Zero-overhead pooling handlers']
  }
];

export const ECOSYSTEM_PACKAGES: EcosystemPackage[] = [
  {
    name: '@kvantjs/ryvax.js',
    version: 'v2.0.0',
    description: 'Core runtime engine, signal state primitives, universal JSX compiler, and SSR streaming pipelines.',
    downloads: '12,000/mo',
    category: 'Core',
    command: 'npm install @kvantjs/ryvax.js'
  }
];

export const MAINTAINERS: Maintainer[] = [
  {
    name: 'Kvant',
    role: 'Lead Organization & Core Developer',
    org: 'Kvant Org',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    github: 'kvantjs',
    focus: 'Core contracts, explicit portability, and AbortSignal propagation'
  }
];

export const FOUNDATION_PRINCIPLES = [
  {
    title: 'Explicit Contracts Over Magic',
    description: 'Every production concern—be it database connection, caching, queueing, or storage—is modeled via explicit, testable, and provider-neutral contracts.'
  },
  {
    title: '100% Vendor Neutrality',
    description: 'We do not tie runtime execution to any proprietary cloud platform. Ryvax is committed to standard WinterCG specifications and portability across any Node or containerized setup.'
  },
  {
    title: 'Zero-Overhead Philosophy',
    description: 'No unnecessary abstraction layers. Everything in Ryvax.js is built to solve actual production problems with minimal runtime footprint and predictable behavior.'
  },
  {
    title: 'Explicit Abort Propagation',
    description: 'Resources are expensive. Our RequestContext.signal integration guarantees that no database transaction, AI inference, or stream runs a microsecond longer than the client connection is open.'
  }
];

export const COMMUNITY_STATS = {
  activeContributors: '45+',
  mergedPullRequests: '240',
  rfcsApproved: '12',
  productionDeployments: '2,500+'
};

export const IMPACT_METRICS = [
  {
    id: 'bundle',
    label: 'Resource cancellation efficiency',
    info: 'Comparing standard node endpoints vs Ryvax cancellable API routes under client-abort heavy traffic loads.',
    value: '100%'
  },
  {
    id: 'latency',
    label: 'Cold-start latency on modern serverless containers',
    info: 'Optimized minimal runtime with explicit dependency bindings results in sub-20ms container warm-ups.',
    value: '< 18ms'
  },
  {
    id: 'savings',
    label: 'Reduction in wasted compute and DB IOPS',
    info: 'Averaged savings achieved through explicit caching boundaries and client abort propagation.',
    value: '42%'
  },
  {
    id: 'coldstart',
    label: 'Median response time on standard edge routes',
    info: 'Zero overhead request-handling pipeline with built-in process-local response caching.',
    value: '7.8ms'
  }
];

export const PERSONAS = [
  {
    id: 'frontend',
    tag: 'Explicit safety for',
    title: 'Full-Stack Developers',
    description: 'Say goodbye to un-cancellable database waterfalls and hidden background process memory leaks. Use explicit, type-safe API handlers and background job queues.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    quote: 'Being able to pass AbortSignal straight down to my database client on every request is a game changer for database server load.'
  },
  {
    id: 'architects',
    tag: 'Architectural control for',
    title: 'Systems & Platform Leads',
    description: 'Enforce deterministic memory bounds, predictable caching, and true vendor-neutral portability across Node, Docker, Cloudflare, and serverless runtimes.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    quote: 'Our database connection pool is no longer exhausted during network hiccups because of automatic request cancellation.'
  },
  {
    id: 'founders',
    tag: 'Infrastructure efficiency for',
    title: 'Founders and CTOs',
    description: 'Deploy highly reliable services without being locked into a proprietary cloud, keeping your compute and data bills perfectly optimized.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    quote: 'Our database query billing and container memory consumption dropped significantly after migrating to Ryvax.js.'
  }
];

export const FAQS = [
  {
    id: 'faq-1',
    question: 'How does Ryvax.js handle request cancellation?',
    answer: 'Ryvax.js makes cancellation explicit through RequestContext.signal. Every request handler receives an AbortSignal that automatically aborts when the client disconnects, when a request times out, or when the response closes prematurely. This signal can be passed downstream to database drivers (like pg, mysql2, prisma, drizzle) or model clients to halt executions instantly.'
  },
  {
    id: 'faq-2',
    question: 'What is the "JobQueue Contract"?',
    answer: 'The JobQueue contract is a built-in abstract contract in @kvantjs/ryvax.js to handle background tasks reliably. It includes native support for concurrency limits, delay offsets, idempotency checks (to prevent double execution), retry metadata, tags, and bounded shutdown hooks so background jobs can safely finish when containers restart.'
  },
  {
    id: 'faq-3',
    question: 'Where can I deploy Ryvax.js applications?',
    answer: 'Ryvax.js is 100% provider-neutral. It runs natively anywhere Node.js or Docker is supported, and includes out-of-the-box adapters for serverless environments (like AWS Lambda, Google Cloud Run) and edge platforms (like Cloudflare Workers, Vercel Edge, Netlify).'
  },
  {
    id: 'faq-4',
    question: 'What are ResponseCache and DataCache?',
    answer: 'Ryvax.js separates caching concerns into two explicit contracts: ResponseCache is used for caching HTTP responses (with scopes like public, private, and request, and support for stale-while-revalidate), while DataCache is used for caching custom data structures in memory or Redis pools. This prevents accidental leak of private user data to shared caches.'
  },
  {
    id: 'faq-5',
    question: 'Is @kvantjs/ryvax.js open source?',
    answer: 'Yes! Ryvax.js is developed by Kvant under the MIT license. The source code is open and hosted publicly on GitHub at https://github.com/kvantjs/ryvax.js.'
  },
  {
    id: 'faq-6',
    question: 'What capabilities have been automated and tested in Ryvax.js 2.0.0?',
    answer: 'Ryvax.js 2.0.0 includes full test coverage and automated gates for cryptographic signed sessions, CSRF verification, parameterized SQL drivers, rate-limiting bucket pools, static/dynamic routing, response streaming, and body validators.'
  }
];

export const ENTERPRISE_SECURITY = [
  {
    title: 'Ed25519 Session Signatures',
    description: 'Cryptographically signed session cookies validated natively at the edge without database lookups.'
  },
  {
    title: 'CSRF Protection',
    description: 'Automatic validation of CSRF headers and token rotation built-in to all mutation handlers.'
  },
  {
    title: 'Parameterized SQL Safety',
    description: 'Guaranteed prevention of SQL injection vectors by design through explicit driver contracts.'
  },
  {
    title: 'Rate-Limiting Bucket Pools',
    description: 'Protect routes against brute force attacks and resource starvation via configurable token buckets.'
  }
];
