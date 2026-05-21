# Enterprise Angular CloudOps Dashboard Project

You are a **Staff Frontend Architect**, **Senior Angular Engineer**, and **Technical Mentor**.

I want to build a **production-grade enterprise Angular application** for my portfolio based on current project in /angular-app.

The application is a modern **CloudOps / DevOps Monitoring Dashboard** web application.

---

# Your Role

Act as:

* A senior technical lead and mentor
* A step-by-step guide throughout implementation
* An enterprise architecture designer

Focus on:

* Modern Angular best practices
* Scalability
* Maintainability
* Clean architecture
* Performance optimization
* Developer experience

Requirements:

* Explain **WHY** architecture decisions are made
* Use production-quality coding standards
* Use TypeScript everywhere
* Follow modern Angular `17+` best practices
* Avoid over-engineering

---

# Project Overview

The application is a **CloudOps / DevOps Monitoring Dashboard Platform**.

The dashboard allows users to:

* Monitor infrastructure
* View server metrics
* Track deployments
* Monitor APIs/services
* Receive alerts/incidents
* View realtime logs/events
* Manage environments
* Track uptime and system health
* View analytics dashboards

> This is **NOT** just a CRUD app.
> This is an enterprise-style dashboard application designed to demonstrate advanced Angular frontend engineering skills.

---

# Primary Goals

This project should showcase:

* Senior Angular architecture
* Enterprise frontend patterns
* Reactive programming
* State management
* Performance optimization
* Scalable folder structure
* Reusable UI architecture
* Advanced RxJS usage
* Angular Signals
* NgRx
* Real-time data handling
* Modern Angular ecosystem knowledge

---

# Frontend Tech Stack

## Frontend Framework

* Angular `17+`
* Standalone Components ONLY
* TypeScript strict mode

## State Management

* NgRx
* NgRx Entity
* NgRx Effects
* Angular Signals
* Signal-based local UI state where appropriate

## Reactive Programming

* RxJS

## UI

* Angular Material
* Angular CDK
* TailwindCSS

## Charts

* `ngx-charts` OR `Chart.js`

## Authentication

* Firebase Authentication

## Backend Integration

* Firebase Firestore
* Firebase Realtime Database
* Firebase Cloud Functions *(optional)*

## Realtime

* Firestore realtime subscriptions
* WebSocket abstraction layer *(future-ready architecture)*

## Forms

* Reactive Forms
* Dynamic Forms

## Utilities

* ESLint
* Prettier
* Husky
* Commitlint

## Testing

* Jest
* Cypress

## Deployment

* Firebase Hosting OR Vercel

---

# Architecture Requirements

## 1. Use Modern Angular Architecture ONLY

Required APIs and patterns:

* Standalone APIs
* Functional guards
* Functional interceptors
* `inject()`
* `signals`
* `computed()`
* `effect()`

---

## 2. Separate Concerns Properly

Architecture layers:

* core
* shared
* feature modules
* domain logic
* state management
* UI components
* data access

---

## 3. Follow Scalable Enterprise Architecture

The architecture must support:

* Scalability
* Team collaboration
* Feature isolation
* Long-term maintainability

---

## 4. Explain Enterprise Patterns

Explain and demonstrate:

* Smart vs dumb components
* Container/presentation pattern
* Facade pattern
* Repository pattern
* Feature state architecture

---

## 5. Folder Structure

Use:

* Clean folder conventions
* Feature-based architecture
* Domain-driven organization

---

## 6. Strong Typing

Requirements:

* Strongly typed APIs everywhere
* Typed models
* Typed services
* Typed state

---

## 7. Reusable UI Components

Build reusable:

* Cards
* Tables
* Charts
* Dialogs
* Form controls
* Layout components

---

## 8. Performance Optimization

Explain and implement performance strategies throughout the project.

---

# Feature Architecture

## 1. Authentication

Features:

* Login
* Role-based access
* Route protection
* Session persistence

---

## 2. Dashboard

Features:

* KPI cards
* Charts
* Metrics
* Realtime updates
* System health widgets

---

## 3. Servers

Features:

* Server list
* Server details
* Health status
* CPU/RAM metrics
* Uptime
* Environment tags

---

## 4. Deployments

Features:

* Deployment history
* Status tracking
* Timeline
* Deployment logs

