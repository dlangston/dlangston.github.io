import { NavLink, useLocation } from 'react-router-dom';
import { navigation } from '../data/siteData';

function navLinkClass({ isActive }) {
  return isActive
    ? 'px-2 py-1 text-[color:var(--ui-link-active)]'
    : 'px-2 py-1 text-[color:var(--ui-link)] hover:text-[color:var(--ui-link-hover)]';
}

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <div className="nav w-full overflow-x-auto">
      <ul className="flex min-w-max justify-center gap-4 text-base font-normal uppercase tracking-normal">
        {navigation.main.map((item) => (
          <li key={item.to ?? item.href}>
            {item.to === '/' && pathname === '/' ? (
              <span aria-hidden="true" className="invisible inline-block px-2 py-1 select-none">
                {item.label}
              </span>
            ) : item.to ? (
              <NavLink to={item.to} className={navLinkClass} end={item.end}>
                {item.label}
              </NavLink>
            ) : (
              <a href={item.href} className="px-2 py-1 text-[color:var(--ui-link)] hover:text-[color:var(--ui-link-hover)]">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}