import { environment } from '../environments/environment';
let url = '';
if (environment.production) {
    url = 'http://35.198.5.230/api/';
} else {
    url = 'http://localhost:3000/api/';
}
export const API_CONFIG = {
    'url': url
};
