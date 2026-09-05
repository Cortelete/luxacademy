import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Chat } from '@google/genai';

const coursesData = [
    { 
      id: 1, 
      title: 'Lash Profissional', 
      uniqueDescription: 'Domine a técnica fundamental. A base perfeita para iniciar sua carreira com segurança.',
      price: 'R$ 1200',
      includedCategories: ['Técnica Lash'], 
      includedFeatures: ['Certificado', 'Apostila', 'Mentoria', 'Grupo Suporte'],
      difficulty: 'Iniciante',
    },
    { 
      id: 2, 
      title: 'Lash Empreendedora', 
      uniqueDescription: 'Vá além da técnica. Aprenda a gerir e construir sua marca de sucesso.',
      price: 'R$ 1500', 
      includedCategories: ['Técnica Lash', 'Gestão'], 
      includedFeatures: ['Certificado', 'Coffee Break', 'Apostila', 'Mentoria', 'Grupo Suporte', 'Networking'],
      difficulty: 'Intermediário',
    },
    { 
      id: 3, 
      title: 'Lash Empresária VIP', 
      uniqueDescription: 'A elite da formação. Técnica e gestão avançada para escalar.',
      price: 'R$ 2500', 
      includedCategories: ['Técnica Lash', 'Gestão', 'Exclusivo VIP'], 
      includedFeatures: ['Tudo dos anteriores', 'Mentoria VIP'],
      difficulty: 'Avançado',
    },
    { 
      id: 4, 
      title: 'Lash Lifting', 
      uniqueDescription: 'Aprenda a técnica de elevação e curvatura dos cílios naturais.',
      price: 'R$ 800',
      includedCategories: ['Lash Lifting'], 
      includedFeatures: ['Certificado', 'Apostila', 'Mentoria'],
      difficulty: 'Iniciante/Intermediário',
    },
    { 
      id: 5, 
      title: 'Sobrancelhas (Módulo 1, 2 e 3)', 
      uniqueDescription: 'Design de sobrancelhas e henna com tintura.',
      price: 'R$ 1000',
      includedCategories: ['Sobrancelhas - Iniciante'], 
      includedFeatures: ['Certificado', 'Apostila', 'Mentoria'],
      difficulty: 'Iniciante',
    },
    { 
      id: 6, 
      title: 'Sobrancelhas (Módulo 4)', 
      uniqueDescription: 'Protocolo de crescimento de sobrancelhas.',
      price: 'R$ 700',
      includedCategories: ['Módulo 4: Protocolo de Crescimento'], 
      includedFeatures: ['Certificado', 'Apostila', 'Mentoria'],
      difficulty: 'Avançado',
    },
    { 
      id: 7, 
      title: 'Brow Repair (Módulo 5)', 
      uniqueDescription: 'Técnicas de reparação e reconstrução de sobrancelhas.',
      price: 'R$ 800',
      includedCategories: ['Módulo 5: Brow Repair'], 
      includedFeatures: ['Certificado', 'Apostila', 'Mentoria'],
      difficulty: 'Avançado',
    },
    { 
      id: 8, 
      title: 'Brow Lamination (Módulo 6)', 
      uniqueDescription: 'Alinhamento e volume para sobrancelhas perfeitas.',
      price: 'R$ 800',
      includedCategories: ['Módulo 6: Brow Lamination'], 
      includedFeatures: ['Certificado', 'Apostila', 'Mentoria'],
      difficulty: 'Avançado',
    },
    { 
      id: 9, 
      title: 'Combo: Profissional + Lifting', 
      uniqueDescription: 'Lash Profissional + Lash Lifting. Formação completa em cílios.',
      price: 'R$ 1700',
      includedCategories: ['Técnica Lash', 'Lash Lifting'], 
      includedFeatures: ['Certificado Duplo', 'Apostila', 'Mentoria', 'Grupo Suporte'],
      difficulty: 'Iniciante ao Intermediário',
    },
    { 
      id: 10, 
      title: 'Combo: VIP + Lifting', 
      uniqueDescription: 'Lash VIP + Lash Lifting. A elite da formação em cílios.',
      price: 'R$ 2900',
      includedCategories: ['Técnica Lash', 'Gestão', 'Exclusivo VIP', 'Lash Lifting'], 
      includedFeatures: ['Certificados', 'Apostila', 'Mentoria VIP'],
      difficulty: 'Avançado',
    },
    { 
      id: 11, 
      title: 'Combo: Lash + Sobrancelhas', 
      uniqueDescription: 'Lash Profissional + Módulo Iniciante de Sobrancelhas.',
      price: 'R$ 1900',
      includedCategories: ['Técnica Lash', 'Sobrancelhas - Iniciante'], 
      includedFeatures: ['Certificado Duplo', 'Apostila', 'Mentoria'],
      difficulty: 'Iniciante',
    },
    { 
      id: 12, 
      title: 'Combo: Lamination + Lifting', 
      uniqueDescription: 'Brow Lamination + Lash Lifting. O combo das técnicas mais procuradas.',
      price: 'R$ 1400',
      includedCategories: ['Lash Lifting', 'Módulo 6: Brow Lamination'], 
      includedFeatures: ['Certificados', 'Apostila', 'Mentoria'],
      difficulty: 'Intermediário',
    },
    { 
      id: 13, 
      title: 'Combo: Brow Completo', 
      uniqueDescription: 'Todos os módulos de sobrancelhas (1 ao 6). A formação definitiva.',
      price: 'R$ 3000',
      includedCategories: ['Sobrancelhas - Iniciante', 'Módulo 4: Protocolo de Crescimento', 'Módulo 5: Brow Repair', 'Módulo 6: Brow Lamination'], 
      includedFeatures: ['Certificação Master', 'Apostila Completa', 'Mentoria', 'Suporte VIP'],
      difficulty: 'Iniciante ao Avançado',
    },
    { 
      id: 14, 
      title: 'O Império: VIP + Brow Completo', 
      uniqueDescription: 'Lash VIP + Brow Completo. A capacitação máxima para dominar o mercado.',
      price: 'R$ 5000',
      includedCategories: ['Técnica Lash', 'Gestão', 'Exclusivo VIP', 'Sobrancelhas - Iniciante', 'Módulo 4: Protocolo de Crescimento', 'Módulo 5: Brow Repair', 'Módulo 6: Brow Lamination', 'Lash Lifting'], 
      includedFeatures: ['Todos os Certificados', 'Mentoria VIP', 'Suporte Premium'],
      difficulty: 'Avançado',
    }
];

