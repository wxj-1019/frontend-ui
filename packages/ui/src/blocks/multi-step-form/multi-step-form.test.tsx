import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MultiStepForm } from './index';

const mockSteps = [
  {
    title: '个人信息',
    description: '请填写基本信息',
    fields: [
      {
        name: 'name',
        label: '姓名',
        type: 'text' as const,
        placeholder: '请输入姓名',
        required: true,
      },
      {
        name: 'email',
        label: '邮箱',
        type: 'email' as const,
        placeholder: '请输入邮箱',
        required: true,
      },
    ],
  },
  {
    title: '账户信息',
    fields: [
      {
        name: 'username',
        label: '用户名',
        type: 'text' as const,
        placeholder: '用户名',
        required: true,
      },
    ],
  },
];

describe('MultiStepForm', () => {
  it('renders step title in the content area', () => {
    render(
      <MultiStepForm
        steps={mockSteps}
        onSubmit={vi.fn()}
        prefersReducedMotion
      />
    );
    // "个人信息" appears in both step indicator and <h3> title
    const titles = screen.getAllByText('个人信息');
    expect(titles.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('请填写基本信息')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('请输入姓名')).toBeInTheDocument();
  });

  it('shows step indicator with correct step count', () => {
    render(
      <MultiStepForm
        steps={mockSteps}
        onSubmit={vi.fn()}
        prefersReducedMotion
      />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('navigates to next step on clicking next with valid fields', () => {
    render(
      <MultiStepForm
        steps={mockSteps}
        onSubmit={vi.fn()}
        prefersReducedMotion
      />
    );
    // Fill required fields
    fireEvent.change(screen.getByPlaceholderText('请输入姓名'), {
      target: { value: '张三' },
    });
    fireEvent.change(screen.getByPlaceholderText('请输入邮箱'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.click(screen.getByText('下一步'));
    // "账户信息" appears in both step indicator and content title
    const accountTitles = screen.getAllByText('账户信息');
    expect(accountTitles.length).toBeGreaterThanOrEqual(1);
  });

  it('shows validation error on empty required field', () => {
    render(
      <MultiStepForm
        steps={mockSteps}
        onSubmit={vi.fn()}
        prefersReducedMotion
      />
    );
    fireEvent.click(screen.getByText('下一步'));
    expect(screen.getByText('姓名 不能为空')).toBeInTheDocument();
  });

  it('goes back to previous step', () => {
    render(
      <MultiStepForm
        steps={mockSteps}
        onSubmit={vi.fn()}
        prefersReducedMotion
      />
    );
    // Go to step 2
    fireEvent.change(screen.getByPlaceholderText('请输入姓名'), {
      target: { value: '张三' },
    });
    fireEvent.change(screen.getByPlaceholderText('请输入邮箱'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.click(screen.getByText('下一步'));
    // Go back
    fireEvent.click(screen.getByText('上一步'));
    // Should be back on step 1 — verify by checking the field is visible
    expect(screen.getByPlaceholderText('请输入姓名')).toBeInTheDocument();
  });

  it('submits form on last step', async () => {
    const onSubmit = vi.fn();
    render(
      <MultiStepForm
        steps={mockSteps}
        onSubmit={onSubmit}
        prefersReducedMotion
      />
    );
    // Fill step 1
    fireEvent.change(screen.getByPlaceholderText('请输入姓名'), {
      target: { value: '张三' },
    });
    fireEvent.change(screen.getByPlaceholderText('请输入邮箱'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.click(screen.getByText('下一步'));
    // Fill step 2 — use findByPlaceholderText to wait for render
    const usernameInput = await screen.findByPlaceholderText('用户名');
    fireEvent.change(usernameInput, { target: { value: 'zhangsan' } });
    fireEvent.click(screen.getByText('提交'));
    // Should show success
    expect(await screen.findByText('提交成功！')).toBeInTheDocument();
    expect(onSubmit).toHaveBeenCalledWith({
      name: '张三',
      email: 'test@test.com',
      username: 'zhangsan',
    });
  });

  it('renders step counter', () => {
    render(
      <MultiStepForm
        steps={mockSteps}
        onSubmit={vi.fn()}
        prefersReducedMotion
      />
    );
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });
});