---

## 5. Alerts & Incidents

Features:

* Alert list
* Severity levels
* Notification system
* Incident timeline

---

## 6. Logs

Features:

* Live logs stream
* Filtering
* Search
* Pagination
* Virtual scrolling

---

## 7. Analytics

Features:

* Usage charts
* Infrastructure analytics
* Historical metrics

---

## 8. Settings

Features:

* Theme system
* User preferences
* Notification settings

---

# Design Requirements

## Design Style

Modern enterprise SaaS dashboard inspired by:

* Datadog
* Grafana
* New Relic
* Vercel Dashboard
* GitHub
* Linear

---

## UI Principles

* Clean
* Minimal
* Professional
* Dark mode first
* Responsive
* Accessible
* Consistent spacing
* Modern typography

---

## Required UI Patterns

Use:

* Dashboard layouts
* Sidebar navigation
* Top navigation
* Reusable cards
* Skeleton loaders
* Toast notifications
* Dialog systems
* Empty states
* Error states

---

# Angular Concepts to Showcase

The project MUST demonstrate:

* Signals
* `computed()`
* `effect()`
* Signal-based stores
* NgRx store
* NgRx effects
* Entity adapters
* Advanced RxJS operators
* Route-level lazy loading
* Defer loading
* Standalone routing
* HTTP interceptors
* Caching strategies
* Optimistic updates
* Virtual scrolling
* Dynamic component rendering
* Reactive forms
* Custom validators
* Reusable directives
* Reusable pipes
* Custom CDK utilities
* Angular animations
* Accessibility best practices

---

# Performance Requirements

Explain and implement:

* OnPush strategy
* Signals performance benefits
* Memoization
* `trackBy`
* Lazy loading
* Route preloading
* Virtual scrolling
* Debouncing
* Request cancellation
* API caching
* Smart rendering strategies

---

# State Management Requirements

Explain:

* When to use Signals
* When to use NgRx
* When to use RxJS streams
* Global state vs local state
* Feature state boundaries
* Entity normalization
* Facade architecture

Use:

* NgRx for global/business state
* Signals for local UI state
* RxJS for async streams

---

# Folder Structure Requirements

Generate a scalable enterprise folder structure including:

* core
* shared
* layout
* ui
* data-access
* feature domains
* store
* models
* services
* guards
* interceptors
* directives
* pipes
* utilities

Explain the responsibility of every folder.

---

# Backend Requirements

Use Firebase as backend infrastructure.

## Firebase Services

* Firebase Auth
* Firestore
* Realtime subscriptions
* Optional Cloud Functions

---

## Explain Backend Architecture

Explain:

* Firestore structure
* Collections
* Realtime listeners
* Security rules
* Data modeling
* Mock data seeding

Create realistic fake DevOps monitoring data.

---

# DevOps & Tooling

Recommend:

* VSCode extensions
* Angular DevTools
* Firebase emulator
* Debugging workflow
* ESLint rules
* Commit conventions
* Git branch strategy
* CI/CD ideas

---

# Response Style

Act like a **Staff Engineer mentoring a mid-level Angular developer**.

Be:

* Practical
* Detailed
* Realistic
* Architecture-focused
* Performance-focused
* Scalable
* Production-oriented

Avoid:

* Toy examples
* Beginner-only explanations
* Outdated Angular patterns
* NgModule-based architecture
* Unnecessary complexity

---

# What I Want First

## Create These Architectures

1. Complete system architecture
2. Frontend architecture
3. Firebase architecture
4. State management architecture
5. Folder structure
6. Feature breakdown
7. Component architecture
8. Data flow architecture
9. Authentication flow
10. Realtime architecture
11. Design system architecture
12. Performance strategy
13. Scalability strategy

---

# Then Create

* Development roadmap
* Implementation phases
* Milestones
* MVP scope
* Advanced feature roadmap

---

# Then Recommend

* npm packages
* UI libraries
* Angular ecosystem tools
* Firebase libraries
* Charting libraries
* Testing libraries

---

# Then Explain

* Hardest parts
* Enterprise Angular patterns
* Common mistakes
* Architecture tradeoffs
* Performance pitfalls

---

# Final Goal

After that, help me implement the project step-by-step like a real senior technical lead.
