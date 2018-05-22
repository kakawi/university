package com.hlebon.dbcoursework.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.repository.entity.SessionEntity;
import com.hlebon.dbcoursework.repository.entity.SetEntity;
import com.hlebon.dbcoursework.web.controller.views.SetViews;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(Constants.API_URL)
public class SetController {

    @PersistenceContext
    private EntityManager entityManager;

    @JsonView({SetViews.SetWithSpeciality.class})
    @GetMapping(path = "/sets", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<SetEntity> getSets() {
        delay();
        List<SetEntity> sets = entityManager.createQuery("select d from SetEntity d", SetEntity.class).getResultList();
        return sets;
    }

    @JsonView({SetViews.SetWithoutSpeciality.class})
    @GetMapping(path = "/sets/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public SetEntity getSet(@PathVariable("id") long id) {
        delay();
        return entityManager.find(SetEntity.class, id);
    }

    @JsonView({SetViews.SetWithSpeciality.class})
    @PostMapping(path = "/sets/bySession", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<SetEntity> getSetsBySession(@RequestBody SessionEntity session) {
        delay();

        return entityManager
                .createQuery("select distinct schedule.set from ScheduleEntity schedule where schedule.session = :session", SetEntity.class)
                .setParameter("session", session)
                .getResultList();
    }

    private void delay() {
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
