// Static fallback pool, parity with testimonials-fallback.json — used when
// Sanity has no active quotes yet or is unreachable. Still date-hashed by
// quote-of-the-day.ts so even this fallback rotates instead of showing one
// static line forever.
export const quotesFallback = [
  { text: "The only bad workout is the one that didn't happen." },
  { text: "Strength doesn't come from what you can do. It comes from overcoming the things you thought you couldn't." },
  { text: "Discipline is choosing between what you want now and what you want most." },
  { text: "Every rep is a step closer to the person you're becoming." },
  { text: "Your body can stand almost anything. It's your mind you have to convince." },
  { text: "Progress, not perfection." },
  { text: "Consistency is what transforms average into excellence." },
  { text: "Small steps every day lead to big changes over time." },
  { text: "You don't have to be extreme, just consistent." },
  { text: "Take care of your body. It's the only place you have to live." },
  { text: "Motivation gets you started. Habit keeps you going." },
  { text: "Push yourself, because no one else is going to do it for you." },
  { text: "A one-hour workout is 4% of your day. No excuses." },
  { text: "Wake up. Work out. Win.", dayOfWeek: ["mon"] },
  { text: "New week, new goals. Let's get after it.", dayOfWeek: ["mon"] },
  { text: "Halfway there — keep the momentum going.", dayOfWeek: ["wed"] },
  { text: "Finish the week strong.", dayOfWeek: ["fri"] },
  { text: "Recovery is part of the training. Move a little today.", dayOfWeek: ["sun"] },
  { text: "New month, new personal bests waiting to happen.", month: ["1"] },
];
