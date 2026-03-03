# Mister Dog Project — Development Log

## Date

Today

## Project

Mister Dog (Fan-made Menu + Cart Website)

---

## 1. UI Improvements

* Added Login and Sign Up buttons to the top-right of the hero section
* Styled authentication buttons to match existing design system:

  * Same color palette (red, blue, yellow theme)
  * Rounded pill style
  * Consistent shadows and hover effects
* Fixed incorrect alignment (moved from left/ugly default layout to proper top-right positioning)

---

## 2. Modal System Expansion

* Implemented a new Login Modal
* Reused existing modal architecture (same structure as Checkout modal)
* Ensured visual consistency across modals (card, backdrop, spacing, typography)

Features added:

* Email input
* Password input
* Close button
* Backdrop click to close
* Demo submit behavior

---

## 3. JavaScript Functionality

### Login System (Frontend Demo)

* Connected Login button (`#loginBtn`) to modal logic
* Implemented:

  * Open modal on click
  * Close modal via button
  * Close modal via backdrop click
  * Form submit handler with demo alert
* Added defensive guards to prevent crashes if DOM elements are missing

---

## 4. Debugging & Bug Fixes

### Critical HTML Fix

* Moved Login Modal inside `<body>` (previously placed after `</body>`, breaking DOM behavior)

### Script Stability Fix

* Fixed `openCheckout()` error:

  * Previously used undefined variables (`subtotal`, `fee`, `total`)
  * Replaced with proper `calcTotals()` destructuring
* Prevented runtime errors that were stopping other features (like login) from working

---

## 5. Code Architecture Improvements

* Maintained single event delegation system for clicks
* Preserved modular structure:

  * Menu logic
  * Cart logic
  * Checkout modal
  * Login modal (new component)
* Continued use of:

  * LocalStorage (orders)
  * Helper functions (formatBRL, calcTotals)
  * Guard checks for DOM safety

---

## 6. Skills Practiced Today

* DOM manipulation
* Modal UI logic
* Event handling
* Debugging JavaScript runtime errors
* HTML document structure correctness
* UI consistency & design systems
* Component reuse (Checkout → Login modal pattern)

---

## 7. Current Project Status

* Functional cart system ✅
* Checkout modal working ✅
* Login modal working (demo) ✅
* Responsive layout maintained ✅
* Clean visual theme consistency ✅

---

## Next Suggested Steps (Logical Progression)

1. Sign Up modal (matching Login)
2. Fake user session (localStorage login state)
3. Navbar user indicator (e.g., "Welcome, Jeff")
4. Remove items from cart
5. Quantity system in cart
6. Real backend integration (future)



2/19/2026 2:43



------------------------------------------------------



Mister Dog – Development Log

Today’s additions:

* Implemented Profile page with user session display (localStorage).
* Added redirect to Profile when logged in.
* Created Address system with dynamic list rendering below the button.
* Replaced prompt-based input with an inline address form UI.
* Enabled multiple addresses per user (stored per email key).
* Added remove address functionality and button state toggle (Add/Change Address).
* Fixed duplicated HTML sections and broken DOM IDs causing button failure.

Day: 20/02/2026 – 02:22


# Mister Dog – Dev Log (Today)

## What was implemented

* Fixed broken cart and button logic in main script.
* Corrected event handling and DOM guards.
* Implemented multi-step checkout flow:

  * Cart → Checkout Modal → Finish Order Page → Final Receipt Page.
* Persisted order data using `localStorage` (`lastOrder`).
* Added delivery form (name, phone, notes, full address).
* Implemented payment methods:

  * PIX
  * Credit (with basic validation)
  * Cash (with “change needed” field and validation).
* Added authentication guard:

  * Users must be logged in to confirm order.
  * Redirects to signup/login if not authenticated.
* Stored completed orders per user:

  * Key format: `orders_<userEmail>`
  * Newest orders saved first.
* Built Profile page:

  * Displays logged-in user info.
  * Shows order history from localStorage.
  * Allows viewing past orders (loads into receipt page).
  * Added clear orders button.
* Implemented address management system:

  * Save, list, and remove addresses per user.

## Current Architecture (Demo)

* Auth: localStorage session (fake Google/demo login)
* Orders: localStorage (per-user key)
* Checkout: multi-page state persistence via localStorage
* UI: HTML + CSS + Vanilla JavaScript (no backend)

Status: Fully functional demo e-commerce flow with account-based order history.

Date: 2026-02-22 1:41 PM

-------------------------------------------------------------------------------

Development Log — 23/02, 20:08

