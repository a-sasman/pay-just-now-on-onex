# PayJustNow on OneX

Astro micro-course implementing the supplied PayJustNow on OneX storyboard and
visual-board direction.

## Implemented

- Responsive black, lime, white and light-grey PayJustNow course composition.
- Welcome and learning outcomes.
- Sale-journey introduction with the supplied checkout visual and accessible zoom.
- Four selectable sale-rule cards.
- Four submitted knowledge checks with four options and approved feedback.
- Exclusions content and accessible drag/button product sort.
- Refund decision paths and three connected refund checks.
- Eight expandable customer questions.
- Branded, downloadable PayJustNow Customer Questions Guide PDF.
- Conclusion links, static People Connect footer, back-to-top behavior and
  reduced-motion handling.
- SCORM 1.2 immediate-completion behavior with standalone-browser fallback.

## Known source limitation

The supplied files contain one PayJustNow checkout/payment-plan screenshot, not
the complete ordered OneX POS screenshot sequence requested by the storyboard.
The course does not fabricate the missing interface or process steps. The
following screenshots are still required to complete the Sale Journey:

1. Customer loaded in OneX.
2. Other tenders applied before PayJustNow, where relevant.
3. PayJustNow selected for the remaining balance.
4. QR code displayed at POS and scanned by the customer.
5. Customer approval/confirmation in the app.
6. Final successful transaction confirmation in OneX.

The approved course is packaged with this limitation documented. The missing
screenshots do not block the current Oracle / People Connect SCORM package.

## Commands

| Command | Action |
| :-- | :-- |
| `npm run dev` | Start the local Astro development server. |
| `npm run build` | Build the production output in `dist/`. |
| `npm run preview` | Preview the production build. |
| `npm run pdf` | Generate the downloadable customer-questions guide. |
| `npm run verify:scorm` | Run mock SCORM lifecycle and packaged browser checks against `dist/`. |

## SCORM identity

- Standard: SCORM 1.2
- Course identifier: `com.payjustnow.onex.scorm12`
- Browser and manifest titles: `Content`
- Package filename: `payjustnow-on-onex-scorm-1.2.zip`
- Browser-storage namespace: `payjustnow-on-onex:course-state:v1`

The source manifest is `public/imsmanifest.xml`. Regenerate the guide when its
content changes, run the production build and verification, then package the
contents of `dist/` at the ZIP root.

## References

Storyboard, visual board and supplied source images are preserved under
`reference/`. Runtime copies live under `public/images/payjustnow/`.
