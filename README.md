# Kanban app
The Kanban app is a project designed to help users organize their tasks efficiently using Kanban boards. Users can add tasks to separate Kanbans, manage their progress through different sections, and edit task details such as descriptions, categories, and priority levels. This application is built using Next.js 14, TypeScript, CSS Modules, bcryptjs for password hashing, react-beautiful-dnd for drag-and-drop functionality, and MongoDB for database management.

## Run Locally 🛠️
 
Clone the project

```bash
  git clone https://github.com/Osinek280/kanban_app.git
```

Go to the project directory

```bash
  cd kanban_app
```

Install dependencies

```bash
  npm install
```

Start the app 

```bash
  npm run dev
```

## Users Data
| username        | login              | password |
|-----------------|--------------------|----------|
| Smith           | `smithy@23`        | 123123   |

## Features
- Adding tasks to separate kanbans
- Managing their condition by sections
- Editing task sections, descriptions, categories, and priority levels.
## Tech Stack
- Next js 14
- TypeScript
- CSS Modules
- bcryptjs
- react-beautiful-dnd
- moongoDB
## Data structure
Users:
```
  _id: ObjectId();
  name: string;
  email: string;
  password: string;
```
File:
```
  _id: string;
  name: string;
  ownerId: string;
  sections: string[];
  tasks: Task[];
```
Task:
```
  _id: string;
  title: string;
  description: string;
  category: string | null;
  priority: Priority;
  subtasks: string[];
```
## App Endpoint

```http
  /login
  /register
  /files
  /files/new
  /kanban/[slug]
```

## API Reference

#### about new User

```http
  POST /register
```

#### about Sections

```http
  GET | POST | PATCH | DELETE /files/:id/section
```

#### about about Tasks

```http
  POST | PUT | PATCH | DELETE /files/:id/task
```
#### about File

```http
  GET /files/:id
```

#### again about File

```http
  GET | POST /file
```

![App Video](https://github.com/Osinek280/kanban_app/issues/1#issue-2128731412)