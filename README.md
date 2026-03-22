# 🚩 Feature Flag SDK

A lightweight, developer-friendly **Feature Flag SDK** for JavaScript and React applications.
Designed for simplicity first, with a clean path to real-time updates (SSE) and advanced features.

---

## ✨ Features

- ✅ Simple and predictable API
- ⚡ Fast flag evaluation
- ⚛️ React hooks support (no polling)
- 🔌 Works with any backend (REST-based)
- 🧩 Extensible architecture (ready for SSE / real-time)

---

## 📦 Installation

```bash
npm install feature-flag-sdk
```

---

## 🚀 Quick Start

### 1. Initialize the client

```ts
import { FeatureFlagClient } from "feature-flag-sdk";

const client = new FeatureFlagClient({
  apiKey: "YOUR_API_KEY",
  baseUrl: "http://localhost:3000/api/v1/public",
});
```

---

### 2. Use in JavaScript / Node

```ts
const enabled = await client.isEnabled("new-dashboard");

if (enabled) {
  console.log("Feature enabled!");
}
```

---

## ⚛️ React Usage

### 1. Wrap your app

```tsx
import { FeatureFlagProvider } from "feature-flag-sdk/react";

<FeatureFlagProvider client={client}>
  <App />
</FeatureFlagProvider>;
```

---

### 2. Use feature flags

```tsx
import { useFeatureFlag } from "feature-flag-sdk/react";

function MyComponent() {
  const { value, loading } = useFeatureFlag("new-dashboard");

  if (loading) return <div>Loading...</div>;

  return value ? <NewUI /> : <OldUI />;
}
```

---

## 📘 API Reference

### `FeatureFlagClient`

#### Constructor

```ts
new FeatureFlagClient({
  apiKey: string;
  baseUrl?: string;
});
```

---

### Methods

#### `isEnabled(key, defaultValue?)`

Returns a boolean flag.

```ts
const enabled = await client.isEnabled("feature-key", false);
```

---

#### `getFlag(key)`

Returns raw flag value.

```ts
const value = await client.getFlag("feature-key");
```

---

#### `getAllFlags()`

Returns all flags as an object.

```ts
const flags = await client.getAllFlags();
```

---

### React Hooks

#### `useFeatureFlag(key, defaultValue?)`

```ts
const { value, loading } = useFeatureFlag("feature-key");
```

---

## 🧠 How It Works

1. Fetches flags from your backend via REST API
2. Stores values internally
3. React hooks subscribe to updates via internal event system
4. UI updates automatically when values change

---

## ⚙️ Configuration

| Option  | Description                | Default               |
| ------- | -------------------------- | --------------------- |
| apiKey  | API key for authentication | required              |
| baseUrl | Backend API URL            | http://localhost:3000 |

---

## 🛠 Development

```bash
# Install dependencies
npm install

# Build SDK
npm run build

# Watch mode
npm run dev
```

---

## 🔄 Versioning

This project follows **Semantic Versioning**:

- `1.0.0` → Initial release
- `1.1.0` → New features (non-breaking)
- `2.0.0` → Breaking changes

---

## 🧭 Roadmap

- [ ] Caching support
- [ ] Auto-refresh / polling strategy
- [ ] SSE (real-time updates)
- [ ] Offline mode support
- [ ] Multi-environment support

---

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss changes.

---

## 📄 License

MIT License

---

## ⚠️ Notes

- This SDK currently uses a **pull-based model** (manual refresh or re-fetch required)
- Real-time updates (SSE/WebSocket) will be added in future versions

---

## 💡 Example Use Cases

- Feature rollouts
- A/B testing
- Conditional UI rendering
- Remote configuration
