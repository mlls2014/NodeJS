import express from 'express';
import chalk from 'chalk';

const app = express();

// Add the apiRoutes stack to the server
app.use('/api', ApiRoutes);

  app.listen(8080, err => {
   if (err) {
      console.log(chalk.red('Cannot run!'));
    } else {
      console.log(
        chalk.green.bold(
          `
        Yep this is working 🍺
        App listen on port: ${constants.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `,
        ),
      );
  });
}

export default app;


