import "./App.css";
import { ContactForm } from "@/components/ContactForm";
import { Mail, Sparkles } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-background bg-gradient-radial">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary shadow-glow mb-6">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Зв'яжіться з нами</h1>
            <p className="text-muted-foreground">
              Заповніть форму і ми отримаємо ваше повідомлення
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-card border border-border/50 p-6 sm:p-8 backdrop-blur-sm">
            <ContactForm />
          </div>

          <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3" />
              Тестове завдання для 6 Weeks Marketing 
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
