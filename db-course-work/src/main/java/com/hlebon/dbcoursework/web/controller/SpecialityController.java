package com.hlebon.dbcoursework.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.repository.entity.SpecialityEntity;
import com.hlebon.dbcoursework.web.controller.views.SpecialityViews;
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
public class SpecialityController {

    @PersistenceContext
    private EntityManager entityManager;

    @JsonView({SpecialityViews.SpecialityWithDepartment.class})
    @GetMapping(path = "/specialities", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<SpecialityEntity> getSpecialities() {
        delay();
        List<SpecialityEntity> specialities = entityManager.createQuery("select d from SpecialityEntity d", SpecialityEntity.class).getResultList();
        return specialities;
    }

    @JsonView({SpecialityViews.SpecialityWithoutDepartment.class})
    @GetMapping(path = "/specialities/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public SpecialityEntity getSpeciality(@PathVariable("id") long id) {
        delay();
        return entityManager.find(SpecialityEntity.class, id);
    }

    private void delay() {
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
