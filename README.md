# Zealthy Onboarding App

A full-stack onboarding flow application built with Next.js 15, TypeScript, Tailwind CSS, and MongoDB Atlas.

## Features

- **3-step onboarding wizard** with customizable components
- **Admin interface** for managing component placement
- **Real-time data table** showing user submissions
- **MongoDB Atlas integration** for cloud database
- **Responsive design** with modern UI
- **TypeScript** for type safety

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB Atlas, Mongoose
- **Database**: MongoDB Atlas (Cloud)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd zealthy-onboarding
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```bash
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://kanchetipavan04_db_user:<db_password>@cluster0.deb3gtk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# Database Name
MONGODB_DB=zealthy_onboarding

# Next.js Environment
NODE_ENV=development
```

**Important**: Replace `<db_password>` with your actual MongoDB Atlas password.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Application Structure

### Pages
- `/` - Main onboarding flow
- `/admin` - Admin interface for component management
- `/data` - Data table showing all user submissions

### API Endpoints
- `GET/POST /api/users` - User management
- `GET/PUT/DELETE /api/users/[id]` - Individual user operations
- `GET/POST /api/config` - Onboarding configuration

### Components
- **OnboardingWizard** - Main wizard component
- **ProgressIndicator** - Step progress visualization
- **AboutMeComponent** - About me form component
- **AddressComponent** - Address form component
- **BirthdateComponent** - Birthdate form component

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string and update the `MONGODB_URI` in `.env.local`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `MONGODB_DB`: Your database name
   - `NODE_ENV`: production

4. Deploy!

### Deploy to GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Push to GitHub repository
3. Enable GitHub Pages in repository settings
4. Set source to GitHub Actions
5. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `MONGODB_DB` | Database name | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |

## Database Schema

### Users Collection
```typescript
{
  _id: ObjectId,
  email: string,
  password: string,
  about_me?: string,
  street_address?: string,
  city?: string,
  state?: string,
  zip?: string,
  birthdate?: string,
  current_step: number,
  created_at: Date,
  updated_at: Date
}
```

### OnboardingConfig Collection
```typescript
{
  _id: ObjectId,
  page_2_components: string[],
  page_3_components: string[],
  created_at: Date
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact [your-email@example.com] or create an issue in the GitHub repository.
