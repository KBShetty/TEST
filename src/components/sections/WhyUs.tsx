import { BadgeCheck, Dumbbell, HeartHandshake, Layers } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const REASONS = [
  {
    icon: BadgeCheck,
    title: "Certified Trainers",
    description:
      "Every coach on our floor is certified and genuinely invested in your progress, not just your sign-up.",
  },
  {
    icon: Layers,
    title: "Diverse Programs",
    description:
      "From strength to endurance to functional movement, there's a program built for your goals and your body.",
  },
  {
    icon: HeartHandshake,
    title: "Supportive Community",
    description:
      "Train alongside people who show up for each other — motivation that keeps you consistent long after day one.",
  },
  {
    icon: Dumbbell,
    title: "State-of-the-Art Equipment",
    description:
      "A well-maintained, modern floor so you can focus on the work, not on waiting around or working around gear.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            Why Us
          </h2>
          <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything you need to actually stick with it
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, description }, i) => (
            <Reveal
              key={title}
              delay={i * 0.1}
              className="flex flex-col items-center rounded-xl p-4 text-center transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                <Icon className="size-6" />
              </div>
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
