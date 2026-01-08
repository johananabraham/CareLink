// Internationalization (i18n) framework for Carelink+

class I18nManager {
  constructor() {
    this.currentLanguage = 'en'; // Default to English
    this.translations = window.TRANSLATIONS || {};
    this.languageInfo = window.LANGUAGE_INFO || {};
    this.listeners = [];
    
    // Initialize from localStorage or browser preference
    this.initializeLanguage();
  }

  // Initialize language from stored preference or browser settings
  initializeLanguage() {
    // Check localStorage first
    const storedLang = localStorage.getItem('carelink_language');
    if (storedLang && this.translations[storedLang]) {
      this.currentLanguage = storedLang;
      return;
    }

    // Check browser language
    const browserLang = navigator.language.slice(0, 2);
    if (this.translations[browserLang]) {
      this.currentLanguage = browserLang;
      return;
    }

    // Check for Spanish speakers (common in Columbus)
    if (navigator.languages) {
      for (let lang of navigator.languages) {
        const langCode = lang.slice(0, 2);
        if (this.translations[langCode]) {
          this.currentLanguage = langCode;
          return;
        }
      }
    }
  }

  // Get translation for a key with parameter interpolation
  t(key, params = {}) {
    try {
      // Navigate through nested object using dot notation
      const keys = key.split('.');
      let value = this.translations[this.currentLanguage];
      
      for (let k of keys) {
        if (value && value[k] !== undefined) {
          value = value[k];
        } else {
          // Fallback to English
          value = this.translations.en;
          for (let k of keys) {
            if (value && value[k] !== undefined) {
              value = value[k];
            } else {
              return `[Missing: ${key}]`;
            }
          }
          break;
        }
      }

      // Handle parameter interpolation
      if (typeof value === 'string' && Object.keys(params).length > 0) {
        return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
          return params[paramKey] !== undefined ? params[paramKey] : match;
        });
      }

      return value || `[Missing: ${key}]`;
    } catch (error) {
      console.error('Translation error for key:', key, error);
      return `[Error: ${key}]`;
    }
  }

  // Set new language and notify listeners
  setLanguage(langCode) {
    if (!this.translations[langCode]) {
      console.error('Language not supported:', langCode);
      return false;
    }

    this.currentLanguage = langCode;
    localStorage.setItem('carelink_language', langCode);
    localStorage.setItem('carelink_has_visited', 'true'); // Mark that user has visited and chosen language
    
    // Update document direction for RTL languages
    document.dir = this.getLanguageDirection();
    document.documentElement.lang = langCode;
    
    // Notify all listeners
    this.notifyListeners();
    
    return true;
  }

  // Get current language code
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Get language direction (ltr/rtl)
  getLanguageDirection() {
    return this.languageInfo[this.currentLanguage]?.dir || 'ltr';
  }

  // Get language display name in native script
  getLanguageDisplayName(langCode = null) {
    const lang = langCode || this.currentLanguage;
    return this.languageInfo[lang]?.nativeName || this.languageInfo[lang]?.name || lang;
  }

  // Get available languages for selection
  getAvailableLanguages() {
    return Object.keys(this.translations).map(code => ({
      code,
      name: this.languageInfo[code]?.name || code,
      nativeName: this.languageInfo[code]?.nativeName || code,
      flag: this.languageInfo[code]?.flag || '🌐',
      dir: this.languageInfo[code]?.dir || 'ltr'
    }));
  }

  // Add listener for language changes
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  // Notify all listeners of language change
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.currentLanguage);
      } catch (error) {
        console.error('Error in language change listener:', error);
      }
    });
  }

  // Check if we should show language selection modal
  shouldShowLanguageModal() {
    // Always show language modal on first visit, regardless of browser language
    // This ensures users explicitly choose their language preference
    const hasVisited = localStorage.getItem('carelink_has_visited');
    const hasLanguagePreference = localStorage.getItem('carelink_language');
    
    // Show modal if user hasn't visited before OR hasn't set language preference
    return !hasVisited || !hasLanguagePreference;
  }

  // Format pluralization based on count
  formatPlural(count, category) {
    if (this.currentLanguage === 'en') {
      return count > 1 ? 's' : '';
    }
    if (this.currentLanguage === 'es') {
      return count > 1 ? 's' : '';
    }
    if (this.currentLanguage === 'ar') {
      // Arabic has complex pluralization rules
      if (count === 1) return '';
      if (count === 2) return 'ين';
      if (count >= 3 && count <= 10) return 'ات';
      return '';
    }
    // Default for other languages
    return '';
  }
}

// Create global instance
window.i18n = new I18nManager();

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = I18nManager;
}