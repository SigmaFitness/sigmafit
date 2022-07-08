


-- spartan leg day workout

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


insert into public.workout(id, "name", category, target_body_part, intensity, owner_id, is_public)
values(gen_random_uuid(), 'Barbell Squats', 'WEIGHT_AND_REPS', 'LEGS', 'HARD', '8ac34e24-77e8-4d8a-afb4-7a64d1232fb1', true),
(gen_random_uuid(), 'Leg Curls', 'WEIGHT_AND_REPS', 'LEGS', 'MEDIUM', '8ac34e24-77e8-4d8a-afb4-7a64d1232fb1', true),
(gen_random_uuid(), 'Leg Press', 'WEIGHT_AND_REPS', 'LEGS', 'HARD', '8ac34e24-77e8-4d8a-afb4-7a64d1232fb1', true),
(gen_random_uuid(), 'Calfs', 'WEIGHT_AND_REPS', 'LEGS', 'MEDIUM', '8ac34e24-77e8-4d8a-afb4-7a64d1232fb1', true),
(gen_random_uuid(), 'Abs Leg Raises', 'WEIGHT_AND_REPS', 'ABS', 'HARD', '8ac34e24-77e8-4d8a-afb4-7a64d1232fb1', true),
(gen_random_uuid(), 'Abs Crunches', 'WEIGHT_AND_REPS', 'ABS', 'HARD', '8ac34e24-77e8-4d8a-afb4-7a64d1232fb1', true)
;
