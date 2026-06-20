PRAGMA foreign_keys = OFF;

INSERT INTO products (
  slug, title, subtitle, description, short_description,
  price, compare_price, cover_image, pdf_url, epub_url,
  visibility, featured, stock, lemonsqueezy_variant_id, lemonsqueezy_product_id,
  meta_title, meta_description
) VALUES
(
  'the-no-contact-blueprint',
  'The No-Contact Blueprint',
  'The Definitive Behavioral Intelligence Guide to No-Contact Psychology',
  'A research-driven exploration of silence, detachment, and psychological withdrawal after a breakup. This publication examines the behavioral mechanisms behind no-contact, why it creates emotional reset, and how to use it as a strategic framework for recovery and perceived value restoration.',
  'Understand the psychology behind no-contact, silence, and emotional detachment.',
  2900, 144900,
  '/covers/no-contact-blueprint.png',
  '/api/downloads/the-no-contact-blueprint/pdf',
  '/api/downloads/the-no-contact-blueprint/epub',
  'visible', 1, 8463, 'ls_variant_no_contact', 'ls_product_no_contact',
  'The No-Contact Blueprint | Quiet Psychology',
  'The definitive behavioral intelligence guide to no-contact psychology, silence, and emotional recovery.'
),
(
  'texting-psychology',
  'Texting Psychology',
  'A Framework-Driven Guide to Understanding Communication Psychology',
  'An analytical framework for decoding texting behavior, communication patterns, and attraction signals. This publication covers response latency, emotional triggers, perceived investment, and the psychological forces that shape digital attraction.',
  'Decode texting behavior, communication patterns, and attraction signals.',
  2900, 144900,
  '/covers/texting-psychology.svg',
  '/api/downloads/texting-psychology/pdf',
  '/api/downloads/texting-psychology/epub',
  'visible', 2, 8463, 'ls_variant_texting', 'ls_product_texting',
  'Texting Psychology | Quiet Psychology',
  'A framework-driven guide to understanding communication psychology and texting behavior.'
),
(
  'the-attachment-archive',
  'The Attachment Archive',
  'A Deep Behavioral Archive Explaining Attachment Psychology',
  'A structured archive of attachment styles, avoidance, anxiety, and relationship dynamics. This publication maps hidden bonding patterns, emotional dependency cycles, and the behavioral signatures that predict relationship outcomes.',
  'Explore attachment styles, avoidance, anxiety, and hidden relationship patterns.',
  2900, 144900,
  '/covers/attachment-archive.png',
  '/api/downloads/the-attachment-archive/pdf',
  '/api/downloads/the-attachment-archive/epub',
  'visible', 3, 8463, 'ls_variant_attachment', 'ls_product_attachment',
  'The Attachment Archive | Quiet Psychology',
  'A deep behavioral archive explaining attachment psychology and relationship dynamics.'
),
(
  'the-attraction-code',
  'The Attraction Code',
  'A Premium Behavioral Intelligence Report on Attraction Dynamics',
  'A premium report on the hidden psychological mechanisms behind desire, attraction, and perceived value. This publication examines human mating psychology, behavioral signals, and the variables that influence romantic selection.',
  'Understand desire, attraction, perceived value, and human mating psychology.',
  2900, 144900,
  '/covers/attraction-code.png',
  '/api/downloads/the-attraction-code/pdf',
  '/api/downloads/the-attraction-code/epub',
  'visible', 4, 8463, 'ls_variant_attraction', 'ls_product_attraction',
  'The Attraction Code | Quiet Psychology',
  'A premium behavioral intelligence report on attraction dynamics and desire.'
);

