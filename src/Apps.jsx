import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./uuu";
import ExperiencePage from "./components/Experience";
import { ContentPage, ContactPage } from "./components/Contact";
import { DarkModeProvider } from "./components/DarkModeContext";
import Header from "./components/Header";

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;