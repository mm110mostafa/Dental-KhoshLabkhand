import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingActions } from "./components/FloatingActions";
import { BookingModal } from "./components/BookingModal";
import { ServiceDetailModal } from "./components/ServiceDetailModal";
import { SearchOverlay } from "./components/SearchOverlay";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { DoctorsPage } from "./pages/DoctorsPage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ServiceItem } from "./data/dentistryData";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

const AppShell = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Booking Modal States
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState("");
  const [bookingDoctor, setBookingDoctor] = useState("");
  const [bookingCost, setBookingCost] = useState("");

  // Service Detail Modal State
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  // Site-wide AJAX Search Overlay State
  const [searchOpen, setSearchOpen] = useState(false);

  const handleOpenSearch = () => setSearchOpen(true);
  const handleCloseSearch = () => setSearchOpen(false);

  // Track scroll position with RAF for performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? (currentScrollY / totalHeight) * 100 : 0;

          setScrollY(currentScrollY);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handlers for modal triggers
  const handleOpenBooking = () => {
    setBookingService("");
    setBookingDoctor("");
    setBookingCost("");
    setBookingOpen(true);
  };

  const handleOpenBookingWithService = (serviceName: string) => {
    setBookingService(serviceName);
    setBookingDoctor("");
    setBookingCost("");
    setBookingOpen(true);
  };

  const handleOpenBookingWithDoctor = (doctorName: string) => {
    setBookingDoctor(doctorName);
    setBookingService("");
    setBookingCost("");
    setBookingOpen(true);
  };

  const handleOpenBookingWithCalculation = (treatmentTitle: string, estimatedCost: string) => {
    setBookingService(treatmentTitle);
    setBookingCost(estimatedCost);
    setBookingDoctor("");
    setBookingOpen(true);
  };

  const handleScrollToCalculator = () => {
    navigate("/services#calculator");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] text-slate-800 flex flex-col selection:bg-teal-600 selection:text-white">
      
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar onOpenSearch={handleOpenSearch} />

      {/* 2. Glass Navbar with scroll progress */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenCalculator={handleScrollToCalculator}
        onOpenServiceDetail={(service) => setSelectedServiceModal(service)}
        scrollProgress={scrollProgress}
      />

      <main className="flex-1">
        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <HomePage
                onOpenBooking={handleOpenBooking}
                onOpenBookingWithService={handleOpenBookingWithService}
                onOpenServiceDetail={(service) => setSelectedServiceModal(service)}
                onOpenCalculator={handleScrollToCalculator}
                scrollY={scrollY}
              />
            }
          />

          {/* Specialized services + cost calculator */}
          <Route
            path="/services"
            element={
              <ServicesPage
                onOpenBookingWithService={handleOpenBookingWithService}
                onOpenServiceDetail={(service) => setSelectedServiceModal(service)}
                onOpenBookingWithCalculation={handleOpenBookingWithCalculation}
              />
            }
          />

          {/* Doctors */}
          <Route
            path="/doctors"
            element={<DoctorsPage onOpenBookingWithDoctor={handleOpenBookingWithDoctor} />}
          />

          {/* Portfolio — نمونه کارها (before/after gallery) */}
          <Route
            path="/portfolio"
            element={<PortfolioPage onOpenBooking={handleOpenBooking} />}
          />

          {/* Expert articles */}
          <Route path="/articles" element={<ArticlesPage />} />

          {/* Single article page (permalink = English slug) */}
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />

          {/* About clinic */}
          <Route path="/about" element={<AboutPage onOpenBooking={handleOpenBooking} />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactPage onOpenBooking={handleOpenBooking} />} />

          {/* Fallback → home */}
          <Route
            path="*"
            element={
              <HomePage
                onOpenBooking={handleOpenBooking}
                onOpenBookingWithService={handleOpenBookingWithService}
                onOpenServiceDetail={(service) => setSelectedServiceModal(service)}
                onOpenCalculator={handleScrollToCalculator}
                scrollY={scrollY}
              />
            }
          />
        </Routes>
      </main>

      {/* 15. Luxury Persian Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenCalculator={handleScrollToCalculator}
      />

      {/* 16. Floating Action Controls (Mobile bar, WhatsApp chat, Scroll-to-top) */}
      <FloatingActions
        onOpenBooking={handleOpenBooking}
        onOpenCalculator={handleScrollToCalculator}
        scrollY={scrollY}
      />

      {/* 17. Interactive Multi-Step Appointment Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={bookingService}
        initialDoctor={bookingDoctor}
        initialEstimatedCost={bookingCost}
      />

      {/* 18. Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceModal}
        onClose={() => setSelectedServiceModal(null)}
        onBook={(srv) => {
          setSelectedServiceModal(null);
          handleOpenBookingWithService(srv);
        }}
      />

      {/* 19. Site-wide AJAX Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={handleCloseSearch} />

      {/* 20. Reset scroll position on route change / smooth-scroll to hash */}
      <ScrollToTop />


    </div>
  );
}

/**
 * Resets scroll position on every route change.
 * When a location hash is present (e.g. /services#calculator)
 * it smoothly scrolls to the matching element instead.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

