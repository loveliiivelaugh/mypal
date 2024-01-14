create table
  public.weight (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    weight character varying null,
    date date null default now(),
    user_id uuid null,
    constraint weight_pkey primary key (id),
    constraint weight_user_id_fkey foreign key (user_id) references auth.users (id) on update cascade on delete cascade
  ) tablespace pg_default;

create table
  public.food (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    name character varying null,
    calories integer null,
    date date null,
    time time without time zone null,
    nutrients jsonb null,
    user_id uuid null default auth.uid (),
    meal text null,
    constraint foods_pkey primary key (id)
  ) tablespace pg_default;

  create table
  public.exercise (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    name character varying not null,
    reps integer not null default 0,
    sets integer not null default 0,
    date date not null default now(),
    time time without time zone not null default now(),
    muscle text null,
    difficulty text null,
    equipment text null,
    instructions text null,
    type text null,
    user_id uuid not null default auth.uid (),
    weight integer not null default 0,
    calories_burned integer null default 0,
    constraint exercises_pkey primary key (id),
    constraint exercise_user_id_fkey foreign key (user_id) references auth.users (id) on update cascade on delete cascade
  ) tablespace pg_default;