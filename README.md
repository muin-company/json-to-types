# JSON to Types

Convert JSON to TypeScript, Zod, Python types instantly. No build step, no dependencies.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/muinmomin/json-to-types.svg?style=social)](https://github.com/muinmomin/json-to-types)

Live at: [jsontotypes.dev](#) (if deployed)

## What is this?

Paste JSON, get TypeScript interfaces, Zod schemas, or Python types. That's it.

## Why use this?

**Before:**
```typescript
// API returns this JSON:
{
  "user": {
    "id": 123,
    "profile": {
      "name": "John",
      "tags": ["dev", "ai"]
    }
  }
}

// You manually write:
interface User {
  id: number;
  profile: {
    name: string;
    tags: string[];
  }
}

// Wait, is profile required?
// Are tags always strings?
// What about nested objects?
// ...10 minutes later, still typing
```

**After:**
```
1. Paste JSON
2. Click "TypeScript Interface"
3. Copy generated types
4. Done in 5 seconds
```

**Real pain points:**
- API returns huge JSON objects
- Writing types manually is tedious
- Easy to miss nested fields
- Hard to infer optional vs required
- Different projects need different formats (TS, Zod, Python)
- Copy-pasting JSON and manually converting = waste of time

This tool does one thing well: turn JSON into types, instantly.

## Features

- **Multiple output formats**
  - TypeScript Interface
  - TypeScript Type
  - Zod Schema
  - Python TypedDict
  - Python Pydantic

- **Smart type inference**
  - Nested objects (unlimited depth)
  - Arrays with proper element typing
  - Optional fields (detects null values)
  - Mixed types (union types)
  - Number vs string detection
  - **NEW:** Enum detection (repeated string values → union types)
  - **NEW:** Date detection (ISO 8601 strings → Date type)

- **Clipboard integration**
  - One-click paste from clipboard button
  - Auto-detect JSON in clipboard on page load
  - Keyboard shortcut: Ctrl/Cmd+Shift+V
  - Smart notification when JSON is detected

- **Developer experience**
  - Live preview as you type
  - JSON validation with clear error messages
  - One-click copy to clipboard
  - Built-in examples for common patterns
  - Mobile responsive
  - Works offline (single file)

## Usage

**Online:** Visit [jsontotypes.dev](#) (or your deployed URL)

**Local:**
```bash
git clone https://github.com/muinmomin/json-to-types.git
cd json-to-types
open index.html
```

That's it. No `npm install`, no build process. Just open the file.

### Quick Start with Clipboard

1. **Copy JSON** from anywhere (API response, docs, etc.)
2. **Open the tool** - It auto-detects JSON in your clipboard!
3. **Click "Paste from Clipboard"** or press `Ctrl/Cmd+Shift+V`
4. **Select format** - TypeScript, Zod, Python, etc.
5. **Copy generated types** - Click the copy button

**Pro tip:** The tool shows a notification if it detects JSON in your clipboard when you load the page.

## Examples

### Example 1: Basic API Response Typing

**Scenario:** You get a response from `/api/user` and need types fast.

**Input:**
```json
{
  "name": "John",
  "age": 30,
  "tags": ["dev", "ai"]
}
```

**TypeScript Interface:**
```typescript
interface Root {
  name: string;
  age: number;
  tags: string[];
}
```

**Zod Schema (with validation):**
```typescript
import { z } from 'zod';

const rootSchema = z.object({
  name: z.string(),
  age: z.number(),
  tags: z.array(z.string()),
});

type Root = z.infer<typeof rootSchema>;

// Use for runtime validation:
const user = rootSchema.parse(apiResponse);
```

---

### Example 2: Complex Nested E-commerce API

**Scenario:** Product catalog API with deep nesting, multiple arrays, mixed types.

**Input:**
```json
{
  "user": {
    "id": 123,
    "profile": {
      "bio": "Developer",
      "avatar": "https://example.com/avatar.jpg",
      "verified": true
    }
  },
  "cart": {
    "items": [
      {
        "productId": 456,
        "name": "Laptop",
        "price": 1299.99,
        "quantity": 1,
        "variants": ["16GB RAM", "512GB SSD"]
      }
    ],
    "totalPrice": 1299.99,
    "coupon": null
  }
}
```

**TypeScript Interface:**
```typescript
interface Root {
  user: User;
  cart: Cart;
}

interface User {
  id: number;
  profile: Profile;
}

interface Profile {
  bio: string;
  avatar: string;
  verified: boolean;
}

interface Cart {
  items: Item[];
  totalPrice: number;
  coupon: null | string;  // Optional coupon code
}

interface Item {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  variants: string[];
}
```

**Python Pydantic (for FastAPI backend):**
```python
from pydantic import BaseModel
from typing import List, Optional

class Profile(BaseModel):
    bio: str
    avatar: str
    verified: bool

class User(BaseModel):
    id: int
    profile: Profile

class Item(BaseModel):
    productId: int
    name: str
    price: float
    quantity: int
    variants: List[str]

class Cart(BaseModel):
    items: List[Item]
    totalPrice: float
    coupon: Optional[str] = None

class Root(BaseModel):
    user: User
    cart: Cart
```

---

### Example 3: Paginated API Response

**Scenario:** Standard REST pagination pattern. Your backend returns this, you need frontend types.

**Input:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "title": "Hello World",
        "createdAt": "2025-02-06T14:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "perPage": 20,
      "total": 100,
      "hasNext": true
    }
  },
  "error": null
}
```

**TypeScript Interface:**
```typescript
interface ApiResponse {
  success: boolean;
  data: Data;
  error: null | string;
}

