CREATE OR REPLACE FUNCTION university.dontpassexam(idsession bigint, iddepartment bigint)
 RETURNS TABLE(last_name character varying, first_name character varying, middle_name character varying, name character varying, group_number character varying)
 LANGUAGE sql
AS $function$
    SELECT student.last_name, student.first_name, student.middle_name, subject.name, g.group_number FROM university.student
      JOIN university.group g ON g.id = student.group_id
      JOIN university.set ON set.id = g.set_id
      JOIN university.schedule ON schedule.set_id = set.id
      -- 
      JOIN university.subject ON subject.id = schedule.subject_id
      JOIN university.session ON session.id = schedule.session_id
      -- Find department
      JOIN university.speciality ON speciality.id = set.speciality_id
      JOIN university.department ON department.id = speciality.department_id
      WHERE
      ( 
        NOT EXISTS (
          SELECT 1 FROM university.student_mark 
          WHERE student_mark.student_id = student.id and student_mark.schedule_id = schedule.id
        )
        OR
        4 > (
          SELECT student_mark.mark FROM university.student_mark 
          WHERE student_mark.student_id = student.id and student_mark.schedule_id = schedule.id
        )
      )
    and session.id = idSession
    and department.id = idDepartment;    
    $function$
