import { NavLink } from 'react-router-dom';
export default function StoryTabs() {
  return <nav aria-label="스토리 분류" className="flex flex-wrap gap-5 text-sm sm:text-base">
    {[['/works', '전체 스토리'], ['/platforms', '플랫폼별'], ['/series', '시리즈별']].map(([to, label]) =>
      <NavLink key={to} to={to} className={({ isActive }) => `pb-2 border-b-2 ${isActive ? 'text-blue-200 border-blue-300 font-semibold' : 'text-slate-400 border-transparent hover:text-white'}`}>{label}</NavLink>)}
  </nav>;
}
