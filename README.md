# Crunchyroll Anime/Video Streaming Platform

An ad-free anime streaming platform inspired by Crunchyroll, built using Next.js 15, Tailwind CSS, Nest.js, and Firebase. This project is currently under development, and for reference, you can visit the original [Crunchyroll](https://www.crunchyroll.com/).

---

## About

This platform provides a seamless, ad-free experience for anime enthusiasts, delivering high-quality content with features such as HLS streaming, categorized browsing, and user-friendly UI.

Nest.js is dedicated to CMS functionalities, including data creation, video transcoding, and content management, while Next.js handles data fetching and rendering directly in API routes or server components.

---

## Features

- **Video Streaming**: Stream videos in HLS format for optimized playback.
- **Responsive Design**: Built with Tailwind CSS for a responsive and visually appealing interface.
- **CMS Integration**: Managed using Nest.js for efficient content management and transcoding workflows.
- **Asset Storage**: Store images and videos securely using Firebase.
- **Real-time Processing**: Utilize Kafka to process and manage video transcoding tasks with ffmpeg.
- **Data Storage**: MongoDB is used to store and manage all application data.

---

## Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS
- **Backend**: Nest.js (CMS for content creation and transcoding)
- **Video Processing**: ffmpeg
- **Message Broker**: Kafka
- **Database**: MongoDB
- **Cloud Storage**: Firebase

---

## System Design

- **Frontend**: Next.js serves the user interface, ensuring server-side rendering and fast navigation. It also handles data fetching via API routes and server components.
- **Backend**: A Nest.js API is responsible for CMS functionalities such as managing content and handling video transcoding.
- **Video Storage**: Videos are uploaded to Firebase Storage and transcoded into HLS format using ffmpeg.
- **Processing Pipeline**: Kafka manages the processing of videos, enabling scalable and efficient transcoding workflows.
- **Database**: MongoDB stores user data, video metadata, genres, and other content-related information.

---

## Demo

This project is currently under development. A live demo link will be provided once the project is complete.

---

## Reference

For inspiration and reference, visit the original [Crunchyroll](https://www.crunchyroll.com/).

---

## Status

**Currently under development.**

Stay tuned for updates and new features!

### MongoDB Atlas Email:

`quvujof.betoqes@rungel.net`
