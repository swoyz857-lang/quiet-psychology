export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  readTime: string;
  keywords: string;
  coverImage: string;
  productSlug?: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'no-contact-rule-psychology',
    title: 'The No-Contact Rule: The Psychology Behind Silence After a Breakup',
    metaTitle:
      'The No-Contact Rule: Psychology Behind Silence After a Breakup | Quiet Psychology',
    metaDescription:
      'Why does silence work after a breakup? Explore the behavioral psychology of no-contact, withdrawal, and perceived value restoration.',
    excerpt:
      'Silence is not a game. It is a psychological reset. Understand why withdrawal creates space for emotional recovery and perceived value to rise.',
    date: '2025-06-15',
    readTime: '7 min read',
    keywords:
      'no contact rule, no contact psychology, silence after breakup, breakup recovery, emotional withdrawal',
    coverImage: '/covers/no-contact-blueprint.png',
    productSlug: 'the-no-contact-blueprint',
    content: [
      'After a breakup, the instinct to reach out is powerful. But the no-contact rule is not about manipulation—it is about creating the psychological conditions for recovery.',
      'When one person withdraws completely, the dynamic shifts. The absence forces both individuals to update their mental model of the relationship. Silence removes the supply of validation that the other person may have taken for granted.',
      'From a behavioral standpoint, intermittent reinforcement is what creates obsession. Random, unpredictable contact keeps the reward system active. Consistent silence breaks that loop.',
      'No-contact also protects the withdrawing party from further emotional injury. Every message sent and ignored is a micro-rejection. Every response received is a reopening of the wound.',
      'The goal is not to provoke jealousy or force a return. The goal is to restore clarity, rebuild perceived value, and make future interactions happen from a position of strength—not need.',
      'If you want a complete framework, The No-Contact Blueprint maps the psychological mechanisms, timelines, and behavioral signals involved in strategic silence.',
    ],
  },
  {
    slug: 'texting-psychology-response-time',
    title: 'Texting Psychology: Why Response Time Changes Everything',
    metaTitle: 'Texting Psychology: Response Time, Investment, and Attraction | Quiet Psychology',
    metaDescription:
      'Decode texting behavior, response latency, and emotional investment. Learn how small communication patterns shape attraction and perception.',
    excerpt:
      'Texting is not just words. It is a signal of investment, availability, and emotional priority. Learn how response patterns shape attraction.',
    date: '2025-06-10',
    readTime: '6 min read',
    keywords:
      'texting psychology, response time attraction, texting behavior, communication psychology, digital attraction',
    coverImage: '/covers/texting-psychology.svg',
    productSlug: 'texting-psychology',
    content: [
      'In digital communication, timing carries more weight than content. A fast reply signals availability. A delayed reply signals scarcity. Both shape perception.',
      'Response latency is one of the strongest indicators of investment. When someone consistently replies quickly, they communicate that the conversation—and by extension, the relationship—is a high priority.',
      'But investment must be reciprocal. One-sided fast responses create an imbalance. The less invested person holds more power because they control the rhythm.',
      'Emotional triggers also play a role. Urgency, anxiety, and the need for reassurance often lead to over-texting. This behavior usually produces the opposite of the desired effect.',
      'The most attractive communicators understand pacing. They respond when they have time and something to say. They do not use messages to seek validation.',
      'Texting Psychology breaks down the frameworks behind response latency, emotional triggers, and perceived investment in written communication.',
    ],
  },
  {
    slug: 'attachment-styles-relationships',
    title: 'Attachment Styles in Relationships: Anxiety, Avoidance, and Security',
    metaTitle: 'Attachment Styles in Relationships: A Behavioral Guide | Quiet Psychology',
    metaDescription:
      'Understand attachment theory in modern relationships. Learn how anxious, avoidant, and secure attachment styles shape romantic dynamics.',
    excerpt:
      'Attachment theory explains why we react the way we do in love. Explore anxious, avoidant, and secure patterns—and how they interact.',
    date: '2025-06-05',
    readTime: '8 min read',
    keywords:
      'attachment styles, attachment theory, anxious attachment, avoidant attachment, relationship psychology',
    coverImage: '/covers/attachment-archive.png',
    productSlug: 'the-attachment-archive',
    content: [
      'Attachment styles are not labels. They are behavioral signatures shaped by early bonding experiences and reinforced over time.',
      'Anxious attachment often appears as preoccupation with closeness, fear of abandonment, and hypervigilance to emotional cues. The person seeks reassurance to regulate anxiety.',
      'Avoidant attachment appears as emotional distance, self-reliance, and discomfort with vulnerability. The person regulates anxiety by creating space.',
      'When anxious and avoidant patterns meet, they create a classic pursuit-distance loop. One chases, the other withdraws, and both confirm their original fears.',
      'Secure attachment does not mean perfect communication. It means the ability to express needs, tolerate discomfort, and repair after conflict without losing identity.',
      'The Attachment Archive maps these patterns with precision, helping you recognize your own style and the dynamics it creates.',
    ],
  },
  {
    slug: 'psychology-of-attraction',
    title: 'The Psychology of Attraction: Desire, Value, and Selection',
    metaTitle: 'The Psychology of Attraction: Desire and Perceived Value | Quiet Psychology',
    metaDescription:
      'What creates attraction? Explore the behavioral psychology behind desire, perceived value, and mate selection dynamics.',
    excerpt:
      'Attraction is not random. It follows behavioral patterns rooted in perceived value, scarcity, and social proof. Understand the mechanics.',
    date: '2025-05-28',
    readTime: '7 min read',
    keywords:
      'psychology of attraction, attraction psychology, perceived value, mating psychology, desire psychology',
    coverImage: '/covers/attraction-code.png',
    productSlug: 'the-attraction-code',
    content: [
      'Attraction is a decision-making process. People are drawn to those who signal value, stability, and genetic and social fitness.',
      'Perceived value is relative. It increases with scarcity, competence, social proof, and the absence of neediness. It decreases with overavailability and excessive reassurance-seeking.',
      'Desire is also shaped by contrast. A person who is warm but not always available creates more intrigue than someone who is constantly present and predictable.',
      'Behavioral signals matter more than words. Posture, eye contact, emotional regulation, and social confidence all communicate value before a sentence is spoken.',
      'Understanding attraction does not mean performing. It means removing the behaviors that lower your perceived value and replacing them with ones that reflect self-respect.',
      'The Attraction Code provides a structured framework for understanding desire, selection, and the variables that influence romantic interest.',
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
