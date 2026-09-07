# Graph Report - /Users/mackay/Desktop/car-rental-frontend  (2026-09-05)

## Corpus Check
- Corpus is ~11,368 words - fits in a single context window. You may not need a graph.

## Summary
- 385 nodes · 865 edges · 41 communities (15 shown, 26 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Booking Administration|Booking Administration]]
- [[_COMMUNITY_Car Administration|Car Administration]]
- [[_COMMUNITY_Authentication|Authentication]]
- [[_COMMUNITY_Route States|Route States]]
- [[_COMMUNITY_Booking UI|Booking UI]]
- [[_COMMUNITY_Marketing and Cars|Marketing and Cars]]
- [[_COMMUNITY_Forms and Navigation|Forms and Navigation]]
- [[_COMMUNITY_Dependencies|Dependencies]]
- [[_COMMUNITY_TypeScript Configuration|TypeScript Configuration]]
- [[_COMMUNITY_Theme State|Theme State]]
- [[_COMMUNITY_Authentication Flow|Authentication Flow]]
- [[_COMMUNITY_Shared Interactive UI|Shared Interactive UI]]
- [[_COMMUNITY_Root Layout|Root Layout]]
- [[_COMMUNITY_Project Instructions|Project Instructions]]
- [[_COMMUNITY_Local Tool Settings|Local Tool Settings]]
- [[_COMMUNITY_Logout Flow|Logout Flow]]
- [[_COMMUNITY_Next Configuration|Next Configuration]]
- [[_COMMUNITY_PostCSS Configuration|PostCSS Configuration]]
- [[_COMMUNITY_ESLint Configuration|ESLint Configuration]]
- [[_COMMUNITY_Build Tooling|Build Tooling]]
- [[_COMMUNITY_NPM Scripts|NPM Scripts]]
- [[_COMMUNITY_Price Calculation|Price Calculation]]
- [[_COMMUNITY_Next ESLint Setup|Next ESLint Setup]]
- [[_COMMUNITY_Remote Images|Remote Images]]
- [[_COMMUNITY_Command Permissions|Command Permissions]]
- [[_COMMUNITY_File Icon Asset|File Icon Asset]]
- [[_COMMUNITY_Globe Icon Asset|Globe Icon Asset]]
- [[_COMMUNITY_Next Icon Asset|Next Icon Asset]]
- [[_COMMUNITY_Vercel Icon Asset|Vercel Icon Asset]]
- [[_COMMUNITY_Window Icon Asset|Window Icon Asset]]
- [[_COMMUNITY_Empty State|Empty State]]
- [[_COMMUNITY_Mobile Navigation|Mobile Navigation]]
- [[_COMMUNITY_Booking Input Type|Booking Input Type]]
- [[_COMMUNITY_Payment Input Type|Payment Input Type]]
- [[_COMMUNITY_Login Input Type|Login Input Type]]
- [[_COMMUNITY_Signup Input Type|Signup Input Type]]
- [[_COMMUNITY_Currency Formatting|Currency Formatting]]
- [[_COMMUNITY_Date Formatting|Date Formatting]]
- [[_COMMUNITY_Card Masking|Card Masking]]
- [[_COMMUNITY_Date Validation|Date Validation]]

## God Nodes (most connected - your core abstractions)
1. `getCurrentUser()` - 27 edges
2. `Container()` - 25 edges
3. `cn()` - 18 edges
4. `compilerOptions` - 16 edges
5. `getCarById()` - 16 edges
6. `buttonVariants()` - 15 edges
7. `Button()` - 15 edges
8. `Car` - 14 edges
9. `Card()` - 13 edges
10. `formatCurrencyTHB()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Development Server` --references--> `NPM Scripts`  [EXTRACTED]
  README.md → package.json
- `Next.js Agent Rules` --conceptually_related_to--> `Next.js Project`  [INFERRED]
  AGENTS.md → README.md
- `Tailwind PostCSS Plugin` --conceptually_related_to--> `TypeScript Compiler Options`  [INFERRED]
  postcss.config.mjs → tsconfig.json
- `Admin Cars Page` --calls--> `getCurrentUser()`  [EXTRACTED]
  src/app/(dashboard)/admin/cars/page.tsx → src/features/auth/auth.service.ts
- `AGENTS.md Reference` --references--> `Next.js Agent Rules`  [EXTRACTED]
  CLAUDE.md → AGENTS.md

