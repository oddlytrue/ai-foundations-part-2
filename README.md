# AI Lab Notes

AI Lab Notes is a small beginner-friendly Vite app for keeping web and AI learning notes in your browser. It has a setup checklist, a Linux/Git cheat sheet, and a fictional lab notes form.

The app does not use a backend, accounts, analytics, databases, external APIs, passwords, tokens, private data, or paid services. Saved notes use your browser's `localStorage`.

## Install Dependencies

Run this inside the `ai-lab-notes` folder:

```bash
npm install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Vite will print a local URL, usually:

```text
http://localhost:5173/
```

Open that URL in your browser.

## Build the App

Create a production build:

```bash
npm run build
```

The finished files will be in the `dist` folder.

Preview the production build:

```bash
npm run preview
```

## Basic GitHub Workflow

Check what changed:

```bash
git status
```

Stage your files:

```bash
git add .
```

Commit your work:

```bash
git commit -m "Build AI Lab Notes app"
```

Push to GitHub:

```bash
git push
```

If this is the first push for a branch, use:

```bash
git push -u origin main
```

## Deploy to Vercel

1. Push the project to GitHub.
2. Go to [Vercel](https://vercel.com/).
3. Sign in with GitHub.
4. Choose **Add New Project**.
5. Select this repository.
6. Use these settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Select **Deploy**.

After deployment, Vercel will give you a public URL for the app.
