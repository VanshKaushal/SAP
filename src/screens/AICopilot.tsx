import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Sparkles, 
  Zap, 
  Bot, 
  User,
  RefreshCw,
  Terminal,
  BrainCircuit
} from 'lucide-react';
import { useWorkflowStore } from '../hooks/useWorkflowStore';
import './AICopilot.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  status?: 'typing' | 'done';
}

const AICopilot: React.FC = () => {
  const { workflows, analytics } = useWorkflowStore();
  const [input, setInput] = useState('');
  
  const initialMessage = useMemo(() => {
    const riskWorkflows = workflows.filter(w => w.status === 'SLA_RISK' || w.status === 'ESCALATED');
    return { 
      id: '1', 
      role: 'assistant', 
      content: `Hello. I've analyzed the current SAP orchestration layer. We're seeing ${riskWorkflows.length} workflows at critical risk. System efficiency is currently at ${analytics.throughput.toFixed(1)}%. Would you like me to prioritize the ${riskWorkflows[0]?.department || 'Procurement'} escalations?`,
      status: 'done'
    };
  }, []);

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const context = `Workflows: ${JSON.stringify(workflows.slice(0, 5))}. Analytics: ${JSON.stringify(analytics)}`;
      const response = await apiService.queryCopilot(input, context);

      setIsTyping(false);
      
      const assistantMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: '',
        status: 'typing'
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      // Stream the response
      let currentContent = '';
      const words = response.split(' ');
      let wordIndex = 0;
      
      const interval = setInterval(() => {
        if (wordIndex < words.length) {
          currentContent += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
          setMessages(prev => prev.map(m => m.id === assistantMessage.id ? { ...m, content: currentContent } : m));
          wordIndex++;
        } else {
          setMessages(prev => prev.map(m => m.id === assistantMessage.id ? { ...m, status: 'done' } : m));
          clearInterval(interval);
        }
      }, 30);
    } catch (error) {
      console.error("AI Copilot Error:", error);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "I'm having trouble connecting to the orchestration intelligence layer. Please verify the system status." }]);
    }
  };


  const activeWorkflows = workflows.slice(0, 3);

  return (
    <div className="ai-copilot-container">
      <div className="copilot-layout">
        <div className="chat-section glass-card">
          <header className="chat-header">
            <div className="ai-identity">
              <div className="ai-avatar">
                <BrainCircuit size={20} className="text-accent-blue" />
              </div>
              <div className="ai-info">
                <h3>Cognitive Assistant</h3>
                <span className="ai-status">Ready for Orchestration</span>
              </div>
            </div>
            <div className="chat-actions">
              <button className="chat-action-btn"><RefreshCw size={16} /></button>
              <button className="chat-action-btn"><Terminal size={16} /></button>
            </div>
          </header>

          <div className="messages-container">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`message-wrapper ${msg.role}`}
                >
                  <div className="message-icon">
                    {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className="message-bubble glass">
                    <div className="msg-content">
                      {msg.status === 'typing' && <span className="neural-shimmer" />}
                      {msg.content}
                    </div>
                    {msg.role === 'assistant' && (
                      <div className="msg-footer">
                        <div className="reasoning-badge-group">
                          <button className="reasoning-badge">
                            <BrainCircuit size={10} /> REASONING: OPTIMAL PATH
                          </button>
                        </div>
                        <div className="confidence-meter">
                          <div className="confidence-fill" style={{ '--width': '94%' } as any}></div>
                          <span>94% CONFIDENCE</span>
                        </div>
                      </div>
                    )}
                  </div>


                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <div className="typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <footer className="chat-input-area">
            <div className="input-wrapper glass-card">
              <input 
                type="text" 
                placeholder="Ask about workflow optimization, risk analysis, or approval status..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="send-btn" onClick={handleSend} disabled={!input.trim()}>
                <Send size={18} />
              </button>
            </div>
            <div className="suggestion-chips">
              <button className="chip glass" onClick={() => setInput("Explain current bottlenecks")}>Bottleneck Analysis</button>
              <button className="chip glass" onClick={() => setInput("Summarize active risks")}>Risk Summary</button>
              <button className="chip glass" onClick={() => setInput("Optimize workflow paths")}>Path Optimization</button>
            </div>
          </footer>
        </div>

        <div className="context-sidebar">
          <div className="context-card glass-card">
            <h4>Active Context</h4>
            {activeWorkflows.map(wf => (
              <div key={wf.id} className="context-item">
                <Zap size={14} className={wf.status === 'SLA_RISK' ? 'text-danger' : 'text-accent-blue'} />
                <span>{wf.id} - {wf.status}</span>
              </div>
            ))}
            <div className="context-item">
              <Sparkles size={14} className="text-accent-teal" />
              <span>Cognitive Engine Active</span>
            </div>
          </div>

          <div className="context-card glass-card">
            <h4>Recommended Actions</h4>
            <div className="action-list">
              <button className="context-action">Apply Re-routing</button>
              <button className="context-action">Export Analysis</button>
              <button className="context-action secondary">Silence Alerts</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICopilot;

