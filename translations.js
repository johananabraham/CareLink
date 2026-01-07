// Translation data for Carelink+ internationalization
const TRANSLATIONS = {
  en: {
    // App title and headers
    appTitle: "Carelink+",
    pageTitle: "Carelink+ - Community Resource Finder",
    
    // Language selection modal
    languageModal: {
      title: "Welcome to Carelink+",
      subtitle: "Please select your preferred language",
      selectButton: "Continue in {language}",
      close: "Close"
    },
    
    // Main UI elements
    ui: {
      chatPlaceholder: "Type your message...",
      sendButton: "Send",
      mapTitle: "Resource Locations",
      loading: "Loading...",
      error: "An error occurred. Please try again."
    },
    
    // Location services
    location: {
      servicesTitle: "Location Services:",
      enableNearMe: "Enable \"Near Me\"",
      nearMeActive: "✓ \"Near Me\" Active",
      yourLocation: "Your Location",
      accuracy: "Accuracy"
    },
    
    // Forms
    forms: {
      helpFormTitle: "Request Personal Assistance",
      helpFormSubtitle: "We'll connect you with someone who can provide personalized help",
      step1Title: "Basic Information",
      step2Title: "Location & Your Needs", 
      step3Title: "Additional Details",
      fullName: "Full Name *",
      fullNamePlaceholder: "Enter your full name",
      phoneNumber: "Phone Number *",
      phoneNumberPlaceholder: "(555) 123-4567",
      email: "Email Address (Optional)",
      emailPlaceholder: "your.email@example.com",
      address: "Address/ZIP Code *",
      addressPlaceholder: "Street address or ZIP code",
      helpCategory: "What do you need help with? *",
      selectCategory: "-- Select a category --",
      other: "Other",
      helpDescription: "Describe your situation *",
      helpDescriptionPlaceholder: "Please describe what kind of help you need...",
      urgency: "How urgent is your need? *",
      selectUrgency: "-- Select urgency level --",
      emergency: "Emergency (Need help today)",
      urgent: "Urgent (Need help within a week)",
      moderate: "Moderate (Need help within a month)",
      low: "Low priority (Just exploring options)",
      contactTime: "Best time to contact you",
      anytime: "Anytime",
      morning: "Morning (8AM - 12PM)",
      afternoon: "Afternoon (12PM - 5PM)",
      evening: "Evening (5PM - 8PM)",
      additionalNotes: "Additional Notes (Optional)",
      additionalNotesPlaceholder: "Any other information that might help us assist you...",
      privacyNotice: "🔒 Your information will be kept confidential and only used to connect you with appropriate resources and assistance.",
      back: "Back",
      cancel: "Cancel",
      next: "Next",
      submit: "Submit Request",
      validationRequired: "This field is required",
      validationEmail: "Please enter a valid email address",
      validationPhone: "Please enter a valid phone number"
    },
    
    // Bot responses
    bot: {
      welcome: "I can help you find resources for food, housing, healthcare, mental health, substance use treatment, employment, veteran services, or crisis support. What do you need help with?",
      searchingResources: "Looking for {category} resources in your area...",
      resourcesFound: "Found {count} {category} resource{plural} near you! Check the map above to see their locations. Click on any marker for more details.",
      noResourcesFound: "I'm sorry, I couldn't find any mappable {category} resources in your area right now. This might be because:\n\n• The resources don't have location coordinates yet\n• They may be listed under a different category name\n• The data is still being updated\n\nYou can try asking for a different type of assistance, or check back later.",
      clarificationPrefix: "Great! Looking for {category} resources in your area...",
      needMoreInfo: "I want to make sure I understand what you need. Could you tell me more specifically what kind of help you're looking for?",
      feedbackPrompt: "Was this helpful? Did you find what you were looking for?",
      feedbackYes: "Yes, this helped!",
      feedbackNo: "I need more assistance",
      feedbackThankYou: "Great! We're glad we could help.",
      offerPersonalHelp: "Let us connect you with someone who can provide personal assistance.",
      noResourcesOffer: "Since we couldn't find the right resources, would you like us to connect you with someone who can help personally?"
    },
    
    // Clarification questions
    clarifications: {
      Food: "It sounds like you might need food assistance. Would you like to see food pantries, soup kitchens, or meal programs?",
      Housing: "Are you looking for emergency shelter, housing assistance, or help with rent?",
      Healthcare: "Do you need medical care, dental services, or help finding health insurance?",
      "Mental Health": "Are you interested in counseling, therapy, or mental health support services?",
      "Substance Use": "Are you looking for detox services, recovery programs, or ongoing addiction support?",
      Employment: "Would you like job training, resume help, or employment placement services?",
      Veterans: "Are you looking for VA benefits, veteran housing, or veteran healthcare services?",
      Crisis: "Do you need immediate crisis support, a suicide hotline, or emergency assistance?"
    },
    
    // Categories
    categories: {
      Food: "food",
      Housing: "housing", 
      Healthcare: "healthcare",
      "Mental Health": "mental health",
      "Substance Use": "substance use",
      Crisis: "crisis",
      Employment: "employment",
      Veterans: "veterans"
    },
    
    // Map popup labels
    mapPopup: {
      name: "Name",
      description: "Description",
      location: "Location",
      phone: "Phone",
      website: "Website",
      hours: "Hours"
    }
  },

  es: {
    // App title and headers
    appTitle: "Carelink+",
    pageTitle: "Carelink+ - Buscador de Recursos Comunitarios",
    
    // Language selection modal
    languageModal: {
      title: "Bienvenido a Carelink+",
      subtitle: "Por favor selecciona tu idioma preferido",
      selectButton: "Continuar en {language}",
      close: "Cerrar"
    },
    
    // Main UI elements
    ui: {
      chatPlaceholder: "Escribe tu mensaje...",
      sendButton: "Enviar",
      mapTitle: "Ubicaciones de Recursos",
      loading: "Cargando...",
      error: "Ocurrió un error. Por favor inténtalo de nuevo."
    },
    
    // Location services
    location: {
      servicesTitle: "Servicios de Ubicación:",
      enableNearMe: "Activar \"Cerca de Mí\"",
      nearMeActive: "✓ \"Cerca de Mí\" Activo",
      yourLocation: "Tu Ubicación",
      accuracy: "Precisión"
    },
    
    // Forms
    forms: {
      helpFormTitle: "Solicitar Asistencia Personal",
      helpFormSubtitle: "Te conectaremos con alguien que pueda brindarte ayuda personalizada",
      step1Title: "Información Básica",
      step2Title: "Ubicación y Tus Necesidades",
      step3Title: "Detalles Adicionales",
      fullName: "Nombre Completo *",
      fullNamePlaceholder: "Ingresa tu nombre completo",
      phoneNumber: "Número de Teléfono *",
      phoneNumberPlaceholder: "(555) 123-4567",
      email: "Correo Electrónico (Opcional)",
      emailPlaceholder: "tu.correo@ejemplo.com",
      address: "Dirección/Código Postal *",
      addressPlaceholder: "Dirección o código postal",
      helpCategory: "¿Con qué necesitas ayuda? *",
      selectCategory: "-- Selecciona una categoría --",
      other: "Otro",
      helpDescription: "Describe tu situación *",
      helpDescriptionPlaceholder: "Por favor describe qué tipo de ayuda necesitas...",
      urgency: "¿Qué tan urgente es tu necesidad? *",
      selectUrgency: "-- Selecciona nivel de urgencia --",
      emergency: "Emergencia (Necesito ayuda hoy)",
      urgent: "Urgente (Necesito ayuda en una semana)",
      moderate: "Moderado (Necesito ayuda en un mes)",
      low: "Prioridad baja (Solo explorando opciones)",
      contactTime: "Mejor hora para contactarte",
      anytime: "Cualquier hora",
      morning: "Mañana (8AM - 12PM)",
      afternoon: "Tarde (12PM - 5PM)",
      evening: "Noche (5PM - 8PM)",
      additionalNotes: "Notas Adicionales (Opcional)",
      additionalNotesPlaceholder: "Cualquier otra información que nos ayude a asistirte...",
      privacyNotice: "🔒 Tu información será confidencial y solo se usará para conectarte con recursos y asistencia apropiados.",
      back: "Atrás",
      cancel: "Cancelar",
      next: "Siguiente",
      submit: "Enviar Solicitud",
      validationRequired: "Este campo es obligatorio",
      validationEmail: "Por favor ingresa un correo electrónico válido",
      validationPhone: "Por favor ingresa un número de teléfono válido"
    },
    
    // Bot responses
    bot: {
      welcome: "Puedo ayudarte a encontrar recursos para alimentación, vivienda, atención médica, salud mental, tratamiento de sustancias, empleo, servicios para veteranos, o apoyo en crisis. ¿Con qué necesitas ayuda?",
      searchingResources: "Buscando recursos de {category} en tu área...",
      resourcesFound: "¡Encontré {count} recurso{plural} de {category} cerca de ti! Revisa el mapa arriba para ver sus ubicaciones. Haz clic en cualquier marcador para más detalles.",
      noResourcesFound: "Lo siento, no pude encontrar recursos de {category} mapeables en tu área ahora mismo. Esto puede ser porque:\n\n• Los recursos aún no tienen coordenadas de ubicación\n• Pueden estar listados bajo un nombre de categoría diferente\n• Los datos aún se están actualizando\n\nPuedes intentar preguntar por un tipo diferente de asistencia, o volver a intentar más tarde.",
      clarificationPrefix: "¡Perfecto! Buscando recursos de {category} en tu área...",
      needMoreInfo: "Quiero asegurarme de entender lo que necesitas. ¿Podrías decirme más específicamente qué tipo de ayuda buscas?",
      feedbackPrompt: "¿Esto te ayudó? ¿Encontraste lo que estabas buscando?",
      feedbackYes: "¡Sí, esto me ayudó!",
      feedbackNo: "Necesito más asistencia",
      feedbackThankYou: "¡Excelente! Nos alegra haber podido ayudarte.",
      offerPersonalHelp: "Permítenos conectarte con alguien que pueda brindarte asistencia personal.",
      noResourcesOffer: "Como no pudimos encontrar los recursos adecuados, ¿te gustaría que te conectemos con alguien que pueda ayudarte personalmente?"
    },
    
    // Clarification questions
    clarifications: {
      Food: "Parece que podrías necesitar asistencia alimentaria. ¿Te gustaría ver bancos de alimentos, comedores populares, o programas de comidas?",
      Housing: "¿Buscas refugio de emergencia, asistencia de vivienda, o ayuda con el alquiler?",
      Healthcare: "¿Necesitas atención médica, servicios dentales, o ayuda para encontrar seguro médico?",
      "Mental Health": "¿Te interesan servicios de consejería, terapia, o apoyo de salud mental?",
      "Substance Use": "¿Buscas servicios de desintoxicación, programas de recuperación, o apoyo continuo para adicciones?",
      Employment: "¿Te gustaría capacitación laboral, ayuda con currículum, o servicios de colocación laboral?",
      Veterans: "¿Buscas beneficios de VA, vivienda para veteranos, o servicios de atención médica para veteranos?",
      Crisis: "¿Necesitas apoyo inmediato en crisis, una línea de crisis, o asistencia de emergencia?"
    },
    
    // Categories
    categories: {
      Food: "alimentación",
      Housing: "vivienda", 
      Healthcare: "atención médica",
      "Mental Health": "salud mental",
      "Substance Use": "abuso de sustancias",
      Crisis: "crisis",
      Employment: "empleo",
      Veterans: "veteranos"
    },
    
    // Map popup labels
    mapPopup: {
      name: "Nombre",
      description: "Descripción",
      location: "Ubicación",
      phone: "Teléfono",
      website: "Sitio web",
      hours: "Horario"
    }
  },

  so: {
    // App title and headers (Somali)
    appTitle: "Carelink+",
    pageTitle: "Carelink+ - Raadiye Agabka Bulshada",
    
    // Language selection modal
    languageModal: {
      title: "Ku soo dhawow Carelink+",
      subtitle: "Fadlan dooro luqadda aad door bidaysid",
      selectButton: "Ku sii wad {language}",
      close: "Xidh"
    },
    
    // Main UI elements
    ui: {
      chatPlaceholder: "Qor fariintaada...",
      sendButton: "Dir",
      mapTitle: "Goobaha Agabka",
      loading: "Waa la shubayaa...",
      error: "Qalad ayaa dhacay. Fadlan mar kale isku day."
    },
    
    // Location services
    location: {
      servicesTitle: "Adeegyada Goobta:",
      enableNearMe: "Daar \"Ii Dhow\"",
      nearMeActive: "✓ \"Ii Dhow\" La Daray",
      yourLocation: "Goobtagaaga",
      accuracy: "Saxnaanta"
    },
    
    // Bot responses
    bot: {
      welcome: "Waxaan kaa caawin karaa in aad hesho agab loogu talagalay cunto, guri, daryeel caafimaad, caafimaadka maskaxda, daawaynta isticmaalka daroogada, shaqo, adeegyada askarta, ama taageerada xiisadaha. Maxaad u baahan tahay caawimo?",
      searchingResources: "Waan baadhayaa agabka {category} ee agagaaga ku yaal...",
      resourcesFound: "Waxaan helay {count} agab {category} oo ku dhow! Fiiri khariidadda kor ku taal si aad u aragto meelaha ay ku yaalliin. Gujii calaamad kasta si aad faahfaahin u hesho.",
      noResourcesFound: "Waan ka xunnahay, ma heli karo agab {category} oo khariidadda lagu saari karo oo agagaaga ah hadda. Taani waxay noqon kartaa sababtoo ah:\n\n• Agabku wali ma haysto tirtiro goob\n• Waxay u badan tahay inay ku qoran yihiin magac kale\n• Xogta wali waa la cusboneysiiinayaa\n\nWaxaad tijaabi kartaa inaad weydiiso caawimo kale, ama dib ugu soo noqo mar dambe.",
      clarificationPrefix: "Fiican! Waan raadiyaa agabka {category} ee agagaaga ku yaal...",
      needMoreInfo: "Waxaan doonayaa inaan hubsado waxa aad u baahan tahay. Miyaad ii sheegi kartaa si tafatiran waxa aad raadinayso?",
      feedbackPrompt: "Tani miyey kaa caawinay? Miyaad heeshay waxa aad raadinaysay?",
      feedbackYes: "Haa, tani wey i caawinay!",
      feedbackNo: "Waxaan u baahanahay caawimo dheeraad ah",
      feedbackThankYou: "Fiican! Waan ku faraxsan nahay inaan ku caawin karney.",
      offerPersonalHelp: "Waxaan kuu ogolaaneyn in aan ku xidhno qof ku siinaya caawimo shakhsi ah.",
      noResourcesOffer: "Maadaama aanan ka helin agabkii saxda ahaa, miyaad jeclaanahayd inaan ku xidhno qof ku caawin kara si shakhsi ah?"
    },
    
    // Clarification questions
    clarifications: {
      Food: "Waxay umuuqataa inaad u baahan tahay caawimo cunto. Miyaad jeclaan lahayd inaad aragto bangiyada cuntada, matbakhyada guud, ama barnaamijyada cuntada?",
      Housing: "Miyaad raadinaysaa meel galabni ah oo degdeg ah, caawimo guri, ama caawimo kiro?",
      Healthcare: "Miyaad u baahan tahay daryeel caafimaad, adeegyada ilkaha, ama caawimo si aad u hesho caymis caafimaad?",
      "Mental Health": "Miyaad xiisaynaysaa adeegyada la-talinta, daaweynta, ama taageerada caafimaadka maskaxda?",
      "Substance Use": "Miyaad raadinaysaa adeegyada nadiifeynta jidhka, barnaamijyada soo kabashadhka, ama taageero joogto ah ee iska-ceejinta?",
      Employment: "Miyaad jeclaan lahayd tababar shaqo, caawimo resume, ama adeegyada heleynta shaqo?",
      Veterans: "Miyaad raadinaysaa faa'iidooyinka VA, guri askari, ama adeegyada daryeelka caafimaadka askarta?",
      Crisis: "Miyaad u baahan tahay taageero degdeg ah oo xiisad ah, khadka xiisadaha, ama caawimo degdeg ah?"
    },
    
    // Categories
    categories: {
      Food: "cunto",
      Housing: "guri", 
      Healthcare: "daryeel caafimaad",
      "Mental Health": "caafimaadka maskaxda",
      "Substance Use": "isticmaalka daroogada",
      Crisis: "xiisad",
      Employment: "shaqo",
      Veterans: "askarta hore"
    },
    
    // Map popup labels
    mapPopup: {
      name: "Magaca",
      description: "Sharaxaad",
      location: "Goob",
      phone: "Telefoon",
      website: "Bogga internetka",
      hours: "Saacadaha"
    }
  },

  ar: {
    // App title and headers (Arabic)
    appTitle: "Carelink+",
    pageTitle: "Carelink+ - محدد موارد المجتمع",
    
    // Language selection modal
    languageModal: {
      title: "مرحباً بك في Carelink+",
      subtitle: "يرجى اختيار لغتك المفضلة",
      selectButton: "المتابعة باللغة {language}",
      close: "إغلاق"
    },
    
    // Main UI elements
    ui: {
      chatPlaceholder: "اكتب رسالتك...",
      sendButton: "إرسال",
      mapTitle: "مواقع الموارد",
      loading: "جاري التحميل...",
      error: "حدث خطأ. يرجى المحاولة مرة أخرى."
    },
    
    // Location services
    location: {
      servicesTitle: "خدمات الموقع:",
      enableNearMe: "تفعيل \"بالقرب مني\"",
      nearMeActive: "✓ \"بالقرب مني\" مفعل",
      yourLocation: "موقعك",
      accuracy: "الدقة"
    },
    
    // Bot responses
    bot: {
      welcome: "يمكنني مساعدتك في العثور على موارد للطعام والإسكان والرعاية الصحية والصحة النفسية وعلاج تعاطي المواد والتوظيف وخدمات المحاربين القدامى أو دعم الأزمات. بماذا تحتاج المساعدة؟",
      searchingResources: "البحث عن موارد {category} في منطقتك...",
      resourcesFound: "تم العثور على {count} مورد {category} بالقرب منك! تحقق من الخريطة أعلاه لرؤية مواقعها. انقر على أي علامة للحصول على تفاصيل أكثر.",
      noResourcesFound: "أعتذر، لا يمكنني العثور على أي موارد {category} قابلة للرسم على الخريطة في منطقتك الآن. قد يكون هذا بسبب:\n\n• الموارد ليس لديها إحداثيات الموقع بعد\n• قد تكون مدرجة تحت اسم فئة مختلف\n• البيانات ما زالت يجري تحديثها\n\nيمكنك محاولة السؤال عن نوع مختلف من المساعدة، أو العودة لاحقاً.",
      clarificationPrefix: "ممتاز! البحث عن موارد {category} في منطقتك...",
      needMoreInfo: "أريد التأكد من فهم ما تحتاجه. هل يمكنك إخباري بشكل أكثر تحديداً عن نوع المساعدة التي تبحث عنها؟",
      feedbackPrompt: "هل كان هذا مفيداً؟ هل وجدت ما كنت تبحث عنه؟",
      feedbackYes: "نعم، هذا ساعدني!",
      feedbackNo: "أحتاج مساعدة أكثر",
      feedbackThankYou: "ممتاز! يسرنا أن نكون قد تمكنا من مساعدتك.",
      offerPersonalHelp: "دعنا نربطك بشخص يمكنه تقديم المساعدة الشخصية.",
      noResourcesOffer: "بما أننا لم نتمكن من العثور على الموارد المناسبة، هل تريد أن نربطك بشخص يمكنه مساعدتك شخصياً؟"
    },
    
    // Clarification questions
    clarifications: {
      Food: "يبدو أنك قد تحتاج إلى مساعدة غذائية. هل تود رؤية بنوك الطعام أو مطابخ الحساء أو برامج الوجبات؟",
      Housing: "هل تبحث عن مأوى طارئ أو مساعدة في الإسكان أو مساعدة في الإيجار؟",
      Healthcare: "هل تحتاج رعاية طبية أو خدمات أسنان أو مساعدة في العثور على تأمين صحي؟",
      "Mental Health": "هل أنت مهتم بخدمات الاستشارة أو العلاج أو خدمات دعم الصحة النفسية؟",
      "Substance Use": "هل تبحث عن خدمات إزالة السموم أو برامج التعافي أو الدعم المستمر للإدمان؟",
      Employment: "هل تود التدريب المهني أو مساعدة في السيرة الذاتية أو خدمات التوظيف؟",
      Veterans: "هل تبحث عن مزايا VA أو إسكان المحاربين القدامى أو خدمات الرعاية الصحية للمحاربين القدامى؟",
      Crisis: "هل تحتاج دعم أزمة فوري أو خط أزمة أو مساعدة طارئة؟"
    },
    
    // Categories
    categories: {
      Food: "طعام",
      Housing: "إسكان", 
      Healthcare: "رعاية صحية",
      "Mental Health": "صحة نفسية",
      "Substance Use": "تعاطي المواد",
      Crisis: "أزمة",
      Employment: "توظيف",
      Veterans: "محاربون قدامى"
    },
    
    // Map popup labels
    mapPopup: {
      name: "الاسم",
      description: "الوصف",
      location: "الموقع",
      phone: "الهاتف",
      website: "الموقع الإلكتروني",
      hours: "ساعات العمل"
    }
  },

  hi: {
    // App title and headers (Hindi)
    appTitle: "Carelink+",
    pageTitle: "Carelink+ - सामुदायिक संसाधन खोजक",
    
    // Language selection modal
    languageModal: {
      title: "Carelink+ में आपका स्वागत है",
      subtitle: "कृपया अपनी पसंदीदा भाषा चुनें",
      selectButton: "{language} में जारी रखें",
      close: "बंद करें"
    },
    
    // Main UI elements
    ui: {
      chatPlaceholder: "अपना संदेश लिखें...",
      sendButton: "भेजें",
      mapTitle: "संसाधन स्थान",
      loading: "लोड हो रहा है...",
      error: "एक त्रुटि हुई है। कृपया पुनः प्रयास करें।"
    },
    
    // Location services
    location: {
      servicesTitle: "स्थान सेवाएं:",
      enableNearMe: "\"मेरे पास\" सक्षम करें",
      nearMeActive: "✓ \"मेरे पास\" सक्रिय",
      yourLocation: "आपका स्थान",
      accuracy: "सटीकता"
    },
    
    // Bot responses
    bot: {
      welcome: "मैं आपको भोजन, आवास, स्वास्थ्य देखभाल, मानसिक स्वास्थ्य, पदार्थ उपयोग उपचार, रोजगार, वयोवृद्ध सेवाओं, या संकट सहायता के लिए संसाधन खोजने में मदद कर सकता हूं। आपको किस चीज़ में मदद चाहिए?",
      searchingResources: "आपके क्षेत्र में {category} संसाधन खोज रहे हैं...",
      resourcesFound: "आपके पास {count} {category} संसाधन मिले! उनके स्थानों को देखने के लिए ऊपर का नक्शा देखें। अधिक विवरण के लिए किसी भी मार्कर पर क्लिक करें।",
      noResourcesFound: "मुझे खुशी है, मैं आपके क्षेत्र में अभी कोई मानचित्र योग्य {category} संसाधन नहीं ढूंढ सका। यह इसलिए हो सकता है:\n\n• संसाधनों के पास अभी तक स्थान निर्देशांक नहीं हैं\n• वे एक अलग श्रेणी नाम के तहत सूचीबद्ध हो सकते हैं\n• डेटा अभी भी अपडेट हो रहा है\n\nआप एक अलग प्रकार की सहायता मांगने की कोशिश कर सकते हैं, या बाद में वापस आ सकते हैं।",
      clarificationPrefix: "बहुत बढ़िया! आपके क्षेत्र में {category} संसाधन खोज रहे हैं...",
      needMoreInfo: "मैं यह सुनिश्चित करना चाहता हूं कि मैं समझ गया हूं कि आपको क्या चाहिए। क्या आप मुझे और विशेष रूप से बता सकते हैं कि आप किस प्रकार की मदद की तलाश कर रहे हैं?",
      feedbackPrompt: "क्या यह सहायक था? क्या आपको वह मिला जिसकी आप तलाश कर रहे थे?",
      feedbackYes: "हां, इससे मदद मिली!",
      feedbackNo: "मुझे और सहायता चाहिए",
      feedbackThankYou: "बहुत बढ़िया! हमें खुशी है कि हम आपकी मदद कर सके।",
      offerPersonalHelp: "आइए हम आपको किसी ऐसे व्यक्ति से जोड़ते हैं जो व्यक्तिगत सहायता प्रदान कर सकता है।",
      noResourcesOffer: "चूंकि हम सही संसाधन नहीं ढूंढ सके, क्या आप चाहेंगे कि हम आपको किसी ऐसे व्यक्ति से जोड़ें जो व्यक्तिगत रूप से आपकी सहायता कर सकता है?"
    },
    
    // Clarification questions
    clarifications: {
      Food: "ऐसा लगता है कि आपको भोजन सहायता की आवश्यकता हो सकती है। क्या आप फूड बैंक, सूप किचन, या भोजन कार्यक्रम देखना चाहेंगे?",
      Housing: "क्या आप आपातकालीन आश्रय, आवास सहायता, या किराए में मदद की तलाश कर रहे हैं?",
      Healthcare: "क्या आपको चिकित्सा देखभाल, दंत सेवाओं, या स्वास्थ्य बीमा खोजने में मदद चाहिए?",
      "Mental Health": "क्या आप परामर्श, चिकित्सा, या मानसिक स्वास्थ्य सहायता सेवाओं में रुचि रखते हैं?",
      "Substance Use": "क्या आप डिटॉक्स सेवाओं, रिकवरी प्रोग्राम, या निरंतर लत समर्थन की तलाश कर रहे हैं?",
      Employment: "क्या आप नौकरी प्रशिक्षण, रिज्यूमे मदद, या रोजगार नियुक्ति सेवाओं को पसंद करेंगे?",
      Veterans: "क्या आप VA लाभ, वयोवृद्ध आवास, या वयोवृद्ध स्वास्थ्य देखभाल सेवाओं की तलाश कर रहे हैं?",
      Crisis: "क्या आपको तत्काल संकट सहायता, एक संकट हॉटलाइन, या आपातकालीन सहायता चाहिए?"
    },
    
    // Categories
    categories: {
      Food: "भोजन",
      Housing: "आवास", 
      Healthcare: "स्वास्थ्य देखभाल",
      "Mental Health": "मानसिक स्वास्थ्य",
      "Substance Use": "पदार्थ उपयोग",
      Crisis: "संकट",
      Employment: "रोजगार",
      Veterans: "पूर्व सैनिक"
    },
    
    // Map popup labels
    mapPopup: {
      name: "नाम",
      description: "विवरण",
      location: "स्थान",
      phone: "फोन",
      website: "वेबसाइट",
      hours: "घंटे"
    }
  }
};

// Language metadata
const LANGUAGE_INFO = {
  en: { name: "English", nativeName: "English", flag: "🇺🇸", dir: "ltr" },
  es: { name: "Spanish", nativeName: "Español", flag: "🇪🇸", dir: "ltr" },
  so: { name: "Somali", nativeName: "Soomaali", flag: "🇸🇴", dir: "ltr" },
  ar: { name: "Arabic", nativeName: "العربية", flag: "🇸🇦", dir: "rtl" },
  hi: { name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", dir: "ltr" }
};

// Make available globally
window.TRANSLATIONS = TRANSLATIONS;
window.LANGUAGE_INFO = LANGUAGE_INFO;