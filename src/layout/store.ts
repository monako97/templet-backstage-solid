import { createEffect, createMemo, createRoot, getOwner } from 'solid-js';
import { t } from '@app/locales';
import { BaseOption, MenuOption, TabOption, getOptions } from 'neko-ui';
import { createStore } from 'solid-js/store';

// 多语言响应性
export function prefixMenu(list: MenuOption[]) {
  return list.map((l) => {
    const { children, options, ...item } = l;

    if (children?.length) {
      Object.assign(item, {
        children: prefixMenu(
          getOptions(children, {
            value: 'key',
          }),
        ),
      });
    }
    if (options?.length) {
      Object.assign(item, {
        options: prefixMenu(
          getOptions(options, {
            value: 'key',
          }),
        ),
      });
    }
    return {
      ...item,
      label: t[item.key] || item.label,
    };
  });
}
function getMenuMap(list: BaseOption[]) {
  const obj: Record<string, BaseOption> = {};

  list.forEach((item) => {
    const { children, options, ...other } = item;

    if (children) {
      Object.assign(obj, getMenuMap(children));
    }
    if (options) {
      Object.assign(obj, getMenuMap(getOptions(options, { value: 'key' })));
    }
    Object.assign(obj, {
      [item.key]: other,
    });
  });
  return obj;
}
export function prefixTabs(list: TabOption[]) {
  return list.map((l) => {
    return {
      ...l,
      label: t[l.key] || l.label,
    };
  });
}
const store = createRoot(() => {
  const [layout, setLayout] = createStore({
    activeKey: new URLSearchParams(location.search).get('menuId') || 'root',
    menus: [] as MenuOption[],
    tabs: [] as TabOption[],
  });
  const menuMap = createMemo(() => getMenuMap(layout.menus));

  createEffect(() => {
    const key = layout.activeKey;
    const next = menuMap()[key];

    if (next) {
      setLayout('tabs', (prev) => {
        if (key !== void 0 && prev.findIndex((p) => p.key === key) === -1) {
          return prev.concat(next);
        }
        return prev;
      });
    }
  });
  return { layout, setLayout, menuMap };
}, getOwner());

export const setLayout = store.setLayout;
export const menuMap = store.menuMap;
export default store.layout;
