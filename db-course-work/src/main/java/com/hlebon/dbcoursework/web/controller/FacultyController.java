package com.hlebon.dbcoursework.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.repository.dao.FacultyDao;
import com.hlebon.dbcoursework.repository.entity.FacultyEntity;
import com.hlebon.dbcoursework.web.controller.views.FacultyViews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(Constants.API_URL)
public class FacultyController {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private FacultyDao facultyDao;

    @JsonView(FacultyViews.FacultyWithoutDepartment.class)
    @GetMapping(path = "/faculties", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<FacultyEntity> getFaculties() {
        delay();
        List<FacultyEntity> faculties = entityManager.createQuery("select f from FacultyEntity f", FacultyEntity.class).getResultList();
        return faculties;
    }

    @JsonView(FacultyViews.FacultyWithDepartment.class)
    @GetMapping(path = "/faculties/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public FacultyEntity getFaculty(@PathVariable("id") long id) {
        delay();
        return entityManager.find(FacultyEntity.class, id);
    }

    @JsonView(FacultyViews.FacultyWithDepartment.class)
    @PutMapping(path = "/faculties/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public FacultyEntity update(@RequestBody FacultyEntity facultyEntity) {
        delay();
        return facultyDao.update(facultyEntity);
    }

    private void delay() {
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
