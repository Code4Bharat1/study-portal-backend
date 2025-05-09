const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { runCodeInSandbox } = require('../utils/sandbox');

router.get('/projects', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const projects = await Project.find(query);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/projects/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/execute', async (req, res) => {
  try {
    const { code, category } = req.body;
    if (!code || !category) {
      return res.status(400).json({ error: 'Code and category are required' });
    }
    const output = await runCodeInSandbox(code, category);
    res.json({ output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;