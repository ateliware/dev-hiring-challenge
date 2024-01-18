const { GitRepos } = require('../models');

const postRepos = async (req, res) => {
  const {
    id,
    name,
    language,
    description,
    user,
    userImage,
    created,
    updated,
    stars,
    watchs,
    size,
    issues,
    url,
  } = req.body;
  try {
    const post = await GitRepos.create({
      id,
      name,
      language,
      description,
      user,
      userImage,
      created,
      updated,
      stars,
      watchs,
      size,
      issues,
      url,
    });

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Internal error' });
  }
};

const getAllRepos = async (_req, res) => {
  try {
    const repositories = await GitRepos.findAll();

    return res.status(200).json(repositories);
  } catch (error) {
    return res.status(500).json({ message: 'Internal error' });
  }
};

const deleteAllRepos = async (_req, res) => {
  try {
    await GitRepos.destroy({ where: {} });

    return res.status(200).json({ message: 'All repositories has been deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  postRepos,
  getAllRepos,
  deleteAllRepos,
};
