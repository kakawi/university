package com.hlebon.dbcoursework.repository.dao;

import com.hlebon.dbcoursework.repository.entity.StudentEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Service
public class StudentDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void save(StudentEntity studentEntity) {
        entityManager.persist(studentEntity);
    }

}
