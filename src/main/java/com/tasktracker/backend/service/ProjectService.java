package com.tasktracker.backend.service;

import java.util.List;

import com.tasktracker.backend.entity.Project;

public interface ProjectService {

    Project createProject(Project project);

    List<Project> getAllProjects();

    Project getProjectById(Long id);

    Project updateProject(Long id, Project project);

    void deleteProject(Long id);
}