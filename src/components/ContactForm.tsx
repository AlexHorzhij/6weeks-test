import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, MessageSquare, Send, CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button, Input, Textarea, Label } from "@/components/ui";
import { contactSchema } from "@/lib/contactSchema";
import type { ContactFormData } from "@/type";

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;
console.log('WEBHOOK_URL', WEBHOOK_URL);

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log('response', response);

      if (!response.ok) {
        toast.error("Не вдалося відправити повідомлення. Спробуйте пізніше.");
        throw new Error("Failed to send message");
      }
      setIsSuccess(true);
      reset();
      toast.success("Успішно відправлено!");
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error("Не вдалося відправити повідомлення. Спробуйте пізніше.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <Label
          htmlFor="name"
          className="flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <User className="h-4 w-4 text-primary" />
          Ім'я
          <span className="text-muted-foreground text-xs">(необов'язково)</span>
        </Label>
        <div className="relative">
          <Input
            id="name"
            type="text"
            placeholder="Ваше ім'я"
            className="pl-4 h-12 bg-card border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-slide-in">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <Label
          htmlFor="email"
          className="flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <Mail className="h-4 w-4 text-primary" />
          Email
          <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className={`pl-4 h-12 bg-card border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
              errors.email
                ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                : ""
            }`}
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-slide-in">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <Label
          htmlFor="message"
          className="flex items-center gap-2 text-sm font-medium text-foreground"
        >
          <MessageSquare className="h-4 w-4 text-primary" />
          Повідомлення
          <span className="text-muted-foreground text-xs">(необов'язково)</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Ваше повідомлення..."
          rows={4}
          className="bg-card border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-slide-in">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="pt-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <Button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="w-full h-12 bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium shadow-glow transition-all duration-300 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Відправляємо...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Відправлено!
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Відправити
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
