/**
 *  Luís Henrique Beltrão Santana
 *  3 de novembro de 2019
 */
import {User} from './user';

export class Repository {
  author?: string;
  name?: string;
  avatar?: string;
  url?: string;
  description?: string;
  language?: string;
  stars?: number;
  forks?: number;
  currentPeriodStars?: number;
  builtBy?: User[];
}
