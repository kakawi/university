package com.hlebon.dbcoursework.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.repository.dao.GroupDao;
import com.hlebon.dbcoursework.repository.entity.GroupEntity;
import com.hlebon.dbcoursework.web.controller.views.GroupViews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(Constants.API_URL)
public class GroupController {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private GroupDao groupDao;

    @JsonView({GroupViews.GroupWithSet.class})
    @GetMapping(path = "/groups", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<GroupEntity> getGroups() {
        delay();
        List<GroupEntity> groups = entityManager.createQuery("select d from GroupEntity d", GroupEntity.class).getResultList();
        return groups;
    }

    @JsonView({GroupViews.GroupWithoutSet.class})
    @GetMapping(path = "/groups/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public GroupEntity getGroup(@PathVariable("id") long id) {
        delay();
        return entityManager.find(GroupEntity.class, id);
    }

    @PostMapping(path = "/groups/create", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public GroupEntity saveGroup(@RequestBody GroupEntity group) {
        delay();
        groupDao.save(group);
        return group;
    }

    private void delay() {
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
