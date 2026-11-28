import { NavLink } from 'react-router-dom';
import Icon from './Icon';

const ITEMS = [
  { to: '/', label: '홈', icon: 'home' },
  { to: '/path', label: '경로', icon: 'map' },
  { to: '/settings', label: '설정', icon: 'settings' },
];

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-xl">
        {ITEMS.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            end={i.to === '/'}
            className={({ isActive }) => `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] ${isActive ? 'text-brand font-semibold' : 'text-slate-500'}`}
          >
            <Icon name={i.icon} size={20} />
            {i.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
