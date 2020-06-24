INSERT INTO "main"."tracker_priority" ("id", "priorityname") VALUES ('0', '--');
INSERT INTO "main"."tracker_priority" ("id", "priorityname") VALUES ('1', 'low');
INSERT INTO "main"."tracker_priority" ("id", "priorityname") VALUES ('2', 'medium');
INSERT INTO "main"."tracker_priority" ("id", "priorityname") VALUES ('3', 'high');

INSERT INTO "main"."tracker_project" ("id", "projectname", "descr") VALUES ('0', '--', '--');
INSERT INTO "main"."tracker_project" ("id", "projectname", "descr") VALUES ('1', 'Start', 'Стартовый проект');

INSERT INTO "main"."tracker_status" ("id", "statusname") VALUES ('0', '--');
INSERT INTO "main"."tracker_status" ("id", "statusname") VALUES ('1', 'Registered');
INSERT INTO "main"."tracker_status" ("id", "statusname") VALUES ('2', 'Verified');
INSERT INTO "main"."tracker_status" ("id", "statusname") VALUES ('3', 'Development');
INSERT INTO "main"."tracker_status" ("id", "statusname") VALUES ('4', 'Testing');
INSERT INTO "main"."tracker_status" ("id", "statusname") VALUES ('5', 'Ready To Install');
INSERT INTO "main"."tracker_status" ("id", "statusname") VALUES ('6', 'Resolved');
INSERT INTO "main"."tracker_status" ("id", "statusname") VALUES ('7', 'Closed');

INSERT INTO "main"."tracker_tracker" ("id", "title") VALUES ('0', '--');
INSERT INTO "main"."tracker_tracker" ("id", "title") VALUES ('1', 'Bugs');
INSERT INTO "main"."tracker_tracker" ("id", "title") VALUES ('2', 'Tasks');
INSERT INTO "main"."tracker_tracker" ("id", "title") VALUES ('3', 'PRB');

INSERT INTO "main"."users_customuser" ("id", "is_superuser", "username", "first_name", "last_name", "email", "is_staff", "is_active") VALUES ('0',  '0', 'not set', 'not set', 'not set', 'default@defaultmail.com', '0', '0');
