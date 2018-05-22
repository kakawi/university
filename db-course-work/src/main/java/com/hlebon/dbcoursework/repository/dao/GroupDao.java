package com.hlebon.dbcoursework.repository.dao;

import com.hlebon.dbcoursework.repository.entity.GroupEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Service
public class GroupDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void save(GroupEntity group) {
        entityManager.persist(group);
    }
}
