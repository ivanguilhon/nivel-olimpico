-- ============================================================
-- Nível Olímpico — Supabase Schema
-- Execute no SQL Editor do seu projeto Supabase
-- ============================================================

-- Perfis de usuário (estende auth.users)
create table public.profiles (
  id          uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url  text,
  role        text default 'student' check (role in ('student', 'admin')),
  created_at  timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Usuários veem seus próprios perfis"  on public.profiles for select using (auth.uid() = id);
create policy "Usuários editam seus próprios perfis" on public.profiles for update using (auth.uid() = id);

-- Blog posts
create table public.posts (
  id          uuid default gen_random_uuid() primary key,
  slug        text unique not null,
  title       text not null,
  excerpt     text,
  content     text,                     -- markdown/MDX
  category    text,
  author_id   uuid references public.profiles(id),
  published   boolean default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
alter table public.posts enable row level security;
create policy "Posts publicados visíveis para todos" on public.posts for select using (published = true);
create policy "Admin gerencia posts" on public.posts for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Grupos de discussão
create table public.groups (
  id          uuid default gen_random_uuid() primary key,
  slug        text unique not null,
  name        text not null,
  description text
);

create table public.group_posts (
  id          uuid default gen_random_uuid() primary key,
  group_id    uuid references public.groups(id) on delete cascade,
  author_id   uuid references public.profiles(id),
  content     text not null,
  created_at  timestamptz default now()
);
alter table public.group_posts enable row level security;
create policy "Autenticados veem posts dos grupos" on public.group_posts for select using (auth.role() = 'authenticated');
create policy "Autenticados postam nos grupos"     on public.group_posts for insert with check (auth.uid() = author_id);

-- Trigger: cria perfil automaticamente após cadastro
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
