# 🧵 Apparel Capacity Planner

> A Design Thinking Prototype built using **Next.js**, **Supabase**, and **Vercel** to help apparel factories determine whether they are **FULL** or **AVAILABLE** over the next **4 weeks** based on production capacity and incoming orders.

---

# 📖 Table of Contents

- Project Overview
- Business Problem
- Original Use Case
- Objectives
- Solution Overview
- Features
- Tech Stack
- Project Architecture
- Folder Structure
- Getting Started
- Environment Variables
- Running the Project
- API Architecture
- UI Flow
- Database Design
- File Explanation
- Deployment
- Future Improvements

---

# 🚀 Project Overview

Apparel Capacity Planner is a production planning prototype developed as part of a **Design Thinking Case Study**.

The objective is to help apparel factories determine whether they can accept new customer orders by comparing:

- Production Line Capacity
- Department Capacities
- Incoming Orders
- Shipment Dates

The application automatically calculates the production bottleneck, estimates completion dates, determines whether an order can be completed before shipment.

---

# 🏭 Business Problem

Large apparel factories manufacture products such as:

- T-Shirts
- Hoodies
- Jeans
- Jackets

Every production line consists of four departments:

```
Cut
   ↓
Sew
   ↓
Finish
   ↓
Pack
```

Each department has a different production capacity.

Example

| Department | Capacity       |
| ---------- | -------------- |
| Cut        | 1000 Units/day |
| Sew        | 900 Units/day  |
| Finish     | 850 Units/day  |
| Pack       | 950 Units/day  |

Although the Cut department can produce **1000 units/day**, the factory can only produce **850 units/day**, because the **Finish Department** is the slowest.

This slowest department is called the **Bottleneck**.

Without a planning system factories face problems such as:

- Accepting too many customer orders
- Shipment delays
- Overloaded production lines
- Poor resource utilization
- Manual planning using spreadsheets

---

# 📄 Original Use Case

Factories need to know whether they are **FULL** or **AVAILABLE** over a rolling **4-week horizon** based on:

- Orders already accepted
- Production capacity
- Manpower assigned to operations
- Shipment deadlines

A factory is only as fast as its slowest department.

The prototype should support three mandatory steps.

---

## Step 1 – Define Capacity

Define production capacity for each production line.

Example:

| Production Line | Category | Cut  | Sew  | Finish | Pack |
| --------------- | -------- | ---- | ---- | ------ | ---- |
| Line A          | T-Shirt  | 1000 | 900  | 850    | 950  |
| Line B          | Jeans    | 800  | 750  | 700    | 780  |
| Line C          | Hoodie   | 1200 | 1100 | 1000   | 1050 |

---

## Step 2 – Order Input

Planner enters:

- Style Name
- Quantity
- Production Start Date
- Shipment Date

Example

| Style    | Qty   | Shipment |
| -------- | ----- | -------- |
| Nike Tee | 12000 | 20 Jul   |

---

## Step 3 – Capacity Planning

The system should:

1. Read production line capacity
2. Find bottleneck
3. Calculate effective capacity
4. Calculate required production days
5. Calculate completion date
6. Compare completion date with shipment date
7. Mark factory as:

```
AVAILABLE

or

FULL
```

---

# 🎯 Objectives

The objective of the prototype is to provide production planners with a simple interface to:

- Define production line capacities
- Plan production orders
- Detect production bottlenecks
- Estimate production completion dates
- Identify overloaded production lines
- View production schedules
- Visualize production capacity over the next four weeks

---

# 💡 Solution Overview

Instead of only storing orders, the application performs complete production planning.

Workflow:

Dashboard
↓
Production Planning Form
↓
Select Production Line
↓
Auto-load Department Capacities
↓
Enter Order Details
↓
POST /api/capacity-plan
↓
Capacity Engine
↓
Find Bottleneck Department
↓
Calculate Effective Capacity
↓
Calculate Required Production Days
↓
Calculate Completion Date
↓
Compare Completion vs Shipment Date
↓
Generate Recommendation
↓
Save Production Plan
↓
Refresh Dashboard
↓
Refresh Production Schedule
↓
Refresh Recent Plans
↓
Refresh 4-Week Capacity Outlook

