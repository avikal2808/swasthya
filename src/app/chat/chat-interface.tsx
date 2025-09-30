'use client';

import { multilingualAIChat } from '@/ai/flows/multilingual-ai-chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { useEffect, useRef, useState, useTransition } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const languages = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'हिंदी (Hindi)' },
  { value: 'bengali', label: 'বাংলা (Bengali)' },
  { value: 'marathi', label: 'मराठी (Marathi)' },
  { value: 'telugu', label: 'తెలుగు (Telugu)' },
  { value: 'tamil', label: 'தமிழ் (Tamil)' },
];

export default function ChatInterface() {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! I am Swasthya Sahayak. How can I help you with your health questions today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState(languages[0].value);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const assistantMessage = await multilingualAIChat({
        language,
        message: input,
      });
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: assistantMessage.response },
      ]);
    });
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Chat</h2>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-4',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[75%] rounded-2xl p-4 text-base',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-muted rounded-bl-none'
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isPending && (
             <div className="flex items-start gap-4 justify-start">
               <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl rounded-bl-none p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t bg-background/50 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-4"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 text-base"
            disabled={isPending}
          />
          <Button type="submit" size="icon" disabled={isPending}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
