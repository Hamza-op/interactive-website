import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import ThreeBackground from './components/atoms/ThreeBackground';
import LoadingSpinner from './components/atoms/LoadingSpinner';
import HeroSection from './components/organisms/HeroSection';
import ServicesSection from './components/organisms/ServicesSection';
import ContactSection from './components/organisms/ContactSection';
import './styles/globals.css';

function App() {
  const [loading, setLoading] = useState({
    isLoading: true,
    progress: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(prev => ({
        isLoading: prev.progress < 100,
        progress: Math.min(prev.progress + 10, 100),
      }));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-screen overflow-x-hidden bg-white dark:bg-studio-900">
        {loading.isLoading && <LoadingSpinner progress={loading.progress} />}
        <ThreeBackground />
        <main className="relative z-10 w-full overflow-x-hidden">
          <HeroSection />
          <ServicesSection />
          <ContactSection />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
