# Bauhaus Design System & Style Guide

## 1. Design Principles
- **Form Follows Function**: Every element exists for a purpose. Decoration is minimal and geometric.
- **Minimalism**: Clean lines, ample whitespace, and strict alignment.
- **Geometric Shapes**: Use of basic shapes (squares, circles, triangles) for visual interest and hierarchy.
- **Primary Colors**: Dominant use of Red, Yellow, and Blue, supported by Black, White, and Gray.

## 2. Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Bauhaus Red** | `#E30613` | Primary Actions, Alerts, Highlights |
| **Bauhaus Blue** | `#005C9C` | Secondary Actions, Information, Links |
| **Bauhaus Yellow** | `#FFD700` | Accents, Headers, Warnings |
| **Bauhaus Black** | `#1A1A1A` | Text, Borders, Shadows |
| **Bauhaus White** | `#FFFFFF` | Backgrounds, Cards, Inputs |
| **Bauhaus Gray** | `#F2F2F2` | Page Backgrounds |

## 3. Typography
- **Font Family**: 'Helvetica Neue', 'Arial', sans-serif.
- **Weights**:
  - **Bold (900)**: Headers, Buttons.
  - **Regular (400)**: Body text.
- **Style**: Uppercase for headers and buttons to emphasize structure.

## 4. Component Styles

### Buttons
- **Shape**: Rectangular, no border radius.
- **Border**: 2px solid Bauhaus Black.
- **Shadow**: Hard shadow (4px offset) in Bauhaus Black.
- **Interaction**:
  - Hover: Translate -2px, Shadow increases to 6px.
  - Active: Translate +2px, Shadow decreases to 2px.
- **Variables**:
  - Primary: Blue background, White text.
  - Danger: Red background, White text.
  - Success/Info: Yellow background, Black text.

### Cards & Containers
- **Border**: 3px solid Bauhaus Black.
- **Radius**: 0px.
- **Shadow**: 8px hard shadow in Bauhaus Black.
- **Header**: Yellow background with bottom border.

### Inputs
- **Border**: 2px solid Bauhaus Black.
- **Radius**: 0px.
- **Focus**: Blue border color.

## 5. Layout & Grid
- **Container**: Centered, max-width or full-width depending on context.
- **Spacing**: Consistent padding (20px, 40px).
- **Alignment**: Strict alignment of elements. Use `el-row` and `el-col` for grid structure.

## 6. Animations
- **Type**: Functional only.
- **Easing**: Linear or Ease-out.
- **Duration**: Fast (≤ 200ms).
- **Properties**: Transform (translate), Box-shadow, Opacity.

## 7. CSS Variables
The following variables are available in `src/assets/css/bauhaus.css`:

```css
:root {
  --bauhaus-red: #E30613;
  --bauhaus-blue: #005C9C;
  --bauhaus-yellow: #FFD700;
  --bauhaus-black: #1A1A1A;
  --bauhaus-white: #FFFFFF;
  --bauhaus-gray: #F2F2F2;
  --bauhaus-border: 2px solid var(--bauhaus-black);
  --bauhaus-font-family: 'Helvetica Neue', 'Arial', 'sans-serif';
}
```

## 8. Implementation Guide
To apply the Bauhaus style to a new component:
1. Import `src/assets/css/bauhaus.css` (done globally in `main.js`).
2. Use `el-button`, `el-card`, `el-input` which are automatically styled.
3. For custom containers, use `.bauhaus-card` or `.bauhaus-container`.
4. Ensure all text is legible and aligned.
5. Avoid using `border-radius`.
