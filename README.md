
# PulseWatch

**PulseWatch** is a modern, responsive, self-hosted system monitoring web app that provides real-time insights into CPU, memory, disk, network usage, and running processes.  
It includes a powerful process search/filter feature, resource consumption alerts, and a secure login system to protect access.  
Designed to be hosted on your VPS or server, PulseWatch lets you monitor your system from anywhere with a clean, intuitive dashboard.

---

## 🌟 Features

- **🔒 Authentication**
  - Secure login form with username/password
  - "Remember Me" option
  - Protected dashboard access

- **📊 Real-Time System Metrics**
  - CPU load, memory usage, disk utilization, and network activity
  - Live updates without page reloads
  - Color-coded health indicators (green, orange, red)

- **🖥 Process Management**
  - View all running processes (PID, name, CPU%, memory%, status)
  - Search by process name or PID
  - Filter by usage thresholds, status, or user

- **⚠️ Alerts**
  - Highlight processes exceeding CPU/memory limits
  - Popup notifications for critical issues

- **🎨 Modern UI**
  - Dark/Light theme toggle
  - Interactive charts (line graphs, gauges, doughnut charts)
  - Responsive layout for desktop, tablet, and mobile

---

- **Deployment**
  - Runs on VPS, Docker-ready
  - Reverse-proxy friendly (Nginx, Caddy)
  - HTTPS via Let’s Encrypt

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+  
- npm or yarn  
- VPS or local machine for testing

### Installation
```bash
# Clone repository
git clone https://github.com/innaesim/pulseWatch.git

cd pulseWatch

# Install dependencies
npm install
````

### Configuration

Create a `.env` file:

```env
CPU_ALERT_THRESHOLD=85
MEMORY_ALERT_THRESHOLD=85
```

### Development

```bash
npm run dev

```

### Production

```bash
npm run build
npm start
```
---

## 🔐 Security Notes

* All endpoints (except `/login`) require authentication.
* Avoid exposing your server’s public IP without HTTPS.

---

## 📄 License

This project is licensed under the MIT License

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss any major changes.

---

## 📬 Contact

**Author:** Duncan Johanne  
**GitHub:** [duncanjohanne](https://github.com/duncanjohanne)  
**Email:** [duncankachasu@gmail.com](mailto:duncankachasu@gmail.com)  
