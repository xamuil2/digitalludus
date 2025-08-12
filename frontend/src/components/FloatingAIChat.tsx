import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Send, Loader2, MessageCircle, X, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FloatingAIChatProps {
  lesson?: number;
  context?: string;
}

export default function FloatingAIChat({ lesson, context }: FloatingAIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Salve! I'm Magister Marcellus, your Latin tutor. I'm here to help you with ${lesson ? `Lesson ${lesson}` : 'your Latin studies'}. Feel free to ask me about vocabulary, grammar, translations, or Roman culture!`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [liveHtml, setLiveHtml] = useState<string | null>(null);
  const assistantContentRef = useRef<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const extractLatestHtmlBlock = (text: string): string | null => {
    const regex = /```html\n([\s\S]*?)```/gi;
    let match: RegExpExecArray | null = null;
    let last: string | null = null;
    while ((match = regex.exec(text)) !== null) {
      last = match[1];
    }
    return last;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date()
    }]);
    assistantContentRef.current = '';
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-tutor-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          lesson,
          context
        })
      });

      if (!response.ok) {
        let errorText = 'Failed to start stream';
        try {
          const err = await response.json();
          errorText = err?.message || errorText;
        } catch {}
        throw new Error(errorText);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const appendToken = (token: string) => {
        setMessages(prev => {
          const updated = [...prev];
          for (let i = updated.length - 1; i >= 0; i--) {
            if (updated[i].role === 'assistant') {
              updated[i] = {
                ...updated[i],
                content: (updated[i].content || '') + token,
              };
              break;
            }
          }
          return updated;
        });

        assistantContentRef.current += token;
        setLiveHtml((prev) => {
          const html = extractLatestHtmlBlock(assistantContentRef.current);
          return html ?? prev;
        });
      };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
          const lines = part.split('\n');
          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const data = line.slice(5).trim();
            if (data === '[DONE]') {
              break;
            }
            try {
              const payload = JSON.parse(data);
              if (payload?.type === 'token' && typeof payload.text === 'string') {
                appendToken(payload.text);
              }
            } catch {
              // ignore malformed lines
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => {
        const updated = [...prev];
        for (let i = updated.length - 1; i >= 0; i--) {
          if (updated[i].role === 'assistant') {
            updated[i] = {
              ...updated[i],
              content: 'Apologies, but I encountered an issue. Please try again.',
            };
            break;
          }
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const next = Math.min(el.scrollHeight, 120);
    el.style.height = `${next}px`;
  };

  // Don't render on server-side
  if (!isMounted) return null;

    // Floating chat button when closed
  if (!isOpen) {
    return createPortal(
      <div 
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 2147483647,
          isolation: 'isolate',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
        className="sm:bottom-6 sm:right-6"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-roman-gradient hover:shadow-roman text-white shadow-lg hover:scale-105 transition-all duration-200 border-2 border-roman-gold/30 backdrop-blur-sm touch-manipulation active:scale-95"
        >
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>,
      document.documentElement
    );
  }

  // Floating chat window when open
  return createPortal(
    <div 
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 2147483647,
        isolation: 'isolate',
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
      }}
      className="sm:bottom-6 sm:right-6"
    >
      <Card className={`w-80 sm:w-96 border-roman-gold/20 shadow-xl transition-all duration-300 ${isMinimized ? 'h-12 sm:h-16' : 'h-96 sm:h-[500px]'} glass-effect backdrop-blur-lg`}>
        {/* Header */}
        <CardHeader className="pb-2 sm:pb-3 bg-gradient-to-r from-roman-cream to-roman-marble border-b border-roman-gold/20 px-3 sm:px-6 py-2 sm:py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-classical text-roman-red flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-roman-gold">
                <img 
                  src="/magister-marcellus.svg" 
                  alt="Magister Marcellus" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const target = e.currentTarget;
                    const sibling = target.nextElementSibling as HTMLElement;
                    target.style.display = 'none';
                    if (sibling) {
                      sibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="w-full h-full bg-roman-gradient rounded-full flex items-center justify-center text-white text-xs font-bold" style={{display: 'none'}}>
                  M
                </div>
              </div>
              Magister Marcellus
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 p-0 hover:bg-roman-gold/10 text-roman-red"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 p-0 hover:bg-roman-gold/10 text-roman-red"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Chat content - only show when not minimized */}
        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(500px-76px)]">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-[280px] ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border border-roman-gold/30 bg-roman-cream text-roman-red">
                        {message.role === 'user' ? (
                          <User className="h-3 w-3" />
                        ) : (
                          <span className="text-xs font-classical font-bold">M</span>
                        )}
                      </div>
                      <div
                        className={`px-3 py-2 rounded-xl border text-sm ${
                          message.role === 'user'
                            ? 'bg-roman-gradient text-white border-roman-gold/20'
                            : 'bg-roman-marble/50 text-roman-black border-roman-gold/20'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap font-classical">
                          {message.content}
                        </p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-7 h-7 rounded-full border border-roman-gold/30 bg-roman-cream flex items-center justify-center flex-shrink-0 text-roman-red">
                      <span className="text-xs font-classical font-bold">M</span>
                    </div>
                    <div className="px-3 py-2 rounded-xl border bg-roman-marble/50 border-roman-gold/20">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin text-roman-red" />
                        <span className="text-sm text-roman-black font-classical">Thinking…</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Live HTML Preview */}
            {liveHtml && (
              <div className="px-4 pb-2 border-t border-roman-gold/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-classical font-medium text-roman-red">Canvas Preview</p>
                  <Button
                    size="sm"
                    className="h-6 px-2 text-xs bg-roman-gradient hover:shadow-roman text-white font-classical"
                    onClick={() => {
                      const html = liveHtml || '';
                      const url = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
                      window.open(url, '_blank');
                    }}
                  >
                    Open
                  </Button>
                </div>
                <div className="border border-roman-gold/20 rounded-md overflow-hidden bg-white">
                  <iframe
                    title="AI Canvas Preview"
                    sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    className="w-full"
                    style={{ height: 120 }}
                    srcDoc={liveHtml}
                  />
                </div>
              </div>
            )}
            
            {/* Input */}
            <div className="p-4 border-t border-roman-gold/20 bg-gradient-to-r from-roman-cream/50 to-roman-marble/30">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <textarea
                    placeholder="Ask Magister Marcellus..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onInput={handleInputResize}
                    rows={1}
                    ref={textareaRef}
                    className="w-full max-h-20 overflow-auto resize-none rounded-lg border border-roman-gold/30 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-roman-gold font-classical"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  size="sm"
                  className="bg-roman-gradient hover:shadow-roman text-white px-3 rounded-lg font-classical"
                >
                  {isLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Send className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <div className="mt-1 text-[10px] text-roman-black/60 font-classical">
                Press Enter to send • Shift+Enter for new line
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>,
    document.documentElement
  );
}
