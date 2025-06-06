# Mini-Netumo Monitoring System

A responsive web dashboard for monitoring website health and status in real-time. This project is built with React, TypeScript, and Bootstrap, providing a modern and intuitive interface for tracking multiple websites or services.

## Features

- 🟢 Real-time website status monitoring
- 📊 24-hour uptime history visualization
- ⏰ SSL and domain expiry tracking
- 🔔 Customizable alert notifications
- 📱 Responsive design for mobile and desktop
- 🎨 Modern, clean UI with Bootstrap

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mini-netumo.git
cd mini-netumo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
  ├── components/        # React components
  │   ├── Header.tsx    # Navigation header
  │   ├── Dashboard.tsx # Main monitoring view
  │   ├── Alerts.tsx    # Alert notifications
  │   └── Settings.tsx  # User preferences
  ├── App.tsx           # Main application component
  └── index.css         # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
