"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { leadFormSchema, type LeadFormValues, intentLabels } from "@/lib/validations";
import { whatsappLink } from "@/content/site-config";

const DISMISS_KEY = "aurea-lead-popup-dismissed-until";
const TRIGGER_DELAY_MS = 10_000;
const SCROLL_TRIGGER_PERCENT = 0.4;
// Dismiss it and it's dismissed: a quick cancel shouldn't be able to reopen
// on the very next scroll/mouse-out. A short cool-down covers "comes back on
// the next visit" naturally (closing the tab clears nothing, but the
// timestamp expires) as well as "or after 5-10 minutes" if they stay on the
// same page.
const SUPPRESS_MINUTES = 10;

function isSuppressed() {
  try {
    const until = localStorage.getItem(DISMISS_KEY);
    return until ? Date.now() < Number(until) : false;
  } catch {
    return false;
  }
}

function suppressFor(minutes: number) {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now() + minutes * 60 * 1000));
  } catch {
    // localStorage unavailable (private mode etc.) — non-fatal, popup may
    // just reappear sooner than intended.
  }
}

export function LeadCapturePopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      intent: undefined,
      preferredContactTime: "",
      consent: undefined,
      company: "",
    },
  });

  // Guards against showing it more than once per page load — dismissing it
  // must not let the next scroll/mouse-out reopen it immediately, which was
  // the bug: the listeners stayed attached and fired setOpen(true) again
  // regardless of dismissal.
  const hasShownRef = useRef(false);

  // First-visit only: ~10s delay or exit-intent (desktop) / scroll-depth
  // (mobile), whichever fires first. Always dismissible per the brief
  // ("optional popup") — once dismissed, it will not reopen on this visit,
  // and stays suppressed for SUPPRESS_MINUTES even across a reload.
  useEffect(() => {
    if (isSuppressed()) return;

    const tryOpen = () => {
      if (hasShownRef.current || isSuppressed()) return;
      hasShownRef.current = true;
      setOpen(true);
    };

    const timer = setTimeout(tryOpen, TRIGGER_DELAY_MS);

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) tryOpen();
    };

    const onScroll = () => {
      const scrolled =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= SCROLL_TRIGGER_PERCENT) tryOpen();
    };

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (!next) suppressFor(SUPPRESS_MINUTES);
    setOpen(next);
  };

  const onSubmit = async (values: LeadFormValues) => {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "popup" }),
      });
      if (!res.ok) throw new Error("Request failed");

      suppressFor(SUPPRESS_MINUTES);
      setSubmitted(true);

      // Let the lead self-initiate WhatsApp immediately too.
      const message = `Hi Aurea Fitness, I just submitted a request for a ${intentLabels[values.intent]}.`;
      window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    } catch {
      form.setError("root", {
        message: "Something went wrong — please try again or WhatsApp us directly.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="py-4 text-center">
            <DialogHeader>
              <DialogTitle>Thanks — we&apos;ve got your request!</DialogTitle>
              <DialogDescription>
                Our team will reach out on WhatsApp shortly. We&apos;ve also
                opened a WhatsApp chat for you to message us directly.
              </DialogDescription>
            </DialogHeader>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Start Your Fitness Journey Today</DialogTitle>
              <DialogDescription>
                Tell us a bit about yourself and we&apos;ll follow up right away.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...form.register("name")} />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone / WhatsApp Number</Label>
                <Input id="phone" type="tel" {...form.register("phone")} />
                {form.formState.errors.phone && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register("email")} />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>I&apos;m interested in</Label>
                <RadioGroup
                  onValueChange={(v) =>
                    form.setValue("intent", v as LeadFormValues["intent"])
                  }
                  className="grid grid-cols-1 gap-2"
                >
                  {(Object.keys(intentLabels) as Array<LeadFormValues["intent"]>).map(
                    (key) => (
                      <div key={key} className="flex items-center gap-2">
                        <RadioGroupItem value={key} id={key} />
                        <Label htmlFor={key} className="font-normal">
                          {intentLabels[key]}
                        </Label>
                      </div>
                    ),
                  )}
                </RadioGroup>
                {form.formState.errors.intent && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.intent.message}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="consent"
                  onCheckedChange={(checked) =>
                    form.setValue("consent", checked === true)
                  }
                />
                <Label htmlFor="consent" className="font-normal">
                  I agree to be contacted via call/WhatsApp/email and to the{" "}
                  <a href="/legal/privacy-policy" className="underline">
                    Privacy Policy
                  </a>
                  .
                </Label>
              </div>
              {form.formState.errors.consent && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.consent.message}
                </p>
              )}

              {/* Honeypot — hidden from real users, catches simple bots. */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                {...form.register("company")}
              />

              {form.formState.errors.root && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.root.message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
