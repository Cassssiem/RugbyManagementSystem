# 🏉 Rugby Team Management System

## Overview
The Rugby Team Management System is a full-stack web application designed to simplify the management of a rugby club. It provides a secure platform where administrators can manage players, matches, team lineups, and user accounts, while the public can browse team information, view match results, and submit sponsorship inquiries.

This project was developed using **ASP.NET Core Web API (C#)** for the backend and **Microsoft SQL Server** as the database, with a frontend (React/TypeScript) built separately against this API.

---

## Features

### Authentication & Accounts
- Public self-registration — anyone can create an account (username + password)
- New accounts are always created with the standard `User` role; only an existing Admin can promote a user to `Admin`
- Secure login with JWT (JSON Web Token) issuance
- Passwords are hashed with BCrypt before storage — plaintext passwords are never stored or returned by the API
- Role-based authorization (`Admin` and `User`)
- A default Admin account is seeded automatically on first run

### Player Management
- Admins can create, update, and delete player profiles
- Anyone can view the full player list or an individual player's profile
- Player details include:
  - Name, Surname, Nickname, Age, Position
- Player statistics — **Matches Played, Tries, Conversions** — are **read-only** and calculated automatically from actual match participation. They cannot be set or edited directly through the Player endpoints.

### Match Management
- Admins can create, update, and delete match fixtures
- Anyone can view the match list or an individual match's details
- Match details include:
  - Opponent, Date, Location, Team, Score

### Team Structure
- The club has three fixed teams: **First Team, Second Team, Third Team**
- Each match belongs to exactly one team (a match is inherently "a First Team fixture," "a Second Team fixture," etc.) — not something assigned per player
- This keeps team membership tied to what actually happened on the pitch, rather than a permanent label on a player

### Match Participation & Stats
- Admins can add a player to a match, recording their position and match stats (tries, conversions)
- A player cannot be added to the same match twice
- Whenever a player's match participation is added, updated, or removed, their career totals (matches played, tries, conversions) are automatically recalculated — no manual reconciliation needed
- Endpoints support viewing:
  - Every player who featured in a specific match
  - A specific player's full match history
  - Every player who has represented a specific team, across all matches
  - A single player's record for a single match

### Sponsor Inquiries
- A public, unauthenticated endpoint allows prospective sponsors to submit their name, email, phone (optional), and a message
- Admins can view all submitted inquiries, mark them as reviewed, or delete them

---

## Technology Stack

### Backend
- ASP.NET Core Web API
- C#
- Entity Framework Core (Code-First, migrations)
- JWT Bearer Authentication
- BCrypt.Net for password hashing
- Swagger / OpenAPI for interactive API documentation

### Database
- Microsoft SQL Server

### Frontend
- To be built separately, consuming this backend's REST API
- React + TypeScript, React Router, Axios

---

## User Roles

### Administrator
Administrators have full access to the system and can:
- Create, update, and delete players
- Create, update, and delete matches
- Add, update, or remove players from a match's lineup
- Create, update, and delete user accounts
- View and manage sponsor inquiries

### User
Standard users (including anonymous visitors, where noted) can:
- Register for an account and log in
- View player profiles and the full player list
- View match details and match history
- View team rosters and lineups
- Submit a sponsor inquiry (no account required)

---

## Functional Requirements
- Secure authentication system with token-based sessions
- Public account registration with server-enforced role assignment (no self-promotion to Admin)
- Role-based access control on all data-modifying endpoints
- CRUD operations for Players, Matches, and Users
- Player statistics derived automatically from match participation records, never manually entered
- Match-to-team relationship enforced at the match level
- Public sponsor inquiry submission with admin-only review

---

## Non-Functional Requirements
- Secure password storage (hashed, never returned in API responses)
- Consistent, structured error responses (no raw stack traces exposed to clients)
- Reliable application availability
- Clean, layered, and maintainable codebase (Controller → Service → Repository → Database)
- API designed for consumption by a separately hosted frontend (CORS-enabled)

---

## Project Structure
```
Rugby-Team-Management/
│
├── RugbyManagementSystem Api/         # Controllers, Program.cs, Swagger config
├── RugbyManagementSystem.Application/ # Services, Interfaces, DTOs
├── RugbyManagementSystem.Domain/      # Entities, Enums
├── RugbyManagementSystem.Infastructure/ # EF Core DbContext, Repositories, Migrations
│
├── frontend/                          # (to be added)
│
└── README.md
```

## Author
Developed by **Abduraghmaan Cassiem**
