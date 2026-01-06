# Memory Safe Guard - Hybrid

🔐 **Ứng dụng quản lý mật khẩu hiện đại với React, TypeScript và IndexedDB**

Memory Safe Guard là ứng dụng quản lý mật khẩu được xây dựng với kiến trúc hybrid, sử dụng IndexedDB làm primary storage và API làm fallback mechanism. Ứng dụng cho phép người dùng lưu trữ, quản lý và bảo vệ thông tin đăng nhập một cách an toàn ngay trong trình duyệt.

## ✨ Tính năng chính

- 🏠 **Lưu trữ cục bộ**: IndexedDB làm primary storage, an toàn trong trình duyệt
- 🔄 **Hybrid Architecture**: API fallback cho sync và backup
- 🔐 **Quản lý mật khẩu**: Thêm, chỉnh sửa, xóa và tìm kiếm mật khẩu
- 🎨 **Giao diện hiện đại**: Thiết kế đẹp mắt với shadcn/ui và Tailwind CSS
- 🛡️ **Bảo mật**: Dữ liệu được lưu trữ cục bộ, không phụ thuộc server
- 🎲 **Tạo mật khẩu**: Tính năng tạo mật khẩu ngẫu nhiên mạnh
- 📋 **Sao chép nhanh**: Sao chép thông tin đăng nhập vào clipboard
- 🔍 **Tìm kiếm thông minh**: Search với debounce và real-time filtering
- 🌙 **Dark/Light Mode**: Theme switching với system preference

## 🏗️ Kiến trúc

```
IndexedDB (Primary) ←→ usePasswords Hook ←→ API (Fallback)
     ↓                        ↓                    ↓
  Local Storage         React Components      Remote Sync
   (Secure)              (UI Layer)         (Development)
```

### Tech Stack

- **Frontend**: React 18.3.1 + TypeScript 5.5.3
- **Build Tool**: Vite 5.4.1
- **UI Framework**: shadcn/ui + Radix UI + Tailwind CSS 3.4.11
- **State Management**: React Query + Custom hooks
- **Database**: IndexedDB (primary) + PostgreSQL (fallback)
- **Routing**: React Router DOM
- **Testing**: Vitest + Testing Library

## 🚀 Cài đặt và chạy

### Prerequisites

- Node.js 18+ 
- npm hoặc yarn

### Development

```bash
# Clone repository
git clone https://github.com/tungvu82nt/memory-safe-guard-hybrid.git
cd memory-safe-guard-hybrid

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Mở trình duyệt tại http://localhost:8080
```

### Production

```bash
# Build cho production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Chạy tests
npm run test

# Test với UI
npm run test:ui

# Test coverage
npm run test:coverage
```

## 📁 Cấu trúc dự án

```
src/
├── assets/              # Static resources
├── components/          # React components
│   ├── ui/             # shadcn/ui base components
│   ├── PasswordCard.tsx    # Password display component
│   ├── PasswordForm.tsx    # Add/edit password form
│   └── SearchBar.tsx       # Search functionality
├── hooks/               # Custom React hooks
│   ├── use-passwords.ts    # Password management (hybrid)
│   └── use-toast.ts        # Toast notifications
├── lib/                 # Utilities and libraries
│   ├── db/             # IndexedDB management
│   ├── config/         # App configuration
│   ├── types/          # TypeScript types
│   └── constants/      # App constants
├── pages/               # Page components
│   ├── Index.tsx           # Main application page
│   └── NotFound.tsx        # 404 error page
└── App.tsx              # Root component
```

## 🔧 Cấu hình

### Environment Variables

```bash
# .env.local
VITE_ENABLE_SAMPLE_DATA=false
VITE_LOG_LEVEL=error
```

### Database Configuration

- **IndexedDB**: `memorySafeGuardDB` với object store `passwords`
- **Indexes**: service, username, updatedAt
- **API Fallback**: Chỉ enable trong development mode

## 🛡️ Bảo mật

- **Local Storage**: Tất cả dữ liệu được lưu trong IndexedDB của trình duyệt
- **No Server Dependency**: Hoạt động hoàn toàn offline
- **Password Masking**: Mật khẩu được ẩn mặc định
- **Secure Generation**: Tạo mật khẩu mạnh với ký tự đặc biệt

## 🎯 Tính năng đã test

- ✅ IndexedDB CRUD operations
- ✅ Password generation và validation
- ✅ Search với debounce
- ✅ Copy to clipboard
- ✅ Show/hide password
- ✅ Edit và delete operations
- ✅ Responsive design
- ✅ Theme switching
- ✅ Error handling và fallback

## 🚀 Deployment

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist

# Environment variables
VITE_ENABLE_SAMPLE_DATA=false
```

### Vercel

```bash
# Build command
npm run build

# Output directory
dist
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Tung Vu** - [@tungvu82nt](https://github.com/tungvu82nt)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Vite](https://vitejs.dev/) - Fast build tool

---

⭐ **Nếu project này hữu ích, hãy cho một star!** ⭐