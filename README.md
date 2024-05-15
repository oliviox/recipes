This web app helps you get the healthy recipe of the current day. It provides a selection of meals for breakfast, lunch, and dinner based on the current day of the week and the selected week in a 4-week cycle. The recipes are designed to be healthy and varied, ensuring a balanced diet throughout the week.

## Getting Started

### Installation

First, ensure you have [Bun](https://bun.sh/) installed. If not, you can install it by following the instructions on the [Bun website](https://bun.sh/).

Clone the repository and navigate to the project directory:

```
bun install
```

### Running the Application

To start the development server, run:

```
bun run dev
```

### Deploying to Vercel


To deploy the application to Vercel, follow these steps:

1. **Install Vercel CLI**: If you haven't already, install the Vercel CLI globally on your machine.
   ```sh
   npm install -g vercel
   ```

2. **Login to Vercel**: Authenticate with your Vercel account.
   ```sh
   vercel login
   ```

3. **Deploy the Application**: Run the following command in the root directory of your project.
   ```sh
   vercel
   ```

4. **Follow the Prompts**: The CLI will prompt you to configure your project. You can accept the default settings or customize them as needed.

5. **Set Environment Variables**: If your application requires environment variables, you can set them in the Vercel dashboard or using the CLI.
   ```sh
   vercel env add
   ```

6. **View Deployment**: Once the deployment is complete, the CLI will provide a URL where your application is live.

For more detailed instructions, refer to the [Vercel documentation](https://vercel.com/docs).