INSERT INTO reviews (product_id, name, display_name, rating, review_text, approved, helpful) VALUES
-- The No-Contact Blueprint
(1, 'Alex M.', 'Alex M.', 5, 'This changed how I understand silence after a breakup. The frameworks are precise and unlike anything I have read.', 1, 24),
(1, 'Jordan T.', 'Jordan T.', 5, 'Premium research. No motivational noise. Just behavioral intelligence that works.', 1, 18),
(1, 'Sam K.', 'Sam K.', 5, 'Worth far more than the price. It reads like a classified psychological report.', 1, 31),
(1, 'Casey R.', 'Casey R.', 5, 'I finally understand why no-contact works on a psychological level. Not a single page feels like filler.', 1, 19),
(1, 'Morgan L.', 'Morgan L.', 4, 'Extremely useful. I would have liked even more examples, but the frameworks alone are worth it.', 1, 11),
(1, 'Jamie P.', 'Jamie P.', 5, 'The best investment I made after my breakup. Clear, calm, and unsettlingly accurate.', 1, 26),
-- Texting Psychology
(2, 'Riley P.', 'Riley P.', 5, 'Finally, a texting guide that does not feel childish. Every chapter is sharp and useful.', 1, 12),
(2, 'Casey L.', 'Casey L.', 5, 'Helped me see why my communication patterns were creating the wrong perception.', 1, 9),
(2, 'Avery N.', 'Avery N.', 5, 'I stopped over-texting immediately after reading this. The response-latency section alone paid for itself.', 1, 17),
(2, 'Dylan S.', 'Dylan S.', 5, 'A must-read for anyone who communicates through screens. The signal-to-noise ratio is perfect.', 1, 14),
(2, 'Skyler B.', 'Skyler B.', 4, 'Practical and well-written. Some sections are dense but the takeaways are excellent.', 1, 8),
(2, 'Cameron J.', 'Cameron J.', 5, 'I have read dozens of dating communication books. This is the only one grounded in actual psychology.', 1, 22),
-- The Attachment Archive
(3, 'Morgan S.', 'Morgan S.', 5, 'The attachment archive is genuinely deep. It clarified years of relationship confusion.', 1, 27),
(3, 'Taylor R.', 'Taylor R.', 5, 'Research-driven and credible. I have recommended it to multiple friends.', 1, 15),
(3, 'Jordan A.', 'Jordan A.', 5, 'Understanding my own attachment style changed how I date. No exaggeration.', 1, 20),
(3, 'Reese K.', 'Reese K.', 5, 'This should be required reading for anyone entering a serious relationship.', 1, 13),
(3, 'Blake T.', 'Blake T.', 4, 'Deep and well-sourced. The avoidant-anxious cycle section was eye-opening.', 1, 10),
(3, 'Hayden M.', 'Hayden M.', 5, 'Quiet Psychology does it again. Premium content without the fluff.', 1, 18),
-- The Attraction Code
(4, 'Quinn B.', 'Quinn B.', 5, 'The attraction code reframed everything I thought I knew about desire.', 1, 21),
(4, 'Drew C.', 'Drew C.', 5, 'Intelligent, minimal, and premium. Exactly what this space needed.', 1, 14),
(4, 'Parker W.', 'Parker W.', 5, 'This is not pickup advice. It is behavioral science applied to attraction. Refreshing.', 1, 16),
(4, 'Ellis R.', 'Ellis R.', 5, 'The perceived-value framework made me rethink how I show up in every interaction.', 1, 12),
(4, 'Sage H.', 'Sage H.', 4, 'Strong research and clear writing. A few ideas challenged my assumptions in the best way.', 1, 9),
(4, 'Rowan C.', 'Rowan C.', 5, 'I bought all four books. This one might be the most underrated.', 1, 11);

INSERT INTO subscribers (email, source, status) VALUES
('reader@example.com', 'homepage', 'active'),
('archive@example.com', 'footer', 'active'),
('research@example.com', 'product-page', 'active');

INSERT INTO orders (email, name, product_id, amount, status, download_token) VALUES
-- The No-Contact Blueprint
('alex@example.com', 'Alex M.', 1, 2900, 'paid', 'tok-ncbp-001'),
('casey.r@example.com', 'Casey R.', 1, 2900, 'paid', 'tok-ncbp-002'),
('jamie.p@example.com', 'Jamie P.', 1, 2900, 'paid', 'tok-ncbp-003'),
('morgan.l@example.com', 'Morgan L.', 1, 2900, 'paid', 'tok-ncbp-004'),
('jordan.t@example.com', 'Jordan T.', 1, 2900, 'paid', 'tok-ncbp-005'),
('sam.k@example.com', 'Sam K.', 1, 2900, 'paid', 'tok-ncbp-006'),
-- Texting Psychology
('riley.p@example.com', 'Riley P.', 2, 2900, 'paid', 'tok-txps-001'),
('casey.l@example.com', 'Casey L.', 2, 2900, 'paid', 'tok-txps-002'),
('avery.n@example.com', 'Avery N.', 2, 2900, 'paid', 'tok-txps-003'),
('dylan.s@example.com', 'Dylan S.', 2, 2900, 'paid', 'tok-txps-004'),
('skyler.b@example.com', 'Skyler B.', 2, 2900, 'paid', 'tok-txps-005'),
('cameron.j@example.com', 'Cameron J.', 2, 2900, 'paid', 'tok-txps-006'),
-- The Attachment Archive
('morgan.s@example.com', 'Morgan S.', 3, 2900, 'paid', 'tok-atta-001'),
('taylor.r@example.com', 'Taylor R.', 3, 2900, 'paid', 'tok-atta-002'),
('jordan.a@example.com', 'Jordan A.', 3, 2900, 'paid', 'tok-atta-003'),
('reese.k@example.com', 'Reese K.', 3, 2900, 'paid', 'tok-atta-004'),
('blake.t@example.com', 'Blake T.', 3, 2900, 'paid', 'tok-atta-005'),
('hayden.m@example.com', 'Hayden M.', 3, 2900, 'paid', 'tok-atta-006'),
-- The Attraction Code
('quinn.b@example.com', 'Quinn B.', 4, 2900, 'paid', 'tok-attc-001'),
('drew.c@example.com', 'Drew C.', 4, 2900, 'paid', 'tok-attc-002'),
('parker.w@example.com', 'Parker W.', 4, 2900, 'paid', 'tok-attc-003'),
('ellis.r@example.com', 'Ellis R.', 4, 2900, 'paid', 'tok-attc-004'),
('sage.h@example.com', 'Sage H.', 4, 2900, 'paid', 'tok-attc-005'),
('rowan.c@example.com', 'Rowan C.', 4, 2900, 'paid', 'tok-attc-006');

INSERT INTO settings (key, value) VALUES
('site_name', 'Quiet Psychology'),
('site_tagline', 'Premium Behavioral Intelligence Publishing'),
('support_email', 'hello@quietpsychology.com'),
('currency', 'USD'),
('display_price', '1449'),
('sale_price', '29'),
('reviews_enabled', 'true'),
('email_capture_enabled', 'true');

PRAGMA foreign_keys = ON;