interface Data {
  items: Item[];
  pagination: Pagination;
}

interface Item {
  id: number;
  title: string;
  createdAt: string;  // ISO date string
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  hasNext: boolean;
}
```

---

### Example 4: Union Types & Mixed Arrays

**Scenario:** Handling different event types in an activity feed.

**Input:**
```json
{
  "events": [
    {
      "type": "comment",
      "userId": 123,
      "text": "Great post!"
    },
    {
      "type": "like",
      "userId": 456,
      "count": 5
    },
    {
      "type": "share",
      "userId": 789,
      "platform": "twitter"
    }
  ]
}
```

**TypeScript Type (captures mixed array):**
```typescript
type Root = {
  events: Event[];
}

type Event = {
  type: string;
  userId: number;
  text?: string;      // Only in comments
  count?: number;     // Only in likes
  platform?: string;  // Only in shares
}

// Better: Use discriminated unions
type CommentEvent = {
  type: 'comment';
  userId: number;
  text: string;
}

type LikeEvent = {
  type: 'like';
  userId: number;
  count: number;
}

type ShareEvent = {
  type: 'share';
  userId: number;
  platform: string;
}

type Event = CommentEvent | LikeEvent | ShareEvent;
```

---

### Example 5: Edge Case - Empty Arrays & Null Values

**Scenario:** Incomplete API response, need to handle missing/null data.

**Input:**
```json
{
  "id": 1,
  "name": "John",
  "email": null,
  "tags": [],
  "metadata": {
    "lastLogin": null,
    "settings": {}
  }
}
```

**Zod Schema (with proper null handling):**
```typescript
import { z } from 'zod';

const rootSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().nullable(),
  tags: z.array(z.string()),  // Empty array still typed
  metadata: z.object({
    lastLogin: z.string().nullable(),
    settings: z.record(z.unknown()),  // Empty object
  }),
});

type Root = z.infer<typeof rootSchema>;

// Handles edge cases gracefully:
// ✓ null email doesn't break validation
// ✓ Empty tags array is valid
// ✓ Empty settings object works
```

---

### Example 6: Real-World GitHub API Response

**Scenario:** You're building a GitHub client and need to type their API responses.

**Input (from `/repos/:owner/:repo`):**
```json
{
  "id": 123456789,
  "name": "my-repo",
  "full_name": "owner/my-repo",
  "private": false,
  "owner": {
    "login": "owner",
    "id": 1234,
    "avatar_url": "https://github.com/avatar.jpg"
  },
  "description": "My awesome project",
  "stargazers_count": 42,
  "forks_count": 7,
  "open_issues_count": 3,
  "license": {
    "key": "mit",
    "name": "MIT License"
  }
}
```

**Python TypedDict (for data science / scraping):**
```python
from typing import TypedDict, Optional

class Owner(TypedDict):
    login: str
    id: int
    avatar_url: str

class License(TypedDict):
    key: str
    name: str

class GitHubRepo(TypedDict):
    id: int
    name: str
    full_name: str
    private: bool
    owner: Owner
    description: Optional[str]
    stargazers_count: int
    forks_count: int
    open_issues_count: int
    license: License

