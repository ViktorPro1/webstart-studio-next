import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Замість useNavigate
import './DjonAssistant.css';
import './DjonAssistant.mobile.css';

// Типи
type Button = {
    label: string;
    path: string;
};

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    buttons: Button[] | null;
};

const DjonAssistant: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const saved = localStorage.getItem('djonChatHistory');
        if (saved) setMessages(JSON.parse(saved));

        const seen = localStorage.getItem('djonPopupSeen');
        if (!seen) {
            setTimeout(() => setIsPopupOpen(true), 2500);
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('djonChatHistory', JSON.stringify(messages));
        }
    }, [messages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const serviceFacts: string[] = [
        'Якісне резюме підвищує шанси на співбесіду в 3 рази!',
        'Лендінг з однією ціллю — конверсія до 30%!',
        'Професійне портфоліо збільшує чек на 20–50%!',
        'Ми робимо резюме за 1–2 дні, якщо горить!',
    ];

    const addMessage = (text: string, sender: 'user' | 'bot' = 'bot', buttons: Button[] | null = null) => {
        setMessages(prev => [...prev, { text, sender, id: Date.now(), buttons }]);
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const userText = input.toLowerCase();
        addMessage(input, 'user');
        setInput('');

        setTimeout(() => {
            if (userText.includes('привіт') || userText.includes('добридень') || userText.includes('хай') || userText.includes('вітаю')) {
                addMessage('Привіт! Я Джон — твій помічник. Чим можу допомогти? 😊');
            } 
            else if (userText.includes('супер') || userText.includes('клас') || userText.includes('круто')) {
                addMessage('Радий, що тобі подобається! Я стараюся. Що ще тебе цікавить? ✨');
            } 
            else if (userText.includes('дякую') || userText.includes('спасибі')) {
                addMessage('Будь ласка! Завжди радий допомогти. Звертайся ще! 🙏');
            } 
            else if (userText.includes('слава україні')) {
                addMessage('Героям Слава! 🇺🇦 Разом до перемоги!');
            } 
            else if (userText.includes('як справи') || userText.includes('як ти')) {
                addMessage('У мене все чудово! Працюю 24/7, щоб допомагати вам створювати круті проєкти. А як у тебе? 🤖');
            } 
            else if (userText.includes('переглянути') || userText.includes('макет') || userText.includes('де подивитись') || userText.includes('приклади')) {
                addMessage('З радістю! Ось наші готові рішення. Натисни на кнопку, щоб перейти: 🎨', 'bot', [
                    { label: 'Дизайн портфоліо 🎨', path: '/templates/portfolio' },
                    { label: 'Електронне резюме 📄', path: '/templates/resume' },
                    { label: 'Односторінкові сайти 💻', path: '/templates/landing' }
                ]);
            } 
            else if (userText.includes('ціна') || userText.includes('вартість') || userText.includes('пакет')) {
                addMessage('Ось наші актуальні пакети послуг:', 'bot', [
                    { label: 'Переглянути ціни 💰', path: '/pricing' }
                ]);
            } 
            else if (userText.includes('реклама') || userText.includes('google') || userText.includes('facebook')) {
                addMessage('Налаштовуємо рекламу професійно. Обери напрямок:', 'bot', [
                    { label: 'Google Ads 📈', path: '/google-ads/learning' },
                    { label: 'Facebook Ads 📣', path: '/facebook-ads/target-advertising' }
                ]);
            } 
            else if (userText.includes('польща') || userText.includes('подат')) {
                addMessage('Допомагаємо з поверненням податків з Польщі! 🇵🇱', 'bot', [
                    { label: 'Детальніше 📄', path: '/poland-tax' }
                ]);
            } 
            else if (userText.includes('чистка') || userText.includes('пк')) {
                addMessage('Твій комп’ютер буде як новий! 🚀', 'bot', [
                    { label: 'Чистка ПК віддалено 🖥️', path: '/pc-service' }
                ]);
            } 
            else if (userText.includes('факт')) {
                addMessage('Ось факт: ' + serviceFacts[Math.floor(Math.random() * serviceFacts.length)]);
            } 
            else {
                addMessage('Хмм, не зовсім зрозумів запит... 🤔 Напиши "Переглянути", щоб побачити макети, або просто "Привіт"!');
            }
        }, 600);
    };

    const closePopupForever = () => {
        setIsPopupOpen(false);
        localStorage.setItem('djonPopupSeen', 'true');
    };

    return (
        <>
            {isPopupOpen && (
                <div className="djon-popup-overlay">
                    <div className="djon-popup-container">
                        <button onClick={closePopupForever} className="djon-close-btn">✕</button>
                        <div className="djon-popup-text">
                            Привіт! 👋<br />
                            🤖 Я – <strong>Djon</strong>, твій особистий гід у Web<span className="djon-brand-red">Start</span> Studio.
                        </div>
                        <div className="djon-popup-text">
                            Пиши нам у <a href="viber://chat?number=+380661391932">Viber</a> або <a href="https://t.me/Viktor_freelancer_recruiting_pit">Telegram</a>
                        </div>
                    </div>
                </div>
            )}

            {!isChatOpen && (
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="djon-chat-button"
                    aria-label="Відкрити чат"
                >
                    <MessageCircle size={28} />
                </button>
            )}

            {isChatOpen && (
                <div className="djon-chat-window">
                    <div className="djon-chat-header">
                        <img src="/nasha_komanda/assistant.webp" alt="Джон" className="djon-chat-avatar" />
                        <div className="djon-chat-info">
                            <div className="djon-chat-name">Джон — твій гід</div>
                            <div className="djon-chat-status"><span className="djon-online-dot"></span>онлайн</div>
                        </div>
                        <button onClick={() => setIsChatOpen(false)} className="djon-chat-close"><X size={24} /></button>
                    </div>

                    <div className="djon-chat-messages">
                        {messages.length === 0 && <div className="djon-chat-empty">👋 Привіт! Чим можу допомогти?</div>}
                        {messages.map((m: Message) => (
                            <div key={m.id} className={`djon-message ${m.sender}`}>
                                <div className="djon-message-content">
                                    {m.sender === 'bot' && (
                                        <img src="/nasha_komanda/assistant.webp" alt="" className="djon-message-avatar" />
                                    )}
                                    <div className="djon-message-bubble">
                                        {m.text}

                                        {m.buttons && (
                                            <div className="djon-chat-buttons-container" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {m.buttons.map((btn: Button, idx: number) => (
                                                    <button
                                                        key={idx}
                                                        className="djon-chat-btn-link"
                                                        onClick={() => {
                                                            router.push(btn.path);
                                                            if (window.innerWidth <= 768) setIsChatOpen(false);
                                                        }}
                                                        style={{
                                                            padding: '8px 12px',
                                                            borderRadius: '8px',
                                                            border: '1px solid #ddd',
                                                            backgroundColor: '#fff',
                                                            cursor: 'pointer',
                                                            textAlign: 'left',
                                                            fontSize: '13px',
                                                            fontWeight: '500'
                                                        }}
                                                    >
                                                        {btn.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="djon-chat-input-container">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                            placeholder="Напиши повідомлення..."
                            className="djon-chat-input"
                        />
                        <button onClick={handleSend} className="djon-chat-send" disabled={!input.trim()}>
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DjonAssistant;