## Hyperedges (group relationships)
- **Authentication Route Shells** — auth_layout_authlayout, login_page_loginpage, signup_page_signuppage [INFERRED 0.95]

## Communities (41 total, 26 thin omitted)

### Community 0 - "Booking Administration"
Cohesion: 0.10
Nodes (38): NotFound(), BookingDetailPage(), AdminBookingRow, AdminBookingTable(), AdminBookingTableProps, STATUS_OPTIONS, ActionResult, cancelBookingAction() (+30 more)

### Community 1 - "Car Administration"
Cohesion: 0.10
Nodes (38): Admin Cars Page, AdminCarFormModal(), AdminCarFormModalProps, CarFormFields(), CarFormFieldsProps, EMPTY_FORM, AdminCarTable(), AdminCarTableProps (+30 more)

### Community 2 - "Authentication"
Cohesion: 0.11
Nodes (29): Admin Bookings Page, ActionResult, loginAction(), logoutAction(), signupAction(), MOCK_USERS, MockUserRecord, SESSION_COOKIE_NAME (+21 more)

### Community 3 - "Route States"
Cohesion: 0.09
Nodes (23): ErrorPageProps, GlobalError(), Error Reset, BookingNotFound(), CarNotFound(), CarCardSkeleton(), ButtonProps, ButtonSize (+15 more)

### Community 4 - "Booking UI"
Cohesion: 0.12
Nodes (26): BookingDetailPageProps, BookingForm(), BookingFormProps, EMPTY_PAYMENT, BookingListItem(), BookingListItemProps, BookingSummary(), BookingSummaryProps (+18 more)

### Community 5 - "Marketing and Cars"
Cohesion: 0.11
Nodes (17): TECH_STACK, STATUS_CONFIG, StatusPillProps, CarCard(), CarCardProps, CarGrid(), CarGridProps, CarSpecs() (+9 more)

### Community 6 - "Forms and Navigation"
Cohesion: 0.12
Nodes (15): LoginForm(), LoginFormProps, MyBookingsPageProps, STATUS_TABS, Input(), InputProps, buildHref, Pagination() (+7 more)

### Community 7 - "Dependencies"
Cohesion: 0.09
Nodes (22): dependencies, lucide-react, next, react, react-dom, devDependencies, eslint, eslint-config-next (+14 more)

### Community 8 - "TypeScript Configuration"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 9 - "Theme State"
Cohesion: 0.17
Nodes (8): getServerSnapshot, getSnapshot, listeners, setTheme, subscribe(), Theme, ThemeToggle, ThemeToggle()

### Community 10 - "Authentication Flow"
Cohesion: 0.24
Nodes (10): loginAction, signupAction, createSession, createUser, findUserByCredentials, findUserByEmail, getCurrentUser, getUserById (+2 more)

### Community 11 - "Shared Interactive UI"
Cohesion: 0.29
Nodes (7): CancelBookingButton(), CancelBookingButtonProps, Button(), ConfirmDialog(), ConfirmDialogProps, Modal(), ModalProps

### Community 12 - "Root Layout"
Cohesion: 0.33
Nodes (5): geistMono, geistSans, metadata, RootLayout(), Theme Initialization Script

### Community 13 - "Project Instructions"
Cohesion: 0.67
Nodes (3): Next.js Agent Rules, AGENTS.md Reference, Next.js Project

## Knowledge Gaps
- **150 isolated node(s):** `config`, `name`, `version`, `private`, `dev` (+145 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Container()` connect `Route States` to `Booking Administration`, `Car Administration`, `Authentication`, `Booking UI`, `Marketing and Cars`, `Forms and Navigation`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `getCurrentUser()` connect `Authentication` to `Booking Administration`, `Car Administration`, `Booking UI`, `Forms and Navigation`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `Button()` connect `Shared Interactive UI` to `Booking Administration`, `Car Administration`, `Authentication`, `Route States`, `Booking UI`, `Forms and Navigation`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `config`, `name`, `version` to the rest of the system?**
  _150 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Booking Administration` be split into smaller, more focused modules?**
  _Cohesion score 0.09574468085106383 - nodes in this community are weakly interconnected._
- **Should `Car Administration` be split into smaller, more focused modules?**
  _Cohesion score 0.10195035460992907 - nodes in this community are weakly interconnected._
- **Should `Authentication` be split into smaller, more focused modules?**
  _Cohesion score 0.10741971207087486 - nodes in this community are weakly interconnected._