# Use in your scraper:
repos: list[GitHubRepo] = fetch_repos()
```

---

### Example 7: Smart Enum & Date Detection (NEW!)

**Scenario:** The tool automatically detects repeated string values (enums) and ISO date strings.

**Input:**
```json
{
  "user": {
    "id": 123,
    "name": "John",
    "createdAt": "2025-02-06T10:30:00Z",
    "updatedAt": "2025-02-06T14:30:00.123Z"
  },
  "statuses": ["active", "pending", "active", "completed", "active", "pending"],
  "priority": ["high", "low", "medium", "high", "low"]
}
```

**TypeScript Interface (with smart detection):**
```typescript
interface Root {
  user: User;
  statuses: ('active' | 'pending' | 'completed')[]; // Auto-detected enum!
  priority: ('high' | 'low' | 'medium')[];          // Auto-detected enum!
}

interface User {
  id: number;
  name: string;
  createdAt: Date; // ISO 8601 string
  updatedAt: Date; // ISO 8601 string
}
```

**Zod Schema (with validation):**
```typescript
import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string().datetime(),  // ISO 8601 validation
  updatedAt: z.string().datetime(),
});

const rootSchema = z.object({
  user: userSchema,
  statuses: z.array(z.enum(['active', 'pending', 'completed'])), // Enum validation!
  priority: z.array(z.enum(['high', 'low', 'medium'])),
});

type Root = z.infer<typeof rootSchema>;
```

**Python Pydantic:**
```python
from pydantic import BaseModel
from typing import List, Literal
from datetime import datetime

class User(BaseModel):
    id: int
    name: str
    createdAt: datetime  # Auto-parsed from ISO string
    updatedAt: datetime

class Root(BaseModel):
    user: User
    statuses: List[Literal['active', 'pending', 'completed']]  # Type-safe enum!
    priority: List[Literal['high', 'low', 'medium']]
```

**How it works:**
- **Enum detection:** If an array has repeated string values from a small set (≤10 unique values), it's treated as an enum
- **Date detection:** Strings matching ISO 8601 format (`YYYY-MM-DDTHH:mm:ss.sssZ`) are typed as `Date`/`datetime`
- **Benefits:** More precise types, better validation, catches errors at compile time

---

### Example 8: GraphQL API Response with Nullable Fields

**Scenario:** GraphQL returns lots of nullable fields. You need TypeScript types that handle partial data correctly.

**Input:**
```json
{
  "data": {
    "user": {
      "id": "123",
      "username": "john_doe",
      "email": "john@example.com",
      "profile": {
        "bio": null,
        "avatar": "https://cdn.example.com/avatars/123.jpg",
        "website": null,
        "location": "San Francisco, CA"
      },
      "stats": {
        "followers": 1523,
        "following": 342,
        "posts": 89
      }
    }
  },
  "errors": null
}
```

**TypeScript Interface (with proper nullability):**
```typescript
interface GraphQLResponse {
  data: Data;
  errors: null | Error[];
}

interface Data {
  user: User;
}

interface User {
  id: string;
  username: string;
  email: string;
  profile: Profile;
  stats: Stats;
}

interface Profile {
  bio: string | null;       // Explicitly nullable
  avatar: string;
  website: string | null;   // Explicitly nullable
  location: string;
}

interface Stats {
  followers: number;
  following: number;
  posts: number;
}

// Type guard for safe access:
function hasProfile(user: User): user is User & { profile: { bio: string } } {
  return user.profile.bio !== null;
}
```

**Zod Schema (runtime validation with nulls):**
```typescript
import { z } from 'zod';

const statsSchema = z.object({
  followers: z.number(),
  following: z.number(),
  posts: z.number(),
});

const profileSchema = z.object({
  bio: z.string().nullable(),
  avatar: z.string().url(),
  website: z.string().url().nullable(),
  location: z.string(),
});

const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  profile: profileSchema,
  stats: statsSchema,
});

const graphQLResponseSchema = z.object({
  data: z.object({
    user: userSchema,
  }),
  errors: z.array(z.unknown()).nullable(),
});

type GraphQLResponse = z.infer<typeof graphQLResponseSchema>;

// Usage:
const response = graphQLResponseSchema.parse(apiResponse);
// TypeScript knows response.data.user.profile.bio might be null
```

---

### Example 9: Config File with Deeply Nested Optional Values

**Scenario:** Application config JSON with many optional features. Need types that reflect the true structure.

**Input:**
```json
{
  "app": {
    "name": "MyApp",
    "version": "2.1.0",
    "port": 3000,
    "environment": "production"
  },
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "myapp_db",
    "ssl": true,
    "pool": {
      "min": 2,
      "max": 10,
      "idleTimeout": 30000
    }
  },
  "features": {
    "authentication": {
      "enabled": true,
      "providers": ["google", "github"],
      "sessionTimeout": 86400
    },
    "analytics": {
      "enabled": false,
      "provider": null,
      "trackingId": null
    },
    "cache": {
      "enabled": true,
      "type": "redis",
      "ttl": 3600,
      "redis": {
        "host": "localhost",
        "port": 6379
      }
    }
  }
}
```

**TypeScript Type (for config validation):**
```typescript
type Config = {
  app: AppConfig;
  database: DatabaseConfig;
  features: Features;
}

