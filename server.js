// server.js - Echo Sentinel MCP Mock Server
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Ring MCP Tool Endpoint (Security & Perimeter)
app.get('/api/mcp/ring', (req, res) => {
  res.json({
    device: "Ring Patio Sensor",
    status: "ALERT",
    doorState: "UNLATCHED",
    location: "Back Patio Door",
    lastMotion: "12 mins ago"
  });
});

// 2. Bee Wearable MCP Tool Endpoint (Vitals & Presence)
app.get('/api/mcp/bee', (req, res) => {
  res.json({
    device: "Bee Ambient Wearable",
    resident: "Eleanor",
    heartRate: 72,
    bloodOxygen: "98%",
    medicationTaken: false,
    activityLevel: "LOW"
  });
});

// 3. Fire TV MCP Tool Endpoint (Screen Override)
app.post('/api/mcp/firetv', (req, res) => {
  const { title, message } = req.body;
  res.json({
    status: "DISPLAY_OVERRIDE_ACTIVE",
    target: "Living Room Fire TV",
    overlay: {
      header: title || "CARE CHECK-IN",
      body: message || "Please verify your well-being.",
      urgency: "HIGH"
    },
    timestamp: new Date().toISOString()
  });
});

// Root Health Check
app.get('/', (req, res) => {
  res.send("Echo Sentinel MCP Server Online");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Echo Sentinel MCP running on port ${PORT}`);
});