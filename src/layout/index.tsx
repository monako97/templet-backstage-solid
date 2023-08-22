import { For } from 'solid-js';
import routes, { RouteConfig } from '@app/routes';
import { Outlet, useNavigate } from '@moneko/solid';
import styles from './index.less';
import '@/global.less';

type AllRoute = {
  path: string;
  meta?: RouteConfig['meta'];
};

function transformRoutes(inputRoutes: RouteConfig[], parentPath?: string, result: AllRoute[] = []) {
  for (const route of inputRoutes) {
    const { path, meta, children } = route;
    const fullPath = [parentPath, path].join('/').split('/').filter(Boolean).join('/');
    const transformedRoute: AllRoute = { path: fullPath, meta };

    if (children) {
      transformRoutes(children, fullPath, result);
    } else {
      result.push(transformedRoute);
    }
  }

  return result;
}

function App() {
  const all = transformRoutes(routes);
  const navigate = useNavigate();

  return (
    <>
      <nav class={styles.navs}>
        <For each={all}>
          {(item) => {
            return (
              <li>
                <button
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  {[item.path || '/', item.meta?.title].filter(Boolean)}
                </button>
              </li>
            );
          }}
        </For>
      </nav>
      <main class={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

export default App;
