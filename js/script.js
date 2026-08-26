/* ==========================================================================
   AL MASSRIYA AL EMARATIYA - LOCAL AI CHATBOT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    let chatbotData = { intents: [], fallbacks: [] };

    // جلب ملف البيانات المحلي
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Database connection issue');
            }
            return response.json();
        })
        .then(data => {
            chatbotData = data;
        })
        .catch(error => {
            console.warn('Chatbot data could not be fully loaded. Using inline fallbacks.', error);
        });

    // عناصر واجهة المستخدم للمحادثة
    const chatToggle = document.getElementById('chat-toggle');
    const chatBox = document.getElementById('chat-box');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatBody = document.getElementById('chat-body');

    // تصفية ومعالجة الردود بناءً على الكلمات المفتاحية
    function generateResponse(userInput) {
        const text = userInput.toLowerCase().trim();
        if (!text) return "";

        let bestMatch = null;
        let highestScore = 0;

        // البحث في نوايا وقواعد البيانات المتوفرة
        if (chatbotData.intents && chatbotData.intents.length > 0) {
            chatbotData.intents.forEach(intent => {
                let score = 0;
                intent.keywords.forEach(keyword => {
                    if (text.includes(keyword.toLowerCase())) {
                        score += 1;
                    }
                });

                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = intent;
                }
            });
        }

        // إرجاع الرد المطابق أو رد بديل عشوائي
        if (highestScore > 0 && bestMatch) {
            const index = Math.floor(Math.random() * bestMatch.responses.length);
            return bestMatch.responses[index];
        } else {
            const fallbacks = chatbotData.fallbacks || [
                "Connection established. How may we assist your operations today?"
            ];
            const index = Math.floor(Math.random() * fallbacks.length);
            return fallbacks[index];
        }
    }

    // إرسال وعرض الرسائل داخل النافذة
    function appendChatMessage(messageText, senderType) {
        if (!chatBody) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${senderType}`;
        msgDiv.innerHTML = `<p>${escapeHTML(messageText)}</p>`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // تنظيف النصوص لمنع ثغرات حقن الأكواد
    function escapeHTML(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function processUserMessage() {
        if (!chatInput) return;
        const userText = chatInput.value.trim();
        if (!userText) return;

        // إضافة رسالة المستخدم للواجهة
        appendChatMessage(userText, 'outgoing');
        chatInput.value = '';

        // تأخير بسيط لمحاكاة التفكير البشري للمساعد
        setTimeout(() => {
            const botReply = generateResponse(userText);
            appendChatMessage(botReply, 'incoming');
        }, 600);
    }

    // ربط مستمعي الأحداث البرمجية
    if (chatToggle && chatBox) {
        // فك ارتباط أي مستمعين سابقين قد يتعارضون مع هذا السلوك
        const newChatToggle = chatToggle.cloneNode(true);
        chatToggle.parentNode.replaceChild(newChatToggle, chatToggle);

        newChatToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            chatBox.classList.toggle('active');
        });

        // ربط زر الإغلاق
        if (chatClose) {
            chatClose.addEventListener('click', (e) => {
                e.stopPropagation();
                chatBox.classList.remove('active');
            });
        }

        // إرسال الرسالة عند النقر أو الضغط على مفتاح Enter
        if (chatSend && chatInput) {
            chatSend.addEventListener('click', processUserMessage);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    processUserMessage();
                }
            });
        }
    }
});
