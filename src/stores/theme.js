import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDarkMode = ref(false);

  // Actions
  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
    
    // Apply theme to body element
    if (isDarkMode.value) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  // Initialize theme based on user preference or system setting
  function initTheme() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      isDarkMode.value = true;
      document.body.classList.add('dark-mode');
    } else if (savedTheme === 'light') {
      isDarkMode.value = false;
      document.body.classList.remove('dark-mode');
    } else {
      // Check system preference if no saved preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDarkMode.value = prefersDark;
      if (prefersDark) {
        document.body.classList.add('dark-mode');
      }
    }
  }

  // Save theme preference to localStorage
  function saveThemePreference() {
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
  }

  return {
    isDarkMode,
    toggleTheme,
    initTheme,
    saveThemePreference
  };
});