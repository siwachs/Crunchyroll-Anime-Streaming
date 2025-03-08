# Crunchyroll Anime/Video Streaming - Server

This is the high-performance backend for the Crunchyroll CMS, built using **NestJS**. It handles **HLS media transcoding and concurrent uploads using Kafka**, ensuring **optimized video streaming and content management**. The backend is fully independent from the client and designed for **high throughput and scalable performance**.

It supports **automatic API retry mechanisms** to handle failures and uses **promise pooling** for **efficient concurrent uploads**. Both **media transcoding and file uploads are managed asynchronously with Kafka**, improving performance and scalability. Static assets are stored in **Supabase’s S3-compatible bucket**, while **MongoDB** serves as the database.

### 🔥 Tech Stack:
- **Node.js** + **NestJS** – Scalable, modular backend.
- **TypeScript** – Type-safe, maintainable code.
- **FFmpeg** – Handles HLS media transcoding.
- **Kafka** – Manages **both file uploads and transcoding** asynchronously.
- **MongoDB** – NoSQL database for content management.
- **Supabase (S3 Bucket)** – Cloud storage for static assets.

### 🚀 Features:
- **HLS Media Transcoding** – Converts videos into HLS segments for streaming.
- **Kafka-Powered Processing** – **Handles both uploads and transcoding** asynchronously.
- **Concurrent Uploads** – Uses **promise pooling** for optimized speed.
- **Auto-Retry API Requests** – Ensures API reliability in case of failures.
- **Optimized for High Throughput** – Designed to scale efficiently.
