const TRANSLATIONS = {
    en: {
        languageModal: {
            title: "Welcome to CareLink+",
            subtitle: "Please choose your preferred language",
            button: "Continue in English"
        },
        ui: {
            title: "CareLink+",
            chatPlaceholder: "Type your message...",
            sendButton: "Send",
            loading: "Loading resources...",
            error: "Sorry, I couldn't load resources right now.",
            locationButton: "Find Resources Near Me",
            categoryButtons: {
                food: "Food Assistance",
                housing: "Housing",
                healthcare: "Healthcare",
                all: "Show All Resources"
            }
        },
        chatbot: {
            greeting: "Hi! I'm here to help you find resources in Columbus. You can ask me about food assistance, housing, healthcare, or other services.",
            foodResponse: "Here are food resources near you!",
            housingResponse: "Here are housing resources!",
            healthcareResponse: "Here are healthcare options!",
            defaultResponse: "I can help you find food, housing, or healthcare resources. What do you need help with?",
            locationSuccess: "Found your location! Showing nearby resources.",
            locationError: "Couldn't get your location. Showing all resources instead.",
            contactPrompt: "Would you like to speak with someone from our team? I can connect you with a volunteer."
        }
    },
    es: {
        languageModal: {
            title: "Bienvenido a CareLink+",
            subtitle: "Por favor, seleccione su idioma preferido",
            button: "Continuar en Español"
        },
        ui: {
            title: "CareLink+",
            chatPlaceholder: "Escriba su mensaje...",
            sendButton: "Enviar",
            loading: "Cargando recursos...",
            error: "Lo siento, no pude cargar recursos en este momento.",
            locationButton: "Encontrar Recursos Cerca de Mí",
            categoryButtons: {
                food: "Asistencia Alimentaria",
                housing: "Vivienda",
                healthcare: "Atención Médica",
                all: "Mostrar Todos los Recursos"
            }
        },
        chatbot: {
            greeting: "¡Hola! Estoy aquí para ayudarte a encontrar recursos en Columbus. Puedes preguntarme sobre asistencia alimentaria, vivienda, atención médica u otros servicios.",
            foodResponse: "¡Aquí están los recursos de comida cerca de ti!",
            housingResponse: "¡Aquí están los recursos de vivienda!",
            healthcareResponse: "¡Aquí están las opciones de atención médica!",
            defaultResponse: "Puedo ayudarte a encontrar recursos de comida, vivienda o atención médica. ¿Con qué necesitas ayuda?",
            locationSuccess: "¡Encontré tu ubicación! Mostrando recursos cercanos.",
            locationError: "No pude obtener tu ubicación. Mostrando todos los recursos en su lugar.",
            contactPrompt: "¿Te gustaría hablar con alguien de nuestro equipo? Puedo conectarte con un voluntario."
        }
    }
};

let currentLanguage = 'en';

function t(key) {
    const keys = key.split('.');
    let value = TRANSLATIONS[currentLanguage];
    
    for (const k of keys) {
        value = value?.[k];
    }
    
    return value || key;
}

function setLanguage(lang) {
    currentLanguage = lang;
    updateUILanguage();
    localStorage.setItem('carelink-language', lang);
}

function updateUILanguage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        el.textContent = t(key);
    });
    
    const placeholders = document.querySelectorAll('[data-translate-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        el.placeholder = t(key);
    });
}