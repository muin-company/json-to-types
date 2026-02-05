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

## Examples

### Basic Object

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

**Zod Schema:**
```typescript
import { z } from 'zod';

const rootSchema = z.object({
  name: z.string(),
  age: z.number(),
  tags: z.array(z.string()),
});

type Root = z.infer<typeof rootSchema>;
```

**Python Pydantic:**
```python
from pydantic import BaseModel
from typing import List

class Root(BaseModel):
    name: str
    age: int
    tags: List[str]
```

### Nested Objects

**Input:**
```json
{
  "user": {
    "id": 123,
    "profile": {
      "bio": "Developer",
      "avatar": "url"
    }
  },
  "posts": [
    {
      "id": 1,
      "title": "Hello"
    }
  ]
}
```

**TypeScript Interface:**
```typescript
interface Root {
  user: User;
  posts: Post[];
}

interface User {
  id: number;
  profile: Profile;
}

interface Profile {
  bio: string;
  avatar: string;
}

interface Post {
  id: number;
  title: string;
}
```

### API Response

**Input:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Item 1",
        "price": 29.99
      }
    ],
    "total": 100
  }
}
```

**Python TypedDict:**
```python
from typing import TypedDict, List

class Item(TypedDict):
    id: int
    name: str
    price: float

class Data(TypedDict):
    items: List[Item]
    total: int

class Root(TypedDict):
    success: bool
    data: Data
```

### Optional Fields

**Input:**
```json
{
  "id": 1,
  "name": "John",
  "email": null
}
```

**TypeScript Interface:**
```typescript
interface Root {
  id: number;
  name: string;
  email: null | string;  // Marked as nullable
}
```

**Zod Schema:**
```typescript
import { z } from 'zod';

const rootSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.null().or(z.string()),
});
```

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
