import { COMPONENT_REGISTRY } from './component-registry';

/**
 * 从注册表自动拉取组件的公共配置字段，
 * 页面文件只需提供专属数据（defaultValues、propConfig 等）。
 */
export function getPageConfig(componentName: string) {
  const entry = COMPONENT_REGISTRY.find(
    (c) => c.name.toLowerCase() === componentName.toLowerCase()
  );
  if (!entry) {
    throw new Error(`Component "${componentName}" not found in registry`);
  }
  return {
    category: { label: entry.category.label, href: entry.category.href },
    name: entry.name,
    description: entry.description,
    installName: entry.installName,
    importStatement: entry.importStatement,
  };
}
