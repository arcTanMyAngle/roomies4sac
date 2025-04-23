# Getting Started with the Roomies4Sac Project

Welcome to the Roomies4Sac project! This guide will help you set up and run the project on your local machine, even if you're new to web development.

## Prerequisites

Before you begin, make sure you have the following tools installed:

- **Git:** Used for version control. Download it from [https://git-scm.com/](https://git-scm.com/).
- **Node.js:** JavaScript runtime environment. Download the LTS version from [https://nodejs.org/en/download](https://nodejs.org/en/download). This also installs **npm** (Node Package Manager).

### Verifying Installation

Open your terminal and run the following commands to check if Git, Node.js, and npm are installed:

```zsh
git -v
node -v
npm -v
```

You should see version numbers for each tool. If you get an error, double-check your installation and PATH settings.

---

## Project Setup

1. **Clone the Repository:**

Clone the project repository to your local machine:

```zsh
git clone https://github.com/arcTanMyAngle/roomies4sac
```

2. **Install Dependencies:**

Navigate to the project directory:

```zsh
cd roomiesWebApp
```

Install the project dependencies:

```zsh
npm install --force
```

The `--force` flag helps resolve potential dependency conflicts. This step may take a few minutes.

3. **Start the Development Server:**

Start the application:

```zsh
npm run dev
```

This will start the app and make it accessible in your browser. The terminal will show the address (usually http://localhost:3000).

4. **Access the Application:**

Open your browser and go to the address provided (usually http://localhost:3000). You should see the Roomie4Sac application running!

## Contributing

- **Commit Frequently:** Use clear and concise commit messages.
- **Branching:** Create a new branch for each feature or bug fix.
- **Push Your Changes:** Push your branch to the remote repository when ready.
- **Pull Requests:** Submit a pull request to merge your changes into the main branch.

## Troubleshooting

If you encounter issues during setup:

- **Check Terminal Output:** Read error messages for clues.
- **Google the Error:** Search for solutions online.
- **Ask for Help:** Reach out to team members or experienced developers.

Good luck, and happy coding!
