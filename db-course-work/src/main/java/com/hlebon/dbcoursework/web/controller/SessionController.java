package com.hlebon.dbcoursework.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.repository.dao.SessionDao;
import com.hlebon.dbcoursework.repository.entity.SessionEntity;
import com.hlebon.dbcoursework.web.controller.views.SessionViews;
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
public class SessionController {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private SessionDao sessionDao;

    @JsonView({SessionViews.SessionWithoutSet.class})
    @GetMapping(path = "/sessions", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<SessionEntity> getSessions() {
        delay();
        List<SessionEntity> sessions = entityManager.createQuery("select d from SessionEntity d", SessionEntity.class).getResultList();
        return sessions;
    }

    @JsonView({SessionViews.SessionWithoutSet.class})
    @GetMapping(path = "/sessions/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public SessionEntity getSession(@PathVariable("id") long id) {
        delay();
        return entityManager.find(SessionEntity.class, id);
    }

    @JsonView({SessionViews.SessionWithoutSet.class})
    @PutMapping(path = "/sessions/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public SessionEntity update(@RequestBody SessionEntity sessionEntity) {
        delay();
        return sessionDao.update(sessionEntity);
    }

    private void delay() {
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
