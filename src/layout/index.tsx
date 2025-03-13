import { createEffect } from 'solid-js';
import { name } from '@app/info';
import { lang, locales, setLang } from '@app/locales';
import { type RouteProps, useNavigate, useSearchParams } from '@moneko/solid';
import { type MenuOption, TabOption, theme } from 'neko-ui';
import * as styles from './index.less';
import layout, { menuMap, prefixMenu, prefixTabs, setLayout } from './store';
import '@/global.less';

// 设置 Neko UI 的颜色模式为亮色
theme.setScheme('light');
// 设置左侧菜单项
setLayout('menus', [
  {
    icon: '😟',
    path: '/',
    key: 'root',
  },
  {
    icon: '🏠',
    path: 'home',
    key: 'home',
    closable: true,
  },
  {
    key: 'management',
    options: [
      {
        path: 'user',
        key: 'user',
        closable: true,
      },
    ],
  },
  {
    key: 'dynamicRoute',
    children: [
      {
        path: 'user/张三',
        key: 'user/:id',
        icon: '🎭',
        closable: true,
      },
    ],
  },
  {
    key: 'other',
    options: [
      {
        path: 'about',
        key: 'about',
        closable: true,
      },
    ],
  },
]);
// 设置当前激活的菜单和Tab
setLayout('activeKey', 'root');
function App(props: RouteProps<string>) {
  const navigate = useNavigate();
  const [search] = useSearchParams();

  function handleMenu(e: CustomEvent<[val: string | number, item: MenuOption]>) {
    const [menuId, item] = e.detail;

    navigate(`${item.path}?menuId=${menuId}`);
  }
  function handleTab(e: CustomEvent<[string, TabOption, Event]>) {
    const [menuId] = e.detail;
    const menu = menuMap()[menuId];

    navigate(`${menu.path}?menuId=${menu.key}`);
  }
  function editTab(e: CustomEvent<[type: 'add' | 'remove', item: TabOption, e: Event]>) {
    const [type, item] = e.detail;

    if (type === 'remove') {
      let idx = -1;
      const nexts = layout.tabs.filter((o, i) => {
        const flag = item.key !== o.key;

        if (!flag) {
          idx = i ? i - 1 : 0;
        }
        return flag;
      });
      const next = nexts[idx];

      if (idx >= 0 && next) {
        // 当前选中的tab被删除时调整为激活前面一个Tab
        navigate(`${next.path}?menuId=${next.key}`);
      }
      // 新的Tab数据
      setLayout('tabs', nexts);
    }
  }
  createEffect(() => {
    // 通过 url 中的 ?menuId= 参数设置激活的菜单
    setLayout('activeKey', search.menuId);
  });

  return (
    <n-provider>
      <section class={styles.sider}>
        <h3>{name}</h3>
        <n-menu
          field-names={{
            value: 'key',
          }}
          items={prefixMenu(layout.menus)}
          value={layout.activeKey}
          onChange={handleMenu}
        />
      </section>
      <section class={styles.section}>
        <n-tabs
          type="card"
          field-names={{
            value: 'key',
          }}
          onEdit={editTab}
          items={prefixTabs(layout.tabs)}
          value={layout.activeKey}
          onChange={handleTab}
          extra={{
            right: (
              <n-dropdown
                value={lang.language}
                items={locales}
                field-names={{
                  value: 'language',
                  label: 'title',
                }}
                onChange={(e) => {
                  setLang(e.detail[0] as string);
                }}
                trigger="click"
              >
                <n-button size="small" flat={true}>
                  <span>{lang.title}</span>
                </n-button>
              </n-dropdown>
            ),
          }}
        />
        <main class={styles.main}>
          {props.children}
        </main>
      </section>
    </n-provider>
  );
}

export default App;
