import { NavLink } from 'react-router-dom';
import { navigation } from '../data/siteData';

function categoryLinkClass({ isActive }) {
  return isActive
    ? 'text-slate-800'
    : 'text-slate-600 hover:text-gray-500';
}

export default function DrawingsNav() {
  return (
    <nav className="w-full overflow-x-auto border-t border-neutral-200 pt-4">
      <ul className="flex min-w-max justify-center gap-4 text-sm font-normal uppercase tracking-normal text-slate-600">
        {navigation.drawings.map((category) => (
          <li key={category.key}>
            <NavLink to={`/drawings/${category.key}`} className={categoryLinkClass}>
              {category.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}