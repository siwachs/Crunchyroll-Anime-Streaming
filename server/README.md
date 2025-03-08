# Crunchyroll Anime/Video Streaming - Server

This high-performance **NestJS** backend powers the Crunchyroll CMS, handling **HLS media transcoding, content creation, and file uploads**. It is fully decoupled from the client and optimized for **high throughput and scalability**.

**Kafka asynchronously manages both media transcoding and static/media file uploads**, while **promise pooling and API retries** improve performance and stability. **FFmpeg** is used for video processing, **MongoDB** for content management, and **Supabase’s S3-compatible storage** for static assets.

## 🔥 Tech Stack:
- **Node.js + NestJS** – Scalable, modular backend.
- **TypeScript** – Type-safe, maintainable code.
- **FFmpeg** – HLS media transcoding.
- **Kafka** – Asynchronous processing for **both transcoding and uploads**.
- **MongoDB** – NoSQL database for content storage.
- **Supabase (S3 Bucket)** – Cloud storage for static and media assets.

## 🚀 Features:
- **Decoupled CMS Server** – Handles **content creation, transcoding, and uploads**.
- **Kafka-Powered Processing** – **Manages both transcoding and file uploads** asynchronously.
- **HLS Media Transcoding** – Converts videos into HLS segments for optimized streaming.
- **Concurrent Uploads** – Uses **promise pooling** for speed and efficiency.
- **Auto-Retry API Requests** – Ensures reliability under failure conditions.
- **Optimized for High Throughput** – Scales efficiently under heavy load.
