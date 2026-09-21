import { NavLink } from 'react-router-dom';
import { navigation } from '../data/siteData';

function categoryLinkStyle({ isActive }) {
  return {
    color: isActive ? 'var(--ui-link-current)' : 'var(--ui-link)',
  };
}

export default function DrawingsNav() {
  return (
    <nav className="w-full border-t border-neutral-200 pt-4">
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-normal uppercase tracking-normal">
        {navigation.drawings.map((category) => (
          <li key={category.key}>
            <NavLink
              to={`/drawings/${category.key}`}
              className="hover:text-(--ui-link-hover)"
              style={categoryLinkStyle}
            >
              {category.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}