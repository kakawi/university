package com.hlebon.dbcoursework.repository.dao;

import com.hlebon.dbcoursework.repository.entity.SessionEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Service
public class SessionDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public SessionEntity update(SessionEntity session) {
        return entityManager.merge(session);
    }
}
