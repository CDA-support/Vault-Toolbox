# Vault Tool Builder: Styling Tokens & Spacing

To maintain a consistent look and feel, always use these semantic tokens from the Chakra UI theme.

## Semantic Color Tokens

| Token Name | Light Mode (Base) | Dark Mode (`_dark`) | Usage |
| --- | --- | --- | --- |
| `veeva_orange_color_mode` | `#f7981d` | `#FFAC41` | Headings, Primary Icons |
| `white_color_mode` | `white` | `#303841` | Island Backgrounds |
| `veeva_light_gray_color_mode` | `#f5f5f5` | `#44444B` | App Background |
| `beige_color_mode` | `#fff2dc` | `#2a2a2a` | Hover, Selection |
| `veeva_sunset_red_color_mode` | `#db6015` | `#FF7927` | Destructive Actions (Delete) |
| `veeva_twilight_blue` | `#1A76A3` | N/A | Secondary Primary Actions |

## Layout Spacing & Geometry

- **Border Radius:** All islands and interactive elements MUST use `borderRadius: '8px'`.
- **Island Shadow:** `boxShadow: '0 0 5px rgba(0,0,0,0.25)'`.
- **Page Margin:** Left margin for page titles in header rows: `25px`.
- **Island Margin:** Standard margin for the main tool island: `0px 10px 5px 10px`.
- **Status Island:** Fixed height of `42px`, with a margin of `5px 0px 10px` and width of `calc(100% - 20px)`.

## Typography

- **Page Heading:** `<Heading fontSize='2rem' color='veeva_orange_color_mode'>`.
- **Panel Heading:** `<Heading size='xl' color='veeva_orange_color_mode' fontWeight='bold'>`.
- **Code:** Use Monaco font or a monospace fallback for data/code displays.

## Icons

- Prefer `react-icons/pi` (Phosphor Icons) for a consistent, modern line-art style.
- Wrap icon-only buttons in the shared `<Tooltip />` component with `openDelay={0}`.