Implemented several UI and functionality improvements to the Mister Dog web application. Standardized menu image handling by integrating placeholder assets and aligning image paths within the /img directory. Added a quantity decrement control in the cart with proper event delegation and item removal logic. Resolved a checkout flow issue by removing a premature redirect to ensure order data is correctly stored in localStorage before navigation. Additionally, enhanced overall interface polish through button styling refinements and initiated the structural setup for a branded footer including social media and recruitment links.



--------------------------------------------------------------------------

Development Log — 24/02/2026 (14:27)

What was implemented today:

Created and improved the Profile page (user dashboard)

Implemented full address system using LocalStorage

Added support for multiple addresses per user

Added new address fields: street, complement, neighborhood, city (locked to Itapetininga), and ZIP

Display of saved addresses with remove functionality

UI improvements in the Addresses section (buttons, spacing, and layout)

Integration between Profile addresses and checkout logic

Implemented delivery fee model based on neighborhood zones (Centro, Jardim, etc.)

Automatic subtotal, service fee, and total calculation in checkout

Order summary page (“Finish Your Order”) displaying saved order data correctly

Known issue to fix next:

Delivery/service fee is not displaying correctly in all cases due to neighborhood detection mismatch between saved address data and fee calculation logic.



----------------------------------------------------------------------

📅 Development Log — Mister Dog

Date: 2026-02-24 1:51 pm

🛠️ Features Implemented Today

Implemented dynamic checkout flow using localStorage (lastOrder)

Locked delivery city to Itapetininga (business rule enforcement)

Added service fee calculation based on neighborhood and distance logic (Haversine model)

Integrated live total recalculation when typing neighborhood (real-time UX improvement)

Added order history persistence per user using orders_<email> key

Improved cart rendering and subtotal/total synchronization

Implemented checkout modal with structured order object (customer, items, totals, address)

Added validation for missing neighborhood before placing order

Hardened address structure inside order object for consistency

Debug logging added for fee calculation and saved order tracking

🧪 Issues Identified (Not Yet Fully Resolved)

Address prefill on checkout page is not working reliably

Root cause likely:

Address not consistently saved into addresses_<email> storage key

Fallback logic depends on saved profile address that may not exist yet

Key mismatch between saved address fields (bairro, neighborhood, etc.)

🍔 UI / Product Changes

Menu rendering stabilized via dynamic renderMenu()

Cart UX improved with minus quantity button

Checkout totals visually aligned with live calculations

City field set to readonly to prevent invalid delivery zones

🚧 Next Planned Feature (In Progress)

“Adicionais” (extras) system:

Add + button only for edible items (hot dogs)

Exclude beverages (water, soda, juice) from extras logic

Will require:

Item type flag (food vs drink)

Conditional UI rendering

Cart structure update to support addons

🧠 Technical Learning Progress (Implicit)

DOM event delegation handling

Stateful UI via localStorage

Business rule enforcement in frontend logic

Data flow: Menu → Cart → Checkout → Order → Profile History

Debugging async UI + storage synchronization issues

---------------------------------------------------------------------------

DEV LOG — 00:25 am | 03/01/2026

* Implemented localStorage address system per user (emailKey)
* Added renderAddresses() dynamic card rendering
* Fixed duplicate save bug (editingIndex logic)
* Separated ADD vs EDIT address behavior
* Moved “Mudar endereço” button inside each address card
* Added MAX_ADDRESSES limit (3 addresses)
* Prevented new address creation when limit is reached
* Ensured editing does not count toward address limit
* Auto-save latest address as defaultAddress for checkout
* Fixed disappearing addresses panel (render + guard issues)
* Added per-card edit and remove handlers (event delegation)
* Closed form after successful save
* Reset editingIndex after update to avoid overwrite bugs

---------------------------------------------------------------------------

DEV LOG — 02:24 pm | 03/01/2026

• Fixed checkout auth flow (logged-off users now redirect to signup instead of alert)
• Added Neighborhood (bairro) field to checkout modal for delivery fee calc
• Connected fee system to typed bairro + saved profile address fallback
• Fixed checkout modal being too low on screen (layout/spacing adjustment)
• Cleaned validation order and modal behavior during Place Order


---------------------------------------------------------------------------

🛠 Dev Log — 1:26 AM

Date: 03/03/2026
Time: 01:26 AM

Implemented global hiring toggle system (IS_HIRING) for Careers page.

Created “Not Hiring” state panel and conditionally hid full careers content.

Fixed layout centering and adjusted panel width for proper visual balance.

Cleaned empty cart placeholder (“Empty… fix that 🌭”) and replaced with user-friendly message.

Identified bug where footer and social buttons (Instagram / WhatsApp) were affected by layout changes. Issue still pending full resolution.

Minor structural refactors for cleaner conditional rendering.

Status: Feature flag system working. UI improved. Footer/social interaction bug under investigation.

---------------------------------------------------------------------------
