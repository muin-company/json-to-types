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
