# Shufei Gong's New Jobs Board

Created by **React Native + TypeScript**

A high-performance React Native application that displays job postings from the Hacker News API. This project is built with a focus on rendering optimization, TypeScript type safety, and clean architecture.

## Development Setup

In your terminal

1. Run `git clone https://github.com/shufeigong/shufei-rn-app.git`.
2. Run `cd [your/path/to]/shufei-rn-app`.
3. Run `npm install`.
4. Run `npx expo start`.
5. Open http://localhost:8081 in your browser or use your simulator to test.

See screen record on iOS for result:

https://github.com/user-attachments/assets/979f68c7-50ff-42c5-b966-b8a257d88fcd

## Key Features

- **Solve Liquid Tabs issue**: Implement Liquid Glass Tabs, it can be shown on latest iOS 26 system which is released in Jan, 2026, but there is a header issue not solved even in official doc, solved here.
- **Infinite Scrolling**: Efficiently fetches and renders job details in chunks (6-10 items per batch).
- **Performance Optimized**: Utilizes advanced FlatList properties and memoization strategies to ensure 60 FPS scrolling.
- **Type Safety**: Comprehensive TypeScript interfaces for Hacker News API entities.
- **Responsive UI**: Clean, modern card layout with "no more data" and loading feedback.
