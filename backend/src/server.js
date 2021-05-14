import { port } from './config/server';
import app from './app';

app.set('port', port);

app.listen(app.get('port'));
