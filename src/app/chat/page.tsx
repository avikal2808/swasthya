import ChatInterface from './chat-interface';

export default function ChatPage() {
  return (
    <div className="flex h-full flex-col p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground">
          Multilingual AI Chat
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Ask health-related questions in your preferred language.
        </p>
      </div>
      <ChatInterface />
    </div>
  );
}
