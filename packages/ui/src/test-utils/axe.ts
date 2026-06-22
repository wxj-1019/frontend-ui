import { axe, toHaveNoViolations } from 'jest-axe';
import type { RunOptions } from 'jest-axe';

// 扩展 expect 匹配器
expect.extend(toHaveNoViolations);

// 默认 axe 配置
const defaultOptions: RunOptions = {
  rules: {
    // 禁用 color-contrast 检查（需要运行时计算）
    'color-contrast': { enabled: false },
  },
};

/**
 * 运行 axe 可访问性测试
 * @param element - 要测试的 DOM 元素
 * @param options - axe 配置选项
 * @returns axe 结果
 */
export async function runAxe(
  element: Element,
  options?: RunOptions
) {
  return axe(element, { ...defaultOptions, ...options });
}

/**
 * 断言元素没有可访问性违规
 * @param element - 要测试的 DOM 元素
 * @param options - axe 配置选项
 */
export async function expectNoA11yViolations(
  element: Element,
  options?: RunOptions
) {
  const results = await runAxe(element, options);
  expect(results).toHaveNoViolations();
  return results;
}

export { axe, toHaveNoViolations };
export type { RunOptions };