---

# ✨ Features

The application provides the following features.

## Dashboard

Displays

- Factory Status
- Production Plans
- Production Lines

---

## Capacity Planning

Allows users to

- Select Production Line
- Enter order details
- Calculate capacity

---

## Capacity Engine

Calculates bottleneck department.
Determines effective production capacity.
Calculates required production days.
Estimates completion date.
Detects spillover beyond shipment date.
Generates production recommendation.
Success Popup

Displays:

Order Accepted / Spillover status.
Estimated completion date.
Spillover days (if any).
Production recommendation.

## Production Schedule

Displays all planned production orders sorted by production start date.

---

## Recent Production Plans

Displays all previously planned production orders.

---

## 4 Week Capacity Outlook

- Week 1
- Week 2
- Week 3
- Week 4

Each week is classified as

🟢 Available

🟡 Near Full

🔴 Full

---

# 🛠 Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- CSS

---

## Backend

- Next.js Route Handlers
- REST APIs

---

## Database

- Supabase
- PostgreSQL

---

## Deployment

- Vercel

---

## Development Tools

- VS Code
- Git
- GitHub
- Supabase Dashboard
- Postman (optional)

---

# 📂 Folder Structure

```
capacityplanner

│

├── app
│   ├── api
│   │      ├── capacity-plan
│   │      ├── capacity-outlook
│   │      ├── production-lines
│   │      ├── production-schedule
│   │      └── recent-plans
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components
│   ├── Dashboard.tsx
│   ├── Header.tsx
│   ├── PlannerForm.tsx
│   ├── ResultCard.tsx
│   ├── SuccessPopup.tsx
│   ├── CapacityOutlook.tsx
│   ├── ProductionSchedule.tsx
│   └── RecentPlans.tsx
│
├── lib
│   └── supabase.ts
│
├── .env.local
│
├── package.json
│
└── README.md
```

# 🏗 High-Level Architecture (HLD)

The application follows a simple three-layer architecture.

```
                     User
                       │
                       ▼
              Next.js Frontend (UI)
                       │
             HTTP Request (REST API)
                       │
                       ▼
          Next.js Backend Route Handlers
                       │
               Business Logic Layer
                       │
                       ▼
              Supabase PostgreSQL
                       │
                       ▼
                JSON Response
                       │
                       ▼
              Next.js Frontend UI
```

---

# 🏛 Architecture Overview

The system consists of four major layers.

## 1. Presentation Layer

Responsible for interacting with users.

Technology

- Next.js
- React
- TypeScript

Responsibilities

• Display dashboard.
• Render production planning form.
• Collect user inputs.
• Display planning results.
• Display recommendation popup.
• Display production schedule.
• Display recent production plans.
• Display 4-week capacity outlook.

---

## 2. API Layer

Implemented using Next.js Route Handlers.

Responsibilities

- Receive requests
- Validate input
- Execute business logic
- Query Supabase
- Return JSON response

API Routes

```
GET  /api/production-lines

POST /api/capacity-plan

GET  /api/capacity-outlook

GET  /api/recent-plans

GET  /api/production-schedule
```

---

## 3. Business Layer

The Capacity Engine performs all calculations.

Responsibilities

• Read production line details.
• Identify bottleneck department.
• Determine effective production capacity.
• Calculate required production days.
• Estimate completion date.
• Compare completion date with shipment date.
• Determine AVAILABLE or FULL status.
• Calculate spillover days.
• Generate production recommendation.
• Save production plan.

---

## 4. Database Layer

Technology

Supabase PostgreSQL

Stores

- Production Lines
- Production Plans

---

# 📱 UI Flow

The following diagram illustrates the complete UI workflow.

```
Application Starts

        │

        ▼

Dashboard

        │

        ▼

Planner Form

        │

Select Production Line

        │

Auto Populate Capacity

        │

Enter Order Details

        │

Click Check Capacity

        │

        ▼

Backend API

        │

        ▼

Capacity Calculation

        │

        ▼

Save Plan

        │

        ▼

Success Popup

↓

Recommendation

↓

Result Card

↓

Dashboard Refresh

↓

Capacity Outlook Refresh

↓

Production Schedule Refresh

↓

Recent Plans Refresh

---

# ⚙ Backend Flow

```

