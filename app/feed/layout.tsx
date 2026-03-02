import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
export default async function FeedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  return (
    <div style={{ display:'grid', gridTemplateColumns:'240px 1fr', maxWidth:1280, margin:'0 auto', minHeight:'100vh', position:'relative', zIndex:1 }}>
      <aside style={{ position:'sticky', top:0, height:'100vh', padding:'28px 20px', borderRight:'1px solid var(--border)', display:'flex', flexDirection:'column', gap:4 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)' }} />
          <span style={{ fontFamily:'Fraunces,serif', fontSize:26, fontWeight:700, color:'var(--accent)', letterSpacing:-1 }}>pulse</span>
        </div>
        {[['◉','Feed','/feed'],['⊕','Explore','/feed'],['◈','Profile','/feed']].map(([icon,label,href])=>(
          <a key={label} href={href} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:10, textDecoration:'none', fontSize:13, color:'var(--muted)', border:'1px solid transparent' }}>
            <span style={{ fontSize:16 }}>{icon}</span>{label}
          </a>
        ))}
        <div style={{ marginTop:'auto', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,var(--accent),var(--accent3))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#0d0d0f' }}>
            {(profile?.username?.[0]??'U').toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize:12, color:'#e8e6f0' }}>{profile?.username}</div>
          </div>
        </div>
      </aside>
      <main style={{ borderRight:'1px solid var(--border)', minHeight:'100vh' }}>{children}</main>
    </div>
  );
}
