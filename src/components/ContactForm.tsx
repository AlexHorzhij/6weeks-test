import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, MessageSquare, Send, CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button, Input, Textarea, FormField } from "@/components/ui";
import { contactSchema } from "@/lib/contactSchema";
import type { ContactFormData } from "@/type";

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

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

  const renderButtonContent = () => {
    if (isSubmitting) {
      return (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Відправляємо...
        </>
      );
    }

    if (isSuccess) {
      return (
        <>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Відправлено!
        </>
      );
    }

    return (
      <>
        <Send className="mr-2 h-4 w-4" />
        Відправити
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        id="name"
        label="Ім'я"
        icon={User}
        optional
        error={errors.name?.message}
        delay="0.1s"
      >
        <Input
          id="name"
          type="text"
          placeholder="Ваше ім'я"
          variant="premium"
          error={!!errors.name}
          {...register("name")}
        />
      </FormField>

      <FormField
        id="email"
        label="Email"
        icon={Mail}
        required
        error={errors.email?.message}
        delay="0.2s"
      >
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          variant="premium"
          error={!!errors.email}
          {...register("email")}
        />
      </FormField>

      <FormField
        id="message"
        label="Повідомлення"
        icon={MessageSquare}
        optional
        error={errors.message?.message}
        delay="0.3s"
      >
        <Textarea
          id="message"
          placeholder="Ваше повідомлення..."
          variant="premium"
          error={!!errors.message}
          rows={4}
          className="resize-none"
          {...register("message")}
        />
      </FormField>

      <div className="pt-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <Button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="w-full h-12 bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium shadow-glow transition-all duration-300 disabled:opacity-70"
        >
          {renderButtonContent()}
        </Button>
      </div>
    </form>
  );
}

