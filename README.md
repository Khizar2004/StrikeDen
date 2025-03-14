# StrikeDen | MMA & Judo Training Center

<p align="center">
  <img src="public/logo.png" alt="StrikeDen Logo" width="200" height="auto" />
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15.1.6-000000?style=flat&logo=next.js" alt="Next.js" /></a>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat&logo=react" alt="React" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?style=flat&logo=tailwind-css" alt="Tailwind CSS" /></a>
  <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer%20Motion-12.3.1-0055FF?style=flat&logo=framer" alt="Framer Motion" /></a>
</p>

## 🥋 About

StrikeDen is a premier martial arts training center in Karachi, Pakistan, offering expert instruction in Mixed Martial Arts (MMA) and Judo. This repository contains the source code for the StrikeDen website, built with modern web technologies to provide an engaging and responsive user experience.

## ✨ Key Features

- **Responsive Design**: Fully responsive layout that looks great on all devices from mobile to desktop
- **Dark/Light Mode**: Elegant theme switching with smooth transitions
- **Animated UI Components**: Subtle animations for enhanced user experience
- **Interactive Map**: Location finder with interactive mapping
- **Class Schedule**: Comprehensive class timetable with filtering
- **Trainer Profiles**: Showcase of expert trainers with their specialties
- **Admin Dashboard**: Secure admin interface for content management
- **SEO Optimized**: Built with SEO best practices in mind

## 🚀 Live Demo

Visit the live website: [strikeden.pk](https://strikeden.pk)

## 🛠️ Technologies

- **Frontend**:
  - Next.js 15 (React framework)
  - React 19
  - Tailwind CSS (styling)
  - Framer Motion (animations)
  - Leaflet (interactive maps)

- **Backend**:
  - MongoDB (database)
  - Mongoose (ODM)
  - JWT (authentication)

- **Deployment**:
  - Vercel (hosting)

## 📦 Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/StrikeDen.git
   cd StrikeDen
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
StrikeDen/
├── app/                    # Next.js app directory
│   ├── about/              # About page
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   ├── classes/            # Classes page
│   ├── contact/            # Contact page
│   ├── trainers/           # Trainers page
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout
│   └── page.js             # Home page
├── components/             # Reusable components
├── lib/                    # Utility functions and services
├── public/                 # Static assets
├── .env.local              # Environment variables
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies and scripts
└── tailwind.config.mjs     # Tailwind CSS configuration
```

## 📱 Screenshots

<details>
<summary>View Screenshots</summary>

### Home Page
![Home Page](screenshots/home.png)

### Classes
![Classes](screenshots/classes.png)

### Trainers
![Trainers](screenshots/trainers.png)

### Contact Page
![Contact Page](screenshots/contact.png)

</details>

## 🧩 Key Components

- **ThemeProvider**: Handles dark/light mode theming
- **Navigation**: Responsive navigation with smooth transitions
- **Hero Sections**: Eye-catching hero sections with parallax effects
- **Trainers Carousel**: Interactive display of trainers
- **Class Schedule**: Dynamic class timetable with filtering options
- **FAQs**: Accordion-style frequently asked questions
- **Interactive Map**: Leaflet-based location map

## 🚀 Deployment

This project is configured for easy deployment on Vercel:

```bash
npm run build
vercel
```

## 🔍 SEO

The website is optimized for search engines with:
- Semantic HTML
- Meta tags for social sharing
- Structured data for rich results
- Sitemap generation
- Performance optimization

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgements

- Logo and branding design by [Designer Name]
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Map functionality powered by [Leaflet](https://leafletjs.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

## 📞 Contact

For any inquiries, please reach out to:

- **Email**: info@strikeden.pk
- **Phone**: +92 337 2629350
- **Address**: 2nd Floor, 38-C, Shahbaz Commercial, DHA Phase 6, Karachi, Pakistan

---

<p align="center">
  Built with ❤️ by [Your Name/Team]
</p>
