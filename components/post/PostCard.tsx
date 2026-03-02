'use client';
import { Post } from '@/types';
import { formatDistanceToNow } from 'date-fns';
const GRADS = ['linear-gradient(135deg,#c8f04d,#6bceff)','linear-gradient(135deg,#ff6b6b,#ffa36b)','linear-gradient(135deg,#6bceff,#a06bff)','linear-gradient(135deg,#f04db0,#ff6b6b)'];
function getGrad(id: string) { return GRADS[id.charCodeAt(0) % GRADS.length]; }
function getInitials(p: Post['profile']) { const n = p?.display_name || p?.username || '?'; return n.slice(0,2).toUpperCase(); }
const act: React.CSSProperties = { display:'flex', alignItems:'center', gap:6, background:'none', border:'none', color:'var(--muted)', cursor:'pointer', padding:'6px 10px', borderRadius:8, fontFamily:'DM Mono,monospace', fontSize:12, flex:1, justifyContent:'center' };
export default function PostCard({ post, onLike, onRepost, index }: { post: Post; index: number; onLike: ()=>void; onRepost: ()=>void }) {
  const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });
  return (
    <div style={{ padding:'20px 24px', borderBottom:'1px solid var(--border)', display:'flex', gap:14, animation:'fadeIn 0.4s ease both', animationDelay:`${Math.min(index,8)*0.05}s` }}>
      <div style={{ width:38, height:38, borderRadius:'50%', flexShrink:0, marginTop:2, background:getGrad(post.profile?.id??''), display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:'#0d0d0f' }}>{getInitials(post.profile)}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
          <span style={{ fontFamily:'Fraunces,serif', fontSize:15, fontWeight:700 }}>{post.profile?.display_name||post.profile?.username||'Unknown'}</span>
          <span style={{ color:'var(--muted)', fontSize:12 }}>@{post.profile?.username}</span>
          <span style={{ color:'var(--muted)', fontSize:11, marginLeft:'auto' }}>{timeAgo}</span>
        </div>
        <p style={{ color:'#e8e6f0', lineHeight:1.65, fontFamily:'Fraunces,serif', fontSize:14.5, fontWeight:300 }}>{post.content}</p>
        <div style={{ display:'flex', gap:4, marginTop:14 }}>
          <button style={act}>↩ {post.replies_count||0}</button>
          <button onClick={onRepost} style={act}>↻ {post.reposts_count||0}</button>
          <button onClick={onLike} style={{ ...act, color:post.liked_by_user?'var(--accent2)':'var(--muted)' }}>{post.liked_by_user?'♥':'♡'} {post.likes_count||0}</button>
          <button style={act}>↑</button>
        </div>
      </div>
    </div>
  );
}
