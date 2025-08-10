import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { User, Send, Loader2, Sparkles } from 'lucide-react';

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className={`w-full ${compact ? 'max-w-md' : 'max-w-2xl'} border-0 bg-white/80 backdrop-blur-sm shadow-xl shadow-slate-200/50`}>
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100/50">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-200">
            <img 
              src="/magister-marcellus.svg" 
              alt="Magister Marcellus" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              Magister Marcellus
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                <Sparkles className="h-3 w-3 mr-1" />
                Online
              </Badge>
            </div>
            {lesson && (
              <p className="text-sm text-slate-600 font-normal mt-1">
                Lesson {lesson} Tutor
              </p>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className={`${compact ? 'h-64' : 'h-96'} p-4`}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                        : 'border-2 border-amber-200 overflow-hidden'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <img 
                        src="/magister-marcellus.svg" 
                        alt="Magister Marcellus" 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                        : 'bg-gradient-to-br from-amber-50 to-orange-50 text-slate-800 border border-amber-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
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
                <div className="w-8 h-8 rounded-full border-2 border-amber-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                  <img 
                    src="/magister-marcellus.svg" 
                    alt="Magister Marcellus" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-amber-600" />
                    <span className="text-sm text-amber-700">Magister is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {liveHtml && (
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-700">Canvas Preview</p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="h-8 px-3"
                  onClick={() => {
                    const html = liveHtml || '';
                    const url = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
                    window.open(url, '_blank');
                  }}
                >
                  Open in new tab
                </Button>
              </div>
            </div>
            <div className="border border-amber-200 rounded-md overflow-hidden bg-white">
              <iframe
                title="AI Canvas Preview"
                sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="w-full"
                style={{ height: compact ? 280 : 420 }}
                srcDoc={liveHtml}
              />
            </div>
          </div>
        )}
        
        <div className="p-4 border-t border-amber-200/50 bg-gradient-to-r from-amber-50/50 to-orange-50/50">
          <div className="flex gap-2">
            <Input
              placeholder="Ask Magister Marcellus about Latin grammar, vocabulary, or culture..."
              value={inputMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-white/80 border-amber-200 focus:border-amber-400 focus:ring-amber-200"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg px-4"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
