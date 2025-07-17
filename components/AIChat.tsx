import React, { useState, useRef, useEffect } from 'react';
import useGeminiChat from '../hooks/useGeminiChat';
import { Course } from '../types';
import SparkleIcon from './icons/SparkleIcon';
import XIcon from './icons/XIcon';
import SendIcon from './icons/SendIcon';

interface AIChatProps {
    courses: Course[];
}

const AIChat = ({ courses }: AIChatProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, isLoading, sendMessage } = useGeminiChat(courses);
    const [userInput, setUserInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        if(isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300); // Delay focus for transition
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;
        
        const textToSend = userInput;
        setUserInput('');
        await sendMessage(textToSend);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 left-6 bg-[var(--color-primary)] text-[var(--color-primary-contrast)] w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-40 transform hover:scale-110 transition-all duration-300 ${isOpen ? 'rotate-180 scale-90' : 'rotate-0'}`}
                aria-label={isOpen ? 'Fechar chat com assistente virtual' : 'Abrir chat com assistente virtual'}
            >
                {isOpen ? <XIcon className="w-8 h-8"/> : <SparkleIcon className="w-8 h-8 animate-pulse" />}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 left-6 z-50 w-[calc(100vw-48px)] sm:w-full max-w-sm h-[60vh] max-h-[500px] bg-[var(--color-surface)] border-2 border-[var(--color-border)] rounded-2xl shadow-2xl flex flex-col transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            >
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-[var(--color-border)] flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-[var(--color-success)] rounded-full animate-pulse"></div>
                        <h3 className="font-bold text-[var(--color-text-strong)] text-lg">Assistente Virtual Luxy</h3>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-[var(--color-text-subtle)] hover:text-[var(--color-text-strong)]">
                        <XIcon className="w-5 h-5" />
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col gap-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-base whitespace-pre-wrap ${msg.role === 'user' ? 'bg-[var(--color-primary)] text-[var(--color-primary-contrast)] rounded-br-none' : 'bg-[var(--color-background)] text-[var(--color-text-strong)] rounded-bl-none'}`}>
                                    {msg.parts}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-[80%] p-3 rounded-2xl bg-[var(--color-background)] text-[var(--color-text-strong)] rounded-bl-none">
                                    <div className="flex items-center gap-2">
                                        <span className="typing-dot"></span>
                                        <span className="typing-dot" style={{animationDelay: '0.2s'}}></span>
                                        <span className="typing-dot" style={{animationDelay: '0.4s'}}></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--color-border)] flex-shrink-0">
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Pergunte sobre os cursos..."
                            className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-full py-3 pl-5 pr-12 text-[var(--color-text)] placeholder-[var(--color-text-subtle)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none transition"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] rounded-full p-2 text-[var(--color-primary-contrast)] disabled:opacity-50 hover:bg-[var(--color-primary)]/80 transition-colors"
                            disabled={isLoading || !userInput.trim()}
                        >
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
            <style>{`
                @keyframes typing-animation {
                    0% { transform: translateY(0px); opacity: 0.5; }
                    50% { transform: translateY(-4px); opacity: 1;}
                    100% { transform: translateY(0px); opacity: 0.5; }
                }
                .typing-dot {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background-color: var(--color-primary);
                    border-radius: 50%;
                    animation: typing-animation 1.2s infinite ease-in-out;
                }
            `}</style>
        </>
    );
};

export default AIChat;