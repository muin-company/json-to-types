# JSON to Types

Convert JSON to TypeScript, Zod, Python types instantly. No build step, no dependencies.

## Features

- **Multiple output formats**
  - TypeScript Interface
  - TypeScript Type
  - Zod Schema
  - Python TypedDict
  - Python Pydantic

- **Smart type inference**
  - Nested objects
  - Arrays with proper typing
  - Optional fields (null values)
  - Mixed types detection

- **Developer experience**
  - Live preview as you type
  - JSON validation with clear errors
  - One-click copy to clipboard
  - Built-in examples
  - Mobile responsive

## Usage

1. Open `index.html` in your browser
2. Paste your JSON
3. Select output format
4. Copy generated types

That's it. No installation, no npm, no build tools.

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

## Use Cases

- API response modeling
- Config file typing
- Database schema typing
- Form data validation
- GraphQL type generation
- Mock data typing

## Tech Stack

- Single HTML file
- Vanilla JavaScript
- Zero dependencies
- No build process

## Development

Want to modify or host it?

```bash
# Clone or download
cd json-to-types

# Open in browser
open index.html

# Or serve with any static server
python -m http.server 8000
# Visit http://localhost:8000
```

## SEO

This tool is optimized for search terms:
- json to typescript
- json to zod schema
- json to python types
- typescript interface generator
- pydantic model generator
- json type converter

## License

MIT - Use it however you want.

## Contributing

Found a bug? Have an idea?

1. Fork it
2. Fix it
3. Send a PR

Or just open an issue.

---

Built for developers who hate writing types manually.
