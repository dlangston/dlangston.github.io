import { NavLink } from 'react-router-dom';
import { navigation } from '../data/siteData';

function navLinkStyle({ isActive }) {
  return {
    color: isActive ? 'var(--ui-link-current)' : 'var(--ui-link)',
  };
}

export default function Nav() {
  return (
    <div className="nav w-full overflow-x-auto">
      <ul className="flex min-w-max justify-center gap-4 text-base font-normal uppercase tracking-normal">
        {navigation.main.map((item) => (
          <li key={item.to ?? item.href}>
            {item.to ? (
              <NavLink
                to={item.to}
                end={item.end}
                className="px-2 py-1 hover:text-(--ui-link-hover)"
                style={navLinkStyle}
              >
                {item.label}
              </NavLink>
            ) : (
              <a href={item.href} className="px-2 py-1 text-(--ui-link) hover:text-(--ui-link-hover)">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}