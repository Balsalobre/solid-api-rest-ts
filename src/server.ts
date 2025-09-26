import { app } from './app';
import { Config } from './config/Config';

// Validate environment variables
Config.validate();

app.listen(Config.PORT);

console.log(`${Config.APP_NAME} listening on http://localhost:${Config.PORT}`);
