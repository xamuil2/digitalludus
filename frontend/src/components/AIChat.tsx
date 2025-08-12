import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User, Send, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MagisterChatProps {
  lesson?: number;
  context?: string;
  compact?: boolean;
}

export default function MagisterChat({ lesson, context, compact = false }: MagisterChatProps) {
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

  const extractLatestHtmlBlock = (text: string): string | null => {
    // Find the last fenced ```html ... ``` block
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
          // Append to the last assistant message (we created a placeholder)
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

        // Update live preview if we have a full HTML block
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

        // SSE messages are separated by double newlines
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
      // Replace the last assistant placeholder with error text
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
    const next = Math.min(el.scrollHeight, 200);
    el.style.height = `${next}px`;
  };

  return (
    <Card className={`w-full ${compact ? 'max-w-sm sm:max-w-md' : 'max-w-xl sm:max-w-2xl'} border bg-white shadow-sm`}>
      <CardContent className="p-0">
        <ScrollArea className={`${compact ? 'h-48 sm:h-64' : 'h-64 sm:h-96'} p-3 sm:p-6 bg-neutral-50`}>
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 sm:gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-2 sm:gap-3 max-w-[280px] sm:max-w-[500px] lg:max-w-[700px] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-slate-300 bg-white text-slate-700">
                    {message.role === 'user' ? (
                      <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <span className="text-xs font-medium">M</span>
                    )}
                  </div>
                  <div
                    className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl border ${
                      message.role === 'user'
                        ? 'bg-white text-slate-900'
                        : 'bg-neutral-50 text-slate-900'
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    <p className="text-xs mt-1 sm:mt-2 text-slate-500">
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
              <div className="flex gap-2 sm:gap-3 justify-start">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center flex-shrink-0 text-slate-700">
                  <span className="text-xs font-medium">M</span>
                </div>
                <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-2xl border bg-neutral-50">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin text-slate-700" />
                    <span className="text-xs sm:text-sm text-slate-700">Thinking…</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {liveHtml && (
          <div className="px-3 sm:px-4 pb-3 sm:pb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs sm:text-sm font-medium text-slate-700">Canvas Preview</p>
              <div className="flex gap-2">
                <Button
                  className="h-6 sm:h-8 px-2 sm:px-3 bg-black hover:bg-neutral-900 text-white text-xs sm:text-sm touch-manipulation active:scale-95"
                  onClick={() => {
                    const html = liveHtml || '';
                    const url = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
                    window.open(url, '_blank');
                  }}
                >
                  <span className="hidden sm:inline">Open in new tab</span>
                  <span className="sm:hidden">Open</span>
                </Button>
              </div>
            </div>
            <div className="border border-slate-200 rounded-md overflow-hidden bg-white">
              <iframe
                title="AI Canvas Preview"
                sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="w-full"
                style={{ height: compact ? (window.innerWidth < 640 ? 200 : 280) : (window.innerWidth < 640 ? 280 : 420) }}
                srcDoc={liveHtml}
              />
            </div>
          </div>
        )}
        
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-white">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <textarea
                placeholder="Message Magister Marcellus"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onInput={handleInputResize}
                rows={1}
                ref={textareaRef}
                className="w-full max-h-32 sm:max-h-52 overflow-auto resize-none rounded-2xl border border-slate-300 bg-white px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black"
                disabled={isLoading}
              />
              <div className="mt-1 text-[10px] sm:text-[11px] text-slate-500">
                <span className="hidden sm:inline">Press Enter to send • Shift+Enter for new line</span>
                <span className="sm:hidden">Enter to send</span>
              </div>
            </div>
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-black hover:bg-neutral-900 text-white shadow px-3 sm:px-4 rounded-xl touch-manipulation active:scale-95 h-8 sm:h-10"
            >
              {isLoading ? (
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              ) : (
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
