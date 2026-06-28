# Wonder Crash Image Table

Put finished images in `assets/` with the exact file name in the table. Keep PNG format.

## Image Request Rules

- New image requests must be added to this file before generating art.
- Use the exact `File name` listed here when the image is ready.
- Put finished single images directly in `assets/`.
- If you provide a combined sheet image, put it in `docs/`; after I cut it into final assets, I will delete the original sheet from `docs/`.
- Keep object/icon images as transparent PNG whenever possible.
- Use `512x512` for icons, weapons, enemies, and character/object sprites unless the table says otherwise.
- Use `950x1688` for vertical battle backgrounds.
- Use `1536x1024` or wider for large horizontal base/wall images.
- Update `Status` as `Needed`, `Optional`, or `Exists`.
- Keep prompts aligned with the shared style prompt so the game stays visually consistent.
- UI should prefer images/icons over text whenever possible.
- Main menu tabs, upgrade buttons, resources, equipment, character status, wall status, and settings actions should all have image entries here before final UI polish.
- New weapons must have an icon/projectile image entry in this table before they are added to the backpack system.
- Text labels are allowed as temporary fallback during prototyping, but final buttons should be understandable from icons first.
- If a UI element needs a new icon, add it to the table as `Needed` before asking for or generating the image.
- After a combined source sheet is processed, the source sheet should be removed from `docs/`; only final assets and documentation should remain.

## Shared Style Prompt

Use this style for all generated assets:

`cute 2D mobile game sprite, playful child-friendly school and household object theme, clean bold outline, soft rounded shapes, bright saturated colors, light cel shading, subtle soft shadow, front-facing readable silhouette, transparent background when it is a character/object/icon, vertical mobile game composition for backgrounds, consistent with a whimsical kids defense game`

## Current Game Images

| Status | File name | Used as | Size | Prompt |
| --- | --- | --- | --- | --- |
| Exists | `battle-bg.png` | Battle background | 950x1688 | vertical mobile game background, cozy playful room or school desk battlefield, clear center lane for enemies, soft colorful 2D style |
| Exists | `hero.png` | Player character | 512x512 | cute young boy hero, front-facing, playful brave pose, transparent background, same 2D mobile game style |
| Exists | `wall.png` | Castle wall/base | 1536x1024 | toy-like defensive wall or desk barricade, wide horizontal object, playful kids game style, transparent background |
| Exists | `eraser.png` | First weapon | 512x512 | cute eraser weapon icon/projectile, readable silhouette, transparent background, same 2D mobile game style |
| Exists | `enemy-toilet.png` | Enemy type 1 | 512x512 | silly animated toilet enemy, cute not scary, transparent background, same 2D mobile game style |
| Exists | `enemy-tv.png` | Enemy type 2 | 512x512 | silly animated TV enemy, cute not scary, transparent background, same 2D mobile game style |
| Exists | `enemy-fridge.png` | Enemy type 3 | 512x512 | silly animated refrigerator enemy, cute not scary, transparent background, same 2D mobile game style |
| Exists | `enemy-wardrobe.png` | Enemy type 4 | 512x512 | silly animated wardrobe enemy, cute not scary, transparent background, same 2D mobile game style |
| Exists | `enemy-surveillance.png` | Enemy type 5 | 512x512 | silly animated security camera enemy, cute not scary, transparent background, same 2D mobile game style |
| Needed | `enemy-books.png` | Future enemy: book stack caster | 512x512 | silly animated stack of school books enemy, cute not scary, transparent background, same 2D mobile game style |
| Needed | `enemy-clock.png` | Future enemy: time-slow clock | 512x512 | silly animated alarm clock enemy, cute not scary, transparent background, same 2D mobile game style |
| Needed | `enemy-pencilbox.png` | Future enemy: splitting pencil box | 512x512 | silly animated pencil box enemy with pencils, cute not scary, transparent background, same 2D mobile game style |

## Next Image Requests

| Need | File name | Used as | Size | Prompt |
| --- | --- | --- | --- | --- |
| Exists | `coin.png` | Gold coin UI icon | 512x512 | shiny cute gold coin icon, simple readable shape, transparent background, same 2D mobile game style |
| Exists | `upgrade-damage.png` | Damage upgrade icon | 512x512 | sharp eraser upgrade icon with small sparkle, transparent background, same 2D mobile game style |
| Exists | `upgrade-cooldown.png` | Cooldown upgrade icon | 512x512 | fast eraser motion icon with speed lines, transparent background, same 2D mobile game style |
| Exists | `upgrade-double.png` | Double throw upgrade icon | 512x512 | two cute erasers flying together, transparent background, same 2D mobile game style |
| Exists | `upgrade-size.png` | Bigger projectile upgrade icon | 512x512 | oversized cute eraser icon, transparent background, same 2D mobile game style |
| Exists | `upgrade-repair.png` | Wall repair upgrade icon | 512x512 | small hammer repairing colorful toy wall, transparent background, same 2D mobile game style |
| Exists | `upgrade-coin.png` | More coin upgrade icon | 512x512 | magnet attracting cute gold coins, transparent background, same 2D mobile game style |
| Exists | `menu-character.png` | Character tab icon | 512x512 | cute boy hero portrait icon, confident and friendly, transparent background, same 2D mobile game style |
| Exists | `menu-equipment.png` | Equipment tab icon | 512x512 | cute eraser equipment icon with small toolbox sparkle, transparent background, same 2D mobile game style |
| Exists | `menu-battle.png` | Battle tab icon | 512x512 | playful crossed school supplies battle icon, not violent, transparent background, same 2D mobile game style |
| Exists | `menu-wall.png` | Wall tab icon | 512x512 | colorful toy castle wall shield icon, transparent background, same 2D mobile game style |
| Exists | `menu-settings.png` | Settings tab icon | 512x512 | cute gear icon with soft colorful highlights, transparent background, same 2D mobile game style |
| Exists | `upgrade-character.png` | Permanent character upgrade icon | 512x512 | cute boy hero power-up icon with warm glow, transparent background, same 2D mobile game style |
| Exists | `upgrade-wall.png` | Permanent wall upgrade icon | 512x512 | sturdy upgraded toy wall with shield sparkle, transparent background, same 2D mobile game style |
| Needed | `stat-damage.png` | Damage stat icon | 512x512 | cute impact sparkle icon for attack damage, transparent background, same 2D mobile game style |
| Needed | `stat-cooldown.png` | Cooldown stat icon | 512x512 | cute stopwatch or circular timer icon, transparent background, same 2D mobile game style |
| Needed | `stat-health.png` | Wall health stat icon | 512x512 | cute red heart with small wall shield, transparent background, same 2D mobile game style |
| Needed | `stat-reduction.png` | Damage reduction stat icon | 512x512 | cute shield icon reducing impact, transparent background, same 2D mobile game style |
| Needed | `button-continue.png` | Continue button icon | 512x512 | cute play arrow icon, transparent background, same 2D mobile game style |
| Needed | `button-leave.png` | Leave battle button icon | 512x512 | cute door exit icon, friendly and non-threatening, transparent background, same 2D mobile game style |
| Optional | `weapon-pencil.png` | Future weapon icon/projectile | 512x512 | cute flying pencil weapon, readable silhouette, transparent background, same 2D mobile game style |
| Optional | `weapon-ruler.png` | Future weapon icon/projectile | 512x512 | cute ruler boomerang weapon, readable silhouette, transparent background, same 2D mobile game style |
| Optional | `weapon-glue.png` | Future weapon icon/projectile | 512x512 | cute glue bottle weapon, readable silhouette, transparent background, same 2D mobile game style |
