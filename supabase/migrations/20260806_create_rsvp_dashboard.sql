create extension if not exists pgcrypto;

create table if not exists public.rsvp_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) > 0),
  attendance text not null check (attendance in ('yes', 'no')),
  guest_count integer not null check (guest_count between 1 and 10),
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.invitation_admins (
  username text primary key,
  password_hash text not null,
  role text not null check (role in ('admin'))
);

insert into public.invitation_admins (username, password_hash, role)
values ('wed-invi-admin', extensions.crypt('samplepass', extensions.gen_salt('bf')), 'admin')
on conflict (username) do update set password_hash = excluded.password_hash, role = excluded.role;

alter table public.rsvp_submissions enable row level security;
alter table public.invitation_admins enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on table public.rsvp_submissions to anon;

drop policy if exists "anonymous RSVP insert" on public.rsvp_submissions;
create policy "anonymous RSVP insert" on public.rsvp_submissions for insert to anon with check (true);

create or replace function public.get_rsvp_dashboard(p_username text, p_password text)
returns table (id uuid, full_name text, attendance text, guest_count integer, created_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.invitation_admins
    where username = p_username
      and role = 'admin'
      and password_hash = extensions.crypt(p_password, password_hash)
  ) then
    raise exception 'Invalid administrator credentials';
  end if;

  return query
  select r.id, r.full_name, r.attendance, r.guest_count, r.created_at
  from public.rsvp_submissions r
  order by r.created_at desc;
end;
$$;

revoke all on function public.get_rsvp_dashboard(text, text) from public;
grant execute on function public.get_rsvp_dashboard(text, text) to anon, authenticated;
