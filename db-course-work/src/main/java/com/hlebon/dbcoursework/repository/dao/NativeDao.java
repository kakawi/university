package com.hlebon.dbcoursework.repository.dao;

import com.hlebon.dbcoursework.repository.nativeEntity.CanGetScholarShipStudent;
import com.hlebon.dbcoursework.repository.nativeEntity.DontPassStudent;
import com.hlebon.dbcoursework.repository.nativeEntity.GroupAverageMark;
import com.hlebon.dbcoursework.repository.nativeEntity.SubjectAverageMark;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class NativeDao {

    @PersistenceContext
    private EntityManager entityManager;

    public Collection<DontPassStudent> dontPassExam(long idSession, long idDepartment) {
        List<Object[]> resultList = entityManager.createNativeQuery(
                "SELECT student.last_name, student.first_name, student.middle_name, subject.name, g.group_number FROM university.student " +
                        "  JOIN university.group g ON g.id = student.group_id " +
                        "  JOIN university.set ON set.id = g.set_id " +
                        "  JOIN university.schedule ON schedule.set_id = set.id " +
                        "  JOIN university.subject ON subject.id = schedule.subject_id " +
                        "  JOIN university.session ON session.id = schedule.session_id " +
                        "  JOIN university.speciality ON speciality.id = set.speciality_id " +
                        "  JOIN university.department ON department.id = speciality.department_id " +
                        "  WHERE " +
                        "  (  " +
                        "    NOT EXISTS ( " +
                        "      SELECT 1 FROM university.student_mark  " +
                        "      WHERE student_mark.student_id = student.id and student_mark.schedule_id = schedule.id " +
                        "    ) " +
                        "    OR " +
                        "    4 > ( " +
                        "      SELECT student_mark.mark FROM university.student_mark  " +
                        "      WHERE student_mark.student_id = student.id and student_mark.schedule_id = schedule.id " +
                        "    ) " +
                        "  ) " +
                        " and session.id = " + idSession +
                        " and department.id = " + idDepartment).getResultList();


        ArrayList<DontPassStudent> result = new ArrayList<>();
        resultList.forEach(objects -> {
            DontPassStudent dontPassStudent = new DontPassStudent();
            dontPassStudent.setLastName((String) objects[0]);
            dontPassStudent.setFirstName((String) objects[1]);
            dontPassStudent.setMiddleName((String) objects[2]);
            dontPassStudent.setSubjectName((String) objects[3]);
            dontPassStudent.setGroupNumber((String) objects[4]);

            result.add(dontPassStudent);
        });

        return result;
    }

    public Collection<DontPassStudent> dontPassExamProcedure(long idSession, long idDepartment) {
        List<Object[]> resultList = entityManager.createNativeQuery("select * from university.dontpassexam(:idSession, :idDepartment)")
                .setParameter("idSession", idSession)
                .setParameter("idDepartment", idDepartment)
                .getResultList();

        ArrayList<DontPassStudent> result = new ArrayList<>();
        resultList.forEach(objects -> {
            DontPassStudent dontPassStudent = new DontPassStudent();
            dontPassStudent.setLastName((String) objects[0]);
            dontPassStudent.setFirstName((String) objects[1]);
            dontPassStudent.setMiddleName((String) objects[2]);
            dontPassStudent.setSubjectName((String) objects[3]);
            dontPassStudent.setGroupNumber((String) objects[4]);

            result.add(dontPassStudent);
        });

        return result;
    }

    public Collection<GroupAverageMark> groupAverageMarks(long idSession, long idFaculty) {
        List<Object[]> resultList = entityManager.createNativeQuery(
                "SELECT g.group_number, AVG(m.mark) FROM university.student st" +
                        "  JOIN university.group g ON g.id = st.group_id" +
                        "  JOIN university.student_mark m ON m.student_id = st.id" +
                        //-- Find faculty
                        "  JOIN university.set ON set.id = g.set_id  " +
                        "  JOIN university.speciality sp ON sp.id = set.speciality_id" +
                        "  JOIN university.department d ON d.id =  sp.department_id" +
                        "  JOIN university.faculty f ON f.id = d.faculty_id" +
                        //-- Session
                        "  JOIN university.schedule sch ON set.id = sch.set_id" +
                        "  JOIN university.session ses ON ses.id = sch.session_id" +
                        " WHERE f.id = " + idFaculty +
                        " and ses.id = " + idSession +
                        " GROUP BY g.group_number").getResultList();

        ArrayList<GroupAverageMark> result = new ArrayList<>();
        resultList.forEach(objects -> {
            GroupAverageMark groupAverageMark = new GroupAverageMark();
            groupAverageMark.setGroupNumber((String) objects[0]);
            BigDecimal averageMark = ((BigDecimal) objects[1]).setScale(2, RoundingMode.HALF_UP);
            groupAverageMark.setAverageMark(averageMark);

            result.add(groupAverageMark);
        });

        return result;
    }

    public Collection<SubjectAverageMark> subjectAverageMarks(long idSession) {
        List<Object[]> resultList = entityManager.createNativeQuery(
                "SELECT sub.name, AVG(m.marK) FROM university.student_mark m" +
                        "  JOIN university.schedule sch ON sch.id = m.schedule_id" +
                        "  JOIN university.subject sub ON sub.id = sch.subject_id" +
                        //-- SESSION
                        "  JOIN university.session ses ON ses.id = sch.session_id" +
                        "  WHERE ses.id = " + idSession +
                        " GROUP BY sub.name").getResultList();

        ArrayList<SubjectAverageMark> result = new ArrayList<>();
        resultList.forEach(objects -> {
            SubjectAverageMark subjectAverageMark = new SubjectAverageMark();
            subjectAverageMark.setSubjectName((String) objects[0]);
            BigDecimal averageMark = ((BigDecimal) objects[1]).setScale(2, RoundingMode.HALF_UP);
            subjectAverageMark.setAverageMark(averageMark);

            result.add(subjectAverageMark);
        });

        return result;
    }

    public Collection<CanGetScholarShipStudent> canGetScholarShipStudents(long idSession) {
        List<Object[]> resultList = entityManager.createNativeQuery(
                "SELECT st.last_name, st.first_name, st.middle_name, st.is_local FROM university.student st " +
                        "WHERE " +
                        "  st.is_local = TRUE " +
                        "  and                " +
                        "  (" +
                        //-- get all schedule for this student
                        "    SELECT count(*) FROM university.schedule sch" +
                        "      JOIN university.set s ON sch.set_id = s.id" +
                        "      JOIN university.group g ON g.set_id = s.id and st.group_id = g.id" +
                        "      JOIN university.session ses ON ses.id = sch.session_id" +
                        "    WHERE " +
                        "      ses.id = " + idSession +
                        "  ) = (" +
                        "    SELECT count(*) FROM university.student_mark m4" +
                        "      JOIN university.schedule sch2 ON sch2.id = m4.schedule_id and m4.student_id = st.id" +
                        "      JOIN university.session ses2 ON ses2.id = sch2.session_id" +
                        "    WHERE " +
                        "      ses2.id = " + idSession +
                        "      and" +
                        "      m4.mark > 3" +
                        "  )" +
                        " union " +
                        //"-- Foreign students" +
                        "SELECT st.last_name, st.first_name, st.middle_name, st.is_local FROM university.student st " +
                        "WHERE " +
                        "  st.is_local = FALSE " +
                        "  and " +
                        "  (" +
                        // -- get all schedule for this student
                        "    SELECT count(*) FROM university.schedule sch" +
                        "      JOIN university.set s ON sch.set_id = s.id" +
                        "      JOIN university.group g ON g.set_id = s.id and st.group_id = g.id" +
                        "      JOIN university.session ses ON ses.id = sch.session_id              " +
                        "    WHERE               " +
                        "      ses.id = " + idSession +
                        "  ) = (" +
                        "    SELECT count(*) FROM university.student_mark m3" +
                        "      JOIN university.schedule sch2 ON sch2.id = m3.schedule_id and m3.student_id = st.id" +
                        "      JOIN university.session ses2 ON ses2.id = sch2.session_id" +
                        "    WHERE " +
                        "      ses2.id = " + idSession +
                        "      and" +
                        "      m3.mark > 3" +
                        "  )" +
                        "  and" +
                        "  1 >= (" +
                        "    SELECT count(*) FROM university.student_mark as m5" +
                        "      JOIN university.schedule sch2 ON sch2.id = m5.schedule_id and m5.student_id = st.id" +
                        "      JOIN university.session ses2 ON ses2.id = sch2.session_id" +
                        "    WHERE " +
                        "      ses2.id = " + idSession +
                        "      and" +
                        "      m5.mark = 4" +
                        "  )" +
                        ";").getResultList();

        ArrayList<CanGetScholarShipStudent> result = new ArrayList<>();
        resultList.forEach(objects -> {
            CanGetScholarShipStudent canGetScholarShipStudent = new CanGetScholarShipStudent();
            canGetScholarShipStudent.setLastName((String) objects[0]);
            canGetScholarShipStudent.setFirstName((String) objects[1]);
            canGetScholarShipStudent.setMiddleName((String) objects[2]);
            canGetScholarShipStudent.setLocal((boolean) objects[3]);

            result.add(canGetScholarShipStudent);
        });

        return result;
    }

}
