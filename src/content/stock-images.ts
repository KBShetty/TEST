// Curated, verified-reachable Unsplash photos standing in for Aurea
// Fitness's real photography until the client sends their own (see
// client-intake-checklist.md). All hotlinked via images.unsplash.com
// (allowed in next.config.ts remotePatterns) with next/image doing the
// resizing/format work — no local files needed.
//
// Helper: build a sized URL on demand so every consumer doesn't hand-roll
// query params.
function unsplash(id: string, width = 1200) {
  return `https://images.unsplash.com/${id}?w=${width}&q=80&auto=format&fit=crop`;
}

export const stockImages = {
  hero: unsplash("photo-1534438327276-14e5300c3a48", 1920), // gym interior, dramatic light
  heroAlt: unsplash("photo-1517836357463-d25dfeac3438", 1920), // weights close-up

  gallery: [
    unsplash("photo-1571019613454-1cb2f99b2d8b"), // weight rack
    unsplash("photo-1517836357463-d25dfeac3438"), // barbell
    unsplash("photo-1540497077202-7c8a3999166f"), // group class
    unsplash("photo-1544367567-0f2fcb009e0b"), // trainer coaching
    unsplash("photo-1583454110551-21f2fa2afe61"), // gym floor wide
    unsplash("photo-1526506118085-60ce8714f8c5"), // cardio machines
  ],

  facilities: [
    unsplash("photo-1571902943202-507ec2618e8f"), // equipment row
    unsplash("photo-1558611848-73f7eb4001a1"), // dumbbells rack
    unsplash("photo-1638536532686-d610adfc8e5c"), // functional turf area
    unsplash("photo-1607962837359-5e7e89f86776"), // cardio deck
    unsplash("photo-1534368959876-26bf04f2c947"), // gym wide angle
    unsplash("photo-1600881333168-2ef49b341f30"), // free weights area
  ],

  programs: {
    "personal-training": unsplash("photo-1571731956672-f2b94d7dd0cb"),
    "group-classes": unsplash("photo-1540497077202-7c8a3999166f"),
    "functional-training": unsplash("photo-1517960413843-0aee8e2b3285"),
    "cardio-endurance": unsplash("photo-1526506118085-60ce8714f8c5"),
  } as Record<string, string>,

  trainers: [
    unsplash("photo-1571019613454-1cb2f99b2d8b", 600),
    unsplash("photo-1548690312-e3b507d8c110", 600),
  ],

  about: unsplash("photo-1517963879433-6ad2b056d712"),
  offer: unsplash("photo-1571902943202-507ec2618e8f", 800),
  contact: unsplash("photo-1534438327276-14e5300c3a48"),
};
