import { createClient } from '@/lib/supabase/server';
import FeedClient from '@/components/post/FeedClient';
export const revalidate = 0;
export default async function FeedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: posts } = await supabase.from('posts').select('*, profile:profiles(*), likes(user_id)').order('created_at', { ascending: false }).limit(50);
  const enriched = (posts ?? []).map(post => ({ ...post, liked_by_user: post.likes?.some((l: { user_id: string }) => l.user_id === user?.id) ?? false }));
  return <FeedClient initialPosts={enriched} currentUserId={user?.id ?? ''} />;
}
