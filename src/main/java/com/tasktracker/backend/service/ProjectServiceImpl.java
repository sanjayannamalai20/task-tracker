package com.tasktracker.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tasktracker.backend.entity.Project;
import com.tasktracker.backend.repository.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElseThrow();
    }

    @Override
    public Project updateProject(Long id, Project project) {
        Project existing = projectRepository.findById(id).orElseThrow();

        existing.setName(project.getName());
        existing.setDescription(project.getDescription());

        return projectRepository.save(existing);
    }

    @Override
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}