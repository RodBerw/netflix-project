# Netflix Clone

## Overview

This Netflix clone is a full-stack web application designed to showcase my skills in modern web development technologies. Built with Next.js (using TypeScript), Tailwind CSS, and MySQL2 with Sequelize, this project exemplifies my ability to create a responsive and dynamic user experience similar to that of the Netflix platform.

![alt text](image.png)

## Technology Stack

**Next.js:** A powerful React framework that enables server-side rendering, enhancing performance and SEO. Utilizing Next.js allows for efficient routing and seamless page transitions, contributing to a smooth user experience.

**TypeScript:** By leveraging TypeScript, I ensure type safety and maintainability throughout the application, which reduces runtime errors and enhances developer productivity.

**Tailwind CSS:** This utility-first CSS framework accelerates the styling process, allowing for rapid development of a responsive and visually appealing UI. Tailwind’s design principles promote consistency and modularity in styling.

**MySQL2:** A modern MySQL client for Node.js that facilitates efficient database management and interactions, ensuring data integrity and performance.

**Sequelize:** This powerful ORM simplifies database queries and transactions, allowing for easy integration with MySQL. It provides a structured approach to data management, enhancing code readability and maintainability.

## Key Features

**Responsive User Interface:** The application is fully responsive, providing an optimal viewing experience across different devices, from mobile to desktop.

**Dynamic Content Loading:** Real-time data fetching from the MySQL database enables users to browse a variety of movies and TV shows seamlessly.

**User Authentication:** Users can register, log in, and manage their profiles, creating a personalized experience that mimics Netflix’s functionality.

**Search and custom My-List Functionality:** This feature enables users to effortlessly search for their favorite movies and TV shows while offering a personalized "My List" functionality.

---

## Getting Started

**1-** First, **clone** and **enter** the project repo:

```bash
git clone https://github.com/RodBerw/netflix-project.git

cd netflix_project
```

**2-** Install the project dependencies:

```bash
npm install
```

**3-** Access **MySQL** and create database:

```sql
mysql -u [username] -p

CREATE DATABASE [database_name];
```

**4-** Populate the database:

```bash
mysql -u root -p [database_name] < ./netflix_db.sql

or

Get-Content netflix_db.sql | mysql -u root -p netflix_db_backup
```

**5-** Create a **.env** file in the root of the project:

```bash
#Application
PORT=3000

#Database
DB_USER=[username]
DB_PASSWORD=[password]
DB_NAME=[database_name]

#JWT
JWT_ACCESS_SECRET=netflix
JWT_REFRESH_SECRET=netflix

#Environment
NODE_ENV=development
```

**6-** **Start** the server:

```bash
npm run dev
```
