// WebSocket service for real-time updates

class WebSocketService {
  constructor(url) {
    this.url = url || process.env.REACT_APP_WS_URL || 'ws://localhost:8000/ws';
    this.ws = null;
  }

  connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('WebSocket connected');
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
  }

  sendMessage(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  onMessage(callback) {
    this.ws.onmessage = (event) => {
      callback(JSON.parse(event.data));
    };
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export default new WebSocketService();
