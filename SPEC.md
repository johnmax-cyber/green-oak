# IT Services Website Specification

## 1. Project Overview

- **Project Name**: GreenOak Technologies - IT Services Website
- **Project Type**: Single-page landing page website
- **Core Functionality**: Professional IT services landing page showcasing laptop repair, maintenance, Windows installation, CCTV security systems, and Wi-Fi network solutions for residential and commercial clients
- **Target Users**: Homeowners and business owners seeking IT services in the Nairobi area

---

## 2. UI/UX Specification

### Layout Structure

**Header Section**
- Company logo/name (left-aligned)
- Navigation menu (right-aligned): Home, Services, Contact
- Sticky header on scroll

**Hero Section**
- Full-width hero with tagline
- Call-to-action button

**Services Section**
- Grid layout displaying 5 main services
- Each service card with icon, title, and brief description

**Why Choose Us Section**
- 4 key selling points in a horizontal layout
- Icon + text format

**Contact Section**
- Contact form with name, email, phone, message fields
- Submit button

**Footer**
- Copyright notice
- Simple footer design

### Responsive Breakpoints
- **Mobile**: < 768px (single column, stacked layout)
- **Tablet**: 768px - 1024px (2-column grid)
- **Desktop**: > 1024px (full layout, 3-4 column grids)

### Visual Design

**Color Palette (Black & White Theme)**
- Primary Background: `#FFFFFF` (white)
- Secondary Background: `#F5F5F5` (light gray)
- Primary Text: `#1A1A1A` (near black)
- Secondary Text: `#4A4A4A` (dark gray)
- Accent/CTA: `#000000` (pure black)
- Border/Divider: `#E0E0E0` (light gray)
- Hover State: `#333333` (dark gray)

**Typography**
- Heading Font: "Playfair Display", serif (for elegance and professionalism)
- Body Font: "Source Sans 3", sans-serif (for readability)
- Heading Sizes:
  - H1: 48px (desktop), 32px (mobile)
  - H2: 36px (desktop), 28px (mobile)
  - H3: 24px (desktop), 20px (mobile)
- Body Size: 16px
- Line Height: 1.6

**Spacing System**
- Section Padding: 80px vertical (desktop), 40px (mobile)
- Container Max Width: 1200px
- Grid Gap: 30px
- Card Padding: 30px

**Visual Effects**
- Subtle box shadows on cards: `0 4px 20px rgba(0, 0, 0, 0.08)`
- Hover lift effect on service cards: translateY(-5px)
- Smooth transitions: 0.3s ease
- Thin border lines for sophistication

### Components

**Navigation**
- Transparent initially, white background on scroll
- Menu items with underline hover effect

**Service Cards**
- White background with subtle border
- Icon at top (using Unicode symbols)
- Title in bold
- Description in regular weight
- Hover: lift effect with shadow increase

**CTA Buttons**
- Black background, white text
- Uppercase letters with letter-spacing
- Hover: inverted colors (white bg, black text)

**Contact Form**
- Clean input fields with bottom border only
- Focus state: black border
- Submit button matches CTA style

---

## 3. Functionality Specification

### Core Features
1. Responsive navigation with mobile hamburger menu
2. Smooth scroll to sections on nav click
3. Service cards with hover interactions
4. Contact form (client-side validation only, no backend)
5. Scroll-triggered header style change

### User Interactions
- Click nav items → smooth scroll to section
- Hover service cards → lift animation
- Click CTA button → scroll to contact section
- Fill form → basic validation (required fields)
- Mobile menu toggle → slide-in navigation

### Content to Include

**Hero Section**
- Tagline: "Professional IT Services for Homes and Businesses"
- Subtitle: "Expert Laptop Repair, System Maintenance, Windows Installation, CCTV Security Systems, and Wi-Fi Network Solutions"

**Services (5 cards)**
1. Laptop Repair and Troubleshooting
2. Laptop Maintenance and Upgrades
3. Windows Installation and Software Setup
4. CCTV Camera Installation and Security Systems
5. Wi-Fi Installation and Network Configuration

**Why Choose Us (4 points)**
1. Fast and Reliable Service
2. Affordable and Transparent Pricing
3. Certified and Experienced Technicians
4. Professional Support for Both Residential and Commercial Clients

**Contact Section**
- Title: "Contact Us Today"
- Subtitle: "For quick, reliable, and professional IT solutions tailored to your needs"
- Form fields: Name, Email, Phone, Message
- Submit button: "Send Message"

---

## 4. Acceptance Criteria

- [ ] Page loads without errors
- [ ] All 5 services are displayed in a grid layout
- [ ] Black and white color scheme is consistently applied
- [ ] Typography uses specified fonts
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] Navigation links scroll to correct sections
- [ ] Service cards have hover effects
- [ ] Contact form has basic validation
- [ ] All content from the task is included exactly as provided
- [ ] Footer displays copyright information