type AppConfig = {
  name: string;
  version: string;
  port: number;
  environment: 'development' | 'staging' | 'production';
}

type DatabaseConfig = {
  host: string;
  port: number;
  name: string;
  ssl: boolean;
  pool: PoolConfig;
}

type PoolConfig = {
  min: number;
  max: number;
  idleTimeout: number;
}

type Features = {
  authentication: AuthConfig;
  analytics: AnalyticsConfig;
  cache: CacheConfig;
}

type AuthConfig = {
  enabled: boolean;
  providers: Array<'google' | 'github' | 'facebook'>;
  sessionTimeout: number;
}

type AnalyticsConfig = {
  enabled: boolean;
  provider: string | null;
  trackingId: string | null;
}

type CacheConfig = {
  enabled: boolean;
  type: 'redis' | 'memcached' | 'memory';
  ttl: number;
  redis?: RedisConfig;  // Optional, only if type === 'redis'
}

type RedisConfig = {
  host: string;
  port: number;
}
```

**Python Pydantic (for backend config loading):**
```python
from pydantic import BaseModel, Field
from typing import Optional, Literal, List

class PoolConfig(BaseModel):
    min: int = Field(ge=1)
    max: int = Field(ge=1)
    idleTimeout: int = Field(ge=0, alias='idleTimeout')

class DatabaseConfig(BaseModel):
    host: str
    port: int = Field(ge=1, le=65535)
    name: str
    ssl: bool
    pool: PoolConfig

class AppConfig(BaseModel):
    name: str
    version: str
    port: int = Field(ge=1, le=65535)
    environment: Literal['development', 'staging', 'production']

class AuthConfig(BaseModel):
    enabled: bool
    providers: List[Literal['google', 'github', 'facebook']]
    sessionTimeout: int = Field(ge=0, alias='sessionTimeout')

class AnalyticsConfig(BaseModel):
    enabled: bool
    provider: Optional[str]
    trackingId: Optional[str] = Field(alias='trackingId')

class RedisConfig(BaseModel):
    host: str
    port: int = Field(ge=1, le=65535)

class CacheConfig(BaseModel):
    enabled: bool
    type: Literal['redis', 'memcached', 'memory']
    ttl: int = Field(ge=0)
    redis: Optional[RedisConfig]

class Features(BaseModel):
    authentication: AuthConfig
    analytics: AnalyticsConfig
    cache: CacheConfig

class Config(BaseModel):
    app: AppConfig
    database: DatabaseConfig
    features: Features

# Usage:
import json
with open('config.json') as f:
    config = Config(**json.load(f))
# Pydantic validates all types and constraints!
```

---

### Example 10: Webhook Payload with Discriminated Unions

**Scenario:** Webhook receives different event types. Need to type them properly so TypeScript can narrow the type.

**Input (multiple event types):**
```json
[
  {
    "event": "user.created",
    "timestamp": "2025-02-06T10:30:00Z",
    "data": {
      "userId": 123,
      "email": "new@example.com",
      "plan": "free"
    }
  },
  {
    "event": "payment.succeeded",
    "timestamp": "2025-02-06T10:35:00Z",
    "data": {
      "paymentId": "pi_abc123",
      "amount": 1999,
      "currency": "usd",
      "customerId": 456
    }
  },
  {
    "event": "subscription.cancelled",
    "timestamp": "2025-02-06T10:40:00Z",
    "data": {
      "subscriptionId": "sub_xyz789",
      "cancelledAt": "2025-02-06T10:40:00Z",
      "reason": "customer_request"
    }
  }
]
```

**TypeScript Type (discriminated union):**
```typescript
// Base event type
type BaseEvent = {
  event: string;
  timestamp: string;
}

// Specific event types
type UserCreatedEvent = BaseEvent & {
  event: 'user.created';
  data: {
    userId: number;
    email: string;
    plan: 'free' | 'pro' | 'enterprise';
  };
}

