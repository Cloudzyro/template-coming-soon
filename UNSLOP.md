# Unslop notes

Pass made with the unslop skill by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0.

## Audit (first build)

Level: light. Built against the skill from the start; the usual coming soon slop (gradient background, glowing countdown boxes, "Something amazing is coming" headline, pulsing dots, a confetti or particles layer) was never there. Real signs on the first render:

- Desktop: the page ran past one screen, so the social links sat below the fold on a 800px laptop
- Phones: the email field collapsed to a sliver when the row stacked (flex basis in a column)
- Copy: "a two-wheel pottery studio" in the description said nothing true
- Countdown: four bordered boxes would have read as a template; drawn instead as one ruled strip

None of: gradients, glows, gradient text, emoji, uppercase tracked labels, pill badges, hype words, looping decoration (the seconds tick because they're live), hover scale, transition-all.

## Direction

- Product: a launch page that gets people to leave an email before a small pottery studio's online shop opens
- Character: quiet, earthy, a little wry
- World: a garage studio with a kiln, stoneware on a kiln shelf, glaze test tiles
- Moments: the kiln shelf with celadon, tenmoku and shino pieces, and the countdown figures set large and light
- Signature: the glaze test-tile strip under the pieces, the palette the shop's colors come from

## Fixes

- Spacing: intro groups 32px apart, copy 16px, the whole first screen fits 800px with the socials visible
- Color: warm stoneware ramp in light and dark, celadon green (darkened for contrast in light) as the only accent on the button and logo
- Copy: headline says what opens and when; the launch time is written in the studio's zone and the visitor's; sign-up label says exactly what they'll get (one email)
- Type: DM Serif Display for the headline only, Sora for everything else, the countdown at 300 weight with tabular figures
- Layout: split, text left and the teaser right on desktop; on phones the teaser follows the actions
- Details and motion: 10px controls, 20px image radius; no entrance animation, color transitions and a 0.98 press only; email field fixed when stacked

## Screenshots

- screenshot-2: After launch (`?preview=open`), dark mode, with the Visit the shop button
- screenshot-3: The sign-up's fallback message when no form endpoint is set (dark mode)
