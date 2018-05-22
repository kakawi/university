package com.hlebon.dbcoursework.repository.dao;

import com.hlebon.dbcoursework.repository.entity.StudentMarkEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Service
public class MarkDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void save(StudentMarkEntity studentMark) {
        entityManager.persist(studentMark);
    }
}