PlannerForm

        │

POST /api/capacity-plan

        │

Read Request Body

        │

Read Production Line

        │

Find Effective Capacity

        │

Find Bottleneck

        │

Calculate Required Days

        │

Calculate Completion Date

        │

Compare Shipment Date

↓

AVAILABLE / FULL

↓

Calculate Spillover Days

↓

Generate Recommendation

↓

Insert into Supabase

```

---

# 🗄 Database Flow

```

User submits order

        │

        ▼

PlannerForm

        │

        ▼

Capacity API

        │

        ▼

Read Production Line

        │

        ▼

Calculate Capacity

        │

        ▼

Insert Production Plan

        │

        ▼

production_plans table

        │

        ▼

Read Latest Plans

        │

        ▼

Dashboard Refresh

```

---

# 📂 Component Architecture

```

Home (page.tsx)

│

├── Header

│

├── Dashboard

│

├── PlannerForm

│

├── SuccessPopup

│

├── ResultCard

│

├── CapacityOutlook

│

├── ProductionSchedule

│

└── RecentPlans

```

---

# 📄 File Explanation

## page.tsx

Acts as the main container of the application.

Responsibilities

- Load data
- Maintain state
- Call APIs
- Render components
- Refresh dashboard after submission

---

## Header.tsx

Displays application title and subtitle.

---

## Dashboard.tsx

Displays summary cards

- Factory Status
- Current Utilization
- Production Plans
- Production Lines

---

## PlannerForm.tsx

Responsible for

- Production Line Selection
- Order Input
- Form Validation
- Submit Request

---

## SuccessPopup.tsx

Displays

• Order Accepted / Capacity Alert
• Production Line
• Quantity
• Estimated Completion Date
• Shipment Date
• Production Spillover Days (if applicable)
• Production Recommendation

---

## ResultCard.tsx

Displays

- Effective Capacity
- Bottleneck
- Required Days
- Completion Date
- Shipment Date
- Factory Status

---

## ProductionSchedule.tsx

Displays all planned orders sorted by production start date.

---

## RecentPlans.tsx

Displays latest production plans stored in Supabase.

---

## lib/supabase.ts

Creates and exports the Supabase client.

---

# 🌐 API Explanation

## GET /api/production-lines

Returns all production lines.

Used by

Planner Form

---

## POST /api/capacity-plan

Main business API.

Responsibilities

• Read production line.
• Determine bottleneck department.
• Calculate effective capacity.
• Calculate required production days.
• Estimate completion date.
• Compare completion and shipment dates.
• Calculate production spillover days.
• Generate production recommendation.
• Save production plan.
• Return planning result.

---

## GET /api/capacity-outlook

Calculates utilization for

Week 1

Week 2

Week 3

Week 4

Returns

```

[
{
"week":"Week 1",
"utilization":75,
"status":"AVAILABLE"
}
]

```

---

## GET /api/recent-plans

Returns latest production plans.

Used by

Recent Plans Table

---

## GET /api/production-schedule

Returns production schedule sorted by production start date.

Used by

Production Schedule Table

---

# 🔄 End-to-End Application Flow

```

User

↓

Dashboard

↓

Planner Form

↓

POST /api/capacity-plan

↓

Capacity Engine

↓

Supabase

↓

Insert Production Plan

↓

Return Result

↓

Show Success Popup

↓

Refresh Dashboard

↓

Refresh Capacity Outlook

↓

Refresh Schedule

↓

Refresh Recent Plans

