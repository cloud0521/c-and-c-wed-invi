-- Upgrade migration for databases where the original RSVP schema was already
-- installed before secure administrator provisioning was added.

create extension if not exists pgcrypto;

create table if not exists public.invitation_admins (
  username text primary key,
  password_hash text not null,
  role text not null check (role in ('admin'))
);

alter table public.invitation_admins enable row level security;

create or replace function public.configure_invitation_admin(p_password text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_password is null or char_length(p_password) < 12 then
    raise exception 'Administrator password must contain at least 12 characters';
  end if;

  insert into public.invitation_admins (username, password_hash, role)
  values (
    'wed-invi-admin',
    extensions.crypt(p_password, extensions.gen_salt('bf')),
    'admin'
  )
  on conflict (username) do update
    set password_hash = excluded.password_hash,
        role = excluded.role;
end;
$$;

revoke all on function public.configure_invitation_admin(text) from public;
revoke all on function public.configure_invitation_admin(text) from anon, authenticated;

-- Run the following separately after applying this migration:
-- select public.configure_invitation_admin('your-long-unique-password'::text);
