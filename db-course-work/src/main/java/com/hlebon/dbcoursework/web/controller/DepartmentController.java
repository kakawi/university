package com.hlebon.dbcoursework.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.repository.entity.DepartmentEntity;
import com.hlebon.dbcoursework.web.controller.views.DepartmentViews;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(Constants.API_URL)
public class DepartmentController {

    @PersistenceContext
    private EntityManager entityManager;

    @JsonView({DepartmentViews.DepartmentWithFaculty.class})
    @GetMapping(path = "/departments", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<DepartmentEntity> getDepartments() {
        delay();
        List<DepartmentEntity> departments = entityManager.createQuery("select d from DepartmentEntity d", DepartmentEntity.class).getResultList();
        return departments;
    }

    @JsonView({DepartmentViews.DepartmentWithFaculty.class})
    @GetMapping(path = "/departments/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public DepartmentEntity getDepartment(@PathVariable("id") long id) {
        delay();
        return entityManager.find(DepartmentEntity.class, id);
    }

    private void delay() {
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