const courseInfoForAI = JSON.stringify(coursesData.map(c => ({
    title: c.title,
    description: c.uniqueDescription,
    price: c.price,
    features: c.includedCategories.concat(c.includedFeatures || []),
    target_audience: c.difficulty
})));

const systemInstruction = `Você é 'Luxy', a assistente virtual da Luxury Studio de Beleza. Você é amigável, elegante e especialista nos cursos de lash designer de Joyci Almeida. 
    Sua missão é tirar dúvidas e inspirar futuras alunas. Use as informações a seguir para basear suas respostas.
    
    **Informações dos Cursos:**
    ${courseInfoForAI}

    **Instruções:**
    1. Seja sempre cordial e motivadora. Use emojis de brilho ✨ e coração 💖 com moderação para manter um tom sofisticado.
    2. Responda perguntas sobre os cursos, preços, conteúdo e para quem cada um é indicado, usando os dados fornecidos.
    3. NÃO invente informações. Se não souber a resposta, diga "Essa é uma excelente pergunta! Para detalhes específicos, recomendo falar diretamente com a Joyci pelo WhatsApp. Ela terá o maior prazer em ajudar."
    4. Ao final de cada resposta útil, incentive a ação, por exemplo: "Ficou interessada? Clicar no botão 'Quero Ser VIP' é o próximo passo para transformar sua carreira!".
    5. Se perguntarem como se inscrever, instrua a pessoa a clicar no botão de CTA do curso desejado na página ou a entrar em contato pelo WhatsApp.
    6. Mantenha as respostas concisas e fáceis de ler. Se a primeira mensagem for 'Olá', responda com a sua saudação inicial.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    if (!process.env.API_KEY && !process.env.GEMINI_API_KEY) {
        console.error('API_KEY not found in environment variables.');
        res.status(500).json({ error: 'Internal Server Error', details: 'Server is missing API Key configuration.' });
        return;
    }
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

    try {
        const { message, history } = req.body;
        
        if (!message) {
            res.status(400).json({ error: 'Message is required' });
            return;
        }
        
        const ai = new GoogleGenAI({ apiKey });

        const chat: Chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: systemInstruction,
            },
            history: history || [], 
        });
        
        const response = await chat.sendMessage({ message });

        res.status(200).json({ 
            text: response.text,
            history: await chat.getHistory() 
        });

    } catch (error: any) {
        console.error('Error in Gemini API Call:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
