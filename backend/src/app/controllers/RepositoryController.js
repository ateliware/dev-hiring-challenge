import axios from 'axios';

import apis from '../../config/apis';
import Repository from '../models/Repository';
import ProgrammingLanguage from '../models/ProgrammingLanguage';

class RepositoryController {
  async store(req, res) {
    try {
      await Repository.create({ ...req.body, id: null });
      return res.status(200).send();
    } catch (error) {
      return res.status(500).json({ message: 'Houve um erro no servidor' });
    }
  }

  async list(req, res) {
    try {
      const repositories = await Repository.findAll({
        where: { programming_language_id: req.params.ownerId },
        order: [['id', 'ASC']],
        include: [
          {
            model: ProgrammingLanguage,
            as: 'programming_language',
          },
        ],
      });

      return res.status(200).json(repositories);
    } catch (error) {
      return res.status(500).json({ message: 'Houve um erro no servidor', error });
    }
  }

  async search(req, res) {
    try {
      const { data } = await axios.get(
        `${apis.github}search/repositories?q=org:${req.params.ownerName}+topics:5+sort:author-date-desc`,
      );

      return res.status(200).json(data.items);
    } catch (error) {
      return res.status(500).json({ message: 'Houve um erro no servidor' });
    }
  }

  async destroy(req, res) {
    try {
      const camera = await Repository.findOne({ where: { id: req.params.id } });
      await camera.destroy();
      return res.status(200).send();
    } catch (error) {
      return res.status(500).json({ message: 'Houve um erro no servidor' });
    }
  }
}

export default new RepositoryController();
