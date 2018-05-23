CREATE OR REPLACE FUNCTION university.process_finish_session()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
    BEGIN        
        IF NEW.is_finished = TRUE THEN
            -- Clear
            UPDATE university.student SET is_get_scholarship = false, premium = 0;
            -- is get scholarship FOR local
            UPDATE university.student st SET is_get_scholarship = true
            WHERE 
              st.is_local = TRUE
              and                
              (
                -- get all schedule for this student
                SELECT count(*) FROM university.schedule sch
                  JOIN university.set s ON sch.set_id = s.id
                  JOIN university.group g ON g.set_id = s.id and st.group_id = g.id
                  JOIN university.session ses ON ses.id = sch.session_id              
                WHERE               
                  ses.year_of_session = NEW.year_of_session
              ) = (
                SELECT count(*) FROM university.student_mark m4
                  JOIN university.schedule sch2 ON sch2.id = m4.schedule_id and m4.student_id = st.id
                  JOIN university.session ses2 ON ses2.id = sch2.session_id
                WHERE 
                  ses2.year_of_session = NEW.year_of_session
                  and
                  m4.mark > 3
              );
            -- is get scholarship FOR foreign
            UPDATE university.student st SET is_get_scholarship = true
              WHERE 
                st.is_local = FALSE
                and                
                (
                  -- get all schedule for this student
                  SELECT count(*) FROM university.schedule sch
                    JOIN university.set s ON sch.set_id = s.id
                    JOIN university.group g ON g.set_id = s.id and st.group_id = g.id
                    JOIN university.session ses ON ses.id = sch.session_id              
                  WHERE               
                    ses.year_of_session = NEW.year_of_session
                ) = (
                  SELECT count(*) FROM university.student_mark m3
                    JOIN university.schedule sch2 ON sch2.id = m3.schedule_id and m3.student_id = st.id
                    JOIN university.session ses2 ON ses2.id = sch2.session_id
                  WHERE 
                    ses2.year_of_session = NEW.year_of_session
                    and
                    m3.mark > 3
                )
                and
                1 >= (
                  SELECT count(*) FROM university.student_mark as m5
                    JOIN university.schedule sch2 ON sch2.id = m5.schedule_id and m5.student_id = st.id
                    JOIN university.session ses2 ON ses2.id = sch2.session_id
                  WHERE 
                    ses2.year_of_session = NEW.year_of_session
                    and
                    m5.mark = 4
                )
                ;
            -- add 50% Premium for whom get scholarhsip
            UPDATE university.student st SET premium = 50
            WHERE
              st.is_get_scholarship = true
              and
              -- Min mark is 6               
              6 <= all (
                SELECT m.mark FROM university.student_mark m
                  JOIN university.schedule sch ON sch.id = m.schedule_id
                  JOIN university.set s ON s.id = sch.set_id
                  JOIN university.session ses ON ses.id = sch.session_id
                  JOIN university.group g ON s.id = g.set_id and g.id = st.group_id  
                  WHERE
                    m.student_id = st.id
                    and
                    ses.year_of_session = NEW.year_of_session                                 
              )
              and
              -- Max 2 mark six
              2 >= (
                SELECT count(*) FROM university.student_mark m
                  JOIN university.schedule sch ON sch.id = m.schedule_id
                  JOIN university.set s ON s.id = sch.set_id
                  JOIN university.session ses ON ses.id = sch.session_id
                  JOIN university.group g ON s.id = g.set_id and g.id = st.group_id  
                  WHERE
                    m.student_id = st.id
                    and
                    ses.year_of_session = NEW.year_of_session
                    and
                    m.mark = 6                                 
              );
            -- add 100% Premium for whom get scholarhsip
            UPDATE university.student st SET premium = 100
            WHERE
              st.is_get_scholarship = true
              and 
              9 <= all (
                SELECT m.mark FROM university.student_mark m
                  JOIN university.schedule sch ON sch.id = m.schedule_id
                  JOIN university.set s ON s.id = sch.set_id
                  JOIN university.session ses ON ses.id = sch.session_id
                  JOIN university.group g ON s.id = g.set_id and g.id = st.group_id  
                  WHERE
                    m.student_id = st.id
                    and
                    ses.year_of_session = NEW.year_of_session                                 
              );                      
        END IF;        
        RETURN NULL;
    END;
$function$
