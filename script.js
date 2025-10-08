// JavaScript para Agente Pancho - ESPOCH

document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(13, 110, 253, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(13, 110, 253, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animación de entrada para las cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar todas las cards
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Funcionalidad de comandos especiales del chatbot
    function handleSpecialCommands(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hora') || lowerMessage.includes('tiempo')) {
            return `La hora actual es ${new Date().toLocaleTimeString('es-ES')}`;
        }
        
        if (lowerMessage.includes('fecha')) {
            return `Hoy es ${new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}`;
        }
        
        if (lowerMessage.includes('clima')) {
            return 'No tengo acceso a información meteorológica en tiempo real, pero puedes consultar el clima en sitios como weather.com';
        }
        
        return null;
    }

    // Mejorar la función getBotResponse
    const originalGetBotResponse = getBotResponse;
    getBotResponse = function(message) {
        const specialResponse = handleSpecialCommands(message);
        if (specialResponse) {
            return specialResponse;
        }
        return originalGetBotResponse(message);
    };

    // Easter eggs y respuestas divertidas
    const funResponses = {
        'como estas': '¡Estoy funcionando perfectamente! Gracias por preguntar. ¿Y tú cómo estás?',
        'que tal': '¡Todo excelente por aquí! ¿En qué puedo ayudarte?',
        'eres robot': 'Sí, soy un chatbot creado para ayudarte con información sobre ESPOCH. ¡Pero soy muy amigable! 🤖',
        'me gusta': '¡Me alegra saber eso! ¿Hay algo más en lo que pueda ayudarte?',
        'jaja': '¡Me alegra verte de buen humor! 😄',
        'genial': '¡Excelente! ¿Necesitas ayuda con algo más?'
    };

    // Agregar respuestas divertidas al objeto de respuestas
    Object.assign(botResponses, funResponses);

    // Integración con Dialogflow Messenger - Agente Pancho
    function initializePanchoAgent() {
        const dfMessenger = document.querySelector('df-messenger');
        if (dfMessenger) {
            // Configurar eventos del Agente Pancho
            dfMessenger.addEventListener('df-messenger-loaded', function() {
                console.log('🤖 Agente Pancho cargado y listo para ayudar!');
                addPanchoWelcomeEffect();
            });

            dfMessenger.addEventListener('df-chat-opened', function() {
                console.log('💬 Conversación con Pancho iniciada');
                // Efecto visual cuando se abre el chat
                addChatOpenEffect();
            });

            dfMessenger.addEventListener('df-chat-closed', function() {
                console.log('👋 Conversación con Pancho finalizada');
            });

            // Personalizar el messenger después de que cargue
            setTimeout(() => {
                customizePanchoAppearance();
            }, 2000);
        }
    }

    // Efectos visuales para Pancho
    function addPanchoWelcomeEffect() {
        const panchoIcon = document.querySelector('.pancho-icon');
        if (panchoIcon) {
            panchoIcon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                panchoIcon.style.transform = 'scale(1)';
            }, 300);
        }
    }

    function addChatOpenEffect() {
        document.body.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)';
        setTimeout(() => {
            document.body.style.background = '';
        }, 1000);
    }

    function customizePanchoAppearance() {
        const dfMessenger = document.querySelector('df-messenger');
        if (dfMessenger) {
            dfMessenger.style.transform = 'scale(1.05)';
            setTimeout(() => {
                dfMessenger.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // Notificación de bienvenida mejorada
    function showPanchoWelcomeNotification() {
        const notification = document.createElement('div');
        notification.className = 'position-fixed top-0 end-0 p-3';
        notification.style.zIndex = '1060';
        notification.innerHTML = `
            <div class="toast show pancho-notification" role="alert">
                <div class="toast-header">
                    <i class="bi bi-robot me-2"></i>
                    <strong class="me-auto">🤖 Agente Pancho</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    <strong>¡Hola! 👋</strong><br>
                    Soy Pancho, tu asistente IA personalizado para ESPOCH.<br>
                    <small class="opacity-75">Haz clic en el botón azul para comenzar 💬</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove después de 10 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutUp 0.5s ease-in';
                setTimeout(() => notification.remove(), 500);
            }
        }, 10000);

        // Agregar efecto de cierre manual
        const closeBtn = notification.querySelector('.btn-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutUp 0.5s ease-in';
            setTimeout(() => notification.remove(), 500);
        });
    }

    // Inicializar Agente Pancho con efectos especiales
    setTimeout(() => {
        initializePanchoAgent();
        // Mostrar notificación de bienvenida después de 2 segundos
        setTimeout(showPanchoWelcomeNotification, 2000);
    }, 1000);

    // Efectos especiales para la página
    function addPageInteractivity() {
        // Efecto hover en las feature items
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px) scale(1.02)';
            });
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
            });
        });

        // Efecto de click en el CTA
        const ctaCard = document.querySelector('.cta-card');
        if (ctaCard) {
            ctaCard.addEventListener('click', function() {
                // Scroll hacia el chatbot flotante
                const dfMessenger = document.querySelector('df-messenger');
                if (dfMessenger) {
                    dfMessenger.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    // Simular click en el botón después de un delay
                    setTimeout(() => {
                        const chatBubble = dfMessenger.querySelector('df-messenger-chat-bubble');
                        if (chatBubble) {
                            chatBubble.click();
                        }
                    }, 1000);
                }
            });
            ctaCard.style.cursor = 'pointer';
            ctaCard.title = 'Haz clic para abrir el chat con Pancho';
        }
    }

    // Agregar interactividad a la página
    addPageInteractivity();

    console.log('🚀 Agente Pancho - Sistema inicializado correctamente!');
});
