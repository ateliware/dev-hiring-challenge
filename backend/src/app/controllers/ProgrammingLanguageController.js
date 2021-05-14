import ProgrammingLanguage from '../models/ProgrammingLanguage';

class ProgrammingLanguageController {
  async index(req, res) {
    try {
      const programmingLanguages = await ProgrammingLanguage.findAll({
        attributes: ['id', 'github_login', 'name'],
        order: [['id', 'ASC']],
      });

      return res.json(programmingLanguages);
    } catch (error) {
      return res.status(500).json({ message: 'Houve um erro no servidor' });
    }
  }
}

export default new ProgrammingLanguageController();
