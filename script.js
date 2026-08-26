/* ==========================================================================
   AL MASSRIYA AL EMARATIYA - LOCAL AI CHATBOT ENGINE (RELIABLE OVERRIDE)
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

    // استدعاء العناصر الأصلية من الواجهة
    const oldToggle = document.getElementById('chat-toggle');
    const oldClose = document.getElementById('chat-close');
    const oldSend = document.getElementById('chat-send');
    const oldInput = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');
    const chatBody = document.getElementById('chat-body');

    // استنساخ العناصر لإلغاء أي مستمعين (EventListeners) قدامى من ملف main.js
    let chatToggle = oldToggle;
    let chatClose = oldClose;
    let chatSend = oldSend;
    let chatInput = oldInput;

    if (oldToggle) {
        chatToggle = oldToggle.cloneNode(true);
        oldToggle.parentNode.replaceChild(chatToggle, oldToggle);
    }
    if (oldClose) {
        chatClose = oldClose.cloneNode(true);
        oldClose.parentNode.replaceChild(chatClose, oldClose);
    }
    if (oldSend) {
        chatSend = oldSend.cloneNode(true);
        oldSend.parentNode.replaceChild(chatSend, oldSend);
    }
    if (oldInput) {
        chatInput = oldInput.cloneNode(true);
        oldInput.parentNode.replaceChild(chatInput, oldInput);
    }

    // تصفية ومعالجة الردود بناءً على الكلمات المفتاحية
    function generateResponse(userInput) {
        const text = userInput.toLowerCase().trim();
        if (!text) return "";

        let bestMatch = null;
        let highestScore = 0;

        // البحث في القاموس المتوفر داخل data.json
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

        // إرجاع الرد المطابق في حال العثور عليه
        if (highestScore > 0 && bestMatch) {
            const index = Math.floor(Math.random() * bestMatch.responses.length);
            return bestMatch.responses[index];
        } else {
            // استخدام الردود البديلة في حال عدم العثور على كلمات مفتاحية مناسبة
            const fallbacks = chatbotData.fallbacks || [
                "Connection established. How may we assist your operations today?"
            ];
            const index = Math.floor(Math.random() * fallbacks.length);
            return fallbacks[index];
        }
    }

    // عرض الرسائل في صندوق المحادثة
    function appendChatMessage(messageText, senderType) {
        if (!chatBody) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${senderType}`;
        msgDiv.innerHTML = `<p>${escapeHTML(messageText)}</p>`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // منع تشغيل نصوص برمجية ضارة داخل الرسائل
    function escapeHTML(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // معالجة الرسالة الصادرة من المستخدم
    function processUserMessage() {
        if (!chatInput) return;
        const userText = chatInput.value.trim();
        if (!userText) return;

        // إضافة رسالة المستخدم إلى واجهة المحادثة
        appendChatMessage(userText, 'outgoing');
        chatInput.value = '';

        // رد الروبوت بعد تأخير بسيط لمحاكاة الواقعية
        setTimeout(() => {
            const botReply = generateResponse(userText);
            appendChatMessage(botReply, 'incoming');
        }, 500);
    }

    // إعادة ربط أحداث التحكم بالنافذة بعد الاستنساخ
    if (chatToggle && chatBox) {
        chatToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            chatBox.classList.toggle('active');
        });
    }

    if (chatClose && chatBox) {
        chatClose.addEventListener('click', (e) => {
            e.stopPropagation();
            chatBox.classList.remove('active');
        });
    }

    if (chatSend && chatInput) {
        chatSend.addEventListener('click', processUserMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                processUserMessage();
            }
        });
    }
});
