# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-file baby alphabet learning web application built with vanilla HTML, CSS, and JavaScript. The app teaches children letters (A-Z) and numbers (1-10) through interactive cards with visual and audio feedback.

## Architecture

The application is entirely contained in `index.html` and consists of:

### Core Components
- **Data Arrays**: `alphabetData` and `numberData` containing letter/number objects with associated words, colors, and emojis
- **Audio System**: Speech Synthesis API with queue management via `cancelCurrentAudio()` and `playSound()`
- **Visual Feedback**: CSS animations and transforms for card interactions
- **Navigation**: Touch/swipe support, keyboard navigation, and auto-play functionality

### Key Design Patterns
- **Responsive Design**: Mobile-first approach with `clamp()` functions and multiple breakpoints
- **Accessibility**: AAA contrast compliance (7:1 ratio) for all text colors against light backgrounds
- **Audio Management**: Prevents overlapping sounds by canceling current audio before starting new playback
- **State Management**: Simple JavaScript variables track current mode (`alphabet`/`numbers`) and index

### Layout Structure
- **50/50 Split**: Letter and emoji cards displayed side-by-side using flexbox
- **Card System**: Square aspect-ratio containers with gradient backgrounds and shadows
- **Mobile Optimization**: Uses `100dvh`, `env(safe-area-inset-*)` for proper mobile viewport handling

## Development Notes

### Mobile Responsiveness
- Card sizes can be adjusted at lines 340/346 (mobile) and 406/412 (short screens)
- Text scaling uses `clamp()` with viewport-relative units for responsive typography
- Touch events handle swipe navigation with horizontal gesture detection

### Color System
All text colors are carefully chosen for AAA contrast against the yellow-orange gradient background:
- Dark variants of green, blue, red, purple, teal, brown, and gray
- Colors are defined in the data arrays and applied dynamically via `display.style.color`

### Audio Implementation
- Uses Web Speech API's `speechSynthesis.speak()`
- Preference for female/child-friendly voices when available
- Queue management prevents audio overlap and provides immediate cancellation on navigation

### External Dependencies
- **Fredoka Font**: Child-friendly Google Font for improved readability
- **Material Icons**: For navigation and sound buttons
- **TailwindCSS**: Used minimally for utility classes on mode switcher buttons

## Running the Application

Simply open `index.html` in any modern web browser. No build process or server required.