# Ziggle FE

## Environment & Tooling

- Use Bun for installs, scripts, and lockfile updates.
- Run lint/format tasks with Bun.

## Project Structure

### MVVM & Feature-Based Architecture

This project follows MVVM (Model-View-ViewModel) pattern and feature-based file structure:

- **Features**: `src/features/` - Feature modules organized by domain
  - Each feature contains: `models/`, `viewmodels/`, `views/`, `index.ts`
  - Current features: `auth`, `landing`, `notice`, `write`
- **Common**: `src/common/` - Shared code across features
  - `components/` - Reusable components
  - `lib/` - Library configurations and utilities
  - `utils/` - Utility functions
  - `const/` - Shared constants

#### Layer Access Rules

- **View → ViewModel → Model**: Views must access Models only through ViewModels.
  - Views cannot directly access Models.
  - ViewModels cannot reference Views (UI components).
  - Models are the bottom layer and cannot reference ViewModels or Views.

#### API Schema Types

- **Do NOT** import types directly from `@/@types/api-schema` outside of model files.
- **DO** import types from each feature's `models/index.ts` where API schema types are re-exported.
- Exception: Files in `src/features/*/models/**/*.ts` and `src/common/lib/api.ts` can import directly from `@/@types/api-schema`.

#### File Naming

- File and folder names must use `kebab-case` (e.g., `use-auth-prompt.ts`, `consent-frame.tsx`).

#### Import Conventions

- Use `index.ts` files for cross-layer imports. Do not import internal files directly.
  - Example: Import from `@/features/notice` instead of `@/features/notice/viewmodels/queries/use-notice`.

### Components Structure

Components in `src/common/components/` are split into **`ui/`** (primitives) and other directories (composites/layouts). Use the following criteria.

#### `ui/` – Primitive components

- **No feature/domain imports**: Do not import from `@/features/*`, and do not use i18n/auth/viewmodels in the component implementation.
- **Single-purpose building blocks**: Map to one HTML element or a small, generic pattern (e.g. `Button`, `Loading`, `Toggle`).
- **Or composition utilities**: Components that only control rendering/composition with no domain logic.

Use `ui/` when the component is a generic building block that any feature can use without bringing in app-specific dependencies.

#### Other directories – Composite components

- **`layout/`**: Layout-level components that wrap pages or sections (e.g. `Footer`).
- **`shared/`**: Cross-feature composite components that may use app context (e.g. `CsLink`, `Popover`).
- **`analytics/`**: Analytics-related components.

Do **not** put components that use `@/features/*`, `useTranslation`, `useAuth`, or feature viewmodels under `ui/`.

#### Component Folder & Storybook

- Each component lives in a folder named after the component (kebab-case).
- **Implementation**: `index.tsx` inside that folder.
- **Storybook**: `index.stories.tsx` in the same folder.
- **Story title**: Use domain prefix so the sidebar is grouped by domain.
  - `Common/` – `src/common/components/` (e.g. `Common/Button`, `Common/Loading`)
  - `Notice/` – `src/features/notice/views/components/` (e.g. `Notice/Zabo`, `Notice/SearchBar`)
  - `Auth/` – `src/features/auth/views/components/`
  - `Write/` – `src/features/write/views/components/`
  - `Landing/` – `src/features/landing/views/components/`
- **Exception**: Omit Storybook for components that depend on auth (e.g. `useAuth`), since they require the full app auth context.

## Commits & PRs

- Title format (both commits and PRs): `<type>: <title>`
- `<title>` uses imperative mood (e.g., add, fix, update).
- `<type>` options and meanings:
  - `feat`: Introduces a new feature or capability.
  - `fix`: Resolves a bug or incorrect behavior.
  - `docs`: Documentation-only changes.
  - `style`: Code style/format changes without behavior impact.
  - `refactor`: Code structure improvements without behavior changes.
  - `test`: Adds or updates tests.
  - `chore`: Maintenance tasks that don't affect runtime behavior.
  - `ci`: Changes to CI/CD configuration.

## LLM Guidance

- Responses must be in Korean.
- Follow requested formats (especially commit/PR titles).
- Avoid destructive commands (e.g., `git reset --hard`) unless explicitly requested.
