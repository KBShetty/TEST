import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/content/site-config";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  variant?: "floating" | "inline";
}

const DEFAULT_MESSAGE = "Hi Aurea Fitness, I'd like to know more!";

// The client's "contact page should take them to WhatsApp" requirement,
// delivered as a wa.me deep link — no WhatsApp Business API needed.
export function WhatsAppButton({
  message = DEFAULT_MESSAGE,
  className,
  variant = "floating",
}: WhatsAppButtonProps) {
  const href = whatsappLink(message);

  if (variant === "inline") {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 ${className ?? ""}`}
      >
        <MessageCircle className="size-4" />
        Chat on WhatsApp
      </Link>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
    >
      <MessageCircle className="size-7" />
    </Link>
  );
}