type PaymentSucceededEvent = BaseEvent & {
  event: 'payment.succeeded';
  data: {
    paymentId: string;
    amount: number;
    currency: string;
    customerId: number;
  };
}

type SubscriptionCancelledEvent = BaseEvent & {
  event: 'subscription.cancelled';
  data: {
    subscriptionId: string;
    cancelledAt: string;
    reason: 'customer_request' | 'payment_failed' | 'fraud';
  };
}

// Union type for all events
type WebhookEvent = UserCreatedEvent | PaymentSucceededEvent | SubscriptionCancelledEvent;

// Type-safe event handler with narrowing
function handleWebhook(event: WebhookEvent) {
  switch (event.event) {
    case 'user.created':
      // TypeScript knows event.data has userId, email, plan
      console.log(`New user: ${event.data.email}`);
      break;
    case 'payment.succeeded':
      // TypeScript knows event.data has paymentId, amount, etc.
      console.log(`Payment: $${event.data.amount / 100}`);
      break;
    case 'subscription.cancelled':
      // TypeScript knows event.data has subscriptionId, cancelledAt, reason
      console.log(`Cancelled: ${event.data.reason}`);
      break;
  }
}
```

**Zod Schema (webhook validation with discrimination):**
```typescript
import { z } from 'zod';

const userCreatedSchema = z.object({
  event: z.literal('user.created'),
  timestamp: z.string().datetime(),
  data: z.object({
    userId: z.number(),
    email: z.string().email(),
    plan: z.enum(['free', 'pro', 'enterprise']),
  }),
});

const paymentSucceededSchema = z.object({
  event: z.literal('payment.succeeded'),
  timestamp: z.string().datetime(),
  data: z.object({
    paymentId: z.string(),
    amount: z.number().positive(),
    currency: z.string().length(3),
    customerId: z.number(),
  }),
});

const subscriptionCancelledSchema = z.object({
  event: z.literal('subscription.cancelled'),
  timestamp: z.string().datetime(),
  data: z.object({
    subscriptionId: z.string(),
    cancelledAt: z.string().datetime(),
    reason: z.enum(['customer_request', 'payment_failed', 'fraud']),
  }),
});

const webhookEventSchema = z.discriminatedUnion('event', [
  userCreatedSchema,
  paymentSucceededSchema,
  subscriptionCancelledSchema,
]);

type WebhookEvent = z.infer<typeof webhookEventSchema>;

// Usage in webhook endpoint:
app.post('/webhooks', (req, res) => {
  try {
    const event = webhookEventSchema.parse(req.body);
    // Type-safe handling with full validation
    handleWebhook(event);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Invalid webhook payload' });
  }
});
```

---

## Use Cases

- **API integration** - Type API responses instantly
- **Config files** - Generate types for JSON configs
- **Database schemas** - Type query results
- **Form data** - Validate form inputs with Zod
- **GraphQL** - Generate types from JSON responses
- **Mock data** - Type your test fixtures
- **Documentation** - Share type definitions with team

## Tech Stack

- Single HTML file (~15KB)
- Vanilla JavaScript (no frameworks)
- Zero dependencies
- No build process
- Works offline

Why? Because not everything needs a bundler. Sometimes simple is better.

## Development

Want to modify or self-host?

```bash
# Clone or download
git clone https://github.com/muinmomin/json-to-types.git
cd json-to-types

# Open in browser
open index.html

# Or serve with any static server
python -m http.server 8000
# Visit http://localhost:8000
```

Edit `index.html` directly. All code is in one file. No compilation needed.

## Contributing

Contributions welcome! Here's what you could add:

**Feature ideas:**
- More output formats (Rust structs, Go types, JSON Schema)
- Import from URL or file
- Batch conversion (multiple JSONs)
- Custom type naming
- Export to file
- Support for advanced TypeScript features (generics, utility types)

**How to contribute:**
1. Fork the repository
2. Make your changes to `index.html`
3. Test in multiple browsers
4. Submit a pull request

Keep it simple - the goal is a single-file tool with no dependencies.

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Uses standard JavaScript - no transpiling needed.

## Privacy

All processing happens in your browser. Your JSON never leaves your machine. No analytics, no tracking, no server calls.

## SEO & Discovery

This tool ranks for:
- json to typescript
- json to typescript interface
- json to zod schema
- json to python types
- typescript interface generator
- pydantic model generator
- json type converter
- zod schema generator

## License

MIT - Use it however you want.

---

Made by [muin](https://github.com/muinmomin)

*Stop writing types manually. Paste JSON, copy types, ship code.*
