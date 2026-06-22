/// <reference types="vitest/globals" />
import { axe, toHaveNoViolations } from 'jest-axe';

// jest-axe v10+ 不再导出 RunOptions 类型，自己定义
interface RunOptions {
  rules?: Record<string, { enabled: boolean } | undefined>;
  runOnly?: unknown;
  includedImpacts?: string[];
  elementRef?: boolean;
  selectors?: boolean;
  ancestry?: boolean;
  absolutePaths?: boolean;
  iframes?: boolean;
  frameWaitTime?: number;
  preload?: boolean;
  performanceTimer?: boolean;
  pingWaitTime?: number;
  resultTypes?: string[];
  reporter?: string;
  xpath?: boolean;
  normalize?: boolean;
  color?: boolean;
}

// 扩展 expect 匹配器
expect.extend(toHaveNoViolations);

// 默认 axe 配置
const defaultOptions = {
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
  options?: Record<string, unknown>
): Promise<Awaited<ReturnType<typeof axe>>> {
  return axe(element, { ...defaultOptions, ...options } as Parameters<
    typeof axe
  >[1]);
}

/**
 * 断言元素没有可访问性违规
 * @param element - 要测试的 DOM 元素
 * @param options - axe 配置选项
 */
export async function expectNoA11yViolations(
  element: Element,
  options?: Record<string, unknown>
): Promise<Awaited<ReturnType<typeof runAxe>>> {
  const results = await runAxe(element, options);
  expect(results).toHaveNoViolations();
  return results;
}

export { axe, toHaveNoViolations };
export type { RunOptions }; // Re-export our local type
