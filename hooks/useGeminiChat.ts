import { useState, useCallback, useEffect } from 'react';
import { Course } from '../types';

// O tipo de mensagem permanece o mesmo
type Message = {
    role: 'user' | 'model';
    parts: string;
};

const useGeminiChat = (coursesData: Course[]) => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', parts: 'Olá! ✨ Sou a Luxy, sua assistente virtual da Luxury Studio. Como posso ajudar você a brilhar hoje?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // O histórico é necessário para dar contexto ao nosso endpoint de API
    const [history, setHistory] = useState<any[]>([]);

    const sendMessage = useCallback(async (message: string) => {
        setIsLoading(true);
        setError(null);

        const userMessage: Message = { role: 'user', parts: message };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    history // Enviamos o histórico para o backend
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Falha ao comunicar com o servidor.');
            }

            const data = await response.json();
            
            const modelMessage: Message = { role: 'model', parts: data.text };
            setMessages(prev => [...prev, modelMessage]);

            // Atualizamos o histórico com a nova conversa
            setHistory(data.history);

        } catch (e: any) {
            console.error(e);
            const errorMessage = "Desculpe, estou com um pequeno problema técnico no momento. 💖 Por favor, tente novamente em alguns instantes ou contate o suporte via WhatsApp.";
            setError(errorMessage);
            setMessages(prev => [...prev, { role: 'model', parts: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    }, [history]); // Adiciona history como dependência

    return { messages, isLoading, error, sendMessage };
};

export default useGeminiChat;