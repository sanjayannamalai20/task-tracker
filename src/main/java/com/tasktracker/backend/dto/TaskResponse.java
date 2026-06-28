package com.tasktracker.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.tasktracker.backend.entity.Priority;
import com.tasktracker.backend.entity.TaskStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskResponse {

    private Long id;

    private String title;

    private String description;

    private TaskStatus status;

    private Priority priority;

    private LocalDate dueDate;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Long projectId;
}