```

# 🗄 Database Design

The application uses **Supabase PostgreSQL** as the backend database.

Two tables are used in this project.

---

# Table 1 : production_lines

Stores the master data of all production lines.

| Column             | Description                  |
| ------------------ | ---------------------------- |
| id                 | Primary Key                  |
| line_name          | Production Line Name         |
| category           | Apparel Category             |
| cut_capacity       | Daily Cut Capacity           |
| sew_capacity       | Daily Sew Capacity           |
| finish_capacity    | Daily Finish Capacity        |
| pack_capacity      | Daily Pack Capacity          |
| effective_capacity | Lowest Capacity (Bottleneck) |
| created_at         | Record Creation Date         |

Example

| Line   | Category | Effective Capacity |
| ------ | -------- | ------------------ |
| Line A | T-Shirt  | 850                |
| Line B | Jeans    | 700                |
| Line C | Hoodie   | 1000               |

---

# Table 2 : production_plans

Stores every production order planned by the user.

| Column             | Description            |
| ------------------ | ---------------------- |
| id                 | Primary Key            |
| production_line_id | Foreign Key            |
| style_name         | Apparel Style          |
| quantity           | Total Quantity         |
| production_start   | Planned Start Date     |
| shipment_date      | Customer Shipment Date |
| required_days      | Days Required          |
| completion_date    | Estimated Completion   |
| bottleneck         | Slowest Department     |
| status             | AVAILABLE / FULL       |
| created_at         | Record Creation Date   |

---

# Entity Relationship Diagram

```

Production Lines

(id)

│

│ 1

│

▼

Production Plans

(production_line_id)

```

One Production Line can have multiple Production Plans.

---

# Capacity Calculation Logic

Read Production Line

↓

Read Department Capacities

↓

Find Minimum Capacity

↓

Effective Capacity

↓

Required Days = ceil(Quantity / Effective Capacity)

↓

Completion Date = Production Start + Required Days

↓

Completion <= Shipment ?

      ↓                 ↓

AVAILABLE FULL

      ↓                 ↓

Spillover = 0 Spillover = Completion − Shipment

↓

Generate Recommendation

---

# Environment Variables

Create a `.env.local` file in the project root.

```

NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

````

---

# Installation

Clone Repository

```bash
git clone https://github.com/<your-username>/capacityplanner.git

cd capacityplanner
````

Install Dependencies

```bash
npm install
```

Run Development Server

```bash
npm run dev
```

Application URL

```

http://localhost:3000

```

---

# Deploying to Vercel

## Step 1

Push your latest code to GitHub.

```bash
git add .

git commit -m "Final Capacity Planner"

git push origin main
```

---

## Step 2

Login to Vercel.

Create a new project.

Import GitHub Repository.

Select

```

capacityplanner

```

---

## Step 3

Configure Environment Variables.

Add

```

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

```

These values should match your `.env.local`.

---

## Step 4

Click

```

Deploy

```

The application will be available at

```

https://capacityplanner.vercel.app

```

(or your assigned Vercel URL)

---

# Challenges Faced

During development, the following challenges were encountered:

Designing meaningful utilization calculations based on overlapping production plans.
Providing production recommendations based on spillover analysis.
Synchronizing all dashboard widgets after each successful production plan creation.

---

# Future Improvements

If this prototype were extended into a production-ready application, the following enhancements would be considered:

Dynamic line allocation to recommend the best production line.
Calendar-based scheduling with weekends and holidays.
Shift-based capacity planning (multiple shifts/day).
Real-time utilization calculations across overlapping production plans.
Production conflict detection before order acceptance.
Interactive Gantt chart for production schedules.
Role-based authentication for planners and supervisors.
Email notifications for spillover or overloaded production lines.
AI-based production line recommendations.

---

# Project Outcome

The prototype successfully demonstrates the complete apparel production planning workflow.

Implemented Features

- Production Line Master
- Order Planning
- Capacity Calculation
- Bottleneck Detection
- Factory Status
- Capacity Result
- Production Schedule
- Recent Production Plans
- 4 Week Capacity Outlook
- Dashboard
- Supabase Integration
- Next.js Backend APIs
- Responsive UI

---

# Conclusion

The Apparel Capacity Planner demonstrates how modern web technologies can simplify production planning by combining capacity calculations, scheduling, and visualization into a single user-friendly application.

The solution follows the Design Thinking approach by identifying the business problem, designing a practical workflow, implementing a working prototype, and validating the planning process through interactive visualization.

---
